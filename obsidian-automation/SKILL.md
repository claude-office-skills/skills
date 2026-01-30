---
name: Obsidian Automation
description: Automate Obsidian knowledge management, note linking, and personal knowledge base workflows
version: 1.0.0
author: Claude Office Skills
category: productivity
tags:
  - obsidian
  - notes
  - knowledge-management
  - markdown
  - pkm
department: content
models:
  - claude-3-opus
  - claude-3-sonnet
  - gpt-4
mcp:
  server: notes-mcp
  tools:
    - obsidian_create_note
    - obsidian_search
    - obsidian_link
    - obsidian_template
capabilities:
  - Note creation
  - Knowledge linking
  - Template application
  - Graph exploration
input:
  - Note content
  - Search queries
  - Template configurations
  - Link patterns
output:
  - Created notes
  - Linked knowledge
  - Search results
  - Graph insights
languages:
  - en
related_skills:
  - notion-automation
  - deep-research
  - meeting-notes
---

# Obsidian Automation

Automate Obsidian knowledge management and personal knowledge base workflows.

## Core Capabilities

### Note Creation
```yaml
note_templates:
  daily_note:
    filename: "{{date:YYYY-MM-DD}}"
    folder: "Daily Notes"
    template: |
      # {{date:dddd, MMMM D, YYYY}}
      
      ## Morning Intentions
      - [ ] 
      
      ## Tasks
      - [ ] 
      
      ## Notes
      
      ## Evening Reflection
      
      ---
      [[{{date:YYYY-MM-DD|-1d}}|← Yesterday]] | [[{{date:YYYY-MM-DD|+1d}}|Tomorrow →]]

  meeting_note:
    filename: "Meeting - {{title}} - {{date}}"
    folder: "Meetings"
    template: |
      ---
      date: {{date}}
      attendees: {{attendees}}
      tags: meeting
      ---
      
      # {{title}}
      
      ## Agenda
      
      ## Notes
      
      ## Action Items
      - [ ] 
      
      ## Follow-ups
      
      [[Meetings MOC]]
```

### Smart Linking
```yaml
auto_linking:
  rules:
    - pattern: "[[Person/{{name}}]]"
      trigger: "@{{name}}"
      create_if_missing: true
      
    - pattern: "[[Project/{{project}}]]"
      trigger: "#proj/{{project}}"
      
  backlink_suggestions:
    enabled: true
    min_mentions: 2
    
  alias_support:
    - "[[Machine Learning|ML]]"
    - "[[Artificial Intelligence|AI]]"
```

### Dataview Queries
```yaml
dataview_examples:
  tasks_due_today:
    query: |
      ```dataview
      TASK
      WHERE !completed AND due = date(today)
      SORT due ASC
      ```
      
  recent_meetings:
    query: |
      ```dataview
      TABLE date, attendees
      FROM "Meetings"
      WHERE date >= date(today) - dur(7 days)
      SORT date DESC
      LIMIT 10
      ```
      
  project_dashboard:
    query: |
      ```dataview
      TABLE status, due, priority
      FROM #project
      WHERE status != "completed"
      SORT priority ASC
      ```
```

### Templates
```yaml
templates:
  zettelkasten:
    filename: "{{date:YYYYMMDDHHmmss}}"
    content: |
      ---
      id: {{date:YYYYMMDDHHmmss}}
      tags: 
      links: 
      ---
      
      # {{title}}
      
      ## Idea
      
      ## Source
      
      ## Connections
      - Related to: 
      
      ## References
      
  book_note:
    filename: "Book - {{title}}"
    content: |
      ---
      author: {{author}}
      finished: 
      rating: 
      tags: book
      ---
      
      # {{title}}
      by {{author}}
      
      ## Summary
      
      ## Key Ideas
      
      ## Highlights
      
      ## My Thoughts
      
      ## Action Items
```

## Workflow Automations

### Web Clipper
```yaml
web_clipper:
  trigger: browser_extension
  actions:
    - extract_content:
        title: "{{page.title}}"
        url: "{{page.url}}"
        content: "{{selection}}"
    - create_note:
        folder: "Clippings"
        template: web_clip
    - add_tags: ["web-clip", "{{domain}}"]
```

### Research Workflow
```yaml
research_workflow:
  steps:
    - create_topic_note:
        filename: "Research - {{topic}}"
        folder: "Research"
    - gather_sources:
        search: "{{topic}}"
        link_to_note: true
    - generate_questions:
        based_on: sources
    - create_sub_notes:
        for_each: key_concept
```

## Graph Analysis

```yaml
graph_insights:
  orphan_notes:
    query: "notes without incoming links"
    action: suggest_connections
    
  clusters:
    identify: true
    visualize: true
    
  link_suggestions:
    based_on: content_similarity
    threshold: 0.7
```

## Best Practices

1. **Atomic Notes**: One idea per note
2. **Consistent Naming**: Use conventions
3. **Link Liberally**: Connect related ideas
4. **Daily Practice**: Regular review
5. **Templates**: Standardize note types
6. **Tags vs Links**: Use both strategically
