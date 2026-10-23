# Parking Lot: Art Domains Backlog

## Ongoing

- **Plan Add Operations Domain** — `_backlog/{dir}/plan-add-operations-domain/plan.md`.
- **Participate in the Art Boards Inception Whiteboard (owned by `ART_BOARDS`)** — board at `$ART_BOARDS/cli/whiteboard/_roadmap/whiteboard-art-boards-inception/whiteboard.md`.
- **Missing Architecture Docs/Sections** – In `knowledge/overview.md` add Why, Use Cases Vision, NFRs (or separate into own file leaving at the knowledge root if content of section longer than 25 lines)

---

## ACTIONABLE

- None.

## PENDING

- **`plans/skills/archive-plans.md` has no home** — A skill file lives inside the Plans domain, is referenced by no file in `.agents`, is not listed in `$SKILLS/index.md`, and no domain-index section can list it. Its `Allowed Agent Modes` is `backlog-manager` and it carries a WIP comment. Decide between moving it to `$SKILLS/archive-plans/` and registering it, deleting it if the archive flow is already covered, or adding a Skills section to `domain-index-file.tart`.

## BLOCKERS

- None.

---

## Follow-ups

- **Create Domain: Knowledge:** — `Domain: Guides` and `Domain: References` should be merged tino `Domain: Knowledge` — models all knowledge resources and one knowledge resource kind in particular: Guides.
- **`read-work-guides` belongs to Knowledge** — `$DOMAINS/work/routines/read-work-guides.art` is not a Work concern. Move it to `Domain: Guides`.
- **Boundary broken between Work and Operations** — they depend on each other. A new `Domain: Workflows` must be created to host the shared Workflow structures and workflow definitions, so that Operations and Work both depend on Workflows and so that Operations does not depend on Work.
  - `operations/structures/operation.art` READs `Structure: Workflow` from `$DOMAINS/work/structures/workflow.art`.
  - `work/structures/workflow.art` READs `Structure: Operation` from `$DOMAINS/operations/structures/operation.art`.
  - `operations/templates/*` consume `Structure: Operation` (Operations) and `Type: Operating Instructions` (Operations) but render workflows from Work.
  - `milestone.tart` / `plan.tart` / `instructions.tart` reference workflows by name that live in Work/Deployments/Roadmaps domains.

## Notes:
