---
# ═══════════════════════════════════════════════════════════════════════════════
# CLAUDE OFFICE SKILL - Image Generation
# ═══════════════════════════════════════════════════════════════════════════════

name: image-generation
description: "Create effective AI image generation prompts for DALL-E, Midjourney, and Stable Diffusion. Generate prompts for various styles and use cases."
version: "1.0.0"
author: claude-office-skills
license: MIT

category: visualization
tags:
  - image
  - ai-art
  - prompts
  - dall-e
  - midjourney
department: Design/Marketing

models:
  recommended:
    - claude-sonnet-4
    - claude-opus-4
  compatible:
    - claude-3-5-sonnet
    - gpt-4
    - gpt-4o

capabilities:
  - prompt_engineering
  - style_specification
  - composition_guidance
  - negative_prompting
  - prompt_optimization

languages:
  - en
  - zh

related_skills:
  - ppt-visual
  - infographic
  - brand-guidelines
---

# Image Generation Skill

## Overview

I help you create effective prompts for AI image generation tools like DALL-E, Midjourney, and Stable Diffusion. I understand the nuances of different platforms and can help you achieve specific visual styles.

**What I can do:**
- Write detailed image generation prompts
- Optimize prompts for specific AI tools
- Suggest style keywords and modifiers
- Create negative prompts to avoid unwanted elements
- Adapt prompts for different aspect ratios
- Generate variations and alternatives

**What I cannot do:**
- Generate images directly
- Guarantee exact output from AI tools
- Predict how AI will interpret prompts
- Bypass content policies of AI tools

---

## How to Use Me

### Step 1: Describe Your Vision

Tell me:
- What you want to see in the image
- The purpose (presentation, social media, marketing)
- Style preferences (realistic, artistic, minimalist)
- Mood or emotion to convey

### Step 2: Choose the Platform

- **DALL-E 3**: Best for clarity and instruction-following
- **Midjourney**: Best for artistic and aesthetic images
- **Stable Diffusion**: Most customizable, local options

### Step 3: Specify Parameters

- Aspect ratio (1:1, 16:9, 4:3, etc.)
- Quality level
- Style references
- Things to avoid

---

## Prompt Engineering Framework

### Basic Prompt Structure

```
[Subject] + [Action/State] + [Environment] + [Style] + [Technical Parameters]
```

### Detailed Template

```
[Main Subject]
- Who/what is the focus?
- What are they doing?

[Environment/Setting]
- Where is this taking place?
- Time of day? Weather? Season?

[Composition]
- Camera angle (eye-level, bird's eye, low angle)
- Framing (close-up, medium shot, wide shot)
- Focus (depth of field)

[Style]
- Art style (photorealistic, watercolor, oil painting, etc.)
- Artist reference (optional)
- Era/period

[Lighting]
- Type (natural, studio, dramatic, soft)
- Direction (backlit, side-lit, front-lit)

[Color]
- Palette (warm, cool, monochrome)
- Specific colors to include

[Mood/Atmosphere]
- Emotion to evoke
- Overall feeling

[Technical]
- Quality modifiers
- Aspect ratio
- Negative prompts
```

---

## Platform-Specific Tips

### DALL-E 3

**Strengths**: 
- Follows complex instructions well
- Good at text in images
- Natural language understanding

**Prompt Style**: Write naturally, be descriptive
```
A professional photograph of a modern office space with floor-to-ceiling 
windows overlooking a city skyline at sunset. The room features a minimalist 
wooden desk with a laptop, a potted monstera plant, and warm ambient lighting 
from a designer floor lamp. The mood is productive yet peaceful.
```

### Midjourney

**Strengths**:
- Exceptional aesthetics
- Strong artistic styles
- Good at specific looks

**Prompt Style**: Use keywords, parameters, and style references
```
modern office space, floor-to-ceiling windows, city skyline sunset, 
minimalist wooden desk, monstera plant, warm ambient lighting, 
productive atmosphere --ar 16:9 --style raw --v 6
```

**Key Parameters**:
- `--ar X:Y` Aspect ratio
- `--v 6` Version
- `--style raw` Less stylized
- `--q 2` Quality
- `--s 250` Stylize amount

### Stable Diffusion

**Strengths**:
- Highly customizable
- Local/private generation
- Extensive community models

**Prompt Style**: Weighted tokens, negative prompts essential
```
(modern office:1.2), (floor-to-ceiling windows:1.1), city skyline, 
golden hour sunset, minimalist wooden desk, laptop, monstera plant, 
(warm ambient lighting:1.3), professional photograph, 8k, detailed

Negative: cartoon, drawing, illustration, (worst quality:1.4), 
(low quality:1.4), blurry, watermark
```

---

## Style Keywords Reference

### Photography Styles
| Style | Keywords |
|-------|----------|
| Portrait | portrait photography, headshot, bokeh, 85mm lens |
| Product | product photography, studio lighting, white background |
| Landscape | landscape photography, golden hour, dramatic sky |
| Street | street photography, candid, urban, documentary |
| Fashion | fashion editorial, vogue style, high fashion |

### Art Styles
| Style | Keywords |
|-------|----------|
| Realistic | photorealistic, hyperrealistic, 8k, detailed |
| Illustration | digital illustration, vector art, flat design |
| Watercolor | watercolor painting, soft edges, flowing colors |
| Oil Painting | oil painting, brush strokes, impasto |
| Anime | anime style, manga, cel shading |
| 3D Render | 3D render, octane render, blender, CGI |

### Mood/Atmosphere
| Mood | Keywords |
|------|----------|
| Professional | corporate, business, clean, modern |
| Cozy | warm, inviting, comfortable, hygge |
| Dramatic | cinematic, high contrast, moody lighting |
| Cheerful | bright, colorful, happy, vibrant |
| Minimalist | simple, clean, whitespace, zen |

### Lighting
| Type | Keywords |
|------|----------|
| Natural | natural light, soft daylight, golden hour |
| Studio | studio lighting, softbox, rim light |
| Dramatic | chiaroscuro, dramatic shadows, volumetric |
| Neon | neon lights, cyberpunk, colorful glow |

---

## Output Format

```markdown
# Image Generation Prompts: [Concept]

**Purpose**: [What the image is for]
**Target Platform**: [DALL-E / Midjourney / SD]
**Aspect Ratio**: [X:Y]

---

## Primary Prompt

### For DALL-E 3:
```
[Natural language prompt with full description]
```

### For Midjourney:
```
[Keyword-based prompt with parameters]
```

### For Stable Diffusion:
```
[Weighted prompt]

Negative: [Things to avoid]
```

---

## Variations

### Variation 1: [Description]
```
[Prompt]
```

### Variation 2: [Description]
```
[Prompt]
```

### Variation 3: [Description]
```
[Prompt]
```

---

## Style Alternatives

### Option A: [Style Name]
Add these keywords: `[keywords]`

### Option B: [Style Name]
Add these keywords: `[keywords]`

---

## Tips for This Image

1. [Specific tip for achieving desired result]
2. [Tip]
3. [Tip]

---

## Iteration Suggestions

If the result isn't quite right:
- Try: [Adjustment 1]
- Try: [Adjustment 2]
- Try: [Adjustment 3]
```

---

## Common Use Cases

### Business/Corporate
```
Professional headshot, corporate portrait, business casual attire, 
neutral background, studio lighting, confident expression, 
sharp focus, high resolution
```

### Marketing/Social Media
```
Lifestyle product photography, natural setting, soft natural light, 
pastel color palette, Instagram aesthetic, flat lay composition, 
millennial pink, minimalist
```

### Presentation Graphics
```
Abstract business concept, isometric illustration, blue and white 
color scheme, clean design, corporate style, flat design, 
technology theme, professional
```

### Blog/Article Headers
```
Wide banner image, [topic] concept art, editorial style, 
cinematic composition, 16:9 aspect ratio, headline-friendly 
(space for text overlay), muted colors
```

---

## Tips for Better Results

1. **Be specific** - "golden retriever" > "dog"
2. **Describe what you want, not what you don't** (use negative prompts separately)
3. **Use quality modifiers** - "professional", "detailed", "8k"
4. **Reference styles** - "in the style of [artist/genre]"
5. **Specify composition** - "close-up", "wide shot", "bird's eye view"
6. **Include lighting** - dramatically affects mood
7. **Iterate** - refine based on results
8. **Use consistent seeds** for variations (when possible)

---

## Limitations

- Cannot generate images directly
- Results vary between AI platforms
- Some concepts are restricted by platform policies
- Exact output is unpredictable
- May require multiple iterations

---

*Built by the Claude Office Skills community. Contributions welcome!*
