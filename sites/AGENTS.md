# Donald Filimon Sites Agent Guide

This is the canonical guide for the OpenAI Sites portfolio in `sites/`. Since
2026-09-28 it is a subdirectory of the GitHub Pages repository
(`~/dev/active/donaldfilimoncom`, remote `donaldfilimon/donaldfilimon.github.io`),
folded in with its history by `git subtree add`. It is still an independent
site: its own npm toolchain, lockfile, gate and deployment, sharing nothing with
the parent's Next.js/bun build. Hosting config is in `.openai/hosting.json` (its `project_id` is blanked in this public repo; the real value lives in the private `donaldfilimon/donald-filimon-sites` history); do
not replace its project ID or hosting integration with the parent's settings.

The parent's `AGENTS.md` owns repository-wide rules (git workflow, Pages).
Machine-wide layout and toolchain traps live in `~/CLAUDE.md` and are not
restated here. `CLAUDE.md` is only a pointer to this file;
`test/instructions.test.ts` fails if it grows back into a second copy.

## Repository

- Run every command below from `sites/`. The parent's gate (`bun run check` at
  the repository root) excludes this tree: its `tsconfig.json`, eslint config,
  `bunfig.toml` test root and Tailwind `@source not` all fence `sites/` out, and
  none of this tree is part of the published `docs/` export.
- The former standalone repository `donaldfilimon/donald-filimon-sites`
  (private) is superseded by this subdirectory; its history lives on here.
  Make changes here, not in that repository.
- The tracked `package-lock.json` makes this an npm project despite the
  surrounding bun project: run it through npm, not bun.

## Runtime And Commands

- Node >=22.13.0; use `sites/package.json` and `sites/package-lock.json`.
  The runtime is Vinext + Vite + React 19, not the Next.js CLI. `next/*`
  imports and App Router file conventions are compatibility surfaces;
  `next.config.ts` is empty and does not define a static export.
- `npm run dev` runs `vinext dev`; `npm run build` runs `vinext build`.
  `npm start` runs local Wrangler using generated `dist/server/wrangler.json`,
  so build first. It is not a production deployment command.
- `vite.config.ts` wires Vinext, `@openai/sites-vite-plugin`, Tailwind PostCSS,
  and the Cloudflare RSC/SSR environments. Preserve the dynamic Cloudflare
  import: Wrangler log/state environment is set before it loads.
- `CODEX_SANDBOX=seatbelt` enables polling instead of FSEvents for preview HMR.
  `.wrangler/` holds project-local runtime state; `.env*` is ignored application
  environment. Do not commit generated state or move it into home configuration.
- D1 and R2 are null in `.openai/hosting.json`. The Vite D1 UUID is a local
  placeholder, not a provisioned database. Do not infer persistence from the
  optional binding scaffolding or edit `dist/` to configure hosting.

## Content And Routes

- `content/site.ts` owns typed profile, projects, case studies, services, and
  lookup/navigation helpers. Pages consume it; update the shared content
  rather than duplicating project facts into route components.
- `app/work/[slug]/page.tsx` derives static params and metadata from case studies,
  awaits `params`, and calls `notFound()` for unknown slugs.
- `content/site.test.ts` pins eight featured case studies, valid service links,
  identity links, and no repository links on private projects. Content changes
  need coordinated contract updates, not weakening privacy assertions.
- `app/layout.tsx` owns the Sites metadata base and intentionally sets no-index,
  no-follow robots metadata. Do not switch this to the GitHub Pages domain or
  enable indexing incidentally. The shared skip link targets `main-content`.
- Contact is an editable `mailto:` draft, not a backend submission or delivery
  service; `app/contact/page.test.tsx` verifies the address and prompts.

## Checks

- `npm run lint` checks app/content/test/components with type-aware Oxlint;
  it explicitly excludes `components/ui/**`, `components/blocks/**` and
  `app/blocks/**`, so a green lint covers less of the tree than it looks.
  `npm test` runs Vitest once.
  `npm run check` is the aggregate gate (`lint && test && build`). In CI,
  the parent's `.github/workflows/sites-check.yml` runs `npm ci` and
  `npm run check` in `sites/` on the repository's macOS arm64 self-hosted
  runner (labels `self-hosted, macOS, ARM64, donaldfilimon.github.io`) for
  pushes to `main` and same-repo PRs that touch `sites/**`, and for manual
  dispatches; fork PRs never reach it. The account's hosted Actions are
  billing-locked (reported since 2026-09-08), so the local `npm run check`
  exit code is the contract.
- `content/identity.test.ts` compares `content/identity.generated.json` with
  `profile` and byte-for-byte with the parent's committed
  `../content/identity.generated.json` (generated there by
  `bun scripts/export-identity.ts`). Change a shared field in the parent's
  `content/shared-identity.ts`, re-export, then copy the snapshot here. If the
  parent file is missing the test skips with a `SKIPPED` warning; a skip is
  not a pass.
- Vitest uses jsdom and local `next/link`/`next/navigation` adapters from
  `test/`. Passing component tests does not verify Vinext SSR, real navigation,
  Cloudflare bindings, or deployment; build/runtime checks are separate.
- `npm run format` writes files by default. For instruction-only changes use
  `npm run format -- --check AGENTS.md`, then `git diff --check` and diff review.
  Keep `.next/`, `.vinext/`, `dist/`, and `next-env.d.ts` out of manual edits.
