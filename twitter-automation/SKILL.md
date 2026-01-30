---
name: Twitter/X Automation
description: Automate Twitter/X social media workflows including posting, engagement, analytics, and audience growth
version: 1.0.0
author: Claude Office Skills
category: social-media
tags:
  - twitter
  - x
  - social-media
  - marketing
  - engagement
department: marketing
models:
  - claude-3-opus
  - claude-3-sonnet
  - gpt-4
mcp:
  server: social-mcp
  tools:
    - twitter_post
    - twitter_dm
    - twitter_analytics
    - twitter_search
capabilities:
  - Tweet scheduling
  - Engagement automation
  - Analytics tracking
  - Audience management
input:
  - Tweet content
  - Media files
  - Schedule times
  - Audience segments
output:
  - Posted tweets
  - Engagement metrics
  - Growth reports
  - Trending insights
languages:
  - en
  - multi
related_skills:
  - social-publisher
  - tiktok-marketing
  - ads-copywriter
---

# Twitter/X Automation

Comprehensive skill for automating Twitter/X social media management and growth.

## Core Workflows

### 1. Content Pipeline

```
TWITTER CONTENT FLOW:
┌─────────────────┐
│  Content Ideas  │
│  - Trends       │
│  - Calendar     │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Create Tweet   │
│  - Copy         │
│  - Media        │
│  - Hashtags     │
└────────┬────────┘
         ▼
┌─────────────────┐
│   Schedule      │
│  - Best time    │
│  - Queue        │
└────────┬────────┘
         ▼
┌─────────────────┐
│    Publish      │
│  - Post         │
│  - Thread       │
└────────┬────────┘
         ▼
┌─────────────────┐
│    Engage       │
│  - Reply        │
│  - Retweet      │
└─────────────────┘
```

### 2. Tweet Configuration

```yaml
tweet_config:
  types:
    single:
      max_chars: 280
      media_limit: 4
      
    thread:
      tweets_per_thread: 10  # recommended max
      continuation_style: "numbered"  # or emoji
      
    poll:
      options: 4  # max
      duration_hours: 24
      
  best_practices:
    - Hook in first line
    - Use line breaks
    - Include CTA
    - Optimal hashtags: 1-2
    - Media increases engagement 3x
```

## Content Templates

### Tweet Templates

```yaml
templates:
  announcement:
    format: |
      🚀 {{headline}}
      
      {{details}}
      
      {{cta_link}}
    example: |
      🚀 We just launched our new API!
      
      Build integrations 10x faster with our 
      new developer toolkit.
      
      Check it out: link.co/api
      
  thread_starter:
    format: |
      {{hook}}
      
      A thread 🧵
    example: |
      I spent 10 years building startups.
      
      Here are 10 lessons that took me 
      $1M in mistakes to learn.
      
      A thread 🧵
      
  engagement_hook:
    format: |
      {{question}}
      
      👇 Reply with your answer
    example: |
      What's the best productivity app 
      you discovered this year?
      
      👇 Reply with your answer
      
  tutorial:
    format: |
      How to {{action}} in {{timeframe}}:
      
      Step 1: {{step1}}
      Step 2: {{step2}}
      Step 3: {{step3}}
      
      {{cta}}
```

### Thread Structure

```yaml
thread_template:
  - tweet: 1
    role: hook
    content: |
      {{attention_grabbing_statement}}
      
      A thread 🧵
      
  - tweet: 2-8
    role: body
    content: |
      {{number}}. {{point}}
      
      {{explanation}}
      
  - tweet: 9
    role: summary
    content: |
      TL;DR:
      
      {{key_takeaways}}
      
  - tweet: 10
    role: cta
    content: |
      If you found this helpful:
      
      1. Follow @{{handle}} for more
      2. RT the first tweet
      3. {{specific_cta}}
```

## Scheduling Strategy

### Optimal Posting Times

```yaml
posting_schedule:
  best_times:
    weekday:
      - "08:00"  # Morning commute
      - "12:00"  # Lunch break
      - "17:00"  # End of workday
      - "21:00"  # Evening browsing
    weekend:
      - "10:00"
      - "14:00"
      - "20:00"
      
  frequency:
    minimum: 3  # per day
    optimal: 5-7
    maximum: 15
    
  content_mix:
    original: 60%
    replies: 25%
    retweets: 15%
    
  timezone: "America/New_York"  # Adjust to audience
```

### Content Calendar

```yaml
content_calendar:
  monday:
    theme: "Motivation Monday"
    content_type: inspirational
    
  tuesday:
    theme: "Tutorial Tuesday"
    content_type: educational
    
  wednesday:
    theme: "Wisdom Wednesday"
    content_type: insights
    
  thursday:
    theme: "Throwback/Thread"
    content_type: thread
    
  friday:
    theme: "Fun Friday"
    content_type: casual
    
  weekend:
    theme: "Engagement Focus"
    content_type: questions_polls
```

## Engagement Automation

### Auto-Engagement Rules

```yaml
engagement_rules:
  - name: reply_to_mentions
    trigger: mentioned
    delay: 30_minutes
    action:
      - like_tweet
      - check_sentiment
      - respond_if_question
      
  - name: thank_new_followers
    trigger: new_follower
    conditions:
      - follower_count: "> 100"
      - not_spam_account
    action:
      - send_dm_welcome
      
  - name: engage_with_niche
    schedule: "*/2 * * * *"  # Every 2 hours
    action:
      - search_hashtags: ["#buildinpublic", "#startup"]
      - like_relevant_tweets: 5
      - reply_thoughtfully: 2
```

### DM Automation

```yaml
dm_workflows:
  welcome_sequence:
    trigger: new_follower
    delay: 1_hour
    message: |
      Hey {{name}}! 👋
      
      Thanks for the follow! I share daily tips 
      about {{topic}}.
      
      What's your biggest challenge with {{topic}} 
      right now?
      
  lead_capture:
    trigger: dm_contains
    keywords: ["interested", "learn more", "how"]
    message: |
      Great question! I put together a free guide 
      on exactly that.
      
      Grab it here: {{link}}
      
      Let me know if you have any questions!
```

## Analytics Dashboard

### Performance Metrics

```
TWITTER ANALYTICS - LAST 30 DAYS
═══════════════════════════════════════

OVERVIEW:
Impressions:    1,245,000 (+23%)
Engagements:    45,230 (+18%)
Followers:      +2,340 (+8.5%)
Profile Visits: 12,450 (+15%)

ENGAGEMENT RATE: 3.6% (industry avg: 1.5%)

TOP TWEETS:
┌───────────────────────────────────────────┬──────────┐
│ Tweet                                      │ Impress. │
├───────────────────────────────────────────┼──────────┤
│ "10 lessons from 10 years..." (thread)    │ 245,000  │
│ "The one mistake every founder..."        │ 156,000  │
│ "Here's how we grew to $1M ARR..."        │ 134,000  │
└───────────────────────────────────────────┴──────────┘

BY CONTENT TYPE:
Threads      ██████████████████ 45%
Single       ████████████░░░░░░ 35%
Polls        ████░░░░░░░░░░░░░░ 12%
Replies      ██░░░░░░░░░░░░░░░░ 8%

FOLLOWER GROWTH:
Week 1: +580  █████████████░░░░
Week 2: +620  ██████████████░░░
Week 3: +540  ████████████░░░░░
Week 4: +600  █████████████░░░░
```

### Audience Insights

```yaml
audience_analytics:
  demographics:
    top_countries:
      - US: 45%
      - UK: 12%
      - India: 10%
      - Canada: 8%
    
    interests:
      - Technology: 65%
      - Entrepreneurship: 45%
      - Marketing: 38%
      - Productivity: 32%
      
  active_hours:
    peak: "09:00-12:00 EST"
    secondary: "18:00-21:00 EST"
    
  engagement_patterns:
    most_engaging: threads
    best_day: tuesday
    worst_day: saturday
```

## Growth Strategies

### Growth Automation

```yaml
growth_tactics:
  - name: engage_larger_accounts
    description: "Comment on tweets from accounts with 50k+ followers"
    frequency: daily
    target: 10_interactions
    
  - name: trending_topics
    description: "Post relevant content on trending hashtags"
    trigger: relevant_trend
    max_daily: 3
    
  - name: cross_promotion
    description: "Share Twitter content on other platforms"
    platforms:
      - linkedin
      - newsletter
    frequency: weekly
    
  - name: collaboration
    description: "Engage with peers for mutual growth"
    activities:
      - quote_tweet_exchange
      - thread_mentions
      - twitter_spaces
```

### Hashtag Strategy

```yaml
hashtag_strategy:
  research_tools:
    - native_search
    - trending_topics
    - competitor_analysis
    
  usage:
    per_tweet: 1-2
    placement: end_of_tweet
    
  categories:
    niche:
      - "#buildinpublic"
      - "#indiehackers"
    trending:
      - check_daily
      - relevance_filter
    brand:
      - "#YourBrand"
      - "#ProductName"
```

## API Integration

### Twitter API Examples

```javascript
// Post Tweet
const tweet = await twitter.v2.tweet({
  text: "Hello, Twitter! 🚀",
  poll: {
    duration_minutes: 1440,
    options: ["Option A", "Option B", "Option C"]
  }
});

// Post Thread
const thread = await twitter.v2.tweetThread([
  { text: "This is tweet 1 of a thread 🧵" },
  { text: "This is tweet 2" },
  { text: "This is the final tweet!" }
]);

// Search Tweets
const results = await twitter.v2.search({
  query: "#buildinpublic -is:retweet",
  max_results: 100,
  "tweet.fields": ["created_at", "public_metrics"]
});

// Get Analytics
const metrics = await twitter.v2.userTimeline(userId, {
  "tweet.fields": ["public_metrics"],
  max_results: 100
});
```

## Compliance & Safety

### Content Guidelines

```yaml
compliance:
  rate_limits:
    tweets_per_day: 2400
    dms_per_day: 1000
    follows_per_day: 400
    
  automation_rules:
    - No automated bulk unfollowing
    - No duplicate content posting
    - Authentic engagement only
    - Disclosure for sponsored content
    
  content_warnings:
    - Sensitive media flagging
    - Age-restricted content
    - Misinformation policies
```

## Best Practices

1. **Consistency**: Post daily, maintain voice
2. **Value First**: Give before you ask
3. **Engagement**: Reply to comments quickly
4. **Visuals**: Use images and video
5. **Threads**: Long-form content performs well
6. **Timing**: Post when audience is active
7. **Authenticity**: Be genuine, not salesy
8. **Analytics**: Track and iterate
