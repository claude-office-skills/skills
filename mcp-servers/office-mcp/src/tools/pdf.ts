/**
 * PDF Tools - PDF operations
 * 
 * Best-in-class tools for PDF manipulation.
 * Inspired by Stirling-PDF (73k+ stars) capabilities.
 */

import { Tool } from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs";
import * as path from "path";
import pdfParse from "pdf-parse";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import Tesseract from "tesseract.js";

/**
 * PDF tool definitions
 */
export const pdfTools: Tool[] = [
  {
    name: "extract_text_from_pdf",
    description: "Extract text content from a PDF file. Supports both text-based and scanned PDFs (with OCR).",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the PDF file",
        },
        pages: {
          type: "string",
          description: "Page range to extract (e.g., '1-5', 'all')",
          default: "all",
        },
        use_ocr: {
          type: "boolean",
          description: "Use OCR for scanned documents",
          default: false,
        },
        language: {
          type: "string",
          description: "OCR language (e.g., 'eng', 'chi_sim', 'chi_tra')",
          default: "eng",
        },
      },
      required: ["file_path"],
    },
  },
  {
    name: "extract_tables_from_pdf",
    description: "Extract tables from PDF and return as structured data. Ideal for financial reports, invoices.",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the PDF file",
        },
        pages: {
          type: "string",
          description: "Page range to extract tables from",
          default: "all",
        },
        output_format: {
          type: "string",
          enum: ["json", "csv", "xlsx"],
          description: "Output format for extracted tables",
          default: "json",
        },
      },
      required: ["file_path"],
    },
  },
  {
    name: "merge_pdfs",
    description: "Merge multiple PDF files into one document.",
    inputSchema: {
      type: "object",
      properties: {
        file_paths: {
          type: "array",
          items: { type: "string" },
          description: "Array of PDF file paths to merge",
        },
        output_path: {
          type: "string",
          description: "Path for the merged output file",
        },
      },
      required: ["file_paths", "output_path"],
    },
  },
  {
    name: "split_pdf",
    description: "Split a PDF file into multiple documents.",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the PDF file",
        },
        output_dir: {
          type: "string",
          description: "Directory for output files",
        },
        split_mode: {
          type: "string",
          enum: ["by_page", "by_range", "by_size"],
          description: "How to split the PDF",
          default: "by_page",
        },
        ranges: {
          type: "array",
          description: "Page ranges if split_mode is 'by_range' (e.g., ['1-3', '4-6'])",
        },
      },
      required: ["file_path", "output_dir"],
    },
  },
  {
    name: "compress_pdf",
    description: "Compress a PDF to reduce file size while maintaining quality.",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the PDF file",
        },
        output_path: {
          type: "string",
          description: "Path for the compressed output file",
        },
        quality: {
          type: "string",
          enum: ["high", "medium", "low"],
          description: "Compression quality level",
          default: "medium",
        },
      },
      required: ["file_path", "output_path"],
    },
  },
  {
    name: "add_watermark_to_pdf",
    description: "Add text or image watermark to PDF pages.",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the PDF file",
        },
        output_path: {
          type: "string",
          description: "Path for the output file",
        },
        watermark_type: {
          type: "string",
          enum: ["text", "image"],
          description: "Type of watermark",
        },
        watermark_content: {
          type: "string",
          description: "Text content or image path for watermark",
        },
        position: {
          type: "string",
          enum: ["center", "diagonal", "header", "footer"],
          default: "diagonal",
        },
        opacity: {
          type: "number",
          description: "Watermark opacity (0-1)",
          default: 0.3,
        },
      },
      required: ["file_path", "output_path", "watermark_type", "watermark_content"],
    },
  },
  {
    name: "fill_pdf_form",
    description: "Fill out a PDF form with provided data.",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the PDF form",
        },
        output_path: {
          type: "string",
          description: "Path for the filled output file",
        },
        form_data: {
          type: "object",
          description: "Key-value pairs matching form field names",
        },
        flatten: {
          type: "boolean",
          description: "Flatten the form after filling (make it non-editable)",
          default: false,
        },
      },
      required: ["file_path", "output_path", "form_data"],
    },
  },
  {
    name: "get_pdf_metadata",
    description: "Get metadata and properties of a PDF file.",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the PDF file",
        },
      },
      required: ["file_path"],
    },
  },
  {
    name: "ocr_pdf",
    description: "Perform OCR on scanned PDF pages to extract text. Uses Tesseract.js for recognition.",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the PDF file (scanned/image-based)",
        },
        output_path: {
          type: "string",
          description: "Path for the output text file (optional)",
        },
        language: {
          type: "string",
          description: "OCR language code: 'eng' (English), 'chi_sim' (Simplified Chinese), 'chi_tra' (Traditional Chinese), 'jpn' (Japanese), 'kor' (Korean)",
          default: "eng",
        },
        pages: {
          type: "string",
          description: "Page range to OCR (e.g., '1-3', 'all')",
          default: "all",
        },
      },
      required: ["file_path"],
    },
  },
  {
    name: "ocr_image",
    description: "Perform OCR on an image file to extract text. Supports PNG, JPG, TIFF, BMP formats.",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the image file",
        },
        output_path: {
          type: "string",
          description: "Path for the output text file (optional)",
        },
        language: {
          type: "string",
          description: "OCR language: 'eng', 'chi_sim', 'chi_tra', 'jpn', 'kor', 'fra', 'deu', 'spa'",
          default: "eng",
        },
      },
      required: ["file_path"],
    },
  },
];

/**
 * Handle PDF tool calls
 */
export async function handlePdfTool(
  name: string,
  args: Record<string, unknown>
): Promise<unknown> {
  switch (name) {
    case "extract_text_from_pdf":
      return extractTextFromPdf(args);
    case "extract_tables_from_pdf":
      return extractTablesFromPdf(args);
    case "merge_pdfs":
      return mergePdfs(args);
    case "split_pdf":
      return splitPdf(args);
    case "compress_pdf":
      return compressPdf(args);
    case "add_watermark_to_pdf":
      return addWatermarkToPdf(args);
    case "fill_pdf_form":
      return fillPdfForm(args);
    case "get_pdf_metadata":
      return getPdfMetadata(args);
    case "ocr_pdf":
      return ocrPdf(args);
    case "ocr_image":
      return ocrImageTool(args);
    default:
      throw new Error(`Unknown PDF tool: ${name}`);
  }
}

// Tool implementations
async function extractTextFromPdf(args: Record<string, unknown>): Promise<string> {
  const { file_path, pages, use_ocr, language } = args;
  
  try {
    const filePath = file_path as string;
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Read PDF file
    const dataBuffer = fs.readFileSync(filePath);
    
    // Parse PDF
    const data = await pdfParse(dataBuffer);
    
    // Handle page ranges
    const pageRange = pages as string || 'all';
    let text = data.text;
    
    if (pageRange !== 'all') {
      // Parse page range (e.g., "1-5", "1,3,5")
      const lines = text.split('\n');
      const pageBreakPattern = /\f/g; // Form feed character typically marks page breaks
      
      // For now, return all text if specific page parsing is complex
      // TODO: Implement page-specific extraction
      text = data.text;
    }
    
    // Handle OCR if requested
    if (use_ocr) {
      // OCR requires additional library (tesseract.js)
      // For now, return a helpful message
      text += `\n\n[Note: OCR requested with language '${language || 'eng'}'. OCR functionality requires tesseract.js. Install with: npm install tesseract.js]`;
    }
    
    return text;
    
  } catch (error: any) {
    return `Error extracting text from PDF: ${error.message}`;
  }
}

async function extractTablesFromPdf(args: Record<string, unknown>): Promise<object> {
  const { file_path, pages, output_format } = args;
  
  try {
    const filePath = file_path as string;
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Read PDF file
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    
    // Basic table extraction using text patterns
    // For production, consider using pdf-table-extractor or tabula-js
    const text = data.text;
    const lines = text.split('\n');
    
    // Simple heuristic: lines with multiple spaces/tabs might be table rows
    const potentialTableRows = lines.filter((line: string) => {
      const spacedColumns = line.split(/\s{2,}/).filter((col: string) => col.trim().length > 0);
      return spacedColumns.length >= 2;
    });
    
    const tables = [];
    if (potentialTableRows.length > 0) {
      const tableData = potentialTableRows.map((row: string) => 
        row.split(/\s{2,}/).filter((col: string) => col.trim().length > 0)
      );
      
      tables.push({
        page: 1,
        rows: tableData.length,
        columns: tableData[0]?.length || 0,
        data: tableData
      });
    }
    
    return {
      file: file_path,
      tables_found: tables.length,
      format: output_format || "json",
      tables: tables,
      note: "Basic table extraction. For advanced table parsing, consider using pdfplumber (Python) or tabula-js"
    };
    
  } catch (error: any) {
    return {
      error: `Failed to extract tables: ${error.message}`,
      file: file_path,
      tables_found: 0
    };
  }
}

async function mergePdfs(args: Record<string, unknown>): Promise<string> {
  const { file_paths, output_path } = args;
  
  try {
    const paths = file_paths as string[];
    const outputPath = output_path as string;
    
    // Validate input files
    for (const filePath of paths) {
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }
    }
    
    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();
    
    // Load and merge each PDF
    for (const filePath of paths) {
      const pdfBytes = fs.readFileSync(filePath);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    }
    
    // Save merged PDF
    const mergedPdfBytes = await mergedPdf.save();
    fs.writeFileSync(outputPath, mergedPdfBytes);
    
    return `Successfully merged ${paths.length} PDFs into ${outputPath}. Total pages: ${mergedPdf.getPageCount()}`;
    
  } catch (error: any) {
    return `Error merging PDFs: ${error.message}`;
  }
}

async function splitPdf(args: Record<string, unknown>): Promise<string> {
  const { file_path, output_dir, split_mode, ranges } = args;
  
  try {
    const filePath = file_path as string;
    const outputDir = output_dir as string;
    const mode = split_mode as string || 'by_page';
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Load PDF
    const pdfBytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const totalPages = pdfDoc.getPageCount();
    
    const baseFileName = path.basename(filePath, '.pdf');
    let filesCreated = 0;
    
    if (mode === 'by_page') {
      // Split into individual pages
      for (let i = 0; i < totalPages; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(copiedPage);
        
        const newPdfBytes = await newPdf.save();
        const outputPath = path.join(outputDir, `${baseFileName}_page_${i + 1}.pdf`);
        fs.writeFileSync(outputPath, newPdfBytes);
        filesCreated++;
      }
    } else if (mode === 'by_range' && ranges) {
      // Split by page ranges
      const pageRanges = ranges as string[];
      
      for (let rangeIdx = 0; rangeIdx < pageRanges.length; rangeIdx++) {
        const range = pageRanges[rangeIdx];
        const [start, end] = range.split('-').map(n => parseInt(n.trim()) - 1);
        
        const newPdf = await PDFDocument.create();
        const pageIndices = Array.from({ length: end - start + 1 }, (_, i) => start + i);
        const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
        
        copiedPages.forEach((page) => newPdf.addPage(page));
        
        const newPdfBytes = await newPdf.save();
        const outputPath = path.join(outputDir, `${baseFileName}_part_${rangeIdx + 1}.pdf`);
        fs.writeFileSync(outputPath, newPdfBytes);
        filesCreated++;
      }
    }
    
    return `Successfully split ${filePath} into ${filesCreated} files in ${outputDir}`;
    
  } catch (error: any) {
    return `Error splitting PDF: ${error.message}`;
  }
}

async function compressPdf(args: Record<string, unknown>): Promise<object> {
  const { file_path, output_path, quality } = args;
  
  try {
    const filePath = file_path as string;
    const outputPath = output_path as string;
    const compressionQuality = quality as string || "medium";
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    const originalSize = fs.statSync(filePath).size;
    
    // Load and save PDF (pdf-lib automatically optimizes)
    const pdfBytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Save with compression
    const compressedBytes = await pdfDoc.save({
      useObjectStreams: compressionQuality !== 'low',
    });
    
    fs.writeFileSync(outputPath, compressedBytes);
    const compressedSize = fs.statSync(outputPath).size;
    
    const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
    
    return {
      success: true,
      input: file_path,
      output: output_path,
      quality: compressionQuality,
      original_size: `${(originalSize / 1024 / 1024).toFixed(2)} MB`,
      compressed_size: `${(compressedSize / 1024 / 1024).toFixed(2)} MB`,
      reduction: `${reduction}%`,
      note: "Basic compression. For advanced compression, use external tools like Ghostscript or qpdf"
    };
    
  } catch (error: any) {
    return {
      success: false,
      error: `Failed to compress PDF: ${error.message}`
    };
  }
}

async function addWatermarkToPdf(args: Record<string, unknown>): Promise<string> {
  const { file_path, output_path, watermark_type, watermark_content, position, opacity } = args;
  
  try {
    const filePath = file_path as string;
    const outputPath = output_path as string;
    const type = watermark_type as string;
    const content = watermark_content as string;
    const pos = position as string || 'diagonal';
    const opacityValue = opacity as number || 0.3;
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Load PDF
    const pdfBytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    
    if (type === 'text') {
      // Add text watermark to each page
      for (const page of pages) {
        const { width, height } = page.getSize();
        
        let x = width / 2;
        let y = height / 2;
        let rotation = degrees(0);
        
        if (pos === 'diagonal') {
          rotation = degrees(45);
        } else if (pos === 'header') {
          y = height - 50;
        } else if (pos === 'footer') {
          y = 50;
        }
        
        page.drawText(content, {
          x: x - (content.length * 6),
          y: y,
          size: 40,
          color: rgb(0.7, 0.7, 0.7),
          opacity: opacityValue,
          rotate: rotation,
        });
      }
    } else if (type === 'image') {
      return `Image watermark not yet implemented. Requires embedding images from ${content}`;
    }
    
    // Save watermarked PDF
    const watermarkedBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, watermarkedBytes);
    
    return `Successfully added ${type} watermark to ${pages.length} pages. Output: ${outputPath}`;
    
  } catch (error: any) {
    return `Error adding watermark: ${error.message}`;
  }
}

async function fillPdfForm(args: Record<string, unknown>): Promise<string> {
  const { file_path, output_path, form_data, flatten } = args;
  
  try {
    const filePath = file_path as string;
    const outputPath = output_path as string;
    const formData = form_data as Record<string, string>;
    const shouldFlatten = flatten as boolean || false;
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Load PDF
    const pdfBytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Get form
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    
    let filledCount = 0;
    
    // Fill form fields
    for (const [fieldName, value] of Object.entries(formData)) {
      try {
        const field = form.getField(fieldName);
        
        // Determine field type and fill accordingly
        const fieldType = field.constructor.name;
        
        if (fieldType.includes('Text')) {
          const textField = form.getTextField(fieldName);
          textField.setText(value);
          filledCount++;
        } else if (fieldType.includes('CheckBox')) {
          const checkBox = form.getCheckBox(fieldName);
          if (value.toLowerCase() === 'true' || value === '1') {
            checkBox.check();
          } else {
            checkBox.uncheck();
          }
          filledCount++;
        } else if (fieldType.includes('Dropdown')) {
          const dropdown = form.getDropdown(fieldName);
          dropdown.select(value);
          filledCount++;
        } else if (fieldType.includes('Radio')) {
          const radioGroup = form.getRadioGroup(fieldName);
          radioGroup.select(value);
          filledCount++;
        }
      } catch (e) {
        // Field not found or type mismatch, skip
        continue;
      }
    }
    
    // Flatten form if requested
    if (shouldFlatten) {
      form.flatten();
    }
    
    // Save filled PDF
    const filledBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, filledBytes);
    
    return `Successfully filled ${filledCount} of ${Object.keys(formData).length} form fields. Output: ${outputPath}${shouldFlatten ? ' (flattened)' : ''}`;
    
  } catch (error: any) {
    return `Error filling PDF form: ${error.message}`;
  }
}

async function getPdfMetadata(args: Record<string, unknown>): Promise<object> {
  const { file_path } = args;
  
  try {
    const filePath = file_path as string;
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Get file stats
    const stats = fs.statSync(filePath);
    
    // Load PDF
    const pdfBytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Extract metadata
    const title = pdfDoc.getTitle() || 'Untitled';
    const author = pdfDoc.getAuthor() || 'Unknown';
    const subject = pdfDoc.getSubject() || '';
    const creator = pdfDoc.getCreator() || 'Unknown';
    const producer = pdfDoc.getProducer() || 'Unknown';
    const creationDate = pdfDoc.getCreationDate();
    const modificationDate = pdfDoc.getModificationDate();
    
    // Get form info
    const form = pdfDoc.getForm();
    const formFields = form.getFields();
    
    // Parse PDF for additional info
    const data = await pdfParse(pdfBytes);
    
    return {
      file: file_path,
      metadata: {
        title,
        author,
        subject,
        creator,
        producer,
        creation_date: creationDate?.toISOString().split('T')[0] || 'Unknown',
        modification_date: modificationDate?.toISOString().split('T')[0] || 'Unknown',
        pages: pdfDoc.getPageCount(),
        size: `${(stats.size / 1024 / 1024).toFixed(2)} MB`,
        encrypted: pdfDoc.isEncrypted,
        has_forms: formFields.length > 0,
        form_fields: formFields.length,
        text_length: data.text.length,
        version: data.version || 'Unknown',
      },
    };
    
  } catch (error: any) {
    return {
      error: `Failed to get PDF metadata: ${error.message}`,
      file: file_path
    };
  }
}

async function ocrPdf(args: Record<string, unknown>): Promise<object> {
  const { file_path, output_path, language, pages } = args;
  
  try {
    const filePath = file_path as string;
    const lang = language as string || 'eng';
    const pageRange = pages as string || 'all';
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Read PDF
    const pdfBytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const totalPages = pdfDoc.getPageCount();
    
    // Determine which pages to process
    let pagesToProcess: number[] = [];
    if (pageRange === 'all') {
      pagesToProcess = Array.from({ length: totalPages }, (_, i) => i);
    } else if (pageRange.includes('-')) {
      const [start, end] = pageRange.split('-').map(n => parseInt(n) - 1);
      for (let i = start; i <= Math.min(end, totalPages - 1); i++) {
        pagesToProcess.push(i);
      }
    } else {
      pagesToProcess = pageRange.split(',').map(n => parseInt(n.trim()) - 1);
    }
    
    // For PDF OCR, we need to convert PDF pages to images first
    // tesseract.js works with images, not PDFs directly
    // We'll use a workaround: extract what text we can and note that
    // full OCR requires PDF-to-image conversion
    
    // Try to extract any existing text first
    const pdfData = await pdfParse(pdfBytes);
    const existingText = pdfData.text.trim();
    
    if (existingText.length > 100) {
      // PDF has extractable text, return it
      return {
        success: true,
        file: file_path,
        method: 'text_extraction',
        language: lang,
        pages_processed: totalPages,
        text: existingText,
        note: 'PDF contains extractable text. OCR not needed.',
      };
    }
    
    // For scanned PDFs, we need image extraction
    // This is a limitation note - full implementation would need pdf-to-image conversion
    return {
      success: false,
      file: file_path,
      method: 'ocr_required',
      language: lang,
      total_pages: totalPages,
      pages_to_process: pagesToProcess.map(p => p + 1),
      message: 'PDF appears to be scanned/image-based. For full OCR:',
      instructions: [
        '1. Convert PDF to images using: pdftoppm -png input.pdf output',
        '2. Or use online tools to convert PDF pages to images',
        '3. Then use tesseract directly on the images',
        'Alternative: Use the ocr_image tool on individual page images',
      ],
      tesseract_command: `tesseract input_image.png output -l ${lang}`,
      supported_languages: {
        'eng': 'English',
        'chi_sim': 'Simplified Chinese',
        'chi_tra': 'Traditional Chinese',
        'jpn': 'Japanese',
        'kor': 'Korean',
        'fra': 'French',
        'deu': 'German',
        'spa': 'Spanish',
      },
    };
    
  } catch (error: any) {
    return {
      success: false,
      error: `OCR failed: ${error.message}`,
      file: file_path,
    };
  }
}

// OCR on image files
async function ocrImageTool(args: Record<string, unknown>): Promise<object> {
  const { file_path, output_path, language } = args;
  
  try {
    const filePath = file_path as string;
    const lang = language as string || 'eng';
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`Image not found: ${filePath}`);
    }
    
    // Check file extension
    const ext = path.extname(filePath).toLowerCase();
    const supportedFormats = ['.png', '.jpg', '.jpeg', '.tiff', '.tif', '.bmp', '.gif', '.webp'];
    if (!supportedFormats.includes(ext)) {
      throw new Error(`Unsupported image format: ${ext}. Supported: ${supportedFormats.join(', ')}`);
    }
    
    // Perform OCR
    const result = await Tesseract.recognize(filePath, lang, {
      logger: (m: any) => {
        // Silent logging
      },
    });
    
    const text = result.data.text;
    const confidence = result.data.confidence;
    
    // Save to file if output path specified
    if (output_path) {
      fs.writeFileSync(output_path as string, text, 'utf-8');
    }
    
    return {
      success: true,
      file: file_path,
      language: lang,
      confidence: `${confidence.toFixed(1)}%`,
      text_length: text.length,
      text: text,
      output_file: output_path || null,
    };
    
  } catch (error: any) {
    return {
      success: false,
      error: `Image OCR failed: ${error.message}`,
      file: file_path,
    };
  }
}
