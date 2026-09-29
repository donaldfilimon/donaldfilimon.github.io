import { Switch, Label } from "sites-project";

/**
 * ⚠️ Only ON states are shown, and that is deliberate.
 *
 * `switch.tsx` styles its unchecked track with `bg-input`, but `@theme inline`
 * in app/globals.css never declares `--color-input`, so `bg-input` emits ZERO
 * rules and an OFF switch renders as an invisible control next to its label.
 * Showing it would teach the design agent that "off" looks like nothing at all.
 *
 * This is one of five undeclared token families (card, accent, input,
 * destructive, sidebar) — see NOTES.md. Restore the off/toggle cells once
 * `--color-input` is declared; the component itself is fine.
 */
const paper = {
  background: "#fff",
  color: "#14161b",
  fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  padding: 28,
  borderRadius: 12,
  maxWidth: 520,
};
const row = { display: "flex", alignItems: "center", gap: 12 };

export const AvailabilitySettings = () => (
  <div style={paper}>
    <div style={{ display: "grid", gap: 18 }}>
      <div style={row}>
        <Switch defaultChecked id="open-to-work" />
        <div>
          <Label htmlFor="open-to-work">Open to new engagements</Label>
          <p style={{ margin: "2px 0 0", fontSize: 13, color: "#5c6370" }}>
            Shown in the availability line on the homepage.
          </p>
        </div>
      </div>
      <div style={row}>
        <Switch defaultChecked id="notify-case-study" />
        <div>
          <Label htmlFor="notify-case-study">Announce new case studies</Label>
          <p style={{ margin: "2px 0 0", fontSize: 13, color: "#5c6370" }}>
            Posts to the changelog when an engagement publishes.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const Sizes = () => (
  <div style={paper}>
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <div style={row}>
        <Switch defaultChecked size="sm" id="sw-sm" />
        <Label htmlFor="sw-sm">Small</Label>
      </div>
      <div style={row}>
        <Switch defaultChecked id="sw-default" />
        <Label htmlFor="sw-default">Default</Label>
      </div>
    </div>
  </div>
);

export const Disabled = () => (
  <div style={paper}>
    <div style={row}>
      <Switch defaultChecked disabled id="sw-locked" />
      <Label htmlFor="sw-locked">Locked to the signed proposal</Label>
    </div>
  </div>
);
