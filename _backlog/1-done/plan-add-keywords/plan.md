# Plan: Add Keywords to Art Domains

**ID:** `add-keywords`

**Status:** `DONE`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Extend the Project and Package record structures to carry keywords, then apply keywords to the Art Domains project record and README as the first use case of the keyword rollout.

**Description:** Add a `keywords` field with examples to `Structure: Project` and `Structure: Package` in the workspace domains, add the Art Domains keywords to the project record, and render them in the Art Domains README.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

This section lists the path variables used throughout the plan file and its downstream work items. All file references in the plan and downstream work items MUST use these variables — never bare filesystem paths.

| Variable      | Resolved Path                | Purpose                                                |
| ------------- | ---------------------------- | ------------------------------------------------------ |
| `$WORKSPACE`  | Current working directory    | Workspace meta-repository hosting the domain sources.  |
| `$PROJECT`    | `checkouts/art-domains`      | Art Domains project where this plan lives.             |
| `$DOMAINS`    | `$WORKSPACE/.agents/domains` | Domain sources changed by the first iteration.         |
| `$MANAGEMENT` | `checkouts/management`       | Management project holding the coordinating milestone. |

## Summary

Extend the Project and Package record structures with a `keywords` field in the workspace domains, then apply the Art Domains keywords to the project record and README in the Art Domains project, validating the pattern as the first use case of the keyword rollout.

## Context

### Upstream Work

| Kind                 | Path                                                                                   | Role                                                            |
| -------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Milestone            | `$MANAGEMENT/_roadmap/3-now/milestone-rollout-project-keywords/milestone.md`           | Coordinates Phase 1 of the keyword rollout; owns this plan.     |
| Milestone Attachment | `$MANAGEMENT/_roadmap/3-now/milestone-rollout-project-keywords/milestone__keywords.md` | Source list of keywords per project, including Art Domains.     |
| Milestone            | `$PROJECT/_roadmap/6-plan/milestone-extend-domains.md`                                 | Coordinates domain structure evolution in the Art Domains repo. |
| Parking Lot          | `$PROJECT/_roadmap/_parking-lot.md`                                                    | Tracks short-term actionables, pending questions, and blockers. |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Refining.

### Domains

| Domain / Path                                 | Description                                                                                      |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Domain: Projects `$DOMAINS/projects/index.md` | Owns the Project structure and License type; receives the `keywords` field.                      |
| Domain: Packages `$DOMAINS/packages/index.md` | Owns the Package structure; receives the `keywords` field mapped to the manifest `keywords` key. |
| Domain: Plans `$DOMAINS/plans/index.md`       | Planning lifecycle for contextualising, drafting, planning, and integrating plans.               |

### Resource Kinds in Scope

| Kind       | Domain       | Structure Record Path                             |
| ---------- | ------------ | ------------------------------------------------- |
| Project    | Projects     | `$DOMAINS/projects/structures/project.art`        |
| Package    | Packages     | `$DOMAINS/packages/structures/package.art`        |
| Repository | Repositories | `$DOMAINS/repositories/structures/repository.art` |
| License    | Projects     | `$DOMAINS/projects/types/license.art`             |

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

::READ `$PROJECT/_guide.md` (Guide) — Defines the Art Domains project layout, records management, and verification. Relevant for Planning Work Item, Setting up, Verifying Completion.

::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` (Conventions) — Allowed commit types, scopes, and message format. Relevant for Writing Commit Message.

::READ `$MANAGEMENT/_roadmap/3-now/milestone-rollout-project-keywords/milestone__keywords.md` (Milestone Attachment) — Source keywords per project; the Art Domains list feeds the project record. Relevant for Planning Work Item.

::READ `$DOMAINS/projects/structures/project.art` (Structure) — Target of the `keywords` field addition. Relevant for Planning Work Item.

::READ `$DOMAINS/packages/structures/package.art` (Structure) — Target of the `keywords` field addition. Relevant for Planning Work Item.

## Scope

The plan spans two repositories:

- **Workspace meta-repository** (`$WORKSPACE`) — extend `Structure: Project` and `Structure: Package` with a `keywords` field, with examples.
- **Art Domains project** (`$PROJECT`) — add keywords to the project record, render them in the repository README.

Each iteration commits one complete repository, so a failure in one repository never leaves the other half applied.

### (Scope) Project: Art Domains

**Record:** `$PROJECT/_records/project.art`

**Role:** — First application of the new `keywords` field; validates the structure change as a use case.

**Partial:**

- `owner` — Project: Artificials
- `author` — Noodlestan Collective
- `repository` — Repository: Art Domains
- `code` — https://github.com/noodlestan/art-domains

**Changes:**

— Add a `Keywords` field carrying the Art Domains keyword list from the milestone attachment, rendered as a bullet list between `**Resources:**` and `**Private:**`.

**Operations:**

- Verify the record renders as a valid `Structure: Project` after the field addition.

**Dependencies:**

- `Iteration: Extend Record Structures With Keywords` — the `keywords` field must exist before the record uses it.

### (Scope) Structure: Project

**Record:** `$DOMAINS/projects/structures/project.art`

**Role:** — Declares the `keywords` field consumed by every project record.

**Partial:**

- `keywords` — added, between `resources` and `private`.

**Changes:**

— Add `keywords` to the Shape with a type and example; add the field to the embedded `Project: Purrfect` example.

**Operations:**

- None.

**Dependencies:**

- None.

### (Scope) Structure: Package

**Record:** `$DOMAINS/packages/structures/package.art`

**Role:** — Declares the `keywords` field consumed by every package record and mapped to the manifest `keywords` key.

**Partial:**

- `keywords` — added, between `private` and `deployment`.

**Changes:**

— Add `keywords` to the Shape, documenting the mapping to the `package.json` `keywords` key; add the field to the embedded `Package: Workspace CLI` example.

**Operations:**

- None.

**Dependencies:**

- None.

### (Scope) Repository: Art Domains

**Record:** `$PROJECT/_records/repository.art`

**Role:** — The README and root manifest rendering conventions are established here as the first project to project keywords outside a record, and the README license text is normalised.

**Partial:**

- `remote` — `git@github.com:noodlestan/art-domains.git`
- `packageFile` — package.json

**Changes:**

— Add a `**Keywords:**` field to `$PROJECT/README.md`, placed after the description and before `## Development`, rendering the same keywords as an inline comma-separated list.
— Add a `keywords` array to `$PROJECT/package.json`, carrying the same keywords in the same order, so the repository manifest projects them alongside the record and the README.
— Confirm the copyright year in the README license section and the `_records` license files is `2026`; correct it if it is not.

**Operations:**

- None.

**Dependencies:**

- `Iteration: Extend Record Structures With Keywords` — the keyword list is sourced from the project record.

### (Scope) License: Noodlestan 2026 MIT

**Record:** `$PROJECT/_records/license.art`

**Role:** — Carries the short and long license forms consumed by the project, namespace, and repository records.

**Partial:**

- `name` — Noodlestan 2026 MIT

**Changes:**

— Change the short form wording from "Published under a [MIT license]" to "Published under an [MIT license]".
— Confirm the copyright year is `2026` in both the short and long forms; correct it if it is not.

**Operations:**

- None.

**Dependencies:**

- None.

## Execution Context

Execution is performed from `$WORKSPACE/`; iteration 1 commits to the workspace meta-repository on branch `main`, and iteration 2 commits to `$PROJECT` (`checkouts/art-domains`) on branch `main`. No package paths are involved: this project currently declares no packages.

---

## Items:

This section lists the iterations produced, coordinated, or advanced by the plan, identifying blocking dependencies across resources of different owners.

| Iteration / Instructions                                                                                     | Status |
| ------------------------------------------------------------------------------------------------------------ | ------ |
| Iteration: Extend Record Structures With Keywords `./instructions/extend-record-structures-with-keywords.md` | `DONE` |
| Iteration: Apply Keywords to Art Domains `./instructions/apply-keywords-to-art-domains.md`                   | `DONE` |

### Iteration: Extend Record Structures With Keywords

**Id:** `extend-record-structures-with-keywords`

**Status:** `DONE`

**Purpose:** Declare the `keywords` field on the Project and Package record structures so every repository can carry keywords.

**Description:** Add a `keywords` field to `Structure: Project` and `Structure: Package`, each with a type, a description of its propagation to README and manifest files, and a rendered example.

**Instructions:** `./plan-add-keywords/instructions/extend-record-structures-with-keywords.md`

**Report:** `./plan-add-keywords/instructions/extend-record-structures-with-keywords__report.md`

**Changes:**

- Add `keywords` to the Shape of `$DOMAINS/projects/structures/project.art`, between `resources` and `private`, typed as a list of lowercase kebab-case identifiers.
- Add the `Keywords` field to the `Project: Purrfect` example in the same file, between `**Resources:**` and `**Private:**`.
- Add `keywords` to the Shape of `$DOMAINS/packages/structures/package.art`, between `private` and `deployment`, documenting that the value is projected to the `keywords` key of the package manifest.
- Add the `Keywords` field to the `Package: Workspace CLI` example in the same file, between `**Private:**` and `**Deployment:**`.
- Leave `$DOMAINS/projects/index.md` and `$DOMAINS/packages/index.md` unchanged; neither enumerates structure fields.

**Dependencies:**

- None.

#### Commits:

| ID                                       | Repository / Checkout / Branch    | Policy       | Hash      | Status      |
| ---------------------------------------- | --------------------------------- | ------------ | --------- | ----------- |
| `extend-record-structures-with-keywords` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | `cdb944d` | `COMMITTED` |

##### Commit: extend-record-structures-with-keywords

**Repository:** Workspace

**Message:**

```
build(art-domains): add `keywords` to project and package record structures.

- Declare `keywords` on `Structure: Project` and `Structure: Package`, with examples.
- Document the projection of package `keywords` to the manifest `keywords` key.
```

### Iteration: Apply Keywords to Art Domains

**Id:** `apply-keywords-to-art-domains`

**Status:** `DONE`

**Purpose:** Apply the new `keywords` field to the Art Domains project record, README, and root manifest, validating the rollout pattern, and normalise the project license wording.

**Description:** Add the Art Domains keyword list to the project record, project the same keywords into the repository README as a `**Keywords:**` field and into the root `package.json` as a `keywords` array, and correct the license article wording and copyright year in the license record and README.

**Instructions:** `./plan-add-keywords/instructions/apply-keywords-to-art-domains.md`

**Report:** `./plan-add-keywords/instructions/apply-keywords-to-art-domains__report.md`

**Changes:**

- Add a `Keywords` field to `$PROJECT/_records/project.art`, between `**Resources:**` and `**Private:**`, with the 7 keywords listed in `$MANAGEMENT/_roadmap/3-now/milestone-rollout-project-keywords/milestone__keywords.md` under `Keywords: Art Domains`, in that order.
- Add a `**Keywords:**` field to `$PROJECT/README.md`, placed after the description paragraph and before `## Development`, rendering the same 7 keywords as an inline comma-separated list in the same order as the record.
- Add a `keywords` array to `$PROJECT/package.json`, placed after `description` and before `author`, carrying the same 7 keywords in the same order.
- Change the short license form in `$PROJECT/_records/license.art` from "Published under a [MIT license](https://noodlestan.mit-license.org/)." to "Published under an [MIT license](https://noodlestan.mit-license.org/)."
- Confirm the copyright year is `2026` in the short and long forms of `$PROJECT/_records/license.art` and in the license section of `$PROJECT/README.md`; correct it if it is not.

**Dependencies:**

- `Iteration: Extend Record Structures With Keywords` — the `keywords` field must exist on `Structure: Project` before the record renders it.

#### Commits:

| ID                              | Repository / Checkout / Branch    | Policy       | Hash      | Status      |
| ------------------------------- | --------------------------------- | ------------ | --------- | ----------- |
| `apply-keywords-to-art-domains` | Art Domains / `$PROJECT` / `main` | `AUTONOMOUS` | `0588137` | `COMMITTED` |

##### Commit: apply-keywords-to-art-domains

**Repository:** Art Domains

**Message:**

```
records(art-domains): add project keywords, render them in README, fix license wording.

- Add Keywords field to _records/project.art.
- Add Keywords field to README.md.
- Add Keywords field to package.json.
- Fix "under a" to "under an" in _records/license.art; confirm year 2026.
```

## Work

### Next

None — both iterations are `DONE` and both commits exist. Remaining follow ups are listed in the milestone.

### Blockers

- None.

## Feedback

- Iteration 2 was executed manually rather than delegated, and its scope grew during execution: `package.json` was added as a third carrier and the README rendering changed from a section to a field. Both changes came from the plan owner, and the plan, instructions, milestone, and milestone attachment were reconciled before committing. Instruction files drift fastest at the keyword list, so a worker told to copy "the 7 keywords from Step 1" is safer than one given an inline enumeration.
- The milestone attachment is the keyword source of truth, and it was still carrying the superseded 11-keyword list after iteration 1. Left unfixed, the instruction rule requiring a worker to `REPORT A BLOCKER` on source disagreement would have halted iteration 2 for no good reason. The attachment is trimmed to 7 and marked final.
- Two commits on `origin/main` share the subject "build(art-domains): add keywords to project and package record structures". Commit `38172d5` adds the field, and commit `cdb944d` trims the two examples. Both are pushed, and `cdb944d` is the accurate hash to cite. The duplication is left in place, because cleaning it would mean rewriting pushed history for no functional gain.

---

## Operating Instructions

### Setting Up

**Purpose:** Prepare the execution environment. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/setting-up/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
npm run ci # to verify the workspace baseline is green before starting.
```

If any of these fail, resolve the issue before proceeding with implementation.

### Writing Commit Message

**Purpose:** Write standardized message according to context conventions. Operation of Workflow: Planning Work, defined in `$DOMAINS/work/workflows/planning-work/writing-commit-message/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

1. Read commit message conventions from `$WORKSPACE/knowledge/conventions/writing-commit-message.art`.
2. Write the message following: the rules defined there.

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md` and `$PROJECT/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm run lint:fix # to fix formatting issues automatically
npm run lint # to report other issues (prettier, eslint, tsc --noEmit)
```

Run from the `$PROJECT` root:

```bash
npm run ci # lint, test and build.
```

All steps MUST pass.

---

## Coordination

### Not In Scope

- **Package records** — this project declares no packages, so there is no `package.art` to annotate. `Structure: Package` is extended for the rollout, but the only manifest carrying keywords here is the repository root `package.json`.
- **Repository record keywords** — `Structure: Repository` is left unchanged; the rollout covers project and package records only, as decided by the milestone.
- **Scaffolder implementations** — `Scaffolder Files: Project README` and `Scaffolder Files: Project Package Json` are referenced by repository records but their implementations are not present in this workspace. Updating them to emit keywords is a follow-up.
- **Other repositories** — Art MD and the remaining repositories are planned in the milestone's later phases.

### Evidence

- `$DOMAINS/projects/structures/project.art` and `$DOMAINS/packages/structures/package.art` each declare `keywords` in their `**Shape:**` list and render a `**Keywords:**` field in their embedded examples — commit `38172d5`, 2 files changed, 25 insertions, verifiably by `git show 38172d5`.
- `npm run lint` reports `All matched files use Prettier code style!` in `$WORKSPACE`, and the `lefthook` pre-commit hook ran `npm run ci` without being bypassed.

### Findings

- The milestone describes Phase 1 as extending "project and package record structures" within Art Domains, but this project no longer hosts the Workspace CLI package: the `cli/` directory and all `package.art` records are absent, and the CLI now lives in the separate Art Work repository. Consequently the package work in this plan is a change to `Structure: Package` in the workspace domains, with no package record to update here.
- `$DOMAINS` sources are tracked in the workspace meta-repository, not in the Art Domains checkout. The plan therefore spans two repositories, and each iteration commits exactly one of them.
- The Art Domains project record still lists `Package: Workspace CLI` under `**Resources:**`, a stale reference left by the repository split.
- The license article fix is narrower than the milestone's Phase 2 wording suggests: in this project only `_records/license.art` carries the "Published under a" phrasing. The README and the other `_records/*.art` files reference `License: Noodlestan 2026 MIT` and carry no article, and the copyright year is already `2026` everywhere. The year check is therefore a verification step, not an edit.
- The Art Domains keyword set was trimmed from the 11 suggested in the milestone attachment to 7, on review against what the project actually contains. The dropped entries described capabilities the project no longer has or never had: `cli` and `tooling` survive from before the Workspace CLI moved to Art Work, and `artificial-intelligence`, `agentic`, `domain-driven-design`, `templates`, and `workflows` are subsumed by the tighter `agentic-workflows`, `agent-instructions`, and `skills`. The milestone attachment carries the trimmed set as the source of truth for the remaining phases.

### Decisions

- The field is named `keywords` and typed as a list of lowercase kebab-case identifiers, matching the npm manifest field it projects to.
- In `Structure: Project`, `keywords` sits between `resources` and `private`, grouping it with the discovery fields. In `Structure: Package`, it sits between `private` and `deployment`, adjacent to the manifest-mapped fields.
- Keywords render as a bullet list in records, as an inline comma-separated `**Keywords:**` field in READMEs, and as a JSON array in manifests, in the same order in all three.
- The `**Keywords:**` README field is introduced by this plan as the project README convention, since no README in any checkout currently renders keywords.
- The repository root `package.json` receives the same keywords even though it is private, so that the project has one keyword set projected to all three carriers and later phases have a template to copy. Per-package manifests are annotated in Phase 2, where published packages exist.
- License normalisation is folded into the existing per-repository commits rather than run as separate work, so each repository ends the rollout with its records, README, and license corrected in one commit.

### Knowledge to Update

- `$DOMAINS/projects/structures/project.art` — `keywords` field and example.
- `$DOMAINS/packages/structures/package.art` — `keywords` field and example.

### Follow Ups

- Refresh `**Resources:**` in `$PROJECT/_records/project.art` to drop the stale `Package: Workspace CLI` entry.
- Add the `**Keywords:**` field and the `keywords` manifest key to `Scaffolder Files: Project README` and `Scaffolder Files: Project Package Json` once their implementations are located.
- Feed the README field convention into the keyword rollout plans for Art MD and the remaining repositories.

### Feedback

- The worker flagged that the plan's `Execution Context` says iteration 1 commits to `$WORKSPACE` on `main`; the commit landed as `38172d5` and was pushed, confirming the two-repository split described in Findings.
