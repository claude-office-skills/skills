"use strict";
/**
 * Conversion Tools - Format conversion operations
 *
 * Best-in-class tools for document format conversion.
 * Based on pandoc, markitdown, and other conversion libraries.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversionTools = void 0;
exports.handleConversionTool = handleConversionTool;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const XLSX = __importStar(require("xlsx"));
const mammoth = __importStar(require("mammoth"));
const turndown_1 = __importDefault(require("turndown"));
const marked_1 = require("marked");
const docx_1 = require("docx");
const pdf_parse_1 = __importDefault(require("pdf-parse"));
/**
 * Conversion tool definitions
 */
exports.conversionTools = [
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
async function handleConversionTool(name, args) {
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
async function docxToPdf(args) {
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
async function pdfToDocx(args) {
    const { file_path, output_path } = args;
    try {
        const filePath = file_path;
        const outputPath = output_path;
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // Extract text from PDF
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await (0, pdf_parse_1.default)(dataBuffer);
        const text = pdfData.text;
        // Create DOCX with extracted text
        const paragraphs = text.split('\n').filter(line => line.trim()).map(line => new docx_1.Paragraph({ text: line }));
        const doc = new docx_1.Document({
            sections: [{ children: paragraphs }],
        });
        const buffer = await docx_1.Packer.toBuffer(doc);
        fs.writeFileSync(outputPath, buffer);
        return {
            success: true,
            message: `Converted PDF to DOCX (text-only extraction)`,
            input: file_path,
            output: output_path,
            pages: pdfData.numpages,
            note: "Layout and images are not preserved. For full conversion, use Adobe Acrobat or online services.",
        };
    }
    catch (error) {
        return {
            success: false,
            error: `Failed to convert PDF to DOCX: ${error.message}`,
        };
    }
}
async function mdToDocx(args) {
    const { markdown_content, markdown_file, output_path } = args;
    try {
        const outputPath = output_path;
        // Get markdown content
        let mdContent;
        if (markdown_content) {
            mdContent = markdown_content;
        }
        else if (markdown_file) {
            const mdFile = markdown_file;
            if (!fs.existsSync(mdFile)) {
                throw new Error(`Markdown file not found: ${mdFile}`);
            }
            mdContent = fs.readFileSync(mdFile, 'utf-8');
        }
        else {
            throw new Error('Either markdown_content or markdown_file is required');
        }
        // Parse markdown to HTML
        const html = await (0, marked_1.marked)(mdContent);
        // Convert HTML to document structure
        const children = [];
        // Simple HTML to DOCX conversion
        const lines = html.split(/<\/?(?:p|h[1-6]|li|br)[^>]*>/i).filter(line => line.trim());
        // Process headings and paragraphs
        const headingMatches = html.matchAll(/<(h[1-6])>(.*?)<\/\1>/gi);
        for (const match of headingMatches) {
            const level = parseInt(match[1].charAt(1));
            const text = match[2].replace(/<[^>]*>/g, ''); // Strip inner HTML
            const headingLevels = {
                1: docx_1.HeadingLevel.HEADING_1,
                2: docx_1.HeadingLevel.HEADING_2,
                3: docx_1.HeadingLevel.HEADING_3,
                4: docx_1.HeadingLevel.HEADING_4,
                5: docx_1.HeadingLevel.HEADING_5,
                6: docx_1.HeadingLevel.HEADING_6,
            };
            children.push(new docx_1.Paragraph({
                text: text,
                heading: headingLevels[level] || docx_1.HeadingLevel.HEADING_1,
            }));
        }
        // Process paragraphs
        const paragraphMatches = html.matchAll(/<p>(.*?)<\/p>/gi);
        for (const match of paragraphMatches) {
            const text = match[1].replace(/<[^>]*>/g, ''); // Strip inner HTML
            children.push(new docx_1.Paragraph({ text }));
        }
        // Process list items
        const listMatches = html.matchAll(/<li>(.*?)<\/li>/gi);
        for (const match of listMatches) {
            const text = match[1].replace(/<[^>]*>/g, '');
            children.push(new docx_1.Paragraph({
                text: text,
                bullet: { level: 0 },
            }));
        }
        const doc = new docx_1.Document({
            sections: [{ children }],
        });
        const buffer = await docx_1.Packer.toBuffer(doc);
        fs.writeFileSync(outputPath, buffer);
        return `Successfully converted Markdown to DOCX at ${outputPath}`;
    }
    catch (error) {
        return `Error converting Markdown to DOCX: ${error.message}`;
    }
}
async function docxToMd(args) {
    const { file_path, output_path } = args;
    try {
        const filePath = file_path;
        const outputPath = output_path;
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // Read DOCX and convert to HTML
        const buffer = fs.readFileSync(filePath);
        const result = await mammoth.convertToHtml({ buffer });
        const html = result.value;
        // Convert HTML to Markdown using Turndown
        const turndownService = new turndown_1.default({
            headingStyle: 'atx',
            codeBlockStyle: 'fenced',
        });
        const markdown = turndownService.turndown(html);
        // Write markdown file
        fs.writeFileSync(outputPath, markdown, 'utf-8');
        return `Successfully converted DOCX to Markdown at ${outputPath}. Warnings: ${result.messages.length}`;
    }
    catch (error) {
        return `Error converting DOCX to Markdown: ${error.message}`;
    }
}
async function xlsxToCsv(args) {
    const { file_path, output_path, sheet_name, delimiter } = args;
    try {
        const filePath = file_path;
        const outputPath = output_path;
        const delim = delimiter || ',';
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // Read workbook
        const workbook = XLSX.readFile(filePath);
        const targetSheet = sheet_name || workbook.SheetNames[0];
        const worksheet = workbook.Sheets[targetSheet];
        // Convert to CSV
        const csv = XLSX.utils.sheet_to_csv(worksheet, { FS: delim });
        // Write CSV file
        fs.writeFileSync(outputPath, csv, 'utf-8');
        return `Successfully converted ${targetSheet} to CSV at ${outputPath}`;
    }
    catch (error) {
        return `Error converting XLSX to CSV: ${error.message}`;
    }
}
async function csvToXlsx(args) {
    const { file_path, output_path, delimiter, sheet_name } = args;
    try {
        const filePath = file_path;
        const outputPath = output_path;
        const delim = delimiter || ',';
        const sheetName = sheet_name || 'Sheet1';
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // Read CSV
        const csvContent = fs.readFileSync(filePath, 'utf-8');
        // Parse CSV manually (simple parser)
        const rows = csvContent.split('\n').map(line => {
            // Handle quoted fields
            const cells = [];
            let current = '';
            let inQuotes = false;
            for (const char of line) {
                if (char === '"') {
                    inQuotes = !inQuotes;
                }
                else if (char === delim && !inQuotes) {
                    cells.push(current.trim());
                    current = '';
                }
                else {
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
    }
    catch (error) {
        return `Error converting CSV to XLSX: ${error.message}`;
    }
}
async function htmlToPdf(args) {
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
        html_preview: html_content ? html_content.substring(0, 200) + '...' : 'from file',
    };
}
async function jsonToXlsx(args) {
    const { json_data, json_file, output_path, sheet_name, include_headers } = args;
    try {
        const outputPath = output_path;
        const sheetName = sheet_name || 'Data';
        const headers = include_headers ?? true;
        // Get JSON data
        let data;
        if (json_data) {
            data = json_data;
        }
        else if (json_file) {
            const jsonFilePath = json_file;
            if (!fs.existsSync(jsonFilePath)) {
                throw new Error(`JSON file not found: ${jsonFilePath}`);
            }
            const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8');
            data = JSON.parse(jsonContent);
        }
        else {
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
    }
    catch (error) {
        return `Error converting JSON to XLSX: ${error.message}`;
    }
}
async function batchConvert(args) {
    const { input_dir, output_dir, from_format, to_format, file_pattern } = args;
    try {
        const inputDir = input_dir;
        const outputDir = output_dir;
        const fromFmt = from_format;
        const toFmt = to_format;
        const pattern = file_pattern || `*.${fromFmt}`;
        if (!fs.existsSync(inputDir)) {
            throw new Error(`Input directory not found: ${inputDir}`);
        }
        // Create output directory if needed
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        // Find files matching pattern
        const files = fs.readdirSync(inputDir).filter(f => f.toLowerCase().endsWith(`.${fromFmt}`));
        const results = {
            input_directory: inputDir,
            output_directory: outputDir,
            conversion: `${fromFmt} → ${toFmt}`,
            files_found: files.length,
            successful: 0,
            failed: 0,
            converted_files: [],
            errors: [],
        };
        for (const file of files) {
            const inputPath = path.join(inputDir, file);
            const baseName = path.basename(file, `.${fromFmt}`);
            const outputPath = path.join(outputDir, `${baseName}.${toFmt}`);
            try {
                // Determine conversion function
                let conversionResult;
                if (fromFmt === 'xlsx' && toFmt === 'csv') {
                    conversionResult = await xlsxToCsv({ file_path: inputPath, output_path: outputPath });
                }
                else if (fromFmt === 'csv' && toFmt === 'xlsx') {
                    conversionResult = await csvToXlsx({ file_path: inputPath, output_path: outputPath });
                }
                else if (fromFmt === 'docx' && toFmt === 'md') {
                    conversionResult = await docxToMd({ file_path: inputPath, output_path: outputPath });
                }
                else if (fromFmt === 'md' && toFmt === 'docx') {
                    conversionResult = await mdToDocx({ markdown_file: inputPath, output_path: outputPath });
                }
                else {
                    throw new Error(`Conversion ${fromFmt} → ${toFmt} not supported in batch mode`);
                }
                if (typeof conversionResult === 'string' && conversionResult.startsWith('Successfully')) {
                    results.successful++;
                    results.converted_files.push(file);
                }
                else {
                    results.failed++;
                    results.errors.push({ file, error: String(conversionResult) });
                }
            }
            catch (e) {
                results.failed++;
                results.errors.push({ file, error: e.message });
            }
        }
        return results;
    }
    catch (error) {
        return {
            success: false,
            error: `Batch conversion failed: ${error.message}`,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90b29scy9jb252ZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd1NILG9EQTBCQztBQS9URCx1Q0FBeUI7QUFDekIsMkNBQTZCO0FBQzdCLDJDQUE2QjtBQUM3QixpREFBbUM7QUFDbkMsd0RBQXVDO0FBQ3ZDLG1DQUFnQztBQUNoQywrQkFVYztBQUNkLDBEQUFpQztBQUVqQzs7R0FFRztBQUNVLFFBQUEsZUFBZSxHQUFXO0lBQ3JDO1FBQ0UsSUFBSSxFQUFFLGFBQWE7UUFDbkIsV0FBVyxFQUFFLHNDQUFzQztRQUNuRCxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDVixTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLHVCQUF1QjtpQkFDckM7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxRQUFRO29CQUNkLFdBQVcsRUFBRSw4QkFBOEI7aUJBQzVDO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxVQUFVLEVBQUU7d0JBQ1YsU0FBUyxFQUFFOzRCQUNULElBQUksRUFBRSxRQUFROzRCQUNkLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDOzRCQUMvQixPQUFPLEVBQUUsSUFBSTt5QkFDZDt3QkFDRCxPQUFPLEVBQUU7NEJBQ1AsSUFBSSxFQUFFLFFBQVE7NEJBQ2QsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7NEJBQ2xDLE9BQU8sRUFBRSxRQUFRO3lCQUNsQjtxQkFDRjtpQkFDRjthQUNGO1lBQ0QsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQztTQUN2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RUFBRSxDQUFDLENBQUM7WUFDbEQsQ0FBQztRQUNILENBQUM7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUVqQixDQUFDO0lBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztRQUNwQixPQUFPO1lBQ0wsT0FBTyxFQUFFLEtBQUs7WUFDZCxLQUFLLEVBQUUsNEJBQTRCLEtBQUssQ0FBQyxPQUFPLEVBQUU7U0FDbkQsQ0FBQztJQUNKLENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb252ZXJzaW9uIFRvb2xzIC0gRm9ybWF0IGNvbnZlcnNpb24gb3BlcmF0aW9uc1xuICogXG4gKiBCZXN0LWluLWNsYXNzIHRvb2xzIGZvciBkb2N1bWVudCBmb3JtYXQgY29udmVyc2lvbi5cbiAqIEJhc2VkIG9uIHBhbmRvYywgbWFya2l0ZG93biwgYW5kIG90aGVyIGNvbnZlcnNpb24gbGlicmFyaWVzLlxuICovXG5cbmltcG9ydCB7IFRvb2wgfSBmcm9tIFwiQG1vZGVsY29udGV4dHByb3RvY29sL3Nkay90eXBlcy5qc1wiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgKiBhcyBYTFNYIGZyb20gXCJ4bHN4XCI7XG5pbXBvcnQgKiBhcyBtYW1tb3RoIGZyb20gXCJtYW1tb3RoXCI7XG5pbXBvcnQgVHVybmRvd25TZXJ2aWNlIGZyb20gXCJ0dXJuZG93blwiO1xuaW1wb3J0IHsgbWFya2VkIH0gZnJvbSBcIm1hcmtlZFwiO1xuaW1wb3J0IHtcbiAgRG9jdW1lbnQsXG4gIFBhcmFncmFwaCxcbiAgVGV4dFJ1bixcbiAgSGVhZGluZ0xldmVsLFxuICBUYWJsZSxcbiAgVGFibGVSb3csXG4gIFRhYmxlQ2VsbCxcbiAgV2lkdGhUeXBlLFxuICBQYWNrZXIsXG59IGZyb20gXCJkb2N4XCI7XG5pbXBvcnQgcGRmUGFyc2UgZnJvbSBcInBkZi1wYXJzZVwiO1xuXG4vKipcbiAqIENvbnZlcnNpb24gdG9vbCBkZWZpbml0aW9uc1xuICovXG5leHBvcnQgY29uc3QgY29udmVyc2lvblRvb2xzOiBUb29sW10gPSBbXG4gIHtcbiAgICBuYW1lOiBcImRvY3hfdG9fcGRmXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQ29udmVydCBET0NYIGRvY3VtZW50IHRvIFBERiBmb3JtYXQuXCIsXG4gICAgaW5wdXRTY2hlbWE6IHtcbiAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGZpbGVfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgRE9DWCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dF9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIGZvciB0aGUgb3V0cHV0IFBERiBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIHBhZ2Vfc2l6ZToge1xuICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICBlbnVtOiBbXCJBNFwiLCBcIkxldHRlclwiLCBcIkxlZ2FsXCJdLFxuICAgICAgICAgICAgICBkZWZhdWx0OiBcIkE0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWFyZ2luczoge1xuICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICBlbnVtOiBbXCJub3JtYWxcIiwgXCJuYXJyb3dcIiwgXCJ3aWRlXCJdLFxuICAgICAgICAgICAgICBkZWZhdWx0OiBcIm5vcm1hbFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJmaWxlX3BhdGhcIiwgXCJvdXRwdXRfcGF0aFwiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJwZGZfdG9fZG9jeFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkNvbnZlcnQgUERGIHRvIGVkaXRhYmxlIERPQ1ggZm9ybWF0LlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIFBERiBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dF9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIGZvciB0aGUgb3V0cHV0IERPQ1ggZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBwcmVzZXJ2ZV9sYXlvdXQ6IHtcbiAgICAgICAgICB0eXBlOiBcImJvb2xlYW5cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUcnkgdG8gcHJlc2VydmUgb3JpZ2luYWwgbGF5b3V0XCIsXG4gICAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiZmlsZV9wYXRoXCIsIFwib3V0cHV0X3BhdGhcIl0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwibWRfdG9fZG9jeFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkNvbnZlcnQgTWFya2Rvd24gdG8gRE9DWCBkb2N1bWVudC5cIixcbiAgICBpbnB1dFNjaGVtYToge1xuICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbWFya2Rvd25fY29udGVudDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiTWFya2Rvd24gY29udGVudCB0byBjb252ZXJ0XCIsXG4gICAgICAgIH0sXG4gICAgICAgIG1hcmtkb3duX2ZpbGU6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gTWFya2Rvd24gZmlsZSAoYWx0ZXJuYXRpdmUpXCIsXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dF9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIGZvciB0aGUgb3V0cHV0IERPQ1ggZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiT3B0aW9uYWwgRE9DWCB0ZW1wbGF0ZSBmb3Igc3R5bGluZ1wiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJvdXRwdXRfcGF0aFwiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJkb2N4X3RvX21kXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQ29udmVydCBET0NYIGRvY3VtZW50IHRvIE1hcmtkb3duIGZvcm1hdCAodXNpbmcgTWljcm9zb2Z0IG1hcmtpdGRvd24gYXBwcm9hY2gpLlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIERPQ1ggZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCBmb3IgdGhlIG91dHB1dCBNYXJrZG93biBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGluY2x1ZGVfaW1hZ2VzOiB7XG4gICAgICAgICAgdHlwZTogXCJib29sZWFuXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiRXh0cmFjdCBhbmQgcmVmZXJlbmNlIGltYWdlc1wiLFxuICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGltYWdlX2Rpcjoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiRGlyZWN0b3J5IGZvciBleHRyYWN0ZWQgaW1hZ2VzXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImZpbGVfcGF0aFwiLCBcIm91dHB1dF9wYXRoXCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInhsc3hfdG9fY3N2XCIsXG4gICAgZGVzY3JpcHRpb246IFwiQ29udmVydCBFeGNlbCBzcHJlYWRzaGVldCB0byBDU1YgZm9ybWF0LlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIFhMU1ggZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCBmb3IgdGhlIG91dHB1dCBDU1YgZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBzaGVldF9uYW1lOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTaGVldCB0byBjb252ZXJ0IChkZWZhdWx0OiBmaXJzdCBzaGVldClcIixcbiAgICAgICAgfSxcbiAgICAgICAgZGVsaW1pdGVyOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDU1YgZGVsaW1pdGVyXCIsXG4gICAgICAgICAgZGVmYXVsdDogXCIsXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGVuY29kaW5nOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBlbnVtOiBbXCJ1dGYtOFwiLCBcInV0Zi04LXNpZ1wiLCBcImdia1wiLCBcImxhdGluLTFcIl0sXG4gICAgICAgICAgZGVmYXVsdDogXCJ1dGYtOFwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJmaWxlX3BhdGhcIiwgXCJvdXRwdXRfcGF0aFwiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJjc3ZfdG9feGxzeFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkNvbnZlcnQgQ1NWIHRvIEV4Y2VsIHNwcmVhZHNoZWV0LlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIENTViBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dF9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIGZvciB0aGUgb3V0cHV0IFhMU1ggZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBkZWxpbWl0ZXI6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNTViBkZWxpbWl0ZXJcIixcbiAgICAgICAgICBkZWZhdWx0OiBcIixcIixcbiAgICAgICAgfSxcbiAgICAgICAgc2hlZXRfbmFtZToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiTmFtZSBmb3IgdGhlIHNoZWV0XCIsXG4gICAgICAgICAgZGVmYXVsdDogXCJTaGVldDFcIixcbiAgICAgICAgfSxcbiAgICAgICAgYXV0b19mb3JtYXQ6IHtcbiAgICAgICAgICB0eXBlOiBcImJvb2xlYW5cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBdXRvLWRldGVjdCBhbmQgZm9ybWF0IGNvbHVtbnNcIixcbiAgICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJmaWxlX3BhdGhcIiwgXCJvdXRwdXRfcGF0aFwiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJodG1sX3RvX3BkZlwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkNvbnZlcnQgSFRNTCBjb250ZW50IHRvIFBERi5cIixcbiAgICBpbnB1dFNjaGVtYToge1xuICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaHRtbF9jb250ZW50OiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJIVE1MIGNvbnRlbnQgdG8gY29udmVydFwiLFxuICAgICAgICB9LFxuICAgICAgICBodG1sX2ZpbGU6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gSFRNTCBmaWxlIChhbHRlcm5hdGl2ZSlcIixcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0X3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggZm9yIHRoZSBvdXRwdXQgUERGIGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgcGFnZV9zaXplOiB7IHR5cGU6IFwic3RyaW5nXCIsIGRlZmF1bHQ6IFwiQTRcIiB9LFxuICAgICAgICAgICAgbWFyZ2luOiB7IHR5cGU6IFwic3RyaW5nXCIsIGRlZmF1bHQ6IFwiMWNtXCIgfSxcbiAgICAgICAgICAgIHByaW50X2JhY2tncm91bmQ6IHsgdHlwZTogXCJib29sZWFuXCIsIGRlZmF1bHQ6IHRydWUgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJvdXRwdXRfcGF0aFwiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJqc29uX3RvX3hsc3hcIixcbiAgICBkZXNjcmlwdGlvbjogXCJDb252ZXJ0IEpTT04gZGF0YSB0byBFeGNlbCBzcHJlYWRzaGVldC5cIixcbiAgICBpbnB1dFNjaGVtYToge1xuICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAganNvbl9kYXRhOiB7XG4gICAgICAgICAgdHlwZTogXCJhcnJheVwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFycmF5IG9mIG9iamVjdHMgdG8gY29udmVydFwiLFxuICAgICAgICB9LFxuICAgICAgICBqc29uX2ZpbGU6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gSlNPTiBmaWxlIChhbHRlcm5hdGl2ZSlcIixcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0X3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggZm9yIHRoZSBvdXRwdXQgWExTWCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHNoZWV0X25hbWU6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlZmF1bHQ6IFwiRGF0YVwiLFxuICAgICAgICB9LFxuICAgICAgICBpbmNsdWRlX2hlYWRlcnM6IHtcbiAgICAgICAgICB0eXBlOiBcImJvb2xlYW5cIixcbiAgICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJvdXRwdXRfcGF0aFwiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJiYXRjaF9jb252ZXJ0XCIsXG4gICAgZGVzY3JpcHRpb246IFwiQ29udmVydCBtdWx0aXBsZSBmaWxlcyBpbiBiYXRjaC5cIixcbiAgICBpbnB1dFNjaGVtYToge1xuICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaW5wdXRfZGlyOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJEaXJlY3RvcnkgY29udGFpbmluZyBmaWxlcyB0byBjb252ZXJ0XCIsXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dF9kaXI6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRpcmVjdG9yeSBmb3IgY29udmVydGVkIGZpbGVzXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGZyb21fZm9ybWF0OiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBlbnVtOiBbXCJkb2N4XCIsIFwicGRmXCIsIFwieGxzeFwiLCBcImNzdlwiLCBcIm1kXCIsIFwiaHRtbFwiXSxcbiAgICAgICAgfSxcbiAgICAgICAgdG9fZm9ybWF0OiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBlbnVtOiBbXCJkb2N4XCIsIFwicGRmXCIsIFwieGxzeFwiLCBcImNzdlwiLCBcIm1kXCIsIFwiaHRtbFwiXSxcbiAgICAgICAgfSxcbiAgICAgICAgZmlsZV9wYXR0ZXJuOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJHbG9iIHBhdHRlcm4gZm9yIGZpbGVzIChlLmcuLCAnKi5kb2N4JylcIixcbiAgICAgICAgICBkZWZhdWx0OiBcIipcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiaW5wdXRfZGlyXCIsIFwib3V0cHV0X2RpclwiLCBcImZyb21fZm9ybWF0XCIsIFwidG9fZm9ybWF0XCJdLFxuICAgIH0sXG4gIH0sXG5dO1xuXG4vKipcbiAqIEhhbmRsZSBjb252ZXJzaW9uIHRvb2wgY2FsbHNcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNvbnZlcnNpb25Ub29sKFxuICBuYW1lOiBzdHJpbmcsXG4gIGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG4pOiBQcm9taXNlPHVua25vd24+IHtcbiAgc3dpdGNoIChuYW1lKSB7XG4gICAgY2FzZSBcImRvY3hfdG9fcGRmXCI6XG4gICAgICByZXR1cm4gZG9jeFRvUGRmKGFyZ3MpO1xuICAgIGNhc2UgXCJwZGZfdG9fZG9jeFwiOlxuICAgICAgcmV0dXJuIHBkZlRvRG9jeChhcmdzKTtcbiAgICBjYXNlIFwibWRfdG9fZG9jeFwiOlxuICAgICAgcmV0dXJuIG1kVG9Eb2N4KGFyZ3MpO1xuICAgIGNhc2UgXCJkb2N4X3RvX21kXCI6XG4gICAgICByZXR1cm4gZG9jeFRvTWQoYXJncyk7XG4gICAgY2FzZSBcInhsc3hfdG9fY3N2XCI6XG4gICAgICByZXR1cm4geGxzeFRvQ3N2KGFyZ3MpO1xuICAgIGNhc2UgXCJjc3ZfdG9feGxzeFwiOlxuICAgICAgcmV0dXJuIGNzdlRvWGxzeChhcmdzKTtcbiAgICBjYXNlIFwiaHRtbF90b19wZGZcIjpcbiAgICAgIHJldHVybiBodG1sVG9QZGYoYXJncyk7XG4gICAgY2FzZSBcImpzb25fdG9feGxzeFwiOlxuICAgICAgcmV0dXJuIGpzb25Ub1hsc3goYXJncyk7XG4gICAgY2FzZSBcImJhdGNoX2NvbnZlcnRcIjpcbiAgICAgIHJldHVybiBiYXRjaENvbnZlcnQoYXJncyk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBjb252ZXJzaW9uIHRvb2w6ICR7bmFtZX1gKTtcbiAgfVxufVxuXG4vLyBUb29sIGltcGxlbWVudGF0aW9uc1xuXG5hc3luYyBmdW5jdGlvbiBkb2N4VG9QZGYoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPG9iamVjdD4ge1xuICBjb25zdCB7IGZpbGVfcGF0aCwgb3V0cHV0X3BhdGggfSA9IGFyZ3M7XG4gIFxuICAvLyBOb3RlOiBET0NYIHRvIFBERiBjb252ZXJzaW9uIHJlcXVpcmVzIGV4dGVybmFsIHRvb2xzXG4gIC8vIE9wdGlvbnM6IGxpYnJlb2ZmaWNlLCBwYW5kb2Mgd2l0aCBsYXRleCwgb3IgY2xvdWQgc2VydmljZXNcbiAgcmV0dXJuIHtcbiAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICBtZXNzYWdlOiBcIkRPQ1ggdG8gUERGIGNvbnZlcnNpb24gcmVxdWlyZXMgZXh0ZXJuYWwgdG9vbHNcIixcbiAgICBmaWxlOiBmaWxlX3BhdGgsXG4gICAgb3V0cHV0OiBvdXRwdXRfcGF0aCxcbiAgICBhbHRlcm5hdGl2ZXM6IFtcbiAgICAgIFwiSW5zdGFsbCBMaWJyZU9mZmljZTogYnJldyBpbnN0YWxsIC0tY2FzayBsaWJyZW9mZmljZVwiLFxuICAgICAgXCJVc2U6IHNvZmZpY2UgLS1oZWFkbGVzcyAtLWNvbnZlcnQtdG8gcGRmIC0tb3V0ZGlyIDxvdXRwdXRfZGlyPiA8aW5wdXRfZmlsZT5cIixcbiAgICAgIFwiT3IgdXNlIHBhbmRvYyB3aXRoIExhVGVYOiBwYW5kb2MgaW5wdXQuZG9jeCAtbyBvdXRwdXQucGRmXCIsXG4gICAgICBcIk9yIHVzZSBhIGNsb3VkIGNvbnZlcnNpb24gQVBJXCIsXG4gICAgXSxcbiAgfTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcGRmVG9Eb2N4KGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxvYmplY3Q+IHtcbiAgY29uc3QgeyBmaWxlX3BhdGgsIG91dHB1dF9wYXRoIH0gPSBhcmdzO1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGVfcGF0aCBhcyBzdHJpbmc7XG4gICAgY29uc3Qgb3V0cHV0UGF0aCA9IG91dHB1dF9wYXRoIGFzIHN0cmluZztcbiAgICBcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZmlsZVBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZpbGUgbm90IGZvdW5kOiAke2ZpbGVQYXRofWApO1xuICAgIH1cbiAgICBcbiAgICAvLyBFeHRyYWN0IHRleHQgZnJvbSBQREZcbiAgICBjb25zdCBkYXRhQnVmZmVyID0gZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoKTtcbiAgICBjb25zdCBwZGZEYXRhID0gYXdhaXQgcGRmUGFyc2UoZGF0YUJ1ZmZlcik7XG4gICAgY29uc3QgdGV4dCA9IHBkZkRhdGEudGV4dDtcbiAgICBcbiAgICAvLyBDcmVhdGUgRE9DWCB3aXRoIGV4dHJhY3RlZCB0ZXh0XG4gICAgY29uc3QgcGFyYWdyYXBocyA9IHRleHQuc3BsaXQoJ1xcbicpLmZpbHRlcihsaW5lID0+IGxpbmUudHJpbSgpKS5tYXAoXG4gICAgICBsaW5lID0+IG5ldyBQYXJhZ3JhcGgoeyB0ZXh0OiBsaW5lIH0pXG4gICAgKTtcbiAgICBcbiAgICBjb25zdCBkb2MgPSBuZXcgRG9jdW1lbnQoe1xuICAgICAgc2VjdGlvbnM6IFt7IGNoaWxkcmVuOiBwYXJhZ3JhcGhzIH1dLFxuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IFBhY2tlci50b0J1ZmZlcihkb2MpO1xuICAgIGZzLndyaXRlRmlsZVN5bmMob3V0cHV0UGF0aCwgYnVmZmVyKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIG1lc3NhZ2U6IGBDb252ZXJ0ZWQgUERGIHRvIERPQ1ggKHRleHQtb25seSBleHRyYWN0aW9uKWAsXG4gICAgICBpbnB1dDogZmlsZV9wYXRoLFxuICAgICAgb3V0cHV0OiBvdXRwdXRfcGF0aCxcbiAgICAgIHBhZ2VzOiBwZGZEYXRhLm51bXBhZ2VzLFxuICAgICAgbm90ZTogXCJMYXlvdXQgYW5kIGltYWdlcyBhcmUgbm90IHByZXNlcnZlZC4gRm9yIGZ1bGwgY29udmVyc2lvbiwgdXNlIEFkb2JlIEFjcm9iYXQgb3Igb25saW5lIHNlcnZpY2VzLlwiLFxuICAgIH07XG4gICAgXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBlcnJvcjogYEZhaWxlZCB0byBjb252ZXJ0IFBERiB0byBET0NYOiAke2Vycm9yLm1lc3NhZ2V9YCxcbiAgICB9O1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1kVG9Eb2N4KGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgeyBtYXJrZG93bl9jb250ZW50LCBtYXJrZG93bl9maWxlLCBvdXRwdXRfcGF0aCB9ID0gYXJncztcbiAgXG4gIHRyeSB7XG4gICAgY29uc3Qgb3V0cHV0UGF0aCA9IG91dHB1dF9wYXRoIGFzIHN0cmluZztcbiAgICBcbiAgICAvLyBHZXQgbWFya2Rvd24gY29udGVudFxuICAgIGxldCBtZENvbnRlbnQ6IHN0cmluZztcbiAgICBpZiAobWFya2Rvd25fY29udGVudCkge1xuICAgICAgbWRDb250ZW50ID0gbWFya2Rvd25fY29udGVudCBhcyBzdHJpbmc7XG4gICAgfSBlbHNlIGlmIChtYXJrZG93bl9maWxlKSB7XG4gICAgICBjb25zdCBtZEZpbGUgPSBtYXJrZG93bl9maWxlIGFzIHN0cmluZztcbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhtZEZpbGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTWFya2Rvd24gZmlsZSBub3QgZm91bmQ6ICR7bWRGaWxlfWApO1xuICAgICAgfVxuICAgICAgbWRDb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKG1kRmlsZSwgJ3V0Zi04Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRWl0aGVyIG1hcmtkb3duX2NvbnRlbnQgb3IgbWFya2Rvd25fZmlsZSBpcyByZXF1aXJlZCcpO1xuICAgIH1cbiAgICBcbiAgICAvLyBQYXJzZSBtYXJrZG93biB0byBIVE1MXG4gICAgY29uc3QgaHRtbCA9IGF3YWl0IG1hcmtlZChtZENvbnRlbnQpO1xuICAgIFxuICAgIC8vIENvbnZlcnQgSFRNTCB0byBkb2N1bWVudCBzdHJ1Y3R1cmVcbiAgICBjb25zdCBjaGlsZHJlbjogUGFyYWdyYXBoW10gPSBbXTtcbiAgICBcbiAgICAvLyBTaW1wbGUgSFRNTCB0byBET0NYIGNvbnZlcnNpb25cbiAgICBjb25zdCBsaW5lcyA9IGh0bWwuc3BsaXQoLzxcXC8/KD86cHxoWzEtNl18bGl8YnIpW14+XSo+L2kpLmZpbHRlcihsaW5lID0+IGxpbmUudHJpbSgpKTtcbiAgICBcbiAgICAvLyBQcm9jZXNzIGhlYWRpbmdzIGFuZCBwYXJhZ3JhcGhzXG4gICAgY29uc3QgaGVhZGluZ01hdGNoZXMgPSBodG1sLm1hdGNoQWxsKC88KGhbMS02XSk+KC4qPyk8XFwvXFwxPi9naSk7XG4gICAgZm9yIChjb25zdCBtYXRjaCBvZiBoZWFkaW5nTWF0Y2hlcykge1xuICAgICAgY29uc3QgbGV2ZWwgPSBwYXJzZUludChtYXRjaFsxXS5jaGFyQXQoMSkpO1xuICAgICAgY29uc3QgdGV4dCA9IG1hdGNoWzJdLnJlcGxhY2UoLzxbXj5dKj4vZywgJycpOyAvLyBTdHJpcCBpbm5lciBIVE1MXG4gICAgICBjb25zdCBoZWFkaW5nTGV2ZWxzOiB7IFtrZXk6IG51bWJlcl06IHR5cGVvZiBIZWFkaW5nTGV2ZWxba2V5b2YgdHlwZW9mIEhlYWRpbmdMZXZlbF0gfSA9IHtcbiAgICAgICAgMTogSGVhZGluZ0xldmVsLkhFQURJTkdfMSxcbiAgICAgICAgMjogSGVhZGluZ0xldmVsLkhFQURJTkdfMixcbiAgICAgICAgMzogSGVhZGluZ0xldmVsLkhFQURJTkdfMyxcbiAgICAgICAgNDogSGVhZGluZ0xldmVsLkhFQURJTkdfNCxcbiAgICAgICAgNTogSGVhZGluZ0xldmVsLkhFQURJTkdfNSxcbiAgICAgICAgNjogSGVhZGluZ0xldmVsLkhFQURJTkdfNixcbiAgICAgIH07XG4gICAgICBjaGlsZHJlbi5wdXNoKG5ldyBQYXJhZ3JhcGgoe1xuICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICBoZWFkaW5nOiBoZWFkaW5nTGV2ZWxzW2xldmVsXSB8fCBIZWFkaW5nTGV2ZWwuSEVBRElOR18xLFxuICAgICAgfSkpO1xuICAgIH1cbiAgICBcbiAgICAvLyBQcm9jZXNzIHBhcmFncmFwaHNcbiAgICBjb25zdCBwYXJhZ3JhcGhNYXRjaGVzID0gaHRtbC5tYXRjaEFsbCgvPHA+KC4qPyk8XFwvcD4vZ2kpO1xuICAgIGZvciAoY29uc3QgbWF0Y2ggb2YgcGFyYWdyYXBoTWF0Y2hlcykge1xuICAgICAgY29uc3QgdGV4dCA9IG1hdGNoWzFdLnJlcGxhY2UoLzxbXj5dKj4vZywgJycpOyAvLyBTdHJpcCBpbm5lciBIVE1MXG4gICAgICBjaGlsZHJlbi5wdXNoKG5ldyBQYXJhZ3JhcGgoeyB0ZXh0IH0pKTtcbiAgICB9XG4gICAgXG4gICAgLy8gUHJvY2VzcyBsaXN0IGl0ZW1zXG4gICAgY29uc3QgbGlzdE1hdGNoZXMgPSBodG1sLm1hdGNoQWxsKC88bGk+KC4qPyk8XFwvbGk+L2dpKTtcbiAgICBmb3IgKGNvbnN0IG1hdGNoIG9mIGxpc3RNYXRjaGVzKSB7XG4gICAgICBjb25zdCB0ZXh0ID0gbWF0Y2hbMV0ucmVwbGFjZSgvPFtePl0qPi9nLCAnJyk7XG4gICAgICBjaGlsZHJlbi5wdXNoKG5ldyBQYXJhZ3JhcGgoe1xuICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICBidWxsZXQ6IHsgbGV2ZWw6IDAgfSxcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgZG9jID0gbmV3IERvY3VtZW50KHtcbiAgICAgIHNlY3Rpb25zOiBbeyBjaGlsZHJlbiB9XSxcbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCBidWZmZXIgPSBhd2FpdCBQYWNrZXIudG9CdWZmZXIoZG9jKTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKG91dHB1dFBhdGgsIGJ1ZmZlcik7XG4gICAgXG4gICAgcmV0dXJuIGBTdWNjZXNzZnVsbHkgY29udmVydGVkIE1hcmtkb3duIHRvIERPQ1ggYXQgJHtvdXRwdXRQYXRofWA7XG4gICAgXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICByZXR1cm4gYEVycm9yIGNvbnZlcnRpbmcgTWFya2Rvd24gdG8gRE9DWDogJHtlcnJvci5tZXNzYWdlfWA7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZG9jeFRvTWQoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7IGZpbGVfcGF0aCwgb3V0cHV0X3BhdGggfSA9IGFyZ3M7XG4gIFxuICB0cnkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gZmlsZV9wYXRoIGFzIHN0cmluZztcbiAgICBjb25zdCBvdXRwdXRQYXRoID0gb3V0cHV0X3BhdGggYXMgc3RyaW5nO1xuICAgIFxuICAgIGlmICghZnMuZXhpc3RzU3luYyhmaWxlUGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmlsZSBub3QgZm91bmQ6ICR7ZmlsZVBhdGh9YCk7XG4gICAgfVxuICAgIFxuICAgIC8vIFJlYWQgRE9DWCBhbmQgY29udmVydCB0byBIVE1MXG4gICAgY29uc3QgYnVmZmVyID0gZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBtYW1tb3RoLmNvbnZlcnRUb0h0bWwoeyBidWZmZXIgfSk7XG4gICAgY29uc3QgaHRtbCA9IHJlc3VsdC52YWx1ZTtcbiAgICBcbiAgICAvLyBDb252ZXJ0IEhUTUwgdG8gTWFya2Rvd24gdXNpbmcgVHVybmRvd25cbiAgICBjb25zdCB0dXJuZG93blNlcnZpY2UgPSBuZXcgVHVybmRvd25TZXJ2aWNlKHtcbiAgICAgIGhlYWRpbmdTdHlsZTogJ2F0eCcsXG4gICAgICBjb2RlQmxvY2tTdHlsZTogJ2ZlbmNlZCcsXG4gICAgfSk7XG4gICAgXG4gICAgY29uc3QgbWFya2Rvd24gPSB0dXJuZG93blNlcnZpY2UudHVybmRvd24oaHRtbCk7XG4gICAgXG4gICAgLy8gV3JpdGUgbWFya2Rvd24gZmlsZVxuICAgIGZzLndyaXRlRmlsZVN5bmMob3V0cHV0UGF0aCwgbWFya2Rvd24sICd1dGYtOCcpO1xuICAgIFxuICAgIHJldHVybiBgU3VjY2Vzc2Z1bGx5IGNvbnZlcnRlZCBET0NYIHRvIE1hcmtkb3duIGF0ICR7b3V0cHV0UGF0aH0uIFdhcm5pbmdzOiAke3Jlc3VsdC5tZXNzYWdlcy5sZW5ndGh9YDtcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIHJldHVybiBgRXJyb3IgY29udmVydGluZyBET0NYIHRvIE1hcmtkb3duOiAke2Vycm9yLm1lc3NhZ2V9YDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiB4bHN4VG9Dc3YoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7IGZpbGVfcGF0aCwgb3V0cHV0X3BhdGgsIHNoZWV0X25hbWUsIGRlbGltaXRlciB9ID0gYXJncztcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBmaWxlX3BhdGggYXMgc3RyaW5nO1xuICAgIGNvbnN0IG91dHB1dFBhdGggPSBvdXRwdXRfcGF0aCBhcyBzdHJpbmc7XG4gICAgY29uc3QgZGVsaW0gPSBkZWxpbWl0ZXIgYXMgc3RyaW5nIHx8ICcsJztcbiAgICBcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZmlsZVBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZpbGUgbm90IGZvdW5kOiAke2ZpbGVQYXRofWApO1xuICAgIH1cbiAgICBcbiAgICAvLyBSZWFkIHdvcmtib29rXG4gICAgY29uc3Qgd29ya2Jvb2sgPSBYTFNYLnJlYWRGaWxlKGZpbGVQYXRoKTtcbiAgICBjb25zdCB0YXJnZXRTaGVldCA9IHNoZWV0X25hbWUgYXMgc3RyaW5nIHx8IHdvcmtib29rLlNoZWV0TmFtZXNbMF07XG4gICAgY29uc3Qgd29ya3NoZWV0ID0gd29ya2Jvb2suU2hlZXRzW3RhcmdldFNoZWV0XTtcbiAgICBcbiAgICAvLyBDb252ZXJ0IHRvIENTVlxuICAgIGNvbnN0IGNzdiA9IFhMU1gudXRpbHMuc2hlZXRfdG9fY3N2KHdvcmtzaGVldCwgeyBGUzogZGVsaW0gfSk7XG4gICAgXG4gICAgLy8gV3JpdGUgQ1NWIGZpbGVcbiAgICBmcy53cml0ZUZpbGVTeW5jKG91dHB1dFBhdGgsIGNzdiwgJ3V0Zi04Jyk7XG4gICAgXG4gICAgcmV0dXJuIGBTdWNjZXNzZnVsbHkgY29udmVydGVkICR7dGFyZ2V0U2hlZXR9IHRvIENTViBhdCAke291dHB1dFBhdGh9YDtcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIHJldHVybiBgRXJyb3IgY29udmVydGluZyBYTFNYIHRvIENTVjogJHtlcnJvci5tZXNzYWdlfWA7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gY3N2VG9YbHN4KGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgeyBmaWxlX3BhdGgsIG91dHB1dF9wYXRoLCBkZWxpbWl0ZXIsIHNoZWV0X25hbWUgfSA9IGFyZ3M7XG4gIFxuICB0cnkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gZmlsZV9wYXRoIGFzIHN0cmluZztcbiAgICBjb25zdCBvdXRwdXRQYXRoID0gb3V0cHV0X3BhdGggYXMgc3RyaW5nO1xuICAgIGNvbnN0IGRlbGltID0gZGVsaW1pdGVyIGFzIHN0cmluZyB8fCAnLCc7XG4gICAgY29uc3Qgc2hlZXROYW1lID0gc2hlZXRfbmFtZSBhcyBzdHJpbmcgfHwgJ1NoZWV0MSc7XG4gICAgXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWxlIG5vdCBmb3VuZDogJHtmaWxlUGF0aH1gKTtcbiAgICB9XG4gICAgXG4gICAgLy8gUmVhZCBDU1ZcbiAgICBjb25zdCBjc3ZDb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoLCAndXRmLTgnKTtcbiAgICBcbiAgICAvLyBQYXJzZSBDU1YgbWFudWFsbHkgKHNpbXBsZSBwYXJzZXIpXG4gICAgY29uc3Qgcm93cyA9IGNzdkNvbnRlbnQuc3BsaXQoJ1xcbicpLm1hcChsaW5lID0+IHtcbiAgICAgIC8vIEhhbmRsZSBxdW90ZWQgZmllbGRzXG4gICAgICBjb25zdCBjZWxsczogc3RyaW5nW10gPSBbXTtcbiAgICAgIGxldCBjdXJyZW50ID0gJyc7XG4gICAgICBsZXQgaW5RdW90ZXMgPSBmYWxzZTtcbiAgICAgIFxuICAgICAgZm9yIChjb25zdCBjaGFyIG9mIGxpbmUpIHtcbiAgICAgICAgaWYgKGNoYXIgPT09ICdcIicpIHtcbiAgICAgICAgICBpblF1b3RlcyA9ICFpblF1b3RlcztcbiAgICAgICAgfSBlbHNlIGlmIChjaGFyID09PSBkZWxpbSAmJiAhaW5RdW90ZXMpIHtcbiAgICAgICAgICBjZWxscy5wdXNoKGN1cnJlbnQudHJpbSgpKTtcbiAgICAgICAgICBjdXJyZW50ID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VycmVudCArPSBjaGFyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjZWxscy5wdXNoKGN1cnJlbnQudHJpbSgpKTtcbiAgICAgIHJldHVybiBjZWxscztcbiAgICB9KS5maWx0ZXIocm93ID0+IHJvdy5zb21lKGNlbGwgPT4gY2VsbCkpO1xuICAgIFxuICAgIC8vIENyZWF0ZSB3b3JrYm9va1xuICAgIGNvbnN0IHdvcmtzaGVldCA9IFhMU1gudXRpbHMuYW9hX3RvX3NoZWV0KHJvd3MpO1xuICAgIGNvbnN0IHdvcmtib29rID0gWExTWC51dGlscy5ib29rX25ldygpO1xuICAgIFhMU1gudXRpbHMuYm9va19hcHBlbmRfc2hlZXQod29ya2Jvb2ssIHdvcmtzaGVldCwgc2hlZXROYW1lKTtcbiAgICBcbiAgICAvLyBXcml0ZSBYTFNYXG4gICAgWExTWC53cml0ZUZpbGUod29ya2Jvb2ssIG91dHB1dFBhdGgpO1xuICAgIFxuICAgIHJldHVybiBgU3VjY2Vzc2Z1bGx5IGNvbnZlcnRlZCBDU1YgdG8gWExTWCBhdCAke291dHB1dFBhdGh9ICgke3Jvd3MubGVuZ3RofSByb3dzKWA7XG4gICAgXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICByZXR1cm4gYEVycm9yIGNvbnZlcnRpbmcgQ1NWIHRvIFhMU1g6ICR7ZXJyb3IubWVzc2FnZX1gO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGh0bWxUb1BkZihhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8b2JqZWN0PiB7XG4gIGNvbnN0IHsgaHRtbF9jb250ZW50LCBodG1sX2ZpbGUsIG91dHB1dF9wYXRoIH0gPSBhcmdzO1xuICBcbiAgLy8gTm90ZTogSFRNTCB0byBQREYgcmVxdWlyZXMgYSBicm93c2VyIGVuZ2luZSAocHVwcGV0ZWVyKSBvciBleHRlcm5hbCB0b29sc1xuICByZXR1cm4ge1xuICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgIG1lc3NhZ2U6IFwiSFRNTCB0byBQREYgY29udmVyc2lvbiByZXF1aXJlcyBQdXBwZXRlZXIgb3IgZXh0ZXJuYWwgdG9vbHNcIixcbiAgICBvdXRwdXQ6IG91dHB1dF9wYXRoLFxuICAgIGFsdGVybmF0aXZlczogW1xuICAgICAgXCJJbnN0YWxsIHB1cHBldGVlcjogbnBtIGluc3RhbGwgcHVwcGV0ZWVyXCIsXG4gICAgICBcIlVzZSB3a2h0bWx0b3BkZjogYnJldyBpbnN0YWxsIHdraHRtbHRvcGRmXCIsXG4gICAgICBcIlVzZSBDaHJvbWUgaGVhZGxlc3M6IGNocm9tZSAtLWhlYWRsZXNzIC0tcHJpbnQtdG8tcGRmXCIsXG4gICAgICBcIlNhdmUgSFRNTCBhbmQgdXNlIGJyb3dzZXIgcHJpbnQgdG8gUERGXCIsXG4gICAgXSxcbiAgICBodG1sX3ByZXZpZXc6IGh0bWxfY29udGVudCA/IChodG1sX2NvbnRlbnQgYXMgc3RyaW5nKS5zdWJzdHJpbmcoMCwgMjAwKSArICcuLi4nIDogJ2Zyb20gZmlsZScsXG4gIH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGpzb25Ub1hsc3goYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7IGpzb25fZGF0YSwganNvbl9maWxlLCBvdXRwdXRfcGF0aCwgc2hlZXRfbmFtZSwgaW5jbHVkZV9oZWFkZXJzIH0gPSBhcmdzO1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBvdXRwdXRQYXRoID0gb3V0cHV0X3BhdGggYXMgc3RyaW5nO1xuICAgIGNvbnN0IHNoZWV0TmFtZSA9IHNoZWV0X25hbWUgYXMgc3RyaW5nIHx8ICdEYXRhJztcbiAgICBjb25zdCBoZWFkZXJzID0gaW5jbHVkZV9oZWFkZXJzIGFzIGJvb2xlYW4gPz8gdHJ1ZTtcbiAgICBcbiAgICAvLyBHZXQgSlNPTiBkYXRhXG4gICAgbGV0IGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+W107XG4gICAgaWYgKGpzb25fZGF0YSkge1xuICAgICAgZGF0YSA9IGpzb25fZGF0YSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPltdO1xuICAgIH0gZWxzZSBpZiAoanNvbl9maWxlKSB7XG4gICAgICBjb25zdCBqc29uRmlsZVBhdGggPSBqc29uX2ZpbGUgYXMgc3RyaW5nO1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGpzb25GaWxlUGF0aCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBKU09OIGZpbGUgbm90IGZvdW5kOiAke2pzb25GaWxlUGF0aH1gKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGpzb25Db250ZW50ID0gZnMucmVhZEZpbGVTeW5jKGpzb25GaWxlUGF0aCwgJ3V0Zi04Jyk7XG4gICAgICBkYXRhID0gSlNPTi5wYXJzZShqc29uQ29udGVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRWl0aGVyIGpzb25fZGF0YSBvciBqc29uX2ZpbGUgaXMgcmVxdWlyZWQnKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpIHx8IGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0pTT04gZGF0YSBtdXN0IGJlIGEgbm9uLWVtcHR5IGFycmF5IG9mIG9iamVjdHMnKTtcbiAgICB9XG4gICAgXG4gICAgLy8gQ29udmVydCB0byB3b3Jrc2hlZXRcbiAgICBjb25zdCB3b3Jrc2hlZXQgPSBYTFNYLnV0aWxzLmpzb25fdG9fc2hlZXQoZGF0YSwge1xuICAgICAgaGVhZGVyOiBoZWFkZXJzID8gT2JqZWN0LmtleXMoZGF0YVswXSkgOiB1bmRlZmluZWQsXG4gICAgfSk7XG4gICAgXG4gICAgLy8gQ3JlYXRlIHdvcmtib29rXG4gICAgY29uc3Qgd29ya2Jvb2sgPSBYTFNYLnV0aWxzLmJvb2tfbmV3KCk7XG4gICAgWExTWC51dGlscy5ib29rX2FwcGVuZF9zaGVldCh3b3JrYm9vaywgd29ya3NoZWV0LCBzaGVldE5hbWUpO1xuICAgIFxuICAgIC8vIFdyaXRlIGZpbGVcbiAgICBYTFNYLndyaXRlRmlsZSh3b3JrYm9vaywgb3V0cHV0UGF0aCk7XG4gICAgXG4gICAgcmV0dXJuIGBTdWNjZXNzZnVsbHkgY29udmVydGVkIEpTT04gdG8gWExTWCBhdCAke291dHB1dFBhdGh9ICgke2RhdGEubGVuZ3RofSByZWNvcmRzKWA7XG4gICAgXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICByZXR1cm4gYEVycm9yIGNvbnZlcnRpbmcgSlNPTiB0byBYTFNYOiAke2Vycm9yLm1lc3NhZ2V9YDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBiYXRjaENvbnZlcnQoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPG9iamVjdD4ge1xuICBjb25zdCB7IGlucHV0X2Rpciwgb3V0cHV0X2RpciwgZnJvbV9mb3JtYXQsIHRvX2Zvcm1hdCwgZmlsZV9wYXR0ZXJuIH0gPSBhcmdzO1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBpbnB1dERpciA9IGlucHV0X2RpciBhcyBzdHJpbmc7XG4gICAgY29uc3Qgb3V0cHV0RGlyID0gb3V0cHV0X2RpciBhcyBzdHJpbmc7XG4gICAgY29uc3QgZnJvbUZtdCA9IGZyb21fZm9ybWF0IGFzIHN0cmluZztcbiAgICBjb25zdCB0b0ZtdCA9IHRvX2Zvcm1hdCBhcyBzdHJpbmc7XG4gICAgY29uc3QgcGF0dGVybiA9IGZpbGVfcGF0dGVybiBhcyBzdHJpbmcgfHwgYCouJHtmcm9tRm10fWA7XG4gICAgXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGlucHV0RGlyKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnB1dCBkaXJlY3Rvcnkgbm90IGZvdW5kOiAke2lucHV0RGlyfWApO1xuICAgIH1cbiAgICBcbiAgICAvLyBDcmVhdGUgb3V0cHV0IGRpcmVjdG9yeSBpZiBuZWVkZWRcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMob3V0cHV0RGlyKSkge1xuICAgICAgZnMubWtkaXJTeW5jKG91dHB1dERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgfVxuICAgIFxuICAgIC8vIEZpbmQgZmlsZXMgbWF0Y2hpbmcgcGF0dGVyblxuICAgIGNvbnN0IGZpbGVzID0gZnMucmVhZGRpclN5bmMoaW5wdXREaXIpLmZpbHRlcihmID0+IFxuICAgICAgZi50b0xvd2VyQ2FzZSgpLmVuZHNXaXRoKGAuJHtmcm9tRm10fWApXG4gICAgKTtcbiAgICBcbiAgICBjb25zdCByZXN1bHRzID0ge1xuICAgICAgaW5wdXRfZGlyZWN0b3J5OiBpbnB1dERpcixcbiAgICAgIG91dHB1dF9kaXJlY3Rvcnk6IG91dHB1dERpcixcbiAgICAgIGNvbnZlcnNpb246IGAke2Zyb21GbXR9IOKGkiAke3RvRm10fWAsXG4gICAgICBmaWxlc19mb3VuZDogZmlsZXMubGVuZ3RoLFxuICAgICAgc3VjY2Vzc2Z1bDogMCxcbiAgICAgIGZhaWxlZDogMCxcbiAgICAgIGNvbnZlcnRlZF9maWxlczogW10gYXMgc3RyaW5nW10sXG4gICAgICBlcnJvcnM6IFtdIGFzIHsgZmlsZTogc3RyaW5nOyBlcnJvcjogc3RyaW5nIH1bXSxcbiAgICB9O1xuICAgIFxuICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgY29uc3QgaW5wdXRQYXRoID0gcGF0aC5qb2luKGlucHV0RGlyLCBmaWxlKTtcbiAgICAgIGNvbnN0IGJhc2VOYW1lID0gcGF0aC5iYXNlbmFtZShmaWxlLCBgLiR7ZnJvbUZtdH1gKTtcbiAgICAgIGNvbnN0IG91dHB1dFBhdGggPSBwYXRoLmpvaW4ob3V0cHV0RGlyLCBgJHtiYXNlTmFtZX0uJHt0b0ZtdH1gKTtcbiAgICAgIFxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gRGV0ZXJtaW5lIGNvbnZlcnNpb24gZnVuY3Rpb25cbiAgICAgICAgbGV0IGNvbnZlcnNpb25SZXN1bHQ6IGFueTtcbiAgICAgICAgXG4gICAgICAgIGlmIChmcm9tRm10ID09PSAneGxzeCcgJiYgdG9GbXQgPT09ICdjc3YnKSB7XG4gICAgICAgICAgY29udmVyc2lvblJlc3VsdCA9IGF3YWl0IHhsc3hUb0Nzdih7IGZpbGVfcGF0aDogaW5wdXRQYXRoLCBvdXRwdXRfcGF0aDogb3V0cHV0UGF0aCB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChmcm9tRm10ID09PSAnY3N2JyAmJiB0b0ZtdCA9PT0gJ3hsc3gnKSB7XG4gICAgICAgICAgY29udmVyc2lvblJlc3VsdCA9IGF3YWl0IGNzdlRvWGxzeCh7IGZpbGVfcGF0aDogaW5wdXRQYXRoLCBvdXRwdXRfcGF0aDogb3V0cHV0UGF0aCB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChmcm9tRm10ID09PSAnZG9jeCcgJiYgdG9GbXQgPT09ICdtZCcpIHtcbiAgICAgICAgICBjb252ZXJzaW9uUmVzdWx0ID0gYXdhaXQgZG9jeFRvTWQoeyBmaWxlX3BhdGg6IGlucHV0UGF0aCwgb3V0cHV0X3BhdGg6IG91dHB1dFBhdGggfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZnJvbUZtdCA9PT0gJ21kJyAmJiB0b0ZtdCA9PT0gJ2RvY3gnKSB7XG4gICAgICAgICAgY29udmVyc2lvblJlc3VsdCA9IGF3YWl0IG1kVG9Eb2N4KHsgbWFya2Rvd25fZmlsZTogaW5wdXRQYXRoLCBvdXRwdXRfcGF0aDogb3V0cHV0UGF0aCB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvbnZlcnNpb24gJHtmcm9tRm10fSDihpIgJHt0b0ZtdH0gbm90IHN1cHBvcnRlZCBpbiBiYXRjaCBtb2RlYCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgY29udmVyc2lvblJlc3VsdCA9PT0gJ3N0cmluZycgJiYgY29udmVyc2lvblJlc3VsdC5zdGFydHNXaXRoKCdTdWNjZXNzZnVsbHknKSkge1xuICAgICAgICAgIHJlc3VsdHMuc3VjY2Vzc2Z1bCsrO1xuICAgICAgICAgIHJlc3VsdHMuY29udmVydGVkX2ZpbGVzLnB1c2goZmlsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0cy5mYWlsZWQrKztcbiAgICAgICAgICByZXN1bHRzLmVycm9ycy5wdXNoKHsgZmlsZSwgZXJyb3I6IFN0cmluZyhjb252ZXJzaW9uUmVzdWx0KSB9KTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgICAgIHJlc3VsdHMuZmFpbGVkKys7XG4gICAgICAgIHJlc3VsdHMuZXJyb3JzLnB1c2goeyBmaWxlLCBlcnJvcjogZS5tZXNzYWdlIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIGVycm9yOiBgQmF0Y2ggY29udmVyc2lvbiBmYWlsZWQ6ICR7ZXJyb3IubWVzc2FnZX1gLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==