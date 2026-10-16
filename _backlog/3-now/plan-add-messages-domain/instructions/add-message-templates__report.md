# Sub-Agent REPORT (#producer)

**Plan:** `add-messages-domain`

**Iteration Id:** `add-message-templates`

**Outcome:** `COMPLETED`

## Evidence

### Changes

Defined how a message board and a long message are presented, and where long-message files live: the board template renders identity, messages from Type: Message, and the board's own instructions — stating that its section renders ahead of any parking-lot section when embedded in an artefact — the message template renders one long message per file with its medium path, and the file convention mirrors the reference format with workspace-vs-`checkouts/*` medium-availability scoping.

| Goal                                  | Outcome                                                                                                                                                                                                                                                                 |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Create `templates/message-board.tart` | Done — renders identity (ID, purpose, description), messages — each from Type: Message: from, to, type, timestamp, content — and the board's own instructions; states the ahead-of-parking-lot rule as a rendered `**Rule:**` line; examples carry no plan assumptions. |
| Create `templates/message.tart`       | Done — renders one long message per file: from, to, type, timestamp, content, and its medium path, closing with the receiver's integrate-then-delete instructions; example is plan-free.                                                                                |
| Create `files/message.art`            | Done — **File: Message** declares naming pattern `message-{message.id}.md`, template reference `$DOMAINS/messages/templates/message.tart`, and medium-availability scoping — workspace repository or `checkouts/*`, each scoped to its own repository's clean-check.    |
| Commit `build-message-templates`      | Done — commit `a42c501` executed with the prescribed message and pushed: `d1f2ce0..a42c501 main -> main` (policy AUTONOMOUS).                                                                                                                                           |

#### Files changed

- `.agents/domains/messages/templates/message-board.tart` (new) — message board template mirroring the reference directive format: preamble, `::TEMPLATE::READ (Type: Message)`, identity section (name, ID, purpose, description), the rendered ahead-of-parking-lot rule, `## Messages` rendering each message — from, to, type, timestamp, content — oldest first with the delete-when-read reminder and an empty-state line, and `## Instructions` rendering the board's own custom instructions merged verbatim with a board-instructions scaffold (discard-on-read, availability gate, clean-check, 200-character cap with file medium pointer, stage-and-commit, integrate-never-cite).
- `.agents/domains/messages/templates/message.tart` (new) — long-message template: header `# Message: {type} — {from} → {to}` with the from, to, type, timestamp fields and the medium path — the file's own path on the receiver's side — then `## Content` rendering `%message.content` verbatim, closing with the receiver instructions: integrate into the artefact where they belong, never cite the message as a source, then delete the file or keep it only as an annotated attachment.
- `.agents/domains/messages/files/message.art` (new) — **File: Message** convention mirroring `whiteboards/files/whiteboard.art`: Purpose, Naming Pattern `message-{message.id}.md`, Template reference to `message.tart`, and Location covering medium-availability scoping — the message file lives on the receiver's side in the workspace repository or inside a `checkouts/*` checkout, each location scoped to its own repository for the clean-check that gates writing.

### Verification

- `npm ci` + `npm run ci` — green before starting (setup from `$WORKSPACE/_guide.md`).
- `npx prettier --write .agents/domains/messages` — all files prettier-clean (all `unchanged`).
- `npm run ci` — green after changes; lefthook pre-commit (`npm run ci` → `prettier . -c`) green at commit time; no `--no-verify` used.
- Commit `a42c501` `build(domain-messages): Add message board and message templates.` executed with the prescribed message and pushed to `origin/main` (`d1f2ce0..a42c501`), covering only the instruction's 3 files via a pathspec commit.
- Final-verification checklist: `message-board.tart` renders identity, messages, and board instructions and states the ahead-of-parking-lot rule — the rule appears both as a `::TEMPLATE` rendering instruction and as a rendered `**Rule:**` line in the identity section; examples carry no assumption that messages are about plans — examples exchange a serializer-contract `ASK` and a contract-`REPORT` between `ART_JS` and `ART_MD`; `message.tart` renders exactly one long message per file with its medium path.
- Note on the forward reference: `message-board.tart` carries `::TEMPLATE::READ (Type: Message) FROM `$DOMAINS/messages/types/message.art``mirroring the reference template, which reads its types the same way; the type file lands with the next iteration`add-message-structures-and-types`, and templates are only executed at render time — after that iteration. The final review pass may confirm or defer this directive, as it did for the routines.
- Pre-existing workspace changes (`.agents/domains/whiteboards/templates/whiteboard.tart` staged, `_records/repositories/art-boards.art` staged) were left untouched and uncommitted — outside instruction scope; the pathspec commit kept them staged but excluded.
- Note: the iteration's instruction file and this report live in `$PROJECT` (checkout `art-domains`) while the commit lands in the Workspace repository, per the plan's commit table ("Repository: Workspace").

## Blockers (if any)

None.
