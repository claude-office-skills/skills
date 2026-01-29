---
name: Applicant Screening
description: Screen job applications against requirements and score candidates
author: claude-office-skills
version: "1.0"
tags: [hr, recruitment, hiring, screening, resume]
models: [claude-sonnet-4, claude-opus-4]
tools: [computer, file_operations]
---

# Applicant Screening

Screen job applications against role requirements to identify top candidates efficiently.

## Overview

This skill helps you:
- Evaluate resumes against job requirements
- Score candidates consistently
- Identify must-have vs. nice-to-have qualifications
- Flag potential concerns
- Rank applicants for interviews

## How to Use

### Single Candidate
```
"Screen this resume against our [Job Title] requirements"
"Evaluate this application for the [Position] role"
```

### Batch Screening
```
"Screen these 10 applications for the Senior Developer position"
"Rank these candidates based on our requirements"
```

### With Criteria
```
"Screen for: 5+ years Python, AWS experience required, ML nice-to-have"
```

## Screening Framework

### Requirements Matrix
```markdown
## Job Requirements: [Position]

### Must-Have (Required)
| Requirement | Weight | Criteria |
|-------------|--------|----------|
| [Skill 1] | 20% | [X] years experience |
| [Skill 2] | 15% | [Certification/level] |
| [Education] | 10% | [Degree type] |
| [Experience] | 25% | [Industry/role type] |

### Nice-to-Have (Preferred)
| Requirement | Bonus | Criteria |
|-------------|-------|----------|
| [Skill 3] | +5pts | [Description] |
| [Skill 4] | +5pts | [Description] |
| [Trait] | +3pts | [Indicator] |

### Disqualifiers
- [ ] No work authorization
- [ ] Below minimum experience
- [ ] Missing required certification
- [ ] Salary expectation mismatch
```

## Output Formats

### Individual Screening Report
```markdown
# Candidate Screening: [Name]

## Quick Summary
| Attribute | Value |
|-----------|-------|
| **Position** | [Job Title] |
| **Score** | [X]/100 |
| **Recommendation** | 🟢 Interview / 🟡 Maybe / 🔴 Pass |

## Candidate Profile
- **Name**: [Full Name]
- **Location**: [City, State]
- **Current Role**: [Title] at [Company]
- **Total Experience**: [X] years
- **Education**: [Degree, School]

## Requirements Match

### Must-Have Requirements
| Requirement | Met? | Evidence | Score |
|-------------|------|----------|-------|
| [5+ years Python] | ✅ | 7 years at 2 companies | 20/20 |
| [AWS experience] | ✅ | AWS Certified, 3 years | 15/15 |
| [Bachelor's CS] | ✅ | BS Computer Science, MIT | 10/10 |
| [Team lead exp] | ⚠️ | Led 2-person team | 5/10 |

**Must-Have Score**: [X]/[Total]

### Nice-to-Have
| Requirement | Met? | Evidence | Bonus |
|-------------|------|----------|-------|
| [ML experience] | ✅ | Built recommendation system | +5 |
| [Startup exp] | ✅ | 2 early-stage startups | +5 |
| [Open source] | ❌ | Not mentioned | 0 |

**Nice-to-Have Bonus**: +[X] points

## Strengths 💪
1. [Strength 1 with evidence]
2. [Strength 2 with evidence]
3. [Strength 3 with evidence]

## Concerns ⚠️
1. [Concern 1 - question to ask in interview]
2. [Concern 2 - what to verify]

## Red Flags 🚩
- [If any - employment gaps, inconsistencies, etc.]

## Interview Questions
Based on this candidate's profile, consider asking:
1. [Question about specific experience]
2. [Question about concern area]
3. [Question about growth potential]

## Overall Assessment
[2-3 sentence summary of fit]

**Final Score**: [X]/100
**Recommendation**: [Interview / Phone Screen / Pass]
**Priority**: [High / Medium / Low]
```

### Batch Ranking Report
```markdown
# Applicant Ranking: [Position]

**Date**: [Date]
**Total Applications**: [X]
**Reviewed**: [X]

## Summary
| Category | Count | % |
|----------|-------|---|
| 🟢 Strong Interview | [X] | [%] |
| 🟡 Phone Screen | [X] | [%] |
| 🔵 Maybe/Hold | [X] | [%] |
| 🔴 Not a Fit | [X] | [%] |

## Top Candidates

### 🥇 Tier 1: Strong Interview (Score 80+)

| Rank | Name | Score | Key Strengths | Concerns |
|------|------|-------|---------------|----------|
| 1 | [Name] | 92 | [Strengths] | [Concerns] |
| 2 | [Name] | 88 | [Strengths] | [Concerns] |
| 3 | [Name] | 85 | [Strengths] | [Concerns] |

### 🥈 Tier 2: Phone Screen (Score 65-79)

| Rank | Name | Score | Key Strengths | Gap to Address |
|------|------|-------|---------------|----------------|
| 4 | [Name] | 75 | [Strengths] | [Gap] |
| 5 | [Name] | 72 | [Strengths] | [Gap] |

### 🥉 Tier 3: Maybe/Hold (Score 50-64)

| Name | Score | Reason for Hold |
|------|-------|-----------------|
| [Name] | 58 | [Reason] |

### ❌ Not Proceeding (Score <50)

| Name | Score | Primary Reason |
|------|-------|----------------|
| [Name] | 45 | Missing required [X] |
| [Name] | 38 | Below minimum experience |

## Insights

### Applicant Pool Quality
[Assessment of overall pool quality]

### Common Strengths
- [Frequently seen strength]
- [Frequently seen strength]

### Common Gaps
- [What most candidates lack]
- [Skill shortage in pool]

### Recommendations
1. [Action for top candidates]
2. [Suggestion for sourcing if pool weak]
```

## Scoring Rubric

### Experience Scoring
| Years | Entry | Mid | Senior | Lead |
|-------|-------|-----|--------|------|
| 0-1 | 10/10 | 3/10 | 0/10 | 0/10 |
| 2-3 | 8/10 | 7/10 | 3/10 | 0/10 |
| 4-5 | 5/10 | 10/10 | 7/10 | 3/10 |
| 6-8 | 3/10 | 8/10 | 10/10 | 7/10 |
| 9+ | 0/10 | 5/10 | 10/10 | 10/10 |

### Education Scoring
| Level | Technical Role | Non-Technical |
|-------|----------------|---------------|
| PhD | 10/10 | 8/10 |
| Master's | 9/10 | 9/10 |
| Bachelor's | 8/10 | 10/10 |
| Associate's | 5/10 | 7/10 |
| Bootcamp | 6/10 | N/A |
| Self-taught | 4/10 | N/A |

## Best Practices

### Fair Screening
- Focus on job-related criteria only
- Ignore protected characteristics
- Use consistent scoring
- Document decisions
- Consider diverse backgrounds

### Bias Awareness
- Name/gender bias: Focus on qualifications
- Affinity bias: Diverse interview panels
- Confirmation bias: Score before gut feeling
- Halo effect: Evaluate each criterion separately

### Legal Considerations
- Only use job-relevant criteria
- Apply standards consistently
- Keep screening records
- Have HR review process
- Consider adverse impact

## Limitations

- Cannot verify employment history
- May miss context from non-traditional backgrounds
- Scoring is guidance, not absolute
- Cannot assess cultural fit or soft skills fully
- Human judgment essential for final decisions
