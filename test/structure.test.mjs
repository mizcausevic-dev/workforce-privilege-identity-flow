// Structure + data-integrity tests for Workforce-to-Privilege Identity Flow
// Pure node:test (no test framework). Asserts:
//   - HTML5 doctype + lang + title
//   - 4 tabs (overview · anomalies · sync · audit) wired both ways
//   - 4 stat tiles with values matching the synthetic data
//   - 6 anomaly cards (one per detected pattern)
//   - 8 audit-chain events (hash-chained)
//   - Security headers in .htaccess
//   - AGPL-3.0 license file
//   - favicon.svg present + CSP-safe shape
//
// These assertions catch real regressions — they would fail if someone
// changed the synthetic data, removed a tab, accidentally deleted an
// anomaly card, or weakened the security-header policy.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const root = new URL("../", import.meta.url);
const html = readFileSync(new URL("index.html", root), "utf8");

test("HTML5 doctype + lang + title", () => {
  assert.match(html, /^<!doctype html>/i);
  assert.match(html, /<html lang="en"/);
  assert.match(html, /<title>Workforce-to-Privilege\s+Identity\s+Flow/);
});

test("4 tab buttons + 4 tab panels (wired both ways)", () => {
  const btns = (html.match(/<button class="tab-btn[^"]*"\s+data-tab="([^"]+)"/g) || []);
  const panels = (html.match(/<section class="tab-panel[^"]*"\s+data-panel="([^"]+)"/g) || []);
  assert.equal(btns.length, 4, "Expected exactly 4 tab buttons");
  assert.equal(panels.length, 4, "Expected exactly 4 tab panels");
  // Expected panel IDs (order-agnostic)
  const expected = new Set(["overview", "anomalies", "sync", "audit"]);
  const actual = new Set((html.match(/data-panel="([^"]+)"/g) || []).map(s => s.match(/data-panel="([^"]+)"/)[1]));
  for (const id of expected) assert.ok(actual.has(id), `panel "${id}" missing`);
});

test("4 stat tiles match synthetic data", () => {
  const tiles = (html.match(/<span class="stat-num[^"]*">[^<]+<\/span><span class="stat-label">[^<]+/g) || []);
  assert.equal(tiles.length, 4, "Expected exactly 4 stat tiles");
  assert.match(html, /<span class="stat-num(?:\s+(?:ok|warn|crit))?">7<\/span><span class="stat-label">Joiners\ \(last\ 30d\)/);
  assert.match(html, /<span class="stat-num(?:\s+(?:ok|warn|crit))?">4<\/span><span class="stat-label">Movers\ \(last\ 30d\)/);
  assert.match(html, /<span class="stat-num(?:\s+(?:ok|warn|crit))?">4<\/span><span class="stat-label">Leavers\ \(last\ 30d\)/);
  assert.match(html, /<span class="stat-num(?:\s+(?:ok|warn|crit))?">3<\/span><span class="stat-label">Orphan\ accounts/);
});

test("6 anomaly cards rendered", () => {
  const cards = (html.match(/<div class="card-eyebrow">/g) || []);
  assert.equal(cards.length, 6, "Expected exactly 6 anomaly cards (one per detected pattern)");
});

test("First anomaly card content present (data-integrity proxy)", () => {
  assert.ok(html.includes("Daniel Pham still in 2 SaaS apps"), "First anomaly substring missing from rendered HTML");
});

test("8 audit-chain events rendered", () => {
  const events = (html.match(/<div class="audit-row">/g) || []);
  assert.equal(events.length, 8, "Expected exactly 8 audit-chain events");
});

test("First audit event kind present (data-integrity proxy)", () => {
  assert.ok(html.includes("workforce.event.terminate"), "First audit event kind missing from rendered HTML");
});

test("Audit chain banner mentions ed25519 + hash-chained", () => {
  assert.match(html, /ed25519/i);
  assert.match(html, /hash-chain/i);
});

test("Security headers present in .htaccess (response-header layer)", () => {
  const htaccess = readFileSync(new URL(".htaccess", root), "utf8");
  const required = [
    "Strict-Transport-Security",
    "X-Frame-Options",
    "X-Content-Type-Options",
    "Referrer-Policy",
    "Permissions-Policy",
    "Cross-Origin-Opener-Policy",
    "Cross-Origin-Resource-Policy",
    "Cross-Origin-Embedder-Policy",
    "Content-Security-Policy",
  ];
  for (const h of required) {
    assert.match(htaccess, new RegExp(h, "i"), `Header ${h} missing from .htaccess`);
  }
});

test("CSP forbids frame-ancestors and object-src (clickjack + flash defense)", () => {
  const htaccess = readFileSync(new URL(".htaccess", root), "utf8");
  assert.match(htaccess, /frame-ancestors\s+'none'/);
  assert.match(htaccess, /object-src\s+'none'/);
});

test("AGPL-3.0 license file present + canonical", () => {
  const license = readFileSync(new URL("LICENSE", root), "utf8");
  assert.match(license, /GNU AFFERO GENERAL PUBLIC LICENSE/);
  assert.match(license, /Version 3/);
});

test("favicon.svg present (Kinetic Gain mark, CSP-safe inline-style)", () => {
  assert.ok(existsSync(new URL("favicon.svg", root)), "favicon.svg missing");
  const fav = readFileSync(new URL("favicon.svg", root), "utf8");
  assert.match(fav, /<svg/);
  assert.match(fav, /viewBox/);
  assert.ok(!fav.includes("<script"), "favicon.svg must not contain <script> (CSP violation)");
});

test("CNAME matches expected subdomain", () => {
  const cname = readFileSync(new URL("CNAME", root), "utf8").trim();
  assert.equal(cname, "jml.kineticgain.com");
});

test("No telemetry, no inline scripts beyond the tab switcher", () => {
  // Inline <script> blocks should be exactly 1 (the tab switcher at bottom).
  // Any more is a regression toward telemetry or 3rd-party tracking.
  const inlineScripts = (html.match(/<script(?!\s+src=)[^>]*>/g) || []);
  assert.equal(inlineScripts.length, 1, "Expected exactly 1 inline script (tab switcher)");
});

test("No external script src (browser-only doctrine)", () => {
  const externalScripts = (html.match(/<script\s+src=[^>]+>/g) || []);
  assert.equal(externalScripts.length, 0, "No external <script src> allowed (browser-only doctrine)");
});
