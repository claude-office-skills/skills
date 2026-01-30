# Shared Knowledge Library

This directory contains knowledge files that can be shared across multiple Skills.

## Directory Structure

```
_shared/knowledge/
├── base/           # Foundation knowledge (maintained by core team)
├── domain/         # Industry/domain-specific knowledge
│   ├── legal/
│   ├── finance/
│   ├── hr/
│   └── marketing/
└── custom/         # User-contributed knowledge
```

## How to Use

### Reference in SKILL.md

```yaml
knowledge:
  shared:
    - _shared/knowledge/domain/legal/employment.json
    - _shared/knowledge/domain/legal/nda.json
  custom:
    - ./my_knowledge/company_rules.json
```

### Knowledge File Format

```json
{
  "version": "1.0",
  "author": "contributor-name",
  "extends": "../base/risk_patterns.json",
  
  "risk_patterns": {
    "pattern_id": {
      "name": "Pattern Name",
      "severity": "high",
      "keywords": ["keyword1", "keyword2"],
      "description": "What this pattern means",
      "recommendation": "What to do about it"
    }
  }
}
```

## Contributing

1. Create your knowledge file following the format above
2. Place in appropriate subdirectory under `domain/` or `custom/`
3. Test with a skill that uses the knowledge
4. Submit a PR

## See Also

- [MCP Knowledge Guide](../mcp-servers/office-mcp/knowledge/README.md)
- [Knowledge Loader Implementation](../mcp-servers/office-mcp/src/knowledge/loader.ts)
