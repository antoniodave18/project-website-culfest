# CulFest project instructions

- Keep replies concise and preserve technical detail.
- Use relevant project skills for the task. Load Caveman on request and Ponytail when useful.
- Branch approved milestones from current `origin/develop`. Push and open a PR to `develop`, then wait for explicit human approval before merging.
- Keep `main` for separately approved releases. Follow the [development workflow](docs/development-workflow.md).
- Keep voting disabled until explicitly approved.
- Require explicit approval before deployment or production data changes.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
