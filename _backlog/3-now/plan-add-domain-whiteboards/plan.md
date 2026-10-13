# Plan: Add Domain Whiteboards

**ID:** `add-domain-whiteboards`

**Status:** `PLANNING`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Add a Whiteboards domain for multi-session collaboration, where participants introduce themselves, agree working agreements, converge on vocabulary and contracts, and take turns updating a shared whiteboard.

**Description:** Model whiteboards as a standalone domain inspired by Domain: Plans. Add structures and types (Whiteboard, Facilitation, Participant, Short Task), a template and a file convention, routines (read before turn, prepare update, prepare response, update sentiment, report to user, join, set new goal), commands exposed as skills (Init Whiteboard, Invite Participant, Join Whiteboard, Take Turn), and register the domain and skills in the relevant agents. Whiteboards depends on the `parking-lot` skill and does not assume plans or work items.

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

Add a Whiteboards domain so that multiple participants can collaborate across sessions through a shared whiteboard: introduce themselves, agree working agreements, converge on vocabulary and contracts, and take turns updating the board.

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

Add a new `$DOMAINS/whiteboards/` domain with structures, types, a template, a file convention, and routines, and expose participant commands as skills registered in the relevant agents.

### Constraints

- **Depends on `parking-lot`** — whiteboards reuse the parking-lot sections for actionable items, pending questions, and blockers.
- **No plans or work items** — structures, templates, and routines must not assume `Structure: Plan` or the work-item model.
- **Turn-based writes** — only the participant named in `facilitation.turn` writes to the whiteboard.
- **Joining is gated** — an agent joining an existing whiteboard whose participants do not expect them writes its introduction as an attachment following the existing canon, and on the whiteboard file itself may only add a parking-lot entry requesting approval and a `changes` entry.
- **Goals follow the canon** — a new goal is proposed as checkbox steps aligned with the whiteboard purpose and within its description, and is only proposed once the finished goal's `Actionable` parking lot is cleaned.
- **Model the snapshot** — `$WORKSPACE/whiteboard-art-records/whiteboard.md` and its introduction attachments are the worked example for sections, fields, and vocabulary.

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
| Iteration: Add Whiteboard Commands and Skills     | `PLANNING` |
| Iteration: Register Whiteboards Domain and Skills | `PLANNING` |

### Iteration: Add Whiteboard Structures

**Id:** `add-whiteboard-structures`

**Status:** `PLANNING`

**Purpose:** Model the whiteboard data so that facilitation state and participant introductions can be recorded and rendered.

**Description:** Add the Whiteboard structure and its nested types, inspired by the Plans structures.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Add `$DOMAINS/whiteboards/structures/whiteboard.art` with fields `id`, `purpose`, `description`, `facilitation`, and `participants`.
- Add `$DOMAINS/whiteboards/structures/facilitation.art` with `turn` (Identifier of the participant expected to update the whiteboard next), `goal` (NaturalExpression), `tasks` (List(Type: Short Task)), `participant-statuses` (List(EnumValue), e.g. `INTRODUCING`), `working-agreements` (List(NaturalExpression)), and `sentiment` (List(NaturalExpression), one per participant, with emojis).
- Add `$DOMAINS/whiteboards/structures/participant.art` with `planning` (Path), `goals`, `deliverables`, `expectations` (NaturalExpression), `status` (one of `%whiteboard.facilitation.participant-status`), and `attachment` (Path).
- Add `$DOMAINS/whiteboards/types/short-task.art` with `done` (Boolean) and `description` (NaturalExpression).
- Add `$DOMAINS/whiteboards/types/participant-status.art` as a controlled list, e.g. `INTRODUCING` — The participant is still curating their record and attachment and is not fully engaged in the discussion; `READY` — The participant is participating in the discussion.
- Add `$DOMAINS/whiteboards/index.md` and `$DOMAINS/whiteboards/domain.art` following Domain: Plans.

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

- Add .agents/domains/whiteboards/structures/whiteboard.art
- Add .agents/domains/whiteboards/structures/facilitation.art
- Add .agents/domains/whiteboards/structures/participant.art
- Add .agents/domains/whiteboards/types/short-task.art
- Add .agents/domains/whiteboards/types/participant-status.art
```

### Iteration: Add Whiteboard Template and File

**Id:** `add-whiteboard-template-and-file`

**Status:** `PLANNING`

**Purpose:** Define how a whiteboard is presented and where the whiteboard file lives.

**Description:** Add the whiteboard template and the whiteboard file convention.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Add `$DOMAINS/whiteboards/templates/whiteboard.tart` rendering `Facilitation`, `Participants`, `Attachments`, `Parking lot`, `Contracts`, `Changes`, `Follow-ups`, and `Instructions`.
- Add `$DOMAINS/whiteboards/files/whiteboard.art` defining the naming pattern and the template.
- Keep `## Instructions` in the rendered output: only the participant in `turn` writes; each turn stages all files, updates sentiment, trims done parking-lot items, adds exactly one succinct `changes` bullet, and updates `turn` preserving fair turn-taking.

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

**Purpose:** Define the participant lifecycle routines so that turns are read, prepared, and answered consistently, and so that new participants and new goals follow the canon.

**Description:** Add the routines that drive a participant turn, a join, and a goal change, including reporting and sentiment.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Add `$DOMAINS/whiteboards/routines/read-whiteboard-before-turn.art` — inspect the git diff to pick up every change, and stage all whiteboard files before proceeding.
- Add `$DOMAINS/whiteboards/routines/prepare-whiteboard-update.art` — decide what to update and what to delete from the parking lot, and update status and sentiment.
- Add `$DOMAINS/whiteboards/routines/prepare-response.art` — compose the session-chat response.
- Add `$DOMAINS/whiteboards/routines/update-participant-sentiment.art` — one sentiment per participant.
- Add `$DOMAINS/whiteboards/routines/report-to-user.art` — scaled report formats for `DIVERGENCE`, `LAZY`, `SLOPPY`, `UNCOOPERATIVE`, `QUESTIONABLE`, `CONFUSING`, `GOOD`, `SOLID`, and `BEAUTIFUL` outcomes, using the examples in `./plan__report-examples.md`.
- Add `$DOMAINS/whiteboards/routines/join-whiteboard.art` — for an agent joining a whiteboard whose participants do not expect them: create the introduction attachment in the whiteboard's attachments directory following the existing canon (`## Architect: {Name} ({Role})` with identity, role, scope, use cases, planning, and scope boundaries — not a prose message), and on the whiteboard file itself only add a parking-lot entry asking all participants to approve the join, and a `changes` entry recording that the introduction attachment was added.
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

- Add Routine: Read Whiteboard Before Turn
- Add Routine: Prepare Whiteboard Update
- Add Routine: Prepare Response
- Add Routine: Update Participant Sentiment
- Add Routine: Report To User
- Add Routine: Join Whiteboard
- Add Routine: Set New Goal
```

### Iteration: Add Whiteboard Commands and Skills

**Id:** `add-whiteboard-commands-and-skills`

**Status:** `PLANNING`

**Purpose:** Expose whiteboard entry points as skills so participants can be onboarded and take turns.

**Description:** Add the participant-facing commands as skills, each re-reading the entire whiteboard on entry and focusing on the changes and the parking lot.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Add `$SKILLS/init-whiteboard/` — create a whiteboard at a path.
- Add `$SKILLS/invite-participant/` — prompt a participant with the skill context needed to create their attachment and join.
- Add `$SKILLS/join-whiteboard/` — register a participant and their attachment, following `Routine: Join Whiteboard` when the participants do not expect them.
- Add `$SKILLS/take-turn/` — read before turn, prepare the update, and prepare the response.

**Dependencies:**

- Iteration `add-whiteboard-routines`.

#### Commits:

| ID                        | Repository / Checkout / Branch    | Policy       | Hash  | Status     |
| ------------------------- | --------------------------------- | ------------ | ----- | ---------- |
| `build-whiteboard-skills` | Workspace / `$WORKSPACE` / `main` | `AUTONOMOUS` | (TBD) | `AUTHORED` |

##### Commit: build-whiteboard-skills

**Repository:** Workspace

**Message:**

```
build(domain-whiteboards): Add Whiteboard skills and commands.

- Add skill init-whiteboard
- Add skill invite-participant
- Add skill join-whiteboard
- Add skill take-turn
```

### Iteration: Register Whiteboards Domain and Skills

**Id:** `register-whiteboards-domain-and-skills`

**Status:** `PLANNING`

**Purpose:** Make the new domain and skills discoverable to agents.

**Description:** Register the domain and the new skills, and list the required skills in the relevant agent modes.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Changes:**

- Register `Domain: Whiteboards` in `$DOMAINS/index.md`.
- Register the new skills in `$SKILLS/index.md`.
- Add the whiteboard commands to the required or allowed skills of the participant agent modes, and to `$WORKSPACE/opencode.json` where the agent modes are declared.

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

- Register Domain: Whiteboards in .agents/domains/index.md
- Register whiteboard skills in .agents/skills/index.md
- Add whiteboard skills to participant agent modes and opencode.json
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

### Knowledge to Update

- `$DOMAINS/index.md` — add `Domain: Whiteboards`.
- `$SKILLS/index.md` — add the whiteboard skills.

### Follow Ups

- None.

### Feedback

- None.
