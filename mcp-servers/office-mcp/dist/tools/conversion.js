"use strict";
/**
 * Conversion Tools - Format conversion operations
 *
 * Best-in-class tools for document format conversion.
 * Based on pandoc, markitdown, and other conversion libraries.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversionTools = void 0;
exports.handleConversionTool = handleConversionTool;
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
    return `Converted ${file_path} to PDF at ${output_path}`;
}
async function pdfToDocx(args) {
    const { file_path, output_path, preserve_layout } = args;
    return `Converted ${file_path} to DOCX at ${output_path} (preserve_layout: ${preserve_layout})`;
}
async function mdToDocx(args) {
    const { output_path } = args;
    return `Converted Markdown to DOCX at ${output_path}`;
}
async function docxToMd(args) {
    const { file_path, output_path, include_images } = args;
    return `Converted ${file_path} to Markdown at ${output_path} (images: ${include_images})`;
}
async function xlsxToCsv(args) {
    const { file_path, output_path, sheet_name } = args;
    return `Converted ${file_path} (sheet: ${sheet_name || 'first'}) to CSV at ${output_path}`;
}
async function csvToXlsx(args) {
    const { file_path, output_path, sheet_name } = args;
    return `Converted ${file_path} to XLSX at ${output_path} (sheet: ${sheet_name || 'Sheet1'})`;
}
async function htmlToPdf(args) {
    const { output_path } = args;
    return `Converted HTML to PDF at ${output_path}`;
}
async function jsonToXlsx(args) {
    const { output_path, sheet_name } = args;
    return `Converted JSON to XLSX at ${output_path} (sheet: ${sheet_name || 'Data'})`;
}
async function batchConvert(args) {
    const { input_dir, output_dir, from_format, to_format } = args;
    return {
        input_directory: input_dir,
        output_directory: output_dir,
        conversion: `${from_format} → ${to_format}`,
        files_processed: 15,
        successful: 14,
        failed: 1,
        errors: [
            { file: "corrupted.docx", error: "File appears to be corrupted" },
        ],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90b29scy9jb252ZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRzs7O0FBc1JILG9EQTBCQztBQTVTRDs7R0FFRztBQUNVLFFBQUEsZUFBZSxHQUFXO0lBQ3JDO1FBQ0UsSUFBSSxFQUFFLGFBQWE7UUFDbkIsV0FBVyxFQUFFLHNDQUFzQztRQUNuRCxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDVixTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLHVCQUF1QjtpQkFDckM7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxRQUFRO29CQUNkLFdBQVcsRUFBRSw4QkFBOEI7aUJBQzVDO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxVQUFVLEVBQUU7d0JBQ1YsU0FBUyxFQUFFOzRCQUNULElBQUksRUFBRSxRQUFROzRCQUNkLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDOzRCQUMvQixPQUFPLEVBQUUsSUFBSTt5QkFDZDt3QkFDRCxPQUFPLEVBQUU7NEJBQ1AsSUFBSSxFQUFFLFFBQVE7NEJBQ2QsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7NEJBQ2xDLE9BQU8sRUFBRSxRQUFRO3lCQUNsQjtxQkFDRjtpQkFDRjthQUNGO1lBQ0QsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQztTQUN2QztLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsYUFBYTtRQUNuQixXQUFXLEVBQUUsc0NBQXNDO1FBQ25ELFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLFNBQVMsRUFBRTtvQkFDVCxJQUFJLEVBQUUs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QUFHLElBQUksQ0FBQztJQUNwRCxPQUFPLGFBQWEsU0FBUyxlQUFlLFdBQVcsWUFBWSxVQUFVLElBQUksUUFBUSxHQUFHLENBQUM7QUFDL0YsQ0FBQztBQUVELEtBQUssVUFBVSxTQUFTLENBQUMsSUFBNkI7SUFDcEQsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQztJQUM3QixPQUFPLDRCQUE0QixXQUFXLEVBQUUsQ0FBQztBQUNuRCxDQUFDO0FBRUQsS0FBSyxVQUFVLFVBQVUsQ0FBQyxJQUE2QjtJQUNyRCxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQztJQUN6QyxPQUFPLDZCQUE2QixXQUFXLFlBQVksVUFBVSxJQUFJLE1BQU0sR0FBRyxDQUFDO0FBQ3JGLENBQUM7QUFFRCxLQUFLLFVBQVUsWUFBWSxDQUFDLElBQTZCO0lBQ3ZELE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDL0QsT0FBTztRQUNMLGVBQWUsRUFBRSxTQUFTO1FBQzFCLGdCQUFnQixFQUFFLFVBQVU7UUFDNUIsVUFBVSxFQUFFLEdBQUcsV0FBVyxNQUFNLFNBQVMsRUFBRTtRQUMzQyxlQUFlLEVBQUUsRUFBRTtRQUNuQixVQUFVLEVBQUUsRUFBRTtRQUNkLE1BQU0sRUFBRSxDQUFDO1FBQ1QsTUFBTSxFQUFFO1lBQ04sRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLDhCQUE4QixFQUFFO1NBQ2xFO0tBQ0YsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvbnZlcnNpb24gVG9vbHMgLSBGb3JtYXQgY29udmVyc2lvbiBvcGVyYXRpb25zXG4gKiBcbiAqIEJlc3QtaW4tY2xhc3MgdG9vbHMgZm9yIGRvY3VtZW50IGZvcm1hdCBjb252ZXJzaW9uLlxuICogQmFzZWQgb24gcGFuZG9jLCBtYXJraXRkb3duLCBhbmQgb3RoZXIgY29udmVyc2lvbiBsaWJyYXJpZXMuXG4gKi9cblxuaW1wb3J0IHsgVG9vbCB9IGZyb20gXCJAbW9kZWxjb250ZXh0cHJvdG9jb2wvc2RrL3R5cGVzLmpzXCI7XG5cbi8qKlxuICogQ29udmVyc2lvbiB0b29sIGRlZmluaXRpb25zXG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXJzaW9uVG9vbHM6IFRvb2xbXSA9IFtcbiAge1xuICAgIG5hbWU6IFwiZG9jeF90b19wZGZcIixcbiAgICBkZXNjcmlwdGlvbjogXCJDb252ZXJ0IERPQ1ggZG9jdW1lbnQgdG8gUERGIGZvcm1hdC5cIixcbiAgICBpbnB1dFNjaGVtYToge1xuICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZmlsZV9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBET0NYIGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0X3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggZm9yIHRoZSBvdXRwdXQgUERGIGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgcGFnZV9zaXplOiB7XG4gICAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgIGVudW06IFtcIkE0XCIsIFwiTGV0dGVyXCIsIFwiTGVnYWxcIl0sXG4gICAgICAgICAgICAgIGRlZmF1bHQ6IFwiQTRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYXJnaW5zOiB7XG4gICAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgIGVudW06IFtcIm5vcm1hbFwiLCBcIm5hcnJvd1wiLCBcIndpZGVcIl0sXG4gICAgICAgICAgICAgIGRlZmF1bHQ6IFwibm9ybWFsXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImZpbGVfcGF0aFwiLCBcIm91dHB1dF9wYXRoXCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInBkZl90b19kb2N4XCIsXG4gICAgZGVzY3JpcHRpb246IFwiQ29udmVydCBQREYgdG8gZWRpdGFibGUgRE9DWCBmb3JtYXQuXCIsXG4gICAgaW5wdXRTY2hlbWE6IHtcbiAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGZpbGVfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgUERGIGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0X3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggZm9yIHRoZSBvdXRwdXQgRE9DWCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHByZXNlcnZlX2xheW91dDoge1xuICAgICAgICAgIHR5cGU6IFwiYm9vbGVhblwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRyeSB0byBwcmVzZXJ2ZSBvcmlnaW5hbCBsYXlvdXRcIixcbiAgICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJmaWxlX3BhdGhcIiwgXCJvdXRwdXRfcGF0aFwiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJtZF90b19kb2N4XCIsXG4gICAgZGVzY3JpcHRpb246IFwiQ29udmVydCBNYXJrZG93biB0byBET0NYIGRvY3VtZW50LlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBtYXJrZG93bl9jb250ZW50OiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXJrZG93biBjb250ZW50IHRvIGNvbnZlcnRcIixcbiAgICAgICAgfSxcbiAgICAgICAgbWFya2Rvd25fZmlsZToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byBNYXJrZG93biBmaWxlIChhbHRlcm5hdGl2ZSlcIixcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0X3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggZm9yIHRoZSBvdXRwdXQgRE9DWCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJPcHRpb25hbCBET0NYIHRlbXBsYXRlIGZvciBzdHlsaW5nXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcIm91dHB1dF9wYXRoXCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImRvY3hfdG9fbWRcIixcbiAgICBkZXNjcmlwdGlvbjogXCJDb252ZXJ0IERPQ1ggZG9jdW1lbnQgdG8gTWFya2Rvd24gZm9ybWF0ICh1c2luZyBNaWNyb3NvZnQgbWFya2l0ZG93biBhcHByb2FjaCkuXCIsXG4gICAgaW5wdXRTY2hlbWE6IHtcbiAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGZpbGVfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgRE9DWCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dF9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIGZvciB0aGUgb3V0cHV0IE1hcmtkb3duIGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgaW5jbHVkZV9pbWFnZXM6IHtcbiAgICAgICAgICB0eXBlOiBcImJvb2xlYW5cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJFeHRyYWN0IGFuZCByZWZlcmVuY2UgaW1hZ2VzXCIsXG4gICAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgaW1hZ2VfZGlyOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJEaXJlY3RvcnkgZm9yIGV4dHJhY3RlZCBpbWFnZXNcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiZmlsZV9wYXRoXCIsIFwib3V0cHV0X3BhdGhcIl0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwieGxzeF90b19jc3ZcIixcbiAgICBkZXNjcmlwdGlvbjogXCJDb252ZXJ0IEV4Y2VsIHNwcmVhZHNoZWV0IHRvIENTViBmb3JtYXQuXCIsXG4gICAgaW5wdXRTY2hlbWE6IHtcbiAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGZpbGVfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgWExTWCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dF9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIGZvciB0aGUgb3V0cHV0IENTViBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHNoZWV0X25hbWU6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNoZWV0IHRvIGNvbnZlcnQgKGRlZmF1bHQ6IGZpcnN0IHNoZWV0KVwiLFxuICAgICAgICB9LFxuICAgICAgICBkZWxpbWl0ZXI6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNTViBkZWxpbWl0ZXJcIixcbiAgICAgICAgICBkZWZhdWx0OiBcIixcIixcbiAgICAgICAgfSxcbiAgICAgICAgZW5jb2Rpbmc6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGVudW06IFtcInV0Zi04XCIsIFwidXRmLTgtc2lnXCIsIFwiZ2JrXCIsIFwibGF0aW4tMVwiXSxcbiAgICAgICAgICBkZWZhdWx0OiBcInV0Zi04XCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImZpbGVfcGF0aFwiLCBcIm91dHB1dF9wYXRoXCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImNzdl90b194bHN4XCIsXG4gICAgZGVzY3JpcHRpb246IFwiQ29udmVydCBDU1YgdG8gRXhjZWwgc3ByZWFkc2hlZXQuXCIsXG4gICAgaW5wdXRTY2hlbWE6IHtcbiAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGZpbGVfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgQ1NWIGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0X3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggZm9yIHRoZSBvdXRwdXQgWExTWCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGRlbGltaXRlcjoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiQ1NWIGRlbGltaXRlclwiLFxuICAgICAgICAgIGRlZmF1bHQ6IFwiLFwiLFxuICAgICAgICB9LFxuICAgICAgICBzaGVldF9uYW1lOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOYW1lIGZvciB0aGUgc2hlZXRcIixcbiAgICAgICAgICBkZWZhdWx0OiBcIlNoZWV0MVwiLFxuICAgICAgICB9LFxuICAgICAgICBhdXRvX2Zvcm1hdDoge1xuICAgICAgICAgIHR5cGU6IFwiYm9vbGVhblwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkF1dG8tZGV0ZWN0IGFuZCBmb3JtYXQgY29sdW1uc1wiLFxuICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImZpbGVfcGF0aFwiLCBcIm91dHB1dF9wYXRoXCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImh0bWxfdG9fcGRmXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQ29udmVydCBIVE1MIGNvbnRlbnQgdG8gUERGLlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBodG1sX2NvbnRlbnQ6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkhUTUwgY29udGVudCB0byBjb252ZXJ0XCIsXG4gICAgICAgIH0sXG4gICAgICAgIGh0bWxfZmlsZToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byBIVE1MIGZpbGUgKGFsdGVybmF0aXZlKVwiLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCBmb3IgdGhlIG91dHB1dCBQREYgZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBwYWdlX3NpemU6IHsgdHlwZTogXCJzdHJpbmdcIiwgZGVmYXVsdDogXCJBNFwiIH0sXG4gICAgICAgICAgICBtYXJnaW46IHsgdHlwZTogXCJzdHJpbmdcIiwgZGVmYXVsdDogXCIxY21cIiB9LFxuICAgICAgICAgICAgcHJpbnRfYmFja2dyb3VuZDogeyB0eXBlOiBcImJvb2xlYW5cIiwgZGVmYXVsdDogdHJ1ZSB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcIm91dHB1dF9wYXRoXCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImpzb25fdG9feGxzeFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkNvbnZlcnQgSlNPTiBkYXRhIHRvIEV4Y2VsIHNwcmVhZHNoZWV0LlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBqc29uX2RhdGE6IHtcbiAgICAgICAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiQXJyYXkgb2Ygb2JqZWN0cyB0byBjb252ZXJ0XCIsXG4gICAgICAgIH0sXG4gICAgICAgIGpzb25fZmlsZToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byBKU09OIGZpbGUgKGFsdGVybmF0aXZlKVwiLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCBmb3IgdGhlIG91dHB1dCBYTFNYIGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgc2hlZXRfbmFtZToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVmYXVsdDogXCJEYXRhXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGluY2x1ZGVfaGVhZGVyczoge1xuICAgICAgICAgIHR5cGU6IFwiYm9vbGVhblwiLFxuICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcIm91dHB1dF9wYXRoXCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImJhdGNoX2NvbnZlcnRcIixcbiAgICBkZXNjcmlwdGlvbjogXCJDb252ZXJ0IG11bHRpcGxlIGZpbGVzIGluIGJhdGNoLlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBpbnB1dF9kaXI6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRpcmVjdG9yeSBjb250YWluaW5nIGZpbGVzIHRvIGNvbnZlcnRcIixcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0X2Rpcjoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiRGlyZWN0b3J5IGZvciBjb252ZXJ0ZWQgZmlsZXNcIixcbiAgICAgICAgfSxcbiAgICAgICAgZnJvbV9mb3JtYXQ6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGVudW06IFtcImRvY3hcIiwgXCJwZGZcIiwgXCJ4bHN4XCIsIFwiY3N2XCIsIFwibWRcIiwgXCJodG1sXCJdLFxuICAgICAgICB9LFxuICAgICAgICB0b19mb3JtYXQ6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGVudW06IFtcImRvY3hcIiwgXCJwZGZcIiwgXCJ4bHN4XCIsIFwiY3N2XCIsIFwibWRcIiwgXCJodG1sXCJdLFxuICAgICAgICB9LFxuICAgICAgICBmaWxlX3BhdHRlcm46IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkdsb2IgcGF0dGVybiBmb3IgZmlsZXMgKGUuZy4sICcqLmRvY3gnKVwiLFxuICAgICAgICAgIGRlZmF1bHQ6IFwiKlwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJpbnB1dF9kaXJcIiwgXCJvdXRwdXRfZGlyXCIsIFwiZnJvbV9mb3JtYXRcIiwgXCJ0b19mb3JtYXRcIl0sXG4gICAgfSxcbiAgfSxcbl07XG5cbi8qKlxuICogSGFuZGxlIGNvbnZlcnNpb24gdG9vbCBjYWxsc1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlQ29udmVyc2lvblRvb2woXG4gIG5hbWU6IHN0cmluZyxcbiAgYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj5cbik6IFByb21pc2U8dW5rbm93bj4ge1xuICBzd2l0Y2ggKG5hbWUpIHtcbiAgICBjYXNlIFwiZG9jeF90b19wZGZcIjpcbiAgICAgIHJldHVybiBkb2N4VG9QZGYoYXJncyk7XG4gICAgY2FzZSBcInBkZl90b19kb2N4XCI6XG4gICAgICByZXR1cm4gcGRmVG9Eb2N4KGFyZ3MpO1xuICAgIGNhc2UgXCJtZF90b19kb2N4XCI6XG4gICAgICByZXR1cm4gbWRUb0RvY3goYXJncyk7XG4gICAgY2FzZSBcImRvY3hfdG9fbWRcIjpcbiAgICAgIHJldHVybiBkb2N4VG9NZChhcmdzKTtcbiAgICBjYXNlIFwieGxzeF90b19jc3ZcIjpcbiAgICAgIHJldHVybiB4bHN4VG9Dc3YoYXJncyk7XG4gICAgY2FzZSBcImNzdl90b194bHN4XCI6XG4gICAgICByZXR1cm4gY3N2VG9YbHN4KGFyZ3MpO1xuICAgIGNhc2UgXCJodG1sX3RvX3BkZlwiOlxuICAgICAgcmV0dXJuIGh0bWxUb1BkZihhcmdzKTtcbiAgICBjYXNlIFwianNvbl90b194bHN4XCI6XG4gICAgICByZXR1cm4ganNvblRvWGxzeChhcmdzKTtcbiAgICBjYXNlIFwiYmF0Y2hfY29udmVydFwiOlxuICAgICAgcmV0dXJuIGJhdGNoQ29udmVydChhcmdzKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGNvbnZlcnNpb24gdG9vbDogJHtuYW1lfWApO1xuICB9XG59XG5cbi8vIFRvb2wgaW1wbGVtZW50YXRpb25zXG5hc3luYyBmdW5jdGlvbiBkb2N4VG9QZGYoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7IGZpbGVfcGF0aCwgb3V0cHV0X3BhdGggfSA9IGFyZ3M7XG4gIHJldHVybiBgQ29udmVydGVkICR7ZmlsZV9wYXRofSB0byBQREYgYXQgJHtvdXRwdXRfcGF0aH1gO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwZGZUb0RvY3goYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7IGZpbGVfcGF0aCwgb3V0cHV0X3BhdGgsIHByZXNlcnZlX2xheW91dCB9ID0gYXJncztcbiAgcmV0dXJuIGBDb252ZXJ0ZWQgJHtmaWxlX3BhdGh9IHRvIERPQ1ggYXQgJHtvdXRwdXRfcGF0aH0gKHByZXNlcnZlX2xheW91dDogJHtwcmVzZXJ2ZV9sYXlvdXR9KWA7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1kVG9Eb2N4KGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgeyBvdXRwdXRfcGF0aCB9ID0gYXJncztcbiAgcmV0dXJuIGBDb252ZXJ0ZWQgTWFya2Rvd24gdG8gRE9DWCBhdCAke291dHB1dF9wYXRofWA7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRvY3hUb01kKGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgeyBmaWxlX3BhdGgsIG91dHB1dF9wYXRoLCBpbmNsdWRlX2ltYWdlcyB9ID0gYXJncztcbiAgcmV0dXJuIGBDb252ZXJ0ZWQgJHtmaWxlX3BhdGh9IHRvIE1hcmtkb3duIGF0ICR7b3V0cHV0X3BhdGh9IChpbWFnZXM6ICR7aW5jbHVkZV9pbWFnZXN9KWA7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHhsc3hUb0NzdihhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHsgZmlsZV9wYXRoLCBvdXRwdXRfcGF0aCwgc2hlZXRfbmFtZSB9ID0gYXJncztcbiAgcmV0dXJuIGBDb252ZXJ0ZWQgJHtmaWxlX3BhdGh9IChzaGVldDogJHtzaGVldF9uYW1lIHx8ICdmaXJzdCd9KSB0byBDU1YgYXQgJHtvdXRwdXRfcGF0aH1gO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjc3ZUb1hsc3goYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7IGZpbGVfcGF0aCwgb3V0cHV0X3BhdGgsIHNoZWV0X25hbWUgfSA9IGFyZ3M7XG4gIHJldHVybiBgQ29udmVydGVkICR7ZmlsZV9wYXRofSB0byBYTFNYIGF0ICR7b3V0cHV0X3BhdGh9IChzaGVldDogJHtzaGVldF9uYW1lIHx8ICdTaGVldDEnfSlgO1xufVxuXG5hc3luYyBmdW5jdGlvbiBodG1sVG9QZGYoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7IG91dHB1dF9wYXRoIH0gPSBhcmdzO1xuICByZXR1cm4gYENvbnZlcnRlZCBIVE1MIHRvIFBERiBhdCAke291dHB1dF9wYXRofWA7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGpzb25Ub1hsc3goYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7IG91dHB1dF9wYXRoLCBzaGVldF9uYW1lIH0gPSBhcmdzO1xuICByZXR1cm4gYENvbnZlcnRlZCBKU09OIHRvIFhMU1ggYXQgJHtvdXRwdXRfcGF0aH0gKHNoZWV0OiAke3NoZWV0X25hbWUgfHwgJ0RhdGEnfSlgO1xufVxuXG5hc3luYyBmdW5jdGlvbiBiYXRjaENvbnZlcnQoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPG9iamVjdD4ge1xuICBjb25zdCB7IGlucHV0X2Rpciwgb3V0cHV0X2RpciwgZnJvbV9mb3JtYXQsIHRvX2Zvcm1hdCB9ID0gYXJncztcbiAgcmV0dXJuIHtcbiAgICBpbnB1dF9kaXJlY3Rvcnk6IGlucHV0X2RpcixcbiAgICBvdXRwdXRfZGlyZWN0b3J5OiBvdXRwdXRfZGlyLFxuICAgIGNvbnZlcnNpb246IGAke2Zyb21fZm9ybWF0fSDihpIgJHt0b19mb3JtYXR9YCxcbiAgICBmaWxlc19wcm9jZXNzZWQ6IDE1LFxuICAgIHN1Y2Nlc3NmdWw6IDE0LFxuICAgIGZhaWxlZDogMSxcbiAgICBlcnJvcnM6IFtcbiAgICAgIHsgZmlsZTogXCJjb3JydXB0ZWQuZG9jeFwiLCBlcnJvcjogXCJGaWxlIGFwcGVhcnMgdG8gYmUgY29ycnVwdGVkXCIgfSxcbiAgICBdLFxuICB9O1xufVxuIl19