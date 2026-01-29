# Claude Office Skills

> A curated collection of practical Claude Skills for real-world office tasks. Zero setup required.

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## What is this?

**Claude Office Skills** is a community-driven collection of ready-to-use skills that help Claude handle real office tasks - contracts, invoices, resumes, proposals, and more.

Unlike generic AI prompts, these skills contain **embedded domain knowledge** and **professional workflows** that make Claude genuinely useful for business tasks.

## Quick Start (30 seconds)

**Option 1: Copy & Paste**
1. Click any skill below
2. Copy the `SKILL.md` content
3. Paste into your Claude conversation
4. Upload your document and ask for help

**Option 2: Direct Link**
```
Please use this skill: https://raw.githubusercontent.com/claude-office-skills/skills/main/contract-review/SKILL.md

Then review my contract: [upload file]
```

**Option 3: Claude Desktop/Code**
Add to your Claude configuration:
```json
{
  "skills": ["https://github.com/claude-office-skills/skills/tree/main/contract-review"]
}
```

---

## Skills

### Legal & Contracts

| Skill | Description | Use Case |
|-------|-------------|----------|
| [**Contract Review**](./contract-review/) | Analyze contracts for risks, check completeness, get recommendations | Freelancers, small business, anyone signing contracts |
| [**NDA Generator**](./nda-generator/) | Create professional NDAs for different scenarios | Startups, consultants, business meetings |
| [**Privacy Policy**](./privacy-policy/) | Generate GDPR/CCPA compliant privacy policies | App developers, website owners |
| [**Terms of Service**](./terms-of-service/) | Create fair, legally-sound ToS | SaaS founders, platform builders |

### HR & Careers

| Skill | Description | Use Case |
|-------|-------------|----------|
| [**Resume Tailor**](./resume-tailor/) | Optimize resume for specific job applications | Job seekers, career changers |
| [**Cover Letter**](./cover-letter/) | Write compelling, personalized cover letters | Job applicants |
| [**Job Description**](./job-description/) | Create clear, inclusive job postings | Hiring managers, HR |
| [**Offer Letter**](./offer-letter/) | Generate professional employment offers | Startups, HR teams |

### Finance & Business

| Skill | Description | Use Case |
|-------|-------------|----------|
| [**Invoice Generator**](./invoice-generator/) | Create professional invoices with proper formatting | Freelancers, consultants |
| [**Expense Report**](./expense-report/) | Organize and summarize business expenses | Employees, contractors |
| [**Proposal Writer**](./proposal-writer/) | Write winning business proposals | Sales teams, consultants |
| [**Quotation**](./quotation/) | Generate accurate price quotes | Sales, service providers |

### Productivity

| Skill | Description | Use Case |
|-------|-------------|----------|
| [**Meeting Notes**](./meeting-notes/) | Transform raw notes into structured summaries | Everyone in meetings |
| [**Weekly Report**](./weekly-report/) | Create consistent status updates | Team members, managers |
| [**Project Brief**](./project-brief/) | Define project scope and requirements | Project managers |

### Official Anthropic Skills

These are reference guides for official Claude skills from [Anthropic](https://github.com/anthropics/skills). See [official-skills/](./official-skills/) for details.

| Skill | Description | License |
|-------|-------------|---------|
| [**DOCX Guide**](./official-skills/docx-guide.md) | Word document creation, editing, tracked changes | Source-available |
| [**XLSX Guide**](./official-skills/xlsx-guide.md) | Excel spreadsheets, formulas, financial models | Source-available |
| [**PPTX Guide**](./official-skills/pptx-guide.md) | PowerPoint presentations | Source-available |
| [**PDF Guide**](./official-skills/pdf-guide.md) | PDF processing, forms, extraction | Source-available |
| [**Internal Comms**](./official-skills/internal-comms.md) | Status reports, newsletters, FAQs | Apache 2.0 |
| [**Doc Co-authoring**](./official-skills/doc-coauthoring.md) | Structured workflow for writing docs | Apache 2.0 |

---

## Why These Skills Work

### 1. Embedded Domain Knowledge
Each skill contains real professional knowledge:
- Legal risk patterns and jurisdiction-specific rules
- Industry-standard formats and requirements
- Best practices from actual professionals

### 2. Structured Workflows
Not just "write a contract" - but step-by-step processes:
- What information to gather
- What to check for
- How to format output
- What warnings to give

### 3. Multilingual Support
Many skills support multiple languages including English and Chinese, enabling analysis of contracts and documents in different languages.

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution

1. Fork this repo
2. Create `your-skill-name/SKILL.md`
3. Follow the [template](./_template/SKILL.md)
4. Submit a PR

**No coding required** - just write clear instructions in Markdown!

### What Makes a Good Skill?

- **Specific**: Solves one clear problem
- **Knowledge-rich**: Contains domain expertise
- **Actionable**: Clear steps and outputs
- **Tested**: Actually works with Claude

---

## Community

- [Discussions](https://github.com/claude-office-skills/skills/discussions) - Ask questions, share ideas
- [Issues](https://github.com/claude-office-skills/skills/issues) - Report problems, request skills

---

## Architecture

![Claude Office Skills Architecture](./architecture.png)

**Community Hub** (this repo): Zero setup - just copy & paste SKILL.md files into Claude.

**Advanced**: For power users who need MCP Server, HTTP API, or Cloudflare deployment.

## Advanced Usage

For power users who want more capabilities:

| Repository | Description |
|------------|-------------|
| [contract-review-skill](https://github.com/claude-office-skills/contract-review-skill) | Full MCP server + HTTP API for contract review |

---

## License

MIT License - use freely, contribute back!

---

## Acknowledgments

Inspired by:
- [Anthropic Skills](https://github.com/anthropics/skills) - Official Claude Skills
- [Awesome Claude Skills](https://github.com/ComposioHQ/awesome-claude-skills) - Community curation

---

**Made with Claude, for everyone who works with documents.**
