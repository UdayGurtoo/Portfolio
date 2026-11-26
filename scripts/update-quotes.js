const fs = require('fs');
const path = require('path');

// Primary Ticker Mapping (Holdings -> Yahoo Finance)
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
  "INE299N01021": "WAAREERTL.NS",
  "WAAREE RENEW-EQ2/-": "WAAREERTL.NS"
};

// Google Finance Verification Map (Symbol & Exchange)
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
  "TATAGOLD.NS": { s: "TATAGOLD", e: "NSE" },
  "ABSLNN50ET.NS": { s: "ABSLNN50ET", e: "NSE" },
  "ADANIGREEN.NS": { s: "ADANIGREEN", e: "NSE" },
  "AMBUJACEM.NS": { s: "AMBUJACEM", e: "NSE" },
  "APOLLOHOSP.NS": { s: "APOLLOHOSP", e: "NSE" },
  "BAJFINANCE.NS": { s: "BAJFINANCE", e: "NSE" },
  "BANKBARODA.NS": { s: "BANKBARODA", e: "NSE" },
  "CAMS.NS": { s: "CAMS", e: "NSE" },
  "HDFCBANK.NS": { s: "HDFCBANK", e: "NSE" },
  "BANKIETF.NS": { s: "BANKIETF", e: "NSE" },
  "NIF100IETF.NS": { s: "NIF100IETF", e: "NSE" },
  "INFY.NS": { s: "INFY", e: "NSE" },
  "KOTAKBANK.NS": { s: "KOTAKBANK", e: "NSE" },
  "ITETF.NS": { s: "ITETF", e: "NSE" },
  "NTPC.NS": { s: "NTPC", e: "NSE" },
  "PERSISTENT.NS": { s: "PERSISTENT", e: "NSE" },
  "PVRINOX.NS": { s: "PVRINOX", e: "NSE" },
  "ROUTE.NS": { s: "ROUTE", e: "NSE" },
  "SETFNIF50.NS": { s: "SBINIFTY50", e: "NSE" },
  "SUZLON.NS": { s: "SUZLON", e: "NSE" },
  "TCS.NS": { s: "TCS", e: "NSE" },
  "VBL.NS": { s: "VBL", e: "NSE" },
  "ASIANPAINT.NS": { s: "ASIANPAINT", e: "NSE" },
  "INOXWIND.NS": { s: "INOXWIND", e: "NSE" },
  "LODHA.NS": { s: "LODHA", e: "NSE" },
  "WAAREERTL.NS": { s: "WAAREERTL", e: "NSE" }
};

// Mutual Fund ISINs
const MF_ISINS = [
  "INF846K019W9",
  "INF740K01OK1",
  "INF179KC1BS5",
  "INF966L01911",
  "INF966L01986",
  "INF843K01KK1",
  "INF179K01UT0",
  "INF204K01XF9"
];

// Helper: Calculate Market Timing States
function getMarketTiming() {
  const now = new Date();

  // Indian Time (Asia/Kolkata)
  const inStr = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const inDate = new Date(inStr);
  const inDay = inDate.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
  const inMins = inDate.getHours() * 60 + inDate.getMinutes();

  // Indian Market: Mon-Fri 09:15 (555m) to 15:30 (930m)
  const isIndianOpen = (inDay >= 1 && inDay <= 5) && (inMins >= 555 && inMins < 930);
  // Indian 1-hr Post-Close Check window: Mon-Fri 16:15 to 17:30 (4:15 PM - 5:30 PM IST)
  const isIndianPostClose = (inDay >= 1 && inDay <= 5) && (inMins >= 975 && inMins <= 1050);

  // US Time (America/New_York)
  const usStr = now.toLocaleString("en-US", { timeZone: "America/New_York" });
  const usDate = new Date(usStr);
  const usDay = usDate.getDay();
  const usMins = usDate.getHours() * 60 + usDate.getMinutes();

  // US Market: Mon-Fri 09:30 (570m) to 16:00 (960m)
  const isUSOpen = (usDay >= 1 && usDay <= 5) && (usMins >= 570 && usMins < 960);
  // US 1-hr Post-Close Check window: Mon-Fri 16:45 to 18:00 (4:45 PM - 6:00 PM EST)
  const isUSPostClose = (usDay >= 1 && usDay <= 5) && (usMins >= 1005 && usMins <= 1080);

  // Mutual Fund 8:00 AM IST Update Window (7:30 AM to 9:30 AM IST Tue-Sat)
  const isMFWindow = (inDay >= 1 && inDay <= 6) && (inMins >= 450 && inMins <= 570);

  return {
    isIndianOpen,
    isIndianPostClose,
    isUSOpen,
    isUSPostClose,
    isMFWindow,
    inTimeString: inDate.toLocaleTimeString("en-US", { hour12: true }),
    usTimeString: usDate.toLocaleTimeString("en-US", { hour12: true }),
    inDay,
    usDay
  };
}

// Fetch Primary Price from Yahoo Finance
async function fetchYahooQuote(ticker) {
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

        return {
          ticker,
          price: +price.toFixed(2),
          change,
          changePct,
          currency: meta.currency || (ticker.endsWith('.NS') ? 'INR' : 'USD'),
          source: 'Yahoo Finance (Primary)',
          timestamp: Date.now()
        };
      }
    }
  } catch (e) {
    console.warn(`[Yahoo] Failed ${ticker}: ${e.message}`);
  }
  return null;
}

// Fetch Verification Price from Google Finance
async function fetchGooglePrice(symbol, exchange) {
  try {
    const url = `https://www.google.com/finance/quote/${encodeURIComponent(symbol)}:${encodeURIComponent(exchange)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    if (res.ok) {
      const html = await res.text();
      // Matches the hero card price on Google Finance
      const match = html.match(/class="[^"]*zhtAvb[^"]*"[\s\S]*?class="[^"]*N6SYTe[^"]*"[\s\S]*?<span>([^\<]+)<\/span>/i);
      if (match) {
        const val = parseFloat(match[1].replace(/[₹$,]/g, '').trim());
        if (!isNaN(val) && val > 0) return val;
      }
    }
  } catch (e) {
    console.warn(`[GoogleFinance] Failed ${symbol}:${exchange}: ${e.message}`);
  }
  return null;
}

// Fetch Mutual Fund Daily NAVs from official AMFI
async function fetchAmfiNavs() {
  const mfQuotes = {};
  try {
    console.log('[AMFI] Fetching official daily NAV data...');
    const res = await fetch('https://www.amfiindia.com/spages/NAVAll.txt', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
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
            source: 'AMFI (Official 8:00 AM Update)',
            timestamp: Date.now()
          };
          console.log(`[AMFI] ${isin} NAV: ₹${nav.toFixed(4)} (${date})`);
        }
      }
    }
  } catch (err) {
    console.warn('[AMFI] NAV fetch error:', err.message);
  }
  return mfQuotes;
}

async function main() {
  const args = process.argv.slice(2);
  const forceAll = args.includes('--force') || args.includes('-f');
  const forceEod = args.includes('--eod');
  const forceMf = args.includes('--mf');

  const timing = getMarketTiming();
  console.log(`Market Timing Status:`);
  console.log(`- Indian Market: ${timing.isIndianOpen ? 'OPEN (Tracking)' : 'CLOSED (Frozen)'} | IST: ${timing.inTimeString} | Post-Close Check: ${timing.isIndianPostClose}`);
  console.log(`- US Market:     ${timing.isUSOpen ? 'OPEN (Tracking)' : 'CLOSED (Frozen)'} | EST: ${timing.usTimeString} | Post-Close Check: ${timing.isUSPostClose}`);
  console.log(`- Mutual Funds:  ${timing.isMFWindow ? '8:00 AM Next-Day NAV Window' : 'Daily NAV Cached'}`);

  const rootDir = path.resolve(__dirname, '..');
  const quotesFile = path.join(rootDir, 'quotes.json');
  const appJsFile = path.join(rootDir, 'app.js');

  // Load existing quotes.json if available
  let existingData = { quotes: {}, marketStatus: {}, lastGoogleFinanceCheck: null, lastMfUpdate: null };
  if (fs.existsSync(quotesFile)) {
    try {
      existingData = JSON.parse(fs.readFileSync(quotesFile, 'utf8'));
      if (!existingData.quotes) existingData.quotes = {};
    } catch (e) {}
  }

  const quotes = Object.assign({}, existingData.quotes);

  // 1. Determine which stock tickers to fetch based on market hours
  const allUniqueTickers = Array.from(new Set(Object.values(TICKER_MAP)));
  const tickersToFetch = allUniqueTickers.filter(t => {
    if (forceAll) return true;
    const isIndian = t.endsWith('.NS');
    if (isIndian) {
      return timing.isIndianOpen || timing.isIndianPostClose || forceEod;
    } else {
      return timing.isUSOpen || timing.isUSPostClose || forceEod;
    }
  });

  console.log(`Fetching primary quotes for ${tickersToFetch.length} tickers...`);
  const primaryPromises = tickersToFetch.map(async (t) => {
    const q = await fetchYahooQuote(t);
    if (q) {
      quotes[t] = q;
    }
  });
  await Promise.allSettled(primaryPromises);

  // 2. Google Finance EOD Cross-Check (1 hour after close or forced)
  const runIndianGfCheck = forceEod || forceAll || timing.isIndianPostClose;
  const runUSGfCheck = forceEod || forceAll || timing.isUSPostClose;
  let gfCheckedCount = 0;

  if (runIndianGfCheck || runUSGfCheck) {
    console.log(`Running Google Finance EOD verification check...`);
    const gfTickers = Object.keys(GOOGLE_FINANCE_MAP).filter(t => {
      const isIndian = t.endsWith('.NS');
      if (isIndian) return runIndianGfCheck;
      return runUSGfCheck;
    });

    for (const t of gfTickers) {
      const map = GOOGLE_FINANCE_MAP[t];
      const gfPrice = await fetchGooglePrice(map.s, map.e);
      if (gfPrice && gfPrice > 0) {
        const currentQ = quotes[t];
        const primaryPrice = currentQ ? currentQ.price : null;
        let finalPrice = gfPrice;
        let verified = true;

        if (primaryPrice && primaryPrice > 0) {
          const diffPct = Math.abs(primaryPrice - gfPrice) / primaryPrice * 100;
          if (diffPct <= 1.0) {
            console.log(`[Google Finance Verified] ${t}: Primary ₹${primaryPrice} vs GF ₹${gfPrice} (Diff: ${diffPct.toFixed(2)}%) => MATCH`);
            finalPrice = primaryPrice; // primary confirmed by GF
          } else {
            console.log(`[Google Finance Correction] ${t}: Primary ₹${primaryPrice} vs GF ₹${gfPrice} (Diff: ${diffPct.toFixed(2)}%) => USING GF CLOSING PRICE`);
            finalPrice = gfPrice;
          }
        }

        quotes[t] = Object.assign({}, quotes[t] || {}, {
          ticker: t,
          price: Number(finalPrice.toFixed(2)),
          verifiedGoogleFinance: true,
          googleFinancePrice: gfPrice,
          lastVerifiedAt: Date.now()
        });
        gfCheckedCount++;
      }
    }
    console.log(`Google Finance EOD Cross-Check completed for ${gfCheckedCount} tickers.`);
  }

  // 3. Mutual Funds 8:00 AM Next-Day NAV Update
  let mfUpdated = false;
  if (timing.isMFWindow || forceMf || forceAll) {
    const amfiNavs = await fetchAmfiNavs();
    if (Object.keys(amfiNavs).length > 0) {
      Object.assign(quotes, amfiNavs);
      mfUpdated = true;
      existingData.lastMfUpdate = {
        timestamp: Date.now(),
        date: new Date().toLocaleDateString("en-IN"),
        count: Object.keys(amfiNavs).length
      };
    }
  }

  // 4. Record Market Status Metadata
  const marketStatus = {
    indian: {
      isOpen: timing.isIndianOpen,
      state: timing.isIndianOpen ? "OPEN" : "CLOSED",
      frozen: !timing.isIndianOpen,
      isPostClose1Hr: timing.isIndianPostClose,
      lastEodCheck: runIndianGfCheck ? Date.now() : (existingData.marketStatus?.indian?.lastEodCheck || null),
      time: timing.inTimeString
    },
    us: {
      isOpen: timing.isUSOpen,
      state: timing.isUSOpen ? "OPEN" : "CLOSED",
      frozen: !timing.isUSOpen,
      isPostClose1Hr: timing.isUSPostClose,
      lastEodCheck: runUSGfCheck ? Date.now() : (existingData.marketStatus?.us?.lastEodCheck || null),
      time: timing.usTimeString
    },
    mutualFunds: {
      updateSchedule: "Daily 8:00 AM IST",
      lastUpdate: existingData.lastMfUpdate || null
    }
  };

  const outputPayload = {
    quotes,
    marketStatus,
    timestamp: Date.now(),
    tickerCount: Object.keys(quotes).length,
    googleFinanceVerifiedCount: gfCheckedCount
  };

  fs.writeFileSync(quotesFile, JSON.stringify(outputPayload, null, 2));
  console.log(`Wrote ${quotesFile} with ${Object.keys(quotes).length} total asset quotes.`);

  // 5. Update app.js DEFAULT_HOLDINGS & bump to v11
  if (fs.existsSync(appJsFile)) {
    let appJs = fs.readFileSync(appJsFile, 'utf8');
    const holdingsMatch = appJs.match(/const DEFAULT_HOLDINGS = (\[[\s\S]*?\]);/);
    if (holdingsMatch) {
      const defaultHoldings = eval(holdingsMatch[1]);
      let updatedCount = 0;

      const updatedHoldings = defaultHoldings.map(h => {
        const ticker = TICKER_MAP[h.symbol] || TICKER_MAP[h.name] || h.symbol;
        const q = quotes[ticker] || quotes[h.symbol] || quotes[h.name];
        if (q && q.price && q.price > 0) {
          if (h.type === "Mutual Fund") {
            updatedCount++;
            return Object.assign({}, h, { cmp: Number(q.price.toFixed(2)) });
          }
          if (h.avgBuy > 0) {
            const ratio = q.price / h.avgBuy;
            if (ratio <= 3.0 && ratio >= 0.25) {
              updatedCount++;
              return Object.assign({}, h, { cmp: Number(q.price.toFixed(2)) });
            }
          }
        }
        return h;
      });

      console.log(`Updated ${updatedCount} baseline holdings with validated quotes.`);

      const p1 = updatedHoldings.filter(h => h.portfolio === 'P1');
      const p2 = updatedHoldings.filter(h => h.portfolio === 'P2');
      const p3 = updatedHoldings.filter(h => h.portfolio === 'P3');

      const fmtItem = (h) => `  { portfolio: "${h.portfolio}", name: "${h.name}", symbol: "${h.symbol}", type: "${h.type}", qty: ${h.qty}, avgBuy: ${Number(h.avgBuy.toFixed(2))}, cmp: ${Number(h.cmp.toFixed(2))}, date: "${h.date}" }`;

      const newHoldingsBlock = 'const DEFAULT_HOLDINGS = [\n  // Portfolio 1: Indian Primary (Upstox 7MALEK - Urvashi Gurtoo)\n' +
        p1.map(fmtItem).join(',\n') + ',\n\n  // Portfolio 2: Indian Secondary (Upstox 7UAQA9 - Veena Koul)\n' +
        p2.map(fmtItem).join(',\n') + ',\n\n  // Portfolio 3: US Equities (INDmoney Global 258461814) - Live Real-Time Market Baseline\n' +
        p3.map(fmtItem).join(',\n') + '\n];';

      appJs = appJs.replace(/const DEFAULT_HOLDINGS = \[[\s\S]*?\];/, newHoldingsBlock);
      appJs = appJs.replace(/const STORAGE_KEY = "portfolio_screener_holdings_v\d+";/, 'const STORAGE_KEY = "portfolio_screener_holdings_v11";');

      fs.writeFileSync(appJsFile, appJs, 'utf8');
      console.log(`Updated ${appJsFile} with STORAGE_KEY v11.`);
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
