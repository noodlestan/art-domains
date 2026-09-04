# Plan: Implement Checkouts Run Command

**ID:** `implement-checkouts-run`

**Status:** `PLANNING`

**Template:** `.agents/domains/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Implement `art-workspace checkout run <command...> [-c, --checkouts <PATTERN...>]` — run arbitrary commands across selected checkouts.

**Description:** Add a `checkout` command group with a single `run` subcommand. `run` accepts a variadic `<command...>` positional and an optional `-c, --checkouts <PATTERN...>` filter, resolves matching checkouts via `getCheckoutsByPattern`, executes the command in each matching checkout directory, logs operations, and presents reports.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable     | Resolved Path             | Purpose                               |
| ------------ | ------------------------- | ------------------------------------- |
| `$WORKSPACE` | Current working directory | Workspace root directory              |
| `$PROJECT`   | Provided with prompt      | Where work execution is taking place. |

## Summary

Implement `checkout run <command...> [-c, --checkouts <PATTERN...>]` — execute an arbitrary shell command in each checkout matching the `--checkouts` patterns (all checkouts when omitted). Reuses `getCheckoutsByPattern` from the store and follows the standardised command declaration conventions.

## Context

### Upstream Work

| Kind                  | Path                                                               | Role                                                            |
| --------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------- |
| Parking Lot           | `$PROJECT/_backlog/_parking-lot.md`                                | Tracks short-term actionables, pending questions, and blockers. |
| Architecture Briefing | `_roadmap/_architect.md`                                           | Workspace principles, NFRs, milestones.                         |
| Milestone             | `$PROJECT/_roadmap/3-now/milestone-workspace-cli-one/milestone.md` | Coordinates this plan within the Workspace CLI One milestone.   |
| Plan                  | `$PROJECT/_backlog/3-now/plan-scope-commands-to-checkouts/plan.md` | Delivered scope decisions this plan builds on.                  |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Refining.

### Domains

| Domain / Path                           | Description                                                                        |
| --------------------------------------- | ---------------------------------------------------------------------------------- |
| Domain: Plans `$DOMAINS/plans/index.md` | Planning lifecycle for contextualising, drafting, planning, and integrating plans. |

### Knowledge

::READ `_roadmap/_architect.md` (Briefing) — Workspace principles, NFRs, milestones. Relevant for Planning Work Item.
::READ `architecture/commands.md` (Design) — Command surface; add `checkout run` under the shared `### Command Arguments` section. Relevant for Planning Work Item.
::READ `architecture/_pseudo.md` (Pseudo-code) — Add `checkout run` pseudo-code. Relevant for Planning Work Item.
::READ `architecture/context-model.md` (Model) — WorkspaceContext, CheckoutStore, `getCheckoutsByPattern`. Relevant for Planning Work Item.
::READ `architecture/reports.md` (Reports) — Operations Report format. Relevant for Planning Work Item.

## Scope

Implement `checkout run` in `$PROJECT/src/commands/` — create the `checkout` command group with a single `run` subcommand; wire in `src/index.ts`; resolve checkouts via `getCheckoutsByPattern`; execute the command per checkout with operation logging; present reports; update knowledge.

## Work

### Next

Refine the first `DRAFT` iteration: `implement-checkout-run-command`.

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
| Iteration: Implement Checkout Run Command | `DRAFT` |

### Iteration: Implement Checkout Run Command

**Id:** `implement-checkout-run-command`

**Status:** `DRAFT`

**Purpose:** Implement `art-workspace checkout run <command...> [-c, --checkouts <PATTERN...>]` end-to-end.

**Description:** Create the `checkout` command group with a single `run` subcommand. `run` accepts a variadic `<command...>` positional and an optional `-c, --checkouts <PATTERN...>` option. Resolve checkouts via `ctx.store.getCheckoutsByPattern(checkouts)` when patterns are provided, else all checkouts. Execute the command in each matching checkout directory via spawn with `cwd` = checkout path. Log a pending operation per checkout, then success/failure. Present Checkout Report + Operations Report.

**Instructions:** TBD — to be written when refining the iteration.

**Changes:**

- Create the `checkout` command group in `src/index.ts` with a single `run` subcommand: `.argument('<command...>', 'command to run')` and `.option('-c, --checkouts <PATTERN...>', 'checkout location patterns')`.
- Add `src/commands/checkout/runCheckoutRun.ts` implementing the handler: resolve checkouts via `ctx.store.getCheckoutsByPattern(checkouts)` when patterns are provided, else all checkouts; spawn the command per checkout with `cwd: checkout.path`; capture output; log operations.
- Add operation factories `createCheckoutRunPending`, `createCheckoutRunSuccess`, `createCheckoutRunFailure` in `src/private/commands/operations/`.
- Present Checkout Report + Operations Report.
- Add tests: pattern filtering, all-checkouts default, execution success/failure, no-match warning, inner-flag `--` convention.

**Dependencies:**

- `plan-scope-commands-to-checkouts` — provides `getCheckoutsByPattern` and the `--checkouts` pattern.

#### Commits:

| ID                                          | Repository / Checkout / Branch  | Policy       | Status    |
| ------------------------------------------- | ------------------------------- | ------------ | --------- |
| `wire-checkout-run-command`                 | Workspace / `$PROJECT` / `main` | `AUTONOMOUS` | `PENDING` |
| `implement-checkout-run-execution`          | Workspace / `$PROJECT` / `main` | `AUTONOMOUS` | `PENDING` |
| `add-checkout-run-operations-and-reporting` | Workspace / `$PROJECT` / `main` | `AUTONOMOUS` | `PENDING` |
| `test-checkout-run-command`                 | Workspace / `$PROJECT` / `main` | `AUTONOMOUS` | `PENDING` |

##### Commit: `wire-checkout-run-command`

**Message:**

```
build(workspace-cli-one): Wire checkout run command group and subcommand.

- Create `checkout` group with `run` subcommand in `src/index.ts`.
- Add `.argument('<command...>')` and `.option('-c, --checkouts <PATTERN...>')`.
- Wire action to `runCheckoutRun(ctx, { command, checkouts })`.
```

##### Commit: `implement-checkout-run-execution`

**Message:**

```
build(workspace-cli-one): Implement checkout run execution step.

- Resolve checkouts via `getCheckoutsByPattern` when patterns provided, else all.
- Spawn command per checkout with `cwd` = checkout path.
- Capture output and exit code; warn on unresolvable checkouts.
```

##### Commit: `add-checkout-run-operations-and-reporting`

**Message:**

```
build(workspace-cli-one): Add checkout run operations and reporting.

- Add `createCheckoutRunPending`/`Success`/`Failure` operation factories.
- Log pending operation per checkout before execution.
- Present Checkout Report and Operations Report.
```

##### Commit: `test-checkout-run-command`

**Message:**

```
test(cli): add checkout run command tests.

- Test pattern filtering via `getCheckoutsByPattern`.
- Test all-checkouts default when option omitted.
- Test execution success and failure per checkout.
- Test no-match warning and inner-flag `--` convention.
```

---

## Coordination

### Not In Scope

- Repo/package group restructuring, `checkout clone`/`checkout remove`, `package run`, moving flat `clone`/`publish`/`link` — parked in `$PROJECT/_backlog/6-plan/_parking-lot.md`.

### Evidence

- Commander 12.1.0 nested-command and option-parsing behavior verified empirically in a scratch project.

### Findings

- Commander supports nested commands both chained (`.command('checkout').command('run')`) and single-string (`.command('checkout run')`); flat and nested commands coexist.
- A group command alone (`checkout`) prints the group help and exits 1.
- Default parsing is sufficient for `checkout run <command...> [-c, --checkouts <PATTERN...>]`: option after positionals parses; inner flags need `--` (e.g. `checkout run npm run ci -- --filter x`); a quoted command string works; option-before-positionals fails with "missing required argument".
- `passThroughOptions()`/`enablePositionalOptions()` interact subtly with nested parents (the parent greedily consumes positionals before the child parser runs) — avoid unless needed.
- The scope plan's decision to use the named `--checkouts` option (not a positional) directly shapes this command's signature.

### Decisions

- Command is `checkout run` (nested under a new `checkout` group).
- Signature: `checkout run <command...> [-c, --checkouts <PATTERN...>]` — the command string is the only positional; checkout filtering via the `--checkouts` option (per scope plan decision).
- This plan creates only the `run` subcommand; the `checkout` group scaffolding is minimal (parent + run). Future subcommands (`clone`, `remove`) are separate plans.
- Reuse `ctx.store.getCheckoutsByPattern(checkouts)`; all checkouts when omitted.
- Default commander parsing; document the `--` convention for inner flags.
- Execution via spawn with `cwd` = checkout path; per-checkout pending → success/failure operations.

### Knowledge to Update

- `architecture/commands.md` — add `checkout run` to the command surface; document under the shared `### Command Arguments` section.
- `architecture/_pseudo.md` — add `checkout run` pseudo-code.

### Follow Ups

- `plan-implement-packages-run` — implement `package run` sharing exec infra; update its dependency reference to the renamed plan.
- Update milestone reference to the renamed plan path.
- Repo/package group restructuring parked in `$PROJECT/_backlog/6-plan/_parking-lot.md`.

### Feedback

- None.
