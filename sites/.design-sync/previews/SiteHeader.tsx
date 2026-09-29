import { SiteHeader } from "sites-project";

/**
 * SiteHeader takes no props: it reads `navigation` and `profile` straight
 * from content/site.ts, exactly as app/layout.tsx renders it. There is one
 * real composition (see app/layout.tsx), so there is one cell here rather
 * than fabricated variants.
 *
 * Known, expected quirk (not a defect): usePathname() is aliased to the
 * repo's own test/next-navigation.ts adapter for the bundle and always
 * returns '/', so the header's aria-current active-nav state always lands
 * on the home wordmark rather than a real route.
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
    <SiteHeader />
  </div>
);
