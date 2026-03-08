// Vercel Serverless Function - Multi-Source Intelligence System
// Integrates: Twitter/X, Telegram, Web Scraping, Claude AI

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

// API Keys from environment variables
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export default async function handler(req, res) {
  // CORS headers
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
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        system: `You are SENTINEL, a senior Middle East intelligence analyst with deep expertise in regional conflicts, geopolitics, and military operations.

Your trusted intelligence sources include:
- OSINT Twitter accounts (@Osinttechnical, @talhagin, @Shayan86, @AryJeay, etc.)
- Telegram channels (War Monitor, Middle East Spectator)
- News agencies (Al Jazeera, Reuters, BBC, DW)
- Iranian sources (Tasnim, PressTV, Iran MFA, IRIB, Mehr News)
- UN/OCHA/UNRWA, ICRC

When analyzing multi-source intelligence:
1. Cross-reference claims across sources
2. Note verification status (verified, unverified, conflicting)
3. Highlight key entities and locations with **bold**
4. Distinguish between official positions (MFA, UN) and field reports (OSINT, Telegram)
5. Flag potential misinformation or unconfirmed reports

Provide sharp, factual analysis. Focus on strategic implications. Write in clear analytical prose.`,
        messages: [{ role: "user", content: prompt }],
      });

      return res.status(200).json({
        text: message.content[0].text,
      });
    }

    // ─── MULTI-SOURCE INTELLIGENCE FEED ────────────────
    if (action === "intelligence") {
      const results = await gatherIntelligence(query);
      return res.status(200).json(results);
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

// ═══════════════════════════════════════════════════════════
// MULTI-SOURCE INTELLIGENCE GATHERING
// ═══════════════════════════════════════════════════════════

async function gatherIntelligence(query) {
  const allSources = [];

  // Run all sources in parallel
  const [twitterData, telegramData, webData] = await Promise.allSettled([
    fetchTwitter(query),
    fetchTelegram(query),
    scrapeWeb(query),
  ]);

  if (twitterData.status === "fulfilled") {
    allSources.push(...twitterData.value);
  }

  if (telegramData.status === "fulfilled") {
    allSources.push(...telegramData.value);
  }

  if (webData.status === "fulfilled") {
    allSources.push(...webData.value);
  }

  // Sort by timestamp (newest first)
  allSources.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return {
    sources: allSources,
    total: allSources.length,
    timestamp: new Date().toISOString(),
  };
}

// ─── TWITTER/X INTEGRATION ─────────────────────────────────
async function fetchTwitter(query) {
  if (!TWITTER_BEARER_TOKEN) {
    console.log("Twitter API key not configured");
    return [];
  }

  try {
    // Twitter accounts to monitor
    const accounts = [
      "Osinttechnical",
      "talhagin",
      "Shayan86",
      "AryJeay",
      "MenchOsint",
      "ME_Observer_",
      "Pataramesh",
      "iranianmil_ar",
      "iwasnevrhere_",
      "hmdmosavi",
      "DefenceGeek",
      "therealBehnamBT",
      "JanatanSayeh",
      "Osint613",
      "HRANA_English",
      "Reuters",
      "AP",
      "BBCWorld",
    ];

    // Build search query with keywords
    const keywords = extractKeywords(query);
    const searchQuery = `(${keywords.join(" OR ")}) (from:${accounts.join(" OR from:")})`;

    // Twitter API v2 - Recent Search
    const response = await fetch(
      `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(
        searchQuery
      )}&max_results=30&tweet.fields=created_at,author_id,public_metrics,entities&expansions=author_id,attachments.media_keys&media.fields=url,preview_image_url,type&user.fields=username,name,verified`,
      {
        headers: {
          Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Twitter API error:", response.status);
      return [];
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return [];
    }

    // Map users and media
    const users = {};
    const mediaMap = {};

    if (data.includes?.users) {
      data.includes.users.forEach((user) => {
        users[user.id] = user;
      });
    }

    if (data.includes?.media) {
      data.includes.media.forEach((media) => {
        mediaMap[media.media_key] = media;
      });
    }

    // Transform tweets to unified format
    return data.data.map((tweet) => {
      const author = users[tweet.author_id];
      const media = tweet.attachments?.media_keys?.map(key => mediaMap[key]).filter(Boolean) || [];

      return {
        id: `twitter-${tweet.id}`,
        source: "twitter",
        sourceType: "osint",
        sourceBadge: "X",
        headline: truncate(tweet.text, 150),
        content: tweet.text,
        author: author ? `@${author.username}` : "Unknown",
        authorName: author?.name || "Unknown",
        url: `https://twitter.com/${author?.username}/status/${tweet.id}`,
        timestamp: tweet.created_at,
        verified: isVerifiedAccount(author?.username, accounts),
        severity: classifySeverity(tweet.text),
        location: extractLocation(tweet.text),
        category: categorizeContent(tweet.text),
        media: media.map(m => ({
          type: m.type,
          url: m.url || m.preview_image_url,
          thumbnail: m.preview_image_url
        })),
        metrics: {
          likes: tweet.public_metrics?.like_count || 0,
          retweets: tweet.public_metrics?.retweet_count || 0,
          replies: tweet.public_metrics?.reply_count || 0,
        },
      };
    });
  } catch (error) {
    console.error("Twitter fetch error:", error);
    return [];
  }
}

// ─── TELEGRAM INTEGRATION ──────────────────────────────────
async function fetchTelegram(query) {
  if (!TELEGRAM_BOT_TOKEN) {
    console.log("Telegram bot token not configured");
    return [];
  }

  try {
    // Get updates from Telegram
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates?limit=50`
    );

    if (!response.ok) {
      console.error("Telegram API error:", response.status);
      return [];
    }

    const data = await response.json();
    const results = [];

    if (data.result && data.result.length > 0) {
      for (const update of data.result) {
        const post = update.channel_post || update.message;
        if (!post) continue;

        const text = post.text || post.caption || "";
        
        // Check relevance
        if (text && isRelevant(text, query)) {
          const channelUsername = post.chat?.username || "unknown";
          
          results.push({
            id: `telegram-${post.message_id}`,
            source: "telegram",
            sourceType: "monitor",
            sourceBadge: "TG",
            headline: truncate(text, 150),
            content: text,
            author: `@${channelUsername}`,
            authorName: post.chat?.title || channelUsername,
            url: `https://t.me/${channelUsername}/${post.message_id}`,
            timestamp: new Date(post.date * 1000).toISOString(),
            verified: true,
            severity: classifySeverity(text),
            location: extractLocation(text),
            category: categorizeContent(text),
            media: extractTelegramMedia(post),
            metrics: {
              views: post.views || 0,
            },
          });
        }
      }
    }

    return results;
  } catch (error) {
    console.error("Telegram fetch error:", error);
    return [];
  }
}

// ─── WEB SCRAPING ──────────────────────────────────────────
async function scrapeWeb(query) {
  const sources = [
    {
      name: "Al Jazeera",
      url: "https://www.aljazeera.com/middle-east/",
      type: "media",
    },
    {
      name: "Reuters",
      url: "https://www.reuters.com/world/middle-east/",
      type: "media",
    },
    {
      name: "Tasnim News",
      url: "https://www.tasnimnews.com/en",
      type: "official",
    },
    {
      name: "Press TV",
      url: "https://www.presstv.ir/",
      type: "official",
    },
    {
      name: "Iran MFA",
      url: "https://en.mfa.ir/",
      type: "official",
    },
    {
      name: "IRIB News",
      url: "https://www.iribnews.ir/en",
      type: "official",
    },
    {
      name: "Mehr News",
      url: "https://en.mehrnews.com/",
      type: "official",
    },
  ];

  const results = [];

  for (const source of sources) {
    try {
      const response = await fetch(source.url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        timeout: 5000,
      });

      if (!response.ok) continue;

      const html = await response.text();
      const headlines = extractHeadlines(html, source.name);

      headlines.forEach((headline, index) => {
        if (isRelevant(headline.text, query)) {
          results.push({
            id: `web-${source.name.toLowerCase().replace(/\s/g, "-")}-${index}`,
            source: "web",
            sourceType: source.type,
            sourceBadge: "WEB",
            headline: headline.text,
            content: headline.text,
            author: source.name,
            authorName: source.name,
            url: headline.url || source.url,
            timestamp: new Date().toISOString(),
            verified: true,
            severity: classifySeverity(headline.text),
            location: extractLocation(headline.text),
            category: categorizeContent(headline.text),
            media: [],
            metrics: {},
          });
        }
      });
    } catch (error) {
      console.error(`Web scraping error for ${source.name}:`, error.message);
    }
  }

  return results;
}

// ═══════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════

function extractKeywords(query) {
  const words = query.toLowerCase().split(/\s+/).filter((word) => word.length > 2);
  
  // Common Middle East keywords
  const defaults = [
    "Gaza", "Iran", "Israel", "Syria", "Yemen", "Lebanon",
    "missile", "strike", "attack", "military", "conflict"
  ];

  return [...new Set([...words, ...defaults])];
}

function classifySeverity(text) {
  const critical = [
    "missile", "strike", "explosion", "attack", "casualties",
    "killed", "bombing", "war", "dead", "airstrike"
  ];
  const high = [
    "operation", "raid", "clash", "bombardment", "offensive",
    "military", "combat", "assault"
  ];

  const lower = text.toLowerCase();

  if (critical.some((word) => lower.includes(word))) return "critical";
  if (high.some((word) => lower.includes(word))) return "high";
  return "medium";
}

function categorizeContent(text) {
  const lower = text.toLowerCase();
  
  if (/(missile|strike|attack|bombing|airstrike|explosion)/.test(lower)) return "attack";
  if (/(military|operation|forces|troops|defense)/.test(lower)) return "military";
  if (/(diplomatic|talks|negotiation|agreement|deal)/.test(lower)) return "diplomatic";
  if (/(casualties|humanitarian|aid|civilians|refugee)/.test(lower)) return "humanitarian";
  if (/(government|political|parliament|election)/.test(lower)) return "political";
  
  return "general";
}

function extractLocation(text) {
  const locations = [
    "Gaza", "Rafah", "Khan Younis", "Gaza City",
    "Syria", "Damascus", "Aleppo",
    "Iran", "Tehran", "Isfahan",
    "Iraq", "Baghdad", "Basra",
    "Lebanon", "Beirut", "South Lebanon",
    "Yemen", "Sana'a", "Aden",
    "Israel", "Tel Aviv", "Jerusalem",
    "West Bank", "Jenin", "Nablus",
    "Red Sea", "Persian Gulf", "Strait of Hormuz"
  ];

  for (const loc of locations) {
    if (text.includes(loc)) return loc;
  }

  return "Middle East";
}

function truncate(text, maxLength) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

function isVerifiedAccount(username, verifiedList) {
  if (!username) return false;
  return verifiedList.some(
    (verified) => verified.toLowerCase() === username.toLowerCase()
  );
}

function isRelevant(text, query) {
  if (!text) return false;
  
  const keywords = extractKeywords(query);
  const lower = text.toLowerCase();
  
  return keywords.some((keyword) => lower.includes(keyword.toLowerCase()));
}

function extractTelegramMedia(post) {
  const media = [];

  if (post.photo && Array.isArray(post.photo)) {
    const largest = post.photo[post.photo.length - 1];
    media.push({
      type: "photo",
      fileId: largest.file_id,
      url: `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${largest.file_path}`,
      thumbnail: largest.file_id,
    });
  }

  if (post.video) {
    media.push({
      type: "video",
      fileId: post.video.file_id,
      url: `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${post.video.file_path}`,
      thumbnail: post.video.thumb?.file_id,
    });
  }

  if (post.document && post.document.mime_type?.startsWith("video/")) {
    media.push({
      type: "video",
      fileId: post.document.file_id,
      url: `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${post.document.file_path}`,
    });
  }

  return media;
}

function extractHeadlines(html, sourceName) {
  const headlines = [];
  
  // Remove scripts and styles
  const cleanHtml = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // Common headline patterns
  const patterns = [
    /<h1[^>]*>(.*?)<\/h1>/gi,
    /<h2[^>]*>(.*?)<\/h2>/gi,
    /<h3[^>]*>(.*?)<\/h3>/gi,
    /<a[^>]*href="([^"]*)"[^>]*class="[^"]*headline[^"]*"[^>]*>(.*?)<\/a>/gi,
    /<a[^>]*class="[^"]*headline[^"]*"[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi,
  ];

  patterns.forEach((pattern) => {
    let match;
    const regex = new RegExp(pattern);
    while ((match = regex.exec(cleanHtml)) !== null && headlines.length < 10) {
      // Extract text (might be in group 1 or 2 depending on pattern)
      const text = (match[2] || match[1] || '').replace(/<[^>]*>/g, '').trim();
      const url = match[1]?.startsWith('http') ? match[1] : null;
      
      if (text && text.length > 20 && text.length < 300) {
        // Avoid duplicates
        if (!headlines.some(h => h.text === text)) {
          headlines.push({ text, url });
        }
      }
    }
  });

  return headlines.slice(0, 5);
}
