# Instructions: `add-operations-templates-and-file`

**Plan:** `add-operations-domain`

**Iteration Id:** `add-operations-templates-and-file`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-operations-domain/instructions/add-operations-templates-and-file__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse: happy face + up to 3 bullet points (done `add-operations-templates-and-file`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                | Purpose                                      |
| ------------ | ---------------------------- | -------------------------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root; repository for all new files |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources under change                |
| `$SKILLS`    | `$WORKSPACE/.agents/skills`  | Agent modes and skills directory             |

## Working Agreements

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user expects a light confirmation: a happy face and up to 3 bullet points. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Define how operating instructions are presented and where long-instruction files live, with placeholder defaults and project-side override: add the operating-instructions template with consuming-context input and matching, the flat-file convention with placeholder defaults and `**CommandList**` override, and the `workspace-tooling` package with default command lists.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `$PROJECT/_backlog/4-next/plan-add-operations-domain/plan__operations-spec.md` — the domain spec; read `## Templates`, `## Files`, and `## Integration` in full.
- `$DOMAINS/work/templates/operating-instructions.tart` — the template being migrated; read its current rendering logic and `%render-metadata` usage.
- `$DOMAINS/plans/templates/plan.tart` — consumer: renders plans with `%render-metadata = TRUE`; the Operating Instructions section must pass the consuming context.
- `$DOMAINS/plans/templates/instructions.tart` — consumer: renders instruction files with `%render-metadata = FALSE`; must pass the consuming context.
- `$DOMAINS/work/types/operating-instructions.art` — the type with `relevantFor` (used by the template for matching).

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

---

## Operating Instructions

### Setting Up

**Purpose:** Prepare the execution environment.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
npm run ci # to verify build is green before starting
```

If any of these fail, resolve the issue before proceeding with implementation.

### Writing Commit Message

**Purpose:** Write standardized message according to context conventions.

**Instructions:** (From `$WORKSPACE/_guide.md`)

1. Read commit message conventions from `$WORKSPACE/knowledge/conventions/writing-commit-message.art`.
2. Write the commit message following: the rules defined there.

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npx prettier --write .agents/domains/operations .agents/domains/plans/templates .agents/domains/instructions/templates # format new/changed files
npm run ci # lint, build and test
```

All steps MUST pass. The pre-commit hook runs `prettier . -c`; run `npx prettier --write` on every file you create before committing.

---

## Changes

- Step 1 / 7 — Create `templates/operating-instructions.tart` (with consuming-context input)
- Step 2 / 7 — Create `files/operating-instructions.art` (flat-file convention)
- Step 3 / 7 — Update `plan.tart` to pass consuming context
- Step 4 / 7 — Update `instructions.tart` to pass consuming context
- Step 5 / 7 — Create `@noodlestan/tooling-art` package with default command lists
- Step 6 / 7 — Repoint references from Work to Operations
- Step 7 / 7 — Commit `build-operations-templates`

## Steps

### Step `1 / 7` — Create `templates/operating-instructions.tart`

Create `$DOMAINS/operations/templates/operating-instructions.tart` migrated from `$DOMAINS/work/templates/operating-instructions.tart`, updated with consuming-context input:

- Read the current template at `$DOMAINS/work/templates/operating-instructions.tart`.
- Update it to accept a consuming-context input (the artefact's workflows and operations) and render only instructions whose `relevantFor` matches.
- Keep `%render-metadata` logic: when TRUE (plans), render full prose; when FALSE (instruction files), render links only.
- Published instructions carry placeholder defaults (`%command-list`, `%setup-commands`); the guide overrides with project-side override (e.g. `**CommandList**`).
- Add a `::TEMPLATE::READ` directive referencing the Operations domain's types.

Expected outcome: `operating-instructions.tart` accepts a consuming context and renders only matching instructions.

### Step `2 / 7` — Create `files/operating-instructions.art`

Create `$DOMAINS/operations/files/operating-instructions.art` declaring the flat-file convention:

- naming pattern: `art/operating-instructions.md` per package
- one `## Operating Instructions: {Operation}` fragment per operation
- each fragment carries placeholder defaults (`%command-list`, `%setup-commands`) and a project-side override mechanism (e.g. `**CommandList**`)
- when a guide links the package, it renders the published default, then applies any project-side override via `**CommandList**`

Expected outcome: `operating-instructions.art` declares the flat-file convention with placeholder defaults and override mechanism.

### Step `3 / 7` — Update `plan.tart` to pass consuming context

Update `$DOMAINS/plans/templates/plan.tart` to pass the consuming context to the operating-instructions template:

- Locate the `## Operating Instructions` section in `plan.tart`.
- Update the `::TEMPLATE` directive that renders the operating-instructions template to pass the plan's workflows and operations as the consuming context.
- The plan's `workflows` and `operations` fields become the consuming context.
- Keep `%render-metadata = TRUE` for plans.

Expected outcome: `plan.tart` passes the plan's workflows and operations as the consuming context.

### Step `4 / 7` — Update `instructions.tart` to pass consuming context

Update `$DOMAINS/plans/templates/instructions.tart` to pass the consuming context:

- Locate the `## Operating Instructions` section in `instructions.tart`.
- Update the `::TEMPLATE` directive to pass the consuming context.
- Keep `%render-metadata = FALSE` for instruction files.
- The consuming context for instruction files is the execution-phase workflows and operations (different from the plan's planning-phase ones).

Expected outcome: `instructions.tart` passes the execution-phase workflows and operations as the consuming context.

### Step `5 / 7` — Create `@noodlestan/tooling-art` package with default command lists

Create the `@noodlestan/tooling-art` package in `noodlestan/workspace-tooling` holding default command lists:

- Create the package directory and `art/operating-instructions.md` file.
- Add one `## Operating Instructions: Setting Up` fragment with placeholder defaults (`%command-list`, `%setup-commands`) and a `**CommandList**` override mechanism.
- Add one `## Operating Instructions: Verifying Step` fragment with placeholder defaults and `**CommandList**` override mechanism.
- Add one `## Operating Instructions: Verifying Completion` fragment with placeholder defaults and `**CommandList**` override mechanism.
- Each fragment carries the default commands (e.g. `npm ci`, `npm run ci`) as placeholder defaults, overridable project-side via `**CommandList**`.

Expected outcome: the package exists with default command lists that can be overridden project-side.

### Step `6 / 7` — Repoint references from Work to Operations

Repoint all references from `$DOMAINS/work/templates/operating-instructions.tart` to the new Operations-domain path:

- Scan `$DOMAINS/` for references to the old template path.
- Update each reference to point to `$DOMAINS/operations/templates/operating-instructions.tart`.
- Do NOT modify the Work domain's own files yet (that's iteration 6: Integrate).

Expected outcome: all references to the migrated template point to the Operations domain.

#### Commit: `build-operations-templates`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
build(domain-operations): Add operating-instructions template and flat-file convention.

- Add operating-instructions.tart with consuming-context input and matching.
- Add flat-file convention with placeholder defaults and CommandList override.
- Create workspace-tooling package with default command lists.
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify that `$DOMAINS/operations/templates/operating-instructions.tart` accepts a consuming context and renders only matching instructions.
- Verify that `$DOMAINS/operations/files/operating-instructions.art` declares the flat-file convention with placeholder defaults and override mechanism.
- Verify that `plan.tart` and `instructions.tart` pass the consuming context to the operating-instructions template.
- Verify that the `@noodlestan/tooling-art` package exists with default command lists.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
