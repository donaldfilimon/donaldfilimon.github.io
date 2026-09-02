import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const FORBIDDEN = [
  "location.replace",
  "star-space-portfolio",
  "Star Space",
  "STAR SPACE",
] as const;

export function assertPublishedDocs(root = "."): string {
  const htmlPath = join(root, "docs/index.html");
  const cnamePath = join(root, "docs/CNAME");

  if (!existsSync(htmlPath) || !existsSync(cnamePath)) {
    throw new Error("docs/ is missing index.html or CNAME");
  }

  const html = readFileSync(htmlPath, "utf8");
  const cname = readFileSync(cnamePath, "utf8").trim();

  for (const token of FORBIDDEN) {
    if (html.includes(token)) {
      throw new Error(`docs/index.html contains forbidden token: ${token}`);
    }
  }

  if (!html.includes("Donald Filimon")) {
    throw new Error("docs/index.html is missing Donald Filimon");
  }
  if (!html.includes('id="work"')) {
    throw new Error("docs/index.html is missing id=work");
  }
  if (!html.includes('id="contact"')) {
    throw new Error("docs/index.html is missing id=contact");
  }
  if (cname !== "donaldfilimon.com") {
    throw new Error(`docs/CNAME is ${cname}`);
  }

  return html;
}

if (import.meta.main) {
  assertPublishedDocs();
  console.log("docs check ok");
}
