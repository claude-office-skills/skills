---
name: pdf-to-docx
description: Convert PDF files to editable Word documents using pdf2docx
author: claude-office-skills
version: "1.0"
tags: [pdf, word, conversion, pdf2docx, editable]
models: [claude-sonnet-4, claude-opus-4]
tools: [computer, code_execution, file_operations]
library:
  name: pdf2docx
  url: https://github.com/dothinking/pdf2docx
  stars: 3.3k
---

# PDF to Word Skill

## Overview

This skill enables conversion from PDF to editable Word documents using **pdf2docx** - a Python library that preserves layout, tables, images, and text formatting. Unlike OCR-based solutions, pdf2docx extracts native PDF content for accurate conversion.

## How to Use

1. Provide the PDF file you want to convert
2. Optionally specify pages or conversion options
3. I'll convert it to an editable Word document

**Example prompts:**
- "Convert this PDF report to an editable Word document"
- "Turn pages 1-5 of this PDF into Word format"
- "Extract this scanned document as editable text"
- "Convert this PDF contract to Word for editing"

## Domain Knowledge

### pdf2docx Fundamentals

```python
from pdf2docx import Converter

# Basic conversion
cv = Converter('input.pdf')
cv.convert('output.docx')
cv.close()

# Or using context manager
with Converter('input.pdf') as cv:
    cv.convert('output.docx')
```

### Conversion Options

```python
from pdf2docx import Converter

cv = Converter('input.pdf')

# Full document
cv.convert('output.docx')

# Specific pages (0-indexed)
cv.convert('output.docx', start=0, end=5)

# Single page
cv.convert('output.docx', pages=[0])

# Multiple specific pages
cv.convert('output.docx', pages=[0, 2, 4])

cv.close()
```

### Advanced Options

```python
from pdf2docx import Converter

cv = Converter('input.pdf')

cv.convert(
    'output.docx',
    start=0,                    # Start page (0-indexed)
    end=None,                   # End page (None = last page)
    pages=None,                 # Specific pages list
    password=None,              # PDF password if encrypted
    min_section_height=20.0,    # Minimum height for section
    connected_border_tolerance=0.5,  # Border detection tolerance
    line_overlap_threshold=0.9, # Line merging threshold
    line_break_width_ratio=0.5, # Line break detection
    line_break_free_space_ratio=0.1,
    line_separate_threshold=5,  # Vertical line separation
    new_paragraph_free_space_ratio=0.85,
    float_image_ignorable_gap=5,
    page_margin_factor_top=0.5,
    page_margin_factor_bottom=0.5,
)

cv.close()
```

### Handling Different PDF Types

#### Native PDFs (Text-based)
```python
# Works best with native PDFs
cv = Converter('native_pdf.pdf')
cv.convert('output.docx')
cv.close()
```

#### Scanned PDFs (Image-based)
```python
# For scanned PDFs, use OCR first
# pdf2docx works best with native text PDFs
# Consider using pytesseract or PaddleOCR first

import pytesseract
from pdf2image import convert_from_path

# Convert PDF pages to images
images = convert_from_path('scanned.pdf')

# OCR each page
text = ''
for img in images:
    text += pytesseract.image_to_string(img)

# Then create Word document from text
```

### Python Integration

```python
from pdf2docx import Converter
import os

def pdf_to_word(pdf_path, output_path=None, pages=None):
    """Convert PDF to Word document."""
    if output_path is None:
        output_path = pdf_path.replace('.pdf', '.docx')
    
    cv = Converter(pdf_path)
    
    if pages:
        cv.convert(output_path, pages=pages)
    else:
        cv.convert(output_path)
    
    cv.close()
    
    return output_path

# Usage
result = pdf_to_word('document.pdf')
print(f"Created: {result}")
```

### Batch Conversion

```python
from pdf2docx import Converter
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor

def convert_single(pdf_path, output_dir):
    """Convert single PDF to Word."""
    output_path = output_dir / pdf_path.with_suffix('.docx').name
    
    try:
        cv = Converter(str(pdf_path))
        cv.convert(str(output_path))
        cv.close()
        return f"Success: {pdf_path.name}"
    except Exception as e:
        return f"Error: {pdf_path.name} - {e}"

def batch_convert(input_dir, output_dir, max_workers=4):
    """Convert all PDFs in directory."""
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    output_path.mkdir(exist_ok=True)
    
    pdf_files = list(input_path.glob('*.pdf'))
    
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = [
            executor.submit(convert_single, pdf, output_path)
            for pdf in pdf_files
        ]
        
        for future in futures:
            print(future.result())

batch_convert('./pdfs', './word_docs')
```

### Parsing PDF Structure

```python
from pdf2docx import Converter

def analyze_pdf(pdf_path):
    """Analyze PDF structure before conversion."""
    cv = Converter(pdf_path)
    
    for i, page in enumerate(cv.pages):
        print(f"Page {i+1}:")
        print(f"  Size: {page.width} x {page.height}")
        print(f"  Blocks: {len(page.blocks)}")
        
        for block in page.blocks:
            if hasattr(block, 'text'):
                print(f"    Text block: {block.text[:50]}...")
            elif hasattr(block, 'image'):
                print(f"    Image block")
    
    cv.close()

analyze_pdf('document.pdf')
```

## Best Practices

1. **Check PDF Type**: Native PDFs convert better than scanned
2. **Preview First**: Test with a few pages before full conversion
3. **Handle Tables**: Complex tables may need manual adjustment
4. **Image Quality**: Images are extracted at original resolution
5. **Font Handling**: Some fonts may substitute to system defaults

## Common Patterns

### Convert with Progress
```python
from pdf2docx import Converter

def convert_with_progress(pdf_path, output_path):
    """Convert PDF with progress tracking."""
    cv = Converter(pdf_path)
    
    total_pages = len(cv.pages)
    print(f"Converting {total_pages} pages...")
    
    for i in range(total_pages):
        cv.convert(output_path, start=i, end=i+1)
        progress = (i + 1) / total_pages * 100
        print(f"Progress: {progress:.1f}%")
    
    cv.close()
    print("Conversion complete!")
```

### Extract Tables Only
```python
from pdf2docx import Converter
from docx import Document

def extract_tables_to_word(pdf_path, output_path):
    """Extract only tables from PDF to Word."""
    cv = Converter(pdf_path)
    
    # First do full conversion
    temp_path = 'temp_full.docx'
    cv.convert(temp_path)
    cv.close()
    
    # Open and extract tables
    doc = Document(temp_path)
    new_doc = Document()
    
    for table in doc.tables:
        # Copy table to new document
        new_table = new_doc.add_table(rows=0, cols=len(table.columns))
        
        for row in table.rows:
            new_row = new_table.add_row()
            for i, cell in enumerate(row.cells):
                new_row.cells[i].text = cell.text
        
        new_doc.add_paragraph()  # Add spacing
    
    new_doc.save(output_path)
    os.remove(temp_path)
```

## Examples

### Example 1: Contract Conversion
```python
from pdf2docx import Converter
import os

def convert_contract(pdf_path):
    """Convert contract PDF to editable Word with metadata."""
    
    # Define output path
    base_name = os.path.splitext(pdf_path)[0]
    output_path = f"{base_name}_editable.docx"
    
    # Convert
    cv = Converter(pdf_path)
    
    # Check page count
    page_count = len(cv.pages)
    print(f"Processing {page_count} pages...")
    
    # Convert all pages
    cv.convert(output_path)
    cv.close()
    
    print(f"Created: {output_path}")
    print(f"File size: {os.path.getsize(output_path) / 1024:.1f} KB")
    
    return output_path

# Usage
result = convert_contract('contract.pdf')
```

### Example 2: Selective Page Conversion
```python
from pdf2docx import Converter

def convert_selected_pages(pdf_path, page_ranges, output_path):
    """Convert specific page ranges to Word.
    
    page_ranges: List of tuples like [(1, 3), (5, 7)] for pages 1-3 and 5-7
    """
    cv = Converter(pdf_path)
    
    # Convert pages (0-indexed internally)
    all_pages = []
    for start, end in page_ranges:
        all_pages.extend(range(start - 1, end))  # Convert to 0-indexed
    
    cv.convert(output_path, pages=all_pages)
    cv.close()
    
    print(f"Converted pages: {page_ranges}")
    return output_path

# Convert pages 1-5 and 10-15
convert_selected_pages(
    'long_document.pdf',
    [(1, 5), (10, 15)],
    'selected_pages.docx'
)
```

### Example 3: PDF Report to Editable Template
```python
from pdf2docx import Converter
from docx import Document

def pdf_to_template(pdf_path, output_path):
    """Convert PDF report to Word template with placeholders."""
    
    # Convert PDF to Word
    cv = Converter(pdf_path)
    cv.convert(output_path)
    cv.close()
    
    # Open and add placeholder fields
    doc = Document(output_path)
    
    # Replace common fields with placeholders
    replacements = {
        'Company Name': '[COMPANY_NAME]',
        'Date:': 'Date: [DATE]',
        'Prepared by:': 'Prepared by: [AUTHOR]',
    }
    
    for para in doc.paragraphs:
        for old, new in replacements.items():
            if old in para.text:
                para.text = para.text.replace(old, new)
    
    # Also check tables
    for table in doc.tables:
        for row in table.rows:
            for cell in row.cells:
                for old, new in replacements.items():
                    if old in cell.text:
                        cell.text = cell.text.replace(old, new)
    
    doc.save(output_path)
    print(f"Template created: {output_path}")

pdf_to_template('annual_report.pdf', 'report_template.docx')
```

### Example 4: Bulk Invoice Processing
```python
from pdf2docx import Converter
from pathlib import Path
import json

def process_invoices(input_folder, output_folder):
    """Convert PDF invoices to editable Word documents."""
    
    input_path = Path(input_folder)
    output_path = Path(output_folder)
    output_path.mkdir(exist_ok=True)
    
    results = []
    
    for pdf_file in input_path.glob('*.pdf'):
        output_file = output_path / pdf_file.with_suffix('.docx').name
        
        try:
            cv = Converter(str(pdf_file))
            cv.convert(str(output_file))
            cv.close()
            
            results.append({
                'file': pdf_file.name,
                'status': 'success',
                'output': str(output_file)
            })
            
        except Exception as e:
            results.append({
                'file': pdf_file.name,
                'status': 'error',
                'error': str(e)
            })
    
    # Save results log
    with open(output_path / 'conversion_log.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    # Summary
    success = sum(1 for r in results if r['status'] == 'success')
    print(f"Converted {success}/{len(results)} files")
    
    return results

results = process_invoices('./invoices_pdf', './invoices_word')
```

## Limitations

- Scanned PDFs require OCR preprocessing
- Complex layouts may not convert perfectly
- Some fonts may not be available
- Watermarks are included in conversion
- Protected/encrypted PDFs need password

## Installation

```bash
pip install pdf2docx

# For image handling
pip install Pillow
```

## Resources

- [GitHub Repository](https://github.com/dothinking/pdf2docx)
- [Documentation](https://pdf2docx.readthedocs.io/)
- [PyPI Package](https://pypi.org/project/pdf2docx/)
