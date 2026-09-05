# Milestone: Extend Domains

**ID:** `extend-domains`

**Status:** `PLANNING`

**Template:** `$DOMAINS/roadmaps/templates/milestone.tart`

**Skill:** `write-milestone`

**Purpose:** Develop new domains.

**Description:** Develop new domains, building on the distribution and installation capabilities, and including spec-driven planning.

## Mandatory Reading

::READ `$DOMAINS/roadmaps/structures/milestone.art` (Structure) — Defines the milestone structure and nested types.

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Defines the plan structure and nested types.

## Path Variables

| Variable     | Resolved Path                | Purpose                                        |
| ------------ | ---------------------------- | ---------------------------------------------- |
| `$WORKSPACE` | Current working directory    | Repository where this milestone and plans live |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources directory                     |

## Summary

Develop new domains, building on the distribution and installation capabilities, and including spec-driven planning.

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
| Domain: Specs `$DOMAINS/specs/index.md`       | Spec production, provenance, and spec-driven planning resources.                   |

### Workflows

| Workflow / Path                                                     | Description                                                                        |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Workflow: Roadmapping `$DOMAINS/roadmaps/workflows/roadmapping.art` | Roadmapping lifecycle for briefing, problem, solution, and plan stages.            |
| Workflow: Planning `$DOMAINS/plans/workflows/planning.art`          | Planning lifecycle for contextualising, drafting, refining, and integrating plans. |

## Phases

| Index | Name   | Status     |
| ----- | ------ | ---------- |
| #1    | Extend | `PLANNING` |

### Phase: 1 — Extend

**Goal:** Develop new domains, including spec-driven planning.

**Description:** Develop new domains, building on the distribution and installation capabilities, and including spec-driven planning.

**Status:** `PLANNING`

**Dependencies:**

- Milestone: Distributable Domains — establishes the installable domain model that extending domains will build on.
- Plan: Specs MVP `$WORKSPACE/_roadmap/6-plan/plan-specs-mvp/plan.md` — supports spec-driven development of new domains.

---

## Items:

This section lists the downstream work items produced, coordinated, or advanced by the milestone.

| Resource / Record                                                   | Status  |
| ------------------------------------------------------------------- | ------- |
| Plan: Specs MVP `$WORKSPACE/_backlog/6-plan/plan-specs-mvp/plan.md` | `DRAFT` |

---

## Work

### Next

No iteration has been delegated yet; refine the draft and validate the extend workflow against the distributable domains model.

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

- Integrate the Specs MVP plan to support spec-driven development of new domains.

### Feedback

- None.
