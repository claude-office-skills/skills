---
# ═══════════════════════════════════════════════════════════════════════════════
# CLAUDE OFFICE SKILL - Deep Research
# ═══════════════════════════════════════════════════════════════════════════════

name: deep-research
description: "Conduct comprehensive research on any topic. Synthesize information from multiple angles, provide structured analysis, and generate detailed research reports."
version: "1.0.0"
author: claude-office-skills
license: MIT

category: research
tags:
  - research
  - analysis
  - synthesis
  - report
  - investigation
department: Research/Strategy

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
    - create_xlsx

capabilities:
  - topic_research
  - information_synthesis
  - multi_perspective_analysis
  - report_generation
  - source_compilation

languages:
  - en
  - zh

related_skills:
  - web-search
  - academic-search
  - company-research
  - competitive-analysis
---

# Deep Research Skill

## Overview

I help you conduct comprehensive, multi-faceted research on any topic. I analyze information from multiple perspectives, synthesize findings, and deliver structured research reports suitable for decision-making.

**What I can do:**
- Systematic topic exploration
- Multi-angle analysis (pros/cons, different viewpoints)
- Information synthesis and structuring
- Key insight extraction
- Comprehensive report generation
- Source organization and citation

**What I cannot do:**
- Access real-time internet (unless tools provided)
- Conduct primary research (surveys, interviews)
- Access paywalled or proprietary databases
- Guarantee 100% accuracy of synthesized information

---

## How to Use Me

### Step 1: Define Research Question

Provide:
- Main research question or topic
- Specific sub-questions (if any)
- Context and purpose of research
- Any constraints or focus areas

### Step 2: Set Research Parameters

- **Scope**: Broad overview vs. narrow deep-dive
- **Perspectives**: Technical, business, social, legal, etc.
- **Time frame**: Historical, current, future-focused
- **Depth**: Surface-level vs. comprehensive

### Step 3: Specify Output Format

- **Executive Brief**: 1-2 page summary
- **Standard Report**: 5-10 page comprehensive report
- **Deep Dive**: 15+ page detailed analysis
- **Presentation**: Slide-ready bullet points

---

## Research Methodology

### Phase 1: Scoping
```
1. Understand the research question
2. Identify key concepts and terms
3. Define boundaries and constraints
4. Establish success criteria
```

### Phase 2: Information Gathering
```
1. Explore primary aspects of the topic
2. Identify relevant subtopics
3. Collect diverse perspectives
4. Note key facts, data, and quotes
```

### Phase 3: Analysis
```
1. Organize information by theme
2. Identify patterns and trends
3. Compare different viewpoints
4. Assess reliability and bias
```

### Phase 4: Synthesis
```
1. Develop key insights
2. Draw conclusions
3. Identify gaps and limitations
4. Formulate recommendations
```

### Phase 5: Reporting
```
1. Structure findings logically
2. Present balanced perspectives
3. Cite sources appropriately
4. Provide actionable takeaways
```

---

## Research Frameworks

### PESTEL Analysis (for market/industry topics)
| Factor | Questions to Explore |
|--------|---------------------|
| Political | Regulations, government policy, political stability |
| Economic | Growth, inflation, employment, currency |
| Social | Demographics, culture, consumer behavior |
| Technological | Innovation, automation, R&D |
| Environmental | Sustainability, climate, resources |
| Legal | Laws, compliance, litigation |

### 5W1H Framework (for any topic)
- **What**: Definition, scope, components
- **Why**: Causes, motivations, rationale
- **Who**: Stakeholders, actors, affected parties
- **When**: Timeline, milestones, history
- **Where**: Geography, context, application
- **How**: Mechanisms, processes, methods

### Argument Mapping
```
Claim: [Main thesis or finding]
├── Supporting Evidence 1
│   └── Source & strength
├── Supporting Evidence 2
│   └── Source & strength
├── Counter-argument 1
│   └── Rebuttal
└── Counter-argument 2
    └── Rebuttal
```

---

## Output Format

```markdown
# Research Report: [Topic]

**Research Question**: [Main question being addressed]
**Date**: [Date]
**Prepared by**: AI Research Assistant

---

## Executive Summary

[3-5 sentence overview of key findings and conclusions]

**Key Findings**:
1. [Finding 1]
2. [Finding 2]
3. [Finding 3]

**Recommendation**: [Brief actionable recommendation]

---

## Table of Contents

1. Introduction
2. Background
3. [Main Section 1]
4. [Main Section 2]
5. [Main Section 3]
6. Analysis & Discussion
7. Conclusions
8. Recommendations
9. Sources & Further Reading

---

## 1. Introduction

### Research Objective
[What this research aims to accomplish]

### Scope & Boundaries
[What is and isn't covered]

### Methodology
[How the research was conducted]

---

## 2. Background

### Context
[Relevant background information]

### Key Terms & Definitions
| Term | Definition |
|------|------------|
| [Term 1] | |
| [Term 2] | |

### Historical Overview
[Brief history if relevant]

---

## 3. [Main Section 1]

### Overview
[Introduction to this aspect]

### Key Points

#### [Subsection 1.1]
[Detailed analysis]

#### [Subsection 1.2]
[Detailed analysis]

### Summary
[Key takeaways from this section]

---

## 4. [Main Section 2]

[Similar structure...]

---

## 5. [Main Section 3]

[Similar structure...]

---

## 6. Analysis & Discussion

### Key Patterns & Trends
[Patterns identified across the research]

### Multiple Perspectives

#### Perspective A: [Viewpoint]
[Analysis of this viewpoint]

#### Perspective B: [Viewpoint]
[Analysis of this viewpoint]

### Strengths & Weaknesses
| Strengths | Weaknesses |
|-----------|------------|
| | |

### Gaps & Limitations
[What the research couldn't fully address]

---

## 7. Conclusions

### Main Findings
1. [Conclusion 1]
2. [Conclusion 2]
3. [Conclusion 3]

### Implications
[What these findings mean for the reader]

---

## 8. Recommendations

### Immediate Actions
1. [Action 1]
2. [Action 2]

### Further Research Needed
1. [Area 1]
2. [Area 2]

---

## 9. Sources & Further Reading

### Primary Sources
1. [Source 1]
2. [Source 2]

### Additional Resources
1. [Resource 1]
2. [Resource 2]

---

## Appendices

### Appendix A: [Supporting Data]
### Appendix B: [Detailed Analysis]

---

*Research conducted using AI-assisted analysis. Findings should be verified with primary sources for critical decisions.*
```

---

## Example Research Topics

1. **Technology**: "What are the implications of quantum computing for cybersecurity?"
2. **Business**: "How are companies successfully implementing AI in customer service?"
3. **Policy**: "What are the pros and cons of universal basic income?"
4. **Science**: "What is the current state of CRISPR gene editing technology?"
5. **Market**: "What factors are driving the growth of electric vehicles?"

---

## Tips for Better Results

1. **Be specific** about your research question
2. **Provide context** about why you need this research
3. **Specify perspectives** you want explored
4. **Indicate depth** required (overview vs deep dive)
5. **Ask for sources** if you need to verify information
6. **Request multiple viewpoints** for balanced analysis

---

## Limitations

- Cannot access real-time web data
- Cannot access paywalled content
- Knowledge has a training cutoff date
- Cannot conduct primary research
- May have biases in synthesized information
- Cannot guarantee accuracy of all facts

---

*Built by the Claude Office Skills community. Contributions welcome!*
