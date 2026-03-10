// SENTINEL Backend - Vercel Edge Function
// Routes to Railway Python API for OSINT analysis

import fetch from 'node-fetch';

const PYTHON_API_URL = process.env.PYTHON_API_URL || 'pythonapi-production-ea0b.up.railway.app';
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
  
  const { action, query } = req.body;
  
  // ═══════════════════════════════════════════════════════════
  // ROUTE 1: ANALYZE (Python API)
  // ═══════════════════════════════════════════════════════════
  
  if (action === 'analyze') {
    try {
      console.log(`📡 Forwarding to Python API: ${PYTHON_API_URL}/analyze`);
      
      // Call Railway Python API
      const response = await fetch(`${PYTHON_API_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: query }),
        timeout: 10000 // 10 second timeout
      });
      
      if (!response.ok) {
        throw new Error(`Python API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      console.log('✅ Python API response received');
      
      return res.status(200).json({
        success: true,
        query: query,
        entities: data.entities || {},
        sentiment: data.sentiment || { polarity: 0, label: 'neutral' },
        keywords: data.keywords || [],
        summary: `Analysis complete for: ${query}`,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('❌ Python API error:', error.message);
      
      // GRACEFUL FALLBACK: Return mock data if Python API is down
      return res.status(200).json({
        success: false,
        query: query,
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
        keywords: query.split(' ').slice(0, 5),
        summary: `Fallback analysis for: ${query}`,
        warning: 'Python API unavailable - using basic extraction',
        timestamp: new Date().toISOString()
      });
    }
  }
  
  // ═══════════════════════════════════════════════════════════
  // ROUTE 2: TRANSLATE (Python API)
  // ═══════════════════════════════════════════════════════════
  
  if (action === 'translate') {
    const { text, target = 'en' } = req.body;
    
    try {
      const response = await fetch(`${PYTHON_API_URL}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, target }),
        timeout: 10000
      });
      
      if (!response.ok) {
        throw new Error(`Translation error: ${response.status}`);
      }
      
      const data = await response.json();
      return res.status(200).json(data);
      
    } catch (error) {
      console.error('Translation error:', error.message);
      return res.status(500).json({
        error: 'Translation service unavailable',
        original: text
      });
    }
  }
  
  // ═══════════════════════════════════════════════════════════
  // INVALID ACTION
  // ═══════════════════════════════════════════════════════════
  
  return res.status(400).json({
    error: 'Invalid action',
    validActions: ['analyze', 'translate']
  });
}

// ═══════════════════════════════════════════════════════════
// HELPER: Basic Location Extraction (Fallback)
// ═══════════════════════════════════════════════════════════

function extractBasicLocations(text) {
  const keywords = text.toLowerCase();
  const locations = [];
  
  const knownLocations = [
    'gaza', 'israel', 'ukraine', 'russia', 'kyiv', 'moscow',
    'taiwan', 'china', 'iran', 'syria', 'yemen', 'iraq'
  ];
  
  knownLocations.forEach(loc => {
    if (keywords.includes(loc)) {
      locations.push(loc.charAt(0).toUpperCase() + loc.slice(1));
    }
  });
  
  return locations.length > 0 ? locations : ['Unknown'];
}
