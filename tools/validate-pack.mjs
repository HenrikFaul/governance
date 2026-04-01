#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
const mustExist = [
  'controller.md',
  'codingLessonsLearnt.md',
  'versioning-guidelines.md',
  'catalog/repos.json',
  'schemas/lesson-entry.schema.json',
  'schemas/repo-catalog.schema.json',
  'tools/bootstrap-new-repo.mjs',
  'tools/bootstrap-all-repos.mjs',
  '.github/workflows/collector.yml'
];
for (const rel of mustExist) {
  const p = path.join(process.cwd(), rel);
  if (!fs.existsSync(p)) {
    console.error(`Missing required file: ${rel}`);
    process.exit(1);
  }
}
const catalog = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'catalog', 'repos.json'), 'utf8'));
if (!catalog.centralRepo || !catalog.repos?.length) {
  console.error('catalog/repos.json must declare centralRepo and at least one repo');
  process.exit(1);
}
console.log('Governance pack validation passed.');
