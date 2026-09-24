# Self-hosted macOS runner

The `deploy` job in `.github/workflows/deploy.yml` (workflow "Deploy to GitHub Pages") runs on a macOS arm64 runner registered to this repository. GitHub-hosted jobs can't start while the account's Actions billing is locked, but self-hosted jobs still run.

This note lives in `.github/`, not `docs/`: `docs/` is the published Pages tree, and `scripts/publish-docs.ts` deletes and rebuilds it on every `bun run build`.

## Registration

| Field | Value |
|-------|-------|
| Labels | `self-hosted`, `macOS`, `ARM64`, `donaldfilimon.github.io` |
| Register at | [Settings → Actions → Runners → New self-hosted runner](https://github.com/donaldfilimon/donaldfilimon.github.io/settings/actions/runners/new?arch=arm64) (choose macOS, ARM64) |

A runner is registered to one repository. If the same Mac already runs a runner for another repository (for example `abi`), install a second runner in its own directory (for example `~/actions-runner-donaldfilimon.github.io`), run `./config.sh` with the URL and token from the page above, add the custom label `donaldfilimon.github.io`, then run `./svc.sh install && ./svc.sh start`.

Until a runner with these labels is online, the deploy job waits in the queue, so pushes to `main` do not publish.

## Host requirements

- **GNU tar as `gtar`**: `brew install gnu-tar`. `actions/upload-pages-artifact@v5` archives with `gtar` on macOS (bsdtar has no `--hard-dereference`). The job's first step checks for it and fails with this fix if it is missing.
- Homebrew, for the above.
- Nothing else: `oven-sh/setup-bun@v2` downloads Bun 1.4.0 (darwin-aarch64) per job, `scripts/check-docs.ts` imports only `node:fs` and `node:path`, and `actions/checkout`, `actions/configure-pages` and `actions/deploy-pages` are JavaScript actions run by the runner's bundled Node.

## Security

The workflow has no `pull_request` trigger, and the job runs only for `push` to `main` and `workflow_dispatch` in `donaldfilimon/donaldfilimon.github.io`. No untrusted code reaches the host. The checkout uses `persist-credentials: false`; workflow permissions are unchanged (`contents: read`, `pages: write`, `id-token: write`, which the Pages deploy needs).

Where you can, use a dedicated macOS user for the runner rather than your daily account. Keep no production secrets on the host.

## Jobs that stay hosted

None. `deploy` is the only job in this repository.
