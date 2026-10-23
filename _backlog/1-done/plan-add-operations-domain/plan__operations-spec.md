# Spec: Operations Domain

**Purpose:** model reusable operations, its distribution, discoverability, and selection.

**Description:** create new "Domain: Operations" with skills, routines, structures, types, templates, files, and a flat-file convention with placeholder defaults and project-side override.

**Boundaries:** operations are just classified instructions with placeholder defaults. The Operations domain knows about no other domain. Consumers depend on Operations; Operations depends on nothing. Guide sections are a closed list. Link-not-fragment: plans render full prose, instruction files render links.

## Path Variables

| Variable     | Resolved Path                | Purpose                                            |
| ------------ | ---------------------------- | -------------------------------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root directory; hosts the domain source. |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources under change.                     |
| `$SKILLS`    | `$WORKSPACE/.agents/skills`  | Agent modes and skills directory.                  |

## Context

**Use Case:** As an agent I want to discover and select only the operating instructions relevant to my current artefact and phase, without noise from unrelated workflows, and without copying generic instructions into every guide.

**Examples:**

- Example of noise: `Writing Commit Message` rendered into worker instruction files where commits are already authored.
- Example of blind spot: a routine in `$DOMAINS/` cannot contribute operating instructions unless a project guide links it.

## Definitions

### Definition: Operating Instruction

A reusable procedure for a specific workflow operation. Carries a `relevantFor` field so it can be selected for the consuming artefact. Operating instructions are selected, not accumulated — only matching instructions are rendered. See `Operating Instructions` for the collection.

### Definition: Operating Instructions

The collection of operating instructions applicable to a work item, composed from upstream, scope, and knowledge resources. Composed unconditionally during planning; only rendering is conditional on `relevantFor` matching.

### Definition: relevantFor

A field on `Operating Instruction` whose values are existing workflow and operation names. `Routine: Compose Operating Instructions` matches on it against the consuming artefact's workflows and operations, so only matching instructions are returned. Example: `Writing Commit Message` declares `relevantFor: [Planning Work, Writing Commit Message]` and is filtered out of execution-phase artefacts.

### Definition: Consuming Context

The set of workflows and operations of the artefact consuming the operating instructions. Passed to the operating-instructions template so it can select only matching instructions. Plans pass planning-phase operations; instruction files pass execution-phase operations.

### Definition: Flat-File Convention

One `art/operating-instructions.md` per package, with one `## Operating Instructions: {Operation}` fragment per operation. Each fragment carries placeholder defaults and a project-side override mechanism (e.g. `**CommandList**`) so the guide can supply project-specific commands without copying the whole fragment.

### Definition: Override

A project-side customization of a published operating-instruction fragment, supplied via an override mechanism (e.g. `**CommandList**`) in the guide's `### Operating Instructions: {Operation}` declaration. The published default renders first; the override replaces the placeholder block. No per-project copies to maintain.

## Skill

### Skill: Operations

`operations` skill, allowed to ALL agents. Provides a command to register operating instructions on an artefact.

- command `add {operation} instructions to {artefact}` — inputs `%instructions` (Identifier or NaturalExpression — can be a package, a specific path, or instructions derived from context), `%artefact` (Path or NaturalExpression — where to add the instructions, e.g. "the guide's Operating Instructions section"); invokes Routine: Register Operating Instructions capturing its outputs; the command composes the session-chat response.

## Routines

### All Routines

1. **Compose Operating Instructions** — compose and filter by `relevantFor`. Internal: invoked by plan and milestone lifecycle commands.
2. **Read Work Guides** — scan guides for knowledge resources. Internal: invoked by `Compose Operating Instructions`.
3. **Compose Work Operations** — enumerate operations across all workflows. Internal: invoked by plans to declare which operations are in scope.
4. **Register Operating Instructions** — register operating instructions on an artefact. **Exposed in the skill** (see below).

### Routines Exposed in the Skill

Only `Register Operating Instructions` is exposed as a skill command. The other three are internal routines invoked by plan/milestone lifecycle commands and by `Register Operating Instructions` itself.

### Routine: Compose Operating Instructions

- input: `%workflows`, `%upstream`, `%scope`, `%knowledge`, `%mode`, `%consuming-context` (workflows and operations of the artefact being rendered)
- output: `%operating-instructions` — only instructions whose `relevantFor` matches `%consuming-context`
- populate `relevantFor` on each instruction from the source; match on it against `%consuming-context`; do not render non-matching instructions

### Routine: Read Work Guides

- input: `%entry-point` (guide or knowledge resource)
- output: `%knowledge` — full list of knowledge resources
- scans exactly five section names: Recommended Reading, Records Management, Knowledge, Workflows, Conventions (closed list)

### Routine: Compose Work Operations

- input: `%workflows`
- output: `%operations` — union of operations across all `%workflows`
- used by plans to declare which operations are in scope

### Routine: Register Operating Instructions

- input: `%instructions` (Identifier or NaturalExpression — can be a package, a specific path, or instructions derived from context), `%artefact` (Path or NaturalExpression — where to add the instructions, e.g. "the guide's Operating Instructions section")
- output: the updated artefact with operating instructions registered
- resolve the instructions source; read the artefact; add or merge the operating instructions section; apply any project-side override via `**CommandList**` or equivalent
- if the artefact already carries operating instructions for the same operation, merge (deduplicate, compress) rather than duplicate

## Structures

### Structure: Operation

- shape: name, workflow, definition
- `workflow` — the workflow this operation belongs to; provides the vocabulary for `relevantFor` values
- `definition` — path to the operation's `operation.art` file

## Types

### Type: Operating Instruction

- shape: name, workflow, operation, instructions, source, definition, relevantFor
- `relevantFor` — list of workflow and operation names (reusing the `workflow` field's vocabulary); controls whether this instruction is rendered for a given consuming artefact
- `instructions` — the procedure text or a link to it
- `source` — where the instruction was discovered (guide, package, domain)

## Templates

### Template: Operating Instructions

Renders operating instructions for a consuming artefact. Accepts a consuming-context input (the artefact's workflows and operations) and renders only instructions whose `relevantFor` matches. Owns `%render-metadata`. When `%render-metadata = TRUE` (plans), renders full prose; when `FALSE` (instruction files), renders links only.

## Files

### File: Operating Instructions (flat file)

Naming pattern `art/operating-instructions.md` per package. One `## Operating Instructions: {Operation}` fragment per operation. Each fragment carries placeholder defaults (`%command-list`, `%setup-commands`) and a project-side override mechanism (e.g. `**CommandList**`). When a guide links the package, it renders the published default, then applies any project-side override via `**CommandList**`.

## Integration

All changes required to other domains during integration:

### Work Domain

- Move `Type: Operating Instructions`, `Structure: Operation`, routines (`compose-operating-instructions`, `read-work-guides`, `compose-work-operations`), and template (`operating-instructions.tart`) from `$DOMAINS/work/` to `$DOMAINS/operations/`.
- Update `$DOMAINS/work/index.md` — remove migrated resources from Work domain listings.
- Update all `$DOMAINS/work/...` references to `$DOMAINS/operations/...`.

### Plans Domain

- Update `$DOMAINS/plans/templates/plan.tart` — pass consuming context to the operating-instructions template; render only matching instructions.
- Update `$DOMAINS/plans/templates/instructions.tart` — pass consuming context; render only matching instructions.
- Update `$DOMAINS/plans/index.md` and `$DOMAINS/plans/structures/plan.art` — consume from `$DOMAINS/operations/`.

### Whiteboards Domain

- Update `$DOMAINS/whiteboards/templates/whiteboard.tart` — consume from `$DOMAINS/operations/`.
- Update `$DOMAINS/whiteboards/index.md` — consume from `$DOMAINS/operations/`.

### Guides Domain

- Project guides register operating instructions via the flat-file convention: a `### Operating Instructions: {Operation}` declaration with a link to the package's `art/operating-instructions.md` and an optional project-side override (e.g. `**CommandList**`).
- The guide's own project-specific instructions remain inlined.
- `read-work-guides` scans exactly five section names: Recommended Reading, Records Management, Knowledge, Workflows, Conventions (closed list).

### Workspace-Tooling Package

- Create `@noodlestan/tooling-art` package in `noodlestan/workspace-tooling` holding default command lists (Setting Up, Verifying Step, Verifying Completion) with placeholder defaults, overridable in project/package `_guide`.
- Package file: `art/operating-instructions.md` with one fragment per operation.

### Domains Index

- Add `Domain: Operations` to `$DOMAINS/index.md`.

## Conventions

Review criteria — applied bottom-up to every resource in the final review pass:

- verify `::READ` directives reference all resources used in file
- verify routine format follows standards with clear inputs/output
- verify routines do not directly write to files
- verify routines always return something
- verify examples in routines, structures and templates do not carry assumptions that operations are about plans — plans can only be used as an example
- trickling all changes up to routine invocation format in skill commands — includes routine call preceded by `::READ`
- finally to domain.art summary and domain index.md, topping up with domains/index.md
- verify `relevantFor` values are existing workflow/operation names — no free-text
- verify `compose-operating-instructions` matches on `relevantFor` against the consuming context
- verify both renderers (`plan.tart` with `%render-metadata = TRUE`, `instructions.tart` with `FALSE`) carry links, not fragments, where applicable
- verify the flat-file convention: one `art/operating-instructions.md` per package, placeholder defaults, project-side override mechanism (e.g. `**CommandList**`)
- verify guide sections scanned are exactly: Recommended Reading, Records Management, Knowledge, Workflows, Conventions (closed list)
