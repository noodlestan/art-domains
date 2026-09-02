# Parking Lot: Workspace CLI

The high level briefing, principles, requirements are in `_roadmap/_architect.md`. Backlog plans are derived from here.
The plans live in `_backlog/` and contain delegatable instructions.
This file is the tracker and parking lot. Column convention: **ACTIONABLE** / **PENDING** / **BLOCKER** / **FOLLOW-UPS** (not in scope). No done items here — completed work is recorded in `_backlog/`.

## Parking Lot

### PENDING FEATURES

None current.

### ACTIONABLE

- **Fix `--version` showing stale version** — `npm run workspace -- --version` shows `0.0.9` but package is at `0.0.14`. Investigate why version is not being read from package.json correctly.
- **Fix operations log shows repo name instead of checkout** — investigate if all operations add a checkout - it's possible that a clone operation failure logs only the repository name or (unnknown) and bails out without determining a loggable checkout name - change report to present 2 columns repo and "checkout" - ALSO: change the checkouts column "location" to be "checkout" as well.
- **Implement checkout name resolution** — `resolveCheckoutByName` is designed in `architecture/_pseudo.md` (commit `040b07e`) but `src/commands/repo/runRepo.ts` still calls `getCheckoutByName` directly; the `repo` command still doesn't accept checkout names.
- **Verify remaining bugs** — check if other bugs in the BUGS table are still valid (clone edge cases, extraneous items, etc.)
- **Add `checkouts` param to pull/push/sync commands** — follow-up from `plan-implement-pull-push-sync`: allow pull/push/sync on specific checkouts.

### PENDING

- **Injectable Presentation** — Testing command usage of presentation layer requires setup mocking or assertion on presenters. Consider refactoring presentation to make it injectable. Configuration and the strategy pattern would go a long way here.

- **Formalize Publishing Workflow** — formalize the publish-then-symlink pattern into a `Workflow: Publishing` resource. Define agent modes, skills (`publishing-workflow`), and commands. Integration with plan files: when a plan reaches `DONE` status, the publishing workflow identifies what needs publishing. Feeds off `_backlog/1-done/`. Related to `$WORKSPACE/.agents/domains/changelogs/` — publishing triggers changelog generation.

- **Formalize Delivery Workflow** — create a `Workflow: Delivery` resource in `$WORKSPACE/.agents/domains/engineering/_guide.md` that captures the full delivery cycle: Planning → Delegation → Execution → Publishing → Changelog. Agent modes: architect, delegator, worker. Skills: `planning-workflow`, `publishing-workflow` (new), `write-changelog`.

- **Investigate `$WORKSPACE/.agents/domains/changelogs/`** — separate domain for changelog management. Should be dependency of engineering domain (like plans). Own structures, agent modes (if any), skills. `write-changelog` skill already exists — may need expansion. Changelogs generated from completed plans in backlogs. Example: `_backlog/1-done/`.

- **Prepare `@art-domains/workspace` domain** — after `@art-domains/workspace-cli` is established, prepare the domain package to host workspace structures and other resources, including a reference to the CLI companion package.

- **Reverse edge resolution** — `purrpose → @no-comply/solid-primitives` is still using `file:` resolution. After no-comply packages are published to npm, rewire to npm version.

- **repo-ci** — GitHub Actions workflows for all repos. **DRAFT** — needs instruction file. Not priority.

- **Update CLI README** — match format of other CLI READMEs in the ecosystem, preserving command summary.

### BLOCKER

- None current.

### FOLLOW-UPS (not in scope)

- Evaluate turbo remote caching for cross-repo builds.
- Release cadence and versioning strategy across repos.
- What happens to `NOCOMPLY.md` and root docs after the rename?
- Archive the legacy `noodlestan/eslint-config` repo after its package is consumed via npm.
