---
# ═══════════════════════════════════════════════════════════════════════════════
# CLAUDE OFFICE SKILL - Enhanced Metadata v2.0
# ═══════════════════════════════════════════════════════════════════════════════

# Basic Information
name: invoice-generator
description: "Create professional invoices with proper formatting for freelancers and small businesses. Supports multiple currencies and tax calculations."
version: "1.0.0"
author: claude-office-skills
license: MIT

# Categorization
category: finance
tags:
  - invoice
  - billing
  - generator
  - finance
  - business
department: Finance

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
    - fill_docx_template
    - docx_to_pdf
  optional_tools:
    - create_xlsx

# Skill Capabilities
capabilities:
  - invoice_creation
  - tax_calculation
  - currency_handling
  - professional_formatting

# Input/Output Specification
input:
  required:
    - type: text
      name: client_info
      description: Client name, address, contact
    - type: text
      name: line_items
      description: Products/services with quantities and prices
  optional:
    - type: text
      name: currency
      description: Currency (USD, EUR, CNY, etc.)
    - type: text
      name: tax_rate
      description: Tax rate percentage
    - type: text
      name: payment_terms
      description: Payment terms and due date

output:
  primary:
    type: document
    formats: [docx, pdf]
  artifacts:
    - type: file
      name: invoice.docx
      description: Generated invoice document

# Language Support
languages:
  - en
  - zh

# Related Skills
related_skills:
  - invoice-template
  - invoice-organizer
  - expense-report
---

# Invoice Generator Skill

## Overview

I help freelancers and small businesses create professional invoices quickly. Just tell me the details, and I'll generate a complete, properly formatted invoice.

**What I can do:**
- Create professional invoices in multiple formats
- Calculate taxes (VAT, GST, sales tax)
- Handle multiple currencies
- Support various payment terms
- Generate in English or Chinese

**What I cannot do:**
- File taxes for you
- Guarantee compliance with all local regulations
- Process actual payments

---

## How to Use Me

### Step 1: Provide Basic Info
Tell me:
1. **Your business details** (name, address, tax ID if needed)
2. **Client details** (name, address)
3. **Items/services** (description, quantity, rate)
4. **Invoice number** (or I'll suggest one)
5. **Payment terms** (due date, accepted methods)

### Step 2: I'll Generate
I'll create a complete invoice with:
- Professional layout
- Proper calculations
- Payment instructions
- Terms and conditions

### Step 3: Export
Copy the output to your preferred tool:
- Paste into Word/Google Docs
- Use the markdown version
- Request HTML for web display

---

## Invoice Components

### Required Elements

| Element | Description | Example |
|---------|-------------|---------|
| **Invoice Number** | Unique identifier | INV-2026-0001 |
| **Date** | Issue date | January 29, 2026 |
| **Due Date** | Payment deadline | February 28, 2026 |
| **From** | Your business info | Company name, address |
| **Bill To** | Client info | Client name, address |
| **Line Items** | Services/products | Description, qty, rate, amount |
| **Total** | Sum due | Amount with currency |

### Optional Elements

| Element | When to Include |
|---------|-----------------|
| **Tax ID** | Required in many countries for B2B |
| **PO Number** | If client provided purchase order |
| **Tax Breakdown** | When charging VAT/GST/Sales Tax |
| **Late Fee Terms** | If you charge for late payment |
| **Bank Details** | For wire transfers |
| **Payment Link** | For online payment |

---

## Tax Guidance by Region

### United States

**No federal invoice requirements**, but good practices:
- Include your EIN if B2B
- State sales tax if applicable (varies by state)
- 1099 reporting if paying contractors $600+

**Sales Tax Rates (examples):**
| State | Rate | Notes |
|-------|------|-------|
| California | 7.25% base | Up to 10.75% with local |
| Texas | 6.25% base | Up to 8.25% with local |
| New York | 4% state | Up to 8.875% with local |
| Oregon | 0% | No sales tax |

### European Union

**VAT Invoice Requirements:**
- Must include VAT number if registered
- Reverse charge for B2B cross-border
- Sequential invoice numbering required

**Standard VAT Rates:**
| Country | Rate |
|---------|------|
| Germany | 19% |
| France | 20% |
| UK (post-Brexit) | 20% |
| Netherlands | 21% |
| Ireland | 23% |

**Reverse Charge:** For B2B services in EU, buyer may handle VAT. Include "Reverse Charge - VAT to be paid by recipient."

### China

**Invoice Requirements:**
- Regular invoice vs. VAT special invoice (fapiao)
- Tax registration number required
- Official invoices must be issued through tax authority system

**VAT Rates:**
| Type | Rate |
|------|------|
| General Goods | 13% |
| Services | 6% |
| Small-scale Taxpayer | 3% |

### Australia

**GST Requirements:**
- 10% GST on most goods/services
- Must include ABN if registered
- GST-free for exports

---

## Payment Terms Reference

### Common Terms

| Term | Meaning |
|------|---------|
| **Due on Receipt** | Pay immediately |
| **Net 15** | Due within 15 days |
| **Net 30** | Due within 30 days (most common) |
| **Net 60** | Due within 60 days |
| **2/10 Net 30** | 2% discount if paid in 10 days, otherwise due in 30 |

### Late Payment Policies

**Example language:**
> "Invoices not paid within [X] days will incur a late fee of [1.5%] per month on the outstanding balance."

**Legal maximums vary:**
- US: Generally up to 18-24% annually
- UK: 8% + Bank of England base rate
- EU: ECB rate + 8%

---

## Output Format

### Markdown Invoice

```
# INVOICE

**Invoice Number:** INV-2026-0042
**Date:** January 29, 2026
**Due Date:** February 28, 2026

---

## From
[Your Business Name]
[Your Address]
[Your Email]
[Tax ID: XXX-XX-XXXX]

## Bill To
[Client Name]
[Client Address]
[Client Email]

---

## Items

| Description | Qty | Rate | Amount |
|-------------|-----|------|--------|
| [Service 1] | 10 hrs | $100/hr | $1,000.00 |
| [Service 2] | 1 | $500 | $500.00 |

---

|  | |
|---|---|
| **Subtotal** | $1,500.00 |
| **Tax (10%)** | $150.00 |
| **Total Due** | **$1,650.00** |

---

## Payment Details

**Bank Transfer:**
Bank: [Bank Name]
Account: [Account Number]
Routing: [Routing Number]

**Or pay online:** [Payment Link]

---

**Payment Terms:** Net 30
**Late Fee:** 1.5% per month on overdue balance

Thank you for your business!
```

---

## Examples

### Example 1: Simple Freelance Invoice

**User**: Create an invoice for 20 hours of web development at $75/hour for Acme Corp. I'm John Smith, based in Austin, TX.

**Me**:

# INVOICE

**Invoice Number:** INV-2026-0001
**Date:** January 29, 2026
**Due Date:** February 28, 2026

---

## From
John Smith
Austin, TX 78701
john@example.com

## Bill To
Acme Corp
[Client Address]

---

## Items

| Description | Qty | Rate | Amount |
|-------------|-----|------|--------|
| Web Development Services | 20 hrs | $75.00/hr | $1,500.00 |

---

| | |
|---|---|
| **Total Due** | **$1,500.00 USD** |

---

**Payment Terms:** Net 30

---

### Example 2: With VAT (UK)

**User**: Invoice for consulting services to a UK client, £2000, need to add VAT

**Me**:

| | |
|---|---|
| **Subtotal** | £2,000.00 |
| **VAT (20%)** | £400.00 |
| **Total Due** | **£2,400.00 GBP** |

VAT Registration: GB123456789

---

### Example 3: Multiple Line Items

**User**: Invoice for: Logo design $500, Brand guidelines $1200, Business card design $300. Client is StartupXYZ.

**Me**:

| Description | Qty | Rate | Amount |
|-------------|-----|------|--------|
| Logo Design | 1 | $500.00 | $500.00 |
| Brand Guidelines Document | 1 | $1,200.00 | $1,200.00 |
| Business Card Design | 1 | $300.00 | $300.00 |

---

| | |
|---|---|
| **Total Due** | **$2,000.00 USD** |

---

## Invoice Numbering Best Practices

### Format Options

| Format | Example | Best For |
|--------|---------|----------|
| Sequential | 001, 002, 003 | Simple, low volume |
| Year-Seq | 2026-001 | Easy to track by year |
| Client-Seq | ACME-001 | Multiple clients |
| Date-Seq | 20260129-01 | Date-based tracking |

### Tips

- Never reuse invoice numbers
- Keep numbers sequential (gaps may raise audit questions)
- Include prefix for different services if needed

---

## Tips for Better Results

1. **Provide complete info** - The more details, the better the invoice
2. **Specify currency** - USD, EUR, GBP, CNY, etc.
3. **Include tax requirements** - Tell me if you need VAT/GST
4. **Mention payment methods** - Bank, PayPal, Stripe, etc.
5. **Request specific format** - Markdown, HTML, or plain text

---

## Common Mistakes to Avoid

1. **Missing due date** - Always specify when payment is expected
2. **Vague descriptions** - "Consulting" is worse than "Marketing strategy consulting - Q1 campaign planning"
3. **Wrong calculations** - I'll double-check, but verify final numbers
4. **Missing tax info** - Required for B2B in many countries
5. **No payment instructions** - Make it easy to pay you!

---

## Limitations

- I generate text invoices, not PDFs directly
- Tax calculations are estimates - verify with accountant
- Can't integrate with accounting software
- Don't know your specific local requirements

---

## Languages

Works with multiple languages including English and Chinese.
Just specify your preferred language when requesting an invoice.

---

*Built by the Claude Office Skills community. Get paid faster!*
