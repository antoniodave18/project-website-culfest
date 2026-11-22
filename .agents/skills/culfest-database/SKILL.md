---
name: culfest-database
description: Change or review CulFest persistence with Prisma 5.22.0 and MySQL. Use for schema design, migrations, queries, indexes, constraints, transactions, or drift checks.
---

# CulFest database

1. Read [the schema](../../../prisma/schema.prisma), [migration history](../../../docs/architecture.md#prisma-schema-and-migration-history), and [local MySQL setup](../../../README.md#local-mysql). Confirm the installed versions in [package.json](../../../package.json). Use documentation and CLI options compatible with Prisma 5.22.0 and MySQL.
2. Preserve applied migration files and checksums. Prefer additive migrations. Review generated SQL for risky changes and verify replay and drift against a disposable schema. Keep development, disposable tests, and shadow targets separate. Never modify production data without explicit approval.
3. Match indexes to actual filters, joins, and sorting. Enforce identity, relationships, and uniqueness with database constraints where appropriate.
4. Avoid N+1 queries by selecting needed relations or batching lookups. Use transactions for writes that must succeed together. Enforce concurrency-sensitive invariants with constraints and test competing writes.
5. Run Prisma validation and the relevant replay or drift checks from the README. Record any unavailable MySQL checks explicitly.
