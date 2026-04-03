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

## Governance file roles
- `controller.md` = operating controller and enforcement layer
- `agent_execution_rules.md` = canonical execution authority and zero-confirmation rules
- `codingLessonsLearnt.md` = lessons learned, verification protocol, recurring mistake prevention
- `business_process_automation_prompts.md` = reusable master prompts and role-based execution prompts


## Shared common_admin model
The canonical reusable admin capability model lives under `common_admin/` in this repository.
It is the source of truth for:
- integration and hosting inventory panels
- version and deployment metadata panels
- provider configuration and provider test panels
- local catalog resync / health panels
- rollout expectations for consuming repositories

## Append-only documentation rule
This governance pack treats changelogs and historical governance logs as append-only records.
Do not delete earlier history when introducing new rules or releases.
