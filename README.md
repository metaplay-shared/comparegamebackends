# Compare Game Backends

An open-source, community-maintained comparison of game backend platforms for live-service games. Live at **[comparegamebackends.com](https://comparegamebackends.com)**.

Choosing a backend is one of the most consequential infrastructure decisions a game studio makes, and most of the information available comes from the vendors themselves. This project compares backend platforms feature by feature, with every claim linked to public documentation, so you can read the facts and decide what matters for your game.

## Disclosure

This site is published and maintained by [Metaplay](https://metaplay.io), which is one of the platforms compared here. We state that plainly rather than presenting as neutral from the shadows.

The project is neutral by policy:

- Every feature claim links to official, public documentation via a `sourceUrl`.
- Every platform gets honest strengths **and** limitations, including Metaplay.
- The repository is public, so anyone can audit the data and propose corrections, including the vendors of competing platforms.

If you find something inaccurate or out of date, [open an issue](https://github.com/metaplay-shared/comparegamebackends/issues) or send a pull request. Corrections are welcome from anyone.

## Platforms covered

The comparison currently covers eight platforms:

- [Metaplay](https://metaplay.io)
- [PlayFab](https://playfab.com)
- [Heroic Labs](https://heroiclabs.com) (Nakama, Satori, Hiro)
- [AWS GameLift](https://aws.amazon.com/gamelift/)
- [Unity Gaming Services](https://unity.com/solutions/gaming-services)
- [Colyseus](https://colyseus.io)
- [brainCloud](https://getbraincloud.com)
- [AccelByte](https://accelbyte.io)

To propose a platform that isn't listed, open an [add-platform issue](https://github.com/metaplay-shared/comparegamebackends/issues/new/choose) or read the [contributing guide](CONTRIBUTING.md).

## Tech stack

- [Next.js](https://nextjs.org) 15 (App Router)
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org) 5.9
- [Tailwind CSS](https://tailwindcss.com) 3.4
- ESLint via `eslint-config-next`

The data lives in TypeScript files under `lib/`. Pages render dynamically from that data, so adding or editing a platform is a content change, not a code change.

## Local development

Requires [Node.js](https://nodejs.org) 20 or later.

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:3000)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # run ESLint
```

## Project structure

```
app/                 Next.js App Router routes and pages
  page.tsx           Home page
  backends/          Platform listing and per-platform pages ([slug])
  games/             Game-type guides ([gameType])
  learn/             Educational content ([slug])
  about/             About / disclosure page
components/          React components (comparison tables, cards, navigation)
content/             Long-form educational content
lib/
  types.ts           The data model (Backend, LiveOpsFeatures, FeatureValue, ...)
  backends.ts        The platform data (one entry per platform)
  architecture.ts    Per-platform architecture assessment
research/            Per-platform research notes — the fact bank behind the data
public/images/       Platform logos (SVG or PNG)
```

The three files that hold the comparison data are:

- **`lib/types.ts`** — the schema. Defines the `Backend` interface, the `LiveOpsFeatures` fields, and the `FeatureValue` shape (`{ supported, description?, sourceUrl? }`).
- **`lib/backends.ts`** — the data. One `Backend` object per platform, with all features filled in. This is what the pages render.
- **`lib/architecture.ts`** — a separate, deeper assessment of each platform across architectural dimensions (server authority, shared logic, source access, config pipeline, deployment, scalability, developer experience), keyed by platform slug.

`research/` holds a Markdown file per platform with the underlying notes and source references. It is the working fact bank used to keep the data accurate without re-crawling sources each time.

## How the data works

Each platform is a single `Backend` object in `lib/backends.ts`. The page rendering is generic: the platform listing, per-platform pages, comparison tables, and feature matrix all read from `lib/backends.ts` and `lib/architecture.ts`. Adding a platform or correcting a value requires no changes to `app/` or `components/`.

Every feature is recorded as a `FeatureValue`:

```ts
authentication: {
  supported: true,
  description: 'Anonymous device-based auth with social logins (Google, Apple, ...).',
  sourceUrl: 'https://docs.example.com/authentication',
},
```

The `supported` boolean drives the matrix, `description` powers the tooltip shown on hover, and `sourceUrl` is the link to the documentation that backs the claim. A feature may also be written as a plain `true`/`false`, but new and updated entries should always include a `description` and a `sourceUrl`.

### Adding or editing a platform

1. **Add a `Backend` entry** to `lib/backends.ts` with all required fields from `lib/types.ts`: `slug`, `name`, `tagline`, `description`, `logo`, `website`, `type`, `pricingModel`, `features`, `bestFor`, `gameTypes`, `platforms`, `strengths`, `limitations`, `architectureLabel`, and `lastUpdated`. Optional fields include `docsUrl`, `githubUrl`, `pricingDetails`, `foundedYear`, and `sources`.
2. **Fill in every field of `features`** (the `LiveOpsFeatures` interface in `lib/types.ts`). Each feature should be `{ supported, description, sourceUrl }`, with `sourceUrl` pointing at the official documentation for that claim.
3. **Add the matching `architecture.ts` entry** keyed by the same `slug`, covering each architectural dimension with `{ text, tooltip, sourceUrl }`.
4. **Add a research note** at `research/<slug>.md` capturing the sources behind the entry, and add it to the list in `research/README.md`.
5. **Add a logo** to `public/images/`, referenced by the `logo` field on the `Backend` entry (e.g. `logo: '/images/<slug>.svg'`). SVG is preferred; PNG is fine where SVG isn't available.
6. **Run `npm run build`** to confirm the data type-checks and the pages render.

The full, field-by-field walkthrough is in [CONTRIBUTING.md](CONTRIBUTING.md).

## Editorial standard

This standard is the whole point of the project. It is non-negotiable, and it applies to Metaplay's own entry as strictly as to any other.

- **Source everything.** Every feature claim must link to official or public documentation (vendor docs, pricing pages, official repositories) via `sourceUrl`. Unsourced claims will be asked for a source or declined.
- **Stay neutral and factual.** State what a platform does and let readers draw conclusions.
- **No marketing superlatives.** Do not write "best", "leading", "revolutionary", "world-class", "cutting-edge", "powerful", or similar. Describe the capability, not a verdict.
- **No AI-tell words.** Avoid "delve", "crucial", "landscape", "navigate", "leverage", "seamless", "robust", "realm", "tapestry", "underscore", and the like. Write plainly.
- **Stay balanced.** Every platform gets honest strengths and honest limitations. An entry with only upsides is not finished.

## Contributing

Fork the repository, make your change on a branch, and open a pull request against `main`. A maintainer reviews each pull request and either merges it, requests changes, or declines it with a reason. The [contributing guide](CONTRIBUTING.md) covers the process, the sourcing rule, the data model, and the tone and style rules in detail.

## License

This repository uses two licenses:

- **Code** — the application code (everything except the comparison content described below) is licensed under the [MIT License](LICENSE).
- **Comparison content and data** — the text in `lib/` and `research/`, and the comparison data rendered on the site, is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE-CONTENT.md). If you reuse the data, credit **comparegamebackends.com** with a link.

See [LICENSE](LICENSE) and [LICENSE-CONTENT.md](LICENSE-CONTENT.md) for the full terms.
