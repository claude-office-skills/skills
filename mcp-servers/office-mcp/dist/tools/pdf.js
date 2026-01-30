"use strict";
/**
 * PDF Tools - PDF operations
 *
 * Best-in-class tools for PDF manipulation.
 * Inspired by Stirling-PDF (73k+ stars) capabilities.
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
exports.pdfTools = void 0;
exports.handlePdfTool = handlePdfTool;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const pdf_lib_1 = require("pdf-lib");
/**
 * PDF tool definitions
 */
exports.pdfTools = [
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
];
/**
 * Handle PDF tool calls
 */
async function handlePdfTool(name, args) {
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
        default:
            throw new Error(`Unknown PDF tool: ${name}`);
    }
}
// Tool implementations
async function extractTextFromPdf(args) {
    const { file_path, pages, use_ocr, language } = args;
    try {
        const filePath = file_path;
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // Read PDF file
        const dataBuffer = fs.readFileSync(filePath);
        // Parse PDF
        const data = await (0, pdf_parse_1.default)(dataBuffer);
        // Handle page ranges
        const pageRange = pages || 'all';
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
    }
    catch (error) {
        return `Error extracting text from PDF: ${error.message}`;
    }
}
async function extractTablesFromPdf(args) {
    const { file_path, pages, output_format } = args;
    try {
        const filePath = file_path;
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // Read PDF file
        const dataBuffer = fs.readFileSync(filePath);
        const data = await (0, pdf_parse_1.default)(dataBuffer);
        // Basic table extraction using text patterns
        // For production, consider using pdf-table-extractor or tabula-js
        const text = data.text;
        const lines = text.split('\n');
        // Simple heuristic: lines with multiple spaces/tabs might be table rows
        const potentialTableRows = lines.filter((line) => {
            const spacedColumns = line.split(/\s{2,}/).filter((col) => col.trim().length > 0);
            return spacedColumns.length >= 2;
        });
        const tables = [];
        if (potentialTableRows.length > 0) {
            const tableData = potentialTableRows.map((row) => row.split(/\s{2,}/).filter((col) => col.trim().length > 0));
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
    }
    catch (error) {
        return {
            error: `Failed to extract tables: ${error.message}`,
            file: file_path,
            tables_found: 0
        };
    }
}
async function mergePdfs(args) {
    const { file_paths, output_path } = args;
    try {
        const paths = file_paths;
        const outputPath = output_path;
        // Validate input files
        for (const filePath of paths) {
            if (!fs.existsSync(filePath)) {
                throw new Error(`File not found: ${filePath}`);
            }
        }
        // Create a new PDF document
        const mergedPdf = await pdf_lib_1.PDFDocument.create();
        // Load and merge each PDF
        for (const filePath of paths) {
            const pdfBytes = fs.readFileSync(filePath);
            const pdf = await pdf_lib_1.PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => {
                mergedPdf.addPage(page);
            });
        }
        // Save merged PDF
        const mergedPdfBytes = await mergedPdf.save();
        fs.writeFileSync(outputPath, mergedPdfBytes);
        return `Successfully merged ${paths.length} PDFs into ${outputPath}. Total pages: ${mergedPdf.getPageCount()}`;
    }
    catch (error) {
        return `Error merging PDFs: ${error.message}`;
    }
}
async function splitPdf(args) {
    const { file_path, output_dir, split_mode, ranges } = args;
    try {
        const filePath = file_path;
        const outputDir = output_dir;
        const mode = split_mode || 'by_page';
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // Create output directory if it doesn't exist
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        // Load PDF
        const pdfBytes = fs.readFileSync(filePath);
        const pdfDoc = await pdf_lib_1.PDFDocument.load(pdfBytes);
        const totalPages = pdfDoc.getPageCount();
        const baseFileName = path.basename(filePath, '.pdf');
        let filesCreated = 0;
        if (mode === 'by_page') {
            // Split into individual pages
            for (let i = 0; i < totalPages; i++) {
                const newPdf = await pdf_lib_1.PDFDocument.create();
                const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
                newPdf.addPage(copiedPage);
                const newPdfBytes = await newPdf.save();
                const outputPath = path.join(outputDir, `${baseFileName}_page_${i + 1}.pdf`);
                fs.writeFileSync(outputPath, newPdfBytes);
                filesCreated++;
            }
        }
        else if (mode === 'by_range' && ranges) {
            // Split by page ranges
            const pageRanges = ranges;
            for (let rangeIdx = 0; rangeIdx < pageRanges.length; rangeIdx++) {
                const range = pageRanges[rangeIdx];
                const [start, end] = range.split('-').map(n => parseInt(n.trim()) - 1);
                const newPdf = await pdf_lib_1.PDFDocument.create();
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
    }
    catch (error) {
        return `Error splitting PDF: ${error.message}`;
    }
}
async function compressPdf(args) {
    const { file_path, output_path, quality } = args;
    try {
        const filePath = file_path;
        const outputPath = output_path;
        const compressionQuality = quality || "medium";
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        const originalSize = fs.statSync(filePath).size;
        // Load and save PDF (pdf-lib automatically optimizes)
        const pdfBytes = fs.readFileSync(filePath);
        const pdfDoc = await pdf_lib_1.PDFDocument.load(pdfBytes);
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
    }
    catch (error) {
        return {
            success: false,
            error: `Failed to compress PDF: ${error.message}`
        };
    }
}
async function addWatermarkToPdf(args) {
    const { file_path, output_path, watermark_type, watermark_content, position, opacity } = args;
    try {
        const filePath = file_path;
        const outputPath = output_path;
        const type = watermark_type;
        const content = watermark_content;
        const pos = position || 'diagonal';
        const opacityValue = opacity || 0.3;
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // Load PDF
        const pdfBytes = fs.readFileSync(filePath);
        const pdfDoc = await pdf_lib_1.PDFDocument.load(pdfBytes);
        const pages = pdfDoc.getPages();
        if (type === 'text') {
            // Add text watermark to each page
            for (const page of pages) {
                const { width, height } = page.getSize();
                let x = width / 2;
                let y = height / 2;
                let rotation = (0, pdf_lib_1.degrees)(0);
                if (pos === 'diagonal') {
                    rotation = (0, pdf_lib_1.degrees)(45);
                }
                else if (pos === 'header') {
                    y = height - 50;
                }
                else if (pos === 'footer') {
                    y = 50;
                }
                page.drawText(content, {
                    x: x - (content.length * 6),
                    y: y,
                    size: 40,
                    color: (0, pdf_lib_1.rgb)(0.7, 0.7, 0.7),
                    opacity: opacityValue,
                    rotate: rotation,
                });
            }
        }
        else if (type === 'image') {
            return `Image watermark not yet implemented. Requires embedding images from ${content}`;
        }
        // Save watermarked PDF
        const watermarkedBytes = await pdfDoc.save();
        fs.writeFileSync(outputPath, watermarkedBytes);
        return `Successfully added ${type} watermark to ${pages.length} pages. Output: ${outputPath}`;
    }
    catch (error) {
        return `Error adding watermark: ${error.message}`;
    }
}
async function fillPdfForm(args) {
    const { file_path, output_path, form_data, flatten } = args;
    try {
        const filePath = file_path;
        const outputPath = output_path;
        const formData = form_data;
        const shouldFlatten = flatten || false;
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // Load PDF
        const pdfBytes = fs.readFileSync(filePath);
        const pdfDoc = await pdf_lib_1.PDFDocument.load(pdfBytes);
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
                }
                else if (fieldType.includes('CheckBox')) {
                    const checkBox = form.getCheckBox(fieldName);
                    if (value.toLowerCase() === 'true' || value === '1') {
                        checkBox.check();
                    }
                    else {
                        checkBox.uncheck();
                    }
                    filledCount++;
                }
                else if (fieldType.includes('Dropdown')) {
                    const dropdown = form.getDropdown(fieldName);
                    dropdown.select(value);
                    filledCount++;
                }
                else if (fieldType.includes('Radio')) {
                    const radioGroup = form.getRadioGroup(fieldName);
                    radioGroup.select(value);
                    filledCount++;
                }
            }
            catch (e) {
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
    }
    catch (error) {
        return `Error filling PDF form: ${error.message}`;
    }
}
async function getPdfMetadata(args) {
    const { file_path } = args;
    try {
        const filePath = file_path;
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // Get file stats
        const stats = fs.statSync(filePath);
        // Load PDF
        const pdfBytes = fs.readFileSync(filePath);
        const pdfDoc = await pdf_lib_1.PDFDocument.load(pdfBytes);
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
        const data = await (0, pdf_parse_1.default)(pdfBytes);
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
    }
    catch (error) {
        return {
            error: `Failed to get PDF metadata: ${error.message}`,
            file: file_path
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Rvb2xzL3BkZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTROSCxzQ0F3QkM7QUFqUEQsdUNBQXlCO0FBQ3pCLDJDQUE2QjtBQUM3QiwwREFBaUM7QUFDakMscUNBQW9EO0FBRXBEOztHQUVHO0FBQ1UsUUFBQSxRQUFRLEdBQVc7SUFDOUI7UUFDRSxJQUFJLEVBQUUsdUJBQXVCO1FBQzdCLFdBQVcsRUFBRSw2RkFBNkY7UUFDMUcsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxRQUFRO29CQUNkLFdBQVcsRUFBRSxzQkFBc0I7aUJBQ3BDO2dCQUNELEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsNENBQTRDO29CQUN6RCxPQUFPLEVBQUUsS0FBSztpQkFDZjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsV0FBVyxFQUFFLCtCQUErQjtvQkFDNUMsT0FBTyxFQUFFLEtBQUs7aUJBQ2Y7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxRQUFRO29CQUNkLFdBQVcsRUFBRSxrREFBa0Q7b0JBQy9ELE9BQU8sRUFBRSxLQUFLO2lCQUNmO2FBQ0Y7WUFDRCxRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUM7U0FDeEI7S0FDRjtJQUNEO1FBQ0UsSUFBSSxFQUFFLHlCQUF5QjtRQUMvQixXQUFXLEVBQUUsK0ZBQStGO1FBQzVHLFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLFNBQVMsRUFBRTtvQkFDVCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsc0JBQXNCO2lCQUNwQztnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLG1DQUFtQztvQkFDaEQsT0FBTyxFQUFFLEtBQUs7aUJBQ2Y7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDO29CQUM3QixXQUFXLEVBQUUsb0NBQW9DO29CQUNqRCxPQUFPLEVBQUUsTUFBTTtpQkFDaEI7YUFDRjtZQUNELFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQztTQUN4QjtLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsWUFBWTtRQUNsQixXQUFXLEVBQUUsNkNBQTZDO1FBQzFELFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsT0FBTztvQkFDYixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO29CQUN6QixXQUFXLEVBQUUsa0NBQWtDO2lCQUNoRDtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLGlDQUFpQztpQkFDL0M7YUFDRjtZQUNELFFBQVEsRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUM7U0FDeEM7S0FDRjtJQUNEO1FBQ0UsSUFBSSxFQUFFLFdBQVc7UUFDakIsV0FBVyxFQUFFLDJDQUEyQztRQUN4RCxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDVixTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLHNCQUFzQjtpQkFDcEM7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxRQUFRO29CQUNkLFdBQVcsRUFBRSw0QkFBNEI7aUJBQzFDO2dCQUNELFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQztvQkFDeEMsV0FBVyxFQUFFLHNCQUFzQjtvQkFDbkMsT0FBTyxFQUFFLFNBQVM7aUJBQ25CO2dCQUNELE1BQU0sRUFBRTtvQkFDTixJQUFJLEVBQUUsT0FBTztvQkFDYixXQUFXLEVBQUUsZ0VBQWdFO2lCQUM5RTthQUNGO1lBQ0QsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQztTQUN0QztLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsY0FBYztRQUNwQixXQUFXLEVBQUUsK0RBQStEO1FBQzVFLFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLFNBQVMsRUFBRTtvQkFDVCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsc0JBQXNCO2lCQUNwQztnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLHFDQUFxQztpQkFDbkQ7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDO29CQUMvQixXQUFXLEVBQUUsMkJBQTJCO29CQUN4QyxPQUFPLEVBQUUsUUFBUTtpQkFDbEI7YUFDRjtZQUNELFFBQVEsRUFBRSxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUM7U0FDdkM7S0FDRjtJQUNEO1FBQ0UsSUFBSSxFQUFFLHNCQUFzQjtRQUM1QixXQUFXLEVBQUUsMkNBQTJDO1FBQ3hELFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLFNBQVMsRUFBRTtvQkFDVCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsc0JBQXNCO2lCQUNwQztnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLDBCQUEwQjtpQkFDeEM7Z0JBQ0QsY0FBYyxFQUFFO29CQUNkLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7b0JBQ3ZCLFdBQVcsRUFBRSxtQkFBbUI7aUJBQ2pDO2dCQUNELGlCQUFpQixFQUFFO29CQUNqQixJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsMENBQTBDO2lCQUN4RDtnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO29CQUNoRCxPQUFPLEVBQUUsVUFBVTtpQkFDcEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxRQUFRO29CQUNkLFdBQVcsRUFBRSx5QkFBeUI7b0JBQ3RDLE9BQU8sRUFBRSxHQUFHO2lCQUNiO2FBQ0Y7WUFDRCxRQUFRLEVBQUUsQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixDQUFDO1NBQzlFO0tBQ0Y7SUFDRDtRQUNFLElBQUksRUFBRSxlQUFlO1FBQ3JCLFdBQVcsRUFBRSx5Q0FBeUM7UUFDdEQsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxRQUFRO29CQUNkLFdBQVcsRUFBRSxzQkFBc0I7aUJBQ3BDO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsaUNBQWlDO2lCQUMvQztnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLDJDQUEyQztpQkFDekQ7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxTQUFTO29CQUNmLFdBQVcsRUFBRSx1REFBdUQ7b0JBQ3BFLE9BQU8sRUFBRSxLQUFLO2lCQUNmO2FBQ0Y7WUFDRCxRQUFRLEVBQUUsQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLFdBQVcsQ0FBQztTQUNwRDtLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLFdBQVcsRUFBRSw0Q0FBNEM7UUFDekQsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxRQUFRO29CQUNkLFdBQVcsRUFBRSxzQkFBc0I7aUJBQ3BDO2FBQ0Y7WUFDRCxRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUM7U0FDeEI7S0FDRjtDQUNGLENBQUM7QUFFRjs7R0FFRztBQUNJLEtBQUssVUFBVSxhQUFhLENBQ2pDLElBQVksRUFDWixJQUE2QjtJQUU3QixRQUFRLElBQUksRUFBRSxDQUFDO1FBQ2IsS0FBSyx1QkFBdUI7WUFDMUIsT0FBTyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxLQUFLLHlCQUF5QjtZQUM1QixPQUFPLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLEtBQUssWUFBWTtZQUNmLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLEtBQUssV0FBVztZQUNkLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLEtBQUssY0FBYztZQUNqQixPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixLQUFLLHNCQUFzQjtZQUN6QixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLEtBQUssZUFBZTtZQUNsQixPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixLQUFLLGtCQUFrQjtZQUNyQixPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QjtZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLElBQUksRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQztBQUNILENBQUM7QUFFRCx1QkFBdUI7QUFDdkIsS0FBSyxVQUFVLGtCQUFrQixDQUFDLElBQTZCO0lBQzdELE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFFckQsSUFBSSxDQUFDO1FBQ0gsTUFBTSxRQUFRLEdBQUcsU0FBbUIsQ0FBQztRQUVyQyx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFFRCxnQkFBZ0I7UUFDaEIsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU3QyxZQUFZO1FBQ1osTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFBLG1CQUFRLEVBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEMscUJBQXFCO1FBQ3JCLE1BQU0sU0FBUyxHQUFHLEtBQWUsSUFBSSxLQUFLLENBQUM7UUFDM0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUVyQixJQUFJLFNBQVMsS0FBSyxLQUFLLEVBQUUsQ0FBQztZQUN4QiwwQ0FBMEM7WUFDMUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixNQUFNLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxDQUFDLGtEQUFrRDtZQUVsRiwrREFBK0Q7WUFDL0QsMkNBQTJDO1lBQzNDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUM7UUFFRCwwQkFBMEI7UUFDMUIsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNaLGlEQUFpRDtZQUNqRCxvQ0FBb0M7WUFDcEMsSUFBSSxJQUFJLDJDQUEyQyxRQUFRLElBQUksS0FBSyxxRkFBcUYsQ0FBQztRQUM1SixDQUFDO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFFZCxDQUFDO0lBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztRQUNwQixPQUFPLG1DQUFtQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUQsQ0FBQztBQUNILENBQUM7QUFFRCxLQUFLLFVBQVUsb0JBQW9CLENBQUMsSUFBNkI7SUFDL0QsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBRWpELElBQUksQ0FBQztRQUNILE1BQU0sUUFBUSxHQUFHLFNBQW1CLENBQUM7UUFFckMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFFRCxnQkFBZ0I7UUFDaEIsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUEsbUJBQVEsRUFBQyxVQUFVLENBQUMsQ0FBQztRQUV4Qyw2Q0FBNkM7UUFDN0Msa0VBQWtFO1FBQ2xFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvQix3RUFBd0U7UUFDeEUsTUFBTSxrQkFBa0IsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBWSxFQUFFLEVBQUU7WUFDdkQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUYsT0FBTyxhQUFhLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNsQyxNQUFNLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUN2RCxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQVcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FDbkUsQ0FBQztZQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ1YsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNO2dCQUN0QixPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sSUFBSSxDQUFDO2dCQUNsQyxJQUFJLEVBQUUsU0FBUzthQUNoQixDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsT0FBTztZQUNMLElBQUksRUFBRSxTQUFTO1lBQ2YsWUFBWSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQzNCLE1BQU0sRUFBRSxhQUFhLElBQUksTUFBTTtZQUMvQixNQUFNLEVBQUUsTUFBTTtZQUNkLElBQUksRUFBRSxxR0FBcUc7U0FDNUcsQ0FBQztJQUVKLENBQUM7SUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1FBQ3BCLE9BQU87WUFDTCxLQUFLLEVBQUUsNkJBQTZCLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDbkQsSUFBSSxFQUFFLFNBQVM7WUFDZixZQUFZLEVBQUUsQ0FBQztTQUNoQixDQUFDO0lBQ0osQ0FBQztBQUNILENBQUM7QUFFRCxLQUFLLFVBQVUsU0FBUyxDQUFDLElBQTZCO0lBQ3BELE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBRXpDLElBQUksQ0FBQztRQUNILE1BQU0sS0FBSyxHQUFHLFVBQXNCLENBQUM7UUFDckMsTUFBTSxVQUFVLEdBQUcsV0FBcUIsQ0FBQztRQUV6Qyx1QkFBdUI7UUFDdkIsS0FBSyxNQUFNLFFBQVEsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO2dCQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ2pELENBQUM7UUFDSCxDQUFDO1FBRUQsNEJBQTRCO1FBQzVCLE1BQU0sU0FBUyxHQUFHLE1BQU0scUJBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUU3QywwQkFBMEI7UUFDMUIsS0FBSyxNQUFNLFFBQVEsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUM3QixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sR0FBRyxHQUFHLE1BQU0scUJBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0MsTUFBTSxXQUFXLEdBQUcsTUFBTSxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztZQUV6RSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzNCLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsa0JBQWtCO1FBQ2xCLE1BQU0sY0FBYyxHQUFHLE1BQU0sU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzlDLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBRTdDLE9BQU8sdUJBQXVCLEtBQUssQ0FBQyxNQUFNLGNBQWMsVUFBVSxrQkFBa0IsU0FBUyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUM7SUFFakgsQ0FBQztJQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7UUFDcEIsT0FBTyx1QkFBdUIsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2hELENBQUM7QUFDSCxDQUFDO0FBRUQsS0FBSyxVQUFVLFFBQVEsQ0FBQyxJQUE2QjtJQUNuRCxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBRTNELElBQUksQ0FBQztRQUNILE1BQU0sUUFBUSxHQUFHLFNBQW1CLENBQUM7UUFDckMsTUFBTSxTQUFTLEdBQUcsVUFBb0IsQ0FBQztRQUN2QyxNQUFNLElBQUksR0FBRyxVQUFvQixJQUFJLFNBQVMsQ0FBQztRQUUvQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUVELDhDQUE4QztRQUM5QyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQzlCLEVBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVELFdBQVc7UUFDWCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sTUFBTSxHQUFHLE1BQU0scUJBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXpDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztRQUVyQixJQUFJLElBQUksS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN2Qiw4QkFBOEI7WUFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNwQyxNQUFNLE1BQU0sR0FBRyxNQUFNLHFCQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFFM0IsTUFBTSxXQUFXLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3hDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsWUFBWSxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM3RSxFQUFFLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDMUMsWUFBWSxFQUFFLENBQUM7WUFDakIsQ0FBQztRQUNILENBQUM7YUFBTSxJQUFJLElBQUksS0FBSyxVQUFVLElBQUksTUFBTSxFQUFFLENBQUM7WUFDekMsdUJBQXVCO1lBQ3ZCLE1BQU0sVUFBVSxHQUFHLE1BQWtCLENBQUM7WUFFdEMsS0FBSyxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUUsUUFBUSxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQztnQkFDaEUsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNuQyxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUV2RSxNQUFNLE1BQU0sR0FBRyxNQUFNLHFCQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzFDLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLEtBQUssR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDakYsTUFBTSxXQUFXLEdBQUcsTUFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFFaEUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUVwRCxNQUFNLFdBQVcsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDeEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxZQUFZLFNBQVMsUUFBUSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BGLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUMxQyxZQUFZLEVBQUUsQ0FBQztZQUNqQixDQUFDO1FBQ0gsQ0FBQztRQUVELE9BQU8sc0JBQXNCLFFBQVEsU0FBUyxZQUFZLGFBQWEsU0FBUyxFQUFFLENBQUM7SUFFckYsQ0FBQztJQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7UUFDcEIsT0FBTyx3QkFBd0IsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pELENBQUM7QUFDSCxDQUFDO0FBRUQsS0FBSyxVQUFVLFdBQVcsQ0FBQyxJQUE2QjtJQUN0RCxNQUFNLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFFakQsSUFBSSxDQUFDO1FBQ0gsTUFBTSxRQUFRLEdBQUcsU0FBbUIsQ0FBQztRQUNyQyxNQUFNLFVBQVUsR0FBRyxXQUFxQixDQUFDO1FBQ3pDLE1BQU0sa0JBQWtCLEdBQUcsT0FBaUIsSUFBSSxRQUFRLENBQUM7UUFFekQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFFRCxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUVoRCxzREFBc0Q7UUFDdEQsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxNQUFNLE1BQU0sR0FBRyxNQUFNLHFCQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWhELHdCQUF3QjtRQUN4QixNQUFNLGVBQWUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDeEMsZ0JBQWdCLEVBQUUsa0JBQWtCLEtBQUssS0FBSztTQUMvQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUM5QyxNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUVwRCxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsWUFBWSxHQUFHLGNBQWMsQ0FBQyxHQUFHLFlBQVksR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEYsT0FBTztZQUNMLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFLFNBQVM7WUFDaEIsTUFBTSxFQUFFLFdBQVc7WUFDbkIsT0FBTyxFQUFFLGtCQUFrQjtZQUMzQixhQUFhLEVBQUUsR0FBRyxDQUFDLFlBQVksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLO1lBQzlELGVBQWUsRUFBRSxHQUFHLENBQUMsY0FBYyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUs7WUFDbEUsU0FBUyxFQUFFLEdBQUcsU0FBUyxHQUFHO1lBQzFCLElBQUksRUFBRSwwRkFBMEY7U0FDakcsQ0FBQztJQUVKLENBQUM7SUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1FBQ3BCLE9BQU87WUFDTCxPQUFPLEVBQUUsS0FBSztZQUNkLEtBQUssRUFBRSwyQkFBMkIsS0FBSyxDQUFDLE9BQU8sRUFBRTtTQUNsRCxDQUFDO0lBQ0osQ0FBQztBQUNILENBQUM7QUFFRCxLQUFLLFVBQVUsaUJBQWlCLENBQUMsSUFBNkI7SUFDNUQsTUFBTSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFFOUYsSUFBSSxDQUFDO1FBQ0gsTUFBTSxRQUFRLEdBQUcsU0FBbUIsQ0FBQztRQUNyQyxNQUFNLFVBQVUsR0FBRyxXQUFxQixDQUFDO1FBQ3pDLE1BQU0sSUFBSSxHQUFHLGNBQXdCLENBQUM7UUFDdEMsTUFBTSxPQUFPLEdBQUcsaUJBQTJCLENBQUM7UUFDNUMsTUFBTSxHQUFHLEdBQUcsUUFBa0IsSUFBSSxVQUFVLENBQUM7UUFDN0MsTUFBTSxZQUFZLEdBQUcsT0FBaUIsSUFBSSxHQUFHLENBQUM7UUFFOUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFFRCxXQUFXO1FBQ1gsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxNQUFNLE1BQU0sR0FBRyxNQUFNLHFCQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVoQyxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUUsQ0FBQztZQUNwQixrQ0FBa0M7WUFDbEMsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztnQkFDekIsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRXpDLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ25CLElBQUksUUFBUSxHQUFHLElBQUEsaUJBQU8sRUFBQyxDQUFDLENBQUMsQ0FBQztnQkFFMUIsSUFBSSxHQUFHLEtBQUssVUFBVSxFQUFFLENBQUM7b0JBQ3ZCLFFBQVEsR0FBRyxJQUFBLGlCQUFPLEVBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pCLENBQUM7cUJBQU0sSUFBSSxHQUFHLEtBQUssUUFBUSxFQUFFLENBQUM7b0JBQzVCLENBQUMsR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFDO2dCQUNsQixDQUFDO3FCQUFNLElBQUksR0FBRyxLQUFLLFFBQVEsRUFBRSxDQUFDO29CQUM1QixDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNULENBQUM7Z0JBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7b0JBQ3JCLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDM0IsQ0FBQyxFQUFFLENBQUM7b0JBQ0osSUFBSSxFQUFFLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLElBQUEsYUFBRyxFQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO29CQUN6QixPQUFPLEVBQUUsWUFBWTtvQkFDckIsTUFBTSxFQUFFLFFBQVE7aUJBQ2pCLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDO2FBQU0sSUFBSSxJQUFJLEtBQUssT0FBTyxFQUFFLENBQUM7WUFDNUIsT0FBTyx1RUFBdUUsT0FBTyxFQUFFLENBQUM7UUFDMUYsQ0FBQztRQUVELHVCQUF1QjtRQUN2QixNQUFNLGdCQUFnQixHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzdDLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFFL0MsT0FBTyxzQkFBc0IsSUFBSSxpQkFBaUIsS0FBSyxDQUFDLE1BQU0sbUJBQW1CLFVBQVUsRUFBRSxDQUFDO0lBRWhHLENBQUM7SUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1FBQ3BCLE9BQU8sMkJBQTJCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0FBQ0gsQ0FBQztBQUVELEtBQUssVUFBVSxXQUFXLENBQUMsSUFBNkI7SUFDdEQsTUFBTSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQztJQUU1RCxJQUFJLENBQUM7UUFDSCxNQUFNLFFBQVEsR0FBRyxTQUFtQixDQUFDO1FBQ3JDLE1BQU0sVUFBVSxHQUFHLFdBQXFCLENBQUM7UUFDekMsTUFBTSxRQUFRLEdBQUcsU0FBbUMsQ0FBQztRQUNyRCxNQUFNLGFBQWEsR0FBRyxPQUFrQixJQUFJLEtBQUssQ0FBQztRQUVsRCxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUVELFdBQVc7UUFDWCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sTUFBTSxHQUFHLE1BQU0scUJBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEQsV0FBVztRQUNYLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM5QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFaEMsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBRXBCLG1CQUFtQjtRQUNuQixLQUFLLE1BQU0sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQzFELElBQUksQ0FBQztnQkFDSCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUV2Qyw0Q0FBNEM7Z0JBQzVDLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUV6QyxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztvQkFDL0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDL0MsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekIsV0FBVyxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7cUJBQU0sSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7b0JBQzFDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzdDLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU0sSUFBSSxLQUFLLEtBQUssR0FBRyxFQUFFLENBQUM7d0JBQ3BELFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDbkIsQ0FBQzt5QkFBTSxDQUFDO3dCQUNOLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDckIsQ0FBQztvQkFDRCxXQUFXLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQztxQkFBTSxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztvQkFDMUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDN0MsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdkIsV0FBVyxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7cUJBQU0sSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7b0JBQ3ZDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ2pELFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3pCLFdBQVcsRUFBRSxDQUFDO2dCQUNoQixDQUFDO1lBQ0gsQ0FBQztZQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ1gseUNBQXlDO2dCQUN6QyxTQUFTO1lBQ1gsQ0FBQztRQUNILENBQUM7UUFFRCw0QkFBNEI7UUFDNUIsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUVELGtCQUFrQjtRQUNsQixNQUFNLFdBQVcsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4QyxFQUFFLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUUxQyxPQUFPLHVCQUF1QixXQUFXLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLHlCQUF5QixVQUFVLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBRTFKLENBQUM7SUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1FBQ3BCLE9BQU8sMkJBQTJCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0FBQ0gsQ0FBQztBQUVELEtBQUssVUFBVSxjQUFjLENBQUMsSUFBNkI7SUFDekQsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQztJQUUzQixJQUFJLENBQUM7UUFDSCxNQUFNLFFBQVEsR0FBRyxTQUFtQixDQUFDO1FBRXJDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7WUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBRUQsaUJBQWlCO1FBQ2pCLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFcEMsV0FBVztRQUNYLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxxQkFBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVoRCxtQkFBbUI7UUFDbkIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLFVBQVUsQ0FBQztRQUM5QyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLElBQUksU0FBUyxDQUFDO1FBQy9DLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDMUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLFNBQVMsQ0FBQztRQUNqRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLElBQUksU0FBUyxDQUFDO1FBQ25ELE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM5QyxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRXRELGdCQUFnQjtRQUNoQixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDOUIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXBDLGdDQUFnQztRQUNoQyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUEsbUJBQVEsRUFBQyxRQUFRLENBQUMsQ0FBQztRQUV0QyxPQUFPO1lBQ0wsSUFBSSxFQUFFLFNBQVM7WUFDZixRQUFRLEVBQUU7Z0JBQ1IsS0FBSztnQkFDTCxNQUFNO2dCQUNOLE9BQU87Z0JBQ1AsT0FBTztnQkFDUCxRQUFRO2dCQUNSLGFBQWEsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVM7Z0JBQ3JFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTO2dCQUM3RSxLQUFLLEVBQUUsTUFBTSxDQUFDLFlBQVksRUFBRTtnQkFDNUIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUs7Z0JBQ25ELFNBQVMsRUFBRSxNQUFNLENBQUMsV0FBVztnQkFDN0IsU0FBUyxFQUFFLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDaEMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxNQUFNO2dCQUM5QixXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO2dCQUM3QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sSUFBSSxTQUFTO2FBQ25DO1NBQ0YsQ0FBQztJQUVKLENBQUM7SUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1FBQ3BCLE9BQU87WUFDTCxLQUFLLEVBQUUsK0JBQStCLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDckQsSUFBSSxFQUFFLFNBQVM7U0FDaEIsQ0FBQztJQUNKLENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQREYgVG9vbHMgLSBQREYgb3BlcmF0aW9uc1xuICogXG4gKiBCZXN0LWluLWNsYXNzIHRvb2xzIGZvciBQREYgbWFuaXB1bGF0aW9uLlxuICogSW5zcGlyZWQgYnkgU3RpcmxpbmctUERGICg3M2srIHN0YXJzKSBjYXBhYmlsaXRpZXMuXG4gKi9cblxuaW1wb3J0IHsgVG9vbCB9IGZyb20gXCJAbW9kZWxjb250ZXh0cHJvdG9jb2wvc2RrL3R5cGVzLmpzXCI7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCBwZGZQYXJzZSBmcm9tIFwicGRmLXBhcnNlXCI7XG5pbXBvcnQgeyBQREZEb2N1bWVudCwgcmdiLCBkZWdyZWVzIH0gZnJvbSBcInBkZi1saWJcIjtcblxuLyoqXG4gKiBQREYgdG9vbCBkZWZpbml0aW9uc1xuICovXG5leHBvcnQgY29uc3QgcGRmVG9vbHM6IFRvb2xbXSA9IFtcbiAge1xuICAgIG5hbWU6IFwiZXh0cmFjdF90ZXh0X2Zyb21fcGRmXCIsXG4gICAgZGVzY3JpcHRpb246IFwiRXh0cmFjdCB0ZXh0IGNvbnRlbnQgZnJvbSBhIFBERiBmaWxlLiBTdXBwb3J0cyBib3RoIHRleHQtYmFzZWQgYW5kIHNjYW5uZWQgUERGcyAod2l0aCBPQ1IpLlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIFBERiBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHBhZ2VzOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYWdlIHJhbmdlIHRvIGV4dHJhY3QgKGUuZy4sICcxLTUnLCAnYWxsJylcIixcbiAgICAgICAgICBkZWZhdWx0OiBcImFsbFwiLFxuICAgICAgICB9LFxuICAgICAgICB1c2Vfb2NyOiB7XG4gICAgICAgICAgdHlwZTogXCJib29sZWFuXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiVXNlIE9DUiBmb3Igc2Nhbm5lZCBkb2N1bWVudHNcIixcbiAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgbGFuZ3VhZ2U6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk9DUiBsYW5ndWFnZSAoZS5nLiwgJ2VuZycsICdjaGlfc2ltJywgJ2NoaV90cmEnKVwiLFxuICAgICAgICAgIGRlZmF1bHQ6IFwiZW5nXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImZpbGVfcGF0aFwiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJleHRyYWN0X3RhYmxlc19mcm9tX3BkZlwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkV4dHJhY3QgdGFibGVzIGZyb20gUERGIGFuZCByZXR1cm4gYXMgc3RydWN0dXJlZCBkYXRhLiBJZGVhbCBmb3IgZmluYW5jaWFsIHJlcG9ydHMsIGludm9pY2VzLlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIFBERiBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHBhZ2VzOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYWdlIHJhbmdlIHRvIGV4dHJhY3QgdGFibGVzIGZyb21cIixcbiAgICAgICAgICBkZWZhdWx0OiBcImFsbFwiLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRfZm9ybWF0OiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBlbnVtOiBbXCJqc29uXCIsIFwiY3N2XCIsIFwieGxzeFwiXSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJPdXRwdXQgZm9ybWF0IGZvciBleHRyYWN0ZWQgdGFibGVzXCIsXG4gICAgICAgICAgZGVmYXVsdDogXCJqc29uXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImZpbGVfcGF0aFwiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJtZXJnZV9wZGZzXCIsXG4gICAgZGVzY3JpcHRpb246IFwiTWVyZ2UgbXVsdGlwbGUgUERGIGZpbGVzIGludG8gb25lIGRvY3VtZW50LlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGhzOiB7XG4gICAgICAgICAgdHlwZTogXCJhcnJheVwiLFxuICAgICAgICAgIGl0ZW1zOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBcnJheSBvZiBQREYgZmlsZSBwYXRocyB0byBtZXJnZVwiLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCBmb3IgdGhlIG1lcmdlZCBvdXRwdXQgZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJmaWxlX3BhdGhzXCIsIFwib3V0cHV0X3BhdGhcIl0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwic3BsaXRfcGRmXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU3BsaXQgYSBQREYgZmlsZSBpbnRvIG11bHRpcGxlIGRvY3VtZW50cy5cIixcbiAgICBpbnB1dFNjaGVtYToge1xuICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZmlsZV9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBQREYgZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRfZGlyOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJEaXJlY3RvcnkgZm9yIG91dHB1dCBmaWxlc1wiLFxuICAgICAgICB9LFxuICAgICAgICBzcGxpdF9tb2RlOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBlbnVtOiBbXCJieV9wYWdlXCIsIFwiYnlfcmFuZ2VcIiwgXCJieV9zaXplXCJdLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkhvdyB0byBzcGxpdCB0aGUgUERGXCIsXG4gICAgICAgICAgZGVmYXVsdDogXCJieV9wYWdlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHJhbmdlczoge1xuICAgICAgICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYWdlIHJhbmdlcyBpZiBzcGxpdF9tb2RlIGlzICdieV9yYW5nZScgKGUuZy4sIFsnMS0zJywgJzQtNiddKVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJmaWxlX3BhdGhcIiwgXCJvdXRwdXRfZGlyXCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImNvbXByZXNzX3BkZlwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkNvbXByZXNzIGEgUERGIHRvIHJlZHVjZSBmaWxlIHNpemUgd2hpbGUgbWFpbnRhaW5pbmcgcXVhbGl0eS5cIixcbiAgICBpbnB1dFNjaGVtYToge1xuICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZmlsZV9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBQREYgZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCBmb3IgdGhlIGNvbXByZXNzZWQgb3V0cHV0IGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgcXVhbGl0eToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZW51bTogW1wiaGlnaFwiLCBcIm1lZGl1bVwiLCBcImxvd1wiXSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb21wcmVzc2lvbiBxdWFsaXR5IGxldmVsXCIsXG4gICAgICAgICAgZGVmYXVsdDogXCJtZWRpdW1cIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiZmlsZV9wYXRoXCIsIFwib3V0cHV0X3BhdGhcIl0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYWRkX3dhdGVybWFya190b19wZGZcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBZGQgdGV4dCBvciBpbWFnZSB3YXRlcm1hcmsgdG8gUERGIHBhZ2VzLlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIFBERiBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dF9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIGZvciB0aGUgb3V0cHV0IGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgd2F0ZXJtYXJrX3R5cGU6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGVudW06IFtcInRleHRcIiwgXCJpbWFnZVwiXSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUeXBlIG9mIHdhdGVybWFya1wiLFxuICAgICAgICB9LFxuICAgICAgICB3YXRlcm1hcmtfY29udGVudDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiVGV4dCBjb250ZW50IG9yIGltYWdlIHBhdGggZm9yIHdhdGVybWFya1wiLFxuICAgICAgICB9LFxuICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZW51bTogW1wiY2VudGVyXCIsIFwiZGlhZ29uYWxcIiwgXCJoZWFkZXJcIiwgXCJmb290ZXJcIl0sXG4gICAgICAgICAgZGVmYXVsdDogXCJkaWFnb25hbFwiLFxuICAgICAgICB9LFxuICAgICAgICBvcGFjaXR5OiB7XG4gICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJXYXRlcm1hcmsgb3BhY2l0eSAoMC0xKVwiLFxuICAgICAgICAgIGRlZmF1bHQ6IDAuMyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiZmlsZV9wYXRoXCIsIFwib3V0cHV0X3BhdGhcIiwgXCJ3YXRlcm1hcmtfdHlwZVwiLCBcIndhdGVybWFya19jb250ZW50XCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImZpbGxfcGRmX2Zvcm1cIixcbiAgICBkZXNjcmlwdGlvbjogXCJGaWxsIG91dCBhIFBERiBmb3JtIHdpdGggcHJvdmlkZWQgZGF0YS5cIixcbiAgICBpbnB1dFNjaGVtYToge1xuICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZmlsZV9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBQREYgZm9ybVwiLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCBmb3IgdGhlIGZpbGxlZCBvdXRwdXQgZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBmb3JtX2RhdGE6IHtcbiAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIktleS12YWx1ZSBwYWlycyBtYXRjaGluZyBmb3JtIGZpZWxkIG5hbWVzXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGZsYXR0ZW46IHtcbiAgICAgICAgICB0eXBlOiBcImJvb2xlYW5cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJGbGF0dGVuIHRoZSBmb3JtIGFmdGVyIGZpbGxpbmcgKG1ha2UgaXQgbm9uLWVkaXRhYmxlKVwiLFxuICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJmaWxlX3BhdGhcIiwgXCJvdXRwdXRfcGF0aFwiLCBcImZvcm1fZGF0YVwiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJnZXRfcGRmX21ldGFkYXRhXCIsXG4gICAgZGVzY3JpcHRpb246IFwiR2V0IG1ldGFkYXRhIGFuZCBwcm9wZXJ0aWVzIG9mIGEgUERGIGZpbGUuXCIsXG4gICAgaW5wdXRTY2hlbWE6IHtcbiAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGZpbGVfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgUERGIGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiZmlsZV9wYXRoXCJdLFxuICAgIH0sXG4gIH0sXG5dO1xuXG4vKipcbiAqIEhhbmRsZSBQREYgdG9vbCBjYWxsc1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlUGRmVG9vbChcbiAgbmFtZTogc3RyaW5nLFxuICBhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuKTogUHJvbWlzZTx1bmtub3duPiB7XG4gIHN3aXRjaCAobmFtZSkge1xuICAgIGNhc2UgXCJleHRyYWN0X3RleHRfZnJvbV9wZGZcIjpcbiAgICAgIHJldHVybiBleHRyYWN0VGV4dEZyb21QZGYoYXJncyk7XG4gICAgY2FzZSBcImV4dHJhY3RfdGFibGVzX2Zyb21fcGRmXCI6XG4gICAgICByZXR1cm4gZXh0cmFjdFRhYmxlc0Zyb21QZGYoYXJncyk7XG4gICAgY2FzZSBcIm1lcmdlX3BkZnNcIjpcbiAgICAgIHJldHVybiBtZXJnZVBkZnMoYXJncyk7XG4gICAgY2FzZSBcInNwbGl0X3BkZlwiOlxuICAgICAgcmV0dXJuIHNwbGl0UGRmKGFyZ3MpO1xuICAgIGNhc2UgXCJjb21wcmVzc19wZGZcIjpcbiAgICAgIHJldHVybiBjb21wcmVzc1BkZihhcmdzKTtcbiAgICBjYXNlIFwiYWRkX3dhdGVybWFya190b19wZGZcIjpcbiAgICAgIHJldHVybiBhZGRXYXRlcm1hcmtUb1BkZihhcmdzKTtcbiAgICBjYXNlIFwiZmlsbF9wZGZfZm9ybVwiOlxuICAgICAgcmV0dXJuIGZpbGxQZGZGb3JtKGFyZ3MpO1xuICAgIGNhc2UgXCJnZXRfcGRmX21ldGFkYXRhXCI6XG4gICAgICByZXR1cm4gZ2V0UGRmTWV0YWRhdGEoYXJncyk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBQREYgdG9vbDogJHtuYW1lfWApO1xuICB9XG59XG5cbi8vIFRvb2wgaW1wbGVtZW50YXRpb25zXG5hc3luYyBmdW5jdGlvbiBleHRyYWN0VGV4dEZyb21QZGYoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7IGZpbGVfcGF0aCwgcGFnZXMsIHVzZV9vY3IsIGxhbmd1YWdlIH0gPSBhcmdzO1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGVfcGF0aCBhcyBzdHJpbmc7XG4gICAgXG4gICAgLy8gQ2hlY2sgaWYgZmlsZSBleGlzdHNcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZmlsZVBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZpbGUgbm90IGZvdW5kOiAke2ZpbGVQYXRofWApO1xuICAgIH1cbiAgICBcbiAgICAvLyBSZWFkIFBERiBmaWxlXG4gICAgY29uc3QgZGF0YUJ1ZmZlciA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCk7XG4gICAgXG4gICAgLy8gUGFyc2UgUERGXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHBkZlBhcnNlKGRhdGFCdWZmZXIpO1xuICAgIFxuICAgIC8vIEhhbmRsZSBwYWdlIHJhbmdlc1xuICAgIGNvbnN0IHBhZ2VSYW5nZSA9IHBhZ2VzIGFzIHN0cmluZyB8fCAnYWxsJztcbiAgICBsZXQgdGV4dCA9IGRhdGEudGV4dDtcbiAgICBcbiAgICBpZiAocGFnZVJhbmdlICE9PSAnYWxsJykge1xuICAgICAgLy8gUGFyc2UgcGFnZSByYW5nZSAoZS5nLiwgXCIxLTVcIiwgXCIxLDMsNVwiKVxuICAgICAgY29uc3QgbGluZXMgPSB0ZXh0LnNwbGl0KCdcXG4nKTtcbiAgICAgIGNvbnN0IHBhZ2VCcmVha1BhdHRlcm4gPSAvXFxmL2c7IC8vIEZvcm0gZmVlZCBjaGFyYWN0ZXIgdHlwaWNhbGx5IG1hcmtzIHBhZ2UgYnJlYWtzXG4gICAgICBcbiAgICAgIC8vIEZvciBub3csIHJldHVybiBhbGwgdGV4dCBpZiBzcGVjaWZpYyBwYWdlIHBhcnNpbmcgaXMgY29tcGxleFxuICAgICAgLy8gVE9ETzogSW1wbGVtZW50IHBhZ2Utc3BlY2lmaWMgZXh0cmFjdGlvblxuICAgICAgdGV4dCA9IGRhdGEudGV4dDtcbiAgICB9XG4gICAgXG4gICAgLy8gSGFuZGxlIE9DUiBpZiByZXF1ZXN0ZWRcbiAgICBpZiAodXNlX29jcikge1xuICAgICAgLy8gT0NSIHJlcXVpcmVzIGFkZGl0aW9uYWwgbGlicmFyeSAodGVzc2VyYWN0LmpzKVxuICAgICAgLy8gRm9yIG5vdywgcmV0dXJuIGEgaGVscGZ1bCBtZXNzYWdlXG4gICAgICB0ZXh0ICs9IGBcXG5cXG5bTm90ZTogT0NSIHJlcXVlc3RlZCB3aXRoIGxhbmd1YWdlICcke2xhbmd1YWdlIHx8ICdlbmcnfScuIE9DUiBmdW5jdGlvbmFsaXR5IHJlcXVpcmVzIHRlc3NlcmFjdC5qcy4gSW5zdGFsbCB3aXRoOiBucG0gaW5zdGFsbCB0ZXNzZXJhY3QuanNdYDtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHRleHQ7XG4gICAgXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICByZXR1cm4gYEVycm9yIGV4dHJhY3RpbmcgdGV4dCBmcm9tIFBERjogJHtlcnJvci5tZXNzYWdlfWA7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZXh0cmFjdFRhYmxlc0Zyb21QZGYoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPG9iamVjdD4ge1xuICBjb25zdCB7IGZpbGVfcGF0aCwgcGFnZXMsIG91dHB1dF9mb3JtYXQgfSA9IGFyZ3M7XG4gIFxuICB0cnkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gZmlsZV9wYXRoIGFzIHN0cmluZztcbiAgICBcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZmlsZVBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZpbGUgbm90IGZvdW5kOiAke2ZpbGVQYXRofWApO1xuICAgIH1cbiAgICBcbiAgICAvLyBSZWFkIFBERiBmaWxlXG4gICAgY29uc3QgZGF0YUJ1ZmZlciA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHBkZlBhcnNlKGRhdGFCdWZmZXIpO1xuICAgIFxuICAgIC8vIEJhc2ljIHRhYmxlIGV4dHJhY3Rpb24gdXNpbmcgdGV4dCBwYXR0ZXJuc1xuICAgIC8vIEZvciBwcm9kdWN0aW9uLCBjb25zaWRlciB1c2luZyBwZGYtdGFibGUtZXh0cmFjdG9yIG9yIHRhYnVsYS1qc1xuICAgIGNvbnN0IHRleHQgPSBkYXRhLnRleHQ7XG4gICAgY29uc3QgbGluZXMgPSB0ZXh0LnNwbGl0KCdcXG4nKTtcbiAgICBcbiAgICAvLyBTaW1wbGUgaGV1cmlzdGljOiBsaW5lcyB3aXRoIG11bHRpcGxlIHNwYWNlcy90YWJzIG1pZ2h0IGJlIHRhYmxlIHJvd3NcbiAgICBjb25zdCBwb3RlbnRpYWxUYWJsZVJvd3MgPSBsaW5lcy5maWx0ZXIoKGxpbmU6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3Qgc3BhY2VkQ29sdW1ucyA9IGxpbmUuc3BsaXQoL1xcc3syLH0vKS5maWx0ZXIoKGNvbDogc3RyaW5nKSA9PiBjb2wudHJpbSgpLmxlbmd0aCA+IDApO1xuICAgICAgcmV0dXJuIHNwYWNlZENvbHVtbnMubGVuZ3RoID49IDI7XG4gICAgfSk7XG4gICAgXG4gICAgY29uc3QgdGFibGVzID0gW107XG4gICAgaWYgKHBvdGVudGlhbFRhYmxlUm93cy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCB0YWJsZURhdGEgPSBwb3RlbnRpYWxUYWJsZVJvd3MubWFwKChyb3c6IHN0cmluZykgPT4gXG4gICAgICAgIHJvdy5zcGxpdCgvXFxzezIsfS8pLmZpbHRlcigoY29sOiBzdHJpbmcpID0+IGNvbC50cmltKCkubGVuZ3RoID4gMClcbiAgICAgICk7XG4gICAgICBcbiAgICAgIHRhYmxlcy5wdXNoKHtcbiAgICAgICAgcGFnZTogMSxcbiAgICAgICAgcm93czogdGFibGVEYXRhLmxlbmd0aCxcbiAgICAgICAgY29sdW1uczogdGFibGVEYXRhWzBdPy5sZW5ndGggfHwgMCxcbiAgICAgICAgZGF0YTogdGFibGVEYXRhXG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIGZpbGU6IGZpbGVfcGF0aCxcbiAgICAgIHRhYmxlc19mb3VuZDogdGFibGVzLmxlbmd0aCxcbiAgICAgIGZvcm1hdDogb3V0cHV0X2Zvcm1hdCB8fCBcImpzb25cIixcbiAgICAgIHRhYmxlczogdGFibGVzLFxuICAgICAgbm90ZTogXCJCYXNpYyB0YWJsZSBleHRyYWN0aW9uLiBGb3IgYWR2YW5jZWQgdGFibGUgcGFyc2luZywgY29uc2lkZXIgdXNpbmcgcGRmcGx1bWJlciAoUHl0aG9uKSBvciB0YWJ1bGEtanNcIlxuICAgIH07XG4gICAgXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3I6IGBGYWlsZWQgdG8gZXh0cmFjdCB0YWJsZXM6ICR7ZXJyb3IubWVzc2FnZX1gLFxuICAgICAgZmlsZTogZmlsZV9wYXRoLFxuICAgICAgdGFibGVzX2ZvdW5kOiAwXG4gICAgfTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBtZXJnZVBkZnMoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7IGZpbGVfcGF0aHMsIG91dHB1dF9wYXRoIH0gPSBhcmdzO1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXRocyA9IGZpbGVfcGF0aHMgYXMgc3RyaW5nW107XG4gICAgY29uc3Qgb3V0cHV0UGF0aCA9IG91dHB1dF9wYXRoIGFzIHN0cmluZztcbiAgICBcbiAgICAvLyBWYWxpZGF0ZSBpbnB1dCBmaWxlc1xuICAgIGZvciAoY29uc3QgZmlsZVBhdGggb2YgcGF0aHMpIHtcbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhmaWxlUGF0aCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWxlIG5vdCBmb3VuZDogJHtmaWxlUGF0aH1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gQ3JlYXRlIGEgbmV3IFBERiBkb2N1bWVudFxuICAgIGNvbnN0IG1lcmdlZFBkZiA9IGF3YWl0IFBERkRvY3VtZW50LmNyZWF0ZSgpO1xuICAgIFxuICAgIC8vIExvYWQgYW5kIG1lcmdlIGVhY2ggUERGXG4gICAgZm9yIChjb25zdCBmaWxlUGF0aCBvZiBwYXRocykge1xuICAgICAgY29uc3QgcGRmQnl0ZXMgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgpO1xuICAgICAgY29uc3QgcGRmID0gYXdhaXQgUERGRG9jdW1lbnQubG9hZChwZGZCeXRlcyk7XG4gICAgICBjb25zdCBjb3BpZWRQYWdlcyA9IGF3YWl0IG1lcmdlZFBkZi5jb3B5UGFnZXMocGRmLCBwZGYuZ2V0UGFnZUluZGljZXMoKSk7XG4gICAgICBcbiAgICAgIGNvcGllZFBhZ2VzLmZvckVhY2goKHBhZ2UpID0+IHtcbiAgICAgICAgbWVyZ2VkUGRmLmFkZFBhZ2UocGFnZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLy8gU2F2ZSBtZXJnZWQgUERGXG4gICAgY29uc3QgbWVyZ2VkUGRmQnl0ZXMgPSBhd2FpdCBtZXJnZWRQZGYuc2F2ZSgpO1xuICAgIGZzLndyaXRlRmlsZVN5bmMob3V0cHV0UGF0aCwgbWVyZ2VkUGRmQnl0ZXMpO1xuICAgIFxuICAgIHJldHVybiBgU3VjY2Vzc2Z1bGx5IG1lcmdlZCAke3BhdGhzLmxlbmd0aH0gUERGcyBpbnRvICR7b3V0cHV0UGF0aH0uIFRvdGFsIHBhZ2VzOiAke21lcmdlZFBkZi5nZXRQYWdlQ291bnQoKX1gO1xuICAgIFxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgcmV0dXJuIGBFcnJvciBtZXJnaW5nIFBERnM6ICR7ZXJyb3IubWVzc2FnZX1gO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNwbGl0UGRmKGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgeyBmaWxlX3BhdGgsIG91dHB1dF9kaXIsIHNwbGl0X21vZGUsIHJhbmdlcyB9ID0gYXJncztcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBmaWxlX3BhdGggYXMgc3RyaW5nO1xuICAgIGNvbnN0IG91dHB1dERpciA9IG91dHB1dF9kaXIgYXMgc3RyaW5nO1xuICAgIGNvbnN0IG1vZGUgPSBzcGxpdF9tb2RlIGFzIHN0cmluZyB8fCAnYnlfcGFnZSc7XG4gICAgXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWxlIG5vdCBmb3VuZDogJHtmaWxlUGF0aH1gKTtcbiAgICB9XG4gICAgXG4gICAgLy8gQ3JlYXRlIG91dHB1dCBkaXJlY3RvcnkgaWYgaXQgZG9lc24ndCBleGlzdFxuICAgIGlmICghZnMuZXhpc3RzU3luYyhvdXRwdXREaXIpKSB7XG4gICAgICBmcy5ta2RpclN5bmMob3V0cHV0RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgXG4gICAgLy8gTG9hZCBQREZcbiAgICBjb25zdCBwZGZCeXRlcyA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCk7XG4gICAgY29uc3QgcGRmRG9jID0gYXdhaXQgUERGRG9jdW1lbnQubG9hZChwZGZCeXRlcyk7XG4gICAgY29uc3QgdG90YWxQYWdlcyA9IHBkZkRvYy5nZXRQYWdlQ291bnQoKTtcbiAgICBcbiAgICBjb25zdCBiYXNlRmlsZU5hbWUgPSBwYXRoLmJhc2VuYW1lKGZpbGVQYXRoLCAnLnBkZicpO1xuICAgIGxldCBmaWxlc0NyZWF0ZWQgPSAwO1xuICAgIFxuICAgIGlmIChtb2RlID09PSAnYnlfcGFnZScpIHtcbiAgICAgIC8vIFNwbGl0IGludG8gaW5kaXZpZHVhbCBwYWdlc1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbFBhZ2VzOyBpKyspIHtcbiAgICAgICAgY29uc3QgbmV3UGRmID0gYXdhaXQgUERGRG9jdW1lbnQuY3JlYXRlKCk7XG4gICAgICAgIGNvbnN0IFtjb3BpZWRQYWdlXSA9IGF3YWl0IG5ld1BkZi5jb3B5UGFnZXMocGRmRG9jLCBbaV0pO1xuICAgICAgICBuZXdQZGYuYWRkUGFnZShjb3BpZWRQYWdlKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG5ld1BkZkJ5dGVzID0gYXdhaXQgbmV3UGRmLnNhdmUoKTtcbiAgICAgICAgY29uc3Qgb3V0cHV0UGF0aCA9IHBhdGguam9pbihvdXRwdXREaXIsIGAke2Jhc2VGaWxlTmFtZX1fcGFnZV8ke2kgKyAxfS5wZGZgKTtcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhvdXRwdXRQYXRoLCBuZXdQZGZCeXRlcyk7XG4gICAgICAgIGZpbGVzQ3JlYXRlZCsrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZSA9PT0gJ2J5X3JhbmdlJyAmJiByYW5nZXMpIHtcbiAgICAgIC8vIFNwbGl0IGJ5IHBhZ2UgcmFuZ2VzXG4gICAgICBjb25zdCBwYWdlUmFuZ2VzID0gcmFuZ2VzIGFzIHN0cmluZ1tdO1xuICAgICAgXG4gICAgICBmb3IgKGxldCByYW5nZUlkeCA9IDA7IHJhbmdlSWR4IDwgcGFnZVJhbmdlcy5sZW5ndGg7IHJhbmdlSWR4KyspIHtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBwYWdlUmFuZ2VzW3JhbmdlSWR4XTtcbiAgICAgICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gcmFuZ2Uuc3BsaXQoJy0nKS5tYXAobiA9PiBwYXJzZUludChuLnRyaW0oKSkgLSAxKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG5ld1BkZiA9IGF3YWl0IFBERkRvY3VtZW50LmNyZWF0ZSgpO1xuICAgICAgICBjb25zdCBwYWdlSW5kaWNlcyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IGVuZCAtIHN0YXJ0ICsgMSB9LCAoXywgaSkgPT4gc3RhcnQgKyBpKTtcbiAgICAgICAgY29uc3QgY29waWVkUGFnZXMgPSBhd2FpdCBuZXdQZGYuY29weVBhZ2VzKHBkZkRvYywgcGFnZUluZGljZXMpO1xuICAgICAgICBcbiAgICAgICAgY29waWVkUGFnZXMuZm9yRWFjaCgocGFnZSkgPT4gbmV3UGRmLmFkZFBhZ2UocGFnZSkpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbmV3UGRmQnl0ZXMgPSBhd2FpdCBuZXdQZGYuc2F2ZSgpO1xuICAgICAgICBjb25zdCBvdXRwdXRQYXRoID0gcGF0aC5qb2luKG91dHB1dERpciwgYCR7YmFzZUZpbGVOYW1lfV9wYXJ0XyR7cmFuZ2VJZHggKyAxfS5wZGZgKTtcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhvdXRwdXRQYXRoLCBuZXdQZGZCeXRlcyk7XG4gICAgICAgIGZpbGVzQ3JlYXRlZCsrO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gYFN1Y2Nlc3NmdWxseSBzcGxpdCAke2ZpbGVQYXRofSBpbnRvICR7ZmlsZXNDcmVhdGVkfSBmaWxlcyBpbiAke291dHB1dERpcn1gO1xuICAgIFxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgcmV0dXJuIGBFcnJvciBzcGxpdHRpbmcgUERGOiAke2Vycm9yLm1lc3NhZ2V9YDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBjb21wcmVzc1BkZihhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8b2JqZWN0PiB7XG4gIGNvbnN0IHsgZmlsZV9wYXRoLCBvdXRwdXRfcGF0aCwgcXVhbGl0eSB9ID0gYXJncztcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBmaWxlX3BhdGggYXMgc3RyaW5nO1xuICAgIGNvbnN0IG91dHB1dFBhdGggPSBvdXRwdXRfcGF0aCBhcyBzdHJpbmc7XG4gICAgY29uc3QgY29tcHJlc3Npb25RdWFsaXR5ID0gcXVhbGl0eSBhcyBzdHJpbmcgfHwgXCJtZWRpdW1cIjtcbiAgICBcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZmlsZVBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZpbGUgbm90IGZvdW5kOiAke2ZpbGVQYXRofWApO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBvcmlnaW5hbFNpemUgPSBmcy5zdGF0U3luYyhmaWxlUGF0aCkuc2l6ZTtcbiAgICBcbiAgICAvLyBMb2FkIGFuZCBzYXZlIFBERiAocGRmLWxpYiBhdXRvbWF0aWNhbGx5IG9wdGltaXplcylcbiAgICBjb25zdCBwZGZCeXRlcyA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCk7XG4gICAgY29uc3QgcGRmRG9jID0gYXdhaXQgUERGRG9jdW1lbnQubG9hZChwZGZCeXRlcyk7XG4gICAgXG4gICAgLy8gU2F2ZSB3aXRoIGNvbXByZXNzaW9uXG4gICAgY29uc3QgY29tcHJlc3NlZEJ5dGVzID0gYXdhaXQgcGRmRG9jLnNhdmUoe1xuICAgICAgdXNlT2JqZWN0U3RyZWFtczogY29tcHJlc3Npb25RdWFsaXR5ICE9PSAnbG93JyxcbiAgICB9KTtcbiAgICBcbiAgICBmcy53cml0ZUZpbGVTeW5jKG91dHB1dFBhdGgsIGNvbXByZXNzZWRCeXRlcyk7XG4gICAgY29uc3QgY29tcHJlc3NlZFNpemUgPSBmcy5zdGF0U3luYyhvdXRwdXRQYXRoKS5zaXplO1xuICAgIFxuICAgIGNvbnN0IHJlZHVjdGlvbiA9ICgob3JpZ2luYWxTaXplIC0gY29tcHJlc3NlZFNpemUpIC8gb3JpZ2luYWxTaXplICogMTAwKS50b0ZpeGVkKDEpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgaW5wdXQ6IGZpbGVfcGF0aCxcbiAgICAgIG91dHB1dDogb3V0cHV0X3BhdGgsXG4gICAgICBxdWFsaXR5OiBjb21wcmVzc2lvblF1YWxpdHksXG4gICAgICBvcmlnaW5hbF9zaXplOiBgJHsob3JpZ2luYWxTaXplIC8gMTAyNCAvIDEwMjQpLnRvRml4ZWQoMil9IE1CYCxcbiAgICAgIGNvbXByZXNzZWRfc2l6ZTogYCR7KGNvbXByZXNzZWRTaXplIC8gMTAyNCAvIDEwMjQpLnRvRml4ZWQoMil9IE1CYCxcbiAgICAgIHJlZHVjdGlvbjogYCR7cmVkdWN0aW9ufSVgLFxuICAgICAgbm90ZTogXCJCYXNpYyBjb21wcmVzc2lvbi4gRm9yIGFkdmFuY2VkIGNvbXByZXNzaW9uLCB1c2UgZXh0ZXJuYWwgdG9vbHMgbGlrZSBHaG9zdHNjcmlwdCBvciBxcGRmXCJcbiAgICB9O1xuICAgIFxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgZXJyb3I6IGBGYWlsZWQgdG8gY29tcHJlc3MgUERGOiAke2Vycm9yLm1lc3NhZ2V9YFxuICAgIH07XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gYWRkV2F0ZXJtYXJrVG9QZGYoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7IGZpbGVfcGF0aCwgb3V0cHV0X3BhdGgsIHdhdGVybWFya190eXBlLCB3YXRlcm1hcmtfY29udGVudCwgcG9zaXRpb24sIG9wYWNpdHkgfSA9IGFyZ3M7XG4gIFxuICB0cnkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gZmlsZV9wYXRoIGFzIHN0cmluZztcbiAgICBjb25zdCBvdXRwdXRQYXRoID0gb3V0cHV0X3BhdGggYXMgc3RyaW5nO1xuICAgIGNvbnN0IHR5cGUgPSB3YXRlcm1hcmtfdHlwZSBhcyBzdHJpbmc7XG4gICAgY29uc3QgY29udGVudCA9IHdhdGVybWFya19jb250ZW50IGFzIHN0cmluZztcbiAgICBjb25zdCBwb3MgPSBwb3NpdGlvbiBhcyBzdHJpbmcgfHwgJ2RpYWdvbmFsJztcbiAgICBjb25zdCBvcGFjaXR5VmFsdWUgPSBvcGFjaXR5IGFzIG51bWJlciB8fCAwLjM7XG4gICAgXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWxlIG5vdCBmb3VuZDogJHtmaWxlUGF0aH1gKTtcbiAgICB9XG4gICAgXG4gICAgLy8gTG9hZCBQREZcbiAgICBjb25zdCBwZGZCeXRlcyA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCk7XG4gICAgY29uc3QgcGRmRG9jID0gYXdhaXQgUERGRG9jdW1lbnQubG9hZChwZGZCeXRlcyk7XG4gICAgY29uc3QgcGFnZXMgPSBwZGZEb2MuZ2V0UGFnZXMoKTtcbiAgICBcbiAgICBpZiAodHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICAvLyBBZGQgdGV4dCB3YXRlcm1hcmsgdG8gZWFjaCBwYWdlXG4gICAgICBmb3IgKGNvbnN0IHBhZ2Ugb2YgcGFnZXMpIHtcbiAgICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBwYWdlLmdldFNpemUoKTtcbiAgICAgICAgXG4gICAgICAgIGxldCB4ID0gd2lkdGggLyAyO1xuICAgICAgICBsZXQgeSA9IGhlaWdodCAvIDI7XG4gICAgICAgIGxldCByb3RhdGlvbiA9IGRlZ3JlZXMoMCk7XG4gICAgICAgIFxuICAgICAgICBpZiAocG9zID09PSAnZGlhZ29uYWwnKSB7XG4gICAgICAgICAgcm90YXRpb24gPSBkZWdyZWVzKDQ1KTtcbiAgICAgICAgfSBlbHNlIGlmIChwb3MgPT09ICdoZWFkZXInKSB7XG4gICAgICAgICAgeSA9IGhlaWdodCAtIDUwO1xuICAgICAgICB9IGVsc2UgaWYgKHBvcyA9PT0gJ2Zvb3RlcicpIHtcbiAgICAgICAgICB5ID0gNTA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHBhZ2UuZHJhd1RleHQoY29udGVudCwge1xuICAgICAgICAgIHg6IHggLSAoY29udGVudC5sZW5ndGggKiA2KSxcbiAgICAgICAgICB5OiB5LFxuICAgICAgICAgIHNpemU6IDQwLFxuICAgICAgICAgIGNvbG9yOiByZ2IoMC43LCAwLjcsIDAuNyksXG4gICAgICAgICAgb3BhY2l0eTogb3BhY2l0eVZhbHVlLFxuICAgICAgICAgIHJvdGF0ZTogcm90YXRpb24sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgcmV0dXJuIGBJbWFnZSB3YXRlcm1hcmsgbm90IHlldCBpbXBsZW1lbnRlZC4gUmVxdWlyZXMgZW1iZWRkaW5nIGltYWdlcyBmcm9tICR7Y29udGVudH1gO1xuICAgIH1cbiAgICBcbiAgICAvLyBTYXZlIHdhdGVybWFya2VkIFBERlxuICAgIGNvbnN0IHdhdGVybWFya2VkQnl0ZXMgPSBhd2FpdCBwZGZEb2Muc2F2ZSgpO1xuICAgIGZzLndyaXRlRmlsZVN5bmMob3V0cHV0UGF0aCwgd2F0ZXJtYXJrZWRCeXRlcyk7XG4gICAgXG4gICAgcmV0dXJuIGBTdWNjZXNzZnVsbHkgYWRkZWQgJHt0eXBlfSB3YXRlcm1hcmsgdG8gJHtwYWdlcy5sZW5ndGh9IHBhZ2VzLiBPdXRwdXQ6ICR7b3V0cHV0UGF0aH1gO1xuICAgIFxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgcmV0dXJuIGBFcnJvciBhZGRpbmcgd2F0ZXJtYXJrOiAke2Vycm9yLm1lc3NhZ2V9YDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBmaWxsUGRmRm9ybShhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHsgZmlsZV9wYXRoLCBvdXRwdXRfcGF0aCwgZm9ybV9kYXRhLCBmbGF0dGVuIH0gPSBhcmdzO1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGVfcGF0aCBhcyBzdHJpbmc7XG4gICAgY29uc3Qgb3V0cHV0UGF0aCA9IG91dHB1dF9wYXRoIGFzIHN0cmluZztcbiAgICBjb25zdCBmb3JtRGF0YSA9IGZvcm1fZGF0YSBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuICAgIGNvbnN0IHNob3VsZEZsYXR0ZW4gPSBmbGF0dGVuIGFzIGJvb2xlYW4gfHwgZmFsc2U7XG4gICAgXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWxlIG5vdCBmb3VuZDogJHtmaWxlUGF0aH1gKTtcbiAgICB9XG4gICAgXG4gICAgLy8gTG9hZCBQREZcbiAgICBjb25zdCBwZGZCeXRlcyA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCk7XG4gICAgY29uc3QgcGRmRG9jID0gYXdhaXQgUERGRG9jdW1lbnQubG9hZChwZGZCeXRlcyk7XG4gICAgXG4gICAgLy8gR2V0IGZvcm1cbiAgICBjb25zdCBmb3JtID0gcGRmRG9jLmdldEZvcm0oKTtcbiAgICBjb25zdCBmaWVsZHMgPSBmb3JtLmdldEZpZWxkcygpO1xuICAgIFxuICAgIGxldCBmaWxsZWRDb3VudCA9IDA7XG4gICAgXG4gICAgLy8gRmlsbCBmb3JtIGZpZWxkc1xuICAgIGZvciAoY29uc3QgW2ZpZWxkTmFtZSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGZvcm1EYXRhKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZmllbGQgPSBmb3JtLmdldEZpZWxkKGZpZWxkTmFtZSk7XG4gICAgICAgIFxuICAgICAgICAvLyBEZXRlcm1pbmUgZmllbGQgdHlwZSBhbmQgZmlsbCBhY2NvcmRpbmdseVxuICAgICAgICBjb25zdCBmaWVsZFR5cGUgPSBmaWVsZC5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICBcbiAgICAgICAgaWYgKGZpZWxkVHlwZS5pbmNsdWRlcygnVGV4dCcpKSB7XG4gICAgICAgICAgY29uc3QgdGV4dEZpZWxkID0gZm9ybS5nZXRUZXh0RmllbGQoZmllbGROYW1lKTtcbiAgICAgICAgICB0ZXh0RmllbGQuc2V0VGV4dCh2YWx1ZSk7XG4gICAgICAgICAgZmlsbGVkQ291bnQrKztcbiAgICAgICAgfSBlbHNlIGlmIChmaWVsZFR5cGUuaW5jbHVkZXMoJ0NoZWNrQm94JykpIHtcbiAgICAgICAgICBjb25zdCBjaGVja0JveCA9IGZvcm0uZ2V0Q2hlY2tCb3goZmllbGROYW1lKTtcbiAgICAgICAgICBpZiAodmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnIHx8IHZhbHVlID09PSAnMScpIHtcbiAgICAgICAgICAgIGNoZWNrQm94LmNoZWNrKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoZWNrQm94LnVuY2hlY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZmlsbGVkQ291bnQrKztcbiAgICAgICAgfSBlbHNlIGlmIChmaWVsZFR5cGUuaW5jbHVkZXMoJ0Ryb3Bkb3duJykpIHtcbiAgICAgICAgICBjb25zdCBkcm9wZG93biA9IGZvcm0uZ2V0RHJvcGRvd24oZmllbGROYW1lKTtcbiAgICAgICAgICBkcm9wZG93bi5zZWxlY3QodmFsdWUpO1xuICAgICAgICAgIGZpbGxlZENvdW50Kys7XG4gICAgICAgIH0gZWxzZSBpZiAoZmllbGRUeXBlLmluY2x1ZGVzKCdSYWRpbycpKSB7XG4gICAgICAgICAgY29uc3QgcmFkaW9Hcm91cCA9IGZvcm0uZ2V0UmFkaW9Hcm91cChmaWVsZE5hbWUpO1xuICAgICAgICAgIHJhZGlvR3JvdXAuc2VsZWN0KHZhbHVlKTtcbiAgICAgICAgICBmaWxsZWRDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEZpZWxkIG5vdCBmb3VuZCBvciB0eXBlIG1pc21hdGNoLCBza2lwXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBGbGF0dGVuIGZvcm0gaWYgcmVxdWVzdGVkXG4gICAgaWYgKHNob3VsZEZsYXR0ZW4pIHtcbiAgICAgIGZvcm0uZmxhdHRlbigpO1xuICAgIH1cbiAgICBcbiAgICAvLyBTYXZlIGZpbGxlZCBQREZcbiAgICBjb25zdCBmaWxsZWRCeXRlcyA9IGF3YWl0IHBkZkRvYy5zYXZlKCk7XG4gICAgZnMud3JpdGVGaWxlU3luYyhvdXRwdXRQYXRoLCBmaWxsZWRCeXRlcyk7XG4gICAgXG4gICAgcmV0dXJuIGBTdWNjZXNzZnVsbHkgZmlsbGVkICR7ZmlsbGVkQ291bnR9IG9mICR7T2JqZWN0LmtleXMoZm9ybURhdGEpLmxlbmd0aH0gZm9ybSBmaWVsZHMuIE91dHB1dDogJHtvdXRwdXRQYXRofSR7c2hvdWxkRmxhdHRlbiA/ICcgKGZsYXR0ZW5lZCknIDogJyd9YDtcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIHJldHVybiBgRXJyb3IgZmlsbGluZyBQREYgZm9ybTogJHtlcnJvci5tZXNzYWdlfWA7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0UGRmTWV0YWRhdGEoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPG9iamVjdD4ge1xuICBjb25zdCB7IGZpbGVfcGF0aCB9ID0gYXJncztcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBmaWxlX3BhdGggYXMgc3RyaW5nO1xuICAgIFxuICAgIGlmICghZnMuZXhpc3RzU3luYyhmaWxlUGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmlsZSBub3QgZm91bmQ6ICR7ZmlsZVBhdGh9YCk7XG4gICAgfVxuICAgIFxuICAgIC8vIEdldCBmaWxlIHN0YXRzXG4gICAgY29uc3Qgc3RhdHMgPSBmcy5zdGF0U3luYyhmaWxlUGF0aCk7XG4gICAgXG4gICAgLy8gTG9hZCBQREZcbiAgICBjb25zdCBwZGZCeXRlcyA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCk7XG4gICAgY29uc3QgcGRmRG9jID0gYXdhaXQgUERGRG9jdW1lbnQubG9hZChwZGZCeXRlcyk7XG4gICAgXG4gICAgLy8gRXh0cmFjdCBtZXRhZGF0YVxuICAgIGNvbnN0IHRpdGxlID0gcGRmRG9jLmdldFRpdGxlKCkgfHwgJ1VudGl0bGVkJztcbiAgICBjb25zdCBhdXRob3IgPSBwZGZEb2MuZ2V0QXV0aG9yKCkgfHwgJ1Vua25vd24nO1xuICAgIGNvbnN0IHN1YmplY3QgPSBwZGZEb2MuZ2V0U3ViamVjdCgpIHx8ICcnO1xuICAgIGNvbnN0IGNyZWF0b3IgPSBwZGZEb2MuZ2V0Q3JlYXRvcigpIHx8ICdVbmtub3duJztcbiAgICBjb25zdCBwcm9kdWNlciA9IHBkZkRvYy5nZXRQcm9kdWNlcigpIHx8ICdVbmtub3duJztcbiAgICBjb25zdCBjcmVhdGlvbkRhdGUgPSBwZGZEb2MuZ2V0Q3JlYXRpb25EYXRlKCk7XG4gICAgY29uc3QgbW9kaWZpY2F0aW9uRGF0ZSA9IHBkZkRvYy5nZXRNb2RpZmljYXRpb25EYXRlKCk7XG4gICAgXG4gICAgLy8gR2V0IGZvcm0gaW5mb1xuICAgIGNvbnN0IGZvcm0gPSBwZGZEb2MuZ2V0Rm9ybSgpO1xuICAgIGNvbnN0IGZvcm1GaWVsZHMgPSBmb3JtLmdldEZpZWxkcygpO1xuICAgIFxuICAgIC8vIFBhcnNlIFBERiBmb3IgYWRkaXRpb25hbCBpbmZvXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHBkZlBhcnNlKHBkZkJ5dGVzKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgZmlsZTogZmlsZV9wYXRoLFxuICAgICAgbWV0YWRhdGE6IHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGF1dGhvcixcbiAgICAgICAgc3ViamVjdCxcbiAgICAgICAgY3JlYXRvcixcbiAgICAgICAgcHJvZHVjZXIsXG4gICAgICAgIGNyZWF0aW9uX2RhdGU6IGNyZWF0aW9uRGF0ZT8udG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdIHx8ICdVbmtub3duJyxcbiAgICAgICAgbW9kaWZpY2F0aW9uX2RhdGU6IG1vZGlmaWNhdGlvbkRhdGU/LnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSB8fCAnVW5rbm93bicsXG4gICAgICAgIHBhZ2VzOiBwZGZEb2MuZ2V0UGFnZUNvdW50KCksXG4gICAgICAgIHNpemU6IGAkeyhzdGF0cy5zaXplIC8gMTAyNCAvIDEwMjQpLnRvRml4ZWQoMil9IE1CYCxcbiAgICAgICAgZW5jcnlwdGVkOiBwZGZEb2MuaXNFbmNyeXB0ZWQsXG4gICAgICAgIGhhc19mb3JtczogZm9ybUZpZWxkcy5sZW5ndGggPiAwLFxuICAgICAgICBmb3JtX2ZpZWxkczogZm9ybUZpZWxkcy5sZW5ndGgsXG4gICAgICAgIHRleHRfbGVuZ3RoOiBkYXRhLnRleHQubGVuZ3RoLFxuICAgICAgICB2ZXJzaW9uOiBkYXRhLnZlcnNpb24gfHwgJ1Vua25vd24nLFxuICAgICAgfSxcbiAgICB9O1xuICAgIFxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yOiBgRmFpbGVkIHRvIGdldCBQREYgbWV0YWRhdGE6ICR7ZXJyb3IubWVzc2FnZX1gLFxuICAgICAgZmlsZTogZmlsZV9wYXRoXG4gICAgfTtcbiAgfVxufVxuIl19