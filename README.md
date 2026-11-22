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

M1.0 was tested on Windows with Node.js 24.14.1, npm 11.11.0, and
MySQL 8.0.46.

```bash
npm ci
npm run dev
```

Open **http://localhost:3000**. The current public pages and disabled voting
endpoints run without MySQL. On a fresh machine, `npm ci` needs access to the
public npm registry or a populated cache. Prisma Client generation may also
need the Prisma engine download on a cold cache. With a populated npm cache,
`npm ci --offline --no-audit --no-fund` can install the locked dependencies.

### Local MySQL

1. Start a local MySQL 8 instance. On that instance, create an empty
   `culfest_dev` database and a local user with permissions on that database.
2. Copy `.env.example` to `.env`. Set `DATABASE_URL` to the local database
   using your chosen password. Percent-encode special characters in the URL
   username or password. Keep `.env` out of Git.
3. Apply and verify the migrations from the project root.

```bash
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

### Admin authentication status

M1.1 is blocked at dependency validation. The Windows sandbox cannot resolve
the npm registry or reach local MySQL over TCP. The existing admin login is a
mock and management pages have no server-side authorization. Keep these routes
private until the replacement passes its staging checks. See the
[M1.1 preflight results](docs/architecture.md#m11-pre-implementation-validation).

## Project structure

- `app/` — routes and UI (Next.js App Router)

## Deployment

This project can be deployed on any platform that supports Next.js (for example, Vercel). The production site is currently deployed at **https://culturalfestivalugmr.id/**
