import fs from 'node:fs';
import path from 'node:path';

export function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

export function writeFileSafe(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content, 'utf8');
}

export function canonicalRuleBlock() {
  return [
    '# Shared Dev Governance Rules',
    '',
    '- The source of truth lives in `.governance/controller.md`, `.governance/codingLessonsLearnt.md`, and `.governance/versioning-guidelines.md`.',
    '- Never break already working functionality.',
    '- Read governance files before implementing changes.',
    '- Update changelog and versioning artifacts when requested by controller.',
    '- Append new lessons to `codingLessonsLearnt.local.md`; central collector will merge them.',
    '- Prefer the smallest regression-risk solution and validate build/lint/tests.',
    ''
  ].join('\n');
}

export function templateCopilot() {
  return canonicalRuleBlock() + [
    '## Repo workflow',
    '- Use `.governance/controller.md` as the primary operating guide.',
    '- Use `.governance/codingLessonsLearnt.md` and `codingLessonsLearnt.local.md` to avoid repeating known mistakes.',
    '- Keep file changes reviewable and deterministic.',
    ''
  ].join('\n');
}

export function templateAgents() {
  return canonicalRuleBlock() + [
    '## Agent workflow',
    '- Before coding: inspect `.governance/controller.md`, `.governance/codingLessonsLearnt.md`, and local repo changelog.',
    '- After coding: run repo validation commands and update required docs.',
    ''
  ].join('\n');
}

export function templateClaude() {
  return canonicalRuleBlock() + [
    '## Claude Code notes',
    '- Keep edits minimal and safe.',
    '- Do not remove existing features during redesign or refactor.',
    ''
  ].join('\n');
}

export function templateCursorMdc() {
  return `---
description: Shared governance rules
alwaysApply: true
---

${canonicalRuleBlock()}`;
}

export function templateContinueRule() {
  return canonicalRuleBlock();
}
