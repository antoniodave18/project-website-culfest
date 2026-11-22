---
name: culfest-review
description: Review and verify CulFest changes. Use for milestone sign-off, pull request review, regression checks, Playwright validation, or documenting test evidence.
---

# CulFest review

1. Read the [milestone acceptance criteria](../../../docs/implementation-backlog.md) and compare the diff with [the architecture](../../../docs/architecture.md). Check changed routes, data boundaries, migration history, and public behavior for regressions.
2. Run `npm run lint`, `npm run typecheck`, and relevant checks from the [README](../../../README.md#checks) and [package scripts](../../../package.json). For admin auth, run `npm run test:admin-auth` against disposable MySQL. Check that voting stays disabled unless a separate approval covers activation.
3. Use Playwright for browser validation with existing tooling and local fixtures. Check affected public and admin flows, responsive layout, keyboard use, and denial for unauthorized users as relevant. Record tooling or environment blockers when the browser run cannot proceed.
4. Label each check passed, failed, blocked, or unexecuted. Include evidence, environment, and any remaining gaps. Attribute results supplied by another run. Update architecture and milestone docs with actual results.
