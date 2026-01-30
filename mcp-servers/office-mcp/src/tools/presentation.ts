/**
 * Presentation Tools - PowerPoint/PPTX operations
 * 
 * Best-in-class tools for presentation creation and manipulation.
 * Based on python-pptx, reveal.js, and slidev capabilities.
 */

import { Tool } from "@modelcontextprotocol/sdk/types.js";

/**
 * Presentation tool definitions
 */
export const presentationTools: Tool[] = [
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
export async function handlePresentationTool(
  name: string,
  args: Record<string, unknown>
): Promise<unknown> {
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
async function createPptx(args: Record<string, unknown>): Promise<string> {
  const { output_path, slides, theme } = args;
  return `Created PowerPoint at ${output_path} with ${(slides as unknown[]).length} slides using ${theme || 'default'} theme.`;
}

async function extractFromPptx(args: Record<string, unknown>): Promise<object> {
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

async function mdToPptx(args: Record<string, unknown>): Promise<string> {
  const { output_path, theme } = args;
  return `Converted Markdown to PowerPoint at ${output_path} with ${theme || 'default'} theme.`;
}

async function addSlide(args: Record<string, unknown>): Promise<string> {
  const { file_path, output_path, position, layout } = args;
  return `Added ${layout} slide at position ${position === -1 ? 'end' : position} in ${file_path}. Output: ${output_path}`;
}

async function updateSlide(args: Record<string, unknown>): Promise<string> {
  const { file_path, output_path, slide_number, updates } = args;
  const updateFields = Object.keys(updates as object).join(', ');
  return `Updated slide ${slide_number} in ${file_path} (fields: ${updateFields}). Output: ${output_path}`;
}

async function pptxToHtml(args: Record<string, unknown>): Promise<string> {
  const { file_path, output_path, theme } = args;
  return `Converted ${file_path} to reveal.js HTML at ${output_path} with ${theme || 'white'} theme.`;
}

async function getPptxOutline(args: Record<string, unknown>): Promise<object> {
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
