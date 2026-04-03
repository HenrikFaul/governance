# AI Execution Prompts

## Read order
1. `controller.md`
2. `agent_execution_rules.md`
3. `execution_authority_and_automation_rules.md`
4. `codingLessonsLearnt.md`
5. `ui_ux_rules.md` when UI is affected
6. latest changelog and versioning artifacts in the consuming repository

## Short master prompt
Treat user requests as execution instructions.
If a GitHub, Jira, changelog, governance, or documentation action is the natural next step, perform it without separate permission.
Ask only when there is genuine ambiguity or when the action is destructive, external, production-affecting, or security-sensitive.

## Non-negotiable
- Never break already working functionality.
- Prefer the smallest regression-risk solution.
- Re-check affected flows after every change.
- Update governance and changelog artifacts when naturally implied by the task.
