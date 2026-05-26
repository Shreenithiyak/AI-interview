import OpenAI from 'openai';
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
    const openai = getOpenAI();
    const { transcript, chatHistory } = req.body;

    const messages = [
      {
        role: 'system',
        content: `You are Sarah, a Senior Technical Interviewer conducting a mock interview.
        You are professional, encouraging, but rigorous.
        Keep your responses concise, conversational, and suitable for text-to-speech.
        Ask follow-up questions based on the candidate's answers.`,
      },
      ...(chatHistory || []),
      { role: 'user', content: transcript },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // or gpt-3.5-turbo
      messages: messages,
    });

    res.status(200).json({ success: true, message: completion.choices[0].message.content });
  } catch (error) {
    console.error('Chat error:', error);
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
