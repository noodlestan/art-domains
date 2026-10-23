# Sub-Agent REPORT (#producer)

**Plan:** `add-operations-domain`

**Iteration Id:** `add-operations-routines`

**Outcome:** `COMPLETED`

## Evidence

### Changes

Migrated operating-instructions routines from the Work domain to the Operations domain, adding `relevantFor` matching to `compose-operating-instructions` and creating the new `register-operating-instructions` routine.

#### Files changed

| File                                                                      | Change                                                                                                      |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `.agents/domains/operations/types/operating-instructions.art`             | Created type with `relevantFor` field for matching against consuming context.                               |
| `.agents/domains/operations/routines/compose-operating-instructions.art`  | Migrated from Work; added `%consuming-context` input and `relevantFor` matching in step 6.                  |
| `.agents/domains/operations/routines/read-work-guides.art`                | Migrated from Work; `::READ` directive updated to Operations domain.                                        |
| `.agents/domains/operations/routines/compose-work-operations.art`         | Migrated from Work; `::READ` directive updated to Operations domain.                                        |
| `.agents/domains/operations/routines/register-operating-instructions.art` | New routine: registers operating instructions on an artefact with deduplication.                            |
| `.agents/domains/index.md`                                                | Repointed routine and type references from Work to Operations; added Register Operating Instructions entry. |
| `.agents/domains/plans/routines/draft-iterations.art`                     | Repointed `::READ` directives from Work to Operations routines.                                             |
| `.agents/domains/conventions/routines/discover-installed-conventions.art` | Repointed `::READ` directive from Work to Operations.                                                       |

### Commit

- **Hash:** `6a52daa`
- **Message:** `build(domain-operations): Add operating-instructions routines.`
- **Policy:** NOPUSH — commit created, not pushed.

### Verification

- `npm run ci` — passed (prettier formatting clean).
- `compose-operating-instructions.art` populates `relevantFor` from workflow/operation names and filters against `%consuming-context` (step 6).
- `register-operating-instructions.art` merges with existing instructions and applies `**CommandList**` overrides.
- All references to migrated routines in non-Work domains point to `$DOMAINS/operations/routines/`.
- Work-domain files left unchanged per instruction (integration iteration).

## Blockers (if any)

None.
