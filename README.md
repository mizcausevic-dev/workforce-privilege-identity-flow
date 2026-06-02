# Workforce-to-Privilege Identity Flow

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](./LICENSE)
[![Status: v0.1-shipped](https://img.shields.io/badge/Status-v0.1--shipped-yellow.svg)](#status)
[![Static · No backend · No telemetry](https://img.shields.io/badge/Static-No%20backend%20%C2%B7%20No%20telemetry-green.svg)](#static-only)

Operator surface for HRIS-to-IdP joiner / mover / leaver pipelines, SCIM sync health, orphan-account detection, and entitlement-grant recertification.

Single-page operator surface served as static HTML — no backend, no login, no telemetry. Synthetic data only. Part of the Kinetic Gain operator-surface lane.

## Live

[https://jml.kineticgain.com/](https://jml.kineticgain.com/)

## What this is

This is **Workforce IAM / JML governance** — a buyer-facing operator dashboard that demonstrates the shape of a runtime governance system for workforce-to-privilege identity flow without exposing any live tenant data. Synthetic data lets prospects and reviewers explore the workflow end-to-end before they ever connect a real source.

## Buyer

HR Ops · IT Identity teams · Compliance (SOX / Sarbanes / ISO) running access-review cycles

## Regulatory anchors

SOX ITGC · ISO 27001 A.9.2 · NIST 800-53 AC-2/PS-4/PS-5 · GDPR Art 32 · CCPA · SCIM 2.0 (RFC 7644)

## Canonical example

The page is pre-loaded with synthetic data modeled on **MomentumHR Inc. (8,400-employee enterprise SaaS, multi-IdP estate)** — a realistic operator scenario so the workflow looks like production from first paint. Browser-only; nothing leaves the tab.

## Status

`v0.1-shipped` — MVP scaffold. Hardening to `v1.0-prod` is a separate squad-discipline pass (CI green, screenshot suite, fixtures dir, scripts/, .release-notes.md).

## Static only

- No backend. No database. No login. No telemetry.
- Synthetic data is baked into the HTML as JavaScript constants.
- All filtering, sorting, audit-chain rendering happens client-side.
- Hostinger native git pull deploy via FTP-Deploy-Action.

## Language posture

Per the Kinetic Gain public-language guardrail across HIPAA · FERPA · SOC 2 · GDPR · ISO 27001 · NIST AI RMF · EU AI Act · ISO 42001: this surface frames as **readiness / evidence / posture / controls / scaffolding** — never "compliant" or "certified" unless an external audit is currently attested and in scope.

## License

AGPL-3.0. The KG Suite specs that compose with this surface (Decision Card v0.3 vault contract, AI Incident Card, AI Evidence Format, audit-stream) are MIT — see [github.com/mizcausevic-dev/kinetic-gain-protocol-suite](https://github.com/mizcausevic-dev/kinetic-gain-protocol-suite).

## See also

- [Kinetic Gain Protocol Suite hub](https://suite.kineticgain.com/) — the 11 specs + 11 vertical 6-packs
- [Apex /constellation/](https://kineticgain.com/constellation/) — full grouped index of all kineticgain.com surfaces
- [Portfolio dashboard](https://portfolio.kineticgain.com/) — programmatic catalog of 555+ public repos

## Author

Miz Causevic · Boston · [github.com/mizcausevic-dev](https://github.com/mizcausevic-dev) · [linkedin.com/in/mirzacausevic](https://www.linkedin.com/in/mirzacausevic/)
