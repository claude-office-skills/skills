---
name: doc-parser
description: Parse complex documents with IBM's docling - handles tables, figures, and multi-column layouts
author: claude-office-skills
version: "1.0"
tags: [document-parsing, docling, ibm, tables, layout]
models: [claude-sonnet-4, claude-opus-4]
tools: [computer, code_execution, file_operations]
library:
  name: docling
  url: https://github.com/DS4SD/docling
  stars: 51.5k
---

# Document Parser Skill

## Overview

This skill enables advanced document parsing using **docling** - IBM's state-of-the-art document understanding library. Parse complex PDFs, Word documents, and images while preserving structure, extracting tables, figures, and handling multi-column layouts.

## How to Use

1. Provide the document to parse
2. Specify what you want to extract (text, tables, figures, etc.)
3. I'll parse it and return structured data

**Example prompts:**
- "Parse this PDF and extract all tables"
- "Convert this academic paper to structured markdown"
- "Extract figures and captions from this document"
- "Parse this report preserving the document structure"

## Domain Knowledge

### docling Fundamentals

```python
from docling.document_converter import DocumentConverter

# Initialize converter
converter = DocumentConverter()

# Convert document
result = converter.convert("document.pdf")

# Access parsed content
doc = result.document
print(doc.export_to_markdown())
```

### Supported Formats

| Format | Extension | Notes |
|--------|-----------|-------|
| PDF | .pdf | Native and scanned |
| Word | .docx | Full structure preserved |
| PowerPoint | .pptx | Slides as sections |
| Images | .png, .jpg | OCR + layout analysis |
| HTML | .html | Structure preserved |

### Basic Usage

```python
from docling.document_converter import DocumentConverter

# Create converter
converter = DocumentConverter()

# Convert single document
result = converter.convert("report.pdf")

# Access document
doc = result.document

# Export options
markdown = doc.export_to_markdown()
text = doc.export_to_text()
json_doc = doc.export_to_dict()
```

### Advanced Configuration

```python
from docling.document_converter import DocumentConverter
from docling.datamodel.base_models import InputFormat
from docling.datamodel.pipeline_options import PdfPipelineOptions

# Configure pipeline
pipeline_options = PdfPipelineOptions()
pipeline_options.do_ocr = True
pipeline_options.do_table_structure = True
pipeline_options.table_structure_options.do_cell_matching = True

# Create converter with options
converter = DocumentConverter(
    allowed_formats=[InputFormat.PDF, InputFormat.DOCX],
    pdf_backend_options=pipeline_options
)

result = converter.convert("document.pdf")
```

### Document Structure

```python
# Document hierarchy
doc = result.document

# Access metadata
print(doc.name)
print(doc.origin)

# Iterate through content
for element in doc.iterate_items():
    print(f"Type: {element.type}")
    print(f"Text: {element.text}")
    
    if element.type == "table":
        print(f"Rows: {len(element.data.table_cells)}")
```

### Extracting Tables

```python
from docling.document_converter import DocumentConverter
import pandas as pd

def extract_tables(doc_path):
    """Extract all tables from document."""
    converter = DocumentConverter()
    result = converter.convert(doc_path)
    doc = result.document
    
    tables = []
    
    for element in doc.iterate_items():
        if element.type == "table":
            # Get table data
            table_data = element.export_to_dataframe()
            tables.append({
                'page': element.prov[0].page_no if element.prov else None,
                'dataframe': table_data
            })
    
    return tables

# Usage
tables = extract_tables("report.pdf")
for i, table in enumerate(tables):
    print(f"Table {i+1} on page {table['page']}:")
    print(table['dataframe'])
```

### Extracting Figures

```python
def extract_figures(doc_path, output_dir):
    """Extract figures with captions."""
    import os
    
    converter = DocumentConverter()
    result = converter.convert(doc_path)
    doc = result.document
    
    figures = []
    os.makedirs(output_dir, exist_ok=True)
    
    for element in doc.iterate_items():
        if element.type == "picture":
            figure_info = {
                'caption': element.caption if hasattr(element, 'caption') else None,
                'page': element.prov[0].page_no if element.prov else None,
            }
            
            # Save image if available
            if hasattr(element, 'image'):
                img_path = os.path.join(output_dir, f"figure_{len(figures)+1}.png")
                element.image.save(img_path)
                figure_info['path'] = img_path
            
            figures.append(figure_info)
    
    return figures
```

### Handling Multi-column Layouts

```python
from docling.document_converter import DocumentConverter

def parse_multicolumn(doc_path):
    """Parse document with multi-column layout."""
    
    converter = DocumentConverter()
    result = converter.convert(doc_path)
    doc = result.document
    
    # docling automatically handles column detection
    # Text is returned in reading order
    
    structured_content = []
    
    for element in doc.iterate_items():
        content_item = {
            'type': element.type,
            'text': element.text if hasattr(element, 'text') else None,
            'level': element.level if hasattr(element, 'level') else None,
        }
        
        # Add bounding box if available
        if element.prov:
            content_item['bbox'] = element.prov[0].bbox
            content_item['page'] = element.prov[0].page_no
        
        structured_content.append(content_item)
    
    return structured_content
```

### Export Formats

```python
from docling.document_converter import DocumentConverter

converter = DocumentConverter()
result = converter.convert("document.pdf")
doc = result.document

# Markdown export
markdown = doc.export_to_markdown()
with open("output.md", "w") as f:
    f.write(markdown)

# Plain text
text = doc.export_to_text()

# JSON/dict format
json_doc = doc.export_to_dict()

# HTML format (if supported)
# html = doc.export_to_html()
```

### Batch Processing

```python
from docling.document_converter import DocumentConverter
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor

def batch_parse(input_dir, output_dir, max_workers=4):
    """Parse multiple documents in parallel."""
    
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    output_path.mkdir(exist_ok=True)
    
    converter = DocumentConverter()
    
    def process_single(doc_path):
        try:
            result = converter.convert(str(doc_path))
            md = result.document.export_to_markdown()
            
            out_file = output_path / f"{doc_path.stem}.md"
            with open(out_file, 'w') as f:
                f.write(md)
            
            return {'file': str(doc_path), 'status': 'success'}
        except Exception as e:
            return {'file': str(doc_path), 'status': 'error', 'error': str(e)}
    
    docs = list(input_path.glob('*.pdf')) + list(input_path.glob('*.docx'))
    
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        results = list(executor.map(process_single, docs))
    
    return results
```

## Best Practices

1. **Use Appropriate Pipeline**: Configure for your document type
2. **Handle Large Documents**: Process in chunks if needed
3. **Verify Table Extraction**: Complex tables may need review
4. **Check OCR Quality**: Enable OCR for scanned documents
5. **Cache Results**: Store parsed documents for reuse

## Common Patterns

### Academic Paper Parser
```python
def parse_academic_paper(pdf_path):
    """Parse academic paper structure."""
    
    converter = DocumentConverter()
    result = converter.convert(pdf_path)
    doc = result.document
    
    paper = {
        'title': None,
        'abstract': None,
        'sections': [],
        'references': [],
        'tables': [],
        'figures': []
    }
    
    current_section = None
    
    for element in doc.iterate_items():
        text = element.text if hasattr(element, 'text') else ''
        
        if element.type == 'title':
            paper['title'] = text
        
        elif element.type == 'heading':
            if 'abstract' in text.lower():
                current_section = 'abstract'
            elif 'reference' in text.lower():
                current_section = 'references'
            else:
                paper['sections'].append({
                    'title': text,
                    'content': ''
                })
                current_section = 'section'
        
        elif element.type == 'paragraph':
            if current_section == 'abstract':
                paper['abstract'] = text
            elif current_section == 'section' and paper['sections']:
                paper['sections'][-1]['content'] += text + '\n'
        
        elif element.type == 'table':
            paper['tables'].append({
                'caption': element.caption if hasattr(element, 'caption') else None,
                'data': element.export_to_dataframe() if hasattr(element, 'export_to_dataframe') else None
            })
    
    return paper
```

### Report to Structured Data
```python
def parse_business_report(doc_path):
    """Parse business report into structured format."""
    
    converter = DocumentConverter()
    result = converter.convert(doc_path)
    doc = result.document
    
    report = {
        'metadata': {
            'title': None,
            'date': None,
            'author': None
        },
        'executive_summary': None,
        'sections': [],
        'key_metrics': [],
        'recommendations': []
    }
    
    # Parse document structure
    for element in doc.iterate_items():
        # Implement parsing logic based on document structure
        pass
    
    return report
```

## Examples

### Example 1: Parse Financial Report
```python
from docling.document_converter import DocumentConverter

def parse_financial_report(pdf_path):
    """Extract structured data from financial report."""
    
    converter = DocumentConverter()
    result = converter.convert(pdf_path)
    doc = result.document
    
    financial_data = {
        'income_statement': None,
        'balance_sheet': None,
        'cash_flow': None,
        'notes': []
    }
    
    # Extract tables
    tables = []
    for element in doc.iterate_items():
        if element.type == 'table':
            table_df = element.export_to_dataframe()
            
            # Identify table type
            if 'revenue' in str(table_df).lower() or 'income' in str(table_df).lower():
                financial_data['income_statement'] = table_df
            elif 'asset' in str(table_df).lower() or 'liabilities' in str(table_df).lower():
                financial_data['balance_sheet'] = table_df
            elif 'cash' in str(table_df).lower():
                financial_data['cash_flow'] = table_df
            else:
                tables.append(table_df)
    
    # Extract markdown for notes
    financial_data['markdown'] = doc.export_to_markdown()
    
    return financial_data

report = parse_financial_report('annual_report.pdf')
print("Income Statement:")
print(report['income_statement'])
```

### Example 2: Technical Documentation Parser
```python
from docling.document_converter import DocumentConverter

def parse_technical_docs(doc_path):
    """Parse technical documentation."""
    
    converter = DocumentConverter()
    result = converter.convert(doc_path)
    doc = result.document
    
    documentation = {
        'title': None,
        'version': None,
        'sections': [],
        'code_blocks': [],
        'diagrams': []
    }
    
    current_section = None
    
    for element in doc.iterate_items():
        if element.type == 'title':
            documentation['title'] = element.text
        
        elif element.type == 'heading':
            current_section = {
                'title': element.text,
                'level': element.level if hasattr(element, 'level') else 1,
                'content': []
            }
            documentation['sections'].append(current_section)
        
        elif element.type == 'code':
            if current_section:
                current_section['content'].append({
                    'type': 'code',
                    'content': element.text
                })
            documentation['code_blocks'].append(element.text)
        
        elif element.type == 'picture':
            documentation['diagrams'].append({
                'page': element.prov[0].page_no if element.prov else None,
                'caption': element.caption if hasattr(element, 'caption') else None
            })
    
    return documentation

docs = parse_technical_docs('api_documentation.pdf')
print(f"Title: {docs['title']}")
print(f"Sections: {len(docs['sections'])}")
```

### Example 3: Contract Analysis
```python
from docling.document_converter import DocumentConverter

def analyze_contract(pdf_path):
    """Parse contract document for key clauses."""
    
    converter = DocumentConverter()
    result = converter.convert(pdf_path)
    doc = result.document
    
    contract = {
        'parties': [],
        'clauses': [],
        'dates': [],
        'amounts': [],
        'full_text': doc.export_to_text()
    }
    
    import re
    
    # Extract dates
    date_pattern = r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},? \d{4}\b'
    contract['dates'] = re.findall(date_pattern, contract['full_text'], re.IGNORECASE)
    
    # Extract monetary amounts
    amount_pattern = r'\$[\d,]+(?:\.\d{2})?|\b\d+(?:,\d{3})*(?:\.\d{2})?\s*(?:USD|dollars)\b'
    contract['amounts'] = re.findall(amount_pattern, contract['full_text'], re.IGNORECASE)
    
    # Parse sections as clauses
    for element in doc.iterate_items():
        if element.type == 'heading':
            contract['clauses'].append({
                'title': element.text,
                'content': ''
            })
        elif element.type == 'paragraph' and contract['clauses']:
            contract['clauses'][-1]['content'] += element.text + '\n'
    
    return contract

contract_data = analyze_contract('agreement.pdf')
print(f"Key dates: {contract_data['dates']}")
print(f"Amounts: {contract_data['amounts']}")
```

## Limitations

- Very large documents may require chunking
- Handwritten content needs OCR preprocessing
- Complex nested tables may need manual review
- Some PDF types (encrypted) not supported
- GPU recommended for best performance

## Installation

```bash
pip install docling

# For full functionality
pip install docling[all]

# For OCR support
pip install docling[ocr]
```

## Resources

- [docling GitHub](https://github.com/DS4SD/docling)
- [Documentation](https://ds4sd.github.io/docling/)
- [IBM Research Blog](https://research.ibm.com/)
