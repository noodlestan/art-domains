# Plan: Add Messages Domain

**ID:** `add-messages-domain`

**Status:** `WORKING`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Give agents an effective, low-noise tool to send persisted messages to other agents, routed through message boards and discarded once processed.

**Description:** Add a standalone Messages domain — a `Message Board` structure, `Message` and `Message Type` types, `message-board` and `message` templates plus a message file convention, and four routines (identify inboxes, process messages, read message, write message) exposed through a single `messaging` skill allowed to all agent modes, where commands own every session-chat write and response and routines only transform data. Then integrate into Domain: Whiteboards — model the message board parallel to the parking lot, ahead of it in structures, templates, and routine logic — so that every item is classified as a message or a parking-lot item and messages stop polluting parking lots. Built top-down (index and definitions, skill, commands, routines, templates and files, structures, types) and consolidated bottom-up in a final review pass.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable     | Resolved Path                 | Purpose                                                              |
| ------------ | ----------------------------- | -------------------------------------------------------------------- |
| `$WORKSPACE` | Current working directory     | Workspace root directory; hosts the domain source.                   |
| `$PROJECT`   | Provided with prompt          | Where this plan and its backlogs live.                               |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains`  | Domain resources under change.                                       |
| `$SKILLS`    | `$WORKSPACE/.agents/skills`   | Agent modes and skills directory.                                    |
| `$ART_JS`    | `$WORKSPACE/checkouts/art-js` | Example of poor comunication and message board in action (see spec). |

## Summary

Replace the noisy parking-lot-based messaging proven inefficient in Domain: Whiteboards with a dedicated Messages domain: message boards as the medium for short, discarded-after-processing messages; files as the medium for long messages; one `messaging` skill for all agents; and Whiteboards consuming the message board ahead of its parking lot, classifying every item as message or parking-lot item.

## Attachments

- `./plan__messages-spec.md` (Reference) — Structured spec for the whole domain per resource kind — Definitions, Skill, Routines, Structures, Types, Templates, Files, Integration — plus the `## Conventions` review criteria applied in the final review pass, and a verbatim appendix of the source parking-lot item.

## Context

### Upstream Work

| Kind        | Path                                                          | Role                                                                     |
| ----------- | ------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Parking Lot | `$PROJECT/_backlog/_parking-lot.md`                           | Source of this plan: actionable item "Create Plan: Add Messages Domain". |
| Milestone   | `$PROJECT/_roadmap/4-next/milestone-domains-one/milestone.md` | Coordinates this plan within the Art Domains roadmap.                    |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Refining.

### Domains

| Domain / Path                                       | Description                                                                           |
| --------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Domain: Whiteboards `$DOMAINS/whiteboards/index.md` | Integration target: parking-lot messaging proved noisy; the message board lands here. |
| Domain: Plans `$DOMAINS/plans/index.md`             | Inspiration for a new domain: structures, types, templates, files, routines, skills.  |
| Domain: Work `$DOMAINS/work/index.md`               | Shared work-item model and file and template conventions.                             |

### Knowledge

::READ `$DOMAINS/whiteboards/index.md` (Domain) — Integration target: whiteboard structure, template, and routines carrying the parking-lot modelling to be paralleled by the message board. Relevant for Planning Work Item.
::READ `$DOMAINS/plans/index.md` (Domain) — Inspiration for a new domain: structures, types, templates, files, routines, skills. Relevant for Planning Work Item.
::READ `$SKILLS/parking-lot/SKILL.md` (Skill) — The parking-lot canon the message board parallels and the item semantics the classification rules must preserve. Relevant for Planning Work Item.

## Scope

Add a new `$DOMAINS/messages/` domain — `domain.art`, a definitions file, one Structure (Message Board), two Types (Message, Message Type), two templates (message board, message), a message file convention, and four routines — expose it through one `messaging` skill allowed to all agent modes, and integrate the message board into Domain: Whiteboards ahead of its parking lot.

### Constraints

- **Messages are short-lived** — a message has a sender and a receiver and is discarded once processed by the receiver; nothing is kept for historical purposes. Any valuable content is integrated into the artefact where it belongs, and the integrated knowledge never cites the message as its source.
- **Two media, by length** — short messages (under 200 characters) go to a message board; long messages (over 1000 characters) go to a file; in between, the writer compresses to a short message or uses a file, adding detail when it helps the recipient.
- **Commands own the chat** — routines take data in and return data out; only commands write to, and respond in, the session chat.
- **Medium availability is checked before writing** — a board whose instructions gate the writer's turn is unavailable; a checkout or medium file with uncommitted changes is unavailable unless the medium's own instructions allow it or `%bypass-clean-check` is set; when unavailable, a short message parks at the top of the writer's own actionable parking-lot column.
- **Responses clean up after themselves** — a response purges its incoming board message; an incoming file message is integrated into an artefact, kept as an attachment, or deleted — never kept as a historical record.
- **No plans or work items** — messages, boards, and routines must not assume `Structure: Plan` or the work-item model.
- **Message board ahead of parking lot** — in Domain: Whiteboards, the message board comes before the parking lot in structure, template, and routine logic; every item is classified as a message or a parking-lot item and routed accordingly.
- **Parking-lot item semantics are preserved** — actionable items have an owner, no sender, and an async outcome, and are removed only when captured somewhere else AND the whiteboard is not pending on the outcome; pending items eventually have an owner and are tracked until they become actionable or are superseded; blockers eventually have an owner and identify what they impede.
- **Classify messages** — an item classified as a message carries `ASK`, `REQUEST`, `INFORM`, `ANSWER`, or `REPORT`, never lands in the parking lot, and is written to the message board following its rules (example: line length limit); related items are deduplicated and compressed.

## Work

### Next

Delegate the next `READY` instruction: `add-message-routines`, then the following `READY` iterations in order; the final review iteration is executed in-session by the stakeholder and the architect.

### Blockers

- None.

---

## Operating Instructions

### Setting Up

**Purpose:** Prepare the execution environment. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/setting-up/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
npm run ci # to verify build is green before starting
```

### Writing Commit Message

**Purpose:** Write standardized message according to context conventions. Operation of Workflow: Planning Work, defined in `$DOMAINS/work/workflows/planning-work/writing-commit-message/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

1. Read commit message conventions from `$WORKSPACE/knowledge/conventions/writing-commit-message.art`.
2. Write a message following: `{Type}({Scope}): {Description}.` max 120 chars, optionally followed by up 3 bullet points, max 100 chars each.

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm run ci # lint, build and test
```

---

## Items:

| Iteration / Instructions                            | Status  |
| --------------------------------------------------- | ------- |
| Iteration: Scaffold Messages Domain                 | `DONE`  |
| Iteration: Add Messaging Skill and Commands         | `DONE`  |
| Iteration: Add Message Routines                     | `READY` |
| Iteration: Add Message Templates and File           | `READY` |
| Iteration: Add Message Board Structure and Types    | `READY` |
| Iteration: Integrate Message Board into Whiteboards | `READY` |
| Iteration: Review Messages Domain Bottom-up         | `READY` |

### Iteration: Scaffold Messages Domain

**Id:** `scaffold-messages-domain`

**Status:** `DONE`

**Purpose:** Establish the domain's identity and boundaries so every later layer lands in a registered home.

**Description:** Add the Messages domain scaffold with its purpose, boundaries, and definitions, and register the domain in the domains listing.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/scaffold-messages-domain.md`

**Report:** `./instructions/scaffold-messages-domain__report.md`

**Changes:**

- Add `$DOMAINS/messages/domain.art` — purpose + boundaries: low-noise persisted agent-to-agent messaging; messages short-lived and discarded after processing; no plans or work-item assumptions.
- Add `$DOMAINS/messages/definitions/index.art` — message, message board, medium, and inbox definitions (from `./plan__messages-spec.md`, ## Definitions).
- Modify `$DOMAINS/index.md` — list `Domain: Messages` and its resources (`update-domains`).

**Dependencies:**

- None.

#### Commits:

| ID                               | Repository / Checkout / Branch        | Policy       | Hash      | Status      |
| -------------------------------- | ------------------------------------- | ------------ | --------- | ----------- |
| `build-messages-domain-scaffold` | Workspace / `$WORKSPACE` / `building` | `AUTONOMOUS` | `8b691bc` | `COMMITTED` |

##### Commit: build-messages-domain-scaffold

**Repository:** Workspace

**Message:**

```
build(domain-messages): Scaffold Domain: Messages.

- Add domain.art with purpose and boundaries, and the domain definitions.
- Register Domain: Messages in the domains listing.
```

### Iteration: Add Messaging Skill and Commands

**Id:** `add-messaging-skill-and-commands`

**Status:** `DONE`

**Purpose:** Give every agent one entry point to send and read messages, with commands owning every session-chat write and response.

**Description:** Add one `messaging` skill, allowed to all agent modes, whose commands declare their inputs, invoke the domain routines, capture their outputs, and perform all session-chat writes and responses. Register the skill everywhere agent skills are listed.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/add-messaging-skill-and-commands.md`

**Report:** `./instructions/add-messaging-skill-and-commands__report.md`

**Changes:**

- Add `$SKILLS/messaging/SKILL.md` — front-matter, definitions (message, message board, medium, inbox), `ALL` allowed agent modes, mandatory reading, and the commands below.
- Add command `write a message` — inputs `%message`, `%medium`, `%bypass-clean-check`, `%response-to` (optional); invokes Routine: Write Message capturing its outputs; the command composes the session-chat response.
- Add command `read incoming messages` — invokes Routine: Identify Inboxes, then Routine: Process Messages, then Routine: Read Message per incoming message; the command reports and responds in session chat.
- Modify `$SKILLS/index.md` — list `messaging` (`update-skills`).
- Modify the agent-modes index, the Codex agent files, and `$WORKSPACE/opencode.json` — allow `messaging` in all agent modes (`update-agents`).

**Dependencies:**

- Iteration `scaffold-messages-domain`.

#### Commits:

| ID                      | Repository / Checkout / Branch        | Policy       | Hash      | Status      |
| ----------------------- | ------------------------------------- | ------------ | --------- | ----------- |
| `build-messaging-skill` | Workspace / `$WORKSPACE` / `building` | `AUTONOMOUS` | `b12c0f7` | `COMMITTED` |

##### Commit: build-messaging-skill

**Repository:** Workspace

**Message:**

```
build(domain-messages): Add the messaging skill with commands.

- Expose write-message and read-messages commands for all agent modes.
- Commands own session-chat writes; routines only transform data.
```

### Iteration: Add Message Routines

**Id:** `add-message-routines`

**Status:** `READY`

**Purpose:** Define the messaging lifecycle so inboxes are found, messages processed and acted upon, and writes respect medium availability and response cleanup.

**Description:** Add the four routines that drive message flow; every routine takes data in and returns data out — session-chat writes and responses belong to the skill commands.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/add-message-routines.md`

**Changes:**

- Add `$DOMAINS/messages/routines/identify-inboxes.art` — scan the current context for artefacts carrying a message board; output the inboxes.
- Add `$DOMAINS/messages/routines/process-messages.art` — input the inboxes; extract and classify the incoming messages.
- Add `$DOMAINS/messages/routines/write-message.art` — input `%message`, `%bypass-clean-check`, `%response-to` (optional); resolve medium availability (board turn instructions, clean-check on the checkout and on the medium file, bypass flag); for long messages decide the path on the recipient's side from the current context, reading the recipient's relevant instructions when there is no obvious path (example: `_guide`); when available write and stage+commit per the medium's rules — if the write was impeded for some reason then the medium is unavailable; when unavailable park short messages at the top of the writer's own actionable parking-lot column; when responding, purge the incoming board message, and integrate, attach, or delete incoming file messages — integrating contents without citing the message as source.
- Add `$DOMAINS/messages/routines/read-message.art` — input `%message` and `%medium`; take action on the message (convert to an own parking-lot item, synchronously update resources, or purge); reply through Routine: Write Message with `%response-to`; response length rules — over 1000 characters goes to a file, under 200 characters to the incoming board (default), in between the writer decides, compressing or filing and adding detail when it helps the recipient.

**Dependencies:**

- Iteration `add-messaging-skill-and-commands`.

#### Commits:

| ID                       | Repository / Checkout / Branch        | Policy       | Hash    | Status     |
| ------------------------ | ------------------------------------- | ------------ | ------- | ---------- |
| `build-message-routines` | Workspace / `$WORKSPACE` / `building` | `AUTONOMOUS` | `(TBD)` | `AUTHORED` |

##### Commit: build-message-routines

**Repository:** Workspace

**Message:**

```
build(domain-messages): Add message routines.

- Add identify-inboxes, process-messages, read-message, write-message.
- Routines transform data only; commands own session-chat writes.
```

### Iteration: Add Message Templates and File

**Id:** `add-message-templates`

**Status:** `READY`

**Purpose:** Define how a message board and a long message are presented, and where long-message files live.

**Description:** Add the message board template, the long-message template, and the message file convention.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/add-message-templates.md`

**Changes:**

- Add `$DOMAINS/messages/templates/message-board.tart` — renders a message board: identity, messages, and the board's own instructions; a message-board section renders ahead of any parking-lot section when embedded in an artefact.
- Add `$DOMAINS/messages/templates/message.tart` — renders a long message written to a file.
- Add `$DOMAINS/messages/files/message.art` — naming pattern `message-{message.id}.md`, template reference, and medium-availability scoping (workspace-vs-`checkouts/*`).

**Dependencies:**

- Iteration `add-message-routines`.

#### Commits:

| ID                        | Repository / Checkout / Branch        | Policy       | Hash    | Status     |
| ------------------------- | ------------------------------------- | ------------ | ------- | ---------- |
| `build-message-templates` | Workspace / `$WORKSPACE` / `building` | `AUTONOMOUS` | `(TBD)` | `AUTHORED` |

##### Commit: build-message-templates

**Repository:** Workspace

**Message:**

```
build(domain-messages): Add message board and message templates.

- Add message-board.tart and message.tart.
- Add the message file convention for long messages.
```

### Iteration: Add Message Board Structure and Types

**Id:** `add-message-structures-and-types`

**Status:** `READY`

**Purpose:** Model the messaging data so boards can hold messages and every message can be typed by its response expectation.

**Description:** Add the Message Board structure and the Message and Message Type types, following the parking-lot spec captured in the source parking lot.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/add-message-structures-and-types.md`

**Changes:**

- Add `$DOMAINS/messages/types/message-type.art` — Primitive: OpenEnum — `ASK` (expects a response), `REQUEST` (may expect a response), `INFORM` (may expect an acknowledgement), `ANSWER` (alias of `INFORM` for responses to `ASK`), `REPORT` (alias of `INFORM` for responses to `REQUEST`).
- Add `$DOMAINS/messages/types/message.art` — from, to, type, timestamp, content, medium (path to message file, or artefact carrying a message board).
- Add `$DOMAINS/messages/structures/message-board.art` — name, purpose, description, messages (List of messages), instructions (custom instructions to observe when reading from or writing to the board); uses the Message and Message Type types.

**Dependencies:**

- Iteration `add-message-templates`.

#### Commits:

| ID                         | Repository / Checkout / Branch        | Policy       | Hash    | Status     |
| -------------------------- | ------------------------------------- | ------------ | ------- | ---------- |
| `build-message-structures` | Workspace / `$WORKSPACE` / `building` | `AUTONOMOUS` | `(TBD)` | `AUTHORED` |

##### Commit: build-message-structures

**Repository:** Workspace

**Message:**

```
build(domain-messages): Add Message Board structure and message types.

- Add Message Board with messages and board instructions.
- Add Message and Message Type (ASK, REQUEST, INFORM, ANSWER, REPORT).
```

### Iteration: Integrate Message Board into Whiteboards

**Id:** `integrate-message-board-into-whiteboards`

**Status:** `READY`

**Purpose:** Route Whiteboards inter-participant messaging through message boards and stop parking-lot items from carrying messages.

**Description:** Model the message board parallel to the parking lot in Domain: Whiteboards — ahead of it in structure, template, and routine logic — and classify every item as a message or a parking-lot item, routing each accordingly.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/integrate-message-board-into-whiteboards.md`

**Changes:**

- Modify `$DOMAINS/whiteboards/structures/whiteboard.art` — add `message-board` ahead of the parking-lot modelling in the whiteboard shape.
- Modify `$DOMAINS/whiteboards/templates/whiteboard.tart` — render `## Message board` before `## Parking lot` (and in the Whiteboard Structure outline); rewrite the Turn and Document Structure instructions to classify every item: a message has a sender and a receiver, is typed `ASK`/`INFORM`/`REQUEST`/`ANSWER`/`REPORT`, never lands in the parking lot, and is written to the message board following its rules (example: line length limit); a parking-lot item has an owner, no sender, and an async outcome — actionable items removed only when captured somewhere else AND the whiteboard is not pending on the outcome (examples: "`ART-JS` – Write plan instructions for participants to review" kept until plan is AUTHORED and shared with whiteboard; "`ART_MD` - Archive previous milestone to reduce noise" kept until milestone is archived), pending items tracked until they become actionable or are superseded, blockers identifying what they impede; deduplicate and compress other related items.
- Modify `$DOMAINS/whiteboards/routines/generate-whiteboard-updates.art` — classify each send/receive update as a message or a parking-lot item and route it; messages never enter `%whiteboard.parking-lot`.
- Modify `$DOMAINS/whiteboards/routines/validate-whiteboard.art` — detect messages sitting in the parking lot, and stale messages left on the board after being processed.
- Modify `$SKILLS/whiteboard/SKILL.md` — take-turn and related commands route send/receive through the `messaging` commands.
- Modify `$DOMAINS/whiteboards/index.md` — regenerate with `Routine: Build Domain Index`.

**Dependencies:**

- Iteration `add-message-structures-and-types`.

#### Commits:

| ID                                    | Repository / Checkout / Branch        | Policy       | Hash    | Status     |
| ------------------------------------- | ------------------------------------- | ------------ | ------- | ---------- |
| `integrate-message-board-whiteboards` | Workspace / `$WORKSPACE` / `building` | `AUTONOMOUS` | `(TBD)` | `AUTHORED` |

##### Commit: integrate-message-board-whiteboards

**Repository:** Workspace

**Message:**

```
build(domain-messages): Route Whiteboards messaging through message boards.

- Render the message board ahead of the parking lot; classify every item.
- Messages carry sender/receiver and are discarded after processing.
```

### Iteration: Review Messages Domain Bottom-up

**Id:** `review-messages-domain-bottom-up`

**Status:** `PLANNING`

**Purpose:** Consolidate the domain after the first top-down pass so every layer agrees bottom-up.

**Description:** Walk the resources bottom-up — refine types, structures, templates and files, routines, then the skill commands and the domain artefacts — applying the review conventions in `./plan__messages-spec.md` (`## Conventions`) to every layer, and trickle all changes up to the routine-invocation format in the skill commands and finally to `domain.art` and the domain index. Executed by the stakeholder and the architect in session, not delegated — hence no instructions file and no report.

**Instructions Mode:** `INSTRUCTIONS_INLINED_IN_ITERATION`

**Changes:**

- Apply the review conventions — `./plan__messages-spec.md`, `## Conventions` — to every resource: `::READ` directives reference all resources used in file; routine format with clear Inputs and Outputs; no routine writes to files directly; every routine always returns something; examples carry no assumption that messages are about plans — plans may only appear as an example.
- Refine `$DOMAINS/messages/types/` — `message-type.art` and `message.art`; then `$DOMAINS/messages/structures/` — `message-board.art`; then `$DOMAINS/messages/templates/` — `message-board.tart` and `message.tart` — and `$DOMAINS/messages/files/message.art`; then `$DOMAINS/messages/routines/` — `identify-inboxes.art`, `process-messages.art`, `write-message.art`, `read-message.art`.
- Trickle all changes up to the routine-invocation format in skill commands — each routine call preceded by its `::READ` directive — in `$SKILLS/messaging/SKILL.md` and `$SKILLS/whiteboard/SKILL.md`.
- Update `$DOMAINS/messages/domain.art` — final purpose, boundaries, and summary; regenerate `$DOMAINS/messages/index.md` with `Routine: Build Domain Index`; top up `$DOMAINS/index.md` with the finished resource list.
- Repair references broken by the review; run `npm run ci`.

**Instructions:**

- Execute all the changes listed above.
- Present for user review.

**Dependencies:**

- Iteration `integrate-message-board-into-whiteboards`.

#### Commits:

| ID                       | Repository / Checkout / Branch        | Policy     | Hash    | Status     |
| ------------------------ | ------------------------------------- | ---------- | ------- | ---------- |
| `review-messages-domain` | Workspace / `$WORKSPACE` / `building` | `NOCOMMIT` | `(TBD)` | `AUTHORED` |

##### Commit: review-messages-domain

**Repository:** Workspace

**Message:**

```
refactor(domain-messages): Review messages domain bottom-up.

- Refine templates, types, structures, routines, and the messaging skill.
- Update domain.art and regenerate the domain index.
```

---

## Coordination

### Not In Scope

- **Plans and work items** — messages, boards, and routines must not assume their shape.
- **Delivery and read receipts** — messages are discarded after processing; there is no delivery tracking.
- **Migrating existing whiteboard parking lots** — live boards keep their current items; the classification rules apply from the integration onward.

### Evidence

- Domain: Whiteboards — `$DOMAINS/whiteboards/templates/whiteboard.tart` renders actionable parking-lot items whose grammar is already message-shaped ("Decision + message from ART_JS to ART_MD — your question is answered … DELETE THIS ITEM WHEN READ"), evidence that messages are being misfiled in parking lots.

### Findings

- Parking-lot-based messaging in Domain: Whiteboards proved inefficient and noisy for passing messages — the parking lot tracks actionables, not correspondence.
- Message flow needs two media: boards for short, discarded-after-processing messages; files for long messages that need persistence until processed.
- Medium availability cannot be assumed: turn-gated boards, dirty checkouts, and modified medium files all block writes and need a documented fallback — the writer's own parking lot.

### Decisions

- One `messaging` skill, allowed to ALL agent modes; commands own all session-chat writes and responses; routines only transform data.
- Length thresholds: under 200 characters short (board), over 1000 characters long (file), in between the writer decides, favouring detail when it helps the recipient.
- Messages are discarded after being processed; integrated content never cites the message as its source.
- Response types reuse the `INFORM` alias pattern: `ANSWER` for `ASK`, `REPORT` for `REQUEST`.
- Domain: Whiteboards models the message board parallel to the parking lot, ahead of it in structure, template, and routine logic, with item classification at every send/receive point.
- Built top-down (index and definitions, skill, commands, routines, templates and files, structures, types) and consolidated bottom-up in a final review pass applying the conventions in `./plan__messages-spec.md`.

### Knowledge to Update

- `$DOMAINS/index.md` — add `Domain: Messages`.
- `$SKILLS/index.md` — add the `messaging` skill.
- Agent-modes index, Codex agent files, `opencode.json` — allow `messaging` in all agent modes.

### Follow Ups

- The source parking-lot item "Create Plan: Add Messages Domain" was removed from `$PROJECT/_backlog/_parking-lot.md` once this plan was created; its verbatim spec — plus the structured per-kind spec and the review conventions — is preserved in `./plan__messages-spec.md`.
- The parking lot references evidence `_backlog/whiteboard-art-records/whiteboard__feedback-1.md`, which does not resolve in the checkout — confirm with the owner whether it moved or was deleted.
- Milestone `domains-one` items table and `Next` were updated when this plan was created; reflect the plan upstream again when it starts executing.

### Feedback

- [x] Iteration `scaffold-messages-domain` — DONE, commit `8b691bc` pushed to `origin/main`; report at `./instructions/scaffold-messages-domain__report.md`. Created `domain.art`, `definitions/index.art`, registered `Domain: Messages` in `.agents/domains/index.md`. `npm run ci` green.
- [x] Iteration `add-messaging-skill-and-commands` — DONE, commit `b12c0f7` pushed to `origin/main`; report at `./instructions/add-messaging-skill-and-commands__report.md`. Created `$SKILLS/messaging/SKILL.md`, listed `messaging` in `$SKILLS/index.md`, allowed in all 12 agent modes. `npm run ci` green.
- [ ] Plan section order vs template — `Items:` should appear before `Work` (currently after `Operating Instructions`); template order is `Items:` → `Work` → `Operating Instructions` → `Coordination`. Also missing `Execution Context` after `Scope`.
- [ ] Missing context subsections required by `work-item-context.tart` — `Resource Kinds in Scope`, `Workflows`, `Workflow Operations`, and `Execution Context` are absent.
- [ ] `## Scope` is a descriptive paragraph; template expects structured `(Scope) {resource}` entries with Record, Role, Partial, Changes, Operations, Dependencies. May be intentional for a domain-level plan.
- [ ] Follow-up unresolved path `_backlog/whiteboard-art-records/whiteboard__feedback-1.md` — does not resolve in the checkout; confirm with owner whether it moved or was deleted.
