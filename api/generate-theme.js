import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/generate-theme", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Missing prompt" });

  try {
    console.log("🚀 Sending request to Gemini API with prompt:", prompt);

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: { text: prompt },
          temperature: 0.7,
          maxOutputTokens: 512,
        }),
      }
    );

    const rawText = await response.text();
    console.log("📥 Raw Gemini response:", rawText);

    // Attempt to parse JSON safely
    let data;
    try {
      data = JSON.parse(rawText);
    } catch (err) {
      console.error("❌ Failed to parse Gemini JSON:", err);
      return res.status(500).json({ error: "Invalid response from Gemini API" });
    }

    if (data.error) {
      console.error("❌ Gemini API returned error:", data.error);
      return res.status(500).json({ error: data.error });
    }

    // Return the full Gemini data to React
    res.json(data);
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
