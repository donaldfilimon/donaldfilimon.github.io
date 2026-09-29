// Identity fields that are byte-identical in this site's `content/site.ts` and
// the OpenAI Sites portfolio's `sites/content/site.ts` (`profile`). Only fields
// that already matched were extracted; differing fields stay local to each
// site. `bun scripts/export-identity.ts` writes the JSON snapshot
// (`content/identity.generated.json`) that `sites/content/identity.test.ts`
// compares its own copy against. Neither site imports the other at build time.
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
