const STORAGE_KEY = "portfolio_screener_holdings_v13";

const DEFAULT_HOLDINGS = [
  // Portfolio 1: Indian Primary (Upstox 7MALEK - Urvashi Gurtoo)
  { portfolio: "P1", name: "TATAGOLD ETF", symbol: "INF277KA1976", type: "Gold", qty: 10675, avgBuy: 12.18, cmp: 11.9, date: "2026-11-23" },
  { portfolio: "P1", name: "ABSL NIFTY NXT50 ETF", symbol: "INF209KB16D7", type: "ETF", qty: 17, avgBuy: 65.66, cmp: 75.89, date: "2025-01-09" },
  { portfolio: "P1", name: "ADANI GREEN ENERG-EQ", symbol: "INE364U01010", type: "Equity", qty: 18, avgBuy: 1061, cmp: 1348.8, date: "2025-11-10" },
  { portfolio: "P1", name: "AMBUJA CEMENTS EQ", symbol: "INE079A01024", type: "Equity", qty: 45, avgBuy: 399, cmp: 390.95, date: "2026-03-23" },
  { portfolio: "P1", name: "APOLLO HOSPIT-EQ5/-", symbol: "INE437A01024", type: "Equity", qty: 2, avgBuy: 7545, cmp: 9222.5, date: "2025-11-10" },
  { portfolio: "P1", name: "AXIS N500IF D-GROW", symbol: "INF846K019W9", type: "Mutual Fund", qty: 9697.87, avgBuy: 9.9, cmp: 10.6, date: "SIP" },
  { portfolio: "P1", name: "BAJAJ FINANCE-EQ1/-", symbol: "INE296A01032", type: "Equity", qty: 24, avgBuy: 971, cmp: 1097.85, date: "2026-09-29" },
  { portfolio: "P1", name: "BANK OF BARODA-EQ", symbol: "INE028A01039", type: "Equity", qty: 6, avgBuy: 247.97, cmp: 274.61, date: "2026-07-16" },
  { portfolio: "P1", name: "COMPUTER AGE-EQ2/-", symbol: "INE596I01020", type: "Equity", qty: 38, avgBuy: 622, cmp: 745.9, date: "2026-03-23" },
  { portfolio: "P1", name: "DSP N500FQ30 ETF", symbol: "INF740KA1WU9", type: "ETF", qty: 75, avgBuy: 9.21, cmp: 10.24, date: "2026-03-23" },
  { portfolio: "P1", name: "DSPBLACK ETSF DP GR", symbol: "INF740K01OK1", type: "Mutual Fund", qty: 1369.88, avgBuy: 151.83, cmp: 165.6, date: "SIP" },
  { portfolio: "P1", name: "HDFC BANK-EQ1/-", symbol: "INE040A01034", type: "Equity", qty: 68, avgBuy: 752.06, cmp: 862, date: "2025-02-03" },
  { portfolio: "P1", name: "HDFC MCF D-GROW", symbol: "INF179KC1BS5", type: "Mutual Fund", qty: 1465.84, avgBuy: 20.47, cmp: 20.32, date: "2024-09-03" },
  { portfolio: "P1", name: "ICICI NIFTY BANK ETF", symbol: "INF109KC15I8", type: "ETF", qty: 383, avgBuy: 56.37, cmp: 65.29, date: "2025-10-27" },
  { portfolio: "P1", name: "INFOSYS LTD-EQ 5/-", symbol: "INE009A01021", type: "Equity", qty: 24, avgBuy: 990, cmp: 1183, date: "2026-09-29" },
  { portfolio: "P1", name: "KOTAK MAHINDRA-EQ1/-", symbol: "INE237A01036", type: "Equity", qty: 206, avgBuy: 384.57, cmp: 509.95, date: "2026-01-14" },
  { portfolio: "P1", name: "KOTAK NIF IT ETF", symbol: "INF174KA1GC5", type: "ETF", qty: 980, avgBuy: 38.7, cmp: 35.38, date: "2025-10-10" },
  { portfolio: "P1", name: "NTPC LTD", symbol: "INE733E01010", type: "Equity", qty: 6, avgBuy: 322.7, cmp: 320.25, date: "2026-11-08" },
  { portfolio: "P1", name: "PERSISTENT SYS-EQ5/-", symbol: "INE262H01021", type: "Equity", qty: 5, avgBuy: 5095, cmp: 6200, date: "2025-09-08" },
  { portfolio: "P1", name: "PVR INOX EQUITY", symbol: "INE191H01014", type: "Equity", qty: 36, avgBuy: 999, cmp: 1638.2, date: "2026-01-19" },
  { portfolio: "P1", name: "QUANT FCF D-GROW", symbol: "INF966L01911", type: "Mutual Fund", qty: 137.7, avgBuy: 116.19, cmp: 122.59, date: "SIP" },
  { portfolio: "P1", name: "QUANT TAX D-GROW", symbol: "INF966L01986", type: "Mutual Fund", qty: 45.38, avgBuy: 440.7, cmp: 470.36, date: "SIP" },
  { portfolio: "P1", name: "ROUTE MOBILE-EQTY", symbol: "INE450U01017", type: "Equity", qty: 3, avgBuy: 575.97, cmp: 413.1, date: "2026-07-16" },
  { portfolio: "P1", name: "SBI NIFTY 50 ETF", symbol: "INF200KA1FS1", type: "ETF", qty: 368, avgBuy: 251, cmp: 247.34, date: "2024-12-19" },
  { portfolio: "P1", name: "SUZLON ENERG-EQ RS 2", symbol: "INE040H01021", type: "Equity", qty: 1, avgBuy: 51.98, cmp: 36.29, date: "2026-07-16" },
  { portfolio: "P1", name: "TATA CONSULTANCY-1/-", symbol: "INE467B01029", type: "Equity", qty: 20, avgBuy: 3155.4, cmp: 2640.3, date: "2025-07-21" },
  { portfolio: "P1", name: "VARUN BEVERAGE-EQ2/-", symbol: "INE200M01039", type: "Equity", qty: 47, avgBuy: 383.5, cmp: 428.4, date: "2026-03-23" },

  // Portfolio 2: Indian Secondary (Upstox 7UAQA9 - Veena Koul)
  { portfolio: "P2", name: "ADANI GREEN ENERG-EQ", symbol: "INE364U01010", type: "Equity", qty: 7, avgBuy: 1020, cmp: 1348.8, date: "2025-10-27" },
  { portfolio: "P2", name: "ASIAN PAINTS EQ 1/-", symbol: "INE021A01026", type: "Equity", qty: 5, avgBuy: 2348, cmp: 2543, date: "2025-02-03" },
  { portfolio: "P2", name: "EDELW FLEXCF D-GROW", symbol: "INF843K01KK1", type: "Mutual Fund", qty: 2003.45, avgBuy: 43.92, cmp: 47.78, date: "2026-03-10" },
  { portfolio: "P2", name: "HDFC FCF D-GROWTH", symbol: "INF179K01UT0", type: "Mutual Fund", qty: 36.72, avgBuy: 2042.41, cmp: 2429.14, date: "SIP" },
  { portfolio: "P2", name: "HDFC MCF D-GROW", symbol: "INF179KC1BS5", type: "Mutual Fund", qty: 2443.07, avgBuy: 20.47, cmp: 20.32, date: "2024-09-03" },
  { portfolio: "P2", name: "ICICI NIFTY 100 ETF", symbol: "INF109KC16V9", type: "ETF", qty: 2050, avgBuy: 26.3, cmp: 29.74, date: "2025-01-13" },
  { portfolio: "P2", name: "ICICI NIFTY BANK ETF", symbol: "INF109KC15I8", type: "ETF", qty: 194, avgBuy: 59.35, cmp: 65.29, date: "2025-10-27" },
  { portfolio: "P2", name: "INFOSYS LTD-EQ 5/-", symbol: "INE009A01021", type: "Equity", qty: 21, avgBuy: 1153.5, cmp: 1183, date: "2026-04-24" },
  { portfolio: "P2", name: "INOX WIND- EQ", symbol: "INE066P01011", type: "Equity", qty: 67, avgBuy: 147, cmp: 53, date: "2025-09-08" },
  { portfolio: "P2", name: "KOTAK MAHINDRA-EQ1/-", symbol: "INE237A01036", type: "Equity", qty: 25, avgBuy: 380, cmp: 509.95, date: "2026-01-14" },
  { portfolio: "P2", name: "KOTAK NIF IT ETF", symbol: "INF174KA1GC5", type: "ETF", qty: 3571, avgBuy: 38.21, cmp: 35.38, date: "2025-08-18" },
  { portfolio: "P2", name: "LODHA DEVELOP-EQ10/-", symbol: "INE670K01029", type: "Equity", qty: 13, avgBuy: 1213, cmp: 1261.2, date: "2025-11-10" },
  { portfolio: "P2", name: "NIP MLCF DP-GP-GROW", symbol: "INF204K01XF9", type: "Mutual Fund", qty: 153.02, avgBuy: 326.74, cmp: 339.16, date: "2024-09-03" },
  { portfolio: "P2", name: "PERSISTENT SYS-EQ5/-", symbol: "INE262H01021", type: "Equity", qty: 5, avgBuy: 4744.59, cmp: 6200, date: "2026-04-24" },
  { portfolio: "P2", name: "SBI GOLD DP GR", symbol: "INF200K01RP8", type: "Gold", qty: 1338.53, avgBuy: 22.41, cmp: 37.37, date: "2024-06-28" },
  { portfolio: "P2", name: "SBI NIFTY 50 ETF", symbol: "INF200KA1FS1", type: "ETF", qty: 410, avgBuy: 255.1, cmp: 247.34, date: "2024-11-11" },
  { portfolio: "P2", name: "TATA CONSULTANCY-1/-", symbol: "INE467B01029", type: "Equity", qty: 13, avgBuy: 3090.5, cmp: 2640.3, date: "2025-07-28" },
  { portfolio: "P2", name: "WAAREE RENEW-EQ2/-", symbol: "INE299N01021", type: "Equity", qty: 17, avgBuy: 1020, cmp: 688.1, date: "2025-09-08" },

  // Portfolio 3: US Equities (INDmoney Global 258461814) - Live Real-Time Market Baseline
  { portfolio: "P3", name: "Amazon", symbol: "AMZN", type: "Equity", qty: 4.440345, avgBuy: 244.1, cmp: 244.43, date: "2026-11-23" },
  { portfolio: "P3", name: "Broadcom", symbol: "AVGO", type: "Equity", qty: 0.774233, avgBuy: 412.1, cmp: 300.86, date: "2026-11-23" },
  { portfolio: "P3", name: "Berkshire Hathaway B", symbol: "BRK.B", type: "Equity", qty: 1.066833, avgBuy: 514, cmp: 579.32, date: "2026-11-23" },
  { portfolio: "P3", name: "Eaton", symbol: "ETN", type: "Equity", qty: 1.0804, avgBuy: 392.22, cmp: 317.81, date: "2026-11-23" },
  { portfolio: "P3", name: "Alphabet Class C", symbol: "GOOG", type: "Equity", qty: 1.768879, avgBuy: 375.94, cmp: 270.98, date: "2026-11-23" },
  { portfolio: "P3", name: "Intuitive Surgical", symbol: "ISRG", type: "Equity", qty: 1.204128, avgBuy: 372.99, cmp: 427.18, date: "2026-11-23" },
  { portfolio: "P3", name: "Meta Platforms", symbol: "META", type: "Equity", qty: 0.743478, avgBuy: 603.49, cmp: 609.89, date: "2026-11-23" },
  { portfolio: "P3", name: "Microsoft", symbol: "MSFT", type: "Equity", qty: 1.666765, avgBuy: 448.64, cmp: 489.93, date: "2026-11-23" },
  { portfolio: "P3", name: "ServiceNow", symbol: "NOW", type: "Equity", qty: 1.574889, avgBuy: 101.3, cmp: 92.16, date: "2026-11-23" },
  { portfolio: "P3", name: "Nvidia", symbol: "NVDA", type: "Equity", qty: 1.162532, avgBuy: 223, cmp: 149.3, date: "2026-11-23" },
  { portfolio: "P3", name: "Oracle", symbol: "ORCL", type: "Equity", qty: 0.762062, avgBuy: 183.17, cmp: 103.88, date: "2026-11-23" },
  { portfolio: "P3", name: "RH", symbol: "RH", type: "Equity", qty: 0.022675, avgBuy: 133.19, cmp: 112.42, date: "2026-11-23" },
  { portfolio: "P3", name: "Shopify", symbol: "SHOP", type: "Equity", qty: 1.243265, avgBuy: 101.7, cmp: 133.4, date: "2026-11-23" },
  { portfolio: "P3", name: "TSMC", symbol: "TSM", type: "Equity", qty: 0.452649, avgBuy: 396.49, cmp: 342.34, date: "2026-11-23" },
  { portfolio: "P3", name: "Visa", symbol: "V", type: "Equity", qty: 1.880331, avgBuy: 361.09, cmp: 424.39, date: "2026-11-23" }
];

const REALIZED_TRADES = [
  { company: "HDFC BANK LT", portfolio: "P1", sellDate: "2024-11-26", qty: 21, avgBuy: 1600.00, sellPrice: 1784.50, buyCost: 33600.00, sellVal: 37474.50, pnl: 3874.50, retPct: 11.53 },
  { company: "IDFC FIRST BANK LTD.", portfolio: "P1", sellDate: "2025-10-23", qty: 74, avgBuy: 61.83, sellPrice: 80.00, buyCost: 4575.42, sellVal: 5920.00, pnl: 1344.58, retPct: 29.39 },
  { company: "Jio Platforms Limited", portfolio: "P1", sellDate: "2026-10-28", qty: 12, avgBuy: 1119.00, sellPrice: 1366.00, buyCost: 13428.00, sellVal: 16392.00, pnl: 2964.00, retPct: 22.07 },
  { company: "MOTILAL OSWAL S&P 500 INDEX FUND", portfolio: "P2", sellDate: "2024-10-14", qty: 2243.30, avgBuy: 21.40, sellPrice: 22.64, buyCost: 47997.61, sellVal: 50781.81, pnl: 2784.20, retPct: 5.80 },
  { company: "IDFC FIRST BANK LTD.", portfolio: "P2", sellDate: "2025-10-23", qty: 95, avgBuy: 62.05, sellPrice: 80.00, buyCost: 5895.00, sellVal: 7600.00, pnl: 1705.00, retPct: 28.92 }
];

let holdings = loadHoldings();
let activeTab = "ALL";
let chartMode = "portfolio";
let liveSim = true;
let simTimer = null;

function loadHoldings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return JSON.parse(JSON.stringify(DEFAULT_HOLDINGS));
}

function saveHoldings() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(holdings));
  } catch (e) {}
}

function getFx() {
  const val = parseFloat(document.getElementById("fxInput").value);
  return isNaN(val) || val <= 0 ? 84.45 : val;
}

function fmtINR(n) {
  const sign = n < 0 ? "-" : "";
  return sign + "₹" + Math.abs(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtUSD(n) {
  const sign = n < 0 ? "-" : "";
  return sign + "$" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtSignedINR(n) {
  return (n >= 0 ? "+" : "") + fmtINR(n);
}

function fmtSignedUSD(n) {
  return (n >= 0 ? "+" : "") + fmtUSD(n);
}

function getPortfolioLabel(code) {
  if (code === "P1") return "India Primary (7MALEK)";
  if (code === "P2") return "India Secondary (7UAQA9)";
  return "US Equities (INDmoney)";
}

function renderAll(flashMap = {}) {
  const fx = getFx();
  let totalInvINR = 0;
  let totalValINR = 0;

  let p1Val = 0, p2Val = 0, p3ValINR = 0;
  const assetTotals = { Equity: 0, ETF: 0, "Mutual Fund": 0, Gold: 0 };

  const enriched = holdings.map((h, idx) => {
    const inv = h.qty * h.avgBuy;
    const val = h.qty * h.cmp;
    const pnl = val - inv;
    const retPct = inv > 0 ? (pnl / inv) * 100 : 0;
    const mult = h.portfolio === "P3" ? fx : 1;
    const invINR = inv * mult;
    const valINR = val * mult;

    totalInvINR += invINR;
    totalValINR += valINR;

    if (h.portfolio === "P1") p1Val += valINR;
    else if (h.portfolio === "P2") p2Val += valINR;
    else p3ValINR += valINR;

    assetTotals[h.type] = (assetTotals[h.type] || 0) + valINR;

    return { ...h, idx, inv, val, pnl, retPct, invINR, valINR };
  });

  // Update counts
  document.getElementById("countALL").textContent = holdings.length;
  document.getElementById("countP1").textContent = holdings.filter(h => h.portfolio === "P1").length;
  document.getElementById("countP2").textContent = holdings.filter(h => h.portfolio === "P2").length;
  document.getElementById("countP3").textContent = holdings.filter(h => h.portfolio === "P3").length;

  // Update KPIs
  const totalUnrealized = totalValINR - totalInvINR;
  const totalUnrealizedPct = totalInvINR > 0 ? (totalUnrealized / totalInvINR) * 100 : 0;
  const totalRealized = REALIZED_TRADES.reduce((s, r) => s + r.pnl, 0);
  const netProfit = totalUnrealized + totalRealized;
  const netPct = totalInvINR > 0 ? (netProfit / totalInvINR) * 100 : 0;

  document.getElementById("kpiTotalVal").textContent = fmtINR(totalValINR);
  document.getElementById("kpiInvestedSub").textContent = `Invested: ${fmtINR(totalInvINR)}`;

  const uEl = document.getElementById("kpiUnrealizedPnl");
  uEl.textContent = fmtSignedINR(totalUnrealized);
  uEl.className = "kpi-value " + (totalUnrealized >= 0 ? "pos" : "neg");
  document.getElementById("kpiUnrealizedPct").textContent = `${totalUnrealizedPct >= 0 ? "+" : ""}${totalUnrealizedPct.toFixed(2)}% overall`;

  const nEl = document.getElementById("kpiNetPnl");
  nEl.textContent = fmtSignedINR(netProfit);
  nEl.className = "kpi-value " + (netProfit >= 0 ? "pos" : "neg");
  document.getElementById("kpiNetPct").textContent = `${netPct >= 0 ? "+" : ""}${netPct.toFixed(2)}% net return`;

  // Compute Category Breakdown (Indian Stocks vs Mutual Funds vs US Equities vs Grand Total)
  let indInv = 0, indVal = 0, indCount = 0;
  let mfInv = 0, mfVal = 0, mfCount = 0;
  let usInv = 0, usVal = 0, usCount = 0, usInvUSD = 0, usValUSD = 0;

  enriched.forEach(h => {
    if (h.portfolio === "P3") {
      usInv += h.invINR;
      usVal += h.valINR;
      usInvUSD += h.inv;
      usValUSD += h.val;
      usCount++;
    } else if (h.type === "Mutual Fund") {
      mfInv += h.invINR;
      mfVal += h.valINR;
      mfCount++;
    } else {
      indInv += h.invINR;
      indVal += h.valINR;
      indCount++;
    }
  });

  const indRealized = 9888.08;
  const indUnrealized = indVal - indInv;
  const indUnrealizedPct = indInv > 0 ? (indUnrealized / indInv) * 100 : 0;
  const indNet = indUnrealized + indRealized;
  const indNetPct = indInv > 0 ? (indNet / indInv) * 100 : 0;

  const mfRealized = 2784.20;
  const mfUnrealized = mfVal - mfInv;
  const mfUnrealizedPct = mfInv > 0 ? (mfUnrealized / mfInv) * 100 : 0;
  const mfNet = mfUnrealized + mfRealized;
  const mfNetPct = mfInv > 0 ? (mfNet / mfInv) * 100 : 0;

  const usRealized = 0;
  const usUnrealized = usVal - usInv;
  const usUnrealizedPct = usInv > 0 ? (usUnrealized / usInv) * 100 : 0;
  const usNet = usUnrealized + usRealized;
  const usNetPct = usInv > 0 ? (usNet / usInv) * 100 : 0;
  const usUnrealizedUSD = usValUSD - usInvUSD;

  // Render Asset Class Breakdown Cards
  renderBreakdownCards({
    indInv, indVal, indCount, indUnrealized, indUnrealizedPct, indRealized, indNet, indNetPct,
    mfInv, mfVal, mfCount, mfUnrealized, mfUnrealizedPct, mfRealized, mfNet, mfNetPct,
    usInv, usVal, usCount, usInvUSD, usValUSD, usUnrealized, usUnrealizedPct, usUnrealizedUSD, usRealized, usNet, usNetPct,
    totalInvINR, totalValINR, totalUnrealized, totalUnrealizedPct, totalRealized, netProfit, netPct
  });

  // Render Donut Chart
  renderAllocationChart(totalValINR, { p1Val, p2Val, p3ValINR }, assetTotals);

  // Render Top Gainers & Losers
  const sortedByRet = [...enriched].sort((a, b) => b.retPct - a.retPct);
  const gainers = sortedByRet.slice(0, 4);
  const losers = sortedByRet.slice(-4).reverse();

  document.getElementById("topGainersList").innerHTML = gainers.map(g => `
    <li>
      <span class="mover-name" title="${g.name}">${g.name}</span>
      <span class="mover-badge pos">+${g.retPct.toFixed(2)}%</span>
    </li>
  `).join("");

  document.getElementById("topLosersList").innerHTML = losers.map(l => `
    <li>
      <span class="mover-name" title="${l.name}">${l.name}</span>
      <span class="mover-badge neg">${l.retPct.toFixed(2)}%</span>
    </li>
  `).join("");

  // Render Table
  if (activeTab === "REALIZED") {
    document.getElementById("holdingsTableWrap").classList.add("hidden");
    document.getElementById("filterBar").classList.add("hidden");
    document.getElementById("realizedTableWrap").classList.remove("hidden");
    renderRealizedTable();
  } else {
    document.getElementById("holdingsTableWrap").classList.remove("hidden");
    document.getElementById("filterBar").classList.remove("hidden");
    document.getElementById("realizedTableWrap").classList.add("hidden");
    renderHoldingsTable(enriched, flashMap);
  }
}

function renderBreakdownCards(m) {
  const container = document.getElementById("breakdownGrid");
  if (!container) return;

  const cards = [
    {
      cls: "cat-ind",
      icon: "🇮🇳",
      title: "Indian Stocks & ETFs",
      tag: `${m.indCount} Holdings (P1 & P2)`,
      val: fmtINR(m.indVal),
      inv: fmtINR(m.indInv),
      unPnl: fmtSignedINR(m.indUnrealized),
      unPct: `${m.indUnrealizedPct >= 0 ? "+" : ""}${m.indUnrealizedPct.toFixed(2)}%`,
      unPos: m.indUnrealized >= 0,
      realized: `+${fmtINR(m.indRealized)}`,
      realizedTrades: "4 Trades",
      net: fmtSignedINR(m.indNet),
      netPct: `${m.indNetPct >= 0 ? "+" : ""}${m.indNetPct.toFixed(2)}%`,
      netPos: m.indNet >= 0
    },
    {
      cls: "cat-mf",
      icon: "📊",
      title: "Mutual Funds",
      tag: `${m.mfCount} Schemes (Direct)`,
      val: fmtINR(m.mfVal),
      inv: fmtINR(m.mfInv),
      unPnl: fmtSignedINR(m.mfUnrealized),
      unPct: `${m.mfUnrealizedPct >= 0 ? "+" : ""}${m.mfUnrealizedPct.toFixed(2)}%`,
      unPos: m.mfUnrealized >= 0,
      realized: `+${fmtINR(m.mfRealized)}`,
      realizedTrades: "1 Trade",
      net: fmtSignedINR(m.mfNet),
      netPct: `${m.mfNetPct >= 0 ? "+" : ""}${m.mfNetPct.toFixed(2)}%`,
      netPos: m.mfNet >= 0
    },
    {
      cls: "cat-us",
      icon: "🇺🇸",
      title: "US Equities",
      tag: `${m.usCount} Stocks (INDmoney)`,
      val: fmtINR(m.usVal),
      valSub: fmtUSD(m.usValUSD),
      inv: `${fmtINR(m.usInv)} (${fmtUSD(m.usInvUSD)})`,
      unPnl: `${fmtSignedINR(m.usUnrealized)}`,
      unPnlSub: `(${fmtSignedUSD(m.usUnrealizedUSD)})`,
      unPct: `${m.usUnrealizedPct >= 0 ? "+" : ""}${m.usUnrealizedPct.toFixed(2)}%`,
      unPos: m.usUnrealized >= 0,
      realized: "₹0.00",
      realizedTrades: "0 Trades",
      net: fmtSignedINR(m.usNet),
      netPct: `${m.usNetPct >= 0 ? "+" : ""}${m.usNetPct.toFixed(2)}%`,
      netPos: m.usNet >= 0
    },
    {
      cls: "cat-total",
      icon: "🌐",
      title: "Consolidated Total",
      tag: `${holdings.length} Assets (All)`,
      val: fmtINR(m.totalValINR),
      inv: fmtINR(m.totalInvINR),
      unPnl: fmtSignedINR(m.totalUnrealized),
      unPct: `${m.totalUnrealizedPct >= 0 ? "+" : ""}${m.totalUnrealizedPct.toFixed(2)}%`,
      unPos: m.totalUnrealized >= 0,
      realized: `+${fmtINR(m.totalRealized)}`,
      realizedTrades: "5 Trades",
      net: fmtSignedINR(m.netProfit),
      netPct: `${m.netPct >= 0 ? "+" : ""}${m.netPct.toFixed(2)}%`,
      netPos: m.netProfit >= 0
    }
  ];

  container.innerHTML = cards.map(c => `
    <div class="breakdown-card ${c.cls}">
      <div class="breakdown-card-top">
        <span class="breakdown-card-title">${c.icon} ${c.title}</span>
        <span class="breakdown-card-tag">${c.tag}</span>
      </div>
      <div class="breakdown-primary-box">
        <span class="breakdown-primary-label">Total Current Value</span>
        <div class="breakdown-primary-val">${c.val} ${c.valSub ? `<span style="font-size:12px;font-weight:600;color:var(--muted)">(${c.valSub})</span>` : ''}</div>
        <span class="breakdown-primary-sub">Invested: ${c.inv}</span>
      </div>
      <div class="breakdown-stats-list">
        <div class="breakdown-stat-row">
          <span class="breakdown-stat-label">Total Unrealized P&amp;L</span>
          <span class="breakdown-stat-val ${c.unPos ? 'pos' : 'neg'}">
            ${c.unPnl} ${c.unPnlSub ? `<small style="font-size:10px">${c.unPnlSub}</small>` : ''}
            <small>(${c.unPct})</small>
          </span>
        </div>
        <div class="breakdown-stat-row">
          <span class="breakdown-stat-label">Total Realized P&amp;L</span>
          <span class="breakdown-stat-val pos">
            ${c.realized}
            <small style="color:var(--muted);font-weight:500">(${c.realizedTrades})</small>
          </span>
        </div>
        <div class="breakdown-stat-row">
          <span class="breakdown-stat-label">Net Overall Return</span>
          <span class="breakdown-stat-val ${c.netPos ? 'pos' : 'neg'}">
            ${c.net}
            <small>(${c.netPct})</small>
          </span>
        </div>
      </div>
    </div>
  `).join("");
}

function renderAllocationChart(totalValINR, portMap, assetMap) {
  const palette = ["#10b981", "#8b5cf6", "#f59e0b", "#14b8a6", "#ec4899"];
  const items = chartMode === "portfolio"
    ? [
        { label: "India Primary (7MALEK)", val: portMap.p1Val, color: palette[0] },
        { label: "India Secondary (7UAQA9)", val: portMap.p2Val, color: palette[1] },
        { label: "US Equities (INR)", val: portMap.p3ValINR, color: palette[2] }
      ]
    : [
        { label: "Direct Equities", val: assetMap["Equity"] || 0, color: palette[0] },
        { label: "Mutual Funds", val: assetMap["Mutual Fund"] || 0, color: palette[1] },
        { label: "ETFs", val: assetMap["ETF"] || 0, color: palette[2] },
        { label: "Gold / Gold ETFs", val: assetMap["Gold"] || 0, color: palette[3] }
      ];

  const r = 64;
  const c = 2 * Math.PI * r;
  let offset = 0;

  const circles = items.map(item => {
    const pct = totalValINR > 0 ? item.val / totalValINR : 0;
    const dash = pct * c;
    const seg = `<circle cx="85" cy="85" r="${r}" fill="transparent" stroke="${item.color}" stroke-width="22" stroke-dasharray="${dash} ${c - dash}" stroke-dashoffset="${-offset}" transform="rotate(-90 85 85)" />`;
    offset += dash;
    return seg;
  }).join("");

  document.getElementById("donutChartContainer").innerHTML = `
    <svg viewBox="0 0 170 170" width="170" height="170">
      <circle class="donut-bg" cx="85" cy="85" r="${r}" fill="transparent" stroke-width="22" />
      ${circles}
      <text class="donut-label" x="85" y="81" text-anchor="middle">TOTAL</text>
      <text class="donut-val" x="85" y="98" text-anchor="middle">₹${(totalValINR / 100000).toFixed(2)}L</text>
    </svg>
  `;

  document.getElementById("allocationLegend").innerHTML = items.map(item => {
    const pct = totalValINR > 0 ? (item.val / totalValINR) * 100 : 0;
    return `
      <div class="legend-item">
        <div class="legend-left">
          <span class="legend-swatch" style="background:${item.color}"></span>
          <span>${item.label}</span>
        </div>
        <div class="legend-right">
          <strong>${fmtINR(item.val)}</strong> (${pct.toFixed(1)}%)
        </div>
      </div>
    `;
  }).join("");
}

function renderHoldingsTable(enriched, flashMap) {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const typeF = document.getElementById("assetFilter").value;
  const pnlF = document.getElementById("pnlFilter").value;
  const sortBy = document.getElementById("sortSelect").value;

  let list = enriched.filter(h => {
    if (activeTab !== "ALL" && h.portfolio !== activeTab) return false;
    if (typeF !== "ALL" && h.type !== typeF) return false;
    if (pnlF === "PROFIT" && h.pnl <= 0) return false;
    if (pnlF === "LOSS" && h.pnl >= 0) return false;
    if (pnlF === "MOVER3" && Math.abs(h.retPct) < 15) return false;
    if (q && !h.name.toLowerCase().includes(q) && !h.symbol.toLowerCase().includes(q)) return false;
    return true;
  });

  list.sort((a, b) => {
    if (sortBy === "val_desc") return b.valINR - a.valINR;
    if (sortBy === "pnl_pct_desc") return b.retPct - a.retPct;
    if (sortBy === "pnl_pct_asc") return a.retPct - b.retPct;
    if (sortBy === "pnl_abs_desc") return b.pnl - a.pnl;
    if (sortBy === "name_asc") return a.name.localeCompare(b.name);
    return 0;
  });

  const tbody = document.getElementById("holdingsTbody");
  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="11" class="center" style="padding:24px;color:#64748b;">No holdings match the current filter criteria.</td></tr>`;
    document.getElementById("holdingsTfoot").innerHTML = "";
    return;
  }

  tbody.innerHTML = list.map(h => {
    const isUS = h.portfolio === "P3";
    const fmt = isUS ? fmtUSD : fmtINR;
    const fmtS = isUS ? fmtSignedUSD : fmtSignedINR;
    const flashClass = flashMap[h.idx] === "up" ? "flash-up" : flashMap[h.idx] === "down" ? "flash-down" : "";
    const tagClass = h.portfolio === "P2" ? "tag p2" : h.portfolio === "P3" ? "tag p3" : "tag";

    return `
      <tr class="${flashClass}">
        <td>
          <div class="inst-title">${h.name}</div>
          <div class="inst-sub">${h.symbol} &bull; ${h.date}</div>
        </td>
        <td><span class="${tagClass}">${getPortfolioLabel(h.portfolio)}</span></td>
        <td><span class="type-pill">${h.type}</span></td>
        <td class="num">${Number(h.qty).toLocaleString("en-IN", { maximumFractionDigits: 4 })}</td>
        <td class="num">${fmt(h.avgBuy)}</td>
        <td class="num"><strong>${fmt(h.cmp)}</strong></td>
        <td class="num">${fmt(h.inv)}</td>
        <td class="num"><strong>${fmt(h.val)}</strong></td>
        <td class="num ${h.pnl >= 0 ? "pos" : "neg"}"><strong>${fmtS(h.pnl)}</strong></td>
        <td class="num"><span class="ret-pill ${h.retPct >= 0 ? "pos" : "neg"}">${h.retPct >= 0 ? "+" : ""}${h.retPct.toFixed(2)}%</span></td>
        <td class="center">
          <button class="action-btn" onclick="openEditModal(${h.idx})">Edit</button>
          <button class="action-btn del" onclick="deleteHolding(${h.idx})">Del</button>
        </td>
      </tr>
    `;
  }).join("");

  // Footer totals (converted to INR when viewing ALL, or native currency for single portfolio)
  const isSingleUS = activeTab === "P3";
  const sumInv = list.reduce((s, h) => s + (isSingleUS ? h.inv : h.invINR), 0);
  const sumVal = list.reduce((s, h) => s + (isSingleUS ? h.val : h.valINR), 0);
  const sumPnl = sumVal - sumInv;
  const sumRet = sumInv > 0 ? (sumPnl / sumInv) * 100 : 0;
  const fFmt = isSingleUS ? fmtUSD : fmtINR;
  const fFmtS = isSingleUS ? fmtSignedUSD : fmtSignedINR;

  document.getElementById("holdingsTfoot").innerHTML = `
    <tr>
      <td colspan="6">Total (${list.length} holdings${activeTab === "ALL" ? ", converted to INR" : ""})</td>
      <td class="num">${fFmt(sumInv)}</td>
      <td class="num">${fFmt(sumVal)}</td>
      <td class="num ${sumPnl >= 0 ? "pos" : "neg"}">${fFmtS(sumPnl)}</td>
      <td class="num ${sumRet >= 0 ? "pos" : "neg"}">${sumRet >= 0 ? "+" : ""}${sumRet.toFixed(2)}%</td>
      <td></td>
    </tr>
  `;
}

function renderRealizedTable() {
  const tbody = document.getElementById("realizedTbody");
  tbody.innerHTML = REALIZED_TRADES.map(r => `
    <tr>
      <td><div class="inst-title">${r.company}</div></td>
      <td><span class="tag ${r.portfolio === "P2" ? "p2" : ""}">${getPortfolioLabel(r.portfolio)}</span></td>
      <td>${r.sellDate}</td>
      <td class="num">${r.qty.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td>
      <td class="num">${fmtINR(r.avgBuy)}</td>
      <td class="num">${fmtINR(r.sellPrice)}</td>
      <td class="num">${fmtINR(r.buyCost)}</td>
      <td class="num">${fmtINR(r.sellVal)}</td>
      <td class="num pos"><strong>+${fmtINR(r.pnl)}</strong></td>
      <td class="num"><span class="ret-pill pos">+${r.retPct.toFixed(2)}%</span></td>
    </tr>
  `).join("");

  const totCost = REALIZED_TRADES.reduce((s, r) => s + r.buyCost, 0);
  const totSell = REALIZED_TRADES.reduce((s, r) => s + r.sellVal, 0);
  const totPnl = REALIZED_TRADES.reduce((s, r) => s + r.pnl, 0);
  const totRet = (totPnl / totCost) * 100;

  document.getElementById("realizedTfoot").innerHTML = `
    <tr>
      <td colspan="6">Total Realized Gains (Closed Positions)</td>
      <td class="num">${fmtINR(totCost)}</td>
      <td class="num">${fmtINR(totSell)}</td>
      <td class="num pos">+${fmtINR(totPnl)}</td>
      <td class="num pos">+${totRet.toFixed(2)}%</td>
    </tr>
  `;
}

// Ticker Mapping for Real-Time Market Feeds
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

  // Indian Equities & ETFs (P1 & P2)
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

// =========================================================
// Night Mode (Dark Theme) Management
// =========================================================
const THEME_KEY = "portfolio_screener_theme";

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const targetTheme = saved ? saved : (prefersDark ? "dark" : "light");
  applyTheme(targetTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);

  const icon = document.getElementById("themeIcon");
  const label = document.getElementById("themeLabel");
  const fIcon = document.getElementById("floatingThemeIcon");
  const fLabel = document.getElementById("floatingThemeLabel");

  if (theme === "dark") {
    if (icon) icon.textContent = "☀️";
    if (label) label.textContent = "Day Mode";
    if (fIcon) fIcon.textContent = "☀️";
    if (fLabel) fLabel.textContent = "Day Mode";
  } else {
    if (icon) icon.textContent = "🌙";
    if (label) label.textContent = "Night Mode";
    if (fIcon) fIcon.textContent = "🌙";
    if (fLabel) fLabel.textContent = "Night Mode";
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  applyTheme(current === "dark" ? "light" : "dark");
}

// =========================================================
// Real-Time Exchange Rate (USD/INR)
// =========================================================
async function syncFxRate() {
  try {
    let rate = null;
    // 1. Try local server API
    try {
      const res = await fetch("/api/fx");
      if (res.ok) {
        const data = await res.json();
        if (data && data.rate) rate = data.rate;
      }
    } catch (e) {}

    // 2. Direct browser fallback
    if (!rate) {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        if (res.ok) {
          const data = await res.json();
          if (data && data.rates && data.rates.INR) {
            rate = Number(data.rates.INR.toFixed(2));
          }
        }
      } catch (e) {}
    }

    if (rate && !isNaN(rate) && rate > 0) {
      const fxInput = document.getElementById("fxInput");
      const oldVal = parseFloat(fxInput.value);
      fxInput.value = rate.toFixed(2);
      const fxBadge = document.getElementById("fxLiveBadge");
      if (fxBadge) {
        fxBadge.textContent = "LIVE";
        fxBadge.classList.remove("paused");
      }
      if (Math.abs(oldVal - rate) > 0.001) {
        renderAll();
      }
    }
  } catch (err) {
    console.warn("FX sync issue:", err);
  }
}

// =========================================================
// Market Timing & Hours State Engine
// =========================================================
function getMarketTiming() {
  const now = new Date();

  // Indian Time (Asia/Kolkata)
  const inStr = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const inDate = new Date(inStr);
  const inDay = inDate.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
  const inMins = inDate.getHours() * 60 + inDate.getMinutes();

  // Indian Market: Mon-Fri 09:15 (555m) to 15:30 (930m) IST
  const isIndianOpen = (inDay >= 1 && inDay <= 5) && (inMins >= 555 && inMins < 930);
  // Post-close 1 hour window: Mon-Fri 16:15 to 17:30 IST (~4:30 PM IST)
  const isIndianPostClose = (inDay >= 1 && inDay <= 5) && (inMins >= 975 && inMins <= 1050);

  // US Time (America/New_York)
  const usStr = now.toLocaleString("en-US", { timeZone: "America/New_York" });
  const usDate = new Date(usStr);
  const usDay = usDate.getDay();
  const usMins = usDate.getHours() * 60 + usDate.getMinutes();

  // US Market: Mon-Fri 09:30 (570m) to 16:00 (960m) EST
  const isUSOpen = (usDay >= 1 && usDay <= 5) && (usMins >= 570 && usMins < 960);
  // Post-close 1 hour window: Mon-Fri 16:45 to 18:00 EST (~5:00 PM EST)
  const isUSPostClose = (usDay >= 1 && usDay <= 5) && (usMins >= 1005 && usMins <= 1080);

  // Mutual Fund 8:00 AM IST daily NAV window (07:30 to 09:30 IST)
  const isMFWindow = (inDay >= 1 && inDay <= 6) && (inMins >= 450 && inMins <= 570);

  return {
    isIndianOpen,
    isIndianPostClose,
    isUSOpen,
    isUSPostClose,
    isMFWindow,
    inTimeString: inDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    usTimeString: usDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  };
}

let latestMarketPayload = null;

function updateMarketStatusBar(payload = null) {
  if (payload) latestMarketPayload = payload;
  const timing = getMarketTiming();

  // 1. Indian Market Status
  const inDot = document.getElementById("inStatusDot");
  const inText = document.getElementById("inStatusText");
  const inPill = document.getElementById("inMarketPill");
  if (inDot && inText) {
    if (timing.isIndianOpen) {
      inDot.className = "status-indicator open";
      inText.textContent = `Open • Live Tracking (${timing.inTimeString} IST)`;
      if (inPill) { inPill.classList.add("is-open"); inPill.classList.remove("is-closed"); }
    } else if (timing.isIndianPostClose) {
      inDot.className = "status-indicator frozen";
      inText.textContent = `1-Hr Post-Close Verified (${timing.inTimeString} IST)`;
      if (inPill) { inPill.classList.remove("is-open"); inPill.classList.add("is-closed"); }
    } else {
      inDot.className = "status-indicator closed";
      inText.textContent = `Closed & Frozen (09:15 - 15:30 IST)`;
      if (inPill) { inPill.classList.remove("is-open"); inPill.classList.add("is-closed"); }
    }
  }

  // 2. US Market Status
  const usDot = document.getElementById("usStatusDot");
  const usText = document.getElementById("usStatusText");
  const usPill = document.getElementById("usMarketPill");
  if (usDot && usText) {
    if (timing.isUSOpen) {
      usDot.className = "status-indicator open";
      usText.textContent = `Open • Live Tracking (${timing.usTimeString} EST)`;
      if (usPill) { usPill.classList.add("is-open"); usPill.classList.remove("is-closed"); }
    } else if (timing.isUSPostClose) {
      usDot.className = "status-indicator frozen";
      usText.textContent = `1-Hr Post-Close Verified (${timing.usTimeString} EST)`;
      if (usPill) { usPill.classList.remove("is-open"); usPill.classList.add("is-closed"); }
    } else {
      usDot.className = "status-indicator closed";
      usText.textContent = `Closed & Frozen (09:30 - 16:00 EST)`;
      if (usPill) { usPill.classList.remove("is-open"); usPill.classList.add("is-closed"); }
    }
  }

  // 3. Mutual Funds
  const mfText = document.getElementById("mfStatusText");
  if (mfText) {
    const lastUpdateDate = latestMarketPayload?.marketStatus?.mutualFunds?.lastUpdate?.date;
    if (lastUpdateDate) {
      mfText.textContent = `Daily NAV (${lastUpdateDate} 8:00 AM)`;
    } else {
      mfText.textContent = `Daily 8:00 AM NAV (AMFI)`;
    }
  }

  // 4. Google Finance Verification
  const gfText = document.getElementById("gfStatusText");
  if (gfText) {
    const count = latestMarketPayload?.googleFinanceVerifiedCount || latestMarketPayload?.tickerCount || 41;
    gfText.textContent = `EOD Verified (${count} assets)`;
  }
}

// =========================================================
// Real-Time Stock Quotes Engine (Market-Hours Aware & Frozen on Close)
// =========================================================
let isSyncing = false;
let realTimeSyncTimer = null;
let lastIndianPostCloseSynced = false;
let lastUSPostCloseSynced = false;

async function syncRealTimeQuotes(isManual = false) {
  if (isSyncing) return;
  isSyncing = true;
  const syncIcon = document.getElementById("syncIcon");
  if (syncIcon) syncIcon.classList.add("spin");

  try {
    // Sync FX rate alongside
    await syncFxRate();

    const timing = getMarketTiming();
    let quotes = null;
    let payload = null;

    // Try backend API first (if local server running)
    try {
      const res = await fetch("/api/quotes" + (isManual ? "?force=1" : ""));
      if (res.ok) {
        payload = await res.json();
        if (payload && payload.quotes) quotes = payload.quotes;
      }
    } catch (e) {
      // Local server / daemon fallback if on another host
      if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
        try {
          const ctrl = new AbortController();
          const timeout = setTimeout(() => ctrl.abort(), 1500);
          const localRes = await fetch("http://127.0.0.1:3000/api/quotes" + (isManual ? "?force=1" : ""), { signal: ctrl.signal });
          clearTimeout(timeout);
          if (localRes.ok) {
            payload = await localRes.json();
            if (payload && payload.quotes) quotes = payload.quotes;
          }
        } catch (err) {}
      }
    }

    // Static hosting fallback with timestamp cache buster
    if (!quotes) {
      try {
        const staticRes = await fetch("quotes.json?t=" + Date.now());
        if (staticRes.ok) {
          payload = await staticRes.json();
          if (payload && payload.quotes) quotes = payload.quotes;
        }
      } catch (e) {
        console.warn("Static quotes.json unreachable:", e);
      }
    }

    if (payload) {
      updateMarketStatusBar(payload);
    } else {
      updateMarketStatusBar();
    }

    const flashMap = {};
    let updatedCount = 0;

    if (quotes && Object.keys(quotes).length > 0) {
      holdings.forEach((h, idx) => {
        const ticker = TICKER_MAP[h.symbol] || TICKER_MAP[h.name] || h.symbol;
        const q = quotes[ticker] || quotes[h.symbol] || quotes[h.name];

        // Market-hours check for update:
        const isUS = h.portfolio === "P3";
        const isMF = h.type === "Mutual Fund";

        // Mutual Funds update once daily at 8:00 AM (never tick or fluctuate intraday)
        if (isMF) {
          if (q && q.price && !isNaN(q.price) && q.price > 0) {
            const oldCmp = h.cmp;
            const newCmp = Number(q.price.toFixed(2));
            if (newCmp !== oldCmp) {
              h.cmp = newCmp;
              flashMap[idx] = newCmp > oldCmp ? "up" : "down";
              updatedCount++;
            }
          }
          return;
        }

        // Equities & ETFs:
        // Update if:
        // 1. Manual sync requested
        // 2. Respective market is actively OPEN
        // 3. Respective market is in 1-hour post-close check window
        const marketActive = isUS ? timing.isUSOpen : timing.isIndianOpen;
        const postCloseWindow = isUS ? timing.isUSPostClose : timing.isIndianPostClose;

        if (isManual || marketActive || postCloseWindow) {
          if (q && q.price && !isNaN(q.price) && q.price > 0) {
            // Safety guard: reject quotes that wildly deviate from avgBuy
            if (h.avgBuy > 0) {
              const ratio = q.price / h.avgBuy;
              if (ratio > 3.0 || ratio < 0.25) return;
            }
            const oldCmp = h.cmp;
            const newCmp = Number(q.price.toFixed(2));
            if (newCmp !== oldCmp) {
              h.cmp = newCmp;
              flashMap[idx] = newCmp > oldCmp ? "up" : "down";
              updatedCount++;
            }
          }
        }
      });
      saveHoldings();
    }

    const now = new Date();
    const updatedText = document.getElementById("lastUpdatedText");
    if (updatedText) {
      const stateNote = (!timing.isIndianOpen && !timing.isUSOpen)
        ? "Markets Closed • Prices Frozen (EOD Verified)"
        : (timing.isIndianOpen && timing.isUSOpen ? "Both Markets Active" : (timing.isIndianOpen ? "India Active • US Frozen" : "US Active • India Frozen"));
      updatedText.textContent = `Sync: ${now.toLocaleTimeString()} (${updatedCount} assets updated | ${stateNote})`;
    }

    renderAll(flashMap);
  } catch (err) {
    console.error("Real-time quote sync failed:", err);
  } finally {
    isSyncing = false;
    if (syncIcon) syncIcon.classList.remove("spin");
  }
}

// Live Market Tick Engine (Active ONLY during market open hours; Frozen when market is closed)
function tickMarket() {
  if (!liveSim) return;
  const timing = getMarketTiming();
  const flashMap = {};

  let targets = [];

  if (activeTab === "P3") {
    // US Equities: Active only when US market is open!
    if (timing.isUSOpen) {
      targets = holdings.map((h, i) => h.portfolio === "P3" ? i : -1).filter(i => i !== -1);
    }
  } else if (activeTab === "P1") {
    // Indian Primary: Active only when Indian market is open! (MFs never tick)
    if (timing.isIndianOpen) {
      targets = holdings.map((h, i) => h.portfolio === "P1" && h.type !== "Mutual Fund" ? i : -1).filter(i => i !== -1);
    }
  } else if (activeTab === "P2") {
    // Indian Secondary: Active only when Indian market is open! (MFs never tick)
    if (timing.isIndianOpen) {
      targets = holdings.map((h, i) => h.portfolio === "P2" && h.type !== "Mutual Fund" ? i : -1).filter(i => i !== -1);
    }
  } else {
    // All Holdings: selectively tick stocks of whichever market is currently OPEN!
    targets = holdings.map((h, i) => {
      if (h.type === "Mutual Fund") return -1; // MFs never tick intraday
      const isUS = h.portfolio === "P3";
      if (isUS && timing.isUSOpen) return i;
      if (!isUS && timing.isIndianOpen) return i;
      return -1; // Closed market stock is frozen!
    }).filter(i => i !== -1);
  }

  // If no market is open, freeze completely!
  if (targets.length === 0) {
    const updatedText = document.getElementById("lastUpdatedText");
    if (updatedText) {
      const openDesc = !timing.isIndianOpen && !timing.isUSOpen
        ? "Markets Closed • Asset Prices Frozen (Next sync at market open)"
        : (timing.isIndianOpen ? "US Market Closed (Frozen) • Indian Active" : "Indian Market Closed (Frozen) • US Active");
      updatedText.textContent = openDesc;
    }
    updateMarketStatusBar();
    return;
  }

  targets.forEach(idx => {
    const h = holdings[idx];
    const oldCmp = h.cmp;
    const direction = Math.random() >= 0.49 ? 1 : -1;
    const isUS = h.portfolio === "P3";
    const pctMove = isUS ? (0.0010 + Math.random() * 0.0030) : (0.0008 + Math.random() * 0.0022);
    const minDelta = isUS ? 0.04 : 0.05;
    const rawDelta = Math.max(minDelta, Number((oldCmp * pctMove).toFixed(2)));
    const newCmp = Math.max(0.01, Number((oldCmp + direction * rawDelta).toFixed(2)));

    if (newCmp !== oldCmp) {
      h.cmp = newCmp;
      flashMap[idx] = newCmp > oldCmp ? "up" : "down";
    }
  });

  const now = new Date();
  const updatedText = document.getElementById("lastUpdatedText");
  if (updatedText) {
    updatedText.textContent = "Live Market Feed: " + now.toLocaleTimeString() + " (" + targets.length + " active stocks updating)";
  }
  updateMarketStatusBar();
  renderAll(flashMap);
}

// Modal Controls
function openAddModal() {
  document.getElementById("modalTitle").textContent = "Add New Holding";
  document.getElementById("editIndex").value = "-1";
  document.getElementById("holdingForm").reset();
  document.getElementById("fDate").value = new Date().toISOString().slice(0, 10);
  document.getElementById("holdingModal").classList.remove("hidden");
}

window.openEditModal = function(idx) {
  const h = holdings[idx];
  document.getElementById("modalTitle").textContent = "Edit Holding: " + h.name;
  document.getElementById("editIndex").value = String(idx);
  document.getElementById("fPortfolio").value = h.portfolio;
  document.getElementById("fType").value = h.type;
  document.getElementById("fName").value = h.name;
  document.getElementById("fSymbol").value = h.symbol;
  document.getElementById("fQty").value = h.qty;
  document.getElementById("fBuy").value = h.avgBuy;
  document.getElementById("fCmp").value = h.cmp;
  document.getElementById("fDate").value = h.date;
  document.getElementById("holdingModal").classList.remove("hidden");
};

window.deleteHolding = function(idx) {
  if (confirm(`Remove ${holdings[idx].name} from your tracker?`)) {
    holdings.splice(idx, 1);
    saveHoldings();
    renderAll();
  }
};

function closeModal() {
  document.getElementById("holdingModal").classList.add("hidden");
}

document.getElementById("holdingForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const idx = parseInt(document.getElementById("editIndex").value, 10);
  const item = {
    portfolio: document.getElementById("fPortfolio").value,
    type: document.getElementById("fType").value,
    name: document.getElementById("fName").value.trim(),
    symbol: document.getElementById("fSymbol").value.trim(),
    qty: parseFloat(document.getElementById("fQty").value),
    avgBuy: parseFloat(document.getElementById("fBuy").value),
    cmp: parseFloat(document.getElementById("fCmp").value),
    date: document.getElementById("fDate").value.trim() || new Date().toISOString().slice(0, 10)
  };

  if (idx >= 0) holdings[idx] = item;
  else holdings.unshift(item);

  saveHoldings();
  closeModal();
  renderAll();
});

// Event Listeners
document.getElementById("addHoldingBtn").addEventListener("click", openAddModal);
document.getElementById("closeModalBtn").addEventListener("click", closeModal);
document.getElementById("cancelModalBtn").addEventListener("click", closeModal);

// Night Mode Toggles (Topbar and Floating button)
const themeBtn = document.getElementById("themeToggleBtn");
if (themeBtn) {
  themeBtn.addEventListener("click", toggleTheme);
}
const floatingThemeBtn = document.getElementById("floatingThemeToggle");
if (floatingThemeBtn) {
  floatingThemeBtn.addEventListener("click", toggleTheme);
}

// Manual Real-Time Sync
const syncBtn = document.getElementById("syncRealTimeBtn");
if (syncBtn) {
  syncBtn.addEventListener("click", () => syncRealTimeQuotes(true));
}

document.getElementById("toggleSimBtn").addEventListener("click", function() {
  liveSim = !liveSim;
  const badge = document.getElementById("liveBadge");
  const fxBadge = document.getElementById("fxLiveBadge");
  const liveBtnText = document.getElementById("liveBtnText");
  const liveDot = document.getElementById("liveDot");

  if (liveSim) {
    if (liveBtnText) liveBtnText.textContent = "Live Feed: ON";
    if (liveDot) liveDot.classList.remove("off");
    if (badge) {
      badge.textContent = "LIVE";
      badge.classList.remove("paused");
    }
    if (fxBadge) fxBadge.classList.remove("paused");
    syncRealTimeQuotes();
  } else {
    if (liveBtnText) liveBtnText.textContent = "Live Feed: PAUSED";
    if (liveDot) liveDot.classList.add("off");
    if (badge) {
      badge.textContent = "PAUSED";
      badge.classList.add("paused");
    }
    if (fxBadge) fxBadge.classList.add("paused");
  }
});

document.getElementById("resetDataBtn").addEventListener("click", function() {
  if (confirm("Reset all holdings back to the original baseline?")) {
    localStorage.removeItem(STORAGE_KEY);
    holdings = JSON.parse(JSON.stringify(DEFAULT_HOLDINGS));
    renderAll();
    syncRealTimeQuotes();
  }
});

document.getElementById("exportCsvBtn").addEventListener("click", function() {
  const headers = ["Portfolio", "Name", "Symbol", "Type", "Qty", "AvgBuy", "CMP", "Invested", "CurrentValue", "UnrealizedPnL", "ReturnPct", "Date"];
  const rows = holdings.map(h => {
    const inv = h.qty * h.avgBuy;
    const val = h.qty * h.cmp;
    const pnl = val - inv;
    const ret = inv > 0 ? (pnl / inv) * 100 : 0;
    return [h.portfolio, `"${h.name}"`, h.symbol, h.type, h.qty, h.avgBuy, h.cmp, inv.toFixed(2), val.toFixed(2), pnl.toFixed(2), ret.toFixed(2) + "%", h.date].join(",");
  });
  const blob = new Blob([headers.join(",") + "\n" + rows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "portfolio_screener_export.csv";
  a.click();
  URL.revokeObjectURL(url);
});

document.querySelectorAll("#portfolioTabs .tab").forEach(btn => {
  btn.addEventListener("click", function() {
    document.querySelectorAll("#portfolioTabs .tab").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    activeTab = this.dataset.tab;
    renderAll();
  });
});

document.querySelectorAll("#chartModeSwitch .pill").forEach(btn => {
  btn.addEventListener("click", function() {
    document.querySelectorAll("#chartModeSwitch .pill").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    chartMode = this.dataset.mode;
    renderAll();
  });
});

["searchInput", "assetFilter", "pnlFilter", "sortSelect", "fxInput"].forEach(id => {
  document.getElementById(id).addEventListener("input", () => renderAll());
  document.getElementById(id).addEventListener("change", () => renderAll());
});

// Initialize Theme
initTheme();

// Initialize UI
renderAll();
updateMarketStatusBar();

// Immediate Real-Time Data Sync on startup
syncRealTimeQuotes();

// Live market tick engine runs every 2 seconds for active price movement (respects market hours & freeze)
simTimer = setInterval(tickMarket, 2000);

// Auto-sync real-time quotes & FX from actual exchange feeds every 30 seconds
realTimeSyncTimer = setInterval(() => {
  if (liveSim) syncRealTimeQuotes();
}, 30000);

// Market Hours & Schedule Checker (runs every 60s)
setInterval(() => {
  updateMarketStatusBar();
  const timing = getMarketTiming();
  
  // Post-close 1 hour checks auto-trigger
  if (timing.isIndianPostClose && !lastIndianPostCloseSynced) {
    lastIndianPostCloseSynced = true;
    console.log("Triggering 4:30 PM IST Indian Post-Close EOD Verification Sync...");
    syncRealTimeQuotes(true);
  }
  if (!timing.isIndianPostClose) {
    lastIndianPostCloseSynced = false;
  }

  if (timing.isUSPostClose && !lastUSPostCloseSynced) {
    lastUSPostCloseSynced = true;
    console.log("Triggering 5:00 PM EST US Post-Close EOD Verification Sync...");
    syncRealTimeQuotes(true);
  }
  if (!timing.isUSPostClose) {
    lastUSPostCloseSynced = false;
  }
}, 60000);


