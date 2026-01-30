---
# ═══════════════════════════════════════════════════════════════════════════════
# CLAUDE OFFICE SKILL - DCF Valuation
# ═══════════════════════════════════════════════════════════════════════════════

name: dcf-valuation
description: "Build Discounted Cash Flow (DCF) valuation models. Calculate intrinsic value with customizable assumptions. Generate professional valuation reports."
version: "1.0.0"
author: claude-office-skills
license: MIT

category: finance
tags:
  - dcf
  - valuation
  - financial-modeling
  - intrinsic-value
  - investment
department: Finance/Investment Banking

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
    - read_xlsx
    - create_xlsx
    - apply_formula
    - create_chart

capabilities:
  - dcf_modeling
  - wacc_calculation
  - sensitivity_analysis
  - terminal_value_estimation
  - intrinsic_value_calculation

languages:
  - en
  - zh

related_skills:
  - stock-analysis
  - financial-modeling
  - company-research
---

# DCF Valuation Skill

## Overview

I help you build Discounted Cash Flow (DCF) models to estimate the intrinsic value of companies. DCF is the gold standard for fundamental valuation used by investment banks, hedge funds, and professional investors.

**What I can do:**
- Build complete DCF models from financial data
- Calculate WACC (Weighted Average Cost of Capital)
- Project future free cash flows
- Estimate terminal value (Gordon Growth or Exit Multiple)
- Run sensitivity analysis on key assumptions
- Generate professional valuation summaries

**What I cannot do:**
- Guarantee accuracy of projections
- Account for unpredictable future events
- Provide investment recommendations
- Replace professional financial due diligence

---

## How to Use Me

### Step 1: Provide Financial Data

I need:
- Historical financials (3-5 years of revenue, EBITDA, capex, D&A)
- Current shares outstanding
- Current stock price (optional, for comparison)
- Industry/sector context

### Step 2: Set Assumptions

Key assumptions to specify (or I'll use industry defaults):
- Revenue growth rates (Year 1-5)
- EBITDA margin trajectory
- Capex as % of revenue
- Working capital changes
- Terminal growth rate
- Discount rate (WACC)

### Step 3: Choose Model Type

- **Standard DCF**: 5-year projection + terminal value
- **Two-Stage DCF**: High growth + stable growth phases
- **Three-Stage DCF**: Growth, transition, maturity phases

---

## DCF Model Framework

### Step 1: Project Free Cash Flow (FCF)

```
Unlevered Free Cash Flow (UFCF) =
    EBIT × (1 - Tax Rate)
  + Depreciation & Amortization
  - Capital Expenditures
  - Change in Net Working Capital
```

### Step 2: Calculate WACC

```
WACC = (E/V × Re) + (D/V × Rd × (1 - Tc))

Where:
E = Market value of equity
D = Market value of debt
V = E + D (total value)
Re = Cost of equity (CAPM: Rf + β × Market Risk Premium)
Rd = Cost of debt
Tc = Corporate tax rate
```

#### CAPM Formula for Cost of Equity
```
Re = Rf + β × (Rm - Rf)

Where:
Rf = Risk-free rate (10-year Treasury)
β = Stock beta (systematic risk)
Rm - Rf = Equity risk premium (typically 5-6%)
```

### Step 3: Calculate Terminal Value

#### Method A: Gordon Growth Model
```
Terminal Value = FCF(n+1) / (WACC - g)

Where:
FCF(n+1) = Final year FCF × (1 + g)
g = Terminal growth rate (typically 2-3%, ≤ GDP growth)
```

#### Method B: Exit Multiple
```
Terminal Value = EBITDA(n) × Exit Multiple

Common multiples by sector:
- Technology: 10-15x
- Healthcare: 8-12x
- Consumer: 6-10x
- Industrial: 5-8x
```

### Step 4: Discount to Present Value

```
Enterprise Value = Σ [FCF(t) / (1 + WACC)^t] + [TV / (1 + WACC)^n]

Equity Value = Enterprise Value - Net Debt + Cash

Intrinsic Value per Share = Equity Value / Shares Outstanding
```

---

## Output Format

```markdown
# DCF Valuation Model: [Company Name]

**Valuation Date**: [Date]
**Analyst**: AI-Generated
**Model Type**: [Standard/Two-Stage/Three-Stage]

---

## Executive Summary

| Metric | Value |
|--------|-------|
| **Intrinsic Value per Share** | $XX.XX |
| **Current Market Price** | $XX.XX |
| **Upside/Downside** | +/-XX% |
| **Implied Recommendation** | [Undervalued/Fair/Overvalued] |

---

## Key Assumptions

### Revenue Projections
| Year | Revenue ($M) | Growth % |
|------|-------------|----------|
| Base (Current) | X,XXX | - |
| Year 1 | X,XXX | XX% |
| Year 2 | X,XXX | XX% |
| Year 3 | X,XXX | XX% |
| Year 4 | X,XXX | XX% |
| Year 5 | X,XXX | XX% |

### Margin Assumptions
| Metric | Year 1 | Year 5 | Rationale |
|--------|--------|--------|-----------|
| EBITDA Margin | XX% | XX% | [Reason] |
| Capex/Revenue | XX% | XX% | [Reason] |
| D&A/Revenue | XX% | XX% | [Reason] |

### WACC Calculation
| Component | Value | Source/Assumption |
|-----------|-------|-------------------|
| Risk-free Rate | X.X% | 10-Year Treasury |
| Beta | X.XX | Bloomberg/Calculated |
| Equity Risk Premium | X.X% | Historical average |
| Cost of Equity | XX.X% | CAPM |
| Cost of Debt | X.X% | Credit spread |
| Tax Rate | XX% | Effective rate |
| Debt/Total Capital | XX% | Current structure |
| **WACC** | **X.X%** | |

### Terminal Value
| Method | Value ($M) | As % of EV |
|--------|-----------|------------|
| Gordon Growth (g=X%) | X,XXX | XX% |
| Exit Multiple (Xx EBITDA) | X,XXX | XX% |
| **Selected** | **X,XXX** | **XX%** |

---

## Free Cash Flow Projections

| ($M) | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 | Terminal |
|------|--------|--------|--------|--------|--------|----------|
| Revenue | | | | | | |
| EBITDA | | | | | | |
| (-) D&A | | | | | | |
| EBIT | | | | | | |
| (-) Taxes | | | | | | |
| NOPAT | | | | | | |
| (+) D&A | | | | | | |
| (-) Capex | | | | | | |
| (-) ΔNWC | | | | | | |
| **UFCF** | | | | | | |

---

## Valuation Summary

| Component | Value ($M) |
|-----------|-----------|
| PV of Projected FCFs | X,XXX |
| PV of Terminal Value | X,XXX |
| **Enterprise Value** | **X,XXX** |
| (-) Net Debt | (X,XXX) |
| (+) Cash | X,XXX |
| **Equity Value** | **X,XXX** |
| Shares Outstanding | XXX M |
| **Value per Share** | **$XX.XX** |

---

## Sensitivity Analysis

### WACC vs Terminal Growth Rate

| WACC ↓ / g → | 1.5% | 2.0% | 2.5% | 3.0% |
|--------------|------|------|------|------|
| 8.0% | $XX | $XX | $XX | $XX |
| 8.5% | $XX | $XX | $XX | $XX |
| 9.0% | $XX | $XX | **$XX** | $XX |
| 9.5% | $XX | $XX | $XX | $XX |
| 10.0% | $XX | $XX | $XX | $XX |

### Key Drivers Impact

| Assumption Change | Impact on Value |
|-------------------|-----------------|
| WACC +1% | -XX% |
| Terminal Growth +0.5% | +XX% |
| Revenue CAGR +2% | +XX% |
| EBITDA Margin +2% | +XX% |

---

## Risks to Valuation

1. **Model Risk**: DCF highly sensitive to WACC and terminal growth assumptions
2. **Execution Risk**: Projected growth may not materialize
3. **Market Risk**: Multiple compression in downturn
4. **[Company-Specific Risk]**: [Detail]

---

## Disclaimer

This valuation model is for educational and informational purposes only. It does not constitute investment advice. The intrinsic value estimate is based on assumptions that may not reflect reality.
```

---

## Example

### User Request
```
Build a DCF model for a SaaS company with:
- Current revenue: $500M
- Revenue growth: 25% declining to 15% over 5 years
- EBITDA margin: 20% improving to 30%
- Current stock price: $45
- Shares outstanding: 100M
```

### My Response
[Complete DCF model with all calculations...]

---

## Tips for Better Results

1. **Provide historical data** for more accurate projections
2. **Be explicit about growth assumptions** rather than using defaults
3. **Specify the industry** for appropriate comparables
4. **Request sensitivity analysis** to understand valuation range
5. **Cross-check with multiples** (P/E, EV/EBITDA) for sanity check

---

## Limitations

- Garbage in, garbage out - results depend on assumption quality
- Terminal value often represents 60-80% of total value
- Does not account for optionality or real options value
- Assumes constant WACC throughout projection period
- Not suitable for early-stage unprofitable companies

---

*Built by the Claude Office Skills community. Contributions welcome!*
