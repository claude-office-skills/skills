---
# ═══════════════════════════════════════════════════════════════════════════════
# CLAUDE OFFICE SKILL - Enhanced Metadata v2.0
# ═══════════════════════════════════════════════════════════════════════════════

# Basic Information
name: email-drafter
description: ">"
version: "1.0.0"
author: Claude Office Skills Contributors
license: MIT

# Categorization
category: productivity
tags:
  - email
  - writing
  - communication
department: All

# AI Model Compatibility
models:
  recommended:
    - claude-sonnet-4
    - claude-opus-4
  compatible:
    - claude-3-5-sonnet
    - gpt-4
    - gpt-4o

# MCP Tools Integration
mcp:
  server: office-mcp
  tools:
    - create_docx

# Skill Capabilities
capabilities:
  - email_writing
  - professional_tone
  - template_usage

# Language Support
languages:
  - en
  - zh
---

# Email Drafter

## Overview

This skill helps you draft professional emails for various business scenarios. It understands context, maintains appropriate tone, and follows email best practices for different situations.

**Use Cases:**
- Responding to client inquiries
- Following up on meetings
- Requesting information or approvals
- Delivering difficult news professionally
- Cold outreach and introductions
- Thank you and appreciation emails

## How to Use

1. Tell me the email scenario (reply, new message, follow-up, etc.)
2. Provide context: recipient, relationship, purpose
3. Share any specific points to include
4. I'll draft an appropriate email

**Example prompts:**
- "Draft a follow-up email after our sales meeting with Acme Corp"
- "Write a polite reminder for an overdue invoice"
- "Help me decline this meeting request professionally"
- "Draft a cold outreach email to a potential partner"

## Email Templates & Structures

### Professional Email Structure

```
Subject: [Clear, specific, action-oriented]

[Greeting - appropriate to relationship]

[Opening - context/reference]

[Body - main message, organized by priority]

[Call to action - clear next steps]

[Closing - appropriate sign-off]

[Signature]
```

### Tone Guidelines

| Scenario | Tone | Key Elements |
|----------|------|--------------|
| Client communication | Professional, warm | Respect, clarity, helpfulness |
| Internal team | Direct, friendly | Efficiency, collaboration |
| Executive/Senior | Concise, respectful | Bottom-line first, data-driven |
| Cold outreach | Engaging, value-focused | Hook, relevance, clear ask |
| Difficult news | Empathetic, clear | Acknowledge, explain, next steps |
| Follow-up | Polite, persistent | Reference, value add, easy response |

### Subject Line Best Practices

**Good subject lines:**
- "Action Required: Q4 Budget Approval by Friday"
- "Meeting Follow-up: Next Steps for Project Alpha"
- "Quick Question: Your Availability Next Week"
- "Thank You - Great Meeting Today"

**Avoid:**
- Vague: "Hello" or "Quick question"
- Too long: More than 50 characters
- ALL CAPS or excessive punctuation
- Misleading clickbait

### Common Email Scenarios

#### 1. Meeting Follow-up
```
Subject: Follow-up: [Meeting Topic] - Next Steps

Hi [Name],

Thank you for taking the time to meet [today/yesterday]. I enjoyed our discussion about [topic].

As discussed, here are the key action items:
• [Action 1] - [Owner] - [Deadline]
• [Action 2] - [Owner] - [Deadline]

I'll [your next action] by [date]. Please let me know if I missed anything or if you have questions.

Looking forward to our continued collaboration.

Best regards,
[Your name]
```

#### 2. Request/Ask Email
```
Subject: Request: [Specific Ask]

Hi [Name],

I hope this message finds you well.

I'm reaching out because [brief context]. Would you be able to [specific request]?

To give you more context:
• [Relevant detail 1]
• [Relevant detail 2]

If possible, I'd appreciate your response by [date]. Please let me know if you need any additional information.

Thank you for your time.

Best,
[Your name]
```

#### 3. Polite Decline
```
Subject: RE: [Original Subject]

Hi [Name],

Thank you for thinking of me for [opportunity/request].

After careful consideration, I won't be able to [participate/attend/take on] at this time due to [brief, honest reason].

[Optional: Alternative suggestion or future possibility]

I appreciate your understanding and hope we can [connect/collaborate] in the future.

Best regards,
[Your name]
```

#### 4. Apology/Issue Resolution
```
Subject: Apology: [Brief Issue Description]

Dear [Name],

I want to sincerely apologize for [specific issue]. I understand this [caused inconvenience/affected your work/etc.].

Here's what happened: [Brief explanation without excuses]

To make this right, I have [action taken/will take]:
• [Corrective action 1]
• [Corrective action 2]

I'm committed to ensuring this doesn't happen again by [preventive measure].

Please let me know if there's anything else I can do.

Sincerely,
[Your name]
```

## Output Format

When I draft an email, I'll provide:

```
## Email Draft

**Subject:** [Suggested subject line]

**To:** [Recipient]
**CC:** [If applicable]

---

[Email body]

---

## Notes
- [Any considerations or alternatives]
- [Suggested timing for sending]
```

## Customization Options

Tell me your preferences:
- **Tone**: Formal, semi-formal, casual
- **Length**: Brief (2-3 sentences), standard, detailed
- **Style**: Direct, diplomatic, enthusiastic
- **Sign-off**: Best, Regards, Thanks, Cheers, etc.

## Limitations

- Cannot send emails (draft only)
- May not know your organization's specific communication norms
- Should be reviewed for accuracy of names, dates, and details
- Not suitable for legal or highly sensitive communications without review

## Examples

### Example 1: Follow-up After Interview

**User:** "Draft a thank-you email after my job interview at TechCorp for a Product Manager role. I met with Sarah Chen, VP of Product."

**Output:**

**Subject:** Thank You - Product Manager Interview

Dear Sarah,

Thank you for taking the time to meet with me today about the Product Manager position at TechCorp. I thoroughly enjoyed learning about the team's vision for expanding into enterprise markets.

Our conversation reinforced my excitement about this opportunity. I'm particularly drawn to the challenge of building the analytics dashboard you mentioned, and I believe my experience leading similar initiatives at my current role would translate well.

I'm very interested in joining the TechCorp team and contributing to your product strategy. Please don't hesitate to reach out if you need any additional information from me.

Thank you again for the opportunity. I look forward to hearing from you.

Best regards,
[Your name]
