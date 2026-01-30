---
# ═══════════════════════════════════════════════════════════════════════════════
# CLAUDE OFFICE SKILL - Investment Memo
# ═══════════════════════════════════════════════════════════════════════════════

name: investment-memo
description: "Write professional investment memorandums for VC, PE, or public market investments. Structure thesis, risks, and recommendations clearly."
version: "1.0.0"
author: claude-office-skills
license: MIT

category: finance
tags:
  - investment
  - memo
  - venture-capital
  - private-equity
  - analysis
department: Finance/Investment

models:
  recommended:
    - claude-sonnet-4
    - claude-opus-4
  compatible:
    - claude-3-5-sonnet
    - gpt-4
    - gpt-4o

mcp:
  server: office-mcp
  tools:
    - create_docx
    - fill_docx_template
    - docx_to_pdf

capabilities:
  - investment_thesis_writing
  - risk_analysis
  - deal_structuring
  - recommendation_synthesis
  - memo_formatting

languages:
  - en
  - zh

related_skills:
  - dcf-valuation
  - company-research
  - stock-analysis
---

# Investment Memo Skill

## Overview

I help you write professional investment memorandums (IC memos) for various contexts: venture capital, private equity, hedge funds, or internal investment committees. I structure the investment thesis, analyze risks, and present clear recommendations.

**What I can do:**
- Structure investment thesis clearly
- Summarize key due diligence findings
- Analyze risks and mitigants
- Present valuation and returns analysis
- Draft actionable recommendations
- Format for investment committee review

**What I cannot do:**
- Conduct primary due diligence
- Provide investment recommendations as advice
- Access proprietary deal data
- Replace professional investment judgment

---

## How to Use Me

### Step 1: Provide Investment Context

Tell me:
- Type of investment (VC/PE/Public/Credit)
- Company/deal overview
- Investment amount and terms (if known)
- Your firm's investment criteria

### Step 2: Share Due Diligence Findings

Provide:
- Company background and financials
- Market and competitive analysis
- Management assessment
- Key risks identified
- Valuation analysis

### Step 3: Specify Memo Format

- **Standard IC Memo**: Full formal memo
- **Deal Summary**: 1-2 page overview
- **Quick Take**: Brief investment thesis
- **Follow-on Memo**: Update on existing position

---

## Memo Structure

### VC Investment Memo

```
1. Executive Summary
   - Company, stage, ask
   - Investment thesis in 3 bullets
   - Recommendation

2. Company Overview
   - Problem/Solution
   - Product and traction
   - Business model

3. Market Opportunity
   - TAM/SAM/SOM
   - Market trends
   - Timing

4. Team
   - Founders background
   - Key hires
   - Board/advisors

5. Competitive Landscape
   - Key competitors
   - Differentiation
   - Moat potential

6. Traction & Metrics
   - Key KPIs
   - Growth trajectory
   - Unit economics

7. Investment Terms
   - Round size, valuation
   - Pro-forma cap table
   - Use of funds

8. Risk Analysis
   - Key risks and mitigants

9. Recommendation
   - Investment decision
   - Ownership target
   - Value-add plan
```

### PE Investment Memo

```
1. Executive Summary
2. Investment Thesis
3. Business Overview
4. Industry Analysis
5. Financial Performance
6. Management
7. Transaction Overview
8. Value Creation Plan
9. Financial Projections
10. Returns Analysis
11. Risk Factors
12. Recommendation
```

---

## Output Format

```markdown
# INVESTMENT MEMORANDUM
## [Company Name]

**Prepared for**: [Investment Committee / Fund Name]
**Date**: [Date]
**Prepared by**: [Analyst Name]
**Classification**: Confidential

---

## EXECUTIVE SUMMARY

### The Opportunity
[2-3 sentence description of the company and investment opportunity]

### Investment Ask
| Metric | Details |
|--------|---------|
| Round | [Series X / LBO / etc.] |
| Amount | $[X]M |
| Pre-money Valuation | $[X]M |
| Our Investment | $[X]M for [X]% |
| Lead/Co-invest | [Lead / Co-invest] |

### Investment Thesis
1. **[Thesis Point 1]**: [1-2 sentence explanation]
2. **[Thesis Point 2]**: [1-2 sentence explanation]
3. **[Thesis Point 3]**: [1-2 sentence explanation]

### Key Risks
1. [Risk 1]
2. [Risk 2]
3. [Risk 3]

### Recommendation
**[INVEST / PASS / MORE DILIGENCE NEEDED]** at $[X]M for [X]% ownership

---

## 1. COMPANY OVERVIEW

### Background
[Company history, founding story, key milestones]

### Problem & Solution
**Problem**: [What problem does the company solve?]
**Solution**: [How does the company solve it?]

### Business Model
[How the company makes money]

| Revenue Stream | Description | % of Revenue |
|----------------|-------------|--------------|
| [Stream 1] | | |
| [Stream 2] | | |

### Product
[Description of product/service, key features, differentiation]

---

## 2. MARKET OPPORTUNITY

### Market Size
| Segment | Size | Growth | Notes |
|---------|------|--------|-------|
| TAM | $[X]B | [X]% | |
| SAM | $[X]B | [X]% | |
| SOM | $[X]B | [X]% | |

### Market Trends
1. [Trend 1]
2. [Trend 2]
3. [Trend 3]

### Why Now?
[Market timing thesis]

---

## 3. COMPETITIVE LANDSCAPE

### Competitive Position
[How the company positions against competitors]

### Key Competitors
| Competitor | Funding | Strengths | Weaknesses |
|------------|---------|-----------|------------|
| [Comp 1] | $[X]M | | |
| [Comp 2] | $[X]M | | |

### Sustainable Advantages
- [Moat 1]
- [Moat 2]

---

## 4. TEAM

### Founders
| Name | Role | Background | Equity |
|------|------|------------|--------|
| | CEO | | |
| | CTO | | |

### Management Assessment
[Quality of team, gaps, hiring plans]

### Board Composition
[Current board, proposed board seat]

---

## 5. TRACTION & METRICS

### Key Performance Indicators
| Metric | Current | 12M Ago | Growth |
|--------|---------|---------|--------|
| ARR/Revenue | $[X]M | $[X]M | [X]% |
| Customers | [X] | [X] | [X]% |
| [Key Metric] | [X] | [X] | [X]% |

### Unit Economics
| Metric | Value | Benchmark |
|--------|-------|-----------|
| CAC | $[X] | |
| LTV | $[X] | |
| LTV/CAC | [X]x | >3x good |
| Payback | [X] months | |
| Gross Margin | [X]% | |

---

## 6. FINANCIALS

### Historical Performance
| ($M) | Year -2 | Year -1 | Current | Y+1 Proj |
|------|---------|---------|---------|----------|
| Revenue | | | | |
| Gross Profit | | | | |
| EBITDA | | | | |
| Net Income | | | | |
| Cash | | | | |
| Burn Rate | | | | |

### Cash Position & Runway
- Current cash: $[X]M
- Monthly burn: $[X]M
- Runway: [X] months

---

## 7. INVESTMENT TERMS

### Deal Structure
| Term | Details |
|------|---------|
| Security | [Preferred / Common / Convertible] |
| Valuation | $[X]M pre / $[X]M post |
| Round Size | $[X]M |
| Our Investment | $[X]M |
| Ownership | [X]% |
| Board Seat | [Yes/No] |

### Key Terms
- Liquidation Preference: [X]x [participating/non-participating]
- Anti-dilution: [Broad-based weighted average]
- Pro-rata Rights: [Yes/No]
- [Other key terms]

### Cap Table (Pro-forma)
| Shareholder | Pre-round % | Post-round % |
|-------------|-------------|--------------|
| Founders | | |
| Existing Investors | | |
| Option Pool | | |
| This Round | | |

### Use of Funds
| Category | Amount | % |
|----------|--------|---|
| [Use 1] | $[X]M | |
| [Use 2] | $[X]M | |
| [Use 3] | $[X]M | |

---

## 8. RETURNS ANALYSIS

### Investment Scenarios
| Scenario | Exit Value | Multiple | IRR | Probability |
|----------|-----------|----------|-----|-------------|
| Base | $[X]M | [X]x | [X]% | [X]% |
| Bull | $[X]M | [X]x | [X]% | [X]% |
| Bear | $[X]M | [X]x | [X]% | [X]% |

### Exit Considerations
- Potential acquirers: [List]
- IPO potential: [Assessment]
- Timeline: [X-Y years]

---

## 9. RISK ANALYSIS

### Key Risks and Mitigants
| Risk | Likelihood | Impact | Mitigant |
|------|------------|--------|----------|
| [Risk 1] | H/M/L | H/M/L | |
| [Risk 2] | H/M/L | H/M/L | |
| [Risk 3] | H/M/L | H/M/L | |

### Deal-Specific Risks
- [Risk specific to this transaction]

---

## 10. RECOMMENDATION

### Investment Decision
**[INVEST / PASS / CONDITIONAL]**

### Rationale
[3-4 sentences summarizing why this is or isn't a good investment]

### Proposed Terms
- Investment amount: $[X]M
- Target ownership: [X]%
- Board seat: [Yes/No]
- Key conditions: [If any]

### Post-Investment Value Add
1. [How we can help the company]
2. [Strategic introductions]
3. [Operational support]

### Next Steps
1. [Action item 1]
2. [Action item 2]
3. [Action item 3]

---

## APPENDICES

### A. Detailed Financial Model
### B. Customer References
### C. Technical Due Diligence
### D. Legal/IP Review
### E. Background Checks

---

*Prepared by [Fund Name] Investment Team*
*This memorandum is confidential and for internal use only*
```

---

## Tips for Better Results

1. **Provide all available data** for more complete analysis
2. **Specify your fund's criteria** (stage, check size, sectors)
3. **Include any concerns** you want addressed
4. **Mention comparable deals** for benchmarking
5. **Indicate urgency** if timeline matters

---

## Limitations

- Cannot conduct primary diligence
- Analysis based on provided information only
- Does not replace IC discussion and judgment
- May not reflect latest market data
- Not investment advice

---

*Built by the Claude Office Skills community. Contributions welcome!*
