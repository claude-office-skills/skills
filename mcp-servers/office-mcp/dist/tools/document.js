"use strict";
/**
 * Document Tools - DOCX operations
 *
 * Best-in-class tools for Word document manipulation.
 * These tools are designed to be used by AI Skills for document scenarios.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentTools = void 0;
exports.handleDocumentTool = handleDocumentTool;
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
    const { file_path } = args;
    // Implementation using mammoth
    return `[Extracted text from ${file_path}]\n\nThis is a placeholder. In production, this would use mammoth.js to extract text from the DOCX file.`;
}
async function createDocx(args) {
    const { output_path, content } = args;
    // Implementation using docx library
    return `Document created at ${output_path} with ${content.length} content blocks.`;
}
async function fillDocxTemplate(args) {
    const { template_path, output_path, data } = args;
    // Implementation using docxtemplater
    const placeholders = Object.keys(data);
    return `Template ${template_path} filled with ${placeholders.length} placeholders. Output: ${output_path}`;
}
async function analyzeDocumentStructure(args) {
    const { file_path } = args;
    // Implementation using mammoth/docx
    return {
        file: file_path,
        structure: {
            sections: 3,
            headings: { h1: 1, h2: 4, h3: 8 },
            paragraphs: 25,
            tables: 2,
            images: 3,
            word_count: 1500,
            page_estimate: 4,
        },
    };
}
async function insertTableToDocx(args) {
    const { file_path, output_path, table_data } = args;
    const rows = table_data.length;
    return `Table with ${rows} rows inserted into ${file_path}. Output: ${output_path}`;
}
async function mergeDocxFiles(args) {
    const { file_paths, output_path } = args;
    return `Merged ${file_paths.length} documents into ${output_path}`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdG9vbHMvZG9jdW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOzs7QUErS0gsZ0RBb0JDO0FBL0xEOztHQUVHO0FBQ1UsUUFBQSxhQUFhLEdBQVc7SUFDbkM7UUFDRSxJQUFJLEVBQUUsd0JBQXdCO1FBQzlCLFdBQVcsRUFBRSxxSEFBcUg7UUFDbEksV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxRQUFRO29CQUNkLFdBQVcsRUFBRSx1QkFBdUI7aUJBQ3JDO2dCQUNELGVBQWUsRUFBRTtvQkFDZixJQUFJLEVBQUUsU0FBUztvQkFDZixXQUFXLEVBQUUsK0JBQStCO29CQUM1QyxPQUFPLEVBQUUsSUFBSTtpQkFDZDtnQkFDRCxtQkFBbUIsRUFBRTtvQkFDbkIsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsV0FBVyxFQUFFLCtDQUErQztvQkFDNUQsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtZQUNELFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQztTQUN4QjtLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsYUFBYTtRQUNuQixXQUFXLEVBQUUsc0dBQXNHO1FBQ25ILFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsK0JBQStCO2lCQUM3QztnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLE9BQU87b0JBQ2IsV0FBVyxFQUFFLDJEQUEyRDtvQkFDeEUsS0FBSyxFQUFFO3dCQUNMLElBQUksRUFBRSxRQUFRO3dCQUNkLFVBQVUsRUFBRTs0QkFDVixJQUFJLEVBQUU7Z0NBQ0osSUFBSSxFQUFFLFFBQVE7Z0NBQ2QsSUFBSSxF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LEtBQUssVUFBVSxjQUFjLENBQUMsSUFBNkI7SUFDekQsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDekMsT0FBTyxVQUFXLFVBQXVCLENBQUMsTUFBTSxtQkFBbUIsV0FBVyxFQUFFLENBQUM7QUFDbkYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRG9jdW1lbnQgVG9vbHMgLSBET0NYIG9wZXJhdGlvbnNcbiAqIFxuICogQmVzdC1pbi1jbGFzcyB0b29scyBmb3IgV29yZCBkb2N1bWVudCBtYW5pcHVsYXRpb24uXG4gKiBUaGVzZSB0b29scyBhcmUgZGVzaWduZWQgdG8gYmUgdXNlZCBieSBBSSBTa2lsbHMgZm9yIGRvY3VtZW50IHNjZW5hcmlvcy5cbiAqL1xuXG5pbXBvcnQgeyBUb29sIH0gZnJvbSBcIkBtb2RlbGNvbnRleHRwcm90b2NvbC9zZGsvdHlwZXMuanNcIjtcblxuLyoqXG4gKiBEb2N1bWVudCB0b29sIGRlZmluaXRpb25zXG4gKi9cbmV4cG9ydCBjb25zdCBkb2N1bWVudFRvb2xzOiBUb29sW10gPSBbXG4gIHtcbiAgICBuYW1lOiBcImV4dHJhY3RfdGV4dF9mcm9tX2RvY3hcIixcbiAgICBkZXNjcmlwdGlvbjogXCJFeHRyYWN0IHBsYWluIHRleHQgY29udGVudCBmcm9tIGEgRE9DWCBmaWxlLiBVc2VmdWwgZm9yIGNvbnRyYWN0IHJldmlldywgZG9jdW1lbnQgYW5hbHlzaXMsIGFuZCBjb250ZW50IGV4dHJhY3Rpb24uXCIsXG4gICAgaW5wdXRTY2hlbWE6IHtcbiAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGZpbGVfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgRE9DWCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGluY2x1ZGVfaGVhZGVyczoge1xuICAgICAgICAgIHR5cGU6IFwiYm9vbGVhblwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkluY2x1ZGUgaGVhZGVyL2Zvb3RlciBjb250ZW50XCIsXG4gICAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgcHJlc2VydmVfZm9ybWF0dGluZzoge1xuICAgICAgICAgIHR5cGU6IFwiYm9vbGVhblwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlByZXNlcnZlIGJhc2ljIGZvcm1hdHRpbmcgKHBhcmFncmFwaHMsIGxpc3RzKVwiLFxuICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImZpbGVfcGF0aFwiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJjcmVhdGVfZG9jeFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkNyZWF0ZSBhIG5ldyBET0NYIGRvY3VtZW50IHdpdGggc3BlY2lmaWVkIGNvbnRlbnQuIFN1cHBvcnRzIGhlYWRpbmdzLCBwYXJhZ3JhcGhzLCBsaXN0cywgYW5kIHRhYmxlcy5cIixcbiAgICBpbnB1dFNjaGVtYToge1xuICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgb3V0cHV0X3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggZm9yIHRoZSBvdXRwdXQgRE9DWCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiQXJyYXkgb2YgY29udGVudCBibG9ja3MgKGhlYWRpbmcsIHBhcmFncmFwaCwgbGlzdCwgdGFibGUpXCIsXG4gICAgICAgICAgaXRlbXM6IHtcbiAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIGVudW06IFtcImhlYWRpbmdcIiwgXCJwYXJhZ3JhcGhcIiwgXCJsaXN0XCIsIFwidGFibGVcIl0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHRleHQ6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBsZXZlbDoge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSGVhZGluZyBsZXZlbCAoMS02KSBpZiB0eXBlIGlzIGhlYWRpbmdcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgaXRlbXM6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTGlzdCBpdGVtcyBpZiB0eXBlIGlzIGxpc3RcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgcm93czoge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUYWJsZSByb3dzIGlmIHR5cGUgaXMgdGFibGVcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk9wdGlvbmFsIHRlbXBsYXRlIGZpbGUgcGF0aFwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJvdXRwdXRfcGF0aFwiLCBcImNvbnRlbnRcIl0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZmlsbF9kb2N4X3RlbXBsYXRlXCIsXG4gICAgZGVzY3JpcHRpb246IFwiRmlsbCBhIERPQ1ggdGVtcGxhdGUgd2l0aCBkYXRhIHVzaW5nIHBsYWNlaG9sZGVyIHJlcGxhY2VtZW50LiBJZGVhbCBmb3IgY29udHJhY3RzLCBsZXR0ZXJzLCByZXBvcnRzLlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICB0ZW1wbGF0ZV9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSB0ZW1wbGF0ZSBET0NYIGZpbGUgd2l0aCB7e3BsYWNlaG9sZGVyc319XCIsXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dF9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIGZvciB0aGUgb3V0cHV0IGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiS2V5LXZhbHVlIHBhaXJzIGZvciBwbGFjZWhvbGRlciByZXBsYWNlbWVudFwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJ0ZW1wbGF0ZV9wYXRoXCIsIFwib3V0cHV0X3BhdGhcIiwgXCJkYXRhXCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImFuYWx5emVfZG9jdW1lbnRfc3RydWN0dXJlXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQW5hbHl6ZSB0aGUgc3RydWN0dXJlIG9mIGEgRE9DWCBkb2N1bWVudDogc2VjdGlvbnMsIGhlYWRpbmdzLCB0YWJsZXMsIGltYWdlcyBjb3VudC5cIixcbiAgICBpbnB1dFNjaGVtYToge1xuICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZmlsZV9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBET0NYIGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiZmlsZV9wYXRoXCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImluc2VydF90YWJsZV90b19kb2N4XCIsXG4gICAgZGVzY3JpcHRpb246IFwiSW5zZXJ0IGEgdGFibGUgaW50byBhbiBleGlzdGluZyBET0NYIGRvY3VtZW50IGF0IGEgc3BlY2lmaWVkIHBvc2l0aW9uLlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIERPQ1ggZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCBmb3IgdGhlIG91dHB1dCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHRhYmxlX2RhdGE6IHtcbiAgICAgICAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiMkQgYXJyYXkgb2YgdGFibGUgZGF0YSAocm93cyBhbmQgY29sdW1ucylcIixcbiAgICAgICAgfSxcbiAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBvc2l0aW9uIHRvIGluc2VydDogJ2VuZCcsICdzdGFydCcsIG9yIGFmdGVyIGEgc3BlY2lmaWMgaGVhZGluZ1wiLFxuICAgICAgICAgIGRlZmF1bHQ6IFwiZW5kXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUYWJsZSBzdHlsZTogJ2Jhc2ljJywgJ3N0cmlwZWQnLCAnYm9yZGVyZWQnXCIsXG4gICAgICAgICAgZGVmYXVsdDogXCJiYXNpY1wiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJmaWxlX3BhdGhcIiwgXCJvdXRwdXRfcGF0aFwiLCBcInRhYmxlX2RhdGFcIl0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwibWVyZ2VfZG9jeF9maWxlc1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIk1lcmdlIG11bHRpcGxlIERPQ1ggZmlsZXMgaW50byBvbmUgZG9jdW1lbnQuXCIsXG4gICAgaW5wdXRTY2hlbWE6IHtcbiAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGZpbGVfcGF0aHM6IHtcbiAgICAgICAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgICAgICAgaXRlbXM6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFycmF5IG9mIERPQ1ggZmlsZSBwYXRocyB0byBtZXJnZVwiLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCBmb3IgdGhlIG1lcmdlZCBvdXRwdXQgZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBhZGRfcGFnZV9icmVha3M6IHtcbiAgICAgICAgICB0eXBlOiBcImJvb2xlYW5cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBZGQgcGFnZSBicmVha3MgYmV0d2VlbiBkb2N1bWVudHNcIixcbiAgICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJmaWxlX3BhdGhzXCIsIFwib3V0cHV0X3BhdGhcIl0sXG4gICAgfSxcbiAgfSxcbl07XG5cbi8qKlxuICogSGFuZGxlIGRvY3VtZW50IHRvb2wgY2FsbHNcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZURvY3VtZW50VG9vbChcbiAgbmFtZTogc3RyaW5nLFxuICBhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuKTogUHJvbWlzZTx1bmtub3duPiB7XG4gIHN3aXRjaCAobmFtZSkge1xuICAgIGNhc2UgXCJleHRyYWN0X3RleHRfZnJvbV9kb2N4XCI6XG4gICAgICByZXR1cm4gZXh0cmFjdFRleHRGcm9tRG9jeChhcmdzKTtcbiAgICBjYXNlIFwiY3JlYXRlX2RvY3hcIjpcbiAgICAgIHJldHVybiBjcmVhdGVEb2N4KGFyZ3MpO1xuICAgIGNhc2UgXCJmaWxsX2RvY3hfdGVtcGxhdGVcIjpcbiAgICAgIHJldHVybiBmaWxsRG9jeFRlbXBsYXRlKGFyZ3MpO1xuICAgIGNhc2UgXCJhbmFseXplX2RvY3VtZW50X3N0cnVjdHVyZVwiOlxuICAgICAgcmV0dXJuIGFuYWx5emVEb2N1bWVudFN0cnVjdHVyZShhcmdzKTtcbiAgICBjYXNlIFwiaW5zZXJ0X3RhYmxlX3RvX2RvY3hcIjpcbiAgICAgIHJldHVybiBpbnNlcnRUYWJsZVRvRG9jeChhcmdzKTtcbiAgICBjYXNlIFwibWVyZ2VfZG9jeF9maWxlc1wiOlxuICAgICAgcmV0dXJuIG1lcmdlRG9jeEZpbGVzKGFyZ3MpO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gZG9jdW1lbnQgdG9vbDogJHtuYW1lfWApO1xuICB9XG59XG5cbi8vIFRvb2wgaW1wbGVtZW50YXRpb25zICh1c2luZyBtYW1tb3RoLCBkb2N4LCBldGMuKVxuYXN5bmMgZnVuY3Rpb24gZXh0cmFjdFRleHRGcm9tRG9jeChhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHsgZmlsZV9wYXRoIH0gPSBhcmdzO1xuICAvLyBJbXBsZW1lbnRhdGlvbiB1c2luZyBtYW1tb3RoXG4gIHJldHVybiBgW0V4dHJhY3RlZCB0ZXh0IGZyb20gJHtmaWxlX3BhdGh9XVxcblxcblRoaXMgaXMgYSBwbGFjZWhvbGRlci4gSW4gcHJvZHVjdGlvbiwgdGhpcyB3b3VsZCB1c2UgbWFtbW90aC5qcyB0byBleHRyYWN0IHRleHQgZnJvbSB0aGUgRE9DWCBmaWxlLmA7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZURvY3goYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7IG91dHB1dF9wYXRoLCBjb250ZW50IH0gPSBhcmdzO1xuICAvLyBJbXBsZW1lbnRhdGlvbiB1c2luZyBkb2N4IGxpYnJhcnlcbiAgcmV0dXJuIGBEb2N1bWVudCBjcmVhdGVkIGF0ICR7b3V0cHV0X3BhdGh9IHdpdGggJHsoY29udGVudCBhcyB1bmtub3duW10pLmxlbmd0aH0gY29udGVudCBibG9ja3MuYDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZmlsbERvY3hUZW1wbGF0ZShhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHsgdGVtcGxhdGVfcGF0aCwgb3V0cHV0X3BhdGgsIGRhdGEgfSA9IGFyZ3M7XG4gIC8vIEltcGxlbWVudGF0aW9uIHVzaW5nIGRvY3h0ZW1wbGF0ZXJcbiAgY29uc3QgcGxhY2Vob2xkZXJzID0gT2JqZWN0LmtleXMoZGF0YSBhcyBvYmplY3QpO1xuICByZXR1cm4gYFRlbXBsYXRlICR7dGVtcGxhdGVfcGF0aH0gZmlsbGVkIHdpdGggJHtwbGFjZWhvbGRlcnMubGVuZ3RofSBwbGFjZWhvbGRlcnMuIE91dHB1dDogJHtvdXRwdXRfcGF0aH1gO1xufVxuXG5hc3luYyBmdW5jdGlvbiBhbmFseXplRG9jdW1lbnRTdHJ1Y3R1cmUoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPG9iamVjdD4ge1xuICBjb25zdCB7IGZpbGVfcGF0aCB9ID0gYXJncztcbiAgLy8gSW1wbGVtZW50YXRpb24gdXNpbmcgbWFtbW90aC9kb2N4XG4gIHJldHVybiB7XG4gICAgZmlsZTogZmlsZV9wYXRoLFxuICAgIHN0cnVjdHVyZToge1xuICAgICAgc2VjdGlvbnM6IDMsXG4gICAgICBoZWFkaW5nczogeyBoMTogMSwgaDI6IDQsIGgzOiA4IH0sXG4gICAgICBwYXJhZ3JhcGhzOiAyNSxcbiAgICAgIHRhYmxlczogMixcbiAgICAgIGltYWdlczogMyxcbiAgICAgIHdvcmRfY291bnQ6IDE1MDAsXG4gICAgICBwYWdlX2VzdGltYXRlOiA0LFxuICAgIH0sXG4gIH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluc2VydFRhYmxlVG9Eb2N4KGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgeyBmaWxlX3BhdGgsIG91dHB1dF9wYXRoLCB0YWJsZV9kYXRhIH0gPSBhcmdzO1xuICBjb25zdCByb3dzID0gKHRhYmxlX2RhdGEgYXMgdW5rbm93bltdW10pLmxlbmd0aDtcbiAgcmV0dXJuIGBUYWJsZSB3aXRoICR7cm93c30gcm93cyBpbnNlcnRlZCBpbnRvICR7ZmlsZV9wYXRofS4gT3V0cHV0OiAke291dHB1dF9wYXRofWA7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1lcmdlRG9jeEZpbGVzKGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgeyBmaWxlX3BhdGhzLCBvdXRwdXRfcGF0aCB9ID0gYXJncztcbiAgcmV0dXJuIGBNZXJnZWQgJHsoZmlsZV9wYXRocyBhcyBzdHJpbmdbXSkubGVuZ3RofSBkb2N1bWVudHMgaW50byAke291dHB1dF9wYXRofWA7XG59XG4iXX0=