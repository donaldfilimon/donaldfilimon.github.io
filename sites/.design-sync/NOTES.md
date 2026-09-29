# design-sync NOTES — donald-filimon-sites

This repo is a **Vinext + Vite + React 19 app**, not a packaged design system.
The sync targets its de-facto design system: 7 bespoke editorial components in
`components/` plus 60 shadcn `base-nova` primitives in `components/ui/`, built on
`@base-ui/react`. First import: 2026-09-06, project (id in the local, untracked `config.json`)
("Donald Filimon Portfolio").

## The three traps that cost build cycles here

1. **`ENOENT node_modules/sites-project/package.json`.** With no `cfg.entry`,
   `package-build.mjs:176` sets `PKG_DIR = join(NODE_MODULES, PKG)`, and npm never
   self-installs a package into its own `node_modules`. Fixed with a barrel at
   `.design-sync/ds-entry.ts` + `cfg.entry`, mirroring mlai's `src/components/ds.ts`.
   **The barrel's location is load-bearing:** `package-build.mjs:164-174` walks UP
   from the entry for a `package.json` with a `name`, so a barrel under
   `.design-sync/` lands `PKG_DIR` on the repo root — which is what `srcDir`,
   `cssEntry` and `extraFonts` all assume. A barrel inside `components/` would
   work too; one in a directory with its own named package.json would not.

2. **⚠️ Setting `cfg.entry` silently produced `components: 0` with exit 0.**
   An entry disables synth-entry mode, and `exportedNames` reads the package's
   declared `types` entry, **not** `cfg.entry`. With no built `.d.ts` it enumerated
   nothing, and because `synthEntry` was now false the `deriveComponentsFromSrc`
   fallback never fired. The build reported success and wrote a bundle with zero
   components. **A green exit code here does not mean the sync found anything —
   always read the `components:` line.** The real mechanism is an explicit
   `componentSrcMap`, which is what mlai relies on.

3. **`componentSrcMap` must be derived from real exports, not filenames.** Five of
   69 files export a primary name that does not match the filename:
   `chart.tsx`→`ChartContainer`, `resizable.tsx`→`ResizablePanelGroup`,
   `direction.tsx`→`DirectionProvider`, `input-otp.tsx`→`InputOTP`,
   `sonner.tsx`→`Toaster`. Regenerate by parsing both `export function/const/class`
   and `export { ... }` blocks. The map also keeps shadcn sub-parts (`CardHeader`,
   `AccordionTrigger`) in the bundle for composition without each becoming a card.

## Regeneration order (all three, before every build)

```sh
npm run build                     # emits the only compiled Tailwind stylesheet
./.design-sync/refresh-styles.sh  # copies it to a stable path + injects font vars
./.design-sync/regen-entry.sh     # rebuilds the barrel if components were added
```
`cfg.buildCmd` chains these. Two reasons the first two exist:
- The compiled CSS lands at `dist/client/_next/static/css/index.<hash>.css`. **The
  hash rotates every build** (observed `Bydq_S1-` → `kzaLr6S1`) and `dist/` is
  gitignored, so `cfg.cssEntry` cannot point at it directly.
- **Geist is injected at runtime by `next/font/google`**, so the compiled CSS
  contains **zero `@font-face` rules** and never defines `--font-geist-sans`.
  Without the refresh step every card renders in Arial. `refresh-styles.sh`
  prepends the two variables; the 11 woff2 files are committed under
  `.design-sync/fonts/` with **relative** urls, because vinext bakes absolute
  `/Users/...` paths into its own font CSS.

## ⚠️ `--color-destructive` is not declared, and 22 components reference it

`@theme inline` in `app/globals.css` declares 12 colour tokens; destructive is not
one of them. Measured with a control: `bg-destructive`, `text-destructive`,
`border-destructive`, `ring-destructive` emit **0** rules in the compiled sheet,
while `bg-primary` and `text-primary` emit 1 each. **22 of the 60 `components/ui/*`
files reference `destructive` classes.**

- Not a live site bug — no `app/` or `content/` code uses them, only the vendored
  primitives do.
- `Button` routes around it: the preview omits `variant="destructive"` rather than
  teaching the design agent that destructive looks like plain text.
- **`Attachment` cannot route around it.** Its base `attachmentVariants` bakes
  `data-[state=error]:border-destructive/30` into the component itself, so
  `state="error"` is a first-class state that renders as a plain grey border.
- **This is a brand decision, not a mechanical fix** — the palette (ink, ink-soft,
  paper, paper-deep, muted, border, electric, acid) is deliberately red-free.
  Either declare `--color-destructive` / `--color-destructive-foreground`, or
  accept that error states carry no colour and strip the dead utilities. Donald's
  call; do not invent a red.

## ⚠️ The emitted `.d.ts` were stubs — and the fix is a fork

Before the override, every component shipped `<Name>Props { [key: string]: unknown }`
as its entire API contract. **`mlai` has the identical problem** (verified against
its own `ds-bundle`), so this is the synth-mode limitation for app repos, not a
defect of this repo. It matters because the `.d.ts` is what the design agent codes
against.

`.design-sync/overrides/dts.mjs` forks `lib/dts.mjs` and changes exactly three
things: the ts-morph entry falls back to `cfg.entry`; the project also loads
`srcDir`'s real `.tsx`/`.ts`; and `baseUrl`/`paths` come from `cfg.tsconfig` so
`@/...` and the `next/*` aliases resolve. Declared in `cfg.libOverrides`.
**It needs `.design-sync/node_modules -> ../.ds-sync/node_modules`** (gitignored,
so recreate it on every fresh clone) or its bare `ts-morph` import fails.
On re-sync, diff the fork against the bundled `lib/dts.mjs` and merge upstream
changes. **If this fork works, the same change belongs in mlai.**

## next/* imports resolve through the repo's own test adapters

`SiteHeader`, `SiteFooter`, `ProjectCard`, `WorkFilter` import `next/link` and
`next/navigation`, and `next` is not a dependency — vinext shims it at runtime.
`.design-sync/tsconfig.ds.json` aliases both to the repo's **own committed**
`test/next-link.tsx` and `test/next-navigation.ts` (the same adapters Vitest uses),
so nothing was reimplemented. Consequence: `usePathname()` always returns `'/'`,
so active-nav state shows the home item as current in every card. Expected.

## Preview authoring conventions (this repo)

- **Light-only DS.** Wrap every cell in a ground reproducing `app/layout.tsx`'s
  body, because a standalone card inherits neither the ink colour nor Geist:
  `{ background: "#fff", color: "#14161b", fontFamily: "var(--font-geist-sans), Arial, sans-serif", padding: 28, borderRadius: 12 }`.
  Without it, text falls back to browser-default black in a system font.
- **Inline `style={{}}` only, never Tailwind classes in a preview.** The stylesheet
  is content-scanned from `components/` and `app/` only, so a class used only in
  `.design-sync/previews/` gets no CSS and fails silently.
- **Lift content from `content/site.ts` verbatim.** These components state real
  public/private visibility and repository links about real engagements; invented
  records would misrepresent them in every design built with them.

## Known render warns

- `[TOKENS_MISSING]` 17 properties (`--toast-index`, `--accordion-panel-height`,
  `--drawer-swipe-progress`, `--sidebar-border`, …). Base UI sets these at runtime
  from JS; the warn text itself calls that expected. Non-blocking.
- All 69 components land in a single `general` group, because `source-kit.mjs:24`
  lists `ui` in `GENERIC_DIR` so the `components/ui/` segment is discarded. The
  config-driven fix is `cfg.docsMap` stubs carrying `category:` frontmatter for the
  7 bespoke components. Cosmetic, but the picker is human-facing.

## Re-sync risks

1. `.design-sync/ds-styles.css` is generated and gitignored — regenerate every run
   or `cfg.cssEntry` dangles and the bundle ships unstyled.
2. The `.design-sync/node_modules` symlink is gitignored while the fork that needs
   it is committed. Recreate it on a fresh clone.
3. `componentSrcMap` is a hand-maintained 69-entry map. Adding a component to
   `components/` does **not** add it to the sync until the map is regenerated.
4. The barrel and the map are two separate things that both need regenerating.

## ⚠️ `SystemCore` is dead code that can never render — excluded from the sync

Found during the first import's preview pass and verified independently: every
class `components/system-core.tsx` applies (`system-core`, `core-stage`,
`core-node`, `core-ring`, `core-readout`, `core-center`, `core-coordinate`, …)
appears **zero** times in `app/globals.css` **and** zero times in the compiled
stylesheet, and the component has **zero import sites** anywhere outside its own
file. The CSS for it was never written.

It is excluded via `componentSrcMap: { "SystemCore": null }`. Shipping it would
hand the design agent a component that renders as unstyled divs in every design
it appears in, which is worse than its absence. **Re-include it the moment its
CSS lands** — the exclusion is about the missing stylesheet, not the component.

## Card overrides, and why each one exists

- `SiteHeader` → `{ cardMode: "column", viewport: "1200x700" }`. `app/globals.css`
  hides `.header-link` under `@media (max-width: 1050px)`, and the capture
  viewport is 900px, so the branded "Start a project" CTA is invisible at the
  default size. The component is correct; the capture was below its breakpoint.
- `WorkFilter` → `{ cardMode: "column" }`. Pills, counts and filtering are all
  correct against real `content/site.ts` data, but the last row of `ProjectCard`s
  is clipped by the default grid cell's fixed height and `overflow: hidden`.

Both are presentation-only and were flagged by the preview batch rather than
worked around inside a preview file — the right split, since a preview cannot fix
a viewport or a grid cell.

## Findings folded from the three preview batches (2026-09-06)

- **`--color-input` is undeclared, and for Switch that is severe.** `switch.tsx` styles
  the unchecked track with `bg-input` and the thumb with `bg-background` (the page
  colour), so an OFF switch is a completely invisible control beside its label.
  Confirmed in the rendered PNG by two independent passes. Every Switch cell is now
  `defaultChecked`, varying only by size and disabled; restore the off cells the moment
  `--color-input` exists. For Checkbox and Toggle the same gap degrades gracefully,
  because the plain `border` utility still falls back to `currentColor`.
- **Real component bug, fixed in the preview:** `components/ui/slider.tsx` infers thumb
  count from whether `value`/`defaultValue` is an array, so a bare `defaultValue={6}`
  silently becomes a two-thumb `[min, max]` range slider. Always pass an array, even
  for one thumb.
- **Indeterminate states have no CSS, in two components.** `Checkbox` has no
  `data-indeterminate:` rule, yet Base UI still mounts the indicator, so an
  indeterminate box shows a check glyph in an unfilled, unbordered square. `Progress`
  with `value={null}` sets no width and the DS defines no indeterminate animation, so
  the bar is a zero-width sliver indistinguishable from a broken 0%. Both were left out
  of previews rather than shipped as misleading examples.
- **⚠️ `Toaster` was silently missing from the bundle.** Two modules export it
  (`components/ui/sonner.tsx` and `components/ui/toast.tsx`), and an ES `export *`
  collision **omits** the name rather than erroring, so `window.SitesDS.Toaster` was
  undefined and validate failed `[BUNDLE_EXPORT]`. `regen-entry.mjs` now detects every
  duplicated export name and emits an explicit re-export resolved through
  `componentSrcMap`. **If a new component ever disappears from the bundle, check for a
  duplicate export name first.**
- **Changing `config.json` mid-run trips `[CONFIG_STALE]` and blocks every scoped
  rebuild**, for all batches, not just the one you were editing for. Add config keys
  before starting preview work, or expect to re-run the full build.
- **A full `package-build.mjs` re-stamps grade keys**, so grades clear for any component
  whose emitted contract moved. That is legitimate after a barrel or `.d.ts` change; it
  is only suspicious on a genuinely no-change run.

## Gate state at first import

`package-validate.mjs` **exit 0**. 68 components, 68/68 previews render cleanly, 0 bad,
0 thin, 0 variantsIdentical. 23 authored previews / 48 cells, all graded `good`; 45 floor
cards, which are the deliberate baseline for unauthored components, not failures. The
closing `package-capture.mjs` printed **19 carried forward, 0 cleared** — the proof that
the next re-sync is cheap.

## Re-sync run (2026-09-08 18:2x) — clean no-op, determinism proven

`resync.mjs --remote` → build ok, diff ok, validate exit 0, capture **skipped
(`empty_worklist`)**, `anchor: "ok"`, `learningsUnmerged: []`. **68 unchanged, 0 changed,
0 added, 0 removed**, `pendingGrade: []`, `upload.any: false`. **Nothing uploaded** — the
project already matched the build, which is the expected shape of a no-change re-sync, not
a failure.

- **The pipeline is byte-deterministic here. Measured, not inferred from `upload.any`.**
  Against the anchor fetched from the project immediately before the run: `styleSha`,
  `auxSha`, `bundleSha12`, `scriptsSha` and `keyRecipe` all **identical**, **68/68
  `renderHashes`** and **204/204 `sourceHashes`** identical. That covers the full three-step
  regeneration (`npm run build` → `refresh-styles.sh` → `regen-entry.mjs`), so the rotating
  `index.<hash>.css` filename does **not** leak into the output. Reproduce with
  `diff .design-sync/.cache/remote-sync.json ds-bundle/_ds_sync.json`.
- **Only known warns fired.** `[TOKENS_MISSING]` **17** — the exact set the *Known render
  warns* section lists. `[RENDER_SKIPPED]` is expected: the driver skips the render check on
  an anchored no-change re-sync (pass `--render-sample 0` to force it). No new warns.
- **`conventions.md` re-validated: zero drift.** All 14 utility classes and both component
  names resolve; the single unresolved token is **`--color-destructive`**, which is the gap
  this file already documents at length, not new drift. Leave it until the token lands.
- **⚠️ New unsynced material exists in the working tree and is NOT in the 69-entry
  `componentSrcMap`** — untracked `components/blocks/`, `components/ui/sonner.tsx`, and
  `app/blocks/` (a batch of shadcn block pages). Per risk 3 the map is hand-maintained, so
  none of it reaches the design system until someone regenerates the map **and** the barrel.
  `app/blocks/*/page.tsx` are pages rather than components and probably do not belong in the
  DS at all; `sonner.tsx` and `components/blocks/` are the real candidates. Deliberately not
  added this run — adding them means authoring and grading new previews.
- **`.design-sync/.cache/remote-sync.json` did not exist on this machine before this run**
  (the cache is gitignored), so the anchor was fetched fresh from the project. That is the
  normal path; just never hand-write one without `sourceHashes` (see the mlai NOTES for what
  that costs).
