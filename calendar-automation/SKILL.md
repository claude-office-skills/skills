---
name: calendar-automation
description: "Google Calendar and Outlook automation - scheduling optimization, meeting workflows, time blocking, and Slack/Sheets integration"
version: "1.0.0"
author: claude-office-skills
license: MIT

category: productivity
tags:
  - calendar
  - scheduling
  - google-calendar
  - outlook
  - automation
department: Operations

models:
  recommended:
    - claude-sonnet-4

mcp:
  server: google-workspace-mcp
  tools:
    - calendar_create_event
    - calendar_list_events
    - calendar_update
    - slack_notify

capabilities:
  - meeting_scheduling
  - time_blocking
  - calendar_sync
  - meeting_prep
  - daily_digest

languages:
  - en
  - zh

related_skills:
  - gmail-workflows
  - meeting-notes
  - task-management
---

# Calendar Automation

Automate Google Calendar and Outlook workflows for meeting management, time blocking, daily digests, and cross-platform synchronization. Based on n8n workflow templates.

## Overview

This skill covers:
- Meeting scheduling automation
- Time blocking strategies
- Daily calendar digests to Slack
- Meeting prep reminders
- Calendar analytics

---

## Core Workflows

### 1. Daily Calendar Digest to Slack

```yaml
workflow: "Morning Calendar Briefing"

schedule: "6:00 AM daily"

steps:
  1. get_today_events:
      calendar: primary
      time_min: today_start
      time_max: today_end
      
  2. categorize_events:
      categories:
        meetings: has_attendees == true
        focus_time: title contains "Focus" OR "Deep Work"
        one_on_ones: title contains "1:1" OR "1-on-1"
        interviews: title contains "Interview"
        
  3. calculate_stats:
      total_meetings: count(meetings)
      total_hours: sum(duration)
      free_time: 8 - total_hours
      back_to_back: count(gap < 15min)
      
  4. format_message:
      template: |
        ☀️ *Good morning! Here's your day:*
        
        📅 *{date}*
        
        *Schedule Overview:*
        • {total_meetings} meetings ({total_hours}h)
        • {free_time}h of free time
        • {back_to_back} back-to-back slots ⚠️
        
        *Today's Events:*
        {event_list}
        
        💡 *Tip:* {daily_tip}
        
  5. send_to_slack:
      channel: "#daily-schedule" or DM
      
  6. log_to_sheets:
      spreadsheet: "Calendar Analytics"
      data: [date, meetings, hours, categories]
```

**Event List Format**:
```
• 9:00 AM - Team Standup (15m) 📞 Zoom
• 10:00 AM - 1:1 with Sarah (30m) 👥
• 11:00 AM - Focus Time (2h) 🧠
• 2:00 PM - Client Call (1h) 🤝 Google Meet
• 4:00 PM - Interview - PM Role (45m) 🎯
```

---

### 2. Meeting Prep Automation

```yaml
workflow: "Meeting Preparation"

trigger:
  type: calendar_event
  time: 1_hour_before_meeting
  filter: has_attendees AND duration >= 30min

steps:
  1. get_meeting_details:
      extract: [title, attendees, description, meeting_link]
      
  2. research_attendees:
      for_each: attendee
      actions:
        - linkedin_lookup: get_title_company
        - crm_lookup: get_past_interactions
        - email_search: recent_threads
        
  3. generate_prep_doc:
      template: |
        # Meeting Prep: {title}
        
        **Time:** {start_time}
        **Duration:** {duration}
        **Link:** {meeting_link}
        
        ## Attendees
        {attendee_profiles}
        
        ## Context
        - Last interaction: {last_meeting_date}
        - Open items: {open_tasks}
        - Recent emails: {email_summary}
        
        ## Suggested Agenda
        {ai_suggested_agenda}
        
        ## Talking Points
        {ai_talking_points}
        
  4. send_reminder:
      slack_dm:
        message: |
          ⏰ Meeting in 1 hour: *{title}*
          
          📋 [Prep Doc]({prep_doc_link})
          🔗 [Join Meeting]({meeting_link})
          
          Quick context: {one_line_summary}
```

---

### 3. Smart Time Blocking

```yaml
workflow: "Auto Time Blocking"

schedule: "Sunday 8pm" # Plan for next week

steps:
  1. analyze_calendar:
      range: next_7_days
      identify:
        - existing_meetings
        - recurring_meetings
        - available_slots
        
  2. get_priorities:
      source: [todoist, asana, notion]
      filter: due_this_week AND high_priority
      
  3. allocate_focus_time:
      rules:
        - morning_block: 9-11am (deep work)
        - afternoon_block: 2-4pm (collaborative)
        - minimum_gap: 15min between meetings
        - max_meetings_per_day: 5
        
  4. create_blocks:
      types:
        deep_work:
          duration: 2h
          frequency: daily
          preferred_time: 9-11am
          color: blue
          
        admin_time:
          duration: 1h
          frequency: daily
          preferred_time: 4-5pm
          color: gray
          
        buffer:
          duration: 15min
          after: external_meetings
          color: yellow
          
  5. notify:
      slack: "✅ Weekly time blocks created. {x} hours of focus time protected."
```

---

### 4. Calendly → Calendar + CRM

```yaml
workflow: "Calendly Booking Handler"

trigger:
  type: calendly
  event: booking_created

steps:
  1. get_booking_details:
      extract: [invitee, event_type, scheduled_time, answers]
      
  2. enrich_contact:
      clearbit: lookup_by_email
      linkedin: get_profile
      
  3. create_calendar_event:
      google_calendar:
        title: "{event_type} with {invitee_name}"
        time: scheduled_time
        description: |
          **Booked via Calendly**
          
          Name: {invitee_name}
          Email: {invitee_email}
          Company: {company}
          
          **Pre-meeting questions:**
          {calendly_answers}
        attendees: [invitee_email, owner_email]
        reminders: [1_day, 1_hour, 15_min]
        
  4. update_crm:
      hubspot:
        create_or_update_contact:
          email: invitee_email
          properties:
            last_meeting_booked: scheduled_time
            meeting_type: event_type
        create_engagement:
          type: MEETING
          timestamp: scheduled_time
          
  5. send_confirmation:
      email:
        to: invitee_email
        template: meeting_confirmation
        include: [calendar_invite, prep_questions]
        
  6. notify_slack:
      channel: "#meetings"
      message: "📅 New booking: {event_type} with {invitee_name} on {date}"
```

---

### 5. Calendar Analytics

```yaml
analytics_workflow:
  name: "Weekly Calendar Report"
  schedule: "Friday 5pm"
  
  metrics:
    time_distribution:
      - meetings_total_hours
      - focus_time_hours
      - admin_time_hours
      - 1on1_time_hours
      
    meeting_quality:
      - avg_meeting_length
      - back_to_back_count
      - meetings_with_agenda
      - external_vs_internal
      
    productivity:
      - longest_focus_block
      - fragmentation_score
      - after_hours_meetings
      
  output:
    format: markdown
    destinations: [slack, google_sheets]
    
  report_template: |
    # 📊 Weekly Calendar Analytics
    
    ## Time Distribution
    | Category | Hours | % of Week |
    |----------|-------|-----------|
    | Meetings | {meetings_hours} | {meetings_pct}% |
    | Focus Time | {focus_hours} | {focus_pct}% |
    | Admin | {admin_hours} | {admin_pct}% |
    | Available | {available_hours} | {available_pct}% |
    
    ## Meeting Insights
    - Total meetings: {total_meetings}
    - Average length: {avg_length} min
    - Back-to-back: {b2b_count} ({b2b_pct}%)
    - With agenda: {agenda_pct}%
    
    ## Productivity Score
    🎯 **{productivity_score}/100**
    
    - Longest focus block: {longest_focus}
    - Meeting fragmentation: {fragmentation}
    - After-hours: {after_hours_count}
    
    ## Recommendations
    {ai_recommendations}
```

---

## Time Blocking Templates

### Maker Schedule (Individual Contributor)
```
┌─────────────────────────────────────┐
│ 9:00 - 11:00  │ Deep Work Block 1  │
├─────────────────────────────────────┤
│ 11:00 - 11:30 │ Email/Slack        │
├─────────────────────────────────────┤
│ 11:30 - 12:30 │ Meetings Window    │
├─────────────────────────────────────┤
│ 12:30 - 1:30  │ Lunch              │
├─────────────────────────────────────┤
│ 1:30 - 3:30   │ Deep Work Block 2  │
├─────────────────────────────────────┤
│ 3:30 - 4:00   │ Buffer/Admin       │
├─────────────────────────────────────┤
│ 4:00 - 5:00   │ Meetings Window    │
├─────────────────────────────────────┤
│ 5:00 - 5:30   │ Daily Wrap-up      │
└─────────────────────────────────────┘
```

### Manager Schedule
```
┌─────────────────────────────────────┐
│ 8:00 - 8:30   │ Daily Planning     │
├─────────────────────────────────────┤
│ 8:30 - 9:00   │ Team Standup       │
├─────────────────────────────────────┤
│ 9:00 - 12:00  │ 1:1s / Meetings    │
├─────────────────────────────────────┤
│ 12:00 - 1:00  │ Lunch              │
├─────────────────────────────────────┤
│ 1:00 - 2:00   │ Focus Time         │
├─────────────────────────────────────┤
│ 2:00 - 5:00   │ Meetings           │
├─────────────────────────────────────┤
│ 5:00 - 5:30   │ Email/Wrap-up      │
└─────────────────────────────────────┘
```

---

## Output Example

**Request**: "Set up daily calendar digest for my Slack"

**Output**:

```markdown
# Daily Calendar Digest Setup

## Workflow Configuration

```yaml
name: "Morning Calendar Briefing"
schedule: "6:00 AM weekdays"
timezone: "Asia/Shanghai"

trigger:
  type: cron
  expression: "0 6 * * 1-5"

actions:
  1. fetch_events:
      calendar: primary
      date: today
      
  2. send_slack:
      channel: "@you" # or #your-channel
```

## Sample Output

```
☀️ Good morning! Here's your Thursday:

📅 January 30, 2026

━━━━━━━━━━━━━━━━━━━━━━

📊 Overview:
• 5 meetings (4.5h)
• 3.5h free time
• 1 back-to-back warning ⚠️

━━━━━━━━━━━━━━━━━━━━━━

🗓️ Schedule:

9:00 AM │ Team Standup (15m)
        │ 📞 Google Meet
        │
10:00 AM │ 1:1 with Sarah (30m)
         │ 👥 Conference Room B
         │
11:00 AM │ 🧠 Focus Time (2h)
         │ 
1:00 PM │ Lunch
        │
2:00 PM │ Client Call - Acme (1h)
        │ 🤝 Zoom (link attached)
        │
3:30 PM │ Product Review (1h)
        │ 📋 Agenda attached
        │
5:00 PM │ ✅ Day ends

━━━━━━━━━━━━━━━━━━━━━━

💡 Tip: You have 2h of focus time - tackle your highest priority task!
```

## n8n Setup Instructions

1. Create new workflow
2. Add Schedule Trigger node (6am weekdays)
3. Add Google Calendar node (Get Events)
4. Add Code node (format message)
5. Add Slack node (send message)
6. Activate workflow

Would you like me to generate the full n8n workflow JSON?
```

---

*Calendar Automation Skill - Part of Claude Office Skills*
