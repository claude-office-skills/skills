#!/usr/bin/env python3
"""
Upgrade Skills Metadata Script v2.1

This script upgrades existing SKILL.md files to the enhanced v2.0 metadata format.
It adds MCP tool references, categories, tags, and other enhanced metadata.

Usage:
    python3 upgrade_skills_metadata.py [--dry-run] [--skill SKILL_NAME]
"""

import os
import re
import argparse
from pathlib import Path
from typing import Dict, List, Optional, Tuple

# ═══════════════════════════════════════════════════════════════════════════════
# SKILL CATEGORY MAPPING
# ═══════════════════════════════════════════════════════════════════════════════

SKILL_CATEGORIES = {
    # Legal & Contracts
    "contract-review": {
        "category": "legal",
        "tags": ["contract", "review", "risk-analysis", "legal"],
        "department": "Legal",
        "mcp_tools": ["extract_text_from_pdf", "extract_text_from_docx", "analyze_document_structure"],
        "capabilities": ["contract_analysis", "risk_identification", "legal_compliance_check"],
    },
    "nda-generator": {
        "category": "legal",
        "tags": ["nda", "contract", "generator", "legal"],
        "department": "Legal",
        "mcp_tools": ["create_docx", "fill_docx_template", "docx_to_pdf"],
        "capabilities": ["document_generation", "template_filling", "legal_drafting"],
    },
    
    # HR & Careers
    "resume-tailor": {
        "category": "hr",
        "tags": ["resume", "cv", "job-application", "career"],
        "department": "HR/Personal",
        "mcp_tools": ["extract_text_from_pdf", "extract_text_from_docx", "create_docx"],
        "capabilities": ["resume_optimization", "keyword_matching", "content_tailoring"],
    },
    "cover-letter": {
        "category": "hr",
        "tags": ["cover-letter", "job-application", "writing"],
        "department": "HR/Personal",
        "mcp_tools": ["create_docx", "docx_to_pdf"],
        "capabilities": ["letter_writing", "personalization", "professional_tone"],
    },
    "job-description": {
        "category": "hr",
        "tags": ["job-description", "hiring", "recruitment"],
        "department": "HR",
        "mcp_tools": ["create_docx", "fill_docx_template"],
        "capabilities": ["job_posting", "requirement_definition", "inclusive_language"],
    },
    "offer-letter": {
        "category": "hr",
        "tags": ["offer-letter", "hiring", "employment"],
        "department": "HR",
        "mcp_tools": ["create_docx", "fill_docx_template", "docx_to_pdf"],
        "capabilities": ["offer_generation", "compensation_structuring"],
    },
    "applicant-screening": {
        "category": "hr",
        "tags": ["screening", "hiring", "recruitment", "evaluation"],
        "department": "HR",
        "mcp_tools": ["extract_text_from_pdf", "extract_text_from_docx", "analyze_document_structure"],
        "capabilities": ["candidate_evaluation", "requirement_matching", "scoring"],
    },
    "cv-builder": {
        "category": "hr",
        "tags": ["cv", "resume", "builder", "generator"],
        "department": "HR/Personal",
        "mcp_tools": ["create_docx", "docx_to_pdf", "fill_docx_template"],
        "capabilities": ["cv_generation", "formatting", "professional_layout"],
    },
    
    # Finance & Business
    "invoice-generator": {
        "category": "finance",
        "tags": ["invoice", "billing", "generator"],
        "department": "Finance",
        "mcp_tools": ["create_docx", "fill_docx_template", "docx_to_pdf"],
        "capabilities": ["invoice_creation", "calculation", "formatting"],
    },
    "expense-report": {
        "category": "finance",
        "tags": ["expense", "report", "reimbursement"],
        "department": "Finance",
        "mcp_tools": ["read_xlsx", "create_xlsx", "analyze_spreadsheet"],
        "capabilities": ["expense_tracking", "categorization", "summarization"],
    },
    "invoice-organizer": {
        "category": "finance",
        "tags": ["invoice", "organization", "tracking"],
        "department": "Finance",
        "mcp_tools": ["extract_text_from_pdf", "read_xlsx", "create_xlsx"],
        "capabilities": ["invoice_management", "categorization", "data_extraction"],
    },
    "invoice-template": {
        "category": "finance",
        "tags": ["invoice", "template", "billing"],
        "department": "Finance",
        "mcp_tools": ["create_docx", "fill_docx_template", "docx_to_pdf"],
        "capabilities": ["template_creation", "invoice_formatting"],
    },
    "data-analysis": {
        "category": "finance",
        "tags": ["data", "analysis", "spreadsheet", "insights"],
        "department": "All",
        "mcp_tools": ["read_xlsx", "analyze_spreadsheet", "create_chart", "pivot_table"],
        "capabilities": ["data_analysis", "visualization", "statistical_analysis"],
    },
    
    # Sales & Marketing
    "proposal-writer": {
        "category": "sales",
        "tags": ["proposal", "business", "sales", "writing"],
        "department": "Sales",
        "mcp_tools": ["create_docx", "fill_docx_template", "create_pptx"],
        "capabilities": ["proposal_writing", "persuasive_content", "business_case"],
    },
    "lead-research": {
        "category": "sales",
        "tags": ["lead", "research", "sales", "prospecting"],
        "department": "Sales",
        "mcp_tools": ["create_docx", "xlsx_to_json"],
        "capabilities": ["lead_research", "company_analysis", "contact_discovery"],
    },
    "lead-qualification": {
        "category": "sales",
        "tags": ["lead", "qualification", "scoring", "sales"],
        "department": "Sales",
        "mcp_tools": ["read_xlsx", "analyze_spreadsheet", "create_xlsx"],
        "capabilities": ["lead_scoring", "qualification_criteria", "prioritization"],
    },
    "content-writer": {
        "category": "marketing",
        "tags": ["content", "writing", "blog", "article"],
        "department": "Marketing",
        "mcp_tools": ["create_docx", "md_to_docx"],
        "capabilities": ["content_creation", "seo_writing", "research"],
    },
    "brand-guidelines": {
        "category": "marketing",
        "tags": ["brand", "guidelines", "style", "design"],
        "department": "Marketing",
        "mcp_tools": ["create_docx", "create_pptx"],
        "capabilities": ["brand_documentation", "style_guide_creation"],
    },
    
    # Communication & Writing
    "email-drafter": {
        "category": "productivity",
        "tags": ["email", "writing", "communication"],
        "department": "All",
        "mcp_tools": ["create_docx"],
        "capabilities": ["email_writing", "professional_tone", "template_usage"],
    },
    "email-classifier": {
        "category": "productivity",
        "tags": ["email", "classification", "organization"],
        "department": "All",
        "mcp_tools": [],
        "capabilities": ["email_categorization", "priority_assignment", "labeling"],
    },
    "suspicious-email": {
        "category": "productivity",
        "tags": ["email", "security", "phishing", "analysis"],
        "department": "Security",
        "mcp_tools": [],
        "capabilities": ["phishing_detection", "security_analysis", "risk_assessment"],
    },
    
    # Productivity
    "meeting-notes": {
        "category": "productivity",
        "tags": ["meeting", "notes", "summary", "action-items"],
        "department": "All",
        "mcp_tools": ["create_docx"],
        "capabilities": ["note_structuring", "action_extraction", "summarization"],
    },
    "weekly-report": {
        "category": "productivity",
        "tags": ["report", "weekly", "status", "update"],
        "department": "All",
        "mcp_tools": ["create_docx", "fill_docx_template"],
        "capabilities": ["report_generation", "status_tracking", "progress_summary"],
    },
    "file-organizer": {
        "category": "productivity",
        "tags": ["file", "organization", "naming", "structure"],
        "department": "All",
        "mcp_tools": ["analyze_document_structure"],
        "capabilities": ["file_categorization", "naming_convention", "organization"],
    },
    "changelog-generator": {
        "category": "productivity",
        "tags": ["changelog", "release", "documentation", "developer"],
        "department": "Dev/PM",
        "mcp_tools": ["create_docx", "md_to_docx"],
        "capabilities": ["changelog_generation", "version_tracking", "release_notes"],
    },
    
    # PDF Power Tools
    "chat-with-pdf": {
        "category": "pdf",
        "tags": ["pdf", "chat", "qa", "extraction"],
        "department": "All",
        "mcp_tools": ["extract_text_from_pdf", "get_pdf_metadata"],
        "capabilities": ["pdf_qa", "content_extraction", "summarization"],
    },
    "pdf-converter": {
        "category": "pdf",
        "tags": ["pdf", "conversion", "format"],
        "department": "All",
        "mcp_tools": ["pdf_to_docx", "docx_to_pdf", "html_to_pdf"],
        "capabilities": ["format_conversion", "document_transformation"],
    },
    "pdf-ocr": {
        "category": "pdf",
        "tags": ["pdf", "ocr", "scan", "text-extraction"],
        "department": "All",
        "mcp_tools": ["extract_text_from_pdf"],
        "capabilities": ["ocr_processing", "scanned_document_handling"],
    },
    "pdf-merge-split": {
        "category": "pdf",
        "tags": ["pdf", "merge", "split", "combine"],
        "department": "All",
        "mcp_tools": ["merge_pdfs", "split_pdf"],
        "capabilities": ["pdf_merging", "pdf_splitting", "page_management"],
    },
    "pdf-form-filler": {
        "category": "pdf",
        "tags": ["pdf", "form", "fill", "data-entry"],
        "department": "All",
        "mcp_tools": ["fill_pdf_form", "get_pdf_metadata"],
        "capabilities": ["form_filling", "data_entry", "pdf_forms"],
    },
    "pdf-compress": {
        "category": "pdf",
        "tags": ["pdf", "compress", "optimize", "size"],
        "department": "All",
        "mcp_tools": ["compress_pdf"],
        "capabilities": ["file_compression", "optimization"],
    },
    "pdf-watermark": {
        "category": "pdf",
        "tags": ["pdf", "watermark", "security", "branding"],
        "department": "All",
        "mcp_tools": ["add_watermark_to_pdf"],
        "capabilities": ["watermarking", "document_protection"],
    },
    "pdf-extraction": {
        "category": "pdf",
        "tags": ["pdf", "extraction", "text", "tables"],
        "department": "All",
        "mcp_tools": ["extract_text_from_pdf", "extract_tables_from_pdf"],
        "capabilities": ["text_extraction", "table_extraction", "data_mining"],
    },
    "pdf-to-docx": {
        "category": "pdf",
        "tags": ["pdf", "docx", "conversion"],
        "department": "All",
        "mcp_tools": ["pdf_to_docx"],
        "capabilities": ["format_conversion", "editable_documents"],
    },
    
    # Core Document Skills
    "docx-manipulation": {
        "category": "document",
        "tags": ["docx", "word", "manipulation", "editing"],
        "department": "All",
        "mcp_tools": ["create_docx", "extract_text_from_docx", "fill_docx_template", "merge_docx_files"],
        "capabilities": ["document_creation", "editing", "template_handling"],
    },
    "pptx-manipulation": {
        "category": "presentation",
        "tags": ["pptx", "powerpoint", "manipulation", "editing"],
        "department": "All",
        "mcp_tools": ["create_pptx", "extract_from_pptx", "add_slide", "update_slide"],
        "capabilities": ["presentation_creation", "slide_editing"],
    },
    "xlsx-manipulation": {
        "category": "spreadsheet",
        "tags": ["xlsx", "excel", "manipulation", "editing"],
        "department": "All",
        "mcp_tools": ["read_xlsx", "create_xlsx", "apply_formula", "create_chart"],
        "capabilities": ["spreadsheet_creation", "formula_handling", "charting"],
    },
    "excel-automation": {
        "category": "spreadsheet",
        "tags": ["excel", "automation", "macro", "workflow"],
        "department": "All",
        "mcp_tools": ["read_xlsx", "create_xlsx", "apply_formula", "pivot_table"],
        "capabilities": ["automation", "data_processing", "reporting"],
    },
    
    # Conversion Skills
    "md-to-office": {
        "category": "conversion",
        "tags": ["markdown", "conversion", "office", "pandoc"],
        "department": "All",
        "mcp_tools": ["md_to_docx", "md_to_pptx"],
        "capabilities": ["markdown_conversion", "document_generation"],
    },
    "office-to-md": {
        "category": "conversion",
        "tags": ["office", "markdown", "conversion", "markitdown"],
        "department": "All",
        "mcp_tools": ["docx_to_md"],
        "capabilities": ["office_conversion", "markdown_export"],
    },
    "html-to-ppt": {
        "category": "conversion",
        "tags": ["html", "pptx", "conversion", "slides"],
        "department": "All",
        "mcp_tools": ["pptx_to_html"],
        "capabilities": ["html_conversion", "slide_generation"],
    },
    "batch-convert": {
        "category": "conversion",
        "tags": ["batch", "conversion", "bulk", "automation"],
        "department": "All",
        "mcp_tools": ["batch_convert"],
        "capabilities": ["bulk_conversion", "automation"],
    },
    
    # Parsing & OCR Skills
    "smart-ocr": {
        "category": "parsing",
        "tags": ["ocr", "extraction", "multilingual", "paddleocr"],
        "department": "All",
        "mcp_tools": ["extract_text_from_pdf"],
        "capabilities": ["ocr_processing", "multilingual_support"],
    },
    "doc-parser": {
        "category": "parsing",
        "tags": ["parsing", "extraction", "layout", "docling"],
        "department": "All",
        "mcp_tools": ["analyze_document_structure", "extract_text_from_pdf"],
        "capabilities": ["document_parsing", "layout_analysis"],
    },
    "layout-analyzer": {
        "category": "parsing",
        "tags": ["layout", "analysis", "structure", "surya"],
        "department": "All",
        "mcp_tools": ["analyze_document_structure"],
        "capabilities": ["layout_detection", "structure_analysis"],
    },
    "data-extractor": {
        "category": "parsing",
        "tags": ["extraction", "data", "unstructured"],
        "department": "All",
        "mcp_tools": ["extract_text_from_pdf", "extract_tables_from_pdf"],
        "capabilities": ["data_extraction", "format_handling"],
    },
    "table-extractor": {
        "category": "parsing",
        "tags": ["table", "extraction", "pdf", "camelot"],
        "department": "All",
        "mcp_tools": ["extract_tables_from_pdf"],
        "capabilities": ["table_extraction", "data_structuring"],
    },
    
    # Presentation Skills
    "html-slides": {
        "category": "presentation",
        "tags": ["html", "slides", "revealjs", "web"],
        "department": "All",
        "mcp_tools": ["pptx_to_html"],
        "capabilities": ["web_presentation", "html_slides"],
    },
    "dev-slides": {
        "category": "presentation",
        "tags": ["developer", "slides", "slidev", "vue"],
        "department": "Dev",
        "mcp_tools": ["create_pptx", "md_to_pptx"],
        "capabilities": ["developer_presentations", "code_slides"],
    },
    "md-slides": {
        "category": "presentation",
        "tags": ["markdown", "slides", "marp"],
        "department": "All",
        "mcp_tools": ["md_to_pptx"],
        "capabilities": ["markdown_slides", "presentation_generation"],
    },
    "ai-slides": {
        "category": "presentation",
        "tags": ["ai", "slides", "generation", "automatic"],
        "department": "All",
        "mcp_tools": ["create_pptx", "add_slide"],
        "capabilities": ["ai_generation", "automatic_slides"],
    },
    "report-generator": {
        "category": "presentation",
        "tags": ["report", "generator", "data", "visualization"],
        "department": "All",
        "mcp_tools": ["create_docx", "create_xlsx", "create_chart", "create_pptx"],
        "capabilities": ["report_generation", "data_visualization"],
    },
    
    # Template Skills
    "form-builder": {
        "category": "template",
        "tags": ["form", "builder", "interactive", "docassemble"],
        "department": "All",
        "mcp_tools": ["create_docx", "fill_docx_template"],
        "capabilities": ["form_creation", "interactive_documents"],
    },
    "contract-template": {
        "category": "template",
        "tags": ["contract", "template", "legal", "accord"],
        "department": "Legal",
        "mcp_tools": ["create_docx", "fill_docx_template"],
        "capabilities": ["contract_templating", "legal_documents"],
    },
    "template-engine": {
        "category": "template",
        "tags": ["template", "engine", "autofill", "docxtpl"],
        "department": "All",
        "mcp_tools": ["fill_docx_template"],
        "capabilities": ["template_filling", "document_automation"],
    },
    
    # Workflow Skills
    "n8n-workflow": {
        "category": "workflow",
        "tags": ["n8n", "workflow", "automation", "integration"],
        "department": "All",
        "mcp_tools": [],
        "capabilities": ["workflow_automation", "integration"],
    },
    "mcp-hub": {
        "category": "workflow",
        "tags": ["mcp", "hub", "tools", "integration"],
        "department": "All",
        "mcp_tools": [],
        "capabilities": ["tool_discovery", "mcp_integration"],
    },
    "office-mcp": {
        "category": "workflow",
        "tags": ["office", "mcp", "tools", "automation"],
        "department": "All",
        "mcp_tools": [],
        "capabilities": ["office_automation", "mcp_tools"],
    },
    "batch-processor": {
        "category": "workflow",
        "tags": ["batch", "processor", "bulk", "automation"],
        "department": "All",
        "mcp_tools": ["batch_convert"],
        "capabilities": ["batch_processing", "automation"],
    },
    "doc-pipeline": {
        "category": "workflow",
        "tags": ["pipeline", "workflow", "document", "automation"],
        "department": "All",
        "mcp_tools": [],
        "capabilities": ["document_workflow", "pipeline_automation"],
    },
}

# ═══════════════════════════════════════════════════════════════════════════════
# HELPER FUNCTIONS
# ═══════════════════════════════════════════════════════════════════════════════

def parse_skill_file(file_path: Path) -> Tuple[dict, str]:
    """Parse a SKILL.md file and extract frontmatter and content."""
    content = file_path.read_text(encoding='utf-8')
    
    # Match YAML frontmatter
    pattern = r'^---\s*\n(.*?)\n---\s*\n(.*)$'
    match = re.match(pattern, content, re.DOTALL)
    
    if match:
        frontmatter_str = match.group(1)
        body = match.group(2)
        # Simple YAML parsing
        frontmatter = {}
        for line in frontmatter_str.strip().split('\n'):
            if ':' in line and not line.startswith(' ') and not line.startswith('\t'):
                key, value = line.split(':', 1)
                key = key.strip()
                value = value.strip().strip('"').strip("'")
                frontmatter[key] = value
        return frontmatter, body
    
    return {}, content


def generate_enhanced_frontmatter(skill_name: str, existing: dict) -> str:
    """Generate enhanced frontmatter for a skill as a string."""
    metadata = SKILL_CATEGORIES.get(skill_name, {})
    
    # Get values
    name = existing.get('name', skill_name)
    description = existing.get('description', f'A skill for {skill_name.replace("-", " ")}')
    version = existing.get('version', '1.0.0')
    author = existing.get('author', 'claude-office-skills')
    license_val = existing.get('license', 'MIT')
    
    category = metadata.get('category', 'productivity')
    tags = metadata.get('tags', [skill_name.replace('-', ' ')])
    department = metadata.get('department', 'All')
    mcp_tools = metadata.get('mcp_tools', [])
    capabilities = metadata.get('capabilities', [])
    
    # Build frontmatter string
    lines = [
        '---',
        '# ═══════════════════════════════════════════════════════════════════════════════',
        '# CLAUDE OFFICE SKILL - Enhanced Metadata v2.0',
        '# ═══════════════════════════════════════════════════════════════════════════════',
        '',
        '# Basic Information',
        f'name: {name}',
        f'description: "{description}"',
        f'version: "{version}"',
        f'author: {author}',
        f'license: {license_val}',
        '',
        '# Categorization',
        f'category: {category}',
        'tags:',
    ]
    
    for tag in tags:
        lines.append(f'  - {tag}')
    
    lines.extend([
        f'department: {department}',
        '',
        '# AI Model Compatibility',
        'models:',
        '  recommended:',
        '    - claude-sonnet-4',
        '    - claude-opus-4',
        '  compatible:',
        '    - claude-3-5-sonnet',
        '    - gpt-4',
        '    - gpt-4o',
    ])
    
    # Add MCP tools if available
    if mcp_tools:
        lines.extend([
            '',
            '# MCP Tools Integration',
            'mcp:',
            '  server: office-mcp',
            '  tools:',
        ])
        for tool in mcp_tools:
            lines.append(f'    - {tool}')
    
    # Add capabilities if available
    if capabilities:
        lines.extend([
            '',
            '# Skill Capabilities',
            'capabilities:',
        ])
        for cap in capabilities:
            lines.append(f'  - {cap}')
    
    lines.extend([
        '',
        '# Language Support',
        'languages:',
        '  - en',
        '  - zh',
        '---',
    ])
    
    return '\n'.join(lines)


def upgrade_skill(skill_path: Path, dry_run: bool = False) -> bool:
    """Upgrade a single skill file."""
    skill_file = skill_path / 'SKILL.md'
    
    if not skill_file.exists():
        print(f"  ⚠️  No SKILL.md found in {skill_path.name}")
        return False
    
    skill_name = skill_path.name
    existing_fm, body = parse_skill_file(skill_file)
    
    # Generate enhanced frontmatter
    new_frontmatter = generate_enhanced_frontmatter(skill_name, existing_fm)
    
    # Format new content
    new_content = f"{new_frontmatter}\n\n{body.lstrip()}"
    
    if dry_run:
        metadata = SKILL_CATEGORIES.get(skill_name, {})
        print(f"  📝 Would upgrade: {skill_name}")
        print(f"     Category: {metadata.get('category', 'productivity')}")
        print(f"     Tags: {metadata.get('tags', [])}")
        print(f"     MCP Tools: {metadata.get('mcp_tools', [])}")
    else:
        skill_file.write_text(new_content, encoding='utf-8')
        print(f"  ✅ Upgraded: {skill_name}")
    
    return True


# ═══════════════════════════════════════════════════════════════════════════════
# MAIN FUNCTION
# ═══════════════════════════════════════════════════════════════════════════════

def main():
    parser = argparse.ArgumentParser(description='Upgrade Skills metadata to v2.0')
    parser.add_argument('--dry-run', action='store_true', help='Preview changes without writing')
    parser.add_argument('--skill', type=str, help='Upgrade a specific skill only')
    args = parser.parse_args()
    
    # Get skills directory
    script_dir = Path(__file__).parent
    skills_dir = script_dir.parent
    
    print("═" * 60)
    print("  Claude Office Skills - Metadata Upgrade Script v2.1")
    print("═" * 60)
    print()
    
    if args.dry_run:
        print("🔍 DRY RUN MODE - No files will be modified\n")
    
    # Get list of skills to upgrade
    if args.skill:
        skill_dirs = [skills_dir / args.skill]
        if not skill_dirs[0].exists():
            print(f"❌ Skill not found: {args.skill}")
            return
    else:
        # Get all skill directories (exclude special folders)
        exclude = {'_template', 'scripts', 'official-skills', 'mcp-servers', '.git'}
        skill_dirs = [
            d for d in skills_dir.iterdir()
            if d.is_dir() and d.name not in exclude and not d.name.startswith('.')
        ]
    
    print(f"📦 Found {len(skill_dirs)} skills to process\n")
    
    # Process each skill
    upgraded = 0
    skipped = 0
    
    for skill_dir in sorted(skill_dirs):
        if upgrade_skill(skill_dir, args.dry_run):
            upgraded += 1
        else:
            skipped += 1
    
    print()
    print("═" * 60)
    print(f"  Summary: {upgraded} upgraded, {skipped} skipped")
    print("═" * 60)


if __name__ == '__main__':
    main()
