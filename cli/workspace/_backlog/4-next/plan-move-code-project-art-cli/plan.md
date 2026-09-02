# Plan: Move Code and Project to Repository: Art CLI

**ID:** `move-code-project-art-cli`

**Status:** `DRAFT`

**Template:** `.agents/domains/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Move the workspace-cli code, project, roadmap/backlog, and knowledge into a new dedicated repository `noodlestan/art-cli` (project, repo, namespace `@art-cli`), and update the owner/dependent records that currently reference workspace-cli under art-domains.

**Description:** Relocate the workspace CLI out of art-domains into its own `art-cli` repository published as `@art-cli/workspace`; register it across project records, guides, READMEs, knowledge, and stale checks; publish a new version; and verify in `$WORKSPACE`. This plan is a distinct work item so upstream milestones can track it as a dependency.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable     | Resolved Path             | Purpose                                |
| ------------ | ------------------------- | -------------------------------------- |
| `$WORKSPACE` | Current working directory | Workspace root directory               |
| `$PROJECT`   | Provided with prompt      | Where work execution is taking place.  |
| `$ART_CLI`   | The new repository        | Destination repo `noodlestan/art-cli`. |

## Summary

Move workspace-cli (code, roadmap/backlog, knowledge) to a new `noodlestan/art-cli` repository scoped `@art-cli`; update art-domains, artificials, and art-js records/docs; publish `@art-cli/workspace`; and verify in `$WORKSPACE`.

## Context

### Upstream Work

| Kind                  | Path                                                               | Role                                                                 |
| --------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------- |
| Parking Lot           | `$PROJECT/_backlog/_parking-lot.md`                                | Tracks short-term actionables, pending questions, and blockers.      |
| Architecture Briefing | `_backlog/_architect.md`                                           | Workspace principles, NFRs, milestones.                              |
| Milestone             | `$PROJECT/_backlog/3-now/milestone-workspace-cli-one/milestone.md` | Coordinates this plan as Phase 3 of the Workspace CLI One milestone. |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Refining.
- `update-domains` — Updates domain index/listing when project ownership records change. Required for the knowledge-update steps.

### Domains

| Domain / Path                           | Description                                                                        |
| --------------------------------------- | ---------------------------------------------------------------------------------- |
| Domain: Plans `$DOMAINS/plans/index.md` | Planning lifecycle for contextualising, drafting, planning, and integrating plans. |

### Knowledge

::READ `_backlog/_architect.md` (Briefing) — Workspace principles, NFRs, milestones. Relevant for Planning Work Item.
::READ `architecture/index.md` (Model) — Package layout, publishing, and execution model. Relevant for Planning Work Item.
::READ `$DOMAINS/roadmaps/index.md` (Structure) — Roadmaps and milestones coordination. Relevant for Planning Work Item.

## Scope

Create and populate the `noodlestan/art-cli` repository with workspace-cli's code, backlog, and knowledge; switch its canonical package name to `@art-cli/workspace`; update art-domains, artificials (owner project record), and art-js records and guides; publish and verify in `$WORKSPACE`.

## Work

### Next

Refine the first `DRAFT` iteration: `create-art-cli-repository`.

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

| Iteration / Instructions                      | Status  |
| --------------------------------------------- | ------- |
| Iteration: Create Art CLI Repository          | `DRAFT` |
| Iteration: Update Owner and Dependent Records | `DRAFT` |
| Iteration: Publish and Verify as Art CLI      | `DRAFT` |

### Iteration: Create Art CLI Repository

**Id:** `create-art-cli-repository`

**Status:** `DRAFT`

**Purpose:** Scaffold the `noodlestan/art-cli` repository and move the workspace-cli code, roadmap/backlog, and knowledge into it.

**Description:** Create the new `art-cli` repo with project, repo, and namespace set to `@art-cli`; move workspace-cli's source, roadmap/backlog, and knowledge over; switch the canonical package name to `@art-cli/workspace`.

**Instructions:** `./plan-move-code-project-art-cli/instructions/create-art-cli-repository.md`

**Changes:**

- Create `noodlestan/art-cli` with project, repo, and namespace `@art-cli`.
- Move workspace-cli and its roadmap/backlog and knowledge into `art-cli`.
- Rename the package to the canonical `@art-cli/workspace`.
- Add the `art-cli` guide (`_guide.md`) to the new repository.

**Dependencies:**

- None.

### Iteration: Update Owner and Dependent Records

**Id:** `update-owner-and-dependent-records`

**Status:** `DRAFT`

**Purpose:** Update project records, guides, READMEs, knowledge, and stale checks that reference workspace-cli under art-domains.

**Description:** Reflect that art-domains no longer owns workspace-cli (art-cli does); add art-cli to the owner project record (artificials repo); update READMEs, knowledge, and stale checks across artificials, art-domains, and art-js.

**Instructions:** `./plan-move-code-project-art-cli/instructions/update-owner-and-dependent-records.md`

**Changes:**

- Update the art-domains project record and guide (no longer owns workspace-cli — art-cli does).
- Add art-cli to the owner project record in the artificials repo.
- Update READMEs, knowledge, and stale checks in artificials, art-domains, and art-js.

**Dependencies:**

- `create-art-cli-repository` — the new repo and its records must exist first.

### Iteration: Publish and Verify as Art CLI

**Id:** `publish-and-verify-as-art-cli`

**Status:** `DRAFT`

**Purpose:** Publish the new workspace-cli version under `@art-cli/workspace` and verify it in `$WORKSPACE`.

**Description:** Publish the new version under the canonical `@art-cli/workspace` name and test the CLI in `$WORKSPACE`.

**Instructions:** `./plan-move-code-project-art-cli/instructions/publish-and-verify-as-art-cli.md`

**Changes:**

- Publish new workspace-cli version to canonical name `@art-cli/workspace`.
- Test the published CLI in `$WORKSPACE`.

**Dependencies:**

- `update-owner-and-dependent-records` — owner and dependent records must be updated before publishing the re-scoped package.

---

## Coordination

### Not In Scope

- Extraction of generic record read/write modules to a shared records library (tracked separately in the milestone — see Extract Record Units to Lib-Records).
- Generation of the art-cli ecosystem roadmap notes (tracked separately — see Generate Art-CLI Roadmap).

### Evidence

- None.

### Findings

- This is Phase 3 of the Workspace CLI One milestone and, unlike the earlier move-only placeholder, is now captured as a real work item so upstream milestones can track it as a dependency.

### Decisions

- None.

### Knowledge to Update

- `membership` / project record in `artificials` — add art-cli as an owner.
- art-domains project record and guide — drop workspace-cli ownership.
- Any stale-checks and README across `artificials`, `art-domains`, and `art-js` referencing workspace-cli.

### Follow Ups

- None.

### Feedback

- None.
