# Instructions: `update-domain-knowledge`

**Plan:** `workflows-make-work-flow`

**Iteration Id:** `update-domain-knowledge`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute this instruction. Your mode must be `worker` before you start changing files.

These are your instructions.

- RULE: If at any point you are instructed to **REPORT A BLOCKER** execute the instruction in the "## How to Report Back" section and STOP processing any other instructions.

## Path Variables

| Variable       | Resolved Path                      | Purpose                                                                              |
| -------------- | ---------------------------------- | ------------------------------------------------------------------------------------ |
| `$WORKSPACE`   | Current working directory          | Workspace root directory.                                                            |
| `$ART_DOMAINS` | `$WORKSPACE/checkouts/art-domains` | The art-domains repository checkout where the architecture knowledge lives.          |
| `$DOMAINS`     | `$WORKSPACE/.agents/domains`       | Domain resources directory — the canonical source of truth for the domain landscape. |

## Working Agreements

1. This instruction is self-contained. Use this file and its mandatory reading; do not rely on session memory.
2. The report is self-contained and must contain evidence, changes, verification, blockers, and feedback.
3. Keep the final chat report terse; the report file carries the full trail.
4. `$DOMAINS` is the source of truth for the domain landscape. `$ART_DOMAINS/architecture/` must be made to reflect it — never the other way around.

## Goals

Update the architecture knowledge base so it reflects the canonical domain landscape — 14 domains, 5 workflows, and their operations — and documents the new Work domain structures and routines.

## Mandatory Reading

- `$DOMAINS/index.md` — canonical domains listing (14 domains), workflows (5), operations, structures, and routines. This is the authoritative source of truth for the entire change.
- `$ART_DOMAINS/architecture/reference-model.md` — the current (stale) reference model to rewrite.
- `$ART_DOMAINS/architecture/reference-workflows.md` — the current (stale) reference workflows to rewrite.
- `$ART_DOMAINS/architecture/index.md` — the current (stale) architecture index to update.

All 14 canonical domain index files (each describes a domain's boundaries and resources):

- `$DOMAINS/_artificials/index.md` — Artificials
- `$DOMAINS/conventions/index.md` — Conventions
- `$DOMAINS/deployments/index.md` — Deployments
- `$DOMAINS/domains/index.md` — Domains
- `$DOMAINS/noodlestan/index.md` — Noodlestan
- `$DOMAINS/packages/index.md` — Packages
- `$DOMAINS/plans/index.md` — Plans
- `$DOMAINS/primitives/index.md` — Primitives
- `$DOMAINS/references/index.md` — References
- `$DOMAINS/repositories/index.md` — Repositories
- `$DOMAINS/roadmaps/index.md` — Roadmaps
- `$DOMAINS/scaffolders/index.md` — Scaffolders
- `$DOMAINS/work/index.md` — Work
- `$DOMAINS/workspaces/index.md` — Workspaces

Workflow and structure reference files (inform the workflows and boundaries):

- `$DOMAINS/work/workflows/planning-work/workflow.art`
- `$DOMAINS/work/workflows/delegating-work/workflow.art`
- `$DOMAINS/work/workflows/executing-work/workflow.art`
- `$DOMAINS/roadmaps/workflows/roadmapping/workflow.art`
- `$DOMAINS/deployments/workflows/deploying/workflow.art`
- `$DOMAINS/work/structures/work-item-abstract.art`
- `$DOMAINS/roadmaps/structures/milestone.art`
- `$DOMAINS/plans/structures/plan.art`
- `$DOMAINS/work/routines/validate-work-item.art`
- `$DOMAINS/plans/routines/draft-iterations.art`
- `$DOMAINS/plans/routines/plan-iterations.art`
- `$DOMAINS/plans/routines/delegate-instructions.art`

## Operating Instructions

### Writing Commit Message

Follow the commit message conventions defined in `$DOMAINS/work/workflows/planning-work/writing-commit-message/operation.art`.

### Setting Up

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
```

### Verifying Completion

Run from the `$WORKSPACE` root:

```bash
npm run lint:fix # autofix formatting issues
npm run lint # report remaining issues
```

## Changes

The canonical domain landscape in `$DOMAINS/index.md` is the source of truth. The architecture files in `$ART_DOMAINS/architecture/` are stale: `reference-model.md` describes an outdated 11-domain model (including `Backlogs`, `Projects`, `Applications`, `Engineering`), `reference-workflows.md` describes 4 outdated workflows (including an `Engineering`/`Implementing` workflow and a `Planning` workflow owned by `Plans`), and `index.md` reports those stale counts. Align all three with the canonical landscape.

### Step 1: Rewrite `$ART_DOMAINS/architecture/reference-model.md`

Rewrite the reference model to describe the **14 canonical domains** listed in `$DOMAINS/index.md`: Artificials, Conventions, Deployments, Domains, Noodlestan, Packages, Plans, Primitives, References, Repositories, Roadmaps, Scaffolders, Work, Workspaces.

The 14 domain index files listed under **Mandatory Reading** are the input for this step. Use them to:

- **Correct** the retained domain sections (`Work`, `Roadmaps`, `Plans`, `Repositories`, `Packages`, `Deployments`) so their boundaries reflect the current canonical domain landscape.
- **Author** the boundary sections for domains not yet documented in the reference model (`Artificials`, `Conventions`, `Domains`, `Noodlestan`, `Primitives`, `References`, `Scaffolders`, `Workspaces`).

**CRITICAL — do NOT expand the reference model.** The reference model is a boundary map, not a resource catalogue. Use the domain index files only to inform the corrections and to author the missing domain sections. Do **not** enumerate each domain's resources, structures, types, templates, files, or routines. Keep every domain section terse and at the same level of abstraction as the existing sections.

- Keep the existing three kinds of relationships (work items; resources in work scope; knowledge resources) and the "strongest to weakest" ordering convention.
- **Use the same format for every domain**: the format already used in `$ART_DOMAINS/architecture/reference-model.md` — one `### Domain Boundaries: {Domain}` section per domain, with a bullet per relationship expressed as an abstraction (work items, work scope resources, knowledge resources), strongest to weakest, with concrete manifestations only as examples. Do not introduce new headings or sections.
- **Remove** the stale domain sections: `Backlogs`, `Projects`, `Applications`, `Engineering`. These are not canonical domains. Where their concerns are still valid, fold them into the owning canonical domain (for example, backlog/parking-lot concerns belong to `Work`; project/application concerns belong to `Repositories`/`Workspaces`/`Packages`).
- **Eliminate every reference to Engineering.** The `Engineering` domain was removed. Any relationship that previously pointed at `Engineering` must point at its canonical successor — `Executing Work` in the `Work` domain (setting up, verifying, committing concerns). Search the whole file and remove or redirect all `Engineering` mentions, not just the `### Domain Boundaries: Engineering` section.
- **Add** boundary sections for the canonical domains missing from the model: `Artificials`, `Conventions`, `Domains`, `Noodlestan`, `Primitives`, `References`, `Scaffolders`, `Workspaces`.
- **Update** the retained sections (`Work`, `Roadmaps`, `Plans`, `Repositories`, `Packages`, `Deployments`) so their relationships reference only canonical domains and the current Work abstractions.
- **Document the new Work domain structures and routines**: the Work domain now owns the abstract work-item model, the work scope, workflows, operations, and routines (see `$DOMAINS/work/index.md`). Reflect that Work hosts the workflows (`Planning Work`, `Executing Work`, `Delegating Work`) rather than delegating them to `Plans` or `Engineering`. Keep this at the same terse boundary-abstraction level — do not enumerate Work's resources.

### Step 2: Rewrite `$ART_DOMAINS/architecture/reference-workflows.md`

Rewrite the reference workflows to describe the **5 canonical workflows** listed in `$DOMAINS/index.md`:

- **Workflow: Planning Work** — Domain: Work (6 operations)
- **Workflow: Executing Work** — Domain: Work (9 operations)
- **Workflow: Delegating Work** — Domain: Work (4 operations)
- **Workflow: Roadmapping** — Domain: Roadmaps (5 operations)
- **Workflow: Deploying** — Domain: Deployments (5 operations)

Use the workflow, structure, and routine files listed under **Mandatory Reading** as the input for this step. Read each workflow's operations and the relevant structures/routines to correct the information about each workflow's domain, operations, and boundaries, and to author the sections for workflows not yet documented.

**CRITICAL — do NOT expand the reference workflows.** Use the reading list only to correct the information about boundaries and operations and to author the missing workflow sections. Do **not** enumerate operations' internals, structures, types, templates, or routines. Keep every workflow section terse and at the same level of abstraction as the existing sections, using the existing per-stage format: **Input**, **Output**, **Gates**, **Operating resources** — expressed as abstractions with concrete manifestations only as examples.

- **Eliminate every reference to Engineering.** The `Engineering` domain was removed. Remove the entire `Engineering Workflow` / `Implementing` workflow and redirect any Engineering references to `Executing Work` in the `Work` domain. Search the whole file and remove or redirect all `Engineering` mentions.
- **Remove** the `Engineering`/`Implementing` workflow. Its concerns (setting up, verifying, committing) are now expressed by `Executing Work` (operations: Preparing Execution, Setting Up, Executing Work Step, Verifying Step, Verifying Completion, Finalizing Execution, Pushing To Remote, Reporting Execution, Creating Delegation Report).
- **Move** `Planning` ownership from `Plans` to `Work`, retitling it `Planning Work` with its 6 operations (Contextualizing Work Item, Drafting Work Item, Planning Work Item, Writing Commit Message, Validating Work Item, Integrating Work Item).
- **Add** `Executing Work` (9 operations) and `Delegating Work` (4 operations: Validating Delegation, Delegating Instructions, Verifying Delegation Result, Integrating Delegation).
- **Retitle and expand** `Roadmapping` from 4 stages to its 5 canonical operations (Discovering Work, Strategizing Milestones, Prioritizing Milestones, Coordinating Milestones, Integrating Downstream Progress).
- **Retitle and expand** `Deploying` to its 5 canonical operations (Preparing Deployment, Building for Deployment, Deploying Artefacts, Verifying Deployment, Finalizing Deployment).

For each workflow, use the canonical operation names from `$DOMAINS/index.md` verbatim. Derive each operation's Input/Output/Gates/Operating resources from the operation's declared purpose in the workflow and structure files listed under **Mandatory Reading**.

### Step 3: Update `$ART_DOMAINS/architecture/index.md`

Update the architecture index so its summary matches the rewritten files:

- Change the `reference-model.md` line from "11 domains" to "14 domains".
- Change the `reference-workflows.md` line from "4 workflows (Planning, Roadmapping, Engineering, Deploying)" to "5 workflows (Planning Work, Executing Work, Delegating Work, Roadmapping, Deploying)".

#### Commit: `update-domain-knowledge`

```
docs(art-domains): Align architecture with canonical domain landscape

- Rewrite reference-model.md with the 14 canonical domain boundaries
- Rewrite reference-workflows.md with the 5 workflows and their operations
- Update index.md with corrected domain and workflow counts
```

## Verifying

Run from `$WORKSPACE` root:

```bash
npm run lint:fix # to fix formatting issues automatically
npm run lint # to report other formatting issues
```

## How to Report Back to the Delegator

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the **render-template** skill with the `$DOMAINS/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements.

Thank you for your service.
