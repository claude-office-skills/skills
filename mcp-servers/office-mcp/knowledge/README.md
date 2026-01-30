# Knowledge Base Extension Guide

## Architecture Overview

```
knowledge/
├── base/                    # 基础知识 (内置)
│   ├── risk_patterns.json   # 通用风险模式
│   ├── completeness.json    # 完整性检查项
│   └── jurisdictions/       # 司法管辖区
│       ├── us.json
│       ├── california.json
│       ├── china.json
│       └── eu.json
│
├── custom/                  # 用户自定义知识 (可扩展)
│   ├── my_risk_patterns.json
│   ├── my_templates.json
│   └── my_jurisdiction.json
│
└── plugins/                 # 外部知识源插件
    ├── rag_connector.js     # 向量数据库连接
    └── api_connector.js     # 外部 API 连接
```

## How to Customize (以加州律师为例)

### 1. 添加自定义风险模式

创建 `knowledge/custom/california_risks.json`:

```json
{
  "version": "1.0",
  "author": "California Lawyer",
  "extends": "base/risk_patterns.json",
  
  "risk_patterns": {
    "california_at_will": {
      "name": "California At-Will Exception",
      "severity": "high",
      "keywords": ["at-will", "employment at will"],
      "description": "California has stronger employee protections than federal law",
      "recommendation": "Include specific California Labor Code references",
      "legal_references": ["Cal. Lab. Code § 2922"]
    },
    "california_noncompete": {
      "name": "California Non-Compete Ban",
      "severity": "critical",
      "keywords": ["non-compete", "covenant not to compete"],
      "description": "Non-compete clauses are generally void in California (Bus. & Prof. Code § 16600)",
      "recommendation": "Remove non-compete clause or limit to trade secret protection",
      "legal_references": ["Cal. Bus. & Prof. Code § 16600"]
    },
    "california_meal_break": {
      "name": "California Meal/Rest Break",
      "severity": "high",
      "keywords": ["meal break", "rest period", "lunch"],
      "description": "California requires specific meal and rest break provisions",
      "recommendation": "Ensure compliance with Cal. Lab. Code § 512",
      "legal_references": ["Cal. Lab. Code § 512", "Cal. Lab. Code § 226.7"]
    }
  }
}
```

### 2. 添加司法管辖区知识

创建 `knowledge/custom/jurisdiction_california.json`:

```json
{
  "jurisdiction": "california",
  "name": "California, USA",
  "name_zh": "美国加利福尼亚州",
  
  "key_laws": [
    {
      "code": "Cal. Lab. Code",
      "name": "California Labor Code",
      "description": "Primary employment law statute"
    },
    {
      "code": "Cal. Bus. & Prof. Code § 16600",
      "name": "Non-Compete Ban",
      "description": "Prohibits non-compete agreements"
    },
    {
      "code": "Cal. Civ. Code § 1542",
      "name": "Unknown Claims Waiver",
      "description": "Specific language required for releasing unknown claims"
    }
  ],
  
  "special_requirements": {
    "severance_agreements": [
      "Must include 21-day consideration period for employees 40+",
      "Must include 7-day revocation period",
      "Must reference ADEA for age discrimination waiver"
    ],
    "arbitration_clauses": [
      "Cannot waive PAGA representative claims",
      "Must allow recovery of attorney fees"
    ]
  },
  
  "risk_focus": [
    "Non-compete clauses (void in CA)",
    "Meal and rest break provisions",
    "Expense reimbursement requirements",
    "Final paycheck timing"
  ]
}
```

### 3. 在 SKILL.md 中引用自定义知识

```yaml
---
name: contract-review-california
extends: contract-review
author: California Employment Lawyer

# 指定使用的知识库
knowledge:
  base:
    - base/risk_patterns.json
    - base/completeness.json
  custom:
    - custom/california_risks.json
    - custom/jurisdiction_california.json
  
# 覆盖默认行为
overrides:
  default_jurisdiction: california
  severity_boost:
    noncompete: critical  # 在加州，竞业条款是致命问题
---
```

## Integration Methods

### Method 1: JSON Files (Simplest)
- 创建 JSON 文件
- 放入 `knowledge/custom/` 目录
- 自动加载

### Method 2: SKILL.md Extension
- 在 SKILL.md 中指定知识引用
- 支持继承和覆盖

### Method 3: RAG Integration (Advanced)
- 连接向量数据库 (Pinecone, Weaviate, etc.)
- 存储大量案例和文档
- 动态检索相关知识

### Method 4: API Connection
- 连接外部法律数据库
- 实时获取最新法规
- 集成 Westlaw, LexisNexis 等

## Knowledge Schema

所有知识文件遵循统一 Schema:

```typescript
interface KnowledgeFile {
  version: string;
  author?: string;
  extends?: string;  // 继承哪个基础文件
  
  // 具体知识内容
  risk_patterns?: Record<string, RiskPattern>;
  completeness_items?: ChecklistItem[];
  jurisdiction_rules?: JurisdictionRule[];
  templates?: Template[];
}

interface RiskPattern {
  name: string;
  name_zh?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  keywords: string[];
  keywords_zh?: string[];
  description: string;
  recommendation: string;
  legal_references?: string[];
}
```

## Example: Full Workflow for California Lawyer

1. **Install base system**
   ```bash
   cd mcp-servers/office-mcp
   npm install && npm run build
   ```

2. **Add custom knowledge**
   ```bash
   mkdir -p knowledge/custom
   # 创建 california_risks.json
   # 创建 jurisdiction_california.json
   ```

3. **Create custom SKILL.md**
   ```bash
   cp contract-review/ california-contract-review/
   # 编辑 SKILL.md 引用自定义知识
   ```

4. **Use in Claude Desktop**
   ```
   使用 california-contract-review skill 审查这份合同
   ```

## Benefits

✅ **Separation of Concerns** - 工具逻辑与领域知识分离
✅ **Easy Customization** - JSON 文件易于编辑
✅ **Version Control** - 知识库可以 Git 管理
✅ **Inheritance** - 基于通用知识扩展
✅ **Pluggable** - 支持外部知识源
