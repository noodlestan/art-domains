# Plan: Create Art Cli Project and Repo

**ID:** `create-art-cli-project-repo`

**Status:** `DRAFT`

**Template:** `.agents/domains/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Create the `noodlestan/art-cli` repository scaffolded from the art-js-reference template, with project, repo, and namespace records for the Art Cli project.

**Description:** Scaffold the art-cli repo from `$WORKSPACE/checkouts/art-js-reference` (dotfiles, lint configs, vite, license, README, `_records`, empty architecture index, `_backlog/_parking-lot.md`, `_roadmap/_parking-lot.md`); add the guide; populate records (copied from the template except scaffolders) with Namespace: Art Cli, Project: Art Cli, and Repository remote `git@github.com:noodlestan/art-cli.git`.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable     | Resolved Path                           | Purpose                                |
| ------------ | --------------------------------------- | -------------------------------------- |
| `$WORKSPACE` | Current working directory               | Workspace root directory               |
| `$PROJECT`   | Provided with prompt                    | Where work execution is taking place.  |
| `$ART_CLI`   | `$WORKSPACE/art-cli`                    | Destination repo `noodlestan/art-cli`. |
| `$TEMPLATE`  | `$WORKSPACE/checkouts/art-js-reference` | Scaffold template repo.                |

## Summary

Create the `noodlestan/art-cli` repository scaffolded from the art-js-reference template, with Namespace: Art Cli, Project: Art Cli (resources: Package: Lib Records PLANNED), and Repository remote `git@github.com:noodlestan/art-cli.git`.

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

Scaffold the art-cli repo from the art-js-reference template: dotfiles, lint configs, vite, license, README, `_records`, empty architecture index, `_backlog/_parking-lot.md`, `_roadmap/_parking-lot.md`; add the guide; populate records (all template records except scaffolders) with Namespace: Art Cli, Project: Art Cli, and Repository remote `git@github.com:noodlestan/art-cli.git`.

## Work

### Next

Refine the first `DRAFT` iteration: `scaffold-repository`.

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

| Iteration / Instructions       | Status  |
| ------------------------------ | ------- |
| Iteration: Scaffold Repository | `DRAFT` |
| Iteration: Add Guide           | `DRAFT` |
| Iteration: Populate Records    | `DRAFT` |

### Iteration: Scaffold Repository

**Id:** `scaffold-repository`

**Status:** `DRAFT`

**Purpose:** Scaffold the art-cli repository from the art-js-reference template.

**Description:** Scaffold all dotfiles, tslint, eslint, vite, license, README, `_records`, architecture (empty index), and initialize `_backlog/_parking-lot.md` and `_roadmap/_parking-lot.md` from `$TEMPLATE`.

**Instructions:** `./plan-create-art-cli-project-repo/instructions/scaffold-repository.md`

**Changes:**

- Scaffold all dotfiles, tslint, eslint, vite, license, README, `_records`, architecture (empty index) from `$TEMPLATE`.
- Initialize `_backlog/_parking-lot.md` and `_roadmap/_parking-lot.md`.

**Dependencies:**

- None.

### Iteration: Add Guide

**Id:** `add-guide`

**Status:** `DRAFT`

**Purpose:** Add the guide to the new repository.

**Description:** Add the `_guide.md` to the art-cli repository.

**Instructions:** `./plan-create-art-cli-project-repo/instructions/add-guide.md`

**Changes:**

- Add the `_guide.md` to the new repository.

**Dependencies:**

- `scaffold-repository` — the scaffolded repo must exist first.

### Iteration: Populate Records

**Id:** `populate-records`

**Status:** `DRAFT`

**Purpose:** Populate the project, repo, and namespace records for the Art Cli project.

**Description:** Copy all records from `$TEMPLATE` except scaffolders; set Namespace.name: Art Cli, Namespace.owner: Project: Art Cli, Project.name: Art Cli, Project.resources: Package: Lib Records (PLANNED canonical `@art-cli/lib-records`), Repository.Remote: `git@github.com:noodlestan/art-cli.git`.

**Instructions:** `./plan-create-art-cli-project-repo/instructions/populate-records.md`

**Changes:**

- Copy all records from `$TEMPLATE` except scaffolders.
- Set Namespace.name: Art Cli, Namespace.owner: Project: Art Cli.
- Set Project.name: Art Cli, Project.resources: Package: Lib Records (PLANNED canonical `@art-cli/lib-records`).
- Set Repository.Remote: `git@github.com:noodlestan/art-cli.git`.

**Dependencies:**

- `add-guide` — the guide must be in place before records are populated.

---

## Coordination

### Not In Scope

- Moving the workspace-cli source code (tracked in Plan: Extract Workspace Cli to Art Work).
- Extracting the record read/write modules (tracked in Plan: Extract Read/Write Records to Art Cli).

### Evidence

- None.

### Findings

- None.

### Decisions

- The art-cli repo is scaffolded from `$WORKSPACE/checkouts/art-js-reference`.
- Records are copied from the template except scaffolders.
- Namespace: Art Cli, Project: Art Cli, Repository remote `git@github.com:noodlestan/art-cli.git`.

### Knowledge to Update

- Register the art-cli repository in the workspace records (`_records/repositories/art-cli.art`) and workspace manifest.
- Add art-cli to the owner project record in the artificials repo.

### Follow Ups

- None.

### Feedback

- None.
