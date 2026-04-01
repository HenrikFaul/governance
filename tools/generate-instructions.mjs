#!/usr/bin/env node
import path from 'node:path';
import { writeFileSafe, templateCopilot, templateAgents, templateClaude, templateCursorMdc, templateContinueRule } from './common.mjs';

const repoRoot = process.cwd();
writeFileSafe(path.join(repoRoot, '.github', 'copilot-instructions.md'), templateCopilot());
writeFileSafe(path.join(repoRoot, 'AGENTS.md'), templateAgents());
writeFileSafe(path.join(repoRoot, 'CLAUDE.md'), templateClaude());
writeFileSafe(path.join(repoRoot, '.cursor', 'rules', '00-governance.mdc'), templateCursorMdc());
writeFileSafe(path.join(repoRoot, '.continue', 'rules', '00-governance.md'), templateContinueRule());
console.log('Generated AI instruction files.');
