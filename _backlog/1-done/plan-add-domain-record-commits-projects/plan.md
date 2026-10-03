# Plan: Add Domain Record in Commits and Projects

**ID:** `add-domain-record-commits-projects`

**Status:** `DONE`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Give the Commits and Projects domains the domain records they were missing, so both declare what they own and which domains they depend on.

**Description:** Add `domain.art` for Commits and for Projects, each declaring purpose, description, and boundaries, and refresh both domain indexes to reflect the records.

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

Give the Commits and Projects domains the domain records they were missing, so both declare what they own and which domains they depend on, and both indexes reflect the new records.

## Context

### Upstream Work

| Kind      | Path                                                          | Role                                                     |
| --------- | ------------------------------------------------------------- | -------------------------------------------------------- |
| Milestone | `$PROJECT/_roadmap/4-next/milestone-domains-one/milestone.md` | Coordinates Phase 2 domain extension and owns this plan. |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Refining.

### Domains

| Domain / Path                                 | Description                                                                  |
| --------------------------------------------- | ---------------------------------------------------------------------------- |
| Domain: Commits `$DOMAINS/commits/index.md`   | Receives the domain record describing commit blueprints and their execution. |
| Domain: Projects `$DOMAINS/projects/index.md` | Receives the domain record describing project identity and owned resources.  |

### Resource Kinds in Scope

| Kind   | Domain   | Structure Record Path                    |
| ------ | -------- | ---------------------------------------- |
| Domain | Commits  | `$DOMAINS/domains/structures/domain.art` |
| Domain | Projects | `$DOMAINS/domains/structures/domain.art` |

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

::READ `$DOMAINS/domains/structures/domain.art` (Structure) — Declares the fields a domain record carries, including `boundaries`. Relevant for Planning Work Item.

::READ `$DOMAINS/commits/types/commit.art` (Type) — The commit blueprint the Commits record describes. Relevant for Planning Work Item.

## Scope

The plan adds two domain records in one repository:

- **Commits** — a domain record covering the commit blueprint type, its status and policy types, and the commit template.
- **Projects** — a domain record covering the Project structure and License type.

The two are independent; they are grouped because they close the same gap at the same level of the domain model.

### (Scope) Domain: Commits

**Record:** `$DOMAINS/commits/domain.art`

**Role:** — Declares what the Commits domain owns.

**Partial:**

- `name` — Commits.
- `purpose` — the discrete version-controlled units of change planned by work items and executed by worker sub-agents.
- `description` — commit blueprint type, status and policy types, the delegation commit, and the commit template.
- `boundaries` — three relationships, ordered from stronger to weaker.

**Changes:**

— Add the domain record with `**Purpose:**`, `**Description:**`, and `**Boundaries:**` fields.
— Declare direct dependence on **Work** for the statuses and work scope resources a blueprint carries, and on **Plans** for the iterations that group blueprints.
— Declare **Repositories** and **Workspaces** as informed.

**Operations:**

— Confirm the record matches the fields declared by `Structure: Domain`.

**Dependencies:**

- None.

### (Scope) Domain: Projects

**Record:** `$DOMAINS/projects/domain.art`

**Role:** — Declares what the Projects domain owns.

**Partial:**

- `name` — Projects.
- `purpose` — the ownable units grouping repositories, packages, applications, and other resources under a shared identity, privacy policy, and license.
- `description` — the Project structure and the License type.
- `boundaries` — four relationships, ordered from stronger to weaker.

**Changes:**

— Add the domain record with `**Purpose:**`, `**Description:**`, and `**Boundaries:**` fields.
— Declare direct dependence on **Repositories** for the repository a project record is defined in.
— Declare **Packages**, **Applications**, **Workspaces**, and **Guides** as informed.

**Operations:**

— Confirm the record matches the fields declared by `Structure: Domain`.

**Dependencies:**

- None.

## Execution Context

Execution is performed from `$WORKSPACE/` on branch `main`. Both commits land in the workspace meta-repository; no checkout or package path is involved.

---

## Items:

This section lists the iterations produced, coordinated, or advanced by the plan, identifying blocking dependencies across resources of different owners.

| Iteration                                          | Status |
| -------------------------------------------------- | ------ |
| Iteration: Add Commits and Projects Domain Records | `DONE` |

### Iteration: Add Commits and Projects Domain Records

**Id:** `add-commits-and-projects-domain-records`

**Status:** `DONE`

**Purpose:** Add the missing domain records for Commits and Projects.

**Description:** Add `domain.art` for both domains, each declaring purpose, description, and boundaries, and refresh both domain indexes.

**Changes:**

- Add `$DOMAINS/commits/domain.art` declaring purpose, description, and boundaries.
- Add `$DOMAINS/projects/domain.art` declaring purpose, description, and boundaries.
- Refresh `$DOMAINS/commits/index.md` and `$DOMAINS/projects/index.md` to reflect the new records.

**Dependencies:**

- None.

#### Commits:

| ID                      | Repository / Checkout / Branch    | Policy       | Hash      | Status      |
| ----------------------- | --------------------------------- | ------------ | --------- | ----------- |
| `build-domain-commits`  | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `4da0345` | `COMMITTED` |
| `build-domain-projects` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `5a03f2f` | `COMMITTED` |

##### Commit: build-domain-commits

**Repository:** Workspace

**Message:**

```
build(domain-commits): Add Domain: Commits.

- Add .agents/domains/commits/domain.art
- Document commit blueprint, status, and policy boundaries
- Record dependence on Work, Plans, Repositories, and Workspaces
```

##### Commit: build-domain-projects

**Repository:** Workspace

**Message:**

```
build(domain-projects): Add Domain: Projects.

- Add .agents/domains/projects/domain.art
- Document project owner, repository, resources, and license boundaries
- Record informed Domains: Packages, Applications, Workspaces, and Guides
```

## Work

### Next

No next move; the iteration is `DONE` and both commits are `COMMITTED` in `$WORKSPACE`.

---

## Coordination

### Not In Scope

- **Domain listing update** — `.agents/domains/index.md` is regenerated separately, after this plan's commits land.
- **Boundary completeness** — this plan adds records to two domains that had none; it does not normalise the boundaries of the domains that already have records.

### Evidence

- **Both records conform** — each new record carries `**Purpose:**`, `**Description:**`, and `**Boundaries:**`, matching `Structure: Domain`.

### Findings

- **Two domains had resources but no record** — Commits and Projects both shipped types and structures before any `domain.art`, so neither declared what it owned.

### Decisions

- **One iteration, two commits** — the records are independent, but they close the same gap in the domain model and share a verification step.

### Knowledge to Update

- None.

### Follow Ups

- **`$DOMAINS/domains/index.md`** — regenerate once all domain commits have landed.

### Feedback

- None.
