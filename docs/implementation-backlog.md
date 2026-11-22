# CulFest implementation backlog

M0 audited the repository. M1.0 establishes the database and development foundation and is conditionally accepted. M1.1 is approved for implementation and blocked at dependency validation. [Architecture and baseline](architecture.md#m11-pre-implementation-validation)

## Prioritized technical debt

| Priority | Work | Scheduling and acceptance |
| --- | --- | --- |
| P0 | Replace mock admin login and guard every admin route and applicable method. | M1.1. Deny unauthenticated and non-privileged requests on the server. Verify session expiry, logout revocation, and disabled voting. |
| P0 for rollout | Reconcile migration records for initialized MySQL environments. | M1.0 restored and verified empty-database replay. Review the schema and migration records in a separately approved rollout before applying the repaired history to any populated database. |
| P1 | Keep quality checks reproducible. | M1.0 added local env setup and type checking, bundled Merriweather, and resolved the nine lint errors. Track the 19 inherited unused-binding warnings, standardize the tested Node/npm pair in CI, and verify the default build on a runner that can start Turbopack workers. |
| P1 | Align declared dependencies and check advisories. | Check `three` and `@react-three/fiber` as direct map dependencies, verify whether `three-stdlib` is still needed, and align Next.js tooling. Rerun dependency advisories when the public registry is reachable. Avoid unrelated upgrades in M1.1. |
| P1 | Recover durable media references. | M5 before candidate uploads. Use controlled storage and server-side validation, and verify or replace the ignored `/uploads/candidates/` references with assets the committee may publish. |
| P0 before voting | Define eligibility and enforce integrity in MySQL. | M5. Define the contest, voter scope, token mode, expiry, duplicate policy, results visibility, and administrative reset rules. Enforce them with constraints and transactions and verify concurrent submissions. |
| P1 for the platform | Make administration observable and easy to operate. | Add event-specific audit logging for writes as each domain is introduced. Track operational logs, accessibility checks, backups, restore drills, and ownership of production configuration in M9. |
| P2 | Document public content states and static results. | Decide which Coming Soon routes the committee intends to publish. In M5, label the static leaderboard snapshot and remove unnecessary polling or replace it with a real published result feed. |

## M1.1 proposal — Secure platform administration

### Authentication choice

| Option | Fit for the current stack | Cost and dependency |
| --- | --- | --- |
| Better Auth with email/password and the Prisma MySQL adapter | Uses database sessions, a server-owned role, library hashing, and a database-backed request limiter. Supports offline provisioning of individual CulFest admins. | Requires a compatible, pinned Better Auth and Prisma adapter combination and the auth tables. CulFest manages provisioning and password rotation. |
| Auth.js with Google OAuth and the Prisma adapter | Google supplies the identity provider and Auth.js can persist sessions in MySQL. | Requires a Google OAuth client and approved admin identities, with verified identity/allowlisting during sign-in. The documented Auth.js v5 install is beta. Its Credentials provider requires JWT sessions. |

Recommend **Better Auth with provisioned email/password accounts** for M1.1. The tagged `1.7.27` library and Prisma adapter peer ranges fit the locked stack. Registry DNS blocks installing the pair and auditing its resolved graph. Verify the distributed TypeScript declarations, sign-in, rate limits, and session revocation on disposable MySQL before adopting the pins. If the Prisma adapter fails runtime validation, evaluate Better Auth's built-in MySQL adapter, which would add `mysql2` and a separate pool. Auth.js with OAuth can use database sessions but would require changing the sign-in requirement. Its Credentials provider requires JWT sessions.

[Better Auth Prisma adapter](https://better-auth.com/docs/adapters/prisma) · [Better Auth email/password](https://better-auth.com/docs/authentication/email-password) · [Better Auth MySQL adapter](https://better-auth.com/docs/adapters/mysql) · [Auth.js Prisma adapter](https://authjs.dev/getting-started/adapters/prisma) · [Auth.js installation](https://authjs.dev/getting-started/installation) · [Auth.js session strategy constraints](https://authjs.dev/reference/core/errors#unsupportedstrategy)

### Access and response contract

| Surface | Anonymous or expired | Signed in without `PLATFORM_ADMIN` | Signed in as `PLATFORM_ADMIN` |
| --- | --- | --- | --- |
| `GET /Admin` | Show sign-in | Show a generic access-denied state with logout | Redirect to `/Admin/manajemen/voting` |
| Four existing `/Admin/manajemen/*` pages | Redirect to `/Admin` before rendering controls | Redirect to `/Admin` with an access-denied state | Render the existing management UI and logout |
| `GET /api/leaderboard-sessions` | 401 | 403 | 200, same static session payload |
| Candidate create/delete, QR issue, leaderboard session update, and vote reset | 401 | 403 | 403 with the existing voting-disabled response for a same-origin request |
| Public `GET /api/candidates` and `GET /api/leaderboard` | Existing static response | Existing static response | Existing static response |
| Public `GET /api/voting-tokens` and `POST /api/vote` | Existing disabled 403 | Existing disabled 403 | Existing disabled 403 |
| Retired `POST /api/login` | 410 | 410 | 410 |

Use a database-backed session with library-managed HttpOnly and SameSite cookies, Secure on HTTPS, and a defined expiration (proposed eight hours without refresh). Use app-configured trusted origins and fixed redirects within `/Admin`. Verify the current role server-side on each protected request. Use a database-backed sign-in limiter with a proposed five requests per minute per trusted client IP, and verify forwarded-IP behavior for the actual deployment. The sign-in form should call the HTTP handler so the library limiter sees the request. A revoked session or removed role must lose access on the next protected request. Log auth errors without credentials or session tokens. Serve restricted content with private, non-cacheable semantics.

[Better Auth Next.js integration](https://better-auth.com/docs/integrations/next) · [Session management](https://better-auth.com/docs/concepts/session-management) · [Rate limits](https://better-auth.com/docs/concepts/rate-limit) · [Next.js authorization guidance](https://nextjs.org/docs/app/guides/authentication)

### File-by-file changes

The migration directory names below are proposed to show their order. Page wrappers start with a server-side check and render the current client UI once the check succeeds.

| File | Proposed M1.1 change |
| --- | --- |
| `package.json`, `package-lock.json` | Pin the compatible auth package and Prisma adapter, with a `server-only` marker dependency if required by the installed Next.js version. Add `test:admin-auth` and regenerate the lockfile with the tested npm version. |
| `.env.example` | Extend the local `DATABASE_URL` example with placeholders for `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and the chosen trusted client IP configuration where used. |
| `prisma/schema.prisma` | Add library-required `User`, `Account`, `Session`, `Verification`, and `RateLimit` models. Add a server-managed role with an unprivileged default. Preserve the four legacy models. |
| `prisma/migrations/<timestamp>_add_admin_auth/migration.sql` | Add the auth tables, indexes, and foreign keys generated from the pinned adapter's required schema. Keep it additive. |
| `lib/auth.ts` | Configure Better Auth on `lib/prisma.ts` with the MySQL adapter, email/password, disabled registration, database sessions and rate limits, secure cookies, and trusted origins. Make the role server-owned and exclude it from user-supplied changes. |
| `lib/admin-auth.ts` | Centralize server-only session and role verification, page redirects, API 401/403 response handling, and trusted-origin checks for admin mutations. Read the role from MySQL and do not cache privileged access across requests. |
| `lib/auth-client.ts` | Provide the same-origin library client for sign-in and sign-out. |
| `app/api/auth/[...all]/route.ts` | Mount the library's Next.js auth HTTP handler on the Node runtime. Expose the minimum enabled auth capabilities. Use generic errors and preserve library request validation and origin protection. |
| `app/api/login/route.ts` | Replace the mock response with a fixed 410 and remove the hardcoded credential and token. |
| `app/Admin/page.tsx` | Render the public login page on the server and redirect a valid admin session to the management landing. Render a generic denied state with logout for a signed-in non-admin. Keep the route capitalized. |
| `app/Admin/AdminLoginForm.tsx` | Move the current client form here and adapt it to email/password with Indonesian status messages, bounded inputs, and a fixed successful destination. Remove all use of `adminToken` and `localStorage`. |
| `app/Admin/AdminLogoutButton.tsx`, `app/Admin/manajemen/layout.tsx` | Add a shared logout control in the management layout. Revoke the database session through the library endpoint, then navigate to `/Admin` and refresh server state. |
| `app/Admin/manajemen/candidates/page.tsx`, `app/Admin/manajemen/candidates/CandidatesClient.tsx` | Wrap candidate management in the server guard. Move the current interactive list into its client component. |
| `app/Admin/manajemen/voting/page.tsx`, `app/Admin/manajemen/voting/CandidateFormClient.tsx` | Wrap candidate creation in the same guard and move the form into its client component. |
| `app/Admin/manajemen/voting/qr/page.tsx`, `app/Admin/manajemen/voting/qr/QRGeneratorClient.tsx` | Wrap QR controls in the same guard and move the dormant client UI into its client component. |
| `app/Admin/manajemen/leaderboard/page.tsx`, `app/Admin/manajemen/leaderboard/LeaderboardControlClient.tsx` | Wrap session controls in the same guard and move the interactive panel into its client component. |
| `app/api/candidates/route.ts`, `app/api/candidates/[id]/route.ts` | Gate POST and DELETE before parsing a request body or performing any work. Keep candidate GET public. |
| `app/api/voting-tokens/route.ts`, `app/api/vote/route.ts` | Gate QR POST and vote DELETE. Keep public token GET and vote POST disabled for every identity. |
| `app/api/leaderboard-sessions/route.ts` | Gate the admin GET and PUT. Preserve the static authorized read and disabled update. |
| `scripts/bootstrap-admin.mjs` | Provide one local/staging-only provisioning entry point, with a hidden password prompt or secure secret input. Create the user and credential account atomically with the pinned library's password hash function and a server-assigned `PLATFORM_ADMIN` role. Document duplicate handling and avoid printing passwords or hashes. |
| `tests/admin-auth.test.mjs` | Use Node's test runner and a local/staging app pointed at disposable MySQL. Use distinct synthetic admin and non-admin identities. Exercise permissions, sign-in, logout, and the public response contracts. |
| `README.md` | Document env setup, clean local migration replay, admin provisioning and revocation, auth checks, and run commands. Include the rollout gate for existing databases. |

The M1.1 proposal retains the current `/Admin` URLs and deep links. Lowercase admin URLs and shared admin navigation are scheduled for M2.

### Migration, verification, and rollout gates

1. Use the repaired migration history from M1.0. Append the auth migration, replay all migrations on disposable empty MySQL, and compare the resulting database to the expanded datamodel for drift. Preserve the existing migration files.
2. Test with a clean install and a development or staging database containing synthetic accounts and records. Assert anonymous and non-admin behavior for all four pages and every protected method. Verify a valid admin cookie, malformed and wrong credentials, public signup disabled, throttling, cross-origin mutations rejected, expired sessions, role removal, and logout invalidating the old session. The legacy mock token and cookie-less requests must confer no access.
3. Assert all seven dormant controls remain disabled and no vote, candidate, token, or leaderboard session write occurs. Smoke-test public pages and verify unchanged public candidate and leaderboard responses. Run lint, typecheck, build, Prisma validation, migration replay, and auth tests. Compare lint against the M0 error list and track any inherited failures.
4. For existing databases, review the schema and migration records using a separately authorized comparison before applying or recording the baseline. A baseline already represented by existing tables must be reconciled before deploy. Roll back by disabling admin entry points or reverting to a release with admin endpoints denied at the edge, keeping additive tables for recovery. Do not restore the mock login during rollback.

[Prisma migration baselining](https://www.prisma.io/docs/orm/prisma-migrate/workflows/baselining)

## Later milestones

| Milestone | Deliverable and acceptance |
| --- | --- |
| M2 · Community management | Add a shared admin layout, an organization and public community profile, scoped memberships, and profile claim/verification. Keep all Ormada links working and test that editors can update only their assigned profiles. |
| M3 · Events | Add organization-owned events with draft, published, and cancelled states and one registration flow. Show only published events to public visitors and verify Jakarta time handling. |
| M3.1 · Cultural Gallery | Replace the public Competition section with a Cultural Gallery after M3. Plan for albums, cultural documentation, attribution to communities, event associations, media management, and moderated community submissions. Preserve existing public links through deliberate routing and publish only approved submissions. |
| M4 · Cultural bookings | Publish services for verified communities and accept scoped booking requests. Add an organizer inbox and status history. Verify request visibility, input validation, and spam controls before taking real contact data. |
| M5 · Voting and leaderboard | Add contest scope, one enforceable eligibility rule, token expiry, transaction-safe votes, audited admin actions, and publication of results. Exercise expired, repeated, and concurrent votes in staging before requesting live approval. |
| M6 · Freemium | Pilot server-enforced entitlements and trial reporting. Validate demand before automated billing. |
| M7 · Sponsorship | Add moderated campaigns and inquiries with organization-scoped access. Store sensitive sponsorship records privately and pilot without payment handling. |
| M8 · Marketplace | Start with a moderated cultural product catalog and vendor inquiry workflow. Scope orders, payouts, refunds, and dispute handling as a separately reviewed stage. |
| M9 · Operations | Add CI gates, accessibility checks, operational monitoring, tested backups/restores, and privacy-aware reporting. |
