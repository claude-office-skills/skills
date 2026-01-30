---
name: YouTube Automation
description: Automate YouTube content workflows including video management, analytics, scheduling, and channel optimization
version: 1.0.0
author: Claude Office Skills
category: video
tags:
  - youtube
  - video
  - content
  - analytics
  - automation
department: marketing
models:
  - claude-3-opus
  - claude-3-sonnet
  - gpt-4
mcp:
  server: youtube-mcp
  tools:
    - youtube_upload
    - youtube_update
    - youtube_analytics
    - youtube_comments
capabilities:
  - Video upload and scheduling
  - Metadata optimization
  - Analytics tracking
  - Comment management
input:
  - Video files
  - Metadata (title, description, tags)
  - Thumbnail images
  - Schedule preferences
output:
  - Published videos
  - Analytics reports
  - SEO recommendations
  - Engagement insights
languages:
  - en
  - zh
related_skills:
  - tiktok-marketing
  - social-publisher
  - video-editor
---

# YouTube Automation

Comprehensive skill for automating YouTube channel management and content workflows.

## Core Workflows

### 1. Video Upload Pipeline

```
VIDEO PUBLISHING FLOW:
┌─────────────────┐
│  Video File     │
│  (MP4/MOV)      │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Metadata Prep  │
│  - Title        │
│  - Description  │
│  - Tags         │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Thumbnail      │
│  Upload         │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Schedule/      │
│  Publish        │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Notifications  │
│  & Promotion    │
└─────────────────┘
```

### 2. Video Configuration

```yaml
video_upload:
  file: "video.mp4"
  
  metadata:
    title: "{{title}} | {{channel_name}}"
    description: |
      {{description}}
      
      ⏰ Timestamps:
      {{timestamps}}
      
      🔗 Links:
      {{links}}
      
      📱 Follow us:
      {{social_links}}
      
      #{{tags_hashtags}}
    
    tags:
      - "{{primary_keyword}}"
      - "{{secondary_keywords}}"
      - "{{channel_tags}}"
    
    category: "{{category_id}}"
    language: "en"
    
  settings:
    privacy: "public"  # public, private, unlisted
    made_for_kids: false
    age_restricted: false
    allow_comments: true
    allow_embedding: true
    notify_subscribers: true
    
  monetization:
    enabled: true
    mid_roll_ads: true
    
  schedule:
    publish_at: "2024-01-20T14:00:00Z"
    premiere: false
```

### 3. Thumbnail Guidelines

```yaml
thumbnail_specs:
  dimensions: "1280x720"
  aspect_ratio: "16:9"
  format: ["PNG", "JPG"]
  max_size: "2MB"
  
  best_practices:
    - Use high contrast colors
    - Include readable text (3-5 words)
    - Show faces with expressions
    - Use brand-consistent styling
    - A/B test variations
    
  templates:
    tutorial:
      - Software screenshot
      - Text overlay
      - Step number
    
    review:
      - Product image
      - Rating visual
      - Reviewer face
    
    vlog:
      - Expressive face
      - Location context
      - Action shot
```

## SEO Optimization

### Keyword Research

```yaml
seo_strategy:
  primary_keyword:
    placement:
      - title_start
      - description_first_line
      - first_tag
    research_tools:
      - YouTube Search Suggest
      - TubeBuddy
      - VidIQ
      - Google Trends
  
  title_formula:
    patterns:
      - "How to {{action}} {{keyword}} ({{year}})"
      - "{{number}} {{keyword}} Tips for {{audience}}"
      - "{{keyword}} Tutorial for Beginners"
      - "{{keyword}} vs {{competitor}} - Which is Better?"
    
    best_practices:
      - Front-load keywords
      - 60 characters max
      - Include power words
      - Add brackets/parentheses
  
  description_structure:
    - Hook (first 150 chars - visible in search)
    - Keywords naturally integrated
    - Timestamps
    - Links and CTAs
    - Hashtags (3-5 max)
```

### Tag Strategy

```yaml
tag_strategy:
  order:
    1: exact_match_keyword
    2: broad_match_keyword
    3: related_keywords
    4: channel_tags
    5: long_tail_variations
  
  example:
    video_topic: "Python Tutorial"
    tags:
      - "python tutorial"
      - "python tutorial for beginners"
      - "learn python"
      - "python programming"
      - "python crash course"
      - "coding tutorial"
      - "programming for beginners"
      - "{{channel_name}}"
  
  avoid:
    - Irrelevant tags
    - Competitor channel names
    - Misleading tags
    - Excessive tags (>15)
```

## Analytics Dashboard

### Channel Overview

```
CHANNEL ANALYTICS - LAST 28 DAYS
═══════════════════════════════════════

Views:         125,400 (+15.2%)
Watch Time:    8,250 hours (+12.8%)
Subscribers:   +2,340 (+8.5%)
Revenue:       $3,450 (+18.3%)

TOP PERFORMING VIDEOS:
┌─────────────────────────┬────────┬─────────┐
│ Video                   │ Views  │ CTR     │
├─────────────────────────┼────────┼─────────┤
│ Python Basics Tutorial  │ 45,200 │ 8.5%    │
│ VS Code Setup Guide     │ 32,100 │ 7.2%    │
│ Git for Beginners       │ 28,500 │ 6.8%    │
└─────────────────────────┴────────┴─────────┘

TRAFFIC SOURCES:
YouTube Search    ████████████░░░░ 45%
Suggested Videos  ██████████░░░░░░ 35%
External          ████░░░░░░░░░░░░ 12%
Browse Features   ██░░░░░░░░░░░░░░ 8%
```

### Video Performance Metrics

```yaml
video_metrics:
  engagement:
    - views
    - watch_time
    - average_view_duration
    - average_percentage_viewed
    
  discovery:
    - impressions
    - click_through_rate
    - search_ranking
    
  interaction:
    - likes
    - comments
    - shares
    - subscribers_gained
    
  retention:
    - audience_retention_curve
    - relative_retention
    - drop_off_points
    
  revenue:
    - estimated_revenue
    - cpm
    - rpm
```

## Content Calendar

### Publishing Schedule

```yaml
content_calendar:
  weekly_schedule:
    monday:
      type: tutorial
      time: "14:00 UTC"
      duration: "15-20 min"
    
    wednesday:
      type: tips_tricks
      time: "14:00 UTC"
      duration: "8-12 min"
    
    friday:
      type: project_walkthrough
      time: "16:00 UTC"
      duration: "20-30 min"
  
  content_pillars:
    - Tutorials (40%)
    - Tips & Tricks (25%)
    - Tool Reviews (20%)
    - Industry News (15%)
```

### Batch Production

```yaml
batch_workflow:
  recording_day: saturday
  videos_per_session: 4
  
  pre_production:
    - Research topics
    - Write scripts
    - Prepare demos
    - Set up equipment
  
  production:
    - Record intros
    - Record main content
    - Record outros
    - B-roll footage
  
  post_production:
    - Edit videos
    - Create thumbnails
    - Write descriptions
    - Schedule uploads
```

## Comment Management

### Auto-Response Rules

```yaml
comment_automation:
  positive_comments:
    keywords: ["great", "helpful", "thanks", "awesome"]
    actions:
      - heart_comment
      - pin_if_high_engagement
  
  questions:
    keywords: ["how", "what", "where", "?"]
    actions:
      - flag_for_response
      - auto_reply_common_questions
  
  spam_detection:
    patterns:
      - urls_in_new_accounts
      - repeated_comments
      - promotional_language
    actions:
      - hold_for_review
      - auto_remove_if_confidence_high
  
  engagement_prompts:
    triggers:
      - milestone_views
      - subscriber_growth
    actions:
      - pin_cta_comment
      - ask_question
```

### Community Management

```yaml
community:
  engagement_strategy:
    - Reply to comments within 24 hours
    - Heart valuable comments
    - Pin best comments
    - Create community posts
    
  community_posts:
    types:
      - polls
      - behind_the_scenes
      - video_teasers
      - questions
    frequency: "2-3 per week"
```

## Playlist Management

### Playlist Structure

```yaml
playlists:
  - name: "Python for Beginners"
    description: "Complete Python programming course"
    ordering: manual
    visibility: public
    videos:
      - "Introduction to Python"
      - "Variables and Data Types"
      - "Control Flow"
      - "Functions"
      - "OOP Basics"
  
  - name: "Quick Tips"
    description: "Short coding tips under 5 minutes"
    ordering: newest_first
    visibility: public
    auto_add:
      tag: "quick_tip"
```

## Integration Workflows

### Cross-Platform Publishing

```yaml
cross_platform:
  on_video_publish:
    - create_short_clip: true
    - post_to_twitter:
        include_link: true
        include_thumbnail: true
    - post_to_linkedin:
        include_link: true
    - notify_discord:
        channel: "#new-videos"
    - update_website:
        embed_video: true
        create_blog_post: true
```

### Email Integration

```yaml
email_automation:
  on_video_publish:
    - send_to_subscribers:
        template: "new_video"
        delay: "1 hour"
    - update_newsletter:
        include_in_next: true
```

## Best Practices

1. **Consistency**: Post on regular schedule
2. **Thumbnails**: Invest time in eye-catching thumbnails
3. **First 30 Seconds**: Hook viewers early
4. **End Screens**: Promote other videos and subscribe
5. **Cards**: Link to related content
6. **Descriptions**: Detailed with timestamps and links
7. **Engagement**: Respond to comments
8. **Analytics**: Review and iterate based on data
