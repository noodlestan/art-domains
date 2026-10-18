# Instructions: `integrate-operations-into-consumers`

**Plan:** `add-operations-domain`

**Iteration Id:** `integrate-operations-into-consumers`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-operations-domain/instructions/integrate-operations-into-consumers__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse: happy face + up to 3 bullet points (done `integrate-operations-into-consumers`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

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

Route all operating-instructions consumption through the Operations domain so every consumer passes a consuming context and selects only relevant instructions: update Work, Plans, and Whiteboards to consume the Operations domain instead of the Work domain's operating-instructions resources, with `relevantFor` matching at every point.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `$PROJECT/_backlog/4-next/plan-add-operations-domain/plan__operations-spec.md` — the domain spec; read `## Integration` in full.
- `$DOMAINS/work/index.md` — the Work domain index; operating-instructions resources must be removed from it.
- `$DOMAINS/plans/index.md` — the Plans domain index; must consume from Operations.
- `$DOMAINS/whiteboards/index.md` — the Whiteboards domain index; must consume from Operations.
- `$DOMAINS/plans/templates/plan.tart` — already updated by the previous iteration to pass consuming context.
- `$DOMAINS/plans/templates/instructions.tart` — already updated by the previous iteration to pass consuming context.
- `$DOMAINS/whiteboards/templates/whiteboard.tart` — must consume from Operations.
- `$DOMAINS/operations/index.md` — the new Operations domain index (created by the scaffold iteration).

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
npx prettier --write .agents/domains # format all changed domain files
npm run ci # lint, build and test
```

All steps MUST pass. The pre-commit hook runs `prettier . -c`; run `npx prettier --write` on every file you modify before committing.

---

## Changes

- Step 1 / 7 — Update Work domain index (remove migrated resources)
- Step 2 / 7 — Update Plans domain index and templates
- Step 3 / 7 — Update Whiteboards domain index and templates
- Step 4 / 7 — Update Guides domain (register and override via flat-file convention)
- Step 5 / 7 — Repoint all remaining references to Operations paths
- Step 6 / 7 — Regenerate Operations domain index
- Step 7 / 7 — Commit `integrate-operations-consumers`

## Steps

### Step `1 / 7` — Update Work domain index (remove migrated resources)

Update `$DOMAINS/work/index.md` to remove the operating-instructions resources that have been migrated to the Operations domain:

- Remove the `Type: Operating Instructions` row from the Types table.
- Remove the `Structure: Operation` row from the Structures table.
- Remove the `Routine: Compose Operating Instructions` row from the Routines table.
- Remove the `Routine: Read Work Guides` row from the Routines table.
- Remove the `Routine: Compose Work Operations` row from the Routines table.
- Remove the `Template: Operating Instructions` row from the Templates table.

Expected outcome: Work domain index no longer lists migrated resources.

### Step `2 / 7` — Update Plans domain index and templates

Update `$DOMAINS/plans/index.md` and `$DOMAINS/plans/templates/plan.tart` to consume from Operations:

- Update `$DOMAINS/plans/index.md` — add a reference to `Domain: Operations` in the knowledge/context section.
- Verify `plan.tart` passes the consuming context (done by the previous iteration). If not, update it.
- Update any `::READ` directives in `plan.tart` that reference Work-domain operating-instructions paths to point to Operations.

Expected outcome: Plans domain consumes from Operations.

### Step `3 / 7` — Update Whiteboards domain index and templates

Update `$DOMAINS/whiteboards/index.md` and `$DOMAINS/whiteboards/templates/whiteboard.tart` to consume from Operations:

- Update `$DOMAINS/whiteboards/index.md` — add a reference to `Domain: Operations` in the knowledge/context section.
- Update any `::READ` directives in `whiteboard.tart` that reference Work-domain operating-instructions paths to point to Operations.

Expected outcome: Whiteboards domain consumes from Operations.

### Step `4 / 7` — Update Guides domain (register and override via flat-file convention)

Update `$DOMAINS/guides/` — project guides register operating instructions via the flat-file convention:

- Locate the project guide (e.g. `$PROJECT/_guide.md`).
- Update the `### Operating Instructions: Setting Up` declaration to link the `@noodlestan/tooling-art` package's `art/operating-instructions.md` and apply the project-specific `**CommandList**` override.
- Update the `### Operating Instructions: Verifying Step` declaration similarly.
- Update the `### Operating Instructions: Verifying Completion` declaration similarly.
- Keep the guide's own project-specific instructions inlined.

Expected outcome: project guides register and override operating instructions via the flat-file convention.

### Step `5 / 7` — Repoint all remaining references to Operations paths

Repoint all remaining references from Work-domain operating-instructions paths to Operations:

- Scan `$DOMAINS/` for references to `$DOMAINS/work/types/operating-instructions.art`.
- Scan `$DOMAINS/` for references to `$DOMAINS/work/routines/compose-operating-instructions.art`.
- Scan `$DOMAINS/` for references to `$DOMAINS/work/routines/read-work-guides.art`.
- Scan `$DOMAINS/` for references to `$DOMAINS/work/routines/compose-work-operations.art`.
- Scan `$DOMAINS/` for references to `$DOMAINS/work/templates/operating-instructions.tart`.
- Update each reference to point to the corresponding `$DOMAINS/operations/` path.

Expected outcome: no references to the old Work-domain paths remain.

### Step `6 / 7` — Regenerate Operations domain index

Regenerate `$DOMAINS/operations/index.md` with the resources now in the Operations domain:

- Use `Routine: Build Domain Index` to scan `$DOMAINS/operations/` and produce the index.
- Top up `$DOMAINS/index.md` with the finished resource list.

Expected outcome: Operations domain index lists all resources (types, structures, routines, templates, files).

#### Commit: `integrate-operations-consumers`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
build(domain-operations): Integrate Operations into consumers.

- Repoint Work, Plans, Whiteboards, and Guides to consume from Operations.
- Update index listings and repoint all migrated references.
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify that `$DOMAINS/work/index.md` no longer lists operating-instructions resources.
- Verify that `$DOMAINS/plans/index.md` and `$DOMAINS/whiteboards/index.md` consume from Operations.
- Verify that `grep -rn 'work/types/operating-instructions\|work/routines/compose-operating-instructions\|work/routines/read-work-guides\|work/routines/compose-work-operations\|work/templates/operating-instructions' $DOMAINS` returns no matches (excluding the Operations domain's own files).
- Verify that `$DOMAINS/operations/index.md` lists all resources.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
