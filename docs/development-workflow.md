# CulFest development workflow

| Branch | Purpose |
| --- | --- |
| `main` | Stable, production-ready releases |
| `develop` | Integrated milestones with human approval |
| `milestone/*` | One approved milestone per branch |
| `fix/*` | Targeted bug fixes |
| `release/*` | Optional release preparation |

## Start a milestone

Check the working tree first and preserve any existing changes. Synchronize
`develop` before creating a branch.

```bash
git status --short --branch
git fetch origin
git switch develop
git merge --ff-only origin/develop
git switch -c milestone/<milestone-name>
```

For an existing milestone branch, run
`git merge-base --is-ancestor origin/develop HEAD`. If it exits with 1,
inspect the divergence and merge the required baseline when appropriate.
Use `fix/*` for a targeted change and open its PR against `develop` by default.

## Submit and review

Implement the approved scope. Run lint, typecheck, and relevant integration
and security checks. Update the architecture and backlog with verification
results and remaining limitations. Stage only the milestone changes, review
the staged diff, then commit and push.

```bash
git diff --cached
git commit -m "Implement <milestone>"
git push -u origin HEAD
gh pr create --base develop --fill
```

Stop for human review. Before merging, verify the scope and acceptance
criteria, passing checks, security boundaries, preserved migration history,
and absence of unintended changes, credentials, or sensitive test artifacts.
Confirm documentation and known limitations are current. Record any unresolved
release gates when granting conditional development acceptance.

After explicit milestone approval, merge the reviewed PR into `develop`.
Prefer a merge commit to preserve milestone history.

```bash
gh pr merge <pr-number> --merge
git fetch origin
git switch develop
git merge --ff-only origin/develop
```

## Production releases

Development acceptance and production release approval are separate decisions.
Release approval requires migration verification, security checks, and
deployment validation. Keep promotion to `main`, deployment, production data
changes, and voting activation behind their explicit approvals. Preserve shared
history and milestone branches. Avoid force-pushes and branch deletion.
