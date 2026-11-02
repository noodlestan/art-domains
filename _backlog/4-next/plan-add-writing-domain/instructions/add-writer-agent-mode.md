# Instructions: `add-writer-agent-mode`

**Plan:** `add-writing-domain`

**Iteration Id:** `add-writer-agent-mode`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `./add-writer-agent-mode__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `add-writer-agent-mode`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                | Purpose                                |
| ------------ | ---------------------------- | -------------------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root; repository for files   |
| `$PROJECT`   | `$WORKSPACE/checkouts/art-domains` | Backlog hosting this plan         |
| `$SKILLS`    | `$WORKSPACE/.agents/skills`  | Agent modes and skills under change    |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `add-writer-agent-mode`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Bind the skill to a dedicated mode whose writing mandatory reading is discovered from the repo's guide: add agent-mode `writer`, allowed the `write-article` skill, and register it everywhere agent modes are listed.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `.agents/skills/agent-planner/SKILL.md` — **comparable example**: compare agent-mode against agent-mode — front-matter, mission, mandatory reading, required and allowed skills, interaction modes.
- `.agents/skills/update-agents/SKILL.md` — the skill that registers agent modes across the index, Codex agent files, and `opencode.json`.
- `$SKILLS/write-article/SKILL.md` — the skill this mode binds.

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

This iteration adds one agent mode and registers it everywhere agent modes are listed.

- Step 1 / 3 — Create `agent-writer/SKILL.md`
- Step 2 / 3 — Register `writer` across the agent-modes index, Codex agent files, and `opencode.json`
- Step 3 / 3 — Commit `add-writer-agent-mode`

## Steps

### Step `1 / 3` — Create `agent-writer/SKILL.md`

Create `$SKILLS/agent-writer/SKILL.md` following the comparable example (compare agent-mode against agent-mode):

- Front-matter with `name: agent-writer` and a description centred on writing, reviewing, and finishing articles.
- `> $AGENT_MODE: 'writer'` declaration.
- `## Mission` — draft, review, and integrate feedback on articles using the domain routines and each repo's registered writing resources.
- `## Mandatory Reading` — discovered from the repo: scan the current checkout's `_guide.md` for its `## Writing Articles` section and read the registered resources through Routine: Read Writing Articles Instructions; the section is the entry point, never a hard-coded path.
- `## Required Skills` — `write-article`, `parking-lot`.
- `## Allowed Skills` — `rehash`, `english`, `render-template`.
- Keep interaction modes minimal; this mode executes writing tasks, it does not plan work.

Expected outcome: one agent-mode file; mandatory reading flows from the guide section; `write-article` required.

### Step `2 / 3` — Register `writer` across the agent-modes index, Codex agent files, and `opencode.json`

Apply the `update-agents` skill: add `writer` to the agent-modes index and the Codex agent files, and register the mode in `$WORKSPACE/opencode.json` following the existing modes' entries.

Expected outcome: `writer` is listed everywhere agent modes are listed, mirroring the other modes' entries.

#### Commit: `add-writer-agent-mode`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
build(domain-writing): Add writer agent mode.
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify `$SKILLS/agent-writer/SKILL.md` declares `$AGENT_MODE: 'writer'`, requires `write-article`, and discovers mandatory reading from the `_guide.md` `## Writing Articles` section.
- Verify `writer` appears in the agent-modes index, the Codex agent files, and `opencode.json`.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
