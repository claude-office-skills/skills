---
name: xquik-social-data
description: Use Xquik for X data workflows, account and keyword monitoring, MCP setup, webhooks, exports, and approval-gated actions.
version: 1.0.0
author: Xquik-dev
category: social-media
tags:
  - x
  - twitter
  - social-media
  - mcp
  - webhooks
department: marketing
models:
  - claude-3-opus
  - claude-3-sonnet
  - gpt-4
capabilities:
  - X search and lookup workflows
  - Account and keyword monitoring
  - Webhook delivery planning
  - MCP client setup
  - Approval-gated account actions
input:
  - Xquik API key
  - Target accounts, keywords, or URLs
  - Webhook endpoint
  - Export requirements
output:
  - Integration plan
  - API or MCP task mapping
  - Webhook verification checklist
  - Data export workflow
languages:
  - en
related_skills:
  - twitter-automation
  - social-publisher
  - webhook-automation
---

# Xquik Social Data

Use this skill to plan Xquik workflows for X data collection, monitoring, MCP access, webhook delivery, exports, and approval-gated actions.

## Overview

Xquik provides public REST API, MCP, monitoring, and webhook surfaces for X data workflows. This skill helps choose the right interface, define the workflow, and keep account-changing actions explicit.

## When to Use

- Build an X search, lookup, or export workflow.
- Configure account or keyword monitors.
- Connect an AI agent through the Xquik MCP server.
- Deliver X events to a signed webhook endpoint.
- Draft approval-gated actions for later user confirmation.

## How to Use

1. Identify the workflow goal: search, lookup, monitoring, export, MCP, or action.
2. Read the current public docs:
   - API reference: `https://docs.xquik.com/api-reference`
   - MCP guide: `https://docs.xquik.com/mcp/overview`
3. Keep the Xquik API key in the user's approved secret store.
4. Map the workflow to REST, MCP, or webhook delivery.
5. Add pagination, retry, and verification steps where needed.
6. Require clear user approval before any account-changing action.

## Workflow Patterns

### Search and Export

Use REST for repeatable data jobs.

- Define search terms, account targets, or tweet URLs.
- Confirm result fields and pagination requirements.
- Store export files in the user's approved destination.
- Document how downstream systems should handle empty results.

### Monitoring and Webhooks

Use monitors and webhooks for ongoing workflows.

- Define monitored accounts or keywords.
- Configure a signed webhook endpoint.
- Verify signatures before processing events.
- Capture retry behavior and failure handling in the runbook.

### MCP Access

Use MCP when an AI agent needs guided access to Xquik tasks.

- Configure the Xquik MCP server from the public guide.
- Limit the agent to the workflow scope.
- Keep account-changing actions approval-gated.
- Log inputs and outputs without storing API keys.

## Output Format

Return a concise implementation plan:

```markdown
## Goal
<workflow goal>

## Xquik Surface
REST API | MCP | Webhooks

## Steps
1. <setup step>
2. <execution step>
3. <validation step>

## Safety
- API key stored outside prompts and source files.
- Account-changing actions require explicit user approval.
- Webhook signatures verified before processing.

## Validation
- Links checked.
- Response shape or event payload documented.
- Empty-result behavior handled.
```

## Example

**User:** "Build a workflow that watches brand mentions on X and posts events to our CRM."

**Response:** Use Xquik monitors for the keyword stream, configure a signed webhook endpoint, verify signatures in the CRM receiver, and document retry handling.

## Limitations

- Do not collect or store API keys in prompts, documents, or source files.
- Do not promise unsupported Xquik endpoints or response fields.
- Do not run account-changing actions without explicit user approval.
- Do not use this skill to bypass platform policies or access controls.

## References

- [Xquik API Reference](https://docs.xquik.com/api-reference)
- [Xquik MCP Guide](https://docs.xquik.com/mcp/overview)
- [Xquik x-twitter-scraper](https://github.com/Xquik-dev/x-twitter-scraper)
