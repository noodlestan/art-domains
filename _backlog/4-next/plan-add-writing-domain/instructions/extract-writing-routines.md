# Instructions: `extract-writing-routines`

**Plan:** `add-writing-domain`

**Iteration Id:** `extract-writing-routines`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `./extract-writing-routines__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `extract-writing-routines`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable      | Resolved Path                     | Purpose                                     |
| ------------- | --------------------------------- | ------------------------------------------- |
| `$WORKSPACE`  | Current working directory         | Workspace root; repository for new files    |
| `$PROJECT`    | `$WORKSPACE/checkouts/art-domains` | Backlog hosting this plan                  |
| `$DOMAINS`    | `$WORKSPACE/.agents/domains`      | Domain resources under change               |
| `$MANAGEMENT` | `$WORKSPACE/checkouts/management` | Source of the routines and of the kit index |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `extract-writing-routines`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Make the three article routines distributable: same behaviour, no hard-coded repo paths. Move them into the domain, convert to domain routine format, replace the `$MANAGEMENT` reads with injected inputs, align the head to `Structure: Article`, and set each routine's lifecycle status explicitly.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `../plan__writing-spec.md` — the domain spec; read `## Routines`, `## Structures`, `## Types`, and `## Conventions` in full and follow them.
- `$MANAGEMENT/_ops/writing/routines/draft-article.md` — the source routine to extract.
- `$MANAGEMENT/_ops/writing/routines/review-article.md` — the source routine to extract.
- `$MANAGEMENT/_ops/writing/routines/integrate-feedback.md` — the source routine to extract.
- `$DOMAINS/messages/routines/read-message.art` — **comparable example**: compare routine against routine — `**Inputs:**`, `**Outputs:**`, `**Procedure:**`, `**Purpose:**` format, and data-in/data-out discipline.
- `$DOMAINS/plans/structures/iteration.art` — routine-adjacent format reference for field declarations.
- `$DOMAINS/writing/structures/article.art` — the structure the article head must align to.
- `$DOMAINS/writing/types/article-status.art` — the status type the routines must set.

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
npx prettier --write .agents/domains/writing # format new .art files
npm run ci # lint, build and test
```

The management checkout runs its own pre-commit prettier; stage and commit its files from within that checkout.

All steps MUST pass. Run `npx prettier --write` on every file you create before committing.

---

## Changes

This iteration moves three routines and retargets the kit index: behaviour is carried over, paths become inputs, statuses become explicit.

- Step 1 / 6 — Create `routines/draft-article.art`
- Step 2 / 6 — Create `routines/review-article.art`
- Step 3 / 6 — Create `routines/integrate-feedback.art`
- Step 4 / 6 — Repoint the kit index and delete the source routines (management checkout)
- Step 5 / 6 — Commit `extract-writing-routines` (workspace)
- Step 6 / 6 — Commit `repoint-management-writing-index` (management)

## Steps

### Step `1 / 6` — Create `routines/draft-article.art`

Create `$DOMAINS/writing/routines/draft-article.art` from `$MANAGEMENT/_ops/writing/routines/draft-article.md`, in domain routine format (compare routine against routine against `$DOMAINS/messages/routines/read-message.art`):

- `**Inputs:**` — `%seed`, `%advice`, `%templates`, `%annotation-taxonomy`, `%tone-of-voice`, `%comms`. The last four REPLACE the `::READ $MANAGEMENT/_ops/writing/...` consults: they arrive as paths from the skill command.
- `**Outputs:**` — `%contents` — the fully written, annotated article; annotations remaining in the text.
- `**Procedure:**` — carried over verbatim in behaviour: intent (including kebab filename), load guides (now via inputs), skeleton, structure, outline, develop (ALWAYS annotate: tags plus optional note), five passes. Keep every annotation mandate.
- Status: set the article `**Status:**` to `DRAFT`, with the head aligned to `Structure: Article` — `**Purpose:**`, `**Description:**`, `**Titles:**`, `**Tags:**`, `**Status:**`.
- Keep the `**Examples:**` block, annotations with notes intact.

Expected outcome: one routine file, no `$MANAGEMENT` path anywhere in it, status `DRAFT` set explicitly.

### Step `2 / 6` — Create `routines/review-article.art`

Create `$DOMAINS/writing/routines/review-article.art` from `$MANAGEMENT/_ops/writing/routines/review-article.md`, same transformation:

- `**Inputs:**` — `%file`, `%templates`, `%annotation-taxonomy`, `%tone-of-voice`, `%comms`.
- `**Outputs:**` — the annotated article with `## Review` appended, plus `%findings` (status and counts).
- Status: set the article `**Status:**` to `REVIEWED`; the `## Review` `**Status:**` stays the review verdict (`READY`/`CHANGES PROPOSED`), distinct from the article lifecycle.
- Keep the `fixed`/`proposed` criteria, list-as-one-block rule, and sub-item findings.

Expected outcome: one routine file, no `$MANAGEMENT` path, status `REVIEWED` set explicitly.

### Step `3 / 6` — Create `routines/integrate-feedback.art`

Create `$DOMAINS/writing/routines/integrate-feedback.art` from `$MANAGEMENT/_ops/writing/routines/integrate-feedback.md`, same transformation:

- `**Inputs:**` — `%file`, `%templates`, `%annotation-taxonomy`, `%tone-of-voice`, `%comms`.
- `**Outputs:**` — the integrated, swept article, plus `%swept` (confirmation and counts).
- Status: set the article `**Status:**` to `AUTHORED` — NOT `READY`; the `READY` switch stays manual with no routine.
- Keep the marker scan, proposed-vs-fixed rule, inlined five passes with stopping rule, and final sweep.

Expected outcome: one routine file, no `$MANAGEMENT` path, status `AUTHORED` set explicitly.

### Step `4 / 6` — Repoint the kit index and delete the source routines (management checkout)

In the management checkout:

1. Modify `$MANAGEMENT/_ops/writing/index.md` — replace its Routines section with a pointer to Domain: Writing routines (`$DOMAINS/writing/routines/`), keeping the references section intact.
2. Delete `$MANAGEMENT/_ops/writing/routines/draft-article.md`, `$MANAGEMENT/_ops/writing/routines/review-article.md`, `$MANAGEMENT/_ops/writing/routines/integrate-feedback.md`.

Expected outcome: the kit index points at the domain; the source routines are gone.

#### Commit: `extract-writing-routines`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
migrate(domain-writing): Extract article routines from _ops/writing.
```

#### Commit: `repoint-management-writing-index`

**Repository:** Management — run from within the management checkout.

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
migrate(management): Drop _ops/writing routines; point index at Domain: Writing.
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy — workspace commit in the workspace repo, kit commit in the management repo.
- Verify no `$MANAGEMENT` path remains in any of the three new routine files.
- Verify each routine sets its status explicitly: draft `DRAFT`, review `REVIEWED`, integrate `AUTHORED`.
- Verify the source routines are deleted and the kit index points at Domain: Writing.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
