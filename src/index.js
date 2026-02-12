#!/usr/bin/env node
import { readFileSync } from 'fs';
import { scan } from './scanner.js';

const args = process.argv.slice(2);
const jsonFlag = args.includes('--json');
const files = args.filter(a => !a.startsWith('--'));

if (files.length === 0) {
  // Read from stdin
  let input = '';
  process.stdin.setEncoding('utf8');
  for await (const chunk of process.stdin) input += chunk;
  output(scan(input, '<stdin>'), jsonFlag);
} else {
  const allResults = [];
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    allResults.push(...scan(text, file));
  }
  output(allResults, jsonFlag);
}

function output(results, json) {
  if (json) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    if (results.length === 0) {
      console.log('✅ No issues found.');
      return;
    }
    for (const r of results) {
      const icon = r.severity === 'error' ? '🔴' : r.severity === 'warning' ? '🟡' : '🔵';
      console.log(`${icon} [${r.rule}] ${r.message}`);
      console.log(`   ${r.file}:${r.line} — "${r.match.slice(0, 80)}${r.match.length > 80 ? '...' : ''}"`);
      console.log();
    }
    const errors = results.filter(r => r.severity === 'error').length;
    const warnings = results.filter(r => r.severity === 'warning').length;
    console.log(`Found ${errors} error(s), ${warnings} warning(s) in ${new Set(results.map(r=>r.file)).size} file(s).`);
    process.exitCode = errors > 0 ? 1 : 0;
  }
}
