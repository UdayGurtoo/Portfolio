const fs = require('fs');
const path = require('path');

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

async function fetchQuote(ticker) {
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
          marketState: meta.marketState || 'open',
          timestamp: Date.now()
        };
      }
    }
  } catch (e) {
    console.warn(`Failed ${ticker}: ${e.message}`);
  }
  return null;
}

async function main() {
  const rootDir = path.resolve(__dirname, '..');
  const quotesFile = path.join(rootDir, 'quotes.json');
  const appJsFile = path.join(rootDir, 'app.js');

  console.log('Fetching live quotes for all symbols...');
  const tickers = Array.from(new Set(Object.values(TICKER_MAP)));
  const quotes = {};

  const promises = tickers.map(async (t) => {
    const q = await fetchQuote(t);
    if (q) {
      quotes[t] = q;
    }
  });

  await Promise.allSettled(promises);
  console.log(`Successfully fetched ${Object.keys(quotes).length} live quotes.`);

  // Write quotes.json
  fs.writeFileSync(quotesFile, JSON.stringify({ quotes, timestamp: Date.now(), tickerCount: Object.keys(quotes).length }, null, 2));
  console.log(`Wrote ${quotesFile}`);

  // Update app.js DEFAULT_HOLDINGS
  if (fs.existsSync(appJsFile)) {
    let appJs = fs.readFileSync(appJsFile, 'utf8');

    // Parse DEFAULT_HOLDINGS
    const holdingsMatch = appJs.match(/const DEFAULT_HOLDINGS = (\[[\s\S]*?\]);/);
    if (holdingsMatch) {
      const defaultHoldings = eval(holdingsMatch[1]);
      let updatedCount = 0;

      const updatedHoldings = defaultHoldings.map(h => {
        const ticker = TICKER_MAP[h.symbol] || TICKER_MAP[h.name] || h.symbol;
        const q = quotes[ticker] || quotes[h.symbol] || quotes[h.name];
        if (q && q.price && q.price > 0) {
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

      console.log(`Updated ${updatedCount} holdings with real-time live quotes.`);

      const p1 = updatedHoldings.filter(h => h.portfolio === 'P1');
      const p2 = updatedHoldings.filter(h => h.portfolio === 'P2');
      const p3 = updatedHoldings.filter(h => h.portfolio === 'P3');

      const fmtItem = (h) => `  { portfolio: "${h.portfolio}", name: "${h.name}", symbol: "${h.symbol}", type: "${h.type}", qty: ${h.qty}, avgBuy: ${Number(h.avgBuy.toFixed(2))}, cmp: ${Number(h.cmp.toFixed(2))}, date: "${h.date}" }`;

      const newHoldingsBlock = 'const DEFAULT_HOLDINGS = [\n  // Portfolio 1: Indian Primary (Upstox 7MALEK - Urvashi Gurtoo)\n' +
        p1.map(fmtItem).join(',\n') + ',\n\n  // Portfolio 2: Indian Secondary (Upstox 7UAQA9 - Veena Koul)\n' +
        p2.map(fmtItem).join(',\n') + ',\n\n  // Portfolio 3: US Equities (INDmoney Global 258461814) - Live Real-Time Market Baseline\n' +
        p3.map(fmtItem).join(',\n') + '\n];';

      appJs = appJs.replace(/const DEFAULT_HOLDINGS = \[[\s\S]*?\];/, newHoldingsBlock);
      appJs = appJs.replace(/const STORAGE_KEY = "portfolio_screener_holdings_v\d+";/, 'const STORAGE_KEY = "portfolio_screener_holdings_v10";');

      fs.writeFileSync(appJsFile, appJs, 'utf8');
      console.log(`Updated ${appJsFile} with STORAGE_KEY v10 and fresh prices.`);
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
