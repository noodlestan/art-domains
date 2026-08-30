# Workspace CLI

The workspace CLI package (`@art-domains/workspace-cli`, binary `art-workspace`) orchestrates cross-repo work for the Noodlestan ecosystem. It clones repositories, branches across them, symlinks packages for local development, checks repository status, and publishes packages.

## Recommended Reading

Agents SHOULD scan these files for relevant clarifications when faced with ambiguity or omissions that may result from missing definitions.

- `_guide.md` — the workspace CLI overview, plan workflow, and agent interactions.
- `_backlog/_parking-lot.md` — the current work-in-progress tracker with actionable items, pending work, blockers, and follow-ups.
- `_backlog/_architect.md` — the forward-looking architect plan with principles, NFRs, and follow-ups.
- `architecture/index.md` — How the workspace CLI is structured, how it works, and its use cases.
- `architecture/config.md` — The configuration system.
- `architecture/commands.md` — The command surface, procedures, and edge cases.
- `architecture/context-model.md` — Records and `WorkspaceContext`, `CheckoutStore`, `Checkout`.
- `architecture/operations-log.md` — How operations are logged.
- `architecture/reports.md` — How state and operation logs are presented.
- `architecture/_pseudo.md` — the CLI pseudo-code contract: data structures, use cases, and auxiliary functions.
- `$WORKSPACE/.agents/domains/plans/definitions/index.md` — plan, implementation-instruction, delegation, and report definitions.
- `$WORKSPACE/.agents/domains/plans/files/index.md` — plan, instruction, delegation, and report file conventions.
- `$WORKSPACE/.agents/domains/plans/structures/plan.art` — plan record fields and statuses.
- `$WORKSPACE/.agents/domains/plans/templates/` — plan, instruction, and report templates.
- `$WORKSPACE/.agents/domains/engineering/_guide.md` — working agreements and agent modes.

## Package Layout

```
_backlog/           — parking lot, briefings, plans, instructions, reports
_records/           —
architecture/       — architecture index, topic docs, and decision records (records/adr)
src/                — the CLI source (commands, config, shared, private)
CHANGELOG.md
```

## Records Management

Records are co-located with the resources they describe in `_records/` directories:

- **Package:** `_records/package.art`
- **Deployment:** - `_records/npm-deployment.art`

## Knowledge References

This package maintains:

- an architecture reference at `architecture/index.md` describing commands, models, reports, configuration, and logs.
- decision records at `architecture/records/adr`.

## Workflows

### Planning Work

- The backlog lives at `_backlog/` with subdirectories such as `/3-now` and `/4-next/`.
- The short-term focus is captured in `_backlog/_parking-lot.md` .
- The requirements, use cases, and principles are captured in `_backlog/_architect.md`.

## Operating Instructions

### Operating Instructions: Setting Up

**Instructions:**

Run from the repository root (monorepo):

```bash
npm ci # to install dependencies.
```

### Operating Instructions: Verifying Step

**Instructions:**

Run from this package directory:

```bash
npm run lint:fix # to fix formatting issues automatically
npm run lint # to report other issues (prettier, eslint, tsc --noEmit)
npm run test # to run all tests
npm run build # to produce a full build
```

### Operating Instructions: Verifying Completion

**Instructions:**

Run from this package directory:

```bash
npm run ci # lint, build and test
```
