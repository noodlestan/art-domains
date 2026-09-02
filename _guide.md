# Guide: Art Domains

> Host and manage the Art Domains packages and tools, and their planning artefacts.

Monorepo containing the Art Domains roadmap, architecture knowledge, domain libraries source code and their backlogs.

Uses Workflow: Planning Work with one backlog per package, coordinating with Workflow: Roadmapping from one project-wide roadmap.

## Recommended Reading

Agents SHOULD scan these files for relevant clarifications when faced with ambiguity or omissions that may result from missing definitions.

- `_guide.md` — this file: system overview, layout, setup, verification.

## Repository Layout

```
_backlog/           — plans, instructions, reports
_records/           — records (project, repository, namespaces, scripts, scaffolding)
architecture/       — index, ADRs, reference domain model and workflows
cli/                - Node.JS CLI packages.
```

## Projects

| Project            | Guide                     | Backlog                   |
| ------------------ | ------------------------- | ------------------------- |
| Art Domains (root) | `_guide.md`               | `_backlog/`               |
| Workspace CLI      | `cli/workspace/_guide.md` | `cli/workspace/_backlog/` |

## Records Management

Records are co-located with the resources they describe in `_records/` directories:

- **Project:** `_records/project.art`
- **Repository:** `_records/repository.art`
- **Namespaces:** `{namespace}/_records/namespace.art`
- **Packages:** `{package-path}/_records/package.art`
- **NPM Deployments:** `{package-path}/_records/npm-deployment.art`
- **APP Deployments:** `{app-path}/_records/spa-deployment.art`

## Knowledge References

This repository maintains an architecture reference at `architecture/index.md` and decision records at `architecture/records/adr`.

## Workflows

Projects in this repository use the following workflows:

| Workflow / Path                                                           | Purpose                                                                                           |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Planning Work** `$AGENTS/work/workflows/planning-work/workflow.art`     | Create and manage work item lifecycles, collecting operational instructions according to context. |
| **Delegating Work** `$AGENTS/work/workflows/delegating-work/workflow.art` | Organize work delegation to sub-agents with validation, execution, and verification.              |
| **Executing Work** `$AGENTS/work/workflows/executing-work/workflow.art`   | Organize work execution by sub-agents to produce completed, verified outcomes and feedback.       |
| **Deploying** `$AGENTS/work/workflows/executing-work/workflow.art`        | Organizes deployment of artefacts in operations.                                                  |

### Planning Work

- The backlog lives at `_backlog/` with subdirectories such as `/3-now` and `/4-next/`.
- The short-term focus is captured in `_backlog/_parking-lot.md`.
- The requirements, use cases, and principles are captured in `_backlog/_architect.md`.

## Operating Instructions

### Operating Instructions: Setting Up

**Instructions:**

Run from the repository root (monorepo):

```bash
npm ci # to install dependencies.
```

### Operating Instructions: Verifying Completion

**Instructions:**

Runs automatically on pre-commit hook (from the repository root):

```bash
npm run ci # lint, test and build
```
