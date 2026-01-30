---
name: Pipedrive Automation
description: Automate Pipedrive CRM workflows including deal management, pipeline tracking, and sales reporting
version: 1.0.0
author: Claude Office Skills
category: crm
tags:
  - pipedrive
  - crm
  - sales
  - deals
  - pipeline
department: sales
models:
  - claude-3-opus
  - claude-3-sonnet
  - gpt-4
mcp:
  server: crm-mcp
  tools:
    - pipedrive_deal
    - pipedrive_person
    - pipedrive_organization
    - pipedrive_activity
capabilities:
  - Deal management
  - Pipeline automation
  - Activity tracking
  - Sales reporting
input:
  - Deal information
  - Contact details
  - Pipeline stages
  - Activity logs
output:
  - Deal updates
  - Pipeline reports
  - Forecasts
  - Activity summaries
languages:
  - en
related_skills:
  - crm-automation
  - hubspot-automation
  - salesforce-automation
---

# Pipedrive Automation

Comprehensive skill for automating Pipedrive CRM and sales pipeline management.

## Core Workflows

### 1. Sales Pipeline

```
PIPEDRIVE PIPELINE FLOW:
┌─────────────────────────────────────────────────────────┐
│                     PIPELINE VIEW                        │
├──────────┬──────────┬──────────┬──────────┬────────────┤
│  Lead    │ Contact  │ Proposal │ Negoti-  │   Won/     │
│  In      │  Made    │  Sent    │  ation   │   Lost     │
├──────────┼──────────┼──────────┼──────────┼────────────┤
│ $15,000  │ $45,000  │ $80,000  │ $35,000  │ $125,000   │
│ 5 deals  │ 8 deals  │ 6 deals  │ 3 deals  │ 12 deals   │
├──────────┼──────────┼──────────┼──────────┼────────────┤
│ ┌──────┐ │ ┌──────┐ │ ┌──────┐ │ ┌──────┐ │            │
│ │Acme  │ │ │Tech  │ │ │StartX│ │ │BigCo │ │            │
│ │$5,000│ │ │$12K  │ │ │$25K  │ │ │$20K  │ │            │
│ └──────┘ │ └──────┘ │ └──────┘ │ └──────┘ │            │
└──────────┴──────────┴──────────┴──────────┴────────────┘
```

### 2. Automation Triggers

```yaml
automations:
  - name: new_deal_setup
    trigger:
      type: deal_created
    actions:
      - create_activity:
          type: call
          subject: "Initial discovery call"
          due_days: 1
      - send_email:
          template: welcome_sequence
      - add_label: "New"
      
  - name: stage_progression
    trigger:
      type: deal_stage_changed
      to_stage: "Proposal Sent"
    actions:
      - create_activity:
          type: task
          subject: "Follow up on proposal"
          due_days: 3
      - update_custom_field:
          field: "Proposal Date"
          value: "{{today}}"
          
  - name: stale_deal_alert
    trigger:
      type: deal_rotting
      days: 14
    actions:
      - send_notification:
          to: owner
          message: "Deal hasn't moved in 14 days"
      - add_label: "At Risk"
```

## Deal Management

### Deal Configuration

```yaml
deal_structure:
  required_fields:
    - title
    - value
    - organization
    - stage
    - owner
    
  custom_fields:
    - name: "Lead Source"
      type: enum
      options:
        - "Inbound - Website"
        - "Inbound - Referral"
        - "Outbound - Cold"
        - "Event"
        - "Partner"
        
    - name: "Product Interest"
      type: set
      options:
        - "Product A"
        - "Product B"
        - "Services"
        
    - name: "Decision Timeline"
      type: enum
      options:
        - "< 1 month"
        - "1-3 months"
        - "3-6 months"
        - "6+ months"
        
    - name: "Proposal Amount"
      type: monetary
      
    - name: "Close Probability"
      type: numeric
      format: percentage
```

### Pipeline Stages

```yaml
pipeline_config:
  name: "Sales Pipeline"
  
  stages:
    - name: "Lead In"
      probability: 10%
      rotting_days: 7
      
    - name: "Contact Made"
      probability: 20%
      rotting_days: 10
      
    - name: "Needs Defined"
      probability: 40%
      rotting_days: 14
      
    - name: "Proposal Sent"
      probability: 60%
      rotting_days: 14
      
    - name: "Negotiation"
      probability: 80%
      rotting_days: 7
      
    - name: "Won"
      probability: 100%
      
    - name: "Lost"
      probability: 0%
```

## Activity Management

### Activity Types

```yaml
activity_types:
  - name: "Call"
    icon: phone
    default_duration: 15
    
  - name: "Meeting"
    icon: calendar
    default_duration: 60
    
  - name: "Email"
    icon: mail
    default_duration: 5
    
  - name: "Task"
    icon: checkbox
    default_duration: 30
    
  - name: "Demo"
    icon: presentation
    default_duration: 45
```

### Activity Automation

```yaml
activity_workflows:
  discovery_call_complete:
    trigger:
      activity_type: call
      marked_done: true
      deal_stage: "Lead In"
    actions:
      - move_deal_stage: "Contact Made"
      - create_activity:
          type: task
          subject: "Send follow-up email"
          due_days: 1
      - update_deal:
          custom_field: "First Contact Date"
          value: "{{activity.done_time}}"
          
  meeting_scheduled:
    trigger:
      activity_type: meeting
      created: true
    actions:
      - send_email:
          template: meeting_confirmation
          to: "{{deal.contact}}"
      - create_activity:
          type: task
          subject: "Prepare meeting agenda"
          due_before_meeting: 1_day
```

## Email Integration

### Email Templates

```yaml
email_templates:
  - name: "Initial Outreach"
    subject: "{{company}} + {{prospect_company}}"
    body: |
      Hi {{first_name}},
      
      I noticed {{company_insight}} and thought 
      {{value_proposition}}.
      
      Would you be open to a 15-minute call this week?
      
      Best,
      {{sender_name}}
      
  - name: "Proposal Follow-up"
    subject: "Following up on our proposal"
    body: |
      Hi {{first_name}},
      
      I wanted to follow up on the proposal I sent 
      on {{proposal_date}}.
      
      Do you have any questions I can help answer?
      
      Best,
      {{sender_name}}
```

### Email Tracking

```yaml
email_tracking:
  features:
    - open_tracking
    - link_tracking
    - attachment_tracking
    
  automations:
    on_email_opened:
      - create_activity:
          type: task
          subject: "Follow up - Email opened"
          due_hours: 2
          
    on_link_clicked:
      - add_note: "Clicked link: {{link_url}}"
      - update_custom_field:
          field: "Engagement Level"
          value: "High"
```

## Reporting & Analytics

### Sales Dashboard

```
SALES DASHBOARD - JANUARY 2024
═══════════════════════════════════════

PIPELINE VALUE: $175,000
WEIGHTED: $89,500

BY STAGE:
Lead In       ████░░░░░░░░░░░░ $15,000
Contact Made  ████████░░░░░░░░ $45,000
Proposal      ████████████░░░░ $80,000
Negotiation   ██████░░░░░░░░░░ $35,000

SALES VELOCITY:
Deals Closed:     12
Average Value:    $10,400
Win Rate:         28%
Sales Cycle:      34 days

BY REP:
┌────────────┬────────┬──────────┬───────┐
│ Rep        │ Deals  │ Value    │ Win % │
├────────────┼────────┼──────────┼───────┤
│ Sarah      │ 5      │ $52,000  │ 35%   │
│ Mike       │ 4      │ $41,000  │ 28%   │
│ Lisa       │ 3      │ $32,000  │ 22%   │
└────────────┴────────┴──────────┴───────┘

FORECAST:
This Month:   $45,000 (weighted)
Next Month:   $68,000 (weighted)
```

### Win/Loss Analysis

```yaml
win_loss_tracking:
  won_reasons:
    - "Best product fit"
    - "Competitive pricing"
    - "Relationship/trust"
    - "Implementation timeline"
    
  lost_reasons:
    - "Price too high"
    - "Chose competitor"
    - "No budget"
    - "No decision made"
    - "Lost contact"
    
  analysis:
    win_rate_by_source:
      inbound: 35%
      outbound: 18%
      referral: 45%
      
    win_rate_by_size:
      small: 42%
      medium: 28%
      enterprise: 15%
```

## Integration Workflows

### Slack Integration

```yaml
slack_notifications:
  - trigger: deal_won
    channel: "#wins"
    message: |
      🎉 *Deal Won!*
      *Company:* {{organization.name}}
      *Value:* ${{deal.value}}
      *Owner:* {{deal.owner}}
      
  - trigger: deal_stage_changed
    to_stage: "Negotiation"
    channel: "#sales"
    message: |
      📊 Deal moving to negotiation
      {{deal.title}} - ${{deal.value}}
      
  - trigger: activity_overdue
    notify: owner_dm
    message: |
      ⚠️ Overdue activity: {{activity.subject}}
```

### Calendar Sync

```yaml
calendar_integration:
  provider: google_calendar
  
  sync_settings:
    meetings: bidirectional
    calls: to_calendar
    
  automations:
    on_calendar_event:
      - create_activity:
          type: meeting
          link_to: attendee_organization
```

## API Examples

### Deal Operations

```javascript
// Create Deal
const deal = await pipedrive.deals.create({
  title: "Acme Corp - Enterprise Plan",
  value: 50000,
  currency: "USD",
  org_id: 123,
  person_id: 456,
  stage_id: 1,
  expected_close_date: "2024-02-28",
  custom_fields: {
    "Lead Source": "Inbound - Website",
    "Decision Timeline": "1-3 months"
  }
});

// Update Deal Stage
await pipedrive.deals.update(deal.id, {
  stage_id: 3  // Move to "Proposal Sent"
});

// Add Activity
await pipedrive.activities.create({
  deal_id: deal.id,
  type: "call",
  subject: "Discovery call",
  due_date: "2024-01-20",
  due_time: "14:00"
});

// Mark Activity Done
await pipedrive.activities.update(activityId, {
  done: true,
  note: "Great call, moving forward with proposal"
});
```

## Best Practices

1. **Stage Discipline**: Clear criteria for each stage
2. **Activity Logging**: Document all interactions
3. **Pipeline Hygiene**: Regular deal reviews
4. **Rotting Alerts**: Don't let deals stagnate
5. **Custom Fields**: Track key data points
6. **Templates**: Consistent communication
7. **Reporting**: Weekly pipeline reviews
8. **Integration**: Connect all touchpoints
