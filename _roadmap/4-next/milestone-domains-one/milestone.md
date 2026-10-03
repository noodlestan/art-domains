# Milestone: Domains One

**ID:** `domains-one`

**Status:** `PLANNING`

**Template:** `$DOMAINS/roadmaps/templates/milestone.tart`

**Skill:** `write-milestone`

**Purpose:** Continue evolving the domain prototype in the `$WORKSPACE` repository, where all commits live for now.

**Description:** Ongoing feedback turns into reactive feedback plans within this milestone, driving domain distribution and extension work.

## Mandatory Reading

::READ `$DOMAINS/roadmaps/structures/milestone.art` (Structure) — Defines the milestone structure and nested types.

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Defines the plan structure and nested types.

## Path Variables

This section lists the path variables used throughout the milestone file and its downstream work items. All file references in the milestone and downstream work items MUST use these variables — never bare filesystem paths.

| Variable     | Resolved Path                | Purpose                                               |
| ------------ | ---------------------------- | ----------------------------------------------------- |
| `$WORKSPACE` | Current working directory    | Repository where the domain resources directory lives |
| `$PROJECT`   | Provided with prompt         | Where this milestone and plans live                   |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources directory                            |

## Summary

Continue evolving the domain prototype. All work and commits remain in the `$WORKSPACE` repository for now. Milestones plans are created reactively from ongoing feedback and coordinated through this milestone.

## Context

### Upstream Work

| Kind                  | Path                                | Role                                                            |
| --------------------- | ----------------------------------- | --------------------------------------------------------------- |
| Parking Lot           | `$PROJECT/_roadmap/_parking-lot.md` | Tracks short-term actionables, pending questions, and blockers. |
| Architecture Briefing | `$PROJECT/_roadmap/_architect.md`   | Principles, Constraints, NFRs. Planned, not yet created.        |

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

This section describes the ordered phases used to organise downstream work, identifying blocking dependencies across resources of different owners.

| Index | Name       | Status     |
| ----- | ---------- | ---------- |
| #1    | Distribute | `PLANNING` |
| #2    | Extend     | `PLANNING` |

### Phase: 1 — Distribute

**Goal:** Make domains distributable and installable.

**Description:** Exercise distributing a domain via npm with a post-install script, then make domains installable through the CLI with local configuration.

**Status:** `PLANNING`

**Dependencies:**

- None.

### Phase: 2 — Extend

**Goal:** Develop new domains.

**Description:** Develop new domains, building on the distribution and installation capabilities, and including spec-driven planning.

**Status:** `PLANNING`

**Dependencies:**

- Plan: POC Domain Package Distribution — establishes the distribution model that replicating and extending domains will build on.

---

## Items:

This section lists the downstream work items produced, coordinated, or advanced by the milestone.

| Phase | Resource / Record                                                                                                         | Status  |
| ----- | ------------------------------------------------------------------------------------------------------------------------- | ------- |
| 1     | Milestone: POC Domain Package Distribution `$PROJECT/_roadmap/6-plan/milestone-poc-domain-package-distribution.md`        | `DRAFT` |
| -     |                                                                                                                           |         |
| 1     | Milestone: Distributable Domains `$PROJECT/_roadmap/6-plan/milestone-distributable-domains.md`                            | `DRAFT` |
| -     |                                                                                                                           |         |
| 2     | Plan: Add Guides Domain `$PROJECT/_backlog/3-now/plan-add-guides-domain/plan.md`                                          | `READY` |
| -     |                                                                                                                           |         |
| 2     | Plan: Add Backlogs Domain `$PROJECT/_backlog/3-now/plan-add-backlogs-domain/plan.md`                                      | `READY` |
| -     |                                                                                                                           |         |
| 2     | Plan: Add Domain Record in Commits and Projects `$PROJECT/_backlog/3-now/plan-add-domain-record-commits-projects/plan.md` | `READY` |
| -     |                                                                                                                           |         |
| 2     | Plan: Add Boundaries to Active Domains `$PROJECT/_backlog/3-now/plan-add-boundaries-active-domains/plan.md`               | `READY` |
| -     |                                                                                                                           |         |
| 2     | Plan: Specs MVP `$PROJECT/_backlog/6-plan/plan-specs-mvp.md`                                                              | `DRAFT` |

---

## Work

### Next

No iteration has been delegated yet; dry-run the POC distribution plan first to validate the distribution model.

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
- Roadmap and backlogs are currently in the `$PROJECT` repository.

### Knowledge to Update

- None.

### Follow Ups

- None.

### Feedback

- None.
