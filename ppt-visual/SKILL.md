---
# ═══════════════════════════════════════════════════════════════════════════════
# CLAUDE OFFICE SKILL - PPT Visual
# ═══════════════════════════════════════════════════════════════════════════════

name: ppt-visual
description: "Design presentation visuals and slide layouts. Create visual concepts, suggest graphics, and provide design specifications for impactful PowerPoint slides."
version: "1.0.0"
author: claude-office-skills
license: MIT

category: visualization
tags:
  - presentation
  - powerpoint
  - slides
  - visual-design
  - layout
department: All

models:
  recommended:
    - claude-sonnet-4
    - claude-opus-4
  compatible:
    - claude-3-5-sonnet
    - gpt-4
    - gpt-4o

mcp:
  server: office-mcp
  tools:
    - create_pptx
    - md_to_pptx

capabilities:
  - slide_layout_design
  - visual_concept_creation
  - icon_recommendations
  - color_scheme_design
  - typography_guidance

languages:
  - en
  - zh

related_skills:
  - ai-slides
  - md-slides
  - image-generation
  - chart-designer
---

# PPT Visual Skill

## Overview

I help you design visually impactful presentation slides. I provide layout concepts, visual recommendations, and design specifications that transform text-heavy slides into engaging visual communications.

**What I can do:**
- Design slide layouts and compositions
- Recommend visual elements (icons, images, shapes)
- Create color schemes and themes
- Suggest typography and hierarchy
- Provide before/after redesign concepts
- Generate SmartArt and diagram ideas

**What I cannot do:**
- Create actual PowerPoint files (use with pptx tools)
- Generate images directly
- Access existing presentations

---

## How to Use Me

### Step 1: Share Your Content

Tell me:
- Slide content (text, bullet points)
- Presentation purpose
- Audience
- Current design issues (if redesigning)

### Step 2: Choose Design Direction

- **Minimalist**: Clean, lots of white space
- **Corporate**: Professional, structured
- **Creative**: Bold, dynamic
- **Data-focused**: Charts and visualizations
- **Storytelling**: Narrative flow

### Step 3: Receive Design Specs

I'll provide:
- Layout wireframes
- Visual element recommendations
- Color and font specifications
- Icon suggestions
- Implementation tips

---

## Slide Layout Patterns

### Title Slide

```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│         PRESENTATION TITLE          │
│         Subtitle goes here          │
│                                     │
│         Presenter Name              │
│         Date                        │
│                                     │
│                          [Logo]     │
└─────────────────────────────────────┘
```

### Big Statement

```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│     "Key quote or                   │
│      big statement"                 │
│                                     │
│              — Attribution          │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### Three Columns

```
┌─────────────────────────────────────┐
│           Section Title             │
├───────────┬───────────┬─────────────┤
│   [Icon]  │   [Icon]  │   [Icon]    │
│           │           │             │
│  Point 1  │  Point 2  │  Point 3    │
│  Details  │  Details  │  Details    │
│           │           │             │
└───────────┴───────────┴─────────────┘
```

### Image + Text (Split)

```
┌─────────────────────────────────────┐
│                    │                │
│                    │   Heading      │
│    [Full Height    │                │
│     Image]         │   • Point 1    │
│                    │   • Point 2    │
│                    │   • Point 3    │
│                    │                │
└─────────────────────────────────────┘
```

### Data Highlight

```
┌─────────────────────────────────────┐
│                                     │
│            85%                      │
│     ───────────────                 │
│     Key metric description          │
│                                     │
│   ┌─────┐  ┌─────┐  ┌─────┐        │
│   │ 10K │  │ 25% │  │ #1  │        │
│   │users│  │growth│  │rank │        │
│   └─────┘  └─────┘  └─────┘        │
└─────────────────────────────────────┘
```

### Timeline

```
┌─────────────────────────────────────┐
│           Our Journey               │
│                                     │
│  2020        2021        2022       │
│    ●──────────●──────────●          │
│    │          │          │          │
│  Event 1   Event 2    Event 3       │
│                                     │
└─────────────────────────────────────┘
```

### Comparison

```
┌─────────────────────────────────────┐
│           Before vs After           │
├─────────────────┬───────────────────┤
│     BEFORE      │      AFTER        │
│                 │                   │
│   [Visual]      │    [Visual]       │
│                 │                   │
│   • Problem 1   │    • Solution 1   │
│   • Problem 2   │    • Solution 2   │
│                 │                   │
└─────────────────┴───────────────────┘
```

### Process Flow

```
┌─────────────────────────────────────┐
│           How It Works              │
│                                     │
│   ┌───┐      ┌───┐      ┌───┐      │
│   │ 1 │ ───► │ 2 │ ───► │ 3 │      │
│   └───┘      └───┘      └───┘      │
│   Step 1     Step 2     Step 3      │
│   Detail     Detail     Detail      │
│                                     │
└─────────────────────────────────────┘
```

### Quote + Image

```
┌─────────────────────────────────────┐
│                                     │
│   "Quote text that                  │
│    spans multiple         [Speaker  │
│    lines here"             Photo]   │
│                                     │
│    — Speaker Name                   │
│      Title, Company                 │
│                                     │
└─────────────────────────────────────┘
```

---

## Output Format

```markdown
# Slide Design: [Slide Title]

**Slide Type**: [Title/Content/Data/etc.]
**Layout Pattern**: [Pattern name]
**Visual Style**: [Minimalist/Corporate/Creative]

---

## Layout Wireframe

```
[ASCII representation of layout]
```

---

## Content Placement

### Primary Content
- **Position**: [Location on slide]
- **Text**: [Exact text]
- **Font**: [Font, size, weight]
- **Color**: [Hex code]

### Supporting Elements
- **Element 1**: [Description, position]
- **Element 2**: [Description, position]

---

## Visual Elements

### Icons
| Icon | Meaning | Suggested Source |
|------|---------|------------------|
| [Description] | [Purpose] | Flaticon, Noun Project |

### Images
| Image | Description | Specs |
|-------|-------------|-------|
| [Type] | [What it shows] | [Size, style] |

### Shapes
| Shape | Use | Color |
|-------|-----|-------|
| [Shape] | [Purpose] | [Hex] |

---

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | [Name] | #XXXXXX |
| Primary Text | [Name] | #XXXXXX |
| Accent | [Name] | #XXXXXX |
| Highlight | [Name] | #XXXXXX |

---

## Typography

| Element | Font | Size | Style |
|---------|------|------|-------|
| Title | [Font] | [X]pt | Bold |
| Subtitle | [Font] | [X]pt | Regular |
| Body | [Font] | [X]pt | Regular |
| Caption | [Font] | [X]pt | Light |

---

## Animation Suggestions

1. **[Element]**: [Animation type, timing]
2. **[Element]**: [Animation type, timing]

---

## Implementation Notes

1. [Tip for implementation]
2. [Tip for implementation]
3. [Tip for implementation]
```

---

## Design Principles for Slides

### 1. One Idea Per Slide
- Single key message
- Support with visuals
- Don't overcrowd

### 2. Visual Hierarchy
```
Title (largest)
↓
Key Point (prominent)
↓
Supporting Details (smaller)
↓
Source/Footer (smallest)
```

### 3. The Rule of Thirds
```
┌───┬───┬───┐
│ 1 │ 2 │ 3 │
├───┼───┼───┤
│ 4 │ 5 │ 6 │  Place key elements at
├───┼───┼───┤  intersection points
│ 7 │ 8 │ 9 │
└───┴───┴───┘
```

### 4. Contrast Creates Emphasis
- Large vs small
- Dark vs light
- Color vs neutral
- Image vs text

### 5. Alignment Creates Order
- Use consistent margins
- Align related elements
- Create invisible grid

---

## Before/After Examples

### Text-Heavy → Visual

**Before** (Text dump):
```
Our company has grown significantly:
- Revenue increased by 45%
- Customer base grew to 10,000 users
- Expanded to 15 new markets
- Launched 3 new products
- Team grew from 50 to 120 employees
```

**After** (Visual design):
```
┌─────────────────────────────────────┐
│         2024 Growth Highlights      │
│                                     │
│   ┌──────┐ ┌──────┐ ┌──────┐       │
│   │ +45% │ │ 10K  │ │  15  │       │
│   │ Rev  │ │Users │ │Markets│       │
│   └──────┘ └──────┘ └──────┘       │
│                                     │
│   ┌──────┐ ┌──────┐                │
│   │  3   │ │ 120  │                │
│   │Prodts│ │ Team │                │
│   └──────┘ └──────┘                │
└─────────────────────────────────────┘
```

---

## Color Scheme Templates

### Corporate Blue
```
Primary: #1E3A5F (Dark Blue)
Secondary: #3498DB (Bright Blue)
Accent: #E74C3C (Red)
Background: #F5F7FA (Light Gray)
Text: #2C3E50 (Dark Gray)
```

### Modern Minimal
```
Primary: #000000 (Black)
Secondary: #666666 (Gray)
Accent: #FF6B6B (Coral)
Background: #FFFFFF (White)
Text: #333333 (Dark Gray)
```

### Creative Bold
```
Primary: #6C5CE7 (Purple)
Secondary: #00CEC9 (Teal)
Accent: #FDCB6E (Yellow)
Background: #2D3436 (Dark)
Text: #FFFFFF (White)
```

### Nature/Sustainability
```
Primary: #27AE60 (Green)
Secondary: #2ECC71 (Light Green)
Accent: #F39C12 (Orange)
Background: #FDFEFE (Off-white)
Text: #2C3E50 (Dark Gray)
```

---

## Font Pairing Suggestions

### Professional
- **Headings**: Montserrat Bold
- **Body**: Open Sans Regular

### Modern
- **Headings**: Poppins SemiBold
- **Body**: Inter Regular

### Classic
- **Headings**: Playfair Display
- **Body**: Source Sans Pro

### Tech
- **Headings**: Space Grotesk Bold
- **Body**: IBM Plex Sans Regular

---

## Tips for Better Slides

1. **Kill bullet points** - Use visuals instead
2. **One number per slide** - Make data memorable
3. **Full-bleed images** - Go edge-to-edge
4. **Dark backgrounds** - Stand out in dim rooms
5. **Consistent icons** - Same style throughout
6. **Animate purposefully** - Support story, don't distract
7. **Leave margins** - Content shouldn't touch edges
8. **Test on projector** - Colors look different

---

## Resources

### Icon Libraries
- Flaticon (flaticon.com)
- The Noun Project (thenounproject.com)
- Feather Icons (feathericons.com)
- Heroicons (heroicons.com)

### Stock Photos
- Unsplash (unsplash.com)
- Pexels (pexels.com)
- Pixabay (pixabay.com)

### Color Tools
- Coolors (coolors.co)
- Adobe Color (color.adobe.com)
- Color Hunt (colorhunt.co)

---

## Limitations

- Cannot create actual PPTX files directly
- Cannot generate images
- Design specs need implementation
- Complex animations need manual setup

---

*Built by the Claude Office Skills community. Contributions welcome!*
