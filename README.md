# Portfolio Screener & Live Equity Tracker

A high-performance financial web application (`index.html`, `styles.css`, `app.js`, `server.js`) featuring real-time equity & exchange rate market data, night/day mode, and instant deployment.

## Features Added
- **Real-Time Live Market Feeds**: Live price quotes for US & Indian stocks and ETFs (NVDA, AMZN, MSFT, INFY, TCS, HDFCBANK, TATAGOLD, etc.) connected via Yahoo Finance API.
- **Live USD/INR Exchange Rate**: Auto-synced real-time dollar rates via global exchange rate APIs (`/api/fx`), with fallback to open exchange rate endpoints.
- **Night / Dark Mode**: Modern dark financial terminal theme with custom palette (`#090d16` background, `#111827` surface), toggle button in the header, and persistent theme memory (`localStorage` & OS theme matching).
- **Manual Sync on Demand**: "Sync Real-Time" button with live animation indicator.

## Included Files
- `index.html` — Screener dashboard layout, Night Mode toggle, Real-Time sync button, and modal form.
- `styles.css` — Financial UI styling with comprehensive Light & Dark mode support.
- `app.js` — Portfolio engine, live API sync, dark/light theme switcher, SVG donut chart, sorting/filtering, and local storage.
- `server.js` — Node.js static & API proxy server providing `/api/quotes` and `/api/fx`.

## Running Locally
```bash
npm start
# or: node server.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
