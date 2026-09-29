import { Slider } from "sites-project";

/**
 * Slider has no exported label/value sub-part (unlike Progress), so the
 * numeric read-out is a plain inline-styled span next to it — the same way
 * a design agent would compose it. Content is an engagement-scoping slider
 * (length in weeks, budget range) matching the intake fields a services
 * inquiry on this site would actually use.
 */
const paper = {
  background: "#fff",
  color: "#14161b",
  fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  padding: 28,
  borderRadius: 12,
  maxWidth: 380,
};
const field = { display: "flex", flexDirection: "column" as const, gap: 10 };
const labelRow = { display: "flex", justifyContent: "space-between", fontSize: 14 };
const label = { fontWeight: 500 };
const value = { color: "#5b606b", fontVariantNumeric: "tabular-nums" as const };

export const EngagementLength = () => (
  <div style={paper}>
    <div style={field}>
      <div style={labelRow}>
        <span style={label}>Engagement length</span>
        <span style={value}>6 weeks</span>
      </div>
      <Slider aria-label="Engagement length in weeks" defaultValue={[6]} min={1} max={16} step={1} />
    </div>
  </div>
);

export const BudgetRange = () => (
  <div style={paper}>
    <div style={field}>
      <div style={labelRow}>
        <span style={label}>Budget range</span>
        <span style={value}>$40k – $120k</span>
      </div>
      <Slider
        aria-label="Budget range in thousands of dollars"
        defaultValue={[40, 120]}
        min={0}
        max={200}
        step={10}
      />
    </div>
  </div>
);

export const Disabled = () => (
  <div style={paper}>
    <div style={field}>
      <div style={labelRow}>
        <span style={label}>Timeline (locked to proposal)</span>
        <span style={value}>3 weeks</span>
      </div>
      <Slider aria-label="Timeline in weeks, disabled" defaultValue={[3]} min={1} max={16} step={1} disabled />
    </div>
  </div>
);
