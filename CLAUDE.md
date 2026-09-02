# CLAUDE.md

Local path: `~/dev/active/donaldfilimoncom`. Remote: `donaldfilimon/donaldfilimon.github.io`.

## What this is

Donald Filimon's personal site. Next.js 16 + React 19 + Bun + shadcn, statically exported to `docs/` for GitHub Pages.

Live: https://donaldfilimon.github.io/
Intended: https://donaldfilimon.com (domain currently unregistered; see README)

## Commands

- `bun run dev` — local server on port 4173
- `bun run check` — typecheck, lint, export into `docs/`, bun tests, then `scripts/check-docs.ts`
- `bun run build` — export only

Never treat `~` as a git repo. Never restore Star Space branding, the `/star-space-portfolio/` redirect, or the CDN-React résumé app.

## Architecture

- `app/` — App Router (static). `output: "export"` in `next.config.ts`.
- `content/site.ts` — name, links, project copy. Edit copy here. Project blurbs are taken from local checkouts under `~/dev/active` and `~/Desktop`.
- `components/ui/` — shadcn primitives. `components/site/` — page chrome.
- `docs/` — published artifact. GitHub Actions uploads this directory. Rebuild it locally before pushing.
- `public/CNAME` is `donaldfilimon.com`. Do not enable the Pages custom domain via API until that name resolves to GitHub Pages IPs.

## Pages

Source must stay **GitHub Actions** (`build_type: workflow`). There is no `gh-pages` branch. The Pages API may still report `source.branch: gh-pages` as leftover metadata; the live source is the workflow.
