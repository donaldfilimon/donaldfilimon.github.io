import { Marker, MarkerIcon, MarkerContent } from "sites-project";

const paper = {
  background: "#fff",
  color: "#14161b",
  fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  padding: 28,
  borderRadius: 12,
  maxWidth: 420,
};

export const WithIcon = () => (
  <div style={paper}>
    <Marker>
      <MarkerIcon aria-hidden="true">●</MarkerIcon>
      <MarkerContent>Available for new engagements from Florida</MarkerContent>
    </Marker>
  </div>
);

export const Separator = () => (
  <div style={paper}>
    <Marker variant="separator">
      <MarkerContent>Selected work</MarkerContent>
    </Marker>
  </div>
);

export const Border = () => (
  <div style={paper}>
    <Marker variant="border">
      <MarkerIcon aria-hidden="true">03</MarkerIcon>
      <MarkerContent>Evidence-Led Hardening</MarkerContent>
    </Marker>
  </div>
);

export const LinkContent = () => (
  <div style={paper}>
    <Marker>
      <MarkerIcon aria-hidden="true">↗</MarkerIcon>
      <MarkerContent>
        Read the <a href="#">ABI repository gate</a> that backs this claim
      </MarkerContent>
    </Marker>
  </div>
);
