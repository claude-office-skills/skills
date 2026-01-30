---
# ═══════════════════════════════════════════════════════════════════════════════
# CLAUDE OFFICE SKILL - Academic Search
# ═══════════════════════════════════════════════════════════════════════════════

name: academic-search
description: "Search and analyze academic literature. Find papers, understand research methodologies, and synthesize academic findings for research projects."
version: "1.0.0"
author: claude-office-skills
license: MIT

category: research
tags:
  - academic
  - papers
  - research
  - literature-review
  - citations
department: Research/Academia

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
    - extract_text_from_pdf

capabilities:
  - literature_search
  - paper_analysis
  - methodology_assessment
  - citation_management
  - research_synthesis

languages:
  - en
  - zh

related_skills:
  - deep-research
  - web-search
  - content-writer
---

# Academic Search Skill

## Overview

I help you navigate academic literature, find relevant papers, understand research methodologies, and synthesize findings for your research projects or literature reviews.

**What I can do:**
- Formulate academic search queries
- Recommend databases and search strategies
- Analyze paper abstracts and summaries
- Explain research methodologies
- Help structure literature reviews
- Identify research gaps

**What I cannot do:**
- Access full-text papers (unless provided)
- Execute actual database searches
- Access paywalled journals
- Conduct original research

---

## How to Use Me

### Step 1: Define Your Research Topic

Tell me:
- Your research question or topic
- Academic field/discipline
- Scope (broad survey vs. specific topic)
- Purpose (literature review, thesis, curiosity)

### Step 2: Get Search Strategy

I'll provide:
- Optimized search queries
- Recommended databases
- Key terms and synonyms
- Search methodology

### Step 3: Analyze Findings

If you share papers/abstracts, I can:
- Summarize key findings
- Explain methodologies
- Identify themes and patterns
- Help organize citations

---

## Academic Databases

### General Databases

| Database | Coverage | Access |
|----------|----------|--------|
| Google Scholar | All fields | Free |
| Semantic Scholar | AI-enhanced search | Free |
| Microsoft Academic | Computer Science focus | Free |
| Web of Science | High-impact journals | Subscription |
| Scopus | Comprehensive | Subscription |
| JSTOR | Humanities, social sciences | Subscription |

### Field-Specific Databases

| Field | Database | Notes |
|-------|----------|-------|
| Medicine | PubMed, MEDLINE | Free, comprehensive |
| Computer Science | arXiv, DBLP, ACM DL | arXiv free |
| Physics | arXiv, APS Journals | arXiv free |
| Psychology | PsycINFO, PsycArticles | Subscription |
| Business | EBSCO, ProQuest | Subscription |
| Law | Westlaw, LexisNexis | Subscription |
| Engineering | IEEE Xplore, ScienceDirect | Subscription |

### Preprint Servers

| Server | Fields |
|--------|--------|
| arXiv | Physics, Math, CS, Biology |
| bioRxiv | Life Sciences |
| medRxiv | Medical Sciences |
| SSRN | Social Sciences |
| ChemRxiv | Chemistry |

---

## Search Query Formulation

### Boolean Operators

```
AND: Both terms must appear
     "machine learning" AND healthcare

OR:  Either term can appear
     "deep learning" OR "neural network"

NOT: Exclude term
     climate change NOT politics

():  Group terms
     (AI OR "artificial intelligence") AND ethics
```

### Advanced Techniques

#### 1. PICO Framework (Medical/Health)
```
P - Population/Patient
I - Intervention
C - Comparison
O - Outcome

Example: "elderly patients" AND "exercise therapy" AND "cognitive function"
```

#### 2. Concept Mapping
```
Main Concept: Machine Learning in Education
├── Synonyms: AI, artificial intelligence, deep learning
├── Related: adaptive learning, intelligent tutoring
└── Applications: personalization, assessment, analytics

Query: ("machine learning" OR "artificial intelligence" OR "deep learning") 
       AND (education OR learning OR "tutoring system")
```

#### 3. Citation Chaining
```
Forward citation: Who cited this paper?
Backward citation: What did this paper cite?
→ Both methods help find related work
```

### Search Filters

| Filter | Use Case |
|--------|----------|
| Date range | Recent developments |
| Publication type | Review vs. empirical |
| Author | Expert's work |
| Journal | High-impact venues |
| Language | Specific language papers |

---

## Paper Analysis Framework

### Reading Strategy: Three-Pass Method

#### Pass 1: Survey (5-10 min)
- Read title, abstract, introduction
- Scan headings and figures
- Read conclusion
- **Outcome**: Decide if worth reading more

#### Pass 2: Understanding (30-60 min)
- Read carefully but skip proofs/details
- Note key points and questions
- Understand figures and tables
- **Outcome**: Grasp main contributions

#### Pass 3: Deep Dive (hours)
- Virtually re-implement the work
- Challenge every assumption
- Identify strengths and weaknesses
- **Outcome**: Expert-level understanding

### Critical Analysis Questions

| Aspect | Questions |
|--------|-----------|
| Research Question | Is it clear? Important? Novel? |
| Methodology | Appropriate? Rigorous? Reproducible? |
| Results | Convincing? Statistically valid? |
| Limitations | Acknowledged? How severe? |
| Contribution | What's new? How significant? |

---

## Output Format

### Search Strategy Output

```markdown
# Academic Search Strategy: [Topic]

**Research Question**: [Your question]
**Field**: [Discipline]
**Date**: [Date]

---

## Search Queries

### Primary Query
```
[Optimized query with Boolean operators]
```

### Alternative Queries
1. `[Broader query]`
2. `[Narrower query]`
3. `[Related angle]`

---

## Recommended Databases

| Priority | Database | Rationale |
|----------|----------|-----------|
| 1 | [Database] | [Why] |
| 2 | [Database] | [Why] |
| 3 | [Database] | [Why] |

---

## Key Terms & Synonyms

| Concept | Terms to Search |
|---------|-----------------|
| [Concept 1] | term1, term2, term3 |
| [Concept 2] | term1, term2, term3 |

---

## Search Methodology

1. Start with [database] using [query]
2. Apply filters: [filters]
3. Review first [X] results by relevance
4. Use citation chaining on key papers
5. Search [database 2] for [specific aspect]

---

## Expected Paper Types

- Foundational/Classic papers
- Recent developments (last 2-3 years)
- Review/Survey articles
- Empirical studies
- Methodology papers

---

## Quality Indicators to Look For

- [ ] Peer-reviewed venue
- [ ] Citation count appropriate for age
- [ ] Reputable authors/institutions
- [ ] Clear methodology
- [ ] Reproducible results
```

### Literature Review Output

```markdown
# Literature Review: [Topic]

**Scope**: [What's covered]
**Papers Analyzed**: [Number]
**Date**: [Date]

---

## Overview

[Summary of the research landscape]

---

## Themes

### Theme 1: [Name]
[Summary of papers in this theme]

**Key Papers**:
- [Author] ([Year]): [Key finding]
- [Author] ([Year]): [Key finding]

### Theme 2: [Name]
[Summary of papers in this theme]

---

## Methodological Approaches

| Approach | Papers Using It | Pros | Cons |
|----------|-----------------|------|------|
| [Method 1] | [X] | | |
| [Method 2] | [X] | | |

---

## Key Findings

1. [Finding 1] - supported by [papers]
2. [Finding 2] - supported by [papers]
3. [Finding 3] - supported by [papers]

---

## Research Gaps

1. [Gap 1]: [Why it matters]
2. [Gap 2]: [Why it matters]

---

## Recommendations for Future Research

1. [Direction 1]
2. [Direction 2]

---

## References

[Formatted citations]
```

---

## Citation Formats

### APA 7th Edition
```
Author, A. A., & Author, B. B. (Year). Title of article. 
Journal Name, Volume(Issue), Page–Page. https://doi.org/xxxxx
```

### IEEE
```
[1] A. Author and B. Author, "Title of article," Journal Name, 
vol. X, no. X, pp. XX–XX, Month Year.
```

### Chicago
```
Author Last, First. "Title of Article." Journal Name Volume, 
no. Issue (Year): Page–Page.
```

---

## Tips for Better Results

1. **Start with review articles** to understand the landscape
2. **Use citation chaining** - both forward and backward
3. **Check author profiles** for related work
4. **Set up alerts** for new papers on your topic
5. **Use reference managers** (Zotero, Mendeley)
6. **Read abstracts first** to filter efficiently
7. **Focus on recent + seminal** papers

---

## Limitations

- Cannot access full-text papers directly
- Cannot execute database searches
- Knowledge has training cutoff
- Cannot assess very recent publications
- Cannot verify citation counts in real-time

---

*Built by the Claude Office Skills community. Contributions welcome!*
