import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dir, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");

const POLICY_START = "<!-- machine-git-policy -->";
const POLICY_END = "<!-- /machine-git-policy -->";

function policyBlock(text: string): string {
  const start = text.indexOf(POLICY_START);
  const end = text.indexOf(POLICY_END);
  if (start === -1 || end === -1) throw new Error("machine-git-policy block missing");
  return text.slice(start, end + POLICY_END.length);
}

test("CLAUDE.md is exactly the pointer to canonical AGENTS.md", () => {
  // Rules belong in AGENTS.md; CLAUDE.md carries only the pointer and the
  // machine-git-policy block copied verbatim from AGENTS.md.
  const expected = `# CLAUDE.md\n\nSee [AGENTS.md](AGENTS.md) — canonical.\n\n${policyBlock(read("AGENTS.md"))}\n`;
  expect(read("CLAUDE.md")).toBe(expected);
});

test("AGENTS.md keeps the Next.js agent-rules block at the top", () => {
  // `next dev` re-adds the block to whichever file hosts it; keeping it at the
  // top of AGENTS.md stops it from migrating into CLAUDE.md.
  expect(read("AGENTS.md").startsWith("<!-- BEGIN:nextjs-agent-rules -->")).toBe(true);
});
