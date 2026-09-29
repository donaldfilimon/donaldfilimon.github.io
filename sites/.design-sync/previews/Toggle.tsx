import { Toggle } from "sites-project";

/**
 * Toggle is a single two-state button, styled here as the filter chips a
 * work-filter bar would use — the labels are the four ProjectKind values
 * from content/site.ts (kindLabel: "AI systems", "Native systems",
 * "Product", "Lab"), the same taxonomy WorkFilter renders elsewhere in
 * this DS.
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
    <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>
      <div style={row}>
        <Toggle defaultPressed>AI systems</Toggle>
        <Toggle>Native systems</Toggle>
      </div>
      <div style={row}>
        <Toggle variant="outline" defaultPressed>
          Product
        </Toggle>
        <Toggle variant="outline">Lab</Toggle>
      </div>
    </div>
  </div>
);

export const Sizes = () => (
  <div style={paper}>
    <div style={row}>
      <Toggle size="sm" defaultPressed>
        Lab
      </Toggle>
      <Toggle defaultPressed>Lab</Toggle>
      <Toggle size="lg" defaultPressed>
        Lab
      </Toggle>
    </div>
  </div>
);

export const States = () => (
  <div style={paper}>
    <div style={row}>
      <Toggle>Native systems</Toggle>
      <Toggle defaultPressed>Product</Toggle>
      <Toggle disabled>AI systems</Toggle>
    </div>
  </div>
);
