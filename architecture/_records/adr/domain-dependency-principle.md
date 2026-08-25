# ADR: Domain Dependency Principle

**Status:** PROPOSED

**Context:** Domains sometimes need abstractions from other domains to express their own behaviour. When a domain cannot provide its own abstraction for a concept, it must depend on another domain that does.

**Decision:** A domain may depend directly on another domain when it cannot provide its own abstraction without that domain.

**Consequences:**
- Dependencies are explicit and traceable.
- Domains that can provide their own abstractions remain independent.
- Dependency chains are kept short by preferring local abstractions where possible.
