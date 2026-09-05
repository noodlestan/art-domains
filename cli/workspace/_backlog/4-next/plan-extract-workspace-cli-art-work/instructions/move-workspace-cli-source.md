# Instructions: `move-workspace-cli-source`

**Plan:** `extract-workspace-cli-art-work`

**Iteration Id:** `move-workspace-cli-source`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-extract-workspace-cli-art-work/instructions/move-workspace-cli-source__report.md`. No separate delegation record is created.
4. Generate the response and send it back to the delegator.
5. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `move-workspace-cli-source`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                                             | Purpose                                        |
| ------------ | --------------------------------------------------------- | ---------------------------------------------- |
| `$WORKSPACE` | Current working directory                                 | Workspace root directory                       |
| `$PROJECT`   | Provided with prompt                                      | Where work execution is taking place.          |
| `$ART_WORK`  | `$WORKSPACE/art-work`                                     | Destination repo `noodlestan/art-work`.        |
| `$SOURCE`    | `$WORKSPACE/checkouts/art-domains-planning/cli/workspace` | Current workspace-cli location in art-domains. |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `move-workspace-cli-source`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Move the workspace-cli source code from `$SOURCE` (art-domains) to `$ART_WORK/cli/workspace` (art-work). Art Work remains a monorepo; the cli source stays in `cli/workspace`. The project record is NOT migrated (already copied to the root of Art Work in Plan: Create Art Work Repository and Project). Commit the addition in art-work and the removal in art-domains.

## Mandatory Reading

- ::READ `$PROJECT/_backlog/4-next/plan-extract-workspace-cli-art-work/plan.md` (Plan) — Full plan context, scope, and commit blueprints.
- ::READ `$ART_WORK/_guide.md` (Source) — Art-work guide; confirms the repository layout (`cli/workspace`).
- ::READ `$ART_WORK/_records/project.art` (Source) — Art-work root project record; confirms the project record is already at the root.

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

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

- Step 1 / 5 — Copy the workspace-cli source to `$ART_WORK/cli/workspace`
- Step 2 / 5 — Commit `move-workspace-cli-source` in art-work
- Step 3 / 5 — Remove the source from art-domains and commit `remove-workspace-cli-source`
- Step 4 / 5 — Push both repositories (deferred if the GitHub repo does not exist yet)
- Step 5 / 5 — Report

## Steps

### Step `1 / 5` — Copy the workspace-cli source to `$ART_WORK/cli/workspace`

**1a. Create the destination directory:**

```bash
mkdir -p $ART_WORK/cli
```

**1b. Copy the source:**

```bash
cp -R $SOURCE $ART_WORK/cli/workspace
```

**1c. Remove the excluded items from the copy:**

- `$ART_WORK/cli/workspace/node_modules/` — regenerated by `npm ci`
- `$ART_WORK/cli/workspace/dist/` — regenerated by `npm run build`
- `$ART_WORK/cli/workspace/.turbo/` — build cache
- `$ART_WORK/cli/workspace/_records/project.art` — NOT migrated; the project record is already at the root of Art Work (`$ART_WORK/_records/project.art`)

**1d. Verify the copy:**

- `$ART_WORK/cli/workspace/` contains: `_backlog/`, `_guide.md`, `_records/` (package.art, npm-deployment.art), `_roadmap/`, `architecture/`, `CHANGELOG.md`, `package.json`, `README.md`, `src/`, `tsconfig.json`, `vitest.config.ts`, `.eslintignore`, `.gitignore`, `.vscode/`.
- No `node_modules/`, `dist/`, `.turbo/`, or `_records/project.art`.

**Expected outcome:** the workspace-cli source lives at `$ART_WORK/cli/workspace` without build artifacts and without the project record.

---

#### Commit: `move-workspace-cli-source`

**Policy:** AUTONOMOUS — Agent should commit autonomously, push, and proceed to the next step.

**Message:**

```
refs(art-work): move workspace-cli source to cli/workspace

- Copy workspace-cli source from art-domains to art-work/cli/workspace.
- Keep the cli source in cli/workspace (Art Work remains a monorepo).
```

---

### Step `3 / 5` — Remove the source from art-domains

**3a. Remove the workspace-cli source from art-domains:**

```bash
cd $PROJECT
git rm -r cli/workspace
```

The `cli/` directory contains only `workspace`; remove the empty `cli/` directory as well.

**3b. Verify the removal:**

- `$PROJECT/cli/` no longer exists.
- The art-domains working tree has no other unexpected changes.

**Expected outcome:** the workspace-cli source is removed from art-domains.

---

#### Commit: `remove-workspace-cli-source`

**Policy:** AUTONOMOUS — Agent should commit autonomously, push, and proceed to the next step.

**Message:**

```
refs(workspace-cli): remove workspace-cli source moved to art-work

- Remove the workspace-cli source from art-domains.
- The project record is not migrated (already copied to the root of Art Work).
```

---

### Step `4 / 5` — Push both repositories

**4a. Push art-work:**

```bash
cd $ART_WORK
git push -u origin main
```

**4b. Push art-domains:**

```bash
cd $PROJECT
git push
```

The GitHub repository `noodlestan/art-work` may not exist yet. If the push fails with `Repository not found`, do NOT report a blocker — record the deferred push in the report and continue. The push is executed once the repository is created on GitHub.

**Expected outcome:** both commits are pushed, or the deferred push is recorded in the report.

---

### Step `5 / 5` — Report

Report according to the "How to Report Back to the Delegator" instructions, noting the push state (pushed or deferred) for each repository.

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed according to the commit's policy.
- Verify that `$ART_WORK/cli/workspace` contains the moved source (no build artifacts, no project record) and that `$PROJECT/cli/` is removed.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
