# Plan: Add Domain Whiteboards

**ID:** `add-domain-whiteboards`

**Status:** `PLANNING`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Add a Whiteboards domain for multi-session collaboration, where participants introduce themselves, agree working agreements, converge on shared vocabulary, and take turns updating a shared whiteboard.

**Description:** Model whiteboards as a standalone domain inspired by Domain: Plans. Add structures and types (Whiteboard, Facilitation, Participant, Short Task, Change Entry), a template and a file convention rendering the three-part Instructions constitution (Turn, Document Structure, Goals), routines (read before turn, validate, prepare update, prepare response, update sentiment, report to user, join, set new goal), and one `whiteboard` skill exposing every use-case routine as a command. Register the domain and the skill with the existing update skills. Whiteboards depends on the `parking-lot` skill and does not assume plans or work items.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable      | Resolved Path                       | Purpose                                                                  |
| ------------- | ----------------------------------- | ------------------------------------------------------------------------ |
| `$WORKSPACE`  | Current working directory           | Workspace root directory; hosts the domain and skill source.             |
| `$PROJECT`    | Provided with prompt                | Where this plan and its backlogs live.                                   |
| `$DOMAINS`    | `$WORKSPACE/.agents/domains`        | Domain resources under change.                                           |
| `$SKILLS`     | `$WORKSPACE/.agents/skills`         | Agent modes and skills directory.                                        |
| `$WHITEBOARD` | `$WORKSPACE/whiteboard-art-records` | Reference whiteboard and its introduction attachments (source material). |

## Summary

Add a Whiteboards domain so that multiple participants can collaborate across sessions through a shared whiteboard: introduce themselves, agree working agreements, converge on shared vocabulary, and take turns updating the board.

## Attachments

- `./plan__report-examples.md` (Reference) — Report and sentiment examples for the whiteboard reporting and update routines.
- `./plan__whiteboard-snapshot.md` (Reference) — Snapshot of the `Art Records` whiteboard, used as source material for structures, templates, types, routines, skills, and commands.

## Context

### Upstream Work

| Kind        | Path                                                          | Role                                                            |
| ----------- | ------------------------------------------------------------- | --------------------------------------------------------------- |
| Parking Lot | `$PROJECT/_backlog/_parking-lot.md`                           | Tracks short-term actionables, pending questions, and blockers. |
| Milestone   | `$PROJECT/_roadmap/4-next/milestone-domains-one/milestone.md` | Coordinates this plan within the Art Domains roadmap.           |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Refining.

### Domains

| Domain / Path                           | Description                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------------------ |
| Domain: Plans `$DOMAINS/plans/index.md` | Inspiration for a new domain: structures, types, templates, files, routines, skills. |
| Domain: Work `$DOMAINS/work/index.md`   | Shared work-item model and file and template conventions.                            |

### Knowledge

::READ `$DOMAINS/plans/index.md` (Domain) — Inspiration for a new domain: structures, types, templates, files, routines, skills. Relevant for Planning Work Item.
::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Structure and field patterns to mirror for Whiteboard and its nested types. Relevant for Planning Work Item.
::READ `$DOMAINS/plans/templates/plan.tart` (Template) — Document layout patterns to mirror for the whiteboard template. Relevant for Planning Work Item.
::READ `./plan__whiteboard-snapshot.md` (Reference) — Worked example of the whiteboard being modelled, including its goal canon and participant introductions. Relevant for Planning Work Item.

## Scope

Add a new `$DOMAINS/whiteboards/` domain with structures, types, a template, a file convention, and routines, and expose every use-case routine as a command in a single `whiteboard` skill registered in the relevant agents.

### Constraints

- **Depends on `parking-lot`** — the board's `Parking lot` section is initialised with the canon whiteboard sections (actionable items, pending questions, blockers). The `parking-lot` skill itself is unaware of whiteboards: no profile, no delegation change — agents are free to deviate and adapt the section to their needs.
- **No plans or work items** — structures, templates, and routines must not assume `Structure: Plan` or the work-item model.
- **Turn-based writes** — only the participant named in `facilitation.turn` writes to the whiteboard. Turns advance by user nudge or by an external process; there is no escalation path for an unclaimed turn.
- **Joining is gated** — an agent joining an existing whiteboard whose participants do not expect them writes its introduction as an attachment following the existing canon, and on the whiteboard file itself may only add a parking-lot entry requesting approval and a `changes` entry.
- **Goals follow the canon** — a new goal is proposed as checkbox steps aligned with the whiteboard purpose and within its description, and is only proposed once the finished goal's `Actionable` parking lot is cleaned.
- **Base components only** — model only what closes the base loop: outline, goals, turn-taking, participants. No domain-specific sections or types (a whiteboard may decide dinner, not design APIs); extra agreements arrive later as optional sections.
- **Append-only across participants** — never edit or remove another participant's bullet or item; annotate your objection as a new item, and mark resolutions on the item you raised.
- **Bound item size** — 120 characters per `changes` bullet and per parking-lot item. Bound size per item, never line count per section.
- **Model the snapshot** — `$WORKSPACE/whiteboard-art-records/whiteboard.md` and its introduction attachments are the worked example for sections, fields, and vocabulary; it is one frame of a living document, so late-emerging elements (sentiment, `Done:`, `Expected final outline`) stay optional.

## Work

### Next

Write the instructions for iteration `add-whiteboard-structures`.

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

| Iteration / Instructions                          | Status     |
| ------------------------------------------------- | ---------- |
| Iteration: Add Whiteboard Structures              | `PLANNING` |
| Iteration: Add Whiteboard Template and File       | `PLANNING` |
| Iteration: Add Whiteboard Routines                | `PLANNING` |
| Iteration: Add Whiteboard Skill and Commands      | `PLANNING` |
| Iteration: Register Whiteboards Domain and Skills | `PLANNING` |

### Iteration: Add Whiteboard Structures

**Id:** `add-whiteboard-structures`

**Status:** `PLANNING`

**Purpose:** Model the whiteboard data so that facilitation state and participant introductions can be recorded and rendered.

**Description:** Add the Whiteboard structure and its nested types, inspired by the Plans structures.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Add `$DOMAINS/whiteboards/structures/whiteboard.art` with fields `id`, `purpose`, `description`, `facilitation`, `participants`, `attachments`, `changes`, and `follow-ups`.
- Add `$DOMAINS/whiteboards/structures/facilitation.art` with `turn` (Identifier of the participant expected to update next, or the special value `FACILITATOR`), `goal` (NaturalExpression), `tasks` (List(Type: Short Task)), `done` (List(Type: Short Task), one entry per finished goal: goal name plus its last step), `expected-final-outline` (NaturalExpression — the board's own structural contract among participants), `participant-statuses` (List(EnumValue), e.g. `INTRODUCING`), `working-agreements` (List(NaturalExpression)), and `sentiment` (List(NaturalExpression), one line per participant, self-authored and holding current state only).
- Add `$DOMAINS/whiteboards/structures/participant.art` with `planning` (Path), `goals`, `deliverables`, `expectations` (optional NaturalExpression), `status` (one of `%whiteboard.facilitation.participant-status`), and `attachment` (Path).
- Add `$DOMAINS/whiteboards/structures/attachment.art` with `path` (Path) and `purpose` (NaturalExpression), covering both participant introductions and the resolved parking-lot archive.
- Add `$DOMAINS/whiteboards/types/short-task.art` with `done` (Boolean) and `description` (NaturalExpression).
- Add `$DOMAINS/whiteboards/types/change-entry.art` with `participant` (Identifier), `date` (Date), and `description` (NaturalExpression) — the unit behind the one-bullet-per-turn rule.
- Add `$DOMAINS/whiteboards/types/participant-status.art` as a controlled list, e.g. `INTRODUCING` — The participant is still curating their record and attachment and is not fully engaged in the discussion; `READY` — The participant is participating in the discussion; `LEFT` — The participant has left the whiteboarding session and is no longer eligible to take turns.
- Add the full domain scaffold: `$DOMAINS/whiteboards/domain.art` following `Structure: Domain` — purpose plus `boundaries` ordered relationships (owns `whiteboards`; depends on `parking-lot`; excludes `Structure: Plan` and the work-item model), in the format of `$DOMAINS/plans/domain.art` — and `$DOMAINS/whiteboards/index.md` rendered with `Routine: Build Domain Index` and `templates/domain-index-file.tart`.

**Dependencies:**

- None.

#### Commits:

| ID                            | Repository / Checkout / Branch    | Policy       | Hash  | Status     |
| ----------------------------- | --------------------------------- | ------------ | ----- | ---------- |
| `build-whiteboard-structures` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | (TBD) | `AUTHORED` |

##### Commit: build-whiteboard-structures

**Repository:** Workspace

**Message:**

```
build(domain-whiteboards): Add Whiteboard structures and types.

- Add Whiteboard, Facilitation, Participant, and Attachment structures.
- Add Short Task, Change Entry, and Participant Status types.
- Add the domain scaffold: domain.art and index.md.
```

### Iteration: Add Whiteboard Template and File

**Id:** `add-whiteboard-template-and-file`

**Status:** `PLANNING`

**Purpose:** Define how a whiteboard is presented and where the whiteboard file lives.

**Description:** Add the whiteboard template and the whiteboard file convention.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Add `$DOMAINS/whiteboards/templates/whiteboard.tart` rendering `Facilitation` (with `Done:` and `Expected final outline`), `Participants`, `Attachments`, `Parking lot`, `Changes`, `Follow-ups`, and `Instructions`. Sections outside the base set are late-emerging and optional; no contract or domain-specific section is rendered.
- Add `$DOMAINS/whiteboards/files/whiteboard.art` defining the naming pattern and the template, and stating that the board lives in the workspace repository while participants' planning artefacts live in their own `checkouts/*` repositories and follow their own conventions.
- Render `## Instructions` as the full three-part constitution, not the Turn rules alone:
  - `### Turn` — run `Routine: Validate Whiteboard` before any write; only the participant named in `turn` writes; stage workspace files only (board and attachments), leave your own turn unstaged for the next participant, or let the facilitator commit; update your own `sentiment` line only; append rather than rewrite; add exactly one succinct `changes` bullet (≤120 chars); keep a rolling `changes` window retaining at least one entry per active participant; update `turn` preserving fair turn-taking; and carry the standing instruction: _apply all updates to your content in order to maintain the whiteboard validated, and free of redundancies, duplications and obsolete historical facts — and provide feedback to other architects so that they update their content as well on their next turn_.
  - `### Document Structure` — no section added or removed without approval; >100-line section → propose a move to an attachment; out-of-scope → `Follow-ups`; every `changes` bullet and parking-lot item ≤120 chars; never fix a settled statement by appending an italic note — rewrite the headline; resolved parking-lot items are annotated in place and archived at goal close; item grammar includes `Review request {from} – plan file: …` and `**One question most worth challenging:** …`.
  - `### Goals` — goal shape (approval step first, end state last); all-participant approval; clean the `Actionable` parking lot before archiving the goal under `Done:`; out-of-scope → `Blocker` and `turn: FACILITATOR`.

**Dependencies:**

- Iteration `add-whiteboard-structures`.

#### Commits:

| ID                          | Repository / Checkout / Branch    | Policy       | Hash  | Status     |
| --------------------------- | --------------------------------- | ------------ | ----- | ---------- |
| `build-whiteboard-template` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | (TBD) | `AUTHORED` |

##### Commit: build-whiteboard-template

**Repository:** Workspace

**Message:**

```
build(domain-whiteboards): Add Whiteboard template and file convention.

- Add .agents/domains/whiteboards/templates/whiteboard.tart
- Add .agents/domains/whiteboards/files/whiteboard.art
```

### Iteration: Add Whiteboard Routines

**Id:** `add-whiteboard-routines`

**Status:** `PLANNING`

**Purpose:** Define the participant lifecycle routines so that turns are validated, read, prepared, and answered consistently, and so that new participants and new goals follow the canon.

**Description:** Add the routines that drive a participant turn, a join, and a goal change, including validation, reporting, and sentiment.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Add `$DOMAINS/whiteboards/routines/read-whiteboard-before-turn.art` — read `git diff` **and** `git diff --cached` (a staged turn hides itself), re-read immediately before writing because attachments change mid-turn, and stage only the board and its attachments in the workspace repository.
- Add `$DOMAINS/whiteboards/routines/validate-whiteboard.art` — executed at the start of every turn, before any write. Checks: the goal is aligned with the whiteboard purpose and within its description; sections follow `Expected final outline` and that outline preserves the whiteboard base rules; every `changes` bullet and parking-lot item is ≤120 chars; the fair-turn rule is computable from the retained `changes` window; content is free of redundancies, duplications, and obsolete historical facts; every participant block is consistent with what its owner's turns have since falsified. Report violations to the turn holder and to the affected participants so they correct their content on their next turn.
- Add `$DOMAINS/whiteboards/routines/prepare-whiteboard-update.art` — decide what to update and what to annotate as resolved in the parking lot; re-read your own participant block and correct anything your turn falsified; sync your own plan or milestone with the agreements you accepted; update status and your own sentiment.
- Add `$DOMAINS/whiteboards/routines/prepare-response.art` — compose the session-chat response.
- Add `$DOMAINS/whiteboards/routines/update-participant-sentiment.art` — self-authored only: each participant writes their own line, overwritten every turn as current state, never another seat's.
- Add `$DOMAINS/whiteboards/routines/report-to-user.art` — scaled report formats for `DIVERGENCE`, `LAZY`, `SLOPPY`, `UNCOOPERATIVE`, `QUESTIONABLE`, `CONFUSING`, `GOOD`, `SOLID`, and `BEAUTIFUL` outcomes, using the examples in `./plan__report-examples.md`, naming what was corrected and what was synced.
- Add `$DOMAINS/whiteboards/routines/join-whiteboard.art` — for an agent joining a whiteboard whose participants do not expect them: create the introduction attachment in the whiteboard's attachments directory following the existing canon (`## Architect: {Name} ({Role})` with identity, role, scope, use cases, planning, and scope boundaries — not a prose message), and on the whiteboard file itself only add a parking-lot request asking all participants to approve the join plus a `changes` entry; approvals accumulate as italic annotations on your own request item; once complete, the pen-holder moves you into `Participants`, sets `READY`, hands you the first turn, and records in `changes` who your arrival displaced.
- Add `$DOMAINS/whiteboards/routines/set-new-goal.art` — propose a new goal as checkbox steps aligned with the whiteboard purpose and within its description: first step is approval by all active participants, middle steps are the concrete work, last step is the end state; only proposed once the finished goal's `Actionable` parking lot is cleaned, and the previous goal is archived under `Done:`.

**Dependencies:**

- Iteration `add-whiteboard-template-and-file`.

#### Commits:

| ID                          | Repository / Checkout / Branch    | Policy       | Hash  | Status     |
| --------------------------- | --------------------------------- | ------------ | ----- | ---------- |
| `build-whiteboard-routines` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | (TBD) | `AUTHORED` |

##### Commit: build-whiteboard-routines

**Repository:** Workspace

**Message:**

```
build(domain-whiteboards): Add Whiteboard routines.

- Add the turn lifecycle: read, validate, update, respond, report.
- Add Join Whiteboard and Set New Goal routines.
```

### Iteration: Add Whiteboard Skill and Commands

**Id:** `add-whiteboard-commands-and-skills`

**Status:** `PLANNING`

**Purpose:** Expose whiteboard entry points as a single skill so participants can be onboarded and take turns without imitation.

**Description:** Add one `whiteboard` skill whose commands expose every use-case routine, each re-reading the entire whiteboard on entry and focusing on the changes and the parking lot.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Add `$SKILLS/whiteboard/SKILL.md` — the one whiteboard skill; every use-case routine is exposed as a command inside it, with triggers phrased as "when the user says …" and, where the routine should run unaided, as an automatic trigger (example: the current goal is `DONE` → `set-new-goal`).
- Add the command `init-whiteboard` — create a whiteboard at a path.
- Add the command `invite-participant` — prompt a participant with the skill context needed to create their attachment and join.
- Add the command `join-whiteboard` — register a participant and their attachment, following `Routine: Join Whiteboard` when the participants do not expect them.
- Add the command `take-turn` — read before turn, validate, prepare the update, and prepare the response.
- Add the command `validate-whiteboard` — run `Routine: Validate Whiteboard`; automatic trigger at the start of every turn, plus a user-said trigger.
- Add the command `set-new-goal` — run `Routine: Set New Goal`.

**Dependencies:**

- Iteration `add-whiteboard-routines`.

#### Commits:

| ID                       | Repository / Checkout / Branch    | Policy       | Hash  | Status     |
| ------------------------ | --------------------------------- | ------------ | ----- | ---------- |
| `build-whiteboard-skill` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | (TBD) | `AUTHORED` |

##### Commit: build-whiteboard-skill

**Repository:** Workspace

**Message:**

```
build(domain-whiteboards): Add the whiteboard skill with commands.

- Expose init, invite, join, take-turn, validate, set-new-goal commands.
- Declare user-said and automatic command triggers.
```

### Iteration: Register Whiteboards Domain and Skills

**Id:** `register-whiteboards-domain-and-skills`

**Status:** `PLANNING`

**Purpose:** Make the new domain and skills discoverable to agents.

**Description:** Register the domain and the new skills, and list the required skills in the relevant agent modes.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Generate `$DOMAINS/whiteboards/index.md` with `Routine: Build Domain Index` and `templates/domain-index-file.tart`; do not write it by hand.
- List the new domain and its resources in the domains listing through `generate-domain-listing`, via skill `update-domains`.
- Register the `whiteboard` skill in the skills listing, via skill `update-skills`.
- Add the `whiteboard` skill to the **allowed** skills of **all** agent modes — agent-modes index, Codex agent files, and `$WORKSPACE/opencode.json` — via skill `update-agents`.

**Dependencies:**

- Iteration `add-whiteboard-commands-and-skills`.

#### Commits:

| ID                            | Repository / Checkout / Branch    | Policy       | Hash  | Status     |
| ----------------------------- | --------------------------------- | ------------ | ----- | ---------- |
| `register-domain-whiteboards` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | (TBD) | `AUTHORED` |

##### Commit: register-domain-whiteboards

**Repository:** Workspace

**Message:**

```
build(domain-whiteboards): Register Whiteboards domain and skills.

- Generate .agents/domains/whiteboards/index.md with Routine: Build Domain Index
- Register domains, skills, and agent modes with update-domains, update-skills, update-agents
```

---

## Coordination

### Not In Scope

- **Plans and work items** — whiteboards do not assume their shape.

### Evidence

- None.

### Findings

- The worked example in `$WORKSPACE/whiteboard-art-records/whiteboard.md` fixes the vocabulary and canon: `Facilitation`, `Working Agreements`, `Participants`, `Attachments`, `Parking lot`, `Contracts`, `Changes`, `Follow-ups`, and `Instructions`.
- Joining an in-flight whiteboard is a first-class scenario: the `Art Records` whiteboard's own `Parking lot` currently carries a review request from `ART_JS` to a third party, showing joins happen against an active goal.
- Goals have a canon of their own: checkbox steps, all-participant approval, end-state last step, archived under `Done:`, and the `Actionable` parking lot must be cleaned before a new goal is proposed.

### Decisions

- Whiteboards are modelled as a standalone domain inspired by Domain: Plans, depending only on the `parking-lot` skill.
- A joining agent writes its introduction as an attachment following the existing canon, and on the whiteboard file itself touches only the parking lot and `changes`.
- Base components only: outline, goals, turn-taking, participants. No contract or domain-specific modelling; the reference board's `Contracts` section is treated as late-emerging and optional.
- One `whiteboard` skill: every use-case routine is exposed as a command inside it, with user-said and automatic triggers.
- The `parking-lot` skill stays unaware of whiteboards; the board's section is initialised canonically and agents may deviate from it.
- `changes` keeps a rolling window retaining at least one entry per active participant, so fair turn-taking stays computable while resolved items archive out.
- No unclaimed-turn escalation: turns advance by user nudge or by an external process.
- `validate-whiteboard` runs at the start of every turn and is also a `whiteboard` skill command.

### Knowledge to Update

- `$DOMAINS/index.md` — add `Domain: Whiteboards`.
- `$SKILLS/index.md` — add the whiteboard skills.

### Follow Ups

- None. All stakeholder answers applied.

### Feedback

- None.
