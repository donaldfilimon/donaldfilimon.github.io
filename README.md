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
