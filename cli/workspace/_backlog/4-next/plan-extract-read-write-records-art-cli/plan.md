# Plan: Extract Read/Write Records to Art Cli

**ID:** `extract-read-write-records-art-cli`

**Status:** `DRAFT`

**Template:** `.agents/domains/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Extract the generic record read/write modules into a shared library in the art-cli repository.

**Description:** Create Package: Lib Records in art-cli (canonical `@art-cli/lib-records`, path `lib/records`); extract the generic record read/write modules and their tests from workspace-cli; register the lib in the Art Cli project record; publish the lib; consume it in workspace-cli; update knowledge; publish a new workspace-cli version; test in `$WORKSPACE`.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable     | Resolved Path             | Purpose                                 |
| ------------ | ------------------------- | --------------------------------------- |
| `$WORKSPACE` | Current working directory | Workspace root directory                |
| `$PROJECT`   | Provided with prompt      | Where work execution is taking place.   |
| `$ART_CLI`   | `$WORKSPACE/art-cli`      | Destination repo `noodlestan/art-cli`.  |
| `$ART_WORK`  | `$WORKSPACE/art-work`     | Destination repo `noodlestan/art-work`. |

## Summary

Create Package: Lib Records in art-cli (`@art-cli/lib-records`, path `lib/records`); extract the generic record read/write modules and their tests from workspace-cli; register, publish, consume; publish a new workspace-cli version; test in `$WORKSPACE`.

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

Create the Lib Records package in art-cli; extract the generic record read/write modules and their tests from workspace-cli; register the lib in the Art Cli project record; publish the lib; consume it in workspace-cli; update knowledge; publish a new workspace-cli version; test in `$WORKSPACE`.

## Work

### Next

Refine the first `DRAFT` iteration: `create-lib-records-package`.

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

| Iteration / Instructions              | Status  |
| ------------------------------------- | ------- |
| Iteration: Create Lib Records Package | `DRAFT` |
| Iteration: Extract Record Modules     | `DRAFT` |
| Iteration: Register, Publish, Consume | `DRAFT` |

### Iteration: Create Lib Records Package

**Id:** `create-lib-records-package`

**Status:** `DRAFT`

**Purpose:** Create the Lib Records package in the art-cli repository.

**Description:** Create Package: Lib Records with canonical name `@art-cli/lib-records` at path `lib/records`.

**Instructions:** `./plan-extract-read-write-records-art-cli/instructions/create-lib-records-package.md`

**Changes:**

- Create Package: Lib Records, canonical `@art-cli/lib-records`, path `lib/records`.

**Dependencies:**

- Plan: Create Art Cli Project and Repo — the art-cli repo must exist first.

### Iteration: Extract Record Modules

**Id:** `extract-record-modules`

**Status:** `DRAFT`

**Purpose:** Extract the generic record read/write modules and their tests into the Lib Records package.

**Description:** Extract the generic record read/write modules and their tests from workspace-cli to `art-cli/lib/records`.

**Instructions:** `./plan-extract-read-write-records-art-cli/instructions/extract-record-modules.md`

**Changes:**

- Extract generic record read/write modules and their tests to `art-cli/lib/records`.

**Dependencies:**

- `create-lib-records-package` — the package must exist before modules are extracted.
- Plan: Extract Workspace Cli to Art Work — the workspace-cli source must be in art-work before modules are extracted from it.

### Iteration: Register, Publish, Consume

**Id:** `register-publish-consume`

**Status:** `DRAFT`

**Purpose:** Register the lib, publish it, and consume it in workspace-cli.

**Description:** Register the lib in the Art Cli project record; publish the lib; consume it in workspace-cli; update knowledge; publish a new workspace-cli version; test in `$WORKSPACE`.

**Instructions:** `./plan-extract-read-write-records-art-cli/instructions/register-publish-consume.md`

**Changes:**

- Register the lib in the Art Cli project record.
- Publish the lib.
- Consume the lib in workspace-cli.
- Update knowledge in art-cli and art-work.
- Publish a new workspace-cli version.
- Test in `$WORKSPACE`.

**Dependencies:**

- `extract-record-modules` — the modules must be extracted before the lib is registered and published.

---

## Coordination

### Not In Scope

- Creating the art-cli repository (tracked in Plan: Create Art Cli Project and Repo).
- Moving the workspace-cli source code (tracked in Plan: Extract Workspace Cli to Art Work).
- Generating the art-cli ecosystem roadmap notes (future plan, not yet tracked).

### Evidence

- None.

### Findings

- None.

### Decisions

- Package: Lib Records, canonical `@art-cli/lib-records`, path `lib/records`.

### Knowledge to Update

- Update knowledge in art-cli and art-work.
- Update the workspace-cli package record after consuming the lib.

### Follow Ups

- None.

### Feedback

- None.
