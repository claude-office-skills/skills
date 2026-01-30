---
name: saas-metrics
description: "SaaS business metrics analysis - MRR, ARR, Churn, LTV, CAC, cohort analysis, and investor reporting"
version: "1.0.0"
author: claude-office-skills
license: MIT

category: finance
tags:
  - saas
  - metrics
  - analytics
  - mrr
  - churn
  - ltv
department: Finance

models:
  recommended:
    - claude-sonnet-4
    - claude-opus-4
  compatible:
    - gpt-4
    - gpt-4o

mcp:
  server: analytics-mcp
  tools:
    - stripe_metrics
    - chargebee_data
    - mixpanel_cohorts
    - spreadsheet_analysis

capabilities:
  - mrr_calculation
  - churn_analysis
  - cohort_tracking
  - ltv_calculation
  - investor_reporting

languages:
  - en
  - zh

related_skills:
  - financial-modeling
  - data-analysis
  - dcf-valuation
  - chart-designer
---

# SaaS Metrics

Comprehensive SaaS metrics analysis covering MRR, ARR, Churn, LTV, CAC, cohort analysis, and investor reporting. Essential for SaaS founders, finance teams, and investors.

## Overview

This skill enables:
- Revenue metrics calculation (MRR, ARR, NRR)
- Churn and retention analysis
- Unit economics (LTV, CAC, LTV:CAC)
- Cohort analysis and forecasting
- Investor-ready reporting

---

## Core Metrics Framework

### 1. Revenue Metrics

```
┌─────────────────────────────────────────────────────────────┐
│                    MRR WATERFALL                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Starting MRR                          $100,000             │
│  + New MRR (new customers)              +$15,000            │
│  + Expansion MRR (upgrades)             +$8,000             │
│  + Reactivation MRR                     +$2,000             │
│  - Contraction MRR (downgrades)         -$3,000             │
│  - Churn MRR (cancellations)            -$7,000             │
│  ─────────────────────────────────────────────              │
│  = Ending MRR                          $115,000             │
│                                                             │
│  Net New MRR = $15,000                                      │
│  MRR Growth Rate = 15%                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Calculations**:
```yaml
mrr_metrics:
  # Monthly Recurring Revenue
  MRR: sum(all_active_subscriptions.monthly_value)
  
  # Annual Recurring Revenue
  ARR: MRR × 12
  
  # MRR Components
  new_mrr: sum(new_subscriptions_this_month)
  expansion_mrr: sum(upgrades_this_month)
  contraction_mrr: sum(downgrades_this_month)
  churn_mrr: sum(cancelled_subscriptions_mrr)
  reactivation_mrr: sum(reactivated_subscriptions)
  
  # Net New MRR
  net_new_mrr: new_mrr + expansion_mrr + reactivation_mrr - contraction_mrr - churn_mrr
  
  # Growth Rates
  mrr_growth_rate: (ending_mrr - starting_mrr) / starting_mrr × 100
  mom_growth: (current_mrr - previous_mrr) / previous_mrr × 100
```

---

### 2. Churn Metrics

```yaml
churn_metrics:
  # Logo Churn (Customer Count)
  logo_churn_rate: 
    formula: customers_lost / customers_start_of_period × 100
    benchmark: <5% monthly for SMB, <2% for Enterprise
  
  # Revenue Churn (MRR)
  gross_revenue_churn:
    formula: churned_mrr / starting_mrr × 100
    benchmark: <3% monthly
  
  # Net Revenue Churn (includes expansion)
  net_revenue_churn:
    formula: (churned_mrr - expansion_mrr) / starting_mrr × 100
    target: negative (net expansion)
  
  # Net Revenue Retention (NRR)
  nrr:
    formula: (starting_mrr - churn + expansion) / starting_mrr × 100
    benchmark:
      good: 100-110%
      great: 110-120%
      best_in_class: >120%
```

**Churn Analysis Template**:
```markdown
## Churn Analysis - {Month}

### Summary
| Metric | Value | Benchmark | Status |
|--------|-------|-----------|--------|
| Logo Churn | 3.2% | <5% | ✅ |
| Gross Revenue Churn | 2.8% | <3% | ✅ |
| Net Revenue Retention | 108% | >100% | ✅ |

### Churn Breakdown
| Reason | Customers | MRR Lost | % of Total |
|--------|-----------|----------|------------|
| Price | 5 | $2,500 | 35% |
| Competitor | 3 | $1,800 | 25% |
| No longer needed | 4 | $1,500 | 21% |
| Product issues | 2 | $800 | 11% |
| Other | 2 | $600 | 8% |

### Cohort Performance
- Q1 2025 cohort: 95% retention at month 6
- Q4 2024 cohort: 88% retention at month 9
- Enterprise segment: 97% retention (best)
```

---

### 3. Unit Economics

```
┌─────────────────────────────────────────────────────────────┐
│                   UNIT ECONOMICS                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Customer Lifetime Value (LTV)                              │
│  ────────────────────────────                               │
│  ARPU × Gross Margin %                                      │
│  ─────────────────────── = LTV                              │
│     Churn Rate                                              │
│                                                             │
│  Example:                                                   │
│  $100 ARPU × 80% margin / 3% churn = $2,667 LTV             │
│                                                             │
│  ═══════════════════════════════════════════════════════    │
│                                                             │
│  Customer Acquisition Cost (CAC)                            │
│  ────────────────────────────────                           │
│  Sales & Marketing Spend                                    │
│  ─────────────────────────── = CAC                          │
│    New Customers Acquired                                   │
│                                                             │
│  Example:                                                   │
│  $50,000 S&M / 50 customers = $1,000 CAC                    │
│                                                             │
│  ═══════════════════════════════════════════════════════    │
│                                                             │
│  LTV:CAC Ratio = $2,667 / $1,000 = 2.67x                   │
│  CAC Payback = $1,000 / ($100 × 80%) = 12.5 months         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Benchmarks**:
```yaml
unit_economics_benchmarks:
  ltv_cac_ratio:
    poor: <1x
    acceptable: 1-2x
    good: 2-3x
    great: 3-5x
    excellent: >5x
  
  cac_payback_months:
    enterprise: <18
    mid_market: <12
    smb: <6
    consumer: <3
  
  gross_margin:
    saas_typical: 70-85%
    infrastructure: 50-70%
    services_heavy: 40-60%
```

---

### 4. Cohort Analysis

```yaml
cohort_analysis:
  # Define cohorts by signup month
  cohort_definition: signup_month
  
  # Track retention over time
  retention_matrix:
    columns: [Month_0, Month_1, Month_2, ..., Month_12]
    rows: [Jan_cohort, Feb_cohort, Mar_cohort, ...]
    values: active_customers / initial_customers × 100

  # Track revenue retention
  revenue_cohort:
    values: current_mrr / initial_mrr × 100
    
  # Cohort LTV calculation
  cohort_ltv:
    formula: sum(all_revenue_from_cohort) / initial_cohort_size
```

**Cohort Table Example**:
```
Retention by Cohort (% of customers still active)

         Month 0  Month 1  Month 2  Month 3  Month 6  Month 12
Jan '25   100%     92%      87%      84%      78%      65%
Feb '25   100%     94%      89%      86%      80%       -
Mar '25   100%     93%      88%      85%       -        -
Apr '25   100%     95%      90%       -        -        -
May '25   100%     94%       -        -        -        -
Jun '25   100%      -        -        -        -        -

Average   100%     94%      89%      85%      79%      65%
```

---

## Quick Ratio

```yaml
quick_ratio:
  formula: (new_mrr + expansion_mrr) / (contraction_mrr + churn_mrr)
  
  interpretation:
    "<1": Shrinking (losing more than gaining)
    "1-2": Sustainable growth
    "2-4": Good growth efficiency
    ">4": Excellent (hypergrowth potential)
  
  example:
    new_mrr: 15000
    expansion_mrr: 8000
    contraction_mrr: 3000
    churn_mrr: 7000
    quick_ratio: (15000 + 8000) / (3000 + 7000) = 2.3
```

---

## Investor Reporting Template

### Monthly Metrics Dashboard

```markdown
# {Company} - Monthly Metrics Report
## {Month Year}

### Key Metrics Summary
| Metric | Current | Previous | Change | Benchmark |
|--------|---------|----------|--------|-----------|
| ARR | $1.38M | $1.20M | +15% | - |
| MRR | $115K | $100K | +15% | - |
| Net New MRR | $15K | $12K | +25% | - |
| NRR | 108% | 105% | +3pp | >100% ✅ |
| Logo Churn | 3.2% | 3.5% | -0.3pp | <5% ✅ |
| LTV:CAC | 2.7x | 2.5x | +0.2x | >3x ⚠️ |
| CAC Payback | 12.5mo | 13mo | -0.5mo | <12mo ⚠️ |

### MRR Waterfall
```
Starting MRR:    $100,000
+ New:           +$15,000  (12 customers)
+ Expansion:      +$8,000  (25 upgrades)
+ Reactivation:   +$2,000  (5 returns)
- Contraction:    -$3,000  (15 downgrades)
- Churn:          -$7,000  (18 cancellations)
═════════════════════════════
Ending MRR:      $115,000
```

### Customer Metrics
| Segment | Customers | MRR | ARPU | Churn |
|---------|-----------|-----|------|-------|
| Enterprise | 45 | $45K | $1,000 | 1.5% |
| Mid-Market | 120 | $36K | $300 | 2.8% |
| SMB | 350 | $34K | $97 | 4.5% |
| **Total** | **515** | **$115K** | **$223** | **3.2%** |

### Runway & Burn
- Cash Balance: $2.5M
- Monthly Burn: $85K
- Runway: 29 months
- Revenue/Burn Ratio: 1.35x

### Goals vs Actuals
| Goal | Target | Actual | Status |
|------|--------|--------|--------|
| New Customers | 15 | 12 | 🔴 80% |
| Net New MRR | $12K | $15K | 🟢 125% |
| NRR | 105% | 108% | 🟢 103% |
| CAC Payback | 12mo | 12.5mo | 🟡 96% |

### Next Month Outlook
- Pipeline: $45K in qualified opportunities
- Expected closes: 8-10 customers
- Projected MRR: $125-130K
- Key risks: Enterprise deal slip, holiday slowdown
```

---

## Forecasting Model

### Bottom-Up Revenue Forecast

```yaml
forecast_model:
  # Starting point
  base_mrr: 115000
  
  # Growth assumptions
  assumptions:
    new_customers_monthly: 15
    avg_new_customer_mrr: 1250
    expansion_rate: 2%  # of existing MRR
    contraction_rate: 0.5%
    logo_churn_rate: 3%
  
  # Monthly calculation
  monthly_forecast:
    new_mrr: new_customers × avg_mrr
    expansion_mrr: existing_mrr × expansion_rate
    contraction_mrr: existing_mrr × contraction_rate
    churn_mrr: existing_mrr × churn_rate
    
    ending_mrr: |
      starting_mrr 
      + new_mrr 
      + expansion_mrr 
      - contraction_mrr 
      - churn_mrr
```

### 12-Month Projection

```
Month   Starting   New      Expansion  Churn    Ending    Growth
Jan     $115,000   $18,750  $2,300     $3,450   $132,600  15.3%
Feb     $132,600   $18,750  $2,652     $3,978   $150,024  13.1%
Mar     $150,024   $18,750  $3,000     $4,501   $167,274  11.5%
...
Dec     $285,000   $18,750  $5,700     $8,550   $300,900  5.6%

Annual Summary:
- Starting ARR: $1.38M
- Ending ARR: $3.61M
- Growth: 162%
```

---

## Segmentation Analysis

```yaml
segment_analysis:
  by_plan:
    - name: Starter
      mrr: 20000
      customers: 300
      arpu: 67
      churn: 6%
      
    - name: Professional
      mrr: 45000
      customers: 150
      arpu: 300
      churn: 3%
      
    - name: Enterprise
      mrr: 50000
      customers: 50
      arpu: 1000
      churn: 1.5%
  
  by_industry:
    - tech: {mrr: 60000, churn: 2.5%}
    - finance: {mrr: 30000, churn: 2%}
    - retail: {mrr: 25000, churn: 5%}
  
  by_company_size:
    - 1-50: {arpu: 100, churn: 5%}
    - 51-200: {arpu: 350, churn: 3%}
    - 201+: {arpu: 1200, churn: 1.5%}
```

---

## Output Example

**Request**: "Calculate SaaS metrics for my company"

**Output**:
```markdown
# SaaS Metrics Analysis

## Executive Summary
Your SaaS business is showing healthy growth with some areas for optimization.

### Strengths ✅
- Net Revenue Retention of 108% (above 100% benchmark)
- Quick Ratio of 2.3x (good growth efficiency)
- Enterprise segment showing 97% retention

### Areas to Improve ⚠️
- LTV:CAC ratio at 2.7x (target: >3x)
- CAC payback at 12.5 months (target: <12 months)
- SMB segment churn at 4.5% (target: <4%)

### Recommendations
1. **Reduce CAC**: Focus on lower-cost acquisition channels
2. **Improve SMB retention**: Add onboarding sequences
3. **Expand enterprise**: Higher ARPU, lower churn
4. **Increase expansion revenue**: Upsell/cross-sell programs

### Key Metrics at a Glance
| Metric | Value | Status |
|--------|-------|--------|
| ARR | $1.38M | 📈 +15% MoM |
| NRR | 108% | ✅ Healthy |
| LTV:CAC | 2.7x | ⚠️ Improve |
| Runway | 29 months | ✅ Safe |
```

---

*SaaS Metrics Skill - Part of Claude Office Skills*
