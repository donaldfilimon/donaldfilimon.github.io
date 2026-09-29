#!/bin/sh
# Regenerates .design-sync/ds-styles.css, the cfg.cssEntry for design-sync.
#
# Why this exists: the only compiled Tailwind stylesheet in this repo is emitted
# by `npm run build` at dist/client/_next/static/css/index.<hash>.css. The hash
# rotates every build and dist/ is gitignored, so cfg.cssEntry cannot point at
# it directly. This copies it to a stable path and prepends the two font
# variables that next/font/google injects onto <body> at runtime (and which
# therefore do not exist in a standalone preview card).
#
# Run `npm run build` first, then this script, before any design-sync build.
set -eu
cd "$(dirname "$0")/.."
css=$(ls -t dist/client/_next/static/css/index.*.css 2>/dev/null | head -1)
[ -n "$css" ] || { echo "no compiled css under dist/ - run 'npm run build' first" >&2; exit 1; }
{
  printf '/* design-sync: font vars injected at runtime by next/font/google in app/layout.tsx */\n'
  printf ':root{--font-geist-sans:"Geist",ui-sans-serif,system-ui,sans-serif;--font-geist-mono:"Geist Mono",ui-monospace,monospace;}\n'
  cat "$css"
} > .design-sync/ds-styles.css
echo "ds-styles.css <- $css ($(wc -c < .design-sync/ds-styles.css) bytes)"
