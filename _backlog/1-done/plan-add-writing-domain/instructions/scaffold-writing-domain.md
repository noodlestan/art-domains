# Instructions: `scaffold-writing-domain`

**Plan:** `add-writing-domain`

**Iteration Id:** `scaffold-writing-domain`

## Before you Start

::switch `agent-worker` — switch to the agent-worker agent mode to execute these instructions. Your mode must be `worker` before you start changing files.

These are your instructions.

RULE: If at any point you are instructed to **REPORT A BLOCKER** or you encounter a commit with `policy` set to `MANUAL` execute the instruction in the "## How to Report Back to the Delegator" section below and STOP processing any other instructions.

## How to Report Back to the Delegator

This section describes how to report back to the delegator after completing the instruction.

1. Summarise the current context, asking: are you reporting completion or a BLOCKER?
2. Gather the evidence of changes made and outcomes achieved, or the blocker error details.
3. Use the `render-template` skill with the `.agents/domains/plans/templates/instructions-report.tart` to render your report and write it next to this instruction file: `./scaffold-writing-domain__report.md`. No separate delegation record is created.
4. If your prompt included a `DIRECTIVE FEEDBACK:` include the feedback sections in the rendered report.
5. Generate the response and send it back to the delegator.
6. Keep the response terse per the Working Agreements: happy face + up to 3 bullet points (done `scaffold-writing-domain`, created `{artefacts}`, thumbs up). The full trail lives in the report file; never repeat it in chat.

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
3. **User interaction is minimal.** The user relays this instructions file to the delegator and expects a light confirmation: a happy face and up to 3 bullet points — done `scaffold-writing-domain`, created `{artefacts}`, thumbs up. If something goes horribly wrong, report the blocker instead of a summary.

## Goals

Establish the Writing domain's identity and boundaries so every later layer lands in a registered home: add `domain.art` with the domain purpose and boundaries, add the domain definitions, and register `Domain: Writing` in the domains listing.

## Mandatory Reading

- `$WORKSPACE/_guide.md` — workspace overview, path variables, and operating instructions.
- `../plan__writing-spec.md` — the domain spec; read `## Definitions`, `## Boundaries`, and `## Conventions` in full and follow them.
- `$DOMAINS/domains/structures/domain.art` — `Structure: Domain`, the shape `domain.art` must follow.
- `$DOMAINS/messages/domain.art` — **comparable example**: reference domain record to compare against — record against record — for purpose and boundaries style.
- `$DOMAINS/messages/definitions/index.art` — **comparable example**: reference definitions file to compare against — definitions against definitions — for format and semantics preservation.
- `$DOMAINS/plans/index.md` — reference domain index: the format to mirror for `writing/index.md` (do not generate the index yet — the domain has no resources besides definitions until later iterations; register the domain in `$DOMAINS/index.md` only).

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

This iteration declares the domain scaffold and its definitions only: no structures, no types, no routines, no behaviour.

- Step 1 / 4 — Create `domain.art`
- Step 2 / 4 — Create `definitions/index.art`
- Step 3 / 4 — Register `Domain: Writing` in `$DOMAINS/index.md`
- Step 4 / 4 — Commit `build-writing-domain-scaffold`

## Steps

### Step `1 / 4` — Create `domain.art`

Create `$DOMAINS/writing/domain.art` declaring **Domain: Writing** following `Structure: Domain`, with:

- purpose — give agents reusable, repo-agnostic article writing: an Article structure with an explicit lifecycle, routines to draft, review and integrate feedback, exposed through one skill, with each repo advertising its own writing resources through its `_guide.md`.
- boundaries — resources injected per repo, never hard-coded; annotations stay in articles; repo-side resources are registered through the guide, not distributed; no blog or platform assumptions.

Expected outcome: `domain.art` declares the domain with purpose and boundaries, consistent with `./plan__writing-spec.md`, `## Boundaries`.

### Step `2 / 4` — Create `definitions/index.art`

Create `$DOMAINS/writing/definitions/index.art` declaring the five definitions from `./plan__writing-spec.md`, `## Definitions`, one section each, with their exact semantics:

- **Article** — a written piece modelled by `Structure: Article`, materialised as a markdown file carrying annotations that remain in the text after every pass.
- **Annotation** — an own-line comment attached to the item it describes: taxonomy tags first, then an optional note; lists annotated as one block.
- **Note** — the optional free-text part of an annotation: explains, justifies, or doubts; never carries tags.
- **Article Review** — the `## Review` section after `---` with its verdict status and findings marked `fixed` or `proposed`.
- **Writing Resources** — the repo-side references an article routine needs: templates, tone of voice, annotation taxonomy, comms guidance, extra guides.

Expected outcome: five definitions, each preserving the spec's semantics verbatim.

### Step `3 / 4` — Register `Domain: Writing` in `$DOMAINS/index.md`

Modify `$DOMAINS/index.md` to list `Domain: Writing` with its path `$DOMAINS/writing/index.md` and a one-line purpose, following the existing entries' format.

Expected outcome: the domains listing includes Domain: Writing.

#### Commit: `build-writing-domain-scaffold`

**Policy:** NOPUSH — Agent MUST create the commit and proceed to the next step but MUST NOT push to the remote repository.

**Message:**

```
build(domain-writing): Scaffold Domain: Writing.
```

---

## Final Verification

**Instructions:**

- Verify that commits have been executed and pushed (or not pushed) according to the commit's policy.
- Verify that `$DOMAINS/writing/domain.art` declares purpose and boundaries, and that `definitions/index.art` carries all five definitions from the spec.
- Verify that `Domain: Writing` appears in `$DOMAINS/index.md`.
- Execute the **Verifying Completion** step as defined in the "Operating Instructions" section.
- Report according to the "How to Report Back to the Delegator" instructions.
