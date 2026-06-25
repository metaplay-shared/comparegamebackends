# Contributing

Thank you for helping keep this comparison accurate. The value of [comparegamebackends.com](https://comparegamebackends.com) rests entirely on one thing: the data is factual, sourced, and neutral. Contributions that strengthen that are welcome from anyone, including people who work on the platforms compared here.

## The mission

This project compares game backend platforms for live-service games and links every claim to public documentation. It is published by [Metaplay](https://metaplay.io), which is one of the platforms compared. To keep that honest, the data is held to a strict editorial standard (see [Tone and style](#tone-and-style)), and the repository is public so anyone can check the work and propose corrections. Metaplay's own entry is held to the same standard as every other platform.

## The contribution process

1. **Fork** [`metaplay-shared/comparegamebackends`](https://github.com/metaplay-shared/comparegamebackends) to your own account.
2. **Create a branch** for your change (for example `fix/playfab-pricing` or `add-platform/photon`).
3. **Make your change** following the data model and editorial standard below.
4. **Run the checks locally** — `npm run lint` and `npm run build` should both pass.
5. **Open a pull request** against the `main` branch of `metaplay-shared/comparegamebackends`, filling in the pull request template.
6. **Review.** A maintainer (Chris Wilson at Metaplay) reviews every pull request and does one of three things:
   - **Approves and merges** it.
   - **Requests changes** — usually a missing source, a tone fix, or a missing limitation.
   - **Declines** it, with a reason.

Every pull request is reviewed and explicitly approved or declined by a maintainer. Nothing merges automatically. This is deliberate: it is how the editorial standard is enforced.

## Sourcing rule

Every factual claim must cite official documentation. In practice that means a link in the `sourceUrl` field to one of:

- the vendor's official documentation,
- the vendor's official pricing page,
- the vendor's official repository (for example, a license file or a feature in source), or
- another primary, authoritative source published by the vendor.

Prefer primary sources over third-party summaries, blog posts, or forum threads. If a claim cannot be backed by a primary source, a maintainer will ask you for one or decline the change. "I know this is true" is not a source.

## The data model

The schema lives in [`lib/types.ts`](lib/types.ts). The data lives in [`lib/backends.ts`](lib/backends.ts) (one `Backend` per platform) and [`lib/architecture.ts`](lib/architecture.ts) (the architecture assessment, keyed by slug). Pages render dynamically from this data — you do not edit anything under `app/` or `components/` to add or change a platform.

### The `Backend` interface

From `lib/types.ts`:

| Field | Required | Notes |
| --- | --- | --- |
| `slug` | yes | URL-safe identifier, e.g. `playfab`. Must match the key used in `lib/architecture.ts` and the `research/<slug>.md` filename. |
| `name` | yes | Display name, e.g. `PlayFab`. |
| `tagline` | yes | One short factual line. No superlatives. |
| `description` | yes | A few neutral sentences describing what the platform is. |
| `logo` | yes | Path under `public/images/`, e.g. `/images/playfab.png`. |
| `website` | yes | Official site URL. |
| `docsUrl` | optional | Official documentation URL. |
| `githubUrl` | optional | Official repository, where one exists. |
| `type` | yes | `'proprietary'`, `'open-source'`, or `'source-available'`. |
| `pricingModel` | yes | `'free'`, `'freemium'`, `'usage-based'`, or `'enterprise'`. |
| `pricingDetails` | optional | Factual pricing summary. Cite the pricing page in `sources`. |
| `features` | yes | A `LiveOpsFeatures` object. Every field filled in (see below). |
| `bestFor` | yes | Short factual phrases describing fitting use cases. |
| `gameTypes` | yes | Any of `'f2p-mobile'`, `'live-service-pc'`, `'competitive'`, `'casual-social'`, `'mmo'`. |
| `platforms` | yes | Any of `'unity'`, `'unreal'`, `'godot'`, `'custom'`, `'html5'`, `'native'`. |
| `strengths` | yes | Honest strengths, each a factual phrase. |
| `limitations` | yes | Honest limitations. An entry with no limitations is not finished. |
| `foundedYear` | optional | Year the platform launched, if known. |
| `architectureLabel` | yes | One short phrase summarizing the architecture, e.g. `Deterministic shared-logic platform`. |
| `lastUpdated` | yes | `YYYY-MM` of when the entry was last verified. Bump this whenever you change the entry. |
| `sources` | optional | Array of `{ label, url }` reference links (pricing, docs, etc.). |

### The `features` object

`LiveOpsFeatures` in `lib/types.ts` defines the feature fields the matrix renders, grouped into player management, live operations, economy and monetization, engagement and retention, analytics, multiplayer, infrastructure, operations, platform and deployment, architecture, communication, compliance and testing, and AI. Every field must be present.

Each feature is a `FeatureValue`:

```ts
liveEvents: {
  supported: true,
  description: 'Scheduled events with phases and player-segment targeting, managed in the dashboard.',
  sourceUrl: 'https://docs.example.com/live-events',
},
```

- `supported` (boolean) drives the matrix cell.
- `description` (string) is the tooltip shown on hover. Keep it factual and specific.
- `sourceUrl` (string) links to the documentation backing the claim.

A bare `true` or `false` is allowed by the type, but new and updated entries should use the full `{ supported, description, sourceUrl }` form. If a platform genuinely does not support something, set `supported: false` and, where useful, add a `description` and `sourceUrl` that explain the gap. Do not mark something supported because a third-party add-on or a custom build could provide it — record what the platform itself provides.

### The `architecture.ts` entry

`lib/architecture.ts` holds a deeper assessment keyed by the same `slug`. Each dimension (`serverAuthority`, `sharedLogic`, `integration`, `sourceAccess`, `configPipeline`, `dashboard`, `deployment`, `scalability`, `devExperience`) is a `CellData`:

```ts
serverAuthority: {
  text: 'Short factual summary shown in the table',
  tooltip: 'A sentence or two of detail.',
  sourceUrl: 'https://docs.example.com/...',
},
```

## How to add a new platform

1. **Add a `Backend` entry** to `lib/backends.ts` with every required field above. Fill in all of `features`, every one as `{ supported, description, sourceUrl }`.
2. **Add the matching entry** to `lib/architecture.ts`, keyed by the same `slug`, covering each architectural dimension.
3. **Add a research note** at `research/<slug>.md` with the sources behind your entry, and add it to the list in `research/README.md`.
4. **Add a logo** to `public/images/`. Reference it from the `logo` field (e.g. `/images/<slug>.svg`). SVG is preferred; PNG is acceptable. (A few existing logos use a short filename rather than the full slug — match whatever you set in the `logo` field.)
5. **Run `npm run build`** to confirm the data type-checks and the pages render. No other code changes are needed.

## How to correct or update existing data

1. Find the platform's entry in `lib/backends.ts` (and `lib/architecture.ts` if the change is architectural).
2. Update the value, update its `description` if needed, and update the `sourceUrl` to the documentation that supports the new value.
3. Bump the entry's `lastUpdated` to the current `YYYY-MM`.
4. Add or update the note in `research/<slug>.md` so the fact bank reflects the change.
5. Run `npm run lint` and `npm run build`.

## Tone and style

These rules are non-negotiable and apply to every platform equally.

- **Source everything.** No claim without a primary `sourceUrl`.
- **Neutral and factual.** State what a platform does; let the reader conclude.
- **Balanced.** Honest strengths *and* honest limitations for every platform.

**Banned marketing superlatives** — do not use these or their synonyms:

> best, leading, revolutionary, world-class, cutting-edge, powerful, game-changing, unmatched, industry-leading, premier, top, ultimate

**Banned AI-tell words** — these read as machine-written marketing; avoid them:

> delve, crucial, landscape, navigate, leverage, seamless, robust, realm, tapestry, underscore, elevate, unlock, harness, streamline, dive in, in today's world

Describe the capability and cite the source. If you find yourself reaching for one of these words, the sentence usually gets clearer when you remove it.

## Pull request checklist

Before opening a pull request, confirm:

- [ ] Every new or changed claim has a `sourceUrl` to official/primary documentation.
- [ ] `npm run build` passes.
- [ ] `npm run lint` is clean.
- [ ] The tone is neutral and factual — no banned superlatives or AI-tell words.
- [ ] Strengths and limitations are balanced (no all-positive entry).
- [ ] `lastUpdated` is bumped on any changed entry.
- [ ] A logo is added (and referenced) if you added a new platform.
- [ ] A research note is added or updated in `research/`.

## What we accept and what we decline

**Accepted:**

- Sourced corrections to existing data.
- New platforms that fit live-service backends, with full data and sources.
- New comparison data and feature detail, sourced.
- Fixes to code, copy, accessibility, and build issues.

**Declined:**

- Unsourced claims, or claims backed only by marketing copy.
- Marketing language about any platform, including Metaplay.
- Biased framing that favors or disparages a platform.
- Subjective ratings, scores, or "best of" rankings. This site reports facts; it does not rank.

## Response expectations

This is a community project maintained alongside other work. Maintainers review pull requests and issues as time allows, so a response may take a little while. A clear description and complete sources make review faster and merging more likely.
