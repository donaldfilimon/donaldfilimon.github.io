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
  const notFoundPath = join(root, "docs/404.html");
  const cnamePath = join(root, "docs/CNAME");

  if (!existsSync(htmlPath) || !existsSync(notFoundPath) || !existsSync(cnamePath)) {
    throw new Error("docs/ is missing index.html, 404.html, or CNAME");
  }

  const html = readFileSync(htmlPath, "utf8");
  const cname = readFileSync(cnamePath, "utf8").trim();
  const notFound = readFileSync(notFoundPath, "utf8");

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
  if (!html.includes('id="services"')) {
    throw new Error("docs/index.html is missing id=services");
  }
  if (!html.includes("Land O’ Lakes, Florida") || html.includes("Ocala")) {
    throw new Error("docs/index.html has stale location copy");
  }
  for (const href of ["/#work", "/#services", "/#practice", "/#contact"]) {
    if (!notFound.includes(`href="${href}"`)) {
      throw new Error(`docs/404.html is missing root-qualified navigation: ${href}`);
    }
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
