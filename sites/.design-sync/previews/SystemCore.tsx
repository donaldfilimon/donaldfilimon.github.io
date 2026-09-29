import { SystemCore } from "sites-project";

/**
 * SystemCore takes no props: its four core nodes (ABI, WDBX, Native,
 * Compiler) are hardcoded in the component itself, not sourced from
 * content/site.ts. There is one real composition, so there is one cell.
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
    <SystemCore />
  </div>
);
