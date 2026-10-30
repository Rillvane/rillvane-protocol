# Rillvane Solana program

Native inventory pool, single-asset shares and RLVN-collateral USDC credit. The Rust integer math is mirrored in backend/math.mjs.

Run cargo test --manifest-path programs/rillvane/Cargo.toml. Building a deployable artifact requires the Solana SBF toolchain (cargo-build-sbf). Deployment is an explicit operator action using scripts/deploy-devnet.mjs with private authority keys. Mainnet is disabled in the Node configuration. No deployment is performed by tests or CI.
