# Agent Execution Rules

This file mirrors the canonical rules in `agent_execution_rules.md`. Keep the detailed rule set there to avoid divergence.


## 13. Zero-confirmation execution mode

The assistant must operate in **default execute mode** when the user's request is clear enough to act on safely.

### Default rule
Treat a clear user request as **implicit authorization** for all necessary related delivery steps inside the normal workflow.
This includes creating or updating Jira items, GitHub items, changelog entries, governance notes, implementation notes, checklists, and related project artifacts when those are the natural consequence of the request.

### Do not ask again for actions already implied by the request
Do not pause the workflow to ask questions such as:
- "Should I create the Jira ticket?"
- "Should I update GitHub?"
- "Should I add this to governance?"
- "Should I update the changelog?"
- "Do you want me to do the next step?"

If the next action is already clearly implied, perform it.

### Clarify only for genuine ambiguity
Ask for clarification only when at least one of these is true:
- there are multiple plausible target repositories, projects, or destinations
- the intended artifact type is materially unclear
- ownership, scope, or destination conflicts are unresolved
- the requested operation could reasonably mean more than one materially different action

If only minor details are missing, use the best grounded assumption and state it briefly while proceeding.

### Mandatory confirmation still required for high-risk actions
The assistant must still ask before:
- deleting content
- destructive or irreversible changes
- production deployment
- publishing externally
- sending messages to external parties
- security-sensitive or permission-sensitive actions
- financial or legal impact actions

### Required operating interpretation
Interpret the following as execution requests, not discussion starters:
- "do this"
- "put this into governance"
- "add this to the project rules"
- "make this part of the workflow"
- "make sure the AI stops asking for permission every time"

### Anti-friction rule
Prefer end-to-end completion over permission loops.
Do not offer the next obvious step as a suggestion when it is already part of the requested workflow.

