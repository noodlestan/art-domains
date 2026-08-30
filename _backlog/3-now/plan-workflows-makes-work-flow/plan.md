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

| Variable             | Resolved Path                            | Purpose                                                          |
| -------------------- | ---------------------------------------- | ---------------------------------------------------------------- |
| `$WORKSPACE`         | Current working directory                | Workspace root directory contains the agent files being modified |
| `$PROJECT`           | Provided with prompt                     | Where work execution is taking place.                            |
| `$DOMAINS`           | `$WORKSPACE/.agents/domains`             | Domain resources directory (changes here)                        |
| `$SKILLS`            | `$WORKSPACE/.agents/skills`              | Skills resources directory (changes here)                        |
| `$MANAGEMENT`        | `$WORKSPACE/checkouts/management`        | Management project checkout. Requires updating `_guide.md`.      |
| `$ART_DOMAINS`       | `$WORKSPACE/checkouts/art-domains`       | Where this plan lives.Serves as example for `_guide.md`.         |
| `$ARTIFICIALS`       | `$WORKSPACE/checkouts/artificials`       | Requires updating `_guide.md`                                    |
| `$ART_JS`            | `$WORKSPACE/checkouts/art-js`            | Requires updating `_guide.md`                                    |
| `$ARTISANS`          | `$WORKSPACE/checkouts/artisans`          | Requires updating `_guide.md`                                    |
| `$CONVENTIONS`       | `$WORKSPACE/checkouts/conventions`       | Requires updating `_guide.md`                                    |
| `$NO_COMPLY`         | `$WORKSPACE/checkouts/no-comply`         | Requires updating `_guide.md`                                    |
| `$OPS`               | `$WORKSPACE/checkouts/ops`               | Requires updating `_guide.md`                                    |
| `$PURRCEPTION`       | `$WORKSPACE/checkouts/purrception`       | Requires updating `_guide.md`                                    |
| `$PURRFECT`          | `$WORKSPACE/checkouts/purrfect`          | Requires updating `_guide.md`                                    |
| `$PURRPOSE`          | `$WORKSPACE/checkouts/purrpose`          | Requires updating `_guide.md`                                    |
| `$PURRTRAIT`         | `$WORKSPACE/checkouts/purrtrait`         | Requires updating `_guide.md`                                    |
| `$WORKSPACE_TOOLING` | `$WORKSPACE/checkouts/workspace-tooling` | Requires updating `_guide.md`                                    |
| `$NOODLESTAN_WEB`    | `$WORKSPACE/checkouts/noodlestan-web`    | Requires updating `_guide.md`                                    |

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

- Strip inline routines (Reading Guides, Composing Path Variables, Create OR Update Plan, Create or Update Instruction File) — now referenced via `::READ` directives to `$DOMAINS/work/routines/` and `$DOMAINS/plans/routines/`.
- Updated Command: Plan More to iterate `%plan.iteration` and invoke Create or Update Instruction File per iteration.

**Dependencies:**

- Plan structure must be stable before skill update.

### (Scope) Skill: write-milestone

**Resource:** Skill: write-milestone

**Path:** `$SKILLS/write-milestone/SKILL.md`

**Role:** Changes required.

**Changes:**

- Strip inline routines (Reading Guides, Composing Path Variables, Create OR Update Plan) — now referenced via `::READ` directives.
- Fix heading `Skill: Write Plan` → `Skill: Write Milestone`.
- Rename all commands from `Plan` to `Milestone` (Create Plan → Create Milestone, Convert to Plan → Convert to Milestone, Plan More → Milestone More, Integrate Plan Sources → Integrate Milestone Sources, Compact Plan → Compact Milestone, Validate Plan → Validate Milestone, Delegate Plan → Delegate Milestone, Interactive Planning → Interactive Milestonening).

**Dependencies:**

- Milestone structure must be stable before skill update.

### (Scope) Domain: Work (Routines)

**Resource:** Domain: Work — Routines

**Path:** `$DOMAINS/work/routines/`

**Role:** Changes required.

**Changes:**

- Create `read-work-guides.art` — extracted from both skills, outputs `List(Type: Knowledge Context)`.
- Create `compose-path-variables.art` — extracted from write-plan, generalised to work abstractions.
- Create `create-or-update-work-item.art` — extracted from write-plan, generalised to any work item.
- Create `create-work-graph.art` — renamed from `work-graph.art`.
- Create `create-work-table.art` — renamed from `work-table.art`.
- Rewrite `compose-operating-instructions.art` — decomposed inputs, added upstream scanning, consolidated output.
- Rewrite `compose-work-context.art` — flattened outputs, added autonomous/interactive modes.
- Rewrite `compose-work-scope.art` — added autonomous/interactive modes.
- Rewrite `compose-work-operations.art` — cleaned up, removed stale read.
- Delete `work-graph.art`, `work-table.art` (replaced by renamed versions).

### (Scope) Domain: Plans (Routines)

**Resource:** Domain: Plans — Routines

**Path:** `$DOMAINS/plans/routines/`

**Role:** Changes required.

**Changes:**

- Create `create-or-update-instructions.art` — extracted from write-plan, updated to use `%iteration`.
- Delete `planning-graph.art`, `planning-table.art` (WIP placeholders, superseded by work domain routines).

### (Scope) Agent Mode: Architect

**Resource:** Agent Mode: Architect

**Path:** `$SKILLS/agent-architect/SKILL.md`

**Role:** Changes required.

**Changes:**

- Update Work Graph command to reference `Routine: Create Work Graph`.
- Update Work Table command to reference `Routine: Create Work Table`.

## Work

### Execution Context

Execution of changes to agent files occurs directly in `$WORKSPACE/` (where they are currently checked-in). Changes to knowledge are captured in `ARTIFICIAL`, both on the current branch.

## Items:

This section lists the downstream work items produced, coordinated, or advanced by the plan, identifying blocking dependencies across resources of different owners.

| Resource / Record                                              | Status     |
| -------------------------------------------------------------- | ---------- |
| Iteration: Add Work Domain                                     | `DONE`     |
| Iteration: Split Iterations From Commits                       | `DONE`     |
| Iteration: Convert Templates to Directive Syntax               | `DONE`     |
| Iteration: Rebuild Domain Indexes                              | `DONE`     |
| Iteration: Add Domain and Workflow Structure                   | `DONE`     |
| Iteration: Update Fundamentals File                            | `DONE`     |
| Iteration: Integrate Work Domain With Others                   | `DONE`     |
| Iteration: Initialize Domains Knowledge                        | `DONE`     |
| Iteration: Initialize Architecture Knowledge                   | `DONE`     |
| Iteration: Normalize Structure Extends                         | `DONE`     |
| Iteration: Add Work Operations                                 | `DONE`     |
| Iteration: Collapse Work Scope to a Single Type                | `DONE`     |
| Iteration: Update or Create Work Skills and Routines           | `DONE`     |
| Iteration: Build Operations and Operating Instructions         | `DONE`     |
| Iteration: Formalize Iteration Commits Nesting                 | `DONE`     |
| Iteration: Use Work Routines and Operations in Write Plan      | `DONE`     |
| Iteration: Use Work Routines and Operations in Write Milestone | `DONE`     |
| Iteration: Declaring workflows in Guides                       | `PLANNING` |
| Iteration: Prompts for Migrating Active Plans                  | `PLANNING` |
| Iteration: Update Domain Listing                               | `DONE`     |
| Iteration: Update Agent Modes                                  | `PLANNING` |
| Iteration: Refactor Domain Index Routines                      | `DONE`     |
| Iteration: Integrate Specs Into Plans                          | `PLANNING` |
| Iteration: Update Domain Knowledge                             | `PLANNING` |

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

| ID                               | Repository / Checkout / Branch    | Policy             | Hash      | Status      |
| -------------------------------- | --------------------------------- | ------------------ | --------- | ----------- |
| `add-commit-policy`              | Workspace / `$WORKSPACE` / `main` | (pair-programming) | `da7c6d6` | `COMMITTED` |
| `fix-structural-and-formatting`  | Workspace / `$WORKSPACE` / `main` | (pair-programming) | `4137c15` | `COMMITTED` |
| `add-operation-and-instructions` | Workspace / `$WORKSPACE` / `main` | (pair-programming) | `271cbf7` | `COMMITTED` |
| `refactor-workflow-nesting`      | Workspace / `$WORKSPACE` / `main` | (pair-programming) | `3b098ea` | `COMMITTED` |
| `renames-domain-work`            | Workspace / `$WORKSPACE` / `main` | (pair-programming) | `6b578d0` | `COMMITTED` |
| `knowledge-workspace`            | Workspace / `$WORKSPACE` / `main` | (pair-programming) | `764e2e7` | `COMMITTED` |
| `chore-domain-work-templates`    | Workspace / `$WORKSPACE` / `main` | (pair-programming) | `3b78d1d` | `COMMITTED` |
| `typos-domain-work`              | Workspace / `$WORKSPACE` / `main` | (pair-programming) | `bce7adf` | `COMMITTED` |
| `update-domain-indexes`          | Workspace / `$WORKSPACE` / `main` | (pair-programming) | `0e2697d` | `COMMITTED` |

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

| ID                          | Repository / Checkout / Branch    | Policy     | Hash      | Status      |
| --------------------------- | --------------------------------- | ---------- | --------- | ----------- |
| `collapse-work-scope-types` | Workspace / `$WORKSPACE` / `main` | AUTONOMOUS | `c908e64` | `COMMITTED` |

##### Commit: `collapse-work-scope-types`

**Message:**

```
refactor(domains): Collapse work scope types into a single Work Scope Resource type.

- Rename `Type: Work Scope Item (Abstract)` to `Type: Work Scope Resource`.
- Remove concrete scope types (Project, Package, Repository, Deployment, Application).
- Add `partial` field to carry resource record partial.
- Update references in work-item-abstract and templates.
```

### Iteration: Update or Create Work Skills and Routines

**Id:** `update-work-skills-and-routines`

**Status:** `WORKING`

**Purpose:** Use the new Work abstractions and improved Milestone, Plan, Iteration and instructions when generating content.

**Description:** Refactor `write-milestone`, `write-plan` skills so that they work with new work abstractions, abstracting the common routines to Domain: Work. Extract inline routines from both skills into standalone `.art` files under `$DOMAINS/work/routines` and `$DOMAINS/plans/routines`, rewrite routines to use work abstractions (decomposed inputs, autonomous/interactive modes), strip both skills down to ::READ directives and commands, and clean up stale routines in the plans domain.

**Changes:**

New routines extracted from skills:

- Routine: Reading Guides (from both skills) → `Routine: Read Work Guides` — `$DOMAINS/work/routines/read-work-guides.art`. Outputs `List(Type: Knowledge Context)` instead of bare `reading-list`.
- Routine: Composing Path Variables (from write-plan) → `Routine: Compose Path Variables` — `$DOMAINS/work/routines/compose-path-variables.art`. Generalised to use `%scope` and `%context` instead of plan-specific types.
- Routine: Create OR Update Plan (from write-plan) → `Routine: Create OR Update Work Item` — `$DOMAINS/work/routines/create-or-update-work-item.art`. Generalised to any work item, invokes Compose Work Scope, Compose Work Context, Compose Path Variables, Compose Operating Instructions.
- Routine: Create or Update Instruction File (from write-plan) → `$DOMAINS/plans/routines/create-or-update-instructions.art`. Updated to use `%iteration` instead of `%commit`.

Renamed routines (from WIP placeholders):

- `Routine: Work Graph` → `Routine: Create Work Graph` — `$DOMAINS/work/routines/create-work-graph.art`. Replaces `$DOMAINS/work/routines/work-graph.art`.
- `Routine: Work Table` → `Routine: Create Work Table` — `$DOMAINS/work/routines/create-work-table.art`. Replaces `$DOMAINS/work/routines/work-table.art`.

Rewritten routines (using work abstractions):

- `Routine: Compose Operating Instructions` — `$DOMAINS/work/routines/compose-operating-instructions.art`. Inputs decomposed from `%work-item` to `%workflows`, `%upstream`, `%scope`, `%knowledge`, `%mode`. Steps expanded: scans upstream work items for instructions, consolidates resource and upstream instructions with workflow/stage/operation/source/definition fields. Added `interactive` mode with table presentation.
- `Routine: Compose Work Context` — `$DOMAINS/work/routines/compose-work-context.art`. Outputs flattened from `%context.upstream` to `%upstream`, `%knowledge`, `%required-skills`. Added `autonomous` and `interactive` modes with review and interview steps. Added `Reading Guides` step as entry point. Uses `Structure: Workflow Stage` for stage references.
- `Routine: Compose Work Scope` — `$DOMAINS/work/routines/compose-work-scope.art`. Removed `Path Ref` dependency. Added `autonomous` and `interactive` modes with review and interview steps. Added `owner` field handling.
- `Routine: Compose Work Operations` — `$DOMAINS/work/routines/compose-work-operations.art`. Removed stale `Operating Instructions` read. Cleaned formatting. Returns `%operations` list directly.

**Instructions:** `./plan-workflows-make-work-flow/instructions/update-work-skills-and-routines.md`

**Report:** `./plan-workflows-make-work-flow/instructions/update-work-skills-and-routines__report.md`

#### Commits:

| ID                                   | Repository / Checkout / Branch    | Policy       | Hash      | Status      |
| ------------------------------------ | --------------------------------- | ------------ | --------- | ----------- |
| `extract-work-routines`              | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `96046d4` | `COMMITTED` |
| `clean-up-typos-and-rename-routines` | Workspace / `$WORKSPACE` / `main` | `MANUAL`     | `601b7e9` | `COMMITTED` |

##### Commit: `extract-work-routines`

**Message:**

```
refactor(skills): Extract work routines from write-plan and write-milestone skills

- Extract compose-work-scope, compose-work-context, compose-work-operations, compose-operating-instructions routines to $DOMAINS/work/routines/
- Update write-plan skill with ::READ directives for new routines
- Update write-milestone skill with ::READ directives for new routines
- Add Routines section to work domain index
```

##### Commit: `clean-up-typos-and-rename-routines`

**Message:**

```
typos(domains): Clean up typos, stale references, and rename work routines

- Fix typos across templates and structures: "bcome", "buller", "superseeded", "NaturalExpresion", "listof"
- Fix stale workflow/stage names in plan.art and work-item-abstract examples
- Fix corrupted context.upstream line and duplicate ## Uses in work-item-abstract
- Fix wrong loop variables in plan.tart (%item) and milestone.tart (%item)
- Delete stale plans/routines (planning-graph, planning-table), rename work-graph/work-table to create-work-*
- Add missing ::READ in operating-instructions, roadmaps/definitions, and add Workflow ::READ to plan.art
- Fix operation.art examples to quoted format, commit.art field ordering, milestone.art inherits
```

### Iteration: Build Operations and Operating Instructions

**Id:** `build-operations-and-operating-instructions`

**Status:** `DONE`

**Purpose:** Compose Operational Instructions in work items to ensure they are included in downstream records. Use Case: Instructions in plans inform writing iterations and instruction files.

**Description:** The Workflow Stage intermediate layer added indirection without value — operations are the only meaningful unit. This iteration deletes `Structure: Workflow Stage`, renames all `stage.art` files to `operation.art`, re-nests `ops/` subdirectories as sibling operations, and updates all structures, types, templates, and routines to compose `operations` instead of `stages`.

**Changes:**

Structural changes:

- Delete `Structure: Workflow Stage` (`$DOMAINS/work/structures/workflow-stage.art`).
- Update `Structure: Workflow` — replace `stages` field with `operations` field (`List(Structure: Operation)`).
- Update `Structure: Operation` — remove `stage` field, add `definition` field (Path to operation declaration).

Workflow file conversions (all `stage.art` → `operation.art`):

- Deploying: 5 stages → 5 operations, re-nest `ops/` as sibling operations.
- Roadmapping: 5 stages → 5 operations.
- Planning Work: 5 stages → 6 operations (re-nest `writing-commit-messages` from `ops/`).
- Executing Work: 5 stages → 10 operations (re-nest 5 `ops/` as sibling operations).
- Delegating Work: 4 stages → 4 operations.

Type updates:

- `Type: Knowledge Context` — replace `stages` field with `operations` field.
- `Type: Skill Context` — replace `stages` field with `operations` field.
- `Type: Operating Instructions` — remove `stage` field, update `operation` field to reference `Structure: Operation` directly.

Template updates:

- `$DOMAINS/work/templates/operating-instructions.tart` — iterate operations instead of stages.
- `$DOMAINS/work/templates/work-item-context.tart` — replace workflow stages section with operations section.
- `$DOMAINS/plans/templates/plan.tart` — update operating instructions template reference.
- `$DOMAINS/roadmaps/templates/milestone.tart` — update workflow stage references.

Structure and type file updates:

- `$DOMAINS/work/structures/work-item-abstract.art` — replace `stages` field with `operations` field.
- `$DOMAINS/plans/structures/plan.art` — remove `::READ (Structure: Workflow Stage)`, update inherits examples.
- `$DOMAINS/roadmaps/structures/milestone.art` — update inherits examples.

Guide updates:

- `_guide.md` — update workflow stage references to operations.

**Instructions:** `./plan-workflows-make-work-flow/instructions/build-operations-and-operating-instructions.md`

#### Commits:

| ID                                  | Repository / Checkout / Branch    | Policy   | Hash      | Status      |
| ----------------------------------- | --------------------------------- | -------- | --------- | ----------- |
| `remove-workflow-stage-abstraction` | Workspace / `$WORKSPACE` / `main` | `MANUAL` | `8ade51e` | `COMMITTED` |
| `rename-stages-to-operations`       | Workspace / `$WORKSPACE` / `main` | `MANUAL` | `0f1ee94` | `COMMITTED` |
| `update-guide-for-operations`       | Workspace / `$WORKSPACE` / `main` | `MANUAL` | `9c90f97` | `COMMITTED` |

##### Commit: `remove-workflow-stage-abstraction`

**Message:**

```
build(domains): Operations and Operating Instructions completely replace Worfklow Stages

- Delete Structure: Workflow Stage, update Structure: Workflow to compose Operations directly
- Update Structure: Operation: remove stage field, add definition field
- Delete workflow-stage.art, update work-item-abstract and plan structures
- Update Type: Knowledge Context, Skill Context, Operating Instructions to use operations
- Add operating-instructions.tart template for rendering operations
- Extract routines: read-work-guides, compose-path-variables, create-or-update-work-item, create-or-update-instructions
```

##### Commit: `rename-stages-to-operations`

**Message:**

```
renames(domains): "stages" replaced with "operations" in fundamentals
```

##### Commit: `update-guide-for-operations`

**Message:**

```
conventions(commits): reference "Writing Commit Messages" operational instructions
```

### Iteration: Formalize Iteration Commits Nesting

**Instructions:** `./plan-workflows-make-work-flow/instructions/iteration-commit-nesting.md`

**Report:** `./plan-workflows-make-work-flow/instructions/iteration-commit-nesting__report.md`

**id:** `iteration-commit-nesting`

**Status:** `DONE`

**Purpose:** Make status of iterations more ergonomic, more readable, and easier to update.

**Description:** Add notes to commits and express them in a terse table, followed by commit messages and notes.

**Changes:**

- Add "Template: Commit" in `$DOMAINS/commits/templates/commit.tart`
- Update "Template: Plan" — `$DOMAINS/plans/templates/plan.tart` — to render the commits template before `::END(Iterations)`.
- Add `notes` field to Type: Commit.
- Add Type: Commit Status
- Change "Type: Commit Policy" options: `CONTROLLED` => `NOPUSH` and `BLOCKED` => `NOCOMMIT`
- Update "Agent: Worker" to handle new commit policies
- Convert "Template: Instructions" to latest ::TEMPLATE directive syntax
- Replace hardcoded Setup/Verification by rendering Operational Instructions template.
- Convert "Template: Instructions" render loop to follow flat series of steps/commits

#### Commits:

| ID                                            | Repository / Checkout / Branch    | Policy       | Hash      | Status      |
| --------------------------------------------- | --------------------------------- | ------------ | --------- | ----------- |
| `add-commit-template`                         | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `dd8f814` | `COMMITTED` |
| `change-commit-policy-options`                | Workspace / `$WORKSPACE` / `main` | `BLOCKED`    | `6065c85` | `COMMITTED` |
| `operating-instructions-in-instructions-file` | Workspace / `$WORKSPACE` / `main` | `NOPUSH`     | `deebeaf` | `COMMITTED` |

##### Commit: `add-commit-template`

```
build(domains): Render commits table and messages in plan iterations.

- Add "Template: Commit"
- Update "Template: Plan" to render the commits template.
```

##### Commit: `change-commit-policy-options`

```
build(domains): Render commits table and messages in plan iterations.

- Add Type: Commit Status.
- Change Type: Commit Policy — CONTROLLED becomes NOPUSH and BLOCKED becomes NOCOMMIT.
- Add `notes` field to Type: Commit.
- Add "Template: Commit"
- Update "Agent: Worker" to new commit policy names.
```

##### Commit: `operating-instructions-in-instructions-file`

**Policy:** NOPUSH

```
build(domains): Render Operating Instructions in instruction files.

- Upgrade operating-instructions.tart to ::TEMPLATE syntax, add conditional metadata rendering.
- Convert instructions.tart to ::TEMPLATE syntax, render Operating Instructions after Mandatory Reading.
- Flatten instruction steps, remove hardcoded Setup/Verification sections.
- Rename writing-commit-messages to writing-commit-message in _guide and conventions.
```

### Iteration: Use Work Routines and Operations in Write Plan

**Id:** `routines-and-ops-in-write-plan`

**Status:** `WORKING`

**Purpose:** Coordinate planning workflow operations via skills.

**Description:** Rewrite the `write-plan` skill to delegate to the abstract work routines for scope, context, operations, and operating instructions. Replace the skill's inline routines with `::READ` directives to `$DOMAINS/work/routines/`. Simplify commands to match the actual planning workflow: create plan, draft iterations, plan iterations (define commits), create/update instructions.

**Changes:**

Domain: Work — Routines:

- Add `recompose-work-item.art`, `compact-work-item.art`, `integrate-work-upstream.art`, `integrate-work-downstream.art`, `validate-work-item.art`.
- Fix `compose-work-scope.art`, `compose-work-context.art`, `compose-work-operations.art`, `compose-operating-instructions.art`, `compose-path-variables.art`.
- Fix `create-or-update-work-item.art` broken Workflow read and variable names.
- Update `work-item-abstract.art`, `workflow.art`, `work-item-context.tart`.

Domain: Plans — Routines:

- Add `create-or-update-plan.art`, `draft-iterations.art`, `plan-iterations.art`, `write-instructions.art`.
- Add `validate-plan.md`, `validate-instructions.art`, `compact-plan.art`.
- Add `integrate-plan-upstream.art`, `integrate-plan-instructions.art`, `integrate-plan-reports.art`.
- Remove `create-or-update-instructions.art` (superseded by `write-instructions` + `instructions.tart`).
- Update `plan.art`, `instructions.tart`, `plan.tart`, `milestone.art`.

Skill: write-plan:

- Replace inline procedures with routine delegation for Create Plan, Validate Plan, Write Instructions.
- Add commands: Add Iteration Drafts, Plan Iterations, Integrate Upstream, Integrate Plan Instructions, Compact Plan.
- Add Command: Review or Save Plan to centralise render/save/present pattern.

Skill: agent-architect, agent-planner:

- Update to reference new work and plan routines.

**Instructions:** `./plan-workflows-make-work-flow/instructions/routines-and-ops-in-write-plan.md`

**Scope:** `$SKILLS/write-plan/SKILL.md`

#### Commits:

| ID                                   | Repository / Checkout / Branch    | Policy       | Hash      | Status      |
| ------------------------------------ | --------------------------------- | ------------ | --------- | ----------- |
| `flatten-executing-work`             | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `6de57a0` | `COMMITTED` |
| `add-work-routines`                  | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `9971db2` | `COMMITTED` |
| `add-plan-routines`                  | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `c13d69a` | `COMMITTED` |
| `rewrite-write-plan-skill`           | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `9d82b39` | `COMMITTED` |
| `update-agent-architect-and-planner` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `5d347b8` | `COMMITTED` |

##### Commit: `flatten-executing-work`

**Message:**

```
build(domain-work): flatten Workflow: Executing Work; remove redundant operation
```

##### Commit: `add-work-routines`

**Message:**

```
build(workflows-make-work-flow): Add new work routines for upstream/downstream integration and recomposition

- Add recompose-work-item, compact-work-item, integrate-work-upstream, integrate-work-downstream, validate-work-item routines
- Fix compose-work-scope, compose-work-context, compose-work-operations, compose-operating-instructions, compose-path-variables routines
- Fix create-or-update-work-item routine broken Workflow read and variable names
- Update work-item-abstract.art with full field definitions
- Update workflow.art and work-item-context.tart for new operations model
```

##### Commit: `add-plan-routines`

**Message:**

```
build(workflows-make-work-flow): Add plan routines for plan lifecycle and validation

- Add create-or-update-plan, draft-iterations, plan-iterations, write-instructions routines
- Add validate-plan, validate-instructions, compact-plan routines
- Add integrate-plan-upstream, integrate-plan-instructions, integrate-plan-reports routines
- Remove create-or-update-instructions (superseded by write-instructions + instructions.tart)
- Update plan.art, instructions.tart, plan.tart, milestone.art for new structure
```

##### Commit: `rewrite-write-plan-skill`

**Message:**

```
build(workflows-make-work-flow): Rewrite write-plan skill with routine-delegating commands

- Replace inline procedures with routine delegation for Create Plan, Validate Plan, Write Instructions
- Add commands: Add Iteration Drafts, Plan Iterations, Integrate Upstream, Integrate Plan Instructions, Compact Plan
- Add Command: Review or Save Plan to centralise render/save/present pattern
- Fix all commands to use autonomous/interactive presentation modes
- Remove WIP commands and stale inline routines
```

##### Commit: `update-agent-architect-and-planner`

**Message:**

```
build(workflows-make-work-flow): Update agent-architect and agent-planner skills

- Update agent-architect to reference new work routines for Work Graph and Work Table commands
- Update agent-planner to reference new plan routines for planning workflow
- Remove stale references to deleted routines
```

### Iteration: Use Work Routines and Operations in Write Milestone

**Id:** `routines-and-ops-in-write-milestone`

**Status:** `DONE`

**Purpose:** Coordinate planning workflow operations via skills.

**Description:** Rewrite the `write-milestone` skill to delegate to the abstract work routines for scope, context, operations, and operating instructions. Replace the skill's inline routines with `::READ` directives to `$DOMAINS/work/routines/`. Simplify commands to match the actual planning workflow: create milestone, validate, integrate upstream/downstream, compact. Milestones differ from plans: they have phases instead of iterations, and no instructions files — downstream is just work items.

**Changes:**

Domain: Roadmaps — Routines:

- Add `create-or-update-milestone.art` — delegates to Create OR Update Work Item + Validate Milestone.
- Add `validate-milestone.md` — validates milestone phases (ordered, items belong to phase, phases table lists all known items), refs, and paths.
- Add `compact-milestone.art` — reduces verbosity, keeps essential info.
- Add `integrate-milestone-upstream.art` — analyses drift between upstream and milestone.
- Add `integrate-milestone-downstream.art` — integrates findings from downstream work items.

Domain: Roadmaps — Templates:

- Fix `milestone.tart` — ensure phases table and items table are consistent with validation.

Skill: write-milestone:

- Fix stale refs (plan→milestone, .md→.art) and typos.
- Rewrite commands to delegate to routines.
- Add Command: Review or Save Milestone.
- Remove WIP commands and stale inline routines.

**Instructions:** `./plan-workflows-make-work-flow/instructions/routines-and-ops-in-write-milestone.md`

**Scope:** `$SKILLS/write-milestone/SKILL.md`

#### Commits:

| ID                              | Repository / Checkout / Branch    | Policy       | Hash      | Status      |
| ------------------------------- | --------------------------------- | ------------ | --------- | ----------- |
| `add-milestone-routines`        | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `cb5f667` | `COMMITTED` |
| `rewrite-write-milestone-skill` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `7741ad5` | `COMMITTED` |

### Iteration: Declaring workflows in Guides

**id:** `workflows-in-guides`

**Status:** `PLANNING`

**Purpose:** Replace stale Setup/Verification/Workflow sections in all `_guide.md` files with the new Workflows and Operating Instructions sections.

**Description:** Scan all `_guide.md` files across checkouts. Replace `## Setup`, `## Verification`, `## Setting up`, `## Verifying`, `## Planning Workflow`, `## Delivery Workflow`, and similar sections with `## Workflows` and `## Operating Instructions` sections following the pattern established in `$ART_DOMAINS/_guide.md`.

**Changes:**

Identify the `_guide.md` files to create or update:

- There must be a **repository guide** at the root of each checkout (`$REPOSITORY/_guide.md`).
- There must be a **package guide** next to every nested `package.json` file (`$REPOSITORY/{path}/_guide.md`).

For each `_guide.md` file to create or update:

1. **Remove** all `## Setup`, `## Verification`, `## Setting up`, `## Verifying`, `## Configuring`, `## Deploying`, `## Planning Workflow`, `## Delivery Workflow`, `## Workflow`, and `## {something} Workflow` sections.

2. **Update** the "Recommended Reading" prose: change "Agents SHOULD scan these files for relevant clarifications when faced with ambiguity or omissions that may result from missing definitions." to "Agents SHOULD scan these files for definitions and resource locations when faced with uncertainty or ambiguity that may result from missing resources."

3. **Add** a `## Workflows` section with a `### Planning Work` subsection — only if `_backlog/` exists in the repository or package, `_backlog.md` and/or `_roadmap/` only if they exist and listing `_backlog/_parking-lot.md` and `_backlog/_architect.md` only if they exist.

```md
## Workflows

### Planning Work

This project plans its work with the workflow defined in `$DOMAINS/work/workflows/planning-work/workflow.art`.

- The roadmap lives at `_roadmap/` with subdirectories such as `/3-now` and `/4-next/`.
- The backlog lives at `_backlog/` with subdirectories such as `/3-now` and `/4-next/`.
- The short-term focus is captured in `_backlog/_parking-lot.md`.
- The requirements, use cases, and principles are captured in `_backlog/_architect.md`.
```

4. **Add** an `## Operating Instructions` section — always. Consult `package.json` for available scripts. Use the same operating instructions across packages where applicable (Writing Commit Message, Setting Up, Verifying Completion).

5. **Repository guide** — also ensure these sections exist (skip if not applicable):
   - `## Repository Layout` — list key files only, and only those that exist, not all files. Good Examples:
     ```
     _guide.md           — this file
     _backlog/           — plans, instructions, reports
     _records/           — project and repository records
     architecture/       — description, principles, ADRs
     ```
     Bad Examples: "LICENSE-MIT", "package.json", "README.md".
   - `## Projects` — only if projects exist
   - `## Records Management`
   - `## Knowledge References`

6. **Package guide** — also ensure these sections exist:
   - `## Package Layout` — list key directories and files only, and only those that exist, not all files. Good example:
     ```
     _guide.md           — this file
     _backlog/           — plans, instructions, reports
     _records/           — project and repository records
     architecture/       — description, principles, ADRs
     src/                - source code
     tests/              - integration tests
     CHANGELOG.md
     ```
     Bad Examples: "LICENSE-MIT", "package.json", "README.md".
   - `## Records Management` — derived from `_records/` directories
   - `## Knowledge References` — derived from `architecture/`, `docs/`, `references/`

#### Commmits:

| ID             | Repository / Checkout / Branch                    | Policy       | Hash      | Status      |
| -------------- | ------------------------------------------------- | ------------ | --------- | ----------- |
| `update-guide` | Artificials / `$ARTIFICIALS` / `main`             | `CONTROLLED` | `TBD`     | `READY`     |
| `update-guide` | Art JS / `$ART_JS` / `main`                       | `CONTROLLED` | `TBD`     | `READY`     |
| `update-guide` | Artisans / `$ARTISANS` / `main`                   | `CONTROLLED` | `TBD`     | `READY`     |
| `update-guide` | Conventions / `$CONVENTIONS` / `main`             | `CONTROLLED` | `fb2a74e` | `COMMITTED` |
| `update-guide` | No comply / `$NO_COMPLY` / `main`                 | `CONTROLLED` | `e3a238a` | `COMMITTED` |
| `update-guide` | Ops / `$OPS` / `main`                             | `CONTROLLED` | `TBD`     | `READY`     |
| `update-guide` | Purrception / `$PURRCEPTION` / `main`             | `CONTROLLED` | `TBD`     | `READY`     |
| `update-guide` | Purrfect / `$PURRFECT` / `main`                   | `CONTROLLED` | `TBD`     | `READY`     |
| `update-guide` | Purrpose / `$PURRPOSE` / `main`                   | `CONTROLLED` | `TBD`     | `READY`     |
| `update-guide` | Purrtrait / `$PURRTRAIT` / `main`                 | `CONTROLLED` | `TBD`     | `READY`     |
| `update-guide` | Workspace Tooling / `$WORKSPACE_TOOLING` / `main` | `CONTROLLED` | `TBD`     | `READY`     |
| `update-guide` | Noodlestan Web / `$NOODLESTAN_WEB` / `main`       | `CONTROLLED` | `TBD`     | `READY`     |

##### Commit: `update-guide`

```
docs(domains): Update guides to follow new conventions

- Remove Setup, Verification, Planning Workflow, Delivery Workflow sections
- Add Workflows section with Planning Work subsection
- Add Operating Instructions section with Writing Commit Message, Setting Up, Verifying Completion
- Update Recommended Reading prose
- Add _guide.md to every package (cli, lib, application)
```

### Iteration: Prompts for Migrating Active Plans

**Instructions:** `./plan-workflows-make-work-flow/instructions/migration-prompts.md`

**Report:** `./plan-workflows-make-work-flow/instructions/migration-prompts__report.md`

**id:** `migration-prompts`

**Status:** `PLANNING`

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

### Iteration: Update Domain Listing

**id:** `update-domain-listing`

**Status:** `DONE`

**Purpose:** Update domain index template to render operations as a table, regenerate all domain indexes, update domain listing routine and template, regenerate listing.

**Changes:**

- Update `$DOMAINS/domains/templates/domain-index-file.tart` — reorder sections (Definitions, Structures, Operations, Workflows, Routines, Types, Templates, Files), render operations as table with "Workflow" and "Operation – File" columns
- Regenerate all 13 domain indexes with correct section order and operations table
- Update `$DOMAINS/domains/routines/generate-domain-listing.art` — rewrite based on build-domain-index.art, collect %resources per domain
- Update `$DOMAINS/domains/templates/domains-listing.tart` — new directive syntax, add operations table, reorder sections
- Regenerate `$DOMAINS/index.md` domains listing

**Commits:**

| ID                         | Repository / Checkout / Branch    | Policy   | Hash      | Status      |
| -------------------------- | --------------------------------- | -------- | --------- | ----------- |
| `rewrite-domain-templates` | Workspace / `$WORKSPACE` / `main` | `MANUAL` | `92d4cae` | `COMMITTED` |
| `rebuild-domain-indexes`   | Workspace / `$WORKSPACE` / `main` | `MANUAL` | `c04d00d` | `COMMITTED` |

### Iteration: Update Agent Modes

**id:** `update-agent-modes`

**Status:** `PLANNING`

**Purpose:** Update agent modes to work with new plan structure and extracted routines.

**Description:** Update agent mode definitions to reference the new work domain routines and follow updated conventions.

**Changes:**

- Update architect agent mode to reference new work routines
- Update planner agent mode to reference new work routines
- Update delegator agent mode to reference new work routines
- Update worker agent mode to reference new work routines
- Update backlog-manager agent mode to reference new work routines

**Scope:** `.agents/skills/agent-*/SKILL.md` files

**Key updates:**

- Add `::READ` directives for work domain routines
- Update skill alignment sections
- Update mandatory reading sections
- Ensure consistent reference patterns across all modes

### Iteration: Refactor Domain Index Routines

**id:** `refactor-domain-index-routines`

**Status:** `DONE`

**Purpose:** Simplify domain index generation into a single reusable routine and template.

**Description:** Replace the old extract-domain-api routines and domain-table-of-contents template with a new build-domain-index routine and domain-index-file template. Rebuild all 13 domain indexes from domain.art files.

**Changes:**

- Add `$DOMAINS/domains/routines/build-domain-index.art` — reads domain.art, scans resources, produces %domain and %resources
- Add `$DOMAINS/domains/templates/domain-index-file.tart` — renders index.md from %domain and %resources
- Delete `$DOMAINS/domains/routines/extract-domain-api.art`, `extract-domain-api-from-files.art`, `extract-domain-api-tree-from-files.art`
- Delete `$DOMAINS/domains/templates/domain-table-of-contents.tart`
- Update `$SKILLS/update-domains/SKILL.md` with 2 commands: Update Domain, Update All Domains
- Rebuild all 13 domain indexes (domains with domain.art)

**Scope:** `$DOMAINS/domains/` directory

**Commits:**

| ID                               | Repository / Checkout / Branch    | Policy   | Hash      | Status      |
| -------------------------------- | --------------------------------- | -------- | --------- | ----------- |
| `refactor-domain-index-routines` | Workspace / `$WORKSPACE` / `main` | `MANUAL` | `c7c4ac6` | `COMMITTED` |
| `update-domains-skill`           | Workspace / `$WORKSPACE` / `main` | `MANUAL` | `c7c4ac6` | `COMMITTED` |
| `rebuild-all-domain-indexes`     | Workspace / `$WORKSPACE` / `main` | `MANUAL` | `c7c4ac6` | `COMMITTED` |

### Iteration: Integrate Specs Into Plans

**id:** `integrate-specs-into-plans`

**Status:** `PLANNING`

**Purpose:** Integrate specification structures into plan workflow.

**Description:** Connect Type: Spec (Abstract) into plan structure and template for specification-driven planning.

**Changes:**

- Add spec reference field to `$DOMAINS/plans/structures/plan.art`
- Update `$DOMAINS/plans/templates/plan.tart` to render spec section
- Add spec context type if needed for linking specs to plans
- Update work-item-abstract.art to support spec references

**Scope:** `$DOMAINS/plans/` and `$DOMAINS/specs/` directories

**Key integration points:**

- Plan structure gets optional `specs` field
- Plan template renders spec references in context section
- Specs become first-class resources in plan scope

### Iteration: Update Domain Knowledge

**id:** `update-domain-knowledge`

**Status:** `PLANNING`

**Purpose:** Document how domains work with new structures and workflows.

**Description:** Update the architecture knowledge base to reflect new domain structures, workflows, and routines.

**Changes:**

- Update `$ART_DOMAINS/architecture/reference-model.md` with new domain boundaries
- Update `$ART_DOMAINS/architecture/reference-workflows.md` with new workflow definitions
- Update domain index documentation for all affected domains
- Document new work domain structures and routines

**Scope:** `$ART_DOMAINS/architecture/` directory

**Key updates:**

- Reference model reflects new work domain structures
- Workflows documented with stages and operations
- Domain indexes updated with new resources

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
- **Explicit Operating instructions rendering** The writing skills (`write-milestone`, `write-plan`) still need to invoke Routine: Compose Workflow Operations and Routine: Identify Operating Instructions to discover operations from knowledge and scope resources. The routine receives workflows as input and returns List(Type: Operating Instructions). The caller filters by stage as needed. When writing instructions files, the skill should: 1. Populate scope and context using Compose Work Scope and Compose Work Context. 2. Pass the work item's workflows to the routine. 3. Receive the list of operating instructions. 4. Render relevant operating instructions in milestone, plan, and instruction files.

## Feedback

### Iteration: Formalize Iteration Commits Nesting

- **Commit 1 (`add-commit-template`) not pushed** — Policy was AUTONOMOUS, which requires pushing. Worker committed locally but did not push to remote.
- **Report file not created** — Instructions required creating `iteration-commit-nesting__report.md` using the report template. Worker did not generate this file.
- **All code changes correct** — All 3 commits contain the correct file changes and commit messages.
