import {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentGroup,
} from "sites-project";

const paper = {
  background: "#fff",
  color: "#14161b",
  fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  padding: 28,
  borderRadius: 12,
};

export const Done = () => (
  <div style={paper}>
    <Attachment state="done">
      <AttachmentMedia>
        <span aria-hidden="true">📄</span>
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>abi-repository-gate.log</AttachmentTitle>
        <AttachmentDescription>212 KB &middot; attached to Evidence</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove attachment">&times;</AttachmentAction>
      </AttachmentActions>
    </Attachment>
  </div>
);

export const UploadingAndError = () => (
  <div style={paper}>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Attachment state="uploading">
        <AttachmentMedia>
          <span aria-hidden="true">⬆</span>
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>hydrocycle-model-output.csv</AttachmentTitle>
          <AttachmentDescription>Uploading&hellip;</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="error">
        <AttachmentMedia>
          <span aria-hidden="true">!</span>
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>mixed-aurora6-spec.pdf</AttachmentTitle>
          <AttachmentDescription>Upload failed &middot; file too large</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Retry upload">&#8635;</AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  </div>
);

export const VerticalGroup = () => (
  <div style={paper}>
    <AttachmentGroup>
      <Attachment orientation="vertical" size="sm" state="done">
        <AttachmentMedia>
          <span aria-hidden="true">🧩</span>
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>wdbx-schema.png</AttachmentTitle>
          <AttachmentDescription>Diagram</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment orientation="vertical" size="sm" state="done">
        <AttachmentMedia>
          <span aria-hidden="true">🗒</span>
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>gama-tui-notes.md</AttachmentTitle>
          <AttachmentDescription>Notes</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </AttachmentGroup>
  </div>
);
