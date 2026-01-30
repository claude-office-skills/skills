# Office MCP Server

> The best tools for AI Skills - providing document operations as MCP tools.

[![npm](https://img.shields.io/npm/v/@claude-office-skills/office-mcp)](https://www.npmjs.com/package/@claude-office-skills/office-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Philosophy

```
┌─────────────────────────────────────────────────────────────┐
│                    AI Skills Architecture                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   Skills = 场景化解决方案说明书                               │
│   (Scenario-based solution guides)                          │
│   Tell AI "WHAT" to do and "HOW" to do it                   │
│                                                              │
│   MCP = 最佳工具集                                           │
│   (Best-in-class tools)                                     │
│   Provide AI "WITH WHAT" to accomplish tasks                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Skills** define the workflow and domain knowledge.
**MCP** provides the actual tools to execute.

---

## Features

### 📄 Document Tools (6 tools)
- `extract_text_from_docx` - Extract text from Word documents
- `create_docx` - Create new Word documents
- `fill_docx_template` - Fill templates with data
- `analyze_document_structure` - Analyze document structure
- `insert_table_to_docx` - Insert tables
- `merge_docx_files` - Merge multiple documents

### 📕 PDF Tools (8 tools)
- `extract_text_from_pdf` - Extract text (with OCR support)
- `extract_tables_from_pdf` - Extract tables as data
- `merge_pdfs` - Merge multiple PDFs
- `split_pdf` - Split PDF into parts
- `compress_pdf` - Reduce file size
- `add_watermark_to_pdf` - Add watermarks
- `fill_pdf_form` - Fill PDF forms
- `get_pdf_metadata` - Get document metadata

### 📊 Spreadsheet Tools (7 tools)
- `read_xlsx` - Read Excel data
- `create_xlsx` - Create spreadsheets
- `analyze_spreadsheet` - Analyze data
- `apply_formula` - Apply formulas
- `create_chart` - Create charts
- `pivot_table` - Create pivot tables
- `xlsx_to_json` - Convert to JSON

### 📽️ Presentation Tools (7 tools)
- `create_pptx` - Create presentations
- `extract_from_pptx` - Extract content
- `md_to_pptx` - Markdown to slides
- `add_slide` - Add slides
- `update_slide` - Update slides
- `pptx_to_html` - Convert to HTML (reveal.js)
- `get_pptx_outline` - Get presentation outline

### 🔄 Conversion Tools (9 tools)
- `docx_to_pdf` - Word to PDF
- `pdf_to_docx` - PDF to Word
- `md_to_docx` - Markdown to Word
- `docx_to_md` - Word to Markdown
- `xlsx_to_csv` - Excel to CSV
- `csv_to_xlsx` - CSV to Excel
- `html_to_pdf` - HTML to PDF
- `json_to_xlsx` - JSON to Excel
- `batch_convert` - Batch conversion

**Total: 37 tools**

---

## Installation

### Using npx (recommended)

```bash
npx @claude-office-skills/office-mcp
```

### Using npm

```bash
npm install -g @claude-office-skills/office-mcp
office-mcp
```

### From source

```bash
git clone https://github.com/claude-office-skills/skills
cd skills/mcp-servers/office-mcp
npm install
npm run build
npm start
```

---

## Configuration

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "office-mcp": {
      "command": "npx",
      "args": ["@claude-office-skills/office-mcp"]
    }
  }
}
```

### Cursor / VS Code

Add to your MCP settings:

```json
{
  "mcp": {
    "servers": {
      "office-mcp": {
        "command": "npx",
        "args": ["@claude-office-skills/office-mcp"]
      }
    }
  }
}
```

---

## How Skills Use MCP Tools

A Skill like `contract-review` references MCP tools like this:

```yaml
---
name: contract-review
mcp:
  server: office-mcp
  tools:
    - extract_text_from_pdf
    - extract_text_from_docx
    - analyze_document_structure
---
```

When the AI executes the Skill, it knows which MCP tools are available to accomplish the task.

---

## Tool Categories Reference

```json
{
  "document": [
    "extract_text_from_docx",
    "create_docx",
    "fill_docx_template",
    "analyze_document_structure",
    "insert_table_to_docx",
    "merge_docx_files"
  ],
  "pdf": [
    "extract_text_from_pdf",
    "extract_tables_from_pdf",
    "merge_pdfs",
    "split_pdf",
    "compress_pdf",
    "add_watermark_to_pdf",
    "fill_pdf_form",
    "get_pdf_metadata"
  ],
  "spreadsheet": [
    "read_xlsx",
    "create_xlsx",
    "analyze_spreadsheet",
    "apply_formula",
    "create_chart",
    "pivot_table",
    "xlsx_to_json"
  ],
  "presentation": [
    "create_pptx",
    "extract_from_pptx",
    "md_to_pptx",
    "add_slide",
    "update_slide",
    "pptx_to_html",
    "get_pptx_outline"
  ],
  "conversion": [
    "docx_to_pdf",
    "pdf_to_docx",
    "md_to_docx",
    "docx_to_md",
    "xlsx_to_csv",
    "csv_to_xlsx",
    "html_to_pdf",
    "json_to_xlsx",
    "batch_convert"
  ]
}
```

---

## Recommended Tools by Scenario

| Scenario | Recommended Tools |
|----------|-------------------|
| Contract Review | `extract_text_from_pdf`, `extract_text_from_docx`, `analyze_document_structure` |
| Invoice Generator | `create_docx`, `fill_docx_template`, `docx_to_pdf` |
| Data Analysis | `read_xlsx`, `analyze_spreadsheet`, `create_chart` |
| Presentation | `create_pptx`, `md_to_pptx`, `add_slide` |
| Report Generator | `create_docx`, `insert_table_to_docx`, `docx_to_pdf` |
| PDF Processing | `extract_text_from_pdf`, `merge_pdfs`, `compress_pdf` |

---

## Development

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Build
npm run build

# Run tests
npm test

# Lint
npm run lint
```

---

## Related Projects

- [Claude Office Skills](https://github.com/claude-office-skills/skills) - The Skills repository
- [MCP Protocol](https://modelcontextprotocol.io) - Official MCP specification
- [MCP Servers](https://github.com/modelcontextprotocol/servers) - Official MCP servers

---

## License

MIT License - see [LICENSE](../../LICENSE)

---

**Built for AI Skills, by the Claude Office Skills community.**
