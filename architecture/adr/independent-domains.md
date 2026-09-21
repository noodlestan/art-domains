# ADR: Independent Domains

**Status:** PROPOSED

**Context:** Domains may interact with each other through various relationship types. Without explicit guidance, domains may accumulate unnecessary dependencies that reduce their standalone usability.

**Decision:** Every domain should remain independently usable unless its purpose fundamentally requires another domain.

**Consequences:**

- Domains can be adopted incrementally without requiring a full domain landscape.
- Teams can work on individual domains without cross-domain coordination.
- Domain boundaries remain clean and focused on their core responsibility.
