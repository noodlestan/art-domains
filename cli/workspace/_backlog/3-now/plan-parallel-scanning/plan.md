# Plan: Parallel Scanning

**ID:** `parallel-scanning`

**Status:** `WORKING`

**Template:** `.agents/domains/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Speed up `sanity`, `pull`, `push`, and `sync` by making the checkouts processing loop (which contains the checkout scan ops) asynchronous and parallel, and by cutting the per-checkout git/network cost of ahead/behind counting.

**Description:** Parallelise the per-checkout scan and pull/push processing loops and reduce the per-checkout git/network cost of ahead/behind counting, which is the dominant cause of the approx. 10x slow-down introduced with the ahead/behind feature. Ahead/behind counting is split into an expensive network fetch (opt-in) and a cheap local count, so cheap pre-scan passes stay local while post-side-effect scans refresh.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable     | Resolved Path             | Purpose                               |
| ------------ | ------------------------- | ------------------------------------- |
| `$WORKSPACE` | Current working directory | Workspace root directory              |
| `$PROJECT`   | Provided with prompt      | Where work execution is taking place. |

## Summary

Make `sanity`, `pull`, `push`, and `sync` faster by (1) scanning checkouts concurrently instead of one-at-a-time, (2) cutting the per-checkout git subprocess and network-fetch cost of computing ahead/behind counts, and (3) making the network fetch opt-in so cheap pre-scan passes stay local.

## Context

### Upstream Work

| Kind                  | Path                                                               | Role                                                                  |
| --------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------- |
| Parking Lot           | `$PROJECT/_backlog/_parking-lot.md`                                | Tracks short-term actionables, pending questions, and blockers.       |
| Architecture Briefing | `_roadmap/_architect.md`                                           | Workspace principles, NFRs, milestones.                               |
| Milestone             | `$PROJECT/_roadmap/3-now/milestone-workspace-cli-one/milestone.md` | Coordinates this plan within the Workspace CLI One milestone.         |
| Follow Ups            | `plan-fix-pull-push-bugs` plan Follow Ups                          | Scan latency and parallelism follow-up raised after fixing pull/push. |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Refining.

### Domains

| Domain / Path                           | Description                                                                        |
| --------------------------------------- | ---------------------------------------------------------------------------------- |
| Domain: Plans `$DOMAINS/plans/index.md` | Planning lifecycle for contextualising, drafting, planning, and integrating plans. |

### Knowledge

::READ `_roadmap/_architect.md` (Briefing) — Workspace principles, NFRs, milestones. Relevant for Planning Work Item.
::READ `architecture/index.md` (Model) — Execution Model and OperationsLog. Relevant for Planning Work Item.
::READ `architecture/commands.md` (Design) — Designed behaviour and BDD scenarios for sanity, pull, push, sync. Relevant for Planning Work Item.
::READ `architecture/_pseudo.md` (Pseudo-code) — Pseudo-code contract for the scan and git inspection. Relevant for Planning Work Item.
::READ `architecture/context-model.md` (Model) — WorkspaceContext, CheckoutStore, checkout scan types. Relevant for Planning Work Item.

## Scope

Update the checkouts processing and scanning loops in `$PROJECT/src/private/store/`, `$PROJECT/src/private/git/`, and the `sanity`/`pull`/`push`/`sync` commands so scan and side-effect loops run concurrently, ahead/behind counting avoids redundant git subprocess and network-fetch work, and the network fetch is opt-in via a `refetch` flag.

---

## Items:

| Iteration / Instructions                                                                     | Status  |
| -------------------------------------------------------------------------------------------- | ------- |
| Iteration: Parallelise Checkout Scanning `./instructions/parallelise-checkout-scanning.md`   | `DONE`  |
| Iteration: Optimise Ahead/Behind Counting `./instructions/optimise-ahead-behind-counting.md` | `READY` |
| Iteration: Make Scan Refetch Opt-In `./instructions/make-scan-refetch-opt-in.md`             | `READY` |

### Iteration: Parallelise Checkout Scanning

**Id:** `parallelise-checkout-scanning`

**Status:** `DONE`

**Report:** `./instructions/parallelise-checkout-scanning__report.md`

**Purpose:** Make the per-checkout scan and pull/push/sync processing loops run concurrently so elapsed time scales with concurrency rather than the number of checkouts.

**Description:** Add a shared bounded-concurrency helper and use it in `scanAllCheckoutsStates` and in the pull/push/sync side-effect loops, keeping report and operation ordering deterministic by presenting results in original checkout order.

**Instructions:** `./instructions/parallelise-checkout-scanning.md`

**Changes:**

- Add a shared bounded-concurrency helper (e.g. `runWithConcurrency` in `src/private/async/runWithConcurrency.ts`) that processes an array of async tasks with a concurrency limit (approx. 4–8) and returns results in input order.
- Refactor `scanAllCheckoutsStates` (`src/private/store/scanAllCheckoutsStates.ts`) to map each checkout to a `scanCheckoutState` task and run them through the helper instead of the sequential `for...of await` loop.
- Apply the same bounded-concurrency helper to the per-checkout side-effect loops in `runPull` (`doPullCheckout`), `runPush`/`pushCleanCheckouts` (`doPushCheckout`), and `runSync`.
- Keep checkout report and operation ordering deterministic: collect per-checkout results and present them in original checkout order.
- Ensure `CheckoutStore.updateCheckout` calls remain safe under concurrency — each checkout is updated independently with no shared mutable state across checkouts.
- Add tests covering concurrent scanning (all checkouts still scanned, states still correct, ordering deterministic).

**Dependencies:**

- None.

#### Commits:

| ID                              | Repository / Checkout / Branch                        | Policy       | Hash      | Status      |
| ------------------------------- | ----------------------------------------------------- | ------------ | --------- | ----------- |
| `add-concurrency-helper`        | Workspace CLI / `$PROJECT` / `plan-parallel-scanning` | `AUTONOMOUS` | `6b54911` | `COMMITTED` |
| `parallelise-checkout-scanning` | Workspace CLI / `$PROJECT` / `plan-parallel-scanning` | `AUTONOMOUS` | `341a6bd` | `COMMITTED` |
| `cover-parallel-scanning`       | Workspace CLI / `$PROJECT` / `plan-parallel-scanning` | `AUTONOMOUS` | `59a3f06` | `COMMITTED` |

##### Commit: `add-concurrency-helper`

**Repository:** Workspace CLI

**Message:**

```
build(workspace-cli): Add bounded-concurrency helper for parallel checkout processing.

- Add `runWithConcurrency` to run tasks with a configurable limit and preserve input order.
```

##### Commit: `parallelise-checkout-scanning`

**Repository:** Workspace CLI

**Message:**

```
build(workspace-cli): Scan and process checkouts concurrently with bounded concurrency.

- Refactor `scanAllCheckoutsStates` and pull/push/sync loops to use the concurrency helper.
- Keep reports and operations in original checkout order.
- Ensure `updateCheckout` stays safe under concurrency.
```

##### Commit: `cover-parallel-scanning`

**Repository:** Workspace CLI

**Message:**

```
test(workspace-cli): Cover concurrent checkout scanning and side effects.

- Test that all checkouts are scanned concurrently with correct states and deterministic ordering.
```

### Iteration: Optimise Ahead/Behind Counting

**Id:** `optimise-ahead-behind-counting`

**Status:** `READY`

**Purpose:** Cut the per-checkout git subprocess calls and network fetches that dominate scan cost.

**Description:** Split ahead/behind counting into an expensive network `remoteFetch` (once per checkout, all branches) and a cheap local `getBehindAheadCount` single `rev-list` inspection; delete the superseded `getUnpushedCount` and `getBehindCount`, and have `scanCheckoutState` run the expensive fetch once (only when required) before the cheap count.

**Instructions:** `./instructions/optimise-ahead-behind-counting.md`

**Changes:**

- Add `remoteFetch` (`src/private/git/remoteFetch.ts`) that performs one network `git fetch origin` per checkout (all branches), returning success/failure.
- Add `getBehindAheadCount` (`src/private/git/getBehindAheadCount.ts`) that reads ahead/behind locally with a single `git rev-list --left-right --count HEAD...<remoteBranch>` (or `git status --porcelain=v2 --branch`'s `# branch.ab` line), issuing no network call.
- Delete `getUnpushedCount.ts` and `getBehindCount.ts`; superseded by `remoteFetch` + `getBehindAheadCount`.
- `scanCheckoutState` performs at most one expensive `remoteFetch` per checkout (only when required) followed by one cheap `getBehindAheadCount`, instead of three inspections (`status` + two `rev-list`) with a per-branch fetch.
- Update tests for ahead/behind correctness through the new path, including the remote-unreachable fallback.

**Dependencies:**

- `parallelise-checkout-scanning` — concurrency makes the reduced per-checkout cost additive; can land independently but parallelisation amplifies the gain.

#### Commits:

| ID                                        | Repository / Checkout / Branch                        | Policy       | Hash  | Status     |
| ----------------------------------------- | ----------------------------------------------------- | ------------ | ----- | ---------- |
| `add-remote-fetch-and-ahead-behind-count` | Workspace CLI / `$PROJECT` / `plan-parallel-scanning` | `AUTONOMOUS` | (TBD) | `AUTHORED` |
| `use-combined-ahead-behind-in-scan`       | Workspace CLI / `$PROJECT` / `plan-parallel-scanning` | `AUTONOMOUS` | (TBD) | `AUTHORED` |
| `cover-ahead-behind-counting`             | Workspace CLI / `$PROJECT` / `plan-parallel-scanning` | `AUTONOMOUS` | (TBD) | `AUTHORED` |

##### Commit: `add-remote-fetch-and-ahead-behind-count`

**Repository:** Workspace CLI

**Message:**

```
build(workspace-cli): Add remote fetch and combined ahead/behind count helpers.

- Add `remoteFetch` performing one `git fetch origin` per checkout.
- Add `getBehindAheadCount` reading both counts with a single `rev-list` inspection.
```

##### Commit: `use-combined-ahead-behind-in-scan`

**Repository:** Workspace CLI

**Message:**

```
refactor(workspace-cli): Count ahead/behind with a single inspection in scan.

- `scanCheckoutState` runs `remoteFetch` then `getBehindAheadCount`.
- Delete superseded `getUnpushedCount` and `getBehindCount`.
```

##### Commit: `cover-ahead-behind-counting`

**Repository:** Workspace CLI

**Message:**

```
test(workspace-cli): Cover combined ahead/behind counting and fallbacks.

- Test ahead/behind correctness and the remote-unreachable fallback.
```

### Iteration: Make Scan Refetch Opt-In

**Id:** `make-scan-refetch-opt-in`

**Status:** `READY`

**Purpose:** Make the network `remoteFetch` during scanning opt-in so cheap pre-scan passes stay local while post-side-effect scans refresh.

**Description:** Thread a `refetch` flag through the scan functions; pre-scan passes default cheap (no network fetch), while post-side-effect scans in pull/push/sync/sanity pass `refetch: true`. Rename workspace command helpers to `do-` prefix, add `syncWorkspaceCheckout`, and rename `pushCleanCheckouts` to `syncCheckouts`.

**Instructions:** `./instructions/make-scan-refetch-opt-in.md`

**Changes:**

- Add an optional `refetch?: boolean` parameter to `scanCheckoutState` and `scanAllCheckoutsStates`; when `false` (default) skip `remoteFetch` (cheap local count only); when `true` run `remoteFetch` before `getBehindAheadCount`.
- Thread the `refetch` option through `scanWorkspaceCheckout` (used for the workspace root), defaulting cheap.
- Rename `pullWorkspaceCheckout` → `doPullWorkspaceCheckout` and `pushWorkspaceCheckout` → `doPushWorkspaceCheckout`; add `syncWorkspaceCheckout` for the sync path.
- Rename `pushCleanCheckouts` → `syncCheckouts`.
- `runPull`: the pre-scan stays cheap (`refetch: false`); after pulling, re-scan affected checkouts with `refetch: true`.
- `runPush`: drop the pre-push pull; push clean checkouts, then re-scan with `refetch: true`.
- `runSync`: use the `checkout` variable directly and re-scan with `refetch: true` after pull/push.
- Update tests for cheap-vs-refetch scan behaviour.

**Dependencies:**

- `optimise-ahead-behind-counting` — builds on the `remoteFetch`/`getBehindAheadCount` split.

#### Commits:

| ID                                 | Repository / Checkout / Branch                        | Policy       | Hash  | Status     |
| ---------------------------------- | ----------------------------------------------------- | ------------ | ----- | ---------- |
| `thread-refetch-through-scan`      | Workspace CLI / `$PROJECT` / `plan-parallel-scanning` | `AUTONOMOUS` | (TBD) | `AUTHORED` |
| `rename-workspace-command-helpers` | Workspace CLI / `$PROJECT` / `plan-parallel-scanning` | `AUTONOMOUS` | (TBD) | `AUTHORED` |
| `refetch-after-side-effects`       | Workspace CLI / `$PROJECT` / `plan-parallel-scanning` | `AUTONOMOUS` | (TBD) | `AUTHORED` |

##### Commit: `thread-refetch-through-scan`

**Repository:** Workspace CLI

**Message:**

```
build(workspace-cli): Make ahead/behind remote fetch opt-in via refetch flag.

- Add optional `refetch` to `scanCheckoutState`, `scanAllCheckoutsStates`, and `scanWorkspaceCheckout`.
- Cheap local count by default; network fetch only when `refetch: true`.
```

##### Commit: `rename-workspace-command-helpers`

**Repository:** Workspace CLI

**Message:**

```
refactor(workspace-cli): Rename workspace command helpers and add sync helper.

- Rename `pullWorkspaceCheckout`/`pushWorkspaceCheckout` to `do-` prefix.
- Add `syncWorkspaceCheckout`; rename `pushCleanCheckouts` to `syncCheckouts`.
```

##### Commit: `refetch-after-side-effects`

**Repository:** Workspace CLI

**Message:**

```
build(workspace-cli): Refetch after side effects in pull, push, and sync.

- Keep pre-scan cheap; re-scan affected checkouts with `refetch: true` after pull/push/sync.
- Drop the pre-push pull in `runPush`.
```

## Work

### Next

Iteration `parallelise-checkout-scanning` is `DONE`. Next, delegate iteration `optimise-ahead-behind-counting` to workers.

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

- Split ahead/behind into an expensive network `remoteFetch` (once per checkout, all branches) and a cheap local `getBehindAheadCount` (single `rev-list`); delete `getUnpushedCount`/`getBehindCount`.
- Make the network fetch opt-in via a `refetch` flag: pre-scan passes stay cheap; post-side-effect scans pass `refetch: true`. Parameter name is `refetch` (not `refresh`).
- `runPull`/`runPush` pre-scan stays cheap; `runPush` drops the pre-push pull; `runSync` uses the `checkout` variable directly.
- Rename `pullWorkspaceCheckout`/`pushWorkspaceCheckout` → `do-`-prefixed; `pushCleanCheckouts` → `syncCheckouts`; add `syncWorkspaceCheckout`.
- Checkouts are scanned and processed with a shared bounded-concurrency helper; report and operation ordering stays deterministic.

### Knowledge to Update

- `architecture/_pseudo.md`, `architecture/index.md`, `architecture/commands.md` — reflect parallel scanning, opt-in refetch, and the split ahead/behind counting.

### Follow Ups

- None.

### Feedback

- Iteration `parallelise-checkout-scanning`: worker noted the `$PROJECT/architecture/` mandatory-reading paths did not resolve; actual files live at `$PROJECT/cli/workspace/architecture/`. Minor path issue only — instruction otherwise clear. Worker also noted the pre-commit hook runs full CI (~25s/commit).
