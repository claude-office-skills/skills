---
name: PDF Compress
description: Reduce PDF file size while maintaining acceptable quality
author: claude-office-skills
version: "1.0"
tags: [pdf, compression, optimization, file-size, performance]
models: [claude-sonnet-4, claude-opus-4]
tools: [computer, file_operations]
---

# PDF Compress

Reduce PDF file sizes for easier sharing, faster loading, and efficient storage.

## Overview

This skill helps you:
- Reduce PDF file sizes significantly
- Balance quality vs. file size
- Optimize for specific use cases (web, print, archive)
- Batch compress multiple files
- Understand compression trade-offs

## How to Use

### Basic Compression
```
"Compress this PDF to reduce file size"
"Make this PDF smaller for email"
"Optimize this PDF for web viewing"
```

### With Targets
```
"Compress this PDF to under 5 MB"
"Reduce file size by at least 50%"
"Optimize for minimum file size"
```

### Quality Levels
```
"Compress with high quality (minimal loss)"
"Compress for screen viewing"
"Maximum compression, quality not critical"
```

## Compression Levels

### Presets
| Level | Target Use | Image Quality | Size Reduction |
|-------|------------|---------------|----------------|
| **Minimum** | Archival | Original | 5-15% |
| **Low** | Print | Near original | 15-30% |
| **Medium** | General use | Good | 30-50% |
| **High** | Email/Web | Acceptable | 50-70% |
| **Maximum** | Preview only | Reduced | 70-90% |

### Use Case Recommendations
| Use Case | Recommended Level | Reason |
|----------|-------------------|--------|
| Print production | Minimum/Low | Quality critical |
| Email attachment | Medium/High | Balance size/quality |
| Web download | High | Fast loading |
| Quick preview | Maximum | Speed priority |
| Archive | Low | Long-term quality |
| Presentation | Medium | Good on-screen |

## Compression Techniques

### Image Optimization
```markdown
## Image Compression Settings

### Resolution Reduction
| Target | DPI | Use For |
|--------|-----|---------|
| Screen | 72 | Web viewing |
| eBook | 150 | Digital documents |
| Print-basic | 200 | Office printing |
| Print-quality | 300 | Professional print |
| Original | N/A | No reduction |

### Format Conversion
| From | To | Savings | Quality Impact |
|------|-----|---------|----------------|
| TIFF | JPEG | 70-90% | Some loss |
| PNG | JPEG | 50-80% | Some loss |
| BMP | JPEG | 90%+ | Some loss |
| JPEG | JPEG (recompress) | 20-50% | Cumulative loss |

### Quality Levels
| Setting | JPEG Quality | Visual Impact |
|---------|--------------|---------------|
| Maximum | 90-100 | Imperceptible |
| High | 75-89 | Minimal |
| Medium | 50-74 | Noticeable on zoom |
| Low | 25-49 | Visible artifacts |
```

### Content Optimization
```markdown
## Additional Optimizations

### Font Optimization
- [ ] Subset fonts (remove unused characters)
- [ ] Convert to standard fonts where possible
- [ ] Remove duplicate font instances

### Structure Optimization
- [ ] Remove unused objects
- [ ] Clean up metadata
- [ ] Linearize for web (fast web view)
- [ ] Remove bookmarks (optional)
- [ ] Remove comments/annotations (optional)

### Content Removal (Caution)
- [ ] Remove hidden layers
- [ ] Remove JavaScript
- [ ] Remove form fields
- [ ] Remove embedded files
```

## Output Report

### Compression Report
```markdown
## PDF Compression Report

### File Summary
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **File Size** | 45.2 MB | 8.7 MB | -81% |
| **Pages** | 120 | 120 | - |
| **Images** | 89 | 89 | - |

### Compression Applied
| Technique | Savings |
|-----------|---------|
| Image downsampling (150 DPI) | 28.5 MB |
| JPEG compression (75%) | 5.2 MB |
| Font subsetting | 1.8 MB |
| Object cleanup | 1.0 MB |
| **Total Savings** | **36.5 MB (81%)** |

### Quality Assessment
| Aspect | Rating | Notes |
|--------|--------|-------|
| Text clarity | ⭐⭐⭐⭐⭐ | No change |
| Image sharpness | ⭐⭐⭐⭐ | Slight softening |
| Color accuracy | ⭐⭐⭐⭐⭐ | Preserved |
| Zoom quality | ⭐⭐⭐ | Pixelation at 400%+ |

### Recommendations
✅ Suitable for: Email, web, screen viewing
⚠️ Not recommended for: High-quality print, archival
```

### Optimization Plan
```markdown
## Compression Strategy: [Document Name]

### Current State
- File size: 150 MB
- Pages: 200
- Issue: Too large for email (limit: 25 MB)

### Target
- Max size: 20 MB
- Maintain readability

### Recommended Approach
1. **Images**: Reduce to 150 DPI, JPEG 70%
   - Expected savings: ~100 MB
2. **Fonts**: Subset embedded fonts
   - Expected savings: ~5 MB
3. **Cleanup**: Remove metadata, optimize structure
   - Expected savings: ~5 MB

### Expected Result
- Final size: ~20 MB
- Quality: Good for screen/general use
```

## Batch Compression

### Batch Job Template
```markdown
## Batch Compression Job

### Input
- **Folder**: /documents/reports/
- **Files**: 45 PDFs
- **Total Size**: 2.3 GB

### Settings
- Compression level: Medium
- Target: Email-friendly (<10 MB each)
- Image DPI: 150
- JPEG quality: 75%

### Progress
| File | Original | Compressed | Reduction |
|------|----------|------------|-----------|
| report_q1.pdf | 85 MB | 12 MB | 86% |
| report_q2.pdf | 120 MB | 18 MB | 85% |
| report_q3.pdf | 95 MB | 14 MB | 85% |
| ... | ... | ... | ... |

### Summary
| Metric | Value |
|--------|-------|
| Files processed | 45 |
| Total before | 2.3 GB |
| Total after | 380 MB |
| Average reduction | 83% |
| Files under 10 MB | 42/45 |

### Large Files (Need Review)
| File | Size | Recommendation |
|------|------|----------------|
| annual_photos.pdf | 25 MB | Split or higher compression |
| tech_diagrams.pdf | 18 MB | Reduce image count |
| charts_hires.pdf | 15 MB | Acceptable |
```

## Quality Comparison

### Before/After Guide
```markdown
## Quality Comparison Guide

### Image Quality at Different Levels

**Original (300 DPI, no compression)**
- Sharp at all zoom levels
- File size: Large

**High Quality (200 DPI, JPEG 85%)**
- Sharp at 100-200% zoom
- Minor softening at high zoom
- File size: Medium-large

**Medium Quality (150 DPI, JPEG 70%)**
- Good at 100% zoom
- Noticeable softening at 200%+
- File size: Medium

**Low Quality (96 DPI, JPEG 50%)**
- Acceptable at 100%
- Pixelation visible
- File size: Small

### Text Remains Sharp
Note: Text (when vector) remains crisp at all compression levels.
Only embedded text images are affected.
```

## Tool Recommendations

### Online Tools
- **SmallPDF**: Easy, good quality
- **ILovePDF**: Free, batch support
- **PDF24**: Configurable options
- **Adobe Online**: Professional quality

### Desktop Software
- **Adobe Acrobat Pro**: Best control
- **Foxit PDF Editor**: Good alternative
- **PDF-XChange**: Many options
- **Preview (Mac)**: Basic, built-in

### Command Line
- **Ghostscript**: Powerful, scriptable
- **qpdf**: Fast, lossless options
- **pdfcpu**: Modern Go tool
- **img2pdf**: Image-specific

## Limitations

- Cannot perform actual compression (provides guidance)
- Some PDFs have minimum compressible content
- Scanned documents are mostly images
- Already compressed PDFs have less savings
- Extreme compression affects quality
- Vector graphics don't compress much
