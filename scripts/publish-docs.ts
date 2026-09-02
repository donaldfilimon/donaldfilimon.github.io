import { cp, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

if (!existsSync("out")) {
  throw new Error("next export did not produce out/");
}

await rm("docs", { recursive: true, force: true });
await cp("out", "docs", { recursive: true });
await writeFile("docs/CNAME", "donaldfilimon.com\n");
await writeFile("docs/.nojekyll", "");

console.log("published out/ -> docs/");
