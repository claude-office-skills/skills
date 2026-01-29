---
name: xlsx-guide
description: Quick reference for Excel spreadsheet operations. For full capabilities, see the official Anthropic skill.
source: https://github.com/anthropics/skills/tree/main/skills/xlsx
license: Proprietary (Anthropic)
---

# Excel Spreadsheet (XLSX) Quick Reference

> **Full Skill**: [anthropics/skills/xlsx](https://github.com/anthropics/skills/tree/main/skills/xlsx)

## What Claude Can Do

### Reading Spreadsheets
- Extract data and tables
- Analyze formulas
- Read multiple sheets

### Creating Spreadsheets
- Create new workbooks with formulas
- Apply formatting (colors, fonts, borders)
- Build financial models

### Editing Spreadsheets
- Modify existing data
- Add new sheets
- Update formulas

## Quick Usage Examples

**Create a financial model:**
> "Create an Excel spreadsheet with a DCF valuation model for [company]"

**Analyze data:**
> "Read this spreadsheet and create a summary with charts"

**Add calculations:**
> "Add a column that calculates year-over-year growth"

## Key Capabilities

| Task | Method |
|------|--------|
| Read data | pandas or openpyxl |
| Create new | openpyxl with formulas |
| Data analysis | pandas with visualization |
| Recalculate | LibreOffice recalc.py |

## Financial Model Standards

When creating financial models, Claude follows industry standards:

| Element | Standard |
|---------|----------|
| Blue text | Hardcoded inputs |
| Black text | Formulas/calculations |
| Green text | Links from other sheets |
| Yellow background | Key assumptions |

## When to Use Full Skill

The complete official skill includes:
- Formula error prevention guidelines
- Number formatting standards
- Chart styling best practices
- Complex recalculation workflows

For advanced spreadsheet work, refer to the [official skill](https://github.com/anthropics/skills/tree/main/skills/xlsx).
