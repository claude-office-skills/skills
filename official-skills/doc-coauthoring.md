---
name: doc-coauthoring
description: Structured workflow for collaborative document creation with Claude.
source: https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring
license: Apache 2.0 (Anthropic)
---

# Doc Co-Authoring Skill

> **Source**: [anthropics/skills/doc-coauthoring](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring) (Apache 2.0)

## Overview

A structured 3-stage workflow for collaboratively writing documentation, proposals, technical specs, and decision docs with Claude.

## The Three Stages

### Stage 1: Context Gathering
Claude asks questions to understand:
- Document type and purpose
- Target audience
- Desired impact
- Constraints and background

**You provide:**
- Background information
- Related discussions
- Organizational context
- Technical details

### Stage 2: Refinement & Structure
For each section:
1. Claude asks clarifying questions
2. Brainstorms 5-20 options
3. You curate what to keep/remove
4. Claude drafts the section
5. Iterate until satisfied

### Stage 3: Reader Testing
Test the document by:
1. Predicting reader questions
2. Testing with a fresh Claude (no context)
3. Fixing any gaps or confusion

## When to Use

This workflow is ideal for:
- Technical specifications
- Design documents
- Project proposals
- Decision docs (RFCs)
- PRDs (Product Requirements)
- Any substantial writing task

## How to Start

Simply tell Claude what you want to write:

> "I need to write a technical spec for our new authentication system"

> "Help me create a project proposal for the marketing redesign"

> "I want to write a decision doc about migrating to microservices"

Claude will offer the structured workflow and guide you through it.

## Benefits

| Traditional | With This Workflow |
|-------------|-------------------|
| Multiple drafts back-and-forth | Structured iteration |
| Missing context | Thorough context gathering |
| Blind spots | Reader testing catches gaps |
| Generic output | Tailored to your needs |

## Example Interaction

**You:** "I need to write a design doc for our new payment system"

**Claude:** "I can guide you through a structured workflow:
1. **Context Gathering** - I'll ask questions to understand the full picture
2. **Refinement** - We'll build each section iteratively
3. **Reader Testing** - We'll test if it makes sense to others

Want to try this approach?"

**You:** "Yes"

**Claude:** "Let's start. What type of document is this, and who's the primary audience?"

---

*This is an open-source skill from Anthropic. See the [original repository](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring) for the complete workflow details.*
