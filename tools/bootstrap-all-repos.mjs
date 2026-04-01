#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {{ execFileSync }} from 'node:child_process';
const cwd = process.cwd();
const catalog = JSON.parse(fs.readFileSync(path.join(cwd, 'catalog', 'repos.json'), 'utf8'));
const outDir = path.resolve(process.argv[2] || path.join(cwd, 'generated-repos'));
fs.mkdirSync(outDir, { recursive: true });
for (const repo of catalog.repos.filter(r => r.active)) {
  const cfgPath = path.join(outDir, `${repo.repo}.config.json`);
  fs.writeFileSync(cfgPath, JSON.stringify({
    org: repo.org,
    repo: repo.repo,
    projectName: repo.projectName || repo.repo,
    defaultBranch: repo.defaultBranch || 'main',
    stack: repo.stack || [],
    usesVersioningFolder: !!repo.usesVersioningFolder,
    governanceMode: repo.governanceMode || 'subtree',
    localLessonsFile: repo.localLessonsFile || 'codingLessonsLearnt.local.md',
    centralRepoOrg: catalog.centralRepo.org,
    centralRepoName: catalog.centralRepo.repo
  }, null, 2));
  execFileSync('node', [path.join(cwd, 'tools', 'bootstrap-new-repo.mjs'), '--config', cfgPath, '--out', outDir], { stdio: 'inherit' });
}
console.log(`Generated repo bundles into ${outDir}`);
