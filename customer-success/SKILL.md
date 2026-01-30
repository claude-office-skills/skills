---
name: customer-success
description: "Customer success management - onboarding, health scoring, QBRs, expansion playbooks, and retention strategies"
version: "1.0.0"
author: claude-office-skills
license: MIT

category: sales
tags:
  - customer-success
  - retention
  - onboarding
  - qbr
  - expansion
department: Customer Success

models:
  recommended:
    - claude-sonnet-4
    - claude-opus-4

capabilities:
  - onboarding_design
  - health_scoring
  - qbr_creation
  - expansion_playbooks
  - retention_strategies

languages:
  - en
  - zh

related_skills:
  - crm-automation
  - subscription-management
  - saas-metrics
---

# Customer Success

Comprehensive customer success management covering onboarding, health scoring, QBRs, expansion playbooks, and retention strategies.

## Overview

This skill covers:
- Customer onboarding programs
- Health scoring and monitoring
- QBR (Quarterly Business Review) templates
- Expansion and upsell playbooks
- Retention and churn prevention

---

## Customer Onboarding

### Onboarding Program Structure

```yaml
onboarding_phases:
  phase_1_kickoff:
    duration: "Week 1"
    goals:
      - establish_relationship
      - set_expectations
      - gather_requirements
    activities:
      - kickoff_call: 60min
      - intro_to_support_channels
      - share_onboarding_plan
      - schedule_implementation
    deliverables:
      - success_plan_document
      - timeline_with_milestones
      
  phase_2_implementation:
    duration: "Week 2-3"
    goals:
      - technical_setup
      - data_migration
      - integration_configuration
    activities:
      - implementation_calls: 2-3x
      - technical_support
      - testing_and_validation
    deliverables:
      - working_environment
      - integrations_live
      
  phase_3_training:
    duration: "Week 3-4"
    goals:
      - user_enablement
      - admin_training
      - workflow_setup
    activities:
      - admin_training: 90min
      - end_user_training: 60min
      - workflow_workshop
    deliverables:
      - trained_users
      - documented_workflows
      
  phase_4_launch:
    duration: "Week 4-5"
    goals:
      - go_live
      - adoption_tracking
      - quick_wins
    activities:
      - launch_call
      - monitor_adoption
      - celebrate_wins
    deliverables:
      - users_active
      - first_value_achieved
      
  phase_5_handoff:
    duration: "Week 6"
    goals:
      - transition_to_csm
      - establish_cadence
      - document_success
    activities:
      - handoff_call
      - schedule_check_ins
      - nps_survey
    deliverables:
      - ongoing_csm_relationship
      - baseline_metrics
```

### Onboarding Checklist

```yaml
onboarding_checklist:
  pre_kickoff:
    - [ ] Review sales notes and requirements
    - [ ] Prepare success plan template
    - [ ] Schedule kickoff call
    - [ ] Send welcome email
    
  kickoff:
    - [ ] Introductions and roles
    - [ ] Review goals and timeline
    - [ ] Identify key stakeholders
    - [ ] Define success metrics
    - [ ] Schedule implementation calls
    
  implementation:
    - [ ] Account setup complete
    - [ ] Users provisioned
    - [ ] SSO configured (if applicable)
    - [ ] Integrations connected
    - [ ] Data migrated
    - [ ] Testing completed
    
  training:
    - [ ] Admin training delivered
    - [ ] User training delivered
    - [ ] Training materials shared
    - [ ] Self-service resources provided
    - [ ] Certification program introduced
    
  launch:
    - [ ] Go-live confirmed
    - [ ] Users logging in
    - [ ] First workflow completed
    - [ ] Quick win achieved
    - [ ] Launch celebration
    
  handoff:
    - [ ] CSM introduced
    - [ ] Regular cadence scheduled
    - [ ] Support escalation path clear
    - [ ] NPS survey sent
    - [ ] Onboarding documentation complete
```

---

## Health Scoring

### Health Score Model

```yaml
health_score_components:
  product_engagement: # 40% weight
    metrics:
      - dau_mau_ratio:
          excellent: >0.5
          good: 0.3-0.5
          at_risk: 0.1-0.3
          critical: <0.1
          
      - feature_adoption:
          measure: core_features_used / total_core_features
          excellent: >80%
          good: 60-80%
          at_risk: 40-60%
          critical: <40%
          
      - depth_of_use:
          measure: actions_per_user_per_week
          benchmark: vs_similar_customers
          
  relationship: # 25% weight
    metrics:
      - nps_score:
          promoter: 9-10
          passive: 7-8
          detractor: 0-6
          
      - csm_engagement:
          regular_meetings: true/false
          responsive_to_outreach: true/false
          
      - executive_sponsor:
          identified: true/false
          engaged: true/false
          
  financial: # 20% weight
    metrics:
      - payment_history:
          on_time: excellent
          late_1x: good
          late_2x+: at_risk
          
      - growth_trajectory:
          expanding: excellent
          stable: good
          contracting: at_risk
          
  sentiment: # 15% weight
    metrics:
      - support_tickets:
          sentiment_trend: positive/neutral/negative
          resolution_satisfaction: score
          
      - feedback:
          product_feedback: positive/neutral/negative
          feature_requests: engaged/silent
          
scoring_formula:
  total: (engagement × 0.4) + (relationship × 0.25) + (financial × 0.2) + (sentiment × 0.15)
  
tiers:
  healthy: 80-100 (green)
  stable: 60-79 (yellow)
  at_risk: 40-59 (orange)
  critical: 0-39 (red)
```

### Health Score Automation

```yaml
health_automation:
  critical_score:
    trigger: score < 40
    actions:
      - alert: csm_immediately
      - alert: cs_manager
      - schedule: save_call_within_24h
      - pause: marketing_emails
      
  at_risk_score:
    trigger: score drops below 60
    actions:
      - alert: csm_same_day
      - schedule: check_in_call
      - review: account_for_team_meeting
      
  health_improvement:
    trigger: score increases by 20+
    actions:
      - flag: expansion_opportunity
      - schedule: success_story_interview
      - request: testimonial_or_referral
```

---

## QBR (Quarterly Business Review)

### QBR Template

```markdown
# Quarterly Business Review
## {Company Name} | {Quarter} {Year}

---

### Agenda (60 minutes)
1. Business Update (10 min)
2. Success Metrics Review (15 min)
3. Product Usage Analysis (10 min)
4. Roadmap Preview (10 min)
5. Strategic Discussion (10 min)
6. Action Items & Next Steps (5 min)

---

### 1. Executive Summary

**Relationship Health**: 🟢 Healthy (Score: 85)

**Key Highlights:**
- ✅ Exceeded adoption targets by 15%
- ✅ 3 new departments onboarded
- ✅ NPS improved from 7 to 9
- ⚠️ Feature request pending: {feature}

**ROI Achieved This Quarter:**
- Time saved: 500+ hours
- Cost reduction: $50,000
- Productivity increase: 25%

---

### 2. Success Metrics

| Goal | Target | Actual | Status |
|------|--------|--------|--------|
| User Adoption | 80% | 92% | ✅ Exceeded |
| Daily Active Users | 100 | 120 | ✅ Exceeded |
| Support Tickets | <10/mo | 8/mo | ✅ On Track |
| NPS Score | >8 | 9 | ✅ Exceeded |

**Trend Charts:**
[Include usage trends, adoption curves]

---

### 3. Product Usage Analysis

**Most Used Features:**
1. {Feature 1} - 95% adoption
2. {Feature 2} - 87% adoption
3. {Feature 3} - 72% adoption

**Underutilized Features:**
- {Feature X} - 15% adoption
  - Recommendation: Training session
- {Feature Y} - 22% adoption
  - Recommendation: Workflow workshop

**Power Users:**
- {User 1}: Champion, can lead training
- {User 2}: Heavy API user

---

### 4. Roadmap Preview

**Coming Next Quarter:**
- 🚀 {Feature 1} - Addresses your request from {date}
- 🚀 {Feature 2} - Improves {workflow}
- 🚀 {Integration} - Connects with {tool}

**Beta Opportunities:**
- Would you like early access to {feature}?

---

### 5. Strategic Discussion

**Questions for You:**
1. What are your top priorities for next quarter?
2. Any organizational changes we should know about?
3. Where are you still experiencing friction?

**Growth Opportunities:**
- Department X could benefit from {product}
- {Use case} is now possible with new features
- Volume discount available at {tier}

---

### 6. Action Items

| Item | Owner | Due Date |
|------|-------|----------|
| Schedule training on {feature} | CSM | {date} |
| Connect with IT on integration | Customer | {date} |
| Share beta access | Product | {date} |
| Review expansion proposal | Customer | {date} |

---

### Next QBR: {Date}
```

---

## Expansion Playbook

### Expansion Triggers

```yaml
expansion_signals:
  usage_based:
    - approaching_seat_limit: 80% of licensed
    - feature_usage_ceiling: using advanced features
    - api_volume_increasing: growth trend
    - storage_approaching_limit: 80%+ used
    
  behavioral:
    - champion_promoting: internal advocacy
    - new_department_interest: cross-team requests
    - executive_engagement: c-level using product
    - feature_requests: for_higher_tier_features
    
  business:
    - company_funding: new_round_announced
    - company_growth: hiring_increase
    - new_initiative: announced_project
    - renewal_approaching: 90_days_out
```

### Expansion Conversation Framework

```yaml
expansion_framework:
  discover:
    questions:
      - "What new initiatives are you planning?"
      - "Which other teams could benefit?"
      - "What's limiting you today?"
    listen_for:
      - growth_plans
      - pain_points
      - budget_cycles
      
  align:
    approach:
      - connect_to_their_goals
      - quantify_current_value
      - project_expanded_value
    messaging: |
      "Based on the {$X value} you've seen with 
      {current_use_case}, expanding to {new_use_case} 
      could deliver {projected_value}."
      
  propose:
    elements:
      - specific_recommendation
      - pricing_options
      - implementation_timeline
      - roi_projection
      
  close:
    tactics:
      - executive_alignment
      - champion_support
      - pilot_option
      - renewal_bundle
```

---

## Retention Strategies

### Churn Risk Playbook

```yaml
churn_indicators:
  high_risk:
    - no_login_30_days
    - usage_drop_50%
    - support_complaints_increase
    - executive_sponsor_left
    - competitor_mentioned
    
  actions_by_risk:
    critical:
      - csm_call_within_24h
      - manager_escalation
      - executive_outreach
      - save_offer_prepared
      
    at_risk:
      - csm_call_within_48h
      - health_check_meeting
      - re_training_offered
      - success_plan_review
      
save_offers:
  by_reason:
    price:
      - discount: 20% for 3 months
      - annual_commitment: additional_discount
      - downgrade_option: lower_tier
      
    not_using:
      - training: free_intensive_session
      - implementation: professional_services
      - pause: 1-3_months
      
    competitor:
      - competitive_discount
      - feature_commitment
      - executive_meeting
      
    organizational:
      - contract_flexibility
      - pause_option
      - reduced_seats
```

---

## Output Example

**Request**: "Create a QBR presentation for a customer"

**Output**:

```markdown
# QBR Presentation - Acme Corp
## Q4 2025

---

## Slide 1: Executive Summary

### Health Score: 85/100 🟢

**This Quarter's Wins:**
- 📈 User adoption: 85% → 92%
- 💰 ROI delivered: $150,000
- ⭐ NPS: 8 → 9

**Focus Areas:**
- Expand to Marketing team
- Increase API usage
- Prepare for renewal

---

## Slide 2: Success Metrics

| Metric | Q3 | Q4 | Change |
|--------|----|----|--------|
| Active Users | 150 | 180 | +20% |
| Projects Created | 500 | 750 | +50% |
| Time Saved | 200h | 350h | +75% |

**ROI Calculation:**
- Hours saved: 350h × $50/hr = $17,500/mo
- Annual value: $210,000
- Investment: $60,000
- **ROI: 3.5x**

---

## Slide 3: Adoption Analysis

**Top Used Features:**
1. Task Management: 95%
2. Time Tracking: 82%
3. Reporting: 75%

**Opportunity Features:**
- Automation: 25% (training scheduled)
- Integrations: 30% (Slack integration available)

---

## Slide 4: Roadmap Alignment

**Coming in Q1:**
- ✅ AI Assistant (addresses your feature request)
- ✅ Salesforce Integration
- ✅ Advanced Analytics

**Early Access:**
Would you like beta access to AI features?

---

## Slide 5: Strategic Discussion

1. Marketing team interest → Expansion opportunity
2. API usage growing → Developer tier consideration
3. Renewal in 90 days → Multi-year discount available

---

## Slide 6: Action Items

| Action | Owner | Date |
|--------|-------|------|
| Marketing demo | Acme | Jan 15 |
| API tier proposal | CSM | Jan 20 |
| Renewal discussion | Both | Feb 1 |

**Next QBR: April 2026**
```

---

*Customer Success Skill - Part of Claude Office Skills*
