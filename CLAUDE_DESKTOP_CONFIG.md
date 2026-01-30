# Claude Desktop Configuration Guide

## Method 1: Project Knowledge (Recommended)

### Step 1: Create a Project in Claude Desktop

1. Open Claude Desktop
2. Click on the **Projects** icon in the left sidebar
3. Click **"New Project"**
4. Name it: `Office Skills` or `工作技能`

### Step 2: Add Skills to Project Knowledge

1. In your new project, click **"Add content"** or the **"+"** button
2. Select **"Add files"**
3. Navigate to: `/Users/kingsoft/Desktop/claude-office-skills/`
4. **Add these key files:**
   - `SKILLS_INDEX.md` (required - skills reference)
   - Individual skill folders as needed, e.g.:
     - `stock-analysis/SKILL.md`
     - `contract-review/SKILL.md`
     - `dcf-valuation/SKILL.md`
     - `image-generation/SKILL.md`

### Step 3: (Optional) Add All Skills

To add all skills at once:
1. Select the entire `claude-office-skills` folder
2. Or add individual SKILL.md files from each skill folder

### Step 4: Start Using

In your project chat, ask:
```
Use the stock-analysis skill to analyze Apple (AAPL) stock
```

Or simply describe what you need:
```
Analyze Tesla stock for investment decision
```

---

## Method 2: Quick Copy-Paste

For quick testing without project setup:

1. Open the skill file you want to use
2. Copy the entire content of SKILL.md
3. Paste it into Claude Desktop as context
4. Then ask your question

Example:
```
[Paste content of stock-analysis/SKILL.md]

Now analyze NVIDIA stock for me
```

---

## Method 3: Custom Instructions

Add to your Claude Desktop **Custom Instructions**:

```
I have access to Claude Office Skills, a collection of 77+ professional skills for office tasks. When I mention a skill like "stock-analysis" or "contract-review", refer to the knowledge in my project files to use the appropriate methodology.

Key skills include:
- Finance: stock-analysis, dcf-valuation, financial-modeling
- Research: deep-research, competitive-analysis, academic-search
- Visualization: diagram-creator, chart-designer, image-generation
- Documents: contract-review, invoice-generator, proposal-writer
```

---

## Testing Your Setup

Try these prompts to verify skills are working:

### Test 1: Stock Analysis
```
Use the stock-analysis skill to analyze Microsoft (MSFT)
```

### Test 2: Contract Review
```
Use the contract-review skill to analyze this employment contract:
[paste contract text]
```

### Test 3: DCF Valuation
```
Use the dcf-valuation skill to value a SaaS company with:
- Revenue: $50M, growing 30% annually
- Gross Margin: 75%
- Net Retention: 120%
```

### Test 4: Image Generation
```
Use the image-generation skill to create a prompt for: 
A modern tech startup office interior
```

### Test 5: Research
```
Use the deep-research skill to research: 
"AI adoption in enterprise software 2024"
```

---

## Troubleshooting

### Claude not recognizing skills?

1. **Check Project Knowledge**: Make sure SKILLS_INDEX.md is added
2. **Explicit skill name**: Use "Use the [skill-name] skill to..."
3. **Refresh**: Try creating a new conversation in the project

### Skills not in Project files?

The skills are located at:
```
/Users/kingsoft/Desktop/claude-office-skills/
```

Each skill has its own folder with a `SKILL.md` file.

---

## File Locations

| Item | Path |
|------|------|
| All Skills | `/Users/kingsoft/Desktop/claude-office-skills/` |
| Skills Index | `/Users/kingsoft/Desktop/claude-office-skills/SKILLS_INDEX.md` |
| Test Prompts | `/Users/kingsoft/Desktop/claude-office-skills/test-cases/QUICK_TEST_PROMPTS.md` |
| Stock Analysis | `/Users/kingsoft/Desktop/claude-office-skills/stock-analysis/SKILL.md` |
| DCF Valuation | `/Users/kingsoft/Desktop/claude-office-skills/dcf-valuation/SKILL.md` |
| Contract Review | `/Users/kingsoft/Desktop/claude-office-skills/contract-review/SKILL.md` |

---

*Claude Office Skills - Configuration Guide*
