# Instructions: `add-work-operations`

**Plan:** `workflows-make-work-flow`

**Iteration Id:** `add-work-operations`

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

Model operations and their properties through types, make them discoverable through a routine, and express them in the work item (abstract). This lays the foundation for the next iteration which will rewrite all writing skills.

## Mandatory Reading

- `$DOMAINS/work/structures/workflow.art` — Current workflow structure to extend.
- `$DOMAINS/work/structures/work-item-abstract.art` — Current work item to extend.
- `$DOMAINS/work/types/workflow-stage.art` — Current workflow stage type.
- `$DOMAINS/commits/types/commit.art` — Commit type with new fields.

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

## Setting Up

From `$WORKSPACE/`:

```bash
npm ci # to install dependencies.
```

## Changes

### Step: Add "Structure: Operation"

Create `$DOMAINS/work/structures/operation.art`:

````art
# Module

## Uses

::READ (Structure: Resource (Abstract)) FROM `$DOMAINS/_artificials/structures/resource-abstract.art`

## Structure: Operation

**Purpose:** Describes an operation executed within a workflow stage.

**Description:** An operation is a named activity that can be discovered from workflow stage records and authored in work scope resources and knowledge resources as Operating Instrutions.

**Extends:** Structure: Resource (Abstract)

**Inherits:**

- `name` — Identifier. Operation name. Example: `Operation: Writing Commit Messages`.

**Shape:**

- `workflow` — Structure: Workflow. The workflow this stage belongs to. Example: `Workflow: Planning Work`.
- `stage` — Structure: Workflow Stage. The stage this operation belongs to. Example: `Workflow Stage: Writing Work Item`.
- `purpose` — NaturalBlock. Example: "Write the commit message while work item is being authored.".
- `example` — NaturalBlock. Example of this operation in context. Example: "Run from the repository root: ```bash ... ```".
````

### Step: Convert "Type: Workflow Stage" to "Structure: Workflow Stage" and add `operations`

Rename from `$DOMAINS/work/types/workflow-stage.art` to `$DOMAINS/work/structures/structures/workflow-stage.art`

Add

```art
- `operations` — List(Structure: Operation). Operations discoverable in this workflow. Each operation belongs to a stage and contains instructions and examples.
```

### Step: Add "Type: Operating Instructions"

Create `$DOMAINS/work/types/operating-instructions.art`:

```art
# Module

## Type: Operating Instructions

**Purpose:** Declare operations in work scope resources and knowledge resources.

**Description:** When a routine scans knowledge and scope resources for operations, it produces Operating Instructions records that link the operation to the specific resource where it was found.

**Primitive:** Record

**Shape:**

- `name` — Identifier. Example: `setting-up`.
- `workflow` — Structure: Workflow. The workflow that owns this operation. Example: "Workflow: Executing Work".
- `stage` — Type: Workflow Stage. The stage this operation belongs to. Example: "Workflow Stage: Preparing Execution".
- `source` — Path. Where this operating instruction is declared. Example: `$PROJECT/_guide.md` or `$DOMAINS/deployments/structures/deployment-build.art`.
- `instructions` — NaturalBlock. The actual instructions for this instance. Example: "Run from the repository root: `npm ci`".
```

### Step: Extend "Structure: Work Item (Abstract)"

Add to `$DOMAINS/work/structures/work-item-abstract.art`:

```art
- `operating-instructions` — List(Type: Operating Instructions). Operating instructions discovered from knowledge and scope resources relevant to this work item.
```

### Step: Refactor Workflows nesting stages and ops

Update all workflow records and extract them to its own directory, extracting and completing the stages and operations in nested directories inside. Example `work/workflows/executing-work/worfklow.art` and nested stages and operations.

- `$DOMAINS/work/workflows/executing-work/workflow.art` (serves as reference for others)
- `$DOMAINS/work/workflows/delegating-work.art`
- `$DOMAINS/work/workflows/planing-work.art`
- `$DOMAINS/deployments/workflows/deploying.art`
- `$DOMAINS/roadmaps/workflows/roadmapping.art`


### Step: Add "Routine: Compose Work Operations"

Create `$DOMAINS/work/routines/compose-work-operations.art`:

```art
# Module

## Routine: Compose Work Operations

**Purpose:** Scan workflows for work operations executed with each stage.

**Inputs:**

- `workflows` — List(Structure: Workflow). All workflows involved in the work item. Examples: "Workflow: Planning Work", "Workflow: Executing Work".

**Outputs:**

- `%operations` — List(Structure: Operation). Discovered operations.

**Steps:**

1. With each `%workflow` (Structure: Workflow) in `%work-item.workflows` scan its record for `%workflow.stages`.
1. With each `%stage` (Type: Workflow Stage) in `%workflow.stages`, collect the `%stage.operations`.
1. With each `%operation` (Type: Operation) scan `%work-item.context.knowledge` (Type: Knowledge Context) for `%kwowledge` that is relevant for the `%stage`. Example: "Workflow Stage: Preparing Execution" of "Workflow: Planning Work".
1. With each `%knowledge` scan their artefacts for matching operational instructions. Examples: `## Operating Instructions: Verifying`, `## Operating Instructions: Verifying`.
3. With each operating instruction, scan `%work-item.scope` resources for matching sections Examples: `## Building`.
4. Return deduplicated list of Type: Operating Instructions.
```

````
Example of resource extracted:

```md
- name: `setting-up`
- workflow: `Workflow: Implementing`
- stage: `Setting Up`
- source: `$PROJECT/_guide.md`
````

### Step: Add "Routine: Compose Operating Instructions"

Create `$DOMAINS/work/routines/compose-operating-instructions.art`:

```art
# Module

## Routine: Compose Operating Instructions

**Purpose:** Scan knowledge and scope resources for operating instructions.

**Inputs:**

- `%work-item` — Structure: Work Item (Abstract). Containing:
  - `.workflows` — List(Structure: Workflow). All workflows involved in the work item. Examples: "Workflow: Planning Work", "Workflow: Executing Work".
  - `.scope` — List(Type: Work Scope Item (Abstract)). Resources involved in the work, both existing and planned. Examples: "Project Scope: ...", "Repository Scope: ...".
  - `.context.knowledge` — List(Type: Knowledge Context). Knowledge required for the different workflow stages. Examples: "ADR: ... for Planning", "Guide: ... for Verifying".

**Outputs:**

- `%operating-instructions` — List(Type: Operating Instructions). Discovered operating instructions.

**Steps:**

1. With each `%workflow` (Structure: Workflow) in `%work-item.workflows` scan its record for `%workflow.stages`.
1. With each `%stage` (Type: Workflow Stage) in `%workflow.stages`, collect the `%stage.operations`.
1. With each `%operation` (Type: Operation) scan `%work-item.context.knowledge` (Type: Knowledge Context) for `%kwowledge` that is relevant for the `%stage`. Example: "Workflow Stage: Setting Up" of "Workflow: Planning Work".
1. With each `%knowledge` scan their artefacts for matching operational instructions. Examples: `## Operating Instructions: Verifying`, `## Operating Instructions: Verifying`.
3. With each operating instruction, scan `%work-item.scope` resources for matching sections Examples: `## Building`.
4. Return deduplicated list of Type: Operating Instructions.
```

````
Example of resource extracted:

```md
- name: `setting-up`
- workflow: `Workflow: Implementing`
- stage: `Setting Up`
- source: `$PROJECT/_guide.md`
````

## Verifying

Run from `$WORKSPACE` root:

```bash
npm run lint:fix # to fix formatting issues automatically
npm run lint # to report other formatting issues
```
## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

TEMPLATE DIRECTIVE: This section is mandatory.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the **render-template** skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-%plan.id/instructions/%iteration.id__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `%iteration.id`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

Thank you for your service.
