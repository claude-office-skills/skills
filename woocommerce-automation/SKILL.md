---
name: WooCommerce Automation
description: Automate WooCommerce e-commerce operations including orders, inventory, customers, and marketing
version: 1.0.0
author: Claude Office Skills
category: e-commerce
tags:
  - woocommerce
  - wordpress
  - e-commerce
  - orders
  - inventory
department: operations
models:
  - claude-3-opus
  - claude-3-sonnet
  - gpt-4
mcp:
  server: ecommerce-mcp
  tools:
    - woo_orders
    - woo_products
    - woo_customers
    - woo_coupons
capabilities:
  - Order management
  - Inventory sync
  - Customer workflows
  - Marketing automation
input:
  - Order data
  - Product information
  - Customer details
  - Coupon configurations
output:
  - Order confirmations
  - Inventory reports
  - Customer segments
  - Marketing campaigns
languages:
  - en
related_skills:
  - shopify-automation
  - amazon-seller
  - inventory-management
---

# WooCommerce Automation

Comprehensive skill for automating WooCommerce store operations and workflows.

## Core Workflows

### 1. Order Processing Pipeline

```
ORDER FLOW:
┌─────────────────┐
│  New Order      │
│  Received       │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Validate       │
│  - Payment      │
│  - Inventory    │
│  - Fraud check  │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Process        │
│  - Confirm      │
│  - Reserve stock│
│  - Notify       │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Fulfill        │
│  - Pick & pack  │
│  - Ship         │
│  - Track        │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Complete       │
│  - Deliver      │
│  - Follow-up    │
└─────────────────┘
```

### 2. Order Status Automations

```yaml
order_automations:
  - trigger: order_placed
    conditions:
      payment_status: completed
    actions:
      - set_status: processing
      - send_email: order_confirmation
      - create_fulfillment_task
      - update_inventory
      
  - trigger: order_shipped
    actions:
      - set_status: shipped
      - send_email: shipping_notification
      - add_tracking_note
      
  - trigger: order_delivered
    actions:
      - set_status: completed
      - schedule_review_request:
          delay: 7_days
      - update_customer_stats
      
  - trigger: payment_failed
    actions:
      - set_status: on-hold
      - send_email: payment_failed
      - create_followup_task
```

## Product Management

### Inventory Sync

```yaml
inventory_sync:
  sources:
    - name: warehouse_a
      type: api
      sync_frequency: "*/15 * * * *"  # Every 15 min
      
    - name: supplier_feed
      type: ftp
      file_pattern: "inventory_*.csv"
      sync_frequency: "0 */4 * * *"  # Every 4 hours
      
  rules:
    - condition: quantity <= low_stock_threshold
      actions:
        - set_stock_status: "onbackorder"
        - send_alert: low_stock
        - create_purchase_order
        
    - condition: quantity == 0
      actions:
        - set_stock_status: "outofstock"
        - hide_from_catalog: false
        - show_back_in_stock_form: true
```

### Product Data Structure

```yaml
product_template:
  name: "{{product_name}}"
  type: "simple"  # simple, variable, grouped, external
  
  general:
    regular_price: "{{price}}"
    sale_price: "{{sale_price}}"
    sku: "{{sku}}"
    
  inventory:
    manage_stock: true
    stock_quantity: "{{quantity}}"
    backorders: "notify"
    low_stock_threshold: 5
    
  shipping:
    weight: "{{weight}}"
    dimensions:
      length: "{{length}}"
      width: "{{width}}"
      height: "{{height}}"
    shipping_class: "{{shipping_class}}"
    
  attributes:
    - name: "Color"
      values: ["Red", "Blue", "Green"]
      visible: true
      variation: true
    - name: "Size"
      values: ["S", "M", "L", "XL"]
      visible: true
      variation: true
      
  categories: ["{{category}}"]
  tags: ["{{tags}}"]
  images:
    - src: "{{image_url}}"
      alt: "{{image_alt}}"
```

### Bulk Product Updates

```yaml
bulk_operations:
  - name: price_increase
    filter:
      category: "electronics"
      stock_status: "instock"
    action:
      update_price:
        type: percentage
        value: 10
        
  - name: sale_promotion
    filter:
      tag: "summer_sale"
    action:
      set_sale_price:
        discount: 25
        schedule:
          start: "2024-06-01"
          end: "2024-06-30"
          
  - name: update_shipping
    filter:
      weight_greater_than: 5
    action:
      set_shipping_class: "heavy_items"
```

## Customer Management

### Customer Segments

```yaml
customer_segments:
  - name: vip_customers
    criteria:
      total_spent: ">= 1000"
      order_count: ">= 5"
    actions:
      - assign_role: "vip_customer"
      - apply_discount: 15
      - send_vip_welcome
      
  - name: at_risk
    criteria:
      last_order: "> 90 days"
      total_spent: ">= 200"
    actions:
      - add_tag: "at_risk"
      - send_win_back_campaign
      
  - name: first_time_buyers
    criteria:
      order_count: 1
      registered: "< 30 days"
    actions:
      - send_onboarding_series
      - offer_second_purchase_discount
```

### Customer Lifecycle Emails

```yaml
email_automation:
  welcome_series:
    - delay: 0
      template: welcome_email
      subject: "Welcome to {{store_name}}!"
      
    - delay: 3_days
      template: product_highlights
      subject: "Our Best Sellers You'll Love"
      
    - delay: 7_days
      template: first_purchase_offer
      subject: "Special Offer: 10% Off Your First Order"
      
  post_purchase:
    - delay: 0
      trigger: order_completed
      template: order_confirmation
      
    - delay: 3_days
      template: shipping_update
      condition: order_status == "shipped"
      
    - delay: 14_days
      template: review_request
      condition: order_status == "completed"
      
  win_back:
    - delay: 30_days
      condition: no_order_since
      template: miss_you_email
      subject: "We Miss You! Here's 15% Off"
      
    - delay: 60_days
      condition: no_order_since
      template: last_chance
      subject: "Last Chance: 20% Off Just for You"
```

## Marketing Automation

### Coupon Management

```yaml
coupon_automations:
  - name: birthday_coupon
    trigger: customer_birthday
    coupon:
      type: percent
      amount: 20
      individual_use: true
      usage_limit: 1
      expiry: 30_days
    notification:
      email_template: birthday_coupon
      
  - name: abandoned_cart_coupon
    trigger: cart_abandoned
    delay: 24_hours
    coupon:
      type: percent
      amount: 10
      minimum_amount: 50
      expiry: 7_days
    notification:
      email_template: abandoned_cart
      
  - name: loyalty_reward
    trigger: order_count_reached
    threshold: 10
    coupon:
      type: fixed_cart
      amount: 25
      individual_use: true
```

### Cart Recovery

```yaml
cart_recovery:
  triggers:
    - cart_abandoned_minutes: 60
    - cart_value_minimum: 30
    
  sequence:
    - delay: 1_hour
      template: cart_reminder_1
      subject: "You left something behind..."
      include_cart_items: true
      
    - delay: 24_hours
      template: cart_reminder_2
      subject: "Your cart is waiting"
      include_discount: false
      
    - delay: 72_hours
      template: cart_reminder_3
      subject: "Last chance + 10% off"
      include_discount: true
      discount_code: "COMEBACK10"
```

## Analytics & Reporting

### Sales Dashboard

```
SALES OVERVIEW - LAST 30 DAYS
═══════════════════════════════════════

Revenue:      $45,230 (+12.5%)
Orders:       892 (+8.3%)
AOV:          $50.70 (+3.9%)
Conversion:   3.2% (+0.4%)

TOP PRODUCTS:
┌────────────────────────┬────────┬─────────┐
│ Product                │ Sold   │ Revenue │
├────────────────────────┼────────┼─────────┤
│ Premium Widget         │ 245    │ $12,250 │
│ Standard Package       │ 189    │ $7,560  │
│ Deluxe Bundle          │ 156    │ $9,360  │
└────────────────────────┴────────┴─────────┘

SALES BY CHANNEL:
Direct      ██████████████░░ 65%
Organic     ████████░░░░░░░░ 22%
Paid        ████░░░░░░░░░░░░ 10%
Referral    █░░░░░░░░░░░░░░░ 3%
```

### Inventory Report

```yaml
inventory_report:
  metrics:
    - total_products: 1,234
    - in_stock: 1,089
    - out_of_stock: 98
    - low_stock: 47
    
  alerts:
    - type: out_of_stock
      products: 98
      action: reorder_required
      
    - type: low_stock
      products: 47
      threshold_days: 14
      
    - type: overstock
      products: 23
      recommendation: run_promotion
```

## API Integration Examples

### WooCommerce REST API

```javascript
// Create Order
const order = {
  payment_method: "bacs",
  payment_method_title: "Direct Bank Transfer",
  set_paid: true,
  billing: {
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    address_1: "123 Main St",
    city: "San Francisco",
    state: "CA",
    postcode: "94103",
    country: "US"
  },
  line_items: [
    {
      product_id: 93,
      quantity: 2
    }
  ],
  shipping_lines: [
    {
      method_id: "flat_rate",
      method_title: "Flat Rate",
      total: "10.00"
    }
  ]
};

// Update Product Stock
const updateStock = {
  stock_quantity: 100,
  manage_stock: true
};

// Create Coupon
const coupon = {
  code: "SAVE20",
  discount_type: "percent",
  amount: "20",
  individual_use: true,
  exclude_sale_items: true,
  minimum_amount: "50.00"
};
```

## Best Practices

1. **Automate Status Updates**: Keep customers informed
2. **Sync Inventory Real-time**: Prevent overselling
3. **Segment Customers**: Personalize marketing
4. **Recover Abandoned Carts**: Capture lost revenue
5. **Monitor Stock Levels**: Set low-stock alerts
6. **Optimize Email Timing**: Test send times
7. **Track Conversions**: Measure marketing ROI
8. **Backup Regularly**: Protect order data
