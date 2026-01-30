---
name: dev-slides
description: Create developer-friendly presentations using Slidev - Vue-powered slides with code execution
author: claude-office-skills
version: "1.0"
tags: [presentation, slidev, vue, developer, code]
models: [claude-sonnet-4, claude-opus-4]
tools: [computer, code_execution, file_operations]
library:
  name: slidev
  url: https://github.com/slidevjs/slidev
  stars: 44k
---

# Developer Slides Skill

## Overview

This skill enables creation of developer-focused presentations using **Slidev** - a Vue-powered presentation framework. Write slides in Markdown with live code demos, diagrams, and components.

## How to Use

1. Describe your technical presentation needs
2. I'll generate Slidev markdown with proper syntax
3. Includes code blocks, diagrams, and Vue components

**Example prompts:**
- "Create a Vue.js workshop presentation"
- "Build slides with live code execution"
- "Make a technical talk with diagrams"
- "Create developer onboarding slides"

## Domain Knowledge

### Slidev Basics

```markdown
---
theme: default
title: My Presentation
---

# Welcome

This is the first slide

---

# Second Slide

Content here
```

### Slide Separators

```markdown
---   # New horizontal slide

---   # Another slide
layout: center
---

# Centered Content
```

### Layouts

```markdown
---
layout: cover
---
# Title Slide

---
layout: intro
---
# Introduction

---
layout: center
---
# Centered

---
layout: two-cols
---
# Left
::right::
# Right

---
layout: image-right
image: ./image.png
---
# Content with Image
```

### Code Blocks

```markdown
# Code Example

\`\`\`ts {all|1|2-3|4}
const name = 'Slidev'
const greeting = \`Hello, \${name}!\`
console.log(greeting)
// Outputs: Hello, Slidev!
\`\`\`

<!-- Lines highlighted step by step -->
```

### Monaco Editor (Live Code)

```markdown
\`\`\`ts {monaco}
// Editable code block
function add(a: number, b: number) {
  return a + b
}
\`\`\`

\`\`\`ts {monaco-run}
// Runnable code
console.log('Hello from Slidev!')
\`\`\`
```

### Diagrams (Mermaid)

```markdown
\`\`\`mermaid
graph LR
  A[Start] --> B{Decision}
  B -->|Yes| C[Action 1]
  B -->|No| D[Action 2]
\`\`\`

\`\`\`mermaid
sequenceDiagram
  Client->>Server: Request
  Server-->>Client: Response
\`\`\`
```

### Vue Components

```markdown
<Counter :count="10" />

<Tweet id="1390115482657726468" />

<!-- Custom component -->
<MyComponent v-click />
```

### Animations

```markdown
<v-click>

This appears on click

</v-click>

<v-clicks>

- Item 1
- Item 2
- Item 3

</v-clicks>

<!-- Or with v-click directive -->
<div v-click>Animated content</div>
```

### Frontmatter

```yaml
---
theme: seriph
background: https://source.unsplash.com/collection/94734566/1920x1080
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
css: unocss
---
```

## Examples

### Example: API Workshop
```markdown
---
theme: seriph
background: https://source.unsplash.com/collection/94734566/1920x1080
class: text-center
---

# REST API Workshop

Building Modern APIs with Node.js

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer">
    Press Space for next page <carbon:arrow-right />
  </span>
</div>

---
layout: two-cols
---

# What We'll Cover

<v-clicks>

- RESTful principles
- Express.js basics
- Authentication
- Error handling
- Testing

</v-clicks>

::right::

\`\`\`ts
// Preview
const app = express()
app.get('/api/users', getUsers)
app.listen(3000)
\`\`\`

---

# Live Demo

\`\`\`ts {monaco-run}
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
]

console.log(JSON.stringify(users, null, 2))
\`\`\`

---
layout: center
---

# Questions?

[GitHub](https://github.com) · [Documentation](https://docs.example.com)
```

## Installation

```bash
npm init slidev@latest
```

## Resources

- [Slidev Documentation](https://sli.dev/)
- [GitHub](https://github.com/slidevjs/slidev)
- [Themes](https://sli.dev/themes/gallery.html)
