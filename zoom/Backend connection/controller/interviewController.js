import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Note: Ensure OPENAI_API_KEY is set in your .env file
const getOpenAI = () => new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
});

export const transcribeAudio = async (req, res) => {
  console.log("OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY)
  console.log("GEMINI_API_KEY exists:", !!process.env.GEMINI_API_KEY)

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No audio file provided' });
  }

  try {
    let transcriptionText = '';
    let success = false;

    // Try OpenAI Whisper first if API key is not dummy
    if (process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.startsWith('dummy')) {
      try {
        const openai = getOpenAI();
        const audioFile = fs.createReadStream(req.file.path);
        const transcription = await openai.audio.transcriptions.create({
          file: audioFile,
          model: 'whisper-1',
        });
        transcriptionText = transcription.text;
        success = true;
      } catch (openaiError) {
        console.warn('OpenAI transcription failed, trying Gemini fallback...', openaiError.message);
      }
    }

    // Fall back to Gemini if OpenAI failed or was skipped
    if (!success) {
      try {
        if (!process.env.GEMINI_API_KEY) {
          throw new Error("GEMINI_API_KEY is not defined in .env");
        }
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const audioBuffer = fs.readFileSync(req.file.path);
        const base64Audio = audioBuffer.toString('base64');
        const mimeType = req.file.mimetype && req.file.mimetype !== 'application/octet-stream' 
          ? req.file.mimetype 
          : 'audio/webm';

        const result = await model.generateContent([
          {
            inlineData: {
              data: base64Audio,
              mimeType: mimeType,
            },
          },
          "Transcribe the audio text. Provide ONLY the transcription text, with no introductory or conversational filler. Keep punctuation natural."
        ]);

        transcriptionText = result.response.text().trim();
        success = true;
      } catch (geminiError) {
        console.error('Gemini transcription fallback failed:', geminiError);
      }
    }

    if (success) {
      res.status(200).json({ success: true, text: transcriptionText });
    } else {
      res.status(500).json({ success: false, message: 'Transcription failed using both OpenAI and Gemini' });
    }
  } catch (error) {
    console.error('Transcription controller error:', error);
    res.status(500).json({ success: false, message: 'Transcription failed' });
  } finally {
    // Clean up the temporary file safely
    try {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    } catch (cleanupError) {
      console.error('Failed to clean up temp file:', cleanupError);
    }
  }
};

export const chatWithAI = async (req, res) => {
  try {
    const { transcript, chatHistory } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not defined in .env");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: `You are Sarah, a Senior Technical Interviewer conducting a mock interview.
      You are professional, encouraging, but rigorous.
      Keep your responses concise, conversational, and suitable for text-to-speech.
      Ask follow-up questions based on the candidate's answers.`,
    });

    // Map OpenAI conversation history roles to Gemini roles ('user' or 'model')
    const history = (chatHistory || []).map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    if (history.length > 0 && history[0].role === 'model') {
      history.unshift({
        role: 'user',
        parts: [{ text: "Let's start the mock interview." }]
      });
    }

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(transcript);
    const responseText = await result.response.text();

    res.status(200).json({ success: true, message: responseText });
  } catch (error) {
    console.error('Gemini Chat error:', error);
    res.status(500).json({ success: false, message: 'Chat interaction failed' });
  }
};

export const generateTTS = async (req, res) => {
  try {
    const { text } = req.body;
    let buffer;
    let success = false;

    // Try OpenAI TTS first
    if (process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.startsWith('dummy')) {
      try {
        const openai = getOpenAI();
        const mp3 = await openai.audio.speech.create({
          model: 'tts-1',
          voice: 'alloy',
          input: text,
        });
        buffer = Buffer.from(await mp3.arrayBuffer());
        success = true;
      } catch (openaiError) {
        console.warn('OpenAI TTS failed, trying Google Translate TTS fallback...', openaiError.message);
      }
    }

    // Fallback: Google Translate TTS API
    if (!success) {
      try {
        // Split text into chunks of max 200 chars
        const chunks = [];
        let currentChunk = '';
        const words = text.split(/\s+/);
        for (const word of words) {
          if ((currentChunk + ' ' + word).length > 200) {
            chunks.push(currentChunk.trim());
            currentChunk = word;
          } else {
            currentChunk += (currentChunk ? ' ' : '') + word;
          }
        }
        if (currentChunk) {
          chunks.push(currentChunk.trim());
        }

        const buffers = [];
        for (const chunk of chunks) {
          if (!chunk) continue;
          const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(chunk)}`;
          const response = await fetch(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
          });
          if (!response.ok) {
            throw new Error(`Google TTS status: ${response.status}`);
          }
          const arrayBuffer = await response.arrayBuffer();
          buffers.push(Buffer.from(arrayBuffer));
        }

        if (buffers.length > 0) {
          buffer = Buffer.concat(buffers);
          success = true;
        }
      } catch (googleTTSError) {
        console.error('Google Translate TTS fallback failed:', googleTTSError);
      }
    }

    if (success && buffer) {
      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length,
      });
      res.send(buffer);
    } else {
      res.status(500).json({ success: false, message: 'Text-to-speech failed' });
    }
  } catch (error) {
    console.error('TTS error:', error);
    res.status(500).json({ success: false, message: 'Text-to-speech failed' });
  }
};
