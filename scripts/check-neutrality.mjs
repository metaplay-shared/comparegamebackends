#!/usr/bin/env node
// Neutrality guardrail. Fails CI if banned marketing / AI-tell language appears in
// the ADDED lines of the comparison data. This keeps the public comparison neutral
// and source-driven — automated drafts and human PRs alike must pass it.
// The list is intentionally tight (clear offenders only) and easy to tune.
import { execSync } from 'node:child_process';

const BASE = process.argv[2] || 'origin/main';
const FILES = ['lib/backends.ts', 'lib/architecture.ts', 'lib/ai-capabilities.ts'];

// Single words are matched on word boundaries; phrases/apostrophes are substring-matched.
const BANNED = [
  'delve', 'crucial', 'landscape', 'leverage', 'seamless', 'tapestry', 'realm',
  'revolutionary', 'cutting-edge', 'best-in-class', 'world-class', 'unparalleled',
  'unleash', 'supercharge', 'game-changer', 'game changer', "in today's",
];

let diff = '';
try {
  diff = execSync(`git diff ${BASE}...HEAD -- ${FILES.join(' ')}`, { encoding: 'utf8' });
} catch (e) {
  console.error('Could not compute diff (skipping, not blocking):', e.message);
  process.exit(0);
}

const added = diff
  .split('\n')
  .filter((l) => l.startsWith('+') && !l.startsWith('+++'))
  .map((l) => l.slice(1));

function bannedTermIn(line) {
  const lower = line.toLowerCase();
  for (const term of BANNED) {
    if (term.includes(' ') || term.includes("'")) {
      if (lower.includes(term)) return term;
    } else if (new RegExp(`\\b${term}\\b`, 'i').test(line)) {
      return term;
    }
  }
  return null;
}

const hits = [];
for (const line of added) {
  const term = bannedTermIn(line);
  if (term) hits.push({ term, line: line.trim() });
}

if (hits.length) {
  console.error('\n❌ Neutrality check failed — banned marketing / AI-tell language in added content:\n');
  for (const h of hits) console.error(`  • "${h.term}"  in:  ${h.line}`);
  console.error('\nThe comparison data must stay neutral and source-driven. See CONTRIBUTING.md.');
  process.exit(1);
}

console.log('✓ Neutrality check passed — no banned marketing/AI-tell language in added content.');
