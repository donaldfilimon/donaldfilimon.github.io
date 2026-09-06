# donaldfilimon.com

Personal site for Donald Filimon. Local checkout: `~/dev/active/donaldfilimoncom`. Git remote is [donaldfilimon/donaldfilimon.github.io](https://github.com/donaldfilimon/donaldfilimon.github.io) so GitHub Pages can serve it at https://donaldfilimon.github.io/ and, after DNS exists, https://donaldfilimon.com.

Stack: Next.js App Router, React 19, TypeScript, Bun, Tailwind v4, shadcn/ui. Static export to `docs/` for GitHub Pages. There is no server runtime.

## Commands

```bash
bun install
bun run dev          # http://127.0.0.1:4173
bun run check        # typecheck, lint, static export into docs/
```

`bun run build` writes `out/` then copies it to `docs/`, adding `CNAME` (`donaldfilimon.com`) and `.nojekyll`. Commit `docs/` before pushing. The Pages workflow uploads `docs/` only.

`bun run check` intentionally regenerates that published output. With unchanged
inputs and the same installed toolchain, repeated checks produce identical
`docs/` files. `scripts/build-id.ts` hashes sorted paths and file contents in
`app/`, `components/`, `content/`, `lib/`, `public/`, and `scripts/`, plus the
Next/PostCSS/TypeScript configuration, `package.json`, and `bun.lock`. Extend
that input list when adding another build input. Generated output, file mtimes,
and Git commit IDs do not affect the build ID, so committing an export does not
invalidate it. Source changes (including uncommitted files) still change the ID.
The sitemap omits optional `lastmod` because no editorial modification date is
tracked; the time a check ran is not a content modification date.

## Custom domain

`donaldfilimon.com` is not registered. W3Schools dropped it on 13 May 2026 after failed card renewals. After you buy it (Cloudflare Registrar is the natural fit), set:

| Type | Name | Value |
|------|------|--------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `donaldfilimon.github.io` |

Do not attach the domain to the unrelated Vercel project `model-context-protocol-mcp-with-next-js`.
