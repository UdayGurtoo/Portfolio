const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.csv': 'text/csv; charset=utf-8'
};

// Real-world ticker mapping for portfolio holdings
const TICKER_MAP = {
  // US Equities (P3)
  "AMZN": "AMZN",
  "AVGO": "AVGO",
  "BRK.B": "BRK-B",
  "BRK-B": "BRK-B",
  "ETN": "ETN",
  "GOOG": "GOOG",
  "ISRG": "ISRG",
  "META": "META",
  "MSFT": "MSFT",
  "NOW": "NOW",
  "NVDA": "NVDA",
  "ORCL": "ORCL",
  "RH": "RH",
  "SHOP": "SHOP",
  "TSM": "TSM",
  "V": "V",

  // Indian Stocks & ETFs (P1 & P2)
  "INF209KB16D7": "ABSLNN50ET.NS",
  "ABSL NIFTY NXT50 ETF": "ABSLNN50ET.NS",
  "INE364U01010": "ADANIGREEN.NS",
  "ADANI GREEN ENERG-EQ": "ADANIGREEN.NS",
  "INE079A01024": "AMBUJACEM.NS",
  "AMBUJA CEMENTS EQ": "AMBUJACEM.NS",
  "INE437A01024": "APOLLOHOSP.NS",
  "APOLLO HOSPIT-EQ5/-": "APOLLOHOSP.NS",
  "INE296A01032": "BAJFINANCE.NS",
  "BAJAJ FINANCE-EQ1/-": "BAJFINANCE.NS",
  "INE028A01039": "BANKBARODA.NS",
  "BANK OF BARODA-EQ": "BANKBARODA.NS",
  "INE596I01020": "CAMS.NS",
  "COMPUTER AGE-EQ2/-": "CAMS.NS",
  "INF740KA1WU9": "FLEXIADD.NS",
  "DSP N500FQ30 ETF": "FLEXIADD.NS",
  "INE040A01034": "HDFCBANK.NS",
  "HDFC BANK-EQ1/-": "HDFCBANK.NS",
  "INF109KC15I8": "BANKIETF.NS",
  "ICICI NIFTY BANK ETF": "BANKIETF.NS",
  "INF109KC16V9": "NIF100IETF.NS",
  "ICICI NIFTY 100 ETF": "NIF100IETF.NS",
  "INE009A01021": "INFY.NS",
  "INFOSYS LTD-EQ 5/-": "INFY.NS",
  "INE237A01036": "KOTAKBANK.NS",
  "KOTAK MAHINDRA-EQ1/-": "KOTAKBANK.NS",
  "INF174KA1GC5": "IT.NS",
  "KOTAK NIF IT ETF": "IT.NS",
  "INE733E01010": "NTPC.NS",
  "NTPC LTD": "NTPC.NS",
  "INE262H01021": "PERSISTENT.NS",
  "PERSISTENT SYS-EQ5/-": "PERSISTENT.NS",
  "INE191H01014": "PVRINOX.NS",
  "PVR INOX EQUITY": "PVRINOX.NS",
  "INE450U01017": "ROUTE.NS",
  "ROUTE MOBILE-EQTY": "ROUTE.NS",
  "INF200KA1FS1": "SETFNIF50.NS",
  "SBI NIFTY 50 ETF": "SETFNIF50.NS",
  "INE040H01021": "SUZLON.NS",
  "SUZLON ENERG-EQ RS 2": "SUZLON.NS",
  "INE467B01029": "TCS.NS",
  "TATA CONSULTANCY-1/-": "TCS.NS",
  "INE200M01039": "VBL.NS",
  "VARUN BEVERAGE-EQ2/-": "VBL.NS",
  "INE021A01026": "ASIANPAINT.NS",
  "ASIAN PAINTS EQ 1/-": "ASIANPAINT.NS",
  "INE066P01011": "INOXWIND.NS",
  "INOX WIND- EQ": "INOXWIND.NS",
  "INE670K01029": "LODHA.NS",
  "LODHA DEVELOP-EQ10/-": "LODHA.NS",
  "INE299N01021": "WAAREERTL.NS",
  "WAAREE RENEW-EQ2/-": "WAAREERTL.NS",
  "INF200K01RP8": "INF200K01RP8",
  "SBI GOLD DP GR": "INF200K01RP8"
};

const GOOGLE_FINANCE_MAP = {
  // US Equities
  "AMZN": { s: "AMZN", e: "NASDAQ" },
  "AVGO": { s: "AVGO", e: "NASDAQ" },
  "BRK-B": { s: "BRK.B", e: "NYSE" },
  "ETN": { s: "ETN", e: "NYSE" },
  "GOOG": { s: "GOOG", e: "NASDAQ" },
  "ISRG": { s: "ISRG", e: "NASDAQ" },
  "META": { s: "META", e: "NASDAQ" },
  "MSFT": { s: "MSFT", e: "NASDAQ" },
  "NOW": { s: "NOW", e: "NYSE" },
  "NVDA": { s: "NVDA", e: "NASDAQ" },
  "ORCL": { s: "ORCL", e: "NYSE" },
  "RH": { s: "RH", e: "NYSE" },
  "SHOP": { s: "SHOP", e: "NASDAQ" },
  "TSM": { s: "TSM", e: "NYSE" },
  "V": { s: "V", e: "NYSE" },

  // Indian Equities & ETFs
  "ABSLNN50ET.NS": { s: "ABSLNN50ET", e: "NSE" },
  "ADANIGREEN.NS": { s: "ADANIGREEN", e: "NSE" },
  "AMBUJACEM.NS": { s: "AMBUJACEM", e: "NSE" },
  "APOLLOHOSP.NS": { s: "APOLLOHOSP", e: "NSE" },
  "BAJFINANCE.NS": { s: "BAJFINANCE", e: "NSE" },
  "BANKBARODA.NS": { s: "BANKBARODA", e: "NSE" },
  "CAMS.NS": { s: "CAMS", e: "NSE" },
  "FLEXIADD.NS": { s: "FLEXIADD", e: "NSE" },
  "HDFCBANK.NS": { s: "HDFCBANK", e: "NSE" },
  "BANKIETF.NS": { s: "BANKIETF", e: "NSE" },
  "NIF100IETF.NS": { s: "NIF100IETF", e: "NSE" },
  "INFY.NS": { s: "INFY", e: "NSE" },
  "KOTAKBANK.NS": { s: "KOTAKBANK", e: "NSE" },
  "IT.NS": { s: "IT", e: "NSE" },
  "NTPC.NS": { s: "NTPC", e: "NSE" },
  "PERSISTENT.NS": { s: "PERSISTENT", e: "NSE" },
  "PVRINOX.NS": { s: "PVRINOX", e: "NSE" },
  "ROUTE.NS": { s: "ROUTE", e: "NSE" },
  "SETFNIF50.NS": { s: "SETFNIF50", e: "NSE" },
  "SUZLON.NS": { s: "SUZLON", e: "NSE" },
  "TCS.NS": { s: "TCS", e: "NSE" },
  "VBL.NS": { s: "VBL", e: "NSE" },
  "ASIANPAINT.NS": { s: "ASIANPAINT", e: "NSE" },
  "INOXWIND.NS": { s: "INOXWIND", e: "NSE" },
  "LODHA.NS": { s: "LODHA", e: "NSE" },
  "WAAREERTL.NS": { s: "WAAREERTL", e: "NSE" }
};

const MF_ISINS = [
  "INF846K019W9",
  "INF740K01OK1",
  "INF179KC1BS5",
  "INF966L01911",
  "INF966L01986",
  "INF843K01KK1",
  "INF179K01UT0",
  "INF204K01XF9",
  "INF200K01RP8"
];

// Helper: Calculate Market Timing & Status
function getMarketTiming() {
  const now = new Date();

  const inStr = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const inDate = new Date(inStr);
  const inDay = inDate.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
  const inMins = inDate.getHours() * 60 + inDate.getMinutes();

  // Indian Market: Mon-Fri 09:15 to 15:30 IST
  const isIndianOpen = (inDay >= 1 && inDay <= 5) && (inMins >= 555 && inMins < 930);
  // Post-close 1 hour window: Mon-Fri 16:15 to 17:30 IST (4:30 PM IST)
  const isIndianPostClose = (inDay >= 1 && inDay <= 5) && (inMins >= 975 && inMins <= 1050);

  const usStr = now.toLocaleString("en-US", { timeZone: "America/New_York" });
  const usDate = new Date(usStr);
  const usDay = usDate.getDay();
  const usMins = usDate.getHours() * 60 + usDate.getMinutes();

  // US Market: Mon-Fri 09:30 to 16:00 EST
  const isUSOpen = (usDay >= 1 && usDay <= 5) && (usMins >= 570 && usMins < 960);
  // Post-close 1 hour window: Mon-Fri 16:45 to 18:00 EST (5:00 PM EST)
  const isUSPostClose = (usDay >= 1 && usDay <= 5) && (usMins >= 1005 && usMins <= 1080);

  // Mutual Fund 8:00 AM IST Update window: 07:30 - 09:30 IST
  const isMFWindow = (inDay >= 1 && inDay <= 6) && (inMins >= 450 && inMins <= 570);

  return {
    isIndianOpen,
    isIndianPostClose,
    isUSOpen,
    isUSPostClose,
    isMFWindow,
    inTimeString: inDate.toLocaleTimeString("en-US", { hour12: true }),
    usTimeString: usDate.toLocaleTimeString("en-US", { hour12: true })
  };
}

// In-memory cache
let cachedFx = { rate: 84.45, timestamp: 0 };
const quoteCache = new Map();
const CACHE_TTL_MS = 20000;

async function fetchLiveFx() {
  const now = Date.now();
  if (cachedFx.timestamp && now - cachedFx.timestamp < 30000) {
    return cachedFx;
  }
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    if (res.ok) {
      const data = await res.json();
      if (data.rates && data.rates.INR) {
        cachedFx = { rate: Number(data.rates.INR.toFixed(2)), timestamp: now, source: 'open.er-api' };
        return cachedFx;
      }
    }
  } catch (err) {
    console.warn('FX API open.er-api failed:', err.message);
  }

  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    if (res.ok) {
      const data = await res.json();
      if (data.rates && data.rates.INR) {
        cachedFx = { rate: Number(data.rates.INR.toFixed(2)), timestamp: now, source: 'exchangerate-api' };
        return cachedFx;
      }
    }
  } catch (err) {
    console.warn('FX API backup failed:', err.message);
  }

  return cachedFx;
}

async function fetchQuote(ticker) {
  const now = Date.now();
  const cached = quoteCache.get(ticker);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached;
  }

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (res.ok) {
      const data = await res.json();
      const result = data.chart?.result?.[0];
      if (result && result.meta) {
        const meta = result.meta;
        const price = meta.regularMarketPrice ?? meta.previousClose;
        const prevClose = meta.chartPreviousClose ?? meta.previousClose ?? price;
        const change = +(price - prevClose).toFixed(2);
        const changePct = prevClose > 0 ? +((change / prevClose) * 100).toFixed(2) : 0;

        const info = {
          ticker,
          price: +price.toFixed(2),
          change,
          changePct,
          currency: meta.currency || (ticker.endsWith('.NS') ? 'INR' : 'USD'),
          marketState: meta.tradingPeriods ? 'active' : 'closed',
          source: 'Yahoo Finance (Primary)',
          timestamp: now
        };
        quoteCache.set(ticker, info);
        return info;
      }
    }
  } catch (e) {
    console.warn(`Failed to fetch quote for ${ticker}:`, e.message);
  }

  return cached || null;
}

// Fetch Mutual Fund Daily NAVs from AMFI
async function fetchAmfiNavs() {
  const mfQuotes = {};
  try {
    const res = await fetch('https://www.amfiindia.com/spages/NAVAll.txt', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    if (res.ok) {
      const text = await res.text();
      for (const isin of MF_ISINS) {
        const idx = text.indexOf(isin);
        if (idx !== -1) {
          const lineStart = text.lastIndexOf('\n', idx);
          const lineEnd = text.indexOf('\n', idx);
          const line = text.substring(lineStart + 1, lineEnd).trim();
          const parts = line.split(';');
          const nav = parseFloat(parts[parts.length - 2]);
          const date = parts[parts.length - 1];
          if (!isNaN(nav) && nav > 0) {
            mfQuotes[isin] = {
              price: Number(nav.toFixed(4)),
              navDate: date,
              currency: 'INR',
              source: 'AMFI (Official Daily NAV)',
              timestamp: Date.now()
            };
          }
        }
      }
    }
  } catch (err) {
    console.warn('[AMFI] NAV fetch error:', err.message);
  }
  return mfQuotes;
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API: Live Exchange Rate (USD/INR)
  if (pathname === '/api/fx') {
    const fx = await fetchLiveFx();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(fx));
    return;
  }

  // API: Market Status
  if (pathname === '/api/market-status') {
    const timing = getMarketTiming();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      indian: {
        isOpen: timing.isIndianOpen,
        state: timing.isIndianOpen ? "OPEN" : "CLOSED",
        frozen: !timing.isIndianOpen,
        isPostClose1Hr: timing.isIndianPostClose,
        time: timing.inTimeString,
        schedule: "09:15 AM - 03:30 PM IST (Mon-Fri)"
      },
      us: {
        isOpen: timing.isUSOpen,
        state: timing.isUSOpen ? "OPEN" : "CLOSED",
        frozen: !timing.isUSOpen,
        isPostClose1Hr: timing.isUSPostClose,
        time: timing.usTimeString,
        schedule: "09:30 AM - 04:00 PM EST (Mon-Fri)"
      },
      mutualFunds: {
        updateSchedule: "Daily 8:00 AM IST (AMFI Official NAV)"
      },
      timestamp: Date.now()
    }));
    return;
  }

  // API: Real-time Stock Quotes
  if (pathname === '/api/quotes') {
    let symbolsParam = parsedUrl.searchParams.get('symbols');
    const force = parsedUrl.searchParams.get('force') === '1';
    let requested = [];

    if (symbolsParam) {
      requested = symbolsParam.split(',').map(s => s.trim()).filter(Boolean);
    } else {
      requested = Array.from(new Set(Object.values(TICKER_MAP)));
    }

    const timing = getMarketTiming();
    const quotes = {};

    // Load any static fallback quotes.json to supply cached frozen prices
    let staticQuotes = {};
    const staticQuotesPath = path.join(PUBLIC_DIR, 'quotes.json');
    if (fs.existsSync(staticQuotesPath)) {
      try {
        const fileContent = JSON.parse(fs.readFileSync(staticQuotesPath, 'utf8'));
        if (fileContent.quotes) staticQuotes = fileContent.quotes;
      } catch (e) {}
    }

    const promises = requested.map(async (sym) => {
      const ticker = TICKER_MAP[sym] || sym;
      const isIndian = ticker.endsWith('.NS');
      const isMarketActive = isIndian ? timing.isIndianOpen : timing.isUSOpen;

      // If market is active or forced, fetch live quote from primary source
      if (isMarketActive || force || timing.isIndianPostClose || timing.isUSPostClose) {
        const q = await fetchQuote(ticker);
        if (q) {
          quotes[sym] = q;
          if (ticker !== sym) quotes[ticker] = q;
          return;
        }
      }

      // If market is closed, freeze using cached or static closing price
      const existing = quoteCache.get(ticker) || staticQuotes[ticker] || staticQuotes[sym];
      if (existing) {
        const frozenQuote = Object.assign({}, existing, {
          marketState: 'closed',
          frozen: true
        });
        quotes[sym] = frozenQuote;
        if (ticker !== sym) quotes[ticker] = frozenQuote;
      }
    });

    await Promise.allSettled(promises);

    // Merge MF NAVs from static snapshot
    for (const isin of MF_ISINS) {
      if (staticQuotes[isin]) {
        quotes[isin] = staticQuotes[isin];
      }
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      quotes,
      marketTiming: timing,
      timestamp: Date.now(),
      tickerCount: Object.keys(quotes).length
    }));
    return;
  }

  // Static File Serving
  const safeUrlPath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(PUBLIC_DIR, safeUrlPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`500 Server Error: ${err.code}`);
      }
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(content);
  });
});

server.on('error', (err) => {
  console.error('Server error:', err.message);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio Screener server running at:`);
  console.log(`- Local:   http://localhost:${PORT}`);
  console.log(`- Network: http://127.0.0.1:${PORT}`);
  console.log(`- APIs:    http://localhost:${PORT}/api/fx | http://localhost:${PORT}/api/quotes | http://localhost:${PORT}/api/market-status`);
});
