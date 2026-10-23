# Sub-Agent REPORT (#producer)

**Plan:** `add-operations-domain`

**Iteration Id:** `add-operations-templates-and-file`

**Outcome:** `COMPLETED`

## Evidence

### Changes

**Goal:** Define how operating instructions are presented and where long-instruction files live, with placeholder defaults and project-side override.

#### Files changed

| File                                                                    | Description                                                                                                                                                                             |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.agents/domains/operations/templates/operating-instructions.tart`      | New template migrated from Work domain; accepts `%consuming-context` input and filters instructions via `relevantFor` matching; keeps `%render-metadata` logic.                         |
| `.agents/domains/operations/files/operating-instructions.art`           | New flat-file convention declaration: one `art/operating-instructions.md` per package, placeholder defaults (`%command-list`, `%setup-commands`), `**CommandList**` override mechanism. |
| `.agents/domains/plans/templates/plan.tart`                             | Updated to pass `%plan.consuming-context` to the operating-instructions template (Operations domain path).                                                                              |
| `.agents/domains/plans/templates/instructions.tart`                     | Updated to pass `%plan.consuming-context` to the operating-instructions template (Operations domain path).                                                                              |
| `.agents/domains/milestones/templates/milestone.tart`                   | Updated to pass `%work-item.consuming-context` to the operating-instructions template (Operations domain path).                                                                         |
| `.agents/domains/milestones/routines/migrate-milestone.art`             | Repointed `::READ` directive from Work to Operations template path.                                                                                                                     |
| `.agents/domains/plans/routines/migrate-plan.art`                       | Repointed `::READ` directive from Work to Operations template path.                                                                                                                     |
| `.agents/domains/index.md`                                              | Updated Template: Operating Instructions path; added File: Operating Instructions to Files section.                                                                                     |
| `checkouts/workspace-tooling/tooling-art/art/operating-instructions.md` | New `@noodlestan/tooling-art` package with default command lists for Setting Up, Verifying Step, and Verifying Completion.                                                              |

### Commits

| Repo                           | Commit    | Policy | Message                                                                                   |
| ------------------------------ | --------- | ------ | ----------------------------------------------------------------------------------------- |
| `noodlestan/workspace`         | `7fe27fb` | NOPUSH | `build(domain-operations): Add operating-instructions template and flat-file convention.` |
| `noodlestan/workspace-tooling` | `18f2048` | NOPUSH | `build(tooling-art): Create package with default operating instructions.`                 |

### Verification

- `npm run ci` (workspace): ✅ All matched files use Prettier code style.
- `npm run ci` (workspace-tooling): ✅ All packages lint clean, 5/5 tasks successful.
- Pre-commit hooks: ✅ Passed on both repos.

## Blockers

None.

## Feedback

Not requested.
