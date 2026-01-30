---
# ═══════════════════════════════════════════════════════════════════════════════
# CLAUDE OFFICE SKILL - Enhanced Metadata v2.0
# ═══════════════════════════════════════════════════════════════════════════════

# Basic Information
name: File Organizer
description: "Organize and rename files based on content analysis"
version: "1.0"
author: claude-office-skills
license: MIT

# Categorization
category: productivity
tags:
  - file
  - organization
  - naming
  - structure
department: All

# AI Model Compatibility
models:
  recommended:
    - claude-sonnet-4
    - claude-opus-4
  compatible:
    - claude-3-5-sonnet
    - gpt-4
    - gpt-4o

# MCP Tools Integration
mcp:
  server: office-mcp
  tools:
    - analyze_document_structure

# Skill Capabilities
capabilities:
  - file_categorization
  - naming_convention
  - organization

# Language Support
languages:
  - en
  - zh
---

# File Organizer

Intelligently organize and rename files based on their content and metadata.

## Overview

This skill helps you:
- Analyze file contents to determine categorization
- Suggest folder structures
- Generate consistent naming conventions
- Identify and handle duplicates
- Create organization systems

## How to Use

### Analyze Files
```
"Analyze these files and suggest how to organize them"
"What category does this file belong to?"
"Suggest a better filename for this document"
```

### Organize
```
"Create a folder structure for my project files"
"Organize my downloads folder"
"Sort these invoices by vendor and date"
```

## Naming Conventions

### Recommended Formats

**Documents**
```
YYYY-MM-DD_Category_Description_v1.ext
Example: 2026-01-29_Contract_ClientName_NDA_v1.pdf
```

**Images**
```
YYYY-MM-DD_Event/Project_Description_NNN.ext
Example: 2026-01-29_ProductLaunch_HeroImage_001.png
```

**Invoices/Receipts**
```
YYYY-MM-DD_Vendor_Amount_InvoiceNumber.ext
Example: 2026-01-29_Adobe_149.99_INV-12345.pdf
```

**Meeting Notes**
```
YYYY-MM-DD_MeetingType_Topic.ext
Example: 2026-01-29_TeamSync_Q1Planning.md
```

### Naming Rules
- Use underscores or hyphens, not spaces
- Start with date for chronological sorting
- Include key identifiers (client, project, type)
- Add version numbers for iterations
- Keep names concise but descriptive

## Folder Structures

### Personal Documents
```
📁 Documents
├── 📁 Admin
│   ├── 📁 Finance
│   │   ├── 📁 Invoices
│   │   ├── 📁 Receipts
│   │   └── 📁 Tax
│   ├── 📁 Insurance
│   └── 📁 Legal
├── 📁 Work
│   ├── 📁 Projects
│   ├── 📁 Reports
│   └── 📁 Meetings
├── 📁 Personal
│   ├── 📁 Health
│   ├── 📁 Education
│   └── 📁 Travel
└── 📁 Archive
    └── 📁 [Year]
```

### Project-Based
```
📁 ProjectName
├── 📁 01_Planning
│   ├── 📁 Requirements
│   ├── 📁 Proposals
│   └── 📁 Research
├── 📁 02_Design
│   ├── 📁 Mockups
│   ├── 📁 Assets
│   └── 📁 Specs
├── 📁 03_Development
│   ├── 📁 Source
│   ├── 📁 Tests
│   └── 📁 Documentation
├── 📁 04_Deliverables
│   └── 📁 [Version]
├── 📁 05_Admin
│   ├── 📁 Contracts
│   ├── 📁 Invoices
│   └── 📁 Communications
└── 📁 Archive
```

### Client/Vendor
```
📁 Clients
└── 📁 [ClientName]
    ├── 📁 Contracts
    ├── 📁 Projects
    │   └── 📁 [ProjectName]
    ├── 📁 Invoices
    ├── 📁 Communications
    └── 📁 Assets
```

## Output Formats

### Organization Plan
```markdown
## File Organization Plan

**Source**: [Folder/Location]
**Total Files**: [Count]
**Total Size**: [Size]

### Proposed Structure
[Folder tree]

### File Mapping
| Original Name | New Name | Destination |
|--------------|----------|-------------|
| IMG_1234.jpg | 2026-01-29_ProductPhoto_001.jpg | /Products/Photos/ |
| doc1.pdf | 2026-01-15_Contract_ClientA_NDA.pdf | /Clients/ClientA/Contracts/ |

### Actions Required
1. Create folders: [list]
2. Rename files: [count]
3. Move files: [count]
4. Review manually: [count with reasons]
```

### Duplicate Report
```markdown
## Duplicate Files Report

**Total Duplicates Found**: [Count]
**Space Recoverable**: [Size]

### Exact Duplicates
| File | Locations | Size | Recommendation |
|------|-----------|------|----------------|
| report.pdf | /Downloads/, /Documents/ | 2.3MB | Keep in /Documents/ |

### Similar Files
| Files | Similarity | Difference |
|-------|------------|------------|
| report_v1.pdf, report_v2.pdf | 95% | v2 has extra page |
```

## Analysis Capabilities

### Content-Based Categorization
- **Documents**: Contracts, reports, letters, forms
- **Financial**: Invoices, receipts, statements, budgets
- **Media**: Photos, videos, audio, graphics
- **Code**: Source files, configs, documentation
- **Data**: Spreadsheets, databases, exports

### Metadata Extraction
- Creation/modification dates
- Author information
- File dimensions (images/video)
- Duration (audio/video)
- Page count (documents)

## Automation Rules

### Example Rules
```markdown
## Auto-Organization Rules

### Rule 1: Invoices
- Trigger: PDF with "Invoice" or "INV-" in content
- Action: Move to /Finance/Invoices/[Year]/[Month]/
- Rename: YYYY-MM-DD_Vendor_Amount.pdf

### Rule 2: Screenshots
- Trigger: File matches "Screenshot*.png"
- Action: Move to /Screenshots/[Year-Month]/
- Rename: YYYY-MM-DD_HH-MM_Screenshot.png

### Rule 3: Downloads Cleanup
- Trigger: File in Downloads older than 30 days
- Action: 
  - If document → Archive
  - If installer → Delete
  - If media → Sort to appropriate folder
```

## Best Practices

### Organization Principles
1. **PARA Method**: Projects, Areas, Resources, Archive
2. **Date-First**: Enables chronological sorting
3. **Descriptive Names**: Future you will thank you
4. **Flat is Better**: Avoid deep nesting (max 3-4 levels)
5. **Regular Maintenance**: Schedule monthly reviews

### File Hygiene
- Delete duplicates and temp files
- Archive completed projects
- Use cloud sync for important files
- Maintain consistent naming
- Document your system

## Limitations

- Cannot access protected/encrypted files
- Large file moves require manual execution
- Content analysis depends on file format support
- Cannot guarantee perfect categorization
- Manual review recommended for important files
