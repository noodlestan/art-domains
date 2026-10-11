# ADR: Domains Relationships by Example

**Status:** PROPOSED

**Context:** Where a domain works with concepts that may eventually have several concrete manifestations across different domains, naming concrete manifestations may prematurely define restrictive expectations.

**Decision:** In domain resources prose, always refer to resources in abstract terms, naming concrete resource kinds or names as examples only.

**Consequences:**

- The domain design is not directly coupled to other domains.
- New domains can be added with their resources participating automatically and seamlessly in existing workflows and resource hierarchies.
- Art projections (install/compile time) of installed domains can customize workflows, routing, and resource discoverability and association by merely overriding examples.
