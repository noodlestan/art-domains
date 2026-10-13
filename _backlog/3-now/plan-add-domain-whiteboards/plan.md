# Plan: Add Domain Whiteboards

**ID:** `add-domain-whiteboards`

**Status:** `DRAFT`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Add a Whiteboards domain for multi-session collaboration, where participants introduce themselves, agree working agreements, converge on vocabulary and contracts, and take turns updating a shared whiteboard.

**Description:** Model whiteboards as a standalone domain inspired by Domain: Plans. Add structures and types (Whiteboard, Facilitation, Participant, Short Task), a template and a file convention, routines (read before turn, prepare update, prepare response, update sentiment, report to user), commands exposed as skills (Init Whiteboard, Invite Participant, Join Whiteboard, Take Turn), and register the domain and skills in the relevant agents. Whiteboards depends on the `parking-lot` skill and does not assume plans or work items.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable     | Resolved Path                | Purpose                                |
| ------------ | ---------------------------- | -------------------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace root directory               |
| `$PROJECT`   | Provided with prompt         | Where this plan and its backlogs live. |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Domain resources under change.         |
| `$SKILLS`    | `$WORKSPACE/.agents/skills`  | Agent modes and skills directory.      |

## Summary

Add a Whiteboards domain so that multiple participants can collaborate across sessions through a shared whiteboard: introduce themselves, agree working agreements, converge on vocabulary and contracts, and take turns updating the board.

## Attachments

- `./plan__report-examples.md` (Reference) — Report and sentiment examples for the whiteboard reporting and update routines.

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
::READ `$WORKSPACE/_whiteboard_snapshot_0/whiteboard.md` (Reference) — A worked example of the whiteboard being modelled. Relevant for Planning Work Item.

## Scope

Add a new `$DOMAINS/whiteboards/` domain with structures, types, a template, a file convention, and routines, and expose participant commands as skills registered in the relevant agents.

### Constraints

- **Depends on `parking-lot`** — whiteboards reuse the parking-lot sections for actionable items, pending questions, and blockers.
- **No plans or work items** — structures, templates, and routines must not assume `Structure: Plan` or the work-item model.
- **Turn-based writes** — only the participant named in `facilitation.turn` writes to the whiteboard.
- **Model the snapshot** — `$WORKSPACE/_whiteboard_snapshot_0/whiteboard.md` is the worked example for sections, fields, and vocabulary.

## Work

### Next

Refine the first iteration `add-whiteboard-structures` and write its instructions.

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

| Iteration / Instructions                          | Status  |
| ------------------------------------------------- | ------- |
| Iteration: Add Whiteboard Structures              | `DRAFT` |
| Iteration: Add Whiteboard Template and File       | `DRAFT` |
| Iteration: Add Whiteboard Routines                | `DRAFT` |
| Iteration: Add Whiteboard Commands and Skills     | `DRAFT` |
| Iteration: Register Whiteboards Domain and Skills | `DRAFT` |

### Iteration: Add Whiteboard Structures

**Id:** `add-whiteboard-structures`

**Status:** `DRAFT`

**Purpose:** Model the whiteboard data so that facilitation state and participant introductions can be recorded and rendered.

**Description:** Add the Whiteboard structure and its nested types, inspired by the Plans structures.

**Changes:**

- Add `$DOMAINS/whiteboards/structures/whiteboard.art` with fields `id`, `purpose`, `description`, `facilitation`, and `participants`.
- Add `$DOMAINS/whiteboards/structures/facilitation.art` with `turn` (Identifier of the participant expected to update the whiteboard next), `goal` (NaturalExpression), `tasks` (List(Type: Short Task)), `participant-statuses` (List(EnumValue), e.g. `INTRODUCING`), `working-agreements` (List(NaturalExpression)), and `sentiment` (List(NaturalExpression), one per participant, with emojis).
- Add `$DOMAINS/whiteboards/structures/participant.art` with `planning` (Path), `goals`, `deliverables`, `expectations` (NaturalExpression), `status` (one of `%whiteboard.facilitation.participant-status`), and `attachment` (Path).
- Add `$DOMAINS/whiteboards/types/short-task.art` with `done` (Boolean) and `description` (NaturalExpression).
- Add `$DOMAINS/whiteboards/types/participant-status.art` as a controlled list, e.g. `INTRODUCING` — The participant is still curating their record and attachment and is not fully engaged in the discussion.
- Add `$DOMAINS/whiteboards/index.md` and `$DOMAINS/whiteboards/domain.art` following Domain: Plans.

**Dependencies:**

- None.

### Iteration: Add Whiteboard Template and File

**Id:** `add-whiteboard-template-and-file`

**Status:** `DRAFT`

**Purpose:** Define how a whiteboard is presented and where the whiteboard file lives.

**Description:** Add the whiteboard template and the whiteboard file convention.

**Changes:**

- Add `$DOMAINS/whiteboards/templates/whiteboard.tart` rendering `Facilitation`, `Working Agreements`, `Introductions`, `Attachments`, `Parking lot`, `Contracts`, `Changes`, `Follow-ups`, and `Instructions`.
- Add `$DOMAINS/whiteboards/files/whiteboard.art` defining the naming pattern and the template.
- Keep `## Instructions` in the rendered output: only the participant in `turn` writes; each turn adds exactly one succinct `changes` bullet, updates `turn`, and preserves fair turn-taking.

**Dependencies:**

- Iteration `add-whiteboard-structures`.

### Iteration: Add Whiteboard Routines

**Id:** `add-whiteboard-routines`

**Status:** `DRAFT`

**Purpose:** Define the participant lifecycle routines so that turns are read, prepared, and answered consistently.

**Description:** Add the routines that drive a participant turn, including reporting and sentiment.

**Changes:**

- Add `$DOMAINS/whiteboards/routines/read-whiteboard-before-turn.art` — inspect the git diff to pick up every change, and stage all whiteboard files before proceeding.
- Add `$DOMAINS/whiteboards/routines/prepare-whiteboard-update.art` — decide what to update and what to delete from the parking lot, and update status and sentiment.
- Add `$DOMAINS/whiteboards/routines/prepare-response.art` — compose the session-chat response.
- Add `$DOMAINS/whiteboards/routines/update-participant-sentiment.art`.
- Add `$DOMAINS/whiteboards/routines/report-to-user.art` — scaled report formats for `DIVERGENCE`, `LAZY`, `SLOPPY`, `UNCOOPERATIVE`, `QUESTIONABLE`, `CONFUSING`, `GOOD`, `SOLID`, and `BEAUTIFUL` outcomes, using the examples in `./plan__report-examples.md`.

**Dependencies:**

- Iteration `add-whiteboard-template-and-file`.

### Iteration: Add Whiteboard Commands and Skills

**Id:** `add-whiteboard-commands-and-skills`

**Status:** `DRAFT`

**Purpose:** Expose whiteboard entry points as skills so participants can be onboarded and take turns.

**Description:** Add the participant-facing commands as skills, each re-reading the entire whiteboard on entry and focusing on the changes and the parking lot.

**Changes:**

- Add `$SKILLS/init-whiteboard/` — create a whiteboard at a path.
- Add `$SKILLS/invite-participant/` — prompt a participant with the skill context needed to create their attachment and join.
- Add `$SKILLS/join-whiteboard/` — register a participant and their attachment.
- Add `$SKILLS/take-turn/` — read before turn, prepare the update, and prepare the response.

**Dependencies:**

- Iteration `add-whiteboard-routines`.

### Iteration: Register Whiteboards Domain and Skills

**Id:** `register-whiteboards-domain-and-skills`

**Status:** `DRAFT`

**Purpose:** Make the new domain and skills discoverable to agents.

**Description:** Register the domain and the new skills, and list the required skills in the relevant agent modes.

**Changes:**

- Register `Domain: Whiteboards` in `$DOMAINS/index.md`.
- Register the new skills in `$SKILLS/index.md`.
- Add the whiteboard commands to the required or allowed skills of the participant agent modes, and to `$WORKSPACE/opencode.json` where the agent modes are declared.

**Dependencies:**

- Iteration `add-whiteboard-commands-and-skills`.

---

## Coordination

### Not In Scope

- **Plans and work items** — whiteboards do not assume their shape.

### Evidence

- None.

### Findings

- The worked example in `$WORKSPACE/_whiteboard_snapshot_0/whiteboard.md` already fixes the vocabulary: `Facilitation`, `Working Agreements`, `Introductions`, `Attachments`, `Parking lot`, `Contracts`, `Changes`, `Follow-ups`, and `Instructions`.

### Decisions

- Whiteboards are modelled as a standalone domain inspired by Domain: Plans, depending only on the `parking-lot` skill.

### Knowledge to Update

- `$DOMAINS/index.md` — add `Domain: Whiteboards`.
- `$SKILLS/index.md` — add the whiteboard skills.

### Follow Ups

- None.

### Feedback

- None.
