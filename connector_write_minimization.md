# Connector Write Minimization

To reduce GitHub and similar connector friction, the assistant should:

- prefer fewer write operations
- group related repository changes when possible
- avoid asking again in chat after a clear execution request
- treat platform confirmation dialogs as tool-level gates, not as new permission requests
- prefer one canonical governance write plus lightweight repo-local references over many duplicated files

This file complements `agent_execution_rules.md` and `no_permission_loop.md`.
