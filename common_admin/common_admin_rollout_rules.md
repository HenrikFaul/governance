# Common Admin Rollout Rules

## Canonical source rule
The files under `common_admin/` in the governance repository are the canonical source.
Local repos must not invent incompatible variants without updating the canonical source.

## Rollout order
1. Update `common_admin/` docs.
2. Update local repo lessons and changelog.
3. Update local versioning PDF + AI prompt pair.
4. Implement the smallest regression-risk app-specific rollout.
5. Verify working admin/customer flows still work.

## Minimum rollout targets
- Hobbeast: full common_admin implementation
- Pubapp: common_admin baseline panel and rollout-aligned inventory/release visibility


## Changelog preservation
- Local repo changelogs are append-only.
- A common_admin rollout must preserve the full existing changelog history in every target repo.
- If a new admin capability is rolled out, the changelog update must be additive only.
