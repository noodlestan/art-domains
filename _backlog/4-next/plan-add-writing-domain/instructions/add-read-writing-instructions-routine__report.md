# Sub-Agent REPORT (#producer)

**Plan:** `add-writing-domain`

**Iteration Id:** `add-read-writing-instructions-routine`

**Outcome:** `COMPLETED`

## Evidence

### Changes

| Goal (from instruction)                                                                                                 | Result                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Resolve the current repo's writing resources in one place instead of assuming them: add the routine every `write-article` skill command calls before acting. | Done — `Routine: Read Writing Articles Instructions` created; returns `%writing-resources` and `%missing`, data only, no defaults, no hard-coded repo paths. |

Verification evidence:

- Setup: `npm ci` — passed; `npm run ci` (pre-start) — passed (prettier `All matched files use Prettier code style!`).
- Completion: `npx prettier --write .agents/domains/writing` — new file unchanged (already formatted); `npm run ci` — passed.
- Final checks: routine returns both `%writing-resources` and `%missing`; procedure writes no files; missing section/resources stay in `%missing` with no default fallback; no repo paths hard-coded — `%repo-guide` arrives as input and defaults to the current checkout's `_guide.md`.
- Commit policy `NOPUSH`: commit created, not pushed.

Commits:

- `6a22f23` — `build(domain-writing): Add read-writing-instructions routine.` (1 file, 27 insertions; pre-commit `ci` hook green; not pushed per NOPUSH).

#### Files changed

- `$DOMAINS/writing/routines/read-writing-instructions.art` — new domain routine in domain routine format (Purpose, Inputs, Outputs, Procedure, Rules), modelled on `identify-inboxes.art` (comparable) and `draft-article.art` (sibling input-injection pattern).

## Blockers (if any)

None.
