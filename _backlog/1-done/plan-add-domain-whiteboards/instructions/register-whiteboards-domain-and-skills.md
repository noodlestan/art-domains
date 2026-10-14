# Instructions: `register-whiteboards-domain-and-skills`

**Plan:** `add-domain-whiteboards`

**Iteration Id:** `register-whiteboards-domain-and-skills`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-domain-whiteboards/instructions/register-whiteboards-domain-and-skills__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `register-whiteboards-domain-and-skills`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                | Purpose                                    |
| ------------ | ---------------------------- | ------------------------------------------ |
| `$WORKSPACE` | Current working directory    | Workspace root; repository for all changes |
| `$PROJECT`   | Provided with prompt         | Backlog hosting this plan                  |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources under change              |
| `$SKILLS`    | `$WORKSPACE/.agents/skills`  | Agent modes and skills directory           |

## Working Agreements

The plan workflow (see the entry point guide → Planning Workflow → Working Together) runs on three working agreements:

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail: evidence, changes, verification results, blockers, feedback. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `register-whiteboards-domain-and-skills`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Make the new domain and the new skill discoverable: the domains listing lists `Domain: Whiteboards` and its resources, the skills listing lists `whiteboard`, and every agent mode is allowed to use it.

Use the existing registration machinery — `update-domains`, `update-skills`, `update-agents` — instead of hand-editing generated files.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `$SKILLS/update-domains/SKILL.md` — registers the domain and its resources in the listing and regenerates the domain index.
- `$SKILLS/update-skills/SKILL.md` — registers skills in the skills listing.
- `$SKILLS/update-agents/SKILL.md` — updates the agent-modes index, the Codex agent files, and `opencode.json`.
- `$DOMAINS/domains/routines/build-domain-index.art` and `$DOMAINS/domains/routines/generate-domain-listing.art` — the routines those skills drive.
- `$DOMAINS/whiteboards/domain.art` and `$DOMAINS/whiteboards/index.md` — created in `add-whiteboard-structures`.

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
npx prettier --write .agents # format generated .md/.json files
npm run ci # lint, build and test
```

All steps MUST pass. The pre-commit hook runs `prettier . -c`; run `npx prettier --write` on every file you change before committing.

---

## Changes

This iteration registers only; it adds no new domain or skill files.

- Step 1 / 4 — Register the domain and its resources with `update-domains`
- Step 2 / 4 — Register the skill with `update-skills`
- Step 3 / 4 — Allow the skill in all agent modes with `update-agents`
- Step 4 / 4 — Commit `register-domain-whiteboards`

## Steps

### Step `1 / 4` — Register the domain and its resources with the `update-domains` skill

Execute the `update-domains` skill so that:

1. The domains listing lists `Domain: Whiteboards` with its path and purpose.
2. `$DOMAINS/whiteboards/index.md` is regenerated with the domain's actual resources — structures, types, templates, files, routines — so the scaffold and the listing agree.

Do not hand-edit either file; they are generated.

Expected outcome: `Domain: Whiteboards` appears in the domains listing and its index lists every resource added by the previous iterations.

### Step `2 / 4` — Register the skill with the `update-skills` skill

Execute the `update-skills` skill so the skills listing includes `whiteboard` with its description.

Expected outcome: `$SKILLS/index.md` lists `whiteboard` alongside `parking-lot`.

### Step `3 / 4` — Allow the skill in all agent modes with the `update-agents` skill

Execute the `update-agents` skill so `whiteboard` is listed among the **allowed** skills of **all** agent modes — the agent-modes index, the Codex agent files, and `$WORKSPACE/opencode.json` where the agent modes are declared.

Access is `ALL`, matching the `parking-lot` precedent: participation is cross-domain by design.

Expected outcome: every agent mode can invoke the `whiteboard` skill, and `opencode.json` agrees with the agent files.

### Step `4 / 4` — Commit `register-domain-whiteboards`

Format the changed files, verify, then commit.

---

#### Commit: `register-domain-whiteboards`

**Policy:** AUTONOMOUS — Agent should commit autonomously, push, and proceed to the next step.

**Message:**

```
build(domain-whiteboards): Register Whiteboards domain and skills.

- Generate .agents/domains/whiteboards/index.md with Routine: Build Domain Index
- Register domains, skills, and agent modes with update-domains, update-skills, update-agents
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify the domains listing lists `Domain: Whiteboards` and every resource under `$DOMAINS/whiteboards/`.
- Verify `$DOMAINS/whiteboards/index.md` matches the generated output (not a hand-written variant).
- Verify `$SKILLS/index.md` lists `whiteboard`.
- Verify `whiteboard` appears in the allowed skills of every agent mode, in the agent-modes index, the Codex agent files, and `$WORKSPACE/opencode.json` — consistently.
- Verify no generated file was hand-edited: diff shows only generated changes plus `opencode.json`.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
