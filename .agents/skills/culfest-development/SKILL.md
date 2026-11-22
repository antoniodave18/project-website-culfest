---
name: culfest-development
description: Plan or implement an approved CulFest milestone. Use for feature work, roadmap sequencing, acceptance criteria, or changes to the Next.js modular monolith.
---

# CulFest development

1. Read [the milestone backlog](../../../docs/implementation-backlog.md), [architecture](../../../docs/architecture.md), and [local setup](../../../README.md). Identify the approved milestone and its acceptance criteria before editing.
2. Work on one approved milestone at a time. Keep pending review gates in place. Use the current code and tests to distinguish existing behavior from roadmap proposals.
3. Keep one Next.js App Router application. Reuse route groups, UI, and server modules where they fit. Keep server-side authorization and data access separate from client rendering. Extract shared code when actual callers need it.
4. Prefer a small change using existing dependencies. Preserve public URLs, documented response contracts, and unrelated admin behavior. Keep voting disabled until the separate voting approval.
5. Verify the changed paths against acceptance criteria with `culfest-review` and record the outcome.
