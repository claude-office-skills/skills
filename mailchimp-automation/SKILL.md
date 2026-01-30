---
name: Mailchimp Automation
description: Automate Mailchimp email marketing campaigns, audience management, automations, and analytics
version: 1.0.0
author: Claude Office Skills
category: marketing
tags:
  - mailchimp
  - email-marketing
  - campaigns
  - automation
  - newsletters
department: marketing
models:
  - claude-3-opus
  - claude-3-sonnet
  - gpt-4
mcp:
  server: email-mcp
  tools:
    - mailchimp_campaign
    - mailchimp_audience
    - mailchimp_automation
    - mailchimp_reports
capabilities:
  - Campaign creation
  - Audience segmentation
  - Automated workflows
  - A/B testing
input:
  - Campaign content
  - Audience lists
  - Automation triggers
  - Segment criteria
output:
  - Sent campaigns
  - Engagement reports
  - Audience insights
  - Revenue attribution
languages:
  - en
related_skills:
  - email-marketing
  - customer-success
  - social-publisher
---

# Mailchimp Automation

Comprehensive skill for automating Mailchimp email marketing and audience management.

## Core Workflows

### 1. Campaign Pipeline

```
EMAIL CAMPAIGN FLOW:
┌─────────────────┐
│  Plan Campaign  │
│  - Goals        │
│  - Audience     │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Create Content │
│  - Design       │
│  - Copy         │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Configure      │
│  - Subject      │
│  - Preview      │
│  - Settings     │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Test & Review  │
│  - A/B test     │
│  - Preview      │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Schedule/Send  │
│  - Timing       │
│  - Send         │
└────────┬────────┘
         ▼
┌─────────────────┐
│    Analyze      │
│  - Opens/Clicks │
│  - Revenue      │
└─────────────────┘
```

### 2. Campaign Configuration

```yaml
campaign_config:
  type: regular  # regular, automated, plaintext, ab_test
  
  recipients:
    list_id: "abc123"
    segment_opts:
      saved_segment_id: "seg123"
      # or dynamic conditions
      
  settings:
    subject_line: "{{subject}}"
    preview_text: "{{preview}}"
    from_name: "{{company}}"
    reply_to: "{{email}}"
    
  tracking:
    opens: true
    clicks: true
    ecommerce: true
    google_analytics: "campaign_name"
    
  content_type: "template"
  template_id: "template_123"
```

## Audience Management

### Segmentation Rules

```yaml
segments:
  - name: active_subscribers
    conditions:
      - field: last_opened
        op: greater_than
        value: "30_days_ago"
        
  - name: high_value_customers
    conditions:
      - field: ecomm_total_spent
        op: greater_than
        value: 500
      - field: ecomm_orders
        op: greater_than
        value: 3
        
  - name: at_risk
    conditions:
      - field: last_opened
        op: greater_than
        value: "90_days_ago"
      - field: email_campaigns_opened
        op: greater_than
        value: 5
        
  - name: new_subscribers
    conditions:
      - field: timestamp_signup
        op: greater_than
        value: "30_days_ago"
```

### Audience Tags

```yaml
tagging_automation:
  - trigger: form_submit
    form: "newsletter_signup"
    actions:
      - add_tag: "newsletter"
      - add_tag: "{{form.interest}}"
      
  - trigger: purchase
    actions:
      - add_tag: "customer"
      - add_tag: "purchased_{{product_category}}"
      
  - trigger: link_clicked
    url_contains: "/pricing"
    actions:
      - add_tag: "interested_in_pricing"
```

## Email Automation

### Welcome Series

```yaml
welcome_automation:
  name: "Welcome Series"
  trigger:
    type: signup
    list_id: "main_list"
    
  emails:
    - delay: immediate
      subject: "Welcome to {{company}}! 🎉"
      template: welcome_email_1
      
    - delay: 2_days
      subject: "Here's how to get started"
      template: welcome_email_2
      
    - delay: 5_days
      subject: "{{first_name}}, your exclusive tips"
      template: welcome_email_3
      
    - delay: 10_days
      subject: "Ready to take the next step?"
      template: welcome_email_4
      content: offer_cta
```

### Abandoned Cart

```yaml
abandoned_cart:
  name: "Cart Recovery"
  trigger:
    type: ecommerce
    event: cart_abandoned
    delay: 1_hour
    
  emails:
    - delay: 1_hour
      subject: "You left something behind..."
      template: cart_reminder_1
      show_cart_items: true
      
    - delay: 24_hours
      condition: cart_not_recovered
      subject: "Your cart is waiting"
      template: cart_reminder_2
      include_discount: false
      
    - delay: 72_hours
      condition: cart_not_recovered
      subject: "Last chance: 10% off your cart"
      template: cart_reminder_3
      include_discount: true
      discount_code: "COMEBACK10"
```

### Post-Purchase

```yaml
post_purchase:
  name: "Post-Purchase Nurture"
  trigger:
    type: ecommerce
    event: purchase
    
  emails:
    - delay: immediate
      type: transactional
      subject: "Order confirmed #{{order_id}}"
      template: order_confirmation
      
    - delay: 3_days
      type: transactional
      subject: "Your order has shipped"
      template: shipping_notification
      condition: order_shipped
      
    - delay: 7_days
      subject: "How's your {{product_name}}?"
      template: review_request
      condition: order_delivered
      
    - delay: 30_days
      subject: "You might also like..."
      template: cross_sell
      content: recommended_products
```

## A/B Testing

### Test Configuration

```yaml
ab_test:
  type: subject_line  # or content, send_time, from_name
  
  variants:
    a:
      subject: "Don't miss out: Sale ends tonight"
    b:
      subject: "⚡ Flash sale: 24 hours only"
      
  test_settings:
    split_percentage: 20  # Test on 20%, winner to 80%
    winning_metric: open_rate  # or click_rate, revenue
    wait_time: 4_hours
    
  auto_winner:
    enabled: true
    send_remaining: true
```

### Multivariate Test

```yaml
multivariate_test:
  factors:
    subject_line:
      - "New arrivals just dropped"
      - "You'll love what's new"
    preview_text:
      - "Shop the latest styles"
      - "See what's trending now"
    send_time:
      - "09:00"
      - "14:00"
      
  combinations: 8
  sample_size: 25%
  duration: 24_hours
```

## Email Templates

### Newsletter Template

```yaml
newsletter_template:
  layout: multi_column
  
  sections:
    - type: header
      logo: "{{logo_url}}"
      navigation: true
      
    - type: hero
      image: "{{hero_image}}"
      headline: "{{headline}}"
      subheadline: "{{subheadline}}"
      cta:
        text: "{{cta_text}}"
        url: "{{cta_url}}"
        
    - type: content_blocks
      columns: 2
      items:
        - image: "{{item1_image}}"
          title: "{{item1_title}}"
          description: "{{item1_desc}}"
          link: "{{item1_url}}"
          
    - type: footer
      social_links: true
      unsubscribe: true
      company_address: true
```

### Personalization

```yaml
personalization:
  merge_tags:
    - "*|FNAME|*": first_name
    - "*|LNAME|*": last_name
    - "*|EMAIL|*": email
    - "*|COMPANY|*": company
    
  conditional_content:
    - condition: "*|IF:VIP|*"
      content: "As a VIP member, you get early access!"
      
  dynamic_content:
    - tag: "*|PRODUCT_RECS|*"
      source: ecommerce
      type: recommended_products
      limit: 4
```

## Analytics Dashboard

### Campaign Performance

```
CAMPAIGN ANALYTICS - "January Newsletter"
═══════════════════════════════════════

DELIVERY:
Sent:          25,430
Delivered:     24,892 (97.9%)
Bounced:       538 (2.1%)

ENGAGEMENT:
Opened:        8,450 (33.9%)
Clicked:       2,156 (8.7%)
Unsubscribed:  45 (0.18%)

REVENUE (if e-commerce):
Orders:        89
Revenue:       $4,523
Revenue/Email: $0.18

BY DEVICE:
Desktop   ████████████████ 52%
Mobile    ██████████░░░░░░ 38%
Tablet    ███░░░░░░░░░░░░░ 10%

TOP CLICKED LINKS:
┌────────────────────────┬────────┐
│ Link                   │ Clicks │
├────────────────────────┼────────┤
│ Main CTA button        │ 1,245  │
│ Product image 1        │ 456    │
│ "Learn more" link      │ 234    │
│ Social - Twitter       │ 123    │
└────────────────────────┴────────┘

OPEN TIME:
Peak: 10:00 AM - 12:00 PM (42%)
```

### Audience Health

```yaml
audience_metrics:
  total_subscribers: 45,230
  growth_rate: "+3.2% monthly"
  
  health_indicators:
    active_30_days: 78%
    engaged_90_days: 65%
    dormant: 22%
    
  list_quality:
    average_open_rate: 28.5%
    average_click_rate: 4.2%
    unsubscribe_rate: 0.15%
    bounce_rate: 1.8%
```

## API Examples

### Create Campaign

```javascript
// Create Campaign
const campaign = await mailchimp.campaigns.create({
  type: "regular",
  recipients: {
    list_id: "abc123",
    segment_opts: {
      saved_segment_id: "seg123"
    }
  },
  settings: {
    subject_line: "Your Weekly Update",
    preview_text: "This week's top stories",
    from_name: "Company Name",
    reply_to: "hello@company.com"
  }
});

// Set Content
await mailchimp.campaigns.setContent(campaign.id, {
  template: {
    id: "template_123",
    sections: {
      headline: "Welcome to our newsletter!"
    }
  }
});

// Send Campaign
await mailchimp.campaigns.send(campaign.id);
```

### Manage Subscribers

```javascript
// Add Subscriber
await mailchimp.lists.addListMember("list_id", {
  email_address: "user@example.com",
  status: "subscribed",
  merge_fields: {
    FNAME: "John",
    LNAME: "Doe"
  },
  tags: ["newsletter", "customer"]
});

// Update Subscriber
await mailchimp.lists.updateListMember("list_id", "subscriber_hash", {
  merge_fields: {
    COMPANY: "Acme Inc"
  }
});

// Add Tags
await mailchimp.lists.updateListMemberTags("list_id", "subscriber_hash", {
  tags: [{ name: "vip", status: "active" }]
});
```

## Best Practices

1. **Clean Your List**: Remove bounces and inactive
2. **Segment Thoughtfully**: Right message to right people
3. **Test Everything**: Subject lines, content, timing
4. **Mobile First**: Design for mobile readers
5. **Personalize**: Use merge tags and dynamic content
6. **Monitor Metrics**: Track and improve over time
7. **Respect Frequency**: Don't over-send
8. **Comply with Laws**: CAN-SPAM, GDPR
