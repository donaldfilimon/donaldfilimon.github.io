// Identity fields that are byte-identical in this repo's `content/site.ts` and
// the sibling OpenAI Sites repo's `content/site.ts` (`profile`). Only fields
// that already matched were extracted; differing fields stay local to each
// repo. `bun scripts/export-identity.ts` writes the JSON snapshot
// (`content/identity.generated.json`) that the sibling's drift test compares
// against. Neither repo imports the other at build time.
export const sharedIdentity = {
  name: "Donald Filimon",
  fullName: "Donald Joseph Filimon",
  company: "The Donald Company",
  location: "Land O’ Lakes, Florida",
  availability: "Working globally from Florida",
  email: "cbkshadow@icloud.com",
  github: "https://github.com/donaldfilimon",
  linkedIn: "https://linkedin.com/in/donaldfilimon",
} as const;
