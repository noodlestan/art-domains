# Reference Model

Reference model of the domain landscape: for each domain, its boundaries expressed as relationships ordered from strongest to weakest. Relationships are described at the level of abstract concepts; concrete manifestations appear only as examples.

Three kinds of relationships are distinguished throughout:

- **Work items** and their relationships — dependencies, sequencing, composition, coordination.
- **Resources in work scope** and their relationships to work items — operations, dependencies, ownership.
- **Knowledge resources** and their relationships to work items and resources — architecture, patterns, conventions, pseudo code.

## Domain Boundaries

### Domain Boundaries: Work

- **Primitives** are directly depended upon — Work builds its abstractions on primitive types (paths, references, names), but makes no assumptions beyond the primitive contracts.
- **Roadmaps and Plans** extend Work's abstract work item — Milestone and Plan are concrete work items that inherit identity, status, context, scope, attachments, and lifecycle from Work — but Work makes no assumptions about how they organise, sequence, or complete their work.
- **Packages, Deployments, and Repositories** provide concrete manifestations of Work's abstract work scope item — Package Scope, Deployment Scope, and Repository Scope relate resources to work items through the abstract scope contract (resource, path, record, owner, role, changes, dependencies) — but Work knows them only as scoped resources and makes no assumptions about their shape or operations.
- **Workflows, operations, and routines** are hosted by Work — the abstract work-item model, work scope, workflows (Planning Work, Executing Work, Delegating Work), operations, and routines are owned by this domain — but the abstract contracts do not prescribe how planning or execution are performed.

### Domain Boundaries: Roadmaps

- **Work** is directly depended upon — Roadmaps coordinate milestones, which extend abstract work items and reuse Work abstractions for scope, upstream and downstream work items, phases, status, and context.
- **Knowledge** is consumed — Roadmaps use knowledge resources to ground the Discovering Work, Strategizing Milestones, and Prioritizing Milestones operations, including architecture briefings, principles, and constraints, but make no assumptions about their shape.
- **Work** feeds Roadmaps — work items discovered during Scoping feed milestone direction, state, and candidate work, but Roadmaps can be created and used without a backlog.
- **Plans** may be coordinated by Roadmaps — Roadmaps sequence milestones and plans against each other and may reference plans as downstream work items, but make no assumptions about plan internals beyond the abstract work item contract.
- **Conventions** ground Roadmaps — convention files and drafts provide naming, structure, and process rules that Roadmaps follow, but Roadmaps can be created and used without conventions.

### Domain Boundaries: Plans

- **Work** is directly depended upon — Plans extend abstract work items and use Work abstractions for work scope, upstream work items, downstream work items, workflows, operations, status, context, attachments, and phases.
- **Knowledge** is consumed — Plans use knowledge resources to provide context for planning and execution, including knowledge, patterns, conventions, guides, and decision records, but make no assumptions about their shape.
- **Work** advancing items through execution — Plans express execution intent (setup, verification, instructions) that the Executing Work workflow consumes as input, but Plans make no assumptions about how implementation is performed or verified.
- **Work** may inform Plans — Plans may receive direction, state, or work from work items, but can be created and used independently.
- **Roadmaps** may inform Plans — Roadmaps may provide upstream work, direction, or context for Plans, but Plans can be created and used independently of Roadmaps and make no assumptions about their shape.

### Domain Boundaries: Repositories

- **Work** is directly depended upon — Repositories define a concrete work scope type extending the abstract work scope item, expressing how repository resources participate in work items.
- **Packages** may be contained by Repositories — package source conventionally lives inside repository working trees, but Repositories remain usable without hosting packages.
- **Workspaces** may coordinate Repositories — a workspace may register multiple repositories and coordinate their checkouts, but Repositories are independently usable.

### Domain Boundaries: Packages

- **Work** is directly depended upon — Packages define a concrete work scope type extending the abstract work scope item, expressing how package resources participate in work items.
- **Packages** may depend on Packages — package-to-package dependency graphs are internal to this domain (libraries consuming libraries), resolved through declared versions.
- **Repositories** may host Packages — package source conventionally lives inside repository working trees, but Packages remain independently buildable and publishable.
- **Applications** may consume Packages — applications bind to published package APIs at integration time, but Packages make no assumptions about their consumers.
- **Deployments** may carry Packages — deployment infrastructure may deploy package artefacts into environments, but Packages make no assumptions about deployment mechanics.

### Domain Boundaries: Deployments

- **Work** is directly depended upon — Deployments define a concrete work scope type extending the abstract work scope item, expressing how deployment targets participate in work items.
- **Applications** are assumed — Deployments deploy application artefacts into environments, a conventional producer/consumer relationship that leaves both domains independently usable.
- **Environments** are owned by Deployments — targets, stages, and promotion rules are internal to this domain and invisible to other domains except through the abstract scope contract.

### Domain Boundaries: Artificials

- **Artificials** define the artificial language — the structured format, interpretation rules, and reading routines that allow agents to locate, read, and interpret context files and resources consistently with minimum inference.
- **Work** depends upon Artificials — Work uses the artificial language to read, interpret, and write context files and resources, but makes no assumptions about the artificial language internals.
- **All domains** consume Artificials — every domain's files are expressed in the artificial language, but the artificial language defines no relationships to specific domains beyond the structured format contract.

### Domain Boundaries: Conventions

- **Work** is directly depended upon — Conventions provide rules, naming, and structure patterns that work items follow during planning and execution, but Work can operate without conventions.
- **Roadmaps** are informed by Conventions — convention files and drafts ground milestone naming, structure, and process rules, but Roadmaps can be created without conventions.
- **Plans** are informed by Conventions — convention files and drafts guide plan structure and naming, but Plans can be created without conventions.

### Domain Boundaries: Domains

- **Work** is directly depended upon — Domains provide the infrastructure for domain producers to generate and maintain domain-related files, and for consumers to locate and interpret domain contexts.
- **Workflows** consume Domains — workflow files and operation files are maintained by the domains infrastructure, but workflows can be described independently.
- **Structures** consume Domains — domain index files and listing files are generated by the domains infrastructure, but structures are defined independently.

### Domain Boundaries: Noodlestan

- **Work** is directly depended upon — Noodlestan provides reusable routines and templates for generating guide files, but Work can operate without guides.
- **Repositories** consume Noodlestan — repository root guides are rendered from Noodlestan templates, but Repositories are independently usable.
- **Packages** consume Noodlestan — package guides are rendered from Noodlestan templates, but Packages are independently usable.

### Domain Boundaries: Primitives

- **Work** is directly depended upon — Primitives provide shared primitive types (path variables, resource references) reused by work items and nested resources across all domains.
- **All domains** consume Primitives — every domain's structures and types build on primitive types, but Primitives define no relationships to specific domains beyond the type contracts.

### Domain Boundaries: References

- **Work** is directly depended upon — References provide reference files describing repository patterns, codebase conventions, and architectural decisions that inform planning and execution, but Work can operate without references.
- **Conventions** may be informed by References — reference files may document conventions, but neither domain requires the other.

### Domain Boundaries: Scaffolders

- **Work** is directly depended upon — Scaffolders provide the infrastructure for generating files, directories, and project skeletons from templates and routines, used by planning and execution workflows.
- **Domains** consume Scaffolders — domain index files and listing files are scaffolded by scaffolder infrastructure, but scaffolders are defined independently.

### Domain Boundaries: Workspaces

- **Work** is directly depended upon — Workspaces describe context workspaces that coordinate independent project repositories, expressing how workspace and checkout resources participate in work items.
- **Repositories** are coordinated by Workspaces — a workspace may register multiple repositories and coordinate their checkouts, but Workspaces make no assumptions about repository internals.
