# Instructions: `register-management-writing-articles`

**Plan:** `add-writing-domain`

**Iteration Id:** `register-management-writing-articles`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `./register-management-writing-articles__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `register-management-writing-articles`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable      | Resolved Path                     | Purpose                                    |
| ------------- | --------------------------------- | ------------------------------------------ |
| `$WORKSPACE`  | Current working directory         | Workspace root                             |
| `$PROJECT`    | `$WORKSPACE/checkouts/art-domains` | Backlog hosting this plan                 |
| `$MANAGEMENT` | `$WORKSPACE/checkouts/management` | First registered repo; `_guide.md` to edit |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `register-management-writing-articles`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Roll the skill out where the writing kit already lives: register `$MANAGEMENT`'s `_ops/writing` kit in its `_guide.md` `## Writing Articles` section and prove the read routine resolves it.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions (also the model for a guide's section style).
- `../plan__writing-spec.md` — the domain spec; read `## Skill` — Command: Register Writing Resources, including the section format block — and `## Integration`.
- `$MANAGEMENT/_guide.md` — the target file; find where its `## Recommended Reading`-style sections sit and place the new section consistently.
- `$DOMAINS/writing/routines/read-writing-instructions.art` — the routine whose resolution you must verify after registering.

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
npm run ci # lint, build and test
```

The management checkout runs its own pre-commit prettier; stage and commit its files from within that checkout.

---

## Changes

This iteration edits one file in the management checkout and proves resolution.

- Step 1 / 3 — Add the `## Writing Articles` section to `$MANAGEMENT/_guide.md`
- Step 2 / 3 — Verify every registered resource resolves
- Step 3 / 3 — Commit `register-management-writing-articles` (management)

## Steps

### Step `1 / 3` — Add the `## Writing Articles` section to `$MANAGEMENT/_guide.md`

Add a `## Writing Articles` section to `$MANAGEMENT/_guide.md`, in the format given in `./plan__writing-spec.md`, `## Skill` (the section format block), listing the kit:

- ::READ `./_ops/writing/index.md` (Kit) — writing kit index: references and routines.
- ::READ `./_ops/writing/article-templates.md` (Templates) — article outline templates.
- ::READ `./_ops/writing/annotation-taxonomy.md` (Taxonomy) — annotation vocabulary.
- ::READ `./_ops/writing/tone-of-voice.md` (Guide) — tone of voice.
- ::READ `./_ops/writing/noodlestan-comms.md` (Guide) — communication guidance.

Plus one closing line pointing at Domain: Writing routines and the `write-article` skill. Paths are relative to the management checkout; verify each exists — the routines section no longer lives in the kit (it moved to the domain in an earlier iteration).

Expected outcome: the guide advertises the kit; every listed path resolves from the management checkout.

### Step `2 / 3` — Verify every registered resource resolves

Execute Routine: Read Writing Articles Instructions against `$MANAGEMENT/_guide.md`: parse the section, resolve each `::READ`, and confirm `%writing-resources` contains all five references with `%missing` empty.

Expected outcome: five resources resolved, `%missing` empty; report the resolution in your report file.

#### Commit: `register-management-writing-articles`

**Repository:** Management — run from within the management checkout.

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
docs(management): Add Writing Articles section to guide.
```

---

## Final Verification

**Instructions:**

- Verify that the commit has been created and NOT pushed, per the commit's policy.
- Verify `$MANAGEMENT/_guide.md` contains the `## Writing Articles` section with five resolving `::READ` directives.
- Verify Routine: Read Writing Articles Instructions resolves all five with `%missing` empty.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
