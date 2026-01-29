---
name: internal-comms
description: Write internal communications like status reports, newsletters, and FAQs.
source: https://github.com/anthropics/skills/tree/main/skills/internal-comms
license: Apache 2.0 (Anthropic)
---

# Internal Communications Skill

> **Source**: [anthropics/skills/internal-comms](https://github.com/anthropics/skills/tree/main/skills/internal-comms) (Apache 2.0)

## Overview

This skill helps write various types of internal business communications in consistent, professional formats.

## Supported Communication Types

| Type | Description | Use Case |
|------|-------------|----------|
| **3P Updates** | Progress, Plans, Problems | Weekly team updates |
| **Newsletters** | Company-wide communications | Monthly announcements |
| **FAQ Responses** | Answering common questions | Policy clarifications |
| **Status Reports** | Project progress updates | Stakeholder updates |
| **Leadership Updates** | Executive communications | Strategic updates |
| **Incident Reports** | Post-incident summaries | Issue documentation |

## How to Use

Simply ask Claude to write the communication type you need:

**3P Update:**
> "Write a 3P update for our engineering team this week. Progress: completed API integration. Plans: start frontend work. Problems: waiting on design assets."

**Newsletter:**
> "Write a company newsletter announcing our new product launch"

**FAQ Response:**
> "Write an FAQ response about our new remote work policy"

**Status Report:**
> "Write a project status report for the Q1 marketing campaign"

## Tips for Best Results

1. **Provide context**: Include relevant background information
2. **Specify audience**: Who will read this communication?
3. **Include key points**: What must be communicated?
4. **Mention tone**: Formal, casual, urgent?

## Example: 3P Update

**Input:**
> "Write a 3P update for product team. Progress: launched v2.0, 1000 signups first day. Plans: fix onboarding bugs, prepare v2.1. Problems: support queue is growing."

**Output:**

```
## Product Team Update - Week 47

### Progress
- Successfully launched v2.0 to production
- Achieved 1,000 new signups in first 24 hours
- Positive initial user feedback on new features

### Plans
- Address critical onboarding flow bugs (target: EOW)
- Begin planning for v2.1 feature set
- Schedule user feedback sessions

### Problems
- Support queue increasing significantly post-launch
- Need additional support coverage or FAQ documentation
- Request: Can we get temporary help from CS team?
```

---

*This is an open-source skill from Anthropic. See the [original repository](https://github.com/anthropics/skills/tree/main/skills/internal-comms) for the complete version with templates.*
