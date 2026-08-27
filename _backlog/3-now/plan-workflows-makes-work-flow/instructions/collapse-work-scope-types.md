# Instructions: `collapse-work-scope-types`

**Plan:** `workflows-make-work-flow`

**Iteration Id:** `collapse-work-scope-types`

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

Simplify work scope types by removing concrete scope types and making the abstract type carry a partial of the resource record. This makes work item scope easier to update and domains easier to maintain.

## Mandatory Reading

- `$DOMAINS/work/structures/work-item-abstract.art` — Current work item structure to update.
- `$DOMAINS/work/types/work-scope-item-abstract.art` — Current scope type to rename and extend.
- `$DOMAINS/projects/types/project-scope.art` — Concrete scope type to remove.
- `$DOMAINS/packages/types/package-scope.art` — Concrete scope type to remove.
- `$DOMAINS/repositories/types/repository-scope.art` — Concrete scope type to remove.
- `$DOMAINS/deployments/types/deployment-scope.art` — Concrete scope type to remove.
- `$DOMAINS/applications/types/application-scope.art` — Concrete scope type to remove.

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

## Setting Up

From `$WORKSPACE/`:

```bash
npm ci # to install dependencies.
```

## Changes

### Step: Rename Type: Work Scope Item (Abstract) to Type: Work Scope Resource

Rename `$DOMAINS/work/types/work-scope-item-abstract.art` to `$DOMAINS/work/types/work-scope-resource.art`.

Update the content:

````art
# Module

## Type: Work Scope Resource

**Purpose:** Describe one scoped resource participating in a work item and identify dependencies.

**Description:** Includes only dependencies not reflected by work items. Includes dependencies on changes to resources only, i.e., does not include dependencies on resource names, generic stages, phases, or steps.

**Shape:**

- `kind` — ResourceKind. The kind of the scoped resource. Examples: "Project", "Package", "Repository", "Deployment", "Application".
- `resource` — ResourceName. Full name of the scoped resource, including the `{Kind}: ` prefix. Example: "Package: Art JS Parser".
- `path` — Path. Location of the resource (relative to a path variable, when applicable). Example: `$ART_JS/libs/parser/`.
- `record` — Path. Location of the resource record. Example: `$ART_JS/libs/parser/_records/package.art`.
- `owner` — ResourceName. Full name of the resource that owns this scope resource, when applicable. Example: "Project: Art JS".
- `role` — NaturalExpression. Why the resource is involved in the work scope and/or how it contributes to the work item. Examples: "Changes required", "Deployment required".
- `changes` — List(NaturalBlock). Bullet point list summary of changes to execute within the scope.
- `dependencies` — List(NaturalExpression). Describe changes to other resources required before changes in this resource can be executed. Example: "`ADR: Fixture Based Testing` not marked as ADOPTED, blocks refinement of new constructs.".
- `partial` — NaturalBlock. A partial of the resource record, carrying only the fields relevant to the work item. Example: "**Version:** 0.1.0" for a package scope.
````

### Step: Remove concrete scope types

Delete the following files:
- `$DOMAINS/projects/types/project-scope.art`
- `$DOMAINS/packages/types/package-scope.art`
- `$DOMAINS/repositories/types/repository-scope.art`
- `$DOMAINS/deployments/types/deployment-scope.art`
- `$DOMAINS/applications/types/application-scope.art`

### Step: Update work-item-abstract.art

Update `$DOMAINS/work/structures/work-item-abstract.art`:

1. Change the `::READ` directive from `Type: Work Scope Item (Abstract)` to `Type: Work Scope Resource`
2. Update the `scope` field type from `List(Type: Work Scope Item (Abstract))` to `List(Type: Work Scope Resource)`

### Step: Update domain indexes

Update the following domain indexes to remove references to concrete scope types:
- `$DOMAINS/projects/index.md` — Remove Type: Project Scope
- `$DOMAINS/packages/index.md` — Remove Type: Package Scope
- `$DOMAINS/repositories/index.md` — Remove Type: Repository Scope
- `$DOMAINS/deployments/index.md` — Remove Type: Deployment Scope
- `$DOMAINS/applications/index.md` — Remove Type: Application Scope

### Step: Update templates

Update templates that reference scope types:
- `$DOMAINS/work/templates/work-item-context.tart` — Update scope type references
- `$DOMAINS/plans/templates/plan.tart` — Update scope type references
- `$DOMAINS/roadmaps/templates/milestone.tart` — Update scope type references

## Verifying

Execute from $WORKSPACE root:

```bash
npm run lint:fix # to fix formatting issues automatically
npm run lint # to report other formatting issues
```

## How to Report Back

Render `$DOMAINS/plans/templates/instructions-report.tart` to produce the report. Write it next to this instruction file as `collapse-work-scope-types__report.md`.
