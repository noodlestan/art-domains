# Instructions: `add-write-article-skill`

**Plan:** `add-writing-domain`

**Iteration Id:** `add-write-article-skill`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `./add-write-article-skill__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `add-write-article-skill`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                | Purpose                              |
| ------------ | ---------------------------- | ------------------------------------ |
| `$WORKSPACE` | Current working directory    | Workspace root; repository for files |
| `$PROJECT`   | `$WORKSPACE/checkouts/art-domains` | Backlog hosting this plan      |
| `$SKILLS`    | `$WORKSPACE/.agents/skills`  | Agent modes and skills under change  |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Routines invoked by the commands     |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `add-write-article-skill`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Give agents one entry point to draft, review and finish articles, with local resources resolved before every action: one `write-article` skill whose five commands all start at Routine: Read Writing Articles Instructions.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `../plan__writing-spec.md` — the domain spec; read `## Skill` in full — every command's inputs and routine invocations — and follow `## Conventions`.
- `$SKILLS/messaging/SKILL.md` — **comparable example**: compare skill against skill — front-matter, allowed modes, mandatory reading, command structure, and the rule that every routine call is preceded by its `::READ` directive.
- `$DOMAINS/writing/routines/read-writing-instructions.art` — the routine every command must invoke first.
- `$DOMAINS/writing/routines/draft-article.art`, `$DOMAINS/writing/routines/review-article.art`, `$DOMAINS/writing/routines/integrate-feedback.art` — the routines the commands drive, and their input names.

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
npx prettier --write .agents/skills # format new .md files
npm run ci # lint, build and test
```

All steps MUST pass. The pre-commit hook runs `prettier . -c`; run `npx prettier --write` on every file you create before committing.

---

## Changes

This iteration adds one skill with five commands: every command resolves local writing resources first, and only commands compose responses.

- Step 1 / 3 — Create `write-article/SKILL.md`
- Step 2 / 3 — List `write-article` in `$SKILLS/index.md`
- Step 3 / 3 — Commit `add-write-article-skill`

## Steps

### Step `1 / 3` — Create `write-article/SKILL.md`

Create `$SKILLS/write-article/SKILL.md` following the comparable example (compare skill against skill), per `./plan__writing-spec.md`, `## Skill`:

- Front-matter (`name: write-article`, description), `## Allowed Agent Modes` — `writer`.
- `## Mandatory Reading` — the skill-level reading.
- Five commands, each declaring its inputs and invoking its routine with its `::READ` directive immediately before:
  - `draft article` — inputs `%seed`, `%advice` — invokes Routine: Draft Article.
  - `review article` — inputs `%file` — invokes Routine: Review Article.
  - `integrate feedback` — inputs `%file` — invokes Routine: Integrate Feedback.
  - `read writing articles instructions` — inputs `%repo-guide` (optional) — invokes Routine: Read Writing Articles Instructions and reports `%writing-resources` and `%missing`.
  - `register writing resources` — command only (no routine): inputs the repo's writing resources; writes the `## Writing Articles` section into the repo's `_guide.md` in the format given in `./plan__writing-spec.md`, `## Skill` — the section format block.
- RULE stated in the skill: the first four commands MUST invoke Routine: Read Writing Articles Instructions before any other routine, and pass the resolved resources into the routine as its inputs — no command assumes a template or guide exists.

Expected outcome: one skill file; five commands; every routine call preceded by `::READ`; commands compose responses, routines transform data.

### Step `2 / 3` — List `write-article` in `$SKILLS/index.md`

Modify `$SKILLS/index.md` to list the `write-article` skill following the existing entries' format.

Expected outcome: the skills listing includes `write-article`.

#### Commit: `add-write-article-skill`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
build(domain-writing): Add write-article skill with commands.
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify all five commands exist and the first four invoke Routine: Read Writing Articles Instructions before any other routine.
- Verify every routine call in the skill is preceded by its `::READ` directive.
- Verify `write-article` appears in `$SKILLS/index.md`.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
