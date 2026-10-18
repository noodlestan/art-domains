# Instructions: `add-operations-routines`

**Plan:** `add-operations-domain`

**Iteration Id:** `add-operations-routines`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-operations-domain/instructions/add-operations-routines__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse: happy face + up to 3 bullet points (done `add-operations-routines`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                | Purpose                                      |
| ------------ | ---------------------------- | -------------------------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root; repository for all new files |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources under change                |

## Working Agreements

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user expects a light confirmation: a happy face and up to 3 bullet points. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Define the operating-instructions lifecycle so instructions are composed, matched by relevance, and read from guides: add the compose, read, enumerate, and register routines to the Operations domain, migrating from the Work domain, with `relevantFor` matching in `compose-operating-instructions`.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `$PROJECT/_backlog/4-next/plan-add-operations-domain/plan__operations-spec.md` — the domain spec; read `## Routines` in full.
- `$DOMAINS/work/routines/compose-operating-instructions.art` — the routine being migrated; read its current logic and the matching mechanism.
- `$DOMAINS/work/routines/read-work-guides.art` — the routine being migrated.
- `$DOMAINS/work/routines/compose-work-operations.art` — the routine being migrated.
- `$DOMAINS/operations/types/operating-instructions.art` — the new type with `relevantFor` (created by the previous iteration).

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

---

## Operating Instructions

### Setting Up

**Purpose:** Prepare the execution environment.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
npm run ci # to verify build is green before starting
```

If any of these fail, resolve the issue before proceeding with implementation.

### Writing Commit Message

**Purpose:** Write standardized message according to context conventions.

**Instructions:** (From `$WORKSPACE/_guide.md`)

1. Read commit message conventions from `$WORKSPACE/knowledge/conventions/writing-commit-message.art`.
2. Write the commit message following: the rules defined there.

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npx prettier --write .agents/domains/operations # format new .art files
npm run ci # lint, build and test
```

All steps MUST pass. The pre-commit hook runs `prettier . -c`; run `npx prettier --write` on every file you create before committing.

---

## Changes

- Step 1 / 6 — Create `routines/compose-operating-instructions.art` (with `relevantFor` matching)
- Step 2 / 6 — Create `routines/read-work-guides.art`
- Step 3 / 6 — Create `routines/compose-work-operations.art`
- Step 4 / 6 — Create `routines/register-operating-instructions.art`
- Step 5 / 6 — Repoint references from Work to Operations
- Step 6 / 6 — Commit `build-operations-routines`

## Steps

### Step `1 / 6` — Create `routines/compose-operating-instructions.art`

Create `$DOMAINS/operations/routines/compose-operating-instructions.art` migrated from `$DOMAINS/work/routines/compose-operating-instructions.art`, updated with `relevantFor` matching:

- Read the current routine at `$DOMAINS/work/routines/compose-operating-instructions.art`.
- Update step 5 to populate `relevantFor` on each instruction and match on `relevantFor` against the consuming artefact's workflows and operations, not on operation name alone.
- Add a `%consuming-context` input (workflows and operations of the artefact being rendered).
- The routine returns only instructions whose `relevantFor` matches `%consuming-context`.
- Add a `::READ` directive at the top referencing the Operations domain's types.

Expected outcome: `compose-operating-instructions.art` populates `relevantFor` and matches on it against the consuming context.

### Step `2 / 6` — Create `routines/read-work-guides.art`

Create `$DOMAINS/operations/routines/read-work-guides.art` migrated from `$DOMAINS/work/routines/read-work-guides.art`:

- Read the current routine at `$DOMAINS/work/routines/read-work-guides.art`.
- Keep the existing logic: input `%entry-point`, output `%knowledge`, scans exactly five section names.
- Update the `::READ` directive at the top to reference the Operations domain's types.
- Do NOT change the scanning logic — the closed list (Recommended Reading, Records Management, Knowledge, Workflows, Conventions) is preserved.

Expected outcome: `read-work-guides.art` scans the closed list and produces `%knowledge`.

### Step `3 / 6` — Create `routines/compose-work-operations.art`

Create `$DOMAINS/operations/routines/compose-work-operations.art` migrated from `$DOMAINS/work/routines/compose-work-operations.art`:

- Read the current routine at `$DOMAINS/work/routines/compose-work-operations.art`.
- Keep the existing logic: input `%workflows`, output `%operations` (union of operations across all workflows).
- Update the `::READ` directive at the top to reference the Operations domain's types.

Expected outcome: `compose-work-operations.art` enumerates operations across all workflows.

### Step `4 / 6` — Create `routines/register-operating-instructions.art`

Create `$DOMAINS/operations/routines/register-operating-instructions.art` as a new routine:

- input: `%instructions` (Identifier or NaturalExpression — can be a package, a specific path, or instructions derived from context), `%artefact` (Path or NaturalExpression — where to add the instructions, e.g. "the guide's Operating Instructions section")
- output: the updated artefact with operating instructions registered
- procedure:
  1. Resolve the instructions source (package, path, or context-derived).
  2. Read the artefact.
  3. Add or merge the operating instructions section.
  4. Apply any project-side override via `**CommandList**` or equivalent.
  5. If the artefact already carries operating instructions for the same operation, merge (deduplicate, compress) rather than duplicate.
- Add a `::READ` directive at the top referencing the Operations domain's types.

Expected outcome: `register-operating-instructions.art` registers operating instructions on an artefact with deduplication.

### Step `5 / 6` — Repoint references from Work to Operations

Repoint all references from `$DOMAINS/work/routines/` to their new Operations-domain paths:

- Scan `$DOMAINS/` for references to `compose-operating-instructions.art`, `read-work-guides.art`, `compose-work-operations.art` in their old Work-domain locations.
- Update each reference to point to the Operations domain path.
- Do NOT modify the Work domain's own files yet (that's iteration 6: Integrate).

Expected outcome: all references to the migrated routines point to the Operations domain.

#### Commit: `build-operations-routines`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
build(domain-operations): Add operating-instructions routines.

- Add compose-operating-instructions with relevantFor matching.
- Add read-work-guides and compose-work-operations.
- Add register-operating-instructions routine.
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify that `$DOMAINS/operations/routines/compose-operating-instructions.art` populates `relevantFor` and matches on it against the consuming context.
- Verify that `$DOMAINS/operations/routines/register-operating-instructions.art` registers instructions on an artefact with deduplication.
- Verify that all references to the migrated routines point to the Operations domain.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
