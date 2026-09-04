# Milestone: POC Domain Package Distribution

**ID:** `poc-domain-package-distribution`

**Status:** `PLANNING`

**Template:** `$DOMAINS/roadmaps/templates/milestone.tart`

**Skill:** `write-milestone`

**Purpose:** Exercise distributing a domain via an npm package with a post-install script.

**Description:** Publish a domain as an npm package whose installation runs a post-install script to install the domain resources into the consuming workspace.

## Mandatory Reading

::READ `$DOMAINS/roadmaps/structures/milestone.art` (Structure) — Defines the milestone structure and nested types.

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Defines the plan structure and nested types.

## Path Variables

| Variable     | Resolved Path                | Purpose                                        |
| ------------ | ---------------------------- | ---------------------------------------------- |
| `$WORKSPACE` | Current working directory    | Repository where this milestone and plans live |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources directory                     |

## Summary

Distribute a domain as an npm package with a post-install script to validate the distribution model before replicating or extending domains.

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

| Index | Name       | Status     |
| ----- | ---------- | ---------- |
| #1    | Distribute | `PLANNING` |

### Phase: 1 — Distribute

**Goal:** Make domains distributable via npm + post-install.

**Description:** Publish a domain as an npm package whose installation runs a post-install script to install the domain resources into the consuming workspace.

**Status:** `PLANNING`

**Dependencies:**

- None.

---

## Items:

This section lists the downstream work items produced, coordinated, or advanced by the milestone.

| Resource / Record                                                                                               | Status  |
| --------------------------------------------------------------------------------------------------------------- | ------- |
| Plan: POC Domain Package Distribution `$WORKSPACE/_backlog/6-plan/plan-poc-domain-package-distribution/plan.md` | `DRAFT` |

---

## Work

### Next

No iteration has been delegated yet; refine the draft and validate the distribution model.

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

- Validate the distribution model before replicating or extending domains.

### Feedback

- None.
