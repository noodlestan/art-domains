# Milestone: Workspace CLI One

**ID:** `workspace-cli-one`

**Status:** `WORKING`

**Template:** `$DOMAINS/roadmaps/templates/milestone.tart`

**Skill:** `write-milestone`

**Purpose:** Complete the workspace CLI with remaining commands and infrastructure.

**Description:** This milestone delivers the full workspace CLI command surface and infrastructure across 3 phases: establish the CLI baseline, implement the remaining commands, and consolidate the CLI into its own repo and shared libraries.

## Mandatory Reading

::READ `$DOMAINS/roadmaps/structures/milestone.art` (Structure) — Defines the milestone structure and nested types.

---

## Path Variables

| Variable     | Resolved Path             | Purpose                               |
| ------------ | ------------------------- | ------------------------------------- |
| `$WORKSPACE` | Current working directory | Workspace root directory              |
| `$PROJECT`   | Provided with prompt      | Where work execution is taking place. |

## Summary

Complete the workspace CLI across 3 phases: establish the CLI baseline, implement the remaining commands, and consolidate the CLI into its own repo and shared libraries.

## Context

### Upstream Work

| Kind        | Path                                | Role                                                            |
| ----------- | ----------------------------------- | --------------------------------------------------------------- |
| Parking Lot | `$PROJECT/_backlog/_parking-lot.md` | Tracks short-term actionables, pending questions, and blockers. |
| Source      | `$PROJECT/_roadmap/_architect.md`   | Architect Briefing: Workspace CLI (Milestone 1)                 |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `write-milestone` — Writes milestones from roadmaps and backlogs. Required for Planning Work Item.

### Domains

| Domain / Path                                 | Description                                                                        |
| --------------------------------------------- | ---------------------------------------------------------------------------------- |
| Domain: Plans `$DOMAINS/plans/index.md`       | Planning lifecycle for contextualising, drafting, planning, and integrating plans. |
| Domain: Roadmaps `$DOMAINS/roadmaps/index.md` | Roadmaps and milestones coordination.                                              |

### Knowledge

::READ `_roadmap/_architect.md` (Briefing) — Workspace principles, NFRs, milestones. Relevant for Planning Work Item.

---

## Phases

| Index | Name                    | Status    |
| ----- | ----------------------- | --------- |
| 1     | Establish CLI baseline  | `DONE`    |
| 2     | Implement more commands | `WORKING` |
| 3     | Consolidate             | `DRAFT`   |

### Phase: 1 — Establish CLI baseline

**Goal:** Deliver the core workspace CLI command surface and infrastructure.

**Description:** Workspace split; sanity, clone, branch, and repo commands; sanity report; pull/push/sync; dynamic record discovery; fixes and test coverage.

**Status:** `DONE`

**Dependencies:**

- None.

### Phase: 2 — Implement more commands

**Goal:** Deliver the remaining command surface.

**Description:** Link, links, publish, and unlink commands; update knowledge resources.

**Status:** `WORKING`

**Dependencies:**

- None.

### Phase: 3 — Consolidate

**Goal:** Consolidate the CLI into its own repo and shared libraries, and plan the art-cli ecosystem.

**Description:** Move code and project to a new repo; extract record units to a shared records lib; generate the art-cli roadmap.

**Status:** `DRAFT`

**Dependencies:**

- None.

---

## Items:

| Phase | Resource / Record                                                                                                            | Status     |
| ----- | ---------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 1     | Plan: Workspace Split `_backlog/0-archive/2026-08-10-plan-workspace-split/plan.md`                                           | `ARCHIVED` |
| 1     | Plan: Workspace CLI — Sanity, Clone, Branch `_backlog/0-archive/2026-08-12-plan-workspace-sanity-clone-branch/plan.md`       | `ARCHIVED` |
| 1     | Plan: Refactor Conventions `_backlog/0-archive/2026-08-13-plan-refactor-conventions/plan.md`                                 | `ARCHIVED` |
| 1     | Plan: Workspace CLI — Repo Command `_backlog/0-archive/2026-08-14-plan-implement-command-repo/plan.md`                       | `ARCHIVED` |
| 1     | Plan: Workspace CLI — Sanity Workspace Report `_backlog/0-archive/2026-08-14-plan-implement-sanity-workspace-report/plan.md` | `ARCHIVED` |
| 1     | Plan: Fix Repo Command Issues `_backlog/0-archive/2026-08-18-plan-fix-repo-command-issues/plan.md`                           | `ARCHIVED` |
| 1     | Plan: Workspace CLI — Pull, Push, Sync Commands `_backlog/0-archive/2026-08-18-plan-implement-pull-push-sync/plan.md`        | `ARCHIVED` |
| 1     | Plan: Workspace CLI — Cleaner Code `_backlog/0-archive/2026-08-18-plan-cleaner-code/plan.md`                                 | `ARCHIVED` |
| 1     | Plan: Discover Records Dynamically `_backlog/1-done/plan-discover-records/plan.md`                                           | `DONE`     |
| 1     | Plan: Workspace CLI — Fix Reported Bugs `_backlog/0-archive/2026-08-19-plan-fix-reported-bugs/plan.md`                       | `ARCHIVED` |
| 1     | Plan: Workspace CLI — Fixes and Test Coverage `_backlog/1-done/plan-repo-command-fixes-and-tests/plan.md`                    | `DONE`     |
| 1     | Plan: Fix Pull Push Bugs `_backlog/1-done/plan-fix-pull-push-bugs/plan.md`                                                   | `DONE`     |
| -     |                                                                                                                              |            |
| 2     | Plan: Log Process as it Happens `_backlog/1-done/plan-log-process-as-it-happens/plan.md`                                     | `DONE`     |
| 2     | Plan: Scoped Record Paths `_backlog/1-done/plan-scoped-record-paths/plan.md`                                                 | `DONE`     |
| 2     | Plan: Parallel Scanning `_backlog/3-now/plan-parallel-scanning/plan.md`                                                      | `READY`    |
| 2     | Plan: Scope Commands to Location `_backlog/6-plan/plan-scope-commands-to-location/plan.md`                                   | `PLANNING` |
| 2     | Plan: Workspace CLI — Run Command `_backlog/4-next/plan-implement-run/plan.md`                                               | `PLANNING` |
| 2     | Plan: Extract Workspace CLI to Repository: Art CLI (New)Repo `_backlog/4-next/plan-move-code-project-art-cli/plan.md`        | `PLANNING` |
| -     |                                                                                                                              |            |
| 2     | Plan: Make Behind Check Opt-in `_backlog/6-plan/plan-make-behind-check-opt-in/plan.md`                                       | `DRAFT`    |
| 2     | Plan: Workspace CLI — Link Command `_backlog/6-plan/plan-implement-link/plan.md`                                             | `DRAFT`    |
| 2     | Plan: Workspace CLI — Links Command `_backlog/6-plan/plan-implement-links/plan.md`                                           | `DRAFT`    |
| 2     | Plan: Workspace CLI — Unlink Command `_backlog/6-plan/plan-implement-unlink/plan.md`                                         | `DRAFT`    |
| 2     | Plan: Update Knowledge Resources `_backlog/6-plan/plan-update-knowledge-resources/plan.md`                                   | `DRAFT`    |
| -     |                                                                                                                              |            |
| 3     | Plan: Extract Record Units to Lib-Records                                                                                    | `DRAFT`    |
| 3     | Plan: Generate Art-CLI Roadmap                                                                                               | `DRAFT`    |

The following items are not yet captured in a work item document.

### Plan: Extract Record Units to Lib-Records

**Status:** `DRAFT`

**Purpose:** Extract generic record read/write modules into a shared library.

**Description:** Extract generic record read/write modules and their tests to a lib in `art-js/libs/records` canonical `@art-js/records`, register lib in art-js project record, publish lib, consume in workspace-cli; update knowledge in art-js and art-cli; publish new workspace-cli version; test in `$WORKSPACE`.

**Changes:**

- Extract generic record read/write modules and their tests to `art-js/libs/records` (`@art-js/records`).
- Register lib in art-js project record; publish lib; consume in workspace-cli.
- Update knowledge in art-js and art-cli; publish new workspace-cli version; test in `$WORKSPACE`.

**Dependencies:**

- None.

### Plan: Generate Art-CLI Roadmap

**Status:** `DRAFT`

**Purpose:** Generate the art-cli roadmap notes for the future roadmap.

**Description:** Generate art-cli roadmap notes for the future roadmap: `@art-cli/art` (globally installed tool, commands: init, bind (discovers installed clis, updates snapshot); get (discovers available clis from directory, installs them); catch-all (routes commands to other clis); `@art-cli/parser` (md => json); `@art-cli/modules` (install, list); `@art-cli/linter` (depends on project Art Linter, new repo, new namespace `@art-linter`); `@art-cli/projection` (bundler/compiler).

**Changes:**

- Generate roadmap notes for the future art-cli ecosystem (`@art-cli/art`, `@art-cli/parser`, `@art-cli/modules`, `@art-cli/linter`, `@art-cli/projection`).

**Dependencies:**

- None.

---

## Work

### Next

Phase 2 — delegate `plan-parallel-scanning` (READY).

### Blockers

- None.

---

## Operating Instructions

### Writing Commit Message

**Purpose:** Write standardized message according to context conventions. Operation of Workflow: Planning Work, defined in `$DOMAINS/work/workflows/planning-work/ops/writing-commit-message.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

1. Read commit message conventions from `$WORKSPACE/knowledge/conventions/writing-commit-message.art`.
2. Write the commit message following: the rules defined there.

---

## Coordination

### Not In Scope

- None.

### Evidence

- None.

### Findings

- None.

### Decisions

- None.

### Knowledge to Update

- None.

### Follow Ups

- None.

### Feedback

- None.
