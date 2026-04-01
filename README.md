# Governance Pack for HenrikFaul

This shared repository is the canonical source of truth for:
- controller rules
- coding lessons learned
- versioning guidance
- AI instruction generation
- CI collection and validation

## Registered repos
- HenrikFaul/hobbeast
- HenrikFaul/pubapp
- HenrikFaul/pixel-perfect-clone-8300
- HenrikFaul/ReleaseGovernance
- HenrikFaul/friends-availability-calendar
- HenrikFaul/work

## Commands
```bash
npm run validate
npm run bootstrap:new -- --config examples/new-repo.config.json --out ./generated
npm run bootstrap:all -- ./generated-existing-repos
npm run merge:lessons -- ./_incoming ./codingLessonsLearnt.merged.md
```
