# Shared Dev Governance Controller

This repository is governed by the central pack from `HenrikFaul/governance`.

## Non-negotiable rules
1. Never break already working functionality.
2. Read `.governance/codingLessonsLearnt.md` and the local `CHANGELOG.md` before implementation.
3. Prefer the smallest regression-risk solution.
4. Validate with build, lint, typecheck, tests, and route-specific smoke checks where available.
5. Append new repo-specific lessons to `codingLessonsLearnt.local.md` only; the collector will merge them back to the shared repo.
6. When required by the repo, update `CHANGELOG.md` and the `versioning/` documentation pair.
7. Keep AI instruction files generated from this controller and do not hand-edit them.

## Required delivery checklist
- Read lessons + changelog
- Identify root cause
- Compare at least 2 solution options when risk is non-trivial
- Implement with checklist discipline
- Re-check that previously working features still work
- Update changelog and versioning artifacts when applicable

## Files
- Shared lessons: `.governance/codingLessonsLearnt.md`
- Shared versioning rules: `.governance/versioning-guidelines.md`
- Local lessons append target: `codingLessonsLearnt.local.md`

## Execution authority enforcement
- Treat clear user requests as execution instructions, not discussion starters.
- If Jira, GitHub, changelog, governance, implementation-note, or documentation updates are the natural next step, execute them without separate approval.
- Ask only for genuine ambiguity or for destructive, external, production, security-sensitive, financial, or legal actions.
- Prefer end-to-end completion with minimal friction.


## Common Admin canonical-source rule
- The reusable admin capability model must live first in `common_admin/` inside this governance repository.
- Repositories such as `HenrikFaul/hobbeast` and `HenrikFaul/pubapp` must implement local admin UI changes by reading the canonical `common_admin` model before coding.
- If the shared admin capability model changes, update the canonical governance files first, then roll the change into each consuming repository.
- Do not create divergent parallel admin models across repositories when the capability is intentionally shared.

## Append-only changelog rule
- `CHANGELOG.md` files are append-only historical ledgers.
- Never replace, rewrite, truncate, reorder destructively, or drop earlier release history.
- New deliveries must be added as new sections while preserving all previous entries verbatim.
- If a changelog correction is required, fix it by appending a corrective entry instead of deleting historical content.
- Structural chronological reordering (fixing version order without dropping content) is permitted only as part of an explicit governance fix delivery, with full history verified as preserved.

## APPEND files rule
- Files named `CHANGELOG_APPEND_v*.md` and `CODING_LESSONS_APPEND_v*.md` are temporary staging files.
- They must be merged into the canonical target file (`changelog.md`, `codingLessonsLearnt.md`) as soon as the delivery is finalized.
- After merging, the APPEND file must be deleted from the repository root.
- Never accumulate APPEND files — they are a single-use staging mechanism, not a permanent record.
