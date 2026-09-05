# Sub-Agent REPORT (agent-worker)

**Plan:** `streamline-ops`

**Iteration Id:** `streamline-operation-factories`

**Outcome:** `COMPLETED`

## Evidence

### Changes

| Instruction Goal                                                                         | Change                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Step 1 — Change the operation contract + add generic factories                           | Added `finishedTs?: Date` and `timing: () => number` to `OperationBase`; added `data?: unknown` to `OperationPending`/`OperationSuccess`/`OperationFailure`. Created `createGenericOperation.ts`, `createOperationSuccess.ts`, `createOperationFailure.ts` in `src/private/operations/` and implemented `timing()` in every existing factory (mocks updated).                                                                                                                                                                                 |
| Step 3 — Rename operation-kind factories to `create*Operation`                           | `git mv` renamed `create{Pull,Push,Clone,Branch,Linked,Publish,Unlink}Pending.ts` → `create*Operation.ts` and `createCheckoutRunPending.ts` → `createCheckoutRunOperation.ts`; function names renamed to match; `createCloneOperation` accepts `Checkout \| undefined` (location fallback `'unknown'`).                                                                                                                                                                                                                                       |
| Step 3 — Update all callers to the pending → success/failure pattern                     | `doPullCheckout`, `doPushCheckout`, `doBranchCheckout`, `doClone`, `doCheckoutRun`, workspace helpers (`doPullWorkspaceCheckout`, `doPushWorkspaceCheckout`, `syncWorkspaceCheckout`) now declare `pending` before `try`, log it, then log `createOperationSuccess(pending)` / `createOperationFailure(pending, error)`. `run*` handlers + `index.ts` migrated from `createOperationPending('boot')` to `createGenericOperation`; `scanCheckoutState`/`scanAllCheckoutsStates`/`loadRepositoryRecords`/`loadCheckoutRecords` log generic ops. |
| Step 3 — Delete `src/private/context/operations/` and per-kind success/failure factories | `git rm` removed both context factories and all 8 per-kind success/failure factories plus their 8 test files.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Step 3 — Reduce operation types                                                          | `types.ts`: `CheckoutOp` now the 8 kinds (incl. `run`); per-kind success/failure and `GenericOperation*` interfaces removed; `Operation` union = per-kind pending types + `OperationPending` + `OperationSuccess` + `OperationFailure`.                                                                                                                                                                                                                                                                                                       |
| Step 3 — Update tests + knowledge                                                        | Reworked `createOperationsLog.test.ts`/`presentOperationsReport.test.ts` to generic factories; added `createGenericOperation.test.ts` (3), `createOperationSuccess.test.ts` (4), `createOperationFailure.test.ts` (4); removed per-kind factory tests. Updated `architecture/operations-log.md` and `architecture/_pseudo.md` (factory list + pseudo call-sites).                                                                                                                                                                             |
| Step 5 — Present all fields in operation report                                          | Added `truncateMiddle.ts` (+ 3 tests); `makeOperationLogLine` now emits `checkout` (record location) after `repo` and `ms` (`String(op.timing())`), with `message()` middle-truncated to 50 chars; `presentOperationsReport` headers → `['', 'repo', 'checkout', 'operation', 'message', 'ms']`; updated `presentOperationsReport.test.ts`; documented columns in `architecture/reports.md`.                                                                                                                                                  |

#### Files changed

- `src/private/operations/types.ts` — reduced operation types; added `finishedTs`/`timing()`; `Operation` union = per-kind pending + generic success/failure (+ `OperationPending`).
- `src/private/operations/createGenericOperation.ts`, `createOperationSuccess.ts`, `createOperationFailure.ts` (+ tests) — generic factories; failure uses `extractReason` + `errorLabels` map (`label: ${repo} — ${reason}`, `errorSerialized()`).
- `src/private/commands/operations/create*Operation.ts` (8 renamed pending factories) — renamed per instruction; `createCloneOperation` accepts `Checkout | undefined`.
- `src/private/context/operations/` — deleted (`createOperationPending.ts`, `createOperationFailure.ts`).
- Per-kind success/failure factories (clone/push/pull/branch/checkoutRun) + their tests — deleted.
- `src/commands/{branch,clone,checkouts,link,publish,pull,push,repo,sanity,sync,unlink}/run*.ts`, `src/index.ts` — migrated to `createGenericOperation`/pending pattern.
- `src/private/commands/checkouts/{doPullCheckout,doPushCheckout,doBranchCheckout,doCheckoutRun}.ts`, `src/private/commands/doClone.ts`, `src/private/commands/workspaces/*` — pending → success/failure pattern.
- `src/private/scan/scanCheckoutState.ts`, `src/private/store/scanAllCheckoutsStates.ts`, `src/private/resources/{repository,checkout}/load*.ts` — generic ops.
- `src/private/log/createOperationsLog.test.ts`, `src/private/present/presentOperationsReport.test.ts` (+ `makeOperationLogLine.ts`, `presentOperationsReport.ts`, `private/truncateMiddle.ts` + test) — updated/added.
- `architecture/operations-log.md`, `architecture/_pseudo.md`, `architecture/reports.md` — updated knowledge.

### Verification

- Step 1 gate: `npm run lint`, `npm run build`, `npm run test` green (270 tests).
- Step 3 gate: `npm run lint`, `npm run build`, `npm run test` green — 62 test files, 268 tests passed; no `it.todo()` remains.
- Step 5 gate: `npm run lint`, `npm run build`, `npm run test` green — 63 test files, 271 tests passed.
- Final verification per instruction: `types.ts` keeps one concrete pending type per kind plus generic `OperationSuccess`/`OperationFailure` (no per-kind success/failure or `GenericOperation*` types); `createOperationSuccess`/`createOperationFailure` are the only success/failure factories and all callers pass the pending instance; `src/private/context/operations/` no longer exists; `OperationBase` has `finishedTs?: Date` and `timing: () => number` and every factory implements `timing()`; Operations Report columns now `repo`, `checkout`, `operation`, `message` (middle-truncated to 50 chars), `ms` (`timing()` delta).

### Commits

| Commit Id                              | Hash      | Status             |
| -------------------------------------- | --------- | ------------------ |
| `add-generic-operation-factories`      | `797e119` | COMMITTED + PUSHED |
| `integrate-generic-operation-handling` | `5f5012c` | COMMITTED + PUSHED |
| `present-all-operation-report-fields`  | `23512b4` | COMMITTED + PUSHED |

All three commits on branch `building` in the art-domains repo, pushed to `origin/building` (`797e119..23512b4`). `plan.md` left uncommitted as delegated.

## Blockers (if any)

None.

## Feedback

### For the planner

- The instruction's written `Operation` union (per-kind pending + `OperationSuccess` + `OperationFailure`) would not compile: `createGenericOperation` returns `OperationPending`, which the log must accept. I added `OperationPending` to the union so generic ops (boot/command/scan paths) remain loggable — the spec text appears to omit it. Final Verification item 1 wording ("per-kind pending type per operation kind plus generic OperationSuccess/OperationFailure") is satisfied since `OperationPending` is the shared base of the per-kind pending types.

### For the technical writers

- `architecture/_pseudo.md` contained 20 stale references to the removed per-kind success/failure factories (`createCloneFailure`, `createBranchSuccess`, etc.); updated all pseudo call-sites to the pending → `createOperationSuccess`/`createOperationFailure` pattern.

### For the crew

- None.
