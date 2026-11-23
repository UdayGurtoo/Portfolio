module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  // Primary: ExchangeRate-API
  try {
    const r = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    if (r.ok) {
      const data = await r.json();
      if (data.rates && data.rates.INR) {
        res.status(200).json({
          rate: Number(data.rates.INR.toFixed(2)),
          timestamp: Date.now(),
          source: 'exchangerate-api'
        });
        return;
      }
    }
  } catch (err) {}

  // Fallback: Open ER API
  try {
    const r2 = await fetch('https://open.er-api.com/v6/latest/USD');
    if (r2.ok) {
      const data2 = await r2.json();
      if (data2.rates && data2.rates.INR) {
        res.status(200).json({
          rate: Number(data2.rates.INR.toFixed(2)),
          timestamp: Date.now(),
          source: 'open.er-api'
        });
        return;
      }
    }
  } catch (err) {}

  res.status(200).json({
    rate: 92.75,
    timestamp: Date.now(),
    fallback: true
  });
};
