## Building with this design system

An editorial portfolio system: near-black ink on white paper, one electric-blue
accent, Geist for text and Geist Mono for labels. It is **light-only** — there is
no dark theme, so do not add `dark:` variants.

### Setup

No provider is required. Components read their colours from CSS custom
properties defined on `:root` in the shipped stylesheet, so they render correctly
as soon as `styles.css` is loaded.

One thing does not come for free: `body` carries the ink colour and the Geist
family. A bare container inherits neither, so text falls back to browser-default
black in a system font. Reproduce the body on your root:

```jsx
<div style={{ background: "var(--paper)", color: "var(--ink)",
              fontFamily: "var(--font-geist-sans), Arial, sans-serif" }}>
  {/* ... */}
</div>
```

### Two styling idioms, and they are used together

**1. Editorial layout classes** carry the brand voice. Prefer these for page
structure rather than rebuilding them from utilities:

| Class | Use |
|---|---|
| `.section` | A page band. Fluid padding, top hairline rule. |
| `.folio-hero` `.page-hero` `.case-hero` `.contact-hero` | Hero bands per page type. |
| `.eyebrow` | Mono, uppercase, letter-spaced kicker above a heading. |
| `.text-link` | Inline link with a bottom rule; turns electric on hover. |
| `.pill-link` / `.pill-link-primary` | Bordered pill CTA; the primary fill is electric. |
| `.site-header` / `.site-footer` | Sticky quiet nav; footer band. |
| `.project-card` / `.project-card-topline` / `.privacy-mark` | Project card shell, its meta topline, and the lock-marked private badge. |
| `.skip-link` | Visually hidden until focused. |

**2. Tailwind v4 semantic utilities** for everything else: `bg-background`,
`text-foreground`, `bg-primary`, `text-primary`, `bg-secondary`,
`text-muted-foreground`, `border-border`, `bg-popover`, `ring-ring`, plus the
`rounded-{sm,md,lg,xl}` scale.

Raw palette variables, when you need a value directly: `--ink`, `--ink-soft`,
`--paper`, `--paper-bright`, `--paper-deep`, `--muted`, `--border`,
`--electric`, `--acid`, `--radius`.

### Do not use `destructive`

The palette is deliberately red-free. `--color-destructive` is **not declared**,
so `bg-destructive`, `text-destructive`, `border-destructive` and
`ring-destructive` emit no CSS at all and render as unstyled text. Several
primitives accept a `destructive` variant and `aria-invalid` styling; both are
inert here. Signal errors with copy and `.privacy-mark`-style affordances
instead, or ask for a destructive token to be added to the brand first.

### Where the truth lives

Read `_ds/<folder>/styles.css` and its `@import` closure for the real tokens and
the editorial classes above, and each component's `<Name>.prompt.md` for its
usage. **The emitted `<Name>.d.ts` files are stubs** (`[key: string]: unknown`) —
this system is synced from an app rather than a typed package, so they carry no
prop contract. Read the `.prompt.md` and the preview card, never the `.d.ts`,
to learn a component's API.

### An idiomatic composition

```jsx
<section className="section">
  <p className="eyebrow">Selected work</p>
  <h2>Systems that hold up under evidence.</h2>
  <div style={{ display: "grid", gap: 24 }}>
    <ProjectCard project={project} index={0} />
  </div>
  <a className="pill-link pill-link-primary" href="/work">See every engagement</a>
</section>
```
