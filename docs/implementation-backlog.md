# CulFest implementation backlog

M1.0 is conditionally accepted. M1.1 passed local TCP MySQL and authentication checks. M2.0 passed local admin and authorization verification, with a known candidate image issue. [M2.0 final verification](architecture.md#m20-final-local-verification)

## Prioritized technical debt

| Priority | Work | Scheduling and acceptance |
| --- | --- | --- |
| P0 for rollout | Reconcile migration records for initialized MySQL environments. | M1.0 restored and verified empty-database replay. Review the schema and migration records in a separately approved rollout before applying the repaired history to any populated database. |
| P1 | Keep quality checks reproducible. | M1.0 added local env setup and type checking, bundled Merriweather, and resolved the nine lint errors. Track the 19 inherited unused-binding warnings, standardize the tested Node/npm pair in CI, and verify the default build on a runner that can start Turbopack workers. |
| P1 | Align declared dependencies and check advisories. | Check `three` and `@react-three/fiber` as direct map dependencies, verify whether `three-stdlib` is still needed, and align Next.js tooling. Rerun dependency advisories when the public registry is reachable. Avoid unrelated upgrades in M1.1. |
| P1 | Recover durable media references. | M5 before candidate uploads. Use controlled storage and server-side validation, and verify or replace the ignored `/uploads/candidates/` references with assets the committee may publish. |
| P0 before voting | Define eligibility and enforce integrity in MySQL. | M5. Define the contest, voter scope, token mode, expiry, duplicate policy, results visibility, and administrative reset rules. Enforce them with constraints and transactions and verify concurrent submissions. |
| P1 for the platform | Make administration observable and easy to operate. | Add event-specific audit logging for writes as each domain is introduced. Track operational logs, accessibility checks, backups, restore drills, and ownership of production configuration in M9. |
| P2 | Document public content states and static results. | Decide which Coming Soon routes the committee intends to publish. In M5, label the static leaderboard snapshot and remove unnecessary polling or replace it with a real published result feed. |

## M1.1 rollout gates

1. **Passed locally.** The read-only check reached all three databases. The disposable integration suite verified migrations, schema, authentication, authorization, and disabled voting.
2. Review checksums and reconcile migration history on any initialized deployment target before applying migrations.
3. Confirm HTTPS, trusted ingress header replacement, and direct app access restrictions before exposing admin routes. Rerun the npm production audit when registry access is available.
4. Keep voting closed until its separate integrity requirements are met.

## Later milestones

| Milestone | Deliverable and acceptance |
| --- | --- |
| M2.0 — Unified Admin Dashboard | Final local review passed for admin flows, responsive navigation, authorization, and disabled voting. Candidate images and their fallback returned 404. See [verification results](architecture.md#m20-final-local-verification). |
| M2.1 — Community Database & CRUD | Approved for integration into develop after local verification. MySQL backs the 25 original Ormada profiles and admin CRUD, publication, archive, claim, and verification controls. See [verification and release gates](architecture.md#m21-local-verification). |
| M2.2 — Organization Memberships & Permissions | Implemented locally and pending review. Includes operator-assisted email verification, scoped roles, invitations, ownership transfer, and audit events. See [verification and release gates](architecture.md#verification-and-release-gates). |
| M3 · Events | Add organization-owned events with draft, published, and cancelled states and one registration flow. Show only published events to public visitors and verify Jakarta time handling. |
| M3.1 · Cultural Gallery | Replace the public Competition section with a Cultural Gallery after M3. Plan for albums, cultural documentation, attribution to communities, event associations, media management, and moderated community submissions. Preserve existing public links through deliberate routing and publish only approved submissions. |
| M4 · Cultural bookings | Publish services for verified communities and accept scoped booking requests. Add an organizer inbox and status history. Verify request visibility, input validation, and spam controls before taking real contact data. |
| M5 · Voting and leaderboard | Add contest scope, one enforceable eligibility rule, token expiry, transaction-safe votes, audited admin actions, and publication of results. Exercise expired, repeated, and concurrent votes in staging before requesting live approval. |
| M6 · Freemium | Pilot server-enforced entitlements and trial reporting. Validate demand before automated billing. |
| M7 · Sponsorship | Add moderated campaigns and inquiries with organization-scoped access. Store sensitive sponsorship records privately and pilot without payment handling. |
| M8 · Marketplace | Start with a moderated cultural product catalog and vendor inquiry workflow. Scope orders, payouts, refunds, and dispute handling as a separately reviewed stage. |
| M9 · Operations | Add CI gates, accessibility checks, operational monitoring, tested backups/restores, and privacy-aware reporting. |
