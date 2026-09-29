import { Progress, ProgressLabel, ProgressValue } from "sites-project";

/**
 * Content frames Progress the way this evidence-led-hardening portfolio
 * would actually use it: gate/coverage completion for a case study, not a
 * generic file-upload bar.
 *
 * A `value={null}` (indeterminate) cell is deliberately NOT shown here.
 * ProgressIndicator only sets `width` inline when `percentageValue` is a
 * number (see node_modules/@base-ui/react progress/indicator/
 * ProgressIndicator.js); for `null` it emits no width at all, and this DS
 * defines no indeterminate animation in its CSS, so the bar would render
 * as an invisible zero-width sliver — indistinguishable from a broken 0%
 * bar, not a legible "indeterminate" state. Same root cause as Checkbox's
 * unstyled `indeterminate` — logged in learnings as a second occurrence.
 */
const paper = {
  background: "#fff",
  color: "#14161b",
  fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  padding: 28,
  borderRadius: 12,
  maxWidth: 420,
};
const stack = { display: "flex", flexDirection: "column" as const, gap: 18 };

export const SingleMetric = () => (
  <div style={paper}>
    <Progress value={68}>
      <ProgressLabel>Base UI migration</ProgressLabel>
      <ProgressValue />
    </Progress>
  </div>
);

export const EvidenceGates = () => (
  <div style={paper}>
    <div style={stack}>
      <Progress value={92}>
        <ProgressLabel>Test coverage</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={54}>
        <ProgressLabel>Constitution conformance</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={30}>
        <ProgressLabel>Deployment readiness</ProgressLabel>
        <ProgressValue />
      </Progress>
    </div>
  </div>
);

export const Complete = () => (
  <div style={paper}>
    <Progress value={100}>
      <ProgressLabel>Case study published</ProgressLabel>
      <ProgressValue />
    </Progress>
  </div>
);
