# Sub-Agent REPORT (#producer)

**Plan:** `optional-context-attachments`

**Iteration Id:** `split-work-item-context-templates`

**Outcome:** `COMPLETED`

## Evidence

### Changes

| Goal                                                                                                | Change                                                                                                                                                                                                                    | Evidence                                                            |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Add `has-context-file` to the abstract work item so plans and milestones inherit it                 | Added the Boolean entry next to `attachments` in the **Shape:** section of `$DOMAINS/work/structures/work-item-abstract.art`                                                                                              | `grep -n 'has-context-file'` → line 56                              |
| Split the monolithic `$DOMAINS/work/templates/work-item-context.tart` into three reusable templates | Created `work-item-summary.tart` (always-inline sections), `work-item-context-attachment.tart` (full-fidelity standalone context), `work-item-context-section.tart` (compact inline bullet variant); removed the monolith | `ls $DOMAINS/work/templates/`; `git show --stat 2c2aad2`            |
| Repoint every reader of the removed template so no references dangle                                | Repointed `validate-work-item.art`, `plan.tart`, `milestone.tart`, `migrate-plan.art`, `migrate-milestone.art`; updated the `$DOMAINS/work/index.md` Templates table and the `$DOMAINS/index.md` Templates row            | `grep -rn 'work-item-context\.tart' $DOMAINS` → no matches (exit 1) |
| Keep context composition untouched                                                                  | `$DOMAINS/work/routines/compose-work-context.art` not edited                                                                                                                                                              | `git diff` → 0 changed lines                                        |

#### Files changed

- `$DOMAINS/work/structures/work-item-abstract.art` — added `has-context-file` Boolean to the **Shape:** next to `attachments`.
- `$DOMAINS/work/templates/work-item-summary.tart` — new; preamble plus `## Path Variables`, `## Summary`, `## Attachments`, `## Scope`, `## Execution Context` carried over verbatim.
- `$DOMAINS/work/templates/work-item-context-attachment.tart` — new; title line plus `## Upstream Work`, `## Required Skills`, `## Domains`, `## Resource Kinds in Scope`, `## Workflows`, `## Workflow Operations`, `## Knowledge` promoted to H2 with full-fidelity tables/`::READ` rendering.
- `$DOMAINS/work/templates/work-item-context-section.tart` — new; same H2 sections minus `## Workflow Operations`, each rendering only a `- {name} – \`path\`` bullet list.
- `$DOMAINS/work/templates/work-item-context.tart` — removed via `git rm` (git recorded a 55% rename to the attachment template).
- `$DOMAINS/work/routines/validate-work-item.art` — step 3 now reads `work-item-summary.tart` and `work-item-context-section.tart`.
- `$DOMAINS/plans/templates/plan.tart` and `$DOMAINS/milestones/templates/milestone.tart` — render the summary always, then the attachment (`./{id}__context.md`) when `has-context-file` is TRUE or the inline section when FALSE.
- `$DOMAINS/plans/routines/migrate-plan.art` and `$DOMAINS/milestones/routines/migrate-milestone.art` — `::READ` repointed: summary for the scope sections, section/attachment for the context sections.
- `$DOMAINS/work/index.md` — Templates table: `Template: Work Item Context` row replaced by Summary, Context Attachment, and Context Section rows.
- `$DOMAINS/index.md` — Templates table: `Template: Work Item Context` row replaced by the same three new template rows.

### Verification

- `npm run ci` (prettier lint) — passes, both before changes and after; also executed by the lefthook pre-commit hook.
- Commit `2c2aad2` `build(domain-work): Split work item context into summary, attachment, and section templates` created on `main`; `git status -sb` reports `ahead 1` of `origin/main` — NOT pushed, per commit policy `NOPUSH`.
- `grep -rn 'work-item-context\.tart' $DOMAINS` → no matches; `$DOMAINS/work/templates/` holds the three new templates and no longer holds `work-item-context.tart`.
- `$DOMAINS/work/structures/work-item-abstract.art` declares `has-context-file`; `$DOMAINS/work/routines/compose-work-context.art` unchanged.
- Working tree clean after commit.

## Blockers (if any)

None.

## Feedback

Feedback was not requested for this iteration.
