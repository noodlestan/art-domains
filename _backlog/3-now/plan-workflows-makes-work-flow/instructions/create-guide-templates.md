# Instructions: `create-guide-templates`

**Plan:** `workflows-make-work-flow`

**Iteration Id:** `create-guide-templates`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-workflows-make-work-flow/instructions/create-guide-templates__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `create-guide-templates`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

This section lists the path variables used in this instruction file. All file references in this instructions file MUST use these variables — never bare filesystem paths.

| Variable     | Resolved Path             | Purpose                                                          |
| ------------ | ------------------------- | ---------------------------------------------------------------- |
| `$WORKSPACE` | Current working directory | Workspace root directory contains the agent files being modified |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources directory (changes here)                     |
| `$ART_DOMAINS` | `$WORKSPACE/checkouts/art-domains` | Reference `_guide.md` examples live here                  |
| `$PROJECT`   | Provided with prompt      | Where work execution is taking place.                            |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `create-guide-templates`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

This section describes the goal(s) of this iteration.

Create the `$DOMAINS/noodlestan/` domain with two routine/template pairs for generating `_guide.md` files — one for repository root (project) guides and one for package guides — so that guides are created consistently across repositories and packages. The templates must use the `::TEMPLATE` directive syntax and cover all sections used by repository and package guides (Recommended Reading, Layout, Projects, Records Management, Knowledge References, Workflows, Operating Instructions).

## Mandatory Reading

This section lists the documentation and reference files the sub-agent needs to read before making changes.

- `$DOMAINS/plans/templates/instructions.tart` — the `::TEMPLATE` directive syntax pattern to model the guide templates after.
- `$DOMAINS/domains/structures/domain.art` — Structure: Domain, for the `domain.art` record.
- `$DOMAINS/domains/routines/build-domain-index.art` — for generating the domain index.
- `$DOMAINS/domains/templates/domain-index-file.tart` — for rendering the domain index.
- `$DOMAINS/domains/routines/generate-domain-listing.art` — for registering the domain in `$DOMAINS/index.md`.
- `$DOMAINS/domains/templates/domains-listing.tart` — for rendering the domains listing.
- `$DOMAINS/work/structures/workflow.art` and `$DOMAINS/work/structures/operation.art` — for the Workflows and Operating Instructions sections.
- `$DOMAINS/work/types/operating-instructions.art` — Type: Operating Instructions.
- `$ART_DOMAINS/_guide.md` — repository root (project) guide example to model `project-guide.tart` after.
- `$ART_DOMAINS/cli/workspace/_guide.md` — package guide example to model `package-guide.tart` after.

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

---

## Operating Instructions

### Writing Commit Message

**Purpose:** Write standardized message according to context conventions. Operation of Workflow: Planning Work, defined in `$DOMAINS/work/workflows/planning-work/ops/writing-commit-message.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Commit message pattern: `{Type}({Scope}): {Description}.` max 120 chars, optionally followed by up 3 bullet points, max 100 chars each.

Allowed values for commit Type, Scope, and valid Type–Scope associations are defined in `$WORKSPACE/knowledge/conventions/writing-commit-message.art`, along with examples, and rules.

RULE: Do not invent commit types or scopes or assume a combination is valid. Always read the "Writing Commit Message" guide first.

### Setting Up

**Purpose:** Prepare the execution environment according to the requirements of the work. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/ops/setting-up.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
```

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/ops/verifying-completion.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm run ci # lint, build and test
```

---

## Changes

This section summarises the changes to be made in this iteration.

Create the `$DOMAINS/noodlestan/` domain with a `domain.art` record, two routine/template pairs for generating repository and package `_guide.md` files, and a domain index registered in the domains listing.

- Step 1 / 8 — Create Domain: Noodlestan (`domain.art`)
- Step 2 / 8 — Commit `add-noodlestan-domain`
- Step 3 / 8 — Create `project-guide.tart` and `package-guide.tart` templates
- Step 4 / 8 — Commit `add-guide-templates`
- Step 5 / 8 — Create `create-project-guide.art` and `create-package-guide.art` routines
- Step 6 / 8 — Commit `add-guide-routines`
- Step 7 / 8 — Create domain index (`index.md`) and register in domains listing
- Step 8 / 8 — Commit `add-noodlestan-index`

## Steps

This section contains the detailed steps to execute, including commit steps.

### Step `{1 / 8}` — Create Domain: Noodlestan (`domain.art`)

Create the `$DOMAINS/noodlestan/` directory and the `domain.art` record.

Create `$DOMAINS/noodlestan/domain.art` following the `# Module` / `## Domain: Noodlestan` pattern used by `$DOMAINS/work/domain.art`, with:

- **Purpose:** Provides reusable routines and templates for generating `_guide.md` files — repository root (project) guides and package guides — so that guides are created consistently across repositories and packages.
- **Description:** Provides the Create Project Guide and Create Package Guide routines and the project-guide and package-guide templates for rendering `_guide.md` files with Recommended Reading, Layout, Projects, Records Management, Knowledge References, Workflows, and Operating Instructions sections.

### Step `{2 / 8}` — Commit `add-noodlestan-domain`

---

#### Commit: `add-noodlestan-domain`

**Policy:** AUTONOMOUS — Agent should commit autonomously, push, and proceed to the next step.

**Message:**

```
build(domains): add noodlestan domain record

- Create $DOMAINS/noodlestan/domain.art
```

### Step `{3 / 8}` — Create `project-guide.tart` and `package-guide.tart` templates

Create the two guide templates under `$DOMAINS/noodlestan/templates/`, using the `::TEMPLATE` directive syntax modeled on `$DOMAINS/plans/templates/instructions.tart`.

Create `$DOMAINS/noodlestan/templates/project-guide.tart` for repository root guides, covering the sections: Recommended Reading, Repository Layout, Projects (only if projects exist), Records Management, Knowledge References (only if applicable), Workflows (only if applicable), Operating Instructions. Model the content on `$ART_DOMAINS/_guide.md`.

Create `$DOMAINS/noodlestan/templates/package-guide.tart` for package guides, covering the sections: Recommended Reading, Package Layout, Records Management, Knowledge References (only if applicable), Workflows (only if applicable), Operating Instructions. Model the content on `$ART_DOMAINS/cli/workspace/_guide.md`.

Use `::TEMPLATE` instructions for the rendering agent, `::TEMPLATE::READ` for reading structures/types, and `::EXAMPLE`/`::END` blocks. Use conditional rendering for the optional sections (Projects, Knowledge References, Workflows).

### Step `{4 / 8}` — Commit `add-guide-templates`

---

#### Commit: `add-guide-templates`

**Policy:** AUTONOMOUS — Agent should commit autonomously, push, and proceed to the next step.

**Message:**

```
build(domains): add project and package guide templates

- Create $DOMAINS/noodlestan/templates/project-guide.tart
- Create $DOMAINS/noodlestan/templates/package-guide.tart
```

### Step `{5 / 8}` — Create `create-project-guide.art` and `create-package-guide.art` routines

Create the two routines under `$DOMAINS/noodlestan/routines/`, following the `# Module` / `## Routine: ...` pattern used by `$DOMAINS/plans/routines/write-instructions.art`.

Create `$DOMAINS/noodlestan/routines/create-project-guide.art` — **Routine: Create Project Guide**:

- **Purpose:** Generate a repository root `_guide.md` file for a repository, rendering the project-guide template with the repository's layout, projects, records, knowledge references, workflows, and operating instructions.
- **Inputs:** `%repository` (Structure: Repository), `%operating-instructions` (List(Type: Operating Instructions)).
- **Procedure:** Read `project-guide.tart`, use the `render-template` skill to render the `_guide.md`, and save it to the repository root.

Create `$DOMAINS/noodlestan/routines/create-package-guide.art` — **Routine: Create Package Guide**:

- **Purpose:** Generate a `_guide.md` file for a package (next to `package.json`), rendering the package-guide template with the package's layout, records, knowledge references, workflows, and operating instructions.
- **Inputs:** `%package` (Structure: Package), `%operating-instructions` (List(Type: Operating Instructions)).
- **Procedure:** Read `package-guide.tart`, use the `render-template` skill to render the `_guide.md`, and save it next to the package's `package.json`.

### Step `{6 / 8}` — Commit `add-guide-routines`

---

#### Commit: `add-guide-routines`

**Policy:** AUTONOMOUS — Agent should commit autonomously, push, and proceed to the next step.

**Message:**

```
build(domains): add create-project-guide and create-package-guide routines

- Create $DOMAINS/noodlestan/routines/create-project-guide.art
- Create $DOMAINS/noodlestan/routines/create-package-guide.art
```

### Step `{7 / 8}` — Create domain index (`index.md`) and register in domains listing

Create the domain index and register the new domain in the domains listing, now that all the domain's resources exist.

::READ `$DOMAINS/domains/routines/build-domain-index.art`

Create `$DOMAINS/noodlestan/index.md` using the **Routine: Build Domain Index** with `%domain-name = noodlestan`, rendering with the `domain-index-file.tart` template (see Mandatory Reading), listing the domain's routines and templates.

::READ `$DOMAINS/domains/routines/generate-domain-listing.art`

Register Noodlestan in `$DOMAINS/index.md` domains listing by using the **Routine: Generate Domain Listing** focused on the new noodlestan domain and its new resources, rendering with the `domains-listing.tart` template.

### Step `{8 / 8}` — Commit `add-noodlestan-index`

---

#### Commit: `add-noodlestan-index`

**Policy:** AUTONOMOUS — Agent should commit autonomously, push, and proceed to the next step.

**Message:**

```
build(domains): add noodlestan domain index and register in domains listing

- Create $DOMAINS/noodlestan/index.md
- Register Noodlestan in $DOMAINS/index.md domains listing
```

---

## Final Verification

This section describes how to confirm the iteration is completed and ready for being committed.

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify that `$DOMAINS/noodlestan/` contains `domain.art`, `index.md`, `routines/create-project-guide.art`, `routines/create-package-guide.art`, `templates/project-guide.tart`, and `templates/package-guide.tart`.
- Verify that both templates use the `::TEMPLATE` directive syntax and cover all the required sections (Recommended Reading, Layout, Projects, Records Management, Knowledge References, Workflows, Operating Instructions).
- Verify that Noodlestan is registered in the `$DOMAINS/index.md` domains listing.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
