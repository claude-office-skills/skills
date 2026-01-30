/**
 * Document Tools - DOCX operations
 * 
 * Best-in-class tools for Word document manipulation.
 * These tools are designed to be used by AI Skills for document scenarios.
 */

import { Tool } from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs";
import * as mammoth from "mammoth";
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
  PageBreak,
} from "docx";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

/**
 * Document tool definitions
 */
export const documentTools: Tool[] = [
  {
    name: "extract_text_from_docx",
    description: "Extract plain text content from a DOCX file. Useful for contract review, document analysis, and content extraction.",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the DOCX file",
        },
        include_headers: {
          type: "boolean",
          description: "Include header/footer content",
          default: true,
        },
        preserve_formatting: {
          type: "boolean",
          description: "Preserve basic formatting (paragraphs, lists)",
          default: true,
        },
      },
      required: ["file_path"],
    },
  },
  {
    name: "create_docx",
    description: "Create a new DOCX document with specified content. Supports headings, paragraphs, lists, and tables.",
    inputSchema: {
      type: "object",
      properties: {
        output_path: {
          type: "string",
          description: "Path for the output DOCX file",
        },
        content: {
          type: "array",
          description: "Array of content blocks (heading, paragraph, list, table)",
          items: {
            type: "object",
            properties: {
              type: {
                type: "string",
                enum: ["heading", "paragraph", "list", "table"],
              },
              text: {
                type: "string",
              },
              level: {
                type: "number",
                description: "Heading level (1-6) if type is heading",
              },
              items: {
                type: "array",
                description: "List items if type is list",
              },
              rows: {
                type: "array",
                description: "Table rows if type is table",
              },
            },
          },
        },
        template: {
          type: "string",
          description: "Optional template file path",
        },
      },
      required: ["output_path", "content"],
    },
  },
  {
    name: "fill_docx_template",
    description: "Fill a DOCX template with data using placeholder replacement. Ideal for contracts, letters, reports.",
    inputSchema: {
      type: "object",
      properties: {
        template_path: {
          type: "string",
          description: "Path to the template DOCX file with {{placeholders}}",
        },
        output_path: {
          type: "string",
          description: "Path for the output file",
        },
        data: {
          type: "object",
          description: "Key-value pairs for placeholder replacement",
        },
      },
      required: ["template_path", "output_path", "data"],
    },
  },
  {
    name: "analyze_document_structure",
    description: "Analyze the structure of a DOCX document: sections, headings, tables, images count.",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the DOCX file",
        },
      },
      required: ["file_path"],
    },
  },
  {
    name: "insert_table_to_docx",
    description: "Insert a table into an existing DOCX document at a specified position.",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the DOCX file",
        },
        output_path: {
          type: "string",
          description: "Path for the output file",
        },
        table_data: {
          type: "array",
          description: "2D array of table data (rows and columns)",
        },
        position: {
          type: "string",
          description: "Position to insert: 'end', 'start', or after a specific heading",
          default: "end",
        },
        style: {
          type: "string",
          description: "Table style: 'basic', 'striped', 'bordered'",
          default: "basic",
        },
      },
      required: ["file_path", "output_path", "table_data"],
    },
  },
  {
    name: "merge_docx_files",
    description: "Merge multiple DOCX files into one document.",
    inputSchema: {
      type: "object",
      properties: {
        file_paths: {
          type: "array",
          items: { type: "string" },
          description: "Array of DOCX file paths to merge",
        },
        output_path: {
          type: "string",
          description: "Path for the merged output file",
        },
        add_page_breaks: {
          type: "boolean",
          description: "Add page breaks between documents",
          default: true,
        },
      },
      required: ["file_paths", "output_path"],
    },
  },
];

/**
 * Handle document tool calls
 */
export async function handleDocumentTool(
  name: string,
  args: Record<string, unknown>
): Promise<unknown> {
  switch (name) {
    case "extract_text_from_docx":
      return extractTextFromDocx(args);
    case "create_docx":
      return createDocx(args);
    case "fill_docx_template":
      return fillDocxTemplate(args);
    case "analyze_document_structure":
      return analyzeDocumentStructure(args);
    case "insert_table_to_docx":
      return insertTableToDocx(args);
    case "merge_docx_files":
      return mergeDocxFiles(args);
    default:
      throw new Error(`Unknown document tool: ${name}`);
  }
}

// Tool implementations (using mammoth, docx, etc.)
async function extractTextFromDocx(args: Record<string, unknown>): Promise<string> {
  const { file_path, preserve_formatting } = args;
  
  try {
    const filePath = file_path as string;
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    const buffer = fs.readFileSync(filePath);
    
    if (preserve_formatting) {
      // Extract with basic formatting preserved
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } else {
      // Extract plain text
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    }
    
  } catch (error: any) {
    return `Error extracting text from DOCX: ${error.message}`;
  }
}

async function createDocx(args: Record<string, unknown>): Promise<string> {
  const { output_path, content } = args;
  
  try {
    const outputPath = output_path as string;
    const contentBlocks = content as Array<{
      type: string;
      text?: string;
      level?: number;
      items?: string[];
      rows?: string[][];
    }>;
    
    const children: (Paragraph | Table)[] = [];
    
    for (const block of contentBlocks) {
      switch (block.type) {
        case 'heading':
          const headingLevels: { [key: number]: typeof HeadingLevel[keyof typeof HeadingLevel] } = {
            1: HeadingLevel.HEADING_1,
            2: HeadingLevel.HEADING_2,
            3: HeadingLevel.HEADING_3,
            4: HeadingLevel.HEADING_4,
            5: HeadingLevel.HEADING_5,
            6: HeadingLevel.HEADING_6,
          };
          children.push(
            new Paragraph({
              text: block.text || '',
              heading: headingLevels[block.level || 1] || HeadingLevel.HEADING_1,
            })
          );
          break;
          
        case 'paragraph':
          children.push(
            new Paragraph({
              children: [new TextRun(block.text || '')],
            })
          );
          break;
          
        case 'list':
          if (block.items) {
            for (const item of block.items) {
              children.push(
                new Paragraph({
                  text: item,
                  bullet: { level: 0 },
                })
              );
            }
          }
          break;
          
        case 'table':
          if (block.rows) {
            const tableRows = block.rows.map(
              (row) =>
                new TableRow({
                  children: row.map(
                    (cell) =>
                      new TableCell({
                        children: [new Paragraph(cell)],
                        width: { size: 100 / row.length, type: WidthType.PERCENTAGE },
                      })
                  ),
                })
            );
            children.push(
              new Table({
                rows: tableRows,
                width: { size: 100, type: WidthType.PERCENTAGE },
              })
            );
          }
          break;
      }
    }
    
    const doc = new Document({
      sections: [{ children }],
    });
    
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputPath, buffer);
    
    return `Successfully created document at ${outputPath} with ${contentBlocks.length} content blocks.`;
    
  } catch (error: any) {
    return `Error creating DOCX: ${error.message}`;
  }
}

async function fillDocxTemplate(args: Record<string, unknown>): Promise<string> {
  const { template_path, output_path, data } = args;
  
  try {
    const templatePath = template_path as string;
    const outputPath = output_path as string;
    const templateData = data as Record<string, unknown>;
    
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template file not found: ${templatePath}`);
    }
    
    // Read template
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);
    
    // Create docxtemplater instance
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });
    
    // Render with data
    doc.render(templateData);
    
    // Generate output
    const buf = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });
    
    fs.writeFileSync(outputPath, buf);
    
    const placeholders = Object.keys(templateData);
    return `Successfully filled template with ${placeholders.length} placeholders: ${placeholders.join(', ')}. Output: ${outputPath}`;
    
  } catch (error: any) {
    return `Error filling template: ${error.message}`;
  }
}

async function analyzeDocumentStructure(args: Record<string, unknown>): Promise<object> {
  const { file_path } = args;
  
  try {
    const filePath = file_path as string;
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    const buffer = fs.readFileSync(filePath);
    
    // Extract HTML to analyze structure
    const htmlResult = await mammoth.convertToHtml({ buffer });
    const html = htmlResult.value;
    
    // Extract raw text for word count
    const textResult = await mammoth.extractRawText({ buffer });
    const text = textResult.value;
    
    // Count elements
    const h1Count = (html.match(/<h1/gi) || []).length;
    const h2Count = (html.match(/<h2/gi) || []).length;
    const h3Count = (html.match(/<h3/gi) || []).length;
    const h4Count = (html.match(/<h4/gi) || []).length;
    const paragraphCount = (html.match(/<p/gi) || []).length;
    const tableCount = (html.match(/<table/gi) || []).length;
    const imageCount = (html.match(/<img/gi) || []).length;
    const listCount = (html.match(/<ul|<ol/gi) || []).length;
    
    // Word count
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    
    // Character count
    const charCount = text.length;
    
    // Estimate pages (roughly 250-300 words per page)
    const pageEstimate = Math.ceil(wordCount / 275);
    
    return {
      file: file_path,
      structure: {
        headings: {
          h1: h1Count,
          h2: h2Count,
          h3: h3Count,
          h4: h4Count,
          total: h1Count + h2Count + h3Count + h4Count,
        },
        paragraphs: paragraphCount,
        tables: tableCount,
        images: imageCount,
        lists: listCount,
      },
      statistics: {
        word_count: wordCount,
        character_count: charCount,
        page_estimate: pageEstimate,
      },
      warnings: htmlResult.messages.map((m: any) => m.message),
    };
    
  } catch (error: any) {
    return {
      error: `Failed to analyze document: ${error.message}`,
      file: file_path,
    };
  }
}

async function insertTableToDocx(args: Record<string, unknown>): Promise<string> {
  const { file_path, output_path, table_data, position, style } = args;
  
  try {
    const filePath = file_path as string;
    const outputPath = output_path as string;
    const tableRows = table_data as string[][];
    const insertPosition = position as string || 'end';
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Read existing document content
    const buffer = fs.readFileSync(filePath);
    const textResult = await mammoth.extractRawText({ buffer });
    const existingText = textResult.value;
    
    // Create table
    const docTableRows = tableRows.map(
      (row, rowIndex) =>
        new TableRow({
          children: row.map(
            (cell) =>
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({
                    text: cell,
                    bold: rowIndex === 0, // Bold first row (header)
                  })],
                })],
                width: { size: 100 / row.length, type: WidthType.PERCENTAGE },
              })
          ),
        })
    );
    
    const table = new Table({
      rows: docTableRows,
      width: { size: 100, type: WidthType.PERCENTAGE },
    });
    
    // Build content based on position
    const children: (Paragraph | Table)[] = [];
    
    if (insertPosition === 'start') {
      children.push(table);
      children.push(new Paragraph({ text: '' })); // Spacer
      // Add existing text as paragraphs
      existingText.split('\n').forEach(line => {
        if (line.trim()) {
          children.push(new Paragraph({ text: line }));
        }
      });
    } else {
      // Add existing text as paragraphs
      existingText.split('\n').forEach(line => {
        if (line.trim()) {
          children.push(new Paragraph({ text: line }));
        }
      });
      children.push(new Paragraph({ text: '' })); // Spacer
      children.push(table);
    }
    
    const doc = new Document({
      sections: [{ children }],
    });
    
    const outputBuffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputPath, outputBuffer);
    
    return `Successfully inserted table with ${tableRows.length} rows at ${insertPosition}. Output: ${outputPath}`;
    
  } catch (error: any) {
    return `Error inserting table: ${error.message}`;
  }
}

async function mergeDocxFiles(args: Record<string, unknown>): Promise<string> {
  const { file_paths, output_path, add_page_breaks } = args;
  
  try {
    const filePaths = file_paths as string[];
    const outputPath = output_path as string;
    const pageBreaks = add_page_breaks as boolean ?? true;
    
    // Validate all files exist
    for (const filePath of filePaths) {
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }
    }
    
    const children: (Paragraph | Table)[] = [];
    
    for (let i = 0; i < filePaths.length; i++) {
      const filePath = filePaths[i];
      const buffer = fs.readFileSync(filePath);
      
      // Extract text from document
      const textResult = await mammoth.extractRawText({ buffer });
      const text = textResult.value;
      
      // Add document content
      text.split('\n').forEach(line => {
        if (line.trim()) {
          children.push(new Paragraph({ text: line }));
        } else {
          children.push(new Paragraph({ text: '' }));
        }
      });
      
      // Add page break between documents (except for last one)
      if (pageBreaks && i < filePaths.length - 1) {
        children.push(
          new Paragraph({
            children: [new PageBreak()],
          })
        );
      }
    }
    
    const doc = new Document({
      sections: [{ children }],
    });
    
    const outputBuffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputPath, outputBuffer);
    
    return `Successfully merged ${filePaths.length} documents into ${outputPath}${pageBreaks ? ' (with page breaks)' : ''}`;
    
  } catch (error: any) {
    return `Error merging documents: ${error.message}`;
  }
}
