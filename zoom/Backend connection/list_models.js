import dotenv from 'dotenv';
dotenv.config();

const key = process.env.GEMINI_API_KEY;

async function run() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.models) {
      console.log("Supported Gemini models:");
      data.models
        .map(m => m.name)
        .filter(name => name.toLowerCase().includes('gemini'))
        .forEach(name => console.log(" -", name));
    } else {
      console.log("No models field in response:", data);
    }
  } catch (err) {
    console.error("Error fetching models:", err);
  }
  process.exit(0);
}

run();
