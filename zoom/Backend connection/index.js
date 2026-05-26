import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connect from './route/approute.js'
import {Base} from './config/dbconn.js'

dotenv.config()
const app =express()
app.use(cors({
  origin: process.env.CLIENT_URL || 'https://stack-experiments.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())

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
      console.log(`server connected http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();

//http://localhost:5000/api/user