import { WorkFilter } from "sites-project";

/**
 * WorkFilter's only prop is `filter`, mirroring the real usage at
 * app/work/page.tsx:67 (`<WorkFilter filter={filter} />`, where `filter`
 * comes from parseWorkFilter reading the URL). The component reads
 * `projects` and `kindLabels` straight from content/site.ts itself, so
 * these cells exercise it against the real project register rather than
 * fabricated data. Values are real ProjectKind members from content/site.ts.
 *
 * Renders ProjectCard (compact) internally in a `work-index-grid`, which is
 * wide by design (see work-filter.tsx / work.css) - flag as a cardMode
 * candidate if it overflows a standard grid cell.
 */
const paper = {
  background: "#fff",
  color: "#14161b",
  fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  padding: 28,
  borderRadius: 12,
};

export const AllWork = () => (
  <div style={paper}>
    <WorkFilter filter="all" />
  </div>
);

export const AiSystems = () => (
  <div style={paper}>
    <WorkFilter filter="ai-systems" />
  </div>
);

export const Products = () => (
  <div style={paper}>
    <WorkFilter filter="product" />
  </div>
);
