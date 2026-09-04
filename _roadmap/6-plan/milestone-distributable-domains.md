# Milestone: Distributable Domains

**ID:** `distributable-domains`

**Status:** `PLANNING`

**Template:** `$DOMAINS/roadmaps/templates/milestone.tart`

**Skill:** `write-milestone`

**Purpose:** Install domains via the CLI, relying on the npm backend with the post-install delivered with the package, and driven by local configuration.

**Description:** Install domains from the CLI. Still relies on the npm backend and some of the post-install is included in the package itself, but the install mainly uses local configuration in the `.art-manifest.mts` file.

## Mandatory Reading

::READ `$DOMAINS/roadmaps/structures/milestone.art` (Structure) — Defines the milestone structure and nested types.

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Defines the plan structure and nested types.

## Path Variables

| Variable     | Resolved Path                | Purpose                                        |
| ------------ | ---------------------------- | ---------------------------------------------- |
| `$WORKSPACE` | Current working directory    | Repository where this milestone and plans live |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources directory                     |

## Summary

Install domains from the CLI using the npm backend, with post-install included in the package and local configuration in `.art-manifest.mts`.

## Context

### Upstream Work

| Kind                  | Path                                  | Role                                                            |
| --------------------- | ------------------------------------- | --------------------------------------------------------------- |
| Parking Lot           | `$WORKSPACE/_roadmap/_parking-lot.md` | Tracks short-term actionables, pending questions, and blockers. |
| Architecture Briefing | `$WORKSPACE/_roadmap/_architect.md`   | Principles, Constraints, NFRs.                                  |
| Roadmap               | `$WORKSPACE/_roadmap/_roadmap.md`     | Coordinates this milestone with other milestones and plans.     |

### Required Skills

- `write-plan` — Gathers scope, context, paths, setup, and verification.
- `render-template` — Renders milestone and downstream work-item artefacts.

### Domains

| Domain / Path                                 | Description                                                                        |
| --------------------------------------------- | ---------------------------------------------------------------------------------- |
| Domain: Roadmaps `$DOMAINS/roadmaps/index.md` | Roadmapping lifecycle for briefing, problem, solution, and plan stages.            |
| Domain: Plans `$DOMAINS/plans/index.md`       | Planning lifecycle for contextualising, drafting, refining, and integrating plans. |

### Workflows

| Workflow / Path                                                     | Description                                                                        |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Workflow: Roadmapping `$DOMAINS/roadmaps/workflows/roadmapping.art` | Roadmapping lifecycle for briefing, problem, solution, and plan stages.            |
| Workflow: Planning `$DOMAINS/plans/workflows/planning.art`          | Planning lifecycle for contextualising, drafting, refining, and integrating plans. |

## Phases

| Index | Name    | Status     |
| ----- | ------- | ---------- |
| #1    | Install | `PLANNING` |

### Phase: 1 — Install

**Goal:** Install domains via art-cli with local `.art-manifest.mts` configuration.

**Description:** Install domains from the CLI. Still relies on the npm backend and some of the post-install is included in the package itself, but the install mainly uses local configuration in the `.art-manifest.mts` file.

**Status:** `PLANNING`

**Dependencies:**

- Milestone: POC Domain Package Distribution — establishes the distribution model that the install workflow will build on.

---

## Items:

This section lists the downstream work items produced, coordinated, or advanced by the milestone.

| Resource / Record                                                                           | Status  |
| ------------------------------------------------------------------------------------------- | ------- |
| Plan: Distributable Domains `$WORKSPACE/_backlog/6-plan/plan-distributable-domains/plan.md` | `DRAFT` |

---

## Work

### Next

No iteration has been delegated yet; refine the draft and validate the install workflow against the POC distribution model.

### Blockers

- None.

---

## Coordination

### Not In Scope

- None.

### Evidence

- None.

### Findings

- None.

### Decisions

- All work and commits are currently in the `$WORKSPACE` repository.

### Knowledge to Update

- None.

### Follow Ups

- Depends on the distribution model proven by POC Domain Package Distribution.

### Feedback

- None.
