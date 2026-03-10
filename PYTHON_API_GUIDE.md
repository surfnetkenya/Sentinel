# 🐍 SENTINEL Python API - Complete Setup Guide

## 🎯 What Python Adds to SENTINEL

Transform SENTINEL into an AI-powered intelligence platform with:
- **Named Entity Recognition** - Extract people, places, organizations
- **Sentiment Analysis** - Detect bias and propaganda
- **Auto-Translation** - Backend translation (better than Google widget)
- **Financial Data** - Stock prices, economics for mentioned entities
- **Image Analysis** - Analyze CCTV screenshots
- **Predictive Models** - Forecast conflicts and trends
- **Social Media** - Deep Twitter/Telegram analysis

---

## 🚀 Quick Start (FREE Deployment)

### Option 1: Railway.app (Recommended - Easiest)

#### 1. Create Python API

Create `python_api/main.py`:

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import spacy
from textblob import TextBlob
from googletrans import Translator
import uvicorn

app = FastAPI(title="SENTINEL Python API")

# Load models
try:
    nlp = spacy.load("en_core_web_sm")
except:
    import os
    os.system("python -m spacy download en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

translator = Translator()

# Request models
class TextRequest(BaseModel):
    text: str

class TranslateRequest(BaseModel):
    text: str
    target: str = "en"

# ════════════════════════════════════════════════════════════
# CORE ENDPOINTS
# ════════════════════════════════════════════════════════════

@app.get("/")
def read_root():
    return {
        "service": "SENTINEL Python API",
        "status": "operational",
        "endpoints": [
            "/analyze", "/sentiment", "/translate",
            "/entities", "/keywords", "/summarize"
        ]
    }

@app.post("/analyze")
async def analyze_text(request: TextRequest):
    """
    Complete text analysis: entities, sentiment, keywords
    """
    doc = nlp(request.text)
    
    # Extract entities
    entities = {
        "people": [ent.text for ent in doc.ents if ent.label_ == "PERSON"],
        "locations": [ent.text for ent in doc.ents if ent.label_ == "GPE"],
        "organizations": [ent.text for ent in doc.ents if ent.label_ == "ORG"],
        "dates": [ent.text for ent in doc.ents if ent.label_ == "DATE"],
        "money": [ent.text for ent in doc.ents if ent.label_ == "MONEY"]
    }
    
    # Sentiment
    blob = TextBlob(request.text)
    sentiment = {
        "polarity": blob.sentiment.polarity,  # -1 to 1
        "subjectivity": blob.sentiment.subjectivity,  # 0 to 1
        "assessment": get_sentiment_label(blob.sentiment.polarity)
    }
    
    # Keywords
    keywords = [token.text for token in doc if token.is_alpha and not token.is_stop and len(token.text) > 3][:10]
    
    return {
        "entities": entities,
        "sentiment": sentiment,
        "keywords": keywords,
        "word_count": len(request.text.split())
    }

@app.post("/entities")
async def extract_entities(request: TextRequest):
    """
    Named Entity Recognition only
    """
    doc = nlp(request.text)
    
    entities = []
    for ent in doc.ents:
        entities.append({
            "text": ent.text,
            "label": ent.label_,
            "start": ent.start_char,
            "end": ent.end_char
        })
    
    return {"entities": entities}

@app.post("/sentiment")
async def get_sentiment(request: TextRequest):
    """
    Sentiment analysis with detailed scoring
    """
    blob = TextBlob(request.text)
    polarity = blob.sentiment.polarity
    
    return {
        "polarity": polarity,
        "subjectivity": blob.sentiment.subjectivity,
        "label": get_sentiment_label(polarity),
        "confidence": abs(polarity),
        "is_neutral": -0.1 < polarity < 0.1,
        "is_positive": polarity >= 0.1,
        "is_negative": polarity <= -0.1
    }

@app.post("/translate")
async def translate(request: TranslateRequest):
    """
    Translation with language detection
    """
    try:
        result = translator.translate(request.text, dest=request.target)
        return {
            "original": request.text,
            "translated": result.text,
            "source_language": result.src,
            "target_language": request.target,
            "confidence": getattr(result, 'extra_data', {}).get('confidence', None)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/keywords")
async def extract_keywords(request: TextRequest):
    """
    Extract important keywords and phrases
    """
    doc = nlp(request.text)
    
    # Single word keywords
    keywords = [token.lemma_ for token in doc 
                if token.is_alpha and not token.is_stop and len(token.text) > 3]
    
    # Noun phrases
    phrases = [chunk.text for chunk in doc.noun_chunks if len(chunk.text.split()) <= 4]
    
    # Frequency count
    from collections import Counter
    keyword_freq = Counter(keywords).most_common(10)
    phrase_freq = Counter(phrases).most_common(10)
    
    return {
        "keywords": [{"word": k, "count": c} for k, c in keyword_freq],
        "phrases": [{"phrase": p, "count": c} for p, c in phrase_freq]
    }

@app.post("/summarize")
async def summarize_text(request: TextRequest):
    """
    Basic extractive summarization
    """
    doc = nlp(request.text)
    
    # Get sentences
    sentences = [sent.text for sent in doc.sents]
    
    if len(sentences) <= 3:
        return {"summary": request.text, "reduction": 0}
    
    # Simple scoring: sentences with most entities and keywords
    scored_sentences = []
    for sent in doc.sents:
        score = len([ent for ent in sent.ents]) + len([t for t in sent if not t.is_stop])
        scored_sentences.append((sent.text, score))
    
    # Get top 3 sentences
    sorted_sentences = sorted(scored_sentences, key=lambda x: x[1], reverse=True)
    summary = ' '.join([s[0] for s in sorted_sentences[:3]])
    
    reduction = 100 - (len(summary) / len(request.text) * 100)
    
    return {
        "summary": summary,
        "original_length": len(request.text),
        "summary_length": len(summary),
        "reduction_percent": round(reduction, 1)
    }

# ════════════════════════════════════════════════════════════
# ADVANCED FEATURES
# ════════════════════════════════════════════════════════════

@app.post("/financial")
async def get_financial_data(ticker: str):
    """
    Get stock/financial data for mentioned companies
    """
    try:
        import yfinance as yf
        stock = yf.Ticker(ticker)
        info = stock.info
        history = stock.history(period="1d")
        
        return {
            "ticker": ticker,
            "company": info.get('longName', ticker),
            "current_price": history['Close'].iloc[-1] if len(history) > 0 else None,
            "market_cap": info.get('marketCap'),
            "sector": info.get('sector'),
            "industry": info.get('industry')
        }
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Ticker {ticker} not found")

@app.post("/detect_language")
async def detect_language(request: TextRequest):
    """
    Detect language of text
    """
    try:
        result = translator.detect(request.text)
        return {
            "language": result.lang,
            "confidence": result.confidence,
            "text_preview": request.text[:100]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ════════════════════════════════════════════════════════════
# HELPER FUNCTIONS
# ════════════════════════════════════════════════════════════

def get_sentiment_label(polarity):
    if polarity >= 0.3:
        return "Very Positive"
    elif polarity >= 0.1:
        return "Positive"
    elif polarity <= -0.3:
        return "Very Negative"
    elif polarity <= -0.1:
        return "Negative"
    else:
        return "Neutral"

# ════════════════════════════════════════════════════════════
# RUN SERVER
# ════════════════════════════════════════════════════════════

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

#### 2. Create Requirements

Create `python_api/requirements.txt`:

```
fastapi==0.104.1
uvicorn[standard]==0.24.0
spacy==3.7.2
textblob==0.17.1
googletrans==4.0.0rc1
pydantic==2.5.0
yfinance==0.2.32
python-multipart==0.0.6
```

#### 3. Create Deployment Config

Create `python_api/Procfile`:

```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

Create `python_api/railway.json`:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "python -m spacy download en_core_web_sm && uvicorn main:app --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

#### 4. Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize
cd python_api
railway init

# Deploy
railway up

# Get URL
railway domain
```

Your Python API will be live at: `https://your-app.railway.app`

---

### Option 2: Render.com (Also FREE)

1. Create GitHub repo with `python_api/` folder
2. Go to render.com → New Web Service
3. Connect GitHub repo
4. Settings:
   - Build Command: `pip install -r requirements.txt && python -m spacy download en_core_web_sm`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Deploy!

---

## 🔗 Integrate with SENTINEL

### Update `api/index.js`:

```javascript
// Add Python API URL
const PYTHON_API = process.env.PYTHON_API_URL || 'https://your-app.railway.app';

// Enhanced analysis function
async function analyzeWithPython(text) {
  try {
    const response = await fetch(`${PYTHON_API}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Python API error:', error);
    return null;
  }
}

// Use in intelligence gathering
export default async function handler(req, res) {
  const { action, query, text } = req.body;
  
  if (action === 'analyze') {
    // Get Python analysis
    const analysis = await analyzeWithPython(text);
    
    if (analysis) {
      return res.json({
        ...analysis,
        python_enhanced: true
      });
    }
  }
  
  // ... rest of code
}
```

### Add to Vercel Environment Variables:

```
PYTHON_API_URL = https://your-app.railway.app
```

---

## 📊 Advanced Features

### 1. Social Media Analysis

Add to `main.py`:

```python
@app.post("/social_sentiment")
async def analyze_social_media(request: TextRequest):
    """
    Analyze social media posts for propaganda/disinformation
    """
    doc = nlp(request.text)
    blob = TextBlob(request.text)
    
    # Detect manipulation indicators
    exclamation_count = request.text.count('!')
    all_caps_words = sum(1 for word in request.text.split() if word.isupper() and len(word) > 2)
    
    indicators = {
        "excessive_exclamation": exclamation_count > 3,
        "excessive_caps": all_caps_words > 3,
        "extreme_sentiment": abs(blob.sentiment.polarity) > 0.7,
        "has_numbers": any(char.isdigit() for char in request.text),
        "has_urls": 'http' in request.text.lower()
    }
    
    propaganda_score = sum(indicators.values()) / len(indicators)
    
    return {
        "sentiment": blob.sentiment.polarity,
        "indicators": indicators,
        "propaganda_score": propaganda_score,
        "assessment": "High risk" if propaganda_score > 0.6 else "Normal"
    }
```

### 2. Image Analysis (CCTV Screenshots)

```python
from PIL import Image
import pytesseract
import io

@app.post("/analyze_image")
async def analyze_image(file: UploadFile):
    """
    OCR and object detection on CCTV screenshots
    """
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    
    # Extract text
    text = pytesseract.image_to_string(image)
    
    # Basic analysis
    return {
        "extracted_text": text,
        "image_size": image.size,
        "format": image.format,
        "mode": image.mode
    }
```

### 3. Conflict Prediction

```python
from sklearn.ensemble import RandomForestClassifier
import pickle

# Load pre-trained model
try:
    with open('conflict_model.pkl', 'rb') as f:
        conflict_model = pickle.load(f)
except:
    conflict_model = None

@app.post("/predict_escalation")
async def predict_conflict_escalation(request: TextRequest):
    """
    Predict likelihood of conflict escalation
    """
    if not conflict_model:
        return {"error": "Model not loaded"}
    
    # Extract features
    doc = nlp(request.text)
    
    features = {
        "military_mentions": sum(1 for token in doc if token.text.lower() in ['military', 'army', 'troops', 'weapons']),
        "casualty_mentions": sum(1 for token in doc if token.text.lower() in ['killed', 'dead', 'casualties', 'wounded']),
        "escalation_words": sum(1 for token in doc if token.text.lower() in ['escalate', 'war', 'attack', 'strike']),
        "sentiment": TextBlob(request.text).sentiment.polarity
    }
    
    # Mock prediction (replace with actual model)
    risk_score = (features['military_mentions'] * 0.3 + 
                  features['casualty_mentions'] * 0.4 +
                  features['escalation_words'] * 0.3)
    
    return {
        "risk_score": min(risk_score / 10, 1.0),
        "risk_level": "High" if risk_score > 7 else "Medium" if risk_score > 3 else "Low",
        "indicators": features
    }
```

### 4. Financial Context

```python
@app.post("/financial_context")
async def get_financial_context(request: TextRequest):
    """
    Extract and analyze financial mentions
    """
    doc = nlp(request.text)
    
    # Extract companies and money
    companies = [ent.text for ent in doc.ents if ent.label_ == "ORG"]
    money_mentions = [ent.text for ent in doc.ents if ent.label_ == "MONEY"]
    
    financial_data = []
    for company in companies[:5]:  # Limit to 5
        try:
            import yfinance as yf
            ticker = yf.Ticker(company)
            info = ticker.info
            history = ticker.history(period="1d")
            
            if len(history) > 0:
                financial_data.append({
                    "company": company,
                    "price": history['Close'].iloc[-1],
                    "change": history['Close'].iloc[-1] - history['Open'].iloc[0] if len(history) > 0 else 0,
                    "sector": info.get('sector', 'Unknown')
                })
        except:
            continue
    
    return {
        "companies_mentioned": companies,
        "money_mentioned": money_mentions,
        "financial_data": financial_data
    }
```

---

## 🎯 Usage Examples

### From SENTINEL Frontend

```javascript
// Analyze article with Python
async function enhancedAnalysis(articleText) {
  const response = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'python_analyze',
      text: articleText
    })
  });
  
  const data = await response.json();
  
  // Display entities
  console.log('People:', data.entities.people);
  console.log('Locations:', data.entities.locations);
  console.log('Sentiment:', data.sentiment.assessment);
  console.log('Keywords:', data.keywords);
}

// Translate with Python backend
async function translateArticle(text) {
  const response = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'python_translate',
      text: text,
      target: 'en'
    })
  });
  
  const data = await response.json();
  return data.translated;
}

// Financial context
async function getFinancialContext(text) {
  const response = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'financial_context',
      text: text
    })
  });
  
  return await response.json();
}
```

---

## 📚 Python Libraries Guide

### Core NLP
```bash
pip install spacy
python -m spacy download en_core_web_sm  # English
python -m spacy download xx_ent_wiki_sm  # Multilingual
```

### Sentiment Analysis
```bash
pip install textblob
pip install vaderSentiment  # Better for social media
```

### Translation
```bash
pip install googletrans==4.0.0rc1  # Free Google Translate
pip install deep-translator  # Alternative
```

### Financial Data
```bash
pip install yfinance  # Stock data
pip install pandas-datareader  # Economic data
pip install fredapi  # Federal Reserve data
```

### Image Analysis
```bash
pip install pillow
pip install pytesseract  # OCR
pip install opencv-python  # Computer vision
```

### Machine Learning
```bash
pip install scikit-learn
pip install tensorflow  # Deep learning
pip install transformers  # Hugging Face models
```

---

## 💰 Cost

### FREE Tier Limits

**Railway.app:**
- 512MB RAM
- 1GB disk
- $5 free credit/month
- MORE than enough for SENTINEL!

**Render.com:**
- 512MB RAM
- Sleeps after 15 min inactivity
- Wakes on request
- Completely FREE

**PythonAnywhere:**
- 512MB RAM
- 100 seconds CPU/day
- Good for light use

---

## 🚀 Next Steps

1. **Deploy Python API** (Railway recommended)
2. **Test endpoints** with curl or Postman
3. **Integrate with SENTINEL** (update api/index.js)
4. **Add features** as needed
5. **Monitor usage** in Railway dashboard

---

## 📖 Full Documentation

**FastAPI Docs** (auto-generated):
- Visit: `https://your-app.railway.app/docs`
- Interactive API testing
- All endpoints documented

---

**Your Python API is ready to make SENTINEL 10x more powerful!** 🚀
