# Plan: Add Guides Domain

**ID:** `add-guides-domain`

**Status:** `DONE`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Promote the `noodlestan` prototype directory into the `guides` domain and land the two migrate routines in their owning domains.

**Description:** Move the guide routines and templates out of the `noodlestan` prototype into `guides`, correcting their names and template references, and place `Migrate Plan` in `plans` and `Migrate Milestone` in `roadmaps`, rewritten to project any source material onto the current structures and templates.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

This section lists the path variables used throughout the plan file and its downstream work items. All file references in the plan and downstream work items MUST use these variables — never bare filesystem paths.

| Variable     | Resolved Path                | Purpose                                               |
| ------------ | ---------------------------- | ----------------------------------------------------- |
| `$WORKSPACE` | Current working directory    | Repository where the domain resources directory lives |
| `$PROJECT`   | Provided with prompt         | Where this milestone and plans live                   |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources directory                            |

## Summary

Promote the `noodlestan` prototype directory into the `guides` domain and land the two migrate routines in their owning domains, so guide generation and work-item migration are addressed by the domain that owns them.

## Context

### Upstream Work

| Kind      | Path                                                          | Role                                                     |
| --------- | ------------------------------------------------------------- | -------------------------------------------------------- |
| Milestone | `$PROJECT/_roadmap/4-next/milestone-domains-one/milestone.md` | Coordinates Phase 2 domain extension and owns this plan. |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Refining.

### Domains

| Domain / Path                                 | Description                                                                                 |
| --------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Domain: Guides `$DOMAINS/guides/index.md`     | Owns the guide routines and templates moved out of the prototype.                           |
| Domain: Plans `$DOMAINS/plans/index.md`       | Receives `Routine: Migrate Plan`, rewritten to target the current Plan structure.           |
| Domain: Roadmaps `$DOMAINS/roadmaps/index.md` | Receives `Routine: Migrate Milestone`, rewritten to target the current Milestone structure. |

### Resource Kinds in Scope

| Kind    | Domain   | Structure Record Path                    |
| ------- | -------- | ---------------------------------------- |
| Routine | Guides   | `$DOMAINS/domains/structures/domain.art` |
| Routine | Plans    | `$DOMAINS/domains/structures/domain.art` |
| Routine | Roadmaps | `$DOMAINS/domains/structures/domain.art` |

### Workflows

| Workflow / Path                                                      | Purpose                                                                                          |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Planning Work `$DOMAINS/work/workflows/planning-work/workflow.art`   | Create and manage work item lifecycle, collecting operational instructions according to context. |
| Executing Work `$DOMAINS/work/workflows/executing-work/workflow.art` | Organize work execution to produce completed, verified outcomes and feedback.                    |

### Workflow Operations

| Workflow / Operation / Path                                                                                         | Purpose                                                       |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Planning Work / Planning Work Item `$DOMAINS/work/workflows/planning-work/planning-work-item/operation.art`         | Refine iterations with precise purpose, changes, and commits. |
| Planning Work / Writing Commit Message `$DOMAINS/work/workflows/planning-work/writing-commit-message/operation.art` | Write standardized commit messages from the conventions.      |
| Executing Work / Setting Up `$DOMAINS/work/workflows/executing-work/setting-up/operation.art`                       | Install dependencies and verify a green baseline.             |
| Executing Work / Verifying Completion `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`   | Confirm the work item satisfies its intended outcome.         |

### Knowledge

::READ `$WORKSPACE/_guide.md` (Guide) — Defines workspace operations, path variables, and verification. Relevant for Planning Work Item, Setting up, Verifying Completion.

::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` (Conventions) — Allowed commit types, scopes, and message format. Relevant for Writing Commit Message.

## Scope

The plan touches three domains in one repository:

- **Guides** — the prototype directory becomes the domain directory; routine and template references are corrected.
- **Plans** — receives `Routine: Migrate Plan`, rewritten against the current Plan structure and templates.
- **Roadmaps** — receives `Routine: Migrate Milestone`, rewritten against the current Milestone structure and templates.

All commits land in `$WORKSPACE`; the prototype directory is fully consumed by this iteration.

### (Scope) Domain: Guides

**Record:** `$DOMAINS/guides/domain.art`

**Role:** — Owns the guide routines and templates promoted from the prototype.

**Partial:**

- `name` — Guides, renamed from `Noodlestan`.
- `boundaries` — added; the prototype record carried none.

**Changes:**

— Move `$DOMAINS/noodlestan/` to `$DOMAINS/guides/`.
— Rename `Create Project Guide` to `Create or Update Project Guide` and `Create Package Guide` to `Create or Update Package Guide`, matching their filenames.
— Repoint the routines' template reads from `$DOMAINS/noodlestan/templates/` to `$DOMAINS/guides/templates/`.
— Rename the domain record heading to `## Domain: Guides` and add a `**Boundaries:**` field.
— Remove the prototype `domain.art` and `index.md` once their content is carried forward.

**Operations:**

— Confirm no file under `$DOMAINS/` references `$DOMAINS/noodlestan/`.

**Dependencies:**

- None.

### (Scope) Domain: Plans

**Record:** `$DOMAINS/plans/routines/migrate-plan.art`

**Role:** — Receives the migrated plan routine.

**Partial:**

- `purpose` — project any plan source material onto the current Plan structure and templates.

**Changes:**

— Move `Routine: Migrate Plan` out of the prototype into `$DOMAINS/plans/routines/`.
— Rewrite the procedure to read the target structure, types, and templates first, then populate every declared field from the source, instead of mapping a specific historical format.
— Fix the module heading typo in `$DOMAINS/plans/structures/iteration.art`.
— Change the Plans boundary dependency from Roadmaps to Milestones.

**Operations:**

— Confirm every `::READ` target in the routine resolves.

**Dependencies:**

- None.

### (Scope) Domain: Roadmaps

**Record:** `$DOMAINS/roadmaps/routines/migrate-milestone.art`

**Role:** — Receives the migrated milestone routine.

**Partial:**

- `purpose` — project any milestone source material onto the current Milestone structure and templates.

**Changes:**

— Move `Routine: Migrate Milestone` out of the prototype into `$DOMAINS/roadmaps/routines/`.
— Rewrite the procedure to read the target structure, types, and templates first, then populate every declared field from the source, instead of mapping a specific historical format.

**Operations:**

— Confirm every `::READ` target in the routine resolves.

**Dependencies:**

- None.

## Execution Context

Execution is performed from `$WORKSPACE/` on branch `main`. All three commits land in the workspace meta-repository; no checkout or package path is involved.

---

## Items:

This section lists the iterations produced, coordinated, or advanced by the plan, identifying blocking dependencies across resources of different owners.

| Iteration                                             | Status |
| ----------------------------------------------------- | ------ |
| Iteration: Promote Guides Domain and Migrate Routines | `DONE` |

### Iteration: Promote Guides Domain and Migrate Routines

**Id:** `promote-guides-domain-and-migrate-routines`

**Status:** `DONE`

**Purpose:** Land the `guides` domain and the two migrate routines in their owning domains.

**Description:** Move the prototype directory into `guides` and correct its routine names and template references, place `Migrate Plan` in `plans` and `Migrate Milestone` in `roadmaps` rewritten against the current structures, fix the iteration module heading typo, and correct the Plans boundary dependency.

**Changes:**

- Move `$DOMAINS/noodlestan/` to `$DOMAINS/guides/`.
- Rename both guide routines to match their `create-or-update-*` filenames.
- Repoint guide routine template reads from `$DOMAINS/noodlestan/templates/` to `$DOMAINS/guides/templates/`.
- Rename `## Domain: Noodlestan` to `## Domain: Guides` and add a `**Boundaries:**` field to the record.
- Move `Routine: Migrate Plan` to `$DOMAINS/plans/routines/migrate-plan.art` and rewrite it to project any source onto the current Plan structure and templates.
- Move `Routine: Migrate Milestone` to `$DOMAINS/roadmaps/routines/migrate-milestone.art` and rewrite it to project any source onto the current Milestone structure and templates.
- Fix the module heading typo in `$DOMAINS/plans/structures/iteration.art`.
- Change the Plans boundary dependency from Roadmaps to Milestones.

**Dependencies:**

- None.

#### Commits:

| ID                      | Repository / Checkout / Branch    | Policy       | Hash      | Status      |
| ----------------------- | --------------------------------- | ------------ | --------- | ----------- |
| `build-domain-guides`   | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `d2ce39b` | `COMMITTED` |
| `build-domain-plans`    | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `880e82b` | `COMMITTED` |
| `build-domain-roadmaps` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `09ff514` | `COMMITTED` |

##### Commit: build-domain-guides

**Repository:** Workspace

**Message:**

```
build(domain-guides): Add Domain: Guides based on "noodlestan" prototype.

- Move .agents/domains/noodlestan/ to .agents/domains/guides/
- Rename "Create Project Guide" to "Create or Update Project Guide"
- Rename "Create Package Guide" to "Create or Update Package Guide"
- Fix template references to $DOMAINS/guides/templates/
- Rename "Domain: Noodlestan" to "Domain: Guides"
- Add **Boundaries:** field to .agents/domains/guides/domain.art
```

##### Commit: build-domain-plans

**Repository:** Workspace

**Message:**

```
build(domain-plans): Add Routine: Migrate Plan.

- Move Routine: Migrate Plan from the "noodlestan" prototype to Plans
- Rewrite routine to project any source material onto the current Plan structure and templates
- Fix module heading typo in structures/iteration.art
- Change Plans boundary dependency from Roadmaps to Milestones
```

##### Commit: build-domain-roadmaps

**Repository:** Workspace

**Message:**

```
build(domain-roadmaps): Add Routine: Migrate Milestone.

- Move Routine: Migrate Milestone from the "noodlestan" prototype to Roadmaps
- Rewrite routine to project any source material onto the current Milestone structure and templates
```

## Work

### Next

No next move; all iterations are `DONE` and their commits are `COMMITTED` in `$WORKSPACE`.

---

## Coordination

### Not In Scope

- **Domain listing update** — `.agents/domains/index.md` is regenerated separately, after this plan's commits land.

### Evidence

- **Guide domain resolves** — no file under `$DOMAINS/` references `$DOMAINS/noodlestan/` after the move.
- **Migrate routines resolve** — every `::READ` target in both routines resolves to an existing file.

### Findings

- **Plan name understates scope** — the plan is named for the Guides domain, but two of its three commits land in the Plans and Roadmaps domains; they travel together because they all consume the same prototype directory.

### Decisions

- **One iteration, three commits** — the moves are sequential because each consumes part of the same prototype directory, so splitting them across iterations would leave a half-migrated directory between them.

### Knowledge to Update

- **`$DOMAINS/guides/index.md`** — regenerated with the corrected domain name.

### Follow Ups

- **`$DOMAINS/domains/index.md`** — regenerate once all domain commits have landed.

### Feedback

- None.
