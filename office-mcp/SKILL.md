---
name: office-mcp
description: MCP server for Word, Excel, PowerPoint operations via AI
author: claude-office-skills
version: "1.0"
tags: ['mcp', 'office', 'word', 'excel', 'powerpoint']
models: [claude-sonnet-4, claude-opus-4]
tools: [computer, code_execution, file_operations]
library:
  name: Office MCP
  url: https://github.com/anthropics/skills
  stars: N/A
---

# Office Mcp Skill

## Overview

This skill wraps Office document operations as MCP tools, allowing Claude to create, edit, and manipulate Word, Excel, and PowerPoint files with standardized interfaces.

## How to Use

1. Describe what you want to accomplish
2. Provide any required input data or files
3. I'll execute the appropriate operations

**Example prompts:**
- "Create Word documents with AI-generated content"
- "Build Excel spreadsheets with formulas"
- "Generate PowerPoint presentations"
- "Batch edit Office documents"

## Domain Knowledge


### Office MCP Tools

| Tool | Input | Output |
|------|-------|--------|
| `create_docx` | Title, sections, styles | .docx file |
| `edit_docx` | Path, changes | Updated .docx |
| `create_xlsx` | Data, formulas | .xlsx file |
| `create_pptx` | Slides, layout | .pptx file |

### Integration with Claude Skills

```markdown
# Example: Combining Skills + MCP

User: "Create a sales report from this data"

1. Data Analysis Skill → Analyze data
2. office-mcp/create_docx → Generate Word report
3. office-mcp/create_xlsx → Generate Excel summary
4. office-mcp/create_pptx → Generate PowerPoint deck
```

### MCP Server Implementation

```python
from mcp import Server
from docx import Document
from openpyxl import Workbook

server = Server("office-mcp")

@server.tool("create_docx")
async def create_docx(title: str, content: str, output_path: str):
    doc = Document()
    doc.add_heading(title, 0)
    doc.add_paragraph(content)
    doc.save(output_path)
    return {"status": "success", "path": output_path}

@server.tool("create_xlsx")
async def create_xlsx(data: list, output_path: str):
    wb = Workbook()
    ws = wb.active
    for row in data:
        ws.append(row)
    wb.save(output_path)
    return {"status": "success", "path": output_path}
```


## Best Practices

1. **Validate inputs before document operations**
2. **Use temp files for large documents**
3. **Return structured responses with file paths**
4. **Handle errors gracefully with meaningful messages**

## Installation

```bash
# Install required dependencies
pip install python-docx openpyxl python-pptx reportlab jinja2
```

## Resources

- [Office MCP Repository](https://github.com/anthropics/skills)
- [Claude Office Skills Hub](https://github.com/claude-office-skills/skills)
