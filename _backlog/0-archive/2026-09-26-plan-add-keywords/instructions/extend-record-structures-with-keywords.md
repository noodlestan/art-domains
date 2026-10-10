# Instructions: `extend-record-structures-with-keywords`

**Plan:** `add-keywords`

**Iteration Id:** `extend-record-structures-with-keywords`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-keywords/instructions/extend-record-structures-with-keywords__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `extend-record-structures-with-keywords`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

This section lists the path variables used in this instruction file. All file references in this instructions file MUST use these variables — never bare filesystem paths.

| Variable     | Resolved Path                | Purpose                                               |
| ------------ | ---------------------------- | ----------------------------------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace meta-repository hosting the domain sources. |
| `$PROJECT`   | `checkouts/art-domains`      | Art Domains project, owner of this plan.              |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain sources changed by this iteration.             |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `extend-record-structures-with-keywords`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Declare the `keywords` field on the Project and Package record structures, with type, propagation semantics, and rendered examples, so that every repository in the keyword rollout can carry its own keywords.

## Mandatory Reading

This section lists the documentation and reference files the sub-agent needs to read before making changes.

::READ `$WORKSPACE/_guide.md` (Guide) — Defines the workspace layout, path variables, and how the domain sources are tracked. Relevant for Setting up and Verifying Completion.

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Plan record fields and statuses. Relevant for reporting the iteration outcome.

::READ `$DOMAINS/projects/structures/project.art` (Structure) — The primary target of this iteration. Relevant for every step.

::READ `$DOMAINS/packages/structures/package.art` (Structure) — The secondary target of this iteration. Relevant for every step.

::READ `$DOMAINS/projects/types/license.art` (Type) — Read to confirm the `License` type is unrelated to `keywords` and must not be touched. Relevant for avoiding scope creep.

::READ `$PROJECT/_records/project.art` (Record) — An existing `Structure: Project` record, read as the reference for how a field renders in practice. Relevant for Step 1.

::READ `$PROJECT/_records/license.art` (Record) — Read to confirm no license field depends on the new `keywords` field. Relevant for avoiding scope creep.

::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` (Conventions) — Allowed commit types, scopes, and message format. Relevant for the commit step.

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

---

## Operating Instructions

### Setting Up

**Purpose:** Prepare the execution environment. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/setting-up/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
npm run ci # to verify the workspace baseline is green before starting.
```

If any of these fail, resolve the issue before proceeding with implementation.

### Writing Commit Message

**Purpose:** Write standardized message according to context conventions. Operation of Workflow: Planning Work, defined in `$DOMAINS/work/workflows/planning-work/writing-commit-message/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

1. Read commit message conventions from `$WORKSPACE/knowledge/conventions/writing-commit-message.art`.
2. Write the message following: the rules defined there.

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm run lint:fix # to fix formatting issues automatically
npm run lint # to report other issues (prettier, eslint, tsc --noEmit)
```

All steps MUST pass.

---

## Changes

This section summarises the changes to be made in this iteration.

- Step 1 / 5 — Declare `keywords` on `Structure: Project`
- Step 2 / 5 — Extend the `Project: Purrfect` example with `Keywords`
- Step 3 / 5 — Declare `keywords` on `Structure: Package`
- Step 4 / 5 — Extend the `Package: Workspace CLI` example with `Keywords`
- Step 5 / 5 — Commit `extend-record-structures-with-keywords`

## Steps

This section contains the detailed steps to execute, including commit steps.

### Step `1 / 5` — Declare `keywords` on `Structure: Project`

Open `$DOMAINS/projects/structures/project.art` and add one bullet to the `**Shape:**` list.

Insert the new bullet between the `resources` bullet and the `private` bullet, matching the surrounding formatting exactly: a `-` bullet, a backticked field name, an em dash, the type, and a description.

```md
- `keywords` — List (Identifier). Lowercase kebab-case discovery keywords describing the project, propagated to the project README. Example: `artificial-intelligence`, `domain-driven-design`, `structured-data`.
```

RULE: Do not renumber, reorder, or reword any existing `**Shape:**` bullet.

RULE: Do not add a `**Keywords:**` field to this structure file. Structures declare fields; only the example record below renders them.

### Step `2 / 5` — Extend the `Project: Purrfect` example with `Keywords`

In the same file, inside the `**Example:**` fenced code block, add a `**Keywords:**` field to the `## Project: Purrfect` record.

Insert it between the `**Resources:**` list and the `**Private:**` field, so the example renders the field in the position declared in Step 1.

```md
**Keywords:**

- artificial-intelligence
- agentic
- knowledge-management
- domain-driven-design
- structured-data
- templates
- workflows
- cli
- tooling
- workspaces
- records

**Private:** `true`
```

RULE: The fenced code block content is documentation, not a live record. Do not escape or annotate the bullets.

RULE: Do not modify the `**License.Short**` and `**License.Long**` fields, the `**Purpose**`, or the `**Description**` of the example.

### Step `3 / 5` — Declare `keywords` on `Structure: Package`

Open `$DOMAINS/packages/structures/package.art` and add one bullet to the `**Shape:**` list.

Insert it between the `private` bullet and the `deployment` bullet, keeping the same formatting as the neighbouring bullets.

```md
- `keywords` — List (Identifier). Lowercase kebab-case discovery keywords describing the package, projected to the `keywords` key of the package manifest. Example: `art-domains`, `agentic`, `knowledge-management`.
```

RULE: Do not renumber, reorder, or reword any existing `**Shape:**` bullet.

RULE: Do not add a `**Keywords:**` field to this structure file. Structures declare fields; only the example record below renders them.

### Step `4 / 5` — Extend the `Package: Workspace CLI` example with `Keywords`

In the same file, inside the `**Example:**` fenced code block, add a `**Keywords:**` field to the `## Package: Workspace CLI` record.

Insert it between the `**Private:**` field and the `**Deployment:**` field, so the example renders the field in the position declared in Step 3.

```md
**Private:** `false`

**Keywords:**

- art-domains
- agentic
- knowledge-management
- workspace-tooling
- cli
- developer-tools

**Deployment:** Npm Package Deployment: Workspace CLI
```

RULE: Leave `$DOMAINS/projects/index.md` and `$DOMAINS/packages/index.md` unchanged. Neither enumerates structure fields, so no index edit is required.

RULE: Do not modify `$PROJECT/_records/project.art`, `$PROJECT/README.md`, or any other file in the Art Domains checkout. Those belong to the next iteration.

Expected outcome: `$DOMAINS/projects/structures/project.art` and `$DOMAINS/packages/structures/package.art` each declare a `keywords` field and each render it in their embedded example, with no other change to either file.

---

#### Commit: `extend-record-structures-with-keywords`

**Policy:** AUTONOMOUS — Agent should commit autonomously, push, and proceed to the next step.

**Message:**

```
build(art-domains): add `keywords` to project and package record structures.

- Declare `keywords` on `Structure: Project` and `Structure: Package`, with examples.
- Document the projection of package `keywords` to the manifest `keywords` key.
```

RULE: Commit from the `$WORKSPACE` root on branch `main`, and stage only the two structure files listed above.

RULE: The commit message MUST be used verbatim. Do not add, remove, or reword any line.

---

## Final Verification

This section describes how to confirm the iteration is completed and ready for being committed.

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify that `$DOMAINS/projects/structures/project.art` declares `keywords` in its `**Shape:**` list, positioned between `resources` and `private`.
- Verify that `$DOMAINS/packages/structures/package.art` declares `keywords` in its `**Shape:**` list, positioned between `private` and `deployment`, and that the description mentions the `keywords` key of the package manifest.
- Verify that both embedded examples render a `**Keywords:**` field, in the same position as the declaration.
- Verify that no file outside `$DOMAINS/projects/structures/project.art` and `$DOMAINS/packages/structures/package.art` was modified.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
