# Instructions: `add-read-writing-instructions-routine`

**Plan:** `add-writing-domain`

**Iteration Id:** `add-read-writing-instructions-routine`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `./add-read-writing-instructions-routine__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `add-read-writing-instructions-routine`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                | Purpose                             |
| ------------ | ---------------------------- | ----------------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root; repository for files |
| `$PROJECT`   | `$WORKSPACE/checkouts/art-domains` | Backlog hosting this plan     |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources under change       |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `add-read-writing-instructions-routine`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Resolve the current repo's writing resources in one place instead of assuming them: add the routine every `write-article` skill command calls before acting.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `../plan__writing-spec.md` — the domain spec; read `## Routines` (Routine: Read Writing Articles Instructions), `## Integration`, and `## Conventions` in full and follow them.
- `$DOMAINS/messages/routines/identify-inboxes.art` — **comparable example**: compare routine against routine — a routine that scans context for registered artefacts and returns them as data.
- `$DOMAINS/writing/routines/draft-article.art` — sibling routine: the input-injection pattern this routine must feed.

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

All steps MUST pass. The pre-commit hook runs `prettier . -c`; run `npx prettier --write` on every file you create before committing.

---

## Changes

This iteration adds one routine: data in, data out, no file writes.

- Step 1 / 2 — Create `routines/read-writing-instructions.art`
- Step 2 / 2 — Commit `add-read-writing-instructions`

## Steps

### Step `1 / 2` — Create `routines/read-writing-instructions.art`

Create `$DOMAINS/writing/routines/read-writing-instructions.art` in domain routine format (compare routine against routine), per `./plan__writing-spec.md`, `## Routines`:

- `**Inputs:**` — `%repo-guide` — path to the repo guide; defaults to the `_guide.md` of the current checkout.
- `**Outputs:**` — `%writing-resources` — the registered templates, tone of voice, annotation taxonomy, comms guides and other references; `%missing` — absent section or resources.
- `**Procedure:**` —
  1. Read `%repo-guide` and locate its `## Writing Articles` section; when absent, return empty `%writing-resources` and record the section itself in `%missing`.
  2. Parse each registered `::READ` directive in the section; resolve each path; verify it exists — unresolved paths go to `%missing`, never assumed.
  3. Classify the resolved resources — templates, taxonomy, tone of voice, comms, other — and return them as `%writing-resources`.
- The routine returns data only; it never writes files and never falls back to defaults — missing stays missing.

Expected outcome: one routine file; no hard-coded repo paths; returns `%writing-resources` and `%missing`.

#### Commit: `add-read-writing-instructions`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
build(domain-writing): Add read-writing-instructions routine.
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify the routine returns both `%writing-resources` and `%missing`, writes no files, and assumes no defaults.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
