#!/bin/bash
#
# Claude Office Skills - One-Click Installer for Moltbot
# https://github.com/claude-office-skills/skills
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/claude-office-skills/skills/main/install.sh | bash
#   curl -fsSL https://raw.githubusercontent.com/claude-office-skills/skills/main/install.sh | bash -s -- --category legal
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO_URL="https://raw.githubusercontent.com/claude-office-skills/skills/main"
SKILLS_DIR="${CLAWD_SKILLS_DIR:-${HOME}/clawd/skills}"
CATEGORY=""

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --category|-c)
            CATEGORY="$2"
            shift 2
            ;;
        --dir|-d)
            SKILLS_DIR="$2"
            shift 2
            ;;
        --help|-h)
            echo "Claude Office Skills Installer"
            echo ""
            echo "Usage: install.sh [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --category, -c  Install only specific category (legal, hr, finance, pdf, workflow, all)"
            echo "  --dir, -d       Custom skills directory (default: ~/clawd/skills)"
            echo "  --help, -h      Show this help"
            echo ""
            echo "Examples:"
            echo "  install.sh                    # Install all skills"
            echo "  install.sh --category legal   # Install only legal skills"
            echo "  install.sh --category pdf     # Install only PDF skills"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Skill definitions by category
LEGAL_SKILLS="contract-review nda-generator contract-template"
HR_SKILLS="resume-tailor cover-letter job-description offer-letter applicant-screening"
FINANCE_SKILLS="invoice-generator expense-report invoice-organizer proposal-writer invoice-template"
PDF_SKILLS="chat-with-pdf pdf-converter pdf-ocr pdf-merge-split pdf-form-filler pdf-compress pdf-watermark pdf-extraction pdf-to-docx"
WORKFLOW_SKILLS="n8n-workflow mcp-hub office-mcp batch-processor doc-pipeline"
TEMPLATE_SKILLS="cv-builder form-builder template-engine"
DOC_SKILLS="docx-manipulation pptx-manipulation xlsx-manipulation excel-automation"
CONVERSION_SKILLS="md-to-office office-to-md html-to-ppt batch-convert"
PARSING_SKILLS="smart-ocr doc-parser layout-analyzer data-extractor table-extractor"
SLIDE_SKILLS="html-slides dev-slides md-slides report-generator ai-slides"
PRODUCTIVITY_SKILLS="meeting-notes weekly-report file-organizer changelog-generator data-analysis email-drafter email-classifier"
MARKETING_SKILLS="lead-research lead-qualification content-writer brand-guidelines"

# Combine all skills
ALL_SKILLS="$LEGAL_SKILLS $HR_SKILLS $FINANCE_SKILLS $PDF_SKILLS $WORKFLOW_SKILLS $TEMPLATE_SKILLS $DOC_SKILLS $CONVERSION_SKILLS $PARSING_SKILLS $SLIDE_SKILLS $PRODUCTIVITY_SKILLS $MARKETING_SKILLS"

# Select skills based on category
case "$CATEGORY" in
    legal)
        SKILLS="$LEGAL_SKILLS"
        ;;
    hr)
        SKILLS="$HR_SKILLS"
        ;;
    finance)
        SKILLS="$FINANCE_SKILLS"
        ;;
    pdf)
        SKILLS="$PDF_SKILLS"
        ;;
    workflow)
        SKILLS="$WORKFLOW_SKILLS"
        ;;
    template)
        SKILLS="$TEMPLATE_SKILLS"
        ;;
    doc|document)
        SKILLS="$DOC_SKILLS"
        ;;
    conversion)
        SKILLS="$CONVERSION_SKILLS"
        ;;
    parsing|ocr)
        SKILLS="$PARSING_SKILLS"
        ;;
    slide|presentation)
        SKILLS="$SLIDE_SKILLS"
        ;;
    productivity)
        SKILLS="$PRODUCTIVITY_SKILLS"
        ;;
    marketing|sales)
        SKILLS="$MARKETING_SKILLS"
        ;;
    all|"")
        SKILLS="$ALL_SKILLS"
        ;;
    *)
        echo -e "${RED}Unknown category: $CATEGORY${NC}"
        echo "Available categories: legal, hr, finance, pdf, workflow, template, doc, conversion, parsing, slide, productivity, marketing, all"
        exit 1
        ;;
esac

# Header
echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║           🦞 Claude Office Skills Installer 🦞               ║"
echo "║                  for Moltbot / Clawdbot                      ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${YELLOW}Skills directory:${NC} $SKILLS_DIR"
echo -e "${YELLOW}Category:${NC} ${CATEGORY:-all}"
echo ""

# Create skills directory
mkdir -p "$SKILLS_DIR"

# Count skills
SKILL_COUNT=$(echo $SKILLS | wc -w | tr -d ' ')
echo -e "${BLUE}Installing $SKILL_COUNT skills...${NC}"
echo ""

# Install each skill
INSTALLED=0
FAILED=0

for skill in $SKILLS; do
    SKILL_DIR="$SKILLS_DIR/$skill"
    SKILL_URL="$REPO_URL/$skill/SKILL.md"
    
    # Create skill directory
    mkdir -p "$SKILL_DIR"
    
    # Download SKILL.md
    if curl -fsSL "$SKILL_URL" -o "$SKILL_DIR/SKILL.md" 2>/dev/null; then
        echo -e "${GREEN}✅${NC} $skill"
        INSTALLED=$((INSTALLED + 1))
    else
        echo -e "${RED}❌${NC} $skill (not found or download failed)"
        FAILED=$((FAILED + 1))
        rm -rf "$SKILL_DIR"
    fi
done

# Summary
echo ""
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Installed: $INSTALLED skills${NC}"
if [ $FAILED -gt 0 ]; then
    echo -e "${RED}❌ Failed: $FAILED skills${NC}"
fi
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}Skills installed to:${NC} $SKILLS_DIR"
echo ""
echo -e "To use these skills, restart your Moltbot or run:"
echo -e "  ${BLUE}moltbot agent --message \"List my available skills\"${NC}"
echo ""
echo -e "📚 Documentation: https://github.com/claude-office-skills/skills"
echo -e "🦞 Moltbot: https://molt.bot"
echo ""
