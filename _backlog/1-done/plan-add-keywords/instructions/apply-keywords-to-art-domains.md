# Instructions: `apply-keywords-to-art-domains`

**Plan:** `add-keywords`

**Iteration Id:** `apply-keywords-to-art-domains`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-keywords/instructions/apply-keywords-to-art-domains__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `apply-keywords-to-art-domains`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

This section lists the path variables used in this instruction file. All file references in this instructions file MUST use these variables — never bare filesystem paths.

| Variable      | Resolved Path                | Purpose                                               |
| ------------- | ---------------------------- | ----------------------------------------------------- |
| `$WORKSPACE`  | Current working directory    | Workspace meta-repository root for commands.          |
| `$PROJECT`    | `checkouts/art-domains`      | Art Domains checkout, the only repository you modify. |
| `$DOMAINS`    | `$WORKSPACE/.agents/domains` | Domain sources, read only in this iteration.          |
| `$MANAGEMENT` | `checkouts/management`       | Management checkout, source of the keyword list.      |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `apply-keywords-to-art-domains`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Apply the new `keywords` field to the Art Domains project record and render the same keywords in the project README, then normalise the project license wording and copyright year, as the first use case of the keyword rollout.

## Mandatory Reading

This section lists the documentation and reference files the sub-agent needs to read before making changes.

::READ `$PROJECT/_guide.md` (Guide) — Defines the Art Domains project layout, records management, and verification commands. Relevant for every step.

::READ `$WORKSPACE/_guide.md` (Guide) — Defines the workspace layout and path variables. Relevant for Setting up.

::READ `$DOMAINS/projects/structures/project.art` (Structure) — The structure the project record must satisfy; read the `keywords` declaration and the `Project: Purrfect` example. Relevant for Step 1.

::READ `$MANAGEMENT/_roadmap/3-now/milestone-rollout-project-keywords/milestone__keywords.md` (Milestone Attachment) — The authoritative keyword list, section `Keywords: Art Domains`. Relevant for Steps 1 and 2.

::READ `$WORKSPACE/knowledge/conventions/writing-commit-message.art` (Conventions) — Allowed commit types, scopes, and message format. Relevant for the commit step.

::READ `$PROJECT/_records/project.art` (Record) — The record being extended. Relevant for Step 1.

::READ `$PROJECT/README.md` (Record) — The README being extended. Relevant for Step 2.

::READ `$PROJECT/_records/license.art` (Record) — The license record whose article wording is corrected. Relevant for Step 3.

- RULE: You MUST follow any links under `## Mandatory Reading` sections found in the listed files.
- RULE: If you are unable to read a file linked under `## Mandatory Reading` you must stop and REPORT A BLOCKER.

---

## Operating Instructions

### Setting Up

**Purpose:** Prepare the execution environment. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/setting-up/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md` and `$PROJECT/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
```

Run from the `$PROJECT` root:

```bash
npm run ci # verify the project baseline is green before starting.
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

Run from the `$PROJECT` root:

```bash
npm run lint:fix # to fix formatting issues automatically
npm run ci # lint, test and build.
```

All steps MUST pass.

---

## Changes

This section summarises the changes to be made in this iteration.

- Step 1 / 6 — Add `Keywords` to the project record
- Step 2 / 6 — Project keywords into the README as a field
- Step 3 / 6 — Add keywords to the root `package.json`
- Step 4 / 6 — Correct the license article and confirm the year
- Step 5 / 6 — Verify no domain source was touched
- Step 6 / 6 — Commit `apply-keywords-to-art-domains`

## Steps

This section contains the detailed steps to execute, including commit steps.

### Step `1 / 6` — Add `Keywords` to the project record

Open `$PROJECT/_records/project.art` and add a `**Keywords:**` field to the `## Project: Art Domains` record.

The keyword list is fixed by the milestone attachment, section `Keywords: Art Domains`, in that order. Copy the values verbatim and do not add, remove, reorder, or reword any of them.

Insert the field between the `**Resources:**` list and the `**Private:**` field, matching the `**Shape:**` order declared in `$DOMAINS/projects/structures/project.art`.

```md
**Keywords:**

- agentic-workflows
- agent-instructions
- skills
- knowledge-management
- structured-data
- workspaces
- records
```

RULE: The keyword list MUST match the milestone attachment exactly. If the two disagree, STOP and REPORT A BLOCKER.

RULE: Do not modify `**Purpose**`, `**Description**`, `**Owner**`, `**Author**`, `**Repository**`, `**Code**`, `**Resources:**`, `**Private:**`, `**Management:**`, or `**License:**`.

RULE: Do not touch the stale `Package: Workspace CLI` entry under `**Resources:**`. Removing it is a follow-up owned by another iteration.

Expected outcome: `$PROJECT/_records/project.art` renders a `**Keywords:**` field with 7 bullets, positioned between `**Resources:**` and `**Private:**`.

### Step `2 / 6` — Project keywords into the README as a field

Open `$PROJECT/README.md` and add a `**Keywords:**` field.

Insert it between the description paragraph (the line beginning "Distributable artificial resources...") and the `## Development` heading, so the keywords sit with the project description rather than in the development section.

Render the same 7 keywords from Step 1 as an inline comma-separated list, in the same order, with no backticks and a trailing period.

```md
**Keywords:** agentic-workflows, agent-instructions, skills, knowledge-management, structured-data, workspaces, records.
```

RULE: The README keyword list MUST match the record keyword list in Step 1 exactly, in the same order.

RULE: Do not modify the `## Development`, `### Scripts`, or `## License` sections of the README in this step.

Expected outcome: `$PROJECT/README.md` renders a `**Keywords:**` field between the description and `## Development`.

### Step `3 / 6` — Add keywords to the root `package.json`

Open `$PROJECT/package.json` and add a `keywords` array carrying the same 7 keywords from Step 1, in the same order.

Insert the key between `description` and `author`, preserving the existing 2-space JSON indentation and a trailing comma on the last element.

```json
"keywords": [
  "agentic-workflows",
  "agent-instructions",
  "skills",
  "knowledge-management",
  "structured-data",
  "workspaces",
  "records"
],
```

RULE: The manifest keyword list MUST match the record keyword list in Step 1 exactly, in the same order.

RULE: Modify no other key in the manifest. In particular leave `name`, `version`, `description`, `author`, `license`, `private`, `packageManager`, `workspaces`, `engines`, `scripts`, and `devDependencies` untouched.

RULE: Do not reformat, reorder, or re-indent any existing part of the file.

RULE: The manifest remains `private: true`. Do not change its publication state; annotating a private manifest is deliberate, so that this project has one keyword set projected to all three carriers.

Expected outcome: `$PROJECT/package.json` carries a `keywords` array with the 7 keywords, positioned between `description` and `author`, and the file remains valid JSON.

### Step `4 / 6` — Correct the license article and confirm the year

Open `$PROJECT/_records/license.art` and locate the short license form.

Replace the sentence:

```md
Published under a [MIT license](https://noodlestan.mit-license.org/).
```

with:

```md
Published under an [MIT license](https://noodlestan.mit-license.org/).
```

Then confirm the copyright year is `2026` in all three places, and correct any that is not:

1. The short form copyright line in `$PROJECT/_records/license.art`.
2. The long form copyright line in `$PROJECT/_records/license.art`.
3. The copyright line in the `## License` section of `$PROJECT/README.md`.

RULE: The `## License: Noodlestan 2026 MIT` heading itself carries the year in its name. Change it only if the year is wrong.

RULE: Do not alter the license body text, the permissions paragraphs, the copyright holder name, or the license URLs.

RULE: Do not apply this change to any other repository. Each repository is normalised by its own plan in a later phase.

Expected outcome: "under an" appears in the short license form, and every copyright line in `$PROJECT/_records/license.art` and `$PROJECT/README.md` reads `Copyright (c) 2026 Noodlestan https://noodlestan.org/`.

### Step `5 / 6` — Verify no domain source was touched

Confirm the change set is exactly the four files edited above, by running from the `$WORKSPACE` root:

```bash
git -C $PROJECT status --porcelain -- README.md package.json _records
```

Scope the command to the tracked paths you edited. Do NOT run a bare `git -C $PROJECT status --porcelain` for this check: the planning artefacts under `$PROJECT/_backlog/3-now/` are legitimately untracked in this repository, and a bare status listing them is expected, not a defect.

Expected outcome: exactly these four lines, all modifications:

```text
 M README.md
 M _records/license.art
 M _records/project.art
 M package.json
```

Then confirm nothing outside the plan's change set moved, by running:

```bash
git -C $PROJECT status --porcelain
```

Expected outcome: the four lines above, plus the `_backlog/3-now/` planning directory and nothing else. That entry is this plan's own directory — the plan file, this instructions file, and the previous iteration's report. Leave every file under it in place.

RULE: If any file outside `_backlog/3-now/`, `README.md`, `package.json`, and `_records/` appears as modified, revert that file with `git -C $PROJECT checkout -- {path}`. Do not stage or commit anything in this step.

RULE: NEVER delete or clean anything under `$PROJECT/_backlog/3-now/`. These are this plan's planning artefacts and they must survive your run.

RULE: Stage your four files explicitly by path in the commit step. Never use `git add .`, `git add -A`, or `git clean`.

RULE: Do not modify any file under `$DOMAINS`. The structure declarations were committed by the previous iteration.

---

#### Commit: `apply-keywords-to-art-domains`

**Policy:** AUTONOMOUS — Agent should commit autonomously, push, and proceed to the next step.

**Message:**

```
records(art-domains): add project keywords, render them in README, fix license wording.

- Add Keywords field to _records/project.art.
- Add Keywords field to README.md.
- Add Keywords field to package.json.
- Fix "under a" to "under an" in _records/license.art; confirm year 2026.
```

RULE: Commit from the `$PROJECT` root on branch `main`, and stage only `_records/project.art`, `_records/license.art`, `README.md`, and `package.json`.

RULE: The commit message MUST be used verbatim. Do not add, remove, or reword any line.

RULE: If the copyright year was already `2026` everywhere and required no edit, keep the message verbatim anyway; it records the verification, not only the edit.

---

## Final Verification

This section describes how to confirm the iteration is completed and ready for being committed.

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify that `$PROJECT/_records/project.art` renders `**Keywords:**` between `**Resources:**` and `**Private:**`, with the 7 keywords in the milestone order.
- Verify that `$PROJECT/README.md` renders a `**Keywords:**` field between the description and `## Development`, with the same 7 keywords in the same order.
- Verify that `$PROJECT/package.json` carries a `keywords` array between `description` and `author` with the same 7 keywords in the same order, that the file parses as valid JSON, and that `private` is still `true`.
- Verify that the three keyword lists are identical to each other, in the same order, and that all values are lowercase kebab-case.
- Verify that `$PROJECT/_records/license.art` short form reads "Published under an [MIT license]", and that every copyright line in that file and in `$PROJECT/README.md` reads `Copyright (c) 2026 Noodlestan https://noodlestan.org/`.
- Verify that `git -C $PROJECT status --porcelain` reports only the four intended modifications plus the `_backlog/3-now/` planning directory, and that the working tree is clean of your own edits after the commit.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
