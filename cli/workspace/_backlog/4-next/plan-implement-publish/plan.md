# Plan: Workspace CLI — Publish Command

**ID:** `implement-publish`

**Status:** `DRAFT`

**Template:** `.agents/domains/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Implement `art-workspace publish [--auto]` for `@art-domains/workspace-cli`.

**Description:** Push repos and publish unpublished packages to npm, replacing the stub at `src/commands/publish/runPublish.ts`. Depends on the `push` capabilities from `plan-implement-pull-push-sync` and on the project-record reading already implemented for the `repo` command.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable     | Resolved Path             | Purpose                               |
| ------------ | ------------------------- | ------------------------------------- |
| `$WORKSPACE` | Current working directory | Workspace root directory              |
| `$PROJECT`   | Provided with prompt      | Where work execution is taking place. |

## Summary

Implement the publish command for pushing repos and publishing unpublished packages to npm, reusing pushCheckout from the pull-push-sync work.

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
::READ `architecture/commands.md` (Design) — Designed behaviour and BDD scenarios for Publish. Relevant for Planning Work Item.
::READ `architecture/_pseudo.md` (Pseudo-code) — Pseudo-code contract for publish command and auxiliary `shouldPushCheckout`/`pushCheckout`. Relevant for Planning Work Item.
::READ `architecture/records/adr/publish.art` (ADR) — Publish decisions. Relevant for Planning Work Item.
::READ `architecture/context-model.md` (Model) — WorkspaceContext, CheckoutStore, project records. Relevant for Planning Work Item.
::READ `architecture/reports.md` (Reports) — Operations Report format. Relevant for Planning Work Item.

## Scope

Implement publish command in `$PROJECT/src/commands/publish/` with tests, npm registry check, operation factories, and commander wiring.

## Work

### Next

Delegate the first `DRAFT` iteration: `implement-publish-command`.

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

If any of these fail, resolve the issue before proceeding with implementation.

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

| Iteration / Instructions             | Status  |
| ------------------------------------ | ------- |
| Iteration: Implement Publish Command | `DRAFT` |

### Iteration: Implement Publish Command

**Id:** `implement-publish-command`

**Status:** `DRAFT`

**Purpose:** Implement `art-workspace publish [--auto]` end-to-end, tests first.

**Description:** Implement the full publish command with package resolution, npm registry check, npm publish step, operation logging, and commander wiring. Reuses `shouldPushCheckout`/`pushCheckout` from pull-push-sync.

**Instructions:** `./plan-implement-publish/instructions/implement-publish-command.md`

**Changes:**

- Resolve packages per checkout via existing `readProjectRecords` (project → namespaces → packages).
- Implement `npmIsPublished(canonicalName, version)` (npm registry lookup) and the `npm publish --access public` step in the package dir; skip `private` packages.
- Add `createPublishSuccess` / `createPublishFailure` operation factories in `src/private/operations/`; log push and publish outcomes; present Operations Report.
- Wire `--auto` option in `src/index.ts`.
- Write tests first — no `it.todo()` left at the end.

**Dependencies:**

- `plan-implement-pull-push-sync` — consumes `pushCheckout` and `shouldPushCheckout` landed in commit `ef8a2cf`. Reuse those functions — do not scaffold them.

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

- `publish` completes the publish-then-symlink loop with `link`/`unlink`; the Formalized Publishing Workflow follow-up in `_roadmap/_architect.md` should be revisited once this lands.

### Feedback

- None.
