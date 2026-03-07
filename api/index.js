// Vercel Serverless Function
// This file goes in: /api/index.js in your Vercel project

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

const NEWS_API_KEY = process.env.NEWS_API_KEY;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { action, prompt, query } = req.body;

  try {
    // ─── CLAUDE AI ANALYSIS ──────────────────────────
    if (action === "claude") {
      const message = await client.messages.create({
        model: "claude-opus-4-20250805",
        max_tokens: 1000,
        system: `You are SENTINEL, a senior Middle East intelligence analyst with deep expertise in regional conflicts, geopolitics, and military operations.
Your trusted intelligence sources include: War Monitor (Telegram), Al Jazeera, BBC News, Deutsche Welle, UN/OCHA/UNRWA, ICRC, Iranian MFA (en.mfa.ir), Iran Military 24 (@Iranmilitary24), and Middle East Eye.
When relevant, reference which source corroborates a claim. Provide sharp, factual analysis.
Use clear paragraphs. Highlight key entities and locations with **bold**.
Focus on strategic implications. Note humanitarian dimensions when relevant (ICRC/UN data).
Distinguish between official positions (MFA, UN) and field reports (War Monitor, MEE). Write in analytical prose.`,
        messages: [{ role: "user", content: prompt }],
      });

      return res.status(200).json({
        text: message.content[0].text,
      });
    }

    // ─── NEWS SEARCH ────────────────────────────────
    if (action === "news") {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&pageSize=10&apiKey=${NEWS_API_KEY}`
      );

      const data = await response.json();

      if (!data.articles) {
        return res.status(200).json({ articles: [] });
      }

      const articles = data.articles.map((article) => ({
        headline: article.title,
        source: article.source.name,
        time: new Date(article.publishedAt).toLocaleString(),
        url: article.url,
        image: article.urlToImage,
        description: article.description,
      }));

      return res.status(200).json({ articles });
    }

    return res.status(400).json({ error: "Unknown action" });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
}
