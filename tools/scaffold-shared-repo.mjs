#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
const out = path.resolve(process.argv[2] || path.join(process.cwd(), 'shared-repo-copy'));
fs.cpSync(process.cwd(), out, { recursive: true });
console.log(`Scaffolded shared repo copy into ${out}`);
