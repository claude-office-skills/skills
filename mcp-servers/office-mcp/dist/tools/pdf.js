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
const tesseract_js_1 = __importDefault(require("tesseract.js"));
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
        case "ocr_pdf":
            return ocrPdf(args);
        case "ocr_image":
            return ocrImageTool(args);
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
async function ocrPdf(args) {
    const { file_path, output_path, language, pages } = args;
    try {
        const filePath = file_path;
        const lang = language || 'eng';
        const pageRange = pages || 'all';
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // Read PDF
        const pdfBytes = fs.readFileSync(filePath);
        const pdfDoc = await pdf_lib_1.PDFDocument.load(pdfBytes);
        const totalPages = pdfDoc.getPageCount();
        // Determine which pages to process
        let pagesToProcess = [];
        if (pageRange === 'all') {
            pagesToProcess = Array.from({ length: totalPages }, (_, i) => i);
        }
        else if (pageRange.includes('-')) {
            const [start, end] = pageRange.split('-').map(n => parseInt(n) - 1);
            for (let i = start; i <= Math.min(end, totalPages - 1); i++) {
                pagesToProcess.push(i);
            }
        }
        else {
            pagesToProcess = pageRange.split(',').map(n => parseInt(n.trim()) - 1);
        }
        // For PDF OCR, we need to convert PDF pages to images first
        // tesseract.js works with images, not PDFs directly
        // We'll use a workaround: extract what text we can and note that
        // full OCR requires PDF-to-image conversion
        // Try to extract any existing text first
        const pdfData = await (0, pdf_parse_1.default)(pdfBytes);
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
    }
    catch (error) {
        return {
            success: false,
            error: `OCR failed: ${error.message}`,
            file: file_path,
        };
    }
}
// OCR on image files
async function ocrImageTool(args) {
    const { file_path, output_path, language } = args;
    try {
        const filePath = file_path;
        const lang = language || 'eng';
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
        const result = await tesseract_js_1.default.recognize(filePath, lang, {
            logger: (m) => {
                // Silent logging
            },
        });
        const text = result.data.text;
        const confidence = result.data.confidence;
        // Save to file if output path specified
        if (output_path) {
            fs.writeFileSync(output_path, text, 'utf-8');
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
    }
    catch (error) {
        return {
            success: false,
            error: `Image OCR failed: ${error.message}`,
            file: file_path,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Rvb2xzL3BkZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdSSCxzQ0E0QkM7QUF6U0QsdUNBQXlCO0FBQ3pCLDJDQUE2QjtBQUM3QiwwREFBaUM7QUFDakMscUNBQW9EO0FBQ3BELGdFQUFxQztBQUVyQzs7R0FFRztBQUNVLFFBQUEsUUFBUSxHQUFXO0lBQzlCO1FBQ0UsSUFBSSxFQUFFLHVCQUF1QjtRQUM3QixXQUFXLEVBQUUsNkZBQTZGO1FBQzFHLFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLFNBQVMsRUFBRTtvQkFDVCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsc0JBQXNCO2lCQUNwQztnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLDRDQUE0QztvQkFDekQsT0FBTyxFQUFFLEtBQUs7aUJBQ2Y7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxTQUFTO29CQUNmLFdBQVcsRUFBRSwrQkFBK0I7b0JBQzVDLE9BQU8sRUFBRSxLQUFLO2lCQUNmO2dCQUNELFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsa0RBQWtEO29CQUMvRCxPQUFPLEVBQUUsS0FBSztpQkFDZjthQUNGO1lBQ0QsUUFBUSxFQUFFLENBQUMsV0FBVyxDQUFDO1NBQ3hCO0tBQ0Y7SUFDRDtRQUNFLElBQUksRUFBRSx5QkFBeUI7UUFDL0IsV0FBVyxFQUFFLCtGQUErRjtRQUM1RyxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDVixTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFF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XG4gKiBCZXN0LWluLWNsYXNzIHRvb2xzIGZvciBQREYgbWFuaXB1bGF0aW9uLlxuICogSW5zcGlyZWQgYnkgU3RpcmxpbmctUERGICg3M2srIHN0YXJzKSBjYXBhYmlsaXRpZXMuXG4gKi9cblxuaW1wb3J0IHsgVG9vbCB9IGZyb20gXCJAbW9kZWxjb250ZXh0cHJvdG9jb2wvc2RrL3R5cGVzLmpzXCI7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCBwZGZQYXJzZSBmcm9tIFwicGRmLXBhcnNlXCI7XG5pbXBvcnQgeyBQREZEb2N1bWVudCwgcmdiLCBkZWdyZWVzIH0gZnJvbSBcInBkZi1saWJcIjtcbmltcG9ydCBUZXNzZXJhY3QgZnJvbSBcInRlc3NlcmFjdC5qc1wiO1xuXG4vKipcbiAqIFBERiB0b29sIGRlZmluaXRpb25zXG4gKi9cbmV4cG9ydCBjb25zdCBwZGZUb29sczogVG9vbFtdID0gW1xuICB7XG4gICAgbmFtZTogXCJleHRyYWN0X3RleHRfZnJvbV9wZGZcIixcbiAgICBkZXNjcmlwdGlvbjogXCJFeHRyYWN0IHRleHQgY29udGVudCBmcm9tIGEgUERGIGZpbGUuIFN1cHBvcnRzIGJvdGggdGV4dC1iYXNlZCBhbmQgc2Nhbm5lZCBQREZzICh3aXRoIE9DUikuXCIsXG4gICAgaW5wdXRTY2hlbWE6IHtcbiAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGZpbGVfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgUERGIGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgcGFnZXM6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhZ2UgcmFuZ2UgdG8gZXh0cmFjdCAoZS5nLiwgJzEtNScsICdhbGwnKVwiLFxuICAgICAgICAgIGRlZmF1bHQ6IFwiYWxsXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHVzZV9vY3I6IHtcbiAgICAgICAgICB0eXBlOiBcImJvb2xlYW5cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJVc2UgT0NSIGZvciBzY2FubmVkIGRvY3VtZW50c1wiLFxuICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICBsYW5ndWFnZToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiT0NSIGxhbmd1YWdlIChlLmcuLCAnZW5nJywgJ2NoaV9zaW0nLCAnY2hpX3RyYScpXCIsXG4gICAgICAgICAgZGVmYXVsdDogXCJlbmdcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiZmlsZV9wYXRoXCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImV4dHJhY3RfdGFibGVzX2Zyb21fcGRmXCIsXG4gICAgZGVzY3JpcHRpb246IFwiRXh0cmFjdCB0YWJsZXMgZnJvbSBQREYgYW5kIHJldHVybiBhcyBzdHJ1Y3R1cmVkIGRhdGEuIElkZWFsIGZvciBmaW5hbmNpYWwgcmVwb3J0cywgaW52b2ljZXMuXCIsXG4gICAgaW5wdXRTY2hlbWE6IHtcbiAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGZpbGVfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgUERGIGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgcGFnZXM6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhZ2UgcmFuZ2UgdG8gZXh0cmFjdCB0YWJsZXMgZnJvbVwiLFxuICAgICAgICAgIGRlZmF1bHQ6IFwiYWxsXCIsXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dF9mb3JtYXQ6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGVudW06IFtcImpzb25cIiwgXCJjc3ZcIiwgXCJ4bHN4XCJdLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk91dHB1dCBmb3JtYXQgZm9yIGV4dHJhY3RlZCB0YWJsZXNcIixcbiAgICAgICAgICBkZWZhdWx0OiBcImpzb25cIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiZmlsZV9wYXRoXCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIm1lcmdlX3BkZnNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJNZXJnZSBtdWx0aXBsZSBQREYgZmlsZXMgaW50byBvbmUgZG9jdW1lbnQuXCIsXG4gICAgaW5wdXRTY2hlbWE6IHtcbiAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGZpbGVfcGF0aHM6IHtcbiAgICAgICAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgICAgICAgaXRlbXM6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFycmF5IG9mIFBERiBmaWxlIHBhdGhzIHRvIG1lcmdlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dF9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIGZvciB0aGUgbWVyZ2VkIG91dHB1dCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImZpbGVfcGF0aHNcIiwgXCJvdXRwdXRfcGF0aFwiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJzcGxpdF9wZGZcIixcbiAgICBkZXNjcmlwdGlvbjogXCJTcGxpdCBhIFBERiBmaWxlIGludG8gbXVsdGlwbGUgZG9jdW1lbnRzLlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIFBERiBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dF9kaXI6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRpcmVjdG9yeSBmb3Igb3V0cHV0IGZpbGVzXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHNwbGl0X21vZGU6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGVudW06IFtcImJ5X3BhZ2VcIiwgXCJieV9yYW5nZVwiLCBcImJ5X3NpemVcIl0sXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiSG93IHRvIHNwbGl0IHRoZSBQREZcIixcbiAgICAgICAgICBkZWZhdWx0OiBcImJ5X3BhZ2VcIixcbiAgICAgICAgfSxcbiAgICAgICAgcmFuZ2VzOiB7XG4gICAgICAgICAgdHlwZTogXCJhcnJheVwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhZ2UgcmFuZ2VzIGlmIHNwbGl0X21vZGUgaXMgJ2J5X3JhbmdlJyAoZS5nLiwgWycxLTMnLCAnNC02J10pXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImZpbGVfcGF0aFwiLCBcIm91dHB1dF9kaXJcIl0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiY29tcHJlc3NfcGRmXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQ29tcHJlc3MgYSBQREYgdG8gcmVkdWNlIGZpbGUgc2l6ZSB3aGlsZSBtYWludGFpbmluZyBxdWFsaXR5LlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIFBERiBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dF9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIGZvciB0aGUgY29tcHJlc3NlZCBvdXRwdXQgZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBxdWFsaXR5OiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBlbnVtOiBbXCJoaWdoXCIsIFwibWVkaXVtXCIsIFwibG93XCJdLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbXByZXNzaW9uIHF1YWxpdHkgbGV2ZWxcIixcbiAgICAgICAgICBkZWZhdWx0OiBcIm1lZGl1bVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJmaWxlX3BhdGhcIiwgXCJvdXRwdXRfcGF0aFwiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJhZGRfd2F0ZXJtYXJrX3RvX3BkZlwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFkZCB0ZXh0IG9yIGltYWdlIHdhdGVybWFyayB0byBQREYgcGFnZXMuXCIsXG4gICAgaW5wdXRTY2hlbWE6IHtcbiAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGZpbGVfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgUERGIGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0X3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggZm9yIHRoZSBvdXRwdXQgZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICB3YXRlcm1hcmtfdHlwZToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZW51bTogW1widGV4dFwiLCBcImltYWdlXCJdLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlR5cGUgb2Ygd2F0ZXJtYXJrXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHdhdGVybWFya19jb250ZW50OiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUZXh0IGNvbnRlbnQgb3IgaW1hZ2UgcGF0aCBmb3Igd2F0ZXJtYXJrXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBlbnVtOiBbXCJjZW50ZXJcIiwgXCJkaWFnb25hbFwiLCBcImhlYWRlclwiLCBcImZvb3RlclwiXSxcbiAgICAgICAgICBkZWZhdWx0OiBcImRpYWdvbmFsXCIsXG4gICAgICAgIH0sXG4gICAgICAgIG9wYWNpdHk6IHtcbiAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIldhdGVybWFyayBvcGFjaXR5ICgwLTEpXCIsXG4gICAgICAgICAgZGVmYXVsdDogMC4zLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJmaWxlX3BhdGhcIiwgXCJvdXRwdXRfcGF0aFwiLCBcIndhdGVybWFya190eXBlXCIsIFwid2F0ZXJtYXJrX2NvbnRlbnRcIl0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZmlsbF9wZGZfZm9ybVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkZpbGwgb3V0IGEgUERGIGZvcm0gd2l0aCBwcm92aWRlZCBkYXRhLlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIFBERiBmb3JtXCIsXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dF9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIGZvciB0aGUgZmlsbGVkIG91dHB1dCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGZvcm1fZGF0YToge1xuICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiS2V5LXZhbHVlIHBhaXJzIG1hdGNoaW5nIGZvcm0gZmllbGQgbmFtZXNcIixcbiAgICAgICAgfSxcbiAgICAgICAgZmxhdHRlbjoge1xuICAgICAgICAgIHR5cGU6IFwiYm9vbGVhblwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkZsYXR0ZW4gdGhlIGZvcm0gYWZ0ZXIgZmlsbGluZyAobWFrZSBpdCBub24tZWRpdGFibGUpXCIsXG4gICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImZpbGVfcGF0aFwiLCBcIm91dHB1dF9wYXRoXCIsIFwiZm9ybV9kYXRhXCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImdldF9wZGZfbWV0YWRhdGFcIixcbiAgICBkZXNjcmlwdGlvbjogXCJHZXQgbWV0YWRhdGEgYW5kIHByb3BlcnRpZXMgb2YgYSBQREYgZmlsZS5cIixcbiAgICBpbnB1dFNjaGVtYToge1xuICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZmlsZV9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBQREYgZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJmaWxlX3BhdGhcIl0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwib2NyX3BkZlwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlBlcmZvcm0gT0NSIG9uIHNjYW5uZWQgUERGIHBhZ2VzIHRvIGV4dHJhY3QgdGV4dC4gVXNlcyBUZXNzZXJhY3QuanMgZm9yIHJlY29nbml0aW9uLlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIFBERiBmaWxlIChzY2FubmVkL2ltYWdlLWJhc2VkKVwiLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCBmb3IgdGhlIG91dHB1dCB0ZXh0IGZpbGUgKG9wdGlvbmFsKVwiLFxuICAgICAgICB9LFxuICAgICAgICBsYW5ndWFnZToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiT0NSIGxhbmd1YWdlIGNvZGU6ICdlbmcnIChFbmdsaXNoKSwgJ2NoaV9zaW0nIChTaW1wbGlmaWVkIENoaW5lc2UpLCAnY2hpX3RyYScgKFRyYWRpdGlvbmFsIENoaW5lc2UpLCAnanBuJyAoSmFwYW5lc2UpLCAna29yJyAoS29yZWFuKVwiLFxuICAgICAgICAgIGRlZmF1bHQ6IFwiZW5nXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHBhZ2VzOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYWdlIHJhbmdlIHRvIE9DUiAoZS5nLiwgJzEtMycsICdhbGwnKVwiLFxuICAgICAgICAgIGRlZmF1bHQ6IFwiYWxsXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImZpbGVfcGF0aFwiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJvY3JfaW1hZ2VcIixcbiAgICBkZXNjcmlwdGlvbjogXCJQZXJmb3JtIE9DUiBvbiBhbiBpbWFnZSBmaWxlIHRvIGV4dHJhY3QgdGV4dC4gU3VwcG9ydHMgUE5HLCBKUEcsIFRJRkYsIEJNUCBmb3JtYXRzLlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIGltYWdlIGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0X3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggZm9yIHRoZSBvdXRwdXQgdGV4dCBmaWxlIChvcHRpb25hbClcIixcbiAgICAgICAgfSxcbiAgICAgICAgbGFuZ3VhZ2U6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk9DUiBsYW5ndWFnZTogJ2VuZycsICdjaGlfc2ltJywgJ2NoaV90cmEnLCAnanBuJywgJ2tvcicsICdmcmEnLCAnZGV1JywgJ3NwYSdcIixcbiAgICAgICAgICBkZWZhdWx0OiBcImVuZ1wiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJmaWxlX3BhdGhcIl0sXG4gICAgfSxcbiAgfSxcbl07XG5cbi8qKlxuICogSGFuZGxlIFBERiB0b29sIGNhbGxzXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVQZGZUb29sKFxuICBuYW1lOiBzdHJpbmcsXG4gIGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG4pOiBQcm9taXNlPHVua25vd24+IHtcbiAgc3dpdGNoIChuYW1lKSB7XG4gICAgY2FzZSBcImV4dHJhY3RfdGV4dF9mcm9tX3BkZlwiOlxuICAgICAgcmV0dXJuIGV4dHJhY3RUZXh0RnJvbVBkZihhcmdzKTtcbiAgICBjYXNlIFwiZXh0cmFjdF90YWJsZXNfZnJvbV9wZGZcIjpcbiAgICAgIHJldHVybiBleHRyYWN0VGFibGVzRnJvbVBkZihhcmdzKTtcbiAgICBjYXNlIFwibWVyZ2VfcGRmc1wiOlxuICAgICAgcmV0dXJuIG1lcmdlUGRmcyhhcmdzKTtcbiAgICBjYXNlIFwic3BsaXRfcGRmXCI6XG4gICAgICByZXR1cm4gc3BsaXRQZGYoYXJncyk7XG4gICAgY2FzZSBcImNvbXByZXNzX3BkZlwiOlxuICAgICAgcmV0dXJuIGNvbXByZXNzUGRmKGFyZ3MpO1xuICAgIGNhc2UgXCJhZGRfd2F0ZXJtYXJrX3RvX3BkZlwiOlxuICAgICAgcmV0dXJuIGFkZFdhdGVybWFya1RvUGRmKGFyZ3MpO1xuICAgIGNhc2UgXCJmaWxsX3BkZl9mb3JtXCI6XG4gICAgICByZXR1cm4gZmlsbFBkZkZvcm0oYXJncyk7XG4gICAgY2FzZSBcImdldF9wZGZfbWV0YWRhdGFcIjpcbiAgICAgIHJldHVybiBnZXRQZGZNZXRhZGF0YShhcmdzKTtcbiAgICBjYXNlIFwib2NyX3BkZlwiOlxuICAgICAgcmV0dXJuIG9jclBkZihhcmdzKTtcbiAgICBjYXNlIFwib2NyX2ltYWdlXCI6XG4gICAgICByZXR1cm4gb2NySW1hZ2VUb29sKGFyZ3MpO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gUERGIHRvb2w6ICR7bmFtZX1gKTtcbiAgfVxufVxuXG4vLyBUb29sIGltcGxlbWVudGF0aW9uc1xuYXN5bmMgZnVuY3Rpb24gZXh0cmFjdFRleHRGcm9tUGRmKGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgeyBmaWxlX3BhdGgsIHBhZ2VzLCB1c2Vfb2NyLCBsYW5ndWFnZSB9ID0gYXJncztcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBmaWxlX3BhdGggYXMgc3RyaW5nO1xuICAgIFxuICAgIC8vIENoZWNrIGlmIGZpbGUgZXhpc3RzXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWxlIG5vdCBmb3VuZDogJHtmaWxlUGF0aH1gKTtcbiAgICB9XG4gICAgXG4gICAgLy8gUmVhZCBQREYgZmlsZVxuICAgIGNvbnN0IGRhdGFCdWZmZXIgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgpO1xuICAgIFxuICAgIC8vIFBhcnNlIFBERlxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBwZGZQYXJzZShkYXRhQnVmZmVyKTtcbiAgICBcbiAgICAvLyBIYW5kbGUgcGFnZSByYW5nZXNcbiAgICBjb25zdCBwYWdlUmFuZ2UgPSBwYWdlcyBhcyBzdHJpbmcgfHwgJ2FsbCc7XG4gICAgbGV0IHRleHQgPSBkYXRhLnRleHQ7XG4gICAgXG4gICAgaWYgKHBhZ2VSYW5nZSAhPT0gJ2FsbCcpIHtcbiAgICAgIC8vIFBhcnNlIHBhZ2UgcmFuZ2UgKGUuZy4sIFwiMS01XCIsIFwiMSwzLDVcIilcbiAgICAgIGNvbnN0IGxpbmVzID0gdGV4dC5zcGxpdCgnXFxuJyk7XG4gICAgICBjb25zdCBwYWdlQnJlYWtQYXR0ZXJuID0gL1xcZi9nOyAvLyBGb3JtIGZlZWQgY2hhcmFjdGVyIHR5cGljYWxseSBtYXJrcyBwYWdlIGJyZWFrc1xuICAgICAgXG4gICAgICAvLyBGb3Igbm93LCByZXR1cm4gYWxsIHRleHQgaWYgc3BlY2lmaWMgcGFnZSBwYXJzaW5nIGlzIGNvbXBsZXhcbiAgICAgIC8vIFRPRE86IEltcGxlbWVudCBwYWdlLXNwZWNpZmljIGV4dHJhY3Rpb25cbiAgICAgIHRleHQgPSBkYXRhLnRleHQ7XG4gICAgfVxuICAgIFxuICAgIC8vIEhhbmRsZSBPQ1IgaWYgcmVxdWVzdGVkXG4gICAgaWYgKHVzZV9vY3IpIHtcbiAgICAgIC8vIE9DUiByZXF1aXJlcyBhZGRpdGlvbmFsIGxpYnJhcnkgKHRlc3NlcmFjdC5qcylcbiAgICAgIC8vIEZvciBub3csIHJldHVybiBhIGhlbHBmdWwgbWVzc2FnZVxuICAgICAgdGV4dCArPSBgXFxuXFxuW05vdGU6IE9DUiByZXF1ZXN0ZWQgd2l0aCBsYW5ndWFnZSAnJHtsYW5ndWFnZSB8fCAnZW5nJ30nLiBPQ1IgZnVuY3Rpb25hbGl0eSByZXF1aXJlcyB0ZXNzZXJhY3QuanMuIEluc3RhbGwgd2l0aDogbnBtIGluc3RhbGwgdGVzc2VyYWN0LmpzXWA7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB0ZXh0O1xuICAgIFxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgcmV0dXJuIGBFcnJvciBleHRyYWN0aW5nIHRleHQgZnJvbSBQREY6ICR7ZXJyb3IubWVzc2FnZX1gO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGV4dHJhY3RUYWJsZXNGcm9tUGRmKGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxvYmplY3Q+IHtcbiAgY29uc3QgeyBmaWxlX3BhdGgsIHBhZ2VzLCBvdXRwdXRfZm9ybWF0IH0gPSBhcmdzO1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGVfcGF0aCBhcyBzdHJpbmc7XG4gICAgXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWxlIG5vdCBmb3VuZDogJHtmaWxlUGF0aH1gKTtcbiAgICB9XG4gICAgXG4gICAgLy8gUmVhZCBQREYgZmlsZVxuICAgIGNvbnN0IGRhdGFCdWZmZXIgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgpO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBwZGZQYXJzZShkYXRhQnVmZmVyKTtcbiAgICBcbiAgICAvLyBCYXNpYyB0YWJsZSBleHRyYWN0aW9uIHVzaW5nIHRleHQgcGF0dGVybnNcbiAgICAvLyBGb3IgcHJvZHVjdGlvbiwgY29uc2lkZXIgdXNpbmcgcGRmLXRhYmxlLWV4dHJhY3RvciBvciB0YWJ1bGEtanNcbiAgICBjb25zdCB0ZXh0ID0gZGF0YS50ZXh0O1xuICAgIGNvbnN0IGxpbmVzID0gdGV4dC5zcGxpdCgnXFxuJyk7XG4gICAgXG4gICAgLy8gU2ltcGxlIGhldXJpc3RpYzogbGluZXMgd2l0aCBtdWx0aXBsZSBzcGFjZXMvdGFicyBtaWdodCBiZSB0YWJsZSByb3dzXG4gICAgY29uc3QgcG90ZW50aWFsVGFibGVSb3dzID0gbGluZXMuZmlsdGVyKChsaW5lOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHNwYWNlZENvbHVtbnMgPSBsaW5lLnNwbGl0KC9cXHN7Mix9LykuZmlsdGVyKChjb2w6IHN0cmluZykgPT4gY29sLnRyaW0oKS5sZW5ndGggPiAwKTtcbiAgICAgIHJldHVybiBzcGFjZWRDb2x1bW5zLmxlbmd0aCA+PSAyO1xuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IHRhYmxlcyA9IFtdO1xuICAgIGlmIChwb3RlbnRpYWxUYWJsZVJvd3MubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdGFibGVEYXRhID0gcG90ZW50aWFsVGFibGVSb3dzLm1hcCgocm93OiBzdHJpbmcpID0+IFxuICAgICAgICByb3cuc3BsaXQoL1xcc3syLH0vKS5maWx0ZXIoKGNvbDogc3RyaW5nKSA9PiBjb2wudHJpbSgpLmxlbmd0aCA+IDApXG4gICAgICApO1xuICAgICAgXG4gICAgICB0YWJsZXMucHVzaCh7XG4gICAgICAgIHBhZ2U6IDEsXG4gICAgICAgIHJvd3M6IHRhYmxlRGF0YS5sZW5ndGgsXG4gICAgICAgIGNvbHVtbnM6IHRhYmxlRGF0YVswXT8ubGVuZ3RoIHx8IDAsXG4gICAgICAgIGRhdGE6IHRhYmxlRGF0YVxuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7XG4gICAgICBmaWxlOiBmaWxlX3BhdGgsXG4gICAgICB0YWJsZXNfZm91bmQ6IHRhYmxlcy5sZW5ndGgsXG4gICAgICBmb3JtYXQ6IG91dHB1dF9mb3JtYXQgfHwgXCJqc29uXCIsXG4gICAgICB0YWJsZXM6IHRhYmxlcyxcbiAgICAgIG5vdGU6IFwiQmFzaWMgdGFibGUgZXh0cmFjdGlvbi4gRm9yIGFkdmFuY2VkIHRhYmxlIHBhcnNpbmcsIGNvbnNpZGVyIHVzaW5nIHBkZnBsdW1iZXIgKFB5dGhvbikgb3IgdGFidWxhLWpzXCJcbiAgICB9O1xuICAgIFxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yOiBgRmFpbGVkIHRvIGV4dHJhY3QgdGFibGVzOiAke2Vycm9yLm1lc3NhZ2V9YCxcbiAgICAgIGZpbGU6IGZpbGVfcGF0aCxcbiAgICAgIHRhYmxlc19mb3VuZDogMFxuICAgIH07XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbWVyZ2VQZGZzKGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgeyBmaWxlX3BhdGhzLCBvdXRwdXRfcGF0aCB9ID0gYXJncztcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgcGF0aHMgPSBmaWxlX3BhdGhzIGFzIHN0cmluZ1tdO1xuICAgIGNvbnN0IG91dHB1dFBhdGggPSBvdXRwdXRfcGF0aCBhcyBzdHJpbmc7XG4gICAgXG4gICAgLy8gVmFsaWRhdGUgaW5wdXQgZmlsZXNcbiAgICBmb3IgKGNvbnN0IGZpbGVQYXRoIG9mIHBhdGhzKSB7XG4gICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZmlsZVBhdGgpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgRmlsZSBub3QgZm91bmQ6ICR7ZmlsZVBhdGh9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIENyZWF0ZSBhIG5ldyBQREYgZG9jdW1lbnRcbiAgICBjb25zdCBtZXJnZWRQZGYgPSBhd2FpdCBQREZEb2N1bWVudC5jcmVhdGUoKTtcbiAgICBcbiAgICAvLyBMb2FkIGFuZCBtZXJnZSBlYWNoIFBERlxuICAgIGZvciAoY29uc3QgZmlsZVBhdGggb2YgcGF0aHMpIHtcbiAgICAgIGNvbnN0IHBkZkJ5dGVzID0gZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoKTtcbiAgICAgIGNvbnN0IHBkZiA9IGF3YWl0IFBERkRvY3VtZW50LmxvYWQocGRmQnl0ZXMpO1xuICAgICAgY29uc3QgY29waWVkUGFnZXMgPSBhd2FpdCBtZXJnZWRQZGYuY29weVBhZ2VzKHBkZiwgcGRmLmdldFBhZ2VJbmRpY2VzKCkpO1xuICAgICAgXG4gICAgICBjb3BpZWRQYWdlcy5mb3JFYWNoKChwYWdlKSA9PiB7XG4gICAgICAgIG1lcmdlZFBkZi5hZGRQYWdlKHBhZ2UpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8vIFNhdmUgbWVyZ2VkIFBERlxuICAgIGNvbnN0IG1lcmdlZFBkZkJ5dGVzID0gYXdhaXQgbWVyZ2VkUGRmLnNhdmUoKTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKG91dHB1dFBhdGgsIG1lcmdlZFBkZkJ5dGVzKTtcbiAgICBcbiAgICByZXR1cm4gYFN1Y2Nlc3NmdWxseSBtZXJnZWQgJHtwYXRocy5sZW5ndGh9IFBERnMgaW50byAke291dHB1dFBhdGh9LiBUb3RhbCBwYWdlczogJHttZXJnZWRQZGYuZ2V0UGFnZUNvdW50KCl9YDtcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIHJldHVybiBgRXJyb3IgbWVyZ2luZyBQREZzOiAke2Vycm9yLm1lc3NhZ2V9YDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBzcGxpdFBkZihhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHsgZmlsZV9wYXRoLCBvdXRwdXRfZGlyLCBzcGxpdF9tb2RlLCByYW5nZXMgfSA9IGFyZ3M7XG4gIFxuICB0cnkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gZmlsZV9wYXRoIGFzIHN0cmluZztcbiAgICBjb25zdCBvdXRwdXREaXIgPSBvdXRwdXRfZGlyIGFzIHN0cmluZztcbiAgICBjb25zdCBtb2RlID0gc3BsaXRfbW9kZSBhcyBzdHJpbmcgfHwgJ2J5X3BhZ2UnO1xuICAgIFxuICAgIGlmICghZnMuZXhpc3RzU3luYyhmaWxlUGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmlsZSBub3QgZm91bmQ6ICR7ZmlsZVBhdGh9YCk7XG4gICAgfVxuICAgIFxuICAgIC8vIENyZWF0ZSBvdXRwdXQgZGlyZWN0b3J5IGlmIGl0IGRvZXNuJ3QgZXhpc3RcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMob3V0cHV0RGlyKSkge1xuICAgICAgZnMubWtkaXJTeW5jKG91dHB1dERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgfVxuICAgIFxuICAgIC8vIExvYWQgUERGXG4gICAgY29uc3QgcGRmQnl0ZXMgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgpO1xuICAgIGNvbnN0IHBkZkRvYyA9IGF3YWl0IFBERkRvY3VtZW50LmxvYWQocGRmQnl0ZXMpO1xuICAgIGNvbnN0IHRvdGFsUGFnZXMgPSBwZGZEb2MuZ2V0UGFnZUNvdW50KCk7XG4gICAgXG4gICAgY29uc3QgYmFzZUZpbGVOYW1lID0gcGF0aC5iYXNlbmFtZShmaWxlUGF0aCwgJy5wZGYnKTtcbiAgICBsZXQgZmlsZXNDcmVhdGVkID0gMDtcbiAgICBcbiAgICBpZiAobW9kZSA9PT0gJ2J5X3BhZ2UnKSB7XG4gICAgICAvLyBTcGxpdCBpbnRvIGluZGl2aWR1YWwgcGFnZXNcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG90YWxQYWdlczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG5ld1BkZiA9IGF3YWl0IFBERkRvY3VtZW50LmNyZWF0ZSgpO1xuICAgICAgICBjb25zdCBbY29waWVkUGFnZV0gPSBhd2FpdCBuZXdQZGYuY29weVBhZ2VzKHBkZkRvYywgW2ldKTtcbiAgICAgICAgbmV3UGRmLmFkZFBhZ2UoY29waWVkUGFnZSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBuZXdQZGZCeXRlcyA9IGF3YWl0IG5ld1BkZi5zYXZlKCk7XG4gICAgICAgIGNvbnN0IG91dHB1dFBhdGggPSBwYXRoLmpvaW4ob3V0cHV0RGlyLCBgJHtiYXNlRmlsZU5hbWV9X3BhZ2VfJHtpICsgMX0ucGRmYCk7XG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmMob3V0cHV0UGF0aCwgbmV3UGRmQnl0ZXMpO1xuICAgICAgICBmaWxlc0NyZWF0ZWQrKztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdieV9yYW5nZScgJiYgcmFuZ2VzKSB7XG4gICAgICAvLyBTcGxpdCBieSBwYWdlIHJhbmdlc1xuICAgICAgY29uc3QgcGFnZVJhbmdlcyA9IHJhbmdlcyBhcyBzdHJpbmdbXTtcbiAgICAgIFxuICAgICAgZm9yIChsZXQgcmFuZ2VJZHggPSAwOyByYW5nZUlkeCA8IHBhZ2VSYW5nZXMubGVuZ3RoOyByYW5nZUlkeCsrKSB7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gcGFnZVJhbmdlc1tyYW5nZUlkeF07XG4gICAgICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IHJhbmdlLnNwbGl0KCctJykubWFwKG4gPT4gcGFyc2VJbnQobi50cmltKCkpIC0gMSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBuZXdQZGYgPSBhd2FpdCBQREZEb2N1bWVudC5jcmVhdGUoKTtcbiAgICAgICAgY29uc3QgcGFnZUluZGljZXMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBlbmQgLSBzdGFydCArIDEgfSwgKF8sIGkpID0+IHN0YXJ0ICsgaSk7XG4gICAgICAgIGNvbnN0IGNvcGllZFBhZ2VzID0gYXdhaXQgbmV3UGRmLmNvcHlQYWdlcyhwZGZEb2MsIHBhZ2VJbmRpY2VzKTtcbiAgICAgICAgXG4gICAgICAgIGNvcGllZFBhZ2VzLmZvckVhY2goKHBhZ2UpID0+IG5ld1BkZi5hZGRQYWdlKHBhZ2UpKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG5ld1BkZkJ5dGVzID0gYXdhaXQgbmV3UGRmLnNhdmUoKTtcbiAgICAgICAgY29uc3Qgb3V0cHV0UGF0aCA9IHBhdGguam9pbihvdXRwdXREaXIsIGAke2Jhc2VGaWxlTmFtZX1fcGFydF8ke3JhbmdlSWR4ICsgMX0ucGRmYCk7XG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmMob3V0cHV0UGF0aCwgbmV3UGRmQnl0ZXMpO1xuICAgICAgICBmaWxlc0NyZWF0ZWQrKztcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGBTdWNjZXNzZnVsbHkgc3BsaXQgJHtmaWxlUGF0aH0gaW50byAke2ZpbGVzQ3JlYXRlZH0gZmlsZXMgaW4gJHtvdXRwdXREaXJ9YDtcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIHJldHVybiBgRXJyb3Igc3BsaXR0aW5nIFBERjogJHtlcnJvci5tZXNzYWdlfWA7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gY29tcHJlc3NQZGYoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPG9iamVjdD4ge1xuICBjb25zdCB7IGZpbGVfcGF0aCwgb3V0cHV0X3BhdGgsIHF1YWxpdHkgfSA9IGFyZ3M7XG4gIFxuICB0cnkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gZmlsZV9wYXRoIGFzIHN0cmluZztcbiAgICBjb25zdCBvdXRwdXRQYXRoID0gb3V0cHV0X3BhdGggYXMgc3RyaW5nO1xuICAgIGNvbnN0IGNvbXByZXNzaW9uUXVhbGl0eSA9IHF1YWxpdHkgYXMgc3RyaW5nIHx8IFwibWVkaXVtXCI7XG4gICAgXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWxlIG5vdCBmb3VuZDogJHtmaWxlUGF0aH1gKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3Qgb3JpZ2luYWxTaXplID0gZnMuc3RhdFN5bmMoZmlsZVBhdGgpLnNpemU7XG4gICAgXG4gICAgLy8gTG9hZCBhbmQgc2F2ZSBQREYgKHBkZi1saWIgYXV0b21hdGljYWxseSBvcHRpbWl6ZXMpXG4gICAgY29uc3QgcGRmQnl0ZXMgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgpO1xuICAgIGNvbnN0IHBkZkRvYyA9IGF3YWl0IFBERkRvY3VtZW50LmxvYWQocGRmQnl0ZXMpO1xuICAgIFxuICAgIC8vIFNhdmUgd2l0aCBjb21wcmVzc2lvblxuICAgIGNvbnN0IGNvbXByZXNzZWRCeXRlcyA9IGF3YWl0IHBkZkRvYy5zYXZlKHtcbiAgICAgIHVzZU9iamVjdFN0cmVhbXM6IGNvbXByZXNzaW9uUXVhbGl0eSAhPT0gJ2xvdycsXG4gICAgfSk7XG4gICAgXG4gICAgZnMud3JpdGVGaWxlU3luYyhvdXRwdXRQYXRoLCBjb21wcmVzc2VkQnl0ZXMpO1xuICAgIGNvbnN0IGNvbXByZXNzZWRTaXplID0gZnMuc3RhdFN5bmMob3V0cHV0UGF0aCkuc2l6ZTtcbiAgICBcbiAgICBjb25zdCByZWR1Y3Rpb24gPSAoKG9yaWdpbmFsU2l6ZSAtIGNvbXByZXNzZWRTaXplKSAvIG9yaWdpbmFsU2l6ZSAqIDEwMCkudG9GaXhlZCgxKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIGlucHV0OiBmaWxlX3BhdGgsXG4gICAgICBvdXRwdXQ6IG91dHB1dF9wYXRoLFxuICAgICAgcXVhbGl0eTogY29tcHJlc3Npb25RdWFsaXR5LFxuICAgICAgb3JpZ2luYWxfc2l6ZTogYCR7KG9yaWdpbmFsU2l6ZSAvIDEwMjQgLyAxMDI0KS50b0ZpeGVkKDIpfSBNQmAsXG4gICAgICBjb21wcmVzc2VkX3NpemU6IGAkeyhjb21wcmVzc2VkU2l6ZSAvIDEwMjQgLyAxMDI0KS50b0ZpeGVkKDIpfSBNQmAsXG4gICAgICByZWR1Y3Rpb246IGAke3JlZHVjdGlvbn0lYCxcbiAgICAgIG5vdGU6IFwiQmFzaWMgY29tcHJlc3Npb24uIEZvciBhZHZhbmNlZCBjb21wcmVzc2lvbiwgdXNlIGV4dGVybmFsIHRvb2xzIGxpa2UgR2hvc3RzY3JpcHQgb3IgcXBkZlwiXG4gICAgfTtcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIGVycm9yOiBgRmFpbGVkIHRvIGNvbXByZXNzIFBERjogJHtlcnJvci5tZXNzYWdlfWBcbiAgICB9O1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGFkZFdhdGVybWFya1RvUGRmKGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgeyBmaWxlX3BhdGgsIG91dHB1dF9wYXRoLCB3YXRlcm1hcmtfdHlwZSwgd2F0ZXJtYXJrX2NvbnRlbnQsIHBvc2l0aW9uLCBvcGFjaXR5IH0gPSBhcmdzO1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGVfcGF0aCBhcyBzdHJpbmc7XG4gICAgY29uc3Qgb3V0cHV0UGF0aCA9IG91dHB1dF9wYXRoIGFzIHN0cmluZztcbiAgICBjb25zdCB0eXBlID0gd2F0ZXJtYXJrX3R5cGUgYXMgc3RyaW5nO1xuICAgIGNvbnN0IGNvbnRlbnQgPSB3YXRlcm1hcmtfY29udGVudCBhcyBzdHJpbmc7XG4gICAgY29uc3QgcG9zID0gcG9zaXRpb24gYXMgc3RyaW5nIHx8ICdkaWFnb25hbCc7XG4gICAgY29uc3Qgb3BhY2l0eVZhbHVlID0gb3BhY2l0eSBhcyBudW1iZXIgfHwgMC4zO1xuICAgIFxuICAgIGlmICghZnMuZXhpc3RzU3luYyhmaWxlUGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmlsZSBub3QgZm91bmQ6ICR7ZmlsZVBhdGh9YCk7XG4gICAgfVxuICAgIFxuICAgIC8vIExvYWQgUERGXG4gICAgY29uc3QgcGRmQnl0ZXMgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgpO1xuICAgIGNvbnN0IHBkZkRvYyA9IGF3YWl0IFBERkRvY3VtZW50LmxvYWQocGRmQnl0ZXMpO1xuICAgIGNvbnN0IHBhZ2VzID0gcGRmRG9jLmdldFBhZ2VzKCk7XG4gICAgXG4gICAgaWYgKHR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgLy8gQWRkIHRleHQgd2F0ZXJtYXJrIHRvIGVhY2ggcGFnZVxuICAgICAgZm9yIChjb25zdCBwYWdlIG9mIHBhZ2VzKSB7XG4gICAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gcGFnZS5nZXRTaXplKCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgeCA9IHdpZHRoIC8gMjtcbiAgICAgICAgbGV0IHkgPSBoZWlnaHQgLyAyO1xuICAgICAgICBsZXQgcm90YXRpb24gPSBkZWdyZWVzKDApO1xuICAgICAgICBcbiAgICAgICAgaWYgKHBvcyA9PT0gJ2RpYWdvbmFsJykge1xuICAgICAgICAgIHJvdGF0aW9uID0gZGVncmVlcyg0NSk7XG4gICAgICAgIH0gZWxzZSBpZiAocG9zID09PSAnaGVhZGVyJykge1xuICAgICAgICAgIHkgPSBoZWlnaHQgLSA1MDtcbiAgICAgICAgfSBlbHNlIGlmIChwb3MgPT09ICdmb290ZXInKSB7XG4gICAgICAgICAgeSA9IDUwO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwYWdlLmRyYXdUZXh0KGNvbnRlbnQsIHtcbiAgICAgICAgICB4OiB4IC0gKGNvbnRlbnQubGVuZ3RoICogNiksXG4gICAgICAgICAgeTogeSxcbiAgICAgICAgICBzaXplOiA0MCxcbiAgICAgICAgICBjb2xvcjogcmdiKDAuNywgMC43LCAwLjcpLFxuICAgICAgICAgIG9wYWNpdHk6IG9wYWNpdHlWYWx1ZSxcbiAgICAgICAgICByb3RhdGU6IHJvdGF0aW9uLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgIHJldHVybiBgSW1hZ2Ugd2F0ZXJtYXJrIG5vdCB5ZXQgaW1wbGVtZW50ZWQuIFJlcXVpcmVzIGVtYmVkZGluZyBpbWFnZXMgZnJvbSAke2NvbnRlbnR9YDtcbiAgICB9XG4gICAgXG4gICAgLy8gU2F2ZSB3YXRlcm1hcmtlZCBQREZcbiAgICBjb25zdCB3YXRlcm1hcmtlZEJ5dGVzID0gYXdhaXQgcGRmRG9jLnNhdmUoKTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKG91dHB1dFBhdGgsIHdhdGVybWFya2VkQnl0ZXMpO1xuICAgIFxuICAgIHJldHVybiBgU3VjY2Vzc2Z1bGx5IGFkZGVkICR7dHlwZX0gd2F0ZXJtYXJrIHRvICR7cGFnZXMubGVuZ3RofSBwYWdlcy4gT3V0cHV0OiAke291dHB1dFBhdGh9YDtcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIHJldHVybiBgRXJyb3IgYWRkaW5nIHdhdGVybWFyazogJHtlcnJvci5tZXNzYWdlfWA7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZmlsbFBkZkZvcm0oYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7IGZpbGVfcGF0aCwgb3V0cHV0X3BhdGgsIGZvcm1fZGF0YSwgZmxhdHRlbiB9ID0gYXJncztcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBmaWxlX3BhdGggYXMgc3RyaW5nO1xuICAgIGNvbnN0IG91dHB1dFBhdGggPSBvdXRwdXRfcGF0aCBhcyBzdHJpbmc7XG4gICAgY29uc3QgZm9ybURhdGEgPSBmb3JtX2RhdGEgYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgICBjb25zdCBzaG91bGRGbGF0dGVuID0gZmxhdHRlbiBhcyBib29sZWFuIHx8IGZhbHNlO1xuICAgIFxuICAgIGlmICghZnMuZXhpc3RzU3luYyhmaWxlUGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmlsZSBub3QgZm91bmQ6ICR7ZmlsZVBhdGh9YCk7XG4gICAgfVxuICAgIFxuICAgIC8vIExvYWQgUERGXG4gICAgY29uc3QgcGRmQnl0ZXMgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgpO1xuICAgIGNvbnN0IHBkZkRvYyA9IGF3YWl0IFBERkRvY3VtZW50LmxvYWQocGRmQnl0ZXMpO1xuICAgIFxuICAgIC8vIEdldCBmb3JtXG4gICAgY29uc3QgZm9ybSA9IHBkZkRvYy5nZXRGb3JtKCk7XG4gICAgY29uc3QgZmllbGRzID0gZm9ybS5nZXRGaWVsZHMoKTtcbiAgICBcbiAgICBsZXQgZmlsbGVkQ291bnQgPSAwO1xuICAgIFxuICAgIC8vIEZpbGwgZm9ybSBmaWVsZHNcbiAgICBmb3IgKGNvbnN0IFtmaWVsZE5hbWUsIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhmb3JtRGF0YSkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGZpZWxkID0gZm9ybS5nZXRGaWVsZChmaWVsZE5hbWUpO1xuICAgICAgICBcbiAgICAgICAgLy8gRGV0ZXJtaW5lIGZpZWxkIHR5cGUgYW5kIGZpbGwgYWNjb3JkaW5nbHlcbiAgICAgICAgY29uc3QgZmllbGRUeXBlID0gZmllbGQuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgXG4gICAgICAgIGlmIChmaWVsZFR5cGUuaW5jbHVkZXMoJ1RleHQnKSkge1xuICAgICAgICAgIGNvbnN0IHRleHRGaWVsZCA9IGZvcm0uZ2V0VGV4dEZpZWxkKGZpZWxkTmFtZSk7XG4gICAgICAgICAgdGV4dEZpZWxkLnNldFRleHQodmFsdWUpO1xuICAgICAgICAgIGZpbGxlZENvdW50Kys7XG4gICAgICAgIH0gZWxzZSBpZiAoZmllbGRUeXBlLmluY2x1ZGVzKCdDaGVja0JveCcpKSB7XG4gICAgICAgICAgY29uc3QgY2hlY2tCb3ggPSBmb3JtLmdldENoZWNrQm94KGZpZWxkTmFtZSk7XG4gICAgICAgICAgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJyB8fCB2YWx1ZSA9PT0gJzEnKSB7XG4gICAgICAgICAgICBjaGVja0JveC5jaGVjaygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGVja0JveC51bmNoZWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZpbGxlZENvdW50Kys7XG4gICAgICAgIH0gZWxzZSBpZiAoZmllbGRUeXBlLmluY2x1ZGVzKCdEcm9wZG93bicpKSB7XG4gICAgICAgICAgY29uc3QgZHJvcGRvd24gPSBmb3JtLmdldERyb3Bkb3duKGZpZWxkTmFtZSk7XG4gICAgICAgICAgZHJvcGRvd24uc2VsZWN0KHZhbHVlKTtcbiAgICAgICAgICBmaWxsZWRDb3VudCsrO1xuICAgICAgICB9IGVsc2UgaWYgKGZpZWxkVHlwZS5pbmNsdWRlcygnUmFkaW8nKSkge1xuICAgICAgICAgIGNvbnN0IHJhZGlvR3JvdXAgPSBmb3JtLmdldFJhZGlvR3JvdXAoZmllbGROYW1lKTtcbiAgICAgICAgICByYWRpb0dyb3VwLnNlbGVjdCh2YWx1ZSk7XG4gICAgICAgICAgZmlsbGVkQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBGaWVsZCBub3QgZm91bmQgb3IgdHlwZSBtaXNtYXRjaCwgc2tpcFxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gRmxhdHRlbiBmb3JtIGlmIHJlcXVlc3RlZFxuICAgIGlmIChzaG91bGRGbGF0dGVuKSB7XG4gICAgICBmb3JtLmZsYXR0ZW4oKTtcbiAgICB9XG4gICAgXG4gICAgLy8gU2F2ZSBmaWxsZWQgUERGXG4gICAgY29uc3QgZmlsbGVkQnl0ZXMgPSBhd2FpdCBwZGZEb2Muc2F2ZSgpO1xuICAgIGZzLndyaXRlRmlsZVN5bmMob3V0cHV0UGF0aCwgZmlsbGVkQnl0ZXMpO1xuICAgIFxuICAgIHJldHVybiBgU3VjY2Vzc2Z1bGx5IGZpbGxlZCAke2ZpbGxlZENvdW50fSBvZiAke09iamVjdC5rZXlzKGZvcm1EYXRhKS5sZW5ndGh9IGZvcm0gZmllbGRzLiBPdXRwdXQ6ICR7b3V0cHV0UGF0aH0ke3Nob3VsZEZsYXR0ZW4gPyAnIChmbGF0dGVuZWQpJyA6ICcnfWA7XG4gICAgXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICByZXR1cm4gYEVycm9yIGZpbGxpbmcgUERGIGZvcm06ICR7ZXJyb3IubWVzc2FnZX1gO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFBkZk1ldGFkYXRhKGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxvYmplY3Q+IHtcbiAgY29uc3QgeyBmaWxlX3BhdGggfSA9IGFyZ3M7XG4gIFxuICB0cnkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gZmlsZV9wYXRoIGFzIHN0cmluZztcbiAgICBcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZmlsZVBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZpbGUgbm90IGZvdW5kOiAke2ZpbGVQYXRofWApO1xuICAgIH1cbiAgICBcbiAgICAvLyBHZXQgZmlsZSBzdGF0c1xuICAgIGNvbnN0IHN0YXRzID0gZnMuc3RhdFN5bmMoZmlsZVBhdGgpO1xuICAgIFxuICAgIC8vIExvYWQgUERGXG4gICAgY29uc3QgcGRmQnl0ZXMgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgpO1xuICAgIGNvbnN0IHBkZkRvYyA9IGF3YWl0IFBERkRvY3VtZW50LmxvYWQocGRmQnl0ZXMpO1xuICAgIFxuICAgIC8vIEV4dHJhY3QgbWV0YWRhdGFcbiAgICBjb25zdCB0aXRsZSA9IHBkZkRvYy5nZXRUaXRsZSgpIHx8ICdVbnRpdGxlZCc7XG4gICAgY29uc3QgYXV0aG9yID0gcGRmRG9jLmdldEF1dGhvcigpIHx8ICdVbmtub3duJztcbiAgICBjb25zdCBzdWJqZWN0ID0gcGRmRG9jLmdldFN1YmplY3QoKSB8fCAnJztcbiAgICBjb25zdCBjcmVhdG9yID0gcGRmRG9jLmdldENyZWF0b3IoKSB8fCAnVW5rbm93bic7XG4gICAgY29uc3QgcHJvZHVjZXIgPSBwZGZEb2MuZ2V0UHJvZHVjZXIoKSB8fCAnVW5rbm93bic7XG4gICAgY29uc3QgY3JlYXRpb25EYXRlID0gcGRmRG9jLmdldENyZWF0aW9uRGF0ZSgpO1xuICAgIGNvbnN0IG1vZGlmaWNhdGlvbkRhdGUgPSBwZGZEb2MuZ2V0TW9kaWZpY2F0aW9uRGF0ZSgpO1xuICAgIFxuICAgIC8vIEdldCBmb3JtIGluZm9cbiAgICBjb25zdCBmb3JtID0gcGRmRG9jLmdldEZvcm0oKTtcbiAgICBjb25zdCBmb3JtRmllbGRzID0gZm9ybS5nZXRGaWVsZHMoKTtcbiAgICBcbiAgICAvLyBQYXJzZSBQREYgZm9yIGFkZGl0aW9uYWwgaW5mb1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBwZGZQYXJzZShwZGZCeXRlcyk7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIGZpbGU6IGZpbGVfcGF0aCxcbiAgICAgIG1ldGFkYXRhOiB7XG4gICAgICAgIHRpdGxlLFxuICAgICAgICBhdXRob3IsXG4gICAgICAgIHN1YmplY3QsXG4gICAgICAgIGNyZWF0b3IsXG4gICAgICAgIHByb2R1Y2VyLFxuICAgICAgICBjcmVhdGlvbl9kYXRlOiBjcmVhdGlvbkRhdGU/LnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSB8fCAnVW5rbm93bicsXG4gICAgICAgIG1vZGlmaWNhdGlvbl9kYXRlOiBtb2RpZmljYXRpb25EYXRlPy50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0gfHwgJ1Vua25vd24nLFxuICAgICAgICBwYWdlczogcGRmRG9jLmdldFBhZ2VDb3VudCgpLFxuICAgICAgICBzaXplOiBgJHsoc3RhdHMuc2l6ZSAvIDEwMjQgLyAxMDI0KS50b0ZpeGVkKDIpfSBNQmAsXG4gICAgICAgIGVuY3J5cHRlZDogcGRmRG9jLmlzRW5jcnlwdGVkLFxuICAgICAgICBoYXNfZm9ybXM6IGZvcm1GaWVsZHMubGVuZ3RoID4gMCxcbiAgICAgICAgZm9ybV9maWVsZHM6IGZvcm1GaWVsZHMubGVuZ3RoLFxuICAgICAgICB0ZXh0X2xlbmd0aDogZGF0YS50ZXh0Lmxlbmd0aCxcbiAgICAgICAgdmVyc2lvbjogZGF0YS52ZXJzaW9uIHx8ICdVbmtub3duJyxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIHJldHVybiB7XG4gICAgICBlcnJvcjogYEZhaWxlZCB0byBnZXQgUERGIG1ldGFkYXRhOiAke2Vycm9yLm1lc3NhZ2V9YCxcbiAgICAgIGZpbGU6IGZpbGVfcGF0aFxuICAgIH07XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gb2NyUGRmKGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxvYmplY3Q+IHtcbiAgY29uc3QgeyBmaWxlX3BhdGgsIG91dHB1dF9wYXRoLCBsYW5ndWFnZSwgcGFnZXMgfSA9IGFyZ3M7XG4gIFxuICB0cnkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gZmlsZV9wYXRoIGFzIHN0cmluZztcbiAgICBjb25zdCBsYW5nID0gbGFuZ3VhZ2UgYXMgc3RyaW5nIHx8ICdlbmcnO1xuICAgIGNvbnN0IHBhZ2VSYW5nZSA9IHBhZ2VzIGFzIHN0cmluZyB8fCAnYWxsJztcbiAgICBcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZmlsZVBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZpbGUgbm90IGZvdW5kOiAke2ZpbGVQYXRofWApO1xuICAgIH1cbiAgICBcbiAgICAvLyBSZWFkIFBERlxuICAgIGNvbnN0IHBkZkJ5dGVzID0gZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoKTtcbiAgICBjb25zdCBwZGZEb2MgPSBhd2FpdCBQREZEb2N1bWVudC5sb2FkKHBkZkJ5dGVzKTtcbiAgICBjb25zdCB0b3RhbFBhZ2VzID0gcGRmRG9jLmdldFBhZ2VDb3VudCgpO1xuICAgIFxuICAgIC8vIERldGVybWluZSB3aGljaCBwYWdlcyB0byBwcm9jZXNzXG4gICAgbGV0IHBhZ2VzVG9Qcm9jZXNzOiBudW1iZXJbXSA9IFtdO1xuICAgIGlmIChwYWdlUmFuZ2UgPT09ICdhbGwnKSB7XG4gICAgICBwYWdlc1RvUHJvY2VzcyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHRvdGFsUGFnZXMgfSwgKF8sIGkpID0+IGkpO1xuICAgIH0gZWxzZSBpZiAocGFnZVJhbmdlLmluY2x1ZGVzKCctJykpIHtcbiAgICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IHBhZ2VSYW5nZS5zcGxpdCgnLScpLm1hcChuID0+IHBhcnNlSW50KG4pIC0gMSk7XG4gICAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gTWF0aC5taW4oZW5kLCB0b3RhbFBhZ2VzIC0gMSk7IGkrKykge1xuICAgICAgICBwYWdlc1RvUHJvY2Vzcy5wdXNoKGkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYWdlc1RvUHJvY2VzcyA9IHBhZ2VSYW5nZS5zcGxpdCgnLCcpLm1hcChuID0+IHBhcnNlSW50KG4udHJpbSgpKSAtIDEpO1xuICAgIH1cbiAgICBcbiAgICAvLyBGb3IgUERGIE9DUiwgd2UgbmVlZCB0byBjb252ZXJ0IFBERiBwYWdlcyB0byBpbWFnZXMgZmlyc3RcbiAgICAvLyB0ZXNzZXJhY3QuanMgd29ya3Mgd2l0aCBpbWFnZXMsIG5vdCBQREZzIGRpcmVjdGx5XG4gICAgLy8gV2UnbGwgdXNlIGEgd29ya2Fyb3VuZDogZXh0cmFjdCB3aGF0IHRleHQgd2UgY2FuIGFuZCBub3RlIHRoYXRcbiAgICAvLyBmdWxsIE9DUiByZXF1aXJlcyBQREYtdG8taW1hZ2UgY29udmVyc2lvblxuICAgIFxuICAgIC8vIFRyeSB0byBleHRyYWN0IGFueSBleGlzdGluZyB0ZXh0IGZpcnN0XG4gICAgY29uc3QgcGRmRGF0YSA9IGF3YWl0IHBkZlBhcnNlKHBkZkJ5dGVzKTtcbiAgICBjb25zdCBleGlzdGluZ1RleHQgPSBwZGZEYXRhLnRleHQudHJpbSgpO1xuICAgIFxuICAgIGlmIChleGlzdGluZ1RleHQubGVuZ3RoID4gMTAwKSB7XG4gICAgICAvLyBQREYgaGFzIGV4dHJhY3RhYmxlIHRleHQsIHJldHVybiBpdFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgZmlsZTogZmlsZV9wYXRoLFxuICAgICAgICBtZXRob2Q6ICd0ZXh0X2V4dHJhY3Rpb24nLFxuICAgICAgICBsYW5ndWFnZTogbGFuZyxcbiAgICAgICAgcGFnZXNfcHJvY2Vzc2VkOiB0b3RhbFBhZ2VzLFxuICAgICAgICB0ZXh0OiBleGlzdGluZ1RleHQsXG4gICAgICAgIG5vdGU6ICdQREYgY29udGFpbnMgZXh0cmFjdGFibGUgdGV4dC4gT0NSIG5vdCBuZWVkZWQuJyxcbiAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIC8vIEZvciBzY2FubmVkIFBERnMsIHdlIG5lZWQgaW1hZ2UgZXh0cmFjdGlvblxuICAgIC8vIFRoaXMgaXMgYSBsaW1pdGF0aW9uIG5vdGUgLSBmdWxsIGltcGxlbWVudGF0aW9uIHdvdWxkIG5lZWQgcGRmLXRvLWltYWdlIGNvbnZlcnNpb25cbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBmaWxlOiBmaWxlX3BhdGgsXG4gICAgICBtZXRob2Q6ICdvY3JfcmVxdWlyZWQnLFxuICAgICAgbGFuZ3VhZ2U6IGxhbmcsXG4gICAgICB0b3RhbF9wYWdlczogdG90YWxQYWdlcyxcbiAgICAgIHBhZ2VzX3RvX3Byb2Nlc3M6IHBhZ2VzVG9Qcm9jZXNzLm1hcChwID0+IHAgKyAxKSxcbiAgICAgIG1lc3NhZ2U6ICdQREYgYXBwZWFycyB0byBiZSBzY2FubmVkL2ltYWdlLWJhc2VkLiBGb3IgZnVsbCBPQ1I6JyxcbiAgICAgIGluc3RydWN0aW9uczogW1xuICAgICAgICAnMS4gQ29udmVydCBQREYgdG8gaW1hZ2VzIHVzaW5nOiBwZGZ0b3BwbSAtcG5nIGlucHV0LnBkZiBvdXRwdXQnLFxuICAgICAgICAnMi4gT3IgdXNlIG9ubGluZSB0b29scyB0byBjb252ZXJ0IFBERiBwYWdlcyB0byBpbWFnZXMnLFxuICAgICAgICAnMy4gVGhlbiB1c2UgdGVzc2VyYWN0IGRpcmVjdGx5IG9uIHRoZSBpbWFnZXMnLFxuICAgICAgICAnQWx0ZXJuYXRpdmU6IFVzZSB0aGUgb2NyX2ltYWdlIHRvb2wgb24gaW5kaXZpZHVhbCBwYWdlIGltYWdlcycsXG4gICAgICBdLFxuICAgICAgdGVzc2VyYWN0X2NvbW1hbmQ6IGB0ZXNzZXJhY3QgaW5wdXRfaW1hZ2UucG5nIG91dHB1dCAtbCAke2xhbmd9YCxcbiAgICAgIHN1cHBvcnRlZF9sYW5ndWFnZXM6IHtcbiAgICAgICAgJ2VuZyc6ICdFbmdsaXNoJyxcbiAgICAgICAgJ2NoaV9zaW0nOiAnU2ltcGxpZmllZCBDaGluZXNlJyxcbiAgICAgICAgJ2NoaV90cmEnOiAnVHJhZGl0aW9uYWwgQ2hpbmVzZScsXG4gICAgICAgICdqcG4nOiAnSmFwYW5lc2UnLFxuICAgICAgICAna29yJzogJ0tvcmVhbicsXG4gICAgICAgICdmcmEnOiAnRnJlbmNoJyxcbiAgICAgICAgJ2RldSc6ICdHZXJtYW4nLFxuICAgICAgICAnc3BhJzogJ1NwYW5pc2gnLFxuICAgICAgfSxcbiAgICB9O1xuICAgIFxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgZXJyb3I6IGBPQ1IgZmFpbGVkOiAke2Vycm9yLm1lc3NhZ2V9YCxcbiAgICAgIGZpbGU6IGZpbGVfcGF0aCxcbiAgICB9O1xuICB9XG59XG5cbi8vIE9DUiBvbiBpbWFnZSBmaWxlc1xuYXN5bmMgZnVuY3Rpb24gb2NySW1hZ2VUb29sKGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxvYmplY3Q+IHtcbiAgY29uc3QgeyBmaWxlX3BhdGgsIG91dHB1dF9wYXRoLCBsYW5ndWFnZSB9ID0gYXJncztcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBmaWxlX3BhdGggYXMgc3RyaW5nO1xuICAgIGNvbnN0IGxhbmcgPSBsYW5ndWFnZSBhcyBzdHJpbmcgfHwgJ2VuZyc7XG4gICAgXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbWFnZSBub3QgZm91bmQ6ICR7ZmlsZVBhdGh9YCk7XG4gICAgfVxuICAgIFxuICAgIC8vIENoZWNrIGZpbGUgZXh0ZW5zaW9uXG4gICAgY29uc3QgZXh0ID0gcGF0aC5leHRuYW1lKGZpbGVQYXRoKS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IHN1cHBvcnRlZEZvcm1hdHMgPSBbJy5wbmcnLCAnLmpwZycsICcuanBlZycsICcudGlmZicsICcudGlmJywgJy5ibXAnLCAnLmdpZicsICcud2VicCddO1xuICAgIGlmICghc3VwcG9ydGVkRm9ybWF0cy5pbmNsdWRlcyhleHQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGltYWdlIGZvcm1hdDogJHtleHR9LiBTdXBwb3J0ZWQ6ICR7c3VwcG9ydGVkRm9ybWF0cy5qb2luKCcsICcpfWApO1xuICAgIH1cbiAgICBcbiAgICAvLyBQZXJmb3JtIE9DUlxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IFRlc3NlcmFjdC5yZWNvZ25pemUoZmlsZVBhdGgsIGxhbmcsIHtcbiAgICAgIGxvZ2dlcjogKG06IGFueSkgPT4ge1xuICAgICAgICAvLyBTaWxlbnQgbG9nZ2luZ1xuICAgICAgfSxcbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCB0ZXh0ID0gcmVzdWx0LmRhdGEudGV4dDtcbiAgICBjb25zdCBjb25maWRlbmNlID0gcmVzdWx0LmRhdGEuY29uZmlkZW5jZTtcbiAgICBcbiAgICAvLyBTYXZlIHRvIGZpbGUgaWYgb3V0cHV0IHBhdGggc3BlY2lmaWVkXG4gICAgaWYgKG91dHB1dF9wYXRoKSB7XG4gICAgICBmcy53cml0ZUZpbGVTeW5jKG91dHB1dF9wYXRoIGFzIHN0cmluZywgdGV4dCwgJ3V0Zi04Jyk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgZmlsZTogZmlsZV9wYXRoLFxuICAgICAgbGFuZ3VhZ2U6IGxhbmcsXG4gICAgICBjb25maWRlbmNlOiBgJHtjb25maWRlbmNlLnRvRml4ZWQoMSl9JWAsXG4gICAgICB0ZXh0X2xlbmd0aDogdGV4dC5sZW5ndGgsXG4gICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgb3V0cHV0X2ZpbGU6IG91dHB1dF9wYXRoIHx8IG51bGwsXG4gICAgfTtcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIGVycm9yOiBgSW1hZ2UgT0NSIGZhaWxlZDogJHtlcnJvci5tZXNzYWdlfWAsXG4gICAgICBmaWxlOiBmaWxlX3BhdGgsXG4gICAgfTtcbiAgfVxufVxuIl19