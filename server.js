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
  "INF277KA1976": "TATAGOLD.NS",
  "TATAGOLD ETF": "TATAGOLD.NS",
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
  "INF740KA1WU9": "DSP500EQ.NS",
  "DSP N500FQ30 ETF": "DSP500EQ.NS",
  "INE040A01034": "HDFCBANK.NS",
  "HDFC BANK-EQ1/-": "HDFCBANK.NS",
  "INF109KC15I8": "BANKETF.NS",
  "ICICI NIFTY BANK ETF": "BANKETF.NS",
  "INF109KC16V9": "ICICIN50.NS",
  "ICICI NIFTY 100 ETF": "ICICIN50.NS",
  "INE009A01021": "INFY.NS",
  "INFOSYS LTD-EQ 5/-": "INFY.NS",
  "INE237A01036": "KOTAKBANK.NS",
  "KOTAK MAHINDRA-EQ1/-": "KOTAKBANK.NS",
  "INF174KA1GC5": "ITETF.NS",
  "KOTAK NIF IT ETF": "ITETF.NS",
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
  "INF200K01RP8": "GOLDBEES.NS",
  "SBI GOLD DP GR": "GOLDBEES.NS",
  "INE299N01021": "WAAREERTL.NS",
  "WAAREE RENEW-EQ2/-": "WAAREERTL.NS"
};

// In-memory cache
let cachedFx = { rate: 84.45, timestamp: 0 };
const quoteCache = new Map(); // ticker -> { price, change, changePct, currency, timestamp }
const CACHE_TTL_MS = 20000; // 20s cache

async function fetchLiveFx() {
  const now = Date.now();
  if (cachedFx.timestamp && now - cachedFx.timestamp < 30000) {
    return cachedFx;
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
    console.warn('FX API primary failed, trying backup...', err.message);
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

  // API: Real-time Stock Quotes
  if (pathname === '/api/quotes') {
    let symbolsParam = parsedUrl.searchParams.get('symbols');
    let requested = [];

    if (symbolsParam) {
      requested = symbolsParam.split(',').map(s => s.trim()).filter(Boolean);
    } else {
      // Default: fetch all known tickers
      requested = Array.from(new Set(Object.values(TICKER_MAP)));
    }

    const quotes = {};
    const promises = requested.map(async (sym) => {
      // Resolve mapped ticker if raw symbol or name was sent
      const ticker = TICKER_MAP[sym] || sym;
      const q = await fetchQuote(ticker);
      if (q) {
        quotes[sym] = q;
        if (ticker !== sym) quotes[ticker] = q;
      }
    });

    await Promise.allSettled(promises);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      quotes,
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

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio Screener server running at:`);
  console.log(`- Local:   http://localhost:${PORT}`);
  console.log(`- Network: http://127.0.0.1:${PORT}`);
  console.log(`- APIs:    http://localhost:${PORT}/api/fx | http://localhost:${PORT}/api/quotes`);
});
