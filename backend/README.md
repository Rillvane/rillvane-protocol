# Node API

Run from the repository root with Node.js 24. Copy .env.example to .env and run npm run bootstrap, then npm start. The API listens on localhost:8787; an API-only root returns 404. Configure FRONTEND_ROOT to serve the sibling rillvane-app/dist on the same origin.

The API supports wallet challenge/verification, signed quotes and intents, market/pool/trade/candle reads, supply/withdrawal, collateral/credit, chain signature tracking and WebSocket updates. Origin checks, host-only session cookies and nonce replay protection are enforced. Private operator endpoints require OPS_TOKEN. See docs/ARCHITECTURE.md and docs/DEPLOYMENT.md.

Local projections and oracle-mark candles are not proof of historical on-chain execution. No mainnet support or external audit is claimed. Actual chain actions require a deployed program, matching registry, RPC and independently provisioned authority keys. Bootstrap creates placeholder configuration, not a deployed chain market.
