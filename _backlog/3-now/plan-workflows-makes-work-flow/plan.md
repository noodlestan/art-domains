# Plan: Workflows Make Work Flow

**ID:** `workflows-make-work-flow`

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

Update the write-plan skill to map its procedures (Composing Plan Scope, Composing Plan Context, Composing Path Variables) to the new plan structure fields (`scope`, `context.upstream`, `context.knowledge`, `context.required-skills`, `paths`). Exercise the plan structures by retrofitting 8 completed work groups as iterations. Add 6 planned iterations for skill update, agent mode update, domain routine refactor, and spec integration.

Scope covers the write-plan skill, plan structure, plan template, and work domain types. Upstream source is the Hello World milestone. knowledge includes plan/iteration structures, work domain types, and engineering workflow.

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

This plan updates the write-plan skill and exercises the plan structures. The scope covers the skill file, plan structure, plan template, and work domain types used by the skill. Commits happen in the Artificial repository and the Workspace repository.

### Scope Repository: Art Domains

**Resource:** Repository: Art Domains

**Path:** `$ARTIFICIAL/`

**Record:** `$ARTIFICIAL/_records/repository.art`

**Role:** Hosts this Plan. Some changes required.

**Changes:**

- List `Operating Instructions` in `_guide.md`.

### Workspace Scope: Noodlestan

**Resource:** Workspace: Noodlestan

**Path:** `$WORKSPACE/`

**Record:** `$WORKSPACE/_records/workspace.art`

**Role:** Hosts `.agents/domains`. Changes required.

**Changes:**

- Domain definitions, agent modes, and shared context updated across iterations.

### Domain Scope: Work

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

### Domain Scope: Plans

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

### Domain Scope: Roadmaps

**Resource:** Domain: Roadmaps

**Path:** `$DOMAINS/roadmaps/`

**Role:** Changes required.

**Changes:**

- Move Phases field from Milestone to Roadmap structure.
- Refactor milestone.art and milestone.tart for new structure.
- Add roadmaps/definitions/index.md.
- Refactor `Workflow: Roadmapping` with nested stages: `Discovering Work`, `Strategizing Milestones`, `Prioritizing Milestones`, `Coordinating Milestones`, `Integrating Plans`.


### Domain Scope: Deployments

**Resource:** Domain: Deployments

**Path:** `$DOMAINS/deployments/`

**Role:** Changes required.

**Changes:**

- Refactor `Workflow: Deploying` with nested stages and operations: `Preparing Deployment` (ops: `Building for Deployment`), `Executing Deployment` (ops: `Deploying`), `Finalizing Deployment`, `Verifying Deployment`.

### Domain Scope: Tasks

**Changes:**

- Was "Domain: Tasks". Domain entirely removed.

### Domain Scope: Engineering

**Changes:**

- Was "Domain: Engineering". Domain entirely removed, agent-mode records left for a later interation.

### Skill Scope: write-plan

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

### Skill Scope: write-milestone

**Resource:** Skill: write-milestone

**Path:** `$SKILLS/write-milestone/SKILL.md`

**Role:** Changes required.

**Changes:**

- Integrate the new Work Domain routines and get rid of local implementations.

**Dependencies:**

- Milestone structure must be stable before skill update.

### Skill Scope: write-iteration

**Resource:** Skill: write-iteration

**Path:** `$SKILLS/write-iteration/SKILL.md`

**Role:** New skill created in this iteration.

**Changes:**

- New Skill

### Skill Scope: write-instructions

**Resource:** Skill: write-instructions

**Path:** `$SKILLS/write-instructions/SKILL.md`

**Role:** New skill created in this iteration.

**Changes:**

- New Skill

## Work

### Execution Context

Execution of changes to agent files occurs directly in `$WORKSPACE/` (where they are currently checked-in). Changes to knowledge are captured in `ARTIFICIAL`, both on the current branch.

### Items

| Resource / Record                                    | Status  |
| ---------------------------------------------------- | ------- |
| Iteration: Add Work Domain                           | `DONE`  |
| Iteration: Split Iterations From Commits             | `DONE`  |
| Iteration: Convert Templates to Directive Syntax     | `DONE`  |
| Iteration: Rebuild Domain Indexes                    | `DONE`  |
| Iteration: Add Domain and Workflow Structure         | `DONE`  |
| Iteration: Update Fundamentals File                  | `DONE`  |
| Iteration: Integrate Work Domain With Others         | `DONE`  |
| Iteration: Initialize Domains Knowledge              | `DONE`  |
| Iteration: Initialize Architecture Knowledge         | `DONE`  |
| Iteration: Normalize Structure Extends               | `DONE`  |
| Iteration: Add Work Operations                       | `READY` |
| Iteration: Collapse Work Scope to a Single Type      | `DRAFT` |
| Iteration: Update and Create Write Work Skills       | `DRAFT` |
| Iteration: Formalize Iteration Commits Nesting       | `DRAFT` |
| Iteration: Declaring workflows in guides             | `DRAFT` |
| Iteration: Update Templates and Migrate Active Plans | `DRAFT` |
| Iteration: Update Stale references and examples      | `DRAFT` |
| Iteration: Update Agent Modes                        | `DRAFT` |
| Iteration: Refactor Domain Index Routines            | `DRAFT` |
| Iteration: Integrate Specs Into Plans                | `DRAFT` |
| Iteration: Update Domain Knowledge                   | `DRAFT` |

#### Iteration: Add Work Domain

**id:** `add-work-domain`

**Purpose:** Add new work domain: Work Status enum, work-item-abstract.art, scope types, core types.

**Description:** Finalised Work Status enum, rewrote work-item-abstract.art with plan-level examples, created scope types and core types.

**Status:** `DONE`

**Changes:**

- Work Status enum (DRAFT, PLANNING, READY, WORKING, BLOCKED, DELIVERED, INTEGRATING, DONE).
- Rewrite work-item-abstract.art with plan-level examples.
- Purge title → name.
- Reshape Downstream Work Item.
- Create scope types (Project Scope, Repository Scope, Package Scope, Application Scope, Deployment Scope).
- Create Work Phase type.
- Define 6 core types.

#### Iteration: Split Iterations From Commits

**id:** `plan-iteration-commit-split`

**Purpose:** Split Plan → Iteration → Commit: plans contain iterations, iteration.art created, commits domain created.

**Description:** Plans now contain Iterations, created iteration.art and commits domain with Type: Commit.

**Status:** `DONE`

**Changes:**

- Create `plans/structures/iteration.art`.
- Create `commits/` domain with Type: Commit.
- Update Iteration to have changes/instructions/report/commits.
- Update templates.

#### Iteration: Convert Templates to Directive Syntax

**id:** `templates-converted`

**Purpose:** Convert templates to directive syntax.

**Description:** Converted `milestone.tart` and `plan.tart` to ::TEMPLATE directives.

**Status:** `DONE`

**Changes:**

- Convert `milestone.tart` fully to ::TEMPLATE directives
- Create `plan.tart` from milestone template
- Align TEMPLATE::READ lists

#### Iteration: Rebuild Domain Indexes

**id:** `domains-index-rebuilt`

**Purpose:** Rebuild domain indexes with 17 domains, definitions, structures, types, templates.

**Description:** Rebuilt `domains/{domain}/index.md` for 17 domains and `domains/index.md`.

**Status:** `DONE`

**Changes:**

- Rebuild `domains/{domain}/index.md` for 17 domains, including definitions, structures, types, templates, files, workflows, and routines.
- Rebuild `domains/index.md` with 17 domains.
- Remove Tasks domain.

#### Iteration: Add Domain and Workflow Structure

**id:** `structures-domains-created`

**Purpose:** Create Domain and Workflow structures.

**Description:** Created domain.art, workflow.art, and domain templates.

**Status:** `DONE`

**Changes:**

- Create domains/domains/structures/domain.art.
- Create domains/work/structures/workflow.art.
- Create domain templates.

#### Iteration: Update Fundamentals File

**id:** `update-fundamentals`

**Purpose:** Update fundamentals with new definitions.

**Description:** Update core definitions, remove duplicates.

**Status:** `DONE`

**Changes:**

- Update core definitions (domains, resources, records, fields, routines).
- Merge duplicate Interpreting Mandatory Reading Sections.

#### Iteration: Integrate Work Domain With Others

**id:** `integrate-work-domain`

**Purpose:** Review and auto-fix .agents for typos, stale references, shortenable references, and formatting.

**Description:** Scans .agents for typos, broken references, long-winded path examples, and formatting issues; auto-fixes all and waits for user review.

**Status:** `DONE`

**Changes:**

- Review .agents for typos and auto-fix all.
- Review .agents for stale references and fix broken links.
- Review .agents for shortenable references (use common paths such as $PROJECT and $DOMAINS as per this plan conventions, not full variable expansions).
- Review .agents for formatting: bullet points end with dot, examples use `checkouts/artificial/art-js/spec/grammar/constructs/inline/example-inline.art` format.
- Wait for user review before committing.

##### Commits:

| ID                             | Repository / Checkout / Branch    | Policy       | Hash      | Status      |
| ------------------------------ | --------------------------------- | ------------ | --------- | ----------- |
| `add-work-domain-and-refactor` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `5a6b120` | `COMMITTED` |

##### Commit: `add-work-domain-and-refactor`

**Repository:** Repository Scope: Workspace

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

#### Iteration: Initialize Domains Knowledge

**id:** `initialize-domains-knowledge`

**Purpose:** Initialise domains architecture knowledge: reference model, workflows, and ADRs.

**Description:** Created reference-model.md, reference-workflows.md, ADRs, and architecture index in `$ARTIFICIAL/art-domains`.

**Status:** `DONE`

**Changes:**

In `$ARTIFICIAL/art-domains` namespace:

- Create `$ARTIFICIAL/art-domains/architecture/index.md` (similar to `$ARTIFICIAL/architecture`).
- Create `$ARTIFICIAL/art-domains/architecture/reference-model.md` with domain boundaries for 11 domains.
- Create `$ARTIFICIAL/art-domains/architecture/reference-workflows.md` with 4 workflows and stage Input/Output/Gates/Operating Resources.
- Create `$ARTIFICIAL/art-domains/architecture/_records/adr/` similar to `$ARTIFICIAL/architecture` and capture up to 3 decisions (based on principles, not particular shapes) based on examples of principles provided with the instructions.

**Instructions:** `./plan-workflows-make-work-flow/instructions/initialize-domains-knowledge.md`

**Report:** `./plan-workflows-make-work-flow/instructions/initialize-domains-knowledge__report.md`

##### Commits:

| ID                                   | Repository / Checkout / Branch    | Policy       | Hash      | Status      |
| ------------------------------------ | --------------------------------- | ------------ | --------- | ----------- |
| `add-domains-architecture-knowledge` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `f0c22a5` | `COMMITTED` |
| `add-domains-design-adrs`            | Workspace / `$WORKSPACE` / `main` | `BLOCKED`    | `8f81148` | `COMMITTED` |

###### Commit: `add-domains-architecture-knowledge`

**Message:**

```
knowledge(domains): Add reference model and workflow starting points.

- Create architecture index listing reference model and workflows.
- Create reference-model.md with domain boundaries for 11 domains.
- Create reference-workflows.md with 4 workflows and stage Input/Output/Gates/Operating Resources.
```

##### Commit: `add-domains-design-adrs`

**Repository:** Repository Scope: Artificial `$ARTIFICIAL`

**Message:**

```
knowledge(domains): Add domain design ADRs.

- Create `_records/adr/` directory for domain design decisions.
- Add ADR: Domain Dependency Principle.
- Add ADR: Abstract Relationships Over Concrete Coupling.
- Add ADR: Independent Domains.
```

**Note:** ADRs review by user and accepted before pushing.

#### Iteration: Normalize Structure Extends

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

##### Commits:

| ID                            | Repository / Checkout / Branch    | Policy       | Hash      | Status      |
| ----------------------------- | --------------------------------- | ------------ | --------- | ----------- |
| `normalize-structure-extends` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `04e933c` | `COMMITTED` |

###### Commit: `normalize-structure-extends`

**Message:**

```
build(domains): normalize structure inheritance declarations
```

#### Iteration: Add Work Operations

**id:** `add-work-operations`

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

**Status:** `DONE`

##### Commits:

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

###### Commit: `add-commit-policy`

**Message:**

```
build(workflows-make-work-flow): add commit policy type and fields

- Add Type: Commit Policy enum (BLOCKED, CONTROLLED, AUTONOMOUS)
- Add checkout, branch, and policy fields to Type: Commit
- Add BLOCKED commit policy rule to agent-worker skill
- Add ::READ directive for Commit Policy in commit.art
```

###### Commit: `fix-structural-and-formatting`

**Message:**

```
build(workflows-make-work-flow): fix structural and formatting issues

- Fix static-web-deployment extends to use Deployment structure
- Fix npm-package-deployment extends punctuation
- Fix iteration.art character encoding
- Update instructions.tart workflow section naming
- Update write-no-comply-entity-task skill procedure naming
```

###### Commit: `add-operation-and-instructions`

**Message:**

```
build(workflows-make-work-flow): add operation and operating instructions types

- Add Structure: Operation for workflow stage operations
- Add Type: Operating Instructions for declaring operations in scope and knowledge resources
- Extend Structure: Work Item (Abstract) with operating-instructions field
- Update workflow-stage reference from types to structures
```

###### Commit: `refactor-workflow-nesting`

**Message:**

```
build(workflows-make-work-flow): Refactor workflows with nested stages and operations.

- Remove `engineering` domain; replace with `work` workflows.
- Move `workflow-stage` from types to structures.
- Create `delegating-work`, `planning-work`, `executing-work`, `roadmapping`, `deploying` workflows with nested stages and operations.
- Add examples to workflow operations.
- Add `operating-instructions` and other inherited fields to `Structure: Milestone` and `Structure: Plan`.
```

###### Commit: `renames-domain-work`

**Message:**

```
renames(domain-work): Type: Workflow Stage changed to Structure; fix typos and field names.

- Update to Structure: Workflow Stage in `work-item-abstract`, `workflow`, `skill-context`, and 2 more.
- Rename `canonical-name` to `canonicalName` in `package-scope`.
- Rename `target-version` to `targetVersion` in `package-scope`.
- Fix typos in `workspace.art` and `_records/workspace.art`.
- Remove duplicate fields in `workspace.art`.
```

###### Commit: `knowledge-workspace`

**Message:**

```
knowledge(workspace): Update `_guide.md` with workflow operations and add commit conventions.

- Remove `Setup` and `Verification` sections (moved to workflow operations).
- Add `knowledge/conventions/writing-commit-messages.art` with commit message format and rules.
```

###### Commit: `chore-domain-work-templates`

**Message:**

```
chore(domain-work): Extract shared work item templates; add types to structures.

- Create `work-item-context.tart` for shared context sections.
- Create `work-item-coordination.tart` for shared coordination sections.
- Update `plan.tart` and `milestone.tart` to use shared templates.
- Add types to inherited fields in `plan.art` and `milestone.art`.
```

###### Commit: `typos-domain-work`

**Message:**

```
typos(domain-work): Fix typos and update iteration and work item types.

- Fix `::END READ` typos in `fundamentals.md`.
- Add Inherits section to `iteration.art` with name, purpose, description fields.
- Update `downstream-work-item.art` fields.
- Simplify `work-phase.art` dependencies description.
```

###### Commit: `update-domain-indexes`

**Message:**

```
build(domains): Update domain indexes.

- Fix `deployments/index.md` structure paths and workflow path.
- Fix `roadmaps/index.md` workflow path.
- Add templates section to `work/index.md`.
- Add Commit Policy type to `commits/index.md`.
```

#### Iteration: Collapse Work Scope to a Single Type

**id:** `collapse-work-scope-types`

**Purpose:** Make work item scope easier to update and domains easier to maintain.

**Description:** Remove concrete types of Type: Work Scope Item (Abstract), rename it to Type: Work Scope Resource and make it carry a partial of the resource record.

**Status:** `PLANNING`

**Changes:**

- Remove concrete types of Type: Work Scope Item (Abstract) across all domains.
- Rename Type: Work Scope Item (Abstract) to Type: Work Scope Resource
- Add field Partial — carries a partial of the resource record.
- Update depdencies within `$DOMAINS` only (separate iteration will migrate active plans).

**Instructions:** `./plan-workflows-make-work-flow/instructions/collapse-work-scope-types.md`

##### Commits:

| ID                                | Repository / Checkout / Branch    | Policy             | Hash      | Status      |
| --------------------------------- | --------------------------------- | ------------------ | --------- | ----------- |
| `collapse-work-scope-types`       | Workspace / `$WORKSPACE` / `main` | BLOCKED            | TBD       | `PLANNING`  |

###### Commit: `collapse-work-scope-types`

**Message:**

```
build(domain-work): Simplify work scopes types.

- Rename `Type: Work Scope Item (Abstract)` to `Type: Work Scope Resource`.
- Remove concrete scope types (Project, Package, Repository, Deployment, Application).
- Add `partial` field to carry resource record partial.
- Update references in work-item-abstract and templates.
```

#### Iteration: Update and Create Write Work Skills

**id:** `update-write-work-skills`

**Purpose:** Use the new Work abstractions and improved Milestone, Plan, Iteration and instructions when generating content.

**Description:** Update `write-milestone`, `write-plan` and create `write-iteration` and `write-instructions` skills so that they work with new work abstractions, abstracting common routines: "Composing Plan Scope", "Composing Plan Context", " Create OR Update Work", "..." to the work domain.

**Status:** `DRAFT`

**Changes:**

- Extract common routines to `$DOMAINS/work/routines` as "Routine: {verb} Work .."
- Update "Routine: Composing Work Scope" to output `List(Type: Work Scope Item (Abstract))`.
- Update "Routine: Composing Work Context" to output `context.upstream`, `context.knowledge` and `context.required-skills`.
- Update "Routine: Composing Work Operations" to output ``.
- Update "Routine: Create OR Update Work"

Note: Remove references to non-existent Plan Scope and Plan Context structures.

**Notes on operating instructions:**

The writing skills (write-milestone, write-plan, write-iteration, write-instructions) will need to invoke Routine: Identify Operating Instructions to discover operations from knowledge and scope resources. The routine receives workflows as input and returns List(Type: Operating Instructions). The caller filters by stage as needed. When writing instructions files, the skill should:

1. Pass the work item's workflows to the routine.
2. Receive the list of operating instructions.
3. Render relevant operating instructions in the instruction file under the appropriate stage sections (Setting Up, Verifying, etc.).

This applies to all four writing skills. write-iteration and write-instructions are new skills to be created.

**Instructions:** `./plan-workflows-make-work-flow/instructions/update-write-work-skills.md`

**Report:** `./plan-workflows-make-work-flow/instructions/update-write-work-skills__report.md`

#### Iteration: Formalize Iteration Commits Nesting

**id:** `iteration-commit-nesting`

**Purpose:** Make iterations more ergonomic, more readable, and easier to update.

**Description:** Add notes to commits and express them in a terse table, followed my commit messages and notes.

**Changes:**

- Add `notes` field to Type: Commit.
- Refactor `plan.tart` to render commits nested under itrations with `##### Commit:` section, containing a table of followed by a section for each commit `###### Commit: {id}` with their message and notes field.
- Migrate (active) plans across all projects

#### Iteration: Declaring workflows in guides.

**id:** `workflows-in-guides`

**Changes:**

Scan all guides for `# Workflows` or `# {something} Workflow`. Prose such as "Planning, delegation, and integration runs on", or "... the working agreements and agent modes defined in .." needs to be expressed as a "## Workflows" section with one "### Workflow: {name}" section per workflow and under it the prose "This project uses .. " with the local workflow artefact links such as `_backlog`. Authoritative guide is `$ART_DOMAINS/_gude`

#### Iteration: Update Templates and Migrate Active Plans

**id:** `migrate-active-plains`

**Changes:** Apply new templates to existing plans/iterations/instructions that are not yet `DONE` across all reposistories.

#### Iteration: Update Stale references and examples

**Note:** Scope of update `.agents/` files only.

Move content of `.agents/domains/engineering/_guide.md` to `$AGENTS/work/_wip`.

Update prose with workflow and stage examples to match renamed workflows:

- "Workflow: Planning" => "Workflow: Planning Work"
- "Workflow: Implementing" => "Workflow: Executing Work"
- "Workflow: Engineering" => "Workflow: Executing Work"
- "Delivery Workflow" => "Workflow: Executing Work"
- other cases of stale workflow names?

Update prose with workflow stage examples to match renamed workflow stages:

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

#### Iteration: Update Agent Modes

**id:** `update-agent-modes`

**Purpose:** Update agent modes: architect, planner, delegator, worker, backlog-manager.

**Description:** Update agent mode definitions to work with new plan structure and skill.

**Status:** `DRAFT`

**Changes:**

- Update architect agent mode
- Update planner agent mode
- Update delegator agent mode
- Update worker agent mode
- Update backlog-manager agent mode

**Instructions:** `./plan-workflows-make-work-flow/instructions/update-agent-modes.md`

**Report:** `./plan-workflows-make-work-flow/instructions/update-agent-modes__report.md`

#### Iteration: Refactor Domain Index Routines

**id:** `refactor-domain-index-routines`

**Purpose:** Refactor domain index routines to 2 routines: domain index and domain listing.

**Description:** Simplify domain index routines, update domains-listing.tart and domain-table-of-contents.tart.

**Status:** `DRAFT`

**Changes:**

- Simplify domain index routines.
- Update domains-listing.tart.
- Update domain-table-of-contents.tart.

**Instructions:** `./plan-workflows-make-work-flow/instructions/refactor-domain-index-routines.md`

**Report:** `./plan-workflows-make-work-flow/instructions/refactor-domain-index-routines__report.md`

#### Iteration: Integrate Specs Into Plans

**id:** `integrate-specs-into-plans`

**Purpose:** Integrate specs into plans.

**Description:** Integrate Type: Spec (Abstract) into plan structure and template.

**Status:** `DRAFT`

**Changes:**

- Integrate Type: Spec (Abstract) into plan structure.
- Update plan template for spec integration.

**Instructions:** `./plan-workflows-make-work-flow/instructions/integrate-specs-into-plans.md`

**Report:** `./plan-workflows-make-work-flow/instructions/integrate-specs-into-plans__report.md`

#### Iteration: Update Domain Knowledge

**id:** `update-domain-knowledge`

**Purpose:** Document how domains work.

**Description:** Update the `$ART_DOMAINS/archirecture` knowledge.

**Status:** `DRAFT`

**Changes:**

- Update `reference-model.md`
- Update `reference-workflows.md`
- Update plan template for spec integration.

**Instructions:** `./plan-workflows-make-work-flow/instructions/integrate-specs-into-plans.md`

**Report:** `./plan-workflows-make-work-flow/instructions/integrate-specs-into-plans__report.md`

### Next

Build the plan file from draft content (current iteration). Then update the write-plan skill.

### Blockers

- None

## Findings

- The write-plan skill references `Structure: Plan Scope` and `Structure: Plan Context` which don't exist in the current domain graph.
- The plan structure has `setting-up` and `verifying` as NaturalBlock fields, not injectable commands as the skill expects.
- The DONE work in the draft can be modeled as iterations with status DONE for exercise purposes.
- The planning workflow file (`plans/workflows/planning.art`) doesn't exist yet but is referenced in the domains index.

## Decisions

- The plan structure is the source of truth, not the skill.
- DONE work will be modeled as iterations with status DONE to exercise the plan structure.
- The skill must be updated to work with the plan structure's fields, not the other way around.

## Documentation to Update

- Write-plan skill (primary target)
- Write-milestone skill (similar issues, follow-up)
- Domain index routines (refactor)

## Follow Ups

- Update write-milestone skill (similar mapping issues)
- Create planning workflow file (`plans/workflows/planning.art`)
- Create engineering workflow file if needed

## Feedback

None.
