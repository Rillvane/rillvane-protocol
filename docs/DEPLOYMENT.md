# Deployment examples

These files are templates, not a deployed service. Use Node.js 24 on a single host with persistent local SQLite storage.

1. Copy .env.example to a private .env and set NODE_ENV=production, PUBLIC_ORIGIN=https://app.rillvane.trade, SITE_MODE=app, DATABASE_PATH=/var/lib/rillvane/rillvane.sqlite and a random OPS_TOKEN of at least 32 characters.
2. Configure HTTPS SOLANA_RPC_URLS for the supported development network. Mainnet is rejected by config. Provide a matching deployed ops/registry.json and authority keypairs under ops/keys through a private channel. Do not use bootstrap placeholders as production chain accounts.
3. If serving the app, set FRONTEND_ROOT=/srv/rillvane-app/dist. Keep the app and API on the same HTTPS origin.
4. Create a rillvane service account and its writable data directory. Ensure it can read the checkout, registry and keys. Adapt ops/rillvane.service paths before installing it.
5. Run node --env-file=.env backend/preflight.mjs, then install/start the service and validate your Caddy configuration. Bind Node to 127.0.0.1:8787; expose only the HTTPS proxy.

The example Caddy block proxies app.rillvane.trade and hides operator/probe endpoints. It does not modify the landing domain. DNS, TLS and server provisioning are operator tasks.

Back up SQLite through its online backup API, not a copy of an active WAL main file: node --env-file=.env backend/backup.mjs /private/backups/rillvane.sqlite. Store encrypted backups off-host and test restoration. Preserve the database, .env, registry and keys across updates. Do not run replicas against this SQLite database.

Production starts only if database/RPC readiness succeeds. See backend/preflight.mjs and operations.test.mjs for the implemented checks. No external audit, monitoring service, backup schedule or public deployment is created by this repository.
