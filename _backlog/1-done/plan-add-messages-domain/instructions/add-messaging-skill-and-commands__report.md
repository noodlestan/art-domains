# Sub-Agent REPORT (#producer)

**Plan:** `add-messages-domain`

**Iteration Id:** `add-messaging-skill-and-commands`

**Outcome:** `COMPLETED`

## Evidence

### Changes

Give every agent one entry point to send and read messages: added the `messaging` skill — allowed to ALL agent modes — whose commands declare their inputs, invoke the domain routines with each call preceded by its `::READ` directive, capture their outputs, and own every session-chat write and response; registered the skill everywhere agent skills are listed.

| Goal                                                    | Outcome                                                                                      |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Create `messaging/SKILL.md` with front-matter and rules | Done — name `messaging`, description per spec, `ALL` allowed agent modes.                    |
| Definitions: message, board, medium, inbox              | Done — quoted from `$DOMAINS/messages/definitions/index.art`, pointed at that file.          |
| `## Mandatory Reading` + commands-own-the-chat rule     | Done — `::READ $DOMAINS/messages/index.md`; commands write/respond, routines transform data. |
| Add command `write a message`                           | Done — inputs `%message`, `%medium`, `%bypass-clean-check`, `%response-to` (optional).       |
| Add command `read incoming messages`                    | Done — Identify Inboxes → Process Messages → Read Message per message; command responds.     |
| List `messaging` in `$SKILLS/index.md`                  | Done — `## Messaging` entry with id and front-matter description, after `## Whiteboard`.     |
| Allow `messaging` in all agent modes                    | Done — `messaging` added to `## Allowed Skills` in all 12 `agent-*/SKILL.md` files.          |
| Commit `build-messaging-skill`                          | Done — commit `b12c0f7`, pushed to `origin/main` (`8b691bc..b12c0f7`).                       |

#### Files changed

- `.agents/skills/messaging/SKILL.md` (new) — front-matter (name `messaging`, description "Use to send and read persisted messages to and from other agents."); purpose stating commands own session-chat writes and every routine call is preceded by its `::READ` directive; `## Allowed Agent Modes` `ALL`; four definitions (message, message board, medium, inbox) pointing at `$DOMAINS/messages/definitions/index.art`; `## Mandatory Reading` `::READ $DOMAINS/messages/index.md`; `## Commands` — `Write a Message` (inputs `%message`, `%medium`, `%bypass-clean-check` boolean defaulting `false`, `%response-to` optional incoming message; procedure `::READ`s and invokes Routine: Write Message capturing its outputs, then the command composes the session-chat response) and `Read Incoming Messages` (procedure `::READ`s and invokes Routine: Identify Inboxes → Routine: Process Messages → Routine: Read Message per incoming message; the command reports and responds in session chat). Routines are declared as invocations only — not implemented (later iteration).
- `.agents/skills/index.md` (modified) — added the `## Messaging` listing entry (`ID: messaging`, front-matter description) per the `update-skills` procedure; minimal targeted addition, matching the `whiteboard` registration precedent.
- `.agents/skills/agent-{architect,assistant,backlog-manager,context-curator,delegator,pair-driver,pair-navigator,planner,reference-curator,rubberduck,task-manager,worker}/SKILL.md` (12 modified, 1 line each) — `- \`messaging\``appended to each mode's`## Allowed Skills`, allowing the skill in ALL agent modes per the `update-agents`procedure's intent; per-mode skill allowance lives in the agent-mode files (the same mechanism used when`whiteboard`was allowed in all modes, commit`064880c`). The agent-modes index (`.agents/skills/agent-modes.md`), the Codex agent files (`.codex/agents/\*.toml`), and `$WORKSPACE/opencode.json` carry agent-mode metadata only — none changed, verified consistent with the front-matter; regenerating them would produce no diff.

### Verification

- `npm ci` + `npm run ci` — green before starting.
- `npx prettier --write .agents/skills/messaging` (plus every modified `.md`) — all files prettier-clean.
- `npm run ci` — green after changes; pre-commit hook (`prettier . -c` via lefthook `ci`) green at commit time.
- Commit `b12c0f7` `build(domain-messages): Add the messaging skill with commands.` executed with the prescribed message and pushed: `8b691bc..b12c0f7 main -> main` (policy AUTONOMOUS; committed on the checkout's current branch `main` with a pathspec commit covering only the instruction's 14 files).
- Final-verification checklist: both commands declare their inputs (the spec declares no inputs for `read incoming messages`); every routine invocation in a command is preceded by its `::READ` directive (3 invocations, 3 directives); no command performs file writes through a routine — routines only transform data and the commands compose the session-chat responses; `messaging` is listed in `.agents/skills/index.md` and allowed in all 12 agent modes.
- Pre-existing workspace changes (`.agents/domains/whiteboards/templates/whiteboard.tart` staged, `_records/repositories/art-boards.art` staged) were left untouched and uncommitted — outside instruction scope.
- Note: the iteration's instruction file and this report live in `$PROJECT` (checkout `art-domains`) while the commit lands in the Workspace repository, per the plan's commit table ("Repository: Workspace").

## Blockers (if any)

None.
