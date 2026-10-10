# Plan: Add Milestones Domain

**ID:** `add-milestones-domain`

**Status:** `DONE`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Extract the milestone-specific resources out of the Roadmaps domain into a new Milestones domain, so that Roadmaps owns the `roadmapping` workflow and its operations, and Milestones owns the milestone work item, its template, and its routines.

**Description:** Move `definitions/`, `structures/`, `templates/`, and `routines/` from `$DOMAINS/roadmaps` to a new `$DOMAINS/milestones`, author `milestones/domain.art`, author `roadmaps/domain.art` to describe the workflow and operations it owns, repoint stale path references across `$WORKSPACE/.agents`, and reword the `roadmapping` operations to describe their relationship with abstract work items.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable     | Resolved Path                      | Purpose                                             |
| ------------ | ---------------------------------- | --------------------------------------------------- |
| `$WORKSPACE` | Current working directory          | Workspace root — `.agents` codebase lives here      |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains`       | Domain resources directory                          |
| `$PROJECT`   | `$WORKSPACE/checkouts/art-domains` | Art Domains checkout — this plan file is filed here |

## Summary

Split the overloaded Roadmaps domain in two. Milestone-specific resources — the `Milestone` definition, the `Structure: Milestone` record, the milestone template, and the six milestone routines — move to a new `$DOMAINS/milestones` domain with its own `domain.art`, and the definition moves as `.art` so the listing routine collects it. Roadmaps owns the `roadmapping` workflow and its five operations, described in terms of abstract work items rather than milestones. Then every path across `$WORKSPACE/.agents` that pointed at the extracted resources is repointed at `$DOMAINS/milestones`, and the stale "(Briefing, Problem, Solution, Plan)" workflow description is corrected to match the operations on disk.

## Attachments

None.

## Context

### Upstream Work

| Kind        | Path                                | Role                                                            |
| ----------- | ----------------------------------- | --------------------------------------------------------------- |
| Parking Lot | `$PROJECT/_backlog/_parking-lot.md` | Tracks short-term actionables, pending questions, and blockers. |

### Required Skills

- `write-plan` — Generates plans from sources and context. Required for Drafting, Refining.
- `render-template` — Renders plan and index artefacts. Required for Refining.

### Domains

| Domain / Path                                     | Description                                                                      |
| ------------------------------------------------- | -------------------------------------------------------------------------------- |
| Domain: Roadmaps `$DOMAINS/roadmaps/index.md`     | Source domain being split. Owns the `roadmapping` workflow and its operations.   |
| Domain: Milestones `$DOMAINS/milestones/index.md` | Target domain. Owns the milestone definition, structure, template, and routines. |
| Domain: Plans `$DOMAINS/plans/index.md`           | Planning lifecycle for this plan.                                                |

### Workflows

| Workflow / Path                                                                | Purpose                                                               |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| Workflow: Planning Work `$DOMAINS/work/workflows/planning-work/workflow.art`   | Planning lifecycle for contextualising, drafting, and refining plans. |
| Workflow: Executing Work `$DOMAINS/work/workflows/executing-work/workflow.art` | Execution lifecycle for setting up, verifying, and committing work.   |

### Knowledge

::READ `$DOMAINS/domains/structures/domain.art` (Structure) — Defines the domain record fields a new `domain.art` must populate. Relevant for Drafting, Refining.

::READ `$DOMAINS/domains/routines/build-domain-index.art` (Routine) — Scans a domain directory and produces the resource lists an `index.md` must list. Relevant for Refining.

::READ `$DOMAINS/domains/templates/domain-index-file.tart` (Template) — Presentation of a domain index file. Relevant for Refining.

::READ `$WORKSPACE/_guide.md` (Guide) — Defines workspace operations and verification. Relevant for Setting Up, Verifying, Committing.

## Scope

This plan changes only `$DOMAINS` (the `.agents` domain codebase). No product code is touched, and `$PROJECT` is only the filing location of this plan.

### (Scope) Repository: Art Domains

**Record:** `$WORKSPACE/_records/repositories/art-domains.art`

**Role:** Owner of the `.agents` domain codebase changed by this plan.

**Changes:**

- Move `definitions/`, `structures/`, `templates/`, and `routines/` from `$DOMAINS/roadmaps` to `$DOMAINS/milestones`.
- Author `$DOMAINS/milestones/domain.art`.
- Author `$DOMAINS/roadmaps/domain.art` describing the workflow and operations it owns.
- Regenerate `$DOMAINS/roadmaps/index.md`, `$DOMAINS/milestones/index.md`.
- Repoint stale paths across `$WORKSPACE/.agents`.
- Reword the `roadmapping` operations in terms of abstract work items.

**Dependencies:**

- None. `$DOMAINS` is self-contained and no other iteration must land first except where stated.

## Execution Context

Execution is coordinated from `$WORKSPACE`. All changes land in `$WORKSPACE/.agents` on branch `main`, committed to the Art Domains repository. This plan file itself is committed from `$PROJECT` (`$WORKSPACE/checkouts/art-domains`) on branch `main`.

---

## Items:

| Iteration / Instructions                 | Status |
| ---------------------------------------- | ------ |
| Iteration: Extract Milestone Resources   | `DONE` |
| Iteration: Repoint Stale Domain Paths    | `DONE` |
| Iteration: Reword Roadmapping Operations | `DONE` |

### Iteration: Extract Milestone Resources

**Id:** `extract-milestone-resources`

**Status:** `DONE`

**Purpose:** Split the Roadmaps domain so that Milestones owns the milestone work item and its supporting resources, and Roadmaps owns the `roadmapping` workflow and its operations.

**Description:** Create `$DOMAINS/milestones`, move the four milestone-specific resource folders into it, author `milestones/domain.art`, author `roadmaps/domain.art` for the remaining resource set, and regenerate the domain indexes.

**Changes:**

- Create `$DOMAINS/milestones/` with `definitions/`, `structures/`, `templates/`, and `routines/` subdirectories.
- Move the definition as `$DOMAINS/milestones/definitions/index.art` — rename `roadmaps/definitions/index.md` to `index.art` in the move. The listing routine collects only `.art` files under `definitions/`, so the `Milestone` definition becomes discoverable in the Milestones domain index. Use `git mv` twice, or `git mv` followed by `git mv` for the rename, so history follows the file.
- Move `$DOMAINS/roadmaps/structures/milestone.art` to `$DOMAINS/milestones/structures/milestone.art`.
- Move `$DOMAINS/roadmaps/templates/milestone.tart` to `$DOMAINS/milestones/templates/milestone.tart`.
- Move the six routines into `$DOMAINS/milestones/routines/`: `compact-milestone.art`, `create-or-update-milestone.art`, `integrate-milestone-downstream.art`, `integrate-milestone-upstream.art`, `migrate-milestone.art`, `validate-milestone.art`.
- Author `$DOMAINS/milestones/domain.art` with `## Domain: Milestones`, a **Purpose** describing milestone work items and the resources that produce and maintain them, a **Description** listing the owned resources (the `Milestone` definition, `Structure: Milestone`, the milestone template, and the six milestone routines), and a **Boundaries** field ordered strongest to weakest: **Work** directly depended upon (a milestone is a work item and its statuses come from Work), **Plans** directly depended upon (iterations and instructions are produced downstream of milestones), **Roadmaps** informed (the `roadmapping` workflow produces and maintains milestones), **Backlogs** informed (a backlog holds work items produced by milestones).
- Author `$DOMAINS/roadmaps/domain.art`: `## Domain: Roadmaps`, a **Purpose** describing the `roadmapping` workflow and the coordination of downstream work items it organises, a **Description** stating that the domain owns the `roadmapping` workflow and its five operations, and a **Boundaries** field ordered strongest to weakest naming **Work** as directly depended upon, with **Milestones** named as an example of a downstream item the workflow produces, alongside **Plans** and **Backlogs**.
- Regenerate `$DOMAINS/milestones/index.md` from `$DOMAINS/milestones/domain.art` and its directory tree, using `$DOMAINS/domains/routines/build-domain-index.art` and `$DOMAINS/domains/templates/domain-index-file.tart`. The rendered index lists Definitions, Structures, Routines, and Templates.
- Regenerate `$DOMAINS/roadmaps/index.md` the same way. The rendered index lists the `Roadmapping` workflow and its five operations.

**Dependencies:**

- None.

**Don't Change:**

- `_roadmap/` — the on-disk roadmap directory keeps its name.
- `$DOMAINS/backlogs/domain.art` — its boundary already names both Roadmaps and Milestones.
- `$DOMAINS/work/structures/work-item-abstract.art` — its `"Domain: Roadmaps"` example remains valid.

#### Commits:

| ID                            | Repository / Checkout / Branch      | Policy       | Hash      | Status      |
| ----------------------------- | ----------------------------------- | ------------ | --------- | ----------- |
| `extract-milestone-resources` | Art Domains / `$WORKSPACE` / `main` | `AUTONOMOUS` | `0096ee0` | `COMMITTED` |

**Message:**

```
build(domain-roadmapping): Frame roadmapping operations on abstract work items

- Rename the strategizing, prioritizing, and coordinating operations to work framing.
- Rewrite the operation purposes and descriptions in work item terms.
- Update the Roadmapping workflow description and operations list.
- Regenerate the Roadmaps domain index.
```

### Iteration: Repoint Stale Domain Paths

**Id:** `repoint-stale-domain-paths`

**Status:** `DONE`

**Purpose:** Repoint every path across `$WORKSPACE/.agents` that referenced the extracted milestone resources so it resolves to `$DOMAINS/milestones`.

**Description:** Rewrite `$DOMAINS/roadmaps/...` paths targeting the extracted definition, structure, template, and routines across agent modes, skills, domain resources, and work-item types. Correct the Roadmaps domain description text that names a workflow phase list the workflow does not use.

**Changes:**

- Update the `::READ` header directive in each of the seven moved files to point at its new location. Each of `$DOMAINS/milestones/routines/compact-milestone.art`, `create-or-update-milestone.art`, `integrate-milestone-downstream.art`, `integrate-milestone-upstream.art`, `migrate-milestone.art`, and `validate-milestone.art` opens with `::READ (Structure: Milestone) FROM `$DOMAINS/roadmaps/structures/milestone.art`` — retarget to `$DOMAINS/milestones/structures/milestone.art`.
- In `migrate-milestone.art`, retarget the five inline references to `$DOMAINS/roadmaps/`: the structure read at the field-mapping step, the template read at the file-sections step, the `template` field assignment, the `render-template` invocation, and the `validate-milestone.art` read.
- In `validate-milestone.art`, retarget the combined read of `$DOMAINS/roadmaps/structures/milestone.art` and `$DOMAINS/roadmaps/templates/milestone.tart` to their `$DOMAINS/milestones/` paths.
- In `create-or-update-milestone.art`, retarget the inline read of `$DOMAINS/roadmaps/routines/validate-milestone.art` to `$DOMAINS/milestones/routines/validate-milestone.art`.
- In `$DOMAINS/milestones/structures/milestone.art:50`, retarget the `template` field example `$DOMAINS/roadmaps/templates/milestone.tart` to `$DOMAINS/milestones/templates/milestone.tart`.
- In `$DOMAINS/milestones/templates/milestone.tart:27`, retarget the `::READ` of `$DOMAINS/roadmaps/structures/milestone.art` to `$DOMAINS/milestones/structures/milestone.art`.
- In `$DOMAINS/work/types/mandatory-reading-context.art:12`, retarget the `path` field example `$DOMAINS/roadmaps/structures/milestone.art` to `$DOMAINS/milestones/structures/milestone.art`.
- In `.agents/skills/write-milestone/SKILL.md`, retarget all eight paths: the domain index read at line 28 becomes `$DOMAINS/milestones/index.md` and its trailing description names the milestones domain; the template read at line 47; the `create-or-update-milestone.art` reads at lines 75 and 140; the `Structure: Milestone` read at line 99; the `validate-milestone.art` read at line 118; the `integrate-milestone-upstream.art` read at line 163; the `integrate-milestone-downstream.art` read at line 185; the `compact-milestone.art` read at line 207.
- In `.agents/skills/agent-architect/SKILL.md:43`, retarget the mandatory reading `` ::READ `.agents/domains/roadmaps/index.md` `` to `.agents/domains/milestones/index.md` and set its description to "Milestones (work items)".
- In `.agents/domains/domains/templates/domains-listing.tart:135`, retarget the `::EXAMPLE` row path `./domains/roadmaps/templates/milestone.tart` to `./domains/milestones/templates/milestone.tart`.
- In `$DOMAINS/roadmaps/index.md:7`, replace the **Domain description** text "Provides the milestone structure, the roadmapping workflow (Briefing, Problem, Solution, Plan), and the milestone template for rendering milestone files." with a description matching the domain's owned resources and the regenerated content — the `roadmapping` workflow and its five operations, and the phase names `Briefing`, `Problem`, `Solution`, and `Plan` removed, since no operation on disk uses them.

**Dependencies:**

- Iteration: Extract Milestone Resources — the files must exist at `$DOMAINS/milestones/` before their internal references are repointed.

**Don't Change:**

- Paths under `workflows/roadmapping/` — the workflow stays in Roadmaps, so every reference to it stays valid.
- `_roadmap/` filesystem paths — they keep their name, in the examples at `$DOMAINS/projects/structures/project.art:72`, `$DOMAINS/milestones/templates/milestone.tart`, and `$DOMAINS/work/templates/work-item-context.tart:99`.
- The `description` frontmatter on `.agents/skills/write-milestone/SKILL.md:3` — its use of "roadmaps" refers to roadmap work items as a source, not to a domain path.
- `$DOMAINS/guides/templates/project-guide.tart:121` and `package-guide.tart:93,98` — they reference the `Roadmapping` workflow and its `_roadmap/` entry artefacts.

#### Commits:

| ID                           | Repository / Checkout / Branch      | Policy       | Hash      | Status      |
| ---------------------------- | ----------------------------------- | ------------ | --------- | ----------- |
| `repoint-stale-domain-paths` | Art Domains / `$WORKSPACE` / `main` | `AUTONOMOUS` | `eb0c754` | `COMMITTED` |

**Message:**

```
refactor(domain-milestones): Repoint milestone resource paths to the Milestones domain

- Retarget ::READ directives and inline references in the moved files.
- Retarget the milestone structure and template examples in domain resources.
- Retarget the write-milestone skill and the agent-architect mandatory reading.
- Retarget the milestone template path in the domains listing template.
- Correct the Roadmaps domain description in roadmaps/index.md.
```

### Iteration: Reword Roadmapping Operations

**Id:** `reword-roadmapping-operations`

**Status:** `DONE`

**Purpose:** Remove milestone framing from the `roadmapping` workflow operations so they describe their relationship with abstract work items, and propagate the renames everywhere the operation names are cited.

**Description:** Rename the operation directories and titles that use "Milestones" wording to use "Work" wording, rewrite their purposes and descriptions in terms of abstract work items, update the `Roadmapping` workflow's description to match, and fix every downstream citation of the renamed operations.

**Changes:**

- Rename `strategizing-milestones/` to `strategizing-work/`. Its title becomes `## Operation: Strategizing Work`.
- Rename `prioritizing-milestones/` to `prioritizing-work/`. Its title becomes `## Operation: Prioritizing Work`.
- Rename `coordinating-milestones/` to `coordinating-work/`. Its title becomes `## Operation: Coordinating Work`.
- Rewrite each renamed operation's **Purpose** and **Description** to describe its relationship with abstract work items rather than milestones, using `work item` or `work items` where the current text uses `milestone` or `milestones`.
- In `$DOMAINS/roadmaps/workflows/roadmapping/workflow.art`, replace the **Description** "Provides operations for discovering work, strategizing milestones, prioritizing milestones, coordinating milestones, and integrating plans." with a description naming the five operations in work-item terms — discovering work, strategizing work, prioritizing work, coordinating work, and integrating downstream progress — and drop both "milestones" and "plans" as the object of the operations.
- In `$DOMAINS/roadmaps/workflows/roadmapping/workflow.art`, update the `**Operations:**` list to the five final names: `Discovering Work`, `Strategizing Work`, `Prioritizing Work`, `Coordinating Work`, `Integrating Downstream Progress`.
- Regenerate `$DOMAINS/roadmaps/index.md` so its Operations and Workflows rows carry the new operation names.

**Dependencies:**

- Iteration: Extract Milestone Resources — the Roadmaps index is regenerated in that iteration, and this iteration regenerates it again with the new operation names.

**Don't Change:**

- The `Roadmapping` workflow name and its `workflows/roadmapping/` directory — confirmed stable.
- The `discovering-work/` directory and its `## Operation: Discovering Work` title — already work-item framed.
- The `integrating-downstream-progress/` directory and its title — already work-item framed.
- The `Roadmapping` workflow's **Purpose** line — it describes the workflow, which stays roadmap-oriented.

#### Commits:

| ID                              | Repository / Checkout / Branch      | Policy       | Hash      | Status      |
| ------------------------------- | ----------------------------------- | ------------ | --------- | ----------- |
| `rework-roadmapping-operations` | Art Domains / `$WORKSPACE` / `main` | `AUTONOMOUS` | `469d516` | `COMMITTED` |

**Message:**

```
build(domain-milestones): Add Milestones domain with resources extracted from Roadmapping.

- Rename the strategizing, prioritizing, and coordinating operations to work framing.
- Rewrite the operation purposes and descriptions in work item terms.
- Update the Roadmapping workflow description and operations list.
- Regenerate the Roadmaps domain index.
```

---

## Work

### Next

Execute `extract-milestone-resources` first — the other two iterations depend on the new directory layout existing.

### Blockers

- None.

---

## Operating Instructions

### Writing Commit Message

**Purpose:** Write standardized message according to context conventions. Operation of Workflow: Planning Work, defined in `$DOMAINS/work/workflows/planning-work/writing-commit-message/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

1. Read commit message conventions from `$WORKSPACE/knowledge/conventions/writing-commit-message.art`.
2. Write the commit message following the rules defined there.

Suggested for this plan:

```
refactor(art-domains): Split the Roadmaps domain into Roadmaps and Milestones

- Move milestone definitions, structures, templates, and routines to $DOMAINS/milestones.
- Author milestones/domain.art and roadmaps/domain.art for their owned resources.
- Repoint stale $DOMAINS/roadmaps paths across .agents at $DOMAINS/milestones.
- Reword roadmapping operations in terms of abstract work items.
```

### Setting Up

**Purpose:** Prepare the execution environment. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/setting-up/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
```

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`.

**Instructions:**

1. `grep -rn '$DOMAINS/roadmaps' $WORKSPACE/.agents` returns no matches for `definitions/`, `structures/`, `templates/`, or `routines/`; every remaining match targets `workflows/roadmapping/`.
2. `$DOMAINS/milestones/` contains `domain.art`, `definitions/index.art`, `structures/milestone.art`, `templates/milestone.tart`, and the six routines.
3. `$DOMAINS/roadmaps/` contains `domain.art`, `index.md`, and `workflows/roadmapping/` only.
4. `$DOMAINS/milestones/index.md` lists Definitions, Structures, Routines, and Templates, and includes the `Milestone` definition row.
5. `$DOMAINS/roadmaps/index.md` lists the `Roadmapping` workflow and its five operations, and contains none of `Briefing`, `Problem`, `Solution`, or `Plan` as workflow phases.
6. The five operation titles on disk are `Discovering Work`, `Strategizing Work`, `Prioritizing Work`, `Coordinating Work`, and `Integrating Downstream Progress`.

---

## Coordination

### Not In Scope

- **Renaming `_roadmap/`** — the on-disk roadmap directory keeps its name. Renaming it would invalidate every existing roadmap file across the workspace and is a separate plan.
- **Renaming the `Roadmapping` workflow** — confirmed stable. Only its operations are reworded.
- **Renaming `Structure: Milestone`** — the milestone record keeps its name and its work-item semantics.
- **Other domains without a `domain.art`** — `applications/`, `engineering/`, `specs/`. Only the two domains this plan touches are in scope.

### Evidence

- **Roadmaps holds only its workflow** — `ls $DOMAINS/roadmaps` yields `domain.art`, `index.md`, and `workflows/`, verifiably by the reduced `roadmaps/index.md` listing one workflow and five operations.
- **No stale extracted-resource paths remain** — the `grep` in Verifying Completion returns only `workflows/roadmapping/` matches.
- **The workflow description matches its operations** — `$DOMAINS/roadmaps/workflows/roadmapping/workflow.art` names five operations and `roadmaps/index.md` contains no phase names absent from the workflow file.

### Findings

- **The Roadmaps domain mixes two concerns** — it owned both the `roadmapping` workflow and the entire `Milestone` work item, so a roadmap-oriented name concealed the milestone-specific resources beneath it.
- **`roadmaps/index.md` described a workflow that does not match the workflow file** — its description referenced "the roadmapping workflow (Briefing, Problem, Solution, Plan)", while the workflow's five operations on disk are `discovering-work`, `strategizing-milestones`, `prioritizing-milestones`, `coordinating-milestones`, and `integrating-downstream-progress`. No operation uses the Briefing, Problem, Solution, or Plan phases.
- **Three of five operations used milestone framing** — `strategizing-milestones`, `prioritizing-milestones`, and `coordinating-milestones` describe relationships with work items, and `discovering-work` already frames them that way, so the workflow is internally inconsistent.
- **`definitions/index.md` was invisible to the domain index** — `build-domain-index.art` collects only `.art` files under `definitions/`, so the `Milestone` definition appeared in no domain index. Moving it as `.art` makes it discoverable in the Milestones index.
- **The Milestones domain boundary is the inverse of the Roadmaps one** — Milestones depends on Work and Plans directly because it owns the work item; Roadmaps depends on Work directly because the workflow operates on work items, and names Milestones among the downstream items it produces.

### Decisions

- **The workflow stays in Roadmaps, the work item moves to Milestones** — the `roadmapping` workflow produces and coordinates work items; it is not a milestone resource. Confirmed stable, so its name and directory are untouched.
- **The definition moves as `.art`** — a domain split that carries the definition forward in a format the listing routine ignores would leave the new domain's primary resource undiscoverable.
- **Operations are framed on work items, not milestones** — the workflow coordinates arbitrary work items, and naming a specific kind constrains it; the milestone domain is referenced as an example of a downstream item.
- **`_roadmap/` keeps its filesystem name** — the domain split is a conceptual boundary, not a migration of existing roadmap files across the workspace.

### Knowledge to Update

None. `$WORKSPACE/_guide.md:98` cites the Roadmapping workflow, whose name is unchanged.

### Follow Ups

- Plan: Rename `_roadmap/` to `_milestones/` across the workspace, migrating existing roadmap files.
- Plan: Migrate the remaining domains' `definitions/` directories to `.art` so their definitions appear in the listing.
- Plan: Author `domain.art` for the remaining domains without one — `applications/`, `engineering/`, `specs/`.

### Feedback

- None.
