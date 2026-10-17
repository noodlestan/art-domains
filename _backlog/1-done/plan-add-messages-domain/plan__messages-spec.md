# Spec: Messages Domain

**Purpose:** provide an effective, low-noise, tool for agents to send persisted messages to other agents.

**Description:** create new "Domain: Messages" with skills, routines, structures, types, and templates.

**Boundaries:** no plans or work-item assumptions — plans may only appear as an example.

## Path Variables

| Variable     | Resolved Path                 | Purpose                                                              |
| ------------ | ----------------------------- | -------------------------------------------------------------------- |
| `$WORKSPACE` | Current working directory     | Workspace root directory; hosts the domain source.                   |
| `$ART_JS`    | `$WORKSPACE/checkouts/art-js` | Example of poor comunication and message board in action (see spec). |

## Context

**Use Case:** As a user I want agents to send effective messages to each other without getting buried in walls of text.

**Examples:**

- Example of message board (handcrafted without skills) in action: `$ART_JS/_backlog/_parking-lot.md`
- Example of poor communication due to lack of a proper messaging medium: `$ART_JS/_backlog/whiteboard-art-records/whiteboard__feedback-1.md`

## Definitions

### Definition: Message

A short-lived communication from a sender to a receiver. Discarded once processed by the receiver; nothing is kept for historical purposes. Its contents are integrated into the artefact where they belong, never cited as a source of findings or decisions.

### Definition: Message Board

An artefact — or a section of an artefact — carrying short messages, with its own instructions: its state, and custom instructions to observe when reading from or writing to the board. The default medium for short messages; discarded when read and actioned by the receiver — the receiver may convert a message into a task in its own local parking lot.

### Definition: Medium

Where a message is written. Can be a file — a long message written to a separate file, not immediately discarded — or a message board — short messages, discarded when read and actioned by the receiver.

### Definition: Inbox

An artefact in the current context carrying a message board.

## Skill

### Skill: Messaging

`messaging` skill, allowed to ALL agents.

- command write a message
- command read incoming messages (uses routine identify inboxes, process messages, read message)

The actual writes/responses in session chat happen in commands only; routines take data in and return data out. Every routine call in a command is preceded by its `::READ` directive.

### Command: Write a Message

- inputs: `message` + `%bypass-clean-check` — boolean + `%response-to` — optional incoming message
- invokes Routine: Write Message with the inputs, capturing its outputs
- the command composes the session-chat response

### Command: Read Incoming Messages

- invokes Routine: Identify Inboxes, then Routine: Process Messages, then Routine: Read Message per incoming message
- the command reports and responds in session chat

## Routines

### Routine: Identify Inboxes

- output: inboxes

### Routine: Process Messages

- input: inboxes

### Routine: Read Message

- input: message and message medium
- take action on message. Example: "convert to own parking lot item", "synchronously update resources according to request"
- or attach to artefact / purge
- use routine write message to reply
  - if response is long (more than 1000 chars), identify path to message file
  - if response is short (less than 200 chars), identify message board (default to same as incoming message)
  - if response is in between these boundaries, decide whether to compress to short message or use file, taking the opportunity to add more details to the message if you believe it helps the recipient

### Routine: Write Message

- input `message` + `%bypass-clean-check` + `%response-to` — optional incoming message
- read and write routines take an input `%medium` which can be a file — long message, not immediately discarded — or a message board — short messages, discarded when read and actioned by the receiver
- if `%message.medium` is an artefact carrying a message board
  - read message board, its instructions and its state
  - if medium contains instructions such as "you can only write during your designated turn" and you can't currently satisfy then the medium is unavailable
  - if checkout path of medium is not clean — uncommitted files present — and the medium's own instructions do not explicitly allow writing when checkout is not clean, and `%bypass-clean-check` not true, then the medium is unavailable
  - if medium file itself is uncommitted and the medium's own instructions do not explicitly allow writing when medium is modified, and `%bypass-clean-check` not true, then the medium is unavailable
- if medium is a long message
  - decide the path on the recipient's side from your current context
  - if there is no obvious path, read recipients relevant instructions to determine path. Example: `_guide`
  - if checkout path of medium is not clean and `%bypass-clean-check` is not true, then the medium is unavailable
- if medium is available
  - write message to medium, stage and commit according to medium stated rules or your own context when medium has no rules
  - if write was impeded for some reason then the medium is unavailable
- if medium is unavailable
  - if message is short, park message at the top of the actionable column of your own parking-lot
- if message is a response, with `%response-to` as `%incoming`:
  - if `%incoming` medium is a message board and the medium is available, delete `%incoming` from the medium
  - if `%incoming` medium is a file decide:
    - whether to integrate it into another artefact. Examples: incorporating into a knowledge resource, improving a plan or a plan attachment
    - or to keep it as an attachment to another artefact. Examples: compressing, annotating, or refining the incoming message and attaching it to a plan
    - or to delete it — if contents are not relevant anymore, do not keep it around for historical purposes
  - rule: integrate the message's contents into the knowledge in your artefacts — attaching it to another artefact constitutes integration — without carrying references to the message itself as a source of findings or decision — the message is short-lived and will be deleted soon

## Structures

### Structure: Message Board

- shape: name, purpose, description, messages: List of messages, instructions: List(NaturalExpression) — custom instructions to observe when reading from or writing to the message board

## Types

### Type: Message

- shape: from, to, message type, timestamp, content, medium — Path: path to message file or artefact carrying a message board

### Type: Message Type

- Primitive: OpenEnum
- values: `ASK` — expects a response, `REQUEST` — may expect a response, `INFORM` — may expect an acknowledgement, `ANSWER` — alias of `INFORM` for responses to `ASK`, `REPORT` — alias of `INFORM` for responses to `REQUEST`

## Templates

### Template: Message Board

Renders a message board: identity, messages, and the board's own instructions. A message-board section renders ahead of any parking-lot section when embedded in an artefact — the `.message-board` comes before parking-lot in structures, templates, and routine logic.

### Template: Message

Renders a long message written to a file.

## Files

### File: Message

Naming pattern `message-{message.id}.md`; template reference; medium-availability scoping — workspace-vs-`checkouts/*`.

## Integration

### Integration: Message Board in Whiteboards

Then they will use the message board in the whiteboards and rewrite instructions so that all messages are sent via — and purged asap from — the message board in the whiteboard.

Context: "Domain: Whiteboards" composes a parking lot but it has proved inefficient and noisy for passing messages. It will change to compose also a message board and adapt its routines to route messages through the message board instead.

- `.message-board` comes before parking-lot in structures/templates and routine logic
- in routines, when processing send/receive messages or parking lot items in general — classify item as message or parking lot item
- item is message:
  - message have a sender and receiver and are discarded after processed by receiver
  - classify as `ASK`/`INFORM`/`REQUEST`/`ANSWER`/`REPORT`
  - do not add it to — or remove if already in — the `%whiteboard.parking-lot`
  - write to the `%whiteboard.message-board` following the message rules. Example: line length limit
- item is parking lot item:
  - write to parking lot
  - deduplicate and compress other related items
- actionable parking lot items have an owner, no sender, and an async outcome. Removed when captured somewhere else AND the whiteboard is not pending on the outcome. Examples:
  - "`ART-JS` – Write plan instructions for participants to review" — kept until plan is authored and shared with whiteboard
  - "`ART_MD` - Archive previous milestone to reduce noise" — kept until milestone is archived
- pending parking lot items — eventually — have an owner, no sender, and an async outcome. Similar to actionable, but not actionable yet because no owner yet, tracked until they become actionable or superseded
- blockers — eventually — have an owner, no sender, identify what is blocked by the item

## Conventions

Review criteria — soon to be art conventions — applied bottom-up to every resource in the final review pass:

- verify `::READ` directives reference all resources used in file
- verify routine format follows standards with clear inputs/output
- verify routines do not directly write to files
- verify routines always return something
- verify examples in routines, structures and templates do not carry assumptions that messages are about plans — plans can only be used as an example
- trickling all changes up to routine invocation format in skill commands — includes routine call preceded by `::READ`
- finally to domain.art summary and domain index.md, topping up with domains/index.md
