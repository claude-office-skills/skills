# Official Anthropic Skills

This section contains references to official Claude skills from [Anthropic's skills repository](https://github.com/anthropics/skills).

> **Note**: The document skills (docx, xlsx, pptx, pdf) are source-available but proprietary. See the original repository for complete terms.

## Document Skills (Source-Available)

These skills power Claude's built-in document capabilities. They are already available to paid Claude.ai users.

| Skill | Description | Original |
|-------|-------------|----------|
| [DOCX](./docx-guide.md) | Word document creation, editing, tracked changes | [anthropics/skills/docx](https://github.com/anthropics/skills/tree/main/skills/docx) |
| [XLSX](./xlsx-guide.md) | Spreadsheet creation, formulas, data analysis | [anthropics/skills/xlsx](https://github.com/anthropics/skills/tree/main/skills/xlsx) |
| [PPTX](./pptx-guide.md) | Presentation creation and editing | [anthropics/skills/skills/pptx](https://github.com/anthropics/skills/tree/main/skills/pptx) |
| [PDF](./pdf-guide.md) | PDF processing, forms, text extraction | [anthropics/skills/pdf](https://github.com/anthropics/skills/tree/main/skills/pdf) |

## Open Source Skills (Apache 2.0)

These skills are fully open source and can be freely used and modified.

| Skill | Description | Original |
|-------|-------------|----------|
| [Internal Comms](./internal-comms.md) | Status reports, newsletters, FAQs | [anthropics/skills/internal-comms](https://github.com/anthropics/skills/tree/main/skills/internal-comms) |
| [Doc Co-authoring](./doc-coauthoring.md) | Structured workflow for writing documentation | [anthropics/skills/doc-coauthoring](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring) |

## How to Use

### In Claude.ai (Paid Plans)
These skills are already available - just ask Claude to work with documents.

### In Claude Code
```bash
/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills
```

### Manual Use
1. Visit the original repository links above
2. Copy the SKILL.md content
3. Paste into your Claude conversation

## Attribution

All skills in this section are created by Anthropic. We provide quick reference guides here for convenience, but the complete and authoritative versions are in the [official repository](https://github.com/anthropics/skills).
