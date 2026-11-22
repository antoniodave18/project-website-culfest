# CulFest architecture and development foundation

Audited on 22 November 2026 (Asia/Jakarta) in `antoniodave18/project-website-culfest`, branch `main` at `e794570`. The checkout already had a one-line `package-lock.json` change when the audit began. Local checks used that working copy and the installed dependencies where needed. The audit used source, Git history, and disposable local test inputs.

The original audit and inventories below describe the M1.0 baseline. See
[M1.1 authentication and authorization](#m11-authentication-and-authorization)
for the current admin design and validation status.

## Architecture and dependencies

| Layer | Current implementation |
| --- | --- |
| Application | One Next.js App Router app. `app/layout.tsx` sets metadata, loads shared Header and Footer, and applies global CSS from `app/globals.css`. Routes use a mix of server-rendered pages and client components. |
| Runtime and tooling | Next.js `^16.2.4` (lockfile and installed version `16.4.6`), React and React DOM `19.2.3`, TypeScript `5.9.3`, Tailwind CSS and its PostCSS plugin `4.2.4`, PostCSS `8.5.23`, Sharp `0.34.5`, ESLint `9.39.4`, and `eslint-config-next` `16.1.4`. Checked on Windows using Node `24.14.1` and npm `11.11.0`. Package scripts cover dev, build, start, lint, and typecheck. |
| 3D map | `@react-three/drei` `10.7.7` and `three-stdlib` `2.36.1` are declared. The map imports `@react-three/fiber` `9.6.1` and `three` `0.184.0` directly from transitive installs and loads checked-in OBJ/MTL assets through Three.js. |
| Persistence | `prisma/schema.prisma` declares MySQL via `DATABASE_URL`. Prisma CLI and Client are both `5.22.0`. `lib/prisma.ts` supplies a singleton with development reuse. Current app routes do not import it. |
| Content | Festival content, FAQ, quiz, dorm and Ormada directories, graphics, and 3D assets are versioned in the repository. Quiz answers are browser-local. The leaderboard and candidate reads share the compiled-in data in `lib/leaderboard-data.ts`. |
| Build and integrations | `app/layout.tsx` bundles EFCO Brookshire and Merriweather via `next/font/local`. Asrama and Ormada pages embed Google Maps where configured, the event page embeds YouTube, and the dormant QR generator references an external QR service. `next.config.ts` allows image optimization for the festival hostname. |
| Deployment | `README.md` names the live URL and shows Vercel as an example. The repository has no tracked deployment pipeline or CI workflow. Hosting provider, runtime secrets, database state, and live behavior were outside this audit. |

## Page inventory

**Functional** means current code provides the stated behavior, with runtime evidence limited to the checks below. **Static** means content is served from source or browser state. **Mock** marks simulated behavior. **Disabled** marks a blocked action. **Placeholder** marks a page that renders `ComingSoon`.

| Route | Source | State and behavior |
| --- | --- | --- |
| `/`, `/home` | `app/page.tsx`, `app/home/page.tsx` | Functional festival entrance and home page. Timeline, sponsor and media partner sections are inline presentation content. |
| `/home/about-event`, `/home/faq` | `app/home/about-event/page.tsx`, `app/home/faq/page.tsx` | Static festival background and FAQ, with video embed and interactive FAQ controls. |
| `/home/jelajah/asrama`, `/home/jelajah/asrama/[slug]` | `app/home/jelajah/asrama/{page.tsx,[slug]/page.tsx,data.ts}` | Static directory and detail pages for eight residences. Unknown slugs call `notFound()`. |
| `/home/jelajah/ormada`, `/home/jelajah/ormada/[slug]` | `app/home/jelajah/ormada/{page.tsx,[slug]/page.tsx}` | MySQL directory and detail pages for published communities. Archive URLs show an unavailable notice. Draft and unknown slugs return 404. |
| `/home/jelajah/fakultas`, `/home/kompetisi`, `/home/linimasa` | Corresponding `app/home/**/page.tsx` files | Placeholder pages. The home page has its own inline festival sections. |
| `/home/game`, `/home/game/result` | `app/home/game/page.tsx`, `app/home/game/result/page.tsx` | Client-side quiz and result, connected by `localStorage`. |
| `/home/map` | `app/home/map/page.tsx`, `app/home/map/InteractiveMapComponent.tsx` | Client-side 3D event map with object selection and a fullscreen view. Depends on browser WebGL. |
| `/home/leaderboard` | `app/home/leaderboard/page.tsx` | Functional display of a static snapshot. Polls every 10 seconds and renders API order with pagination. |
| `/Admin` | `app/Admin/page.tsx` | Mock login. Posts username/password, saves `adminToken` in `localStorage`, and navigates to the candidate creation page. |
| `/Admin/manajemen/candidates` | `app/Admin/manajemen/candidates/page.tsx` | Static list. Delete UI exists and is disabled by the API. |
| `/Admin/manajemen/voting` | `app/Admin/manajemen/voting/page.tsx` | Candidate creation and image preview UI. It sends a name and a data URL from a file preview. Server creation is disabled. |
| `/Admin/manajemen/voting/qr` | `app/Admin/manajemen/voting/qr/page.tsx` | QR generation, countdown, and fullscreen UI. Token issuance is disabled. |
| `/Admin/manajemen/leaderboard` | `app/Admin/manajemen/leaderboard/page.tsx` | Mock session controls. Session settings and reset requests are disabled. |
| `/vote/[token]` | `app/vote/[token]/page.tsx` | Vote UI with token lookup, candidate selection, and confirmation. Token lookup and vote submission are disabled. |

The repo has display content for cultural groups and the festival. Account and membership management, managed event publishing and registration, cultural bookings, sponsorship campaigns and inquiries, subscription entitlements, and a marketplace are missing. There is no server-managed admin session or administrative audit trail.

## API inventory

Next.js route handlers return JSON. None of the current handlers use Prisma or check for a server-managed identity. Seven disabled method handlers return the same HTTP 403 message.

| Method and path | Source | Behavior |
| --- | --- | --- |
| `POST /api/login` | `app/api/login/route.ts` | Mock literal credential comparison. Returns 200 with fixed token on a match, 401 with valid JSON and wrong credentials, or 500 on malformed JSON. No session cookie, validation schema, or throttling. |
| `GET /api/candidates` | `app/api/candidates/route.ts` | Public snapshot of seven candidates, including vote counts. |
| `POST /api/candidates` | `app/api/candidates/route.ts` | Disabled candidate creation. |
| `DELETE /api/candidates/:id` | `app/api/candidates/[id]/route.ts` | Disabled candidate deletion. No update method exists. |
| `GET /api/voting-tokens`, `POST /api/voting-tokens` | `app/api/voting-tokens/route.ts` | Disabled public QR lookup and admin QR issuance, respectively. |
| `POST /api/vote`, `DELETE /api/vote` | `app/api/vote/route.ts` | Disabled public vote submission and admin reset, respectively. |
| `GET /api/leaderboard` | `app/api/leaderboard/route.ts` | Public snapshot of the same seven rows. Without a query it includes ten session codes. With a `sessionCode` it echoes the trimmed, uppercased string and returns the same rows. Session existence, enabled state, and ranking by session are absent. |
| `GET /api/leaderboard-sessions` | `app/api/leaderboard-sessions/route.ts` | Public synthetic projection of the same ten session codes. Every session reports `enabled: true`, `voteCount: 0`, and `createdAt: null`. Its only checked-in caller is the admin control page. |
| `PUT /api/leaderboard-sessions` | `app/api/leaderboard-sessions/route.ts` | Disabled update to leaderboard session visibility. |

The static leaderboard commit is `6dd79cf` (31 May 2026). The checked-in rows have no provenance metadata that establishes whether their counts reflect certified historical results. Image URLs refer to `/uploads/candidates/`, which is ignored by Git. All seven image files were absent locally. The public leaderboard displays names and counts, while the admin list uses candidate image URLs.

## Prisma schema and migration history

| Model | Fields, relationships, and constraints |
| --- | --- |
| `Candidate` | UUID primary key, name, image URL, created time, and one-to-many votes. No organization, event, or contest reference. |
| `VotingToken` | UUID primary key, unique raw token, indexed string session code defaulting to `DEFAULT`, expiry, creation time, and one-to-many votes. The schema permits a shared QR token across votes. |
| `Vote` | UUID primary key, required foreign keys to candidate and token, indexed string session code defaulting to `DEFAULT`, and creation time. No voter or eligibility key, deduplication constraint, or constraint tying its session code to the token's session code. |
| `LeaderboardSession` | UUID primary key, unique string session code, enabled flag defaulting to true, and timestamps. It has no foreign-key relationship to voting tokens or votes. |

1. `prisma/migrations/20260427000000_init_legacy_voting/migration.sql` restores the missing baseline. Prisma 5.22.0 generated this SQL from the pre-session datamodel in Git commit `43869b0`. It creates `Candidate`, `VotingToken`, and `Vote`, including the unique QR token and vote foreign keys.
2. `prisma/migrations/20260429143900_add_vote_session_code/migration.sql` adds indexed session codes to existing `VotingToken` and `Vote` tables.
3. `prisma/migrations/20260429152000_add_leaderboard_session/migration.sql` creates `LeaderboardSession` and its unique session-code index.

`prisma/migrations/migration_lock.toml` records the MySQL provider. The two existing migration files and current datamodel match the pre-M1.0 checkout. On an empty database, apply the three migrations in order using the [local setup instructions](../README.md#local-mysql).

For an existing database, review its actual schema and `_prisma_migrations` records in an explicitly approved rollout. If the baseline tables already exist and the pre-session baseline is verified as represented in that schema, reconcile the migration record by marking the baseline applied through Prisma before deploying pending migrations. Verify the two later migrations independently.

To roll back M1.0 application changes, revert the code revision and retain the legacy tables and migration records. Keep the repaired baseline in source control for databases where it was recorded. An unseeded local instance can be retired and replaced with another disposable instance if needed.

## Security and integrity findings

| Priority | Finding | Current exposure and owner |
| --- | --- | --- |
| P0 | The mock login and all four admin management pages lack a real authentication boundary. | Mock credentials and a fixed token are in `app/api/login/route.ts`; `app/Admin/page.tsx` writes the token to script-readable storage. No server layout, page, or handler validates a session or admin role. Remove the mock and require server-side auth in M1. |
| P0 | Admin API methods lack identity, role, and origin checks. | Candidate create/delete, QR issue, session visibility update, and vote reset are dormant and return 403 before writing anything. Reintroducing writes without guards would cross the admin boundary. Guard the admin methods in M1; retain the disabled behavior. Keep public token lookup and vote submission disabled. |
| P0 before voting | Current vote model and UI cannot establish eligibility or prevent repeat votes. | The browser-local session flag in `app/vote/[token]/page.tsx` is UI state. The schema lacks voter deduplication and a contest/session relationship for enforcing eligibility, scope, and expiry atomically. Design a server-enforced rule and transaction in M5 before enabling any vote. |
| P1 | Login and future write inputs need server-side validation and request limits. | The login handler returns 500 for malformed JSON and has no throttling. The legacy candidate form's 10 MiB client check does not validate bytes, MIME, decoded dimensions, or storage paths on a server. Login belongs in M1. File validation belongs with candidate writes in M5. |
| P1 before voting | Future QR display would disclose a tokenized voting URL to a third party. | `app/Admin/manajemen/voting/qr/page.tsx` encodes the URL into the request to `api.qrserver.com`. The route currently issues no token. Generate QR locally in M5 and review token logging and referrer handling. |
| P2 | Static session data and vote counts are freely readable. | Candidate and leaderboard reads are public, and the two leaderboard endpoints disclose the hardcoded session list. Treat the counts as a static snapshot and the codes as public metadata. Protect the admin session inventory in M1 and design per-session result publication in M5. |

Next.js recommends checking authorization near data access and in route handlers, including when a shared layout performs an initial check. [Next.js authentication guide](https://nextjs.org/docs/app/guides/authentication)

## Version history

The last commit in this checkout's reachable history dated on or before 31 March 2026 in Asia/Jakarta is `cc36fe5`. Its files live under the historical `project-website-culfest/` prefix. That tree contains festival pages plus prototype QR and vote endpoints with process-local QR storage. The current Prisma-backed design first appears in April (`43869b0`, `970b095`). This evidence dates source in Git. Deployment dates and the functional readiness of the March prototype were not verified.

## M0 local validation

M0 ran these checks in the checkout or a disposable copy. The commands used installed packages after the clean install failed. App checks used a dummy loopback `DATABASE_URL`. Migration SQL was tested on a fresh MySQL 8.0.46 instance with a temporary data directory and a local shared-memory connection.

| Check | Observed outcome |
| --- | --- |
| `npm ci --no-audit --no-fund` in a clean copy | **Failed**, exit 1. npm reported “Exit handler never called”. An offline retry also failed with `ENOTCACHED` for `zustand@5.0.12`; registry DNS was unavailable. |
| `npm run lint` | **Failed**, exit 1. Found 9 errors and 22 warnings. Errors occur in the candidate list at lines 36 and 94, quiz result at lines 49 and 180, public leaderboard at lines 71 and 78, and 3D map at line 148. |
| `npm run build` | **Failed**, exit 1 during Turbopack compilation. `next/font/google` could not fetch Merriweather from Google Fonts. Production-build success remains unverified. |
| `next typegen` and `tsc --noEmit` | **Passed**, both exit 0. Ran sequentially with the installed CLI binaries. |
| `prisma validate` | **Passed**, exit 0 with a disposable loopback placeholder URL. Validates the Prisma schema without connecting to a database. |
| `prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script` | **Passed**, exit 0. Produced SQL for all four tables and both vote foreign keys. This command compares the datamodel to an empty schema. |
| First tracked migration SQL on empty MySQL | **Failed**, exit 1 with MySQL error 1146 at the first statement. `ALTER TABLE VotingToken` cannot run because the base table is missing. The direct SQL replay established the empty-database failure. Prisma's TCP migration runner was blocked by the environment's loopback restrictions. |
| API handler smoke test | **Passed**, 14 of 14 checks. Loaded the existing handlers in process and called them with synthetic requests. Verified mock login success with no session cookie, invalid login 401, malformed JSON 500, static candidate and session data, an arbitrary session yielding the same leaderboard rows, and 403 from all seven disabled handlers. |
| Next.js page render smoke test | **Passed**, 24 of 24 checks. In-process Next.js development rendering used a temporary Merriweather response fixture. Four management routes returned 200 without any session, `/admin` returned 404, and valid and missing directory slugs returned the expected 200 and 404. The test covered server HTML and status codes. |
| Socket-level app smoke | **Blocked**. The local Next.js test server could not be reached from the sandbox (`connect EACCES` on loopback). |
| `npm audit --omit=dev` | **Blocked**, exit 1. The npm advisories endpoint could not resolve `registry.npmjs.org` (`ENOTFOUND`). Dependency vulnerability status remains unverified. |

At M0 the build still depended on Google Fonts, `.env.example` was missing, and no separate typecheck command existed.

After dependencies and font access are available, run lint, type generation, TypeScript, and build. In a local browser open the festival landing, home, one valid Ormada and Asrama profile, quiz and result, map, and leaderboard. Confirm the three Coming Soon routes, direct admin page behavior, and the disabled vote page. Verify map interactions and external embeds separately from HTTP route responses.

## M1.0 validation

M1.0 bundles the unmodified Latin Merriweather variable WOFF2 from Fontsource 5.3.0 under SIL OFL 1.1. The existing CSS variable, normal style, weight range (300–900), and serif fallback are preserved. [Font source](https://github.com/fontsource/font-files/blob/main/fonts/variable/merriweather/files/merriweather-latin-wght-normal.woff2) · [Bundled license](../public/fonts/Merriweather-OFL.txt) · [Next.js font module](https://nextjs.org/docs/app/api-reference/components/font)

The one-line pre-existing `fsevents` flag change was reverted to the committed lockfile. Prisma, a development dependency, is its only parent. No package versions changed.

| Check | Observed outcome |
| --- | --- |
| Clean install | **Passed** using `npm ci --offline --no-audit --no-fund` with a populated npm cache, installing 424 packages from the lockfile. The default sandbox cache lacked `zustand@5.0.12`. An online install in the sandbox also failed. |
| Migration replay | **Passed.** All three migration SQL files applied in order to empty MySQL 8.0.46. Prisma CLI's TCP transport was unavailable in this environment, so the MySQL client used Windows shared memory on a fresh local instance with networking disabled. |
| Schema comparison | **Passed.** Compared the replayed schema with a second disposable database created from Prisma-generated datamodel DDL. All 51 metadata rows matched across tables, column definitions, defaults, constraints, indexes, and foreign-key rules. The comparison excludes physical column positions because the historical migrations append `sessionCode` to `Vote` and `VotingToken`. |
| `prisma validate` | **Passed.** |
| `npm run lint` | **Passed** with 0 errors and 19 inherited warnings. Warnings are unused bindings in admin, disabled API handlers, voting UI, and directory pages. |
| `npm run typecheck` | **Passed.** Next.js regenerated route types before TypeScript validation. |
| `npm run build` | **Failed** in the Windows sandbox. Turbopack could not connect to its PostCSS worker. |
| Webpack production build | **Passed** with one static-generation worker and a temporary runner that retried `EPERM` on directory creation under `.next`. Ordinary `npm run build -- --webpack` hit `EPERM` in both the checkout and a fresh copy. The runner made no changes to application or build configuration. |
| Production route smoke test | **Passed**, 35 of 35 checks in process. Verified page statuses, valid and missing Asrama and Ormada profiles, static candidate and leaderboard data, and the disabled response from all seven voting-related methods. Loopback connections from the sandbox returned `EACCES`, so browser interactions were outside this check. |

## M1.1 pre-implementation validation

This section records the earlier environment check. Manual installation unblocked
implementation. See the [current validation results](#m11-authentication-and-authorization).

**Blocked at this checkpoint.** The candidate pair was `better-auth@1.7.27`
and `@better-auth/prisma-adapter@1.7.27`. The tagged manifests admit Next.js
`16.4.6`, React and React DOM `19.2.3`, and Prisma CLI and Client `5.22.0`.
Better Auth publishes TypeScript declarations. Compiling those declarations with
the app's TypeScript `5.9.3` and exercising the adapter on MySQL 8.0.46 require
an installed package graph. [Better Auth manifest](https://github.com/better-auth/better-auth/blob/v1.7.27/packages/better-auth/package.json) · [Prisma adapter manifest](https://github.com/better-auth/better-auth/blob/v1.7.27/packages/prisma-adapter/package.json)

The candidate follows the maintainer's November 3 security release, which
patched 12 reported issues in `1.7.16`. The upstream advisories and release
notes were reviewed. Auditing the resolved production dependency graph remains
blocked by registry DNS. [Security release](https://better-auth.com/blog/security-release-2026-11-03) · [Advisories](https://github.com/better-auth/better-auth/security/advisories) · [v1.7.27 release](https://github.com/better-auth/better-auth/releases/tag/v1.7.27)

The tagged schema contains `User`, `Account`, `Session`, and `Verification`.
Database-backed throttling adds `RateLimit` with a unique key and a bigint
timestamp. The planned app-managed `User.role` defaults to `USER`. The Prisma
adapter reuses the existing client with the MySQL provider. Generate the schema
from the pinned configuration and compare only the additive changes before
creating a migration. [Tagged schema](https://github.com/better-auth/better-auth/blob/v1.7.27/packages/core/src/db/get-tables.ts) · [Prisma adapter guide](https://better-auth.com/docs/adapters/prisma)

| Check | Result |
| --- | --- |
| Tagged peer ranges | **Passed.** Both manifests allow the locked framework and Prisma versions they declare. |
| Package resolution and production audit | **Blocked.** Registry lookups and audit returned `ENOTFOUND`. An isolated offline resolution returned `ENOTCACHED` for the Prisma adapter. |
| Existing checkout lint, typecheck, and Prisma validation | **Passed.** Lint reported zero errors and 19 inherited warnings. |
| Auth adapter typecheck, migration replay, session and authorization integration tests | **Unexecuted.** No auth dependencies, schema, or routes were added. M1.0 MySQL SQL replay remains the baseline. |
| Production build and socket-level checks | **Unexecuted for M1.1.** The M1.0 Turbopack worker failure, webpack filesystem workaround, and loopback restriction still apply. |

## M1.1 authentication and authorization

Better Auth and its Prisma adapter are pinned at `1.7.27`. The Node runtime
uses the existing Prisma 5.22.0 client and MySQL. Only email/password sign-in
and sign-out are exposed. Registration is closed. The sign-in response sends
the session token only in a host-only, HttpOnly, SameSite=Lax cookie that is
Secure on HTTPS. The eight-hour database session has no rolling refresh or
cookie cache. Sign-out revokes the verified session row before clearing cookies.

`User.role` defaults to `USER`. Local provisioning assigns `PLATFORM_ADMIN`,
hashes with Better Auth, and refuses duplicate accounts. Each protected page
and API operation verifies the server-backed session and current role. Protected
responses use private, no-store caching. Protected mutations and auth requests
require the configured origin. Browser-supplied roles and redirect targets are
ignored. `POST /api/login` returns 410.

Anonymous admin API requests return 401. Signed-in users without the platform
role receive 403. All four management pages require the platform role. The
admin session inventory is available to platform admins. Voting mutations return
the disabled response after their authorization checks. Public candidate and
leaderboard reads keep their static payloads. Public vote submission and QR
lookup remain disabled.

The database-backed sign-in limiter allows five attempts within a 60-second
window per verified ingress IP. On direct loopback HTTP it uses one shared
bucket. HTTPS sign-in requires an ingress header configured in
`AUTH_CLIENT_IP_HEADER`. The ingress must overwrite that header and prevent
direct public access to the app. [Better Auth rate limiting](https://better-auth.com/docs/concepts/rate-limit)

The additive migration `20261122093000_add_admin_auth` adds `User`,
`Account`, `Session`, `Verification`, and `RateLimit`. The dedicated Prisma
shadow URL comes from `SHADOW_DATABASE_URL`. Keep the shadow schema disposable.
The local validation scripts constrain TCP endpoints to the named local
development, test, and shadow databases. See [local MySQL and admin setup](../README.md#local-mysql).

### Sharp remediation

The app had no direct Sharp imports. Removed its vulnerable direct `0.34.5`
dependency. Next.js 16.4.6 already declares `0.35.5`, now the sole Sharp
version in the lockfile. Reviewed the Node 20.9+ requirement, prebuilt binary
installation, and removed legacy API properties in 0.35. Node 24 and the
existing Next.js optimizer path passed local image checks. [Sharp 0.35 changes](https://sharp.pixelplumbing.com/changelog/v0.35.0/) · [Patched librsvg advisory](https://github.com/advisories/GHSA-wq5f-xc86-pv6w)

### M1.1 validation

| Check | Result |
| --- | --- |
| Lint, typecheck, Prisma generate and validate | **Passed.** Lint reported zero errors and 9 inherited warnings. |
| Migration files and isolated MySQL replay | **Passed.** Existing migration file hashes matched. All four migrations replayed on a fresh MySQL 8.0.46 instance over Windows shared memory. 133 schema metadata rows matched Prisma-generated DDL, excluding physical column order. |
| Adapter initialization and schema contract | **Passed without database queries.** The pinned adapter initialized, generated Prisma models covered Better Auth's expected fields, and password hash verification passed. |
| Configured MySQL TCP | **Passed in the developer's PowerShell.** `npm run db:verify` connected to dev, test, and shadow. Dev and test were empty before the suite. The managed sandbox still returned `EACCES`. |
| Disposable MySQL migration and auth integration | **Passed in the developer's PowerShell.** The suite applied test migrations, verified the migration ledger and deployed schema, and passed admin guards, sign-in, session persistence, origin checks, role removal, expiry, revocation, logout, and throttling. Voting stayed disabled, and public route checks passed. |
| Standard Turbopack and webpack builds | **Failed in the sandbox.** Turbopack could not connect to its worker. Webpack prerendering hit `EPERM` creating a directory. |
| Webpack production build with local workaround | **Passed**, using one worker and temporary directory-creation retries under `.next`. |
| Production smoke checks in process | **Passed**, 26 checks. Covered public routes and snapshots, anonymous admin page and API denials, closed registration and legacy login, malformed and cross-origin auth requests, disabled public voting, and Next.js PNG-to-WebP optimization. |
| Sharp image handling and production audit | **Image checks passed** for PNG and JPEG decoding and resize to WebP. **Audit blocked** by registry DNS (`ENOTFOUND`). |

### Deployment and rollback

Review the target migration ledger before applying migrations to any initialized
database. The local integration run applied migrations to disposable MySQL only. Confirm
the HTTPS origin and trusted ingress configuration. If rollback is needed,
deny admin paths at ingress or deploy a fail-closed admin revision. Retain the
additive tables and their migration ledger. Returning to the mock login would
expose the old authorization gap.

## M2.0 admin dashboard

Successful platform-admin sign-in lands at `/Admin/manajemen`. The shared
management layout and overview both call `requireAdminPage`. The guard still
checks the server-backed session and platform role. It passes the display name
to the workspace for the greeting and account menu. Existing page guards,
private no-store responses, protected APIs, and session-revoking logout remain
in force. This milestone adds no schema or dependency changes.

`AdminWorkspace` provides the grouped desktop sidebar, mobile disclosure,
current-page context, and account menu. `navigation.ts` defines active links
and planned labels. Workspace groups cover Ruang kerja, Layanan budaya,
Voting & leaderboard, and Administrasi. The overview links to candidates,
leaderboard controls, and voting management. It reports voting as disabled
and gives empty states for unavailable activity, requests, and events.
Existing public chrome is hidden on admin paths through its pathname checks.
All public and legacy admin URLs retain their casing.

| Validation | Result |
| --- | --- |
| Lint and typecheck | **Passed.** Lint returned 9 inherited warnings and zero errors. |
| Production build | **Passed** with webpack, one static worker, and the local Windows directory-creation workaround. Default Turbopack was not rerun for M2.0. |
| Built route smoke checks | **Passed**, 23 checks. Covered anonymous redirects and no-store headers for the five admin pages, public routes and read payloads, retired login, protected APIs, and disabled voting responses. |
| MySQL and auth integration | **Passed in the developer's PowerShell.** The updated suite verified disposable migrations and schema, admin landing redirect and overview, role and session guards, logout, expiry, revocation, origin controls, throttling, and disabled voting. The sandbox run stopped at `DB_UNREACHABLE`. |
| Playwright visual checks | **Passed on an isolated component preview** at 1440, 768, and 390 px. Checked layout, active navigation, planned entries, keyboard focus, and native disclosures. Authenticated live browser navigation and reload behavior were not exercised by this fixture. |

### M2.0 final local verification

The final browser run used the running CulFest production build on a separate
loopback port, disposable MySQL, and synthetic PLATFORM_ADMIN and USER accounts.
Chrome passed at desktop (1440 × 900), tablet (768 × 1024), and mobile
(390 × 844). Admin sign-in landed on `/Admin/manajemen`. Navigation and
authenticated reloads passed on the dashboard, candidates, leaderboard, voting,
and QR pages. The tablet and mobile menu opened and closed by touch and keyboard,
closed on navigation, and returned focus on Escape. Account menu and logout passed
at all sizes. Anonymous and USER sessions were denied on all five protected pages.
Public voting showed its disabled state and the token request returned HTTP 403.

Lint passed with nine warnings. Typecheck, local database verification, and the
disposable MySQL auth suite passed. Browser logs showed no uncaught page errors.
Candidate upload URLs and the inherited `/fallback.png` returned HTTP 404.
Chrome also logged request cancellations during navigation and the expected
voting HTTP 403. Responsive results are from Chrome emulation.

M2.0 admin and authorization checks pass locally. Candidate images remain a
known issue. Deployment verification remains open before release.

## M2.1 community database and CRUD

The additive migration `20261122100000_add_community` creates a generic
`Community` table. It uses UUID IDs, a unique normalized slug, required name,
summary and description, optional establishment text and profile URLs,
ordering, and timestamps. MySQL indexes the public publication/order/slug
query and the admin update-time ordering. The four earlier migrations retain
their original checksums.

New records default to draft, unclaimed, and unverified. Publication requires
a valid name, slug, summary, and description. The first publication locks the
slug, including after unpublishing. Archiving is final in M2.1 and preserves
the slug. Claim and verification are independent admin fields.

The explicit [seed command](../README.md#community-directory-and-administration)
imports the 25 original profiles as published, unclaimed, and unverified.
`prisma/ormada-seed.json` preserves the original field values and order. The
seed skips existing slugs without modifying their records. All 25 original logo
files exist. Missing seed logos or profiles without a logo use the CulFest logo.

The admin sidebar links to `/Admin/manajemen/komunitas`, with name search,
status filters, and pagination. The `/new` and `/[id]/edit` pages share a
form. The admin API supports GET and POST at `/api/admin/communities`, GET
and PATCH at `/api/admin/communities/[id]`, and PATCH at
`/api/admin/communities/[id]/archive`. PATCH for editing accepts all editable
profile fields and statuses. The separate archive endpoint takes no body.

Admin pages call `requireAdminPage`. APIs use `guardAdmin` and private
no-store responses. The existing role and origin rules apply to every
mutation. The API bounds JSON and field lengths, validates IDs and enum values,
allows HTTPS links and existing image files under `/images/`, and maps slug
conflicts to HTTP 409. The database enforces uniqueness, and update predicates
protect locked slugs and archived records during concurrent requests.

The public directory and detail routes render dynamically and select only
public fields. Published edits appear on the next server request, and no
database query is needed at build time. Public URLs, logo paths, original
content, directory order, desktop grid, and mobile carousel are preserved.
The detail page displays the original establishment value for each community.
The inherited candidate image issue is tracked separately.

### M2.1 local verification

| Check | Result |
| --- | --- |
| Lint, typecheck, Prisma validate, production build | **Passed.** Lint reported 5 inherited warnings and zero errors. The Turbopack build also passed with an unreachable database URL. |
| Migration replay and upgrade | **Passed.** Replayed all migrations in the disposable shadow database and compared its schema with the upgraded M1.1 test database. Prisma reported no difference. Test and development matched the datamodel after applying the additive migration. |
| Seed and asset audit | **Passed.** Local development inserted 25 rows, then skipped all 25 on rerun. The disposable integration test preserved an edited record on reseed. No original logo was missing. |
| HTTP integration | **Passed.** Covered all 25 public URLs and original content, CRUD, duplicate and invalid inputs, status changes, archived and draft visibility, administrator and unauthorized sessions, origin checks, and disabled voting. |
| Playwright | **Passed.** Chrome emulation at 1440 × 960, 768 × 1024, and 390 × 844 on the built app and disposable MySQL. Checked list, filtering, pagination, creation, edit, status changes, archive confirmation, validation, keyboard navigation, access denial, and public navigation. Google Maps iframe markup and links were checked. External map tiles were excluded from the browser run. |

The optional in-place Prisma Client regeneration hit a Windows engine file
lock after writing the new model bindings. Its replacement engine had the same
checksum as the installed engine used for the passing tests.

M2.1 is ready for human review before M2.2. M2.2 owns community memberships
and scoped permissions. Local checks do not cover a deployment environment.
