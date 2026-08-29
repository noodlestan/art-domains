# Instructions: `iteration-commit-nesting`

**Plan:** `workflows-make-work-flow`

**Iteration Id:** `iteration-commit-nesting`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute this instruction. Your mode must be `worker` before you start changing files.

These are your instructions. They include a section at the end on how to report back to requester.

- RULE: If at any point you are instructed to **REPORT A BLOCKER** execute the instruction in the "## How to Report Back" section and STOP processing any other instructions.

## Path Variables

| Variable     | Resolved Path                | Purpose                     |
| ------------ | ---------------------------- | --------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root directory.   |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources directory. |

## Working Agreements

The plan workflow runs on three working agreements:

1. This instruction is self-contained. Use this file and its mandatory reading; do not rely on session memory.
2. The report is self-contained and must contain evidence, changes, verification, blockers, and feedback.
3. Keep the final chat report terse; the report file carries the full trail.

## Goals

Add a notes field to Type: Commit and create a commit template for rendering commits in plans and iterations.

## Mandatory Reading

- `$DOMAINS/commits/types/commit.art` — Current commit type to extend.
- `$DOMAINS/commits/index.md` — Commits domain index.
- `$DOMAINS/plans/templates/plan.tart` — Plan template to update.

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

## Operating Instructions

### Writing Commit Message

Commit message pattern: `{Type}({Scope}): {Description}.` max 120 chars, optionally followed by up 3 bullet points, max 100 chars each.

Allowed values for commit Type, Scope, and valid Type–Scope associations are defined in `$WORKSPACE/knowledge/conventions/writing-commit-messages.art`, along with examples, and rules.

RULE: Do not invent commit types or scopes or assume a combination is valid. Always read the "Writing Commit Message" guide first.

### Setting Up

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
```

Run from the `$PROJECT` root:

```bash
npm run ci # to verify there are no pre-existing failures.
```

### Verifying Completion

Run from the `$PROJECT` root:

```bash
npm run lint:fix # autofix formatting issues
npm run lint # report remaining issues
npm run workspace sanity # to check git status across all repos
```

## Changes

### Step 1: Create Template: Commit

Create `$DOMAINS/commits/templates/commit.tart` with:

The same first 3 directives of `$DOMAINS/plans/templates/plan.tart`

```md
::TEMPLATE::READ (Type: Commit) FROM `$DOMAINS/commits/types/commit.art`

#### Commits:

::TEMPLATE With each `%commit` in `%commits` — List (Type: Commit) — render a table with columns "ID", "Repository / Checkout / Branch", "Policy", "Hash", and "Status"

::EXAMPLE

| ID                       | Repository / Checkout / Branch    | Policy       | Hash      | Status      |
| ------------------------ | --------------------------------- | ------------ | --------- | ----------- |
| `create-badge-mixin`     | No Comply / `$NO_COMPLY` / `main` | `AUTONOMOUS` | `5a6b120` | `COMMITTED` |
| `create-badge-component` | No Comply / `$NO_COMPLY` / `main` | `NOCOMMIT`   | (TBD)     | `COMMITTED` |

::END

::TEMPLATE(Commits) With each `%commit` in `%commits` — List (Type: Commit) — render an H5 section with format:

##### Commit: {{%commit.id}}

**Repository:** {{repository.name}}

**Message:**

{{commit.message}}

::END(Commits)
```

### Step 2: Update Plan Template

Update `$DOMAINS/plans/templates/plan.tart` to render the commits template before `::END(Iterations)`.

Add:

```md
::TEMPLATE With `%iteration.commits` as `%commits` render the `$DOMAINS/commits/templates/commit.tart` template.
```

### Step 3: Commit

**Policy:** AUTONOMOUS — Agent MUST commit and push autonomously and proceed to the next step.

Commit `add-commit-template` with message:

```
build(domains): Render commits table and messages in plan iterations.

- Add "Template: Commit"
- Update "Template: Plan" to render the commits template.
```

### Step 4: Add notes field to Type: Commit

Update `$DOMAINS/commits/types/commit.art` to add a `notes` field at the end shape.

- `notes` — NaturalBlock. Bullet-point list of observations made by the user during or after execution.

### Step 5: Add Type: Commit Status

Add "Type: Commit Status" — Primitive: Enum(String) in `commit-status.art` next to and based on `$AGENTS/commits/types/commit-policy.art`

Options:

- `PLACEHOLDER` — Message is a placeholder for changes and instructions being prepared for an iteration.
- `AUTHORED` — Message is authored and matches the scope of the changes described in the instructions that execute it.
- `BLOCKED` — The commit was blocked by the user or agent, either in accordance with the commit policy or specific blocking instructions, or because it could not complete the requested changes or verify their completion.
- `COMMITTED` — Commit was executed. The hash field is populated.

Update `$DOMAINS/commits/types/commit.art` to:

- ::READ (Type: Commit Status) FROM `./commit-status.art`
- Change `hash` to "- `hash` — String. 7 char commit hash. Until commit is done: '(TBD)'."
- Change `status` to "- `status` — Type: Commit Status. Current execution status of this commit blueprint. Example: `AUTHORED`."

### Step 6: Change commit policy options

In `.agents/domains/commits/types/commit-policy.art`:

Change Type: Commit Policy — CONTROLLED becomes NOPUSH and BLOCKED becomes NOCOMMIT.

- `NOCOMMIT` — Agent MUST stage the changes, MUST NOT execute the commit, and MUST REPORT A BLOCKER.
- `NOPUSH` — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

### Step 7: Update Agent Worker handling of commit policy

In `.agents/skills/agent-worker/SKILL.md`:

- replace item 7 **Push every successful implementation commit to the declared remote branch.** and its bullet points by

```md
7. **Commit as per instructions unless commit policy set to `NOPUSH`**
   - Commit at the designated steps using the provided messages.
   - Always run "Verifying Step" operational instructions before committing.
   - Never use `--no-verify` when a pre-hook blocks the commit, even when it seems the blocker is a pre-existing condition.
```

Add

```md
8. **Push validated commits to remote unless commit policy set to `NOPUSH`.**
   - If push is not possible, report the blocker and preserve the local commit.
```

Renumber next ones to 9,10,11

and replace "7. **Commit.policy is BLOCKED:**" by

```md
7. **Commit.policy is MANUAL:**
   - The next commit to execute, per instructions, has policy set to `MANUAL`.
```

### Step 8: Commit

**Policy:** BLOCKED — commit will be executed but not pushed. It will be reviewed by humans before pushing.

Commit `change-commit-policy-options` with message:

```
build(domains): Render commits table and messages in plan iterations.

- Change Type: Commit Policy — CONTROLLED becomes NOPUSH and BLOCKED becomes NOCOMMIT.
- Add Type: Commit Status.
- Add `notes` field to Type: Commit.
- Update "Agent: Worker" to new commit policy names.
```

### Step 9: Upgrade operating-instructions.tart

Update `$DOMAINS/work/templates/operating-instructions.tart`:

a) Fix the example: "#### Verifying Completion" must be `###` (h3), not h4.

b) Upgrade all template syntax to use `::TEMPLATE` and `::EXAMPLE` directives (matching the pattern already used in the file).

c) Add conditional metadata rendering. Add at the top of the template:

```md
::TEMPLATE If `%render-metadata` is provided and TRUE, render the full metadata block (Purpose, Workflow, Definition, Source) under each operating instructions header. When `%render-metadata` is NOT provided or FALSE, render only the instructions prose concatenated under each ### Operating Instructions header without metadata fields.
```

When `render-metadata` is TRUE, the output includes:

```md
### Operating Instructions: {name}

**Purpose:** {purpose} Operation of `{workflow}` defined in `{definition}`.

**Instructions:** (From {source})

{instructions prose}
```

When `render-metadata` is FALSE (or omitted), the output includes:

```md
### Operating Instructions: {name}

{instructions prose}
```

### Step 10: Convert instructions.tart to ::TEMPLATE syntax

Update `$DOMAINS/plans/templates/instructions.tart`:

a) Start with the same first 3 directives as `$DOMAINS/plans/templates/plan.tart`:

```md
::TEMPLATE When rendering this template, every line not starting with `::TEMPLATE` or `::EXAMPLE` or not enclosed in a `::TEMPLATE/EXAMPLE` ... `::END` multi-line block should be interpreted as instructions for agents reading the rendered output and must be rendered by the rendering agent, replacing all placeholders with its value.

::TEMPLATE When encountering `::TEMPLATE::READ` treat this as an instruction for the agent rendering this template to read definitions, structures, and types of data being rendered and must not be included in the output.

::TEMPLATE When encountering `::READ` directives, treat them as an instruction for the agent reading the rendered file and include them verbatim in the output.
```

b) Remove `## Setup`, `## Step Verification`, and `## Verification` sections entirely.

c) Replace `## Final Verification` to keep only the sanity check and "Execute all Operating Instructions" — remove the hardcoded verification commands block.

d) Render Operating Instructions after Mandatory Reading section:

```md
::TEMPLATE With the `%work-item.operations` and `%work-item.operating-instructions` with `%render-metadata = FALSE` render the `$DOMAINS/work/templates/operating-instructions.tart` template.
```

e) Remove `## Setup` — render the setup steps as a flat series of steps inline.

f) Replace the `TEMPLATE DIRECTIVE: Include only if this is a multi-step prompt` block by rendering the iteration changes as a series of `### Step` sections with `##### Commit:` steps where the plan declares commits.

### Step 11: Update plan.tart operating instructions directive

Update `$DOMAINS/plans/templates/plan.tart` — change the operating instructions template reference to explicitly set `include-metadata`:

```md
::TEMPLATE With the `%work-item.operations` and `%work-item.operating-instructions` with `%render-metadata = TRUE` render the `$DOMAINS/work/templates/operating-instructions.tart` template.
```

### Step 12: Rename writing-commit-messages to writing-commit-message

a) Rename `$WORKSPACE/knowledge/conventions/writing-commit-messages.art` to `writing-commit-message.art`.

b) Update `_guide.md`:
- Line 14: change `writing-commit-messages.art` to `writing-commit-message.art` and "Writing Commit Messages" to "Writing Commit Message".
- Line 93: change heading `#### Operating Instructions: Writing Commit Messages` to `#### Operating Instructions: Writing Commit Message`.
- Line 101: change "Writing Commit Messages" to "Writing Commit Message".

c) Update all references in `$DOMAINS/work/workflows/planning-work/planning-work-item/writing-commit-messages/operation.art` directory — rename directory to `writing-commit-message/` and update any internal references.

### Step 13: Commit

**Policy:** NOPUSH — commit will be executed but not pushed.

Commit `operating-instructions-in-instructions-file` with message:

```
build(domains): Render Operating Instructions in instruction files.

- Upgrade operating-instructions.tart to ::TEMPLATE syntax, add conditional metadata rendering.
- Convert instructions.tart to ::TEMPLATE syntax, render Operating Instructions after Mandatory Reading.
- Flatten instruction steps, remove hardcoded Setup/Verification sections.
- Rename writing-commit-messages to writing-commit-message in _guide and conventions.
```

## Verifying

Execute from $WORKSPACE root:

```bash
npm run lint:fix # to fix formatting issues automatically
npm run lint # to report other formatting issues
```

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing this instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the **render-template** skill with the `$DOMAINS/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-{%plan.id}/instructions/{%iteration.id}__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Include an "Uncertain Matches" section in the report listing any files where you were unsure whether a match should be intervened — these were not changed.
6. Generate the response and send it back to the delegator.
7. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `%commit.id`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

Thank you for your service.
