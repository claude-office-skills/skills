# Claude Office Skills - 本地测试指南

## 测试前配置

### Claude Desktop MCP 配置

编辑 `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "office-skills": {
      "command": "node",
      "args": ["/Users/kingsoft/Desktop/claude-office-skills/mcp-servers/office-mcp/dist/index.js"]
    }
  }
}
```

> 注意：需要先编译 `npm run build`，或使用 `npx ts-node` 直接运行

---

## 10 个关键测试案例

### 测试 1: Contract Review（合同审查）

**Skill 路径**: `contract-review/SKILL.md`

**测试提示词**:
```
请使用 contract-review skill 帮我审查这份合同。

我是乙方（服务提供方），这是一份中国的服务合同。
请重点关注：责任限制、知识产权归属、违约条款。

[粘贴合同内容或上传文件]
```

**预期输出**:
- 风险摘要（高/中/低）
- 具体条款分析
- 谈判建议

---

### 测试 2: Invoice Generator（发票生成）

**Skill 路径**: `invoice-generator/SKILL.md`

**测试提示词**:
```
请使用 invoice-generator skill 为我生成一份发票：

客户信息：
- 公司名：北京科技有限公司
- 地址：北京市朝阳区xxx路100号
- 联系人：张经理

服务项目：
1. 网站设计 - 1项 - ¥15,000
2. 前端开发 - 40小时 - ¥500/小时
3. 后端开发 - 60小时 - ¥600/小时

税率：6%
付款条件：收到发票后30天内支付
```

**预期输出**:
- 格式化的发票（Markdown 或 DOCX）
- 正确的金额计算
- 专业的排版

---

### 测试 3: Data Analysis（数据分析）

**Skill 路径**: `data-analysis/SKILL.md`

**测试提示词**:
```
请使用 data-analysis skill 分析这份销售数据：

| 月份 | 产品A销量 | 产品B销量 | 产品A收入 | 产品B收入 |
|------|----------|----------|----------|----------|
| 1月  | 150      | 200      | 45000    | 40000    |
| 2月  | 180      | 190      | 54000    | 38000    |
| 3月  | 220      | 210      | 66000    | 42000    |
| 4月  | 200      | 250      | 60000    | 50000    |
| 5月  | 190      | 280      | 57000    | 56000    |
| 6月  | 250      | 300      | 75000    | 60000    |

请分析：
1. 整体趋势
2. 产品对比
3. 下季度预测
```

**预期输出**:
- 数据概览
- 趋势分析
- 可视化建议
- 业务建议

---

### 测试 4: Resume Tailor（简历优化）

**Skill 路径**: `resume-tailor/SKILL.md`

**测试提示词**:
```
请使用 resume-tailor skill 帮我优化简历。

目标职位：高级产品经理 - AI产品方向
公司：字节跳动

我的背景：
- 5年产品经验
- 主导过3个从0到1的产品
- 熟悉用户增长和商业化
- 有AI产品经验（ChatBot、智能推荐）

请根据这个JD优化我的简历重点：
- 熟悉AI产品规划和落地
- 有ToB/ToC产品经验
- 数据驱动决策能力
```

**预期输出**:
- 关键词匹配分析
- 简历优化建议
- 重写的要点

---

### 测试 5: Meeting Notes（会议纪要）

**Skill 路径**: `meeting-notes/SKILL.md`

**测试提示词**:
```
请使用 meeting-notes skill 帮我整理这次会议记录：

会议主题：Q2产品规划讨论
参会人：张总、李经理、王工程师、刘设计师
时间：2025年1月30日 14:00-15:30

讨论内容：
张总说我们Q2要重点做AI功能，预算500万。李经理提出用户反馈最多的是文档协作卡顿，建议先优化性能。王工程师说性能优化需要2个月，同时可以并行开发AI功能。刘设计师说AI功能的界面原型已经有初稿了，下周可以评审。最后决定：1）2月先启动性能优化；2）3月开始AI功能开发；3）下周三评审设计稿。
```

**预期输出**:
- 结构化的会议纪要
- 关键决议
- 行动项（含负责人和截止日期）

---

### 测试 6: Proposal Writer（方案撰写）

**Skill 路径**: `proposal-writer/SKILL.md`

**测试提示词**:
```
请使用 proposal-writer skill 帮我写一份合作提案：

背景：
- 我们是一家AI技术公司
- 目标客户：某大型银行
- 项目：智能客服系统升级

需要包含：
1. 项目背景和痛点分析
2. 解决方案概述
3. 技术架构简介
4. 实施计划（3个月）
5. 报价概要（100-200万区间）
6. 我们的优势
```

**预期输出**:
- 专业的商业提案结构
- 有说服力的内容
- 清晰的报价

---

### 测试 7: Email Drafter（邮件起草）

**Skill 路径**: `email-drafter/SKILL.md`

**测试提示词**:
```
请使用 email-drafter skill 帮我写一封邮件：

场景：跟进客户的项目进度
收件人：客户的项目负责人 王总
关系：合作过2次，关系不错

要点：
1. 上周演示反馈很好
2. 需要确认下一步的POC计划
3. 想约个时间讨论详细需求
4. 语气要专业但友好

请用中文撰写。
```

**预期输出**:
- 专业的邮件格式
- 恰当的语气
- 清晰的行动呼吁

---

### 测试 8: PDF Extraction（PDF提取）

**Skill 路径**: `pdf-extraction/SKILL.md`

**测试提示词**:
```
请使用 pdf-extraction skill 帮我从这份PDF中提取关键信息：

[上传一份财务报告或合同PDF]

请提取：
1. 所有表格数据
2. 关键数字（金额、日期、百分比）
3. 重要条款或段落
```

**预期输出**:
- 结构化的提取内容
- 表格转换为Markdown
- 关键信息汇总

---

### 测试 9: Weekly Report（周报生成）

**Skill 路径**: `weekly-report/SKILL.md`

**测试提示词**:
```
请使用 weekly-report skill 帮我写周报：

本周完成：
- 完成了用户调研报告
- 和开发讨论了技术方案
- 参加了3个会议
- 处理了5个客户问题

下周计划：
- 输出PRD文档
- 启动设计评审
- 准备月度汇报

遇到的问题：
- 开发资源紧张，可能影响进度
```

**预期输出**:
- 结构化的周报格式
- 量化的工作成果
- 清晰的风险和依赖

---

### 测试 10: NDA Generator（保密协议生成）

**Skill 路径**: `nda-generator/SKILL.md`

**测试提示词**:
```
请使用 nda-generator skill 帮我生成一份双向保密协议：

披露方：北京创新科技有限公司
接收方：上海合作伙伴有限公司

合作目的：探讨AI产品合作可能性
保密期限：3年
适用法律：中华人民共和国法律

需要包含：
- 保密信息定义
- 双方义务
- 违约责任
- 例外情况
```

**预期输出**:
- 完整的NDA文档
- 符合中国法律的条款
- 双语（如需要）

---

## 测试数据文件

测试用的示例文件放在 `test-cases/data/` 目录：

- `sample_contract.txt` - 示例合同
- `sales_data.csv` - 示例销售数据
- `sample_resume.md` - 示例简历
- `meeting_transcript.txt` - 会议记录原文

---

## 测试检查清单

| # | Skill | 测试通过 | 备注 |
|---|-------|---------|------|
| 1 | contract-review | ☐ | |
| 2 | invoice-generator | ☐ | |
| 3 | data-analysis | ☐ | |
| 4 | resume-tailor | ☐ | |
| 5 | meeting-notes | ☐ | |
| 6 | proposal-writer | ☐ | |
| 7 | email-drafter | ☐ | |
| 8 | pdf-extraction | ☐ | |
| 9 | weekly-report | ☐ | |
| 10 | nda-generator | ☐ | |

---

## 问题反馈

测试中发现的问题请记录在 `test-cases/issues.md`
