import { Button } from "sites-project";

/**
 * Editorial light theme: the harness body is white and globals.css sets
 * `color: var(--ink)` on body, which a standalone card does not inherit — so the
 * ground reproduces app/layout.tsx's body rather than leaving text at browser default.
 *
 * The `destructive` variant is deliberately NOT shown. `@theme inline` in
 * app/globals.css declares no `--color-destructive`, so `bg-destructive/10` and
 * `text-destructive` emit zero rules and the variant renders as plain text.
 * Showing it would teach the design agent that destructive looks unstyled.
 * See NOTES.md — the palette is deliberately red-free, so the fix is a brand
 * decision, not a mechanical one.
 */
const paper = {
  background: "#fff",
  color: "#14161b",
  fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  padding: 28,
  borderRadius: 12,
};
const row = { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" as const };

export const Variants = () => (
  <div style={paper}>
    <div style={row}>
      <Button>View work</Button>
      <Button variant="outline">Read the case study</Button>
      <Button variant="secondary">Services</Button>
      <Button variant="ghost">Skip</Button>
      <Button variant="link">donaldfilimon.com</Button>
    </div>
  </div>
);

export const Sizes = () => (
  <div style={paper}>
    <div style={row}>
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
    </div>
  </div>
);

export const States = () => (
  <div style={paper}>
    <div style={row}>
      <Button>Enabled</Button>
      <Button disabled>Disabled</Button>
      <Button variant="outline" disabled>
        Outline disabled
      </Button>
    </div>
  </div>
);
