---
name: email-marketing
description: "Email marketing automation - campaign creation, sequence building, A/B testing, deliverability optimization, and analytics"
version: "1.0.0"
author: claude-office-skills
license: MIT

category: marketing
tags:
  - email
  - marketing-automation
  - newsletters
  - drip-campaigns
  - mailchimp
department: Marketing

models:
  recommended:
    - claude-sonnet-4
    - claude-opus-4

mcp:
  server: email-mcp
  tools:
    - mailchimp_send
    - sendgrid_campaign
    - klaviyo_flow

capabilities:
  - campaign_creation
  - sequence_building
  - ab_testing
  - segmentation
  - deliverability

languages:
  - en
  - zh

related_skills:
  - email-drafter
  - crm-automation
  - content-writer
---

# Email Marketing

Comprehensive email marketing skill covering campaign creation, automated sequences, A/B testing, segmentation, and deliverability optimization.

## Overview

This skill covers:
- Email campaign creation and templates
- Automated drip sequences
- A/B testing frameworks
- List segmentation strategies
- Deliverability best practices

---

## Email Types & Templates

### 1. Welcome Sequence

```yaml
sequence: "Welcome Series"
trigger: subscriber_signup
duration: 14_days

emails:
  - day_0:
      subject: "Welcome to {Brand} 🎉"
      goal: deliver_lead_magnet + set_expectations
      template: |
        Hi {first_name},
        
        Welcome to {Brand}! Here's your [free resource].
        
        Over the next 2 weeks, I'll share:
        • {benefit_1}
        • {benefit_2}
        • {benefit_3}
        
        First up: [teaser for email 2]
        
        Talk soon,
        {sender_name}
        
  - day_2:
      subject: "The #1 mistake {audience} make"
      goal: educate + build_trust
      
  - day_4:
      subject: "{first_name}, quick question"
      goal: engagement + segmentation
      
  - day_7:
      subject: "How {customer} achieved {result}"
      goal: social_proof + soft_pitch
      
  - day_10:
      subject: "Ready to {achieve_goal}?"
      goal: conversion + offer
      
  - day_14:
      subject: "Last chance: {offer_details}"
      goal: urgency + final_conversion
```

### 2. Newsletter Template

```yaml
newsletter:
  frequency: weekly
  day: Tuesday
  time: 10:00 AM
  
  structure:
    - header:
        logo: true
        issue_number: true
        
    - intro:
        personal_note: 2-3 sentences
        tease_content: true
        
    - main_content:
        sections: 3-5
        format: |
          ## {Section Title}
          
          {2-3 paragraph insight}
          
          **Key takeaway**: {one-liner}
          
          [Read more →]({link})
          
    - curated_links:
        count: 3-5
        format: "• {title} - {one-line description}"
        
    - cta:
        primary: product/service
        secondary: share/reply
        
    - footer:
        social_links: true
        unsubscribe: required
```

### 3. Promotional Email

```yaml
promo_email:
  type: sale_announcement
  
  subject_options:
    - "{first_name}, 30% off ends tonight"
    - "🚨 Final hours: Your exclusive deal"
    - "Last call: Save $X on {product}"
    
  structure:
    hero:
      headline: "{Offer headline}"
      subhead: "Limited time only"
      cta_button: "Shop Now"
      
    body:
      - urgency: "Sale ends in {countdown}"
      - social_proof: "{X} customers already saved"
      - benefits: bullet list
      - testimonial: 1 short quote
      
    cta:
      button_text: "Claim Your {X}% Off"
      link: "{promo_landing_page}"
      
    ps:
      text: "P.S. {urgency reminder or bonus}"
```

---

## Automated Sequences

### Cart Abandonment

```yaml
sequence: "Cart Recovery"
trigger: cart_abandoned
wait_before_start: 1_hour

emails:
  - email_1:
      delay: 1_hour
      subject: "Forgot something? 🛒"
      content: |
        Hi {first_name},
        
        You left some items in your cart:
        
        {cart_items_with_images}
        
        [Complete Your Order →]
        
        Questions? Reply to this email.
        
  - email_2:
      delay: 24_hours
      subject: "Your cart is waiting"
      content: |
        Still thinking it over?
        
        Here's why {X} customers love {product}:
        
        ⭐ "{testimonial}"
        
        [Complete Purchase →]
        
  - email_3:
      delay: 72_hours
      subject: "Last chance + free shipping"
      content: |
        Hi {first_name},
        
        Your cart expires soon, but here's a little incentive:
        
        Use code FREESHIP for free shipping.
        
        [Complete Order with Free Shipping →]
```

### Re-engagement Sequence

```yaml
sequence: "Win-Back"
trigger: inactive_90_days

emails:
  - email_1:
      subject: "We miss you, {first_name}"
      content: |
        It's been a while! Here's what's new at {Brand}:
        
        • {New feature 1}
        • {New feature 2}
        • {New content}
        
        Come back and check it out →
        
  - email_2:
      delay: 7_days
      subject: "A special offer just for you"
      content: |
        {first_name},
        
        We'd love to have you back. Here's 20% off your next purchase.
        
        Use code: COMEBACK20
        
  - email_3:
      delay: 14_days
      subject: "Should we part ways?"
      content: |
        Hi {first_name},
        
        We noticed you haven't opened our emails in a while.
        
        If you'd like to stay subscribed, click here: [Stay Subscribed]
        
        If not, we'll remove you from our list in 7 days.
        
        No hard feelings either way.
```

---

## A/B Testing Framework

### What to Test

```yaml
ab_test_elements:
  high_impact:
    - subject_line:
        variants: 2-3
        sample_size: 20% of list
        winner_criteria: open_rate
        
    - send_time:
        variants: [morning, afternoon, evening]
        test_duration: 2_weeks
        
    - cta_button:
        variants: [text, color, placement]
        winner_criteria: click_rate
        
  medium_impact:
    - preview_text
    - email_length
    - personalization_level
    - image_vs_no_image
    
  low_impact:
    - font_choice
    - button_shape
    - footer_layout
```

### Subject Line A/B Test Examples

```yaml
test_1:
  hypothesis: "Emoji increases open rate"
  variant_a: "Your weekly productivity tips"
  variant_b: "Your weekly productivity tips 🚀"
  
test_2:
  hypothesis: "Personalization increases open rate"
  variant_a: "New features you'll love"
  variant_b: "{first_name}, new features you'll love"
  
test_3:
  hypothesis: "Curiosity gap increases open rate"
  variant_a: "5 ways to save money"
  variant_b: "The $500 mistake I almost made"
  
test_4:
  hypothesis: "Urgency increases open rate"
  variant_a: "30% off this weekend"
  variant_b: "30% off ends in 24 hours"
```

---

## Segmentation Strategies

```yaml
segmentation:
  behavioral:
    - purchase_history:
        segments: [never_purchased, one_time, repeat, vip]
        
    - engagement_level:
        segments: [highly_engaged, moderate, inactive, churned]
        criteria:
          highly_engaged: opened_5_of_last_5
          moderate: opened_2_5_of_last_5
          inactive: no_open_30_days
          churned: no_open_90_days
          
    - product_interest:
        based_on: [clicks, page_views, cart_adds]
        
  demographic:
    - location: for timezone optimization
    - industry: for B2B personalization
    - company_size: for offer customization
    
  lifecycle:
    - stage: [lead, trial, customer, churned]
    - tenure: [new, established, long_term]

segment_specific_content:
  vip_customers:
    - early_access: true
    - exclusive_discounts: true
    - personalized_recommendations: true
    
  inactive_subscribers:
    - reduced_frequency: true
    - re_engagement_offers: true
    - sunset_flow: after_90_days
```

---

## Deliverability Best Practices

```yaml
deliverability:
  authentication:
    required:
      - SPF: sender policy framework
      - DKIM: domain keys
      - DMARC: alignment policy
    check: mxtoolbox.com
    
  list_hygiene:
    - remove_bounces: immediately
    - remove_unsubscribes: immediately
    - re_engage_inactive: after_60_days
    - remove_inactive: after_90_days
    
  content_best_practices:
    - spam_words_avoid: [free, act now, limited time, click here]
    - text_to_image_ratio: 60:40
    - alt_text: on all images
    - unsubscribe_link: prominent
    - physical_address: required (CAN-SPAM)
    
  sending_practices:
    - warm_up_new_domain: 2-4 weeks
    - consistent_sending: same days/times
    - gradual_volume_increase: max 20%/week
    - monitor_complaints: target <0.1%
```

---

## Analytics & KPIs

```yaml
email_metrics:
  primary:
    - open_rate:
        benchmark: 20-25%
        improve_with: subject_lines, sender_name, send_time
        
    - click_rate:
        benchmark: 2-5%
        improve_with: content, cta, design
        
    - conversion_rate:
        benchmark: 1-3%
        improve_with: offer, landing_page, targeting
        
  secondary:
    - unsubscribe_rate:
        healthy: <0.5%
        action: review frequency, content relevance
        
    - bounce_rate:
        healthy: <2%
        action: clean list, verify emails
        
    - spam_complaints:
        healthy: <0.1%
        action: improve opt-in, add unsubscribe
        
  revenue:
    - revenue_per_email
    - revenue_per_subscriber
    - customer_lifetime_value

reporting_template: |
  # Email Performance Report - {Week/Month}
  
  ## Campaign Summary
  | Campaign | Sent | Opens | Clicks | Conv | Revenue |
  |----------|------|-------|--------|------|---------|
  | Newsletter | 10K | 22% | 3.5% | 1.2% | $5,000 |
  | Promo | 10K | 28% | 5.2% | 2.8% | $12,000 |
  
  ## List Health
  - Total subscribers: 50,000
  - New this week: 500
  - Unsubscribes: 45 (0.09%)
  - Bounces: 12 (0.02%)
  
  ## Top Performing
  - Best subject: "{subject}" (32% open rate)
  - Best CTA: "{cta}" (8% click rate)
  
  ## Recommendations
  1. Test more curiosity-based subjects
  2. Segment by engagement for next promo
  3. Clean inactive subscribers (2,000+)
```

---

## Output Example

**Request**: "Create a welcome email sequence for a SaaS product"

**Output**:

```markdown
# Welcome Sequence - SaaS Product

## Email 1: Welcome (Immediate)
**Subject**: Welcome to {Product}! Here's your quick start guide 🚀

```
Hi {first_name},

Welcome to {Product}! I'm {founder_name}, and I'm thrilled you're here.

You just joined 10,000+ teams who've transformed how they work.

**Your first step**: [Complete your profile] (takes 2 min)

Over the next week, I'll share:
• The 3 features that save users 5+ hours/week
• How {Company} increased productivity by 40%
• Pro tips from power users

Questions? Just reply to this email—I read every one.

Let's do this,
{founder_name}

P.S. Need help? [Book a free onboarding call]
```

---

## Email 2: Quick Win (Day 2)
**Subject**: {first_name}, try this 2-minute trick

```
Hi {first_name},

Day 2, and I want to share the #1 feature our users love:

**[Feature Name]**

It takes 2 minutes to set up, and users report saving 1+ hour every day.

Here's how:
1. Go to Settings → [Feature]
2. Click "Enable"
3. That's it!

[Set it up now →]

Tomorrow, I'll show you how {Customer} used this to {impressive result}.

Talk soon,
{founder_name}
```

---

## Email 3: Social Proof (Day 4)
**Subject**: How {Customer} saved 10 hours/week

```
Hi {first_name},

Meet Sarah, a project manager at {Company}.

Before {Product}: "I spent 10+ hours/week on status updates."

After {Product}: "Everything's automated. I focus on actual work now."

The best part? She set it up in one afternoon.

Want similar results? Here are Sarah's top 3 tips:

1. {Tip 1}
2. {Tip 2}
3. {Tip 3}

[See the full case study →]

What's your biggest productivity challenge? Reply and let me know.

{founder_name}
```

---

## Email 4: Engagement Check (Day 7)
**Subject**: Quick question, {first_name}

```
Hi {first_name},

It's been a week! Quick check-in:

How's {Product} working for you so far?

A) 🚀 Loving it!
B) 🤔 Still figuring it out
C) 😕 Having some issues

[Click your answer]

Based on your response, I'll send you the most relevant resources.

{founder_name}

P.S. If you picked C, reply with details and my team will help within 24 hours.
```

---

## Email 5: Conversion (Day 10)
**Subject**: Ready to unlock full power?

```
Hi {first_name},

You've been using {Product} for 10 days. Here's what you've accomplished:

📊 {personalized_stats}

Impressive! But you're only using 40% of what {Product} can do.

**With Pro, you unlock:**
✅ {Pro feature 1}
✅ {Pro feature 2}
✅ {Pro feature 3}

Teams who upgrade see {X%} more productivity on average.

[Upgrade to Pro →]

Use code WELCOME20 for 20% off your first year.

{founder_name}
```

---

**Sequence Settings:**
- Wait time between emails: As specified
- Skip weekend sends: Yes
- Exit condition: Upgrades OR unsubscribes
- Branch: If no opens after email 3 → shorter re-engagement sequence
```

---

*Email Marketing Skill - Part of Claude Office Skills*
