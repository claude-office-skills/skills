# Contributing Knowledge

This guide explains how to contribute domain knowledge to the Claude Office Skills project.

## Knowledge Architecture

```
_shared/knowledge/
├── base/              # Core team maintained (do not modify)
├── domain/            # Community contributions (submit PRs here!)
│   ├── legal/
│   ├── finance/
│   ├── hr/
│   ├── healthcare/
│   ├── real-estate/
│   └── [your-domain]/
└── custom/            # Examples and templates
```

## Quick Start

### 1. Fork and Clone

```bash
git clone https://github.com/YOUR_USERNAME/skills.git
cd skills
```

### 2. Create Your Knowledge File

```bash
mkdir -p _shared/knowledge/domain/legal
touch _shared/knowledge/domain/legal/texas_employment.json
```

### 3. Write Your Knowledge

```json
{
  "version": "1.0",
  "author": "your-github-username",
  "description": "Texas-specific employment law knowledge",
  "extends": "../../mcp-servers/office-mcp/knowledge/base/risk_patterns.json",
  "jurisdiction": "texas",
  
  "overrides": {
    "excessive_noncompete": {
      "severity": "medium",
      "description": "Texas allows non-competes if reasonable in scope",
      "recommendation": "Ensure non-compete is ancillary to an otherwise enforceable agreement",
      "legal_references": ["Tex. Bus. & Com. Code § 15.50"]
    }
  },
  
  "additional_patterns": {
    "texas_at_will": {
      "id": "texas_at_will",
      "name": "Texas At-Will Employment",
      "severity": "low",
      "keywords": ["at-will", "employment at will", "terminate"],
      "description": "Texas is a strong at-will employment state",
      "recommendation": "At-will provisions are standard and enforceable in Texas"
    }
  }
}
```

### 4. Validate Your Knowledge

```bash
# Check JSON syntax
python -m json.tool _shared/knowledge/domain/legal/texas_employment.json

# Or use jq
jq . _shared/knowledge/domain/legal/texas_employment.json
```

### 5. Submit a Pull Request

```bash
git checkout -b add-texas-employment-knowledge
git add _shared/knowledge/domain/legal/texas_employment.json
git commit -m "feat(knowledge): add Texas employment law patterns"
git push origin add-texas-employment-knowledge
```

Then open a PR on GitHub.

---

## Knowledge File Schema

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `version` | string | Schema version (use "1.0") |
| `author` | string | Your GitHub username |
| `description` | string | Brief description of this knowledge |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `extends` | string | Path to base knowledge file to inherit from |
| `jurisdiction` | string | Legal jurisdiction (e.g., "texas", "california", "uk") |
| `industry` | string | Industry domain (e.g., "healthcare", "finance") |
| `overrides` | object | Override specific patterns from base |
| `additional_patterns` | object | Add new patterns |
| `completeness_additions` | array | Add checklist items |

### Risk Pattern Schema

```json
{
  "pattern_id": {
    "id": "pattern_id",
    "name": "Human Readable Name",
    "name_zh": "中文名称 (optional)",
    "severity": "low | medium | high | critical",
    "category": "liability | termination | ip | confidentiality | ...",
    "keywords": ["keyword1", "keyword2"],
    "keywords_zh": ["关键词1", "关键词2"],
    "description": "What this pattern means",
    "description_zh": "中文描述",
    "recommendation": "What action to take",
    "recommendation_zh": "中文建议",
    "legal_references": ["Statute § 123", "Case Name (Year)"]
  }
}
```

### Severity Levels

| Level | When to Use |
|-------|-------------|
| `critical` | Void/unenforceable clauses, immediate legal risk |
| `high` | Significant financial or legal exposure |
| `medium` | Unfavorable but negotiable terms |
| `low` | Minor issues, best practice suggestions |

---

## Domain Categories

### Legal

```
_shared/knowledge/domain/legal/
├── california_employment.json
├── texas_employment.json
├── new_york_employment.json
├── uk_employment.json
├── gdpr_compliance.json
├── hipaa_contracts.json
└── government_contracts.json
```

### Finance

```
_shared/knowledge/domain/finance/
├── sox_compliance.json
├── investment_agreements.json
├── loan_documents.json
├── insurance_contracts.json
└── fintech_regulations.json
```

### HR

```
_shared/knowledge/domain/hr/
├── remote_work_policies.json
├── equity_compensation.json
├── executive_agreements.json
└── union_contracts.json
```

### Healthcare

```
_shared/knowledge/domain/healthcare/
├── hipaa_requirements.json
├── clinical_trial_agreements.json
├── medical_device_contracts.json
└── pharmaceutical_licensing.json
```

---

## Best Practices

### DO

- ✅ Use clear, specific pattern names
- ✅ Include legal references where applicable
- ✅ Provide actionable recommendations
- ✅ Add both English and Chinese (if possible)
- ✅ Test with actual contracts before submitting
- ✅ Keep patterns focused and specific

### DON'T

- ❌ Copy content from copyrighted legal databases
- ❌ Include confidential client information
- ❌ Make patterns too broad or vague
- ❌ Forget to validate JSON syntax
- ❌ Submit without testing

---

## Review Process

1. **Automated Checks**
   - JSON syntax validation
   - Schema compliance
   - Required fields present

2. **Human Review**
   - Accuracy of legal information
   - Quality of recommendations
   - Proper severity ratings

3. **Merge & Release**
   - Approved PRs merged to main
   - Included in next release
   - Added to KNOWLEDGE_INDEX.md

---

## Examples

### Example 1: Override Base Pattern

```json
{
  "version": "1.0",
  "author": "california-lawyer",
  "extends": "../../mcp-servers/office-mcp/knowledge/base/risk_patterns.json",
  "jurisdiction": "california",
  
  "overrides": {
    "excessive_noncompete": {
      "severity": "critical",
      "description": "Non-compete clauses are VOID in California",
      "recommendation": "REMOVE entirely. California Bus. & Prof. Code § 16600"
    }
  }
}
```

### Example 2: Add Industry-Specific Patterns

```json
{
  "version": "1.0",
  "author": "healthcare-compliance",
  "industry": "healthcare",
  
  "additional_patterns": {
    "missing_baa": {
      "id": "missing_baa",
      "name": "Missing Business Associate Agreement",
      "severity": "critical",
      "keywords": ["PHI", "protected health information", "HIPAA"],
      "description": "Contract involves PHI but lacks BAA",
      "recommendation": "Add HIPAA-compliant Business Associate Agreement"
    },
    "hipaa_breach_notification": {
      "id": "hipaa_breach_notification",
      "name": "HIPAA Breach Notification",
      "severity": "high",
      "keywords": ["breach", "notification", "security incident"],
      "description": "Inadequate breach notification provisions",
      "recommendation": "Must notify within 60 days per 45 CFR § 164.404"
    }
  }
}
```

### Example 3: Add Completeness Items

```json
{
  "version": "1.0",
  "author": "government-contracts-specialist",
  "industry": "government",
  
  "completeness_additions": [
    {
      "id": "far_clauses",
      "name": "FAR Required Clauses",
      "required": true,
      "description": "Federal Acquisition Regulation mandatory clauses"
    },
    {
      "id": "cybersecurity_requirements",
      "name": "CMMC/NIST Cybersecurity",
      "required": true,
      "description": "Cybersecurity requirements for defense contracts"
    }
  ]
}
```

---

## Questions?

- Open an issue: [GitHub Issues](https://github.com/claude-office-skills/skills/issues)
- Join discussions: [GitHub Discussions](https://github.com/claude-office-skills/skills/discussions)

---

**Thank you for contributing!** Your domain expertise helps make Claude more useful for everyone.
