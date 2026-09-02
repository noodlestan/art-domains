# Plan: Parallel Scanning

**ID:** `parallel-scanning`

**Status:** `DRAFT`

**Template:** `.agents/domains/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Speed up `sanity`, `pull`, `push`, and `sync` by making the checkouts processing loop (which contains the checkout scan ops) asynchronous and parallel.

**Description:** Parallelise the per-checkout scan and pull/push processing loops and reduce the per-checkout git/network cost of ahead/behind counting, which is the dominant cause of the approx. 10x slow-down introduced with the ahead/behind feature.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable     | Resolved Path             | Purpose                               |
| ------------ | ------------------------- | ------------------------------------- |
| `$WORKSPACE` | Current working directory | Workspace root directory              |
| `$PROJECT`   | Provided with prompt      | Where work execution is taking place. |

## Summary

Make `sanity`, `pull`, `push`, and `sync` faster by (1) scanning checkouts concurrently instead of one-at-a-time, and (2) cutting the per-checkout git subprocess and network-fetch cost of computing ahead/behind counts.

## Context

### Upstream Work

| Kind                  | Path                                                               | Role                                                                  |
| --------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------- |
| Parking Lot           | `$PROJECT/_backlog/_parking-lot.md`                                | Tracks short-term actionables, pending questions, and blockers.       |
| Architecture Briefing | `_backlog/_architect.md`                                           | Workspace principles, NFRs, milestones.                               |
| Milestone             | `$PROJECT/_backlog/3-now/milestone-workspace-cli-one/milestone.md` | Coordinates this plan within the Workspace CLI One milestone.         |
| Follow Ups            | `plan-fix-pull-push-bugs` plan Follow Ups                          | Scan latency and parallelism follow-up raised after fixing pull/push. |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Refining.

### Domains

| Domain / Path                           | Description                                                                        |
| --------------------------------------- | ---------------------------------------------------------------------------------- |
| Domain: Plans `$DOMAINS/plans/index.md` | Planning lifecycle for contextualising, drafting, planning, and integrating plans. |

### Knowledge

::READ `_backlog/_architect.md` (Briefing) — Workspace principles, NFRs, milestones. Relevant for Planning Work Item.
::READ `architecture/index.md` (Model) — Execution Model and OperationsLog. Relevant for Planning Work Item.
::READ `architecture/commands.md` (Design) — Designed behaviour and BDD scenarios for sanity, pull, push, sync. Relevant for Planning Work Item.
::READ `architecture/_pseudo.md` (Pseudo-code) — Pseudo-code contract for the scan and git inspection. Relevant for Planning Work Item.
::READ `architecture/context-model.md` (Model) — WorkspaceContext, CheckoutStore, checkout scan types. Relevant for Planning Work Item.

## Scope

Update the checkouts processing and scanning loops in `$PROJECT/src/private/store/`, `$PROJECT/src/private/git/`, and the `sanity`/`pull`/`push`/`sync` commands so scan and side-effect loops run concurrently, and ahead/behind counting avoids redundant git subprocess and network-fetch work.

## Work

### Next

Refine the first `DRAFT` iteration: `parallelise-checkout-scanning`.

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

| Iteration / Instructions                  | Status  |
| ----------------------------------------- | ------- |
| Iteration: Parallelise Checkout Scanning  | `DRAFT` |
| Iteration: Optimise Ahead/Behind Counting | `DRAFT` |

### Iteration: Parallelise Checkout Scanning

**Id:** `parallelise-checkout-scanning`

**Status:** `DRAFT`

**Purpose:** Make the per-checkout scan and pull/push loops run concurrently instead of one checkout at a time.

**Description:** Process checkouts in parallel (bounded concurrency) in `scanAllCheckoutsStates` and in the pull/push/sync side-effect loops, so elapsed time scales with concurrency rather than the number of checkouts.

**Instructions:** `./plan-parallel-scanning/instructions/parallelise-checkout-scanning.md`

**Changes:**

- Refactor `scanAllCheckoutsStates` (`src/private/store/scanAllCheckoutsStates.ts`) to scan checkouts concurrently with a small bounded-concurrency helper (e.g. `Promise.all` over chunks or a run-with-concurrency utility, limit ~4–8) instead of a sequential `for...of await` loop.
- Apply the same bounded-concurrency pattern to the per-checkout side-effect loops in `runPull` (`doPullCheckout`), `runPush`/`pushCleanCheckouts` (`doPushCheckout`), and `runSync`.
- Keep the resulting ordering of checkout reports and operations deterministic (collect results and present in original checkout order).
- Ensure `CheckoutStore.updateCheckout` calls remain safe under concurrency (each checkout updated independently; no shared mutable state across checkouts).
- Add/update tests covering concurrent scanning (all checkouts still scanned, states still correct).

**Dependencies:**

- None.

### Iteration: Optimise Ahead/Behind Counting

**Id:** `optimise-ahead-behind-counting`

**Status:** `DRAFT`

**Purpose:** Cut the per-checkout git subprocess calls and network fetches that dominate scan cost.

**Description:** Eliminate the per-branch `git fetch` network round-trip done for every checkout in `getBehindCount`, and collapse the separate ahead/behind `rev-list`/`status` calls into a single inspection, so the ahead/behind feature no longer multiplies scan time by the number of checkouts.

**Instructions:** `./plan-parallel-scanning/instructions/optimise-ahead-behind-counting.md`

**Changes:**

- In `getBehindCount` (`src/private/git/getBehindCount.ts`), remove the default per-checkout `git fetch('origin', branch)`; derive behind from the local remote-tracking reference (`origin/<branch>`) instead of a fresh network fetch. When a fetch is required (e.g. an explicit refresh step), fetch once per checkout for all branches (`git fetch origin`) rather than per branch.
- In `getUnpushedCount`/`getBehindCount`, replace the separate ahead and behind invocations with a single `git rev-list --left-right --count HEAD...<remoteBranch>` call that yields both counts in one subprocess (or use `git status --porcelain=v2 --branch` and read the `# branch.ab +{ahead} -{behind}` line when no separate rev-list is needed).
- Reuse results across the scan so `scanCheckoutState` performs at most one git inspection for ahead/behind instead of three (`status` + two `rev-list`).
- Update tests to cover ahead/behind correctness with the new counting path, including the remote-unreachable fallback.

**Dependencies:**

- `parallelise-checkout-scanning` — concurrency makes the reduced per-checkout cost additive; can land independently but parallelisation amplifies the gain.

---

## Coordination

### Not In Scope

- None.

### Evidence

- Before optimization, a workspace with many checkouts processes them one at a time; the ahead/behind feature adds a sequential network `git fetch` per checkout inside `getBehindCount`, producing the observed approx. 10x slow-down of `sanity`.

### Findings

- `scanAllCheckoutsStates` (`src/private/store/scanAllCheckoutsStates.ts`) iterates checkouts with `for (const checkout of store.getAllCheckouts()) await scanCheckoutState(checkout)` — fully sequential.
- `scanCheckoutState` issues ~7–9 git subprocess calls sequentially per checkout; `getBehindCount` performs `git fetch('origin', branch)` per checkout (network) plus a `rev-list`; `getUnpushedCount` runs `git.status()` plus a `rev-list`.
- `runPull`/`runPush`/`runSync` also pull/push each checkout sequentially (`doPullCheckout`/`doPushCheckout`).

### Decisions

- None.

### Knowledge to Update

- `architecture/_pseudo.md`, `architecture/index.md`, `architecture/commands.md` — reflect parallel scanning and the optimised ahead/behind counting.

### Follow Ups

- None.

### Feedback

- None.
