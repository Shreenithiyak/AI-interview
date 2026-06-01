import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Note: Ensure OPENAI_API_KEY is set in your .env file
const getOpenAI = () => new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
});

export const transcribeAudio = async (req, res) => {
  try {
    const openai = getOpenAI();
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No audio file provided' });
    }

    const audioFile = fs.createReadStream(req.file.path);

    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
    });

    // Clean up the temporary file
    fs.unlinkSync(req.file.path);

    res.status(200).json({ success: true, text: transcription.text });
  } catch (error) {
    console.error('Transcription error:', error);
    res.status(500).json({ success: false, message: 'Transcription failed' });
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
    const openai = getOpenAI();
    const { text } = req.body;

    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy', // You can change the voice (alloy, echo, fable, onyx, nova, shimmer)
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': buffer.length,
    });
    res.send(buffer);
  } catch (error) {
    console.error('TTS error:', error);
    res.status(500).json({ success: false, message: 'Text-to-speech failed' });
  }
};
