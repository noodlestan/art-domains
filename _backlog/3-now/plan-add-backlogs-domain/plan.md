# Plan: Add Backlogs Domain

**ID:** `add-backlogs-domain`

**Status:** `READY`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Establish the `backlogs` domain with a backlog structure, its terminology definitions, and the routine that creates a project's filesystem backlog.

**Description:** Add `domain.art`, `definitions/index.art`, `structures/backlog.art`, `routines/create-filesystem-backlog.art`, and `index.md` to the `backlogs` domain, and remove the superseded `_wip.md` scratch file the new definitions replace.

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

Establish the `backlogs` domain with a backlog structure, its terminology definitions, and the routine that creates a project's filesystem backlog, so filesystem backlogs have a declared owner and an idempotent creation path.

## Context

### Upstream Work

| Kind      | Path                                                          | Role                                                     |
| --------- | ------------------------------------------------------------- | -------------------------------------------------------- |
| Milestone | `$PROJECT/_roadmap/4-next/milestone-domains-one/milestone.md` | Coordinates Phase 2 domain extension and owns this plan. |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Refining.

### Domains

| Domain / Path                                 | Description                                                                |
| --------------------------------------------- | -------------------------------------------------------------------------- |
| Domain: Backlogs `$DOMAINS/backlogs/index.md` | Owns the Backlog structure, its definitions, and the creation routine.     |
| Domain: Work `$DOMAINS/work/index.md`         | Supplies the work statuses and downstream work item types a backlog holds. |

### Resource Kinds in Scope

| Kind      | Domain   | Structure Record Path                      |
| --------- | -------- | ------------------------------------------ |
| Structure | Backlogs | `$DOMAINS/backlogs/structures/backlog.art` |
| Routine   | Backlogs | `$DOMAINS/domains/structures/domain.art`   |

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

## Scope

The plan adds a single domain in one repository:

- **Backlogs** — a domain record, a definitions index, a resource structure, and one creation routine.

The domain's records are designed against the Work abstractions; nothing in this plan changes Work itself.

### (Scope) Domain: Backlogs

**Record:** `$DOMAINS/backlogs/domain.art`

**Role:** — Declares what the new domain owns and how it relates to Work, Plans, Roadmaps, Guides, and Projects.

**Partial:**

- `name` — Backlogs.
- `purpose` — coordinates the filesystem backlogs of projects.
- `description` — backlog structure, creation routine, and state movement routines.
- `boundaries` — four relationships, ordered from stronger to weaker.

**Changes:**

— Add the domain record with `**Purpose:**`, `**Description:**`, and `**Boundaries:**` fields.
— Declare direct dependence on **Work** for statuses and downstream work items, synchronisation with downstream work items such as **Plans**, coordination with upstream work such as **Milestones**, and informed domains such as **Guides** and **Projects**.

**Operations:**

— Confirm the record matches the fields declared by `Structure: Domain`.

**Dependencies:**

- None.

### (Scope) Structure: Backlog

**Record:** `$DOMAINS/backlogs/structures/backlog.art`

**Role:** — Declares the record written for each project backlog.

**Partial:**

- `extends` — Structure: Resource (Abstract).
- `path` — Path where the backlog lives; the only field the backlog adds.

**Changes:**

— Extend `Structure: Resource (Abstract)` rather than `Structure: Domain`, so a backlog is a resource of a project.
— Add `path` as the only shape field, carrying the filesystem location of the backlog.

**Operations:**

— Confirm the inherited resource fields cover identity and description.

**Dependencies:**

- None.

### (Scope) Routine: Create Filesystem Backlog

**Record:** `$DOMAINS/backlogs/routines/create-filesystem-backlog.art`

**Role:** — Creates a project's backlog directory and record idempotently.

**Partial:**

- `%project-path` — the project the backlog belongs to.
- `%maybe-backlog-path` — optional; defaults to a directory under the project.

**Changes:**

— Declare the inputs, outputs, procedure, and anti-patterns.
— Make the routine idempotent: create the directory only when absent, and overwrite `backlog.art` rather than failing on an existing one.
— Create no state directories up front; each state directory is created when work enters it.
— Register the backlog through the owning domains' routines instead of assuming `$PROJECT/_records/project.art` or `$PROJECT/_guide.md` exist.

**Operations:**

— Confirm re-running the routine against an existing backlog is a no-op.

**Dependencies:**

- None.

## Execution Context

Execution is performed from `$WORKSPACE/` on branch `main`. The single commit lands in the workspace meta-repository; no checkout or package path is involved.

---

## Items:

This section lists the iterations produced, coordinated, or advanced by the plan, identifying blocking dependencies across resources of different owners.

| Iteration                            | Status  |
| ------------------------------------ | ------- |
| Iteration: Establish Backlogs Domain | `READY` |

### Iteration: Establish Backlogs Domain

**Id:** `establish-backlogs-domain`

**Status:** `READY`

**Purpose:** Land the `backlogs` domain with its structure, definitions, and creation routine.

**Description:** Add the domain record, definitions index, `Structure: Backlog`, `Routine: Create Filesystem Backlog`, and the domain index, and delete the superseded `_wip.md` scratch file.

**Changes:**

- Add `$DOMAINS/backlogs/domain.art` declaring purpose, description, and boundaries.
- Add `$DOMAINS/backlogs/definitions/index.art` defining the backlog state directories.
- Add `$DOMAINS/backlogs/structures/backlog.art` extending `Structure: Resource (Abstract)` with a single `path` field.
- Add `$DOMAINS/backlogs/routines/create-filesystem-backlog.art`, idempotent and free of fixed records or guide path assumptions.
- Add `$DOMAINS/backlogs/index.md` indexing the domain resources.
- Delete `$DOMAINS/backlogs/_wip.md`, superseded by the definitions index.

**Dependencies:**

- None.

#### Commits:

| ID                      | Repository / Checkout / Branch    | Policy       | Hash  | Status     |
| ----------------------- | --------------------------------- | ------------ | ----- | ---------- |
| `build-domain-backlogs` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | (TBD) | `AUTHORED` |

##### Commit: build-domain-backlogs

**Repository:** Workspace

**Message:**

```
build(domain-backlogs): Add Domain: Backlogs.

- Add .agents/domains/backlogs/domain.art
- Add .agents/domains/backlogs/definitions/index.art
- Add .agents/domains/backlogs/structures/backlog.art
- Add Routine: Create Filesystem Backlog
- Add .agents/domains/backlogs/index.md
- Delete superseded .agents/domains/backlogs/_wip.md
```

## Work

### Next

Delegate the single `READY` iteration.

---

## Coordination

### Not In Scope

- **Domain listing update** — `.agents/domains/index.md` is regenerated separately, after this plan's commit lands.
- **Applying the routine to a project** — no project backlog is created by this plan.

### Evidence

- **Routine is idempotent** — running `Routine: Create Filesystem Backlog` twice leaves the same backlog directory and record.
- **No fixed path assumptions** — the routine contains no reference to `$PROJECT/_records/` or `$PROJECT/_guide.md`.

### Findings

- **A backlog is a resource, not a domain** — `Structure: Backlog` extends `Structure: Resource (Abstract)` so that a backlog is owned by a project rather than being a domain in its own right.

### Decisions

- **State directories are created lazily** — the routine creates only the backlog directory; each state directory appears when work enters that state.

### Knowledge to Update

- None.

### Follow Ups

- **`$DOMAINS/domains/index.md`** — regenerate once all domain commits have landed.

### Feedback

- None.
