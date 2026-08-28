# Plan: Workflows Make Work Flow

**Id:** `workflows-make-work-flow`

**Status:** `PLANNING`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Update the write-plan skill to work with the new plan structure and work domain abstractions, and exercise the plan structures/templates by retrofitting completed work.

**Description:** Plan with 8 completed iterations (exercise) and 6 planned iterations covering skill update, agent mode update, domain routine refactor, and spec integration.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Defines the plan structure and nested types.

## Path Variables

This section lists the path variables used throughout the plan file and its downstream work items. All file references in the plan and downstream work items MUST use these variables — never bare filesystem paths.

| Variable       | Resolved Path                      | Purpose                                                          |
| -------------- | ---------------------------------- | ---------------------------------------------------------------- |
| `$WORKSPACE`   | Current working directory          | Workspace root directory contains the agent files being modified |
| `$PROJECT`     | Provided with prompt               | Where work execution is taking place.                            |
| `$DOMAINS`     | `$WORKSPACE/.agents/domains`       | Domain resources directory (changes here)                        |
| `$SKILLS`      | `$WORKSPACE/.agents/skills`        | Skills resources directory (changes here)                        |
| `$MANAGEMENT`  | `$WORKSPACE/checkouts/management`  | Management project checkout                                      |
| `$ARTIFICIAL`  | `$WORKSPACE/checkouts/artificial`  | Artificial project checkout (migrated to ART_DOMAINS)            |
| `$ART_DOMAINS` | `$WORKSPACE/checkouts/art-domains` | Where this plan lives.Serves as example for `_guide.md`.         |

## Summary

This plan updates the `write-milestone` and `write-plan` skills and refactors the milestone/plan structures and templates, abstracting structures, types, templatesm and routines to the Domain: Work. The scope covers the skill file, plan structure, plan template, and work domain types used by the skill. Commits happen in the Artificial repository and the Workspace repository.

## Attachments

- `./plan-workflows-make-work-flow/plan__draft.md` (Draft) — Original draft with DONE/NOT DONE sections.

## Domains

| Domain / Path                                       | Description                                                                        |
| --------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Domain: Plans `$DOMAINS/plans/index.md`             | Planning lifecycle for contextualising, drafting, refining, and integrating plans. |
| Domain: Engineering `$DOMAINS/engineering/index.md` | Engineering lifecycle for setting up, verifying, and committing work.              |
| Domain: Work `$DOMAINS/work/index.md`               | Abstract work-item model shared by planning domains.                               |
| Domain: Domains `$DOMAINS/domains/index.md`         | Infrastructure for domain producers and consumers.                                 |

### Work Scope Types

| Work Scope Type / Path                                                    | Resource Kind / Path                                                    |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Type: Project Scope `$DOMAINS/projects/types/project-scope.art`           | Structure: Project `$DOMAINS/projects/structures/project.art`           |
| Type: Repository Scope `$DOMAINS/repositories/types/repository-scope.art` | Structure: Repository `$DOMAINS/repositories/structures/repository.art` |
| Type: Package Scope `$DOMAINS/packages/types/package-scope.art`           | Structure: Package `$DOMAINS/packages/structures/package.art`           |
| No work scope type for kind `Skill`                                       | Structure: Skill `$SKILLS/{skill}/SKILL.md`                             |
| No work scope type for kind `Domain`                                      | Structure: Domain `$DOMAINS/domains/structures/domain.art`              |
| No work scope type for kind `Workspace`                                   | Structure: Workspace `$DOMAINS/workspaces/structures/workspace.art`     |

## Context

### Upstream Work

| Kind        | Path                                                            | Role                                                            |
| ----------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| Milestone   | `$MANAGEMENT/_roadmap/3-now/milestone-hello-world/milestone.md` | Coordinates this plan with other plans and milestones.          |
| Parking Lot | `$ARTIFICIAL/art-domains/_backlog/_parking-lot.md`              | Tracks short-term actionables, pending questions, and blockers. |

### Required Skills

- `write-plan` — Generates plans from sources and context. Required for Contextualizing, Drafting, Refining.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Refining.

## Knowledge Context

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Defines plan record fields and statuses. Relevant for stages Contextualizing, Drafting, Refining.

::READ `$DOMAINS/plans/structures/iteration.art` (Structure) — Defines iteration as a container for changes and instructions. Relevant for stages Drafting, Refining.

::READ `$DOMAINS/plans/templates/plan.tart` (Template) — Defines the presentation of a plan file. Relevant for stages Drafting, Refining.

::READ `$DOMAINS/work/structures/work-item-abstract.art` (Structure) — Abstract base for all work-item records. Relevant for stages Contextualizing, Drafting.

::READ `$DOMAINS/work/types/work-scope-item-abstract.art` (Type) — Describes scoped resources participating in a work item. Relevant for stages Contextualizing, Drafting.

::READ `$DOMAINS/work/types/upstream-work-context.art` (Type) — Describes upstream sources of work. Relevant for stages Contextualizing.

::READ `$DOMAINS/work/types/knowledge-context.art` (Type) — Describes knowledge resources for work items. Relevant for stages Contextualizing, Drafting.

::READ `$DOMAINS/work/types/skill-context.art` (Type) — Describes skills required for work items. Relevant for stages Contextualizing, Drafting.

::READ `$DOMAINS/work/types/downstream-work-item.art` (Type) — Describes work items produced by the current work item. Relevant for stages Drafting, Refining.

::READ `$DOMAINS/work/types/work-attachment.art` (Type) — Describes files attached to work items. Relevant for stages Drafting.

::READ `$DOMAINS/work/types/workflow-stage.art` (Type) — Describes stages in work item workflows. Relevant for stages Contextualizing, Drafting.

::READ `$DOMAINS/engineering/workflows/engineering.art` (Workflow) — Engineering lifecycle stages. Relevant for stages Setting up, Verifying, Committing.

::READ `$DOMAINS/skills/write-plan/SKILL.md` (Skill) — The skill being updated. Relevant for stages Contextualizing, Drafting, Refining.

::READ `$DOMAINS/skills/write-milestone/SKILL.md` (Skill) — The skill being updated. Relevant for stages Contextualizing, Drafting, Refining.

## Scope

### (Scope) Repository: Art Domains

**Resource:** Repository: Art Domains

**Path:** `$ARTIFICIAL/`

**Record:** `$ARTIFICIAL/_records/repository.art`

**Role:** Hosts this Plan and architecture knowledge. Some changes required.

**Changes:**

- List `Operating Instructions` in `_guide.md`.
- Update `architecture/`.

### (Scope) Workspace: Noodlestan

**Resource:** Workspace: Noodlestan

**Path:** `$WORKSPACE/`

**Record:** `$WORKSPACE/_records/workspace.art`

**Role:** Hosts `.agents/domains`. Changes required.

**Changes:**

- Major changes happen in `$DOMAINS/` where domain definitions, structures, templates and routines live.
- Some changes to skills and agent modes, both under `$SKILLS/`.
- List `Operating Instructions` in `_guide.md`.

### (Scope) Domain: Work

**Resource:** Domain: Work

**Path:** `$DOMAINS/work/`

**Role:** Changes required.

**Changes:**

- Add Work Status enum (DRAFT, PLANNING, READY, WORKING, BLOCKED, DELIVERED, INTEGRATING, DONE).
- Change Structure: Plan to move `work.items` from inherited to overrides in and alias `iterations` field.
- Change Structure: Work Item Abstract, add `operating-instructions` List(Type: Operating Instructions).
- Rewrite work-item-abstract.art with plan-level examples.
- Add scope types (Project Scope, Repository Scope, Package Scope, Application Scope, Deployment Scope).
- Add Work Phase type, Work Attachment type,
- Add Workflow, Workflow Stage, and Operation structures.
- Add types Commit and Commit Policy.
- Add Structure: Operation for workflow stage operations.
- Add Type: Operating Instructions for declaring operations in scope and knowledge resources.
- Extend Structure: Work Item (Abstract) with operating-instructions field.
- Refactor workflows with nested stages and operations (`delegating-work`, `planning-work`, `executing-work`, `roadmapping`, `deploying`).
- Add examples to workflow operations.
- Remove `engineering` domain; replace with `work` workflows.
- Move `workflow-stage` from types to structures.

### (Scope) Domain: Plans

**Resource:** Domain: Plans

**Path:** `$DOMAINS/plans/`

**Role:** Changes required.

**Changes:**

- Move `planning.art` workflow to Work Domain (Workflow: Planning Work).
- Refactor `plan.art` to:
  - use Structure: Iteration and Structure: Commit to render iterations and commit tables.
  - use inherited fields from Work Item (Abstract) and new scope/context model.
  - abstract repetitions
- Add Structure: Iteration (replaces `%plan.commits` via `%plan.iterations` alias).
- Update `instructions.tart` and `instructions-report.tart`.

### (Scope) Domain: Roadmaps

**Resource:** Domain: Roadmaps

**Path:** `$DOMAINS/roadmaps/`

**Role:** Changes required.

**Changes:**

- Move Phases field from Milestone to Roadmap structure.
- Refactor milestone.art and milestone.tart for new structure.
- Add roadmaps/definitions/index.md.
- Refactor `Workflow: Roadmapping` with nested stages: `Discovering Work`, `Strategizing Milestones`, `Prioritizing Milestones`, `Coordinating Milestones`, `Integrating Plans`.


### (Scope) Domain: Deployments

**Resource:** Domain: Deployments

**Path:** `$DOMAINS/deployments/`

**Role:** Changes required.

**Changes:**

- Refactor `Workflow: Deploying` with nested stages and operations: `Preparing Deployment` (ops: `Building for Deployment`), `Executing Deployment` (ops: `Deploying`), `Finalizing Deployment`, `Verifying Deployment`.

### (Scope) Domain: Tasks

**Changes:**

- Was "Domain: Tasks". Domain entirely removed.

### (Scope) Domain: Engineering

**Changes:**

- Was "Domain: Engineering". Domain entirely removed, agent-mode records left for a later interation.

### (Scope) Skill: write-plan

**Resource:** Skill: write-plan

**Path:** `$SKILLS/write-plan/SKILL.md`

**Role:** Changes required.

**Changes:**

- Update Composing Plan Scope routine to output `List(Type: Work Scope Item (Abstract))` instead of `Structure: Plan Scope`
- Update Composing Plan Context routine to output `context.upstream`, `context.knowledge`, `context.required-skills` instead of `Structure: Plan Context`
- Update Create OR Update Plan routine to use `setting-up` and `verifying` as NaturalBlock fields, not injectable commands
- Remove references to non-existent Plan Scope and Plan Context structures
- Migrate functions to Work Domain routines and integrate.

**Dependencies:**

- Plan structure must be stable before skill update.

### (Scope) Skill: write-milestone

**Resource:** Skill: write-milestone

**Path:** `$SKILLS/write-milestone/SKILL.md`

**Role:** Changes required.

**Changes:**

- Integrate the new Work Domain routines and get rid of local implementations.

**Dependencies:**

- Milestone structure must be stable before skill update.

## Work

### Execution Context

Execution of changes to agent files occurs directly in `$WORKSPACE/` (where they are currently checked-in). Changes to knowledge are captured in `ARTIFICIAL`, both on the current branch.

## Items:

This section lists the downstream work items produced, coordinated, or advanced by the plan, identifying blocking dependencies across resources of different owners.

| Resource / Record                                    | Status     |
| ---------------------------------------------------- | ---------- |
| Iteration: Add Work Domain                           | `DONE`     |
| Iteration: Split Iterations From Commits             | `DONE`     |
| Iteration: Convert Templates to Directive Syntax     | `DONE`     |
| Iteration: Rebuild Domain Indexes                    | `DONE`     |
| Iteration: Add Domain and Workflow Structure         | `DONE`     |
| Iteration: Update Fundamentals File                  | `DONE`     |
| Iteration: Integrate Work Domain With Others         | `DONE`     |
| Iteration: Initialize Domains Knowledge              | `DONE`     |
| Iteration: Initialize Architecture Knowledge         | `DONE`     |
| Iteration: Normalize Structure Extends               | `DONE`     |
| Iteration: Add Work Operations                       | `DONE`     |
| Iteration: Collapse Work Scope to a Single Type      | `DONE`     |
| Iteration: Update or Create Work Skills and Routines | `DONE` |
| Iteration: Formalize Iteration Commits Nesting       | `READY`    |
| Iteration: Declaring workflows in guides             | `READY`    |
| Iteration: Prompts for Migrating Active Plans        | `READY`    |
| Iteration: Update Stale references and examples      | `DRAFT`    |
| Iteration: Update Agent Modes                        | `DRAFT`    |
| Iteration: Refactor Domain Index Routines            | `DRAFT`    |
| Iteration: Integrate Specs Into Plans                | `DRAFT`    |
| Iteration: Update Domain Knowledge                   | `DRAFT`    |

### Iteration: Add Work Domain

**id:** `add-work-domain`

**Status:** `DONE`

**Purpose:** Add new work domain: Work Status enum, work-item-abstract.art, scope types, core types.

**Description:** Finalised Work Status enum, rewrote work-item-abstract.art with plan-level examples, created scope types and core types.

**Changes:**

- Work Status enum (DRAFT, PLANNING, READY, WORKING, BLOCKED, DELIVERED, INTEGRATING, DONE).
- Rewrite work-item-abstract.art with plan-level examples.
- Purge title → name.
- Reshape Downstream Work Item.
- Create scope types (Project Scope, Repository Scope, Package Scope, Application Scope, Deployment Scope).
- Create Work Phase type.
- Define 6 core types.

### Iteration: Split Iterations From Commits

**id:** `plan-iteration-commit-split`

**Status:** `DONE`

**Purpose:** Split Plan → Iteration → Commit: plans contain iterations, iteration.art created, commits domain created.

**Description:** Plans now contain Iterations, created iteration.art and commits domain with Type: Commit.

**Changes:**

- Create `plans/structures/iteration.art`.
- Create `commits/` domain with Type: Commit.
- Update Iteration to have changes/instructions/report/commits.
- Update templates.

### Iteration: Convert Templates to Directive Syntax

**id:** `templates-converted`

**Status:** `DONE`

**Purpose:** Convert templates to directive syntax.

**Description:** Converted `milestone.tart` and `plan.tart` to ::TEMPLATE directives.

**Changes:**

- Convert `milestone.tart` fully to ::TEMPLATE directives
- Create `plan.tart` from milestone template
- Align TEMPLATE::READ lists

### Iteration: Rebuild Domain Indexes

**id:** `domains-index-rebuilt`

**Status:** `DONE`

**Purpose:** Rebuild domain indexes with 17 domains, definitions, structures, types, templates.

**Description:** Rebuilt `domains/{domain}/index.md` for 17 domains and `domains/index.md`.

**Changes:**

- Rebuild `domains/{domain}/index.md` for 17 domains, including definitions, structures, types, templates, files, workflows, and routines.
- Rebuild `domains/index.md` with 17 domains.
- Remove Tasks domain.

### Iteration: Add Domain and Workflow Structure

**id:** `structures-domains-created`

**Status:** `DONE`

**Purpose:** Create Domain and Workflow structures.

**Description:** Created domain.art, workflow.art, and domain templates.

**Changes:**

- Create domains/domains/structures/domain.art.
- Create domains/work/structures/workflow.art.
- Create domain templates.

### Iteration: Update Fundamentals File

**id:** `update-fundamentals`

**Status:** `DONE`

**Purpose:** Update fundamentals with new definitions.

**Description:** Update core definitions, remove duplicates.

**Changes:**

- Update core definitions (domains, resources, records, fields, routines).
- Merge duplicate Interpreting Mandatory Reading Sections.

### Iteration: Integrate Work Domain With Others

**id:** `integrate-work-domain`

**Status:** `DONE`

**Purpose:** Review and auto-fix .agents for typos, stale references, shortenable references, and formatting.

**Description:** Scans .agents for typos, broken references, long-winded path examples, and formatting issues; auto-fixes all and waits for user review.

**Changes:**

- Review .agents for typos and auto-fix all.
- Review .agents for stale references and fix broken links.
- Review .agents for shortenable references (use common paths such as $PROJECT and $DOMAINS as per this plan conventions, not full variable expansions).
- Review .agents for formatting: bullet points end with dot, examples use `checkouts/artificial/art-js/spec/grammar/constructs/inline/example-inline.art` format.
- Wait for user review before committing.

#### Commits:

| ID                             | Repository / Checkout / Branch    | Policy       | Hash      | Status      |
| ------------------------------ | --------------------------------- | ------------ | --------- | ----------- |
| `add-work-domain-and-refactor` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `5a6b120` | `COMMITTED` |

##### Commit: `add-work-domain-and-refactor`

**Repository:** Repository: Workspace

**Message:**

```
build(work): new work domain with item(s), context and scope abstractions

- Add Abstract work item with upstream, downstream indirections
- Add Work Status enum, and work scope and context abstractions
- Add iteration structure for plan iterations (replaces plan.commits)
- Create commits domain with Type: Commit
- Add work scope types: in their respective domains: Application, Package, Repository, Project, Deployment
- Remove Tasks domain (superseded by Work abstractions); kept only a small Spec type
- Refactor plan.art, plan.tart, milestone.art, milestone.tart for new structure
- Update fundamentals, domains index, and templates
```

### Iteration: Initialize Domains Knowledge

**id:** `initialize-domains-knowledge`

**Status:** `DONE`

**Purpose:** Initialise domains architecture knowledge: reference model, workflows, and ADRs.

**Description:** Created reference-model.md, reference-workflows.md, ADRs, and architecture index in `$ARTIFICIAL/art-domains`.

**Changes:**

In `$ARTIFICIAL/art-domains` namespace:

- Create `$ARTIFICIAL/art-domains/architecture/index.md` (similar to `$ARTIFICIAL/architecture`).
- Create `$ARTIFICIAL/art-domains/architecture/reference-model.md` with domain boundaries for 11 domains.
- Create `$ARTIFICIAL/art-domains/architecture/reference-workflows.md` with 4 workflows and stage Input/Output/Gates/Operating Resources.
- Create `$ARTIFICIAL/art-domains/architecture/_records/adr/` similar to `$ARTIFICIAL/architecture` and capture up to 3 decisions (based on principles, not particular shapes) based on examples of principles provided with the instructions.

**Instructions:** `./plan-workflows-make-work-flow/instructions/initialize-domains-knowledge.md`

**Report:** `./plan-workflows-make-work-flow/instructions/initialize-domains-knowledge__report.md`

#### Commits:

| ID                                   | Repository / Checkout / Branch    | Policy       | Hash      | Status      |
| ------------------------------------ | --------------------------------- | ------------ | --------- | ----------- |
| `add-domains-architecture-knowledge` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `f0c22a5` | `COMMITTED` |
| `add-domains-design-adrs`            | Workspace / `$WORKSPACE` / `main` | `BLOCKED`    | `8f81148` | `COMMITTED` |

##### Commit: `add-domains-architecture-knowledge`

**Message:**

```
knowledge(domains): Add reference model and workflow starting points.

- Create architecture index listing reference model and workflows.
- Create reference-model.md with domain boundaries for 11 domains.
- Create reference-workflows.md with 4 workflows and stage Input/Output/Gates/Operating Resources.
```

##### Commit: `add-domains-design-adrs`

**Repository:** Repository: Art Domains `$ART_DOMAINS`

**Message:**

```
knowledge(domains): Add domain design ADRs.

- Create `_records/adr/` directory for domain design decisions.
- Add ADR: Domain Dependency Principle.
- Add ADR: Abstract Relationships Over Concrete Coupling.
- Add ADR: Independent Domains.
```

**Note:** ADRs review by user and accepted before pushing.

### Iteration: Normalize Structure Extends

**Id:** `normalize-structure-extends`

**Status:** `DONE`

**Changes:**

Normalize structure inheritance declarations across every domain:

- Every structure must identify its base structure with `**Extends:**`.
- The default base is `**Extends:** Structure: Structure (Abstract)`.
- Every structure must repeat inherited fields under `**Inherits:**`, showing only the local example for each inherited field, i.e., every structure must repeat `purpose`, `description`, `extends`, `overrides`, `inherits`, `shape`, `status`, and `examples` under `* *Inherits:**`;
- `kind` and `name` are never listed in inherits.
- Preserve local fields under the structure’s own **Shape:** field.
- make sure Structures do not repeat **Primitive:** Record.

**Instructions:** `./plan-workflows-make-work-flow/instructions/normalize-structure-extends.md`

**Report:** `./plan-workflows-make-work-flow/instructions/normalize-structure-extends__report.md`

#### Commits:

| ID                            | Repository / Checkout / Branch    | Policy       | Hash      | Status      |
| ----------------------------- | --------------------------------- | ------------ | --------- | ----------- |
| `normalize-structure-extends` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `04e933c` | `COMMITTED` |

##### Commit: `normalize-structure-extends`

**Message:**

```
build(domains): normalize structure inheritance declarations
```

### Iteration: Add Work Operations

**id:** `add-work-operations`

**Status:** `DONE`

**Purpose:** Make operating instructions classifiable and discoverable in scope and knowledge resources so that they are available to routines that need to select and consolidate operating instructions.

**Description:** Model operations as members of workflow stages, and use them to scan knowledge and scope resources for operating instructions that match a certain workflow stage. This iteration lays the modeling and process ground work for the next iteration: rewriting work writing skills and routines.

**Changes:**

Major changes:

- Add "Structure: Operation"
- Convert "Type: Workflow Stage" to "Structure: Workflow stage" and add operations field
- Refine all workflows, their nested stages and ops, and express them in nested records: `{workflow.name}/{stage.name}/ops/{operation.name}`.
- Add "Type: Operating Instructions"
- Extend "Structure: Work Item (Abstract)"
- Add "Routine: Compose Work Operations"
- Add "Routine: Compose Operating Instructions"

**Instructions:** `./plan-workflows-make-work-flow/instructions/add-work-operations.md`

#### Commits:

| ID                                | Repository / Checkout / Branch    | Policy             | Hash      | Status      |
| --------------------------------- | --------------------------------- | ------------------ | --------- | ----------- |
| `add-commit-policy`               | Workspace / `$WORKSPACE` / `main` | (pair-programming) | `da7c6d6` | `COMMITTED` |
| `fix-structural-and-formatting`   | Workspace / `$WORKSPACE` / `main` | (pair-programming) | `4137c15` | `COMMITTED` |
| `add-operation-and-instructions`  | Workspace / `$WORKSPACE` / `main` | (pair-programming) | `271cbf7` | `COMMITTED` |
| `refactor-workflow-nesting`       | Workspace / `$WORKSPACE` / `main` | (pair-programming) | `3b098ea`  | `COMMITTED` |
| `renames-domain-work`             | Workspace / `$WORKSPACE` / `main` | (pair-programming) | `6b578d0`  | `COMMITTED` |
| `knowledge-workspace`             | Workspace / `$WORKSPACE` / `main` | (pair-programming) | `764e2e7`  | `COMMITTED` |
| `chore-domain-work-templates`     | Workspace / `$WORKSPACE` / `main` | (pair-programming) | `3b78d1d`  | `COMMITTED` |
| `typos-domain-work`               | Workspace / `$WORKSPACE` / `main` | (pair-programming) | `bce7adf`  | `COMMITTED` |
| `update-domain-indexes`           | Workspace / `$WORKSPACE` / `main` | (pair-programming) | `0e2697d`  | `COMMITTED` |

##### Commit: `add-commit-policy`

**Message:**

```
build(workflows-make-work-flow): add commit policy type and fields

- Add Type: Commit Policy enum (BLOCKED, CONTROLLED, AUTONOMOUS)
- Add checkout, branch, and policy fields to Type: Commit
- Add BLOCKED commit policy rule to agent-worker skill
- Add ::READ directive for Commit Policy in commit.art
```

##### Commit: `fix-structural-and-formatting`

**Message:**

```
build(workflows-make-work-flow): fix structural and formatting issues

- Fix static-web-deployment extends to use Deployment structure
- Fix npm-package-deployment extends punctuation
- Fix iteration.art character encoding
- Update instructions.tart workflow section naming
- Update write-no-comply-entity-task skill procedure naming
```

##### Commit: `add-operation-and-instructions`

**Message:**

```
build(workflows-make-work-flow): add operation and operating instructions types

- Add Structure: Operation for workflow stage operations
- Add Type: Operating Instructions for declaring operations in scope and knowledge resources
- Extend Structure: Work Item (Abstract) with operating-instructions field
- Update workflow-stage reference from types to structures
```

##### Commit: `refactor-workflow-nesting`

**Message:**

```
build(workflows-make-work-flow): Refactor workflows with nested stages and operations.

- Remove `engineering` domain; replace with `work` workflows.
- Move `workflow-stage` from types to structures.
- Create `delegating-work`, `planning-work`, `executing-work`, `roadmapping`, `deploying` workflows with nested stages and operations.
- Add examples to workflow operations.
- Add `operating-instructions` and other inherited fields to `Structure: Milestone` and `Structure: Plan`.
```

##### Commit: `renames-domain-work`

**Message:**

```
renames(domain-work): Type: Workflow Stage changed to Structure; fix typos and field names.

- Update to Structure: Workflow Stage in `work-item-abstract`, `workflow`, `skill-context`, and 2 more.
- Rename `canonical-name` to `canonicalName` in `package-scope`.
- Rename `target-version` to `targetVersion` in `package-scope`.
- Fix typos in `workspace.art` and `_records/workspace.art`.
- Remove duplicate fields in `workspace.art`.
```

##### Commit: `knowledge-workspace`

**Message:**

```
knowledge(workspace): Update `_guide.md` with workflow operations and add commit conventions.

- Remove `Setup` and `Verification` sections (moved to workflow operations).
- Add `knowledge/conventions/writing-commit-messages.art` with commit message format and rules.
```

##### Commit: `chore-domain-work-templates`

**Message:**

```
chore(domain-work): Extract shared work item templates; add types to structures.

- Create `work-item-context.tart` for shared context sections.
- Create `work-item-coordination.tart` for shared coordination sections.
- Update `plan.tart` and `milestone.tart` to use shared templates.
- Add types to inherited fields in `plan.art` and `milestone.art`.
```

##### Commit: `typos-domain-work`

**Message:**

```
typos(domain-work): Fix typos and update iteration and work item types.

- Fix `::END READ` typos in `fundamentals.md`.
- Add Inherits section to `iteration.art` with name, purpose, description fields.
- Update `downstream-work-item.art` fields.
- Simplify `work-phase.art` dependencies description.
```

##### Commit: `update-domain-indexes`

**Message:**

```
build(domains): Update domain indexes.

- Fix `deployments/index.md` structure paths and workflow path.
- Fix `roadmaps/index.md` workflow path.
- Add templates section to `work/index.md`.
- Add Commit Policy type to `commits/index.md`.
```

### Iteration: Collapse Work Scope to a Single Type

**id:** `collapse-work-scope-types`

**Status:** `DONE`

**Purpose:** Make work item scope easier to update and domains easier to maintain.

**Description:** Remove concrete types of Type: Work Scope Item (Abstract), rename it to Type: Work Scope Resource and make it carry a partial of the resource record.

**Changes:**

- Remove concrete types of Type: Work Scope Item (Abstract) across all domains.
- Rename Type: Work Scope Item (Abstract) to Type: Work Scope Resource
- Add field Partial — carries a partial of the resource record.
- Update depdencies within `$DOMAINS` only (separate iteration will migrate active plans).

**Instructions:** `./plan-workflows-make-work-flow/instructions/collapse-work-scope-types.md`

#### Commits:

| ID                                | Repository / Checkout / Branch    | Policy             | Hash      | Status      |
| --------------------------------- | --------------------------------- | ------------------ | --------- | ----------- |
| `collapse-work-scope-types`       | Workspace / `$WORKSPACE` / `main` | AUTONOMOUS         | `c908e64` | `COMMITTED` |

##### Commit: `collapse-work-scope-types`

**Message:**

```
refactor(domains): Collapse work scope types into a single Work Scope Resource type.

- Rename `Type: Work Scope Item (Abstract)` to `Type: Work Scope Resource`.
- Remove concrete scope types (Project, Package, Repository, Deployment, Application).
- Add `partial` field to carry resource record partial.
- Update references in work-item-abstract and templates.
```

### Iteration: Update or Create Work Skills and Routines**

**Id:** `update-work-skills-and-routines`

**Status:** `DONE`

**Purpose:** Use the new Work abstractions and improved Milestone, Plan, Iteration and instructions when generating content.

**Description:** Refactor `write-milestone`, `write-plan` skills so that they work with new work abstractions, abstracting the common routines to Domin: Work.

**Changes:**

- Extract from `$SKILLS/write-plan/SKILL.md` routines to `$DOMAINS/work/routines` as "Routine: {verb} Work .." each one in its own file
  - Routine: Reading Guides
  - Routine: Composing Plan Scope => Compose Work Scope, change output to List(Type: Work Scope Resource)`.
  - Routine: Composing Plan Context => Routine: Compose Work Context
  - Routine: Composing Path Variables => Routine: Compose Path Variables
  - Routine: Create OR Update Work
- Add "Routine: Compose Workflow Operations"
- Add "Routine: Compose Operating Instructions"

**Instructions:** `./plan-workflows-make-work-flow/instructions/update-work-skills-and-routines.md`

**Report:** `./plan-workflows-make-work-flow/instructions/update-work-skills-and-routines__report.md`

#### Commits:

| ID | Repository / Checkout / Branch | Policy | Hash | Status |
| --- | --- | --- | --- | --- |
| `extract-work-routines` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `2d840b3` | `COMMITTED` |

##### Commit: `extract-work-routines`

**Message:**

```
refactor(skills): Extract work routines from write-plan and write-milestone skills

- Extract compose-work-scope, compose-work-context, compose-work-operations, compose-operating-instructions routines to $DOMAINS/work/routines/
- Update write-plan skill with ::READ directives for new routines
- Update write-milestone skill with ::READ directives for new routines
- Add Routines section to work domain index
```

### Iteration: Formalize Iteration Commits Nesting

**Instructions:** `./plan-workflows-make-work-flow/instructions/iteration-commit-nesting.md`

**Report:** `./plan-workflows-make-work-flow/instructions/iteration-commit-nesting__report.md`

**id:** `iteration-commit-nesting`

**Status:** `READY`

**Purpose:** Make status of iterations more ergonomic, more readable, and easier to update.

**Description:** Add notes to commits and express them in a terse table, followed by commit messages and notes.

**Changes:**

- Add `notes` field to Type: Commit.
- Add "Template: Commit" in `$DOMAINS/commits/templates/commit.tart`

Template based on `$DOMAINS/plans/templates/plan.tart` syntax, including the first 3 directives and containing

````md
::TEMPLATE::READ (Type: Commit) FROM `$DOMAINS/commits/types/commit.art`

#### Commits:

::TEMPLATE With each `%commit` in `%commits` — List (Type: Commit) — render a table with columns "ID", "Repository / Checkout / Branch", "Policy", "Hash", and "Status"

::EXAMPLE

```md
| ID                             | Repository / Checkout / Branch    | Policy       | Hash      | Status      |
| ------------------------------ | --------------------------------- | ------------ | --------- | ----------- |
| `add-work-domain-and-refactor` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `5a6b120` | `COMMITTED` |
```

::END

::TEMPLATE(Commits) With each `%commit` in `%commits` — List (Type: Commit) — render an H5 section with format:

##### Commit: {{%commit.id}}

**Repository:** {{repository.name}}

**Message:**

{{commit.message}}

**Notes:**

{{commit.notes}}

::END(Commits)

::EXAMPLE
```md
##### Commit: `add-projects-command`

**Repository:** Repository: Art Domains

**Message:**

```
build(workspace-cli): Add `projects` command.

- Add `records/` infrastructure for discovering projects and reading records.
- Add `presentation/` report for listing projects.
- Repeated duplicate test scenarios.
```
````

- Update "Template: Plan" — `$DOMAINS/plans/templates/plan.tart` — to render the commits template before `::END(Iterations)`.

Syntax:

```md
::TEMPLATE With `%iteration.commits` as `%commits` render the `$DOMAINS/commits/templates/commit.tart` template.
```

- Update `$DOMAINS/commits/index.md` with new Template.

### Iteration: Declaring workflows in guides.

**Instructions:** `./plan-workflows-make-work-flow/instructions/workflows-in-guides.md`

**Report:** `./plan-workflows-make-work-flow/instructions/workflows-in-guides__report.md`

**id:** `workflows-in-guides`

**Status:** `READY`

**Changes:**

Scan all guides for `# Workflows` or `# {something} Workflow`. Prose such as "Planning, delegation, and integration runs on", or "... the working agreements and agent modes defined in .." needs to be expressed as a "## Workflows" section with one "### Workflow: {name}" section per workflow and under it the prose "This project uses .. " with the local workflow artefact links such as `_backlog`. Authoritative guide is `$ART_DOMAINS/_gude`

### Iteration: Prompts for Migrating Active Plans

**Instructions:** `./plan-workflows-make-work-flow/instructions/migration-prompts.md`

**Report:** `./plan-workflows-make-work-flow/instructions/migration-prompts__report.md`

**id:** `migration-prompts`

**Status:** `READY`

**Purpose:** Apply new templates to existing plans/iterations/instructions that are not yet `DONE` across all reposistories.

**Description:** Generate a prompt for architects and planner working on other sessions to update their plan according to new structures. Prompt should instruct them

**Changes:**

- No Changes. Just 2 prompts recorded below where the `{output prompt here}` placeholder are (one prompt for milestones and another one for plans).

**Prompts:**

```md
# Milestone Migration Prompt
{output prompt here}
```

```md
# Plan Migration Prompt
{output prompt here}
```

### Iteration: Update Stale references and examples

**Note:** Scope of update `.agents/` files only.

Move content of `.agents/domains/engineering/_guide.md` to `$AGENTS/work/_wip`.

Update prose with workflow and stage examples to match renamed workflows:

- "Workflow: Planning" => "Workflow: Planning Work"
- "Workflow: Implementing" => "Workflow: Executing Work"
- "Workflow: Engineering" => "Workflow: Executing Work"
- "Delivery Workflow" => "Workflow: Executing Work"
- other cases of stale workflow names?

Update prose with workflow stage examples to match renamed workflow stages:

- "Contextualizing, Drafting, Refining, Setting up, Verifying, Committing" => "Planning Work Item, Verifying Execution"
- "Briefing, Problem, Solution, Plan, Contextualizing, Drafting, Refining" => "Planning Work Item, Validating Work Item, "Delegating Instructions"
- other cases of stale workflow stage names?

1. Renamed paths

- `work/types/workflow-stage.art` to `work/structures/structures/workflow-stage.art`
- `engineering/workflows/engineering.art` => `work/worflows/executing-work/workflow.art`
- `plans/workflows/planning.art` => `work/worflows/planning-work/workflow.art`

1. Hide engineering domain. Remove:

- `$DOMAINS/engineering/domain.art `
- `$DOMAINS/engineering/index.md`

Check for stale paths.

### Iteration: Update Agent Modes

**id:** `update-agent-modes`

**Status:** `DRAFT`

**Purpose:** Update agent modes: architect, planner, delegator, worker, backlog-manager.

**Description:** Update agent mode definitions to work with new plan structure and skill.

**Changes:**

- Update architect agent mode
- Update planner agent mode
- Update delegator agent mode
- Update worker agent mode
- Update backlog-manager agent mode

**Instructions:** `./plan-workflows-make-work-flow/instructions/update-agent-modes.md`

**Report:** `./plan-workflows-make-work-flow/instructions/update-agent-modes__report.md`

### Iteration: Refactor Domain Index Routines

**id:** `refactor-domain-index-routines`

**Status:** `DRAFT`

**Purpose:** Refactor domain index routines to 2 routines: domain index and domain listing.

**Description:** Simplify domain index routines, update domains-listing.tart and domain-table-of-contents.tart.

**Changes:**

- Simplify domain index routines.
- Update domains-listing.tart.
- Update domain-table-of-contents.tart.

**Instructions:** `./plan-workflows-make-work-flow/instructions/refactor-domain-index-routines.md`

**Report:** `./plan-workflows-make-work-flow/instructions/refactor-domain-index-routines__report.md`

### Iteration: Integrate Specs Into Plans

**id:** `integrate-specs-into-plans`

**Status:** `DRAFT`

**Purpose:** Integrate specs into plans.

**Description:** Integrate Type: Spec (Abstract) into plan structure and template.

**Changes:**

- Integrate Type: Spec (Abstract) into plan structure.
- Update plan template for spec integration.

**Instructions:** `./plan-workflows-make-work-flow/instructions/integrate-specs-into-plans.md`

**Report:** `./plan-workflows-make-work-flow/instructions/integrate-specs-into-plans__report.md`

### Iteration: Update Domain Knowledge

**id:** `update-domain-knowledge`

**Status:** `DRAFT`

**Purpose:** Document how domains work.

**Description:** Update the `$ART_DOMAINS/archirecture` knowledge.

**Changes:**

- Update `reference-model.md`
- Update `reference-workflows.md`
- Update plan template for spec integration.

**Instructions:** `./plan-workflows-make-work-flow/instructions/integrate-specs-into-plans.md`

**Report:** `./plan-workflows-make-work-flow/instructions/integrate-specs-into-plans__report.md`

## Coordination

### Next

Build the plan file from draft content (current iteration). Then update the write-plan skill.

### Blockers

- None

### Findings

- Structures and Types are the source of truth for the domain models, but `tart` templates are the authorative instructions for what to generate. Authoring agents must understand this relationship in order to never port outdated template assumptions back to newer structures.

### Decisions

- None

### Knowledge to Update

- `$ART_DOMAINS/architecture/reference-model.md`
- `$ART_DOMAINS/architecture/reference-workflows.md`

### Follow Ups

- **Refactor Domain index routines**.
- **Explicit Operating instructions rendering** The writing skills (`write-milestone`, `write-plan`) still need to invoke Routine: Compose Workflow Operations and Routine: Identify Operating Instructions to discover operations from knowledge and scope resources. The routine receives workflows as input and returns List(Type: Operating Instructions). The caller filters by stage as needed. When writing instructions files, the skill should: 1. Populate scope and context using Compose Work Scope and  Compose Work Context. 2. Pass the work item's workflows to the routine. 3. Receive the list of operating instructions. 4. Render relevant operating instructions in milestone, plan, and instruction files.

## Feedback

None.
