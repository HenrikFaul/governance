#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { readJson, writeFileSafe, templateCopilot, templateAgents, templateClaude, templateCursorMdc, templateContinueRule } from './common.mjs';

function arg(name, fallback) {
  const idx = process.argv.indexOf(name);
  return idx >= 0 ? process.argv[idx + 1] : fallback;
}

const configPath = arg('--config', path.join(process.cwd(), 'examples', 'new-repo.config.json'));
const outDir = path.resolve(arg('--out', path.join(process.cwd(), 'output')));
const cfg = readJson(configPath);
const centralOrg = cfg.centralRepoOrg || 'HenrikFaul';
const centralRepo = cfg.centralRepoName || 'governance';

const repoRoot = path.join(outDir, cfg.repo);
const govRoot = path.join(repoRoot, '.governance');
writeFileSafe(path.join(repoRoot, 'codingLessonsLearnt.local.md'), '# codingLessonsLearnt.local\n\n# Append new repo-specific lessons here. The collector merges them into the shared pack.\n');
writeFileSafe(path.join(repoRoot, 'AGENTS.md'), templateAgents());
writeFileSafe(path.join(repoRoot, 'CLAUDE.md'), templateClaude());
writeFileSafe(path.join(repoRoot, '.github', 'copilot-instructions.md'), templateCopilot());
writeFileSafe(path.join(repoRoot, '.cursor', 'rules', '00-governance.mdc'), templateCursorMdc());
writeFileSafe(path.join(repoRoot, '.continue', 'rules', '00-governance.md'), templateContinueRule());
for (const rel of ['controller.md','codingLessonsLearnt.md','versioning-guidelines.md']) {
  writeFileSafe(path.join(govRoot, rel), fs.readFileSync(path.join(process.cwd(), rel), 'utf8'));
}
for (const rel of ['tools/generate-instructions.mjs','tools/common.mjs']) {
  writeFileSafe(path.join(govRoot, rel), fs.readFileSync(path.join(process.cwd(), rel), 'utf8'));
}
for (const rel of ['governance-sync.yml','governance-export-lessons.yml','governance-validate.yml']) {
  const src = path.join(process.cwd(), 'templates', 'app', '.github', 'workflows', rel);
  let content = fs.readFileSync(src, 'utf8')
    .replaceAll('__ORG__', centralOrg)
    .replaceAll('__CENTRAL_REPO__', centralRepo)
    .replaceAll('__REPO__', cfg.repo);
  writeFileSafe(path.join(repoRoot, '.github', 'workflows', rel), content);
}
const centralCatalogPath = path.join(process.cwd(), 'catalog', 'repos.json');
const catalog = JSON.parse(fs.readFileSync(centralCatalogPath, 'utf8'));
if (!catalog.repos.find(r => r.org === cfg.org && r.repo === cfg.repo)) {
  catalog.repos.push({
    id: `${cfg.org}-${cfg.repo}`.toLowerCase(),
    org: cfg.org,
    repo: cfg.repo,
    projectName: cfg.projectName || cfg.repo,
    defaultBranch: cfg.defaultBranch || 'main',
    stack: cfg.stack || [],
    usesVersioningFolder: Boolean(cfg.usesVersioningFolder),
    governanceMode: cfg.governanceMode || 'subtree',
    active: true,
    localLessonsFile: cfg.localLessonsFile || 'codingLessonsLearnt.local.md'
  });
  writeFileSafe(path.join(outDir, 'central-updates', 'catalog', 'repos.json'), JSON.stringify(catalog, null, 2));
}
writeFileSafe(path.join(outDir, 'README_NEXT_STEPS.md'), `Generated governance files for ${cfg.org}/${cfg.repo}.\n\n1. Copy the generated files into the target app repo.\n2. If central-updates/catalog/repos.json exists, copy it back to the shared repo.\n3. Set GitHub secrets: GOV_PACK_DISPATCH_TOKEN and GOV_PACK_COLLECTOR_TOKEN.\n4. Enable GitHub Actions to create pull requests.\n5. Run node .governance/tools/generate-instructions.mjs in the target repo if needed.\n6. Add the subtree: git subtree add --prefix .governance https://github.com/${centralOrg}/${centralRepo}.git main --squash\n`);
console.log(`Bootstrapped governance files for ${cfg.repo} into ${repoRoot}`);
