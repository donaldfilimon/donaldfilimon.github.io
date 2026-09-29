import { Spinner } from "sites-project";

const paper = {
  background: "#fff",
  color: "#14161b",
  fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  padding: 28,
  borderRadius: 12,
};

const row = { display: "flex", alignItems: "center", gap: 10 };

export const Sizes = () => (
  <div style={paper}>
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={row}>
        <Spinner style={{ width: 14, height: 14, color: "#14161b" }} />
        <span style={{ fontSize: 13 }}>Loading case study</span>
      </div>
      <div style={row}>
        <Spinner style={{ width: 20, height: 20, color: "#14161b" }} />
        <span style={{ fontSize: 13 }}>Submitting the contact form</span>
      </div>
      <div style={row}>
        <Spinner style={{ width: 28, height: 28, color: "#14161b" }} />
        <span style={{ fontSize: 13 }}>Fetching repository evidence</span>
      </div>
    </div>
  </div>
);

export const InlineWithButton = () => (
  <div style={paper}>
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        borderRadius: 8,
        background: "#14161b",
        color: "#fff",
        fontSize: 13,
        fontWeight: 500,
      }}
    >
      <Spinner style={{ width: 14, height: 14, color: "#fff" }} />
      Sending message&hellip;
    </div>
  </div>
);
