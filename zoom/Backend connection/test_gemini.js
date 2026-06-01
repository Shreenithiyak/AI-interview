import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testModel(modelName) {
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Hello, respond in one word.");
    console.log(`✅ Success for model "${modelName}": ${result.response.text().trim()}`);
    return true;
  } catch (err) {
    console.log(`❌ Failed for model "${modelName}": ${err.message}`);
    return false;
  }
}

async function run() {
  await testModel("gemini-1.5-flash");
  await testModel("gemini-1.5-flash-latest");
  await testModel("gemini-1.5-pro");
  await testModel("gemini-pro");
  process.exit(0);
}

run();
