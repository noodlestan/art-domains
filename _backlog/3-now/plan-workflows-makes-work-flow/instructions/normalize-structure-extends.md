# Instructions: `normalize-structure-extends`

**Plan:** `workflows-make-work-flow`

**Iteration Id:** `normalize-structure-extends`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute this instruction. Your mode must be `worker` before you start changing files.

These are your instructions. They include a section at the end on how to report back to requester.

- RULE: If at any point you are instructed to **REPORT A BLOCKER** execute the instruction in the "## How to Report Back" section and STOP processing any other instructions.

## Path Variables

| Variable     | Resolved Path             | Purpose                       |
| ------------ | ------------------------- | ----------------------------- |
| `$WORKSPACE` | Current working directory | Workspace root directory.     |
| `$DOMAINS`   | `.agents/domains`         | Where domains currently live. |

## Working Agreements

The plan workflow runs on three working agreements:

1. This instruction is self-contained. Use this file and its mandatory reading; do not rely on session memory.
2. The report is self-contained and must contain evidence, changes, verification, blockers, and feedback.
3. Keep the final chat report terse; the report file carries the full trail.

## Goals

Normalize structure inheritance declarations across every domain structure file. Ensure consistent use of `**Extends:**`, `**Inherits:**`, and `**Shape:**` fields, and remove redundant `**Primitive:** Record` declarations.
- Every structure (except `resource-abstract.art`) MUST have a `::READ` directive for the super-structure it extends, placed in the `## Uses` section at the top of the file.

### Scope

This iteration covers:

- `$DOMAINS/**/structures/*.art` — All structure files.
- `$DOMAINS/**/types/*.art` — All type files (scope types that drifted to `**Specific fields:**`).

Out of scope:

- Files that are already normalized and contain more than just type annotation and local example in the `**Inherits:**` declaration — do not touch these.
- Files where you are unsure whether a match should be intervened — do not change these; add them to the report at the end under "Uncertain Matches".

## Mandatory Reading

- `$DOMAINS/_artificials/structures/resource-abstract.art` — The base structure that all other structures extend from.
- `$DOMAINS/work/structures/work-item-abstract.art` — The abstract work item structure that plan and milestone extend.
- `$DOMAINS/plans/structures/plan.art` — Example of a structure extending Work Item (Abstract).
- `$DOMAINS/roadmaps/structures/milestone.art` — Example of a structure extending Work Item (Abstract).
- `$DOMAINS/projects/types/project-scope.art` — **Canonical example** of correct field ordering: Extends, Overrides, Inherits (with type and local example only), then local fields.
- `$DOMAINS/applications/types/application-scope.art` — Drifted file: uses `**Specific fields:**` instead of `**Shape:**`.
- `$DOMAINS/repositories/types/repository-scope.art` — Drifted file: uses `**Specific fields:**` instead of `**Shape:**`.
- `$DOMAINS/packages/types/package-scope.art` — Drifted file: uses `**Specific fields:**` instead of `**Shape:**`.
- `$DOMAINS/deployments/types/deployment-scope.art` — Drifted file: uses `**Specific fields:**` instead of `**Shape:**`.

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

## Set Up

**Setting Up:**

No setup required — this iteration modifies only markdown files.

## Changes

This iteration normalizes all structure files and drifted type files in `$DOMAINS`.

**Single commit `normalize-structure-extends` — normalize inheritance declarations:**

- Add `::READ` directive for the super-structure in each files `## Uses` section (except `resource-abstract.art`).
- Update all structure files to use consistent `**Extends:**` declarations.
- Ensure all structures list inherited fields under `**Inherits:**` (not `**Inherited:**`).
- Remove `**Primitive:** Record` from all structures and types.
- Ensure `kind` and `name` are never listed in `**Inherits:**` sections.
- Preserve local fields under each structure's own `**Shape:**` field.
- Rename `**Specific fields:**` to `**Shape:**` in 4 drifted scope type files.

## Workflow

You are going to perform a series of steps and check status after each one.

1. Step 1. Read all structure files to catalogue current state.
2. Step 2. Apply normalizations to each structure file.
3. Step 3. Verify all structures are consistent.
4. Step 4. Commit normalized structures.

Execute all the steps autonomously, one by one, including running the prescribed **Verification** actions.

### Rules

- RULE: You are FORBIDDEN from return to a previous step.
- RULE: If a command reports errors, attempt to fix them.
- RULE: If the errors persist, inspect the cause before continuing.
- RULE: If still unable to fix it, STOP and report back following the "## Rules to Report".

## Steps

### Step `1 / 4` — Read all structure files to catalogue current state.

**Goal:** Read every structure file and record its current inheritance pattern.

From `$DOMAINS/`:

```bash
find . -path "*/structures/*.art" -type f | sort
```

Also grep for all structure declarations to catch any that might be in non-standard locations:

```bash
grep -rn "## Structure: " --include="*.art" .
```

Read each structure file and note:

1. Does it have `**Extends:**`? If so, what does it extend?
2. Does it have `**Inherits:**` or `**Inherited:**`? (Normalize to `**Inherits:**`)
3. Does it have `**Primitive:** Record`? (Should be removed)
4. Does it list `kind` or `name` in inherits? (Should be removed)
5. Does it have `**Specific fields:**` instead of `**Shape:**`? (Should be renamed to `**Shape:**`)

Also check type files for drifted field names:

```bash
grep -rn "Specific fields" --include="*.art" .
```

Create a summary table of all structures and their current state. Mark any files where you are unsure whether a match should be intervened — these will go in the report under "Uncertain Matches" without being changed.

### Step `2 / 4` — Apply normalizations to each structure file.

**Goal:** Update each structure file to follow the normalized pattern.

**Canonical Example:** `$DOMAINS/projects/types/project-scope.art` — This file demonstrates the correct field ordering. All normalizations must follow this order:

1. `**Extends:**` — The parent structure.
2. `**Overrides:**` — Fields overridden from parent (if any).
3. `**Inherits:**` — All fields inherited from parent(s), each with type annotation and local example only.
4. Local fields — Under `**Shape:**` (for structures) or directly (for types with only inherited fields).

**Do NOT touch** files that are already normalized and contain more than just type annotation and local example in the `**Inherits:**` declaration. These files are already correct.

For each structure file that needs normalization, apply these rules:

**Rule 1: Extends Declaration**

- Every structure MUST have `**Extends:**` unless it is the base abstract structure (`resource-abstract.art`).
- The default base is `**Extends:** Structure: Resource (Abstract)`.
- Work item structures extend `**Extends:** Structure: Work Item (Abstract)`.
- Type files (scope types) extend their abstract parent type.
- Every structure (except `resource-abstract.art`) MUST have a `::READ` directive for the super-structure it extends, placed in the `## Uses` section at the top of the file. Example: `::READ (Structure: Resource (Abstract)) FROM `$DOMAINS/_artificials/structures/resource-abstract.art``.

**Rule 2: Inherits Section**

- Rename `**Inherited:**` to `**Inherits:**` if present.
- List only fields that are inherited from the parent structure.
- For each inherited field, provide the type annotation and a local example relevant to this structure.
- Do NOT list `kind` or `name` in inherits.
- Field ordering within Inherits must match the parent's field order.

**Rule 3: Primitive Declaration**

- Remove `**Primitive:** Record` from all structures and types.

**Rule 4: Shape Section**

- Rename `**Specific fields:**` to `**Shape:**` in drifted type files.
- Preserve all local fields under `**Shape:**`.
- Do not duplicate inherited fields in shape.

Apply changes to these specific files (based on catalogue from Step 1):

1. `$DOMAINS/roadmaps/structures/milestone.art` — Remove `**Primitive:** Record`, ensure `**Inherits:**` (not `**Inherited:**`).
2. `$DOMAINS/plans/structures/plan.art` — Rename `**Inherited:**` to `**Inherits:**`.
3. `$DOMAINS/plans/structures/iteration.art` — Remove `**Primitive:** Record`.
4. `$DOMAINS/work/types/work-scope-item-abstract.art` — Remove `**Primitive:** Record`.
5. `$DOMAINS/applications/types/application-scope.art` — Rename `**Specific fields:**` to `**Shape:**`.
6. `$DOMAINS/repositories/types/repository-scope.art` — Rename `**Specific fields:**` to `**Shape:**`.
7. `$DOMAINS/packages/types/package-scope.art` — Rename `**Specific fields:**` to `**Shape:**`.
8. `$DOMAINS/deployments/types/deployment-scope.art` — Rename `**Specific fields:**` to `**Shape:**`.
9. All other structure files — Verify they follow the pattern; fix if needed.

### Step `3 / 4` — Verify all structures are consistent.

**Verifying:**

From `$DOMAINS/`:

```bash
grep -r "Inherited:" --include="*.art" .
```

Should return no results (all renamed to Inherits).

```bash
grep -r "Primitive: Record" --include="*.art" .
```

Should return no results (all removed).

```bash
grep -r "Specific fields" --include="*.art" .
```

Should return no results (all renamed to Shape).

```bash
grep -r "Extends:" --include="*.art" . | grep -v "resource-abstract.art"
```

Should show every structure (except resource-abstract.art) has an Extends declaration.

```bash
grep -r "::READ.*Structure:" --include="*.art" . | grep -v "resource-abstract.art"
```

Should show every structure (except resource-abstract.art) has a ::READ for its super-structure.

```bash
grep -rn "## Structure: " --include="*.art" .
```

Verify all structure declarations are accounted for in your catalogue.

```bash
grep -r "kind" --include="*.art" . | grep -i "inherits" | grep -v "kind" | head -20
```

Check that `kind` and `name` are not listed in inherits sections.

### Step `4 / 4` — Commit normalized structures.

**Policy:** BLOCKED — commit will be executed but not pushed. It will be reviewed by humans before pushing.

Commit `normalize-structure-extends` with message:

```
build(domains): normalize structure inheritance declarations

- Rename Inherited: to Inherits: across all structures
- Remove Primitive: Record from all structures and types
- Rename Specific fields: to Shape: in 4 drifted scope type files
- Ensure all structures have consistent Extends: declarations
- Verify kind and name are not listed in inherits sections
```

Push the commit.

## Final Verification

**Sanity check:**

```bash
grep -r "Inherited:" --include="*.art" $DOMAINS/
grep -r "Primitive: Record" --include="*.art" $DOMAINS/
grep -r "Specific fields" --include="*.art" $DOMAINS/
```

All three should return no results.

**Verifying:**

From `$DOMAINS/`:

```bash
find . -path "*/structures/*.art" -type f -exec grep -l "Extends:" {} \; | wc -l
```

Should match the total number of structure files minus `resource-abstract.art`.

```bash
find . -path "*/structures/*.art" -type f -exec grep -l "::READ.*Structure:" {} ; | wc -l
```

Should match the total number of structure files minus `resource-abstract.art` (all have ::READ for super-structure).

```bash
grep -rn "## Structure: " --include="*.art" . | wc -l
```

Should match the total number of structure declarations found in Step 1.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing this instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the **render-template** skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-{%plan.id}/instructions/{%iteration.id}__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Include an "Uncertain Matches" section in the report listing any files where you were unsure whether a match should be intervened — these were not changed.
6. Generate the response and send it back to the delegator.
7. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `%commit.id`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

Thank you for your service.
