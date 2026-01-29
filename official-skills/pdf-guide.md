---
name: pdf-guide
description: Quick reference for PDF processing operations. For full capabilities, see the official Anthropic skill.
source: https://github.com/anthropics/skills/tree/main/skills/pdf
license: Proprietary (Anthropic)
---

# PDF Processing Quick Reference

> **Full Skill**: [anthropics/skills/pdf](https://github.com/anthropics/skills/tree/main/skills/pdf)

## What Claude Can Do

### Reading PDFs
- Extract text with layout preservation
- Extract tables to Excel/CSV
- OCR scanned documents

### Processing PDFs
- Merge multiple PDFs
- Split into separate pages
- Rotate pages

### Forms
- Fill PDF forms
- Extract form field data
- Create fillable forms

## Quick Usage Examples

**Extract content:**
> "Extract all tables from this PDF and convert to Excel"

**Merge documents:**
> "Combine these 3 PDFs into one document"

**Fill a form:**
> "Fill out this PDF form with the following information: [data]"

## Key Capabilities

| Task | Tool |
|------|------|
| Extract text | pdfplumber, pdftotext |
| Extract tables | pdfplumber → pandas |
| Merge/Split | pypdf, qpdf |
| OCR | pytesseract + pdf2image |
| Create PDFs | reportlab |
| Fill forms | pdf-lib, pypdf |

## Common Operations

### Text Extraction
```
"Read this PDF and give me a summary"
```

### Table Extraction
```
"Extract the financial table on page 3 to Excel format"
```

### Document Manipulation
```
"Extract pages 5-10 from this PDF as a separate document"
```

## When to Use Full Skill

The complete official skill includes:
- Advanced form filling workflows
- JavaScript libraries (pdf-lib)
- OCR for scanned documents
- Watermarking and encryption

For complex PDF operations, refer to the [official skill](https://github.com/anthropics/skills/tree/main/skills/pdf).
