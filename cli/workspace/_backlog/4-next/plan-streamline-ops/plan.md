# Plan: Streamline Operation Types and Factories

**ID:** `streamline-ops`

**Status:** `DRAFT`

**Template:** `.agents/domains/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Refactor operation types to have fewer types, and refactor the factories so that `createSuccess` and `createFailure` are abstract: they accept the concrete pending instance, clone its original data, and populate themselves with the error (failure) or outcome/data (success).

**Description:** Today each operation kind declares three types (`PullPending`, `PullSuccess`, `PullFailure`, …) and three factories (`createPullPending`, `createPullSuccess`, `createPullFailure`, …) that repeat the same shape. Refactor so the pending instance is the single concrete type per operation; `createSuccess(pending)` and `createFailure(pending, error)` become generic/abstract — they clone the pending's data and set `outcome: 'success'` (+ optional data) or `outcome: 'failure'` (+ error), removing the per-kind success/failure types and factories.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable     | Resolved Path             | Purpose                               |
| ------------ | ------------------------- | ------------------------------------- |
| `$WORKSPACE` | Current working directory | Workspace root directory              |
| `$PROJECT`   | Provided with prompt      | Where work execution is taking place. |

## Summary

Reduce the operation type and factory surface: one concrete pending type per operation kind, plus abstract `createSuccess`/`createFailure` that derive success/failure from the pending instance (cloning its data, adding outcome/data or outcome/error). No change to report output or operation messages.

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
::READ `architecture/operations-log.md` (Design) — Operation log and operation kinds; must stay current after the refactor.
::READ `architecture/_pseudo.md` (Pseudo-code) — Operation kinds and factories listed; must stay current after the refactor.

## Scope

Refactor `$PROJECT/src/private/operations/types.ts` (fewer types) and `$PROJECT/src/private/commands/operations/` (abstract `createSuccess`/`createFailure` accepting the pending instance), then update all callers (`doPullCheckout`, `doCheckoutRun`, `pushCheckout`, `cloneIfMissing`, etc.) and tests. No behaviour change to reports or messages.

## Work

### Next

Refine the first `DRAFT` iteration: `streamline-operation-factories`.

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

| Iteration / Instructions                  | Status  |
| ----------------------------------------- | ------- |
| Iteration: Streamline Operation Factories | `DRAFT` |

### Iteration: Streamline Operation Factories

**Id:** `streamline-operation-factories`

**Status:** `DRAFT`

**Purpose:** Reduce operation types and make `createSuccess`/`createFailure` abstract — they accept the concrete pending instance, clone its data, and populate outcome/data (success) or outcome/error (failure).

**Description:** Collapse the per-kind success/failure types in `src/private/operations/types.ts` into generic success/failure derived from the pending instance. Replace the per-kind `create*Success`/`create*Failure` factories with abstract `createSuccess(pending)` / `createFailure(pending, error)` that clone the pending's data and set the outcome plus error or data. Update all callers and tests. Report output and messages unchanged.

**Instructions:** TBD

**Changes:**

- Refactor `src/private/operations/types.ts`: keep one concrete pending type per operation kind; success/failure become generic (clone of pending data + outcome, plus `error`/`errorSerialized` on failure, optional `data` on success).
- Add abstract `createSuccess(pending)` and `createFailure(pending, error)` factories; remove the per-kind `create*Success`/`create*Failure` factories.
- Update all callers (`doPullCheckout`, `doCheckoutRun`, `pushCheckout`, `cloneIfMissing`, `createOrSwitchBranch`, etc.) to pass the pending instance.
- Update factory tests; keep message/errorSerialized behaviour identical.
- Update `architecture/operations-log.md` and `architecture/_pseudo.md` knowledge.

**Dependencies:**

- `plan-implement-checkouts-run` — introduces `CheckoutRunPending/Success/Failure` and `createCheckoutRun*` factories; the refactor must absorb them.

#### Commits:

| ID                                 | Repository / Checkout / Branch  | Policy       | Status    |
| ---------------------------------- | ------------------------------- | ------------ | --------- |
| `refactor-operation-types`         | Workspace / `$PROJECT` / `main` | `AUTONOMOUS` | `PENDING` |
| `refactor-operation-factories`     | Workspace / `$PROJECT` / `main` | `AUTONOMOUS` | `PENDING` |
| `update-operation-factory-callers` | Workspace / `$PROJECT` / `main` | `AUTONOMOUS` | `PENDING` |
| `test-operation-factories`         | Workspace / `$PROJECT` / `main` | `AUTONOMOUS` | `PENDING` |

##### Commit: `refactor-operation-types`

**Message:**

```
refactor(operations): reduce operation types to pending + generic success/failure

- Keep one concrete pending type per operation kind.
- Derive success/failure from the pending instance (clone data + outcome).
- TBD — exact generic shape to be decided during refinement.
```

##### Commit: `refactor-operation-factories`

**Message:**

```
refactor(operations): make createSuccess and createFailure abstract

- createSuccess(pending) clones pending data, sets outcome success (+ optional data).
- createFailure(pending, error) clones pending data, sets outcome failure + error.
- Remove per-kind create*Success / create*Failure factories.
```

##### Commit: `update-operation-factory-callers`

**Message:**

```
refactor(operations): update callers to pass the pending instance

- Update doPullCheckout, doCheckoutRun, pushCheckout, cloneIfMissing, etc.
- No change to report output or operation messages.
```

##### Commit: `test-operation-factories`

**Message:**

```
test(operations): update factory tests for abstract createSuccess/createFailure

- Test data cloning, outcome, error, and errorSerialized behaviour.
- No it.todo() remaining.
```

---

## Coordination

### Not In Scope

- No change to report output, operation messages, or the Operations Report format.
- No new operation kinds.

### Evidence

- None.

### Findings

- TBD.

### Decisions

- TBD — exact generic type shape and factory signatures to be decided during refinement.

### Knowledge to Update

- `architecture/operations-log.md` — operation kinds and factories list.
- `architecture/_pseudo.md` — operation kinds and factories list.

### Follow Ups

- None.

### Feedback

- None.
