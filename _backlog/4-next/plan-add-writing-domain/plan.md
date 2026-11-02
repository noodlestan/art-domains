# Plan: Add Writing Domain

**ID:** `add-writing-domain`

**Status:** `WORKING`

**Template:** `$DOMAINS/plans/templates/plan.tart`

**Skill:** `write-plan`

**Purpose:** Give agents reusable, repo-agnostic article writing — an Article structure with an explicit lifecycle, and routines to draft, review and integrate feedback — exposed through one `write-article` skill, with each repo advertising its own writing resources through its `_guide.md`.

**Description:** Extract the three article-writing routines that grew inside `$MANAGEMENT/_ops/writing/routines/` into a new Writing domain, refactored so templates, tone of voice, annotation taxonomy and comms guides arrive as injected inputs instead of hard-coded `$MANAGEMENT` paths. The domain models its subject — `Structure: Article` (purpose, description, titles, tags, status) and `Type: Article Status` (`DRAFT` → `REVIEWED` → `AUTHORED` → `READY`) — and every routine sets the article status explicitly. Add a fourth routine — Read Writing Articles Instructions — that identifies the writing resources registered in the current repo's `## Writing Articles` section, and make every `write-article` skill command call it before acting. Expose the four routines plus one `register writing resources` command, bind them to a new `writer` agent-mode, and roll out first in `$MANAGEMENT`, whose `_guide.md` advertises its `_ops/writing` kit. Domain: Messages is the reference domain throughout — every resource kind is checked against its counterpart.

## Mandatory Reading

::READ `$DOMAINS/plans/structures/plan.art` (Structure) — Describe the work-item changes through a series of iterations and commits with detailed instructions.

---

## Path Variables

| Variable     | Resolved Path                    | Purpose                                            |
| ------------ | -------------------------------- | -------------------------------------------------- |
| `$WORKSPACE` | Current working directory        | Workspace root directory; hosts the domain source. |
| `$PROJECT`   | `$WORKSPACE/checkouts/art-domains` | Where this plan and its backlogs live.           |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains`     | Domain resources under change.                     |
| `$SKILLS`    | `$WORKSPACE/.agents/skills`      | Agent modes and skills directory.                  |
| `$MANAGEMENT`| `$WORKSPACE/checkouts/management`| Source of the routines; first rollout target.      |

## Summary

One `Domain: Writing` modelling articles with `Structure: Article` and the `Type: Article Status` lifecycle, holding four article routines whose inputs — templates, tone of voice, annotation taxonomy, comms guides — are injected per repo; one `write-article` skill whose five commands all resolve local writing resources through Routine: Read Writing Articles Instructions; a `register writing resources` command that writes the `## Writing Articles` section of a repo's `_guide.md`; the `writer` agent-mode binding it all. Each routine sets the article status explicitly — draft `DRAFT`, review `REVIEWED`, integrate `AUTHORED`; the `READY` switch has no routine yet. First rollout in `$MANAGEMENT`.

## Attachments

- `./plan__writing-spec.md` (Reference) — Structured spec per resource kind — Definitions, Skill, Routines, Integration, Conventions — plus the review criteria for the final pass and a verbatim appendix of the source parking-lot entry and note.

## Context

### Upstream Work

| Kind        | Path                                                            | Role                                                                       |
| ----------- | --------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Parking Lot | `$MANAGEMENT/_backlog/_parking-lot.md`                          | Source of this plan: actionable item "Extract Domain: Writing" and its note. |
| Milestone   | `$PROJECT/_roadmap/4-next/milestone-domains-one/milestone.md`   | Coordinates this plan within the Art Domains roadmap.                      |

### Required Skills

- `write-plan` — Writes execution plans and implementation instructions. Required for Planning Work Item.
- `render-template` — Renders plan and instruction artefacts. Required for Drafting, Refining.

### Domains

| Domain / Path                                          | Description                                                                     |
| ------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Domain: Plans `$DOMAINS/plans/index.md`                | Inspiration for a new domain with a skill, and the plan-structure conventions.  |
| Domain: Messages `$DOMAINS/messages/index.md`          | Reference domain: comparable skill, commands, routines, structures, types, and the rules each resource kind must satisfy. |
| Domain: Work `$DOMAINS/work/index.md`                  | Shared work-item model and file and template conventions.                       |

### Knowledge

::READ `$DOMAINS/plans/index.md` (Domain) — Inspiration for a new domain and its skill. Relevant for Planning Work Item.
::READ `$MANAGEMENT/_ops/writing/index.md` (Kit) — The source kit: references and the three routines to extract. Relevant for Planning Work Item.
::READ `$DOMAINS/messages/index.md` (Domain) — Reference domain: every resource kind this plan creates has a counterpart there. Relevant for Planning Work Item.

## Scope

Extract `$MANAGEMENT/_ops/writing/routines/` into a new `$DOMAINS/writing/` domain — domain artefact, definitions, `Structure: Article`, `Type: Article Status`, and four routines (`draft-article`, `review-article`, `integrate-feedback`, `read-writing-instructions`) — expose them through one `write-article` skill with five commands, add the `writer` agent-mode, and register `$MANAGEMENT`'s `_ops/writing` kit in its `_guide.md` `## Writing Articles` section.

### Constraints

- **Resources are injected** — domain routines carry no repo paths; templates, tone of voice, annotation taxonomy and comms guides arrive as inputs, resolved per repo by Routine: Read Writing Articles Instructions.
- **Annotations stay in articles** — every authored item carries an annotation: taxonomy tags, plus an optional note explaining, justifying or doubting; annotations are never stripped.
- **The lifecycle is explicit** — `Type: Article Status`: `DRAFT` → `REVIEWED` → `AUTHORED` → `READY`; each routine sets it — draft `DRAFT`, review `REVIEWED`, integrate `AUTHORED`; the `READY` switch has no routine yet and stays manual.
- **Instructions carry a comparable example** — every instructions file that creates a resource embeds the matching resource kind from Domain: Messages — routine against routine, structure against structure, type against type.
- **Routines update the article in place** — the file is the medium; commands own session-chat responses and `_guide.md` writes.
- **Every command reads instructions first** — all five skill commands call Routine: Read Writing Articles Instructions before acting; no command assumes the existence or location of a template or guide.
- **Repo-local resources are advertised, not distributed** — the domain ships the routines; templates, tone of voice, taxonomy and comms stay in the repos that own them, discovered through the guide section.
- **No publishing or blog assumptions** — routines operate on any article file; the Artificials blog is one consumer, not a dependency.

## Work

### Next

Iterations 1–5 DONE (`scaffold-writing-domain` → `add-write-article-skill`) — next: `add-writer-agent-mode`, then `register-management-writing-articles`.

### Blockers

- None.

---

## Operating Instructions

### Setting Up

**Purpose:** Prepare the execution environment. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/setting-up/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm ci # to install dependencies.
npm run ci # to verify build is green before starting
```

### Writing Commit Message

**Purpose:** Write standardized message according to context conventions. Operation of Workflow: Planning Work, defined in `$DOMAINS/work/workflows/planning-work/writing-commit-message/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

1. Read commit message conventions from `$WORKSPACE/knowledge/conventions/writing-commit-message.art`.
2. Write a message following: `{Type}({Scope}): {Description}.` max 120 chars, optionally followed by up 3 bullet points, max 100 chars each.

### Verifying Completion

**Purpose:** Confirms that the work item has been completed and satisfies its intended outcome. Operation of Workflow: Executing Work, defined in `$DOMAINS/work/workflows/executing-work/verifying-completion/operation.art`.

**Instructions:** (From `$WORKSPACE/_guide.md`)

Run from the `$WORKSPACE` root:

```bash
npm run ci # lint, build and test
```

---

## Items:

| Iteration / Instructions                             | Status  |
| ----------------------------------------------------- | ------- |
| Iteration: Scaffold Writing Domain                    | `DONE`   |
| Iteration: Add Article Structure and Status Type       | `DONE`   |
| Iteration: Extract Writing Routines                   | `DONE`   |
| Iteration: Add Read Writing Instructions Routine      | `DONE`   |
| Iteration: Add Write Article Skill and Commands       | `DONE`   |
| Iteration: Add Writer Agent Mode                      | `READY` |
| Iteration: Register Management Writing Articles       | `READY` |
| Iteration: Review Writing Domain Bottom-up            | `READY` |

### Iteration: Scaffold Writing Domain

**Id:** `scaffold-writing-domain`

**Status:** `DONE`

**Purpose:** Establish the domain's identity and boundaries so every later resource lands in a registered home.

**Description:** Add the Writing domain scaffold — purpose, boundaries, definitions — and register it in the domains listing.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/scaffold-writing-domain.md`

**Report:** `./instructions/scaffold-writing-domain__report.md`

**Changes:**

- Add `$DOMAINS/writing/domain.art` — purpose + boundaries: article-writing support; resources injected per repo; annotations permanent; no blog or platform assumptions.
- Add `$DOMAINS/writing/definitions/index.art` — article, annotation, note, article review, writing resources definitions (from `./plan__writing-spec.md`, ## Definitions).
- Modify `$DOMAINS/index.md` — list `Domain: Writing` and its resources (`update-domains`).

**Dependencies:**

- None.

#### Commits:

| ID                             | Repository / Checkout / Branch       | Policy   | Hash   | Status     |
| ------------------------------ | ------------------------------------ | -------- | ------ | ---------- |
| `build-writing-domain-scaffold` | Workspace / `$WORKSPACE` / `building` | `NOPUSH` | `2a0e3fb` | `COMMITTED` |

##### Commit: build-writing-domain-scaffold

**Repository:** Workspace

**Message:**

```
build(domain-writing): Scaffold Domain: Writing.
```

### Iteration: Add Article Structure and Status Type

**Id:** `add-article-structure-and-status-type`

**Status:** `DONE`

**Purpose:** Model the article so routines can set its lifecycle explicitly and commands can reason about its state.

**Description:** Add the Article structure and the article status enum, mirroring how Domain: Messages models its subject — structure against structure, type against type.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/add-article-structure-and-status-type.md`

**Report:** `./instructions/add-article-structure-and-status-type__report.md`

**Changes:**

- Add `$DOMAINS/writing/types/article-status.art` — Primitive: Enum — `DRAFT` (drafted, awaiting review), `REVIEWED` (review written back), `AUTHORED` (feedback integrated and clean), `READY` (manually switched; no routine yet); mirror `$DOMAINS/messages/types/message-type.art`.
- Add `$DOMAINS/writing/structures/article.art` — shape: purpose, description, titles (List(NaturalExpression) — candidate titles), tags, status (Type: Article Status); mirror `$DOMAINS/messages/structures/message-board.art`.
- Modify `$DOMAINS/index.md` — list the new resources (`update-domains`).

**Dependencies:**

- Iteration `scaffold-writing-domain`.

#### Commits:

| ID                               | Repository / Checkout / Branch       | Policy   | Hash   | Status     |
| -------------------------------- | ------------------------------------ | -------- | ------ | ---------- |
| `add-article-structure-and-type` | Workspace / `$WORKSPACE` / `building` | `NOPUSH` | `3358fad` | `COMMITTED` |

##### Commit: add-article-structure-and-type

**Repository:** Workspace

**Message:**

```
build(domain-writing): Add Article structure and article status type.
```

### Iteration: Extract Writing Routines

**Id:** `extract-writing-routines`

**Status:** `DONE`

**Purpose:** Make the three article routines distributable: same behaviour, no hard-coded repo paths.

**Description:** Move the routines from `$MANAGEMENT/_ops/writing/routines/` into the domain, convert them to domain routine format, replace the `$MANAGEMENT` reads with injected inputs, and give each routine a return value.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/extract-writing-routines.md`

**Report:** `./instructions/extract-writing-routines__report.md`

**Changes:**

- Add `$DOMAINS/writing/routines/draft-article.art` — from `$MANAGEMENT/_ops/writing/routines/draft-article.md`; inputs `%seed`, `%advice`, `%templates`, `%annotation-taxonomy`, `%tone-of-voice`, `%comms`; output `%contents` (the annotated article, annotations remaining in the text); sets the article `**Status:**` to `DRAFT`.
- Add `$DOMAINS/writing/routines/review-article.art` — from `$MANAGEMENT/_ops/writing/routines/review-article.md`; inputs `%file`, `%templates`, `%annotation-taxonomy`, `%tone-of-voice`, `%comms`; outputs the annotated article with its `## Review` appended plus `%findings` (status and counts); sets the article `**Status:**` to `REVIEWED`.
- Add `$DOMAINS/writing/routines/integrate-feedback.art` — from `$MANAGEMENT/_ops/writing/routines/integrate-feedback.md`; inputs `%file`, `%templates`, `%annotation-taxonomy`, `%tone-of-voice`, `%comms`; outputs the integrated, swept article plus `%swept` (confirmation and counts); sets the article `**Status:**` to `AUTHORED`.
- Align the article head with `Structure: Article` — `**Purpose:**`, `**Description:**`, `**Titles:**` (candidate titles), `**Tags:**`, `**Status:**` — replacing the draft routine's current head fields.
- Modify `$MANAGEMENT/_ops/writing/index.md` — repoint or drop the routines section; the routines now live in Domain: Writing.
- Delete `$MANAGEMENT/_ops/writing/routines/draft-article.md`, `$MANAGEMENT/_ops/writing/routines/review-article.md`, `$MANAGEMENT/_ops/writing/routines/integrate-feedback.md`.

**Dependencies:**

- Iteration `add-article-structure-and-status-type`.

#### Commits:

| ID                     | Repository / Checkout / Branch       | Policy   | Hash   | Status     |
| ---------------------- | ------------------------------------ | -------- | ------ | ---------- |
| `extract-writing-routines` | Workspace / `$WORKSPACE` / `building` | `NOPUSH` | `7991af1` | `COMMITTED` |
| `repoint-management-writing-index` | Management / `$MANAGEMENT` / `main` | `NOPUSH` | `a5ae869`  | `COMMITTED` |

##### Commit: extract-writing-routines

**Repository:** Workspace

**Message:**

```
migrate(domain-writing): Extract article routines from _ops/writing.
```

##### Commit: repoint-management-writing-index

**Repository:** Management

**Message:**

```
migrate(management): Drop _ops/writing routines; point index at Domain: Writing.
```

### Iteration: Add Read Writing Instructions Routine

**Id:** `add-read-writing-instructions-routine`

**Status:** `DONE`

**Purpose:** Resolve the current repo's writing resources in one place instead of assuming them.

**Description:** Add the routine every skill command calls: identify the `## Writing Articles` section in the repo's guide and extract the registered resources.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/add-read-writing-instructions-routine.md`

**Report:** `./instructions/add-read-writing-instructions-routine__report.md`

**Changes:**

- Add `$DOMAINS/writing/routines/read-writing-instructions.art` — input `%repo-guide` (defaults to the `_guide.md` of the current checkout); read its `## Writing Articles` section; output `%writing-resources` — registered templates, tone of voice, annotation taxonomy, comms guides and other references — plus `%missing` when the section or a resource is absent.

**Dependencies:**

- Iteration `extract-writing-routines`.

#### Commits:

| ID                          | Repository / Checkout / Branch       | Policy   | Hash   | Status     |
| --------------------------- | ------------------------------------ | -------- | ------ | ---------- |
| `add-read-writing-instructions` | Workspace / `$WORKSPACE` / `building` | `NOPUSH` | `6a22f23` | `COMMITTED` |

##### Commit: add-read-writing-instructions

**Repository:** Workspace

**Message:**

```
build(domain-writing): Add read-writing-instructions routine.
```

### Iteration: Add Write Article Skill and Commands

**Id:** `add-write-article-skill`

**Status:** `DONE`

**Purpose:** Give agents one entry point to draft, review and finish articles, with local resources resolved before every action.

**Description:** Add the `write-article` skill — five commands, each starting with Routine: Read Writing Articles Instructions and passing the resolved resources into the routine it drives.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/add-write-article-skill.md`

**Report:** `./instructions/add-write-article-skill__report.md`

**Changes:**

- Add `$SKILLS/write-article/SKILL.md` — front-matter, allowed agent modes (`writer`), mandatory reading, and the commands below.
- Add command `draft article` — inputs `%seed`, `%advice`; invokes Routine: Draft Article with the resolved resources.
- Add command `review article` — inputs `%file`; invokes Routine: Review Article with the resolved resources.
- Add command `integrate feedback` — inputs `%file`; invokes Routine: Integrate Feedback with the resolved resources.
- Add command `read writing articles instructions` — invokes Routine: Read Writing Articles Instructions and reports the registered resources and any missing ones.
- Add command `register writing resources` — inputs the repo's writing resources; writes the `## Writing Articles` section into the repo's `_guide.md`, following the section format in `./plan__writing-spec.md`.
- Modify `$SKILLS/index.md` — list `write-article` (`update-skills`).

**Dependencies:**

- Iteration `add-read-writing-instructions-routine`.

#### Commits:

| ID                   | Repository / Checkout / Branch       | Policy   | Hash   | Status     |
| -------------------- | ------------------------------------ | -------- | ------ | ---------- |
| `add-write-article-skill` | Workspace / `$WORKSPACE` / `building` | `NOPUSH` | `be460b4` | `COMMITTED` |

##### Commit: add-write-article-skill

**Repository:** Workspace

**Message:**

```
build(domain-writing): Add write-article skill with commands.
```

### Iteration: Add Writer Agent Mode

**Id:** `add-writer-agent-mode`

**Status:** `READY`

**Purpose:** Bind the skill to a dedicated mode whose writing mandatory reading is discovered from the repo's guide.

**Description:** Add agent-mode `writer`, allowed the `write-article` skill, discovering its mandatory reading from the `## Writing Articles` section of the current repo's `_guide.md`.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/add-writer-agent-mode.md`

**Changes:**

- Add `.agents/skills/agent-writer/SKILL.md` — mission; mandatory reading discovered from `_guide.md` (`## Writing Articles`); allowed skills (`write-article`, plus `parking-lot`, `rehash`, `english`, `render-template`).
- Modify the agent-modes index, the Codex agent files, and `$WORKSPACE/opencode.json` — register `writer` (`update-agents`).

**Dependencies:**

- Iteration `add-write-article-skill`.

#### Commits:

| ID                 | Repository / Checkout / Branch       | Policy   | Hash   | Status     |
| ------------------ | ------------------------------------ | -------- | ------ | ---------- |
| `add-writer-agent-mode` | Workspace / `$WORKSPACE` / `building` | `NOPUSH` | (TBD)  | `AUTHORED` |

##### Commit: add-writer-agent-mode

**Repository:** Workspace

**Message:**

```
build(domain-writing): Add writer agent mode.
```

### Iteration: Register Management Writing Articles

**Id:** `register-management-writing-articles`

**Status:** `READY`

**Purpose:** Roll the skill out where the writing kit already lives: management becomes the first registered repo.

**Description:** Use the register command in `$MANAGEMENT` to advertise its `_ops/writing` kit in the `_guide.md` `## Writing Articles` section, then verify resolution.

**Instructions Mode:** `INSTRUCTIONS_SELF_CONTAINED_FILE`

**Instructions:** `./instructions/register-management-writing-articles.md`

**Changes:**

- Modify `$MANAGEMENT/_guide.md` — add `## Writing Articles` listing the kit: `$MANAGEMENT/_ops/writing/index.md`, `article-templates.md`, `annotation-taxonomy.md`, `tone-of-voice.md`, `noodlestan-comms.md`; plus pointers to Domain: Writing routines and the `write-article` skill.
- Verify Routine: Read Writing Articles Instructions resolves every listed resource from `$MANAGEMENT/_guide.md`.

**Dependencies:**

- Iteration `add-write-article-skill`.

#### Commits:

| ID                             | Repository / Checkout / Branch   | Policy   | Hash   | Status     |
| ------------------------------ | -------------------------------- | -------- | ------ | ---------- |
| `register-management-writing-articles` | Management / `$MANAGEMENT` / `main` | `NOPUSH` | (TBD)  | `AUTHORED` |

##### Commit: register-management-writing-articles

**Repository:** Management

**Message:**

```
docs(management): Add Writing Articles section to guide.
```

### Iteration: Review Writing Domain Bottom-up

**Id:** `review-writing-domain-bottom-up`

**Status:** `READY`

**Purpose:** Consolidate the domain after the first top-down pass so every layer agrees bottom-up.

**Description:** Walk the resources bottom-up — definitions, routines, skill commands, agent-mode, domain artefacts — applying the review conventions in `./plan__writing-spec.md` (`## Conventions`) to every layer, and trickle all changes up to the routine-invocation format in the skill commands and finally to `domain.art` and the domain index. Executed in session, not delegated — hence no instructions file.

**Instructions Mode:** `INSTRUCTIONS_INLINED_IN_ITERATION`

**Changes:**

- Apply the review conventions — `./plan__writing-spec.md`, `## Conventions` — to every resource.
- Verify every instructions file embeds its comparable reference-domain example — routine against routine, structure against structure, type against type.
- Refine `$DOMAINS/writing/definitions/`, then the four routines in `$DOMAINS/writing/routines/`.
- Trickle all changes up to `$SKILLS/write-article/SKILL.md` — each routine call preceded by its `::READ` directive — and `.agents/skills/agent-writer/SKILL.md`.
- Update `$DOMAINS/writing/domain.art` — final purpose, boundaries, and summary; regenerate `$DOMAINS/writing/index.md` with `Routine: Build Domain Index`; top up `$DOMAINS/index.md` with the finished resource list.
- Repair references broken by the review; run `npm run ci`.

**Instructions:**

- Execute all the changes listed above.
- Present for user review.

**Dependencies:**

- Iterations `add-writer-agent-mode`, `register-management-writing-articles`.

#### Commits:

| ID                      | Repository / Checkout / Branch       | Policy     | Hash   | Status     |
| ----------------------- | ------------------------------------ | ---------- | ------ | ---------- |
| `review-writing-domain` | Workspace / `$WORKSPACE` / `building` | `NOCOMMIT` | (TBD)  | `AUTHORED` |

##### Commit: review-writing-domain

**Repository:** Workspace

**Message:**

```
refactor(domain-writing): Review writing domain bottom-up.
```

---

## Coordination

### Not In Scope

- **Blog content** — articles in `$MANAGEMENT/artificials/content/blog/` are consumers; this plan does not rewrite or restructure them.
- **Publishing the kit as packages** — distribution via npm belongs to the separate instructions-packages effort.
- **Registration in other repos** — only `$MANAGEMENT` registers in this plan; further adoptions happen opportunistically.
- **Templates** — Domain: Writing ships no template resources; article rendering and presentation stay repo-side.

### Evidence

- `$MANAGEMENT/_ops/writing/` — the working kit: index, references, and three routines whose consults are hard-coded to `$MANAGEMENT`.
- Sub-agent feedback on the routines — friction was process-level: broken refs, cross-routine reads, missing criteria; resolved by injected inputs and a self-contained read-instructions routine.
- `$MANAGEMENT/artificials/content/blog/` — four drafts at different maturities, proving demand for review and integrate passes.

### Findings

- Hard-coded `$MANAGEMENT` reads make the routines non-distributable — an adopting repo must rewrite paths by hand.
- The agent chain broke exactly where routines cross-read each other; every routine must be self-contained.
- Repos already keep writing resources locally; discovery needs a convention, not a copy.

### Decisions

- Domain: Writing ships the routines; resources stay repo-side, registered through the guide's `## Writing Articles` section.
- Domain: Messages is the reference domain — every resource this plan creates is checked against its counterpart: routine against routine, structure against structure, type against type, skill against skill.
- The article lifecycle is `DRAFT` → `REVIEWED` → `AUTHORED` → `READY`; routines set the first three statuses explicitly; the `READY` switch has no routine yet.
- Instructions that create a resource embed a comparable example from the reference domain.
- Every `write-article` command starts with Routine: Read Writing Articles Instructions; resources arrive as inputs.
- Routines update the article in place — the file is the medium; `_guide.md` writes belong to the register command.
- The `writer` agent-mode binds the skill; its mandatory reading is discovered from the guide.
- Built top-down (definitions, routines, skill, agent-mode, registration) and consolidated bottom-up in a final review pass applying `./plan__writing-spec.md` conventions.

### Knowledge to Update

- `$DOMAINS/index.md` — add `Domain: Writing`.
- `$SKILLS/index.md` — add the `write-article` skill.
- Agent-modes index, Codex agent files, `opencode.json` — register `writer`.
- `$MANAGEMENT/_guide.md` — add the `## Writing Articles` section.

### Follow Ups

- The source parking-lot item and note "Extract Domain: Writing" were removed from `$MANAGEMENT/_backlog/_parking-lot.md` once this plan was created; their verbatim spec — plus the structured per-kind spec and the review conventions — is preserved in `./plan__writing-spec.md`.
- Reflect this plan in milestone `domains-one` items when it starts executing.
- The ad-hoc writer prompt used in sessions before the skill lands becomes obsolete once `write-article` ships.

### Feedback

- [x] Iteration `scaffold-writing-domain` — DONE, commit `2a0e3fb` (NOPUSH, not pushed); report at `./instructions/scaffold-writing-domain__report.md`. Created `domain.art` and `definitions/index.art` (5 definitions); registered `Domain: Writing` in `$DOMAINS/index.md`. `npm run ci` green; no blockers.
- [x] Iteration `add-article-structure-and-status-type` — DONE, commit `3358fad` (NOPUSH, not pushed); report at `./instructions/add-article-structure-and-status-type__report.md`. Created `types/article-status.art` (4 lifecycle options) and `structures/article.art` (5 fields, status by reference); refreshed `$DOMAINS/index.md`. `npm run ci` green; no blockers.
- [x] Iteration `extract-writing-routines` — DONE, commits `7991af1` (workspace) and `a5ae869` (management), both NOPUSH not pushed; report at `./instructions/extract-writing-routines__report.md`. Created 3 routines with injected inputs and explicit statuses (`DRAFT`/`REVIEWED`/`AUTHORED`); deleted the source routines and repointed the kit index. `npm run ci` green in both repos; no blockers.
- [x] Iteration `add-read-writing-instructions-routine` — DONE, commit `6a22f23` (NOPUSH, not pushed); report at `./instructions/add-read-writing-instructions-routine__report.md`. Created `routines/read-writing-instructions.art` returning `%writing-resources` and `%missing`, data only, no defaults. `npm run ci` green; no blockers.
- [x] Iteration `add-write-article-skill` — DONE, commit `be460b4` (NOPUSH, not pushed); report at `./instructions/add-write-article-skill__report.md`. Created `$SKILLS/write-article/SKILL.md` with 5 commands, all resolving resources via Routine: Read Writing Articles Instructions; listed in `$SKILLS/index.md`. `npm run ci` green; no blockers.
