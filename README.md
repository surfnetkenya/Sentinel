# SENTINEL Intelligence Tracker - Fixed Version

## 🔧 What Was Fixed

**Primary Issue**: The frontend was calling the wrong API endpoint.

### Before (Broken):
```javascript
const API_URL = "https://api.anthropic.com/v1/messages";
```

### After (Fixed):
```javascript
const API_URL = "/api";
```

**Why this caused the error**: 
- Browser security (CORS) prevents direct calls to external APIs like Anthropic, X, and Telegram
- Your Vercel serverless function at `/api` acts as a proxy/backend
- The frontend must call `/api`, which then makes the external API calls server-side

---

## 📁 Correct File Structure

```
sentinel-tracker/
├── index.html           ← Frontend (fixed API_URL)
├── api/
│   └── index.js         ← Serverless function (backend)
├── package.json
└── vercel.json
```

---

## 🚀 Deployment Steps

### 1. Set Environment Variables in Vercel

Go to your Vercel project → **Settings** → **Environment Variables** and add:

| Variable Name | Value | Required? |
|--------------|-------|-----------|
| `CLAUDE_API_KEY` | Your Anthropic API key | ✅ Yes |
| `TWITTER_BEARER_TOKEN` | Your X/Twitter Bearer Token | Optional |
| `TELEGRAM_BOT_TOKEN` | Your Telegram Bot Token | Optional |

**Important**: Without `CLAUDE_API_KEY`, the AI analysis won't work. The other keys are optional but recommended for full functionality.

### 2. Deploy to Vercel

**Option A: Using Vercel CLI**
```bash
npm i -g vercel
cd sentinel-tracker
vercel
```

**Option B: Using Git + Vercel Dashboard**
1. Push code to GitHub
2. Import repository in Vercel
3. Deploy

### 3. Verify Deployment

After deployment, open your Vercel URL and check:
- ✅ Page loads without errors
- ✅ Search returns results (may be limited without API keys)
- ✅ AI analysis works (requires `CLAUDE_API_KEY`)

---

## 🔑 Getting API Keys

### Claude API (Required for AI Analysis)
1. Go to https://console.anthropic.com
2. Create API key
3. Add to Vercel as `CLAUDE_API_KEY`

### X/Twitter API (Optional)
1. Go to https://developer.twitter.com
2. Create app and get Bearer Token
3. Add to Vercel as `TWITTER_BEARER_TOKEN`
   
**Note**: Twitter API has usage limits. Free tier may be restricted.

### Telegram Bot API (Optional)
1. Message [@BotFather](https://t.me/botfather) on Telegram
2. Create new bot with `/newbot`
3. Copy the token
4. Add to Vercel as `TELEGRAM_BOT_TOKEN`

**Note**: For monitoring channels, your bot needs to be added as admin to those channels.

---

## 🐛 Troubleshooting

### "Failed to fetch" Error
- ✅ **Fixed**: API_URL now points to `/api` instead of external URL
- Check browser console (F12) for specific errors
- Verify environment variables are set in Vercel

### "Analysis unavailable" 
- Missing `CLAUDE_API_KEY` environment variable
- Check API key is valid at https://console.anthropic.com

### No Twitter/Telegram Results
- Missing API keys (optional feature)
- Twitter API rate limits
- Telegram bot not added to channels

### Empty Feed
- No matching results for search query
- API keys not configured
- Try broader search terms like "Gaza" or "Iran"

---

## 📊 Features

### ✅ Working Features (with proper keys):
- 🔍 Multi-source intelligence gathering
- 🤖 Claude AI analysis
- 🐦 X/Twitter OSINT monitoring
- 📱 Telegram channel monitoring
- 🌐 News website scraping
- ⚠️ Severity classification
- 📍 Location extraction
- 📊 Real-time feed updates

### 🔧 Backend API Routes:
- `POST /api` with `action: "claude"` → AI analysis
- `POST /api` with `action: "intelligence"` → Multi-source feed

---

## 🔐 Security Notes

- ✅ API keys are server-side only (never exposed to browser)
- ✅ CORS headers configured for frontend access
- ✅ Environment variables managed by Vercel
- ⚠️ Rate limiting recommended for production use

---

## 📝 Next Steps

1. Deploy fixed version to Vercel
2. Configure environment variables
3. Test each feature
4. Monitor Vercel function logs for errors
5. Consider adding rate limiting for production

---

## 🆘 Still Having Issues?

Check Vercel deployment logs:
1. Go to Vercel Dashboard
2. Click on your deployment
3. Go to "Functions" tab
4. Check logs for `/api/index.js`

Common log errors:
- `CLAUDE_API_KEY is not defined` → Add environment variable
- `Twitter API error: 401` → Invalid Twitter token
- `Telegram API error: 404` → Invalid bot token
