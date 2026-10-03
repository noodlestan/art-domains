# Plan: Add Boundaries to Active Domains

**ID:** `add-boundaries-active-domains`

**Status:** `READY`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Add the missing `**Boundaries:**` field to the eleven domain records that declare a purpose and description but no relationships to other domains.

**Description:** Add a `**Boundaries:**` field to the domain records for `_artificials`, `conventions`, `domains`, `packages`, `primitives`, `references`, `repositories`, `roadmaps`, `scaffolders`, `work`, and `workspaces`, ordered from stronger to weaker relationships and naming each related domain in bold.

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

Add the missing `**Boundaries:**` field to the eleven domain records that declare a purpose and description but no relationships to other domains, so every active domain states what it depends on and what it informs.

## Context

### Upstream Work

| Kind      | Path                                                          | Role                                                     |
| --------- | ------------------------------------------------------------- | -------------------------------------------------------- |
| Milestone | `$PROJECT/_roadmap/4-next/milestone-domains-one/milestone.md` | Coordinates Phase 2 domain extension and owns this plan. |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Refining.

### Domains

| Domain / Path                                     | Description                                                               |
| ------------------------------------------------- | ------------------------------------------------------------------------- |
| Domain: Domains `$DOMAINS/domains/index.md`       | Receives a record covering domain indexing and the domains listing.       |
| Domain: Work `$DOMAINS/work/index.md`             | Receives a record covering the shared work-item model.                    |
| Domain: References `$DOMAINS/references/index.md` | Receives a record covering reference resource curation.                   |
| Domain: Packages `$DOMAINS/packages/index.md`     | Receives a record covering the Package structure and manifest projection. |

### Resource Kinds in Scope

| Kind   | Domain  | Structure Record Path                    |
| ------ | ------- | ---------------------------------------- |
| Domain | Domains | `$DOMAINS/domains/structures/domain.art` |

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

::READ `$DOMAINS/domains/structures/domain.art` (Structure) — Declares the `boundaries` field and its ordering rule. Relevant for Planning Work Item.

## Scope

The plan touches eleven domain records in one repository:

- **Artificials, Conventions, Domains, Packages, Primitives** — records missing the field entirely.
- **References, Repositories, Roadmaps, Scaffolders, Work, Workspaces** — records missing the field entirely.
- **Artificials** — its record is the bootstrap domain for the artificials, so its boundaries may be intentionally implicit; this plan treats it like the rest unless the architect decides otherwise.

Each record gains one field; nothing else in the record changes.

### (Scope) Domain: Work

**Record:** `$DOMAINS/work/domain.art`

**Role:** — Declares the shared work-item model every planning domain extends.

**Partial:**

- `boundaries` — added, ordered from stronger to weaker.

**Changes:**

— Add a `**Boundaries:**` field declaring direct dependence on **Primitives**, informed domains such as **References**, **Conventions**, and **Domains**, and downstream consumers **Plans** and **Roadmaps**.

**Operations:**

— Confirm every bolded domain name resolves to a directory under `$DOMAINS/`.

**Dependencies:**

- None.

### (Scope) Domain: Domains

**Record:** `$DOMAINS/domains/domain.art`

**Role:** — Owns domain records, domain indexes, and the domains listing.

**Partial:**

- `boundaries` — added.

**Changes:**

— Add a `**Boundaries:**` field declaring dependence on **Artificials** for the abstract resource structure, informed by **References** and **Conventions**, and consumed by every other domain through the domains listing.

**Operations:**

— None.

**Dependencies:**

- None.

### (Scope) Domain: Repositories

**Record:** `$DOMAINS/repositories/domain.art`

**Role:** — Owns the Repository structure and the records management layout.

**Partial:**

- `boundaries` — added.

**Changes:**

— Add a `**Boundaries:**` field declaring direct dependence on **Projects** for repository identity, informed by **References** and **Guides**, and consumed by **Workspaces** for checkout resolution.

**Operations:**

— None.

**Dependencies:**

- None.

### (Scope) Domain: Packages

**Record:** `$DOMAINS/packages/domain.art`

**Role:** — Owns the Package structure and its projection to the package manifest.

**Partial:**

- `boundaries` — added.

**Changes:**

— Add a `**Boundaries:**` field declaring direct dependence on **Projects** for ownership, informed by **References**, **Conventions**, and **Deployments**, and consumed by **Repositories** and **Workspaces**.

**Operations:**

— None.

**Dependencies:**

- None.

### (Scope) Remaining Records

**Record:** `$DOMAINS/{conventions,primitives,references,roadmaps,scaffolders,workspaces,_artificials}/domain.art`

**Role:** — The same field addition, applied to each record individually.

**Partial:**

- `boundaries` — added to each.

**Changes:**

— Add a `**Boundaries:**` field to each of the seven remaining records, ordered from stronger to weaker, naming each related domain in bold.
— Confirm `_artificials/domain.art` warrants a boundaries field at all, given it bootstraps the artificials.

**Operations:**

— Re-run the audit across `$DOMAINS/*/domain.art` and confirm every record now carries the field, or an explicit decision that it does not need one.

**Dependencies:**

- None.

## Execution Context

Execution is performed from `$WORKSPACE/` on branch `main`. A single squashed commit lands in the workspace meta-repository; no checkout or package path is involved.

---

## Items:

This section lists the iterations produced, coordinated, or advanced by the plan, identifying blocking dependencies across resources of different owners.

| Iteration                                       | Status  |
| ----------------------------------------------- | ------- |
| Iteration: Add Boundaries Across Active Domains | `READY` |

### Iteration: Add Boundaries Across Active Domains

**Id:** `add-boundaries-across-active-domains`

**Status:** `READY`

**Purpose:** Give every domain record that lacks one a `**Boundaries:**` field.

**Description:** Add the field to the eleven domain records that declare a purpose and description but no relationships, ordered from stronger to weaker with each related domain in bold, then re-run the audit to confirm coverage.

**Changes:**

- Add `**Boundaries:**` to `$DOMAINS/work/domain.art`.
- Add `**Boundaries:**` to `$DOMAINS/domains/domain.art`.
- Add `**Boundaries:**` to `$DOMAINS/repositories/domain.art`.
- Add `**Boundaries:**` to `$DOMAINS/packages/domain.art`.
- Add `**Boundaries:**` to `$DOMAINS/conventions/domain.art`.
- Add `**Boundaries:**` to `$DOMAINS/primitives/domain.art`.
- Add `**Boundaries:**` to `$DOMAINS/references/domain.art`.
- Add `**Boundaries:**` to `$DOMAINS/roadmaps/domain.art`.
- Add `**Boundaries:**` to `$DOMAINS/scaffolders/domain.art`.
- Add `**Boundaries:**` to `$DOMAINS/workspaces/domain.art`.
- Add `**Boundaries:**` to `$DOMAINS/_artificials/domain.art`, or record an explicit decision that it does not need one.
- Re-run the audit over `$DOMAINS/*/domain.art` and confirm no record is left without the field or a decision.

**Dependencies:**

- None.

#### Commits:

| ID                         | Repository / Checkout / Branch    | Policy       | Hash  | Status     |
| -------------------------- | --------------------------------- | ------------ | ----- | ---------- |
| `build-domains-boundaries` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | (TBD) | `AUTHORED` |

##### Commit: build-domains-boundaries

**Repository:** Workspace

**Message:**

```
build(domains): Add boundaries fields across 11 domains.

- Add **Boundaries:** to work, domains, repositories, and packages records
- Add **Boundaries:** to conventions, primitives, references, and roadmaps records
- Add **Boundaries:** to scaffolders, workspaces, and _artificials records
- Order each relationship from stronger to weaker, naming domains in bold
```

## Work

### Next

Delegate the single `READY` iteration.

---

## Coordination

### Not In Scope

- **Rewording existing boundaries** — domains that already carry a `**Boundaries:**` field are left untouched, including `plans`, `roadmaps`, `backlogs`, `guides`, `commits`, `projects`, and `deployments`.
- **Domain listing update** — `.agents/domains/index.md` is regenerated separately, after this plan's commit lands.

### Evidence

- **Coverage** — every `$DOMAINS/*/domain.art` carries a `**Boundaries:**` field, or an explicit recorded decision that it does not need one.
- **Resolvable names** — every bolded domain name in the new fields resolves to a directory under `$DOMAINS/`.

### Findings

- **Eleven of seventeen records lacked the field** — the domains added most recently all carried boundaries, while the original records did not, so the field was never applied uniformly.

### Decisions

- **One squashed commit across all eleven domains** — the field addition is mechanical and each record is independently verifiable, so it lands as one commit rather than eleven.

### Knowledge to Update

- None.

### Follow Ups

- **`_artificials` boundaries** — confirm whether the bootstrap artificials domain should declare boundaries at all.
- **`$DOMAINS/domains/index.md`** — regenerate once all domain commits have landed.

### Feedback

- None.
