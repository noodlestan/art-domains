# Guide: Art Domains

> Host and manage the Art Domains planning artefacts.

This repository hosts the Art Domains planning artefacts only: the roadmap, the backlogs, the knowledge references, and the records.

The Art Domains source code lives in the workspace repository, in `$DOMAINS` (Domains) and `$SKILLS` (Skills). Nothing in this repository defines or ships domain or skill source; it plans and tracks the work that changes them.

Uses Workflow: Planning Work with one backlog per package, coordinating with Workflow: Roadmapping from one project-wide roadmap.

## Path Variables

| Variable     | Resolved Path                | Description                                               |
| ------------ | ---------------------------- | --------------------------------------------------------- |
| `$WORKSPACE` | Current working directory    | Workspace repository hosting the domain and skill source. |
| `$DOMAINS`   | `$WORKSPACE/.agents/domains` | Art-managed domains (source code).                        |
| `$SKILLS`    | `$WORKSPACE/.agents/skills`  | Art-managed agent modes and skills (source code).         |
| `$PROJECT`   | Current checkout             | This repository: the Art Domains roadmap and backlogs.    |

## Recommended Reading

Agents SHOULD scan these files for relevant clarifications when faced with ambiguity or omissions that may result from missing definitions.

- `_guide.md` — this file: system overview, layout, setup, verification.

## Repository Layout

```
_backlog/           — plans, instructions, reports
_roadmap/           — milestones, briefing, and roadmapping parking lot
_records/           — records (project, repository, namespaces, scripts, scaffolding)
knowledge/          — index, ADRs, reference domain model and workflows
```

## Projects

| Project            | Guide       | Backlog     | Roadmap     |
| ------------------ | ----------- | ----------- | ----------- |
| Art Domains (root) | `_guide.md` | `_backlog/` | `_roadmap/` |

## Records Management

Records are co-located with the resources they describe in `_records/` directories:

- **Project:** `_records/project.art`
- **Repository:** `_records/repository.art`
- **Namespaces:** `{namespace}/_records/namespace.art`
- **Packages:** `{package-path}/_records/package.art`
- **NPM Deployments:** `{package-path}/_records/npm-deployment.art`
- **APP Deployments:** `{app-path}/_records/spa-deployment.art`

## Knowledge References

This repository maintains a knowledge reference at `knowledge/index.md` and decision records at `knowledge/adr`.

## Conventions

This repository follows strict conventions.

Read the convention indexes listed below and follow them when planning and executing work.

The following conventions apply to all packages in this repository:

::READ `./node_modules/@noodlestan/conventions-typescript/art/index.md` — TypeScript conventions.
::READ `./node_modules/@noodlestan/conventions-unit-tests/art/index.md` — Unit Test conventions.

In case of ambiguity or conflict applying conventions, follow links from the convention indexes to extended convention files and read the examples there for what to follow and what to avoid.

## Workflows

Projects in this repository use the following workflows:

| Workflow / Path                                                           | Purpose                                                                                           |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Roadmapping** `$DOMAINS/roadmaps/workflows/roadmapping/workflow.art`    | Organize roadmap creation and maintenance and coordination of downstream work items.              |
| **Planning Work** `$AGENTS/work/workflows/planning-work/workflow.art`     | Create and manage work item lifecycles, collecting operational instructions according to context. |
| **Delegating Work** `$AGENTS/work/workflows/delegating-work/workflow.art` | Organize work delegation to sub-agents with validation, execution, and verification.              |
| **Executing Work** `$AGENTS/work/workflows/executing-work/workflow.art`   | Organize work execution by sub-agents to produce completed, verified outcomes and feedback.       |
| **Deploying** `$DOMAINS/deployments/workflows/deploying/workflow.art`     | Organizes deployment of artefacts in operations.                                                  |

### Roadmapping

- The roadmap lives at `_roadmap/` with subdirectories such as `/3-now` and `/4-next/`.
- The short-term roadmapping focus is captured in `_roadmap/_parking-lot.md`.
- The requirements, use cases, and principles are captured in `_roadmap/_architect.md`.

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
