# Self-hosted macOS runner

Two jobs run on one macOS arm64 runner registered to this repository: `deploy` in `.github/workflows/deploy.yml` (workflow "Deploy to GitHub Pages") and `check` in `.github/workflows/sites-check.yml` (workflow "Sites check", the gate for `sites/`). GitHub-hosted jobs can't start while the account's Actions billing is locked, but self-hosted jobs still run.

This note lives in `.github/`, not `docs/`: `docs/` is the published Pages tree, and `scripts/publish-docs.ts` deletes and rebuilds it on every `bun run build`.

## Registration

| Field | Value |
|-------|-------|
| Labels | `self-hosted`, `macOS`, `ARM64`, `donaldfilimon.github.io` |
| Register at | [Settings → Actions → Runners → New self-hosted runner](https://github.com/donaldfilimon/donaldfilimon.github.io/settings/actions/runners/new?arch=arm64) (choose macOS, ARM64) |

A runner is registered to one repository. If the same Mac already runs a runner for another repository (for example `abi`), install a second runner in its own directory (for example `~/actions-runner-donaldfilimon.github.io`), run `./config.sh` with the URL and token from the page above, add the custom label `donaldfilimon.github.io`, then run `./svc.sh install && ./svc.sh start`.

Until a runner with these labels is online, both jobs wait in the queue, so pushes to `main` do not publish.

## Host requirements

- **GNU tar as `gtar`**: `brew install gnu-tar`. `actions/upload-pages-artifact@v5` archives with `gtar` on macOS (bsdtar has no `--hard-dereference`). The job's first step checks for it and fails with this fix if it is missing.
- Homebrew, for the above.
- `git` (Xcode Command Line Tools), so `actions/checkout` does a real clone.
- For `sites-check`: macOS 13.5 or later (Cloudflare's `workerd`, which `npm run build` loads through Wrangler and the Cloudflare Vite plugin), and network access to nodejs.org and the npm registry. `actions/setup-node@v4` installs Node 22 into the runner's tool cache and `npm ci` installs the darwin-arm64 native packages that `sites/package-lock.json` pins; no global Node, Bun or Homebrew packages are needed for it.
- Nothing else: `oven-sh/setup-bun@v2` downloads Bun 1.4.0 (darwin-aarch64) per job, `scripts/check-docs.ts` imports only `node:fs` and `node:path`, and `actions/checkout`, `actions/configure-pages` and `actions/deploy-pages` are JavaScript actions run by the runner's bundled Node.

## Security

`deploy.yml` has no `pull_request` trigger, and its job runs only for `push` to `main` and `workflow_dispatch` in `donaldfilimon/donaldfilimon.github.io`. `sites-check.yml` also runs for `pull_request`, but its job condition admits only pull requests whose head branch is in this same repository; fork PRs get no job at all (there is no hosted fallback). Neither workflow uses `pull_request_target`, `issue_comment` or `workflow_run`; never add a self-hosted job to such a trigger. No untrusted code reaches the host. Both checkouts use `persist-credentials: false`. `deploy.yml` has `contents: read`, `pages: write` and `id-token: write`, which the Pages deploy needs; `sites-check.yml` has only `contents: read`.

Where you can, use a dedicated macOS user for the runner rather than your daily account. Keep no production secrets on the host.

## Jobs that stay hosted

None. `deploy` and `sites-check`'s `check` are the only jobs in this repository.

The runner that served the former standalone `donaldfilimon/donald-filimon-sites` repository (label `donald-filimon-sites`) is not used by this repository.
