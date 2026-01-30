# Claude Office Skills - Extended Roadmap (Phase 2)

> Extending from 30 skills to 60+ skills based on 56+ GitHub open source projects (800k+ stars)

---

## 📊 Open Source Project Mapping

This roadmap maps high-star GitHub projects to Claude Skills, creating a comprehensive document processing ecosystem.

### Summary Statistics
- **Open Source Projects**: 56+
- **Total GitHub Stars**: 800k+
- **Skills to Create**: 30 new (Phase 2)
- **Final Total**: 60+ skills

---

## 🎯 Phase 2: New Skill Categories (30 skills)

### 1. Core Doc Skills (5 skills)
Based on Python libraries for native Office document manipulation.

| # | Skill | Library | Stars | Description |
|---|-------|---------|-------|-------------|
| 31 | docx-manipulation | python-docx | 5.4k⭐ | Create/edit Word documents programmatically |
| 32 | pptx-manipulation | python-pptx | 3.2k⭐ | Create/edit PowerPoint presentations |
| 33 | xlsx-manipulation | openpyxl | 3.8k⭐ | Create/edit Excel spreadsheets |
| 34 | excel-automation | xlwings | 3.3k⭐ | Advanced Excel automation with Python |
| 35 | pdf-extraction | pdfplumber | 9.6k⭐ | Extract text, tables from PDFs |

### 2. Conversion Skills (5 skills)
Based on document format conversion tools.

| # | Skill | Library | Stars | Description |
|---|-------|---------|-------|-------------|
| 36 | md-to-office | pandoc | 42k⭐ | Convert Markdown to Word/PPT/PDF |
| 37 | office-to-md | markitdown | 86k⭐ | Convert Office docs to Markdown (Microsoft) |
| 38 | pdf-to-docx | pdf2docx | 3.3k⭐ | Convert PDF to editable Word |
| 39 | html-to-ppt | marp-cli | 3.1k⭐ | Convert HTML/Markdown to presentations |
| 40 | batch-convert | multi-format | - | Multi-format batch conversion pipeline |

### 3. Parsing/OCR Skills (5 skills)
Based on document parsing and OCR libraries.

| # | Skill | Library | Stars | Description |
|---|-------|---------|-------|-------------|
| 41 | smart-ocr | PaddleOCR | 69k⭐ | OCR for 100+ languages |
| 42 | doc-parser | docling | 51.5k⭐ | IBM's document parser for complex layouts |
| 43 | layout-analyzer | surya | 19k⭐ | Analyze document structure and layout |
| 44 | data-extractor | unstructured | 14k⭐ | Extract data from any document format |
| 45 | table-extractor | camelot | 4.2k⭐ | Extract tables from PDFs accurately |

### 4. Slide Skills (5 skills)
Based on presentation generation tools.

| # | Skill | Library | Stars | Description |
|---|-------|---------|-------|-------------|
| 46 | html-slides | reveal.js | 70.5k⭐ | Create HTML-based presentations |
| 47 | dev-slides | slidev | 44k⭐ | Developer-friendly Vue-based slides |
| 48 | md-slides | marp | 3.1k⭐ | Markdown to PDF/PPTX presentations |
| 49 | report-generator | gilfoyle | - | Generate data reports automatically |
| 50 | ai-slides | sli-ai | - | AI-powered slide generation |

### 5. Template Skills (5 skills)
Based on document template engines.

| # | Skill | Library | Stars | Description |
|---|-------|---------|-------|-------------|
| 51 | cv-builder | rendercv | 15.4k⭐ | YAML to PDF resume generator |
| 52 | form-builder | docassemble | 919⭐ | Interactive form builder |
| 53 | contract-template | accord-project | 322⭐ | Smart contract templates |
| 54 | invoice-template | easy-invoice | 476⭐ | PDF invoice generation |
| 55 | template-engine | yumdocs | - | Document auto-fill engine |

### 6. Workflow Skills (5 skills)
Based on workflow automation platforms.

| # | Skill | Library | Stars | Description |
|---|-------|---------|-------|-------------|
| 56 | n8n-workflow | n8n | 172k⭐ | 7800+ workflow templates |
| 57 | mcp-hub | mcp-servers | - | 1200+ AI Agent tools |
| 58 | office-mcp | office-mcp | - | Word/Excel/PPT MCP operations |
| 59 | batch-processor | - | - | Bulk document processing |
| 60 | doc-pipeline | - | - | Document workflow pipeline |

---

## 📈 Implementation Priority

### Priority 1: High Impact (Week 1)
- Core Doc Skills (docx, pptx, xlsx manipulation)
- Conversion Skills (md-to-office, office-to-md)

### Priority 2: AI-Powered (Week 2)
- Parsing/OCR Skills (smart-ocr, doc-parser)
- Table/Data Extraction

### Priority 3: Presentation (Week 3)
- Slide Skills (html-slides, md-slides)
- Report Generation

### Priority 4: Advanced (Week 4)
- Template Skills
- Workflow Skills

---

## 🔧 Skill Design Principles

Based on the architecture, each skill should:

```
Skill = Domain Knowledge + Templates + Scripts
```

### 1. Domain Knowledge (领域知识)
- Library-specific best practices
- Common use cases and patterns
- Error handling strategies
- Performance optimization tips

### 2. Templates (模板)
- Output format templates
- Code snippet templates
- Configuration templates

### 3. Scripts (脚本)
- Python/TypeScript code examples
- CLI command references
- API usage examples

---

## 📁 Folder Structure

```
skill-name/
├── SKILL.md          # Main skill file
├── README.md         # Library introduction
├── examples/         # Code examples
│   ├── basic.py
│   └── advanced.py
└── templates/        # Output templates
    └── ...
```

---

## 🏷️ YAML Frontmatter Template

```yaml
---
name: skill-name
description: One-line description
author: claude-office-skills
version: "1.0"
tags: [category, library-name, use-case]
models: [claude-sonnet-4, claude-opus-4]
tools: [computer, code_execution, file_operations]
library:
  name: library-name
  url: https://github.com/org/repo
  stars: 10k
---
```

---

## 📊 Progress Tracker

### Phase 1 (Completed)
- **Completed**: 30/30 skills (100%) ✅
- **Categories**: HR, Legal, Finance, PDF Tools, etc.

### Phase 2 (In Progress)
- **Target**: 30 new skills
- **Completed**: 30/30 (100%) ✅
- **Current Focus**: All categories completed!

#### Phase 2 Completion Summary:
- ✅ Core Doc Skills: docx-manipulation, pptx-manipulation, xlsx-manipulation, excel-automation, pdf-extraction
- ✅ Conversion Skills: md-to-office, office-to-md, pdf-to-docx, html-to-ppt, batch-convert
- ✅ Parsing/OCR Skills: smart-ocr, doc-parser, layout-analyzer, data-extractor, table-extractor
- ✅ Slide Skills: html-slides, dev-slides, md-slides, report-generator, ai-slides
- ✅ Template Skills: cv-builder, form-builder, contract-template, invoice-template, template-engine
- ✅ Workflow Skills: n8n-workflow, mcp-hub, office-mcp, batch-processor, doc-pipeline

---

## 🔗 Related Resources

### Key Libraries
- [python-docx](https://github.com/python-openxml/python-docx) - Word documents
- [python-pptx](https://github.com/scanny/python-pptx) - PowerPoint
- [openpyxl](https://github.com/theorchard/openpyxl) - Excel
- [pandoc](https://github.com/jgm/pandoc) - Universal document converter
- [markitdown](https://github.com/microsoft/markitdown) - Office to Markdown (Microsoft)
- [PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) - OCR engine
- [docling](https://github.com/DS4SD/docling) - IBM document parser
- [n8n](https://github.com/n8n-io/n8n) - Workflow automation

---

**Last Updated**: 2026-01-29
