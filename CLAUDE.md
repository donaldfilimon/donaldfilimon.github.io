# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Local path: `~/dev/active/donaldfilimoncom`. Remote: `donaldfilimon/donaldfilimon.github.io`.
Read `AGENTS.md` too: it carries the Next.js agent-rules block that `next dev` regenerates (commit it with your work, do not revert it), and it points at `node_modules/next/dist/docs/` for this Next major's breaking changes. `node_modules/` is empty until `bun install`.

## What this is

Donald Filimon's personal site. Next.js 16 (App Router, React Compiler on) + React 19 + Bun + Tailwind v4 + shadcn, statically exported to `docs/` for GitHub Pages. No server runtime. The one non-trivial runtime dependency is `@tensorflow/tfjs`, used only by the consent-gated project ranker (see below).

Live: https://donaldfilimon.github.io/
Intended: https://donaldfilimon.com (domain unregistered; DNS records and registrar notes live in README)

## Commands

```bash
bun install
bun run dev                  # http://127.0.0.1:4173
bun run check                # typecheck → lint → sync:projects:check → build → bun test → scripts/check-docs.ts
bun run typecheck            # tsc --noEmit
bun run lint                 # eslint (flat config; no Biome, no Prettier, no format script)
bun run build                # next build → out/, then scripts/publish-docs.ts wipes and rewrites docs/ (+ CNAME, .nojekyll)
bun test                     # bun:test runner
bun test tests/portfolio.test.ts          # one file
bun test -t "atlas search and filters"    # one test by name
bun run sync:projects        # regenerate content/project-catalog.generated.json from the registry
bun run sync:projects:check  # verify the committed catalog matches the registry (part of check)
bun scripts/check-docs.ts    # standalone docs/ guard
```

`bun run build` is not "export only": it deletes and recreates `docs/`. Commit `docs/` before pushing; the Pages workflow uploads that directory and never builds or tests.

**`bun run check` and the catalog tests only pass on Donald's Mac.** `scripts/sync-project-catalog.ts` reads `../project-registry/registry/projects.toml` and throws if the sibling checkout is absent, and `tests/project-catalog.test.ts` hardcodes the absolute `/Users/donaldfilimon/...` path to that same file. Elsewhere, run `typecheck`, `lint`, `build`, `bun test tests/portfolio.test.ts tests/personalization.test.ts`, and `check-docs.ts` individually.

Never treat `~` as a git repo. Never restore Star Space branding, the `/star-space-portfolio/` redirect, or the CDN-React résumé app (`scripts/check-docs.ts` and the workflow both assert this).

## Architecture

Routes are `/` (`app/page.tsx`), the 404 page, `robots.txt`, and `sitemap.xml`; everything else is an in-page anchor (`#work`, `#atlas`, `#services`, `#practice`, `#contact`). `app/layout.tsx` emits Person JSON-LD.

- `app/` — App Router, `output: "export"` + `trailingSlash: true` + unoptimized images in `next.config.ts`.
- `content/site.ts` — name, links, nav, and the editorial copy for featured projects. Nav hrefs must keep the leading `/` because `docs/404.html` is checked for root-qualified anchors.
- `components/ui/` — shadcn primitives (`components.json` pins the `radix-nova` style). `components/site/` — page chrome, `project-atlas.tsx`, `personalized-work.tsx`.
- `docs/` — published artifact, committed. `tsconfig.json` and `eslint.config.mjs` both exclude `docs/` and `out/`.
- `public/CNAME` is `donaldfilimon.com`. Do not enable the Pages custom domain via API until that name resolves to GitHub Pages IPs.

### Project catalog pipeline (registry → atlas)

Project data is no longer scraped from local checkouts. The flow is:

1. `scripts/sync-project-catalog.ts` parses the external TOML registry (`../project-registry`, read-only) with `Bun.TOML.parse`.
2. Every registry project must have an explicit `decision(...)` in `content/project-publication.ts` (the publication allowlist, including `approvedLinks`); a registry project without a decision, or a decision without a registry project, fails the sync.
3. A privacy scrub rejects absolute home paths, `file://`, worktree/branch/dirty metadata, and credential-shaped strings before anything is written.
4. Output is the sorted, committed `content/project-catalog.generated.json`.
5. `content/project-catalog.ts` joins generated records with `content/site.ts` copy, rejects any link not in `approvedLinks`, and calls `assertProjectCatalog()` **at module import**, which requires exactly 8 featured projects. A bad catalog crashes the build, not a test.
6. `app/page.tsx` renders `PersonalizedWork` and `ProjectAtlas` from `projectCatalog`.

### Personalized ranking (client-only)

`lib/project-personalization.ts` defines the feature schema and trains a tiny TFJS model in the browser. TFJS is dynamically imported only after consent; weights persist to IndexedDB and UI state to `localStorage`. `tests/personalization.test.ts` forbids a top-level tfjs import and any `fetch`/`sendBeacon`/`XMLHttpRequest` in that module, so the feature stays zero-egress by test. Atlas link clicks feed the ranker through a `CustomEvent` bus dispatched from `project-atlas.tsx`.

### `scripts/check-docs.ts`

Asserts `docs/index.html`, `docs/404.html`, and `docs/CNAME` exist; index has no Star Space or `location.replace` residue, contains the `work`/`contact`/`services` section ids and the Land O' Lakes, Florida location (not Ocala); 404 has root-qualified nav anchors; CNAME is exactly `donaldfilimon.com`. `.github/workflows/deploy.yml` duplicates these assertions in an inline Python step, so change both when the guard changes.

## Pages

Source must stay **GitHub Actions** (`build_type: workflow`). There is no `gh-pages` branch. The Pages API may still report `source.branch: gh-pages` as leftover metadata; the live source is the workflow. Dependabot bumps npm and actions monthly.
