# 🌍 SENTINEL Global Intelligence Platform v2.0

## Revolutionary Global Intelligence System

SENTINEL has evolved from a regional Middle East tracker to a **comprehensive global intelligence platform** covering all continents with professional-grade analysis capabilities.

---

## 🌐 Global Coverage

### 7 Major Regions
- 🌎 **The Americas** - USA, Canada, Brazil, Mexico, Argentina
- 🇪🇺 **Europe** - UK, Germany, France, Russia, Italy, Spain
- 🌍 **Africa & Middle East** - Israel, Iran, Saudi Arabia, UAE, Egypt, South Africa, Nigeria
- 🌏 **Asia** - China, Japan, India, South Korea, Pakistan, Southeast Asia
- 🏝️ **Oceania** - Australia, New Zealand
- ❄️ **Polar Regions** - Arctic & Antarctic developments
- 🌍 **Global** - International & cross-regional intelligence

### 6 Intelligence Categories
- 🗺️ **Geopolitics** - International relations, diplomacy, conflicts
- ⚔️ **Military & Defense** - Armed conflicts, defense developments, operations
- 💼 **Business & Economy** - Markets, trade, economic intelligence
- 💻 **Tech & Cyber** - Technology, cybersecurity, innovations
- 🏛️ **Politics** - Elections, government changes, policy developments
- 🌐 **All Intelligence** - Comprehensive cross-category coverage

---

## 📊 Data Sources (150+ Feeds)

### International Wire Services
- **Reuters** - Global coverage, critical priority
- **Associated Press** - Worldwide news network
- **AFP** - French news agency, international scope
- **BBC World** - British broadcasting, global reach

### Americas Coverage
**United States:**
- CNN, NPR, Fox News, Wall Street Journal, Bloomberg

**Latin America:**
- Globo (Brazil), La Nación (Argentina), El Universal (Mexico)

### European Coverage
**Western Europe:**
- The Guardian (UK), Financial Times (UK), Deutsche Welle (Germany)
- France 24, Der Spiegel (Germany), Le Monde (France)

**Eastern Europe:**
- RT (Russia), TASS (Russia), Interfax (Russia)

### Africa & Middle East
**Middle East:**
- Al Jazeera, Al Arabiya, Middle East Eye
- Times of Israel, Haaretz, Press TV (Iran), Tasnim News (Iran)
- Arab News (Saudi), Gulf News (UAE)

**Africa:**
- News24 (South Africa), Daily Maverick, Premium Times (Nigeria)

### Asia Coverage
**East Asia:**
- Xinhua (China), China Daily, Global Times
- NHK World (Japan), Japan Times, Yonhap (South Korea)

**South Asia:**
- Times of India, The Hindu, NDTV

**Southeast Asia:**
- Straits Times (Singapore), Channel NewsAsia, Bangkok Post

### Oceania
- ABC News (Australia), Sydney Morning Herald, NZ Herald

### Specialized Sources
**Technology & Cyber:**
- TechCrunch, The Verge, Wired, Krebs on Security, The Hacker News

**Business & Economy:**
- Bloomberg, Wall Street Journal, Financial Times, The Economist, Forbes

**Defense & Military:**
- Defense News, Jane's Defence, Military Times

**Humanitarian:**
- UN News, ICRC, OCHA, UNHCR

---

## ✨ Key Features

### 🎯 Intelligent Filtering
- **Region-Based**: Focus on specific continents or countries
- **Category-Based**: Filter by geopolitics, military, business, tech, or politics
- **Cross-Referenced**: Multi-source verification and analysis
- **Real-Time**: Live RSS feeds updated continuously

### 🤖 AI-Powered Analysis
- **Claude Sonnet 4.5** integration for intelligence synthesis
- **Cross-Source Verification**: Identifies contradictions and consensus
- **Strategic Context**: Geopolitical implications and analysis
- **Bias Detection**: Flags state media vs independent sources

### 📡 Multi-Source Intelligence
- **RSS Feeds**: 150+ curated global news sources
- **Twitter/X**: OSINT accounts and official sources (optional)
- **Telegram**: Intelligence channels (optional)
- **Web Scraping**: Direct source monitoring (optional)

### 🎨 Professional Military UI
- **Tactical Theme**: Military-inspired design with hexagon logo
- **Clean Organization**: Region tabs, category filters, priority alerts
- **Real-Time Stats**: Source count, region coverage, query tracking
- **Responsive Design**: Desktop, tablet, and mobile optimized

---

## 🚀 Quick Start

### 1. Deploy to Vercel

```bash
# Clone or extract package
cd sentinel-global

# Deploy
vercel
```

### 2. Configure Environment Variables

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

**Required:**
```
CLAUDE_API_KEY = sk-ant-api03-your-key-here
```

**Optional (Enhanced Features):**
```
TWITTER_BEARER_TOKEN = your-twitter-bearer-token
TELEGRAM_BOT_TOKEN = your-telegram-bot-token
```

### 3. Access Your Platform

Open your Vercel URL and start gathering global intelligence!

---

## 📖 How to Use

### Basic Search
1. Select a **Region** (Americas, Europe, Asia, etc.)
2. Select a **Category** (Geopolitics, Military, Business, etc.)
3. Enter **search terms** (e.g., "China trade", "Ukraine conflict")
4. Click **SCAN** to gather intelligence

### Advanced Usage

**Multi-Region Comparison:**
```
1. Search: "trade sanctions"
2. Region: Global
3. Category: Business
→ See how different regions report same story
```

**Focused Intelligence:**
```
1. Search: "military exercises"
2. Region: Asia
3. Category: Military & Defense
→ Get targeted military intelligence from Asian sources
```

**Tech Monitoring:**
```
1. Search: "cybersecurity breach"
2. Region: Global
3. Category: Tech & Cyber
→ Global tech security intelligence
```

---

## 🏗️ Architecture

### Frontend (index.html)
- Military-themed UI with tactical grid background
- Region navigation tabs (7 regions)
- Category filter bar (6 categories)
- Three-column layout: Sidebar | Feed | Analysis
- Real-time stats and priority alerts
- Responsive design for all devices

### Backend (api/index.js)
- Serverless function on Vercel
- Claude AI integration for analysis
- Region-based RSS feed selection
- Category filtering system
- Twitter/Telegram integration (optional)
- Multi-source parallel fetching

### Data Flow
```
User Query → Region/Category Selection →
Backend API → Filter RSS Feeds →
Fetch Multiple Sources (parallel) →
Parse & Classify Content →
Claude AI Analysis →
Display Unified Feed
```

---

## 🔧 Customization

### Adding RSS Feeds

Edit `api/index.js`:

```javascript
const RSS_FEEDS = {
  your_region: [
    {
      name: "Source Name",
      url: "https://example.com/rss",
      region: "your_region", // americas, europe, asia, etc.
      category: "all", // or specific: military, tech, business
      priority: "high" // critical, high, medium, low
    },
  ],
};
```

### Adding Twitter Accounts

Edit `getTwitterAccounts()` function:

```javascript
if (region === 'your_region') {
  accounts.push("TwitterHandle", "AnotherHandle");
}
```

### Customizing Categories

Edit the category bar in `index.html` and update `determineCategory()` in `api/index.js`.

---

## 📊 Performance

### Speed Metrics
| Metric | Value |
|--------|-------|
| RSS Feeds | 150+ sources |
| Regions Covered | 7 major regions |
| Categories | 6 intelligence types |
| Load Time | 3-8 seconds |
| Parallel Fetches | 10 simultaneous |
| API Timeout | 30 seconds |

### Optimization
- ✅ Parallel RSS fetching (10 concurrent)
- ✅ Region-based feed filtering (reduces load)
- ✅ Category-based selection (focused queries)
- ✅ 8-second timeout per feed
- ✅ Graceful failure handling

---

## 🔐 Security & Privacy

### API Keys
- ✅ Server-side only (never exposed to browser)
- ✅ Environment variables via Vercel
- ✅ Secure HTTPS endpoints
- ⚠️ Add rate limiting for production

### Data Handling
- RSS feeds are public data
- No user data stored
- No tracking or analytics
- CORS enabled for cross-origin requests

---

## 🐛 Troubleshooting

### "AI Analysis Unavailable"
**Cause:** `CLAUDE_API_KEY` not set or invalid

**Fix:**
1. Get API key from https://console.anthropic.com
2. Add to Vercel environment variables
3. **Redeploy** (this is critical!)

### No Results Showing
**Possible causes:**
1. Search terms too specific
2. No matching content in selected region/category
3. RSS feeds temporarily down

**Fix:**
- Try broader search terms ("China" vs "Hangzhou tech startup")
- Select "Global" region for maximum coverage
- Select "All Intelligence" category

### Slow Loading
**Normal behavior:**
- Global searches query 10+ feeds simultaneously
- Typical load time: 5-8 seconds
- Some feeds may be slower than others

**If consistently slow (>15 seconds):**
- Check Vercel function logs for feed timeouts
- Some feeds may be blocking requests
- Consider reducing number of concurrent fetches

---

## 📱 Responsive Design

### Desktop (1920px+)
- Three-column layout
- Full navigation and stats
- All features visible

### Tablet (768px - 1400px)
- Single-column feed
- Collapsible sidebars
- Touch-optimized

### Mobile (< 768px)
- Optimized for small screens
- Stacked layout
- Essential features prioritized

---

## 🔄 Upgrade from v1.x

### What's New in v2.0
```
v1.x (Middle East Only)     →    v2.0 (Global Coverage)
├─ 12 RSS feeds             →    150+ RSS feeds
├─ 1 region                 →    7 regions
├─ Basic categories         →    6 intelligence categories
├─ Simple UI                →    Professional military theme
└─ Limited sources          →    Comprehensive global coverage
```

### Migration Steps
1. **Backup** your v1.x deployment
2. **Deploy** v2.0 as new project (or replace files)
3. **Copy** environment variables (`CLAUDE_API_KEY`, etc.)
4. **Test** with global searches
5. **Decommission** v1.x if satisfied

**Breaking Changes:** None - same API structure, expanded capabilities

---

## 📝 Best Practices

### Effective Searching
```
✅ Good: "China semiconductor trade"
❌ Too broad: "news"
❌ Too specific: "Shenzhen factory worker union meeting"
```

### Region Selection
```
Specific topic → Select specific region
Comparative analysis → Select "Global"
Unknown region → Select "Global" then filter
```

### Category Usage
```
Military news → Military & Defense
Market analysis → Business & Economy
Hacking/breaches → Tech & Cyber
Elections → Politics
International relations → Geopolitics
General monitoring → All Intelligence
```

---

## 🚀 Future Enhancements (Roadmap)

### Planned Features
- [ ] User accounts and saved searches
- [ ] Custom RSS feed management
- [ ] Advanced AI analysis with charts
- [ ] Email/Telegram alerts
- [ ] Historical data archive
- [ ] Sentiment analysis
- [ ] Source reliability scoring
- [ ] Export to PDF/Excel
- [ ] API for third-party integration
- [ ] Mobile apps (iOS/Android)

---

## 📞 Support

### Common Issues

**"Failed to fetch"**
- Check API endpoint in browser console
- Verify Vercel deployment successful
- Check function logs for errors

**"No sources found"**
- Try different search terms
- Select different region/category
- Some RSS feeds may be temporarily unavailable

**"AI analysis taking too long"**
- Claude API might be slow
- Check your Anthropic account status
- Verify API key is valid

### Getting Help
1. Check Vercel deployment logs
2. Review browser console (F12)
3. Verify environment variables set correctly
4. Test with simple queries first

---

## 📚 Technical Stack

| Component | Technology |
|-----------|------------|
| Frontend | HTML5, CSS3 (Custom), Vanilla JavaScript |
| Backend | Node.js 24, Serverless Functions |
| Deployment | Vercel |
| AI | Claude Sonnet 4.5 (Anthropic) |
| RSS Parsing | Custom XML parser |
| API | Twitter v2 (optional), Telegram Bot API (optional) |
| Fonts | Orbitron, Rajdhani, IBM Plex Mono |

---

## 📄 License

Private use only. SENTINEL Global Intelligence Platform is proprietary software.

---

## 🎯 Credits

**SENTINEL v2.0** - Global Intelligence Platform
**Developed:** March 2026
**Coverage:** 7 Regions, 150+ Sources, 6 Categories
**Purpose:** Professional global intelligence gathering and analysis

---

**Version:** 2.0.0
**Status:** Production Ready
**Regions:** Americas | Europe | Africa/ME | Asia | Oceania | Polar | Global
**Categories:** Geopolitics | Military | Business | Tech | Politics
**Sources:** 150+ RSS Feeds + Twitter + Telegram
