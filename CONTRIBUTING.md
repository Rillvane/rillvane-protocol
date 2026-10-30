# Contributing

Open an issue describing the problem before making a large change. Keep pull requests focused and include reproduction steps, relevant tests, and documentation changes.

Use Node.js 24. Run the documented checks before opening a pull request. Protocol changes should include integer-boundary and authorization tests; preserve nonce replay protection, origin checks, and fixed-point accounting.

Never commit secrets, wallet keypairs, databases, archives, or copied third-party artwork. Contributions must be code you can license under this repository's MIT license. Commit messages should describe one concrete change, for example `fix: reject stale swap quotes`. Do not create author attribution for someone who did not make the contribution.
