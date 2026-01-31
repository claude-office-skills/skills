# Claude Office Agents

> Pre-configured AI personas with specialized skills for specific roles.

## What Are Agents?

**Agents** are pre-packaged AI personas that combine:
- **Personality**: Tone, style, and communication preferences
- **Skills**: Curated set of abilities from the skills library
- **Knowledge**: Domain-specific expertise and rules
- **Tools**: MCP tool access for document operations

Think of agents as "digital employees" you can deploy to handle specific tasks.

## Available Agents

| Agent | Role | Skills | Platforms |
|-------|------|--------|-----------|
| [Legal Specialist](./legal-specialist/) | Contract Review & Legal Ops | contract-review, nda-generator | All |
| [Data Analyst](./data-analyst/) | Excel Analysis & Reporting | data-analysis, dcf-valuation | All |
| [Admin Assistant](./admin-assistant/) | Email & Calendar Management | email-drafter, meeting-notes | All |
| [Research Analyst](./research-analyst/) | Deep Research & Company Analysis | deep-research, company-research | All |
| [Content Creator](./content-creator/) | Writing & Marketing Content | content-writer, seo-optimizer | All |

## Quick Start

### 1. Choose an Agent

Browse the agents above and find one that matches your needs.

### 2. Deploy to Your Platform

**WhatsApp/Telegram (via Moltbot)**:
```bash
# Install an agent
curl -fsSL https://molt.bot/install | bash -s -- --agent legal-specialist
```

**Claude Desktop**:
```json
{
  "agents": {
    "legal-specialist": {
      "path": "./agents/legal-specialist/AGENT.md"
    }
  }
}
```

**API**:
```python
import anthropic

agent_config = open("agents/legal-specialist/AGENT.md").read()
response = client.messages.create(
    system=agent_config,
    messages=[{"role": "user", "content": "Review this contract..."}]
)
```

### 3. Start Chatting

The agent will respond according to its personality and use its skills automatically.

## Agent vs Skill

| Aspect | Skill | Agent |
|--------|-------|-------|
| **What** | Single capability | Complete persona |
| **Contains** | Instructions for one task | Personality + multiple skills |
| **Use when** | You know exactly what task | You want a consistent assistant |
| **Example** | `contract-review` skill | `legal-specialist` agent |

## Creating Custom Agents

### 1. Copy the Template

```bash
cp -r agents/_template agents/my-agent
```

### 2. Edit AGENT.md

Configure:
- **Personality**: How the agent communicates
- **Skills**: Which skills to equip
- **Knowledge**: Domain expertise to include
- **Platforms**: Where to deploy

### 3. Test Locally

```bash
# Load agent in Claude Desktop or API
claude --agent ./agents/my-agent/AGENT.md
```

### 4. Deploy

Deploy to your preferred platform (WhatsApp, Telegram, Slack, etc.)

## Agent Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Agent (AGENT.md)                                       │
│  ┌─────────────────────────────────────────────────────┤
│  │ Personality: tone, style, language                  │
│  ├─────────────────────────────────────────────────────┤
│  │ Skills[]: contract-review, nda-generator, ...       │
│  ├─────────────────────────────────────────────────────┤
│  │ Knowledge[]: risk_patterns, jurisdictions, ...      │
│  ├─────────────────────────────────────────────────────┤
│  │ MCP Tools[]: extract_pdf, create_docx, ...          │
│  └─────────────────────────────────────────────────────┘
└─────────────────────────────────────────────────────────┘
```

## Contributing

We welcome new agent configurations! See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

### Ideas for New Agents

- [ ] HR Manager - Recruiting, onboarding, performance reviews
- [ ] Sales Rep - Lead research, proposal writing, CRM
- [ ] Finance Controller - Invoice processing, expense tracking
- [ ] Customer Success - Support tickets, onboarding guides
- [ ] Project Manager - Task tracking, status reports

---

**Made with Claude Office Skills.**
