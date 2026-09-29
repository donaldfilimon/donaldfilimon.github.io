import { SiteFooter } from "sites-project";

/**
 * SiteFooter takes no props: it reads `profile` straight from
 * content/site.ts, exactly as app/layout.tsx renders it. One real
 * composition, one cell.
 */
const paper = {
  background: "#fff",
  color: "#14161b",
  fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  padding: 28,
  borderRadius: 12,
};

export const Default = () => (
  <div style={paper}>
    <SiteFooter />
  </div>
);
