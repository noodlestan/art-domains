# Instructions: `add-operations-types-and-structure`

**Plan:** `add-operations-domain`

**Iteration Id:** `add-operations-types-and-structure`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-operations-domain/instructions/add-operations-types-and-structure__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse: happy face + up to 3 bullet points (done `add-operations-types-and-structure`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

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

Model the operating-instructions data so each instruction can declare what it is relevant for, and the operation structure can carry its workflow: add the `Operating Instructions` type (with `relevantFor`), the `Operating Instruction` type, and the `Operation` structure to the Operations domain, migrating from the Work domain.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `$PROJECT/_backlog/4-next/plan-add-operations-domain/plan__operations-spec.md` — the domain spec; read `## Types` and `## Structures` in full.
- `$DOMAINS/work/types/operating-instructions.art` — the type being migrated; read its current shape and the `workflow` field that `relevantFor` reuses.
- `$DOMAINS/work/structures/operation.art` — the structure being migrated.
- `$DOMAINS/work/structures/workflow.art` — `Structure: Workflow`, the source of the `workflow` field vocabulary that `relevantFor` reuses.

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

- Step 1 / 5 — Create `types/operating-instructions.art` (with `relevantFor`)
- Step 2 / 5 — Create `types/operating-instruction.art`
- Step 3 / 5 — Create `structures/operation.art`
- Step 4 / 5 — Repoint references from Work to Operations
- Step 5 / 5 — Commit `build-operations-types`

## Steps

### Step `1 / 5` — Create `types/operating-instructions.art`

Create `$DOMAINS/operations/types/operating-instructions.art` migrated from `$DOMAINS/work/types/operating-instructions.art`, with the `relevantFor` field added:

- Read the current type file at `$DOMAINS/work/types/operating-instructions.art`.
- Add the `relevantFor` field to the Shape section: `relevantFor` — List of workflow and operation names (reusing the `workflow` field's vocabulary, not a duplicate). Controls whether this instruction is rendered for a given consuming artefact.
- The `relevantFor` values are controlled by existing workflow and operation names — no free-text vocabulary.
- Keep all existing fields (name, workflow, operation, instructions, source, definition).
- Add a `::READ` directive at the top referencing the Operations domain's structures and types.

Expected outcome: `operating-instructions.art` declares the `relevantFor` field alongside the existing fields.

### Step `2 / 5` — Create `types/operating-instruction.art`

Create `$DOMAINS/operations/types/operating-instruction.art` — a single operating instruction record:

- shape: name, workflow, operation, instructions, source, definition, relevantFor
- `relevantFor` — list of workflow and operation names; controls whether this instruction is rendered for a given consuming artefact
- `instructions` — the procedure text or a link to it
- `source` — where the instruction was discovered (guide, package, domain)

Expected outcome: `operating-instruction.art` declares the single-instruction type.

### Step `3 / 5` — Create `structures/operation.art`

Create `$DOMAINS/operations/structures/operation.art` migrated from `$DOMAINS/work/structures/operation.art`:

- Read the current structure file at `$DOMAINS/work/structures/operation.art`.
- Keep the existing shape: name, workflow, definition.
- The `workflow` field provides the vocabulary for `relevantFor` values.
- Add a `::READ` directive at the top referencing the Operations domain's types.

Expected outcome: `operation.art` declares the operation structure with workflow and definition.

### Step `4 / 5` — Repoint references from Work to Operations

Repoint all references from `$DOMAINS/work/types/operating-instructions.art` and `$DOMAINS/work/structures/operation.art` to their new Operations-domain paths:

- Scan `$DOMAINS/` for references to the old paths.
- Update each reference to point to `$DOMAINS/operations/types/operating-instructions.art` and `$DOMAINS/operations/structures/operation.art`.
- Do NOT modify the Work domain's own files yet (that's iteration 6: Integrate).

Expected outcome: all references to the migrated resources point to the Operations domain.

#### Commit: `build-operations-types`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
build(domain-operations): Add operating-instructions type and operation structure.

- Add Operating Instruction type with relevantFor field.
- Add Operation structure with workflow and definition.
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify that `$DOMAINS/operations/types/operating-instructions.art` declares the `relevantFor` field.
- Verify that `$DOMAINS/operations/structures/operation.art` declares the operation structure with workflow and definition.
- Verify that all references to the migrated resources point to the Operations domain paths.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
