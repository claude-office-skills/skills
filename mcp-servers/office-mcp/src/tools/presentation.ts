/**
 * Presentation Tools - PowerPoint/PPTX operations
 * 
 * Best-in-class tools for presentation creation and manipulation.
 * Based on python-pptx, reveal.js, and slidev capabilities.
 */

import { Tool } from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs";
import * as path from "path";
import PptxGenJS from "pptxgenjs";
import JSZip from "jszip";

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

// Theme colors
const themes: Record<string, { background: string; titleColor: string; textColor: string }> = {
  default: { background: 'FFFFFF', titleColor: '003366', textColor: '333333' },
  modern: { background: 'F5F5F5', titleColor: '2196F3', textColor: '424242' },
  minimal: { background: 'FFFFFF', titleColor: '000000', textColor: '666666' },
  corporate: { background: 'FFFFFF', titleColor: '1A237E', textColor: '37474F' },
  creative: { background: 'FFF8E1', titleColor: 'FF6F00', textColor: '5D4037' },
};

// Tool implementations
async function createPptx(args: Record<string, unknown>): Promise<string> {
  const { output_path, slides, theme } = args;
  
  try {
    const outputPath = output_path as string;
    const slideDefs = slides as Array<{
      layout?: string;
      title?: string;
      content?: string;
      bullet_points?: string[];
      image_path?: string;
      notes?: string;
    }>;
    const themeName = theme as string || 'default';
    const colors = themes[themeName] || themes.default;
    
    const pptx = new PptxGenJS();
    pptx.author = 'Office MCP';
    pptx.title = slideDefs[0]?.title || 'Presentation';
    
    for (const slideDef of slideDefs) {
      const slide = pptx.addSlide();
      
      // Set background
      slide.background = { color: colors.background };
      
      // Add title
      if (slideDef.title) {
        slide.addText(slideDef.title, {
          x: 0.5,
          y: slideDef.layout === 'title' ? 2.5 : 0.5,
          w: '90%',
          h: 1,
          fontSize: slideDef.layout === 'title' ? 44 : 32,
          color: colors.titleColor,
          bold: true,
          align: slideDef.layout === 'title' ? 'center' : 'left',
        });
      }
      
      // Add content or bullet points
      if (slideDef.bullet_points && slideDef.bullet_points.length > 0) {
        const bulletText = slideDef.bullet_points.map(point => ({
          text: point,
          options: { bullet: true, fontSize: 18, color: colors.textColor },
        }));
        slide.addText(bulletText, {
          x: 0.5,
          y: 1.8,
          w: '90%',
          h: 4,
        });
      } else if (slideDef.content) {
        slide.addText(slideDef.content, {
          x: 0.5,
          y: 1.8,
          w: '90%',
          h: 4,
          fontSize: 18,
          color: colors.textColor,
        });
      }
      
      // Add notes
      if (slideDef.notes) {
        slide.addNotes(slideDef.notes);
      }
    }
    
    await pptx.writeFile({ fileName: outputPath });
    
    return `Successfully created PowerPoint at ${outputPath} with ${slideDefs.length} slides using ${themeName} theme.`;
    
  } catch (error: any) {
    return `Error creating PowerPoint: ${error.message}`;
  }
}

async function extractFromPptx(args: Record<string, unknown>): Promise<object> {
  const { file_path, extract_notes, output_dir } = args;
  
  try {
    const filePath = file_path as string;
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Read PPTX file (it's a ZIP archive)
    const data = fs.readFileSync(filePath);
    const zip = await JSZip.loadAsync(data);
    
    const slides: Array<{ number: number; title: string; content: string; notes?: string }> = [];
    let imageCount = 0;
    
    // Find slide XML files
    const slideFiles = Object.keys(zip.files)
      .filter(name => name.match(/ppt\/slides\/slide\d+\.xml/))
      .sort((a, b) => {
        const numA = parseInt(a.match(/slide(\d+)/)?.[1] || '0');
        const numB = parseInt(b.match(/slide(\d+)/)?.[1] || '0');
        return numA - numB;
      });
    
    for (let i = 0; i < slideFiles.length; i++) {
      const slideFile = slideFiles[i];
      const slideXml = await zip.file(slideFile)?.async('string');
      
      if (slideXml) {
        // Extract text content (simple regex extraction)
        const textMatches = slideXml.match(/<a:t>([^<]*)<\/a:t>/g) || [];
        const texts = textMatches.map(m => m.replace(/<\/?a:t>/g, ''));
        
        slides.push({
          number: i + 1,
          title: texts[0] || `Slide ${i + 1}`,
          content: texts.slice(1).join('\n'),
        });
      }
    }
    
    // Count images
    const imageFiles = Object.keys(zip.files).filter(name => 
      name.match(/ppt\/media\/image\d+\.(png|jpg|jpeg|gif)/i)
    );
    imageCount = imageFiles.length;
    
    return {
      file: file_path,
      slides: slides,
      total_slides: slides.length,
      images_found: imageCount,
    };
    
  } catch (error: any) {
    return {
      error: `Failed to extract from PPTX: ${error.message}`,
      file: file_path,
    };
  }
}

async function mdToPptx(args: Record<string, unknown>): Promise<string> {
  const { markdown_content, markdown_file, output_path, theme } = args;
  
  try {
    const outputPath = output_path as string;
    const themeName = theme as string || 'default';
    const colors = themes[themeName] || themes.default;
    
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
    
    // Split by slide separator (---)
    const slideContents = mdContent.split(/\n---\n/).map(s => s.trim()).filter(s => s);
    
    const pptx = new PptxGenJS();
    pptx.author = 'Office MCP';
    
    for (const slideContent of slideContents) {
      const slide = pptx.addSlide();
      slide.background = { color: colors.background };
      
      const lines = slideContent.split('\n');
      let title = '';
      const bulletPoints: string[] = [];
      let content = '';
      
      for (const line of lines) {
        if (line.startsWith('# ')) {
          title = line.replace(/^#+ /, '');
        } else if (line.startsWith('## ')) {
          title = line.replace(/^#+ /, '');
        } else if (line.startsWith('- ') || line.startsWith('* ')) {
          bulletPoints.push(line.replace(/^[-*] /, ''));
        } else if (line.trim()) {
          content += line + '\n';
        }
      }
      
      // Add title
      if (title) {
        slide.addText(title, {
          x: 0.5,
          y: 0.5,
          w: '90%',
          h: 1,
          fontSize: 32,
          color: colors.titleColor,
          bold: true,
        });
      }
      
      // Add bullets or content
      if (bulletPoints.length > 0) {
        const bulletText = bulletPoints.map(point => ({
          text: point,
          options: { bullet: true, fontSize: 18, color: colors.textColor },
        }));
        slide.addText(bulletText, {
          x: 0.5,
          y: 1.8,
          w: '90%',
          h: 4,
        });
      } else if (content.trim()) {
        slide.addText(content.trim(), {
          x: 0.5,
          y: 1.8,
          w: '90%',
          h: 4,
          fontSize: 18,
          color: colors.textColor,
        });
      }
    }
    
    await pptx.writeFile({ fileName: outputPath });
    
    return `Successfully converted Markdown to PowerPoint at ${outputPath} with ${slideContents.length} slides.`;
    
  } catch (error: any) {
    return `Error converting Markdown to PPTX: ${error.message}`;
  }
}

async function addSlide(args: Record<string, unknown>): Promise<string> {
  const { file_path, output_path, layout, title, content, bullet_points } = args;
  
  try {
    // Note: pptxgenjs creates new files, can't easily modify existing ones
    // For now, we extract existing content and recreate
    const filePath = file_path as string;
    const outputPath = output_path as string;
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Extract existing slides
    const extractResult = await extractFromPptx({ file_path: filePath }) as any;
    
    if (extractResult.error) {
      throw new Error(extractResult.error);
    }
    
    // Create new presentation with existing slides plus new one
    const pptx = new PptxGenJS();
    
    // Add existing slides
    for (const existingSlide of extractResult.slides) {
      const slide = pptx.addSlide();
      if (existingSlide.title) {
        slide.addText(existingSlide.title, {
          x: 0.5, y: 0.5, w: '90%', h: 1, fontSize: 32, bold: true,
        });
      }
      if (existingSlide.content) {
        slide.addText(existingSlide.content, {
          x: 0.5, y: 1.8, w: '90%', h: 4, fontSize: 18,
        });
      }
    }
    
    // Add new slide
    const newSlide = pptx.addSlide();
    
    if (title) {
      newSlide.addText(title as string, {
        x: 0.5,
        y: layout === 'title' ? 2.5 : 0.5,
        w: '90%',
        h: 1,
        fontSize: layout === 'title' ? 44 : 32,
        bold: true,
        align: layout === 'title' ? 'center' : 'left',
      });
    }
    
    if (bullet_points && (bullet_points as string[]).length > 0) {
      const bulletText = (bullet_points as string[]).map(point => ({
        text: point,
        options: { bullet: true, fontSize: 18 },
      }));
      newSlide.addText(bulletText, {
        x: 0.5, y: 1.8, w: '90%', h: 4,
      });
    } else if (content) {
      newSlide.addText(content as string, {
        x: 0.5, y: 1.8, w: '90%', h: 4, fontSize: 18,
      });
    }
    
    await pptx.writeFile({ fileName: outputPath });
    
    return `Successfully added ${layout} slide. Total slides: ${extractResult.slides.length + 1}. Output: ${outputPath}`;
    
  } catch (error: any) {
    return `Error adding slide: ${error.message}`;
  }
}

async function updateSlide(args: Record<string, unknown>): Promise<object> {
  const { file_path, output_path, slide_number, updates } = args;
  
  // Note: Modifying existing PPTX slides in place is complex
  // pptxgenjs is primarily for creation, not modification
  return {
    success: false,
    message: "Updating existing slides requires reading and rewriting the PPTX",
    file: file_path,
    slide_number: slide_number,
    updates: updates,
    suggestion: "Use extract_from_pptx to get content, modify it, then use create_pptx to create new file",
  };
}

async function pptxToHtml(args: Record<string, unknown>): Promise<string> {
  const { file_path, output_path, theme, include_notes } = args;
  
  try {
    const filePath = file_path as string;
    const outputPath = output_path as string;
    const htmlTheme = theme as string || 'white';
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Extract slides
    const extractResult = await extractFromPptx({ file_path: filePath, extract_notes: include_notes }) as any;
    
    if (extractResult.error) {
      throw new Error(extractResult.error);
    }
    
    // Generate reveal.js HTML
    const slidesHtml = extractResult.slides.map((slide: any) => {
      let slideContent = '';
      if (slide.title) {
        slideContent += `<h2>${slide.title}</h2>\n`;
      }
      if (slide.content) {
        const lines = slide.content.split('\n').filter((l: string) => l.trim());
        if (lines.length > 1) {
          slideContent += '<ul>\n' + lines.map((l: string) => `<li>${l}</li>`).join('\n') + '\n</ul>';
        } else {
          slideContent += `<p>${slide.content}</p>`;
        }
      }
      return `<section>\n${slideContent}\n</section>`;
    }).join('\n\n');
    
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Presentation</title>
  <link rel="stylesheet" href="https://unpkg.com/reveal.js@4/dist/reveal.css">
  <link rel="stylesheet" href="https://unpkg.com/reveal.js@4/dist/theme/${htmlTheme}.css">
</head>
<body>
  <div class="reveal">
    <div class="slides">
${slidesHtml}
    </div>
  </div>
  <script src="https://unpkg.com/reveal.js@4/dist/reveal.js"></script>
  <script>Reveal.initialize();</script>
</body>
</html>`;
    
    fs.writeFileSync(outputPath, html, 'utf-8');
    
    return `Successfully converted PPTX to reveal.js HTML at ${outputPath} with ${extractResult.slides.length} slides.`;
    
  } catch (error: any) {
    return `Error converting to HTML: ${error.message}`;
  }
}

async function getPptxOutline(args: Record<string, unknown>): Promise<object> {
  const { file_path } = args;
  
  try {
    const filePath = file_path as string;
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Extract slides
    const extractResult = await extractFromPptx({ file_path: filePath }) as any;
    
    if (extractResult.error) {
      throw new Error(extractResult.error);
    }
    
    const outline = extractResult.slides.map((slide: any, index: number) => ({
      slide: index + 1,
      title: slide.title || `Slide ${index + 1}`,
      has_content: !!slide.content,
      content_preview: slide.content ? slide.content.substring(0, 100) + (slide.content.length > 100 ? '...' : '') : '',
    }));
    
    return {
      file: file_path,
      outline: outline,
      total_slides: extractResult.total_slides,
      images_found: extractResult.images_found,
    };
    
  } catch (error: any) {
    return {
      error: `Failed to get outline: ${error.message}`,
      file: file_path,
    };
  }
}
