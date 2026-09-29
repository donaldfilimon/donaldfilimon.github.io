import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

// AGENTS.md is canonical. CLAUDE.md must stay a pointer so rules cannot drift
// into a second copy; move any new rule into AGENTS.md instead.
describe('agent instruction surfaces', () => {
  it('keeps CLAUDE.md as the exact pointer to AGENTS.md', () => {
    const claude = readFileSync(resolve(process.cwd(), 'CLAUDE.md'), 'utf8');
    expect(claude).toBe(
      '# CLAUDE.md\n\nSee [AGENTS.md](AGENTS.md) — canonical.\n',
    );
  });

  it('keeps AGENTS.md declaring itself canonical', () => {
    const agents = readFileSync(resolve(process.cwd(), 'AGENTS.md'), 'utf8');
    expect(agents).toContain('This is the canonical guide');
  });
});
