# Milestone: Complete Workspace CLI

**ID:** `complete-workspace-cli`

**Status:** `WORKING`

**Template:** `$DOMAINS/roadmaps/templates/milestone.tart`

**Skill:** `write-milestone`

**Purpose:** Complete the workspace CLI with remaining commands and infrastructure.

**Description:** This milestone delivers the full command surface (pull, push, sync, link, links, unlink, publish) and critical infrastructure (repository-command bug fixes, regression test coverage, dynamic record discovery, and knowledge/code quality improvements).

## Mandatory Reading

::READ `$DOMAINS/roadmaps/structures/milestone.art` (Structure) — Defines the milestone structure and nested types.

---

## Path Variables

| Variable     | Resolved Path             | Purpose                               |
| ------------ | ------------------------- | ------------------------------------- |
| `$WORKSPACE` | Current working directory | Workspace root directory              |
| `$PROJECT`   | Provided with prompt      | Where work execution is taking place. |

## Summary

Complete the workspace CLI with remaining commands and infrastructure across 16 phases, delivering the full command surface and critical infrastructure improvements.

## Context

### Upstream Work

| Kind        | Path                                | Role                                                            |
| ----------- | ----------------------------------- | --------------------------------------------------------------- |
| Parking Lot | `$PROJECT/_backlog/_parking-lot.md` | Tracks short-term actionables, pending questions, and blockers. |
| Source      | `_backlog/_architect.md`            | Architect Briefing: Workspace CLI (Milestone 1)                 |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `write-milestone` — Writes milestones from roadmaps and backlogs. Required for Planning Work Item.

### Domains

| Domain / Path                                 | Description                                                                        |
| --------------------------------------------- | ---------------------------------------------------------------------------------- |
| Domain: Plans `$DOMAINS/plans/index.md`       | Planning lifecycle for contextualising, drafting, planning, and integrating plans. |
| Domain: Roadmaps `$DOMAINS/roadmaps/index.md` | Roadmaps and milestones coordination.                                              |

### Knowledge

::READ `_backlog/_architect.md` (Briefing) — Workspace principles, NFRs, milestones. Relevant for Planning Work Item.

---

## Phases

| Index | Name                          | Status      |
| ----- | ----------------------------- | ----------- |
| 0     | Workspace split               | `ARCHIVED`  |
| 1     | Workspace sanity clone branch | `ARCHIVED`  |
| 2     | Refactor conventions          | `ARCHIVED`  |
| 3     | Implement command repo        | `ARCHIVED`  |
| 4     | Implement sanity report       | `ARCHIVED`  |
| 5     | Fix repo command issues       | `ARCHIVED`  |
| 6     | Implement pull/push/sync      | `ARCHIVED`  |
| 7     | Cleaner code                  | `ARCHIVED`  |
| 8     | Discover records dynamically  | `DONE`      |
| 9     | Fix reported bugs             | `ARCHIVED`  |
| 10    | Implement link                | `DRAFT`     |
| 11    | Implement links               | `DRAFT`     |
| 12    | Implement publish             | `DRAFT`     |
| 13    | Implement unlink              | `DRAFT`     |
| 14    | Fixes and test coverage       | `DONE`      |
| 15    | Update knowledge resources    | `PREPARING` |

### Phase: 0 — Workspace split

**Goal:** Split workspace into manageable structure.

**Description:** Initial workspace reorganisation.

**Status:** `ARCHIVED`

**Dependencies:**

- None.

### Phase: 1 — Workspace sanity clone branch

**Goal:** Implement workspace sanity, clone, and branch commands.

**Description:** Core workspace operations for repository management.

**Status:** `ARCHIVED`

**Dependencies:**

- Phase 0.

### Phase: 2 — Refactor conventions

**Goal:** Refactor project conventions.

**Description:** Clean up conventions and standards.

**Status:** `ARCHIVED`

**Dependencies:**

- Phase 1.

### Phase: 3 — Implement command repo

**Goal:** Implement the repo command.

**Description:** Repository inspection and reporting.

**Status:** `ARCHIVED`

**Dependencies:**

- Phase 2.

### Phase: 4 — Implement sanity report

**Goal:** Implement workspace sanity report.

**Description:** Cross-repository status reporting.

**Status:** `ARCHIVED`

**Dependencies:**

- Phase 3.

### Phase: 5 — Fix repo command issues

**Goal:** Fix reported repository command issues.

**Description:** Bug fixes and edge case handling.

**Status:** `ARCHIVED`

**Dependencies:**

- Phase 4.

### Phase: 6 — Implement pull/push/sync

**Goal:** Implement pull, push, and sync commands.

**Description:** Git operation commands for workspace management.

**Status:** `ARCHIVED`

**Dependencies:**

- Phase 5.

### Phase: 7 — Cleaner code

**Goal:** Improve code quality and cleanliness.

**Description:** Refactoring and code quality improvements.

**Status:** `ARCHIVED`

**Dependencies:**

- Phase 6.

### Phase: 8 — Discover records dynamically

**Goal:** Implement dynamic record discovery.

**Description:** Replace static record paths with dynamic discovery.

**Status:** `DONE`

**Dependencies:**

- Phase 7.

### Phase: 9 — Fix reported bugs

**Goal:** Fix bugs sourced from reported issues.

**Description:** Bug fixes including clone checkout report scanning.

**Status:** `ARCHIVED`

**Dependencies:**

- Phase 8.

### Phase: 10 — Implement link

**Goal:** Implement the link command.

**Description:** Symlink source packages into target node_modules for local development.

**Status:** `DRAFT`

**Dependencies:**

- Phase 8 (record discovery).

### Phase: 11 — Implement links

**Goal:** Implement the links command.

**Description:** Scan workspace for symlinks and present the Symlink Report.

**Status:** `DRAFT`

**Dependencies:**

- Phase 10 (link command for shared helpers).

### Phase: 12 — Implement publish

**Goal:** Implement the publish command.

**Description:** Push repos and publish unpublished packages to npm.

**Status:** `DRAFT`

**Dependencies:**

- Phase 6 (push capabilities from pull-push-sync).

### Phase: 13 — Implement unlink

**Goal:** Implement the unlink command.

**Description:** Remove package symlinks and restore published versions.

**Status:** `DRAFT`

**Dependencies:**

- Phase 10 (link command for shared resolution helpers).

### Phase: 14 — Fixes and test coverage

**Goal:** Fix reported bugs and add regression test coverage.

**Description:** Repository command fixes and comprehensive tests.

**Status:** `DONE`

**Dependencies:**

- Phase 9.

### Phase: 15 — Update knowledge resources

**Goal:** Update architecture knowledge resources.

**Description:** Bring architecture docs current with implemented commands and planned changes.

**Status:** `PREPARING`

**Dependencies:**

- Phase 8 (dynamic record discovery).

---

## Items:

| Phase | Resource / Record                                                              | Status      |
| ----- | ------------------------------------------------------------------------------ | ----------- |
| 0     | `_backlog/0-archive/2026-08-10-plan-workspace-split/plan.md`                   | `ARCHIVED`  |
| 1     | `_backlog/0-archive/2026-08-12-plan-workspace-sanity-clone-branch/plan.md`     | `ARCHIVED`  |
| 2     | `_backlog/0-archive/2026-08-13-plan-refactor-conventions/plan.md`              | `ARCHIVED`  |
| 3     | `_backlog/0-archive/2026-08-14-plan-implement-command-repo/plan.md`            | `ARCHIVED`  |
| 4     | `_backlog/0-archive/2026-08-14-plan-implement-sanity-workspace-report/plan.md` | `ARCHIVED`  |
| 5     | `_backlog/0-archive/2026-08-18-plan-fix-repo-command-issues/plan.md`           | `ARCHIVED`  |
| 6     | `_backlog/0-archive/2026-08-18-plan-implement-pull-push-sync/plan.md`          | `ARCHIVED`  |
| 7     | `_backlog/0-archive/2026-08-18-plan-cleaner-code/plan.md`                      | `ARCHIVED`  |
| 8     | `_backlog/1-done/plan-discover-records/plan.md`                                | `DONE`      |
| 9     | `_backlog/0-archive/2026-08-19-plan-fix-reported-bugs/plan.md`                 | `ARCHIVED`  |
| 10    | `_backlog/4-next/plan-implement-link/plan.md`                                  | `DRAFT`     |
| 11    | `_backlog/4-next/plan-implement-links/plan.md`                                 | `DRAFT`     |
| 12    | `_backlog/4-next/plan-implement-publish/plan.md`                               | `DRAFT`     |
| 13    | `_backlog/4-next/plan-implement-unlink/plan.md`                                | `DRAFT`     |
| 14    | `_backlog/1-done/plan-repo-command-fixes-and-tests/plan.md`                    | `DONE`      |
| 15    | `_backlog/4-next/update-knowledge-resources/plan.md`                           | `PREPARING` |

---

## Work

### Next

Phase 10 — execute `plan-implement-link`.

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

- `plan-fix-reported-bugs` — bug fixes sourced from reported bugs (first bug: `clone` presents Checkout Report without scanning checkouts). See `_backlog/4-next/plan-fix-reported-bugs/plan.md`.
- `plan-implement-publish` — depends on `pull`/`push` from `plan-implement-pull-push-sync`. See `_backlog/4-next/plan-implement-publish/plan.md`.
- Each DRAFT plan embeds a self-contained **Architect Prompt** — copy it to launch one architect per slice.

### Feedback

- None.
