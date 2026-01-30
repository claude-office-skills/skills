/**
 * Conversion Tools - Format conversion operations
 * 
 * Best-in-class tools for document format conversion.
 * Based on pandoc, markitdown, and other conversion libraries.
 */

import { Tool } from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs";
import * as path from "path";
import * as XLSX from "xlsx";
import * as mammoth from "mammoth";
import TurndownService from "turndown";
import { marked } from "marked";
import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  Packer,
} from "docx";
import pdfParse from "pdf-parse";

/**
 * Conversion tool definitions
 */
export const conversionTools: Tool[] = [
  {
    name: "docx_to_pdf",
    description: "Convert DOCX document to PDF format.",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the DOCX file",
        },
        output_path: {
          type: "string",
          description: "Path for the output PDF file",
        },
        options: {
          type: "object",
          properties: {
            page_size: {
              type: "string",
              enum: ["A4", "Letter", "Legal"],
              default: "A4",
            },
            margins: {
              type: "string",
              enum: ["normal", "narrow", "wide"],
              default: "normal",
            },
          },
        },
      },
      required: ["file_path", "output_path"],
    },
  },
  {
    name: "pdf_to_docx",
    description: "Convert PDF to editable DOCX format.",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the PDF file",
        },
        output_path: {
          type: "string",
          description: "Path for the output DOCX file",
        },
        preserve_layout: {
          type: "boolean",
          description: "Try to preserve original layout",
          default: true,
        },
      },
      required: ["file_path", "output_path"],
    },
  },
  {
    name: "md_to_docx",
    description: "Convert Markdown to DOCX document.",
    inputSchema: {
      type: "object",
      properties: {
        markdown_content: {
          type: "string",
          description: "Markdown content to convert",
        },
        markdown_file: {
          type: "string",
          description: "Path to Markdown file (alternative)",
        },
        output_path: {
          type: "string",
          description: "Path for the output DOCX file",
        },
        template: {
          type: "string",
          description: "Optional DOCX template for styling",
        },
      },
      required: ["output_path"],
    },
  },
  {
    name: "docx_to_md",
    description: "Convert DOCX document to Markdown format (using Microsoft markitdown approach).",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the DOCX file",
        },
        output_path: {
          type: "string",
          description: "Path for the output Markdown file",
        },
        include_images: {
          type: "boolean",
          description: "Extract and reference images",
          default: true,
        },
        image_dir: {
          type: "string",
          description: "Directory for extracted images",
        },
      },
      required: ["file_path", "output_path"],
    },
  },
  {
    name: "xlsx_to_csv",
    description: "Convert Excel spreadsheet to CSV format.",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the XLSX file",
        },
        output_path: {
          type: "string",
          description: "Path for the output CSV file",
        },
        sheet_name: {
          type: "string",
          description: "Sheet to convert (default: first sheet)",
        },
        delimiter: {
          type: "string",
          description: "CSV delimiter",
          default: ",",
        },
        encoding: {
          type: "string",
          enum: ["utf-8", "utf-8-sig", "gbk", "latin-1"],
          default: "utf-8",
        },
      },
      required: ["file_path", "output_path"],
    },
  },
  {
    name: "csv_to_xlsx",
    description: "Convert CSV to Excel spreadsheet.",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the CSV file",
        },
        output_path: {
          type: "string",
          description: "Path for the output XLSX file",
        },
        delimiter: {
          type: "string",
          description: "CSV delimiter",
          default: ",",
        },
        sheet_name: {
          type: "string",
          description: "Name for the sheet",
          default: "Sheet1",
        },
        auto_format: {
          type: "boolean",
          description: "Auto-detect and format columns",
          default: true,
        },
      },
      required: ["file_path", "output_path"],
    },
  },
  {
    name: "html_to_pdf",
    description: "Convert HTML content to PDF.",
    inputSchema: {
      type: "object",
      properties: {
        html_content: {
          type: "string",
          description: "HTML content to convert",
        },
        html_file: {
          type: "string",
          description: "Path to HTML file (alternative)",
        },
        output_path: {
          type: "string",
          description: "Path for the output PDF file",
        },
        options: {
          type: "object",
          properties: {
            page_size: { type: "string", default: "A4" },
            margin: { type: "string", default: "1cm" },
            print_background: { type: "boolean", default: true },
          },
        },
      },
      required: ["output_path"],
    },
  },
  {
    name: "json_to_xlsx",
    description: "Convert JSON data to Excel spreadsheet.",
    inputSchema: {
      type: "object",
      properties: {
        json_data: {
          type: "array",
          description: "Array of objects to convert",
        },
        json_file: {
          type: "string",
          description: "Path to JSON file (alternative)",
        },
        output_path: {
          type: "string",
          description: "Path for the output XLSX file",
        },
        sheet_name: {
          type: "string",
          default: "Data",
        },
        include_headers: {
          type: "boolean",
          default: true,
        },
      },
      required: ["output_path"],
    },
  },
  {
    name: "batch_convert",
    description: "Convert multiple files in batch.",
    inputSchema: {
      type: "object",
      properties: {
        input_dir: {
          type: "string",
          description: "Directory containing files to convert",
        },
        output_dir: {
          type: "string",
          description: "Directory for converted files",
        },
        from_format: {
          type: "string",
          enum: ["docx", "pdf", "xlsx", "csv", "md", "html"],
        },
        to_format: {
          type: "string",
          enum: ["docx", "pdf", "xlsx", "csv", "md", "html"],
        },
        file_pattern: {
          type: "string",
          description: "Glob pattern for files (e.g., '*.docx')",
          default: "*",
        },
      },
      required: ["input_dir", "output_dir", "from_format", "to_format"],
    },
  },
];

/**
 * Handle conversion tool calls
 */
export async function handleConversionTool(
  name: string,
  args: Record<string, unknown>
): Promise<unknown> {
  switch (name) {
    case "docx_to_pdf":
      return docxToPdf(args);
    case "pdf_to_docx":
      return pdfToDocx(args);
    case "md_to_docx":
      return mdToDocx(args);
    case "docx_to_md":
      return docxToMd(args);
    case "xlsx_to_csv":
      return xlsxToCsv(args);
    case "csv_to_xlsx":
      return csvToXlsx(args);
    case "html_to_pdf":
      return htmlToPdf(args);
    case "json_to_xlsx":
      return jsonToXlsx(args);
    case "batch_convert":
      return batchConvert(args);
    default:
      throw new Error(`Unknown conversion tool: ${name}`);
  }
}

// Tool implementations

async function docxToPdf(args: Record<string, unknown>): Promise<object> {
  const { file_path, output_path } = args;
  
  // Note: DOCX to PDF conversion requires external tools
  // Options: libreoffice, pandoc with latex, or cloud services
  return {
    success: false,
    message: "DOCX to PDF conversion requires external tools",
    file: file_path,
    output: output_path,
    alternatives: [
      "Install LibreOffice: brew install --cask libreoffice",
      "Use: soffice --headless --convert-to pdf --outdir <output_dir> <input_file>",
      "Or use pandoc with LaTeX: pandoc input.docx -o output.pdf",
      "Or use a cloud conversion API",
    ],
  };
}

async function pdfToDocx(args: Record<string, unknown>): Promise<object> {
  const { file_path, output_path } = args;
  
  try {
    const filePath = file_path as string;
    const outputPath = output_path as string;
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Extract text from PDF
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;
    
    // Create DOCX with extracted text
    const paragraphs = text.split('\n').filter(line => line.trim()).map(
      line => new Paragraph({ text: line })
    );
    
    const doc = new Document({
      sections: [{ children: paragraphs }],
    });
    
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputPath, buffer);
    
    return {
      success: true,
      message: `Converted PDF to DOCX (text-only extraction)`,
      input: file_path,
      output: output_path,
      pages: pdfData.numpages,
      note: "Layout and images are not preserved. For full conversion, use Adobe Acrobat or online services.",
    };
    
  } catch (error: any) {
    return {
      success: false,
      error: `Failed to convert PDF to DOCX: ${error.message}`,
    };
  }
}

async function mdToDocx(args: Record<string, unknown>): Promise<string> {
  const { markdown_content, markdown_file, output_path } = args;
  
  try {
    const outputPath = output_path as string;
    
    // Get markdown content
    let mdContent: string;
    if (markdown_content) {
      mdContent = markdown_content as string;
    } else if (markdown_file) {
      const mdFile = markdown_file as string;
      if (!fs.existsSync(mdFile)) {
        throw new Error(`Markdown file not found: ${mdFile}`);
      }
      mdContent = fs.readFileSync(mdFile, 'utf-8');
    } else {
      throw new Error('Either markdown_content or markdown_file is required');
    }
    
    // Parse markdown to HTML
    const html = await marked(mdContent);
    
    // Convert HTML to document structure
    const children: Paragraph[] = [];
    
    // Simple HTML to DOCX conversion
    const lines = html.split(/<\/?(?:p|h[1-6]|li|br)[^>]*>/i).filter(line => line.trim());
    
    // Process headings and paragraphs
    const headingMatches = html.matchAll(/<(h[1-6])>(.*?)<\/\1>/gi);
    for (const match of headingMatches) {
      const level = parseInt(match[1].charAt(1));
      const text = match[2].replace(/<[^>]*>/g, ''); // Strip inner HTML
      const headingLevels: { [key: number]: typeof HeadingLevel[keyof typeof HeadingLevel] } = {
        1: HeadingLevel.HEADING_1,
        2: HeadingLevel.HEADING_2,
        3: HeadingLevel.HEADING_3,
        4: HeadingLevel.HEADING_4,
        5: HeadingLevel.HEADING_5,
        6: HeadingLevel.HEADING_6,
      };
      children.push(new Paragraph({
        text: text,
        heading: headingLevels[level] || HeadingLevel.HEADING_1,
      }));
    }
    
    // Process paragraphs
    const paragraphMatches = html.matchAll(/<p>(.*?)<\/p>/gi);
    for (const match of paragraphMatches) {
      const text = match[1].replace(/<[^>]*>/g, ''); // Strip inner HTML
      children.push(new Paragraph({ text }));
    }
    
    // Process list items
    const listMatches = html.matchAll(/<li>(.*?)<\/li>/gi);
    for (const match of listMatches) {
      const text = match[1].replace(/<[^>]*>/g, '');
      children.push(new Paragraph({
        text: text,
        bullet: { level: 0 },
      }));
    }
    
    const doc = new Document({
      sections: [{ children }],
    });
    
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputPath, buffer);
    
    return `Successfully converted Markdown to DOCX at ${outputPath}`;
    
  } catch (error: any) {
    return `Error converting Markdown to DOCX: ${error.message}`;
  }
}

async function docxToMd(args: Record<string, unknown>): Promise<string> {
  const { file_path, output_path } = args;
  
  try {
    const filePath = file_path as string;
    const outputPath = output_path as string;
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Read DOCX and convert to HTML
    const buffer = fs.readFileSync(filePath);
    const result = await mammoth.convertToHtml({ buffer });
    const html = result.value;
    
    // Convert HTML to Markdown using Turndown
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
    });
    
    const markdown = turndownService.turndown(html);
    
    // Write markdown file
    fs.writeFileSync(outputPath, markdown, 'utf-8');
    
    return `Successfully converted DOCX to Markdown at ${outputPath}. Warnings: ${result.messages.length}`;
    
  } catch (error: any) {
    return `Error converting DOCX to Markdown: ${error.message}`;
  }
}

async function xlsxToCsv(args: Record<string, unknown>): Promise<string> {
  const { file_path, output_path, sheet_name, delimiter } = args;
  
  try {
    const filePath = file_path as string;
    const outputPath = output_path as string;
    const delim = delimiter as string || ',';
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Read workbook
    const workbook = XLSX.readFile(filePath);
    const targetSheet = sheet_name as string || workbook.SheetNames[0];
    const worksheet = workbook.Sheets[targetSheet];
    
    // Convert to CSV
    const csv = XLSX.utils.sheet_to_csv(worksheet, { FS: delim });
    
    // Write CSV file
    fs.writeFileSync(outputPath, csv, 'utf-8');
    
    return `Successfully converted ${targetSheet} to CSV at ${outputPath}`;
    
  } catch (error: any) {
    return `Error converting XLSX to CSV: ${error.message}`;
  }
}

async function csvToXlsx(args: Record<string, unknown>): Promise<string> {
  const { file_path, output_path, delimiter, sheet_name } = args;
  
  try {
    const filePath = file_path as string;
    const outputPath = output_path as string;
    const delim = delimiter as string || ',';
    const sheetName = sheet_name as string || 'Sheet1';
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Read CSV
    const csvContent = fs.readFileSync(filePath, 'utf-8');
    
    // Parse CSV manually (simple parser)
    const rows = csvContent.split('\n').map(line => {
      // Handle quoted fields
      const cells: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (const char of line) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === delim && !inQuotes) {
          cells.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      cells.push(current.trim());
      return cells;
    }).filter(row => row.some(cell => cell));
    
    // Create workbook
    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    
    // Write XLSX
    XLSX.writeFile(workbook, outputPath);
    
    return `Successfully converted CSV to XLSX at ${outputPath} (${rows.length} rows)`;
    
  } catch (error: any) {
    return `Error converting CSV to XLSX: ${error.message}`;
  }
}

async function htmlToPdf(args: Record<string, unknown>): Promise<object> {
  const { html_content, html_file, output_path } = args;
  
  // Note: HTML to PDF requires a browser engine (puppeteer) or external tools
  return {
    success: false,
    message: "HTML to PDF conversion requires Puppeteer or external tools",
    output: output_path,
    alternatives: [
      "Install puppeteer: npm install puppeteer",
      "Use wkhtmltopdf: brew install wkhtmltopdf",
      "Use Chrome headless: chrome --headless --print-to-pdf",
      "Save HTML and use browser print to PDF",
    ],
    html_preview: html_content ? (html_content as string).substring(0, 200) + '...' : 'from file',
  };
}

async function jsonToXlsx(args: Record<string, unknown>): Promise<string> {
  const { json_data, json_file, output_path, sheet_name, include_headers } = args;
  
  try {
    const outputPath = output_path as string;
    const sheetName = sheet_name as string || 'Data';
    const headers = include_headers as boolean ?? true;
    
    // Get JSON data
    let data: Record<string, unknown>[];
    if (json_data) {
      data = json_data as Record<string, unknown>[];
    } else if (json_file) {
      const jsonFilePath = json_file as string;
      if (!fs.existsSync(jsonFilePath)) {
        throw new Error(`JSON file not found: ${jsonFilePath}`);
      }
      const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8');
      data = JSON.parse(jsonContent);
    } else {
      throw new Error('Either json_data or json_file is required');
    }
    
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('JSON data must be a non-empty array of objects');
    }
    
    // Convert to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data, {
      header: headers ? Object.keys(data[0]) : undefined,
    });
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    
    // Write file
    XLSX.writeFile(workbook, outputPath);
    
    return `Successfully converted JSON to XLSX at ${outputPath} (${data.length} records)`;
    
  } catch (error: any) {
    return `Error converting JSON to XLSX: ${error.message}`;
  }
}

async function batchConvert(args: Record<string, unknown>): Promise<object> {
  const { input_dir, output_dir, from_format, to_format, file_pattern } = args;
  
  try {
    const inputDir = input_dir as string;
    const outputDir = output_dir as string;
    const fromFmt = from_format as string;
    const toFmt = to_format as string;
    const pattern = file_pattern as string || `*.${fromFmt}`;
    
    if (!fs.existsSync(inputDir)) {
      throw new Error(`Input directory not found: ${inputDir}`);
    }
    
    // Create output directory if needed
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Find files matching pattern
    const files = fs.readdirSync(inputDir).filter(f => 
      f.toLowerCase().endsWith(`.${fromFmt}`)
    );
    
    const results = {
      input_directory: inputDir,
      output_directory: outputDir,
      conversion: `${fromFmt} → ${toFmt}`,
      files_found: files.length,
      successful: 0,
      failed: 0,
      converted_files: [] as string[],
      errors: [] as { file: string; error: string }[],
    };
    
    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      const baseName = path.basename(file, `.${fromFmt}`);
      const outputPath = path.join(outputDir, `${baseName}.${toFmt}`);
      
      try {
        // Determine conversion function
        let conversionResult: any;
        
        if (fromFmt === 'xlsx' && toFmt === 'csv') {
          conversionResult = await xlsxToCsv({ file_path: inputPath, output_path: outputPath });
        } else if (fromFmt === 'csv' && toFmt === 'xlsx') {
          conversionResult = await csvToXlsx({ file_path: inputPath, output_path: outputPath });
        } else if (fromFmt === 'docx' && toFmt === 'md') {
          conversionResult = await docxToMd({ file_path: inputPath, output_path: outputPath });
        } else if (fromFmt === 'md' && toFmt === 'docx') {
          conversionResult = await mdToDocx({ markdown_file: inputPath, output_path: outputPath });
        } else {
          throw new Error(`Conversion ${fromFmt} → ${toFmt} not supported in batch mode`);
        }
        
        if (typeof conversionResult === 'string' && conversionResult.startsWith('Successfully')) {
          results.successful++;
          results.converted_files.push(file);
        } else {
          results.failed++;
          results.errors.push({ file, error: String(conversionResult) });
        }
      } catch (e: any) {
        results.failed++;
        results.errors.push({ file, error: e.message });
      }
    }
    
    return results;
    
  } catch (error: any) {
    return {
      success: false,
      error: `Batch conversion failed: ${error.message}`,
    };
  }
}
