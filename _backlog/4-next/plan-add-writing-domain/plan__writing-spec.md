# Spec: Writing Domain

**Purpose:** provide agents with reusable article-writing routines — draft, review, integrate feedback — working against each repo's own writing resources.

**Description:** create new "Domain: Writing" with a skill, four routines, and a guide-registration command; extract and refactor the routines living in `$MANAGEMENT/_ops/writing/routines/`.

**Boundaries:** no blog or platform assumptions; annotations stay in articles; repo-side resources are registered, not distributed.

## Path Variables

| Variable     | Resolved Path                     | Purpose                                  |
| ------------ | --------------------------------- | ---------------------------------------- |
| `$WORKSPACE` | Current working directory         | Workspace root directory; hosts the domain source. |
| `$MANAGEMENT`| `$WORKSPACE/checkouts/management` | Source kit and first registered repo.    |

## Context

**Use Case:** As a user I want agents to write, review and finish articles consistently, using the templates, tone of voice and taxonomy of the repo they are working in.

**Examples:**

- Source kit in action: `$MANAGEMENT/_ops/writing/` — index, references, and the three routines.
- First consumers: `$MANAGEMENT/artificials/content/blog/` — annotated blog drafts.

## Definitions

### Definition: Article

A written piece modelled by `Structure: Article` — purpose, description, titles (the possible titles), tags, status — materialised as a markdown file carrying taxonomy annotations that remain in the text after every pass.

### Definition: Article Status

The lifecycle of an article: `DRAFT` → `REVIEWED` → `AUTHORED` → `READY`. Drafting sets `DRAFT`, review sets `REVIEWED`, feedback integration sets `AUTHORED`; the switch to `READY` is manual — no routine performs it yet.

### Definition: Annotation

An own-line comment — `<!-- tags — optional note -->` — attached to the item it describes: taxonomy tags first, then an optional note. Lists are annotated as one block.

### Definition: Note

The optional free-text part of an annotation — explains, justifies, or doubts a choice; never carries tags.

### Definition: Article Review

A `## Review` section appended after `---`: a `**Status:**` (`READY` when every finding is `fixed`, `CHANGES PROPOSED` otherwise) and one finding per pass, sub-items allowed, each marked `fixed` (mechanical, applied in place) or `proposed` (touches argument, content, structure or voice).

### Definition: Writing Resources

The repo-side references an article routine needs: article templates, tone of voice, annotation taxonomy, comms guidance, and any extra writing guides the repo registers.

## Skill

### Skill: Write Article

`write-article` skill, allowed to `writer`.

- command draft article (uses routine draft article)
- command review article (uses routine review article)
- command integrate feedback (uses routine integrate feedback)
- command read writing articles instructions (uses routine read writing articles instructions)
- command register writing resources (command only — writes the guide section)

Every command starts by invoking Routine: Read Writing Articles Instructions against the current repo's guide, and passes the resolved `%writing-resources` into the routine it drives. Commands own session-chat responses and `_guide.md` writes.

### Command: Draft Article

- inputs: `%seed` + optional `%advice`
- resolves `%writing-resources` via Routine: Read Writing Articles Instructions
- invokes Routine: Draft Article with the seed, advice, and the resolved templates, taxonomy, tone of voice and comms

### Command: Review Article

- inputs: `%file`
- resolves `%writing-resources`
- invokes Routine: Review Article with the file and the resolved resources

### Command: Integrate Feedback

- inputs: `%file`
- resolves `%writing-resources`
- invokes Routine: Integrate Feedback with the file and the resolved resources

### Command: Read Writing Articles Instructions

- inputs: `%repo-guide` — defaults to the `_guide.md` of the current checkout
- invokes Routine: Read Writing Articles Instructions and reports the registered resources and any missing ones

### Command: Register Writing Resources

- inputs: the repo's writing resources — paths to templates, tone of voice, taxonomy, comms, extras
- writes the `## Writing Articles` section into the repo's `_guide.md`, in this format:

```md
## Writing Articles

Agent instructions for drafting, reviewing and finishing articles in this repo.
Resolved by Routine: Read Writing Articles Instructions for every `write-article` command.

- ::READ `./_ops/writing/index.md` (Kit) — writing kit index: references and routines.
- ::READ `./_ops/writing/article-templates.md` (Templates) — article outline templates.
- ::READ `./_ops/writing/annotation-taxonomy.md` (Taxonomy) — annotation vocabulary.
- ::READ `./_ops/writing/tone-of-voice.md` (Guide) — tone of voice.
- ::READ `./_ops/writing/noodlestan-comms.md` (Guide) — communication guidance.
```

## Routines

### Routine: Draft Article

- inputs: `%seed`, `%advice`, `%templates`, `%annotation-taxonomy`, `%tone-of-voice`, `%comms`
- output: `%contents` — fully written, annotated article
- behaviour carried over from `$MANAGEMENT/_ops/writing/routines/draft-article.md`: establish intent; load the guides; choose a skeleton; design structure; outline the head and sections; develop — ALWAYS authoring an annotation with the content it describes, tags plus an optional note; five review passes. Annotations remain in the article. Sets the article `**Status:**` to `DRAFT`, head aligned to `Structure: Article`.

### Routine: Review Article

- inputs: `%file`, `%templates`, `%annotation-taxonomy`, `%tone-of-voice`, `%comms`
- outputs: the article annotated in place with `## Review` appended; `%findings` — status and counts
- annotate every item (lists as one block); five passes; write the review back; set the article `**Status:**` to `REVIEWED` — the `## Review` `**Status:**` remains the review verdict (`READY`/`CHANGES PROPOSED`), distinct from the article lifecycle.

### Routine: Integrate Feedback

- inputs: `%file`, `%templates`, `%annotation-taxonomy`, `%tone-of-voice`, `%comms`
- outputs: the integrated, swept article; `%swept` — confirmation and counts
- scan markers (`<!-- WIP -->`, `<!-- FEEDBACK -->`, `(...)`, `## Review`); apply `proposed`, verify `fixed`; complete incomplete prose; eliminate markers and the review; update annotations; run the five passes with a stopping rule; final sweep; set the article `**Status:**` to `AUTHORED` — the `READY` switch stays manual.

### Routine: Read Writing Articles Instructions

- inputs: `%repo-guide` — path to the repo guide (defaults to the `_guide.md` of the current checkout)
- outputs: `%writing-resources` — registered templates, tone of voice, annotation taxonomy, comms guides and other references; `%missing` — absent section or resources
- read the guide's `## Writing Articles` section; resolve every listed resource; report what is missing rather than assuming defaults.

## Structures

### Structure: Article

- shape: purpose, description, titles — List(NaturalExpression) — the possible titles —, tags, status (Type: Article Status)
- mirror: `Structure: Message Board` in Domain: Messages — compare structure against structure.

## Types

### Type: Article Status

- Primitive: Enum
- values: `DRAFT` — drafted, awaiting review, `REVIEWED` — review written back, `AUTHORED` — feedback integrated and clean, `READY` — manually switched; no routine yet
- mirror: `Type: Message Type` in Domain: Messages — compare type against type.

## Integration

### Integration: Management Rollout

`$MANAGEMENT` is the first registered repo: its `_guide.md` gains the `## Writing Articles` section advertising the `_ops/writing` kit in the format above. Every other adoption repeats the register command.

### Integration: Writer Agent Mode

Agent-mode `writer` binds the `write-article` skill; its mandatory writing reading is discovered from the `## Writing Articles` section of the current repo's guide through Routine: Read Writing Articles Instructions — the agent scans the guide, discovers the section, and identifies templates and other references.

## Reference Domain

### Reference: Messages

Domain: Messages is the reference domain — every resource kind here has a counterpart whose requirements and rules apply:

| This plan                  | Counterpart in Domain: Messages |
| -------------------------- | ------------------------------- |
| Skill: Write Article       | Skill: Messaging                |
| Commands (one per routine) | Commands (one per routine)      |
| Routines                   | Routines                        |
| Structure: Article         | Structure: Message Board        |
| Type: Article Status       | Type: Message Type              |
| Templates and files        | None — presentation stays repo-side |

Instructions that create a resource embed the matching example from its counterpart — routine against routine, structure against structure, type against type.

## Conventions

Review criteria applied bottom-up to every resource in the final review pass:

- verify `::READ` directives reference all resources used in file
- verify routine format follows standards with clear Inputs and Outputs; every routine returns something
- verify routines carry no repo paths — all resources arrive as inputs
- verify every skill command invokes Routine: Read Writing Articles Instructions before any other routine
- verify annotations in examples carry taxonomy tags plus one or two notes
- verify examples stay platform-free — the blog appears only as an example
- verify every instructions file that creates a resource embeds its comparable example from Domain: Messages
- verify each routine sets the article status explicitly — draft `DRAFT`, review `REVIEWED`, integrate `AUTHORED`
- trickling all changes up to routine invocation format in skill commands — includes routine call preceded by `::READ`
- finally to domain.art summary and domain index.md, topping up with domains/index.md

## Appendix: Source Parking-Lot Item

Verbatim entry and note removed from `$MANAGEMENT/_backlog/_parking-lot.md`:

> - Extract **Domain: Writing** — routines live in a domain, exposed through a `write-article` skill and a new `writer` agent-mode. Details in Notes.

### Extract Domain: Writing

**Purpose:** Distribute the writing routines as a reusable artificial domain, exposed through a skill and an agent-mode.

**Description:** Move `_ops/writing/routines/` to `$WORKSPACE/.agents/domains/writing/routines/` as the new Domain: Writing.

**Changes:**

- Create `$DOMAINS/writing/routines/` with `draft-article`, `review-article`, `integrate-feedback`.
- Replace the `$MANAGEMENT` reads in the routines (templates, annotation taxonomy, tone of voice) with injected inputs.
- Expose the routines through a `write-article` skill.
- Create agent-mode `writer` binding the skill, discovering its mandatory reading from `_guide.md`.
- Rollout: management `_guide.md` advertises them in a new `## Writing Articles` section; agents scan the guide, discover the section, and identify templates and other references.
