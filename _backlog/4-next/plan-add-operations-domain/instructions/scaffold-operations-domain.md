# Instructions: `scaffold-operations-domain`

**Plan:** `add-operations-domain`

**Iteration Id:** `scaffold-operations-domain`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `plan-add-operations-domain/instructions/scaffold-operations-domain__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse: happy face + up to 3 bullet points (done `scaffold-operations-domain`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

## Path Variables

| Variable     | Resolved Path                | Purpose                                      |
| ------------ | ---------------------------- | -------------------------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root; repository for all new files |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources under change                |

## Working Agreements

1. **This instructions file is self-contained.** Everything you need is in this file plus its mandatory reading — never rely on session memory, chat context, or details relayed by the user.
2. **Your report is mandatory.** The rendered report file carries the full trail. Your chat response is only a pointer to it.
3. **User interaction is minimal.** The user expects a light confirmation: a happy face and up to 3 bullet points. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Establish the Operations domain's identity and boundaries so every later layer lands in a registered home: add `domain.art` with the domain purpose and boundaries, add the domain definitions — operating instruction, operating instructions, relevantFor, consuming context, flat-file convention, override, command list — and register `Domain: Operations` in the domains listing.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `$PROJECT/_backlog/4-next/plan-add-operations-domain/plan__operations-spec.md` — the domain spec; read `## Definitions` in full and follow its `## Conventions`.
- `$DOMAINS/domains/structures/domain.art` — `Structure: Domain`, the shape `domain.art` must follow.
- `$DOMAINS/plans/domain.art` — reference domain record: the format to mirror for purpose and boundaries.
- `$DOMAINS/messages/definitions/index.art` — reference definitions file: the format to mirror for the operations definitions.
- `$DOMAINS/plans/index.md` — reference domain index: the format to mirror for `operations/index.md` (do not generate the index yet — the domain has no resources besides definitions until later iterations; register the domain in `$DOMAINS/index.md` only).

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
npx prettier --write .agents/domains/operations # format new .art files
npm run ci # lint, build and test
```

All steps MUST pass. The pre-commit hook runs `prettier . -c`; run `npx prettier --write` on every file you create before committing.

---

## Changes

- Step 1 / 4 — Create `domain.art`
- Step 2 / 4 — Create `definitions/index.art`
- Step 3 / 4 — Register `Domain: Operations` in `$DOMAINS/index.md`
- Step 4 / 4 — Commit `scaffold-operations-domain`

## Steps

### Step `1 / 4` — Create `domain.art`

Create `$DOMAINS/operations/domain.art` declaring **Domain: Operations** following `Structure: Domain`, with:

- purpose — model reusable operations, its distribution, discoverability, and selection.
- boundaries — operating instructions are selected, not accumulated; no plans or work-item assumptions; guide sections are a closed list; flat-file convention with placeholder defaults and project-side override.

Expected outcome: `domain.art` declares the domain with purpose and boundaries, consistent with `./plan__operations-spec.md`.

### Step `2 / 4` — Create `definitions/index.art`

Create `$DOMAINS/operations/definitions/index.art` declaring the definitions from `./plan__operations-spec.md`, `## Definitions`, one section each, with their exact semantics:

- **Operating Instruction** — a reusable procedure for a specific workflow operation; carries a relevantFor field so it can be selected for the consuming artefact; selected, not accumulated.
- **Operating Instructions** — the collection of operating instructions applicable to a work item, composed from upstream, scope, and knowledge resources; composed unconditionally; only rendering is conditional on relevantFor matching.
- **relevantFor** — field on Operating Instruction whose values are existing workflow and operation names; compose-operating-instructions matches on it against the consuming artefact.
- **Consuming Context** — set of workflows and operations of the artefact consuming the operating instructions; passed to the template so it can select only matching instructions.
- **Flat-File Convention** — one art/operating-instructions.md per package, with one fragment per operation; each fragment carries placeholder defaults and a project-side override mechanism.
- **Override** — project-side customization of a published operating-instruction fragment, supplied via the guide's Operating Instructions declaration; no per-project copies to maintain.
- **Command List** — the default command set (e.g. setup, verify) in a published fragment, overridable project-side.

Expected outcome: definitions, each preserving the spec's semantics.

### Step `3 / 4` — Register `Domain: Operations` in `$DOMAINS/index.md`

Modify `$DOMAINS/index.md` to list `Domain: Operations` with its path `$DOMAINS/operations/index.md` and a one-line purpose, following the existing entries' format.

Expected outcome: the domains listing includes Domain: Operations.

#### Commit: `scaffold-operations-domain`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
build(domain-operations): Scaffold Domain: Operations.

- Add domain.art with purpose and boundaries, and the domain definitions.
- Register Domain: Operations in the domains listing.
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify that `$DOMAINS/operations/domain.art` declares purpose and boundaries, and that `definitions/index.art` carries all definitions from the spec.
- Verify that `Domain: Operations` appears in `$DOMAINS/index.md`.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
