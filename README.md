# Claude Office Skills

> A curated collection of practical Claude Skills for real-world office tasks. Zero setup required.

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Skills](https://img.shields.io/badge/Skills-136+-blue.svg)](#skills)

---

## Contents

- [What Are Claude Skills?](#what-are-claude-skills)
- [Getting Started](#getting-started)
- [Skills](#skills)
  - [Legal & Contracts](#legal--contracts)
  - [HR & Careers](#hr--careers)
  - [Finance & Business](#finance--business)
  - [Communication & Writing](#communication--writing)
  - [Productivity](#productivity)
  - [PDF Power Tools](#pdf-power-tools)
  - [Document Processing (Official)](#document-processing-official)
  - [Core Document Skills](#core-document-skills)
  - [Document Conversion Skills](#document-conversion-skills)
  - [Document Parsing & OCR Skills](#document-parsing--ocr-skills)
  - [Presentation Skills](#presentation-skills)
  - [Template Skills](#template-skills)
  - [Workflow & Automation Skills](#workflow--automation-skills)
  - [CRM & Sales Automation](#crm--sales-automation)
  - [Marketing & Advertising](#marketing--advertising)
  - [E-commerce](#e-commerce)
  - [Communication & Messaging](#communication--messaging)
  - [Project Management](#project-management)
  - [Customer Support](#customer-support)
  - [Financial Analysis](#financial-analysis)
  - [Accounting & Payments](#accounting--payments)
  - [Data Engineering](#data-engineering)
  - [Research & Intelligence](#research--intelligence)
  - [Visual & Creative](#visual--creative)
  - [Media & Content](#media--content)
  - [Smart Home & IoT](#smart-home--iot)
  - [DevOps & Security](#devops--security)
  - [HR & Operations](#hr--operations)
  - [AI & Agents](#ai--agents)
- [Creating Skills](#creating-skills)
- [Advanced Usage](#advanced-usage)
- [Contributing](#contributing)
- [Resources](#resources)

---

## What Are Claude Skills?

**Claude Skills** are customizable workflows that teach Claude how to perform specific tasks according to your unique requirements. Skills enable Claude to execute tasks in a repeatable, standardized manner.

Unlike generic AI prompts, these skills contain **embedded domain knowledge** and **professional workflows** that make Claude genuinely useful for business tasks.

**This repository focuses on Office & Business scenarios:**
- Contracts, invoices, proposals
- HR documents, resumes, offer letters
- Reports, presentations, emails
- Data analysis and document processing

---

## Getting Started

### Using Skills in Claude.ai

1. Click any skill below
2. Copy the `SKILL.md` content
3. Paste into your Claude conversation
4. Upload your document and ask for help

### Using Skills in Claude Code

```bash
# Place the skill in your skills directory
mkdir -p ~/.config/claude-code/skills/
cp -r contract-review ~/.config/claude-code/skills/

# Start Claude Code - skill loads automatically
claude
```

### Using Skills via Direct Link

```
Please use this skill: https://raw.githubusercontent.com/claude-office-skills/skills/main/contract-review/SKILL.md

Then review my contract: [upload file]
```

### Using Skills via API

```python
import anthropic

client = anthropic.Anthropic(api_key="your-api-key")

# Load skill content
skill_content = open("contract-review/SKILL.md").read()

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    system=skill_content,
    messages=[{"role": "user", "content": "Review this contract..."}]
)
```

### Using Skills with Moltbot (Clawdbot)

One-click install all 136+ Office Skills to your [Moltbot](https://molt.bot):

```bash
# Install ALL skills
curl -fsSL https://raw.githubusercontent.com/claude-office-skills/skills/main/install.sh | bash

# Install by category
curl -fsSL https://raw.githubusercontent.com/claude-office-skills/skills/main/install.sh | bash -s -- --category legal
curl -fsSL https://raw.githubusercontent.com/claude-office-skills/skills/main/install.sh | bash -s -- --category pdf
curl -fsSL https://raw.githubusercontent.com/claude-office-skills/skills/main/install.sh | bash -s -- --category workflow
```

Available categories: `legal`, `hr`, `finance`, `pdf`, `workflow`, `template`, `doc`, `conversion`, `parsing`, `slide`, `productivity`, `marketing`

Or install a single skill via chat:
```
Install this skill: https://raw.githubusercontent.com/claude-office-skills/skills/main/contract-review/SKILL.md
```

---

## Skills

### Legal & Contracts

| Skill | Description | Department | Link |
|-------|-------------|------------|------|
| **Contract Review** | Analyze contracts for risks, check completeness, get recommendations | Legal | [View](./contract-review/) |
| **NDA Generator** | Create professional NDAs for different scenarios | Legal | [View](./nda-generator/) |

### HR & Careers

| Skill | Description | Department | Link |
|-------|-------------|------------|------|
| **Resume Tailor** | Optimize resume for specific job applications | HR/Personal | [View](./resume-tailor/) |
| **Cover Letter** | Write compelling, personalized cover letters | HR/Personal | [View](./cover-letter/) |
| **Job Description** | Create clear, inclusive job postings | HR | [View](./job-description/) |
| **Offer Letter** | Generate professional employment offers | HR | [View](./offer-letter/) |
| **Applicant Screening** | Screen candidates against job requirements | HR | [View](./applicant-screening/) |

### Finance & Business

| Skill | Description | Department | Link |
|-------|-------------|------------|------|
| **Invoice Generator** | Create professional invoices with proper formatting | Finance | [View](./invoice-generator/) |
| **Expense Report** | Organize and summarize business expenses | Finance | [View](./expense-report/) |
| **Invoice Organizer** | Organize, categorize, and track invoices | Finance | [View](./invoice-organizer/) |
| **Proposal Writer** | Write winning business proposals | Sales | [View](./proposal-writer/) |

### Sales & Marketing

| Skill | Description | Department | Link |
|-------|-------------|------------|------|
| **Lead Research** | Research company/contact info for sales outreach | Sales | [View](./lead-research/) |
| **Lead Qualification** | Score and qualify leads based on criteria | Sales | [View](./lead-qualification/) |
| **Content Writer** | Research and write content (blogs, articles) | Marketing | [View](./content-writer/) |
| **Brand Guidelines** | Create and maintain brand style guides | Marketing | [View](./brand-guidelines/) |

### Communication & Writing

| Skill | Description | Department | Link |
|-------|-------------|------------|------|
| **Internal Comms** | Status reports, newsletters, FAQs | Ops | [View](./official-skills/internal-comms.md) |
| **Doc Co-authoring** | Structured workflow for writing documentation | All | [View](./official-skills/doc-coauthoring.md) |
| **Email Drafter** | Professional email templates and responses | All | [View](./email-drafter/) |
| **Email Classifier** | Auto-categorize emails by type and priority | All | [View](./email-classifier/) |
| **Suspicious Email** | Analyze emails for phishing and scam indicators | Security | [View](./suspicious-email/) |

### Productivity

| Skill | Description | Department | Link |
|-------|-------------|------------|------|
| **Meeting Notes** | Transform raw notes into structured summaries | All | [View](./meeting-notes/) |
| **Weekly Report** | Create consistent status updates | All | [View](./weekly-report/) |
| **File Organizer** | Organize and rename files based on content | All | [View](./file-organizer/) |
| **Changelog Generator** | Generate release notes from commits/updates | Dev/PM | [View](./changelog-generator/) |
| **Data Analysis** | Analyze spreadsheet data and generate insights | All | [View](./data-analysis/) |

### PDF Power Tools

Comprehensive PDF manipulation skills inspired by [Stirling-PDF](https://github.com/Stirling-Tools/Stirling-PDF) (73k+ stars).

| Skill | Description | Department | Link |
|-------|-------------|------------|------|
| **Chat with PDF** | Answer questions, summarize, extract from PDFs | All | [View](./chat-with-pdf/) |
| **PDF Converter** | Convert PDF to/from Word, Excel, Image formats | All | [View](./pdf-converter/) |
| **PDF OCR** | Extract text from scanned PDFs using OCR | All | [View](./pdf-ocr/) |
| **PDF Merge/Split** | Combine or split PDF documents | All | [View](./pdf-merge-split/) |
| **PDF Form Filler** | Fill out PDF forms programmatically | All | [View](./pdf-form-filler/) |
| **PDF Compress** | Reduce PDF file size while maintaining quality | All | [View](./pdf-compress/) |
| **PDF Watermark** | Add watermarks, page numbers, headers/footers | All | [View](./pdf-watermark/) |

### Document Processing (Official)

Official Anthropic skills for working with Office documents. See [official-skills/](./official-skills/) for details.

| Skill | Description | Department | License |
|-------|-------------|------------|---------|
| **DOCX** | Word document creation, editing, tracked changes | All | [Source-available](./official-skills/docx-guide.md) |
| **XLSX** | Excel spreadsheets, formulas, financial models | Finance/Ops | [Source-available](./official-skills/xlsx-guide.md) |
| **PPTX** | PowerPoint presentations | Marketing/All | [Source-available](./official-skills/pptx-guide.md) |
| **PDF** | PDF processing, forms, extraction | All | [Source-available](./official-skills/pdf-guide.md) |

### Core Document Skills

Based on Python libraries for native Office document manipulation.

| Skill | Library | Stars | Description | Link |
|-------|---------|-------|-------------|------|
| **DOCX Manipulation** | python-docx | 5.4k | Create/edit Word documents programmatically | [View](./docx-manipulation/) |
| **PPTX Manipulation** | python-pptx | 3.2k | Create/edit PowerPoint presentations | [View](./pptx-manipulation/) |
| **XLSX Manipulation** | openpyxl | 3.8k | Create/edit Excel spreadsheets | [View](./xlsx-manipulation/) |
| **Excel Automation** | xlwings | 3.3k | Advanced Excel automation with Python | [View](./excel-automation/) |
| **PDF Extraction** | pdfplumber | 9.6k | Extract text, tables from PDFs | [View](./pdf-extraction/) |

### Document Conversion Skills

Based on document format conversion tools.

| Skill | Library | Stars | Description | Link |
|-------|---------|-------|-------------|------|
| **MD to Office** | pandoc | 42k | Convert Markdown to Word/PPT/PDF | [View](./md-to-office/) |
| **Office to MD** | markitdown | 86k | Convert Office docs to Markdown (Microsoft) | [View](./office-to-md/) |
| **PDF to DOCX** | pdf2docx | 3.3k | Convert PDF to editable Word | [View](./pdf-to-docx/) |
| **HTML to PPT** | marp-cli | 3.1k | Convert HTML/Markdown to presentations | [View](./html-to-ppt/) |
| **Batch Convert** | multi-format | - | Multi-format batch conversion pipeline | [View](./batch-convert/) |

### Document Parsing & OCR Skills

Based on document parsing and OCR libraries.

| Skill | Library | Stars | Description | Link |
|-------|---------|-------|-------------|------|
| **Smart OCR** | PaddleOCR | 69k | OCR for 100+ languages | [View](./smart-ocr/) |
| **Doc Parser** | docling | 51.5k | IBM's document parser for complex layouts | [View](./doc-parser/) |
| **Layout Analyzer** | surya | 19k | Analyze document structure and layout | [View](./layout-analyzer/) |
| **Data Extractor** | unstructured | 14k | Extract data from any document format | [View](./data-extractor/) |
| **Table Extractor** | camelot | 4.2k | Extract tables from PDFs accurately | [View](./table-extractor/) |

### Presentation Skills

Based on presentation generation tools.

| Skill | Library | Stars | Description | Link |
|-------|---------|-------|-------------|------|
| **HTML Slides** | reveal.js | 70.5k | Create HTML-based presentations | [View](./html-slides/) |
| **Dev Slides** | slidev | 44k | Developer-friendly Vue-based slides | [View](./dev-slides/) |
| **MD Slides** | marp | 3.1k | Markdown to PDF/PPTX presentations | [View](./md-slides/) |
| **Report Generator** | gilfoyle | - | Generate data reports automatically | [View](./report-generator/) |
| **AI Slides** | sli-ai | - | AI-powered slide generation | [View](./ai-slides/) |

### Template Skills

Based on document template engines.

| Skill | Library | Stars | Description | Link |
|-------|---------|-------|-------------|------|
| **CV Builder** | rendercv | 15.4k | YAML to PDF resume generator | [View](./cv-builder/) |
| **Form Builder** | docassemble | 919 | Interactive form builder | [View](./form-builder/) |
| **Contract Template** | accord-project | 322 | Smart contract templates | [View](./contract-template/) |
| **Invoice Template** | easy-invoice | 476 | PDF invoice generation | [View](./invoice-template/) |
| **Template Engine** | docxtpl | 2.1k | Document auto-fill engine | [View](./template-engine/) |

### Workflow & Automation Skills

Based on workflow automation platforms.

| Skill | Library | Stars | Description | Link |
|-------|---------|-------|-------------|------|
| **n8n Workflow** | n8n | 172k | 7800+ workflow templates | [View](./n8n-workflow/) |
| **MCP Hub** | mcp-servers | 40k+ | 1200+ AI Agent tools | [View](./mcp-hub/) |
| **Office MCP** | office-mcp | - | Word/Excel/PPT MCP operations | [View](./office-mcp/) |
| **Batch Processor** | custom | - | Bulk document processing | [View](./batch-processor/) |
| **Doc Pipeline** | custom | - | Document workflow pipeline | [View](./doc-pipeline/) |
| **Webhook Automation** | - | - | Build webhook integrations | [View](./webhook-automation/) |
| **Browser Automation** | Puppeteer | - | Web scraping & testing | [View](./browser-automation/) |

### CRM & Sales Automation

| Skill | Description | Platform | Link |
|-------|-------------|----------|------|
| **CRM Automation** | Multi-CRM workflows (HubSpot, Salesforce) | HubSpot/SF | [View](./crm-automation/) |
| **Pipedrive Automation** | Deal management, pipeline tracking | Pipedrive | [View](./pipedrive-automation/) |
| **Lead Routing** | Intelligent lead assignment | Multi | [View](./lead-routing/) |
| **Customer Success** | Onboarding, health scoring, retention | Multi | [View](./customer-success/) |

### Marketing & Advertising

| Skill | Description | Platform | Link |
|-------|-------------|----------|------|
| **Google Ads Manager** | Campaign management, keyword research | Google | [View](./google-ads-manager/) |
| **Facebook/Meta Ads** | FB & Instagram advertising | Meta | [View](./facebook-ads/) |
| **TikTok Marketing** | Content strategy, posting, analytics | TikTok | [View](./tiktok-marketing/) |
| **LinkedIn Automation** | B2B marketing, lead generation | LinkedIn | [View](./linkedin-automation/) |
| **Twitter/X Automation** | Social media management | Twitter | [View](./twitter-automation/) |
| **Mailchimp Automation** | Email marketing campaigns | Mailchimp | [View](./mailchimp-automation/) |
| **Email Marketing** | Multi-platform email automation | Multi | [View](./email-marketing/) |
| **SEO Optimizer** | SEO strategy and optimization | - | [View](./seo-optimizer/) |
| **Ads Copywriter** | Multi-platform ad copy generation | Multi | [View](./ads-copywriter/) |
| **Social Publisher** | Cross-platform social publishing | Multi | [View](./social-publisher/) |

### E-commerce

| Skill | Description | Platform | Link |
|-------|-------------|----------|------|
| **Shopify Automation** | Orders, inventory, customers | Shopify | [View](./shopify-automation/) |
| **WooCommerce Automation** | WordPress e-commerce automation | WooCommerce | [View](./woocommerce-automation/) |
| **Amazon Seller** | FBA, inventory, PPC management | Amazon | [View](./amazon-seller/) |

### Communication & Messaging

| Skill | Description | Platform | Link |
|-------|-------------|----------|------|
| **Slack Workflows** | Slack automation & integrations | Slack | [View](./slack-workflows/) |
| **Microsoft Teams** | Teams messaging & meetings | Teams | [View](./microsoft-teams/) |
| **Discord Bot** | Community management & bots | Discord | [View](./discord-bot/) |
| **Telegram Bot** | Bot development & automation | Telegram | [View](./telegram-bot/) |
| **WhatsApp Automation** | Business messaging & support | WhatsApp | [View](./whatsapp-automation/) |
| **Twilio SMS** | SMS & voice automation | Twilio | [View](./twilio-sms/) |

### Project Management

| Skill | Description | Platform | Link |
|-------|-------------|----------|------|
| **Jira Automation** | Issue tracking, sprints | Jira | [View](./jira-automation/) |
| **Asana Automation** | Task & project management | Asana | [View](./asana-automation/) |
| **Monday.com Automation** | Work management platform | Monday | [View](./monday-automation/) |
| **Linear Automation** | Engineering issue tracking | Linear | [View](./linear-automation/) |
| **Trello Automation** | Kanban board management | Trello | [View](./trello-automation/) |
| **ClickUp Automation** | All-in-one productivity | ClickUp | [View](./clickup-automation/) |
| **Notion Automation** | Database & wiki automation | Notion | [View](./notion-automation/) |
| **Airtable Automation** | Database automation | Airtable | [View](./airtable-automation/) |

### Customer Support

| Skill | Description | Platform | Link |
|-------|-------------|----------|------|
| **Zendesk Automation** | Ticket management & routing | Zendesk | [View](./zendesk-automation/) |
| **Intercom Automation** | Customer messaging & support | Intercom | [View](./intercom-automation/) |

### Financial Analysis

| Skill | Description | Department | Link |
|-------|-------------|------------|------|
| **Stock Analysis** | Stock research & analysis | Finance | [View](./stock-analysis/) |
| **DCF Valuation** | Discounted cash flow models | Finance | [View](./dcf-valuation/) |
| **Financial Modeling** | Build financial models | Finance | [View](./financial-modeling/) |
| **Company Research** | Company deep research | Finance | [View](./company-research/) |
| **Investment Memo** | Write investment memos | Finance | [View](./investment-memo/) |
| **Crypto Report** | Cryptocurrency analysis | Finance | [View](./crypto-report/) |
| **SaaS Metrics** | MRR, ARR, churn analysis | Finance | [View](./saas-metrics/) |

### Accounting & Payments

| Skill | Description | Platform | Link |
|-------|-------------|----------|------|
| **QuickBooks Automation** | Bookkeeping & accounting | QuickBooks | [View](./quickbooks-automation/) |
| **Stripe Payments** | Payment processing & subscriptions | Stripe | [View](./stripe-payments/) |
| **Invoice Automation** | Multi-platform invoicing | Multi | [View](./invoice-automation/) |
| **Expense Tracker** | Receipt processing & tracking | Multi | [View](./expense-tracker/) |
| **Subscription Management** | SaaS billing lifecycle | Multi | [View](./subscription-management/) |

### Data Engineering

| Skill | Description | Use Case | Link |
|-------|-------------|----------|------|
| **ETL Pipeline** | Extract, Transform, Load workflows | Data | [View](./etl-pipeline/) |
| **Database Sync** | Cross-database synchronization | Data | [View](./database-sync/) |
| **Sheets Automation** | Google Sheets workflows | Productivity | [View](./sheets-automation/) |
| **Gmail Workflows** | Email automation & organization | Productivity | [View](./gmail-workflows/) |
| **Calendar Automation** | Scheduling & time management | Productivity | [View](./calendar-automation/) |

### Research & Intelligence

| Skill | Description | Use Case | Link |
|-------|-------------|----------|------|
| **Deep Research** | Multi-source deep research | Research | [View](./deep-research/) |
| **Web Search** | Intelligent web search | Research | [View](./web-search/) |
| **Academic Search** | Scholarly paper research | Research | [View](./academic-search/) |
| **Competitive Analysis** | Competitor research | Strategy | [View](./competitive-analysis/) |
| **News Monitor** | News tracking & alerts | Intelligence | [View](./news-monitor/) |

### Visual & Creative

| Skill | Description | Use Case | Link |
|-------|-------------|----------|------|
| **Image Generation** | AI image creation | Creative | [View](./image-generation/) |
| **Diagram Creator** | Technical diagrams | Documentation | [View](./diagram-creator/) |
| **Chart Designer** | Data visualization | Analytics | [View](./chart-designer/) |
| **Infographic** | Infographic design | Marketing | [View](./infographic/) |
| **PPT Visual** | Presentation visuals | Presentations | [View](./ppt-visual/) |

### Media & Content

| Skill | Description | Platform | Link |
|-------|-------------|----------|------|
| **YouTube Automation** | Video management & analytics | YouTube | [View](./youtube-automation/) |
| **Podcast Automation** | Podcast production workflows | Multi | [View](./podcast-automation/) |
| **Transcription** | Audio/video transcription | Multi | [View](./transcription-automation/) |

### Smart Home & IoT

| Skill | Description | Platform | Link |
|-------|-------------|----------|------|
| **Home Assistant** | Smart home automation | HA | [View](./home-assistant/) |
| **Spotify Automation** | Music playback & playlists | Spotify | [View](./spotify-automation/) |
| **Weather Automation** | Weather-based workflows | Multi | [View](./weather-automation/) |
| **Apple Shortcuts** | iOS/macOS automation | Apple | [View](./apple-shortcuts/) |

### DevOps & Security

| Skill | Description | Use Case | Link |
|-------|-------------|----------|------|
| **DevOps Automation** | CI/CD & infrastructure | DevOps | [View](./devops-automation/) |
| **Security Monitoring** | Threat detection & response | Security | [View](./security-monitoring/) |

### HR & Operations

| Skill | Description | Department | Link |
|-------|-------------|------------|------|
| **HR Automation** | Recruiting & onboarding workflows | HR | [View](./hr-automation/) |
| **DocuSign Automation** | E-signature workflows | Legal/Ops | [View](./docusign-automation/) |

### AI & Agents

| Skill | Description | Use Case | Link |
|-------|-------------|----------|------|
| **AI Agent Builder** | Design multi-step AI agents | Development | [View](./ai-agent-builder/) |
| **Obsidian Automation** | Knowledge management | PKM | [View](./obsidian-automation/) |

---

## Creating Skills

### Skill Structure

Each skill is a folder containing a `SKILL.md` file with YAML frontmatter:

```
skill-name/
├── SKILL.md          # Required: Skill instructions and metadata
├── README.md         # Optional: Usage documentation
└── examples/         # Optional: Example files
```

### Basic Skill Template

```markdown
---
name: my-skill-name
description: A clear description of what this skill does
version: 1.0.0
author: your-name
license: MIT
---

# My Skill Name

## Overview
[What this skill does and when to use it]

## How to Use
[Step-by-step instructions]

## Domain Knowledge
[Embedded expertise that makes this skill valuable]

## Examples
[Real-world usage examples]

## Limitations
[What this skill cannot do]
```

### What Makes a Good Skill?

- **Specific**: Solves one clear problem
- **Knowledge-rich**: Contains real domain expertise
- **Actionable**: Clear steps and outputs
- **Tested**: Actually works with Claude
- **Documented**: Examples and edge cases

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## Architecture

![Claude Office Skills Architecture](./architecture.png)

| Component | Description | Users |
|-----------|-------------|-------|
| **Community Hub** (this repo) | Zero setup - copy & paste SKILL.md | 90% of users |
| **Advanced** | MCP Server + HTTP API + Cloudflare | Power users |

---

## Advanced Usage

For power users who need programmatic access or integrations:

| Repository | Description | Features |
|------------|-------------|----------|
| [contract-review-skill](https://github.com/claude-office-skills/contract-review-skill) | Full MCP server + HTTP API | Claude Desktop, Cloudflare, CI/CD |

---

## Contributing

We welcome contributions! **No coding required** - just write clear instructions in Markdown.

### Quick Contribution

1. Fork this repo
2. Create `your-skill-name/SKILL.md`
3. Follow the [template](./_template/SKILL.md)
4. Submit a PR

### Contribution Ideas

See our [Skill Roadmap](SKILL_ROADMAP.md) for planned skills and [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

Future skill ideas:
- [ ] **Privacy Policy** - GDPR/CCPA compliant policies
- [ ] **Terms of Service** - Fair, legally-sound ToS
- [ ] **Project Brief** - Project scope and requirements
- [ ] **Signal Integration** - Privacy-focused messaging
- [ ] **Sonos/Audio** - Multi-room audio control
- [ ] **3D Printing** - Printer management & slicing

---

## Resources

### Official Documentation

- [Claude Skills Overview](https://www.anthropic.com/news/agent-skills) - Official announcement
- [Skills User Guide](https://support.claude.com/en/articles/12512180-using-skills-in-claude) - How to use skills
- [Creating Custom Skills](https://support.claude.com/en/articles/12512198-creating-custom-skills) - Development guide
- [Agent Skills Blog](https://anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) - Engineering deep dive

### Community Resources

- [Anthropic Skills Repository](https://github.com/anthropics/skills) - Official example skills
- [Awesome Claude Skills](https://github.com/ComposioHQ/awesome-claude-skills) - Community curation (27k+ stars)
- [Awesome n8n Templates](https://github.com/enescingoz/awesome-n8n-templates) - Workflow automation inspiration

### Related Projects

- [MCP Protocol](https://modelcontextprotocol.io) - Model Context Protocol specification
- [Claude Code](https://claude.ai/code) - Claude's coding environment

---

## License

This repository is licensed under the [MIT License](LICENSE).

Individual skills may have different licenses - check each skill's folder for specific terms.

---

## Acknowledgments

Inspired by:
- [Anthropic Skills](https://github.com/anthropics/skills) - Official Claude Skills
- [Awesome Claude Skills](https://github.com/ComposioHQ/awesome-claude-skills) - Community curation
- [Awesome n8n Templates](https://github.com/enescingoz/awesome-n8n-templates) - Workflow automation

---

**Made with Claude, for everyone who works with documents.**

*Note: Claude Skills work across Claude.ai, Claude Code, and the Claude API. Once you create a skill, it's portable across all platforms.*
