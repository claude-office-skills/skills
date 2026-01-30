---
name: Facebook/Meta Ads
description: Automate Facebook and Instagram advertising campaigns, audience targeting, and performance optimization
version: 1.0.0
author: Claude Office Skills
category: advertising
tags:
  - facebook
  - meta
  - instagram
  - ads
  - marketing
department: marketing
models:
  - claude-3-opus
  - claude-3-sonnet
  - gpt-4
mcp:
  server: ads-mcp
  tools:
    - meta_ads_create
    - meta_ads_report
    - meta_audience
    - meta_pixel
capabilities:
  - Campaign management
  - Audience targeting
  - Ad creative optimization
  - Performance reporting
input:
  - Campaign objectives
  - Target audiences
  - Ad creatives
  - Budget settings
output:
  - Campaign performance
  - Audience insights
  - ROAS reports
  - Optimization recommendations
languages:
  - en
related_skills:
  - google-ads-manager
  - tiktok-marketing
  - ads-copywriter
---

# Facebook/Meta Ads

Comprehensive skill for automating Facebook and Instagram advertising.

## Core Workflows

### 1. Campaign Structure

```
META ADS HIERARCHY:
┌─────────────────────────────────────────────────────────┐
│ 🎯 CAMPAIGN (Objective)                                 │
│    Goal: Conversions, Traffic, Awareness, etc.         │
├─────────────────────────────────────────────────────────┤
│   ├── 📊 AD SET 1 (Audience + Budget)                  │
│   │   ├── Audience: Lookalike 1%                       │
│   │   ├── Budget: $50/day                              │
│   │   ├── Placement: Feed + Stories                    │
│   │   │                                                 │
│   │   ├── 📝 Ad 1: Image + Copy A                      │
│   │   ├── 📝 Ad 2: Video + Copy A                      │
│   │   └── 📝 Ad 3: Carousel + Copy B                   │
│   │                                                     │
│   └── 📊 AD SET 2 (Different Audience)                 │
│       ├── Audience: Interest Targeting                 │
│       ├── Budget: $30/day                              │
│       │                                                 │
│       ├── 📝 Ad 4: Image + Copy A                      │
│       └── 📝 Ad 5: Video + Copy B                      │
└─────────────────────────────────────────────────────────┘
```

### 2. Campaign Objectives

```yaml
campaign_objectives:
  awareness:
    - brand_awareness
    - reach
    
  consideration:
    - traffic
    - engagement
    - app_installs
    - video_views
    - lead_generation
    - messages
    
  conversion:
    - conversions
    - catalog_sales
    - store_traffic
```

## Audience Targeting

### Custom Audiences

```yaml
custom_audiences:
  website_visitors:
    source: pixel
    rules:
      - event: ViewContent
        retention_days: 30
        
  email_list:
    source: customer_file
    file: "customers.csv"
    mapping:
      - email
      - phone
      - first_name
      - last_name
      
  video_viewers:
    source: engagement
    video_id: "123456"
    watched_percentage: 75
    retention_days: 365
    
  page_engagers:
    source: page
    actions:
      - liked_page
      - commented
      - shared
    retention_days: 90
```

### Lookalike Audiences

```yaml
lookalike_audiences:
  - name: "High Value Lookalike 1%"
    source: purchasers_180d
    country: "US"
    percentage: 1
    
  - name: "Leads Lookalike 2%"
    source: lead_form_submitters
    country: "US"
    percentage: 2
    
  - name: "Engagers Lookalike 3%"
    source: page_engagers
    country: ["US", "CA", "UK"]
    percentage: 3
```

### Interest Targeting

```yaml
interest_targeting:
  detailed_targeting:
    interests:
      - "Online shopping"
      - "E-commerce"
      - "Fashion"
      
    behaviors:
      - "Engaged shoppers"
      - "Online buyers"
      
    demographics:
      age: [25, 54]
      gender: all
      
  exclusions:
    custom_audiences:
      - existing_customers
    interests:
      - competitors
```

## Ad Creative

### Ad Formats

```yaml
ad_formats:
  single_image:
    image_specs:
      ratio: "1:1"
      size: "1080x1080"
      format: ["jpg", "png"]
    text:
      primary: 125 chars
      headline: 40 chars
      description: 30 chars
      
  video:
    specs:
      ratio: ["1:1", "4:5", "9:16"]
      duration: "15-60 seconds"
      format: ["mp4", "mov"]
    text:
      primary: 125 chars
      headline: 40 chars
      
  carousel:
    cards: [2, 10]
    specs:
      ratio: "1:1"
      size: "1080x1080"
    features:
      - swipeable
      - deep_links
      
  collection:
    cover: video_or_image
    products: 4
    instant_experience: required
```

### Creative Testing

```yaml
creative_testing:
  strategy: dynamic_creative
  
  assets:
    images:
      - "lifestyle_1.jpg"
      - "product_1.jpg"
      - "ugc_1.jpg"
      
    videos:
      - "hero_15s.mp4"
      - "testimonial_30s.mp4"
      
    headlines:
      - "Shop the Sale"
      - "Limited Time Offer"
      - "Free Shipping Today"
      
    primary_text:
      - "Discover our best-selling products..."
      - "Join thousands of happy customers..."
      
    cta:
      - SHOP_NOW
      - LEARN_MORE
      - GET_OFFER
      
  optimization:
    goal: conversions
    auto_optimize: true
```

## Budget & Bidding

### Budget Strategies

```yaml
budget_config:
  campaign_budget_optimization:
    enabled: true
    daily_budget: 200
    
  ad_set_budgets:
    - ad_set: "prospecting"
      allocation: 60%
    - ad_set: "retargeting"
      allocation: 40%
      
  bid_strategy:
    type: lowest_cost  # or cost_cap, bid_cap
    
  scheduling:
    start_time: "2024-01-15T00:00:00"
    end_time: "2024-01-31T23:59:59"
    dayparting:
      enabled: true
      hours: [8, 22]  # 8 AM - 10 PM
```

### Automated Rules

```yaml
automated_rules:
  - name: "Pause Low Performers"
    conditions:
      - metric: cpa
        operator: greater_than
        value: 50
      - metric: spend
        operator: greater_than
        value: 100
    action:
      type: pause_ad
      notification: email
      
  - name: "Scale Winners"
    conditions:
      - metric: roas
        operator: greater_than
        value: 3
      - metric: impressions
        operator: greater_than
        value: 1000
    action:
      type: increase_budget
      value: 20%
      max_budget: 500
      
  - name: "Ad Fatigue Alert"
    conditions:
      - metric: frequency
        operator: greater_than
        value: 3
    action:
      type: notification
      channel: slack
```

## Pixel & Tracking

### Pixel Events

```yaml
pixel_events:
  standard_events:
    - PageView
    - ViewContent
    - AddToCart
    - InitiateCheckout
    - Purchase
    - Lead
    - CompleteRegistration
    
  custom_events:
    - name: "ProductViewed"
      parameters:
        content_ids: ["SKU123"]
        content_type: "product"
        value: 29.99
        currency: "USD"
        
  conversions_api:
    enabled: true
    events:
      - Purchase
      - Lead
    deduplication: true
```

### Attribution Settings

```yaml
attribution:
  window:
    click: 7_days
    view: 1_day
    
  model: data_driven  # or last_touch
  
  conversion_events:
    - name: "Purchase"
      value_optimization: true
    - name: "Lead"
      value_optimization: false
```

## Analytics Dashboard

```
META ADS PERFORMANCE - LAST 7 DAYS
═══════════════════════════════════════

SPEND: $2,450
RESULTS: 156 purchases
CPA: $15.70
ROAS: 4.2x

BY CAMPAIGN:
┌────────────────────┬─────────┬────────┬───────┐
│ Campaign           │ Spend   │ Conv.  │ ROAS  │
├────────────────────┼─────────┼────────┼───────┤
│ Prospecting - LAL  │ $1,200  │ 68     │ 3.8x  │
│ Retargeting - Cart │ $450    │ 52     │ 6.2x  │
│ Retargeting - View │ $350    │ 24     │ 4.5x  │
│ Brand Awareness    │ $450    │ 12     │ 2.1x  │
└────────────────────┴─────────┴────────┴───────┘

BY PLACEMENT:
Feed        ████████████████ 62%
Stories     ████████░░░░░░░░ 24%
Reels       ████░░░░░░░░░░░░ 10%
Audience Net ██░░░░░░░░░░░░░░ 4%

TOP CREATIVE:
1. Video testimonial: 4.8x ROAS
2. Carousel product: 4.2x ROAS
3. Static lifestyle: 3.5x ROAS
```

## API Examples

### Create Campaign

```javascript
// Create Campaign
const campaign = await fb.api('/act_123/campaigns', 'POST', {
  name: 'Q1 Prospecting',
  objective: 'CONVERSIONS',
  status: 'PAUSED',
  special_ad_categories: []
});

// Create Ad Set
const adSet = await fb.api('/act_123/adsets', 'POST', {
  name: 'LAL 1% - US',
  campaign_id: campaign.id,
  optimization_goal: 'OFFSITE_CONVERSIONS',
  billing_event: 'IMPRESSIONS',
  bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
  daily_budget: 5000, // cents
  targeting: {
    geo_locations: { countries: ['US'] },
    custom_audiences: [{ id: 'lookalike_id' }]
  },
  promoted_object: {
    pixel_id: 'pixel_123',
    custom_event_type: 'PURCHASE'
  }
});

// Create Ad
const ad = await fb.api('/act_123/ads', 'POST', {
  name: 'Video Ad - Copy A',
  adset_id: adSet.id,
  creative: {
    creative_id: 'creative_123'
  },
  status: 'PAUSED'
});
```

## Best Practices

1. **Test Audiences**: Start broad, then refine
2. **Creative Diversity**: Test multiple formats
3. **Pixel Accuracy**: Verify tracking setup
4. **Budget Allocation**: 70% prospecting, 30% retargeting
5. **Frequency Cap**: Watch for ad fatigue
6. **Mobile First**: Design for mobile experience
7. **A/B Testing**: Systematic creative tests
8. **Attribution**: Understand your customer journey
