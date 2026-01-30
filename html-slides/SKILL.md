---
name: html-slides
description: Create interactive HTML presentations using reveal.js - the web's most popular presentation framework
author: claude-office-skills
version: "1.0"
tags: [presentation, reveal.js, html, slides, interactive]
models: [claude-sonnet-4, claude-opus-4]
tools: [computer, code_execution, file_operations]
library:
  name: reveal.js
  url: https://github.com/hakimel/reveal.js
  stars: 70.5k
---

# HTML Slides Skill

## Overview

This skill enables creation of stunning HTML-based presentations using **reveal.js** - the web's most popular presentation framework. Create interactive, responsive slides with animations, code highlighting, speaker notes, and more.

## How to Use

1. Describe the presentation you want to create
2. Specify theme, transitions, and features needed
3. I'll generate a reveal.js presentation

**Example prompts:**
- "Create an interactive presentation about our product"
- "Build a code walkthrough presentation with syntax highlighting"
- "Make a presentation with speaker notes and timer"
- "Create slides with animations and transitions"

## Domain Knowledge

### reveal.js Basics

```html
<!doctype html>
<html>
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4/dist/reveal.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4/dist/theme/black.css">
</head>
<body>
    <div class="reveal">
        <div class="slides">
            <section>Slide 1</section>
            <section>Slide 2</section>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4/dist/reveal.js"></script>
    <script>Reveal.initialize();</script>
</body>
</html>
```

### Slide Structure

```html
<!-- Horizontal slides -->
<section>Slide 1</section>
<section>Slide 2</section>

<!-- Vertical slides (nested) -->
<section>
    <section>Vertical 1</section>
    <section>Vertical 2</section>
</section>

<!-- Markdown slides -->
<section data-markdown>
    <textarea data-template>
        ## Slide Title
        - Point 1
        - Point 2
    </textarea>
</section>
```

### Themes

Built-in themes: `black`, `white`, `league`, `beige`, `sky`, `night`, `serif`, `simple`, `solarized`, `blood`, `moon`

```html
<link rel="stylesheet" href="reveal.js/dist/theme/moon.css">
```

### Transitions

```javascript
Reveal.initialize({
    transition: 'slide',  // none, fade, slide, convex, concave, zoom
    transitionSpeed: 'default',  // default, fast, slow
    backgroundTransition: 'fade'
});
```

### Fragments (Animations)

```html
<section>
    <p class="fragment">Appears first</p>
    <p class="fragment fade-in">Then this</p>
    <p class="fragment fade-up">Then this</p>
    <p class="fragment highlight-red">Highlight</p>
</section>
```

Fragment styles: `fade-in`, `fade-out`, `fade-up`, `fade-down`, `fade-left`, `fade-right`, `highlight-red`, `highlight-blue`, `highlight-green`, `strike`

### Code Highlighting

```html
<section>
    <pre><code data-trim data-line-numbers="1|3-4">
def hello():
    print("Hello")
    print("World")
    return True
    </code></pre>
</section>
```

### Speaker Notes

```html
<section>
    <h2>Slide Title</h2>
    <p>Content</p>
    <aside class="notes">
        Speaker notes go here. Press 'S' to view.
    </aside>
</section>
```

### Backgrounds

```html
<!-- Color background -->
<section data-background-color="#4d7e65">

<!-- Image background -->
<section data-background-image="image.jpg" data-background-size="cover">

<!-- Video background -->
<section data-background-video="video.mp4">

<!-- Gradient background -->
<section data-background-gradient="linear-gradient(to bottom, #283b95, #17b2c3)">
```

### Configuration

```javascript
Reveal.initialize({
    // Display controls
    controls: true,
    controlsTutorial: true,
    progress: true,
    slideNumber: true,
    
    // Behavior
    hash: true,
    respondToHashChanges: true,
    history: true,
    keyboard: true,
    overview: true,
    center: true,
    touch: true,
    loop: false,
    rtl: false,
    shuffle: false,
    
    // Timing
    autoSlide: 0,  // 0 = disabled
    autoSlideStoppable: true,
    
    // Appearance
    width: 960,
    height: 700,
    margin: 0.04,
    minScale: 0.2,
    maxScale: 2.0,
    
    // Plugins
    plugins: [RevealMarkdown, RevealHighlight, RevealNotes]
});
```

## Examples

### Example 1: Tech Talk
```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>API Design Best Practices</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4/dist/reveal.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4/dist/theme/night.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4/plugin/highlight/monokai.css">
</head>
<body>
    <div class="reveal">
        <div class="slides">
            <section data-background-gradient="linear-gradient(to bottom right, #1a1a2e, #16213e)">
                <h1>API Design</h1>
                <h3>Best Practices for 2024</h3>
                <p><small>Engineering Team</small></p>
            </section>
            
            <section>
                <h2>Agenda</h2>
                <ol>
                    <li class="fragment">RESTful Principles</li>
                    <li class="fragment">Authentication</li>
                    <li class="fragment">Error Handling</li>
                    <li class="fragment">Documentation</li>
                </ol>
            </section>
            
            <section>
                <section>
                    <h2>RESTful Principles</h2>
                </section>
                <section>
                    <h3>Resource Naming</h3>
                    <pre><code data-trim class="language-http">
GET /users           # Collection
GET /users/123       # Single resource
POST /users          # Create
PUT /users/123       # Update
DELETE /users/123    # Delete
                    </code></pre>
                </section>
            </section>
            
            <section>
                <h2>Questions?</h2>
                <p>api-team@company.com</p>
            </section>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4/dist/reveal.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4/plugin/highlight/highlight.js"></script>
    <script>
        Reveal.initialize({
            hash: true,
            plugins: [RevealHighlight]
        });
    </script>
</body>
</html>
```

### Example 2: Product Launch
```html
<!doctype html>
<html>
<head>
    <title>Product Launch</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4/dist/reveal.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4/dist/theme/white.css">
    <style>
        .reveal h1 { color: #2d3748; }
        .metric { font-size: 3em; color: #3182ce; }
    </style>
</head>
<body>
    <div class="reveal">
        <div class="slides">
            <section data-background-color="#f7fafc">
                <h1>Introducing</h1>
                <h2 style="color: #3182ce;">ProductX 2.0</h2>
            </section>
            
            <section>
                <h2>The Problem</h2>
                <p class="fragment">Teams waste <span class="metric">20%</span> of time on manual tasks</p>
            </section>
            
            <section data-auto-animate>
                <h2>Our Solution</h2>
                <div data-id="box" style="background: #3182ce; padding: 20px;">
                    AI-Powered Automation
                </div>
            </section>
            
            <section data-auto-animate>
                <h2>Our Solution</h2>
                <div data-id="box" style="background: #38a169; padding: 40px; width: 400px;">
                    <p>AI-Powered Automation</p>
                    <p>90% faster</p>
                </div>
            </section>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4/dist/reveal.js"></script>
    <script>Reveal.initialize();</script>
</body>
</html>
```

## Resources

- [reveal.js Documentation](https://revealjs.com/)
- [GitHub Repository](https://github.com/hakimel/reveal.js)
- [Demo Slides](https://revealjs.com/demo/)
