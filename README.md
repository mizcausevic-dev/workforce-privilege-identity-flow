# Workforce-to-Privilege Identity Flow

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](./LICENSE)
[![CI](https://github.com/mizcausevic-dev/workforce-privilege-identity-flow/actions/workflows/ci.yml/badge.svg)](https://github.com/mizcausevic-dev/workforce-privilege-identity-flow/actions/workflows/ci.yml)
[![Status: static demo](https://img.shields.io/badge/Status-static%20demo-blue.svg)](#status)
[![Static · No backend · No telemetry](https://img.shields.io/badge/Static-No%20backend%20%C2%B7%20No%20telemetry-green.svg)](#static-only)

Static, synthetic walkthrough of HRIS-to-IdP joiner / mover / leaver cases, SCIM lag, orphan-account review, and entitlement recertification.

Single-page operator surface served as static HTML — no backend, no login, no telemetry. Synthetic data only. Part of the Kinetic Gain operator-surface lane.

## Live

[https://jml.kineticgain.com/](https://jml.kineticgain.com/)

## What this is

This is **Workforce IAM / JML governance** — a buyer-facing illustration of a possible operator workflow. It does not connect to a real HRIS, IdP, SCIM connector, or audit service.

## Buyer

HR Ops · IT Identity teams · Compliance (SOX / Sarbanes / ISO) running access-review cycles

## Regulatory anchors

SOX ITGC · ISO 27001 A.9.2 · NIST 800-53 AC-2/PS-4/PS-5 · GDPR Art 32 · CCPA · SCIM 2.0 (RFC 7644)

## Canonical example

The page is pre-loaded with synthetic data modeled on **MomentumHR Inc. (8,400-employee enterprise SaaS, multi-IdP estate)** — a realistic operator scenario so the workflow looks like production from first paint. Browser-only; nothing leaves the tab.

## Status

Deployed **static demo**. The page is available at the live URL, but its connector health, identity records, signatures, and audit events are examples. Run the repository checks before merging any change; a deployment requires separate live verification.

## Static only

- No backend. No database. No login. No telemetry.
- Synthetic data is embedded in the HTML; the only script switches tabs.
- The visible audit hashes are illustrative suffixes, not verifiable signatures.
- A push to `main` triggers the Hostinger FTPS deployment workflow.

## Language posture

Per the Kinetic Gain public-language guardrail across HIPAA · FERPA · SOC 2 · GDPR · ISO 27001 · NIST AI RMF · EU AI Act · ISO 42001: this surface frames as **readiness / evidence / posture / controls / scaffolding** — never "compliant" or "certified" unless an external audit is currently attested and in scope.

## License

AGPL-3.0. The related KG Suite specifications are MIT; this static page does not execute them. See [kinetic-gain-protocol-suite](https://github.com/mizcausevic-dev/kinetic-gain-protocol-suite).

## See also

- [Kinetic Gain Protocol Suite hub](https://suite.kineticgain.com/) — twelve open specifications
- [mcp-kinetic-gain](https://github.com/mizcausevic-dev/mcp-kinetic-gain) — published v0.10.0 MCP server with 75 tools across the Suite; separate from this demo
- [Apex /constellation/](https://kineticgain.com/constellation/) — full grouped index of all kineticgain.com surfaces
- [Kinetic Gain public repositories](https://github.com/mizcausevic-dev/mizcausevic-dev/blob/main/docs/REPOSITORIES.md) — dated account-wide index

## Author

Miz Causevic · Boston · [github.com/mizcausevic-dev](https://github.com/mizcausevic-dev) · [linkedin.com/in/mirzacausevic](https://www.linkedin.com/in/mirzacausevic/)
