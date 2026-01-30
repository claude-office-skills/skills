#!/bin/bash
#
# Publish all Claude Office Skills to ClawdHub (MoltHub)
# https://clawdhub.com
#
# Prerequisites:
#   1. npm i -g clawdhub
#   2. clawdhub login
#
# Usage:
#   ./scripts/publish_to_clawdhub.sh
#   ./scripts/publish_to_clawdhub.sh --dry-run
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"
VERSION="1.0.0"
DRY_RUN=false

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --version|-v)
            VERSION="$2"
            shift 2
            ;;
        *)
            shift
            ;;
    esac
done

# Header
echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║       🦞 Claude Office Skills → ClawdHub Publisher 🦞       ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check if clawdhub CLI is installed
if ! command -v clawdhub &> /dev/null; then
    echo -e "${RED}Error: clawdhub CLI not found${NC}"
    echo ""
    echo "Install it with:"
    echo "  npm i -g clawdhub"
    echo ""
    echo "Then login:"
    echo "  clawdhub login"
    exit 1
fi

# Check if logged in
if ! clawdhub whoami &> /dev/null; then
    echo -e "${RED}Error: Not logged in to ClawdHub${NC}"
    echo ""
    echo "Please login first:"
    echo "  clawdhub login"
    exit 1
fi

echo -e "${GREEN}✅ ClawdHub CLI ready${NC}"
echo -e "${YELLOW}Version:${NC} $VERSION"
echo -e "${YELLOW}Dry run:${NC} $DRY_RUN"
echo ""

# Skills to publish (excluding templates, scripts, and special folders)
cd "$REPO_DIR"

SKILLS=$(find . -maxdepth 1 -type d \
    ! -name "." \
    ! -name ".git" \
    ! -name "_template" \
    ! -name "scripts" \
    ! -name "official-skills" \
    ! -name "node_modules" \
    -exec basename {} \; | sort)

SKILL_COUNT=$(echo "$SKILLS" | wc -l | tr -d ' ')
echo -e "${BLUE}Found $SKILL_COUNT skills to publish${NC}"
echo ""

# Publish each skill
PUBLISHED=0
FAILED=0
SKIPPED=0

for skill in $SKILLS; do
    SKILL_DIR="$REPO_DIR/$skill"
    SKILL_FILE="$SKILL_DIR/SKILL.md"
    
    # Skip if no SKILL.md
    if [ ! -f "$SKILL_FILE" ]; then
        echo -e "${YELLOW}⏭️  Skipping $skill (no SKILL.md)${NC}"
        SKIPPED=$((SKIPPED + 1))
        continue
    fi
    
    # Extract name from SKILL.md (line starting with "name:")
    SKILL_NAME=$(grep -m1 "^name:" "$SKILL_FILE" | sed 's/name: *//' | tr -d '"' || echo "$skill")
    
    # Convert slug to display name if extraction failed
    if [ -z "$SKILL_NAME" ] || [ "$SKILL_NAME" = "$skill" ]; then
        SKILL_NAME=$(echo "$skill" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2))}1')
    fi
    
    if [ "$DRY_RUN" = true ]; then
        echo -e "${BLUE}[DRY RUN]${NC} Would publish: $skill → \"$SKILL_NAME\" v$VERSION"
        PUBLISHED=$((PUBLISHED + 1))
    else
        echo -n "Publishing $skill... "
        
        if clawdhub publish "$SKILL_DIR" \
            --slug "$skill" \
            --name "$SKILL_NAME" \
            --version "$VERSION" \
            --tags "latest,office,claude-office-skills" \
            --changelog "Initial release from claude-office-skills" \
            2>/dev/null; then
            echo -e "${GREEN}✅${NC}"
            PUBLISHED=$((PUBLISHED + 1))
        else
            echo -e "${RED}❌${NC}"
            FAILED=$((FAILED + 1))
        fi
    fi
done

# Summary
echo ""
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Published: $PUBLISHED skills${NC}"
if [ $SKIPPED -gt 0 ]; then
    echo -e "${YELLOW}⏭️  Skipped: $SKIPPED (no SKILL.md)${NC}"
fi
if [ $FAILED -gt 0 ]; then
    echo -e "${RED}❌ Failed: $FAILED skills${NC}"
fi
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo ""

if [ "$DRY_RUN" = true ]; then
    echo -e "${YELLOW}This was a dry run. To actually publish, run without --dry-run${NC}"
fi

echo ""
echo "🦞 View your skills at: https://clawdhub.com"
echo ""
