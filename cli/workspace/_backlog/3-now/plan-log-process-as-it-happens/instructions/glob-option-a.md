# Instructions: `glob-option-a`

**Plan:** `log-process-as-it-happens`

**Iteration Id:** `glob-option-a`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-log-process-as-it-happens/instructions/glob-option-a__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `glob-option-a`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path             | Purpose                               |
| ------------ | ------------------------- | ------------------------------------- |
| `$WORKSPACE` | Current working directory | Workspace root directory              |
| `$PROJECT`   | Provided with prompt      | Where work execution is taking place. |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `glob-option-a`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Speed up record discovery by moving string `ignored` patterns and a baseline of always-excluded directories into the glob's `exclude` option, and express `included` overrides as separate positive globs unioned with the main results (Option A). The glob should no longer walk `node_modules`, `.git`, or `dist`.

## Mandatory Reading

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

- architecture: `$PROJECT/architecture/operations-log.md` — OperationsLog and Operation semantics. Read-only reference; do not edit it in place.

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

## Changes

This section summarises the changes to be made in this iteration.

- Step 1 / 4 — Add `exclude` support and baseline excludes to `findCandidateFiles`
- Step 2 / 4 — Pass string `ignored` patterns to the glob `exclude` in `findRecordFiles`
- Step 3 / 4 — Union `included` string patterns as separate positive globs
- Step 4 / 4 — Commit `glob-exclude-ignored` and `glob-include-union`

## Steps

This section contains the detailed steps to execute, including commit steps.

### Step `1 / 4` — Add `exclude` support and baseline excludes to `findCandidateFiles`

In `$PROJECT/src/private/records/private/findCandidateFiles.ts`:

- Change the signature to accept an optional `exclude: string[]` parameter.
- Pass `exclude` to `globSync` as the `exclude` option (Node 22.4+; the runtime is Node 24).
- When no `exclude` is provided, default to a baseline of `['**/node_modules/**', '**/.git/**', '**/dist/**']` so the glob never walks those directories.

Expected outcome: `findCandidateFiles(searchPath, pattern, exclude?)` globs with the given excludes, defaulting to the baseline.

### Step `2 / 4` — Pass string `ignored` patterns to the glob `exclude` in `findRecordFiles`

In `$PROJECT/src/private/records/findRecordFiles.ts`:

- Build the glob `exclude` list from the baseline plus the string `ignored` patterns from `recordsConfig.ignored` (only the `string` entries; `RegExp` entries cannot be passed to `globSync`).
- Pass that `exclude` list into `findCandidateFiles`.
- Keep the existing `filterByPatterns` step so `RegExp` `ignored`/`included` patterns and the `git check-ignore` post-filter still apply.

Expected outcome: string `ignored` patterns and the baseline dirs are excluded at glob time; RegExp patterns and gitignore still filter afterwards.

### Step `3 / 4` — Union `included` string patterns as separate positive globs

In `$PROJECT/src/private/records/findRecordFiles.ts`:

- For each string `included` pattern in `recordsConfig.included`, run a separate positive glob (via `findCandidateFiles` with the same baseline excludes) and union the results with the main glob results.
- `RegExp` `included` patterns remain handled by `filterByPatterns`.
- Deduplicate the unioned file list before returning.

Expected outcome: `included` string patterns re-include files that gitignore would otherwise drop, matching the current `filterByPatterns` override semantics.

### Step `4 / 4` — Commit `glob-exclude-ignored` and `glob-include-union`

---

#### Commit: `glob-exclude-ignored`

**Policy:** AUTONOMOUS — Agent should commit autonomously, push, and proceed to the next step.

**Message:**

```
build(workspace-cli): pass ignored patterns and baseline dirs to glob exclude.

- Add `exclude` to `globSync` for `node_modules`, `.git`, `dist`.
- Pass string `ignored` patterns through to the glob `exclude`.
```

---

#### Commit: `glob-include-union`

**Policy:** AUTONOMOUS — Agent should commit autonomously, push, and proceed to the next step.

**Message:**

```
build(workspace-cli): union included patterns as positive globs.

- Glob each string `included` pattern separately and union with the main results.
- Keep RegExp patterns and the git check-ignore post-filter.
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify that `findCandidateFiles` accepts an `exclude` list and defaults to excluding `node_modules`, `.git`, `dist`.
- Verify that string `ignored` patterns are passed to the glob `exclude` and that `included` string patterns are unioned as positive globs.
- Verify that `RegExp` patterns and the `git check-ignore` post-filter still work.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
