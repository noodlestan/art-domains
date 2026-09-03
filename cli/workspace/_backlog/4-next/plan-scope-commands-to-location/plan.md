# Plan: Scope Commands to Location

**ID:** `scope-commands-to-location`

**Status:** `PLANNING`

**Template:** `.agents/domains/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Add a positional `checkout locations` argument to `pull`, `push`, and `sync` so the operation can be scoped to one or more checkout locations instead of always iterating all checkouts.

**Description:** Add a positional `[checkouts...]` argument to `pull`, `push`, and `sync` (mirroring `branch`/`repo`), filter the checkout iteration to the given locations, and only scan and pull/push those checkouts.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable     | Resolved Path             | Purpose                               |
| ------------ | ------------------------- | ------------------------------------- |
| `$WORKSPACE` | Current working directory | Workspace root directory              |
| `$PROJECT`   | Provided with prompt      | Where work execution is taking place. |

## Summary

Let `pull`, `push`, and `sync` accept one or more checkout locations as a positional argument, so a user can scope the operation to specific checkouts instead of always processing every checkout in the workspace.

## Context

### Upstream Work

| Kind                  | Path                                                               | Role                                                            |
| --------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------- |
| Parking Lot           | `$PROJECT/_backlog/_parking-lot.md`                                | Tracks short-term actionables, pending questions, and blockers. |
| Architecture Briefing | `_roadmap/_architect.md`                                           | Workspace principles, NFRs, milestones.                         |
| Milestone             | `$PROJECT/_roadmap/3-now/milestone-workspace-cli-one/milestone.md` | Coordinates this plan within the Workspace CLI One milestone.   |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Refining.

### Domains

| Domain / Path                           | Description                                                                        |
| --------------------------------------- | ---------------------------------------------------------------------------------- |
| Domain: Plans `$DOMAINS/plans/index.md` | Planning lifecycle for contextualising, drafting, planning, and integrating plans. |

### Knowledge

::READ `_roadmap/_architect.md` (Briefing) — Workspace principles, NFRs, milestones. Relevant for Planning Work Item.
::READ `architecture/commands.md` (Design) — Designed behaviour and BDD scenarios for pull, push, sync. Relevant for Planning Work Item.

## Scope

Update the `pull`, `push`, and `sync` command handlers in `$PROJECT/src/commands/` to accept and filter by checkout locations.

## Work

### Next

Refine the first `DRAFT` iteration: `scope-commands-to-location`.

### Blockers

- None.

---

## Operating Instructions

### Setting Up

**Purpose:** Prepare the execution environment. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/ops/setting-up.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
npm run ci # to verify build is green before starting
```

If any of these fail, resolve the issue before proceeding with implementation. Do NOT run `npm install` inside `$PROJECT` (the package directory) — a local `node_modules` there shadows the monorepo resolution and breaks the build.

### Writing Commit Message

**Purpose:** Write standardized message according to context conventions. Operation of Workflow: Planning Work, defined in `$DOMAINS/work/workflows/planning-work/ops/writing-commit-message.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

1. Read commit message conventions from `$WORKSPACE/knowledge/conventions/writing-commit-message.art`.
2. Write the commit message following: the rules defined there.

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/ops/verifying-completion.art`.

**Instructions:** (From `$PROJECT/_guide.md`)

Run from the package directory:

```bash
npm run lint:fix # to fix formatting issues automatically
npm run lint # to report other issues (prettier, eslint, tsc --noEmit)
npm run build
npm run test
```

All steps MUST pass. No `it.todo()` tests may remain.

---

## Items:

| Iteration / Instructions              | Status  |
| ------------------------------------- | ------- |
| Iteration: Scope Commands to Location | `DRAFT` |

### Iteration: Scope Commands to Location

**Id:** `scope-commands-to-location`

**Status:** `DRAFT`

**Purpose:** Let `pull`, `push`, and `sync` operate on a subset of checkout locations.

**Description:** Add a positional `[checkouts...]` argument to `pull`, `push`, and `sync`; filter the checkout iteration to the given locations; only scan and pull/push those checkouts.

**Instructions:** `./plan-scope-commands-to-location/instructions/scope-commands-to-location.md`

**Changes:**

- Add a positional `[checkouts...]` argument to the `pull`, `push`, and `sync` commands (mirroring `branch`/`repo`).
- In `runPull`, `runPush`, and `runSync`, when locations are provided, filter `ctx.store.getAllCheckouts()` to those locations before scanning and before the pull/push side-effect loop.
- Keep the no-argument behaviour (all checkouts) unchanged.
- Add/update tests covering scoped and unscoped invocations.

**Dependencies:**

- None.

---

## Coordination

### Not In Scope

- None.

### Evidence

- None.

### Findings

- `runPull`, `runPush`, and `runSync` each iterate `ctx.store.getAllCheckouts()` unconditionally; there is no way to scope the operation to specific checkout locations.

### Decisions

- None.

### Knowledge to Update

- `architecture/commands.md` — document the new `[checkouts...]` argument for pull, push, sync.

### Follow Ups

- None.

### Feedback

- None.
