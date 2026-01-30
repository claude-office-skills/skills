---
name: Expense Tracker
description: Automate expense tracking, receipt processing, approval workflows, and reimbursement management
version: 1.0.0
author: Claude Office Skills
category: finance
tags:
  - expense
  - receipts
  - reimbursement
  - approval
  - accounting
department: finance
models:
  - claude-3-opus
  - claude-3-sonnet
  - gpt-4
mcp:
  server: accounting-mcp
  tools:
    - expensify_submit
    - concur_api
    - quickbooks_expense
    - ocr_receipt
capabilities:
  - Receipt OCR and extraction
  - Expense categorization
  - Approval workflow automation
  - Policy compliance checking
input:
  - Receipt images
  - Expense details
  - Category assignments
  - Approval requirements
output:
  - Expense reports
  - Reimbursement requests
  - Compliance reports
  - Spending analytics
languages:
  - en
  - zh
related_skills:
  - invoice-automation
  - financial-modeling
  - saas-metrics
---

# Expense Tracker

Comprehensive expense management skill for tracking, processing, and automating expense workflows.

## Core Workflows

### 1. Receipt Processing Pipeline

```
RECEIPT TO REIMBURSEMENT:
┌─────────────────┐
│  Receipt Image  │
│  (Photo/PDF)    │
└────────┬────────┘
         ▼
┌─────────────────┐
│  OCR Extract    │
│  - Vendor       │
│  - Amount       │
│  - Date         │
│  - Items        │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Auto-Categorize│
│  - Travel       │
│  - Meals        │
│  - Software     │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Policy Check   │
│  - Limits       │
│  - Approvals    │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Submit Report  │
└─────────────────┘
```

### 2. Expense Categories

| Category | Examples | Default Limit |
|----------|----------|---------------|
| Travel | Flights, hotels, transport | $500/day |
| Meals | Team dinners, client meals | $100/person |
| Software | SaaS subscriptions | $200/month |
| Equipment | Hardware, peripherals | $1000/item |
| Office | Supplies, printing | $50/month |
| Training | Courses, conferences | $2000/year |

### 3. Approval Workflow

```yaml
approval_matrix:
  - amount_range: [0, 100]
    required_approvers: []
    auto_approve: true
  
  - amount_range: [100, 500]
    required_approvers:
      - direct_manager
    
  - amount_range: [500, 2000]
    required_approvers:
      - direct_manager
      - department_head
    
  - amount_range: [2000, null]
    required_approvers:
      - direct_manager
      - department_head
      - finance_director
```

## Receipt OCR Template

### Extraction Fields

```yaml
receipt_extraction:
  required:
    - vendor_name
    - total_amount
    - transaction_date
    - payment_method
  
  optional:
    - line_items
    - tax_amount
    - tip_amount
    - currency
    - receipt_number
  
  validation:
    date_format: "YYYY-MM-DD"
    amount_precision: 2
    currency_codes: ["USD", "EUR", "GBP", "CNY"]
```

### Sample Extracted Data

```json
{
  "vendor": "Uber Technologies",
  "date": "2024-01-15",
  "total": 45.50,
  "currency": "USD",
  "category": "Travel - Ground Transport",
  "line_items": [
    {"description": "UberX ride", "amount": 38.00},
    {"description": "Tip", "amount": 7.50}
  ],
  "payment_method": "Corporate Card ****4242",
  "receipt_id": "RCP-2024-0115-001"
}
```

## Expense Report Template

### Monthly Report Structure

```markdown
# Expense Report - {Month} {Year}

**Employee:** {name}
**Department:** {department}
**Submission Date:** {date}
**Report Period:** {start_date} to {end_date}

## Summary

| Category | Amount | Budget | Variance |
|----------|--------|--------|----------|
| Travel | $1,250 | $2,000 | -$750 |
| Meals | $380 | $400 | -$20 |
| Software | $150 | $200 | -$50 |
| Equipment | $0 | $500 | -$500 |
| **Total** | **$1,780** | **$3,100** | **-$1,320** |

## Itemized Expenses

### Travel
| Date | Description | Amount | Receipt |
|------|-------------|--------|---------|
| 01/05 | Flight to NYC | $450 | ✓ |
| 01/05 | Hotel (2 nights) | $600 | ✓ |
| 01/06 | Uber to client | $45 | ✓ |
| 01/07 | Train return | $155 | ✓ |

### Meals
| Date | Description | Attendees | Amount | Receipt |
|------|-------------|-----------|--------|---------|
| 01/06 | Client dinner | 4 | $280 | ✓ |
| 01/10 | Team lunch | 6 | $100 | ✓ |

## Approval Status
- [ ] Direct Manager: Pending
- [ ] Finance Review: Pending
```

## Policy Compliance

### Auto-Check Rules

```yaml
compliance_rules:
  receipt_required:
    threshold: 25
    message: "Receipt required for expenses over $25"
  
  meal_per_person:
    limit: 75
    message: "Per-person meal limit exceeded"
  
  advance_booking:
    travel_days: 14
    savings_expected: 0.20
    message: "Book travel 14+ days ahead for savings"
  
  preferred_vendors:
    hotels: ["Marriott", "Hilton", "Hyatt"]
    airlines: ["United", "Delta", "American"]
    message: "Use preferred vendors when available"
```

### Violation Handling

```yaml
violation_actions:
  soft_violation:
    - flag_for_review
    - notify_submitter
    - allow_justification
  
  hard_violation:
    - reject_expense
    - notify_manager
    - require_correction
  
  repeated_violations:
    - escalate_to_hr
    - training_required
```

## Integration Workflows

### Slack Expense Bot

```yaml
slack_commands:
  /expense:
    - upload_receipt
    - check_balance
    - submit_report
    - view_status
  
  notifications:
    - expense_approved
    - expense_rejected
    - report_due_reminder
    - policy_update
```

### Credit Card Sync

```yaml
card_integration:
  providers:
    - amex_corporate
    - chase_business
    - brex
    - ramp
  
  auto_import:
    frequency: daily
    categorize: true
    match_receipts: true
  
  reconciliation:
    flag_missing_receipts: true
    flag_personal_charges: true
```

## Analytics Dashboard

### Spending Trends

```
MONTHLY SPENDING BY CATEGORY:
Travel    ████████████░░░░ $12,500
Meals     ██████░░░░░░░░░░ $5,800
Software  ████░░░░░░░░░░░░ $3,200
Equipment ██░░░░░░░░░░░░░░ $1,500
Office    █░░░░░░░░░░░░░░░ $800

TOP VENDORS:
1. Delta Airlines    $4,200
2. Marriott Hotels   $3,800
3. AWS              $2,100
4. Uber             $1,500
5. Zoom             $600
```

### Budget vs Actual

```
DEPARTMENT BUDGET STATUS:
Engineering  ████████░░ 78% ($15,600/$20,000)
Sales        ██████████ 95% ($28,500/$30,000)
Marketing    ██████░░░░ 62% $9,300/$15,000)
Operations   ████░░░░░░ 45% ($4,500/$10,000)
```

## Reimbursement Processing

### Payment Schedule

```yaml
reimbursement:
  processing_days: [1, 15]  # Bi-monthly
  payment_methods:
    - direct_deposit
    - payroll_addition
    - check
  
  timing:
    submission_deadline: 5  # Days before processing
    approval_deadline: 3
    payment_delay: 2  # Business days after processing
```

## Best Practices

1. **Submit Promptly**: Submit expenses within 7 days of transaction
2. **Attach Receipts**: Always include digital receipts
3. **Categorize Correctly**: Use standard categories
4. **Add Context**: Include business purpose for each expense
5. **Review Before Submit**: Check for policy compliance
6. **Track Mileage**: Log business miles in real-time
