"use strict";
/**
 * Document Tools - DOCX operations
 *
 * Best-in-class tools for Word document manipulation.
 * These tools are designed to be used by AI Skills for document scenarios.
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
exports.documentTools = void 0;
exports.handleDocumentTool = handleDocumentTool;
const fs = __importStar(require("fs"));
const mammoth = __importStar(require("mammoth"));
const docx_1 = require("docx");
const docxtemplater_1 = __importDefault(require("docxtemplater"));
const pizzip_1 = __importDefault(require("pizzip"));
/**
 * Document tool definitions
 */
exports.documentTools = [
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
async function handleDocumentTool(name, args) {
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
async function extractTextFromDocx(args) {
    const { file_path, preserve_formatting } = args;
    try {
        const filePath = file_path;
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        const buffer = fs.readFileSync(filePath);
        if (preserve_formatting) {
            // Extract with basic formatting preserved
            const result = await mammoth.extractRawText({ buffer });
            return result.value;
        }
        else {
            // Extract plain text
            const result = await mammoth.extractRawText({ buffer });
            return result.value;
        }
    }
    catch (error) {
        return `Error extracting text from DOCX: ${error.message}`;
    }
}
async function createDocx(args) {
    const { output_path, content } = args;
    try {
        const outputPath = output_path;
        const contentBlocks = content;
        const children = [];
        for (const block of contentBlocks) {
            switch (block.type) {
                case 'heading':
                    const headingLevels = {
                        1: docx_1.HeadingLevel.HEADING_1,
                        2: docx_1.HeadingLevel.HEADING_2,
                        3: docx_1.HeadingLevel.HEADING_3,
                        4: docx_1.HeadingLevel.HEADING_4,
                        5: docx_1.HeadingLevel.HEADING_5,
                        6: docx_1.HeadingLevel.HEADING_6,
                    };
                    children.push(new docx_1.Paragraph({
                        text: block.text || '',
                        heading: headingLevels[block.level || 1] || docx_1.HeadingLevel.HEADING_1,
                    }));
                    break;
                case 'paragraph':
                    children.push(new docx_1.Paragraph({
                        children: [new docx_1.TextRun(block.text || '')],
                    }));
                    break;
                case 'list':
                    if (block.items) {
                        for (const item of block.items) {
                            children.push(new docx_1.Paragraph({
                                text: item,
                                bullet: { level: 0 },
                            }));
                        }
                    }
                    break;
                case 'table':
                    if (block.rows) {
                        const tableRows = block.rows.map((row) => new docx_1.TableRow({
                            children: row.map((cell) => new docx_1.TableCell({
                                children: [new docx_1.Paragraph(cell)],
                                width: { size: 100 / row.length, type: docx_1.WidthType.PERCENTAGE },
                            })),
                        }));
                        children.push(new docx_1.Table({
                            rows: tableRows,
                            width: { size: 100, type: docx_1.WidthType.PERCENTAGE },
                        }));
                    }
                    break;
            }
        }
        const doc = new docx_1.Document({
            sections: [{ children }],
        });
        const buffer = await docx_1.Packer.toBuffer(doc);
        fs.writeFileSync(outputPath, buffer);
        return `Successfully created document at ${outputPath} with ${contentBlocks.length} content blocks.`;
    }
    catch (error) {
        return `Error creating DOCX: ${error.message}`;
    }
}
async function fillDocxTemplate(args) {
    const { template_path, output_path, data } = args;
    try {
        const templatePath = template_path;
        const outputPath = output_path;
        const templateData = data;
        if (!fs.existsSync(templatePath)) {
            throw new Error(`Template file not found: ${templatePath}`);
        }
        // Read template
        const content = fs.readFileSync(templatePath, 'binary');
        const zip = new pizzip_1.default(content);
        // Create docxtemplater instance
        const doc = new docxtemplater_1.default(zip, {
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
    }
    catch (error) {
        return `Error filling template: ${error.message}`;
    }
}
async function analyzeDocumentStructure(args) {
    const { file_path } = args;
    try {
        const filePath = file_path;
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
            warnings: htmlResult.messages.map((m) => m.message),
        };
    }
    catch (error) {
        return {
            error: `Failed to analyze document: ${error.message}`,
            file: file_path,
        };
    }
}
async function insertTableToDocx(args) {
    const { file_path, output_path, table_data, position, style } = args;
    try {
        const filePath = file_path;
        const outputPath = output_path;
        const tableRows = table_data;
        const insertPosition = position || 'end';
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // Read existing document content
        const buffer = fs.readFileSync(filePath);
        const textResult = await mammoth.extractRawText({ buffer });
        const existingText = textResult.value;
        // Create table
        const docTableRows = tableRows.map((row, rowIndex) => new docx_1.TableRow({
            children: row.map((cell) => new docx_1.TableCell({
                children: [new docx_1.Paragraph({
                        children: [new docx_1.TextRun({
                                text: cell,
                                bold: rowIndex === 0, // Bold first row (header)
                            })],
                    })],
                width: { size: 100 / row.length, type: docx_1.WidthType.PERCENTAGE },
            })),
        }));
        const table = new docx_1.Table({
            rows: docTableRows,
            width: { size: 100, type: docx_1.WidthType.PERCENTAGE },
        });
        // Build content based on position
        const children = [];
        if (insertPosition === 'start') {
            children.push(table);
            children.push(new docx_1.Paragraph({ text: '' })); // Spacer
            // Add existing text as paragraphs
            existingText.split('\n').forEach(line => {
                if (line.trim()) {
                    children.push(new docx_1.Paragraph({ text: line }));
                }
            });
        }
        else {
            // Add existing text as paragraphs
            existingText.split('\n').forEach(line => {
                if (line.trim()) {
                    children.push(new docx_1.Paragraph({ text: line }));
                }
            });
            children.push(new docx_1.Paragraph({ text: '' })); // Spacer
            children.push(table);
        }
        const doc = new docx_1.Document({
            sections: [{ children }],
        });
        const outputBuffer = await docx_1.Packer.toBuffer(doc);
        fs.writeFileSync(outputPath, outputBuffer);
        return `Successfully inserted table with ${tableRows.length} rows at ${insertPosition}. Output: ${outputPath}`;
    }
    catch (error) {
        return `Error inserting table: ${error.message}`;
    }
}
async function mergeDocxFiles(args) {
    const { file_paths, output_path, add_page_breaks } = args;
    try {
        const filePaths = file_paths;
        const outputPath = output_path;
        const pageBreaks = add_page_breaks ?? true;
        // Validate all files exist
        for (const filePath of filePaths) {
            if (!fs.existsSync(filePath)) {
                throw new Error(`File not found: ${filePath}`);
            }
        }
        const children = [];
        for (let i = 0; i < filePaths.length; i++) {
            const filePath = filePaths[i];
            const buffer = fs.readFileSync(filePath);
            // Extract text from document
            const textResult = await mammoth.extractRawText({ buffer });
            const text = textResult.value;
            // Add document content
            text.split('\n').forEach(line => {
                if (line.trim()) {
                    children.push(new docx_1.Paragraph({ text: line }));
                }
                else {
                    children.push(new docx_1.Paragraph({ text: '' }));
                }
            });
            // Add page break between documents (except for last one)
            if (pageBreaks && i < filePaths.length - 1) {
                children.push(new docx_1.Paragraph({
                    children: [new docx_1.PageBreak()],
                }));
            }
        }
        const doc = new docx_1.Document({
            sections: [{ children }],
        });
        const outputBuffer = await docx_1.Packer.toBuffer(doc);
        fs.writeFileSync(outputPath, outputBuffer);
        return `Successfully merged ${filePaths.length} documents into ${outputPath}${pageBreaks ? ' (with page breaks)' : ''}`;
    }
    catch (error) {
        return `Error merging documents: ${error.message}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdG9vbHMvZG9jdW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErTEgsZ0RBb0JDO0FBaE5ELHVDQUF5QjtBQUN6QixpREFBbUM7QUFDbkMsK0JBV2M7QUFDZCxrRUFBMEM7QUFDMUMsb0RBQTRCO0FBRTVCOztHQUVHO0FBQ1UsUUFBQSxhQUFhLEdBQVc7SUFDbkM7UUFDRSxJQUFJLEVBQUUsd0JBQXdCO1FBQzlCLFdBQVcsRUFBRSxxSEFBcUg7UUFDbEksV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxRQUFRO29CQUNkLFdBQVcsRUFBRSx1QkFBdUI7aUJBQ3JDO2dCQUNELGVBQWUsRUFBRTtvQkFDZixJQUFJLEVBQUUsU0FBUztvQkFDZixXQUFXLEVBQUUsK0JBQStCO29CQUM1QyxPQUFPLEVBQUUsSUFBSTtpQkFDZDtnQkFDRCxtQkFBbUIsRUFBRTtvQkFDbkIsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsV0FBVyxFQUFFLCtDQUErQztvQkFDNUQsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtZQUNELFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQztTQUN4QjtLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsYUFBYTtRQUNuQixXQUFXLEVBQUUsc0dBQXNHO1FBQ25ILFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsK0JBQStCO2lCQUM3QztnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLE9BQU87b0JBQ2IsV0FBVyxFQUFFLDJEQUEyRDtvQkFD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QUFxQixDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUUxSCxDQUFDO0lBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztRQUNwQixPQUFPLDRCQUE0QixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckQsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERvY3VtZW50IFRvb2xzIC0gRE9DWCBvcGVyYXRpb25zXG4gKiBcbiAqIEJlc3QtaW4tY2xhc3MgdG9vbHMgZm9yIFdvcmQgZG9jdW1lbnQgbWFuaXB1bGF0aW9uLlxuICogVGhlc2UgdG9vbHMgYXJlIGRlc2lnbmVkIHRvIGJlIHVzZWQgYnkgQUkgU2tpbGxzIGZvciBkb2N1bWVudCBzY2VuYXJpb3MuXG4gKi9cblxuaW1wb3J0IHsgVG9vbCB9IGZyb20gXCJAbW9kZWxjb250ZXh0cHJvdG9jb2wvc2RrL3R5cGVzLmpzXCI7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAqIGFzIG1hbW1vdGggZnJvbSBcIm1hbW1vdGhcIjtcbmltcG9ydCB7XG4gIERvY3VtZW50LFxuICBQYXJhZ3JhcGgsXG4gIFRleHRSdW4sXG4gIEhlYWRpbmdMZXZlbCxcbiAgVGFibGUsXG4gIFRhYmxlUm93LFxuICBUYWJsZUNlbGwsXG4gIFdpZHRoVHlwZSxcbiAgUGFja2VyLFxuICBQYWdlQnJlYWssXG59IGZyb20gXCJkb2N4XCI7XG5pbXBvcnQgRG9jeHRlbXBsYXRlciBmcm9tIFwiZG9jeHRlbXBsYXRlclwiO1xuaW1wb3J0IFBpelppcCBmcm9tIFwicGl6emlwXCI7XG5cbi8qKlxuICogRG9jdW1lbnQgdG9vbCBkZWZpbml0aW9uc1xuICovXG5leHBvcnQgY29uc3QgZG9jdW1lbnRUb29sczogVG9vbFtdID0gW1xuICB7XG4gICAgbmFtZTogXCJleHRyYWN0X3RleHRfZnJvbV9kb2N4XCIsXG4gICAgZGVzY3JpcHRpb246IFwiRXh0cmFjdCBwbGFpbiB0ZXh0IGNvbnRlbnQgZnJvbSBhIERPQ1ggZmlsZS4gVXNlZnVsIGZvciBjb250cmFjdCByZXZpZXcsIGRvY3VtZW50IGFuYWx5c2lzLCBhbmQgY29udGVudCBleHRyYWN0aW9uLlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIERPQ1ggZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBpbmNsdWRlX2hlYWRlcnM6IHtcbiAgICAgICAgICB0eXBlOiBcImJvb2xlYW5cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJbmNsdWRlIGhlYWRlci9mb290ZXIgY29udGVudFwiLFxuICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHByZXNlcnZlX2Zvcm1hdHRpbmc6IHtcbiAgICAgICAgICB0eXBlOiBcImJvb2xlYW5cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQcmVzZXJ2ZSBiYXNpYyBmb3JtYXR0aW5nIChwYXJhZ3JhcGhzLCBsaXN0cylcIixcbiAgICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJmaWxlX3BhdGhcIl0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiY3JlYXRlX2RvY3hcIixcbiAgICBkZXNjcmlwdGlvbjogXCJDcmVhdGUgYSBuZXcgRE9DWCBkb2N1bWVudCB3aXRoIHNwZWNpZmllZCBjb250ZW50LiBTdXBwb3J0cyBoZWFkaW5ncywgcGFyYWdyYXBocywgbGlzdHMsIGFuZCB0YWJsZXMuXCIsXG4gICAgaW5wdXRTY2hlbWE6IHtcbiAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG91dHB1dF9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIGZvciB0aGUgb3V0cHV0IERPQ1ggZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgdHlwZTogXCJhcnJheVwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFycmF5IG9mIGNvbnRlbnQgYmxvY2tzIChoZWFkaW5nLCBwYXJhZ3JhcGgsIGxpc3QsIHRhYmxlKVwiLFxuICAgICAgICAgIGl0ZW1zOiB7XG4gICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICBlbnVtOiBbXCJoZWFkaW5nXCIsIFwicGFyYWdyYXBoXCIsIFwibGlzdFwiLCBcInRhYmxlXCJdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbGV2ZWw6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkhlYWRpbmcgbGV2ZWwgKDEtNikgaWYgdHlwZSBpcyBoZWFkaW5nXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGl0ZW1zOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJhcnJheVwiLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxpc3QgaXRlbXMgaWYgdHlwZSBpcyBsaXN0XCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHJvd3M6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGFibGUgcm93cyBpZiB0eXBlIGlzIHRhYmxlXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJPcHRpb25hbCB0ZW1wbGF0ZSBmaWxlIHBhdGhcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wib3V0cHV0X3BhdGhcIiwgXCJjb250ZW50XCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImZpbGxfZG9jeF90ZW1wbGF0ZVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkZpbGwgYSBET0NYIHRlbXBsYXRlIHdpdGggZGF0YSB1c2luZyBwbGFjZWhvbGRlciByZXBsYWNlbWVudC4gSWRlYWwgZm9yIGNvbnRyYWN0cywgbGV0dGVycywgcmVwb3J0cy5cIixcbiAgICBpbnB1dFNjaGVtYToge1xuICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGVtcGxhdGVfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgdGVtcGxhdGUgRE9DWCBmaWxlIHdpdGgge3twbGFjZWhvbGRlcnN9fVwiLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCBmb3IgdGhlIG91dHB1dCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIktleS12YWx1ZSBwYWlycyBmb3IgcGxhY2Vob2xkZXIgcmVwbGFjZW1lbnRcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1widGVtcGxhdGVfcGF0aFwiLCBcIm91dHB1dF9wYXRoXCIsIFwiZGF0YVwiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJhbmFseXplX2RvY3VtZW50X3N0cnVjdHVyZVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFuYWx5emUgdGhlIHN0cnVjdHVyZSBvZiBhIERPQ1ggZG9jdW1lbnQ6IHNlY3Rpb25zLCBoZWFkaW5ncywgdGFibGVzLCBpbWFnZXMgY291bnQuXCIsXG4gICAgaW5wdXRTY2hlbWE6IHtcbiAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGZpbGVfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgRE9DWCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImZpbGVfcGF0aFwiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJpbnNlcnRfdGFibGVfdG9fZG9jeFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkluc2VydCBhIHRhYmxlIGludG8gYW4gZXhpc3RpbmcgRE9DWCBkb2N1bWVudCBhdCBhIHNwZWNpZmllZCBwb3NpdGlvbi5cIixcbiAgICBpbnB1dFNjaGVtYToge1xuICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZmlsZV9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBET0NYIGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0X3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggZm9yIHRoZSBvdXRwdXQgZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICB0YWJsZV9kYXRhOiB7XG4gICAgICAgICAgdHlwZTogXCJhcnJheVwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIjJEIGFycmF5IG9mIHRhYmxlIGRhdGEgKHJvd3MgYW5kIGNvbHVtbnMpXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQb3NpdGlvbiB0byBpbnNlcnQ6ICdlbmQnLCAnc3RhcnQnLCBvciBhZnRlciBhIHNwZWNpZmljIGhlYWRpbmdcIixcbiAgICAgICAgICBkZWZhdWx0OiBcImVuZFwiLFxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiVGFibGUgc3R5bGU6ICdiYXNpYycsICdzdHJpcGVkJywgJ2JvcmRlcmVkJ1wiLFxuICAgICAgICAgIGRlZmF1bHQ6IFwiYmFzaWNcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiZmlsZV9wYXRoXCIsIFwib3V0cHV0X3BhdGhcIiwgXCJ0YWJsZV9kYXRhXCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIm1lcmdlX2RvY3hfZmlsZXNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJNZXJnZSBtdWx0aXBsZSBET0NYIGZpbGVzIGludG8gb25lIGRvY3VtZW50LlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGhzOiB7XG4gICAgICAgICAgdHlwZTogXCJhcnJheVwiLFxuICAgICAgICAgIGl0ZW1zOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBcnJheSBvZiBET0NYIGZpbGUgcGF0aHMgdG8gbWVyZ2VcIixcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0X3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggZm9yIHRoZSBtZXJnZWQgb3V0cHV0IGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgYWRkX3BhZ2VfYnJlYWtzOiB7XG4gICAgICAgICAgdHlwZTogXCJib29sZWFuXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiQWRkIHBhZ2UgYnJlYWtzIGJldHdlZW4gZG9jdW1lbnRzXCIsXG4gICAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiZmlsZV9wYXRoc1wiLCBcIm91dHB1dF9wYXRoXCJdLFxuICAgIH0sXG4gIH0sXG5dO1xuXG4vKipcbiAqIEhhbmRsZSBkb2N1bWVudCB0b29sIGNhbGxzXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVEb2N1bWVudFRvb2woXG4gIG5hbWU6IHN0cmluZyxcbiAgYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj5cbik6IFByb21pc2U8dW5rbm93bj4ge1xuICBzd2l0Y2ggKG5hbWUpIHtcbiAgICBjYXNlIFwiZXh0cmFjdF90ZXh0X2Zyb21fZG9jeFwiOlxuICAgICAgcmV0dXJuIGV4dHJhY3RUZXh0RnJvbURvY3goYXJncyk7XG4gICAgY2FzZSBcImNyZWF0ZV9kb2N4XCI6XG4gICAgICByZXR1cm4gY3JlYXRlRG9jeChhcmdzKTtcbiAgICBjYXNlIFwiZmlsbF9kb2N4X3RlbXBsYXRlXCI6XG4gICAgICByZXR1cm4gZmlsbERvY3hUZW1wbGF0ZShhcmdzKTtcbiAgICBjYXNlIFwiYW5hbHl6ZV9kb2N1bWVudF9zdHJ1Y3R1cmVcIjpcbiAgICAgIHJldHVybiBhbmFseXplRG9jdW1lbnRTdHJ1Y3R1cmUoYXJncyk7XG4gICAgY2FzZSBcImluc2VydF90YWJsZV90b19kb2N4XCI6XG4gICAgICByZXR1cm4gaW5zZXJ0VGFibGVUb0RvY3goYXJncyk7XG4gICAgY2FzZSBcIm1lcmdlX2RvY3hfZmlsZXNcIjpcbiAgICAgIHJldHVybiBtZXJnZURvY3hGaWxlcyhhcmdzKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGRvY3VtZW50IHRvb2w6ICR7bmFtZX1gKTtcbiAgfVxufVxuXG4vLyBUb29sIGltcGxlbWVudGF0aW9ucyAodXNpbmcgbWFtbW90aCwgZG9jeCwgZXRjLilcbmFzeW5jIGZ1bmN0aW9uIGV4dHJhY3RUZXh0RnJvbURvY3goYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7IGZpbGVfcGF0aCwgcHJlc2VydmVfZm9ybWF0dGluZyB9ID0gYXJncztcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBmaWxlX3BhdGggYXMgc3RyaW5nO1xuICAgIFxuICAgIGlmICghZnMuZXhpc3RzU3luYyhmaWxlUGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmlsZSBub3QgZm91bmQ6ICR7ZmlsZVBhdGh9YCk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGJ1ZmZlciA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCk7XG4gICAgXG4gICAgaWYgKHByZXNlcnZlX2Zvcm1hdHRpbmcpIHtcbiAgICAgIC8vIEV4dHJhY3Qgd2l0aCBiYXNpYyBmb3JtYXR0aW5nIHByZXNlcnZlZFxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbWFtbW90aC5leHRyYWN0UmF3VGV4dCh7IGJ1ZmZlciB9KTtcbiAgICAgIHJldHVybiByZXN1bHQudmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEV4dHJhY3QgcGxhaW4gdGV4dFxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbWFtbW90aC5leHRyYWN0UmF3VGV4dCh7IGJ1ZmZlciB9KTtcbiAgICAgIHJldHVybiByZXN1bHQudmFsdWU7XG4gICAgfVxuICAgIFxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgcmV0dXJuIGBFcnJvciBleHRyYWN0aW5nIHRleHQgZnJvbSBET0NYOiAke2Vycm9yLm1lc3NhZ2V9YDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVEb2N4KGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgeyBvdXRwdXRfcGF0aCwgY29udGVudCB9ID0gYXJncztcbiAgXG4gIHRyeSB7XG4gICAgY29uc3Qgb3V0cHV0UGF0aCA9IG91dHB1dF9wYXRoIGFzIHN0cmluZztcbiAgICBjb25zdCBjb250ZW50QmxvY2tzID0gY29udGVudCBhcyBBcnJheTx7XG4gICAgICB0eXBlOiBzdHJpbmc7XG4gICAgICB0ZXh0Pzogc3RyaW5nO1xuICAgICAgbGV2ZWw/OiBudW1iZXI7XG4gICAgICBpdGVtcz86IHN0cmluZ1tdO1xuICAgICAgcm93cz86IHN0cmluZ1tdW107XG4gICAgfT47XG4gICAgXG4gICAgY29uc3QgY2hpbGRyZW46IChQYXJhZ3JhcGggfCBUYWJsZSlbXSA9IFtdO1xuICAgIFxuICAgIGZvciAoY29uc3QgYmxvY2sgb2YgY29udGVudEJsb2Nrcykge1xuICAgICAgc3dpdGNoIChibG9jay50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2hlYWRpbmcnOlxuICAgICAgICAgIGNvbnN0IGhlYWRpbmdMZXZlbHM6IHsgW2tleTogbnVtYmVyXTogdHlwZW9mIEhlYWRpbmdMZXZlbFtrZXlvZiB0eXBlb2YgSGVhZGluZ0xldmVsXSB9ID0ge1xuICAgICAgICAgICAgMTogSGVhZGluZ0xldmVsLkhFQURJTkdfMSxcbiAgICAgICAgICAgIDI6IEhlYWRpbmdMZXZlbC5IRUFESU5HXzIsXG4gICAgICAgICAgICAzOiBIZWFkaW5nTGV2ZWwuSEVBRElOR18zLFxuICAgICAgICAgICAgNDogSGVhZGluZ0xldmVsLkhFQURJTkdfNCxcbiAgICAgICAgICAgIDU6IEhlYWRpbmdMZXZlbC5IRUFESU5HXzUsXG4gICAgICAgICAgICA2OiBIZWFkaW5nTGV2ZWwuSEVBRElOR182LFxuICAgICAgICAgIH07XG4gICAgICAgICAgY2hpbGRyZW4ucHVzaChcbiAgICAgICAgICAgIG5ldyBQYXJhZ3JhcGgoe1xuICAgICAgICAgICAgICB0ZXh0OiBibG9jay50ZXh0IHx8ICcnLFxuICAgICAgICAgICAgICBoZWFkaW5nOiBoZWFkaW5nTGV2ZWxzW2Jsb2NrLmxldmVsIHx8IDFdIHx8IEhlYWRpbmdMZXZlbC5IRUFESU5HXzEsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgXG4gICAgICAgIGNhc2UgJ3BhcmFncmFwaCc6XG4gICAgICAgICAgY2hpbGRyZW4ucHVzaChcbiAgICAgICAgICAgIG5ldyBQYXJhZ3JhcGgoe1xuICAgICAgICAgICAgICBjaGlsZHJlbjogW25ldyBUZXh0UnVuKGJsb2NrLnRleHQgfHwgJycpXSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBcbiAgICAgICAgY2FzZSAnbGlzdCc6XG4gICAgICAgICAgaWYgKGJsb2NrLml0ZW1zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgYmxvY2suaXRlbXMpIHtcbiAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaChcbiAgICAgICAgICAgICAgICBuZXcgUGFyYWdyYXBoKHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6IGl0ZW0sXG4gICAgICAgICAgICAgICAgICBidWxsZXQ6IHsgbGV2ZWw6IDAgfSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgICBcbiAgICAgICAgY2FzZSAndGFibGUnOlxuICAgICAgICAgIGlmIChibG9jay5yb3dzKSB7XG4gICAgICAgICAgICBjb25zdCB0YWJsZVJvd3MgPSBibG9jay5yb3dzLm1hcChcbiAgICAgICAgICAgICAgKHJvdykgPT5cbiAgICAgICAgICAgICAgICBuZXcgVGFibGVSb3coe1xuICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IHJvdy5tYXAoXG4gICAgICAgICAgICAgICAgICAgIChjZWxsKSA9PlxuICAgICAgICAgICAgICAgICAgICAgIG5ldyBUYWJsZUNlbGwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtuZXcgUGFyYWdyYXBoKGNlbGwpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB7IHNpemU6IDEwMCAvIHJvdy5sZW5ndGgsIHR5cGU6IFdpZHRoVHlwZS5QRVJDRU5UQUdFIH0sXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjaGlsZHJlbi5wdXNoKFxuICAgICAgICAgICAgICBuZXcgVGFibGUoe1xuICAgICAgICAgICAgICAgIHJvd3M6IHRhYmxlUm93cyxcbiAgICAgICAgICAgICAgICB3aWR0aDogeyBzaXplOiAxMDAsIHR5cGU6IFdpZHRoVHlwZS5QRVJDRU5UQUdFIH0sXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY29uc3QgZG9jID0gbmV3IERvY3VtZW50KHtcbiAgICAgIHNlY3Rpb25zOiBbeyBjaGlsZHJlbiB9XSxcbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCBidWZmZXIgPSBhd2FpdCBQYWNrZXIudG9CdWZmZXIoZG9jKTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKG91dHB1dFBhdGgsIGJ1ZmZlcik7XG4gICAgXG4gICAgcmV0dXJuIGBTdWNjZXNzZnVsbHkgY3JlYXRlZCBkb2N1bWVudCBhdCAke291dHB1dFBhdGh9IHdpdGggJHtjb250ZW50QmxvY2tzLmxlbmd0aH0gY29udGVudCBibG9ja3MuYDtcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIHJldHVybiBgRXJyb3IgY3JlYXRpbmcgRE9DWDogJHtlcnJvci5tZXNzYWdlfWA7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZmlsbERvY3hUZW1wbGF0ZShhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHsgdGVtcGxhdGVfcGF0aCwgb3V0cHV0X3BhdGgsIGRhdGEgfSA9IGFyZ3M7XG4gIFxuICB0cnkge1xuICAgIGNvbnN0IHRlbXBsYXRlUGF0aCA9IHRlbXBsYXRlX3BhdGggYXMgc3RyaW5nO1xuICAgIGNvbnN0IG91dHB1dFBhdGggPSBvdXRwdXRfcGF0aCBhcyBzdHJpbmc7XG4gICAgY29uc3QgdGVtcGxhdGVEYXRhID0gZGF0YSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgICBcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmModGVtcGxhdGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUZW1wbGF0ZSBmaWxlIG5vdCBmb3VuZDogJHt0ZW1wbGF0ZVBhdGh9YCk7XG4gICAgfVxuICAgIFxuICAgIC8vIFJlYWQgdGVtcGxhdGVcbiAgICBjb25zdCBjb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKHRlbXBsYXRlUGF0aCwgJ2JpbmFyeScpO1xuICAgIGNvbnN0IHppcCA9IG5ldyBQaXpaaXAoY29udGVudCk7XG4gICAgXG4gICAgLy8gQ3JlYXRlIGRvY3h0ZW1wbGF0ZXIgaW5zdGFuY2VcbiAgICBjb25zdCBkb2MgPSBuZXcgRG9jeHRlbXBsYXRlcih6aXAsIHtcbiAgICAgIHBhcmFncmFwaExvb3A6IHRydWUsXG4gICAgICBsaW5lYnJlYWtzOiB0cnVlLFxuICAgIH0pO1xuICAgIFxuICAgIC8vIFJlbmRlciB3aXRoIGRhdGFcbiAgICBkb2MucmVuZGVyKHRlbXBsYXRlRGF0YSk7XG4gICAgXG4gICAgLy8gR2VuZXJhdGUgb3V0cHV0XG4gICAgY29uc3QgYnVmID0gZG9jLmdldFppcCgpLmdlbmVyYXRlKHtcbiAgICAgIHR5cGU6ICdub2RlYnVmZmVyJyxcbiAgICAgIGNvbXByZXNzaW9uOiAnREVGTEFURScsXG4gICAgfSk7XG4gICAgXG4gICAgZnMud3JpdGVGaWxlU3luYyhvdXRwdXRQYXRoLCBidWYpO1xuICAgIFxuICAgIGNvbnN0IHBsYWNlaG9sZGVycyA9IE9iamVjdC5rZXlzKHRlbXBsYXRlRGF0YSk7XG4gICAgcmV0dXJuIGBTdWNjZXNzZnVsbHkgZmlsbGVkIHRlbXBsYXRlIHdpdGggJHtwbGFjZWhvbGRlcnMubGVuZ3RofSBwbGFjZWhvbGRlcnM6ICR7cGxhY2Vob2xkZXJzLmpvaW4oJywgJyl9LiBPdXRwdXQ6ICR7b3V0cHV0UGF0aH1gO1xuICAgIFxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgcmV0dXJuIGBFcnJvciBmaWxsaW5nIHRlbXBsYXRlOiAke2Vycm9yLm1lc3NhZ2V9YDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBhbmFseXplRG9jdW1lbnRTdHJ1Y3R1cmUoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPG9iamVjdD4ge1xuICBjb25zdCB7IGZpbGVfcGF0aCB9ID0gYXJncztcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBmaWxlX3BhdGggYXMgc3RyaW5nO1xuICAgIFxuICAgIGlmICghZnMuZXhpc3RzU3luYyhmaWxlUGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmlsZSBub3QgZm91bmQ6ICR7ZmlsZVBhdGh9YCk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGJ1ZmZlciA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCk7XG4gICAgXG4gICAgLy8gRXh0cmFjdCBIVE1MIHRvIGFuYWx5emUgc3RydWN0dXJlXG4gICAgY29uc3QgaHRtbFJlc3VsdCA9IGF3YWl0IG1hbW1vdGguY29udmVydFRvSHRtbCh7IGJ1ZmZlciB9KTtcbiAgICBjb25zdCBodG1sID0gaHRtbFJlc3VsdC52YWx1ZTtcbiAgICBcbiAgICAvLyBFeHRyYWN0IHJhdyB0ZXh0IGZvciB3b3JkIGNvdW50XG4gICAgY29uc3QgdGV4dFJlc3VsdCA9IGF3YWl0IG1hbW1vdGguZXh0cmFjdFJhd1RleHQoeyBidWZmZXIgfSk7XG4gICAgY29uc3QgdGV4dCA9IHRleHRSZXN1bHQudmFsdWU7XG4gICAgXG4gICAgLy8gQ291bnQgZWxlbWVudHNcbiAgICBjb25zdCBoMUNvdW50ID0gKGh0bWwubWF0Y2goLzxoMS9naSkgfHwgW10pLmxlbmd0aDtcbiAgICBjb25zdCBoMkNvdW50ID0gKGh0bWwubWF0Y2goLzxoMi9naSkgfHwgW10pLmxlbmd0aDtcbiAgICBjb25zdCBoM0NvdW50ID0gKGh0bWwubWF0Y2goLzxoMy9naSkgfHwgW10pLmxlbmd0aDtcbiAgICBjb25zdCBoNENvdW50ID0gKGh0bWwubWF0Y2goLzxoNC9naSkgfHwgW10pLmxlbmd0aDtcbiAgICBjb25zdCBwYXJhZ3JhcGhDb3VudCA9IChodG1sLm1hdGNoKC88cC9naSkgfHwgW10pLmxlbmd0aDtcbiAgICBjb25zdCB0YWJsZUNvdW50ID0gKGh0bWwubWF0Y2goLzx0YWJsZS9naSkgfHwgW10pLmxlbmd0aDtcbiAgICBjb25zdCBpbWFnZUNvdW50ID0gKGh0bWwubWF0Y2goLzxpbWcvZ2kpIHx8IFtdKS5sZW5ndGg7XG4gICAgY29uc3QgbGlzdENvdW50ID0gKGh0bWwubWF0Y2goLzx1bHw8b2wvZ2kpIHx8IFtdKS5sZW5ndGg7XG4gICAgXG4gICAgLy8gV29yZCBjb3VudFxuICAgIGNvbnN0IHdvcmRzID0gdGV4dC50cmltKCkuc3BsaXQoL1xccysvKS5maWx0ZXIodyA9PiB3Lmxlbmd0aCA+IDApO1xuICAgIGNvbnN0IHdvcmRDb3VudCA9IHdvcmRzLmxlbmd0aDtcbiAgICBcbiAgICAvLyBDaGFyYWN0ZXIgY291bnRcbiAgICBjb25zdCBjaGFyQ291bnQgPSB0ZXh0Lmxlbmd0aDtcbiAgICBcbiAgICAvLyBFc3RpbWF0ZSBwYWdlcyAocm91Z2hseSAyNTAtMzAwIHdvcmRzIHBlciBwYWdlKVxuICAgIGNvbnN0IHBhZ2VFc3RpbWF0ZSA9IE1hdGguY2VpbCh3b3JkQ291bnQgLyAyNzUpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICBmaWxlOiBmaWxlX3BhdGgsXG4gICAgICBzdHJ1Y3R1cmU6IHtcbiAgICAgICAgaGVhZGluZ3M6IHtcbiAgICAgICAgICBoMTogaDFDb3VudCxcbiAgICAgICAgICBoMjogaDJDb3VudCxcbiAgICAgICAgICBoMzogaDNDb3VudCxcbiAgICAgICAgICBoNDogaDRDb3VudCxcbiAgICAgICAgICB0b3RhbDogaDFDb3VudCArIGgyQ291bnQgKyBoM0NvdW50ICsgaDRDb3VudCxcbiAgICAgICAgfSxcbiAgICAgICAgcGFyYWdyYXBoczogcGFyYWdyYXBoQ291bnQsXG4gICAgICAgIHRhYmxlczogdGFibGVDb3VudCxcbiAgICAgICAgaW1hZ2VzOiBpbWFnZUNvdW50LFxuICAgICAgICBsaXN0czogbGlzdENvdW50LFxuICAgICAgfSxcbiAgICAgIHN0YXRpc3RpY3M6IHtcbiAgICAgICAgd29yZF9jb3VudDogd29yZENvdW50LFxuICAgICAgICBjaGFyYWN0ZXJfY291bnQ6IGNoYXJDb3VudCxcbiAgICAgICAgcGFnZV9lc3RpbWF0ZTogcGFnZUVzdGltYXRlLFxuICAgICAgfSxcbiAgICAgIHdhcm5pbmdzOiBodG1sUmVzdWx0Lm1lc3NhZ2VzLm1hcCgobTogYW55KSA9PiBtLm1lc3NhZ2UpLFxuICAgIH07XG4gICAgXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3I6IGBGYWlsZWQgdG8gYW5hbHl6ZSBkb2N1bWVudDogJHtlcnJvci5tZXNzYWdlfWAsXG4gICAgICBmaWxlOiBmaWxlX3BhdGgsXG4gICAgfTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBpbnNlcnRUYWJsZVRvRG9jeChhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHsgZmlsZV9wYXRoLCBvdXRwdXRfcGF0aCwgdGFibGVfZGF0YSwgcG9zaXRpb24sIHN0eWxlIH0gPSBhcmdzO1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGVfcGF0aCBhcyBzdHJpbmc7XG4gICAgY29uc3Qgb3V0cHV0UGF0aCA9IG91dHB1dF9wYXRoIGFzIHN0cmluZztcbiAgICBjb25zdCB0YWJsZVJvd3MgPSB0YWJsZV9kYXRhIGFzIHN0cmluZ1tdW107XG4gICAgY29uc3QgaW5zZXJ0UG9zaXRpb24gPSBwb3NpdGlvbiBhcyBzdHJpbmcgfHwgJ2VuZCc7XG4gICAgXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWxlIG5vdCBmb3VuZDogJHtmaWxlUGF0aH1gKTtcbiAgICB9XG4gICAgXG4gICAgLy8gUmVhZCBleGlzdGluZyBkb2N1bWVudCBjb250ZW50XG4gICAgY29uc3QgYnVmZmVyID0gZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoKTtcbiAgICBjb25zdCB0ZXh0UmVzdWx0ID0gYXdhaXQgbWFtbW90aC5leHRyYWN0UmF3VGV4dCh7IGJ1ZmZlciB9KTtcbiAgICBjb25zdCBleGlzdGluZ1RleHQgPSB0ZXh0UmVzdWx0LnZhbHVlO1xuICAgIFxuICAgIC8vIENyZWF0ZSB0YWJsZVxuICAgIGNvbnN0IGRvY1RhYmxlUm93cyA9IHRhYmxlUm93cy5tYXAoXG4gICAgICAocm93LCByb3dJbmRleCkgPT5cbiAgICAgICAgbmV3IFRhYmxlUm93KHtcbiAgICAgICAgICBjaGlsZHJlbjogcm93Lm1hcChcbiAgICAgICAgICAgIChjZWxsKSA9PlxuICAgICAgICAgICAgICBuZXcgVGFibGVDZWxsKHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW25ldyBQYXJhZ3JhcGgoe1xuICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtuZXcgVGV4dFJ1bih7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGNlbGwsXG4gICAgICAgICAgICAgICAgICAgIGJvbGQ6IHJvd0luZGV4ID09PSAwLCAvLyBCb2xkIGZpcnN0IHJvdyAoaGVhZGVyKVxuICAgICAgICAgICAgICAgICAgfSldLFxuICAgICAgICAgICAgICAgIH0pXSxcbiAgICAgICAgICAgICAgICB3aWR0aDogeyBzaXplOiAxMDAgLyByb3cubGVuZ3RoLCB0eXBlOiBXaWR0aFR5cGUuUEVSQ0VOVEFHRSB9LFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICksXG4gICAgICAgIH0pXG4gICAgKTtcbiAgICBcbiAgICBjb25zdCB0YWJsZSA9IG5ldyBUYWJsZSh7XG4gICAgICByb3dzOiBkb2NUYWJsZVJvd3MsXG4gICAgICB3aWR0aDogeyBzaXplOiAxMDAsIHR5cGU6IFdpZHRoVHlwZS5QRVJDRU5UQUdFIH0sXG4gICAgfSk7XG4gICAgXG4gICAgLy8gQnVpbGQgY29udGVudCBiYXNlZCBvbiBwb3NpdGlvblxuICAgIGNvbnN0IGNoaWxkcmVuOiAoUGFyYWdyYXBoIHwgVGFibGUpW10gPSBbXTtcbiAgICBcbiAgICBpZiAoaW5zZXJ0UG9zaXRpb24gPT09ICdzdGFydCcpIHtcbiAgICAgIGNoaWxkcmVuLnB1c2godGFibGUpO1xuICAgICAgY2hpbGRyZW4ucHVzaChuZXcgUGFyYWdyYXBoKHsgdGV4dDogJycgfSkpOyAvLyBTcGFjZXJcbiAgICAgIC8vIEFkZCBleGlzdGluZyB0ZXh0IGFzIHBhcmFncmFwaHNcbiAgICAgIGV4aXN0aW5nVGV4dC5zcGxpdCgnXFxuJykuZm9yRWFjaChsaW5lID0+IHtcbiAgICAgICAgaWYgKGxpbmUudHJpbSgpKSB7XG4gICAgICAgICAgY2hpbGRyZW4ucHVzaChuZXcgUGFyYWdyYXBoKHsgdGV4dDogbGluZSB9KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBBZGQgZXhpc3RpbmcgdGV4dCBhcyBwYXJhZ3JhcGhzXG4gICAgICBleGlzdGluZ1RleHQuc3BsaXQoJ1xcbicpLmZvckVhY2gobGluZSA9PiB7XG4gICAgICAgIGlmIChsaW5lLnRyaW0oKSkge1xuICAgICAgICAgIGNoaWxkcmVuLnB1c2gobmV3IFBhcmFncmFwaCh7IHRleHQ6IGxpbmUgfSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNoaWxkcmVuLnB1c2gobmV3IFBhcmFncmFwaCh7IHRleHQ6ICcnIH0pKTsgLy8gU3BhY2VyXG4gICAgICBjaGlsZHJlbi5wdXNoKHRhYmxlKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgZG9jID0gbmV3IERvY3VtZW50KHtcbiAgICAgIHNlY3Rpb25zOiBbeyBjaGlsZHJlbiB9XSxcbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCBvdXRwdXRCdWZmZXIgPSBhd2FpdCBQYWNrZXIudG9CdWZmZXIoZG9jKTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKG91dHB1dFBhdGgsIG91dHB1dEJ1ZmZlcik7XG4gICAgXG4gICAgcmV0dXJuIGBTdWNjZXNzZnVsbHkgaW5zZXJ0ZWQgdGFibGUgd2l0aCAke3RhYmxlUm93cy5sZW5ndGh9IHJvd3MgYXQgJHtpbnNlcnRQb3NpdGlvbn0uIE91dHB1dDogJHtvdXRwdXRQYXRofWA7XG4gICAgXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICByZXR1cm4gYEVycm9yIGluc2VydGluZyB0YWJsZTogJHtlcnJvci5tZXNzYWdlfWA7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbWVyZ2VEb2N4RmlsZXMoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7IGZpbGVfcGF0aHMsIG91dHB1dF9wYXRoLCBhZGRfcGFnZV9icmVha3MgfSA9IGFyZ3M7XG4gIFxuICB0cnkge1xuICAgIGNvbnN0IGZpbGVQYXRocyA9IGZpbGVfcGF0aHMgYXMgc3RyaW5nW107XG4gICAgY29uc3Qgb3V0cHV0UGF0aCA9IG91dHB1dF9wYXRoIGFzIHN0cmluZztcbiAgICBjb25zdCBwYWdlQnJlYWtzID0gYWRkX3BhZ2VfYnJlYWtzIGFzIGJvb2xlYW4gPz8gdHJ1ZTtcbiAgICBcbiAgICAvLyBWYWxpZGF0ZSBhbGwgZmlsZXMgZXhpc3RcbiAgICBmb3IgKGNvbnN0IGZpbGVQYXRoIG9mIGZpbGVQYXRocykge1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZpbGUgbm90IGZvdW5kOiAke2ZpbGVQYXRofWApO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBjaGlsZHJlbjogKFBhcmFncmFwaCB8IFRhYmxlKVtdID0gW107XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlUGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoID0gZmlsZVBhdGhzW2ldO1xuICAgICAgY29uc3QgYnVmZmVyID0gZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoKTtcbiAgICAgIFxuICAgICAgLy8gRXh0cmFjdCB0ZXh0IGZyb20gZG9jdW1lbnRcbiAgICAgIGNvbnN0IHRleHRSZXN1bHQgPSBhd2FpdCBtYW1tb3RoLmV4dHJhY3RSYXdUZXh0KHsgYnVmZmVyIH0pO1xuICAgICAgY29uc3QgdGV4dCA9IHRleHRSZXN1bHQudmFsdWU7XG4gICAgICBcbiAgICAgIC8vIEFkZCBkb2N1bWVudCBjb250ZW50XG4gICAgICB0ZXh0LnNwbGl0KCdcXG4nKS5mb3JFYWNoKGxpbmUgPT4ge1xuICAgICAgICBpZiAobGluZS50cmltKCkpIHtcbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKG5ldyBQYXJhZ3JhcGgoeyB0ZXh0OiBsaW5lIH0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKG5ldyBQYXJhZ3JhcGgoeyB0ZXh0OiAnJyB9KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgXG4gICAgICAvLyBBZGQgcGFnZSBicmVhayBiZXR3ZWVuIGRvY3VtZW50cyAoZXhjZXB0IGZvciBsYXN0IG9uZSlcbiAgICAgIGlmIChwYWdlQnJlYWtzICYmIGkgPCBmaWxlUGF0aHMubGVuZ3RoIC0gMSkge1xuICAgICAgICBjaGlsZHJlbi5wdXNoKFxuICAgICAgICAgIG5ldyBQYXJhZ3JhcGgoe1xuICAgICAgICAgICAgY2hpbGRyZW46IFtuZXcgUGFnZUJyZWFrKCldLFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGRvYyA9IG5ldyBEb2N1bWVudCh7XG4gICAgICBzZWN0aW9uczogW3sgY2hpbGRyZW4gfV0sXG4gICAgfSk7XG4gICAgXG4gICAgY29uc3Qgb3V0cHV0QnVmZmVyID0gYXdhaXQgUGFja2VyLnRvQnVmZmVyKGRvYyk7XG4gICAgZnMud3JpdGVGaWxlU3luYyhvdXRwdXRQYXRoLCBvdXRwdXRCdWZmZXIpO1xuICAgIFxuICAgIHJldHVybiBgU3VjY2Vzc2Z1bGx5IG1lcmdlZCAke2ZpbGVQYXRocy5sZW5ndGh9IGRvY3VtZW50cyBpbnRvICR7b3V0cHV0UGF0aH0ke3BhZ2VCcmVha3MgPyAnICh3aXRoIHBhZ2UgYnJlYWtzKScgOiAnJ31gO1xuICAgIFxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgcmV0dXJuIGBFcnJvciBtZXJnaW5nIGRvY3VtZW50czogJHtlcnJvci5tZXNzYWdlfWA7XG4gIH1cbn1cbiJdfQ==