# ⚠️ CRITICAL: AI Analysis Fix

## Issue: "AI Analysis Unavailable"

This is a common issue - here's the definitive fix.

---

## 🔧 The Fix (Step by Step)

### Step 1: Get Claude API Key

1. Go to: **https://console.anthropic.com**
2. Sign in (or create account)
3. Click **"API Keys"** in left sidebar
4. Click **"Create Key"** button
5. **Copy the entire key** (very long, starts with `sk-ant-api03-`)

**IMPORTANT:** Copy the COMPLETE key - it's very long!

---

### Step 2: Add to Vercel Environment Variables

1. Go to **Vercel Dashboard** (https://vercel.com/dashboard)
2. Click on your **SENTINEL project**
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in left sidebar
5. Click **"Add New"** button

**Enter these details:**
```
Name (Key):         CLAUDE_API_KEY
Value:              sk-ant-api03-[paste your full key here]
Environments:       ✅ Production
                    ✅ Preview (optional)
                    ✅ Development (optional)
```

6. Click **"Save"**

---

### Step 3: REDEPLOY (Critical Step!)

**THIS IS THE STEP EVERYONE FORGETS!**

Vercel does NOT automatically apply new environment variables to existing deployments. You MUST trigger a new deployment.

**Option A: Via Dashboard**
1. Go to **"Deployments"** tab
2. Find your latest deployment
3. Click the **"..."** menu (three dots)
4. Click **"Redeploy"**
5. Confirm redeploy
6. Wait for deployment to complete

**Option B: Via CLI**
```bash
vercel --prod
```

---

### Step 4: Verify It Works

1. Open your SENTINEL URL
2. Do a search (any search)
3. Look at **"AI Analysis"** panel on the right
4. Should now show analysis instead of "unavailable"

---

## ✅ Verification Checklist

- [ ] Created Claude API key at console.anthropic.com
- [ ] Copied COMPLETE key (very long string)
- [ ] Added to Vercel as `CLAUDE_API_KEY`
- [ ] Enabled for Production environment
- [ ] **REDEPLOYED** (this is critical!)
- [ ] Tested with a search
- [ ] AI analysis now appears

---

## 🐛 Still Not Working?

### Check #1: Is the key correct?

Go to Vercel → Settings → Environment Variables

You should see:
```
CLAUDE_API_KEY = sk-ant-api03-••••••••••••••••••••
```

If you see:
```
CLAUDE_API_KEY = undefined
```
The key wasn't saved correctly. Add it again.

---

### Check #2: Did you redeploy?

Go to Vercel → Deployments

Check the timestamp of your latest deployment. It should be AFTER you added the environment variable.

If it's BEFORE → You didn't redeploy → Redeploy now!

---

### Check #3: Do you have credits?

Go to https://console.anthropic.com/settings/billing

Check if you have available credits or a payment method set up.

**New accounts usually get:**
- Free trial credits, OR
- Need to add payment method

**Claude API is very cheap:**
- ~$3 per million tokens
- For SENTINEL usage: probably $1-5/month

---

### Check #4: Test the key directly

Run this in terminal (replace with your key):

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_KEY_HERE" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 100,
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

**If you get a response** → Key is valid
**If you get an error** → Key is invalid or expired

---

### Check #5: Look at Vercel logs

1. Vercel Dashboard → Your Project
2. Click **"Deployments"** tab
3. Click latest deployment
4. Click **"Functions"** tab
5. Click **"/api/index.js"**
6. Look at logs

**What to look for:**
```
✅ Good: No CLAUDE_API_KEY errors
❌ Bad: "CLAUDE_API_KEY is not defined"
❌ Bad: "Invalid API key"
❌ Bad: "401 Unauthorized"
```

---

## 💡 Common Mistakes

### Mistake #1: Forgot to Redeploy
**Symptom:** Added key but AI still says "unavailable"
**Fix:** Redeploy the project

### Mistake #2: Incomplete API Key
**Symptom:** "Invalid API key" error in logs
**Fix:** Copy the COMPLETE key from Anthropic console

### Mistake #3: Typo in Variable Name
**Symptom:** "CLAUDE_API_KEY is not defined"
**Fix:** Variable name must be exactly `CLAUDE_API_KEY` (case-sensitive)

### Mistake #4: Wrong Environment
**Symptom:** Works in Preview but not Production
**Fix:** Ensure key is enabled for Production environment

### Mistake #5: No Credits
**Symptom:** "Rate limit exceeded" or billing error
**Fix:** Add payment method at console.anthropic.com/settings/billing

---

## 📋 Quick Troubleshooting Flow

```
AI Analysis shows "unavailable"
    ↓
Check: Is CLAUDE_API_KEY set in Vercel?
    → NO: Add it, then REDEPLOY
    → YES: Continue
    ↓
Check: Did you redeploy after adding key?
    → NO: REDEPLOY now
    → YES: Continue
    ↓
Check: Does Anthropic account have credits?
    → NO: Add payment method
    → YES: Continue
    ↓
Check: Are there errors in Vercel function logs?
    → YES: Fix the specific error
    → NO: Should be working now
```

---

## 🎯 The #1 Cause

**90% of "AI Analysis Unavailable" issues are caused by:**

```
Added environment variable ✅
BUT
Forgot to redeploy ❌
```

**Solution:** Always redeploy after adding/changing environment variables!

---

## 📞 Still Stuck?

If you've done all of the above and it still doesn't work:

1. **Screenshot** of your environment variables (hide actual key value)
2. **Screenshot** of Vercel function logs
3. **Screenshot** of error in browser console (F12)
4. **Check** that files deployed correctly (api/index.js present)

Most likely issue: Forgot to redeploy (seriously, this is 90% of cases!)

---

## ✅ Success Indicators

You'll know it's working when:

```
✅ Do a search in SENTINEL
✅ Wait 3-5 seconds
✅ "AI Analysis" panel updates
✅ Shows actual analysis text
✅ No "unavailable" message
✅ No errors in browser console
```

---

## 🔑 Quick Reference

```
API Console:     https://console.anthropic.com
Vercel Dashboard: https://vercel.com/dashboard
Variable Name:    CLAUDE_API_KEY (exact, case-sensitive)
Key Format:       sk-ant-api03-... (very long)
Cost:            ~$3-5/month for typical SENTINEL usage
Remember:         ALWAYS redeploy after adding variables!
```

---

**Most Important:** Don't forget to REDEPLOY after adding the API key!

This is THE most common mistake. The key is added, but it's not picked up by the deployed function until you trigger a new deployment.

🚀 **After redeploying, your AI analysis will work perfectly!**
