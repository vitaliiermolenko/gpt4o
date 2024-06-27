import express from "express";
import OpenAI from "openai";
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

const apiKeyGpt = process.env.API_KEY_GPT;
const openai = new OpenAI({ apiKey: apiKeyGpt });

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.post("/run-gpt", async (req, res) => {
  try {
    const messages = req.body.messages || [{ role: "system", content: "Hello" }];
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo"
    });
    res.json({ message: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/run-gpt4o", async (req, res) => {
  try {
    const messages = req.body.messages || [{ role: "system", content: "Hello" }];
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-4o" // Using GPT-4 model
    });
    res.json({ message: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
