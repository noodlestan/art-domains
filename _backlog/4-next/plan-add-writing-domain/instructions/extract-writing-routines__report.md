# Sub-Agent REPORT (#producer)

**Plan:** `add-writing-domain`

**Iteration Id:** `extract-writing-routines`

**Outcome:** `COMPLETED`

## Evidence

### Changes

| Goal                                                                                          | Outcome   | Evidence                                                                                          |
| --------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------- |
| Move the three article routines into the domain                                               | `DONE`    | Created `$DOMAINS/writing/routines/draft-article.art`, `review-article.art`, `integrate-feedback.art` |
| Convert to domain routine format (`Purpose`/`Inputs`/`Outputs`/`Procedure`)                    | `DONE`    | All three follow `read-message.art`: `## Uses`, `**Purpose:**`, `**Inputs:**`, `**Outputs:**`, `**Procedure:**` |
| Replace the `$MANAGEMENT` reads with injected inputs                                          | `DONE`    | `grep -rn 'MANAGEMENT' $DOMAINS/writing/routines/` → no matches; guides arrive as `%templates`, `%annotation-taxonomy`, `%tone-of-voice`, `%comms` |
| Align the head to `Structure: Article`                                                        | `DONE`    | Draft step 5.1 writes `**Purpose:**`, `**Description:**`, `**Titles:**`, `**Tags:**`, `**Status:** DRAFT` |
| Set each routine's lifecycle status explicitly                                                | `DONE`    | Draft `DRAFT` (head), review `REVIEWED` (step 5.4), integrate `AUTHORED` (step 8.2)                |
| Repoint the kit index and drop the source routines (management)                               | `DONE`    | `_ops/writing/index.md` Routines section now points at `$DOMAINS/writing/routines/`; `routines/` removed |

#### Files changed

- `$DOMAINS/writing/routines/draft-article.art` — new routine: seed/advice in, `%contents` out; guides loaded via input paths; head aligned to `Structure: Article` with `**Status:** DRAFT`; five passes and `**Examples:**` carried over.
- `$DOMAINS/writing/routines/review-article.art` — new routine: `%file` in, `%contents` (annotated article + `## Review`) and `%findings` (verdict and counts) out; `fixed`/`proposed` criteria, list-as-one-block rule and sub-item findings kept; article `**Status:**` set to `REVIEWED` while the `## Review` `**Status:**` stays the verdict.
- `$DOMAINS/writing/routines/integrate-feedback.art` — new routine: `%file` in, `%contents` (integrated, swept) and `%swept` (confirmation and counts) out; marker scan, proposed-vs-fixed rule, inlined five passes with stopping rule and final sweep kept; article `**Status:**` set to `AUTHORED`, `READY` switch stays manual.
- `checkouts/management/_ops/writing/index.md` — `## Routines` section replaced by a pointer to Domain: Writing routines (`$DOMAINS/writing/routines/`); guides, templates and annotations sections untouched.
- `checkouts/management/_ops/writing/routines/draft-article.md`, `review-article.md`, `integrate-feedback.md` — deleted (source routines extracted into the domain).

#### Commits

| Repository                  | Commit    | Message                                                                            | Policy  |
| --------------------------- | --------- | ---------------------------------------------------------------------------------- | ------- |
| Workspace (this repo)       | `7991af1` | `migrate(domain-writing): Extract article routines from _ops/writing.`            | `NOPUSH` |
| `checkouts/management`      | `a5ae869` | `migrate(management): Drop _ops/writing routines; point index at Domain: Writing.` | `NOPUSH` |

Both commits were created and **not pushed**, per their `NOPUSH` policy. Workspace is `ahead 3`, management is `ahead 1` of `origin/main`.

#### Verification

- `npx prettier --write .agents/domains/writing` — all files unchanged/already formatted.
- `npm run ci` (workspace root, after creation and again after both commits) — `All matched files use Prettier code style!`
- `npm run ci` (management checkout) — `All matched files use Prettier code style!` (ran before commit; its lefthook pre-commit hook re-ran it and passed).
- `grep -rn 'MANAGEMENT' $DOMAINS/writing/routines/` — no `$MANAGEMENT` path in any of the three new routine files.
- Status grep — `DRAFT` in `draft-article.art` step 5.1, `REVIEWED` in `review-article.art` step 5.4, `AUTHORED` in `integrate-feedback.art` step 8.2.
- `ls checkouts/management/_ops/writing/` — `routines/` directory gone; index Routines section points at `$DOMAINS/writing/routines/`.
- `git status` — clean in both repositories (report file excluded; reports are not committed).

## Blockers (if any)

None — no blockers encountered.
