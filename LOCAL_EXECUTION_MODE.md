# Local Execution Mode

This repository is itself the canonical governance source.

Canonical execution-governance files in this repository:
- `agent_execution_rules.md`
- `no_permission_loop.md`
- `connector_write_minimization.md`

Operating expectation:
- do not open extra chat-level permission loops when the request already implies governance, GitHub, Jira, changelog, or documentation execution
- do not treat connector confirmation dialogs as a reason to ask the same permission again in chat
- minimize connector friction by batching writes where possible
