// Dev-only stand-in for the backend proxy the telemetry SDK expects.
// Maps the SDK's cx/* paths to the analytics engine's /analytics/* routes.
//   node scripts/telemetry-proxy.js
// Env: PORT (default 8787), ENGINE_URL (default http://localhost:8080)
const http = require("http");

const PORT = Number(process.env.PORT) || 8787;
const ENGINE = process.env.ENGINE_URL || "http://localhost:8080";

const ROUTES = {
  "/cx/sessions": "/analytics/sessions",
  "/cx/page-views": "/analytics/page-views",
  "/cx/actions/batch": "/analytics/events/batch",
  "/cx/errors": "/analytics/errors",
};

http
  .createServer(async (req, res) => {
    const target = ROUTES[req.url.split("?")[0]];
    if (req.method !== "POST" || !target) {
      res.writeHead(404).end();
      return;
    }
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = Buffer.concat(chunks);
    try {
      const upstream = await fetch(ENGINE + target, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      const text = await upstream.text();
      console.log(`${req.url} -> ${target} ${upstream.status}${upstream.ok ? "" : " " + text.slice(0, 200)}`);
      res.writeHead(upstream.status, { "Content-Type": "application/json" }).end(text);
    } catch (err) {
      console.log(`${req.url} -> engine unreachable: ${err.message}`);
      res.writeHead(502).end();
    }
  })
  .listen(PORT, "0.0.0.0", () => console.log(`telemetry proxy :${PORT} -> ${ENGINE}`));
