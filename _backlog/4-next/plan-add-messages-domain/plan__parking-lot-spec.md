# Attachment: Messages Domain — Source Parking Lot Spec

Verbatim copy of the actionable item "Create Plan: Add Messages Domain" from `$PROJECT/_backlog/_parking-lot.md` (Parking Lot: Art Domains Backlog), captured before the item was removed from the parking lot. The plan distills this spec; this file keeps the original wording, including fragments the plan intentionally normalised.

---

- **Create "Plan: Add Messages Domain"** in `4-next/` status `PLANNING`
  - Purpose: provide an effective, low-noise,tool for agents to send persisted messages to other agents.
  - Description: create new "Domain: Messages" with skills, routines, structures, types, and templates.
  - Context:
    - "Domain: Whiteboards" – now composes a parking lot but it has proved inneficient and noisy for passing messages. It will change to compose also a message board and adapt their routines to route messages through message board instead of
    - USe case \_backlog/whiteboard-art-records/whiteboard\_\_feedback-1.md
    - Evidence of \_backlog/whiteboard-art-records/whiteboard\_\_feedback-1.md
  - Changes:
    - `messaging` skill (all agents allowed)
      - command write a message
      - command read incoming messages (uses routine indeify inboxes, process messages, read message, )
    - routine identify inboxes (output inboxes)
    - routine process messages (input inboxes)
    - routine read message (input message and message medium)
      - take action on message. Example: "convert to own parking lot itemn", "synchronously update resources according to request"
      - if message medium is
      - if mes or attach to artefact/purge ()
      - use routine write message to reply
        - if response is long (more tham 1000 chars), identify path to message in
        - if response is short (less than 200 chars), identify message board (default to same as incoming message)
        - if response is in between these boundaries, decide whether to compress to short message or use, taking the opportunity to add more details to the message if you believe it helps the recipient
    - routine write message (input `message` + `%bypass-clean-check` - boolean + `%response-to` (optional) incoming message)
      - if `%message.medium` is an artefact carrying a message board
        - read message board, its instructions and its state
        - if medium contains instructions such as "you can only write during your designated turn" and you can't currently satisfy then the medium is unavailable
        - if checkout path of medium is not clean (uncommitted files present), and the medium's own instructions do not explicitly allow writing when checkout is not clean, and `%bypass-clean-check` not true, then the medium is unavailable
        - if medium file itself is uncommitted and the medium's own instructions do not explicitly allow writing when medium is modified, and `%bypass-clean-check` not true, then the medium is unavailable
      - if medium is a long message
        - decide the path on the recipient's side from your current context
        - if there is no obvious path, read recipients relevant instructions to determine path. Example: `_guide`.
        - if checkout path of medium is not clean and `%bypass-clean-check` is not true, then the mdium is unavailable
      - if medium is available
        - write message to medium, stage and commit according to medium stated rules or your own context when medium has no rules
        - if write was impeded for some reason then the medium is unavailable
      - if medium is unavailable
        - if message is short, park message at the top of the actionable column of your own parking-lot
        - if message is short, park message at the top of the actionable column of your own parking-lot
      - if message is a response, with `%response-to` as `%incoming`:
        - if `%incoming` medium is a message board and the medium is availabale, delete `%incoming` from the medium
        - if `%incoming` medium is a file decide:
          - whther to integrate it into another artefact. Examples: incorporating into a knowledge resource, improving a plan or a plan attachment.
          - or to keep it as an attachment to another artefact. Examples: compressing, annotating, or refining the incoming message and attaching it to a plan.
          - or to delete it - if contents are not relevant anymore, do not keep it around for historical purposes
          - rule: integrate the messages contents into the knowledge in your artefacts (attaching it to another artefact constitutes integration) without carrying references to message itself as a source of findings or decision (the message is short-lived and will be deleted soon)
    - type: message - from, to, message type, timestamp, content, medium (Path: path to message file or artefact carrying message board)
    - type: message type – Primitive: OpenEnum, Values: `ASK` - expects a response, `REQUEST` - may expect a response, `INFORM` - may expect an acknowledgement, `ANSWER` - alias of `INFORM` for responses to `ASK`, `REPORT` - alias of `INFORM` for responses to `REQUEST`.
    - structure: message board. shape: name, purpose, description, mesages: List of messages, instructions: List(natural expessage) List of custom instructions to observe when reading form or writing to the message board.
    - read and write routines take an input `%medium` which can be a file (long message written to a separate file, not immedately discard) or a message board (short messages written, discarded when read and actioned by receiver somewhere else if applicable. Example: converted to a task in a local parking local)

then they will use the message board in the whiteboards and rewrite instructions so that all messages are sent via (and purged asap from) the message board in the whiteboard
