export const rules = [
  {
    id: 'injection/ignore-previous',
    severity: 'error',
    message: 'Possible prompt injection: instruction to ignore previous context',
    patterns: [
      /ignore (?:all )?(?:previous|above|prior) (?:instructions|context|rules)/i,
      /disregard (?:all )?(?:previous|above|prior)/i,
      /forget (?:everything|all|your) (?:previous|above|prior)/i,
    ],
  },
  {
    id: 'injection/role-switch',
    severity: 'error',
    message: 'Possible prompt injection: role switching attempt',
    patterns: [
      /you are now (?:a |an )?(?:different|new|evil|unrestricted)/i,
      /from now on,? (?:you|act|behave|respond)/i,
      /entering (?:developer|god|admin|root|sudo) mode/i,
      /\bDAN\b.*?(?:mode|jailbreak|do anything)/i,
    ],
  },
  {
    id: 'injection/system-leak',
    severity: 'error',
    message: 'Possible prompt injection: attempt to extract system prompt',
    patterns: [
      /(?:print|show|reveal|repeat|output|display) (?:your |the )?(?:system|initial|original|first) (?:prompt|message|instructions)/i,
      /what (?:is|are|was|were) your (?:system|initial|original) (?:prompt|instructions|message)/i,
      /(?:copy|paste|echo) (?:the )?(?:above|everything|system prompt)/i,
    ],
  },
  {
    id: 'injection/delimiter-escape',
    severity: 'warning',
    message: 'Suspicious delimiter pattern that may indicate injection framing',
    patterns: [
      /={5,}/,
      /-{5,}(?:END|BEGIN|SYSTEM|USER)/i,
      /```\s*system/i,
      /\[SYSTEM\]/i,
      /<\|(?:im_start|system|endoftext)\|>/i,
    ],
  },
  {
    id: 'antipattern/no-guardrails',
    severity: 'warning',
    message: 'System prompt lacks explicit output constraints or guardrails',
    patterns: [],
    multiLinePatterns: [
      /^(?!.*(?:must not|do not|never|refuse|decline|cannot|should not|forbidden|prohibited))(?:you are|system:).{20,}$/im,
    ],
  },
  {
    id: 'antipattern/vague-role',
    severity: 'info',
    message: 'Role definition is very short — consider being more specific',
    patterns: [
      /^you are (?:a |an )?(?:helpful|friendly|smart|good) (?:assistant|bot|ai)\.?$/i,
    ],
  },
  {
    id: 'injection/encoding-evasion',
    severity: 'warning',
    message: 'Possible encoding-based injection evasion (base64, hex, rot13 references)',
    patterns: [
      /(?:decode|base64|rot13|hex|encode) (?:the following|this|and execute)/i,
      /(?:execute|run|eval) (?:the )?(?:decoded|base64|hex)/i,
    ],
  },
  {
    id: 'injection/multi-persona',
    severity: 'error',
    message: 'Multi-persona injection attempt detected',
    patterns: [
      /(?:human|user|assistant|system)\s*:/i,
    ],
  },
];
