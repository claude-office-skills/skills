---
name: ai-slides
description: Generate complete presentations with AI - from outline to polished slides
author: claude-office-skills
version: "1.0"
tags: [presentation, ai, automation, slides, content]
models: [claude-sonnet-4, claude-opus-4]
tools: [computer, code_execution, file_operations]
---

# AI Slides Skill

## Overview

This skill enables AI-powered presentation generation. Provide a topic or outline, and get a complete, polished presentation with proper structure, content, and formatting.

## How to Use

1. Provide a topic, outline, or rough notes
2. Specify audience and presentation length
3. I'll generate a complete presentation

**Example prompts:**
- "Create a 10-slide presentation about machine learning"
- "Generate a pitch deck for a SaaS startup"
- "Build training slides on cybersecurity basics"
- "Make a quarterly review presentation from this data"

## Domain Knowledge

### Presentation Structure

```yaml
# Effective presentation structure
structure:
  - title_slide:
      title: "Clear, compelling title"
      subtitle: "Context or tagline"
      author: "Presenter name"
  
  - agenda:
      items: 3-5 main topics
  
  - introduction:
      hook: "Attention-grabbing opening"
      context: "Why this matters"
  
  - main_content:
      sections: 3-5 key points
      each_section:
        - heading
        - 3-5 bullets or visual
        - supporting data
  
  - conclusion:
      summary: "Key takeaways"
      call_to_action: "What to do next"
  
  - closing:
      thank_you: true
      contact_info: true
      qa_prompt: true
```

### Content Generation Pattern

```python
def generate_presentation(topic, audience, slide_count=10):
    """AI-powered presentation generation."""
    
    # 1. Generate outline
    outline = generate_outline(topic, slide_count)
    
    # 2. Expand each section
    slides = []
    for section in outline:
        slide_content = expand_section(section, audience)
        slides.append(slide_content)
    
    # 3. Add visuals suggestions
    for slide in slides:
        slide['visuals'] = suggest_visuals(slide['content'])
    
    # 4. Format as Marp markdown
    presentation = format_as_marp(slides)
    
    return presentation

def generate_outline(topic, count):
    """Generate presentation outline."""
    # Typical structure
    outline = [
        {'type': 'title', 'title': topic},
        {'type': 'agenda'},
        # Main content (60% of slides)
        # ... content slides
        {'type': 'summary'},
        {'type': 'closing'}
    ]
    return outline
```

### Marp Output

```python
def format_as_marp(slides):
    """Convert slides to Marp markdown."""
    
    marp = """---
marp: true
theme: gaia
paginate: true
---

"""
    
    for slide in slides:
        if slide['type'] == 'title':
            marp += f"""<!-- _class: lead -->

# {slide['title']}

{slide.get('subtitle', '')}

---

"""
        elif slide['type'] == 'content':
            marp += f"""# {slide['heading']}

"""
            for point in slide['points']:
                marp += f"- {point}\n"
            marp += "\n---\n\n"
    
    return marp
```

## Example: Generate Tech Talk

```python
topic = "Introduction to Docker"
audience = "Developers new to containers"
slides = 10

# Generated presentation
presentation = """---
marp: true
theme: gaia
paginate: true
---

<!-- _class: lead -->

# Introduction to Docker

Containerization Made Simple

---

# Agenda

1. What is Docker?
2. Core Concepts
3. Getting Started
4. Best Practices
5. Demo

---

# What is Docker?

- Container platform for packaging applications
- Lightweight alternative to VMs
- "Build once, run anywhere"
- 15M+ developers, 7M+ applications

---

# Why Containers?

| VMs | Containers |
|-----|------------|
| GB size | MB size |
| Minutes to start | Seconds to start |
| Full OS | Shared kernel |

---

# Core Concepts

- **Image**: Blueprint/template
- **Container**: Running instance
- **Dockerfile**: Build instructions
- **Registry**: Image storage (Docker Hub)

---

# Getting Started

```bash
# Pull an image
docker pull nginx

# Run a container
docker run -p 8080:80 nginx

# List containers
docker ps
```

---

# Your First Dockerfile

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

---

# Best Practices

- Use official base images
- Minimize layers
- Don't run as root
- Use .dockerignore
- Multi-stage builds

---

# Summary

✅ Docker simplifies deployment
✅ Containers are lightweight & fast
✅ Easy to get started
✅ Industry standard

---

<!-- _class: lead -->

# Questions?

Resources: docs.docker.com
"""
```

## Best Practices

1. **Know Your Audience**: Tailor complexity and examples
2. **One Idea Per Slide**: Keep focused
3. **6x6 Rule**: Max 6 bullets, 6 words each
4. **Visual First**: Suggest images/diagrams
5. **Strong Opening/Closing**: Hook and call-to-action

## Resources

- [Marp](https://marp.app/) - Markdown presentations
- [Slidev](https://sli.dev/) - Vue-powered slides
- [reveal.js](https://revealjs.com/) - HTML presentations
