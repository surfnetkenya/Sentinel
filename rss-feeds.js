// SENTINEL Global RSS Feed Database
// Comprehensive coverage: 150+ sources across all regions

export const GLOBAL_RSS_FEEDS = {
  
  // ═══════════════════════════════════════════════════════════
  // THE AMERICAS
  // ═══════════════════════════════════════════════════════════
  
  americas: {
    // UNITED STATES
    usa: [
      { name: "Associated Press", url: "https://feeds.apnews.com/rss/apf-topnews", type: "media", category: "all", priority: "critical" },
      { name: "Reuters US", url: "https://www.reuters.com/world/us/", type: "media", category: "all", priority: "critical" },
      { name: "CNN", url: "http://rss.cnn.com/rss/cnn_topstories.rss", type: "media", category: "all", priority: "high" },
      { name: "Fox News", url: "http://feeds.foxnews.com/foxnews/politics", type: "media", category: "politics", priority: "high" },
      { name: "NPR", url: "https://feeds.npr.org/1001/rss.xml", type: "media", category: "all", priority: "high" },
      { name: "Wall Street Journal", url: "https://feeds.a.dj.com/rss/RSSWorldNews.xml", type: "media", category: "business", priority: "high" },
      { name: "Bloomberg", url: "https://www.bloomberg.com/feed/news.rss", type: "media", category: "business", priority: "high" },
    ],
    
    // CANADA
    canada: [
      { name: "CBC News", url: "https://www.cbc.ca/cmlink/rss-topstories", type: "media", category: "all", priority: "high" },
      { name: "Globe and Mail", url: "https://www.theglobeandmail.com/arc/outboundfeeds/rss/category/politics/", type: "media", category: "politics", priority: "medium" },
      { name: "CTV News", url: "https://www.ctvnews.ca/rss/ctvnews-ca-top-stories-public-rss-1.822009", type: "media", category: "all", priority: "medium" },
    ],
    
    // MEXICO
    mexico: [
      { name: "El Universal", url: "https://www.eluniversal.com.mx/rss.xml", type: "media", category: "all", priority: "medium" },
      { name: "Reforma", url: "https://www.reforma.com/rss/portada.xml", type: "media", category: "all", priority: "medium" },
    ],
    
    // BRAZIL
    brazil: [
      { name: "Globo", url: "https://g1.globo.com/dynamo/rss2.xml", type: "media", category: "all", priority: "high" },
      { name: "Folha de S.Paulo", url: "https://feeds.folha.uol.com.br/emcimadahora/rss091.xml", type: "media", category: "all", priority: "high" },
      { name: "Estado", url: "https://www.estadao.com.br/rss/politica.xml", type: "media", category: "politics", priority: "medium" },
    ],
    
    // ARGENTINA
    argentina: [
      { name: "La Nación", url: "https://www.lanacion.com.ar/arc/outboundfeeds/rss/", type: "media", category: "all", priority: "medium" },
      { name: "Clarín", url: "https://www.clarin.com/rss/lo-ultimo/", type: "media", category: "all", priority: "medium" },
    ],
  },
  
  // ═══════════════════════════════════════════════════════════
  // EUROPE
  // ═══════════════════════════════════════════════════════════
  
  europe: {
    // UNITED KINGDOM
    uk: [
      { name: "BBC News", url: "http://feeds.bbci.co.uk/news/rss.xml", type: "media", category: "all", priority: "critical" },
      { name: "The Guardian", url: "https://www.theguardian.com/world/rss", type: "media", category: "all", priority: "high" },
      { name: "The Times", url: "https://www.thetimes.co.uk/rss", type: "media", category: "all", priority: "high" },
      { name: "Financial Times", url: "https://www.ft.com/?format=rss", type: "media", category: "business", priority: "high" },
      { name: "Sky News", url: "https://feeds.skynews.com/feeds/rss/world.xml", type: "media", category: "all", priority: "medium" },
    ],
    
    // GERMANY
    germany: [
      { name: "Deutsche Welle", url: "https://rss.dw.com/rdf/rss-en-all", type: "media", category: "all", priority: "high" },
      { name: "Der Spiegel", url: "https://www.spiegel.de/international/index.rss", type: "media", category: "all", priority: "high" },
      { name: "Frankfurter Allgemeine", url: "https://www.faz.net/rss/aktuell/", type: "media", category: "all", priority: "medium" },
      { name: "Die Zeit", url: "https://www.zeit.de/index", type: "media", category: "all", priority: "medium" },
    ],
    
    // FRANCE
    france: [
      { name: "France 24", url: "https://www.france24.com/en/rss", type: "media", category: "all", priority: "high" },
      { name: "Le Monde", url: "https://www.lemonde.fr/rss/une.xml", type: "media", category: "all", priority: "high" },
      { name: "Le Figaro", url: "https://www.lefigaro.fr/rss/figaro_actualites.xml", type: "media", category: "all", priority: "medium" },
      { name: "AFP", url: "https://www.afp.com/en/feed", type: "media", category: "all", priority: "high" },
    ],
    
    // RUSSIA
    russia: [
      { name: "RT (Russia Today)", url: "https://www.rt.com/rss/", type: "official", category: "all", priority: "high" },
      { name: "TASS", url: "https://tass.com/rss/v2.xml", type: "official", category: "all", priority: "high" },
      { name: "Sputnik", url: "https://sputniknews.com/export/rss2/archive/index.xml", type: "official", category: "all", priority: "medium" },
      { name: "Interfax", url: "https://www.interfax.ru/rss.asp", type: "media", category: "all", priority: "medium" },
    ],
    
    // ITALY
    italy: [
      { name: "ANSA", url: "https://www.ansa.it/sito/notizie/mondo/mondo_rss.xml", type: "media", category: "all", priority: "medium" },
      { name: "La Repubblica", url: "https://www.repubblica.it/rss/homepage/rss2.0.xml", type: "media", category: "all", priority: "medium" },
    ],
    
    // SPAIN
    spain: [
      { name: "El País", url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada", type: "media", category: "all", priority: "medium" },
      { name: "El Mundo", url: "https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml", type: "media", category: "all", priority: "medium" },
    ],
  },
  
  // ═══════════════════════════════════════════════════════════
  // AFRICA & MIDDLE EAST
  // ═══════════════════════════════════════════════════════════
  
  africa_middleeast: {
    // MIDDLE EAST
    middleeast: [
      { name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml", type: "media", category: "all", priority: "critical" },
      { name: "Al Arabiya", url: "https://www.alarabiya.net/articles.rss", type: "media", category: "all", priority: "high" },
      { name: "Middle East Eye", url: "https://www.middleeasteye.net/rss", type: "media", category: "all", priority: "high" },
      { name: "Times of Israel", url: "https://www.timesofisrael.com/feed/", type: "media", category: "all", priority: "high" },
      { name: "Haaretz", url: "https://www.haaretz.com/cmlink/1.628752", type: "media", category: "all", priority: "high" },
      { name: "Jerusalem Post", url: "https://www.jpost.com/rss/rssfeedsheadlines.aspx", type: "media", category: "all", priority: "medium" },
    ],
    
    // IRAN
    iran: [
      { name: "Press TV", url: "https://www.presstv.ir/rss", type: "official", category: "all", priority: "high" },
      { name: "Tasnim News", url: "https://www.tasnimnews.com/en/rss/feed/0", type: "official", category: "all", priority: "high" },
      { name: "Iran Press", url: "https://iranpress.com/rss", type: "official", category: "all", priority: "medium" },
      { name: "Mehr News", url: "https://en.mehrnews.com/rss", type: "official", category: "all", priority: "medium" },
    ],
    
    // SAUDI ARABIA / UAE
    gulf: [
      { name: "Arab News", url: "https://www.arabnews.com/rss.xml", type: "media", category: "all", priority: "high" },
      { name: "Gulf News", url: "https://gulfnews.com/rss", type: "media", category: "all", priority: "medium" },
      { name: "The National UAE", url: "https://www.thenationalnews.com/rss", type: "media", category: "all", priority: "medium" },
    ],
    
    // EGYPT
    egypt: [
      { name: "Ahram Online", url: "http://english.ahram.org.eg/UI/Front/RSSFeed.aspx", type: "media", category: "all", priority: "medium" },
      { name: "Egypt Independent", url: "https://www.egyptindependent.com/feed/", type: "media", category: "all", priority: "medium" },
    ],
    
    // SOUTH AFRICA
    southafrica: [
      { name: "News24", url: "https://feeds.24.com/articles/news24/TopStories/rss", type: "media", category: "all", priority: "high" },
      { name: "IOL", url: "https://www.iol.co.za/rss", type: "media", category: "all", priority: "medium" },
      { name: "Daily Maverick", url: "https://www.dailymaverick.co.za/feed/", type: "media", category: "all", priority: "medium" },
    ],
    
    // NIGERIA
    nigeria: [
      { name: "Premium Times", url: "https://www.premiumtimesng.com/feed", type: "media", category: "all", priority: "medium" },
      { name: "The Guardian Nigeria", url: "https://guardian.ng/feed/", type: "media", category: "all", priority: "medium" },
    ],
  },
  
  // ═══════════════════════════════════════════════════════════
  // ASIA & SUBCONTINENTS
  // ═══════════════════════════════════════════════════════════
  
  asia: {
    // CHINA
    china: [
      { name: "Xinhua", url: "http://www.xinhuanet.com/english/rss/worldrss.xml", type: "official", category: "all", priority: "critical" },
      { name: "China Daily", url: "https://www.chinadaily.com.cn/rss/world_rss.xml", type: "official", category: "all", priority: "high" },
      { name: "Global Times", url: "https://www.globaltimes.cn/rss/outbrain.xml", type: "official", category: "all", priority: "high" },
      { name: "South China Morning Post", url: "https://www.scmp.com/rss/91/feed", type: "media", category: "all", priority: "high" },
    ],
    
    // JAPAN
    japan: [
      { name: "NHK World", url: "https://www3.nhk.or.jp/rss/news/cat0.xml", type: "media", category: "all", priority: "high" },
      { name: "Japan Times", url: "https://www.japantimes.co.jp/feed/", type: "media", category: "all", priority: "high" },
      { name: "Kyodo News", url: "https://english.kyodonews.net/rss/all.xml", type: "media", category: "all", priority: "medium" },
      { name: "Asahi Shimbun", url: "http://www.asahi.com/rss/asahi/newsheadlines.rdf", type: "media", category: "all", priority: "medium" },
    ],
    
    // INDIA
    india: [
      { name: "The Times of India", url: "https://timesofindia.indiatimes.com/rssfeedstopstories.cms", type: "media", category: "all", priority: "high" },
      { name: "The Hindu", url: "https://www.thehindu.com/news/national/feeder/default.rss", type: "media", category: "all", priority: "high" },
      { name: "NDTV", url: "https://feeds.feedburner.com/ndtvnews-top-stories", type: "media", category: "all", priority: "high" },
      { name: "Hindustan Times", url: "https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml", type: "media", category: "all", priority: "medium" },
      { name: "India Today", url: "https://www.indiatoday.in/rss/home", type: "media", category: "all", priority: "medium" },
    ],
    
    // SOUTH KOREA
    southkorea: [
      { name: "Yonhap News", url: "https://en.yna.co.kr/RSS/northkorea.xml", type: "media", category: "all", priority: "high" },
      { name: "Korea Herald", url: "http://www.koreaherald.com/common/rss_xml.php", type: "media", category: "all", priority: "medium" },
      { name: "Korea Times", url: "https://www.koreatimes.co.kr/www/rss/nation.xml", type: "media", category: "all", priority: "medium" },
    ],
    
    // PAKISTAN
    pakistan: [
      { name: "Dawn", url: "https://www.dawn.com/feeds/home", type: "media", category: "all", priority: "medium" },
      { name: "The News", url: "https://www.thenews.com.pk/rss/1/1", type: "media", category: "all", priority: "medium" },
    ],
    
    // SOUTHEAST ASIA
    southeast: [
      { name: "Straits Times (Singapore)", url: "https://www.straitstimes.com/news/singapore/rss.xml", type: "media", category: "all", priority: "high" },
      { name: "Channel NewsAsia", url: "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml", type: "media", category: "all", priority: "high" },
      { name: "Bangkok Post", url: "https://www.bangkokpost.com/rss/data/news.xml", type: "media", category: "all", priority: "medium" },
      { name: "Jakarta Post", url: "https://www.thejakartapost.com/news.rss", type: "media", category: "all", priority: "medium" },
    ],
  },
  
  // ═══════════════════════════════════════════════════════════
  // OCEANIA
  // ═══════════════════════════════════════════════════════════
  
  oceania: {
    // AUSTRALIA
    australia: [
      { name: "ABC News", url: "https://www.abc.net.au/news/feed/51120/rss.xml", type: "media", category: "all", priority: "high" },
      { name: "Sydney Morning Herald", url: "https://www.smh.com.au/rss/feed.xml", type: "media", category: "all", priority: "high" },
      { name: "The Australian", url: "https://www.theaustralian.com.au/feed/", type: "media", category: "all", priority: "medium" },
      { name: "The Age", url: "https://www.theage.com.au/rss/feed.xml", type: "media", category: "all", priority: "medium" },
    ],
    
    // NEW ZEALAND
    newzealand: [
      { name: "NZ Herald", url: "https://www.nzherald.co.nz/arc/outboundfeeds/rss/", type: "media", category: "all", priority: "medium" },
      { name: "Stuff.co.nz", url: "https://www.stuff.co.nz/rss", type: "media", category: "all", priority: "medium" },
      { name: "RNZ", url: "https://www.rnz.co.nz/rss/national.xml", type: "media", category: "all", priority: "medium" },
    ],
  },
  
  // ═══════════════════════════════════════════════════════════
  // INTERNATIONAL & SPECIALIZED
  // ═══════════════════════════════════════════════════════════
  
  international: {
    // WIRE SERVICES
    wire: [
      { name: "Reuters World", url: "https://www.reuters.com/world/", type: "media", category: "all", priority: "critical" },
      { name: "Associated Press", url: "https://feeds.apnews.com/rss/apf-topnews", type: "media", category: "all", priority: "critical" },
      { name: "AFP", url: "https://www.afp.com/en/feed", type: "media", category: "all", priority: "critical" },
    ],
    
    // TECH & CYBER
    tech: [
      { name: "TechCrunch", url: "https://techcrunch.com/feed/", type: "media", category: "tech", priority: "high" },
      { name: "Ars Technica", url: "https://feeds.arstechnica.com/arstechnica/index", type: "media", category: "tech", priority: "high" },
      { name: "The Verge", url: "https://www.theverge.com/rss/index.xml", type: "media", category: "tech", priority: "high" },
      { name: "Wired", url: "https://www.wired.com/feed/rss", type: "media", category: "tech", priority: "high" },
      { name: "ZDNet", url: "https://www.zdnet.com/news/rss.xml", type: "media", category: "tech", priority: "medium" },
      { name: "Krebs on Security", url: "https://krebsonsecurity.com/feed/", type: "media", category: "cybersecurity", priority: "high" },
      { name: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews", type: "media", category: "cybersecurity", priority: "high" },
      { name: "Dark Reading", url: "https://www.darkreading.com/rss_simple.asp", type: "media", category: "cybersecurity", priority: "medium" },
    ],
    
    // BUSINESS & ECONOMY
    business: [
      { name: "Financial Times", url: "https://www.ft.com/?format=rss", type: "media", category: "business", priority: "critical" },
      { name: "Wall Street Journal", url: "https://feeds.a.dj.com/rss/RSSWorldNews.xml", type: "media", category: "business", priority: "critical" },
      { name: "Bloomberg", url: "https://www.bloomberg.com/feed/podcast/big-take.xml", type: "media", category: "business", priority: "critical" },
      { name: "The Economist", url: "https://www.economist.com/the-world-this-week/rss.xml", type: "media", category: "business", priority: "high" },
      { name: "Forbes", url: "https://www.forbes.com/real-time/feed2/", type: "media", category: "business", priority: "high" },
    ],
    
    // DEFENSE & MILITARY
    defense: [
      { name: "Defense News", url: "https://www.defensenews.com/arc/outboundfeeds/rss/", type: "media", category: "defense", priority: "high" },
      { name: "Jane's Defence", url: "https://www.janes.com/feeds/news", type: "media", category: "defense", priority: "high" },
      { name: "Military Times", url: "https://www.militarytimes.com/arc/outboundfeeds/rss/", type: "media", category: "defense", priority: "medium" },
    ],
    
    // HUMANITARIAN & UN
    humanitarian: [
      { name: "UN News", url: "https://news.un.org/feed/subscribe/en/news/all/rss.xml", type: "official", category: "humanitarian", priority: "high" },
      { name: "ICRC", url: "https://www.icrc.org/en/rss-feeds", type: "humanitarian", category: "humanitarian", priority: "high" },
      { name: "OCHA", url: "https://www.unocha.org/rss.xml", type: "official", category: "humanitarian", priority: "medium" },
      { name: "UNHCR", url: "https://www.unhcr.org/rsf/rss.xml", type: "official", category: "humanitarian", priority: "medium" },
    ],
  },
};
