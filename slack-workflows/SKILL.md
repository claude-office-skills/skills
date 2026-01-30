---
name: slack-workflows
description: "Slack automation and workflow builder - notifications, standup bots, approval flows, and cross-platform integrations"
version: "1.0.0"
author: claude-office-skills
license: MIT

category: productivity
tags:
  - slack
  - automation
  - workflow
  - notifications
  - bots
department: Operations

models:
  recommended:
    - claude-sonnet-4

mcp:
  server: slack-mcp
  tools:
    - slack_post_message
    - slack_create_channel
    - slack_workflow_trigger

capabilities:
  - automated_notifications
  - standup_collection
  - approval_workflows
  - cross_platform_sync
  - channel_management

languages:
  - en
  - zh

related_skills:
  - gmail-workflows
  - calendar-automation
  - crm-automation
---

# Slack Workflows

Automate Slack with intelligent workflows for notifications, standup collection, approval processes, and cross-platform integrations. Based on n8n automation patterns.

## Overview

This skill covers:
- Automated notifications and alerts
- Daily standup collection
- Approval workflows
- Cross-platform integrations
- Channel management automation

---

## Core Workflows

### 1. Daily Standup Bot

```yaml
workflow: "Async Standup"
schedule: "9:00 AM weekdays"

steps:
  1. send_prompt:
      channel: each team member (DM)
      message: |
        👋 Good morning! Time for standup.
        
        Please share:
        1️⃣ What did you complete yesterday?
        2️⃣ What are you working on today?
        3️⃣ Any blockers?
        
        Reply in this thread 👇
        
  2. collect_responses:
      timeout: 2_hours
      reminder: at_1_hour
      
  3. compile_summary:
      time: "11:00 AM"
      channel: "#team-standup"
      format: |
        📋 *Daily Standup - {date}*
        
        {for_each_member}
        *{name}*
        ✅ Yesterday: {yesterday}
        📌 Today: {today}
        🚧 Blockers: {blockers}
        
        ---
        {end_for}
        
        *Summary:*
        • {total} team members responded
        • {blockers_count} blockers flagged
        
  4. flag_blockers:
      if: blockers_count > 0
      notify: manager
      action: create_thread_for_discussion
```

### 2. Approval Workflow

```yaml
workflow: "Expense Approval"
trigger: form_submission OR slash_command

steps:
  1. receive_request:
      data:
        - requester
        - amount
        - category
        - description
        - receipt_url
        
  2. route_approval:
      rules:
        - if: amount < 100
          approver: direct_manager
          
        - if: amount >= 100 AND amount < 1000
          approver: department_head
          
        - if: amount >= 1000
          approver: [department_head, finance]
          type: sequential
          
  3. send_approval_request:
      channel: DM to approver
      message: |
        📝 *Expense Approval Request*
        
        *From:* {requester}
        *Amount:* ${amount}
        *Category:* {category}
        *Description:* {description}
        
        [View Receipt]({receipt_url})
        
      actions:
        - button: "✅ Approve"
          action: approve
        - button: "❌ Reject"
          action: reject
        - button: "💬 Ask Question"
          action: request_info
          
  4. handle_response:
      approved:
        - notify_requester: "Your expense was approved! 🎉"
        - create_task: in_accounting_system
        - log: in_expense_tracker
        
      rejected:
        - notify_requester: "Expense not approved. Reason: {reason}"
        - log: with_rejection_reason
        
  5. escalate_if_no_response:
      timeout: 24_hours
      action: remind_approver
      final_escalation: 48_hours
```

### 3. New Hire Onboarding

```yaml
workflow: "Employee Onboarding"
trigger: new_employee_added_to_HRIS

timeline:
  day_minus_7:
    - create_channels:
        - "#welcome-{name}"
        - add_to: ["#general", "#team-{department}"]
    - notify_it: "Set up laptop for {name}"
    - notify_manager: "Onboarding starts in 7 days"
    
  day_1:
    - morning:
        - post_welcome: "#general"
          message: |
            🎉 Please welcome *{name}* to the team!
            
            Role: {title}
            Team: {department}
            Location: {office}
            
            Fun fact: {fun_fact}
            
            Say hi and make them feel welcome! 👋
            
        - dm_new_hire:
            message: |
              Welcome to {Company}! 🚀
              
              Here are your first steps:
              1. [Complete HR paperwork]({hr_link})
              2. [Set up your accounts]({it_link})
              3. [Meet the team]({org_chart})
              
              Your buddy is @{buddy_name} - reach out anytime!
              
    - afternoon:
        - schedule_intros: with_key_stakeholders
        
  day_3:
    - check_in:
        dm: "How's your first week going? Any questions?"
        
  day_7:
    - survey:
        question: "How was your onboarding experience?"
        scale: 1-5
        
  day_30:
    - feedback_request:
        dm: "You've been here a month! What could we improve?"
```

### 4. Incident Response

```yaml
workflow: "Incident Alert"
trigger: monitoring_alert OR manual

severity_levels:
  critical:
    - create_channel: "#incident-{timestamp}"
    - notify: "@channel in #engineering"
    - page: on_call_engineer
    - create_war_room: video_link
    - start_timer: for_resolution_tracking
    
  high:
    - notify: "#engineering-alerts"
    - assign: on_call_engineer
    - create_ticket: in_jira
    
  medium:
    - notify: "#engineering-alerts"
    - create_ticket: in_jira
    
  low:
    - create_ticket: in_jira
    - notify: next_business_day

incident_channel_template: |
  🚨 *INCIDENT: {title}*
  
  *Severity:* {severity}
  *Status:* Investigating
  *Started:* {timestamp}
  *Commander:* @{commander}
  
  ---
  
  *Affected Systems:*
  {systems}
  
  *Customer Impact:*
  {impact}
  
  ---
  
  📋 *Actions:*
  • [ ] Identify root cause
  • [ ] Implement fix
  • [ ] Verify resolution
  • [ ] Communicate to stakeholders
  
  🔗 *Links:*
  • [Runbook]({runbook_url})
  • [Dashboard]({dashboard_url})
  • [Video Room]({video_url})

resolution_flow:
  1. commander_declares: "resolved"
  2. notify_stakeholders: resolution_message
  3. archive_channel: after_24_hours
  4. create_postmortem: in_notion
  5. schedule_review: in_calendar
```

### 5. Cross-Platform Sync

```yaml
workflow: "CRM to Slack Notifications"

triggers:
  hubspot_deal_won:
    channel: "#wins"
    message: |
      🎉 *Deal Closed!*
      
      *Company:* {company}
      *Value:* ${amount}
      *Rep:* @{sales_rep}
      *Product:* {product}
      
      Congrats! 🚀
      
  hubspot_deal_lost:
    channel: "#sales-team"
    message: |
      📊 *Deal Lost*
      
      *Company:* {company}
      *Value:* ${amount}
      *Reason:* {loss_reason}
      *Competitor:* {competitor}
      
      Thread for learnings 👇
      
  github_pr_merged:
    channel: "#engineering"
    message: |
      ✅ PR merged: *{pr_title}*
      by @{author}
      
      {pr_description_summary}
      
  stripe_payment_failed:
    channel: "#revenue-alerts"
    message: |
      ⚠️ *Payment Failed*
      
      *Customer:* {customer_email}
      *Amount:* ${amount}
      *Reason:* {failure_reason}
      
      [View in Stripe]({stripe_link})
```

---

## Slash Commands

### Custom Commands

```yaml
slash_commands:
  /kudos:
    description: "Give recognition to a teammate"
    usage: "/kudos @person for [reason]"
    action:
      - post_to: "#kudos"
      - format: |
          🌟 *Kudos!*
          
          @{sender} gave kudos to @{recipient}
          
          > {reason}
          
      - track: in_recognition_spreadsheet
      
  /pto:
    description: "Request time off"
    usage: "/pto [start_date] to [end_date] for [reason]"
    action:
      - create_approval: pto_approval_flow
      - update_calendar: block_dates
      - notify_team: if_approved
      
  /standup:
    description: "Submit async standup"
    usage: "/standup"
    action:
      - open_modal: standup_form
      - collect_responses: yesterday, today, blockers
      - post_to: "#team-standup"
      
  /poll:
    description: "Create a quick poll"
    usage: "/poll 'Question' 'Option 1' 'Option 2' ..."
    action:
      - create_message: with_reactions
      - track_votes: by_reaction_count
      - close_poll: after_24h_or_manual
```

---

## Channel Management

```yaml
channel_automation:
  project_channels:
    trigger: jira_project_created
    action:
      - create_channel: "#proj-{project_key}"
      - add_members: project_team
      - set_topic: "{project_name} - {project_description}"
      - pin_message: project_resources
      - archive: when_project_completed
      
  customer_channels:
    trigger: deal_closed_won
    action:
      - create_channel: "#customer-{company}"
      - add_members: [csm, sales_rep, support]
      - set_purpose: "Support channel for {company}"
      - integrate: zendesk_alerts
      
  cleanup:
    schedule: monthly
    rules:
      - archive_if:
          no_messages: 90_days
          AND:
            not_pinned: true
            not_customer_channel: true
      - notify_before_archive: 7_days
```

---

## Output Example

**Request**: "Set up a deal win notification in Slack"

**Output**:

```markdown
# Deal Win Notification Setup

## Workflow Configuration

```yaml
trigger: hubspot_deal_stage_changed
condition: new_stage == "Closed Won"

action:
  channel: "#wins"
  message: see_below
```

## Message Template

```
🎉 *DEAL CLOSED!*

━━━━━━━━━━━━━━━━━━━━━━

🏢 *Company:* {company_name}
💰 *Value:* ${deal_amount}
👤 *Sales Rep:* @{owner_slack_id}
📦 *Product:* {product_line}

━━━━━━━━━━━━━━━━━━━━━━

*Deal Summary:*
• Sales cycle: {days_in_pipeline} days
• Lead source: {lead_source}
• Industry: {industry}

🎊 Congrats to the team!
```

## n8n Implementation

```javascript
// HubSpot Trigger → Slack Node
{
  "nodes": [
    {
      "name": "HubSpot Trigger",
      "type": "n8n-nodes-base.hubspotTrigger",
      "parameters": {
        "eventsUi": {
          "eventValues": ["deal.propertyChange"]
        },
        "property": "dealstage",
        "value": "closedwon"
      }
    },
    {
      "name": "Format Message",
      "type": "n8n-nodes-base.set",
      "parameters": {
        "values": {
          "message": "🎉 *DEAL CLOSED!*\n\n🏢 {{$json.company}}\n💰 ${{$json.amount}}"
        }
      }
    },
    {
      "name": "Slack",
      "type": "n8n-nodes-base.slack",
      "parameters": {
        "channel": "#wins",
        "text": "={{$json.message}}"
      }
    }
  ]
}
```

## Sample Output

```
🎉 *DEAL CLOSED!*

━━━━━━━━━━━━━━━━━━━━━━

🏢 *Company:* Acme Corporation
💰 *Value:* $45,000
👤 *Sales Rep:* @alice.chen
📦 *Product:* Enterprise Plan

━━━━━━━━━━━━━━━━━━━━━━

*Deal Summary:*
• Sales cycle: 45 days
• Lead source: Inbound - Website
• Industry: Technology

🎊 Congrats to the team!
```
```

---

*Slack Workflows Skill - Part of Claude Office Skills*
