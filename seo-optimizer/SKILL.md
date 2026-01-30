---
name: seo-optimizer
description: "SEO strategy and optimization - keyword research, on-page SEO, technical audits, content optimization, and rank tracking"
version: "1.0.0"
author: claude-office-skills
license: MIT

category: marketing
tags:
  - seo
  - keywords
  - content-optimization
  - search
  - organic-traffic
department: Marketing

models:
  recommended:
    - claude-sonnet-4
    - claude-opus-4

capabilities:
  - keyword_research
  - on_page_optimization
  - technical_audit
  - content_strategy
  - rank_tracking

languages:
  - en
  - zh

related_skills:
  - content-writer
  - deep-research
  - google-ads-manager
---

# SEO Optimizer

Comprehensive SEO strategy and optimization covering keyword research, on-page SEO, technical audits, content optimization, and performance tracking.

## Overview

This skill covers:
- Keyword research and strategy
- On-page SEO optimization
- Technical SEO audits
- Content optimization
- Rank tracking and reporting

---

## Keyword Research Framework

### Research Process

```yaml
keyword_research:
  step_1_seed_keywords:
    sources:
      - brainstorm: core_product_terms
      - competitors: top_3_competitor_keywords
      - customer_language: support_tickets, reviews
      - related_searches: google_suggestions
      
  step_2_expand:
    tools:
      - google_keyword_planner
      - ahrefs/semrush
      - answerthepublic
      - google_trends
    
  step_3_categorize:
    by_intent:
      informational: "how to", "what is", "guide"
      navigational: brand terms
      commercial: "best", "vs", "review"
      transactional: "buy", "pricing", "demo"
      
  step_4_prioritize:
    scoring:
      search_volume: 1-5 (higher = better)
      keyword_difficulty: 1-5 (lower = better)
      business_relevance: 1-5 (higher = better)
      priority_score: (volume × relevance) / difficulty
```

### Keyword Mapping Template

```yaml
keyword_mapping:
  homepage:
    primary: "[main product category]"
    secondary: "[brand] + [category]"
    
  product_pages:
    primary: "[specific product name]"
    secondary: "[product] features/pricing"
    
  blog_posts:
    primary: long_tail_informational
    secondary: related_questions
    
  landing_pages:
    primary: high_intent_commercial
    secondary: comparison_terms
```

---

## On-Page SEO Checklist

### Content Elements

```yaml
on_page_checklist:
  title_tag:
    format: "Primary Keyword | Secondary Keyword | Brand"
    length: 50-60 characters
    requirements:
      - keyword_at_start: true
      - unique_per_page: true
      - compelling_for_clicks: true
      
  meta_description:
    length: 150-160 characters
    requirements:
      - include_keyword: true
      - include_cta: true
      - unique_per_page: true
      
  h1_tag:
    count: 1 per page
    requirements:
      - include_primary_keyword: true
      - different_from_title: slightly
      
  heading_structure:
    h2: main_sections (2-6)
    h3: subsections
    h4: details (if needed)
    keywords: naturally_in_headings
    
  content:
    word_count:
      product_page: 500-1000
      blog_post: 1500-2500
      pillar_page: 3000+
    keyword_usage:
      density: 1-2%
      in_first_100_words: true
      in_last_100_words: true
      lsi_keywords: include_related_terms
      
  images:
    alt_text: descriptive + keyword
    file_name: keyword-descriptive-name.jpg
    compression: optimized_for_web
    
  internal_links:
    count: 3-5 per page
    anchor_text: keyword_rich
    structure: topic_clusters
    
  external_links:
    count: 2-3 to authority sites
    rel: nofollow (if needed)
```

### URL Structure

```yaml
url_best_practices:
  format: domain.com/category/keyword-slug
  
  rules:
    - lowercase: always
    - hyphens: between_words
    - length: under_75_chars
    - keywords: include_primary
    - no_dates: unless_news
    - no_parameters: when_possible
    
  examples:
    good: "/blog/seo-optimization-guide"
    bad: "/blog/2024/01/15/the-ultimate-seo-guide-for-beginners-in-2024/"
```

---

## Technical SEO Audit

### Audit Checklist

```yaml
technical_seo_audit:
  crawlability:
    - robots_txt: properly_configured
    - sitemap_xml: submitted_to_gsc
    - crawl_errors: none
    - blocked_resources: check
    
  indexability:
    - canonical_tags: correct
    - noindex_pages: intentional_only
    - duplicate_content: resolved
    - thin_content: improved_or_noindexed
    
  site_speed:
    metrics:
      - lcp: <2.5s (largest contentful paint)
      - fid: <100ms (first input delay)
      - cls: <0.1 (cumulative layout shift)
    tools:
      - google_pagespeed_insights
      - gtmetrix
      - webpagetest
    common_fixes:
      - image_optimization
      - lazy_loading
      - minify_css_js
      - browser_caching
      - cdn_implementation
      
  mobile_friendliness:
    - responsive_design: true
    - tap_targets: adequate_size
    - font_size: readable
    - viewport_configured: true
    
  https:
    - ssl_certificate: valid
    - mixed_content: none
    - http_redirects: to_https
    
  structured_data:
    types:
      - organization
      - product
      - article
      - faq
      - breadcrumb
    validation: google_rich_results_test
```

### Core Web Vitals Optimization

```yaml
core_web_vitals:
  lcp_optimization:
    - preload_hero_image
    - optimize_server_response_time
    - remove_render_blocking_resources
    - use_cdn
    
  fid_optimization:
    - minimize_javascript
    - defer_non_critical_js
    - use_web_workers
    - break_up_long_tasks
    
  cls_optimization:
    - set_image_dimensions
    - reserve_space_for_ads
    - avoid_inserting_content_above_existing
    - use_transform_animations
```

---

## Content Optimization

### Content Brief Template

```yaml
content_brief:
  title: "{SEO-Optimized Title}"
  
  target_keyword:
    primary: "[main keyword]"
    secondary: ["keyword 2", "keyword 3"]
    lsi: ["related term 1", "related term 2"]
    
  search_intent: informational|commercial|transactional
  
  target_word_count: 2000
  
  outline:
    - h2: Introduction
      notes: hook + preview
      
    - h2: What is [Topic]
      h3: Definition
      h3: Why it matters
      
    - h2: How to [Main Action]
      h3: Step 1
      h3: Step 2
      h3: Step 3
      
    - h2: Best Practices
      h3: Practice 1
      h3: Practice 2
      
    - h2: Common Mistakes
    
    - h2: FAQ
      questions: from_people_also_ask
      
    - h2: Conclusion
      include: cta
      
  competitors_to_beat:
    - url_1: word_count, gaps
    - url_2: word_count, gaps
    - url_3: word_count, gaps
    
  unique_angle: what_makes_ours_different
  
  internal_links:
    - "[anchor text](/related-page)"
    
  cta: what_action_should_reader_take
```

### Content Optimization Checklist

```yaml
content_optimization:
  before_publishing:
    - [ ] Primary keyword in title
    - [ ] Primary keyword in first 100 words
    - [ ] H2/H3 include keywords naturally
    - [ ] Alt text on all images
    - [ ] Internal links to related content
    - [ ] External links to authority sources
    - [ ] Meta description optimized
    - [ ] URL is clean and includes keyword
    - [ ] Content answers search intent
    - [ ] Longer/better than competitors
    
  after_publishing:
    - [ ] Submit to Google Search Console
    - [ ] Share on social media
    - [ ] Build internal links from other pages
    - [ ] Monitor rankings
    - [ ] Update based on performance
```

---

## Rank Tracking & Reporting

### Monthly SEO Report

```markdown
# SEO Performance Report - {Month}

## Organic Traffic Summary
| Metric | This Month | Last Month | YoY |
|--------|------------|------------|-----|
| Sessions | 50,000 | 45,000 | +25% |
| Users | 40,000 | 36,000 | +22% |
| Conversions | 500 | 420 | +19% |
| Conv Rate | 1.0% | 0.93% | +7% |

## Keyword Rankings
### Improved
| Keyword | Old Rank | New Rank | Change |
|---------|----------|----------|--------|
| "project management software" | 15 | 8 | +7 |
| "best pm tool" | 22 | 12 | +10 |

### Declined
| Keyword | Old Rank | New Rank | Change |
|---------|----------|----------|--------|
| "task tracking" | 5 | 9 | -4 |

### New Rankings
| Keyword | Rank | Volume |
|---------|------|--------|
| "agile project management" | 18 | 2,400 |

## Top Pages by Traffic
| Page | Sessions | Conv | CVR |
|------|----------|------|-----|
| /blog/pm-guide | 8,000 | 80 | 1.0% |
| /features | 6,000 | 120 | 2.0% |
| /pricing | 4,000 | 200 | 5.0% |

## Technical Health
- Crawl errors: 0 ✅
- Core Web Vitals: All passing ✅
- Mobile usability: 100% ✅
- Index coverage: 95% pages indexed

## Actions Taken
1. Published 4 new blog posts
2. Updated 3 existing posts
3. Fixed 5 broken links
4. Improved page speed on 10 pages

## Next Month Plan
1. Target 5 new keywords
2. Build 10 backlinks
3. Launch pillar content on [topic]
4. Technical fixes for [issues]
```

---

## Output Example

**Request**: "Optimize this blog post for SEO: 'How to Manage Remote Teams'"

**Output**:

```markdown
# SEO Optimization Recommendations

## Keyword Analysis
**Primary Keyword**: "how to manage remote teams"
- Search Volume: 2,400/mo
- Difficulty: 45/100
- Current Rank: Not ranking

**Secondary Keywords**:
- "remote team management" (1,900/mo)
- "managing remote employees" (1,300/mo)
- "remote team tips" (880/mo)

## Title Tag
**Current**: "How to Manage Remote Teams"
**Optimized**: "How to Manage Remote Teams: 15 Proven Strategies (2026 Guide)"

**Why**: Adds specificity (15 strategies), year for freshness, stays under 60 chars

## Meta Description
```
Learn how to manage remote teams effectively with 15 proven strategies. From communication tools to building culture, discover what top remote managers do differently.
```
(155 characters, includes keyword, has CTA)

## Content Recommendations

### Structure
```
H1: How to Manage Remote Teams: 15 Strategies That Actually Work

H2: Why Remote Team Management is Different
H3: The Unique Challenges
H3: The Hidden Opportunities

H2: 15 Proven Remote Team Management Strategies
H3: 1. Establish Clear Communication Channels
H3: 2. Set Expectations Early
... (continue for all 15)

H2: Tools for Remote Team Management
H3: Communication Tools
H3: Project Management Tools
H3: Time Tracking Tools

H2: Common Remote Management Mistakes to Avoid

H2: FAQ: Remote Team Management
- How do you build culture remotely?
- What's the best meeting frequency?
- How do you handle different time zones?

H2: Conclusion: Start Managing Your Remote Team Better Today
```

### Word Count
**Target**: 2,500-3,000 words
**Current top result**: 2,200 words

### Internal Links to Add
- /blog/remote-work-tools → "remote work tools"
- /blog/team-communication → "team communication"
- /features/collaboration → "collaboration features"

### Checklist
- [ ] Add keyword to first paragraph
- [ ] Include stats/data (e.g., "70% of workers...")
- [ ] Add custom images with alt text
- [ ] Include expert quotes
- [ ] Add schema markup (Article + FAQ)
```

---

*SEO Optimizer Skill - Part of Claude Office Skills*
