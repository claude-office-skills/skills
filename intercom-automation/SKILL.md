---
name: Intercom Automation
description: Automate Intercom customer messaging, support workflows, user engagement, and product tours
version: 1.0.0
author: Claude Office Skills
category: support
tags:
  - intercom
  - customer-support
  - messaging
  - engagement
  - automation
department: support
models:
  - claude-3-opus
  - claude-3-sonnet
  - gpt-4
mcp:
  server: helpdesk-mcp
  tools:
    - intercom_message
    - intercom_user
    - intercom_conversation
    - intercom_articles
capabilities:
  - Automated messaging
  - User segmentation
  - Support workflows
  - Product adoption
input:
  - User data
  - Conversation context
  - Trigger events
  - Segment criteria
output:
  - Automated messages
  - User segments
  - Support metrics
  - Engagement reports
languages:
  - en
related_skills:
  - zendesk-automation
  - customer-success
  - email-marketing
---

# Intercom Automation

Comprehensive skill for automating Intercom customer communication and support workflows.

## Core Workflows

### 1. Conversation Flow

```
CUSTOMER CONVERSATION FLOW:
┌─────────────────┐
│  User Message   │
│   (Inbound)     │
└────────┬────────┘
         ▼
┌─────────────────┐
│   Bot Triage    │
│  - Intent       │
│  - Route        │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐ ┌───────┐
│  Bot  │ │ Human │
│ Reply │ │ Agent │
└───┬───┘ └───┬───┘
    │         │
    └────┬────┘
         ▼
┌─────────────────┐
│   Resolution    │
│  - Close        │
│  - Follow-up    │
└─────────────────┘
```

### 2. Automation Rules

```yaml
automations:
  - name: welcome_new_users
    trigger:
      event: user.created
      conditions:
        - signed_up_at: within_last_hour
    action:
      send_message:
        type: chat
        delay: 5_minutes
        message: |
          Hey {{first_name}}! 👋
          
          Welcome to {{company_name}}! I'm here to help you 
          get started. What brings you here today?
        buttons:
          - "Explore features"
          - "I have a question"
          - "Just looking around"
          
  - name: trial_expiring
    trigger:
      event: user.attribute_changed
      attribute: trial_days_remaining
      value: 3
    action:
      send_message:
        type: email
        template: trial_expiring
        
  - name: feature_announcement
    trigger:
      segment: power_users
      event: feature_released
    action:
      send_message:
        type: in_app
        message: "🎉 New Feature: {{feature_name}}"
```

## User Segmentation

### Segment Definitions

```yaml
segments:
  - name: trial_users
    filter:
      subscription_status: trial
      
  - name: power_users
    filter:
      sessions_count: "> 50"
      last_seen: "< 7 days"
      features_used: "> 5"
      
  - name: at_risk_users
    filter:
      subscription_status: active
      last_seen: "> 30 days"
      
  - name: enterprise_prospects
    filter:
      company_size: "> 100"
      plan: free
      
  - name: feature_requesters
    filter:
      tag: feature_request
      conversations_count: "> 0"
```

### Dynamic Attributes

```yaml
custom_attributes:
  - name: health_score
    type: number
    compute: |
      (sessions_last_30_days * 2) +
      (features_used * 3) +
      (team_members_active * 5)
      
  - name: lifecycle_stage
    type: string
    rules:
      - condition: signed_up_at < 7_days
        value: "onboarding"
      - condition: subscription_status == "trial"
        value: "trial"
      - condition: subscription_status == "active"
        value: "customer"
      - condition: subscription_status == "cancelled"
        value: "churned"
        
  - name: account_tier
    type: string
    source: company.plan
```

## Messaging Campaigns

### Onboarding Series

```yaml
onboarding_campaign:
  name: "New User Onboarding"
  audience: 
    segment: new_signups
    
  messages:
    - day: 0
      channel: in_app
      content: |
        Welcome to {{company}}! 🎉
        
        Let me show you around. Click below to take a 
        quick 2-minute tour.
      cta: "Start Tour"
      
    - day: 1
      channel: email
      subject: "Quick tip: {{feature_1}}"
      content: |
        Hi {{first_name}},
        
        Did you know you can {{feature_1_benefit}}?
        
        Here's how: {{feature_1_tutorial_link}}
        
    - day: 3
      channel: in_app
      trigger: 
        not_completed: "setup_wizard"
      content: |
        Hey {{first_name}}, I noticed you haven't 
        finished setting up. Need any help?
        
    - day: 7
      channel: email
      subject: "How's it going?"
      content: |
        Hi {{first_name}},
        
        You've been using {{company}} for a week now.
        
        Any questions or feedback? Just reply to this email!
```

### Product Tours

```yaml
product_tours:
  - name: "Welcome Tour"
    trigger:
      event: first_login
    steps:
      - element: "#dashboard"
        title: "Your Dashboard"
        body: "This is where you'll see your key metrics"
        position: bottom
        
      - element: "#create-button"
        title: "Create New"
        body: "Click here to create your first project"
        position: left
        
      - element: "#help-menu"
        title: "Need Help?"
        body: "Find docs and contact support here"
        position: bottom
        
  - name: "Feature Tour: Reports"
    trigger:
      event: page_viewed
      url: "/reports"
      first_time: true
    steps:
      - element: "#date-picker"
        title: "Date Range"
        body: "Select your reporting period"
```

## Support Workflows

### Conversation Routing

```yaml
routing_rules:
  - name: vip_priority
    conditions:
      - company.plan: enterprise
    actions:
      - set_priority: urgent
      - assign_team: enterprise_support
      - send_notification: slack_vip
      
  - name: billing_issues
    conditions:
      - message_contains: ["billing", "charge", "invoice", "refund"]
    actions:
      - add_tag: billing
      - assign_team: billing_support
      
  - name: technical_support
    conditions:
      - message_contains: ["error", "bug", "not working", "broken"]
    actions:
      - add_tag: technical
      - assign_team: tech_support
      - create_ticket: jira
```

### Bot Responses

```yaml
bot_responses:
  - intent: greeting
    patterns: ["hi", "hello", "hey"]
    response: |
      Hi there! 👋 How can I help you today?
      
  - intent: pricing
    patterns: ["pricing", "cost", "how much", "plans"]
    response: |
      Great question! Here's our pricing:
      
      • **Starter**: $29/mo
      • **Growth**: $79/mo
      • **Enterprise**: Custom
      
      Would you like me to connect you with sales?
    buttons:
      - "Yes, talk to sales"
      - "See full comparison"
      
  - intent: password_reset
    patterns: ["forgot password", "reset password", "can't login"]
    response: |
      No problem! You can reset your password here:
      {{password_reset_link}}
      
      The link will expire in 24 hours.
    auto_close: true
```

## Analytics & Reporting

### Conversation Metrics

```
SUPPORT METRICS - THIS WEEK
═══════════════════════════════════════

Conversations:
New:          234 (+12%)
Closed:       256 (+8%)
Open:         45

Response Times:
First Reply:  2.3 min (target: 5 min) ✓
Median:       8 min
Resolution:   2.4 hours

CSAT Score:   4.7/5 ⭐ (+0.2)

BY CHANNEL:
Chat      ████████████░░░░ 156
Email     ██████░░░░░░░░░░ 58
In-App    ████░░░░░░░░░░░░ 20

TOP TOPICS:
┌────────────────────┬───────┐
│ Topic              │ Count │
├────────────────────┼───────┤
│ Billing questions  │ 45    │
│ Feature requests   │ 38    │
│ Bug reports        │ 32    │
│ How-to questions   │ 28    │
└────────────────────┴───────┘
```

### Engagement Dashboard

```yaml
engagement_metrics:
  - name: message_open_rate
    formula: opened / sent * 100
    target: 40%
    
  - name: click_through_rate
    formula: clicked / opened * 100
    target: 10%
    
  - name: tour_completion_rate
    formula: completed / started * 100
    target: 60%
    
  - name: bot_resolution_rate
    formula: resolved_by_bot / total * 100
    target: 30%
```

## Integration Workflows

### CRM Sync

```yaml
crm_integration:
  salesforce:
    sync_fields:
      - intercom: company.name
        salesforce: Account.Name
      - intercom: user.email
        salesforce: Contact.Email
      - intercom: custom.mrr
        salesforce: Account.MRR__c
        
    events:
      - trigger: conversation_closed
        action: log_activity
        type: "Support Interaction"
        
      - trigger: user.tag_added
        tag: "sales_qualified"
        action: create_lead
```

### Slack Integration

```yaml
slack_integration:
  notifications:
    - trigger: new_conversation
      channel: "#support-inbox"
      conditions:
        - priority: urgent
      message: "🚨 Urgent: {{user.name}} needs help"
      
    - trigger: conversation_assigned
      notify: assignee_dm
      message: "New conversation assigned to you"
      
  commands:
    /intercom:
      - lookup_user
      - send_message
      - add_tag
```

## API Examples

### Create or Update User

```javascript
// Create/Update User
const user = await intercom.users.create({
  user_id: "12345",
  email: "user@example.com",
  name: "John Doe",
  signed_up_at: Math.floor(Date.now() / 1000),
  custom_attributes: {
    plan: "pro",
    team_size: 10,
    onboarding_complete: true
  }
});

// Send Message
await intercom.messages.create({
  message_type: "inapp",
  body: "Hey! New feature alert 🎉",
  from: {
    type: "admin",
    id: "admin_id"
  },
  to: {
    type: "user",
    user_id: "12345"
  }
});

// Search Conversations
const conversations = await intercom.conversations.search({
  query: {
    field: "state",
    operator: "=",
    value: "open"
  }
});
```

## Best Practices

1. **Personalize Messages**: Use user attributes
2. **Time Appropriately**: Consider user timezone
3. **Don't Over-Message**: Respect frequency limits
4. **Bot + Human**: Know when to escalate
5. **Track Everything**: Measure message effectiveness
6. **Segment Thoughtfully**: Target the right users
7. **A/B Test**: Optimize message content
8. **Quick Resolution**: Minimize response time
