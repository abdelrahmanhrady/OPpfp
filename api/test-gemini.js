// api/test-openrouter.js
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

async function callOpenRouter() {
  const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
  if (!OPENROUTER_KEY) {
    console.error("Error: OPENROUTER_API_KEY not set in .env");
    return;
  }

  const endpoint = "https://openrouter.ai/v1/chat/completions";

  const body = {
    model: "openai/gpt-5-pro", // valid OpenRouter model
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Hello! Confirm the API key works." }
    ],
    max_tokens: 200,
    temperature: 0.7
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_KEY}`,
      },
      body: JSON.stringify(body),
    });

    // check for non-JSON responses
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      console.log("Status:", res.status);
      console.log("Response:", JSON.stringify(data, null, 2));
    } catch {
      console.error("Non-JSON response received:", text);
    }

  } catch (err) {
    console.error("Error calling OpenRouter API:", err);
  }
}

callOpenRouter();
