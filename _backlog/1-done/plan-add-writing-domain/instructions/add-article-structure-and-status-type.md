# Instructions: `add-article-structure-and-status-type`

**Plan:** `add-writing-domain`

**Iteration Id:** `add-article-structure-and-status-type`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `./add-article-structure-and-status-type__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `add-article-structure-and-status-type`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                | Purpose                                |
| ------------ | ---------------------------- | -------------------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root; repository for new files |
| `$PROJECT`   | `$WORKSPACE/checkouts/art-domains` | Backlog hosting this plan         |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources under change          |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `add-article-structure-and-status-type`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Model the article so routines can set its lifecycle explicitly and commands can reason about its state: add `Type: Article Status` and `Structure: Article`, mirroring how Domain: Messages models its subject.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `../plan__writing-spec.md` — the domain spec; read `## Structures`, `## Types`, `## Definitions`, and `## Conventions` in full and follow them.
- `$DOMAINS/plans/types/instructions-mode.art` — example of a type file's format (primitive and options declaration).
- `$DOMAINS/messages/types/message-type.art` — **comparable example**: compare type against type — primitive, option names, and per-option semantics.
- `$DOMAINS/messages/structures/message-board.art` — **comparable example**: compare structure against structure — `**Shape:**` declaration and type references.
- `$DOMAINS/work/types/work-status.art` — secondary example of an enum type with per-value semantics.

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
npx prettier --write .agents/domains/writing # format new .md/.art files
npm run ci # lint, build and test
```

All steps MUST pass. The pre-commit hook runs `prettier . -c`; run `npx prettier --write` on every file you create before committing.

---

## Changes

This iteration declares the article model only: no routines, no behaviour.

- Step 1 / 4 — Create `types/article-status.art`
- Step 2 / 4 — Create `structures/article.art`
- Step 3 / 4 — Refresh the Domain: Writing entry in `$DOMAINS/index.md`
- Step 4 / 4 — Commit `add-article-structure-and-status-type`

## Steps

### Step `1 / 4` — Create `types/article-status.art`

Create `$DOMAINS/writing/types/article-status.art` declaring **Type: Article Status**, following the format of the comparable example (compare type against type):

- `Primitive:` Enum
- options, each with its semantics from `./plan__writing-spec.md`, `## Types`:
  - `DRAFT` — drafted, awaiting review.
  - `REVIEWED` — review written back.
  - `AUTHORED` — feedback integrated and clean.
  - `READY` — manually switched; no routine yet.

Expected outcome: four options in lifecycle order, semantics preserved from the spec.

### Step `2 / 4` — Create `structures/article.art`

Create `$DOMAINS/writing/structures/article.art` declaring **Structure: Article**, following the format of the comparable example (compare structure against structure), with the shape from `./plan__writing-spec.md`, `## Structures`:

- `purpose` — NaturalExpression.
- `description` — NaturalExpression.
- `titles` — List(NaturalExpression) — the possible titles.
- `tags` — list of tags.
- `status` — Type: Article Status (reference `$DOMAINS/writing/types/article-status.art`).

Expected outcome: the structure declares all five fields and references the status type — no inline enumeration of statuses.

### Step `3 / 4` — Refresh the Domain: Writing entry in `$DOMAINS/index.md`

Refresh the `Domain: Writing` entry in `$DOMAINS/index.md` so its resource list reflects the new type and structure, following the existing entries' format.

Expected outcome: the domains listing reflects the new resources.

#### Commit: `add-article-structure-and-status-type`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
build(domain-writing): Add Article structure and article status type.
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify that `article-status.art` carries exactly the four lifecycle options with their spec semantics.
- Verify that `article.art` declares all five fields and references `Type: Article Status` by reference, not by inline values.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
