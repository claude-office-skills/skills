# Contributing to Claude Office Skills

Thank you for your interest in contributing! This project is community-driven, and we welcome skills from everyone.

## Quick Start

**No coding required** - skills are just Markdown files!

1. Fork this repository
2. Create a folder for your skill: `your-skill-name/`
3. Add a `SKILL.md` file following our template
4. Submit a Pull Request

## What Makes a Good Skill?

### Must Have

- [ ] **Solves a real problem** - Something people actually need help with
- [ ] **Contains domain knowledge** - Not just "write a contract" but actual expertise
- [ ] **Clear instructions** - Claude knows exactly what to do
- [ ] **Tested** - You've verified it works with Claude

### Nice to Have

- [ ] **Examples** - Show expected input/output
- [ ] **Bilingual** - English + another language
- [ ] **Jurisdiction awareness** - For legal/business skills
- [ ] **Edge cases** - Handle unusual situations

## Skill Template

Use the template in [`_template/SKILL.md`](./_template/SKILL.md) as your starting point.

### Required YAML Frontmatter

```yaml
---
name: your-skill-name          # lowercase, hyphens for spaces
description: A clear one-line description of what this skill does
version: 1.0.0
author: your-github-username
license: MIT
---
```

### Recommended Sections

1. **Overview** - What the skill does (2-3 sentences)
2. **How to Use** - Step-by-step instructions
3. **Knowledge** - Domain expertise embedded in the skill
4. **Output Format** - What Claude should produce
5. **Examples** - Sample interactions
6. **Limitations** - What it can't do

## Quality Guidelines

### Do

- Write clear, actionable instructions
- Include real domain knowledge
- Provide specific examples
- Be honest about limitations
- Test with actual documents

### Don't

- Create "wrapper" skills that just rephrase the task
- Include personal information or API keys
- Copy content without attribution
- Make claims about legal/medical advice
- Include offensive or harmful content

## Folder Structure

```
your-skill-name/
├── SKILL.md          # Required: Main skill file
├── README.md         # Optional: Extra documentation
├── examples/         # Optional: Example files
│   ├── input/
│   └── output/
└── assets/           # Optional: Images for documentation
```

## Testing Your Skill

Before submitting, test your skill:

1. **Copy-paste test**: Copy SKILL.md content into Claude and verify it works
2. **Direct link test**: Use the raw GitHub URL in Claude
3. **Edge case test**: Try unusual inputs to see how it handles them

## Pull Request Process

1. **Title**: `[New Skill] skill-name` or `[Update] skill-name`
2. **Description**: Explain what the skill does and why it's useful
3. **Checklist**:
   - [ ] Follows the template structure
   - [ ] Tested with Claude
   - [ ] No personal/sensitive information
   - [ ] Appropriate license

## Review Criteria

We'll review PRs for:

- **Usefulness**: Does it solve a real problem?
- **Quality**: Is the knowledge accurate and helpful?
- **Clarity**: Can Claude follow the instructions?
- **Safety**: No harmful content or bad advice?

## Updating Existing Skills

Found a bug or improvement for an existing skill?

1. Open an Issue first to discuss the change
2. Keep changes focused on one improvement
3. Test before and after
4. Document what you changed in the PR

## Skill Ideas

Looking for inspiration? Here are skills the community has requested:

### High Priority
- **Meeting Notes** - Transform raw meeting notes into structured summaries
- **Expense Report** - Organize and categorize business expenses
- **Email Drafter** - Professional email templates and responses
- **Financial Model** - DCF and valuation templates

### Medium Priority
- **Presentation Script** - Create compelling presentation narratives
- **Project Brief** - Define project scope and requirements
- **Weekly Report** - Consistent status update generator
- **Data Dictionary** - Document database schemas and fields

### Low Priority (Research Needed)
- **Compliance Checker** - Check documents against regulatory requirements
- **Grant Proposal** - Write grant applications
- **Patent Claims** - Draft patent claim language

Pick one and start contributing!

## Questions?

- Open an [Issue](https://github.com/claude-office-skills/all-in-one-skills/issues) for bugs or feature requests
- Start a [Discussion](https://github.com/claude-office-skills/all-in-one-skills/discussions) for questions or ideas

## Code of Conduct

- Be respectful and constructive
- Focus on the work, not the person
- Welcome newcomers
- Keep discussions professional

---

## Recognition

All contributors will be listed in our README. Significant contributions may be highlighted in release notes.

Thank you for helping make Claude more useful for everyone!
