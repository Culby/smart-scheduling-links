# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SMART Scheduling Links is a FHIR-based specification for healthcare appointment slot discovery and booking. It defines how Slot Publishers broadcast availability as static NDJSON files that clients can poll. The project contains three main parts: the specification itself, a FHIR Implementation Guide (IG), and a TypeScript example data generator.

## Repository Structure

- **`specification.md`** — The full API specification for Slot Publishers
- **`fhir-ig/`** — FHIR Implementation Guide with FSH (FHIR Shorthand) profile/extension definitions
- **`generate-examples/`** — TypeScript CLI tool that generates FHIR-conformant NDJSON example data
- **`examples/`** — Generated output (NDJSON files + `$bulk-publish` manifest)

## Build & Development Commands

### Generate Examples (TypeScript)

```bash
cd generate-examples
npm install
npm run generate-examples          # Regenerates all NDJSON files in ../examples/
npm run generate-conversion-example # Converts legacy availability format to FHIR
```

The generator runs via `ts-node` — no separate compile step needed. CLI flags: `--outdir`, `--start-days`, `--duration-days`.

### FHIR Implementation Guide

```bash
cd fhir-ig
./_build.sh      # Build the IG (requires SUSHI + Java IG Publisher)
```

The IG deploys to GitHub Pages via `.github/workflows/deploy.yml` on pushes to `master` in `fhir-ig/**`.

### Linting

ESLint and Prettier are configured in `generate-examples/` but no lint script is defined in package.json. Run manually:
```bash
cd generate-examples
npx eslint src/
npx prettier --check src/
```

## Architecture

### FHIR Resource Model

The data model follows FHIR R4 with these resources: **Location** → **Schedule** → **Slot** (with booking extensions), plus **PractitionerRole** and **Device** linking practitioners/equipment to schedules.

### Example Generation (`generate-examples/src/index.ts`)

- Static data (locations, practitioners, devices) lives in `src/static-data.json`
- Two scheduling patterns: **coarse-grained** (all-day blocks for urgent care) and **fine-grained** (15/30-min slots for primary care + device-specific durations for imaging)
- Output is split into weekly slot files using ISO week format (`slots-YYYY-Www.ndjson`)
- The `$bulk-publish` manifest file is the entry point that references all generated resources

### FHIR Profiles (`fhir-ig/input/fsh/`)

- **SMARTLocation**, **SmartSchedule**, **SmartSlot** — constrained FHIR profiles
- **BookingDeepLink**, **BookingPhone** — extensions on Slot for booking actions
- Defined in FSH (FHIR Shorthand), compiled by SUSHI

## Key Conventions

- Resource IDs are generated sequentially; booking IDs start at 1000000
- FHIR version is R4 (4.0.1); canonical URL is `https://smart-scheduling-links.org`
- The `examples/` directory is fully regenerated on each run (existing `.ndjson` files are deleted first)
