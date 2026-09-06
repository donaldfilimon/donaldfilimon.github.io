<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Local path: `~/dev/active/donaldfilimoncom`. Remote: `donaldfilimon/donaldfilimon.github.io`. This file is canonical for the repository. `CLAUDE.md` points here.

## What this is

Donald Filimon's personal site. Next.js 16 (App Router, React Compiler on) + React 19 + Bun 1.4 + Tailwind v4 + shadcn, statically exported to `docs/` for GitHub Pages. No deployed server runtime; TFJS is loaded only by the consent-gated project ranker.

Pages target: https://donaldfilimon.github.io/; intended custom domain: https://donaldfilimon.com. Verify domain ownership and DNS before any cutover; README's registrar notes are historical, not live status.

## Commands

```bash
bun run dev                  # Next dev on port 4173; script does not restrict hostname
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

`bun run build` deletes and recreates `docs/`. Preserve existing artifact edits before running it; include regenerated `docs/` in an authorized release commit. Pages uploads that directory and runs only an artifact guard, not app builds/tests. For guide-only edits, `git diff --check` and the read-only `bun scripts/check-docs.ts` avoid export churn.

**The full gate requires the external registry.** Sync defaults to `../project-registry/registry/projects.toml`; the CLI accepts `--registry <path>`, but `tests/project-catalog.test.ts` independently hardcodes `/Users/donaldfilimon/dev/active/project-registry/registry/projects.toml`. The override does not make that suite portable. Without the registry, use `typecheck`, `lint`, `build`, `bun test tests/portfolio.test.ts tests/personalization.test.ts tests/build-reproducibility.test.ts`, and `check-docs.ts` individually; report this as partial verification.

Never restore Star Space branding, the `/star-space-portfolio/` redirect, or the CDN-React resume app (`scripts/check-docs.ts` and the workflow guard this).

## Architecture

Routes are `/` (`app/page.tsx`), the 404 page, `robots.txt`, and `sitemap.xml`; everything else is an in-page anchor (`#work`, `#atlas`, `#services`, `#practice`, `#contact`). `app/layout.tsx` emits Person JSON-LD.

- `app/` — App Router, `output: "export"` + `trailingSlash: true` + unoptimized images in `next.config.ts`.
- `content/site.ts` — name, links, nav, and the editorial copy for featured projects. Nav hrefs must keep the leading `/` because `docs/404.html` is checked for root-qualified anchors.
- `components/ui/` — shadcn primitives (`components.json` pins the `radix-nova` style). `components/site/` — page chrome, `project-atlas.tsx`, `personalized-work.tsx`.
- `docs/` — published artifact, committed. `tsconfig.json` and `eslint.config.mjs` both exclude `docs/` and `out/`.
- `scripts/build-id.ts` hashes sorted source paths/content plus build configs, manifest and lockfile, not Git HEAD, mtimes, or generated output. Extend its input list for new build inputs; preserve reproducible exports (`tests/build-reproducibility.test.ts`).
- `public/CNAME` is `donaldfilimon.com`. Do not enable the Pages custom domain via API until that name resolves to GitHub Pages IPs.

### Project catalog pipeline (registry → atlas)

1. `scripts/sync-project-catalog.ts` parses the external TOML registry (`../project-registry`, read-only) with `Bun.TOML.parse`.
2. Every registry project must have an explicit `decision(...)` in `content/project-publication.ts` (the publication allowlist, including `approvedLinks`); a registry project without a decision, or a decision without a registry project, fails the sync.
3. A privacy scrub rejects absolute home paths, `file://`, worktree/branch/dirty metadata, and credential-shaped strings before anything is written.
4. Output is the sorted, committed `content/project-catalog.generated.json`.
5. `content/project-catalog.ts` joins generated records with `content/site.ts` copy, rejects any link not in `approvedLinks`, and calls `assertProjectCatalog()` **at module import**, which requires exactly 8 featured projects. A bad catalog crashes the build, not a test.
6. `app/page.tsx` renders `PersonalizedWork` and `ProjectAtlas` from `projectCatalog`.

### Personalized ranking (client-only)

`lib/project-personalization.ts` owns feature/ranking math and the signal bus; `components/site/personalized-work.tsx` owns consent-gated TFJS loading/training. Weights persist to IndexedDB and UI state to `localStorage`. Preserve dynamic loading and the no-egress contract. `tests/personalization.test.ts` checks component source for top-level TFJS and network APIs; this is not a runtime network audit. Atlas link clicks reach the ranker through the `CustomEvent` bus.

### `scripts/check-docs.ts`

Asserts `docs/index.html`, `docs/404.html`, and `docs/CNAME` exist; index has no Star Space or `location.replace` residue, contains the `work`/`contact`/`services` section ids and the Land O' Lakes, Florida location (not Ocala); 404 has root-qualified nav anchors; CNAME is exactly `donaldfilimon.com`. `.github/workflows/deploy.yml` duplicates these assertions in an inline Python step, so change both when the guard changes.

## Pages

Keep Pages on **GitHub Actions** (`build_type: workflow`), not a `gh-pages` branch. `.github/workflows/deploy.yml` publishes on `main` pushes or manual dispatch; neither is authorization to skip the local gate.

<!-- machine-git-policy -->
## Git workflow (machine policy, 2026-08-27)

Work on the default branch in this canonical checkout. Do not create
branches or worktrees by default; they are for tasks that genuinely need
isolation, or when Donald asks. Any worktree or topic branch created here
must be merged back into this checkout's default branch, the worktree
removed, and the branch deleted, before pushing and before the task is
called done. Full policy: `~/.claude/CLAUDE.md` (*Git discipline*).
<!-- /machine-git-policy -->
