---
name: culfest-security
description: Defensively design, implement, or review CulFest security controls. Use for authentication, authorization, organization scoping, input validation, uploads, voting integrity, rate limits, or sensitive data handling.
---

# CulFest security

1. Read [the authentication architecture](../../../docs/architecture.md#m11-authentication-and-authorization), [Better Auth configuration](../../../lib/auth.ts), and [server guards](../../../lib/admin-auth.ts). Preserve Better Auth sessions, server-owned roles, and trusted-origin checks.
2. Authorize each server-side read and write. Derive acting identity and approved membership from the server session and database. For organization-owned resources, constrain lookups and mutations to the authorized organization and resource. Test access with users from different organizations.
3. Validate untrusted IDs, bodies, query parameters, and uploaded files at the server boundary. Use parameterized database queries and safely render user content. Preserve trusted-origin checks for cookie-authenticated mutations.
4. When upload work is approved, enforce authorization and size limits, verify file type and content, use generated storage keys, and restrict private downloads to authorized callers.
5. Keep voting writes disabled until approved. For approved voting work, verify eligibility and contest scope, enforce expiry and duplicate prevention transactionally, and preserve rate limits for sign-in and voting.
6. Exclude credentials, session tokens, and private data from logs, public responses, and test artifacts. Use synthetic fixtures and run negative authorization tests locally.
