# Architecture

The Rust program encodes inventory swaps, supply/redemption, collateral, debt and liquidation. backend/math.mjs and engine.mjs mirror integer accounting for quotes and local projections. Wallet-associated records live in SQLite; one Node process owns one persistent database.

backend/app.mjs handles same-origin HTTP requests. backend/auth.mjs binds Ed25519 challenge messages to PUBLIC_ORIGIN; cookies are host-only and writes require matching Origin. Intent nonces and idempotency keys block replay. backend/server.mjs adapts the HTTP API and WebSocket upgrades to Node.

The service is API-only unless FRONTEND_ROOT is explicitly supplied. An optional static root lets the sibling app share /api and the session-cookie origin, without wildcard CORS. Never point FRONTEND_ROOT at the repository root or a directory containing .env or private keys.

Trade candles aggregate recorded swaps and carry the last executed price across empty buckets. When no fills exist, zero-volume oracle marks are returned with source=oracle-mark. Executed-history responses use source=executed-trades. These marks are not historical trades. The synthetic demo-price dependency from the private workspace is deliberately excluded from this public snapshot.

Workers track submitted signatures, refresh the local oracle timestamp, and process liquidation checks. They do not replace independent on-chain verification. Tests use in-memory or temporary databases and generated test wallets; no production keys are required.
