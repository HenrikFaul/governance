#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

function normalize(s) {
  return s.replace(/
/g, '
').replace(/[ 	]+
/g, '
').replace(/
{3,}/g, '

').trim();
}
function hashOf(text) {
  return 'sha256:' + crypto.createHash('sha256').update(text).digest('hex');
}
function parseEntries(md, repoOrigin) {
  const blocks = md.split(/
###\s+/).slice(1);
  return blocks.map(block => {
    const firstNl = block.indexOf('
');
    const title = block.slice(0, firstNl).trim();
    const body = normalize(block.slice(firstNl + 1));
    const idMatch = title.match(/\[([^\]]+)\]/);
    const id = idMatch ? idMatch[1].replace(/^HIBA-/, 'COMMON-HIBA-') : `COMMON-HIBA-AUTO-${hashOf(title).slice(-8)}`;
    return { id, title, repoOrigin, body, hash: hashOf(title + '
' + body) };
  });
}
const incomingDir = path.resolve(process.argv[2] || '_incoming');
const outMd = path.resolve(process.argv[3] || 'codingLessonsLearnt.merged.md');
const files = [];
for (const entry of fs.readdirSync(incomingDir, { withFileTypes: true })) {
  if (entry.isDirectory()) {
    const p1 = path.join(incomingDir, entry.name, 'codingLessonsLearnt.local.md');
    const p2 = path.join(incomingDir, entry.name, 'codingLessonsLearnt.md');
    if (fs.existsSync(p1)) files.push([p1, entry.name]);
    else if (fs.existsSync(p2)) files.push([p2, entry.name]);
  }
}
const seen = new Map();
for (const [file, origin] of files) {
  const md = fs.readFileSync(file, 'utf8');
  for (const e of parseEntries(md, origin)) {
    const key = seen.has(e.id) ? e.hash : e.id;
    if (!seen.has(key)) seen.set(key, e);
  }
}
const rendered = ['# codingLessonsLearnt (Merged)', '', '> Auto-generated central merged knowledge base.', ''];
for (const e of [...seen.values()].sort((a,b)=>a.id.localeCompare(b.id))) {
  rendered.push(`### [${e.id}] ${e.title.replace(/^\[[^\]]+\]\s*/, '')}`);
  rendered.push(`- **RepoOrigin**: ${e.repoOrigin}`);
  rendered.push(`- **Hash**: ${e.hash}`);
  rendered.push(e.body, '');
}
fs.writeFileSync(outMd, rendered.join('
'), 'utf8');
console.log(`Merged ${files.length} repo lesson files into ${outMd}`);
