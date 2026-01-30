# Knowledge Index

A catalog of all available knowledge files in the Claude Office Skills project.

---

## Base Knowledge (Core Team Maintained)

These files provide foundational knowledge used by multiple skills.

| File | Description | Patterns |
|------|-------------|----------|
| [risk_patterns.json](./mcp-servers/office-mcp/knowledge/base/risk_patterns.json) | Universal contract risk patterns | 8 |
| [completeness.json](./mcp-servers/office-mcp/knowledge/base/completeness.json) | Contract completeness checklist | 19 |

### Jurisdictions

| File | Region | Key Topics |
|------|--------|------------|
| [us.json](./mcp-servers/office-mcp/knowledge/base/jurisdictions/us.json) | United States (Federal) | At-will employment, FLSA, Title VII |
| [china.json](./mcp-servers/office-mcp/knowledge/base/jurisdictions/china.json) | China (PRC) | Labor Contract Law, Social Insurance |
| [eu.json](./mcp-servers/office-mcp/knowledge/base/jurisdictions/eu.json) | European Union | GDPR, Working Time Directive |

---

## Domain Knowledge (Community Contributed)

### Legal

| File | Jurisdiction/Topic | Author | Patterns |
|------|-------------------|--------|----------|
| [california_employment.json](./mcp-servers/office-mcp/knowledge/custom/california_employment.json) | California, USA | claude-office-skills | 7 |

### Finance

*No contributions yet. [Be the first!](./CONTRIBUTING_KNOWLEDGE.md)*

### Healthcare

*No contributions yet. [Be the first!](./CONTRIBUTING_KNOWLEDGE.md)*

### HR

*No contributions yet. [Be the first!](./CONTRIBUTING_KNOWLEDGE.md)*

---

## Knowledge Coverage Matrix

### By Jurisdiction

| Jurisdiction | Employment | Contracts | Data Privacy | Status |
|--------------|------------|-----------|--------------|--------|
| 🇺🇸 US (Federal) | ✅ | ✅ | ⚠️ Basic | Available |
| 🇺🇸 California | ✅ | ✅ | ⚠️ Basic | Available |
| 🇺🇸 Texas | ❌ | ❌ | ❌ | Needed |
| 🇺🇸 New York | ❌ | ❌ | ❌ | Needed |
| 🇨🇳 China | ✅ | ✅ | ⚠️ Basic | Available |
| 🇪🇺 EU | ✅ | ✅ | ✅ GDPR | Available |
| 🇬🇧 UK | ❌ | ❌ | ❌ | Needed |
| 🇯🇵 Japan | ❌ | ❌ | ❌ | Needed |
| 🇸🇬 Singapore | ❌ | ❌ | ❌ | Needed |

### By Industry

| Industry | Contracts | Compliance | Specialized | Status |
|----------|-----------|------------|-------------|--------|
| General Business | ✅ | ✅ | N/A | Available |
| Healthcare (HIPAA) | ❌ | ❌ | ❌ | Needed |
| Finance (SOX) | ❌ | ❌ | ❌ | Needed |
| Government | ❌ | ❌ | ❌ | Needed |
| Real Estate | ❌ | ❌ | ❌ | Needed |
| Technology/SaaS | ❌ | ❌ | ❌ | Needed |

---

## Most Wanted Knowledge

Help us fill these gaps! See [CONTRIBUTING_KNOWLEDGE.md](./CONTRIBUTING_KNOWLEDGE.md) for how to contribute.

### High Priority

1. **UK Employment Law** - Post-Brexit employment regulations
2. **HIPAA Compliance** - Healthcare contract requirements
3. **Texas Employment** - State-specific variations
4. **New York Employment** - NYC additional protections
5. **SOX Compliance** - Financial services requirements

### Medium Priority

6. **Japan Employment** - Japanese labor law
7. **Singapore Employment** - Singapore MOM regulations
8. **Government Contracts (FAR)** - Federal acquisition requirements
9. **SaaS Agreements** - Cloud service specific terms
10. **Real Estate Leases** - Commercial lease patterns

---

## How to Use Knowledge

### In SKILL.md

```yaml
knowledge:
  base:
    - mcp-servers/office-mcp/knowledge/base/risk_patterns.json
    - mcp-servers/office-mcp/knowledge/base/completeness.json
  jurisdictions:
    - mcp-servers/office-mcp/knowledge/base/jurisdictions/us.json
  domain:
    - _shared/knowledge/domain/legal/california_employment.json
  custom:
    - ./knowledge/my_company_rules.json  # Your private knowledge
```

### Inheritance

Knowledge files can extend others:

```json
{
  "extends": "../../base/risk_patterns.json",
  "overrides": { ... },
  "additional_patterns": { ... }
}
```

---

## Statistics

| Metric | Count |
|--------|-------|
| Total Knowledge Files | 6 |
| Risk Patterns | 15+ |
| Completeness Items | 19 |
| Jurisdictions | 4 |
| Contributors | 1 |

*Last updated: 2026-01-30*

---

## Contributing

Want to add knowledge? Check out our [Knowledge Contribution Guide](./CONTRIBUTING_KNOWLEDGE.md).

Your expertise helps everyone!
