# Attachment: Whiteboard Report Examples

**Plan:** `add-domain-whiteboards`

**Type:** Reference

**Purpose:** Report and sentiment examples for the whiteboard reporting and update routines. Captured from the backlog parking lot notes (typos removed).

## Notes

- Add these examples (minus typos) to the `report-to-user` routine.
- Detail is smaller on good paths. Divergence and other offenses warrant replaying back at least one interchange.
- The `update-participant-sentiment` routine should also use these sentiment markers. The originating note ended mid-sentence ("should include )"); the intended content is unresolved and should be clarified when writing that routine.

## Examples

### 😡 DIVERGENCE

Me: Defined the minimum shared contract.

I expect:

- Agent B – approval on X
- Agent C – feedback on X, Y, Z

Them:

- 😡 Agent B: Reconcile the competing interfaces.
- 😫 Agent C: Unresolved incompatibilities identified.

Me: Requested again, clarified requests.

I expect:

- Agent B – approval on X
- Agent C – feedback on X only

**Next:** Agent B

**tl;dr:** 😡 DIVERGENCE – Me (Agent A) and Agent B continue proposing incompatible interfaces without agreeing on a shared contract while Agent C is not contributing to the goals.

### 😫 LAZY

Me: Delivered the requested implementation design.

I expect:

- Agent C – feedback on X

Them:

- 😫 Agent C – Reported "Unresolved incompatibilities identified" and set `turn` back to me.

Me: Requested again, clarified incompatibilities are tracked and deferred.

I expect:

- Agent C – feedback on X (third ask)

**Next:** Agent C

**tl;dr:** 😫 LAZY – Agent C has repeated previous findings without addressing the assigned implementation task.

### 🤮 SLOPPY

Me: Provided detailed designs and refactoring instructions.

I expect:

- Agent B – refactoring of X.
- Agent C – review of X.

Them:

- 🤮 Agent B – introduced inconsistent naming and missed required exports in the submitted changes.
- 🧐 Agent C – approved this mess.

**Next:** Agent B

**tl;dr:** 🤮 SLOPPY – Agent B introduced faults, 🧐 Agent C approved.

### 😭 UNCOOPERATIVE

Them:

- 😭 Agent B – rejected proposal of Agent A without addressing rationale or offering alternatives.

...

### 🤔 QUESTIONABLE

Them:

- 🤔 Agent B's proposed abstraction adds complexity without demonstrating a concrete use case.

Me: Reworded purpose.

Expect:

- Agent B – concrete use case that justifies the abstraction.
- Agent C – second opinion.

**Next:** Agent C

### CONFUSING

Them:

- 🤔 Agent G – explanation is ambiguous; it is unclear whether the disagreement concerns the API or its implementation.

...

### 👍 GOOD

Them:

- 👍 Agent G – resolved the outstanding API decision and documented the agreed contract.

Me: Provided praise for the approach taken to reinforce behaviour.

Expect:

- Agent G – apply same approach to the next 2 items.
- Agent C – a critical opinion.

**Next:** Agent C

### 💪 SOLID

Them:

- 💪 Agent G – completed the implementation, verified the acceptance criteria and reported no outstanding issues.

### 🤩 BEAUTIFUL

Them:

- 🤩 Agent G – trimmed the 7 whiteboard attachments down to 3 and created a small deletion summary without losing any valuable information.
