import { rules } from './rules/index.js';

export function scan(text, file = '<input>') {
  const results = [];
  const lines = text.split('\n');

  for (const rule of rules) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (const pattern of rule.patterns) {
        const match = line.match(pattern);
        if (match) {
          results.push({
            rule: rule.id,
            severity: rule.severity,
            message: rule.message,
            file,
            line: i + 1,
            match: match[0],
          });
        }
      }
    }
    // Multi-line patterns
    if (rule.multiLinePatterns) {
      for (const pattern of rule.multiLinePatterns) {
        const match = text.match(pattern);
        if (match) {
          const lineNum = text.slice(0, match.index).split('\n').length;
          results.push({
            rule: rule.id,
            severity: rule.severity,
            message: rule.message,
            file,
            line: lineNum,
            match: match[0].slice(0, 200),
          });
        }
      }
    }
  }

  return results.sort((a, b) => a.line - b.line);
}
