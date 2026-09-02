import { readFileSync, existsSync } from "node:fs";

const htmlPath = "docs/index.html";
const cnamePath = "docs/CNAME";

if (!existsSync(htmlPath) || !existsSync(cnamePath)) {
  throw new Error("docs/ is missing index.html or CNAME");
}

const html = readFileSync(htmlPath, "utf8");
const cname = readFileSync(cnamePath, "utf8").trim();

const forbidden = ["location.replace", "star-space-portfolio", "Star Space", "STAR SPACE"];
for (const token of forbidden) {
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
if (cname !== "donaldfilimon.com") {
  throw new Error(`docs/CNAME is ${cname}`);
}

console.log("docs check ok");
