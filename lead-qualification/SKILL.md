---
name: Lead Qualification
description: Score and qualify leads based on criteria and fit
author: claude-office-skills
version: "1.0"
tags: [sales, crm, leads, qualification, scoring]
models: [claude-sonnet-4, claude-opus-4]
tools: [computer]
---

# Lead Qualification

Score and qualify leads based on defined criteria to focus sales efforts effectively.

## Overview

This skill helps you:
- Evaluate leads against qualification criteria
- Score leads for prioritization
- Identify deal-breakers and green flags
- Recommend next actions
- Maintain consistent qualification

## Qualification Frameworks

### BANT (Budget, Authority, Need, Timeline)
```markdown
## BANT Qualification: [Lead Name]

### Budget (/25)
| Question | Answer | Score |
|----------|--------|-------|
| Defined budget? | [Yes/No/Unknown] | /10 |
| Budget range? | [$X - $Y] | /10 |
| Budget fits our pricing? | [Yes/No] | /5 |
**Budget Score**: [X]/25

### Authority (/25)
| Question | Answer | Score |
|----------|--------|-------|
| Decision maker? | [Yes/No/Influencer] | /10 |
| Who else involved? | [Names/Roles] | /5 |
| Sign-off process? | [Description] | /5 |
| Champion identified? | [Yes/No] | /5 |
**Authority Score**: [X]/25

### Need (/25)
| Question | Answer | Score |
|----------|--------|-------|
| Clear pain point? | [Description] | /10 |
| Impact of not solving? | [Description] | /10 |
| Using alternatives? | [Current solution] | /5 |
**Need Score**: [X]/25

### Timeline (/25)
| Question | Answer | Score |
|----------|--------|-------|
| Target implementation? | [Date/Quarter] | /10 |
| Urgency level? | [High/Medium/Low] | /10 |
| Trigger event? | [Description] | /5 |
**Timeline Score**: [X]/25

---
**Total BANT Score**: [X]/100
**Qualification**: [Qualified / Needs Work / Not Qualified]
```

### MEDDIC (Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion)
```markdown
## MEDDIC Qualification: [Lead Name]

### Metrics
**Business impact they expect**:
- [Metric 1]: [Current] → [Target]
- [Metric 2]: [Current] → [Target]

### Economic Buyer
**Person with budget authority**:
- Name: [Name]
- Title: [Title]
- Access: [Direct/Indirect/None]

### Decision Criteria
**How they'll evaluate solutions**:
1. [Criterion 1] - Weight: [%]
2. [Criterion 2] - Weight: [%]
3. [Criterion 3] - Weight: [%]

### Decision Process
**Steps to purchase**:
1. [Step 1] - Owner: [Name] - Timeline: [Date]
2. [Step 2] - Owner: [Name] - Timeline: [Date]
3. [Step 3] - Owner: [Name] - Timeline: [Date]

### Identify Pain
**Core problem**:
[Description of the pain point]

**Implications of not solving**:
[Business impact]

### Champion
**Internal advocate**:
- Name: [Name]
- Influence level: [High/Medium/Low]
- What they gain: [Personal win]

---
**MEDDIC Coverage**: [X]/6 elements confirmed
**Deal Health**: [Strong / At Risk / Weak]
```

### GPCTBA/C&I (Goals, Plans, Challenges, Timeline, Budget, Authority, Consequences & Implications)
```markdown
## GPCTBA/C&I: [Lead Name]

### Goals
What are they trying to achieve?
- [Goal 1]
- [Goal 2]

### Plans
How do they plan to achieve it?
- [Current plan]

### Challenges
What's stopping them?
- [Challenge 1]
- [Challenge 2]

### Timeline
When do they need to achieve this?
- Target: [Date]
- Urgency: [High/Medium/Low]

### Budget
What resources are allocated?
- Amount: [Range]
- Approved: [Yes/No/Pending]

### Authority
Who makes the decision?
- Decision Maker: [Name]
- Influencers: [Names]
- Process: [Description]

### Consequences (Negative)
What happens if they don't solve this?
- [Consequence 1]
- [Consequence 2]

### Implications (Positive)
What happens when they succeed?
- [Benefit 1]
- [Benefit 2]
```

## Lead Scoring Model

### Fit Score (Demographics)
```markdown
## Fit Scoring Criteria

### Company Fit (50 points)
| Criterion | Points | Lead Value | Score |
|-----------|--------|------------|-------|
| Industry | /15 | [Industry] | |
| Company Size | /15 | [Employees] | |
| Revenue | /10 | [Revenue] | |
| Geography | /10 | [Location] | |
**Company Fit**: [X]/50

### Contact Fit (50 points)
| Criterion | Points | Lead Value | Score |
|-----------|--------|------------|-------|
| Title/Role | /20 | [Title] | |
| Department | /15 | [Dept] | |
| Seniority | /15 | [Level] | |
**Contact Fit**: [X]/50

**Total Fit Score**: [X]/100
```

### Engagement Score (Behavioral)
```markdown
## Engagement Scoring

### Website Activity
| Action | Points | Occurrences | Score |
|--------|--------|-------------|-------|
| Pricing page view | 10 | [X] | |
| Demo request | 25 | [X] | |
| Content download | 5 | [X] | |
| Blog visit | 2 | [X] | |

### Email Engagement
| Action | Points | Occurrences | Score |
|--------|--------|-------------|-------|
| Email opened | 1 | [X] | |
| Link clicked | 3 | [X] | |
| Replied | 10 | [X] | |

### Event Participation
| Action | Points | Occurrences | Score |
|--------|--------|-------------|-------|
| Webinar attended | 15 | [X] | |
| Meeting booked | 25 | [X] | |

**Total Engagement Score**: [X]/100
```

## Output Format

### Lead Qualification Report
```markdown
# Lead Qualification: [Company/Contact]

## Summary
| Metric | Value |
|--------|-------|
| **Fit Score** | [X]/100 |
| **Engagement Score** | [X]/100 |
| **BANT Score** | [X]/100 |
| **Overall** | [X]/100 |

## Qualification Status
🟢 **QUALIFIED** / 🟡 **NEEDS NURTURING** / 🔴 **NOT QUALIFIED**

## Key Findings
### ✅ Green Flags
1. [Positive indicator]
2. [Positive indicator]

### ⚠️ Yellow Flags
1. [Concern that needs addressing]
2. [Missing information]

### ❌ Red Flags
1. [Deal-breaker or major concern]

## Gaps to Address
| Gap | Question to Ask | Priority |
|-----|-----------------|----------|
| [Unknown area] | [Specific question] | High |
| [Unknown area] | [Specific question] | Medium |

## Recommended Next Steps
1. [Immediate action]
2. [Follow-up action]
3. [Long-term action]

## Disqualification Criteria Check
- [ ] Below minimum company size
- [ ] Outside target geography
- [ ] No budget authority
- [ ] Timeline > 12 months
- [ ] Already using competitor with lock-in
```

## Best Practices

### Qualification Tips
1. **Ask open-ended questions**: Get context, not just yes/no
2. **Verify, don't assume**: Confirm information directly
3. **Document everything**: Keep CRM updated
4. **Re-qualify regularly**: Situations change
5. **Know when to walk away**: Time is valuable

### Common Mistakes
- Qualifying too quickly
- Ignoring red flags
- Not identifying all stakeholders
- Assuming budget = ability to buy
- Forgetting to re-qualify over time

## Limitations

- Cannot access CRM data directly
- Scoring requires defined criteria from user
- Cannot verify provided information
- Qualification is guidance, not guarantee
- Human judgment still essential
