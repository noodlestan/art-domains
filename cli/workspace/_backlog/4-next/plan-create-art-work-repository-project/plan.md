# Plan: Create Art Work Repository and Project

**ID:** `create-art-work-repository-project`

**Status:** `DRAFT`

**Template:** `.agents/domains/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Create the `noodlestan/art-work` repository with project, repo, and namespace records for the Art Work project.

**Description:** Create the art-work repo with Namespace: Art Work; the root project record takes the current content of `cli/workspace/_records/project.art`; Project.Resources: Package: Workspace CLI, Application: Workspace Website (PLANNED), Tool: Workspace Tool (PLANNED); Repository.Remote: `git@github.com:noodlestan/art-work.git`.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable     | Resolved Path             | Purpose                                 |
| ------------ | ------------------------- | --------------------------------------- |
| `$WORKSPACE` | Current working directory | Workspace root directory                |
| `$PROJECT`   | Provided with prompt      | Where work execution is taking place.   |
| `$ART_WORK`  | `$WORKSPACE/art-work`     | Destination repo `noodlestan/art-work`. |

## Summary

Create the `noodlestan/art-work` repository with Namespace: Art Work, root project record from `cli/workspace/_records/project.art`, and Repository remote `git@github.com:noodlestan/art-work.git`.

## Context

### Upstream Work

| Kind                  | Path                                                               | Role                                                                 |
| --------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------- |
| Parking Lot           | `$PROJECT/_backlog/_parking-lot.md`                                | Tracks short-term actionables, pending questions, and blockers.      |
| Architecture Briefing | `_roadmap/_architect.md`                                           | Workspace principles, NFRs, milestones.                              |
| Milestone             | `$PROJECT/_roadmap/3-now/milestone-workspace-cli-one/milestone.md` | Coordinates this plan as Phase 3 of the Workspace CLI One milestone. |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Refining.

### Domains

| Domain / Path                           | Description                                                                        |
| --------------------------------------- | ---------------------------------------------------------------------------------- |
| Domain: Plans `$DOMAINS/plans/index.md` | Planning lifecycle for contextualising, drafting, planning, and integrating plans. |

### Knowledge

::READ `_roadmap/_architect.md` (Briefing) — Workspace principles, NFRs, milestones. Relevant for Planning Work Item.
::READ `architecture/index.md` (Model) — Package layout, publishing, and execution model. Relevant for Planning Work Item.
::READ `$DOMAINS/roadmaps/index.md` (Structure) — Roadmaps and milestones coordination. Relevant for Planning Work Item.

## Scope

Create the art-work repo (scaffold, guide, records): Namespace: Art Work; root project record takes the current content of `cli/workspace/_records/project.art`; Project.Resources: Package: Workspace CLI, Application: Workspace Website (PLANNED), Tool: Workspace Tool (PLANNED); Repository.Remote: `git@github.com:noodlestan/art-work.git`.

## Work

### Next

Refine the first `DRAFT` iteration: `create-repository`.

### Blockers

- None.

---

## Operating Instructions

### Setting Up

**Purpose:** Prepare the execution environment. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/ops/setting-up.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
npm run ci # to verify build is green before starting
```

If any of these fail, resolve the issue before proceeding with implementation. Do NOT run `npm install` inside `$PROJECT` (the package directory) — a local `node_modules` there shadows the monorepo resolution and breaks the build.

### Writing Commit Message

**Purpose:** Write standardized message according to context conventions. Operation of Workflow: Planning Work, defined in `$DOMAINS/work/workflows/planning-work/ops/writing-commit-message.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

1. Read commit message conventions from `$WORKSPACE/knowledge/conventions/writing-commit-message.art`.
2. Write the commit message following: the rules defined there.

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/ops/verifying-completion.art`.

**Instructions:** (From `$PROJECT/_guide.md`)

Run from the package directory:

```bash
npm run lint:fix # to fix formatting issues automatically
npm run lint # to report other issues (prettier, eslint, tsc --noEmit)
npm run build
npm run test
```

All steps MUST pass. No `it.todo()` tests may remain.

---

## Items:

| Iteration / Instructions     | Status  |
| ---------------------------- | ------- |
| Iteration: Create Repository | `DRAFT` |
| Iteration: Populate Records  | `DRAFT` |

### Iteration: Create Repository

**Id:** `create-repository`

**Status:** `DRAFT`

**Purpose:** Create the art-work repository with the standard scaffold and guide.

**Description:** Scaffold the art-work repo (dotfiles, lint configs, license, README, `_records`, architecture index, `_backlog/_parking-lot.md`, `_roadmap/_parking-lot.md`) and add the `_guide.md`.

**Instructions:** `./plan-create-art-work-repository-project/instructions/create-repository.md`

**Changes:**

- Scaffold the art-work repo (dotfiles, lint configs, license, README, `_records`, architecture index, parking lots).
- Add the `_guide.md`.

**Dependencies:**

- None.

### Iteration: Populate Records

**Id:** `populate-records`

**Status:** `DRAFT`

**Purpose:** Populate the project, repo, and namespace records for the Art Work project.

**Description:** Set Namespace: Art Work; root project record takes the current content of `cli/workspace/_records/project.art`; Project.Resources: Package: Workspace CLI, Application: Workspace Website (PLANNED), Tool: Workspace Tool (PLANNED); Repository.Remote: `git@github.com:noodlestan/art-work.git`.

**Instructions:** `./plan-create-art-work-repository-project/instructions/populate-records.md`

**Changes:**

- Set Namespace.name: Art Work.
- Set the root project record from the current content of `cli/workspace/_records/project.art`.
- Set Project.Resources: Package: Workspace CLI, Application: Workspace Website (PLANNED), Tool: Workspace Tool (PLANNED).
- Set Repository.Remote: `git@github.com:noodlestan/art-work.git`.

**Dependencies:**

- `create-repository` — the repo must exist before records are populated.

---

## Coordination

### Not In Scope

- Moving the workspace-cli source code (tracked in Plan: Extract Workspace Cli to Art Work).

### Evidence

- None.

### Findings

- None.

### Decisions

- Namespace: Art Work.
- The root project record takes the current content of `cli/workspace/_records/project.art`.
- Repository remote `git@github.com:noodlestan/art-work.git`.

### Knowledge to Update

- Register the art-work repository in the workspace records (`_records/repositories/art-work.art`) and workspace manifest.
- Add art-work to the owner project record in the artificials repo.

### Follow Ups

- None.

### Feedback

- None.
