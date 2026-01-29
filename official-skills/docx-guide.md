---
name: docx-guide
description: Quick reference for Word document operations. For full capabilities, see the official Anthropic skill.
source: https://github.com/anthropics/skills/tree/main/skills/docx
license: Proprietary (Anthropic)
---

# Word Document (DOCX) Quick Reference

> **Full Skill**: [anthropics/skills/docx](https://github.com/anthropics/skills/tree/main/skills/docx)

## What Claude Can Do

### Reading Documents
- Extract text content with structure preserved
- Access comments and tracked changes
- Read embedded images and metadata

### Creating Documents
- Create new Word documents from scratch
- Apply professional formatting
- Add headers, tables, lists, images

### Editing Documents
- Make tracked changes (redlining)
- Add comments
- Preserve original formatting

## Quick Usage Examples

**Create a new document:**
> "Create a Word document with a project proposal for [topic]"

**Edit with tracked changes:**
> "Review this contract and suggest changes with tracked changes enabled"

**Extract content:**
> "Extract all the text from this Word document and summarize it"

## Key Capabilities

| Task | Method |
|------|--------|
| Read text | Convert to markdown with pandoc |
| Create new | Use docx-js library |
| Edit existing | OOXML manipulation with tracked changes |
| Add comments | XML modification |

## When to Use Full Skill

The complete official skill includes:
- Detailed XML patterns for OOXML
- Code examples for complex edits
- Redlining workflow for legal/business documents
- Image conversion utilities

For advanced document manipulation, refer to the [official skill](https://github.com/anthropics/skills/tree/main/skills/docx).
