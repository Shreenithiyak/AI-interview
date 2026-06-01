import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connect from './route/approute.js'
import {Base} from './config/dbconn.js'

dotenv.config();

// Initialize OpenAI client
import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY is missing in .env');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const app =express()
app.use(cors({
  origin: process.env.CLIENT_URL || ' https://mock-interview-ashen-theta.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// OpenAI generation endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });
    res.json({ response: completion.choices[0].message.content });
  } catch (err) {
    console.error('OpenAI generation error:', err);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

// Security header for Google OAuth Popups
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

app.use('/api/user',connect)
const startServer = async () => {
  try {
    await Base();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`server connected http://localhost:${PORT}`)});
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();

//http://localhost:5000/api/user