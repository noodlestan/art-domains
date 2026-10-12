# Parking Lot: Art Domains Roadmap

The high level briefing, principles, requirements, and milestones are in `_roadmap/_architect.md`. Milestones live under `_roadmap/` (e.g. `_roadmap/3-now/`, `_roadmap/4-next/`). This file is the roadmapping tracker and parking lot. Column convention: **ACTIONABLE** / **PENDING** / **BLOCKER** / **FOLLOW-UPS** (not in scope). No done items here — completed work is recorded in the relevant milestone and backlog plans.

## Parking Lot

### ACTIONABLE

- **Add spec content rules to specs domain** — no implementation details, no code snippets, no tables unless prescribed (from old write-task-files.art).
- **Create `domains/specs/index.md`** — specs domain needs an index file with definitions, types, and file conventions.
- **Sweep files for legacy naming** ("domain Record", "Record Structure", "Attachment File") — blocked on fundamentals cleanup being finalised.
- **Investigate `$WORKSPACE/.agents/domains/changelogs/`** — separate domain for changelog management. Should be dependency of engineering domain (like plans). Own structures, agent modes (if any), skills. `write-changelog` skill already exists — may need expansion. Changelogs generated from completed plans in backlogs. Example: `_backlog/1-done/`.

### PENDING

- **Spec file conventions** — should the specs domain define file conventions (like `plan-{plan.id}/specs/{spec.id}.md`) or keep them generic via Work Attachment?

### BLOCKER

- None current.

### FOLLOW-UPS (not in scope)

- **Track ad-hoc `build(domain*)` work** — record untracked `build(domain*)` commits in dedicated backlog plans for future reference (see `_backlog/1-done/`).
