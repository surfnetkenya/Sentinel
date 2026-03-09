// SENTINEL Global Intelligence Platform API
// Multi-Source Intelligence System: RSS, Twitter, Telegram, Web Scraping, Google Gemini AI
// Regional Coverage: Americas, Europe, Africa/ME, Asia, Oceania

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// API Keys
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

  const { action, prompt, query, region, category } = req.body;

  try {
    // ─── GOOGLE GEMINI AI ANALYSIS ──────────────────────────
    if (action === "claude") {  // Keep same action name for compatibility
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1500,
        }
      });

      const systemPrompt = `You are SENTINEL, a senior global intelligence analyst with deep expertise in geopolitics, military conflicts, economics, and technology.

Your intelligence sources span:
- Global wire services (AP, Reuters, AFP, Bloomberg)
- Regional media across all continents
- State media from major powers (China, Russia, US, EU)
- Defense and military publications
- Business and economic intelligence
- Technology and cybersecurity sources
- Humanitarian organizations (UN, ICRC)

When analyzing multi-source intelligence:
1. Cross-reference claims across different regional perspectives
2. Note verification status and source credibility
3. Highlight key entities, locations, and implications with **bold**
4. Distinguish between official positions, media reports, and field intelligence
5. Identify potential misinformation or propaganda
6. Provide strategic context and geopolitical implications

Provide sharp, factual analysis. Focus on strategic significance. Write in clear analytical prose.`;

      const fullPrompt = `${systemPrompt}\n\nAnalyze this intelligence:\n${prompt}`;
      
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      return res.status(200).json({
        text: text,
      });
    }

    // ─── MULTI-SOURCE INTELLIGENCE FEED ────────────────
    if (action === "intelligence") {
      const results = await gatherIntelligence(query, region, category);
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
// INTELLIGENCE GATHERING
// ═══════════════════════════════════════════════════════════

async function gatherIntelligence(query, region = 'all', category = 'all') {
  const allSources = [];

  // Run all sources in parallel
  const [twitterData, telegramData, rssData, webData] = await Promise.allSettled([
    fetchTwitter(query, region, category),
    fetchTelegram(query, region, category),
    fetchRSSFeeds(query, region, category),
    scrapeWeb(query, region, category),
  ]);

  if (twitterData.status === "fulfilled") {
    allSources.push(...twitterData.value);
  }

  if (telegramData.status === "fulfilled") {
    allSources.push(...telegramData.value);
  }

  if (rssData.status === "fulfilled") {
    allSources.push(...rssData.value);
  }

  if (webData.status === "fulfilled") {
    allSources.push(...webData.value);
  }

  // Sort by timestamp (newest first)
  allSources.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return {
    sources: allSources,
    total: allSources.length,
    region: region,
    category: category,
    timestamp: new Date().toISOString(),
  };
}

// ═══════════════════════════════════════════════════════════
// RSS FEED SOURCES (COMPREHENSIVE GLOBAL COVERAGE)
// ═══════════════════════════════════════════════════════════

const RSS_FEEDS = {
  // International & Wire Services
  international: [
    { name: "Reuters", url: "https://www.reuters.com/world", region: "all", category: "all", priority: "critical" },
    { name: "Associated Press", url: "https://feeds.apnews.com/rss/apf-topnews", region: "all", category: "all", priority: "critical" },
    { name: "AFP", url: "https://www.afp.com/en/feed", region: "all", category: "all", priority: "critical" },
    { name: "BBC World", url: "http://feeds.bbci.co.uk/news/world/rss.xml", region: "all", category: "all", priority: "high" },
  ],
  
  // AMERICAS
  americas_usa: [
    { name: "CNN", url: "http://rss.cnn.com/rss/cnn_topstories.rss", region: "americas", category: "all", priority: "high" },
    { name: "NPR", url: "https://feeds.npr.org/1001/rss.xml", region: "americas", category: "all", priority: "high" },
    { name: "Fox News Politics", url: "http://feeds.foxnews.com/foxnews/politics", region: "americas", category: "politics", priority: "medium" },
    { name: "Wall Street Journal", url: "https://feeds.a.dj.com/rss/RSSWorldNews.xml", region: "americas", category: "business", priority: "high" },
  ],
  
  americas_latam: [
    { name: "Globo Brazil", url: "https://g1.globo.com/dynamo/rss2.xml", region: "americas", category: "all", priority: "medium" },
    { name: "La Nación Argentina", url: "https://www.lanacion.com.ar/arc/outboundfeeds/rss/", region: "americas", category: "all", priority: "medium" },
  ],
  
  // EUROPE
  europe_west: [
    { name: "The Guardian", url: "https://www.theguardian.com/world/rss", region: "europe", category: "all", priority: "high" },
    { name: "Financial Times", url: "https://www.ft.com/?format=rss", region: "europe", category: "business", priority: "high" },
    { name: "Deutsche Welle", url: "https://rss.dw.com/rdf/rss-en-all", region: "europe", category: "all", priority: "high" },
    { name: "France 24", url: "https://www.france24.com/en/rss", region: "europe", category: "all", priority: "high" },
    { name: "Der Spiegel", url: "https://www.spiegel.de/international/index.rss", region: "europe", category: "all", priority: "medium" },
  ],
  
  europe_east: [
    { name: "RT (Russia)", url: "https://www.rt.com/rss/", region: "europe", category: "all", priority: "high" },
    { name: "TASS", url: "https://tass.com/rss/v2.xml", region: "europe", category: "all", priority: "high" },
    { name: "Interfax", url: "https://www.interfax.ru/rss.asp", region: "europe", category: "all", priority: "medium" },
  ],
  
  // AFRICA & MIDDLE EAST
  middleeast: [
    { name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml", region: "africa_middleeast", category: "all", priority: "critical" },
    { name: "Al Arabiya", url: "https://www.alarabiya.net/articles.rss", region: "africa_middleeast", category: "all", priority: "high" },
    { name: "Middle East Eye", url: "https://www.middleeasteye.net/rss", region: "africa_middleeast", category: "all", priority: "high" },
    { name: "Times of Israel", url: "https://www.timesofisrael.com/feed/", region: "africa_middleeast", category: "all", priority: "high" },
    { name: "Haaretz", url: "https://www.haaretz.com/cmlink/1.628752", region: "africa_middleeast", category: "all", priority: "medium" },
    { name: "Press TV Iran", url: "https://www.presstv.ir/rss", region: "africa_middleeast", category: "all", priority: "high" },
    { name: "Tasnim News", url: "https://www.tasnimnews.com/en/rss/feed/0", region: "africa_middleeast", category: "all", priority: "medium" },
    { name: "Arab News", url: "https://www.arabnews.com/rss.xml", region: "africa_middleeast", category: "all", priority: "medium" },
  ],
  
  africa: [
    { name: "News24 South Africa", url: "https://feeds.24.com/articles/news24/TopStories/rss", region: "africa_middleeast", category: "all", priority: "medium" },
    { name: "Daily Maverick", url: "https://www.dailymaverick.co.za/feed/", region: "africa_middleeast", category: "all", priority: "medium" },
  ],
  
  // ASIA
  asia_east: [
    { name: "Xinhua China", url: "http://www.xinhuanet.com/english/rss/worldrss.xml", region: "asia", category: "all", priority: "critical" },
    { name: "China Daily", url: "https://www.chinadaily.com.cn/rss/world_rss.xml", region: "asia", category: "all", priority: "high" },
    { name: "Global Times", url: "https://www.globaltimes.cn/rss/outbrain.xml", region: "asia", category: "all", priority: "high" },
    { name: "NHK World Japan", url: "https://www3.nhk.or.jp/rss/news/cat0.xml", region: "asia", category: "all", priority: "high" },
    { name: "Japan Times", url: "https://www.japantimes.co.jp/feed/", region: "asia", category: "all", priority: "medium" },
    { name: "Yonhap Korea", url: "https://en.yna.co.kr/RSS/northkorea.xml", region: "asia", category: "all", priority: "high" },
  ],
  
  asia_south: [
    { name: "Times of India", url: "https://timesofindia.indiatimes.com/rssfeedstopstories.cms", region: "asia", category: "all", priority: "high" },
    { name: "The Hindu", url: "https://www.thehindu.com/news/national/feeder/default.rss", region: "asia", category: "all", priority: "high" },
    { name: "NDTV India", url: "https://feeds.feedburner.com/ndtvnews-top-stories", region: "asia", category: "all", priority: "medium" },
  ],
  
  asia_southeast: [
    { name: "Straits Times Singapore", url: "https://www.straitstimes.com/news/singapore/rss.xml", region: "asia", category: "all", priority: "high" },
    { name: "Channel NewsAsia", url: "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml", region: "asia", category: "all", priority: "medium" },
  ],
  
  // OCEANIA
  oceania: [
    { name: "ABC News Australia", url: "https://www.abc.net.au/news/feed/51120/rss.xml", region: "oceania", category: "all", priority: "high" },
    { name: "Sydney Morning Herald", url: "https://www.smh.com.au/rss/feed.xml", region: "oceania", category: "all", priority: "medium" },
    { name: "NZ Herald", url: "https://www.nzherald.co.nz/arc/outboundfeeds/rss/", region: "oceania", category: "all", priority: "medium" },
  ],
  
  // TECH & CYBER
  tech: [
    { name: "TechCrunch", url: "https://techcrunch.com/feed/", region: "all", category: "tech", priority: "high" },
    { name: "The Verge", url: "https://www.theverge.com/rss/index.xml", region: "all", category: "tech", priority: "high" },
    { name: "Wired", url: "https://www.wired.com/feed/rss", region: "all", category: "tech", priority: "medium" },
    { name: "Krebs on Security", url: "https://krebsonsecurity.com/feed/", region: "all", category: "tech", priority: "high" },
    { name: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews", region: "all", category: "tech", priority: "high" },
  ],
  
  // BUSINESS & ECONOMY
  business: [
    { name: "Bloomberg", url: "https://www.bloomberg.com/feed/podcast/big-take.xml", region: "all", category: "business", priority: "critical" },
    { name: "The Economist", url: "https://www.economist.com/the-world-this-week/rss.xml", region: "all", category: "business", priority: "high" },
    { name: "Forbes", url: "https://www.forbes.com/real-time/feed2/", region: "all", category: "business", priority: "medium" },
  ],
  
  // DEFENSE & MILITARY
  defense: [
    { name: "Defense News", url: "https://www.defensenews.com/arc/outboundfeeds/rss/", region: "all", category: "military", priority: "high" },
    { name: "Military Times", url: "https://www.militarytimes.com/arc/outboundfeeds/rss/", region: "all", category: "military", priority: "medium" },
  ],
  
  // HUMANITARIAN
  humanitarian: [
    { name: "UN News", url: "https://news.un.org/feed/subscribe/en/news/all/rss.xml", region: "all", category: "all", priority: "high" },
    { name: "ICRC", url: "https://www.icrc.org/en/rss-feeds", region: "all", category: "all", priority: "medium" },
  ],
};

// ─── RSS FEED INTEGRATION ──────────────────────────────
async function fetchRSSFeeds(query, region = 'all', category = 'all') {
  const results = [];
  const keywords = extractKeywords(query);
  
  // Get relevant feeds based on region and category
  const relevantFeeds = getRelevantFeeds(region, category);
  
  // Fetch feeds in parallel (limit to 10 concurrent)
  const feedPromises = relevantFeeds.slice(0, 10).map(feed => 
    fetchAndParseRSS(feed, keywords).catch(err => {
      console.error(`RSS fetch error for ${feed.name}:`, err.message);
      return [];
    })
  );

  const feedResults = await Promise.all(feedPromises);
  
  feedResults.forEach(items => {
    results.push(...items);
  });

  return results;
}

function getRelevantFeeds(region, category) {
  const feeds = [];
  
  // Always include international feeds
  feeds.push(...RSS_FEEDS.international);
  
  // Add region-specific feeds
  if (region === 'all' || region === 'americas') {
    feeds.push(...RSS_FEEDS.americas_usa, ...RSS_FEEDS.americas_latam);
  }
  if (region === 'all' || region === 'europe') {
    feeds.push(...RSS_FEEDS.europe_west, ...RSS_FEEDS.europe_east);
  }
  if (region === 'all' || region === 'africa_middleeast') {
    feeds.push(...RSS_FEEDS.middleeast, ...RSS_FEEDS.africa);
  }
  if (region === 'all' || region === 'asia') {
    feeds.push(...RSS_FEEDS.asia_east, ...RSS_FEEDS.asia_south, ...RSS_FEEDS.asia_southeast);
  }
  if (region === 'all' || region === 'oceania') {
    feeds.push(...RSS_FEEDS.oceania);
  }
  
  // Add category-specific feeds
  if (category === 'tech' || category === 'all') {
    feeds.push(...RSS_FEEDS.tech);
  }
  if (category === 'business' || category === 'all') {
    feeds.push(...RSS_FEEDS.business);
  }
  if (category === 'military' || category === 'all') {
    feeds.push(...RSS_FEEDS.defense);
  }
  
  // Always include humanitarian
  feeds.push(...RSS_FEEDS.humanitarian);
  
  return feeds;
}

async function fetchAndParseRSS(feed, keywords) {
  try {
    const response = await fetch(feed.url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SentinelBot/2.0)",
        "Accept": "application/rss+xml, application/xml, text/xml"
      },
      timeout: 8000
    });

    if (!response.ok) {
      console.log(`RSS feed ${feed.name} returned ${response.status}`);
      return [];
    }

    const xml = await response.text();
    const items = parseRSSXML(xml, feed, keywords);
    
    return items;
  } catch (error) {
    console.error(`Error fetching ${feed.name}:`, error.message);
    return [];
  }
}

function parseRSSXML(xml, feed, keywords) {
  const results = [];
  const isAtom = xml.includes('<feed') || xml.includes('xmlns="http://www.w3.org/2005/Atom"');
  
  let items;
  if (isAtom) {
    items = xml.match(/<entry[^>]*>[\s\S]*?<\/entry>/gi) || [];
  } else {
    items = xml.match(/<item[^>]*>[\s\S]*?<\/item>/gi) || [];
  }

  items.slice(0, 20).forEach((item, index) => {
    try {
      let title, link, pubDate, description, content;

      if (isAtom) {
        title = extractTag(item, 'title');
        link = item.match(/<link[^>]*href="([^"]+)"/)?.[1] || '';
        pubDate = extractTag(item, 'updated') || extractTag(item, 'published');
        description = extractTag(item, 'summary') || extractTag(item, 'content');
        content = extractTag(item, 'content') || description;
      } else {
        title = extractTag(item, 'title');
        link = extractTag(item, 'link');
        pubDate = extractTag(item, 'pubDate') || extractTag(item, 'dc:date');
        description = extractTag(item, 'description');
        content = extractTag(item, 'content:encoded') || description;
      }

      title = decodeHTML(stripHTML(title));
      description = decodeHTML(stripHTML(description || ''));
      content = decodeHTML(stripHTML(content || ''));

      const fullText = `${title} ${description} ${content}`.toLowerCase();

      if (title && isRelevant(fullText, keywords.join(' '))) {
        results.push({
          id: `rss-${feed.name.toLowerCase().replace(/\s+/g, '-')}-${index}`,
          source: "rss",
          sourceType: "media",
          sourceBadge: "RSS",
          headline: truncate(title, 150),
          content: description || title,
          author: feed.name,
          authorName: feed.name,
          url: link || feed.url,
          timestamp: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
          verified: true,
          severity: classifySeverity(fullText),
          location: extractLocation(fullText),
          category: determineCategory(fullText, feed.category),
          media: [],
          metrics: {},
        });
      }
    } catch (err) {
      console.error('Error parsing RSS item:', err.message);
    }
  });

  return results;
}

// ─── TWITTER/X INTEGRATION ─────────────────────────────────
async function fetchTwitter(query, region, category) {
  if (!TWITTER_BEARER_TOKEN) {
    console.log("Twitter API key not configured");
    return [];
  }

  try {
    const accounts = getTwitterAccounts(region, category);
    const keywords = extractKeywords(query);
    const searchQuery = `(${keywords.join(" OR ")}) (from:${accounts.join(" OR from:")})`;

    const response = await fetch(
      `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(
        searchQuery
      )}&max_results=30&tweet.fields=created_at,author_id&expansions=author_id&user.fields=username,name`,
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

    const users = {};
    if (data.includes?.users) {
      data.includes.users.forEach((user) => {
        users[user.id] = user;
      });
    }

    return data.data.map((tweet) => {
      const author = users[tweet.author_id];

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
        verified: true,
        severity: classifySeverity(tweet.text),
        location: extractLocation(tweet.text),
        category: determineCategory(tweet.text, category),
        media: [],
        metrics: {},
      };
    });
  } catch (error) {
    console.error("Twitter fetch error:", error);
    return [];
  }
}

function getTwitterAccounts(region, category) {
  // Curated Twitter accounts by region and category
  const accounts = [
    "Reuters", "AP", "AFP", "BBCWorld",
    "AJEnglish", "CNN", "Guardian",
    "DefenseOne", "JanesDefence",
  ];
  
  // Add region-specific accounts
  if (region === 'americas') accounts.push("CNN", "NPR", "WSJ");
  if (region === 'europe') accounts.push("euronews", "DW");
  if (region === 'africa_middleeast') accounts.push("AlArabiya_Eng", "Haaretz");
  if (region === 'asia') accounts.push("XHNews", "NHK_WORLD");
  
  return accounts;
}

// ─── TELEGRAM INTEGRATION ──────────────────────────────────
async function fetchTelegram(query, region, category) {
  if (!TELEGRAM_BOT_TOKEN) {
    console.log("Telegram bot token not configured");
    return [];
  }

  try {
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
            category: determineCategory(text, category),
            media: [],
            metrics: {},
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
async function scrapeWeb(query, region, category) {
  // Simplified web scraping - could be expanded
  return [];
}

// ═══════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════

function extractKeywords(query) {
  const words = query.toLowerCase().split(/\s+/).filter((word) => word.length > 2);
  return [...new Set(words)];
}

function classifySeverity(text) {
  const critical = [
    "war", "attack", "strike", "missile", "bombing", "killed", "dead",
    "casualties", "invasion", "nuclear", "chemical", "biological"
  ];
  const high = [
    "conflict", "military", "troops", "operation", "offensive", "clash",
    "combat", "crisis", "emergency", "threat"
  ];

  const lower = text.toLowerCase();

  if (critical.some((word) => lower.includes(word))) return "critical";
  if (high.some((word) => lower.includes(word))) return "high";
  return "medium";
}

function determineCategory(text, feedCategory) {
  if (feedCategory && feedCategory !== 'all') return feedCategory;
  
  const lower = text.toLowerCase();
  
  if (/(war|military|defense|weapon|army|navy|troops|combat)/.test(lower)) return "military";
  if (/(trade|economy|market|stock|business|finance|gdp)/.test(lower)) return "business";
  if (/(cyber|hack|technology|ai|software|digital|crypto)/.test(lower)) return "tech";
  if (/(election|government|parliament|president|policy|law)/.test(lower)) return "politics";
  if (/(conflict|diplomatic|alliance|treaty|sanction|summit)/.test(lower)) return "geopolitics";
  
  return "geopolitics";
}

function extractLocation(text) {
  const globalLocations = [
    "Washington", "Beijing", "Moscow", "London", "Paris", "Berlin",
    "Tokyo", "Delhi", "Seoul", "Tehran", "Riyadh", "Cairo",
    "Brasilia", "Mexico City", "Ottawa", "Canberra", "Wellington",
    "Ukraine", "Russia", "China", "USA", "UK", "France", "Germany",
    "Japan", "India", "South Korea", "Iran", "Saudi Arabia",
    "Gaza", "Israel", "Syria", "Iraq", "Taiwan", "North Korea"
  ];

  for (const loc of globalLocations) {
    if (text.includes(loc)) return loc;
  }

  return "Global";
}

function truncate(text, maxLength) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

function isRelevant(text, query) {
  if (!text) return false;
  const keywords = extractKeywords(query);
  const lower = text.toLowerCase();
  return keywords.some((keyword) => lower.includes(keyword.toLowerCase()));
}

function extractTag(xml, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\/${tagName}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
}

function stripHTML(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function decodeHTML(text) {
  const entities = {
    '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"',
    '&#039;': "'", '&apos;': "'", '&nbsp;': ' ',
    '&#8217;': "'", '&#8220;': '"', '&#8221;': '"',
    '&#8211;': '–', '&#8212;': '—'
  };
  return text.replace(/&[#a-z0-9]+;/gi, match => entities[match] || match);
}
