import { Kbd, KbdGroup } from "sites-project";

const paper = {
  background: "#fff",
  color: "#14161b",
  fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  padding: 28,
  borderRadius: 12,
};

export const SingleKeys = () => (
  <div style={paper}>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Kbd>⌘</Kbd>
        <span style={{ fontSize: 13, color: "#6b7280" }}>
          Open the command palette from anywhere on the site
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Kbd>Esc</Kbd>
        <span style={{ fontSize: 13, color: "#6b7280" }}>Close the palette</span>
      </div>
    </div>
  </div>
);

export const ShortcutGroups = () => (
  <div style={paper}>
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <span style={{ fontSize: 13 }}>Jump to Work</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <span style={{ fontSize: 13 }}>Filter by stack</span>
        <KbdGroup>
          <Kbd>⇧</Kbd>
          <Kbd>F</Kbd>
        </KbdGroup>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <span style={{ fontSize: 13 }}>Contact</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>⏎</Kbd>
        </KbdGroup>
      </div>
    </div>
  </div>
);
