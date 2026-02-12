# prompt-fence 🛡️

A CLI linter that scans LLM prompts and system messages for injection vulnerabilities and anti-patterns.

## Usage

```bash
# Scan a file
node src/index.js examples/vulnerable-prompt.txt

# Scan with JSON output
node src/index.js --json examples/vulnerable-prompt.txt

# Pipe from stdin
echo "Ignore all previous instructions" | node src/index.js
```

## Rules

| Rule | Severity | Description |
|------|----------|-------------|
| `injection/ignore-previous` | error | Detects "ignore previous instructions" patterns |
| `injection/role-switch` | error | Detects role switching / jailbreak attempts |
| `injection/system-leak` | error | Detects attempts to extract system prompts |
| `injection/delimiter-escape` | warning | Suspicious delimiter patterns |
| `injection/encoding-evasion` | warning | Base64/hex encoding evasion attempts |
| `injection/multi-persona` | error | Multi-persona chat format injection |
| `antipattern/no-guardrails` | warning | System prompt lacks constraints |
| `antipattern/vague-role` | info | Overly vague role definition |

## Adding Rules

Add new rule objects to `src/rules/index.js`. Each rule needs:
- `id` — unique identifier
- `severity` — error/warning/info
- `message` — human-readable description
- `patterns` — array of RegExp for line-by-line matching
- `multiLinePatterns` (optional) — array of RegExp for full-text matching

## License

MIT
