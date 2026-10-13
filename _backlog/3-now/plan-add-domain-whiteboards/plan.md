# Plan: Add Domain Whiteboards

**ID:** `add-domain-whiteboards`

**Status:** `DONE`

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

- `./plan__report-examples.md` (Reference) — Report and sentiment examples for the whiteboard reporting and update routines (to be incluided in relevant routine).
- `./plan__whiteboard-snapshot.md` (Reference) — Snapshot of the `Art Records` whiteboard, used as source material for structures, templates, types, routines, skills, and commands (note this whiteboard as already evolved from the initial status so not everything should be included, it constitutes onl;y an example of the whiteboard domain can be applied).

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

- None. All five iterations are `DONE`; the plan is complete.

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

| Iteration / Instructions                          | Status |
| ------------------------------------------------- | ------ |
| Iteration: Add Whiteboard Structures              | `DONE` |
| Iteration: Add Whiteboard Template and File       | `DONE` |
| Iteration: Add Whiteboard Routines                | `DONE` |
| Iteration: Add Whiteboard Skill and Commands      | `DONE` |
| Iteration: Register Whiteboards Domain and Skills | `DONE` |

### Iteration: Add Whiteboard Structures

**Id:** `add-whiteboard-structures`

**Status:** `DONE`

**Purpose:** Model the whiteboard data so that facilitation state and participant introductions can be recorded and rendered.

**Description:** Add the Whiteboard structure and its nested types, inspired by the Plans structures.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/add-whiteboard-structures.md`

**Report:** `./instructions/add-whiteboard-structures__report.md`

**Changes:**

- Add `$DOMAINS/whiteboards/structures/whiteboard.art` — id, purpose, description, facilitation, participants, attachments, changes, follow-ups.
- Add `$DOMAINS/whiteboards/structures/facilitation.art` — turn (or `FACILITATOR`), goal, tasks, done, expected-final-outline, statuses, working-agreements, sentiment.
- Add `$DOMAINS/whiteboards/structures/participant.art` — planning, goals, deliverables, expectations, status, attachment.
- Add `$DOMAINS/whiteboards/structures/attachment.art` — path, purpose.
- Add `$DOMAINS/whiteboards/types/short-task.art` — done, description.
- Add `$DOMAINS/whiteboards/types/change-entry.art` — participant, date, description.
- Add `$DOMAINS/whiteboards/types/participant-status.art` — `INTRODUCING`, `READY`, `LEFT`.
- Add the domain scaffold: `$DOMAINS/whiteboards/domain.art` — purpose + boundaries; `$DOMAINS/whiteboards/index.md` — generated with `Routine: Build Domain Index`.

**Dependencies:**

- None.

#### Commits:

| ID                            | Repository / Checkout / Branch        | Policy       | Hash      | Status      |
| ----------------------------- | ------------------------------------- | ------------ | --------- | ----------- |
| `build-whiteboard-structures` | Workspace / `$WORKSPACE` / `building` | `AUTONOMOUS` | `8d493b3` | `COMMITTED` |

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

**Status:** `DONE`

**Purpose:** Define how a whiteboard is presented and where the whiteboard file lives.

**Description:** Add the whiteboard template and the whiteboard file convention.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/add-whiteboard-template-and-file.md`

**Report:** `./instructions/add-whiteboard-template-and-file__report.md`

**Changes:**

- Add `$DOMAINS/whiteboards/templates/whiteboard.tart` — seven sections (no `Contracts`) plus the three-part `Instructions`: `Turn`, `Document Structure`, `Goals`.
- Add `$DOMAINS/whiteboards/files/whiteboard.art` — naming pattern, template reference, workspace-vs-`checkouts/*` scoping.

**Dependencies:**

- Iteration `add-whiteboard-structures`.

#### Commits:

| ID                          | Repository / Checkout / Branch        | Policy       | Hash      | Status      |
| --------------------------- | ------------------------------------- | ------------ | --------- | ----------- |
| `build-whiteboard-template` | Workspace / `$WORKSPACE` / `building` | `AUTONOMOUS` | `ad95178` | `COMMITTED` |

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

**Status:** `DONE`

**Purpose:** Define the participant lifecycle routines so that turns are validated, read, prepared, and answered consistently, and so that new participants and new goals follow the canon.

**Description:** Add the routines that drive a participant turn, a join, and a goal change, including validation, reporting, and sentiment.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/add-whiteboard-routines.md`

**Report:** `./instructions/add-whiteboard-routines__report.md`

**Changes:**

- Add `$DOMAINS/whiteboards/routines/read-whiteboard-before-turn.art` — `git diff` plus `--cached`; stage workspace files only.
- Add `$DOMAINS/whiteboards/routines/validate-whiteboard.art` — six checks at turn start; report violations to affected participants.
- Add `$DOMAINS/whiteboards/routines/prepare-whiteboard-update.art` — update, self-correct own block, sync own plan, sentiment, turn.
- Add `$DOMAINS/whiteboards/routines/prepare-response.art` — compose the session response.
- Add `$DOMAINS/whiteboards/routines/update-participant-sentiment.art` — self-authored, current state.
- Add `$DOMAINS/whiteboards/routines/report-to-user.art` — nine outcome formats from `./plan__report-examples.md`.
- Add `$DOMAINS/whiteboards/routines/join-whiteboard.art` — attachment, gated request, approvals, pen-holder admission.
- Add `$DOMAINS/whiteboards/routines/set-new-goal.art` — goal canon, cleanup, archive under `Done:`.

**Dependencies:**

- Iteration `add-whiteboard-template-and-file`.

#### Commits:

| ID                          | Repository / Checkout / Branch        | Policy       | Hash      | Status      |
| --------------------------- | ------------------------------------- | ------------ | --------- | ----------- |
| `build-whiteboard-routines` | Workspace / `$WORKSPACE` / `building` | `AUTONOMOUS` | `55097a9` | `COMMITTED` |

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

**Status:** `DONE`

**Purpose:** Expose whiteboard entry points as a single skill so participants can be onboarded and take turns without imitation.

**Description:** Add one `whiteboard` skill whose commands expose every use-case routine, each re-reading the entire whiteboard on entry and focusing on the changes and the parking lot.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/add-whiteboard-commands-and-skills.md`

**Report:** `./instructions/add-whiteboard-commands-and-skills__report.md`

**Changes:**

- Add `$SKILLS/whiteboard/SKILL.md` — front-matter, definitions, `ALL` access, turn processes.
- Add commands `init-whiteboard`, `invite-participant`, `join-whiteboard`, `take-turn`, `validate-whiteboard`, `set-new-goal` — each delegating to a routine, with user-said and automatic triggers.

**Dependencies:**

- Iteration `add-whiteboard-routines`.

#### Commits:

| ID                       | Repository / Checkout / Branch        | Policy       | Hash      | Status      |
| ------------------------ | ------------------------------------- | ------------ | --------- | ----------- |
| `build-whiteboard-skill` | Workspace / `$WORKSPACE` / `building` | `AUTONOMOUS` | `07199ef` | `COMMITTED` |

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

**Status:** `DONE`

**Purpose:** Make the new domain and skills discoverable to agents.

**Description:** Register the domain and the new skills, and list the required skills in the relevant agent modes.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/register-whiteboards-domain-and-skills.md`

**Report:** `./instructions/register-whiteboards-domain-and-skills__report.md`

**Changes:**

- Modify `$DOMAINS/whiteboards/index.md` — regenerate with `Routine: Build Domain Index`.
- Modify `$DOMAINS/index.md` — list `Domain: Whiteboards` and its resources (`update-domains`).
- Modify `$SKILLS/index.md` — list `whiteboard` (`update-skills`).
- Modify the agent-modes index, the Codex agent files, and `$WORKSPACE/opencode.json` — allow `whiteboard` in all agent modes (`update-agents`).

**Dependencies:**

- Iteration `add-whiteboard-commands-and-skills`.

#### Commits:

| ID                            | Repository / Checkout / Branch        | Policy       | Hash      | Status      |
| ----------------------------- | ------------------------------------- | ------------ | --------- | ----------- |
| `register-domain-whiteboards` | Workspace / `$WORKSPACE` / `building` | `AUTONOMOUS` | `064880c` | `COMMITTED` |

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

- Iteration `add-whiteboard-structures` — 9 files under `$DOMAINS/whiteboards/` (4 structures, 3 types, `domain.art`, `index.md`), `npm run ci` green, committed and pushed as `8d493b3` on the workspace `building` branch.
- Iteration `add-whiteboard-template-and-file` — `templates/whiteboard.tart` (7 sections + 3-part Instructions constitution, no Contracts) and `files/whiteboard.art` (naming `whiteboard-{whiteboard.id}.md`, template reference, workspace-vs-`checkouts/*` scoping); committed and pushed as `ad95178`.
- Iteration `add-whiteboard-routines` — 8 routines under `$DOMAINS/whiteboards/routines/` (read, validate, prepare update, prepare response, sentiment, report-to-user with nine formats, join, set-new-goal); `npm run ci` green; committed and pushed as `55097a9`.
- Iteration `add-whiteboard-commands-and-skills` — `$SKILLS/whiteboard/SKILL.md` with `ALL` access, a turn process, and six commands (init-whiteboard, invite-participant, join-whiteboard, take-turn, validate-whiteboard, set-new-goal) with user-said and automatic triggers; committed and pushed as `07199ef`.
- Iteration `register-whiteboards-domain-and-skills` — `Domain: Whiteboards` in the domains listing, `$DOMAINS/whiteboards/index.md` regenerated with all 17 resources, `whiteboard` in the skills listing, allowed in all 12 agent modes, generated artefacts verified in sync; committed and pushed as `064880c`.

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

- `agent-reference-curator`'s allowed-skills list references `write-knowledge-files`, which does not exist as a skill directory — flagged during the skills-listing regeneration (out of this plan's scope).
- Pre-existing skills-listing staleness was fixed in passing by iteration `register-whiteboards-domain-and-skills` (`execute-plan` removed; `delegate-plan`, `scaffold`, `write-milestone`, `write-reference-files` listed) — review the regenerated `$SKILLS/index.md`.

### Feedback

- Iteration `add-whiteboard-routines`: the instruction's Step 5 says "`facilitation.art` declares all nine fields" but lists eight; the worker declared the eight listed fields (`turn`, `goal`, `tasks`, `done`, `expected-final-outline`, `participant-statuses`, `working-agreements`, `sentiment`). Miscount in the instruction; no action taken.
- Iteration `add-whiteboard-routines` (open, for the owner): sentiment-marker set is declared open (markers observed on the reference board, never invent one silently) — amend the routine if a closed set was intended.
- Iteration `add-whiteboard-routines` (open, for the owner): possible tension between `read-whiteboard-before-turn.art` ("stage what you read") and the template's rule allowing an unstaged own turn — settle in the skill-commands iteration.
- Iteration `add-whiteboard-routines` (open, for the writers): CONFUSING has no dedicated marker (shares 🤔 with QUESTIONABLE); CONFUSING/UNCOOPERATIVE examples in `plan__report-examples.md` end truncated.
- Iteration `add-whiteboard-commands-and-skills` (open, for the owner): Final Verification asks every command's `**Procedure:**` to name a routine, but `init-whiteboard` delegates to the template and `invite-participant` routes through Join Whiteboard — no init/invite routines exist; soften the verification or add routines later.
- Iteration `add-whiteboard-commands-and-skills` (open, for the owner): `report-to-user` is not named by any command; it is reachable only from within the routines domain.
- Iteration `register-whiteboards-domain-and-skills` (open, for the owner): the three registration skills (`update-domains`, `update-skills`, `update-agents`) gate to `assistant` while `agent-worker` may not use them; the worker executed their procedures as mandatory-reading instructions and disclosed it. Consider widening the gate or the worker's allowed list.
- Iteration `register-whiteboards-domain-and-skills` (open, for the owner): Step 3 expected per-skill changes in the agent-modes index, Codex agent files, and `opencode.json`, but allowed skills live only in the agent-mode SKILL.md files; verification phrasing could be softened.
