# Instructions: `update-write-work-skills`

**Plan:** `workflows-make-work-flow`

**Iteration Id:** `update-write-work-skills`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute this instruction. Your mode must be `worker` before you start changing files.

These are your instructions. They include a section at the end on how to report back to requester.

- RULE: If at any point you are instructed to **REPORT A BLOCKER** execute the instruction in the "## How to Report Back" section and STOP processing any other instructions.

## Path Variables

| Variable     | Resolved Path                | Purpose                     |
| ------------ | ---------------------------- | --------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root directory.   |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources directory. |
| `$SKILLS`    | `$WORKSPACE/.agents/skills`  | Skills resources directory. |

## Working Agreements

The plan workflow runs on three working agreements:

1. This instruction is self-contained. Use this file and its mandatory reading; do not rely on session memory.
2. The report is self-contained and must contain evidence, changes, verification, blockers, and feedback.
3. Keep the final chat report terse; the report file carries the full trail.

## Goals

Extract common routines from write-plan and write-milestone skills to the work domain, and update the skills to load these routines via `::READ` directives. This makes the routines reusable across writing skills and keeps the skills as thin semantic layers.

## Mandatory Reading

- `$SKILLS/write-plan/SKILL.md` — Current write-plan skill to update.
- `$SKILLS/write-milestone/SKILL.md` — Current write-milestone skill to update.
- `$DOMAINS/work/structures/work-item-abstract.art` — Work item structure.
- `$DOMAINS/work/structures/workflow.art` — Workflow structure.
- `$DOMAINS/work/structures/operation.art` — Operation structure.
- `$DOMAINS/work/types/operating-instructions.art` — Operating Instructions type.

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

## Setting Up

From `$WORKSPACE/`:

```bash
npm ci # to install dependencies.
```

## Changes

### Step 1: Extract routines from write-plan skill to work domain

Create the following routine files in `$DOMAINS/work/routines/`:

#### 1.1 Create `$DOMAINS/work/routines/compose-work-scope.art`

````art
# Module

## Uses

::READ (Type: Work Scope Resource) FROM `$DOMAINS/work/types/work-scope-resource.art`
::READ (Type: Path Ref) FROM `$DOMAINS/primitives/types/path-ref.art`

## Routine: Compose Work Scope

**Purpose:** Identify and compose the work scope (resource records) from the current working environment.

**Inputs:**

- `%maybe-scope` — (optional) explicit scope provided by user in natural language or taken from an existing scope record.
- `%mode` — One of `interactive` or `autonomous`. Defaults to `autonomous`.

**Outputs:**

- `%scope` — List(Type: Work Scope Resource). Resources involved in the work, both existing and planned.

**Steps:**

1. If the provided `%maybe-scope` is not yet sufficiently defined:
   1. With `%maybe-scope` as the `%entry-point`, execute the **Routine: Reading Guides** to identify a `#reading-list`.
   2. With each entry in `#reading-list`, evaluate whether it might contain the relevant resources.
2. Identify `%resources` unambiguously. Examples: "Package: Artificial Parser", "Application: Demo App".
3. For each `%resource`, compose a `%scope-item` — Type: Work Scope Resource — identifying:
   - `kind` — Example: "Package".
   - `resource` — Example: "Artificial Parser".
   - `record` — File location. Example: `_records/package.art`.
   - `role` — Why the resource is involved in the work scope.
   - `partial` — Record of relevant details.
   - `changes` — Summary of changes to execute within the resource.
   - `operations` — Summary of operations to execute in the resource.
   - `dependencies` — Changes to other resources required before changes in this resource can be executed.
4. When the `%scope-item.record` already exists, populate `%scope-item.partial` with the fields relevant to the work item.
5. When the resource is planned, include as much information as possible.
6. Compose the `%scope` from all the populated `%scope-item`.
7. Return `%scope`.
````

#### 1.2 Create `$DOMAINS/work/routines/compose-work-context.art`

````art
# Module

## Uses

::READ (Type: Upstream Work Context) FROM `$DOMAINS/work/types/upstream-work-context.art`
::READ (Type: Knowledge Context) FROM `$DOMAINS/work/types/knowledge-context.art`
::READ (Type: Skill Context) FROM `$DOMAINS/work/types/skill-context.art`

## Routine: Compose Work Context

**Purpose:** Compose the work context including upstream sources, knowledge, and required skills.

**Inputs:**

- `%work-item` — Structure: Work Item (Abstract). The work item being planned.

**Outputs:**

- `%context.upstream` — List(Type: Upstream Work Context). Upstream sources of work.
- `%context.knowledge` — List(Type: Knowledge Context). Knowledge required for different workflow stages.
- `%context.required-skills` — List(Type: Skill Context). Skills required for different workflow stages.

**Steps:**

1. Identify `%upstream-sources` from the work item's dependencies and references.
2. For each `%source`, compose a `%upstream-context` — Type: Upstream Work Context — with:
   - `kind` — The kind of upstream source. Example: "Parking Lot", "Architecture Briefing".
   - `path` — Path to the upstream source.
   - `role` — How this source influences the work item.
3. Identify `%knowledge-resources` from the work item's scope and workflows.
4. For each `%resource`, compose a `%knowledge-context` — Type: Knowledge Context — with:
   - `kind` — The kind of knowledge resource. Example: "Guide", "ADR".
   - `path` — Path to the knowledge resource.
   - `stages` — Workflow stages where this knowledge is relevant.
   - `purpose` — Why this knowledge is relevant.
5. Identify `%required-skills` from the work item's workflows and stages.
6. For each `%skill`, compose a `%skill-context` — Type: Skill Context — with:
   - `skill.id` — The skill identifier.
   - `path` — Path to the skill definition.
   - `stages` — Workflow stages where this skill is required.
   - `purpose` — Why this skill is required.
7. Return `%context.upstream`, `%context.knowledge`, `%context.required-skills`.
````

#### 1.3 Create `$DOMAINS/work/routines/compose-work-operations.art`

````art
# Module

## Uses

::READ (Structure: Workflow) FROM `$DOMAINS/work/structures/workflow.art`
::READ (Structure: Workflow Stage) FROM `$DOMAINS/work/structures/workflow-stage.art`
::READ (Structure: Operation) FROM `$DOMAINS/work/structures/operation.art`
::READ (Type: Operating Instructions) FROM `$DOMAINS/work/types/operating-instructions.art`

## Routine: Compose Work Operations

**Purpose:** Scan workflows for work operations executed with each stage.

**Inputs:**

- `%workflows` — List(Structure: Workflow). All workflows involved in the work item.

**Outputs:**

- `%operations` — List(Structure: Operation). Discovered operations.

**Steps:**

1. Prepare a list of `%operations`.
2. With each `%workflow` (Structure: Workflow) in `%workflows` scan its record for `%workflow.stages`.
3. With each `%stage` (Structure: Workflow Stage) in `%workflow.stages`, add all `%stage.operations` into the `%operations` list.
4. For each `%operation` listed in `%operations` make sure it identifies the owning `workflow` and `stage`.
5. Return list of Structure: Operation.
````

#### 1.4 Create `$DOMAINS/work/routines/compose-operating-instructions.art`

````art
# Module

## Uses

::READ (Type: Knowledge Context) FROM `$DOMAINS/work/types/knowledge-context.art`
::READ (Type: Work Scope Resource) FROM `$DOMAINS/work/types/work-scope-resource.art`
::READ (Type: Operating Instructions) FROM `$DOMAINS/work/types/operating-instructions.art`

## Routine: Compose Operating Instructions

**Purpose:** Scan knowledge and scope resources for operating instructions.

**Inputs:**

- `%work-item` — Structure: Work Item (Abstract). Containing:
  - `.workflows` — List(Structure: Workflow). All workflows involved in the work item.
  - `.scope` — List(Type: Work Scope Resource). Resources involved in the work.
  - `.context.knowledge` — List(Type: Knowledge Context). Knowledge required for different workflow stages.

**Outputs:**

- `%operating-instructions` — List(Type: Operating Instructions). Discovered operating instructions.

**Steps:**

1. With the `%work-item.workflows` execute **Routine: Compose Work Operations** to identify all `%operations`.
2. With each `%operation` scan `%work-item.context.knowledge` for `%knowledge` that is relevant for the `%stage`.
3. With each `%knowledge` scan their artefacts for matching operational instructions. Examples: `## Operating Instructions: Verifying`.
4. With each operating instruction, scan `%work-item.scope` resources for matching sections. Examples: `## Building`.
5. Return deduplicated list of Type: Operating Instructions.
````

### Step 2: Update write-plan skill

Update `$SKILLS/write-plan/SKILL.md` to:

1. Add `::READ` directives for the new routines at the top of the file.
2. Keep the following routines inline in the skill:
   - **Routine: Writing Instructions File** — Generates the instructions file from iteration and plan context.
   - **Routine: Create OR Update Plan** — Thin semantic layer that orchestrates the plan creation/update.
3. Update other routines to load via `::READ` directives and execute with `::With .. execute the **Routine: ...**` pattern.

**Example of how routines are loaded:**

````art
## Mandatory Reading

::READ `$DOMAINS/work/routines/compose-work-scope.art` — Routine for composing work scope.
::READ `$DOMAINS/work/routines/compose-work-context.art` — Routine for composing work context.
::READ `$DOMAINS/work/routines/compose-work-operations.art` — Routine for composing work operations.
::READ `$DOMAINS/work/routines/compose-operating-instructions.art` — Routine for composing operating instructions.
````

**Example of how routines are called:**

````art
5. ::READ `$DOMAINS/work/routines/compose-work-scope.art` to load the routine.
6. ::With `%maybe-scope` and `%mode`, execute the **Routine: Compose Work Scope** to identify `%scope`.
````

### Step 3: Update write-milestone skill

Update `$SKILLS/write-milestone/SKILL.md` to:

1. Add `::READ` directives for the same routines as write-plan.
2. Keep only the **Routine: Create OR Update Milestone** inline as a thin semantic layer.
3. The milestone skill should be a copy of write-plan with the thin wrapper "Create or Update Milestone" only.
4. No instructions file routine for milestones (phases will be added later).

### Step 4: Update work domain index

Update `$DOMAINS/work/index.md` to add a new Routines section listing all the new routines.

## Verifying

Execute from $WORKSPACE root:

```bash
npm run lint:fix # to fix formatting issues automatically
npm run lint # to report other formatting issues
```

## How to Report Back

Render `$DOMAINS/plans/templates/instructions-report.tart` to produce the report. Write it next to this instruction file as `update-write-work-skills__report.md`.
