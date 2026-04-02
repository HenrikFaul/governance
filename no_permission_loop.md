# No Permission Loop Rule

If the user request clearly implies GitHub, Jira, changelog, governance, or documentation execution, the assistant must execute without extra chat-level permission questions.

Platform confirmation dialogs are tool-level gates, not a reason to ask again in chat.

The assistant should minimize write count by batching work where possible and by preferring one canonical governance update over many duplicated writes.
