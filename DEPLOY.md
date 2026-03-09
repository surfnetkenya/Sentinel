# 🚀 SENTINEL v2.0 - Quick Deployment Guide

## ⚡ 5-Minute Deploy

### Step 1: Verify Files
```
sentinel-global/
├── index.html ✅
├── api/
│   └── index.js ✅
├── package.json ✅
├── vercel.json ✅
└── README.md ✅
```

### Step 2: Deploy to Vercel

**Option A: Vercel CLI (Recommended)**
```bash
cd sentinel-global
npm install -g vercel
vercel
```

**Option B: Git + Vercel Dashboard**
1. Push to GitHub repository
2. Go to vercel.com/new
3. Import your repository
4. Deploy

### Step 3: Set Environment Variables

**CRITICAL:** Go to Vercel Dashboard → Your Project → Settings → Environment Variables

**Required (AI Analysis):**
```
Name: CLAUDE_API_KEY
Value: sk-ant-api03-your-key-here
Environments: Production, Preview, Development
```

Get your Claude API key: https://console.anthropic.com

**Optional (Enhanced Sources):**
```
Name: TWITTER_BEARER_TOKEN
Value: your-twitter-bearer-token
Environments: Production

Name: TELEGRAM_BOT_TOKEN  
Value: your-telegram-bot-token
Environments: Production
```

### Step 4: Redeploy

**IMPORTANT:** After adding environment variables, you MUST redeploy!

**Option A:** Vercel Dashboard → Deployments → Latest → "..." → Redeploy

**Option B:** CLI: `vercel --prod`

### Step 5: Test

1. Open your Vercel URL
2. Select "Global" region
3. Search: "China trade"
4. Verify results appear
5. Check AI Analysis section

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Page loads without errors
- [ ] All 7 region tabs visible
- [ ] Category filter bar present
- [ ] Search returns results
- [ ] RSS feeds appear (📰 icon)
- [ ] AI analysis works (if CLAUDE_API_KEY set)
- [ ] No console errors (F12)
- [ ] Responsive on mobile

---

## 🔧 Troubleshooting Quick Fixes

### Issue: "AI Analysis Unavailable"
```
✅ Fix:
1. Add CLAUDE_API_KEY to Vercel
2. Redeploy (this is the step people forget!)
3. Test again
```

### Issue: "Failed to fetch"
```
✅ Fix:
1. Check Vercel function logs
2. Verify api/index.js deployed correctly
3. Check browser console for errors
```

### Issue: "No results showing"
```
✅ Fix:
1. Try broader search terms
2. Select "Global" region
3. Select "All Intelligence" category
4. Check Vercel logs for RSS feed errors
```

---

## 🌍 Testing Scenarios

### Test 1: Global Search
```
Region: Global
Category: All Intelligence
Search: "trade"
Expected: Results from multiple regions
```

### Test 2: Regional Focus
```
Region: Asia
Category: All Intelligence
Search: "China"
Expected: Asian sources, Chinese media
```

### Test 3: Category Filter
```
Region: Global
Category: Tech & Cyber
Search: "cybersecurity"
Expected: TechCrunch, Wired, Krebs on Security
```

### Test 4: Military Intelligence
```
Region: Europe
Category: Military & Defense
Search: "NATO"
Expected: Defense News, European military sources
```

---

## 📊 What You Should See

### Successful Deployment:
```
✅ 150+ RSS feeds loaded
✅ 7 region tabs active
✅ 6 category filters available
✅ Search returns 5-30 results
✅ AI analysis appears (with API key)
✅ Real-time stats updating
✅ Priority alerts showing
```

### Expected Load Times:
```
Page Load: < 2 seconds
Search Results: 3-8 seconds  
AI Analysis: 3-5 seconds additional
Total: 6-13 seconds for full intelligence
```

---

## 🔑 API Keys Guide

### Claude API Key (Required for AI)

**Get it:**
1. Go to https://console.anthropic.com
2. Create account or sign in
3. API Keys → Create Key
4. Copy key (starts with `sk-ant-api03-`)
5. Add to Vercel environment variables

**Cost:** ~$3 per million tokens (very cheap for testing)

**Note:** New accounts often get free trial credits

### Twitter API Key (Optional)

**Get it:**
1. https://developer.twitter.com
2. Create developer account
3. Create app
4. Get Bearer Token
5. Add to Vercel

**Cost:** Free tier very limited, paid tiers start at $100/month

### Telegram Bot Token (Optional)

**Get it:**
1. Message @BotFather on Telegram
2. Send `/newbot`
3. Follow prompts
4. Copy token
5. Add to Vercel

**Cost:** Free forever

---

## 🎯 Pro Tips

### Maximize Coverage
```
✅ Use "Global" region for comprehensive results
✅ Use "All Intelligence" category initially
✅ Narrow down after seeing initial results
```

### Optimize Performance
```
✅ Start with specific regions (faster)
✅ Use categories to reduce noise
✅ Combine region + category for focused intel
```

### Best Search Practices
```
✅ Use 2-4 word queries
✅ Include country/region names
✅ Use event types (trade, conflict, election)
❌ Avoid single words like "news"
❌ Avoid very specific/niche terms
```

---

## 📱 Mobile Testing

Open on mobile device:
```
✅ Responsive layout
✅ Region tabs scrollable
✅ Categories visible
✅ Search functional
✅ Results readable
```

---

## 🆘 Still Having Issues?

### Check These in Order:

1. **Vercel Deployment Logs**
   - Dashboard → Deployments → Latest → Functions → Logs
   - Look for errors in `/api/index.js`

2. **Browser Console**
   - Press F12
   - Look for red errors
   - Check Network tab for failed requests

3. **Environment Variables**
   - Dashboard → Settings → Environment Variables
   - Verify `CLAUDE_API_KEY` is set
   - Ensure it's enabled for Production

4. **File Structure**
   - Verify `api/index.js` exists (not just `index.js`)
   - Check `index.html` in root
   - Confirm `package.json` and `vercel.json` present

5. **Redeploy**
   - After ANY environment variable change
   - Must trigger new deployment
   - Old deployments won't have new variables

---

## 🎉 Success Metrics

You've successfully deployed when:

```
✅ Search "China trade" returns 10+ results
✅ Multiple RSS sources visible
✅ AI analysis appears (with CLAUDE_API_KEY)
✅ No errors in console
✅ All 7 regions selectable
✅ Category filters working
✅ Stats updating (source count, queries)
```

---

## 🌟 Next Steps After Deployment

1. **Bookmark** your deployment URL
2. **Test** all 7 regions
3. **Try** different categories
4. **Monitor** which sources work best
5. **Customize** RSS feeds if needed (see README.md)
6. **Share** with your team
7. **Provide feedback** for improvements

---

**Deployment Time:** 5 minutes
**Setup Difficulty:** Easy
**Requirements:** Vercel account, Claude API key
**Cost:** Free (Vercel free tier) + Claude API usage (~$3-10/month)

🚀 **Happy Intelligence Gathering!**
