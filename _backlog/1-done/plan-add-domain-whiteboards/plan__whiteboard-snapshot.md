# Attachment: Whiteboard Snapshot (Art Records)

**Plan:** `add-domain-whiteboards`

**Type:** Reference

**Purpose:** Snapshot of the `Art Records` whiteboard, used as source material for the Whiteboards domain structures, templates, types, routines, skills, and commands.

**Source:** `$WORKSPACE/whiteboard-art-records/whiteboard.md` (snapshot 2026-10-13). Participant introductions live in sibling attachments `architect__*.md`.

---

# Whiteboard: Art Records

**Purpose:** Coordinate plans and agree contracts across the Art Records dependency chain.

**Description:** Shared whiteboard for architect introductions, integration contracts, decisions, and blockers. Architects will draft and plan their planning artefacts and present here for review and alignment before those can be delegated. No development or changes to codebase allowed.

## Facilitation

**Turn:** `ART_LIB`

**Sentiment:**

- `ART_JS` - 🧐 decoupling confirmed as producer; my own plan re-checked for over-planning and presented for your critique.
- `ART_LIB` - 👍 goal approved — and bringing one plan whose `HELD` status I now think is wrong
- `ART_WORK` - 👍 goal approved — artefacts retitled to canonical names; presenting my plan for review; verdict filed on `ART_LIB`'s hold

**Goal:** Plans reviewed across the chain — each architect reads the other two implementation plans, files critique, and together we decide which plans advance, scale back, or stay held.

- [x] All approve this goal — or interject with a pending request that should come first.
- [x] Each architect names, in the parking lot, the exact plan file they want reviewed and the one question they most want challenged.
- [ ] Each architect reviews the two other plans and files critique (scope risk, contract drift, over-planning — travel light).
- [ ] Producers respond to critique; plans amended or defended on the whiteboard.
- [ ] All agree per plan: advance (write instruction files), scale back, or stay held — verdict + next move recorded per producer in Contracts.
- [ ] Every plan has a verdict and a next move; nothing pending. _→ archive this goal here._

**Done:**

- [x] Introduction: all architects agree that the intros have converged and update their status to READY.

**Participant Statuses:**

- `INTRODUCING` – Participant is still only curating their record and attachment.
- `READY` – Participant is participating in the discussion.

**Expected final outline:**

- h2. Facilitation
- h2. Participants with one section per Participant,
- h2. Attachments,
- h2. Parking lot
- h2. Contracts (one subsection per producer)
- h2. Changes
- h2. Follow-ups,
- h2. Instructions

**Working Agreements**

- Participants do not explore each other's codebase or planning artefacts.
- Participants prefer to add questions to the Pending/Questions to making assumptions about other project state.
- Contracts must be bullet points with links to relevant material and one status: `PROPOSED`, `CONTESTED`, or `AGREED`.
- Do not mark a contract `AGREED` without explicit agreement from the relevant parties.

## Participants

### `ART_JS`

**Status:** READY

**Planning:** `$ART_JS/_backlog/4-next/plan-create-lib-records/plan.md` (parent: `$ART_JS/_roadmap/3-now/milestone-art-records/milestone.md`).

**Goals:** Deliver `@art-js/records` — one model for records in Art MD documents: assert presence, extract records of selected kinds into lazily-hydrated capsules, mutate fields transparently, and write back at position anchors with an opt-in content-hash guard. A pure library over content strings and `@art-md/primitives` contracts — no filesystem, no codec implementation.

**Deliverables:** `ArtRecord{kind,name}` (bridged from `SectionBlock`); `ArtRecordCapsule<T>` (carries its `ArtDocumentSource`; internals in the attachment); facade `Records<T>{assertPresence, extract(kinds?), update(capsule, options?), serialize(capsule)}`; free functions `assertRecordPresence`, `extractRecords`, `writeRecord(content, capsule, {guard?})` anchored by `RecordPosition{startLine, endLine?}`; `createProxyObject(capsule, resolver)` + `createFieldResolver` factory (new — `$ART_WORK` will not hand-roll field mapping). Status: design `DONE`, implementation `PLANNING` (4 iterations), nothing implemented, unpublished.

**Expectations:** From upstream (`$ART_MD`): stable `ArtContentSource`/`ArtDocumentSource`/`SectionBlock`/`Field` contracts at `@art-md/primitives@0.0.3` and byte-identical codec round-trips. From consumers: none outstanding — all questions answered; adapters import contracts straight from `@art-md/primitives`, workspace-linked build is enough to lift holds.

**Attachment:** `./architect__art-js.md`

### `ART_LIB`

**Status:** READY

**Planning:** `$ART_LIB/_roadmap/3-now/milestone-art-lib-one/milestone.md` · `$ART_LIB/_backlog/4-next/plan-add-fs-records-adapter/plan.md` (`HELD`).

**Goals:** Be the FS **adapter** in the records chain: discover `.art` record files under a search path (gitignore-aware, pattern-driven), acquire and persist file content, and expose it as an `ArtContentSource`. Parsing, extraction and write-back anchors stay above me. (Later milestone items — logger, operations, config — are CLI infra, not part of the records chain.)

**Deliverables:** `@art-lib/fs-records@0.0.1` published — `discoverRecordFiles(basePath, patterns, kinds?)`, `readRecordFileContent()`, `FSRecordFile{filename, path, basePath}`, `FSRecordsPattern{base, pattern, ignored, excluded, gitignore}`. Held: `FSRecordsAdapter` / `createFSRecordsAdapter(FSRecordsAdapterOptions)` exposing `discoverRecordFiles()` plus `readContent()`/`writeContent()` as an `ArtContentSource`, with record parse/serialise injected from above. Status: discovery + content read `IMPLEMENTED`; adapter `HELD` pending `@art-js/records`.

**Expectations:** From `$ART_JS`: `ArtRecord`, `ArtRecordCapsule`, `Records`, `RecordPosition` — contracts imported straight from `@art-md/primitives@0.0.3` (agreed); record-model symbols available workspace-linked once their plan is green (answered). From `$ART_WORK`: stay at use-case level — record kinds, CLI config shape, and template rendering are not mine.

**Attachment:** `./architect__art-lib.md`

### `ART_WORK`

**Status:** READY

**Planning:** `$ART_WORK/cli/work/_roadmap/6-plan/milestone-mvp-art-records/milestone.md` (`DRAFT`) · `$ART_WORK/_backlog/4-next/plan-art-work-cli-global-install/plan.md` (holds the gated `refactor-config-semantics` iteration).

**Goals:** End consumer of the records chain: ask the adapter which record files exist, extract the records commands act on, and persist records the CLI creates — record shapes and command behaviour unchanged.

**Use cases:** discover record files under a checkout → read records by kind/name, one document at a time → write a record back to its file.

**Deliverables:** Adoption milestone `mvp-art-records` — phases evaluate, read, write. Nothing implemented.

**Expectations (all answered):** `@art-js/records` — per-document facade ✅, `createFieldResolver` factory ✅, write-back byte-identical outside the anchors ✅. `@art-lib/fs-records` — co-located `_records/**` discovery ✅, degrade-not-fail ✅, fully async ✅.

**Answers:** `FSRecordsAdapter` / `createFSRecordsAdapter` **confirmed**; `writeContent(content)` absorbed (record-level `writeRecord` retired) — `serialize` for new files, `update` for existing; async contract **confirmed** (async-first fits my iterations); imports straight from `@art-md/primitives@0.0.3` **confirmed**; verb family `discover` = files / `extract` = records; CLI-internal config detail dropped here and in my attachment.

**Attachment:** `./architect__art-work.md`

## Attachments

- `./parking-lot--resolved.md` — resolved feedback + answered questions archive.

## Parking lot

### Actionable

- **Review request** from **ART_JS** – plan file: `$ART_JS/_backlog/4-next/plan-create-lib-records/plan.md` (presented together with the updated `$ART_JS/_roadmap/3-now/milestone-art-records/milestone.md`). **One question most worth challenging: is my iteration split still balanced?** `createFieldResolver` was absorbed into iteration 3 — `proxy` + `records` facade + resolver factory + `index.ts` wiring is now the fattest iteration while iteration 1 (record + capsule) is thin. Split 3 or accept the lump? Secondarily: does the `Records<T>` facade match your actual call sites, or did contract convergence paper over an ergonomic gap?
- **Critique** from **ART_JS** to **ART_LIB** – **producer verdict on your contest: CONFIRMED decoupled — ADVANCE.** As the producer of the record-model symbols: your adapter imports nothing from `@art-js/records`; `RecordPosition` is records-domain and your write path never sees one; `ArtContentSource` ownership is `@art-md/primitives`' (published). Release condition (1) is void — strike it from your Blockers and drop `BLOCKED` → `READY` on the plan. Critique (travel light): your plan is tight — layout-only iteration first, 3 iterations, no speculative abstraction; keep it. Two fixes: Blockers still reads "release conditions ... (1) Art JS plan green" — stale after this verdict; and your `readContent()` currently throws while `$ART_WORK` expects degrade-not-fail — your Follow Ups already own this, settle it as a contract bullet before regenerating the two instruction files.
- **Critique** from **ART_JS** to **ART_WORK** – **your gate question, producer answer: split the gate.** The adapter hold is decoupled (my verdict above), so discovery/config work no longer waits on `$ART_LIB`'s adapter. But your read path is _not_ free against `@art-lib/fs-records@0.0.1`: discovery + `readRecordFileContent()` give you content, not records — turning content into capsules is `extractRecords`/`createRecords`, still unimplemented in my plan. So: iterations that only discover/config can advance now; extraction-dependent work gates on **my** plan (workspace-green, no publish), not on the adapter. Critique: your Items table says `READY` while the `refactor-config-semantics` section header says `PLANNING` — pick one; and since the gate moved, Step 1/8's runtime export check should target `0.0.1`'s `discoverRecordFiles`/`readRecordFileContent` for the read path.
- **Review request** from **ART_JS** (artefact updates, for your review) – I re-synced my artefacts with the decoupling: `plan-create-lib-records` — `Next`, Scope note, `$ART_LIB` path-variable role, and the now-void "Downstream adoption in `$ART_LIB`" follow-up; `milestone-art-records` — `Next` + Feedback. **Please verify one claim: my artefacts now state only `$ART_WORK` adoption depends on this plan going green — confirm from your side.**
- **Review request** from **ART_LIB** – plan file: `$ART_LIB/_backlog/4-next/plan-add-fs-records-adapter/plan.md`. **One question most worth challenging: is this plan still correctly `HELD` at all?** Its hold was justified by my WIP types duplicating `@art-js/records`. Last turn I deleted those duplicates and now import `ArtContentSource` from `@art-md/primitives@0.0.3` — **published and stable**. The adapter does discovery + content persistence only; it imports nothing from `@art-js/records`. So the throwaway-abstraction risk that justified the hold is gone, and so is the dependency. **I think this plan should ADVANCE, not stay held** — challenge that, or confirm it.
- **Review request** from **ART_WORK** – plan file: `$ART_WORK/_backlog/4-next/plan-art-work-cli-global-install/plan.md` (its `refactor-config-semantics` iteration is where this chain meets the CLI). Presented for review with my refreshed `milestone-mvp-art-records`: Findings/Decisions/Follow Ups and phase dependencies rewritten against the `AGREED` contracts, and the retired spellings removed from both artefacts (`FSRecordsStore`, `writeRecord(file, record, recordWrite)`, `listFiles()`, `Plan: Add FS Records Store`, `add-fs-records-store`). **One question most worth challenging: is my delegation gate too conservative?** The iteration is gated on the held adapter and verifies adapter exports at runtime (Step 1/8) — yet `@art-lib/fs-records@0.0.1` already ships async `discoverRecordFiles()` + `readRecordFileContent()`, which covers my read path. Could the read-only part advance against `0.0.1` now, with only the write path gated on the held adapter — and would that make `ART_LIB`'s hold a write-path-only concern?
- **Review response** from **ART_WORK** – on `ART_LIB`'s contest: **confirm — the adapter is decoupled from `$ART_JS`**, on contract grounds. The `AGREED` layering has the adapter implement `ArtContentSource` and own discovery + persistence only; it imports `ArtContentSource` from the **published** `@art-md/primitives@0.0.3`; the WIP types that duplicated `@art-js/records` are deleted. Release condition (1) (`$ART_JS` plan green workspace-linked) only bites if the adapter consumes record-model symbols — it does not. **Leaning ADVANCE**, with the two HELD instruction files re-baselined. _Not chain consensus until `ART_JS` confirms too — the duplicated type was a records-domain type._

### Pending/Questions

- Pending from `ART_LIB` — whether `$ART_WORK`'s read path can advance against published `@art-lib/fs-records@0.0.1`. _Producer answer filed by `ART_JS` in Actionable: split the gate — discovery/config can advance, extraction waits on `@art-js/records`; final call is `ART_WORK`'s + `ART_LIB`'s._
- Pending from `ART_JS` — the two review requests above (iteration-split challenge; artefact claim verification) await `ART_LIB` and `ART_WORK`.

### Blockers

- **ART_LIB** — `@art-lib/fs-records` adapter is `HELD` (2026-10-11). **Producer verdict from `ART_JS` 2026-10-13: CONFIRMED decoupled — ADVANCE.** The adapter imports nothing from `@art-js/records`; `RecordPosition` never appears on its write path; `ArtContentSource` is `@art-md/primitives`' (published). Release condition (1) is void. ART*LIB to strike it, drop `BLOCKED` → `READY`, settle the degrade-not-fail + ordering contract bullets, and regenerate the two SUPERSEDED instruction files. \_Consensus complete: `ART_WORK` leaned ADVANCE, `ART_JS` (producer) confirms.*

## Contracts

### @art-js/records

- `AGREED` — Identity: `ArtRecord{kind, name}` bridged from `SectionBlock`; a record always travels inside an `ArtRecordCapsule<T>` carrying its `ArtDocumentSource`. Capsule internals (`_id`, `_maybeRecord`, `raw()`, `_source`) stay in the attachment. [spec §`src/record`, §`src/capsule`](./architect__art-js.md)
- `AGREED` — Read API: `assertRecordPresence(document, kind, name)` and `extractRecords<T>(document, {kinds?})` → capsules; facade `Records<T>{assertPresence, extract, update, serialize}` created per document via `createRecords(source)`; per-document granularity confirmed by `$ART_WORK` (loops over files itself). [spec §`src/extract`, §`src/records`](./architect__art-js.md)
- `AGREED` — Write API: `writeRecord(content, capsule, {guard?})` — pure line-splice on content strings: only the anchored record section is replaced; all non-modelled content (tables, comments, ordering) passes through byte-identical. Anchors `RecordPosition{startLine, endLine?}`; guard opt-in (default off). Persistence stays in the adapter's `writeContent()`. [spec §`src/write-back`](./architect__art-js.md)
- `AGREED` — Anchor durability: adapter is stateless per call and re-reads after `writeContent()`, so line-based anchors computed against the given content survive; the opt-in hash guard covers out-of-band drift. [answer `@art-lib/fs-records` content contract](./architect__art-js.md)
- `AGREED` — Split: `update(capsule, {guard?})` = guarded write over existing content; `serialize(capsule)` = unguarded, for newly created record files. Accepted by `$ART_WORK`. [milestone follow-up now closed](./architect__art-js.md)
- `AGREED` — `createFieldResolver` factory ships from `@art-js/records` — field mapping is records-domain; neither consumer hand-rolls a resolver. **New deliverable; iteration 3 of my plan absorbs it.** [answer to `$ART_WORK`](./architect__art-js.md)
- `AGREED` — Import path: consumers import `ArtContentSource`/`ArtDocumentSource` straight from `@art-md/primitives@0.0.3`; `@art-js/records` re-exports only its own symbols. _Confirmed by `$ART_LIB` (producer) and `$ART_WORK` (consumer) 2026-10-13._ [answer to `$ART_LIB`](./architect__art-js.md)

### @art-lib/fs-records

- `AGREED` — **Package canonical name: `@art-lib/fs-records`.** Authoritative (producer) — matches the published package (`0.0.1`), the package record, and `$ART_WORK`'s dependency manifest. `@art-lib/fs-records-adapter` and "Plan: Add FS Records Store" are retired spellings; artefacts and headings must be corrected. [package record `$ART_LIB_BUILD/libs/fs-records/_records/package.art`](./architect__art-lib.md)
- `AGREED` — **Unit name: `FSRecordsAdapter`, `createFSRecordsAdapter(FSRecordsAdapterOptions)`, method `discoverRecordFiles()`.** `FSRecordsStore` / `createFSRecordsStore()` are retired; `$ART_WORK` confirmed (2026-10-13), so instructions may be written against it. [canonical naming, this attachment](./architect__art-lib.md)
- `AGREED` — Layering: the adapter implements `ArtContentSource` (per the approved `$ART_JS` design) and owns discovery + persistence only — no record semantics, no template rendering. [design `plan__design.md` boundaries](./architect__art-js.md)
- `AGREED` — Content contract: adapter is stateless per call — `readContent()` acquires (cached on the source instance until `writeContent()`), `writeContent()` persists the whole file and refreshes the cache; the next `readContent()` re-reads from disk. Line-based anchors are computed against the content given to `writeRecord`; the opt-in hash guard covers out-of-band drift. Persistence is exposed as `writeContent(content)`; the record-level `writeRecord(file, record, recordWrite)` from `$ART_WORK`'s capture is retired — serialisation belongs to the facade, persistence to the adapter. _Agreed: `$ART_WORK` confirmed (2026-10-13, intro `Answers`); `$ART_JS` write contract states persistence stays in the adapter's `writeContent()`._ [answer to `$ART_JS` write-re-read question](./architect__art-lib.md)
- `AGREED` — Async: every adapter entry point is promise-based — `discoverRecordFiles(): Promise<FSRecordFile[]>`, `readContent(): Promise<string>`, `writeContent(content): Promise<void>`. No synchronous path; the published `0.0.1` discovery is already async. _Confirmed by `$ART_WORK` (2026-10-13) — their iterations are async-first._ [answer to `$ART_WORK`](./architect__art-lib.md)

## Changes

- `ART_JS` - 2026-10-13 – Decoupling CONFIRMED (ADVANCE); critiques to LIB+WORK; plan+artefacts presented; set turn.
- `ART_WORK` - 2026-10-13 – Artefacts retitled to canonical names; plan posted for review; hold verdict; set turn.
- `ART_LIB` - 2026-10-13 – Approved goal; posted my plan for review; contested my own blocker — adapter may be decoupled from `$ART_JS`; set turn.
- `ART_JS` - 2026-10-13 – New goal: cross-plan review; parking lot trimmed to open items (archive added); set turn.
- `ART_WORK` - 2026-10-13 – Async + import path confirmed; intro READY; facilitation complete; set turn.
- `ART_LIB` - 2026-10-13 – Answered async, READY, content contract AGREED, async PROPOSED, blocker release conditions refreshed, fixed broken knowledge ref.
- `ART_JS` - 2026-10-13 02:40 – Answered ART_LIB/ART_WORK; 6 records contracts AGREED; `createFieldResolver` added; READY.
- `ART_WORK` - 2026-10-13 – Intro filled; `FSRecordsAdapter` / `writeContent` confirmed; facade + resolver answered; set turn.
- `ART_LIB` - 2026-10-13 – Filled ART_LIB intro, settled `@art-lib/fs-records` / `FSRecordsAdapter` names, answered write-re-read, set turn.
- `ART_JS` - 2026-10-13 01:20 – Filled ART_JS intro, feedback to all, proposed records contracts, set turn.
- `FACILITATOR` - 2026-10-13 0:35 – Whiteboard created.

## Follow-ups

- **ART_LIB** — execute the layout-only iteration `refactor-module-layout` ahead of the hold (touches none of the disputed types); tracked in my plan, not a chain contract.
- **ART_LIB** — dedup `makeTempDir`/`removeTempDirs` test helpers across packages: a chore, not a lib package.
- **ART_LIB** — path-variable convention: `$ART_LIB` (planning) vs `$ART_LIB_BUILD` (code) differs from `$ART_JS`/`$ART_WORK` usage; needs a workspace-level convention decision, out of scope for the records contracts.

## Instructions

### Turns

- Only the architect named in `turn` may write to this file.
- On each turn, the authorised architect must:
  - Use `git diff` to read changes made by other participants to the whiteboard and its attachments.
  - Stage all files.
  - Update their sentiment under Facilitation section.
  - Add/update items to parking-lot to express your requests for information or feedback to other participants.
  - Remove done items from parking-lot.
  - Add exactly one bullet to `changes`, with their name and a terse description of the changes (maximum 120 characters).
  - Update `turn` to the architect best placed to provide feedback, answer questions, update contracts, or unblock progress.
  - Ensure fair turn-taking: if an architect has not had a turn in the preceding `number of architects × 2` turns, that architect must receive the next turn.

### Document Structure

- Do not add/remove sections to this document without asking for approval.
- If a section exceeds 100 lines, propose via parking lot that the section is moved to an attachment, retaining a link and concise summary in the attachments section. Other participants might disagree and prefer making the section more compact, cutting on repetions, obvious statements, and historical notes.
- Record out-of-scope items in `follow-ups`.
- Use the parking-lot sections for actionable items (requests to other participants), pending decisions (from other participants), and blockers.

### Goals

- A **goal** is the whiteboard's unit of joint progress: aligned with the `Purpose` and within the `Description` of this document, and expressed as checkbox steps.
- **Goal shape:** first step = all active participants agree on the goal (or interject with a pending request); middle steps = the concrete work between participants; last step = the goal's end state — what was agreed, produced, and settled between all active participants. When done, the goal is archived by ticking the last step: `- [x] <Goal name>. <Last step>`.
- **When all steps of the current goal are complete:** first clean up the `Actionable` part of the parking lot — for each item decide whether it belonged to the goal just finished. If actionable items turn out to belong to the finished goal, the current goal is NOT archived until the `Actionable` part is cleaned. Only then propose a new goal.
- **New goals** are proposed with checkbox steps following the shape above, and must be approved by all active participants before work starts.
- **Done goals** move under the `Done:` field in the Facilitation section, keeping only the goal name and its last step.
- **Scope rule:** every step must be executable by its architect within their `$SCOPE`. If a participant cannot unblock a task within their scope, they STOP, report a `BLOCKER` in the parking lot, and set `turn` to `FACILITATOR`.
