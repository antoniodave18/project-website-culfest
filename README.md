# Cultural Festival 15 — Website

Official website for **Cultural Festival 15**.

## Live site

The app is live at **https://culturalfestivalugmr.id/**

## About

This repository contains a web application built with **Next.js (App Router)** and **TypeScript**. It powers the public-facing Cultural Festival 15 site, providing visitors with key event information and updates.

## Tech stack

- **Next.js**
- **React**
- **TypeScript**

## Development

See the [development workflow](docs/development-workflow.md) for branches, milestone pull requests, and release approvals.

M1.0 was tested on Windows with Node.js 24.14.1, npm 11.11.0, and
MySQL 8.0.46.

```bash
npm ci
npm run dev
```

Open **http://localhost:3000**. Admin sign-in and the public Jelajah Ormada
directory and profiles use MySQL. Public voting remains disabled.
On a fresh machine, `npm ci` needs access to the
public npm registry or a populated cache. Prisma Client generation may also
need the Prisma engine download on a cold cache. With a populated npm cache,
`npm ci --offline --no-audit --no-fund` can install the locked dependencies.

### Local MySQL

1. Start local MySQL 8 on port 3306. Create separate `culfest_dev`,
   `culfest_test`, and `culfest_shadow` databases. Restrict the local user's
   permissions to its intended databases.
2. Copy `.env.example` to `.env`. Point `DATABASE_URL` at development,
   `TEST_DATABASE_URL` at disposable tests, and `SHADOW_DATABASE_URL` at the
   dedicated shadow database. Prisma can reset the shadow database during
   migration validation. Keep its data disposable. Percent-encode special
   characters in URL credentials and keep `.env` out of Git.
3. Apply and verify the migrations from the project root.

```bash
npm run db:verify
npx prisma validate
npx prisma migrate deploy
npx prisma migrate status
npx prisma migrate diff --from-schema-datasource prisma/schema.prisma --to-schema-datamodel prisma/schema.prisma --exit-code
```

The diff exits with code 0 when the database schema matches the datamodel.
Run this sequence against an empty disposable database for migration testing.
Review the existing database schema and migration records before applying the
reconstructed baseline to any previously initialized environment. See the
[migration history and rollback notes](docs/architecture.md#prisma-schema-and-migration-history).

### Checks

```bash
npm run lint
npm run typecheck
npm run build
```

Merriweather and EFCO Brookshire are bundled locally. If Turbopack cannot start
its workers in a restricted environment, try `npm run build -- --webpack`.

### Admin authentication

Set `BETTER_AUTH_URL` to the app's origin and `BETTER_AUTH_SECRET` to a
random secret of at least 32 characters. Use HTTPS for deployment. Set
`AUTH_CLIENT_IP_HEADER` to a header that your trusted ingress overwrites with
the verified client IP. Restrict direct access to the app so clients cannot
spoof that header. Direct loopback HTTP shares one five-attempt limit without
the header.

From PowerShell 7, after applying the migration to `culfest_dev`, provision or
revoke a local administrator. Use 12–128 characters for the masked password.

```powershell
Read-Host -MaskInput "Admin password" | npm run admin:account -- provision admin@example.test
npm run admin:account -- revoke admin@example.test
```

Provisioning refuses duplicate emails. Revocation demotes the account and
removes its sessions. Visit `/Admin` to sign in. Platform administrators land at
`/Admin/manajemen`, which links to the existing voting management screens.
The dashboard shows planned modules without links. Public registration is closed
and voting remains disabled.

Run these checks in a normal PowerShell session that can reach local MySQL.
The integration test verifies and applies migrations only on `culfest_test`,
checks schema drift, and starts a loopback server against the production build.

```powershell
npm run db:verify
npm run build
npm run test:admin-auth
```

[M2.0 dashboard and validation](docs/architecture.md#m20-admin-dashboard)

### Community directory and administration

After verifying the local migration history and schema, apply the Community
migration and import the 25 original Ormada profiles.

```powershell
npm run db:verify
npx prisma migrate deploy
npx prisma generate
npm run db:seed:communities
```

The seed reads [the original profiles](prisma/ormada-seed.json) in their existing
order. It inserts only missing slugs and preserves administrator edits on reruns.
It runs explicitly and targets `culfest_dev` by default. Add `-- --test` to the
seed command to target `culfest_test`.

Platform administrators open **Komunitas** in the admin sidebar. The list is at
`/Admin/manajemen/komunitas`. Add a draft at `/Admin/manajemen/komunitas/new`
or edit, publish, unpublish, or archive a profile at
`/Admin/manajemen/komunitas/[id]/edit`. Publication locks the slug permanently.
Archiving keeps the record and slug, and the public URL shows an archive notice.
Claim and verification are administrative statuses. The form accepts existing
image paths under `/images/`. An empty logo uses the CulFest placeholder.

The admin auth integration command also exercises community CRUD and the 25
public profiles. Install Playwright separately and set
`CULFEST_PLAYWRIGHT_MODULE` to the path to its package directory. With Chrome
installed, run `npm run test:admin-auth -- --browser` for desktop, tablet, and
mobile checks against disposable MySQL. Screenshots go to
`.playwright-cli/m21/`. See [M2.1 architecture and verification](docs/architecture.md#m21-community-database-and-crud).

## Community workspaces and email verification

After applying the M2.2 migrations locally, seed the public profiles if needed,
then provision workspaces for all existing communities.

```powershell
npm run db:seed:communities
node --env-file=.env scripts/workspace-provision.mjs
```

Platform administrators can open **Verifikasi email** in the admin sidebar.
Enter the address of an existing unverified account and send the generated link
manually to that exact mailbox. The recipient signs in with their existing account
and confirms within 15 minutes. Once verified, the recipient can accept a
community invitation sent through the same manual delivery process.

Open **Portal komunitas** at `/Community` to edit profiles, manage members,
or transfer ownership according to your role. To invite a first owner, the
platform administrator first sets the community to **CLAIMED** and **VERIFIED**.

Run `npm run test:admin-auth -- --membership-browser` after a production build
to repeat the M2.2 browser checks with disposable MySQL. Screenshots go to
`.playwright-cli/m22/`. See [M2.2 architecture](docs/architecture.md#m22-community-workspaces-and-verification).

## Project structure

- `app/` — routes and UI (Next.js App Router)

## Deployment

This project can be deployed on any platform that supports Next.js (for example, Vercel). The production site is currently deployed at **https://culturalfestivalugmr.id/**
