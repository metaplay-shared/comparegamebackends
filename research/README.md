# Game Backend Research Bank

Internal research documents for https://comparegamebackends.com. Used to maintain accuracy of the comparison site without re-crawling sources each time.

## Architectural Dimensions

Each provider is evaluated against 7 architectural criteria:

1. **Server Authority Model** — How is server-authoritative gameplay achieved? Structural/built-in vs bolt-on?
2. **Platform Integration** — Single integrated platform or collection of separate services/products?
3. **Source Code Access** — Full platform source, client SDK only, or closed?
4. **Shared Client-Server Logic** — Same code on both sides with deterministic execution, or separate codebases?
5. **Game Config Management** — Structured pipeline (spreadsheets → typed objects → OTA) or key-value strings?
6. **Operations Tooling** — Can the dashboard be customized/extended, or is it a fixed UI?
7. **Infrastructure Ownership** — Self-hosting option? Data control? Vendor lock-in risk?

## Provider Files

- [metaplay.md](metaplay.md) — Metaplay
- [playfab.md](playfab.md) — PlayFab
- [heroic-labs.md](heroic-labs.md) — Heroic Labs (Nakama/Satori/Hiro)
- [aws-gamelift.md](aws-gamelift.md) — AWS GameLift
- [unity-gaming-services.md](unity-gaming-services.md) — Unity Gaming Services
- [colyseus.md](colyseus.md) — Colyseus
- [braincloud.md](braincloud.md) — brainCloud
- [accelbyte.md](accelbyte.md) — AccelByte

## Last Updated

2026-02-16
