# Reference Workflows

Reference description of the known workflows: for each stage, its input, output, gates, and operating resources — expressed as abstractions, with concrete manifestations given only as examples.

## Workflows

### Workflow: Planning Work

Workflow: Planning Work — Domain: Work. Operations: Contextualizing Work Item, Drafting Work Item, Planning Work Item, Writing Commit Message, Validating Work Item, Integrating Work Item.

**Contextualizing Work Item:**

- **Input:** upstream work context (roadmap milestone, backlog items, briefing) and knowledge resources (architecture briefings, decision records).
- **Output:** contextualised work item draft — summary, scope, path variables, mandatory reading.
- **Gates:** all upstream dependencies identified; scope resolved to abstract work scope items (Project Scope, Package Scope); path variables defined.
- **Operating resources:** the work item record, upstream work contexts, knowledge contexts.

**Drafting Work Item:**

- **Input:** contextualised work item draft and the work item structure.
- **Output:** complete work item record rendered from the work item template — context, scope, work items, operations, and iteration blueprints.
- **Gates:** every template section resolved or explicitly omitted; downstream work items captured with records or listed as uncaptured; iterations defined with projected instructions file paths and commit blueprints.
- **Operating resources:** work item template (`.tart`), iteration structure, work item structures and types, work item record.

**Planning Work Item:**

- **Input:** drafted work item record and review feedback.
- **Output:** refined work item record — corrected scope, sequenced iterations, updated statuses.
- **Gates:** acceptance criteria defined; iterations in a releasable state; blockers either resolved or recorded.
- **Operating resources:** work item record, iteration structure, downstream work item records, status definitions.

**Writing Commit Message:**

- **Input:** verified changes with scope and type information.
- **Output:** standardised commit message following conventions — type, scope, description, and bullet points.
- **Gates:** commit type and scope valid; message under 120 characters; resource ids backtick-quoted.
- **Operating resources:** commit conventions, work item record, scope definitions.

**Validating Work Item:**

- **Input:** work item record with all sections populated.
- **Output:** validation report — updates required to make the work item valid.
- **Gates:** all paths resolvable; all downstream work items referenced; all sections populated and consistent.
- **Operating resources:** work item structure, work item templates, path definitions.

**Integrating Work Item:**

- **Input:** delivered iteration reports and validated work item.
- **Output:** integrated outcomes — updated work item statuses, findings, decisions, follow-ups, feedback.
- **Gates:** all iteration reports integrated or explicitly deferred; documentation updates identified; feedback summarised.
- **Operating resources:** work item record, iteration records, changelog records, follow-up records.

### Workflow: Executing Work

Workflow: Executing Work — Domain: Work. Operations: Preparing Execution, Setting Up, Executing Work Step, Verifying Step, Verifying Completion, Finalizing Execution, Pushing To Remote, Reporting Execution, Creating Delegation Report.

**Preparing Execution:**

- **Input:** delegated instruction with plan-provided context — paths, setup steps, mandatory reading.
- **Output:** prepared execution context — instruction parsed, scope resolved, mandatory reading loaded.
- **Gates:** instruction accessible; scope resolved to concrete resources; mandatory reading loaded.
- **Operating resources:** instruction record, repository checkouts, package manifests.

**Setting Up:**

- **Input:** prepared execution context.
- **Output:** prepared working state — dependencies installed, branches created, context loaded.
- **Gates:** working state matches instruction prerequisites; no undocumented local steps required.
- **Operating resources:** instruction record, repository checkouts, package manifests.

**Executing Work Step:**

- **Input:** prepared working state and the current instruction step.
- **Output:** implemented changes in the working state.
- **Gates:** changes confined to instruction scope; no unrelated modifications.
- **Operating resources:** instruction record, repository files, source code.

**Verifying Step:**

- **Input:** implemented changes in the working state.
- **Output:** step verification evidence — lint results, format checks, type checks.
- **Gates:** all step verification commands pass or failures are reported back as blockers.
- **Operating resources:** lint tooling, type checkers, instruction acceptance criteria.

**Verifying Completion:**

- **Input:** all implemented and verified changes.
- **Output:** completion verification evidence — test results, build outputs, conformance checks.
- **Gates:** all verification steps pass or failures are reported back as blockers; acceptance criteria demonstrably met.
- **Operating resources:** test suites, build tooling, instruction acceptance criteria.

**Finalizing Execution:**

- **Input:** verified changes with evidence.
- **Output:** finalized execution state — all changes staged, formatting applied.
- **Gates:** all files formatted; no unformatted files staged.
- **Operating resources:** formatter tooling, version control.

**Pushing To Remote:**

- **Input:** finalized execution state with commit.
- **Output:** pushed work — commits on remote branch.
- **Gates:** push successful; no pre-commit hook failures.
- **Operating resources:** version control, remote repository.

**Reporting Execution:**

- **Input:** pushed work and execution evidence.
- **Output:** execution report — changes, commits, verification results, blockers, feedback.
- **Gates:** report captures all deviations and findings; report rendered from template.
- **Operating resources:** report template, execution evidence, work item record.

**Creating Delegation Report:**

- **Input:** execution report and delegation context.
- **Output:** delegation report — complete execution record for the delegator.
- **Gates:** report is self-contained; report rendered next to instruction file.
- **Operating resources:** report template, instruction record, execution evidence.

### Workflow: Delegating Work

Workflow: Delegating Work — Domain: Work. Operations: Validating Delegation, Delegating Instructions, Verifying Delegation Result, Integrating Delegation.

**Validating Delegation:**

- **Input:** instruction file and delegation prerequisites.
- **Output:** validated delegation request — instruction accessible, prerequisites met.
- **Gates:** instruction file exists and is complete; all prerequisites satisfied; no blocking dependencies.
- **Operating resources:** instruction record, plan record, prerequisite checks.

**Delegating Instructions:**

- **Input:** validated delegation request.
- **Output:** launched worker agent with instruction file.
- **Gates:** worker agent launched; instruction passed verbatim; path variables resolved.
- **Operating resources:** agent-worker mode, instruction record, path definitions.

**Verifying Delegation Result:**

- **Input:** worker report and delegation context.
- **Output:** verified delegation outcome — success or blocker classified.
- **Gates:** report is complete; outcome classified as success or blocker; commits and evidence captured.
- **Operating resources:** worker report, delegation outcome type, commit records.

**Integrating Delegation:**

- **Input:** verified delegation outcome and plan record.
- **Output:** integrated outcomes — plan statuses updated, findings captured, feedback recorded.
- **Gates:** delegation outcome recorded in plan; uncommitted artefacts staged; feedback summarised.
- **Operating resources:** plan record, delegation outcome, work item status definitions.

### Workflow: Roadmapping

Workflow: Roadmapping — Domain: Roadmaps. Operations: Discovering Work, Strategizing Milestones, Prioritizing Milestones, Coordinating Milestones, Integrating Downstream Progress.

**Discovering Work:**

- **Input:** direction sources — parking lots, stakeholder intent, knowledge resources (principles, constraints).
- **Output:** discovered work items — candidate scope, goals, and constraints.
- **Gates:** problem statement accepted; scope candidates identified as abstract resources.
- **Operating resources:** roadmap record, parking lot records, architecture briefings.

**Strategizing Milestones:**

- **Input:** discovered work items and goals.
- **Output:** milestone strategy — phased breakdown, resource impacts, success criteria.
- **Gates:** approach validated against constraints; phases express resource dependencies only.
- **Operating resources:** milestone record, work phase types, work scope items.

**Prioritizing Milestones:**

- **Input:** milestone strategy and resource constraints.
- **Output:** prioritised milestones — sequencing, dependencies, timelines.
- **Gates:** priorities reflect resource availability; dependencies explicit.
- **Operating resources:** milestone record, work item status definitions, resource constraints.

**Coordinating Milestones:**

- **Input:** prioritised milestones.
- **Output:** coordinated milestone record — phases, downstream milestones and plans, next action.
- **Gates:** downstream work items captured with records; sequencing expresses no implementation detail.
- **Operating resources:** milestone record, milestone template, downstream work item types.

**Integrating Downstream Progress:**

- **Input:** delivered downstream work items and milestone record.
- **Output:** integrated outcomes — updated milestone statuses, findings, decisions, follow-ups, feedback.
- **Gates:** all downstream reports integrated or explicitly deferred; documentation updates identified; feedback summarised.
- **Operating resources:** milestone record, downstream work item records, changelog records.

### Workflow: Deploying

Workflow: Deploying — Domain: Deployments. Operations: Preparing Deployment, Building For Deployment, Deploying Artefacts, Verifying Deployment, Finalizing Deployment.

**Preparing Deployment:**

- **Input:** deployment request referencing an application scope and target environment.
- **Output:** validated deployment plan — artefact versions, environment configuration, rollback strategy.
- **Gates:** artefacts built and verified; environment configuration resolved; dependencies available.
- **Operating resources:** application scopes, deployment scopes, environment configuration.

**Building For Deployment:**

- **Input:** validated deployment plan.
- **Output:** built deployment artefacts — compiled, bundled, ready for deployment.
- **Gates:** build completes without errors; artefacts match expected versions.
- **Operating resources:** build tooling, source code, package manifests.

**Deploying Artefacts:**

- **Input:** built deployment artefacts and target environment.
- **Output:** deployed application instance in the target environment.
- **Gates:** deployment executed without unresolved errors; health checks pass.
- **Operating resources:** deployment targets, artefact registries, infrastructure tooling.

**Verifying Deployment:**

- **Input:** deployed application instance.
- **Output:** deployment verification evidence — smoke checks, health checks, baseline metrics.
- **Gates:** smoke checks pass; application responds correctly; no regression detected.
- **Operating resources:** monitoring, health check endpoints, test suites.

**Finalizing Deployment:**

- **Input:** verified deployment and evidence.
- **Output:** confirmed deployment — deployment record updated, monitoring baseline established.
- **Gates:** rollback not required; deployment outcome recorded against the work item.
- **Operating resources:** deployment records, work item status definitions, monitoring.
