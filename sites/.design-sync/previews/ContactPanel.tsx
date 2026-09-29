import { ContactPanel } from "sites-project";

/**
 * ContactPanel's only prop is `compact`. Both cells mirror real usages:
 * default at app/about/page.tsx:124 and app/services/page.tsx:114, compact
 * at app/work/page.tsx:70 and app/work/[slug]/page.tsx:254. All copy
 * (headline, body, mailto, LinkedIn) is hardcoded in the component itself
 * from content/site.ts's `profile`, not passed in.
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
    <ContactPanel />
  </div>
);

export const Compact = () => (
  <div style={paper}>
    <ContactPanel compact />
  </div>
);
