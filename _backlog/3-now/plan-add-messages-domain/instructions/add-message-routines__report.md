# Sub-Agent REPORT (#producer)

**Plan:** `add-messages-domain`

**Iteration Id:** `add-message-routines`

**Outcome:** `COMPLETED`

## Evidence

### Changes

Defined the messaging lifecycle as four data-transforming routines — inboxes are found, messages extracted and typed, messages written respecting medium availability with response cleanup, and each incoming message actioned with its reply prepared — every routine takes data in and always returns data out; none writes to files or responds in the session chat, which belongs to the skill commands.

| Goal                                   | Outcome                                                                                                                                                                                                                                                                                                                 |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Create `routines/identify-inboxes.art` | Done — Routine: Identify Inboxes scans `%context` for artefacts carrying a message board; always returns `%inboxes`, even when empty.                                                                                                                                                                                   |
| Create `routines/process-messages.art` | Done — Routine: Process Messages reads each inbox's board and returns `%messages`, each typed per Type: Message Type (`ASK`/`REQUEST`/`INFORM`/`ANSWER`/`REPORT`); always returns `%messages`, even when empty.                                                                                                         |
| Create `routines/write-message.art`    | Done — Routine: Write Message transcribes every spec rule: board turn-gate, checkout clean-check, medium-file clean-check, `%bypass-clean-check`; recipient-side path for long messages; write+stage+commit per medium rules, impeded ⇒ unavailable; park short messages at top of actionable column; response cleanup. |
| Create `routines/read-message.art`     | Done — Routine: Read Message actions the message (own parking-lot item, synchronous resource update, or attach/purge) and replies through Routine: Write Message with `%response-to`; >1000 chars → file, <200 chars → incoming board (default), in between the writer decides.                                         |
| Commit `build-message-routines`        | Done — commit `d1f2ce0` executed with the prescribed message and pushed: `b12c0f7..d1f2ce0 main -> main` (policy AUTONOMOUS).                                                                                                                                                                                           |

#### Files changed

- `.agents/domains/messages/routines/identify-inboxes.art` (new) — Routine: Identify Inboxes: purpose "find where incoming messages wait"; input `%context` (the current working context); output `%inboxes` (artefacts carrying a message board); procedure scans the context for message boards and always returns `%inboxes`, even when empty.
- `.agents/domains/messages/routines/process-messages.art` (new) — Routine: Process Messages: purpose "extract the waiting messages from the inboxes"; input `%inboxes` (from Routine: Identify Inboxes); output `%messages`; procedure reads each board — instructions and state — classifies each message per Type: Message Type, builds the message record (from, to, type, timestamp, content, medium), and always returns `%messages`, even when empty.
- `.agents/domains/messages/routines/write-message.art` (new) — Routine: Write Message: inputs `%message`, `%medium` (optional, defaults to `%message.medium`), `%bypass-clean-check` (optional, defaults `false`), `%response-to` (optional); procedure transcribes every `plan__messages-spec.md` `### Routine: Write Message` rule — board turn-gate, checkout and medium-file clean-checks with the bypass flag, recipient-side path decision for long messages reading the recipient's relevant instructions (example `_guide`) when no path is obvious, write+stage+commit per the medium's rules with impeded-write ⇒ unavailable, park short messages at the top of the writer's own actionable parking-lot column when unavailable, and response cleanup (purge incoming board message; integrate/attach/delete incoming file message) with the rule that integrated contents never cite the message as source; output `%message-result` — resolved medium and availability, write operations, parked fallback, cleanup operations — returned as data only; the calling command performs the writes and session-chat response.
- `.agents/domains/messages/routines/read-message.art` (new) — Routine: Read Message: inputs `%message` and `%medium`; purpose "act on one incoming message and prepare the reply"; procedure takes one of the spec actions — convert to own parking-lot item, synchronously update resources, or attach/purge — then replies through Routine: Write Message with `%response-to`, applying the response-length rules (>1000 chars → file path on the recipient's side, <200 chars → board defaulting to the incoming one, in between the writer decides, adding detail when it helps the recipient); output `%message-outcome` — action taken plus the reply outcome — always returned.

### Verification

- `npm ci` + `npm run ci` — green before starting (setup from `$WORKSPACE/_guide.md`).
- `npx prettier --write .agents/domains/messages` — all `.art` files prettier-clean (all `unchanged`).
- `npm run ci` — green after changes; lefthook pre-commit (`npm run ci` → `prettier . -c`) green at commit time; no `--no-verify` used.
- Commit `d1f2ce0` `build(domain-messages): Add message routines.` executed with the prescribed message and pushed to `origin/main` (`b12c0f7..d1f2ce0`), covering only the instruction's 4 files via a pathspec commit.
- Final-verification checklist: every routine declares clear Inputs and an Output and every Procedure path ends in a return — identify-inboxes and process-messages return even when empty; no routine writes to files directly or responds in session chat — Routine: Write Message returns its write operations and fallback as data for the calling command; examples carry no plan assumptions (turn-gated board, recipient `_guide`, knowledge-resource correction).
- Note on synthesis: the spec has Routine: Write Message "write message to medium, stage and commit" while the instruction requires routines to return data only — resolved by having the routine prepare the write operations and the impeded-write fallback as returned data in `%message-result`, covering every spec rule without the routine writing files; the final review pass may tighten this.
- `::READ` directives reference only resources that exist today (`$DOMAINS/messages/definitions/index.art`, `./write-message.art`); Type: Message / Type: Message Type are referenced by name and arrive with iteration `add-message-structures-and-types`, so their `::READ` directives are deferred to the bottom-up review pass.
- Pre-existing workspace changes (`.agents/domains/whiteboards/templates/whiteboard.tart` staged, `_records/repositories/art-boards.art` staged) were left untouched and uncommitted — outside instruction scope.
- Note: the iteration's instruction file and this report live in `$PROJECT` (checkout `art-domains`) while the commit lands in the Workspace repository, per the plan's commit table ("Repository: Workspace").

## Blockers (if any)

None.
