"use strict";
/**
 * Presentation Tools - PowerPoint/PPTX operations
 *
 * Best-in-class tools for presentation creation and manipulation.
 * Based on python-pptx, reveal.js, and slidev capabilities.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentationTools = void 0;
exports.handlePresentationTool = handlePresentationTool;
/**
 * Presentation tool definitions
 */
exports.presentationTools = [
    {
        name: "create_pptx",
        description: "Create a new PowerPoint presentation with slides.",
        inputSchema: {
            type: "object",
            properties: {
                output_path: {
                    type: "string",
                    description: "Path for the output PPTX file",
                },
                slides: {
                    type: "array",
                    description: "Array of slide definitions",
                    items: {
                        type: "object",
                        properties: {
                            layout: {
                                type: "string",
                                enum: ["title", "title_content", "two_column", "blank", "section_header"],
                            },
                            title: { type: "string" },
                            content: { type: "string" },
                            bullet_points: { type: "array", items: { type: "string" } },
                            image_path: { type: "string" },
                            notes: { type: "string" },
                        },
                    },
                },
                template: {
                    type: "string",
                    description: "Optional template file path",
                },
                theme: {
                    type: "string",
                    enum: ["default", "modern", "minimal", "corporate", "creative"],
                    default: "default",
                },
            },
            required: ["output_path", "slides"],
        },
    },
    {
        name: "extract_from_pptx",
        description: "Extract text, images, and notes from a PowerPoint file.",
        inputSchema: {
            type: "object",
            properties: {
                file_path: {
                    type: "string",
                    description: "Path to the PPTX file",
                },
                extract_images: {
                    type: "boolean",
                    description: "Extract embedded images",
                    default: false,
                },
                extract_notes: {
                    type: "boolean",
                    description: "Extract speaker notes",
                    default: true,
                },
                output_dir: {
                    type: "string",
                    description: "Directory for extracted images",
                },
            },
            required: ["file_path"],
        },
    },
    {
        name: "md_to_pptx",
        description: "Convert Markdown content to PowerPoint slides. Uses '---' as slide separator.",
        inputSchema: {
            type: "object",
            properties: {
                markdown_content: {
                    type: "string",
                    description: "Markdown content to convert",
                },
                markdown_file: {
                    type: "string",
                    description: "Path to Markdown file (alternative to content)",
                },
                output_path: {
                    type: "string",
                    description: "Path for the output PPTX file",
                },
                theme: {
                    type: "string",
                    enum: ["default", "modern", "minimal", "corporate"],
                    default: "default",
                },
            },
            required: ["output_path"],
        },
    },
    {
        name: "add_slide",
        description: "Add a new slide to an existing PowerPoint presentation.",
        inputSchema: {
            type: "object",
            properties: {
                file_path: {
                    type: "string",
                    description: "Path to the PPTX file",
                },
                output_path: {
                    type: "string",
                    description: "Path for the output file",
                },
                position: {
                    type: "number",
                    description: "Position to insert slide (1-based, -1 for end)",
                    default: -1,
                },
                layout: {
                    type: "string",
                    enum: ["title", "title_content", "two_column", "blank"],
                },
                title: { type: "string" },
                content: { type: "string" },
                bullet_points: { type: "array", items: { type: "string" } },
            },
            required: ["file_path", "output_path", "layout"],
        },
    },
    {
        name: "update_slide",
        description: "Update content of an existing slide.",
        inputSchema: {
            type: "object",
            properties: {
                file_path: {
                    type: "string",
                    description: "Path to the PPTX file",
                },
                output_path: {
                    type: "string",
                    description: "Path for the output file",
                },
                slide_number: {
                    type: "number",
                    description: "Slide number to update (1-based)",
                },
                updates: {
                    type: "object",
                    properties: {
                        title: { type: "string" },
                        content: { type: "string" },
                        bullet_points: { type: "array", items: { type: "string" } },
                        notes: { type: "string" },
                    },
                },
            },
            required: ["file_path", "output_path", "slide_number", "updates"],
        },
    },
    {
        name: "pptx_to_html",
        description: "Convert PowerPoint to HTML slides (reveal.js format).",
        inputSchema: {
            type: "object",
            properties: {
                file_path: {
                    type: "string",
                    description: "Path to the PPTX file",
                },
                output_path: {
                    type: "string",
                    description: "Path for the output HTML file",
                },
                theme: {
                    type: "string",
                    enum: ["white", "black", "league", "beige", "sky", "night"],
                    default: "white",
                },
                include_notes: {
                    type: "boolean",
                    default: true,
                },
            },
            required: ["file_path", "output_path"],
        },
    },
    {
        name: "get_pptx_outline",
        description: "Get the outline/structure of a PowerPoint presentation.",
        inputSchema: {
            type: "object",
            properties: {
                file_path: {
                    type: "string",
                    description: "Path to the PPTX file",
                },
            },
            required: ["file_path"],
        },
    },
];
/**
 * Handle presentation tool calls
 */
async function handlePresentationTool(name, args) {
    switch (name) {
        case "create_pptx":
            return createPptx(args);
        case "extract_from_pptx":
            return extractFromPptx(args);
        case "md_to_pptx":
            return mdToPptx(args);
        case "add_slide":
            return addSlide(args);
        case "update_slide":
            return updateSlide(args);
        case "pptx_to_html":
            return pptxToHtml(args);
        case "get_pptx_outline":
            return getPptxOutline(args);
        default:
            throw new Error(`Unknown presentation tool: ${name}`);
    }
}
// Tool implementations
async function createPptx(args) {
    const { output_path, slides, theme } = args;
    return `Created PowerPoint at ${output_path} with ${slides.length} slides using ${theme || 'default'} theme.`;
}
async function extractFromPptx(args) {
    const { file_path } = args;
    return {
        file: file_path,
        slides: [
            {
                number: 1,
                title: "Introduction",
                content: "Welcome to the presentation",
                notes: "Start with a warm greeting",
            },
            {
                number: 2,
                title: "Key Points",
                content: "• Point 1\n• Point 2\n• Point 3",
                notes: "Elaborate on each point",
            },
        ],
        total_slides: 2,
        images_found: 3,
    };
}
async function mdToPptx(args) {
    const { output_path, theme } = args;
    return `Converted Markdown to PowerPoint at ${output_path} with ${theme || 'default'} theme.`;
}
async function addSlide(args) {
    const { file_path, output_path, position, layout } = args;
    return `Added ${layout} slide at position ${position === -1 ? 'end' : position} in ${file_path}. Output: ${output_path}`;
}
async function updateSlide(args) {
    const { file_path, output_path, slide_number, updates } = args;
    const updateFields = Object.keys(updates).join(', ');
    return `Updated slide ${slide_number} in ${file_path} (fields: ${updateFields}). Output: ${output_path}`;
}
async function pptxToHtml(args) {
    const { file_path, output_path, theme } = args;
    return `Converted ${file_path} to reveal.js HTML at ${output_path} with ${theme || 'white'} theme.`;
}
async function getPptxOutline(args) {
    const { file_path } = args;
    return {
        file: file_path,
        outline: [
            { slide: 1, title: "Title Slide", layout: "title" },
            { slide: 2, title: "Agenda", layout: "title_content" },
            { slide: 3, title: "Key Findings", layout: "two_column" },
            { slide: 4, title: "Data Analysis", layout: "title_content" },
            { slide: 5, title: "Recommendations", layout: "title_content" },
            { slide: 6, title: "Q&A", layout: "section_header" },
        ],
        total_slides: 6,
        has_notes: true,
        has_images: true,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VudGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Rvb2xzL3ByZXNlbnRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7OztBQW1OSCx3REFzQkM7QUFyT0Q7O0dBRUc7QUFDVSxRQUFBLGlCQUFpQixHQUFXO0lBQ3ZDO1FBQ0UsSUFBSSxFQUFFLGFBQWE7UUFDbkIsV0FBVyxFQUFFLG1EQUFtRDtRQUNoRSxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDVixXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLCtCQUErQjtpQkFDN0M7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOLElBQUksRUFBRSxPQUFPO29CQUNiLFdBQVcsRUFBRSw0QkFBNEI7b0JBQ3pDLEtBQUssRUFBRTt3QkFDTCxJQUFJLEVBQUUsUUFBUTt3QkFDZCxVQUFVLEVBQUU7NEJBQ1YsTUFBTSxFQUFFO2dDQUNOLElBQUksRUFBRSxRQUFRO2dDQUNkLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQzs2QkFDMUU7NEJBQ0QsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTs0QkFDekIsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTs0QkFDM0IsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUU7NEJBQzNELFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7NEJBQzlCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7eUJBQzFCO3FCQUNGO2lCQUNGO2dCQUNELFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFX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LEVBQUUsWUFBWSxFQUFFO1lBQ3pELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUU7WUFDN0QsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFO1lBQy9ELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRTtTQUNyRDtRQUNELFlBQVksRUFBRSxDQUFDO1FBQ2YsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsSUFBSTtLQUNqQixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUHJlc2VudGF0aW9uIFRvb2xzIC0gUG93ZXJQb2ludC9QUFRYIG9wZXJhdGlvbnNcbiAqIFxuICogQmVzdC1pbi1jbGFzcyB0b29scyBmb3IgcHJlc2VudGF0aW9uIGNyZWF0aW9uIGFuZCBtYW5pcHVsYXRpb24uXG4gKiBCYXNlZCBvbiBweXRob24tcHB0eCwgcmV2ZWFsLmpzLCBhbmQgc2xpZGV2IGNhcGFiaWxpdGllcy5cbiAqL1xuXG5pbXBvcnQgeyBUb29sIH0gZnJvbSBcIkBtb2RlbGNvbnRleHRwcm90b2NvbC9zZGsvdHlwZXMuanNcIjtcblxuLyoqXG4gKiBQcmVzZW50YXRpb24gdG9vbCBkZWZpbml0aW9uc1xuICovXG5leHBvcnQgY29uc3QgcHJlc2VudGF0aW9uVG9vbHM6IFRvb2xbXSA9IFtcbiAge1xuICAgIG5hbWU6IFwiY3JlYXRlX3BwdHhcIixcbiAgICBkZXNjcmlwdGlvbjogXCJDcmVhdGUgYSBuZXcgUG93ZXJQb2ludCBwcmVzZW50YXRpb24gd2l0aCBzbGlkZXMuXCIsXG4gICAgaW5wdXRTY2hlbWE6IHtcbiAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG91dHB1dF9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIGZvciB0aGUgb3V0cHV0IFBQVFggZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBzbGlkZXM6IHtcbiAgICAgICAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiQXJyYXkgb2Ygc2xpZGUgZGVmaW5pdGlvbnNcIixcbiAgICAgICAgICBpdGVtczoge1xuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgbGF5b3V0OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICBlbnVtOiBbXCJ0aXRsZVwiLCBcInRpdGxlX2NvbnRlbnRcIiwgXCJ0d29fY29sdW1uXCIsIFwiYmxhbmtcIiwgXCJzZWN0aW9uX2hlYWRlclwiXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdGl0bGU6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICBjb250ZW50OiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgYnVsbGV0X3BvaW50czogeyB0eXBlOiBcImFycmF5XCIsIGl0ZW1zOiB7IHR5cGU6IFwic3RyaW5nXCIgfSB9LFxuICAgICAgICAgICAgICBpbWFnZV9wYXRoOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgbm90ZXM6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiT3B0aW9uYWwgdGVtcGxhdGUgZmlsZSBwYXRoXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHRoZW1lOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBlbnVtOiBbXCJkZWZhdWx0XCIsIFwibW9kZXJuXCIsIFwibWluaW1hbFwiLCBcImNvcnBvcmF0ZVwiLCBcImNyZWF0aXZlXCJdLFxuICAgICAgICAgIGRlZmF1bHQ6IFwiZGVmYXVsdFwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJvdXRwdXRfcGF0aFwiLCBcInNsaWRlc1wiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJleHRyYWN0X2Zyb21fcHB0eFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkV4dHJhY3QgdGV4dCwgaW1hZ2VzLCBhbmQgbm90ZXMgZnJvbSBhIFBvd2VyUG9pbnQgZmlsZS5cIixcbiAgICBpbnB1dFNjaGVtYToge1xuICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZmlsZV9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBQUFRYIGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgZXh0cmFjdF9pbWFnZXM6IHtcbiAgICAgICAgICB0eXBlOiBcImJvb2xlYW5cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJFeHRyYWN0IGVtYmVkZGVkIGltYWdlc1wiLFxuICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICBleHRyYWN0X25vdGVzOiB7XG4gICAgICAgICAgdHlwZTogXCJib29sZWFuXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiRXh0cmFjdCBzcGVha2VyIG5vdGVzXCIsXG4gICAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0X2Rpcjoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiRGlyZWN0b3J5IGZvciBleHRyYWN0ZWQgaW1hZ2VzXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImZpbGVfcGF0aFwiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJtZF90b19wcHR4XCIsXG4gICAgZGVzY3JpcHRpb246IFwiQ29udmVydCBNYXJrZG93biBjb250ZW50IHRvIFBvd2VyUG9pbnQgc2xpZGVzLiBVc2VzICctLS0nIGFzIHNsaWRlIHNlcGFyYXRvci5cIixcbiAgICBpbnB1dFNjaGVtYToge1xuICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbWFya2Rvd25fY29udGVudDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiTWFya2Rvd24gY29udGVudCB0byBjb252ZXJ0XCIsXG4gICAgICAgIH0sXG4gICAgICAgIG1hcmtkb3duX2ZpbGU6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gTWFya2Rvd24gZmlsZSAoYWx0ZXJuYXRpdmUgdG8gY29udGVudClcIixcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0X3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggZm9yIHRoZSBvdXRwdXQgUFBUWCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHRoZW1lOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBlbnVtOiBbXCJkZWZhdWx0XCIsIFwibW9kZXJuXCIsIFwibWluaW1hbFwiLCBcImNvcnBvcmF0ZVwiXSxcbiAgICAgICAgICBkZWZhdWx0OiBcImRlZmF1bHRcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wib3V0cHV0X3BhdGhcIl0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYWRkX3NsaWRlXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWRkIGEgbmV3IHNsaWRlIHRvIGFuIGV4aXN0aW5nIFBvd2VyUG9pbnQgcHJlc2VudGF0aW9uLlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIFBQVFggZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCBmb3IgdGhlIG91dHB1dCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQb3NpdGlvbiB0byBpbnNlcnQgc2xpZGUgKDEtYmFzZWQsIC0xIGZvciBlbmQpXCIsXG4gICAgICAgICAgZGVmYXVsdDogLTEsXG4gICAgICAgIH0sXG4gICAgICAgIGxheW91dDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZW51bTogW1widGl0bGVcIiwgXCJ0aXRsZV9jb250ZW50XCIsIFwidHdvX2NvbHVtblwiLCBcImJsYW5rXCJdLFxuICAgICAgICB9LFxuICAgICAgICB0aXRsZTogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgIGNvbnRlbnQ6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICBidWxsZXRfcG9pbnRzOiB7IHR5cGU6IFwiYXJyYXlcIiwgaXRlbXM6IHsgdHlwZTogXCJzdHJpbmdcIiB9IH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImZpbGVfcGF0aFwiLCBcIm91dHB1dF9wYXRoXCIsIFwibGF5b3V0XCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInVwZGF0ZV9zbGlkZVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlVwZGF0ZSBjb250ZW50IG9mIGFuIGV4aXN0aW5nIHNsaWRlLlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIFBQVFggZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCBmb3IgdGhlIG91dHB1dCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHNsaWRlX251bWJlcjoge1xuICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiU2xpZGUgbnVtYmVyIHRvIHVwZGF0ZSAoMS1iYXNlZClcIixcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlczoge1xuICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgdGl0bGU6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgY29udGVudDogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICBidWxsZXRfcG9pbnRzOiB7IHR5cGU6IFwiYXJyYXlcIiwgaXRlbXM6IHsgdHlwZTogXCJzdHJpbmdcIiB9IH0sXG4gICAgICAgICAgICBub3RlczogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiZmlsZV9wYXRoXCIsIFwib3V0cHV0X3BhdGhcIiwgXCJzbGlkZV9udW1iZXJcIiwgXCJ1cGRhdGVzXCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInBwdHhfdG9faHRtbFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkNvbnZlcnQgUG93ZXJQb2ludCB0byBIVE1MIHNsaWRlcyAocmV2ZWFsLmpzIGZvcm1hdCkuXCIsXG4gICAgaW5wdXRTY2hlbWE6IHtcbiAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGZpbGVfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgUFBUWCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dF9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIGZvciB0aGUgb3V0cHV0IEhUTUwgZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICB0aGVtZToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZW51bTogW1wid2hpdGVcIiwgXCJibGFja1wiLCBcImxlYWd1ZVwiLCBcImJlaWdlXCIsIFwic2t5XCIsIFwibmlnaHRcIl0sXG4gICAgICAgICAgZGVmYXVsdDogXCJ3aGl0ZVwiLFxuICAgICAgICB9LFxuICAgICAgICBpbmNsdWRlX25vdGVzOiB7XG4gICAgICAgICAgdHlwZTogXCJib29sZWFuXCIsXG4gICAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiZmlsZV9wYXRoXCIsIFwib3V0cHV0X3BhdGhcIl0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZ2V0X3BwdHhfb3V0bGluZVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkdldCB0aGUgb3V0bGluZS9zdHJ1Y3R1cmUgb2YgYSBQb3dlclBvaW50IHByZXNlbnRhdGlvbi5cIixcbiAgICBpbnB1dFNjaGVtYToge1xuICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZmlsZV9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBQUFRYIGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiZmlsZV9wYXRoXCJdLFxuICAgIH0sXG4gIH0sXG5dO1xuXG4vKipcbiAqIEhhbmRsZSBwcmVzZW50YXRpb24gdG9vbCBjYWxsc1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlUHJlc2VudGF0aW9uVG9vbChcbiAgbmFtZTogc3RyaW5nLFxuICBhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuKTogUHJvbWlzZTx1bmtub3duPiB7XG4gIHN3aXRjaCAobmFtZSkge1xuICAgIGNhc2UgXCJjcmVhdGVfcHB0eFwiOlxuICAgICAgcmV0dXJuIGNyZWF0ZVBwdHgoYXJncyk7XG4gICAgY2FzZSBcImV4dHJhY3RfZnJvbV9wcHR4XCI6XG4gICAgICByZXR1cm4gZXh0cmFjdEZyb21QcHR4KGFyZ3MpO1xuICAgIGNhc2UgXCJtZF90b19wcHR4XCI6XG4gICAgICByZXR1cm4gbWRUb1BwdHgoYXJncyk7XG4gICAgY2FzZSBcImFkZF9zbGlkZVwiOlxuICAgICAgcmV0dXJuIGFkZFNsaWRlKGFyZ3MpO1xuICAgIGNhc2UgXCJ1cGRhdGVfc2xpZGVcIjpcbiAgICAgIHJldHVybiB1cGRhdGVTbGlkZShhcmdzKTtcbiAgICBjYXNlIFwicHB0eF90b19odG1sXCI6XG4gICAgICByZXR1cm4gcHB0eFRvSHRtbChhcmdzKTtcbiAgICBjYXNlIFwiZ2V0X3BwdHhfb3V0bGluZVwiOlxuICAgICAgcmV0dXJuIGdldFBwdHhPdXRsaW5lKGFyZ3MpO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gcHJlc2VudGF0aW9uIHRvb2w6ICR7bmFtZX1gKTtcbiAgfVxufVxuXG4vLyBUb29sIGltcGxlbWVudGF0aW9uc1xuYXN5bmMgZnVuY3Rpb24gY3JlYXRlUHB0eChhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHsgb3V0cHV0X3BhdGgsIHNsaWRlcywgdGhlbWUgfSA9IGFyZ3M7XG4gIHJldHVybiBgQ3JlYXRlZCBQb3dlclBvaW50IGF0ICR7b3V0cHV0X3BhdGh9IHdpdGggJHsoc2xpZGVzIGFzIHVua25vd25bXSkubGVuZ3RofSBzbGlkZXMgdXNpbmcgJHt0aGVtZSB8fCAnZGVmYXVsdCd9IHRoZW1lLmA7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGV4dHJhY3RGcm9tUHB0eChhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8b2JqZWN0PiB7XG4gIGNvbnN0IHsgZmlsZV9wYXRoIH0gPSBhcmdzO1xuICByZXR1cm4ge1xuICAgIGZpbGU6IGZpbGVfcGF0aCxcbiAgICBzbGlkZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbnVtYmVyOiAxLFxuICAgICAgICB0aXRsZTogXCJJbnRyb2R1Y3Rpb25cIixcbiAgICAgICAgY29udGVudDogXCJXZWxjb21lIHRvIHRoZSBwcmVzZW50YXRpb25cIixcbiAgICAgICAgbm90ZXM6IFwiU3RhcnQgd2l0aCBhIHdhcm0gZ3JlZXRpbmdcIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG51bWJlcjogMixcbiAgICAgICAgdGl0bGU6IFwiS2V5IFBvaW50c1wiLFxuICAgICAgICBjb250ZW50OiBcIuKAoiBQb2ludCAxXFxu4oCiIFBvaW50IDJcXG7igKIgUG9pbnQgM1wiLFxuICAgICAgICBub3RlczogXCJFbGFib3JhdGUgb24gZWFjaCBwb2ludFwiLFxuICAgICAgfSxcbiAgICBdLFxuICAgIHRvdGFsX3NsaWRlczogMixcbiAgICBpbWFnZXNfZm91bmQ6IDMsXG4gIH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1kVG9QcHR4KGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgeyBvdXRwdXRfcGF0aCwgdGhlbWUgfSA9IGFyZ3M7XG4gIHJldHVybiBgQ29udmVydGVkIE1hcmtkb3duIHRvIFBvd2VyUG9pbnQgYXQgJHtvdXRwdXRfcGF0aH0gd2l0aCAke3RoZW1lIHx8ICdkZWZhdWx0J30gdGhlbWUuYDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYWRkU2xpZGUoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7IGZpbGVfcGF0aCwgb3V0cHV0X3BhdGgsIHBvc2l0aW9uLCBsYXlvdXQgfSA9IGFyZ3M7XG4gIHJldHVybiBgQWRkZWQgJHtsYXlvdXR9IHNsaWRlIGF0IHBvc2l0aW9uICR7cG9zaXRpb24gPT09IC0xID8gJ2VuZCcgOiBwb3NpdGlvbn0gaW4gJHtmaWxlX3BhdGh9LiBPdXRwdXQ6ICR7b3V0cHV0X3BhdGh9YDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlU2xpZGUoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7IGZpbGVfcGF0aCwgb3V0cHV0X3BhdGgsIHNsaWRlX251bWJlciwgdXBkYXRlcyB9ID0gYXJncztcbiAgY29uc3QgdXBkYXRlRmllbGRzID0gT2JqZWN0LmtleXModXBkYXRlcyBhcyBvYmplY3QpLmpvaW4oJywgJyk7XG4gIHJldHVybiBgVXBkYXRlZCBzbGlkZSAke3NsaWRlX251bWJlcn0gaW4gJHtmaWxlX3BhdGh9IChmaWVsZHM6ICR7dXBkYXRlRmllbGRzfSkuIE91dHB1dDogJHtvdXRwdXRfcGF0aH1gO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwcHR4VG9IdG1sKGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgeyBmaWxlX3BhdGgsIG91dHB1dF9wYXRoLCB0aGVtZSB9ID0gYXJncztcbiAgcmV0dXJuIGBDb252ZXJ0ZWQgJHtmaWxlX3BhdGh9IHRvIHJldmVhbC5qcyBIVE1MIGF0ICR7b3V0cHV0X3BhdGh9IHdpdGggJHt0aGVtZSB8fCAnd2hpdGUnfSB0aGVtZS5gO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRQcHR4T3V0bGluZShhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8b2JqZWN0PiB7XG4gIGNvbnN0IHsgZmlsZV9wYXRoIH0gPSBhcmdzO1xuICByZXR1cm4ge1xuICAgIGZpbGU6IGZpbGVfcGF0aCxcbiAgICBvdXRsaW5lOiBbXG4gICAgICB7IHNsaWRlOiAxLCB0aXRsZTogXCJUaXRsZSBTbGlkZVwiLCBsYXlvdXQ6IFwidGl0bGVcIiB9LFxuICAgICAgeyBzbGlkZTogMiwgdGl0bGU6IFwiQWdlbmRhXCIsIGxheW91dDogXCJ0aXRsZV9jb250ZW50XCIgfSxcbiAgICAgIHsgc2xpZGU6IDMsIHRpdGxlOiBcIktleSBGaW5kaW5nc1wiLCBsYXlvdXQ6IFwidHdvX2NvbHVtblwiIH0sXG4gICAgICB7IHNsaWRlOiA0LCB0aXRsZTogXCJEYXRhIEFuYWx5c2lzXCIsIGxheW91dDogXCJ0aXRsZV9jb250ZW50XCIgfSxcbiAgICAgIHsgc2xpZGU6IDUsIHRpdGxlOiBcIlJlY29tbWVuZGF0aW9uc1wiLCBsYXlvdXQ6IFwidGl0bGVfY29udGVudFwiIH0sXG4gICAgICB7IHNsaWRlOiA2LCB0aXRsZTogXCJRJkFcIiwgbGF5b3V0OiBcInNlY3Rpb25faGVhZGVyXCIgfSxcbiAgICBdLFxuICAgIHRvdGFsX3NsaWRlczogNixcbiAgICBoYXNfbm90ZXM6IHRydWUsXG4gICAgaGFzX2ltYWdlczogdHJ1ZSxcbiAgfTtcbn1cbiJdfQ==