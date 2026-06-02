#!/usr/bin/env node
// CLI verify — re-runs structural + data-integrity checks for ops use.
// Equivalent to `npm test` but with friendlier human-readable output.

import { readFileSync, existsSync } from "node:fs";

const root = new URL("../", import.meta.url);
const html = readFileSync(new URL("index.html", root), "utf8");

const checks = [
  ["HTML5 doctype", /^<!doctype html>/i.test(html)],
  ["Title matches", html.includes("Workforce-to-Privilege Identity Flow")],
  ["4 tab buttons", ((html.match(/<button class="tab-btn[^"]*"/g) || []).length) === 4],
  ["4 tab panels", ((html.match(/data-panel="[^"]+"/g) || []).length) === 4],
  ["4 stat tiles", ((html.match(/<span class="stat-num/g) || []).length) === 4],
  ["6 anomaly cards", ((html.match(/<div class="card-eyebrow">/g) || []).length) === 6],
  ["8 audit events", ((html.match(/<div class="audit-row">/g) || []).length) === 8],
  ["ed25519 + hash-chained mentioned", /ed25519/i.test(html) && /hash-chain/i.test(html)],
  ["favicon.svg present", existsSync(new URL("favicon.svg", root))],
  ["CNAME = jml.kineticgain.com", readFileSync(new URL("CNAME", root), "utf8").trim() === "jml.kineticgain.com"],
  ["LICENSE = AGPL-3.0", /GNU AFFERO GENERAL PUBLIC LICENSE/.test(readFileSync(new URL("LICENSE", root), "utf8"))],
];

let pass = 0, fail = 0;
for (const [name, ok] of checks) {
  console.log(`  ${ok ? "✓" : "✗"} ${name}`);
  ok ? pass++ : fail++;
}
console.log(`\n  ${pass}/${checks.length} passed${fail > 0 ? ", " + fail + " failed" : ""}`);
process.exit(fail > 0 ? 1 : 0);
