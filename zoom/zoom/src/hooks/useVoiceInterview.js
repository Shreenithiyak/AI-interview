import { useState, useRef, useCallback, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

// ─── Browser Speech Synthesis Fallback (TTS) ───────────────────────────────
const speakWithBrowser = (text) => {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) { resolve(); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v =>
      v.name.toLowerCase().includes('samantha') ||
      v.name.toLowerCase().includes('google us english') ||
      v.name.toLowerCase().includes('zira') ||
      v.name.toLowerCase().includes('female')
    );
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.onend = resolve;
    utterance.onerror = resolve;
    window.speechSynthesis.speak(utterance);
  });
};

// Try OpenAI TTS, fall back to browser speechSynthesis
const speakText = async (text, token) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/user/interview/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': token },
      body: JSON.stringify({ text })
    });
    if (!res.ok) throw new Error('OpenAI TTS unavailable');
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch {
    console.info('[TTS] Falling back to browser speechSynthesis');
    await speakWithBrowser(text);
    return null;
  }
};


// ─── Hook ───────────────────────────────────────────────────────────────────
export const useVoiceInterview = (initialQuestion) => {
  const { token } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("AI is preparing the question...");
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: initialQuestion }
  ]);
  const [aiAudioUrl, setAiAudioUrl] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const browserRecognitionRef = useRef(null);

  // ── Speak initial question on mount ──────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      if (!token || !initialQuestion) return;
      setIsSpeaking(true);
      setTranscript(`AI: ${initialQuestion}`);
      try {
        const url = await speakText(initialQuestion, token);
        if (url) setAiAudioUrl(url);
      } finally {
        setIsSpeaking(false);
      }
    };
    const t = setTimeout(init, 500); // wait for voices to load
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Start Recording ───────────────────────────────────────────────────────
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mediaRecorder.onstop = processAudio;
      mediaRecorder.start();

      // Also start browser SpeechRecognition in parallel as fallback
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SR) {
        const recognition = new SR();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.interimResults = true;
        let liveText = '';
        recognition.onresult = (e) => {
          liveText = Array.from(e.results).map(r => r[0].transcript).join(' ');
          setTranscript(`You: ${liveText}`);
        };
        recognition.onend = () => {};
        recognition.start();
        browserRecognitionRef.current = { recognition, getText: () => liveText };
      }

      setIsRecording(true);
      setTranscript("Recording... Speak your answer.");
    } catch (err) {
      console.error("Microphone error:", err);
      setTranscript("Error accessing microphone. Please check permissions.");
    }
  }, []);

  // ── Stop Recording ────────────────────────────────────────────────────────
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
      setIsRecording(false);
    }
    if (browserRecognitionRef.current) {
      browserRecognitionRef.current.recognition.stop();
    }
  }, [isRecording]);

  // ── Process recorded audio ────────────────────────────────────────────────
  const processAudio = async () => {
    setIsProcessing(true);
    setTranscript("Transcribing your answer...");

    let userText = '';

    // Step 1: Transcribe — try Whisper, then browser fallback
    try {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');

      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/user/interview/transcribe`, {
        method: 'POST',
        headers: { 'Authorization': token },
        body: formData
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      userText = data.text;
    } catch {
      // Whisper failed — use browser SpeechRecognition text captured live
      console.info('[STT] Falling back to browser SpeechRecognition result');
      userText = browserRecognitionRef.current?.getText() || '';
      if (!userText) {
        setTranscript("Could not transcribe. Please check microphone or add OpenAI API key.");
        setIsProcessing(false);
        return;
      }
    }

    setTranscript(`You: ${userText}`);
    const updatedHistory = [...chatHistory, { role: 'user', content: userText }];
    setChatHistory(updatedHistory);

    // Step 2: GPT chat response
    try {
      setTranscript("AI is thinking...");
      const chatRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/user/interview/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ transcript: userText, chatHistory: updatedHistory })
      });
      const chatData = await chatRes.json();
      if (!chatData.success) throw new Error(chatData.message);

      const aiText = chatData.message;
      setChatHistory([...updatedHistory, { role: 'assistant', content: aiText }]);
      setTranscript(`AI: ${aiText}`);

      // Step 3: Speak AI response
      setIsSpeaking(true);
      const audioUrl = await speakText(aiText, token);
      if (audioUrl) setAiAudioUrl(audioUrl);

    } catch (err) {
      console.error("Chat/TTS error:", err);
      setTranscript("Chat failed. Please add OpenAI API key for full AI interview experience.");
    } finally {
      setIsProcessing(false);
      setIsSpeaking(false);
    }
  };

  // ── Restart ───────────────────────────────────────────────────────────────
  const restartInterview = useCallback(() => {
    window.speechSynthesis?.cancel();
    setChatHistory([{ role: 'assistant', content: initialQuestion }]);
    setTranscript(`AI: ${initialQuestion}`);
    setAiAudioUrl(null);
  }, [initialQuestion]);

  return {
    isRecording,
    isProcessing,
    isSpeaking,
    transcript,
    chatHistory,
    aiAudioUrl,
    startRecording,
    stopRecording,
    restartInterview,
    setAiAudioUrl
  };
};
