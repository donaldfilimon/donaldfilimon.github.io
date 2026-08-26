# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

Donald Filimon's personal GitHub Pages site, served at **https://donaldfilimon.com** (custom domain, see `docs/CNAME`) and https://donaldfilimon.github.io. It is a fully static site — there is no package.json, build step, linter, or test suite. Changes are verified by opening the HTML files in a browser (e.g. `python3 -m http.server` from `docs/`).

## Deployment

- **`docs/` is the website.** The workflow `.github/workflows/deploy.yml` uploads `./docs` as the Pages artifact and deploys it on every push to `main` (or via manual `workflow_dispatch`). Files outside `docs/` (like `README.md`) are never published.
- Deployment uses the GitHub Actions Pages flow (`actions/upload-pages-artifact` + `actions/deploy-pages`), not branch-based Pages. The custom domain therefore also needs to be set in repo Settings → Pages, with DNS pointing `donaldfilimon.com` at GitHub Pages; `docs/CNAME` is kept in the artifact so the domain survives deploys.
- Do not add a second workflow that deploys to Pages — a previous `static.yml` deployed the repo root and raced `deploy.yml` (both used the `"pages"` concurrency group), making it nondeterministic which content went live. It was removed deliberately.

## Architecture of docs/

- `index.html` — currently an immediate redirect (meta refresh + `location.replace`) to the Star Space portfolio project site. This is intentional (commit "Redirect root portfolio to Star Space site"); don't "fix" it without being asked.
- `main.js` — a complete standalone React resume/portfolio app (~40KB) written against global `React`/`ReactDOM` from a CDN with Tailwind utility classes, JSDoc-typed and using `Object.freeze`d data constants (skills, metrics, experience). It is currently dormant because `index.html` redirects instead of loading it; restoring the resume site means loading React, `styles.css`, and `main.js` from `index.html` again.
- `styles.css` — the styling for that resume app.
- `sw.js` + `manifest.json` — PWA support: a network-first service worker caching `/`, `/index.html`, `/styles.css`, `/main.js`. Note the paths are root-absolute, which only works because the site is served from the domain root; they would break under a subpath. When changing published assets, bump `CACHE_NAME` (`df-portfolio-v1`) or returning visitors may get stale cached files. `manifest.json` references `./assets/icon-192.png` and `./assets/icon-512.png`, which do not exist yet.

`README.md` is Donald's resume in Markdown for the GitHub repo page; it is content, not documentation of this codebase, and is not part of the deployed site.
