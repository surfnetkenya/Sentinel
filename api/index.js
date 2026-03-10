// SENTINEL Backend - Vercel Serverless Function
// Routes intelligence analysis to Google Gemini & Python FastAPI

const PYTHON_API_URL = process.env.PYTHON_API_URL || 'https://your-railway-app.up.railway.app';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req, res) {
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { action, query, region } = req.body;
  
  // ═══════════════════════════════════════════════════════════
  // ANALYZE ACTION (Python NLP + Gemini AI)
  // ═══════════════════════════════════════════════════════════
  
  if (action === 'analyze') {
    try {
      console.log(`📡 Analyzing: "${query}" (Region: ${region})`);
      
      // Step 1: Call Python API for NLP analysis
      let pythonData = null;
      
      try {
        const pythonResponse = await fetch(`${PYTHON_API_URL}/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: query }),
          signal: AbortSignal.timeout(12000)
        });
        
        if (pythonResponse.ok) {
          pythonData = await pythonResponse.json();
          console.log('✅ Python API success');
        }
      } catch (pythonError) {
        console.warn('⚠️ Python API unavailable:', pythonError.message);
      }
      
      // Fallback if Python API fails
      if (!pythonData) {
        pythonData = {
          entities: {
            locations: extractBasicLocations(query),
            people: [],
            organizations: []
          },
          sentiment: {
            polarity: -0.2,
            label: 'Neutral (Fallback)',
            subjectivity: 0.5
          },
          keywords: query.split(' ').slice(0, 5)
        };
      }
      
      // Step 2: Optional - Call Gemini for deep analysis
      let geminiSummary = `Intelligence analysis for: ${query}`;
      
      if (GEMINI_API_KEY) {
        try {
          const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{
                  parts: [{
                    text: `Provide a brief 2-sentence intelligence summary for: ${query}`
                  }]
                }]
              }),
              signal: AbortSignal.timeout(10000)
            }
          );
          
          if (geminiResponse.ok) {
            const geminiData = await geminiResponse.json();
            geminiSummary = geminiData.candidates[0].content.parts[0].text;
            console.log('✅ Gemini AI success');
          }
        } catch (geminiError) {
          console.warn('⚠️ Gemini unavailable:', geminiError.message);
        }
      }
      
      // Return combined result
      return res.status(200).json({
        success: true,
        query: query,
        region: region,
        entities: pythonData.entities,
        sentiment: pythonData.sentiment,
        keywords: pythonData.keywords,
        summary: geminiSummary,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('❌ Analysis error:', error);
      
      return res.status(500).json({
        success: false,
        error: 'Analysis failed',
        message: error.message,
        query: query
      });
    }
  }
  
  // ═══════════════════════════════════════════════════════════
  // INVALID ACTION
  // ═══════════════════════════════════════════════════════════
  
  return res.status(400).json({
    error: 'Invalid action',
    validActions: ['analyze']
  });
}

// ═══════════════════════════════════════════════════════════
// HELPER: Basic Location Extraction (Fallback)
// ═══════════════════════════════════════════════════════════

function extractBasicLocations(text) {
  if (!text) return [];
  
  const keywords = text.toLowerCase();
  const locations = [];
  
  const knownLocations = [
    'gaza', 'israel', 'ukraine', 'russia', 'kyiv', 'moscow', 'taiwan',
    'china', 'iran', 'syria', 'yemen', 'iraq', 'afghanistan', 'lebanon',
    'damascus', 'beirut', 'tehran', 'baghdad', 'kabul', 'beijing',
    'north korea', 'pyongyang', 'somalia', 'sudan', 'ethiopia'
  ];
  
  knownLocations.forEach(loc => {
    if (keywords.includes(loc)) {
      locations.push(loc.charAt(0).toUpperCase() + loc.slice(1));
    }
  });
  
  return locations.length > 0 ? locations : [];
}
