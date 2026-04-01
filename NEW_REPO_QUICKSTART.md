# New Repo Quick Input

Edit the JSON below and run the command shown under it.

```json
{
  "org": "HenrikFaul",
  "repo": "my-new-app",
  "projectName": "My New App",
  "defaultBranch": "main",
  "stack": [
    "nextjs",
    "typescript",
    "supabase"
  ],
  "usesVersioningFolder": true,
  "governanceMode": "subtree",
  "localLessonsFile": "codingLessonsLearnt.local.md",
  "centralRepoOrg": "HenrikFaul",
  "centralRepoName": "governance"
}
```

Command:
```bash
node tools/bootstrap-new-repo.mjs --config ./examples/new-repo.config.json --out ./generated
```

This will:
- generate all app-side files for the new repo
- prepare central catalog updates if needed
- point the new repo at `HenrikFaul/governance`
