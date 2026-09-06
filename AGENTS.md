<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Local path: `~/dev/active/donaldfilimoncom`. Remote: `donaldfilimon/donaldfilimon.github.io`. This file is canonical for the repository. `CLAUDE.md` points here.

## What this is

Donald Filimon's personal site. Next.js 16 + React 19 + Bun + shadcn, statically exported to `docs/` for GitHub Pages.

Live: https://donaldfilimon.github.io/
Intended: https://donaldfilimon.com (domain currently unregistered; see README)

## Commands

- `bun run dev` — local server on port 4173
- `bun run check` — `typecheck`, `lint`, `sync:projects:check` (`bun scripts/sync-project-catalog.ts --check`), `build` (export into `docs/`), `bun test`, then `bun scripts/check-docs.ts`. If `sync:projects:check` fails, run `bun run sync:projects` to regenerate the catalog, then re-run `check`.
- `bun run build` — `next build` then `bun scripts/publish-docs.ts` (export into `docs/`)
- `bun run lint` — eslint
- `bun test tests/portfolio.test.ts` — single test file (tests live in `tests/`)

Never treat `~` as a git repo. Never restore Star Space branding, the `/star-space-portfolio/` redirect, or the CDN-React résumé app.

## Architecture

- `app/` — App Router (static). `output: "export"` in `next.config.ts`.
- `content/site.ts` — name, links, project copy. Edit copy here. Project blurbs are taken from local checkouts under `~/dev/active` and `~/Desktop`.
- `components/ui/` — shadcn primitives. `components/site/` — page chrome.
- `docs/` — published artifact. GitHub Actions uploads this directory. Rebuild it locally before pushing. `docs/` is regenerated wholesale during `bun run build`: `scripts/publish-docs.ts` deletes `docs/`, recopies it from `out/` (gitignored), and writes `docs/CNAME` and `docs/.nojekyll`. Never hand-edit `docs/`.
- `public/CNAME` is `donaldfilimon.com`. Do not enable the Pages custom domain via API until that name resolves to GitHub Pages IPs.

## Pages

Source must stay **GitHub Actions** (`build_type: workflow`). There is no `gh-pages` branch. The Pages API may still report `source.branch: gh-pages` as leftover metadata; the live source is the workflow.

<!-- machine-git-policy -->
## Git workflow (machine policy, 2026-08-27)

Work on the default branch in this canonical checkout. Do not create
branches or worktrees by default; they are for tasks that genuinely need
isolation, or when Donald asks. Any worktree or topic branch created here
must be merged back into this checkout's default branch, the worktree
removed, and the branch deleted, before pushing and before the task is
called done. Full policy: `~/.claude/CLAUDE.md` (*Git discipline*).
<!-- /machine-git-policy -->
