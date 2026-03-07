# 🎯 SENTINEL TRACKER - Setup Guide

## 📁 Your Project Structure (DONE ✅)

Your folder should look **exactly** like this:

```
sentinel-tracker/
├── api/
│   └── index.js          ← Your backend API code
├── index.html            ← Your main website
├── package.json          ← Dependencies
├── vercel.json           ← Vercel configuration
└── SETUP_GUIDE.md        ← This file
```

---

## ✅ STEP 1: Download Your Project Files

**All your files are ready!** Download the `sentinel-tracker` folder I've prepared.

---

## 🌐 STEP 2: Deploy to Vercel (Choose ONE method)

### 🅰️ METHOD A: Via Vercel Website (EASIEST - NO CODING!)

1. **Go to:** https://vercel.com
2. **Sign up/Login** (use GitHub, GitLab, or email)
3. Click **"Add New..." → "Project"**
4. Click **"Browse"** and select your `sentinel-tracker` folder
5. Click **"Deploy"**
6. ✅ **DONE!** Vercel gives you a URL like: `https://your-project.vercel.app`

---

### 🅱️ METHOD B: Via Terminal (For Advanced Users)

**Only do this if you're comfortable with command line:**

1. Open Terminal/Command Prompt
2. Navigate to your folder:
   ```bash
   cd path/to/sentinel-tracker
   ```
3. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
4. Login:
   ```bash
   vercel login
   ```
5. Deploy:
   ```bash
   vercel --prod
   ```

---

## 🔑 STEP 3: Add Your API Keys in Vercel

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Add these two keys:

   | Key Name | Value | Where to Get It |
   |----------|-------|-----------------|
   | `CLAUDE_API_KEY` | `sk-ant-...` | https://console.anthropic.com/ |
   | `NEWS_API_KEY` | `your-key` | https://newsapi.org/ |

3. Click **Save**
4. Go to **Deployments** tab → Click **"Redeploy"** on the latest deployment

---

## 🎨 STEP 4: Update Your Website URL

After deployment, Vercel gives you a URL like: `https://sentinel-tracker-abc123.vercel.app`

**You need to update ONE line in your HTML file:**

Open `index.html` and find this line (around line 460):

```javascript
const API_URL = "YOUR_VERCEL_URL/api";
```

Replace with your actual URL:

```javascript
const API_URL = "https://sentinel-tracker-abc123.vercel.app/api";
```

Save the file, then **redeploy** (just upload again or push to GitHub).

---

## 🧪 STEP 5: Test Your App

1. Visit your Vercel URL
2. Try asking SENTINEL a question
3. Try searching for news

**If something doesn't work:**
- Check the browser console (F12 → Console tab)
- Check Vercel logs (Dashboard → Your Project → Logs)

---

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| "API Error" | Check your API keys are set in Vercel |
| "CORS Error" | Make sure `api/index.js` has CORS headers (already included) |
| News not loading | Verify your NewsAPI key is valid |
| Claude not responding | Check your Anthropic API key has credits |

---

## 📞 Need Help?

If you get stuck:
1. Check Vercel deployment logs
2. Check browser console (F12)
3. Make sure all files are in the correct folders

---

**Good luck! 🚀**
