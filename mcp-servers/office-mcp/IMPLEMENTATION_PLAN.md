# Office MCP - Implementation Plan

> 从占位符到真实实现的完整计划

---

## 总览

| Phase | 模块 | 工具数 | 预计工作量 | 状态 |
|-------|------|--------|------------|------|
| Phase 1 | PDF | 8 | ✅ 已完成 | ✅ Done |
| Phase 2 | Spreadsheet | 7 | ✅ 已完成 | ✅ Done |
| Phase 3 | Document | 6 | ✅ 已完成 | ✅ Done |
| Phase 4 | Conversion | 9 | ✅ 已完成 | ✅ Done |
| Phase 5 | Presentation | 7 | ✅ 已完成 | ✅ Done |

**总计: 37 个工具 - 全部实现完成！** 🎉

---

## Phase 1: PDF ✅ 已完成

**依赖**: pdf-parse, pdf-lib

| 工具 | 状态 | 实现 |
|------|------|------|
| extract_text_from_pdf | ✅ | pdf-parse 提取文本 |
| extract_tables_from_pdf | ✅ | 基于间距的表格检测 |
| merge_pdfs | ✅ | pdf-lib 合并 |
| split_pdf | ✅ | pdf-lib 按页/范围拆分 |
| compress_pdf | ✅ | pdf-lib 优化 |
| add_watermark_to_pdf | ✅ | pdf-lib 文字水印 |
| fill_pdf_form | ✅ | pdf-lib 表单填充 |
| get_pdf_metadata | ✅ | pdf-lib + pdf-parse 元数据 |

---

## Phase 2: Spreadsheet (Excel)

**核心依赖**: xlsx (已安装)

**预计时间**: 1-2小时

### 工具清单

| # | 工具 | 功能 | 实现方案 |
|---|------|------|----------|
| 1 | `read_xlsx` | 读取Excel数据 | xlsx.readFile + sheet_to_json |
| 2 | `create_xlsx` | 创建Excel文件 | xlsx.utils + writeFile |
| 3 | `analyze_spreadsheet` | 数据统计分析 | 遍历计算统计值 |
| 4 | `apply_formula` | 应用公式 | xlsx 单元格公式 |
| 5 | `create_chart` | 创建图表 | 返回图表配置（实际图表需前端渲染） |
| 6 | `pivot_table` | 透视表 | 手动实现分组聚合 |
| 7 | `xlsx_to_json` | 转JSON | xlsx.sheet_to_json |

### 实现步骤

```
1. 导入 xlsx 库
2. 实现 read_xlsx（最基础）
3. 实现 xlsx_to_json（简单）
4. 实现 create_xlsx
5. 实现 analyze_spreadsheet
6. 实现 apply_formula
7. 实现 pivot_table
8. create_chart（返回配置）
9. 测试所有功能
10. 更新文档
```

---

## Phase 3: Document (Word)

**核心依赖**: mammoth (已安装), docx, docxtemplater

**需要安装**:
```bash
npm install docx docxtemplater pizzip docx-merger
```

**预计时间**: 2-3小时

### 工具清单

| # | 工具 | 功能 | 实现方案 |
|---|------|------|----------|
| 1 | `extract_text_from_docx` | 提取文本 | mammoth.extractRawText |
| 2 | `create_docx` | 创建文档 | docx 库创建 |
| 3 | `fill_docx_template` | 模板填充 | docxtemplater |
| 4 | `analyze_document_structure` | 分析结构 | mammoth 解析 |
| 5 | `insert_table_to_docx` | 插入表格 | docx Table |
| 6 | `merge_docx_files` | 合并文档 | docx-merger |

### 实现步骤

```
1. 安装额外依赖
2. 实现 extract_text_from_docx（mammoth）
3. 实现 analyze_document_structure
4. 实现 create_docx（docx库）
5. 实现 insert_table_to_docx
6. 实现 fill_docx_template（docxtemplater）
7. 实现 merge_docx_files
8. 测试所有功能
9. 更新文档
```

---

## Phase 4: Conversion (格式转换)

**核心依赖**: 混合（xlsx, mammoth, turndown, marked, puppeteer）

**需要安装**:
```bash
npm install turndown puppeteer
# 可选：系统级安装 pandoc 或 libreoffice
```

**预计时间**: 3-4小时

### 工具清单

| # | 工具 | 功能 | 实现方案 |
|---|------|------|----------|
| 1 | `xlsx_to_csv` | Excel→CSV | xlsx.sheet_to_csv |
| 2 | `csv_to_xlsx` | CSV→Excel | xlsx 读取CSV写入xlsx |
| 3 | `json_to_xlsx` | JSON→Excel | xlsx.json_to_sheet |
| 4 | `docx_to_md` | Word→Markdown | mammoth + turndown |
| 5 | `md_to_docx` | Markdown→Word | marked + docx |
| 6 | `html_to_pdf` | HTML→PDF | puppeteer |
| 7 | `docx_to_pdf` | Word→PDF | libreoffice/外部命令 |
| 8 | `pdf_to_docx` | PDF→Word | 复杂，可能需要外部服务 |
| 9 | `batch_convert` | 批量转换 | 调用其他转换函数 |

### 实现优先级

```
高优先（纯JS可实现）:
  - xlsx_to_csv ⭐
  - csv_to_xlsx ⭐
  - json_to_xlsx ⭐
  - docx_to_md ⭐

中优先（需要额外依赖）:
  - md_to_docx
  - html_to_pdf (puppeteer)

低优先（需要外部工具）:
  - docx_to_pdf (需要 libreoffice)
  - pdf_to_docx (复杂)
  - batch_convert (依赖其他)
```

---

## Phase 5: Presentation (PPT)

**核心依赖**: pptxgenjs, pptx-parser (需要评估)

**需要安装**:
```bash
npm install pptxgenjs
# pptx-parser 可能需要替代方案
```

**预计时间**: 3-4小时

### 工具清单

| # | 工具 | 功能 | 实现方案 |
|---|------|------|----------|
| 1 | `create_pptx` | 创建PPT | pptxgenjs |
| 2 | `add_slide` | 添加幻灯片 | pptxgenjs |
| 3 | `update_slide` | 更新幻灯片 | 读取+修改+保存 |
| 4 | `extract_from_pptx` | 提取内容 | 解析PPTX(XML) |
| 5 | `get_pptx_outline` | 获取大纲 | 解析标题 |
| 6 | `md_to_pptx` | Markdown→PPT | marked + pptxgenjs |
| 7 | `pptx_to_html` | PPT→HTML | 生成reveal.js |

### 实现优先级

```
高优先（pptxgenjs 原生支持）:
  - create_pptx ⭐
  - add_slide ⭐

中优先:
  - md_to_pptx
  - get_pptx_outline

低优先（复杂）:
  - extract_from_pptx
  - update_slide
  - pptx_to_html
```

---

## 执行计划

### Week 1
- [x] Phase 1: PDF (已完成)
- [ ] Phase 2: Spreadsheet

### Week 2
- [ ] Phase 3: Document
- [ ] Phase 4: Conversion (高优先部分)

### Week 3
- [ ] Phase 4: Conversion (剩余部分)
- [ ] Phase 5: Presentation

---

## 测试策略

每个 Phase 完成后：

1. **单元测试**: 每个工具函数独立测试
2. **集成测试**: Claude Desktop 实际调用测试
3. **文档更新**: 更新 README 和示例

### 测试文件

```
test-cases/
├── spreadsheet/
│   ├── sample.xlsx
│   └── data.csv
├── document/
│   ├── sample.docx
│   └── template.docx
├── presentation/
│   └── sample.pptx
└── conversion/
    ├── test.md
    └── test.html
```

---

## 依赖汇总

### 已安装
- pdf-parse ✅
- pdf-lib ✅
- xlsx ✅
- mammoth ✅
- marked ✅
- turndown ✅

### 需要安装
```bash
# Phase 3: Document
npm install docx docxtemplater pizzip docx-merger

# Phase 4: Conversion
npm install puppeteer

# Phase 5: Presentation
npm install pptxgenjs
```

### 可选（系统级）
- pandoc - 万能格式转换
- libreoffice - DOCX→PDF
- tesseract - OCR

---

## 风险和备选方案

| 风险 | 影响 | 备选方案 |
|------|------|----------|
| DOCX→PDF 需要 LibreOffice | 部分功能受限 | 提示用户安装，或使用云服务 |
| PDF→DOCX 实现复杂 | 功能受限 | 使用外部 API 或简化实现 |
| PPT 解析库不完善 | 提取功能受限 | 手动解析 PPTX (ZIP+XML) |
| 大文件处理 | 内存/性能 | 流式处理，分块读取 |

---

## 完成标准

每个 Phase 完成的定义：

1. ✅ 所有工具函数已实现（非占位符）
2. ✅ TypeScript 编译无错误
3. ✅ Claude Desktop 可正常调用
4. ✅ 错误处理完善
5. ✅ 文档已更新

---

**开始时间**: 2026-01-30
**预计完成**: 2026-02-06 (1周)

---

*Let's build the best office tools for AI!* 🚀
