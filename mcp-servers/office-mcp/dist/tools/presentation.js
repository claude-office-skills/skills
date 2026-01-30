"use strict";
/**
 * Presentation Tools - PowerPoint/PPTX operations
 *
 * Best-in-class tools for presentation creation and manipulation.
 * Based on python-pptx, reveal.js, and slidev capabilities.
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
exports.presentationTools = void 0;
exports.handlePresentationTool = handlePresentationTool;
const fs = __importStar(require("fs"));
const pptxgenjs_1 = __importDefault(require("pptxgenjs"));
const jszip_1 = __importDefault(require("jszip"));
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
// Theme colors
const themes = {
    default: { background: 'FFFFFF', titleColor: '003366', textColor: '333333' },
    modern: { background: 'F5F5F5', titleColor: '2196F3', textColor: '424242' },
    minimal: { background: 'FFFFFF', titleColor: '000000', textColor: '666666' },
    corporate: { background: 'FFFFFF', titleColor: '1A237E', textColor: '37474F' },
    creative: { background: 'FFF8E1', titleColor: 'FF6F00', textColor: '5D4037' },
};
// Tool implementations
async function createPptx(args) {
    const { output_path, slides, theme } = args;
    try {
        const outputPath = output_path;
        const slideDefs = slides;
        const themeName = theme || 'default';
        const colors = themes[themeName] || themes.default;
        const pptx = new pptxgenjs_1.default();
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
            }
            else if (slideDef.content) {
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
    }
    catch (error) {
        return `Error creating PowerPoint: ${error.message}`;
    }
}
async function extractFromPptx(args) {
    const { file_path, extract_notes, output_dir } = args;
    try {
        const filePath = file_path;
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // Read PPTX file (it's a ZIP archive)
        const data = fs.readFileSync(filePath);
        const zip = await jszip_1.default.loadAsync(data);
        const slides = [];
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
        const imageFiles = Object.keys(zip.files).filter(name => name.match(/ppt\/media\/image\d+\.(png|jpg|jpeg|gif)/i));
        imageCount = imageFiles.length;
        return {
            file: file_path,
            slides: slides,
            total_slides: slides.length,
            images_found: imageCount,
        };
    }
    catch (error) {
        return {
            error: `Failed to extract from PPTX: ${error.message}`,
            file: file_path,
        };
    }
}
async function mdToPptx(args) {
    const { markdown_content, markdown_file, output_path, theme } = args;
    try {
        const outputPath = output_path;
        const themeName = theme || 'default';
        const colors = themes[themeName] || themes.default;
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
        // Split by slide separator (---)
        const slideContents = mdContent.split(/\n---\n/).map(s => s.trim()).filter(s => s);
        const pptx = new pptxgenjs_1.default();
        pptx.author = 'Office MCP';
        for (const slideContent of slideContents) {
            const slide = pptx.addSlide();
            slide.background = { color: colors.background };
            const lines = slideContent.split('\n');
            let title = '';
            const bulletPoints = [];
            let content = '';
            for (const line of lines) {
                if (line.startsWith('# ')) {
                    title = line.replace(/^#+ /, '');
                }
                else if (line.startsWith('## ')) {
                    title = line.replace(/^#+ /, '');
                }
                else if (line.startsWith('- ') || line.startsWith('* ')) {
                    bulletPoints.push(line.replace(/^[-*] /, ''));
                }
                else if (line.trim()) {
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
            }
            else if (content.trim()) {
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
    }
    catch (error) {
        return `Error converting Markdown to PPTX: ${error.message}`;
    }
}
async function addSlide(args) {
    const { file_path, output_path, layout, title, content, bullet_points } = args;
    try {
        // Note: pptxgenjs creates new files, can't easily modify existing ones
        // For now, we extract existing content and recreate
        const filePath = file_path;
        const outputPath = output_path;
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // Extract existing slides
        const extractResult = await extractFromPptx({ file_path: filePath });
        if (extractResult.error) {
            throw new Error(extractResult.error);
        }
        // Create new presentation with existing slides plus new one
        const pptx = new pptxgenjs_1.default();
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
            newSlide.addText(title, {
                x: 0.5,
                y: layout === 'title' ? 2.5 : 0.5,
                w: '90%',
                h: 1,
                fontSize: layout === 'title' ? 44 : 32,
                bold: true,
                align: layout === 'title' ? 'center' : 'left',
            });
        }
        if (bullet_points && bullet_points.length > 0) {
            const bulletText = bullet_points.map(point => ({
                text: point,
                options: { bullet: true, fontSize: 18 },
            }));
            newSlide.addText(bulletText, {
                x: 0.5, y: 1.8, w: '90%', h: 4,
            });
        }
        else if (content) {
            newSlide.addText(content, {
                x: 0.5, y: 1.8, w: '90%', h: 4, fontSize: 18,
            });
        }
        await pptx.writeFile({ fileName: outputPath });
        return `Successfully added ${layout} slide. Total slides: ${extractResult.slides.length + 1}. Output: ${outputPath}`;
    }
    catch (error) {
        return `Error adding slide: ${error.message}`;
    }
}
async function updateSlide(args) {
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
async function pptxToHtml(args) {
    const { file_path, output_path, theme, include_notes } = args;
    try {
        const filePath = file_path;
        const outputPath = output_path;
        const htmlTheme = theme || 'white';
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // Extract slides
        const extractResult = await extractFromPptx({ file_path: filePath, extract_notes: include_notes });
        if (extractResult.error) {
            throw new Error(extractResult.error);
        }
        // Generate reveal.js HTML
        const slidesHtml = extractResult.slides.map((slide) => {
            let slideContent = '';
            if (slide.title) {
                slideContent += `<h2>${slide.title}</h2>\n`;
            }
            if (slide.content) {
                const lines = slide.content.split('\n').filter((l) => l.trim());
                if (lines.length > 1) {
                    slideContent += '<ul>\n' + lines.map((l) => `<li>${l}</li>`).join('\n') + '\n</ul>';
                }
                else {
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
    }
    catch (error) {
        return `Error converting to HTML: ${error.message}`;
    }
}
async function getPptxOutline(args) {
    const { file_path } = args;
    try {
        const filePath = file_path;
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // Extract slides
        const extractResult = await extractFromPptx({ file_path: filePath });
        if (extractResult.error) {
            throw new Error(extractResult.error);
        }
        const outline = extractResult.slides.map((slide, index) => ({
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
    }
    catch (error) {
        return {
            error: `Failed to get outline: ${error.message}`,
            file: file_path,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VudGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Rvb2xzL3ByZXNlbnRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVOSCx3REFzQkM7QUExT0QsdUNBQXlCO0FBRXpCLDBEQUFrQztBQUNsQyxrREFBMEI7QUFFMUI7O0dBRUc7QUFDVSxRQUFBLGlCQUFpQixHQUFXO0lBQ3ZDO1FBQ0UsSUFBSSxFQUFFLGFBQWE7UUFDbkIsV0FBVyxFQUFFLG1EQUFtRDtRQUNoRSxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDVixXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLCtCQUErQjtpQkFDN0M7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOLElBQUksRUFBRSxPQUFPO29CQUNiLFdBQVcsRUFBRSw0QkFBNEI7b0JBQ3pDLEtBQUssRUFBRTt3QkFDTCxJQUFJLEVBQUUsUUFBUTt3QkFDZCxVQUFVLEVBQUU7NEJBQ1YsTUFBTSxFQUFFO2dDQUNOLElBQUksRUFBRSxRQUFRO2dDQUNkLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQzs2QkFDMUU7NEJBQ0QsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTs0QkFDekIsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTs0QkFDM0IsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUU7NEJBQzNELFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7NEJBQzlCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7eUJBQzFCO3FCQUNGO2lCQUNGO2dCQUNELFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsNkJBQTZCO2lCQUMzQztnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQztvQkFDL0QsT0FBTyxFQUFFLFNBQVM7aUJBQ25CO2FBQ0Y7WUFDRCxRQUFRLEVBQUUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDO1NBQ3BDO0tBQ0Y7SUFDRDtRQUNFLElBQUksRUFBRSxtQkFBbUI7UUFDekIsV0FBVyxFQUFFLHlEQUF5RDtRQUN0RSxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDVixTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLHVCQUF1QjtpQkFDckM7Z0JBQ0QsY0FBYyxFQUFFO29CQUNkLElBQUksRUFBRSxTQUFTO29CQUNmLFdBQVcsRUFBRSx5QkFBeUI7b0JBQ3RDLE9BQU8sRUFBRSxLQUFLO2lCQUNmO2dCQUNELGFBQWEsRUFBRTtvQkFDYixJQUFJLEVBQUUsU0FBUztvQkFDZixXQUFXLEVBQUUsdUJBQXVCO29CQUNwQyxPQUFPLEVBQUUsSUFBSTtpQkFDZDtnQkFDRCxVQUFVLEVBQUU7b0JBQ1YsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLGdDQUFnQztpQkFDOUM7YUFDRjtZQUNELFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQztTQUN4QjtLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsWUFBWTtRQUNsQixXQUFXLEVBQUUsK0VBQStFO1FBQzVGLFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLGdCQUFnQixFQUFFO29CQUNoQixJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsNkJBQTZCO2lCQUMzQztnQkFDRCxhQUFhLEVBQUU7b0JBQ2IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLGdEQUFnRDtpQkFDOUQ7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxRQUFRO29CQUNkLFdBQVcsRUFBRSwrQkFBK0I7aUJBQzdDO2dCQUNELEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUM7b0JBQ25ELE9BQU8sRUFBRSxTQUFTO2lCQUNuQjthQUNGO1lBQ0QsUUFBUSxFQUFFLENBQUMsYUFBYSxDQUFDO1NBQzFCO0tBQ0Y7SUFDRDtRQUNFLElBQUksRUFBRSxXQUFXO1FBQ2pCLFdBQVcsRUFBRSx5REFBeUQ7UUFDdEUsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxRQUFRO29CQUNkLFdBQVcsRUFBRSx1QkFBdUI7aUJBQ3JDO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsMEJBQTBCO2lCQUN4QztnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLGdEQUFnRDtvQkFDN0QsT0FBTyxFQUFFLENBQUMsQ0FBQztpQkFDWjtnQkFDRCxNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDO2lCQUN4RDtnQkFDRCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO2dCQUN6QixPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO2dCQUMzQixhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRTthQUM1RDtZQUNELFFBQVEsRUFBRSxDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsUUFBUSxDQUFDO1NBQ2pEO0tBQ0Y7SUFDRDtRQUNFLElBQUksRUFBRSxjQUFjO1FBQ3BCLFdBQVcsRUFBRSxzQ0FBc0M7UUFDbkQsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxRQUFRO29CQUNkLFdBQVcsRUFBRSx1QkFBdUI7aUJBQ3JDO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsMEJBQTBCO2lCQUN4QztnQkFDRCxZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLGtDQUFrQztpQkFDaEQ7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxRQUFRO29CQUNkLFVBQVUsRUFBRTt3QkFDVixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO3dCQUN6QixPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO3dCQUMzQixhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRTt3QkFDM0QsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtxQkFDMUI7aUJBQ0Y7YUFDRjtZQUNELFFBQVEsRUFBRSxDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQztTQUNsRTtLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsY0FBYztRQUNwQixXQUFXLEVBQUUsdURBQXVEO1FBQ3BFLFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLFNBQVMsRUFBRTtvQkFDVCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsdUJBQXVCO2lCQUNyQztnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLCtCQUErQjtpQkFDN0M7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDO29CQUMzRCxPQUFPLEVBQUUsT0FBTztpQkFDakI7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiLElBQUksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxJQUFJO2lCQUNkO2FBQ0Y7WUFDRCxRQUFRLEVBQUUsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDO1NBQ3ZDO0tBQ0Y7SUFDRDtRQUNFLElBQUksRUFBRSxrQkFBa0I7UUFDeEIsV0FBVyxFQUFFLHlEQUF5RDtRQUN0RSxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDVixTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLHVCQUF1QjtpQkFDckM7YUFDRjtZQUNELFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQztTQUN4QjtLQUNGO0NBQ0YsQ0FBQztBQUVGOztHQUVHO0FBQ0ksS0FBSyxVQUFVLHNCQUFzQixDQUMxQyxJQUFZLEVBQ1osSUFBNkI7SUFFN0IsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUNiLEtBQUssYUFBYTtZQUNoQixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixLQUFLLG1CQUFtQjtZQUN0QixPQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixLQUFLLFlBQVk7WUFDZixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixLQUFLLFdBQVc7WUFDZCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixLQUFLLGNBQWM7WUFDakIsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsS0FBSyxjQUFjO1lBQ2pCLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLEtBQUssa0JBQWtCO1lBQ3JCLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCO1lBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMxRCxDQUFDO0FBQ0gsQ0FBQztBQUVELGVBQWU7QUFDZixNQUFNLE1BQU0sR0FBa0Y7SUFDNUYsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUU7SUFDNUUsTUFBTSxFQUFFLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUU7SUFDM0UsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUU7SUFDNUUsU0FBUyxFQUFFLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUU7SUFDOUUsUUFBUSxFQUFFLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUU7Q0FDOUUsQ0FBQztBQUVGLHVCQUF1QjtBQUN2QixLQUFLLFVBQVUsVUFBVSxDQUFDLElBQTZCO0lBQ3JELE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQztJQUU1QyxJQUFJLENBQUM7UUFDSCxNQUFNLFVBQVUsR0FBRyxXQUFxQixDQUFDO1FBQ3pDLE1BQU0sU0FBUyxHQUFHLE1BT2hCLENBQUM7UUFDSCxNQUFNLFNBQVMsR0FBRyxLQUFlLElBQUksU0FBUyxDQUFDO1FBQy9DLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDO1FBRW5ELE1BQU0sSUFBSSxHQUFHLElBQUksbUJBQVMsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssSUFBSSxjQUFjLENBQUM7UUFFbkQsS0FBSyxNQUFNLFFBQVEsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUNqQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFOUIsaUJBQWlCO1lBQ2pCLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBRWhELFlBQVk7WUFDWixJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDbkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO29CQUM1QixDQUFDLEVBQUUsR0FBRztvQkFDTixDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRztvQkFDMUMsQ0FBQyxFQUFFLEtBQUs7b0JBQ1IsQ0FBQyxFQUFFLENBQUM7b0JBQ0osUUFBUSxFQUFFLFFBQVEsQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQy9DLEtBQUssRUFBRSxNQUFNLENBQUMsVUFBVTtvQkFDeEIsSUFBSSxFQUFFLElBQUk7b0JBQ1YsS0FBSyxFQUFFLFFBQVEsQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU07aUJBQ3ZELENBQUMsQ0FBQztZQUNMLENBQUM7WUFFRCwrQkFBK0I7WUFDL0IsSUFBSSxRQUFRLENBQUMsYUFBYSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUNoRSxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3RELElBQUksRUFBRSxLQUFLO29CQUNYLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRTtpQkFDakUsQ0FBQyxDQUFDLENBQUM7Z0JBQ0osS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7b0JBQ3hCLENBQUMsRUFBRSxHQUFHO29CQUNOLENBQUMsRUFBRSxHQUFHO29CQUNOLENBQUMsRUFBRSxLQUFLO29CQUNSLENBQUMsRUFBRSxDQUFDO2lCQUNMLENBQUMsQ0FBQztZQUNMLENBQUM7aUJBQU0sSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzVCLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtvQkFDOUIsQ0FBQyxFQUFFLEdBQUc7b0JBQ04sQ0FBQyxFQUFFLEdBQUc7b0JBQ04sQ0FBQyxFQUFFLEtBQUs7b0JBQ1IsQ0FBQyxFQUFFLENBQUM7b0JBQ0osUUFBUSxFQUFFLEVBQUU7b0JBQ1osS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUFTO2lCQUN4QixDQUFDLENBQUM7WUFDTCxDQUFDO1lBRUQsWUFBWTtZQUNaLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNuQixLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxDQUFDO1FBQ0gsQ0FBQztRQUVELE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRS9DLE9BQU8sc0NBQXNDLFVBQVUsU0FBUyxTQUFTLENBQUMsTUFBTSxpQkFBaUIsU0FBUyxTQUFTLENBQUM7SUFFdEgsQ0FBQztJQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7UUFDcEIsT0FBTyw4QkFBOEIsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3ZELENBQUM7QUFDSCxDQUFDO0FBRUQsS0FBSyxVQUFVLGVBQWUsQ0FBQyxJQUE2QjtJQUMxRCxNQUFNLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFFdEQsSUFBSSxDQUFDO1FBQ0gsTUFBTSxRQUFRLEdBQUcsU0FBbUIsQ0FBQztRQUVyQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUVELHNDQUFzQztRQUN0QyxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sR0FBRyxHQUFHLE1BQU0sZUFBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4QyxNQUFNLE1BQU0sR0FBOEUsRUFBRSxDQUFDO1FBQzdGLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztRQUVuQix1QkFBdUI7UUFDdkIsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO2FBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQzthQUN4RCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDYixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7WUFDekQsT0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBRUwsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMzQyxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUU1RCxJQUFJLFFBQVEsRUFBRSxDQUFDO2dCQUNiLGlEQUFpRDtnQkFDakQsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDakUsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRS9ELE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ1YsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDO29CQUNiLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNuQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2lCQUNuQyxDQUFDLENBQUM7WUFDTCxDQUFDO1FBQ0gsQ0FBQztRQUVELGVBQWU7UUFDZixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUN4RCxDQUFDO1FBQ0YsVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFFL0IsT0FBTztZQUNMLElBQUksRUFBRSxTQUFTO1lBQ2YsTUFBTSxFQUFFLE1BQU07WUFDZCxZQUFZLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDM0IsWUFBWSxFQUFFLFVBQVU7U0FDekIsQ0FBQztJQUVKLENBQUM7SUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1FBQ3BCLE9BQU87WUFDTCxLQUFLLEVBQUUsZ0NBQWdDLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDdEQsSUFBSSxFQUFFLFNBQVM7U0FDaEIsQ0FBQztJQUNKLENBQUM7QUFDSCxDQUFDO0FBRUQsS0FBSyxVQUFVLFFBQVEsQ0FBQyxJQUE2QjtJQUNuRCxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFFckUsSUFBSSxDQUFDO1FBQ0gsTUFBTSxVQUFVLEdBQUcsV0FBcUIsQ0FBQztRQUN6QyxNQUFNLFNBQVMsR0FBRyxLQUFlLElBQUksU0FBUyxDQUFDO1FBQy9DLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDO1FBRW5ELHVCQUF1QjtRQUN2QixJQUFJLFNBQWlCLENBQUM7UUFDdEIsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3JCLFNBQVMsR0FBRyxnQkFBMEIsQ0FBQztRQUN6QyxDQUFDO2FBQU0sSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUN6QixNQUFNLE1BQU0sR0FBRyxhQUF1QixDQUFDO1lBQ3ZDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDeEQsQ0FBQztZQUNELFNBQVMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMvQyxDQUFDO2FBQU0sQ0FBQztZQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQztRQUMxRSxDQUFDO1FBRUQsaUNBQWlDO1FBQ2pDLE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbkYsTUFBTSxJQUFJLEdBQUcsSUFBSSxtQkFBUyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7UUFFM0IsS0FBSyxNQUFNLFlBQVksSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUN6QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDOUIsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFaEQsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDZixNQUFNLFlBQVksR0FBYSxFQUFFLENBQUM7WUFDbEMsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBRWpCLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFLENBQUM7Z0JBQ3pCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUMxQixLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7cUJBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ2xDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztxQkFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUMxRCxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELENBQUM7cUJBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztvQkFDdkIsT0FBTyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ3pCLENBQUM7WUFDSCxDQUFDO1lBRUQsWUFBWTtZQUNaLElBQUksS0FBSyxFQUFFLENBQUM7Z0JBQ1YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7b0JBQ25CLENBQUMsRUFBRSxHQUFHO29CQUNOLENBQUMsRUFBRSxHQUFHO29CQUNOLENBQUMsRUFBRSxLQUFLO29CQUNSLENBQUMsRUFBRSxDQUFDO29CQUNKLFFBQVEsRUFBRSxFQUFFO29CQUNaLEtBQUssRUFBRSxNQUFNLENBQUMsVUFBVTtvQkFDeEIsSUFBSSxFQUFFLElBQUk7aUJBQ1gsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUVELHlCQUF5QjtZQUN6QixJQUFJLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQzVCLE1BQU0sVUFBVSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUM1QyxJQUFJLEVBQUUsS0FBSztvQkFDWCxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUU7aUJBQ2pFLENBQUMsQ0FBQyxDQUFDO2dCQUNKLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO29CQUN4QixDQUFDLEVBQUUsR0FBRztvQkFDTixDQUFDLEVBQUUsR0FBRztvQkFDTixDQUFDLEVBQUUsS0FBSztvQkFDUixDQUFDLEVBQUUsQ0FBQztpQkFDTCxDQUFDLENBQUM7WUFDTCxDQUFDO2lCQUFNLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7Z0JBQzFCLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUM1QixDQUFDLEVBQUUsR0FBRztvQkFDTixDQUFDLEVBQUUsR0FBRztvQkFDTixDQUFDLEVBQUUsS0FBSztvQkFDUixDQUFDLEVBQUUsQ0FBQztvQkFDSixRQUFRLEVBQUUsRUFBRTtvQkFDWixLQUFLLEVBQUUsTUFBTSxDQUFDLFNBQVM7aUJBQ3hCLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDO1FBRUQsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFFL0MsT0FBTyxvREFBb0QsVUFBVSxTQUFTLGFBQWEsQ0FBQyxNQUFNLFVBQVUsQ0FBQztJQUUvRyxDQUFDO0lBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztRQUNwQixPQUFPLHNDQUFzQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDL0QsQ0FBQztBQUNILENBQUM7QUFFRCxLQUFLLFVBQVUsUUFBUSxDQUFDLElBQTZCO0lBQ25ELE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxHQUFHLElBQUksQ0FBQztJQUUvRSxJQUFJLENBQUM7UUFDSCx1RUFBdUU7UUFDdkUsb0RBQW9EO1FBQ3BELE1BQU0sUUFBUSxHQUFHLFNBQW1CLENBQUM7UUFDckMsTUFBTSxVQUFVLEdBQUcsV0FBcUIsQ0FBQztRQUV6QyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUVELDBCQUEwQjtRQUMxQixNQUFNLGFBQWEsR0FBRyxNQUFNLGVBQWUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBUSxDQUFDO1FBRTVFLElBQUksYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFFRCw0REFBNEQ7UUFDNUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxtQkFBUyxFQUFFLENBQUM7UUFFN0Isc0JBQXNCO1FBQ3RCLEtBQUssTUFBTSxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM5QixJQUFJLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDeEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFO29CQUNqQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUk7aUJBQ3pELENBQUMsQ0FBQztZQUNMLENBQUM7WUFDRCxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO29CQUNuQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFO2lCQUM3QyxDQUFDLENBQUM7WUFDTCxDQUFDO1FBQ0gsQ0FBQztRQUVELGdCQUFnQjtRQUNoQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFakMsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNWLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBZSxFQUFFO2dCQUNoQyxDQUFDLEVBQUUsR0FBRztnQkFDTixDQUFDLEVBQUUsTUFBTSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHO2dCQUNqQyxDQUFDLEVBQUUsS0FBSztnQkFDUixDQUFDLEVBQUUsQ0FBQztnQkFDSixRQUFRLEVBQUUsTUFBTSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLEVBQUUsSUFBSTtnQkFDVixLQUFLLEVBQUUsTUFBTSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNO2FBQzlDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxJQUFJLGFBQWEsSUFBSyxhQUEwQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUM1RCxNQUFNLFVBQVUsR0FBSSxhQUEwQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzNELElBQUksRUFBRSxLQUFLO2dCQUNYLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTthQUN4QyxDQUFDLENBQUMsQ0FBQztZQUNKLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO2dCQUMzQixDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUMvQixDQUFDLENBQUM7UUFDTCxDQUFDO2FBQU0sSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNuQixRQUFRLENBQUMsT0FBTyxDQUFDLE9BQWlCLEVBQUU7Z0JBQ2xDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUU7YUFDN0MsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRS9DLE9BQU8sc0JBQXNCLE1BQU0seUJBQXlCLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsYUFBYSxVQUFVLEVBQUUsQ0FBQztJQUV2SCxDQUFDO0lBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztRQUNwQixPQUFPLHVCQUF1QixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDaEQsQ0FBQztBQUNILENBQUM7QUFFRCxLQUFLLFVBQVUsV0FBVyxDQUFDLElBQTZCO0lBQ3RELE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFFL0QsMkRBQTJEO0lBQzNELHdEQUF3RDtJQUN4RCxPQUFPO1FBQ0wsT0FBTyxFQUFFLEtBQUs7UUFDZCxPQUFPLEVBQUUsa0VBQWtFO1FBQzNFLElBQUksRUFBRSxTQUFTO1FBQ2YsWUFBWSxFQUFFLFlBQVk7UUFDMUIsT0FBTyxFQUFFLE9BQU87UUFDaEIsVUFBVSxFQUFFLDBGQUEwRjtLQUN2RyxDQUFDO0FBQ0osQ0FBQztBQUVELEtBQUssVUFBVSxVQUFVLENBQUMsSUFBNkI7SUFDckQsTUFBTSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxHQUFHLElBQUksQ0FBQztJQUU5RCxJQUFJLENBQUM7UUFDSCxNQUFNLFFBQVEsR0FBRyxTQUFtQixDQUFDO1FBQ3JDLE1BQU0sVUFBVSxHQUFHLFdBQXFCLENBQUM7UUFDekMsTUFBTSxTQUFTLEdBQUcsS0FBZSxJQUFJLE9BQU8sQ0FBQztRQUU3QyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUVELGlCQUFpQjtRQUNqQixNQUFNLGFBQWEsR0FBRyxNQUFNLGVBQWUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxDQUFRLENBQUM7UUFFMUcsSUFBSSxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUVELDBCQUEwQjtRQUMxQixNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ3pELElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUN0QixJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDaEIsWUFBWSxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssU0FBUyxDQUFDO1lBQzlDLENBQUM7WUFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbEIsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDeEUsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUNyQixZQUFZLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDO2dCQUM5RixDQUFDO3FCQUFNLENBQUM7b0JBQ04sWUFBWSxJQUFJLE1BQU0sS0FBSyxDQUFDLE9BQU8sTUFBTSxDQUFDO2dCQUM1QyxDQUFDO1lBQ0gsQ0FBQztZQUNELE9BQU8sY0FBYyxZQUFZLGNBQWMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFaEIsTUFBTSxJQUFJLEdBQUc7Ozs7OzswRUFNeUQsU0FBUzs7Ozs7RUFLakYsVUFBVTs7Ozs7O1FBTUosQ0FBQztRQUVMLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUU1QyxPQUFPLG9EQUFvRCxVQUFVLFNBQVMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxNQUFNLFVBQVUsQ0FBQztJQUV0SCxDQUFDO0lBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztRQUNwQixPQUFPLDZCQUE2QixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEQsQ0FBQztBQUNILENBQUM7QUFFRCxLQUFLLFVBQVUsY0FBYyxDQUFDLElBQTZCO0lBQ3pELE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFFM0IsSUFBSSxDQUFDO1FBQ0gsTUFBTSxRQUFRLEdBQUcsU0FBbUIsQ0FBQztRQUVyQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUVELGlCQUFpQjtRQUNqQixNQUFNLGFBQWEsR0FBRyxNQUFNLGVBQWUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBUSxDQUFDO1FBRTVFLElBQUksYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFFRCxNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQVUsRUFBRSxLQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdkUsS0FBSyxFQUFFLEtBQUssR0FBRyxDQUFDO1lBQ2hCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxJQUFJLFNBQVMsS0FBSyxHQUFHLENBQUMsRUFBRTtZQUMxQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPO1lBQzVCLGVBQWUsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7U0FDbEgsQ0FBQyxDQUFDLENBQUM7UUFFSixPQUFPO1lBQ0wsSUFBSSxFQUFFLFNBQVM7WUFDZixPQUFPLEVBQUUsT0FBTztZQUNoQixZQUFZLEVBQUUsYUFBYSxDQUFDLFlBQVk7WUFDeEMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1NBQ3pDLENBQUM7SUFFSixDQUFDO0lBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztRQUNwQixPQUFPO1lBQ0wsS0FBSyxFQUFFLDBCQUEwQixLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ2hELElBQUksRUFBRSxTQUFTO1NBQ2hCLENBQUM7SUFDSixDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUHJlc2VudGF0aW9uIFRvb2xzIC0gUG93ZXJQb2ludC9QUFRYIG9wZXJhdGlvbnNcbiAqIFxuICogQmVzdC1pbi1jbGFzcyB0b29scyBmb3IgcHJlc2VudGF0aW9uIGNyZWF0aW9uIGFuZCBtYW5pcHVsYXRpb24uXG4gKiBCYXNlZCBvbiBweXRob24tcHB0eCwgcmV2ZWFsLmpzLCBhbmQgc2xpZGV2IGNhcGFiaWxpdGllcy5cbiAqL1xuXG5pbXBvcnQgeyBUb29sIH0gZnJvbSBcIkBtb2RlbGNvbnRleHRwcm90b2NvbC9zZGsvdHlwZXMuanNcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IFBwdHhHZW5KUyBmcm9tIFwicHB0eGdlbmpzXCI7XG5pbXBvcnQgSlNaaXAgZnJvbSBcImpzemlwXCI7XG5cbi8qKlxuICogUHJlc2VudGF0aW9uIHRvb2wgZGVmaW5pdGlvbnNcbiAqL1xuZXhwb3J0IGNvbnN0IHByZXNlbnRhdGlvblRvb2xzOiBUb29sW10gPSBbXG4gIHtcbiAgICBuYW1lOiBcImNyZWF0ZV9wcHR4XCIsXG4gICAgZGVzY3JpcHRpb246IFwiQ3JlYXRlIGEgbmV3IFBvd2VyUG9pbnQgcHJlc2VudGF0aW9uIHdpdGggc2xpZGVzLlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBvdXRwdXRfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCBmb3IgdGhlIG91dHB1dCBQUFRYIGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgc2xpZGVzOiB7XG4gICAgICAgICAgdHlwZTogXCJhcnJheVwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFycmF5IG9mIHNsaWRlIGRlZmluaXRpb25zXCIsXG4gICAgICAgICAgaXRlbXM6IHtcbiAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIGxheW91dDoge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgZW51bTogW1widGl0bGVcIiwgXCJ0aXRsZV9jb250ZW50XCIsIFwidHdvX2NvbHVtblwiLCBcImJsYW5rXCIsIFwic2VjdGlvbl9oZWFkZXJcIl0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHRpdGxlOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgY29udGVudDogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgIGJ1bGxldF9wb2ludHM6IHsgdHlwZTogXCJhcnJheVwiLCBpdGVtczogeyB0eXBlOiBcInN0cmluZ1wiIH0gfSxcbiAgICAgICAgICAgICAgaW1hZ2VfcGF0aDogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgIG5vdGVzOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk9wdGlvbmFsIHRlbXBsYXRlIGZpbGUgcGF0aFwiLFxuICAgICAgICB9LFxuICAgICAgICB0aGVtZToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZW51bTogW1wiZGVmYXVsdFwiLCBcIm1vZGVyblwiLCBcIm1pbmltYWxcIiwgXCJjb3Jwb3JhdGVcIiwgXCJjcmVhdGl2ZVwiXSxcbiAgICAgICAgICBkZWZhdWx0OiBcImRlZmF1bHRcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wib3V0cHV0X3BhdGhcIiwgXCJzbGlkZXNcIl0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZXh0cmFjdF9mcm9tX3BwdHhcIixcbiAgICBkZXNjcmlwdGlvbjogXCJFeHRyYWN0IHRleHQsIGltYWdlcywgYW5kIG5vdGVzIGZyb20gYSBQb3dlclBvaW50IGZpbGUuXCIsXG4gICAgaW5wdXRTY2hlbWE6IHtcbiAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGZpbGVfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgUFBUWCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGV4dHJhY3RfaW1hZ2VzOiB7XG4gICAgICAgICAgdHlwZTogXCJib29sZWFuXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiRXh0cmFjdCBlbWJlZGRlZCBpbWFnZXNcIixcbiAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgZXh0cmFjdF9ub3Rlczoge1xuICAgICAgICAgIHR5cGU6IFwiYm9vbGVhblwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkV4dHJhY3Qgc3BlYWtlciBub3Rlc1wiLFxuICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dF9kaXI6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRpcmVjdG9yeSBmb3IgZXh0cmFjdGVkIGltYWdlc1wiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJmaWxlX3BhdGhcIl0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwibWRfdG9fcHB0eFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkNvbnZlcnQgTWFya2Rvd24gY29udGVudCB0byBQb3dlclBvaW50IHNsaWRlcy4gVXNlcyAnLS0tJyBhcyBzbGlkZSBzZXBhcmF0b3IuXCIsXG4gICAgaW5wdXRTY2hlbWE6IHtcbiAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG1hcmtkb3duX2NvbnRlbnQ6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1hcmtkb3duIGNvbnRlbnQgdG8gY29udmVydFwiLFxuICAgICAgICB9LFxuICAgICAgICBtYXJrZG93bl9maWxlOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIE1hcmtkb3duIGZpbGUgKGFsdGVybmF0aXZlIHRvIGNvbnRlbnQpXCIsXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dF9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIGZvciB0aGUgb3V0cHV0IFBQVFggZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICB0aGVtZToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZW51bTogW1wiZGVmYXVsdFwiLCBcIm1vZGVyblwiLCBcIm1pbmltYWxcIiwgXCJjb3Jwb3JhdGVcIl0sXG4gICAgICAgICAgZGVmYXVsdDogXCJkZWZhdWx0XCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcIm91dHB1dF9wYXRoXCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImFkZF9zbGlkZVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFkZCBhIG5ldyBzbGlkZSB0byBhbiBleGlzdGluZyBQb3dlclBvaW50IHByZXNlbnRhdGlvbi5cIixcbiAgICBpbnB1dFNjaGVtYToge1xuICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZmlsZV9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBQUFRYIGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0X3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggZm9yIHRoZSBvdXRwdXQgZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUG9zaXRpb24gdG8gaW5zZXJ0IHNsaWRlICgxLWJhc2VkLCAtMSBmb3IgZW5kKVwiLFxuICAgICAgICAgIGRlZmF1bHQ6IC0xLFxuICAgICAgICB9LFxuICAgICAgICBsYXlvdXQ6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGVudW06IFtcInRpdGxlXCIsIFwidGl0bGVfY29udGVudFwiLCBcInR3b19jb2x1bW5cIiwgXCJibGFua1wiXSxcbiAgICAgICAgfSxcbiAgICAgICAgdGl0bGU6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICBjb250ZW50OiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgYnVsbGV0X3BvaW50czogeyB0eXBlOiBcImFycmF5XCIsIGl0ZW1zOiB7IHR5cGU6IFwic3RyaW5nXCIgfSB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJmaWxlX3BhdGhcIiwgXCJvdXRwdXRfcGF0aFwiLCBcImxheW91dFwiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJ1cGRhdGVfc2xpZGVcIixcbiAgICBkZXNjcmlwdGlvbjogXCJVcGRhdGUgY29udGVudCBvZiBhbiBleGlzdGluZyBzbGlkZS5cIixcbiAgICBpbnB1dFNjaGVtYToge1xuICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZmlsZV9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBQUFRYIGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0X3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggZm9yIHRoZSBvdXRwdXQgZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBzbGlkZV9udW1iZXI6IHtcbiAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNsaWRlIG51bWJlciB0byB1cGRhdGUgKDEtYmFzZWQpXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZXM6IHtcbiAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIHRpdGxlOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgYnVsbGV0X3BvaW50czogeyB0eXBlOiBcImFycmF5XCIsIGl0ZW1zOiB7IHR5cGU6IFwic3RyaW5nXCIgfSB9LFxuICAgICAgICAgICAgbm90ZXM6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImZpbGVfcGF0aFwiLCBcIm91dHB1dF9wYXRoXCIsIFwic2xpZGVfbnVtYmVyXCIsIFwidXBkYXRlc1wiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJwcHR4X3RvX2h0bWxcIixcbiAgICBkZXNjcmlwdGlvbjogXCJDb252ZXJ0IFBvd2VyUG9pbnQgdG8gSFRNTCBzbGlkZXMgKHJldmVhbC5qcyBmb3JtYXQpLlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIFBQVFggZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCBmb3IgdGhlIG91dHB1dCBIVE1MIGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgdGhlbWU6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGVudW06IFtcIndoaXRlXCIsIFwiYmxhY2tcIiwgXCJsZWFndWVcIiwgXCJiZWlnZVwiLCBcInNreVwiLCBcIm5pZ2h0XCJdLFxuICAgICAgICAgIGRlZmF1bHQ6IFwid2hpdGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgaW5jbHVkZV9ub3Rlczoge1xuICAgICAgICAgIHR5cGU6IFwiYm9vbGVhblwiLFxuICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImZpbGVfcGF0aFwiLCBcIm91dHB1dF9wYXRoXCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImdldF9wcHR4X291dGxpbmVcIixcbiAgICBkZXNjcmlwdGlvbjogXCJHZXQgdGhlIG91dGxpbmUvc3RydWN0dXJlIG9mIGEgUG93ZXJQb2ludCBwcmVzZW50YXRpb24uXCIsXG4gICAgaW5wdXRTY2hlbWE6IHtcbiAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGZpbGVfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCB0byB0aGUgUFBUWCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImZpbGVfcGF0aFwiXSxcbiAgICB9LFxuICB9LFxuXTtcblxuLyoqXG4gKiBIYW5kbGUgcHJlc2VudGF0aW9uIHRvb2wgY2FsbHNcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZVByZXNlbnRhdGlvblRvb2woXG4gIG5hbWU6IHN0cmluZyxcbiAgYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj5cbik6IFByb21pc2U8dW5rbm93bj4ge1xuICBzd2l0Y2ggKG5hbWUpIHtcbiAgICBjYXNlIFwiY3JlYXRlX3BwdHhcIjpcbiAgICAgIHJldHVybiBjcmVhdGVQcHR4KGFyZ3MpO1xuICAgIGNhc2UgXCJleHRyYWN0X2Zyb21fcHB0eFwiOlxuICAgICAgcmV0dXJuIGV4dHJhY3RGcm9tUHB0eChhcmdzKTtcbiAgICBjYXNlIFwibWRfdG9fcHB0eFwiOlxuICAgICAgcmV0dXJuIG1kVG9QcHR4KGFyZ3MpO1xuICAgIGNhc2UgXCJhZGRfc2xpZGVcIjpcbiAgICAgIHJldHVybiBhZGRTbGlkZShhcmdzKTtcbiAgICBjYXNlIFwidXBkYXRlX3NsaWRlXCI6XG4gICAgICByZXR1cm4gdXBkYXRlU2xpZGUoYXJncyk7XG4gICAgY2FzZSBcInBwdHhfdG9faHRtbFwiOlxuICAgICAgcmV0dXJuIHBwdHhUb0h0bWwoYXJncyk7XG4gICAgY2FzZSBcImdldF9wcHR4X291dGxpbmVcIjpcbiAgICAgIHJldHVybiBnZXRQcHR4T3V0bGluZShhcmdzKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHByZXNlbnRhdGlvbiB0b29sOiAke25hbWV9YCk7XG4gIH1cbn1cblxuLy8gVGhlbWUgY29sb3JzXG5jb25zdCB0aGVtZXM6IFJlY29yZDxzdHJpbmcsIHsgYmFja2dyb3VuZDogc3RyaW5nOyB0aXRsZUNvbG9yOiBzdHJpbmc7IHRleHRDb2xvcjogc3RyaW5nIH0+ID0ge1xuICBkZWZhdWx0OiB7IGJhY2tncm91bmQ6ICdGRkZGRkYnLCB0aXRsZUNvbG9yOiAnMDAzMzY2JywgdGV4dENvbG9yOiAnMzMzMzMzJyB9LFxuICBtb2Rlcm46IHsgYmFja2dyb3VuZDogJ0Y1RjVGNScsIHRpdGxlQ29sb3I6ICcyMTk2RjMnLCB0ZXh0Q29sb3I6ICc0MjQyNDInIH0sXG4gIG1pbmltYWw6IHsgYmFja2dyb3VuZDogJ0ZGRkZGRicsIHRpdGxlQ29sb3I6ICcwMDAwMDAnLCB0ZXh0Q29sb3I6ICc2NjY2NjYnIH0sXG4gIGNvcnBvcmF0ZTogeyBiYWNrZ3JvdW5kOiAnRkZGRkZGJywgdGl0bGVDb2xvcjogJzFBMjM3RScsIHRleHRDb2xvcjogJzM3NDc0RicgfSxcbiAgY3JlYXRpdmU6IHsgYmFja2dyb3VuZDogJ0ZGRjhFMScsIHRpdGxlQ29sb3I6ICdGRjZGMDAnLCB0ZXh0Q29sb3I6ICc1RDQwMzcnIH0sXG59O1xuXG4vLyBUb29sIGltcGxlbWVudGF0aW9uc1xuYXN5bmMgZnVuY3Rpb24gY3JlYXRlUHB0eChhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHsgb3V0cHV0X3BhdGgsIHNsaWRlcywgdGhlbWUgfSA9IGFyZ3M7XG4gIFxuICB0cnkge1xuICAgIGNvbnN0IG91dHB1dFBhdGggPSBvdXRwdXRfcGF0aCBhcyBzdHJpbmc7XG4gICAgY29uc3Qgc2xpZGVEZWZzID0gc2xpZGVzIGFzIEFycmF5PHtcbiAgICAgIGxheW91dD86IHN0cmluZztcbiAgICAgIHRpdGxlPzogc3RyaW5nO1xuICAgICAgY29udGVudD86IHN0cmluZztcbiAgICAgIGJ1bGxldF9wb2ludHM/OiBzdHJpbmdbXTtcbiAgICAgIGltYWdlX3BhdGg/OiBzdHJpbmc7XG4gICAgICBub3Rlcz86IHN0cmluZztcbiAgICB9PjtcbiAgICBjb25zdCB0aGVtZU5hbWUgPSB0aGVtZSBhcyBzdHJpbmcgfHwgJ2RlZmF1bHQnO1xuICAgIGNvbnN0IGNvbG9ycyA9IHRoZW1lc1t0aGVtZU5hbWVdIHx8IHRoZW1lcy5kZWZhdWx0O1xuICAgIFxuICAgIGNvbnN0IHBwdHggPSBuZXcgUHB0eEdlbkpTKCk7XG4gICAgcHB0eC5hdXRob3IgPSAnT2ZmaWNlIE1DUCc7XG4gICAgcHB0eC50aXRsZSA9IHNsaWRlRGVmc1swXT8udGl0bGUgfHwgJ1ByZXNlbnRhdGlvbic7XG4gICAgXG4gICAgZm9yIChjb25zdCBzbGlkZURlZiBvZiBzbGlkZURlZnMpIHtcbiAgICAgIGNvbnN0IHNsaWRlID0gcHB0eC5hZGRTbGlkZSgpO1xuICAgICAgXG4gICAgICAvLyBTZXQgYmFja2dyb3VuZFxuICAgICAgc2xpZGUuYmFja2dyb3VuZCA9IHsgY29sb3I6IGNvbG9ycy5iYWNrZ3JvdW5kIH07XG4gICAgICBcbiAgICAgIC8vIEFkZCB0aXRsZVxuICAgICAgaWYgKHNsaWRlRGVmLnRpdGxlKSB7XG4gICAgICAgIHNsaWRlLmFkZFRleHQoc2xpZGVEZWYudGl0bGUsIHtcbiAgICAgICAgICB4OiAwLjUsXG4gICAgICAgICAgeTogc2xpZGVEZWYubGF5b3V0ID09PSAndGl0bGUnID8gMi41IDogMC41LFxuICAgICAgICAgIHc6ICc5MCUnLFxuICAgICAgICAgIGg6IDEsXG4gICAgICAgICAgZm9udFNpemU6IHNsaWRlRGVmLmxheW91dCA9PT0gJ3RpdGxlJyA/IDQ0IDogMzIsXG4gICAgICAgICAgY29sb3I6IGNvbG9ycy50aXRsZUNvbG9yLFxuICAgICAgICAgIGJvbGQ6IHRydWUsXG4gICAgICAgICAgYWxpZ246IHNsaWRlRGVmLmxheW91dCA9PT0gJ3RpdGxlJyA/ICdjZW50ZXInIDogJ2xlZnQnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gQWRkIGNvbnRlbnQgb3IgYnVsbGV0IHBvaW50c1xuICAgICAgaWYgKHNsaWRlRGVmLmJ1bGxldF9wb2ludHMgJiYgc2xpZGVEZWYuYnVsbGV0X3BvaW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGJ1bGxldFRleHQgPSBzbGlkZURlZi5idWxsZXRfcG9pbnRzLm1hcChwb2ludCA9PiAoe1xuICAgICAgICAgIHRleHQ6IHBvaW50LFxuICAgICAgICAgIG9wdGlvbnM6IHsgYnVsbGV0OiB0cnVlLCBmb250U2l6ZTogMTgsIGNvbG9yOiBjb2xvcnMudGV4dENvbG9yIH0sXG4gICAgICAgIH0pKTtcbiAgICAgICAgc2xpZGUuYWRkVGV4dChidWxsZXRUZXh0LCB7XG4gICAgICAgICAgeDogMC41LFxuICAgICAgICAgIHk6IDEuOCxcbiAgICAgICAgICB3OiAnOTAlJyxcbiAgICAgICAgICBoOiA0LFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoc2xpZGVEZWYuY29udGVudCkge1xuICAgICAgICBzbGlkZS5hZGRUZXh0KHNsaWRlRGVmLmNvbnRlbnQsIHtcbiAgICAgICAgICB4OiAwLjUsXG4gICAgICAgICAgeTogMS44LFxuICAgICAgICAgIHc6ICc5MCUnLFxuICAgICAgICAgIGg6IDQsXG4gICAgICAgICAgZm9udFNpemU6IDE4LFxuICAgICAgICAgIGNvbG9yOiBjb2xvcnMudGV4dENvbG9yLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gQWRkIG5vdGVzXG4gICAgICBpZiAoc2xpZGVEZWYubm90ZXMpIHtcbiAgICAgICAgc2xpZGUuYWRkTm90ZXMoc2xpZGVEZWYubm90ZXMpO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBhd2FpdCBwcHR4LndyaXRlRmlsZSh7IGZpbGVOYW1lOiBvdXRwdXRQYXRoIH0pO1xuICAgIFxuICAgIHJldHVybiBgU3VjY2Vzc2Z1bGx5IGNyZWF0ZWQgUG93ZXJQb2ludCBhdCAke291dHB1dFBhdGh9IHdpdGggJHtzbGlkZURlZnMubGVuZ3RofSBzbGlkZXMgdXNpbmcgJHt0aGVtZU5hbWV9IHRoZW1lLmA7XG4gICAgXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICByZXR1cm4gYEVycm9yIGNyZWF0aW5nIFBvd2VyUG9pbnQ6ICR7ZXJyb3IubWVzc2FnZX1gO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGV4dHJhY3RGcm9tUHB0eChhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8b2JqZWN0PiB7XG4gIGNvbnN0IHsgZmlsZV9wYXRoLCBleHRyYWN0X25vdGVzLCBvdXRwdXRfZGlyIH0gPSBhcmdzO1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGVfcGF0aCBhcyBzdHJpbmc7XG4gICAgXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWxlIG5vdCBmb3VuZDogJHtmaWxlUGF0aH1gKTtcbiAgICB9XG4gICAgXG4gICAgLy8gUmVhZCBQUFRYIGZpbGUgKGl0J3MgYSBaSVAgYXJjaGl2ZSlcbiAgICBjb25zdCBkYXRhID0gZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoKTtcbiAgICBjb25zdCB6aXAgPSBhd2FpdCBKU1ppcC5sb2FkQXN5bmMoZGF0YSk7XG4gICAgXG4gICAgY29uc3Qgc2xpZGVzOiBBcnJheTx7IG51bWJlcjogbnVtYmVyOyB0aXRsZTogc3RyaW5nOyBjb250ZW50OiBzdHJpbmc7IG5vdGVzPzogc3RyaW5nIH0+ID0gW107XG4gICAgbGV0IGltYWdlQ291bnQgPSAwO1xuICAgIFxuICAgIC8vIEZpbmQgc2xpZGUgWE1MIGZpbGVzXG4gICAgY29uc3Qgc2xpZGVGaWxlcyA9IE9iamVjdC5rZXlzKHppcC5maWxlcylcbiAgICAgIC5maWx0ZXIobmFtZSA9PiBuYW1lLm1hdGNoKC9wcHRcXC9zbGlkZXNcXC9zbGlkZVxcZCtcXC54bWwvKSlcbiAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGNvbnN0IG51bUEgPSBwYXJzZUludChhLm1hdGNoKC9zbGlkZShcXGQrKS8pPy5bMV0gfHwgJzAnKTtcbiAgICAgICAgY29uc3QgbnVtQiA9IHBhcnNlSW50KGIubWF0Y2goL3NsaWRlKFxcZCspLyk/LlsxXSB8fCAnMCcpO1xuICAgICAgICByZXR1cm4gbnVtQSAtIG51bUI7XG4gICAgICB9KTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlRmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNsaWRlRmlsZSA9IHNsaWRlRmlsZXNbaV07XG4gICAgICBjb25zdCBzbGlkZVhtbCA9IGF3YWl0IHppcC5maWxlKHNsaWRlRmlsZSk/LmFzeW5jKCdzdHJpbmcnKTtcbiAgICAgIFxuICAgICAgaWYgKHNsaWRlWG1sKSB7XG4gICAgICAgIC8vIEV4dHJhY3QgdGV4dCBjb250ZW50IChzaW1wbGUgcmVnZXggZXh0cmFjdGlvbilcbiAgICAgICAgY29uc3QgdGV4dE1hdGNoZXMgPSBzbGlkZVhtbC5tYXRjaCgvPGE6dD4oW148XSopPFxcL2E6dD4vZykgfHwgW107XG4gICAgICAgIGNvbnN0IHRleHRzID0gdGV4dE1hdGNoZXMubWFwKG0gPT4gbS5yZXBsYWNlKC88XFwvP2E6dD4vZywgJycpKTtcbiAgICAgICAgXG4gICAgICAgIHNsaWRlcy5wdXNoKHtcbiAgICAgICAgICBudW1iZXI6IGkgKyAxLFxuICAgICAgICAgIHRpdGxlOiB0ZXh0c1swXSB8fCBgU2xpZGUgJHtpICsgMX1gLFxuICAgICAgICAgIGNvbnRlbnQ6IHRleHRzLnNsaWNlKDEpLmpvaW4oJ1xcbicpLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gQ291bnQgaW1hZ2VzXG4gICAgY29uc3QgaW1hZ2VGaWxlcyA9IE9iamVjdC5rZXlzKHppcC5maWxlcykuZmlsdGVyKG5hbWUgPT4gXG4gICAgICBuYW1lLm1hdGNoKC9wcHRcXC9tZWRpYVxcL2ltYWdlXFxkK1xcLihwbmd8anBnfGpwZWd8Z2lmKS9pKVxuICAgICk7XG4gICAgaW1hZ2VDb3VudCA9IGltYWdlRmlsZXMubGVuZ3RoO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICBmaWxlOiBmaWxlX3BhdGgsXG4gICAgICBzbGlkZXM6IHNsaWRlcyxcbiAgICAgIHRvdGFsX3NsaWRlczogc2xpZGVzLmxlbmd0aCxcbiAgICAgIGltYWdlc19mb3VuZDogaW1hZ2VDb3VudCxcbiAgICB9O1xuICAgIFxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yOiBgRmFpbGVkIHRvIGV4dHJhY3QgZnJvbSBQUFRYOiAke2Vycm9yLm1lc3NhZ2V9YCxcbiAgICAgIGZpbGU6IGZpbGVfcGF0aCxcbiAgICB9O1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1kVG9QcHR4KGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgeyBtYXJrZG93bl9jb250ZW50LCBtYXJrZG93bl9maWxlLCBvdXRwdXRfcGF0aCwgdGhlbWUgfSA9IGFyZ3M7XG4gIFxuICB0cnkge1xuICAgIGNvbnN0IG91dHB1dFBhdGggPSBvdXRwdXRfcGF0aCBhcyBzdHJpbmc7XG4gICAgY29uc3QgdGhlbWVOYW1lID0gdGhlbWUgYXMgc3RyaW5nIHx8ICdkZWZhdWx0JztcbiAgICBjb25zdCBjb2xvcnMgPSB0aGVtZXNbdGhlbWVOYW1lXSB8fCB0aGVtZXMuZGVmYXVsdDtcbiAgICBcbiAgICAvLyBHZXQgbWFya2Rvd24gY29udGVudFxuICAgIGxldCBtZENvbnRlbnQ6IHN0cmluZztcbiAgICBpZiAobWFya2Rvd25fY29udGVudCkge1xuICAgICAgbWRDb250ZW50ID0gbWFya2Rvd25fY29udGVudCBhcyBzdHJpbmc7XG4gICAgfSBlbHNlIGlmIChtYXJrZG93bl9maWxlKSB7XG4gICAgICBjb25zdCBtZEZpbGUgPSBtYXJrZG93bl9maWxlIGFzIHN0cmluZztcbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhtZEZpbGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTWFya2Rvd24gZmlsZSBub3QgZm91bmQ6ICR7bWRGaWxlfWApO1xuICAgICAgfVxuICAgICAgbWRDb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKG1kRmlsZSwgJ3V0Zi04Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRWl0aGVyIG1hcmtkb3duX2NvbnRlbnQgb3IgbWFya2Rvd25fZmlsZSBpcyByZXF1aXJlZCcpO1xuICAgIH1cbiAgICBcbiAgICAvLyBTcGxpdCBieSBzbGlkZSBzZXBhcmF0b3IgKC0tLSlcbiAgICBjb25zdCBzbGlkZUNvbnRlbnRzID0gbWRDb250ZW50LnNwbGl0KC9cXG4tLS1cXG4vKS5tYXAocyA9PiBzLnRyaW0oKSkuZmlsdGVyKHMgPT4gcyk7XG4gICAgXG4gICAgY29uc3QgcHB0eCA9IG5ldyBQcHR4R2VuSlMoKTtcbiAgICBwcHR4LmF1dGhvciA9ICdPZmZpY2UgTUNQJztcbiAgICBcbiAgICBmb3IgKGNvbnN0IHNsaWRlQ29udGVudCBvZiBzbGlkZUNvbnRlbnRzKSB7XG4gICAgICBjb25zdCBzbGlkZSA9IHBwdHguYWRkU2xpZGUoKTtcbiAgICAgIHNsaWRlLmJhY2tncm91bmQgPSB7IGNvbG9yOiBjb2xvcnMuYmFja2dyb3VuZCB9O1xuICAgICAgXG4gICAgICBjb25zdCBsaW5lcyA9IHNsaWRlQ29udGVudC5zcGxpdCgnXFxuJyk7XG4gICAgICBsZXQgdGl0bGUgPSAnJztcbiAgICAgIGNvbnN0IGJ1bGxldFBvaW50czogc3RyaW5nW10gPSBbXTtcbiAgICAgIGxldCBjb250ZW50ID0gJyc7XG4gICAgICBcbiAgICAgIGZvciAoY29uc3QgbGluZSBvZiBsaW5lcykge1xuICAgICAgICBpZiAobGluZS5zdGFydHNXaXRoKCcjICcpKSB7XG4gICAgICAgICAgdGl0bGUgPSBsaW5lLnJlcGxhY2UoL14jKyAvLCAnJyk7XG4gICAgICAgIH0gZWxzZSBpZiAobGluZS5zdGFydHNXaXRoKCcjIyAnKSkge1xuICAgICAgICAgIHRpdGxlID0gbGluZS5yZXBsYWNlKC9eIysgLywgJycpO1xuICAgICAgICB9IGVsc2UgaWYgKGxpbmUuc3RhcnRzV2l0aCgnLSAnKSB8fCBsaW5lLnN0YXJ0c1dpdGgoJyogJykpIHtcbiAgICAgICAgICBidWxsZXRQb2ludHMucHVzaChsaW5lLnJlcGxhY2UoL15bLSpdIC8sICcnKSk7XG4gICAgICAgIH0gZWxzZSBpZiAobGluZS50cmltKCkpIHtcbiAgICAgICAgICBjb250ZW50ICs9IGxpbmUgKyAnXFxuJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBBZGQgdGl0bGVcbiAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICBzbGlkZS5hZGRUZXh0KHRpdGxlLCB7XG4gICAgICAgICAgeDogMC41LFxuICAgICAgICAgIHk6IDAuNSxcbiAgICAgICAgICB3OiAnOTAlJyxcbiAgICAgICAgICBoOiAxLFxuICAgICAgICAgIGZvbnRTaXplOiAzMixcbiAgICAgICAgICBjb2xvcjogY29sb3JzLnRpdGxlQ29sb3IsXG4gICAgICAgICAgYm9sZDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIEFkZCBidWxsZXRzIG9yIGNvbnRlbnRcbiAgICAgIGlmIChidWxsZXRQb2ludHMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBidWxsZXRUZXh0ID0gYnVsbGV0UG9pbnRzLm1hcChwb2ludCA9PiAoe1xuICAgICAgICAgIHRleHQ6IHBvaW50LFxuICAgICAgICAgIG9wdGlvbnM6IHsgYnVsbGV0OiB0cnVlLCBmb250U2l6ZTogMTgsIGNvbG9yOiBjb2xvcnMudGV4dENvbG9yIH0sXG4gICAgICAgIH0pKTtcbiAgICAgICAgc2xpZGUuYWRkVGV4dChidWxsZXRUZXh0LCB7XG4gICAgICAgICAgeDogMC41LFxuICAgICAgICAgIHk6IDEuOCxcbiAgICAgICAgICB3OiAnOTAlJyxcbiAgICAgICAgICBoOiA0LFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoY29udGVudC50cmltKCkpIHtcbiAgICAgICAgc2xpZGUuYWRkVGV4dChjb250ZW50LnRyaW0oKSwge1xuICAgICAgICAgIHg6IDAuNSxcbiAgICAgICAgICB5OiAxLjgsXG4gICAgICAgICAgdzogJzkwJScsXG4gICAgICAgICAgaDogNCxcbiAgICAgICAgICBmb250U2l6ZTogMTgsXG4gICAgICAgICAgY29sb3I6IGNvbG9ycy50ZXh0Q29sb3IsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBhd2FpdCBwcHR4LndyaXRlRmlsZSh7IGZpbGVOYW1lOiBvdXRwdXRQYXRoIH0pO1xuICAgIFxuICAgIHJldHVybiBgU3VjY2Vzc2Z1bGx5IGNvbnZlcnRlZCBNYXJrZG93biB0byBQb3dlclBvaW50IGF0ICR7b3V0cHV0UGF0aH0gd2l0aCAke3NsaWRlQ29udGVudHMubGVuZ3RofSBzbGlkZXMuYDtcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIHJldHVybiBgRXJyb3IgY29udmVydGluZyBNYXJrZG93biB0byBQUFRYOiAke2Vycm9yLm1lc3NhZ2V9YDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBhZGRTbGlkZShhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHsgZmlsZV9wYXRoLCBvdXRwdXRfcGF0aCwgbGF5b3V0LCB0aXRsZSwgY29udGVudCwgYnVsbGV0X3BvaW50cyB9ID0gYXJncztcbiAgXG4gIHRyeSB7XG4gICAgLy8gTm90ZTogcHB0eGdlbmpzIGNyZWF0ZXMgbmV3IGZpbGVzLCBjYW4ndCBlYXNpbHkgbW9kaWZ5IGV4aXN0aW5nIG9uZXNcbiAgICAvLyBGb3Igbm93LCB3ZSBleHRyYWN0IGV4aXN0aW5nIGNvbnRlbnQgYW5kIHJlY3JlYXRlXG4gICAgY29uc3QgZmlsZVBhdGggPSBmaWxlX3BhdGggYXMgc3RyaW5nO1xuICAgIGNvbnN0IG91dHB1dFBhdGggPSBvdXRwdXRfcGF0aCBhcyBzdHJpbmc7XG4gICAgXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWxlIG5vdCBmb3VuZDogJHtmaWxlUGF0aH1gKTtcbiAgICB9XG4gICAgXG4gICAgLy8gRXh0cmFjdCBleGlzdGluZyBzbGlkZXNcbiAgICBjb25zdCBleHRyYWN0UmVzdWx0ID0gYXdhaXQgZXh0cmFjdEZyb21QcHR4KHsgZmlsZV9wYXRoOiBmaWxlUGF0aCB9KSBhcyBhbnk7XG4gICAgXG4gICAgaWYgKGV4dHJhY3RSZXN1bHQuZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihleHRyYWN0UmVzdWx0LmVycm9yKTtcbiAgICB9XG4gICAgXG4gICAgLy8gQ3JlYXRlIG5ldyBwcmVzZW50YXRpb24gd2l0aCBleGlzdGluZyBzbGlkZXMgcGx1cyBuZXcgb25lXG4gICAgY29uc3QgcHB0eCA9IG5ldyBQcHR4R2VuSlMoKTtcbiAgICBcbiAgICAvLyBBZGQgZXhpc3Rpbmcgc2xpZGVzXG4gICAgZm9yIChjb25zdCBleGlzdGluZ1NsaWRlIG9mIGV4dHJhY3RSZXN1bHQuc2xpZGVzKSB7XG4gICAgICBjb25zdCBzbGlkZSA9IHBwdHguYWRkU2xpZGUoKTtcbiAgICAgIGlmIChleGlzdGluZ1NsaWRlLnRpdGxlKSB7XG4gICAgICAgIHNsaWRlLmFkZFRleHQoZXhpc3RpbmdTbGlkZS50aXRsZSwge1xuICAgICAgICAgIHg6IDAuNSwgeTogMC41LCB3OiAnOTAlJywgaDogMSwgZm9udFNpemU6IDMyLCBib2xkOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChleGlzdGluZ1NsaWRlLmNvbnRlbnQpIHtcbiAgICAgICAgc2xpZGUuYWRkVGV4dChleGlzdGluZ1NsaWRlLmNvbnRlbnQsIHtcbiAgICAgICAgICB4OiAwLjUsIHk6IDEuOCwgdzogJzkwJScsIGg6IDQsIGZvbnRTaXplOiAxOCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIEFkZCBuZXcgc2xpZGVcbiAgICBjb25zdCBuZXdTbGlkZSA9IHBwdHguYWRkU2xpZGUoKTtcbiAgICBcbiAgICBpZiAodGl0bGUpIHtcbiAgICAgIG5ld1NsaWRlLmFkZFRleHQodGl0bGUgYXMgc3RyaW5nLCB7XG4gICAgICAgIHg6IDAuNSxcbiAgICAgICAgeTogbGF5b3V0ID09PSAndGl0bGUnID8gMi41IDogMC41LFxuICAgICAgICB3OiAnOTAlJyxcbiAgICAgICAgaDogMSxcbiAgICAgICAgZm9udFNpemU6IGxheW91dCA9PT0gJ3RpdGxlJyA/IDQ0IDogMzIsXG4gICAgICAgIGJvbGQ6IHRydWUsXG4gICAgICAgIGFsaWduOiBsYXlvdXQgPT09ICd0aXRsZScgPyAnY2VudGVyJyA6ICdsZWZ0JyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBpZiAoYnVsbGV0X3BvaW50cyAmJiAoYnVsbGV0X3BvaW50cyBhcyBzdHJpbmdbXSkubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgYnVsbGV0VGV4dCA9IChidWxsZXRfcG9pbnRzIGFzIHN0cmluZ1tdKS5tYXAocG9pbnQgPT4gKHtcbiAgICAgICAgdGV4dDogcG9pbnQsXG4gICAgICAgIG9wdGlvbnM6IHsgYnVsbGV0OiB0cnVlLCBmb250U2l6ZTogMTggfSxcbiAgICAgIH0pKTtcbiAgICAgIG5ld1NsaWRlLmFkZFRleHQoYnVsbGV0VGV4dCwge1xuICAgICAgICB4OiAwLjUsIHk6IDEuOCwgdzogJzkwJScsIGg6IDQsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGNvbnRlbnQpIHtcbiAgICAgIG5ld1NsaWRlLmFkZFRleHQoY29udGVudCBhcyBzdHJpbmcsIHtcbiAgICAgICAgeDogMC41LCB5OiAxLjgsIHc6ICc5MCUnLCBoOiA0LCBmb250U2l6ZTogMTgsXG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgYXdhaXQgcHB0eC53cml0ZUZpbGUoeyBmaWxlTmFtZTogb3V0cHV0UGF0aCB9KTtcbiAgICBcbiAgICByZXR1cm4gYFN1Y2Nlc3NmdWxseSBhZGRlZCAke2xheW91dH0gc2xpZGUuIFRvdGFsIHNsaWRlczogJHtleHRyYWN0UmVzdWx0LnNsaWRlcy5sZW5ndGggKyAxfS4gT3V0cHV0OiAke291dHB1dFBhdGh9YDtcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIHJldHVybiBgRXJyb3IgYWRkaW5nIHNsaWRlOiAke2Vycm9yLm1lc3NhZ2V9YDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVTbGlkZShhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8b2JqZWN0PiB7XG4gIGNvbnN0IHsgZmlsZV9wYXRoLCBvdXRwdXRfcGF0aCwgc2xpZGVfbnVtYmVyLCB1cGRhdGVzIH0gPSBhcmdzO1xuICBcbiAgLy8gTm90ZTogTW9kaWZ5aW5nIGV4aXN0aW5nIFBQVFggc2xpZGVzIGluIHBsYWNlIGlzIGNvbXBsZXhcbiAgLy8gcHB0eGdlbmpzIGlzIHByaW1hcmlseSBmb3IgY3JlYXRpb24sIG5vdCBtb2RpZmljYXRpb25cbiAgcmV0dXJuIHtcbiAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICBtZXNzYWdlOiBcIlVwZGF0aW5nIGV4aXN0aW5nIHNsaWRlcyByZXF1aXJlcyByZWFkaW5nIGFuZCByZXdyaXRpbmcgdGhlIFBQVFhcIixcbiAgICBmaWxlOiBmaWxlX3BhdGgsXG4gICAgc2xpZGVfbnVtYmVyOiBzbGlkZV9udW1iZXIsXG4gICAgdXBkYXRlczogdXBkYXRlcyxcbiAgICBzdWdnZXN0aW9uOiBcIlVzZSBleHRyYWN0X2Zyb21fcHB0eCB0byBnZXQgY29udGVudCwgbW9kaWZ5IGl0LCB0aGVuIHVzZSBjcmVhdGVfcHB0eCB0byBjcmVhdGUgbmV3IGZpbGVcIixcbiAgfTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcHB0eFRvSHRtbChhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHsgZmlsZV9wYXRoLCBvdXRwdXRfcGF0aCwgdGhlbWUsIGluY2x1ZGVfbm90ZXMgfSA9IGFyZ3M7XG4gIFxuICB0cnkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gZmlsZV9wYXRoIGFzIHN0cmluZztcbiAgICBjb25zdCBvdXRwdXRQYXRoID0gb3V0cHV0X3BhdGggYXMgc3RyaW5nO1xuICAgIGNvbnN0IGh0bWxUaGVtZSA9IHRoZW1lIGFzIHN0cmluZyB8fCAnd2hpdGUnO1xuICAgIFxuICAgIGlmICghZnMuZXhpc3RzU3luYyhmaWxlUGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmlsZSBub3QgZm91bmQ6ICR7ZmlsZVBhdGh9YCk7XG4gICAgfVxuICAgIFxuICAgIC8vIEV4dHJhY3Qgc2xpZGVzXG4gICAgY29uc3QgZXh0cmFjdFJlc3VsdCA9IGF3YWl0IGV4dHJhY3RGcm9tUHB0eCh7IGZpbGVfcGF0aDogZmlsZVBhdGgsIGV4dHJhY3Rfbm90ZXM6IGluY2x1ZGVfbm90ZXMgfSkgYXMgYW55O1xuICAgIFxuICAgIGlmIChleHRyYWN0UmVzdWx0LmVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXh0cmFjdFJlc3VsdC5lcnJvcik7XG4gICAgfVxuICAgIFxuICAgIC8vIEdlbmVyYXRlIHJldmVhbC5qcyBIVE1MXG4gICAgY29uc3Qgc2xpZGVzSHRtbCA9IGV4dHJhY3RSZXN1bHQuc2xpZGVzLm1hcCgoc2xpZGU6IGFueSkgPT4ge1xuICAgICAgbGV0IHNsaWRlQ29udGVudCA9ICcnO1xuICAgICAgaWYgKHNsaWRlLnRpdGxlKSB7XG4gICAgICAgIHNsaWRlQ29udGVudCArPSBgPGgyPiR7c2xpZGUudGl0bGV9PC9oMj5cXG5gO1xuICAgICAgfVxuICAgICAgaWYgKHNsaWRlLmNvbnRlbnQpIHtcbiAgICAgICAgY29uc3QgbGluZXMgPSBzbGlkZS5jb250ZW50LnNwbGl0KCdcXG4nKS5maWx0ZXIoKGw6IHN0cmluZykgPT4gbC50cmltKCkpO1xuICAgICAgICBpZiAobGluZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHNsaWRlQ29udGVudCArPSAnPHVsPlxcbicgKyBsaW5lcy5tYXAoKGw6IHN0cmluZykgPT4gYDxsaT4ke2x9PC9saT5gKS5qb2luKCdcXG4nKSArICdcXG48L3VsPic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2xpZGVDb250ZW50ICs9IGA8cD4ke3NsaWRlLmNvbnRlbnR9PC9wPmA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBgPHNlY3Rpb24+XFxuJHtzbGlkZUNvbnRlbnR9XFxuPC9zZWN0aW9uPmA7XG4gICAgfSkuam9pbignXFxuXFxuJyk7XG4gICAgXG4gICAgY29uc3QgaHRtbCA9IGA8IURPQ1RZUEUgaHRtbD5cbjxodG1sPlxuPGhlYWQ+XG4gIDxtZXRhIGNoYXJzZXQ9XCJ1dGYtOFwiPlxuICA8dGl0bGU+UHJlc2VudGF0aW9uPC90aXRsZT5cbiAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJodHRwczovL3VucGtnLmNvbS9yZXZlYWwuanNANC9kaXN0L3JldmVhbC5jc3NcIj5cbiAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJodHRwczovL3VucGtnLmNvbS9yZXZlYWwuanNANC9kaXN0L3RoZW1lLyR7aHRtbFRoZW1lfS5jc3NcIj5cbjwvaGVhZD5cbjxib2R5PlxuICA8ZGl2IGNsYXNzPVwicmV2ZWFsXCI+XG4gICAgPGRpdiBjbGFzcz1cInNsaWRlc1wiPlxuJHtzbGlkZXNIdG1sfVxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPHNjcmlwdCBzcmM9XCJodHRwczovL3VucGtnLmNvbS9yZXZlYWwuanNANC9kaXN0L3JldmVhbC5qc1wiPjwvc2NyaXB0PlxuICA8c2NyaXB0PlJldmVhbC5pbml0aWFsaXplKCk7PC9zY3JpcHQ+XG48L2JvZHk+XG48L2h0bWw+YDtcbiAgICBcbiAgICBmcy53cml0ZUZpbGVTeW5jKG91dHB1dFBhdGgsIGh0bWwsICd1dGYtOCcpO1xuICAgIFxuICAgIHJldHVybiBgU3VjY2Vzc2Z1bGx5IGNvbnZlcnRlZCBQUFRYIHRvIHJldmVhbC5qcyBIVE1MIGF0ICR7b3V0cHV0UGF0aH0gd2l0aCAke2V4dHJhY3RSZXN1bHQuc2xpZGVzLmxlbmd0aH0gc2xpZGVzLmA7XG4gICAgXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICByZXR1cm4gYEVycm9yIGNvbnZlcnRpbmcgdG8gSFRNTDogJHtlcnJvci5tZXNzYWdlfWA7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0UHB0eE91dGxpbmUoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPG9iamVjdD4ge1xuICBjb25zdCB7IGZpbGVfcGF0aCB9ID0gYXJncztcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBmaWxlX3BhdGggYXMgc3RyaW5nO1xuICAgIFxuICAgIGlmICghZnMuZXhpc3RzU3luYyhmaWxlUGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmlsZSBub3QgZm91bmQ6ICR7ZmlsZVBhdGh9YCk7XG4gICAgfVxuICAgIFxuICAgIC8vIEV4dHJhY3Qgc2xpZGVzXG4gICAgY29uc3QgZXh0cmFjdFJlc3VsdCA9IGF3YWl0IGV4dHJhY3RGcm9tUHB0eCh7IGZpbGVfcGF0aDogZmlsZVBhdGggfSkgYXMgYW55O1xuICAgIFxuICAgIGlmIChleHRyYWN0UmVzdWx0LmVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXh0cmFjdFJlc3VsdC5lcnJvcik7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IG91dGxpbmUgPSBleHRyYWN0UmVzdWx0LnNsaWRlcy5tYXAoKHNsaWRlOiBhbnksIGluZGV4OiBudW1iZXIpID0+ICh7XG4gICAgICBzbGlkZTogaW5kZXggKyAxLFxuICAgICAgdGl0bGU6IHNsaWRlLnRpdGxlIHx8IGBTbGlkZSAke2luZGV4ICsgMX1gLFxuICAgICAgaGFzX2NvbnRlbnQ6ICEhc2xpZGUuY29udGVudCxcbiAgICAgIGNvbnRlbnRfcHJldmlldzogc2xpZGUuY29udGVudCA/IHNsaWRlLmNvbnRlbnQuc3Vic3RyaW5nKDAsIDEwMCkgKyAoc2xpZGUuY29udGVudC5sZW5ndGggPiAxMDAgPyAnLi4uJyA6ICcnKSA6ICcnLFxuICAgIH0pKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgZmlsZTogZmlsZV9wYXRoLFxuICAgICAgb3V0bGluZTogb3V0bGluZSxcbiAgICAgIHRvdGFsX3NsaWRlczogZXh0cmFjdFJlc3VsdC50b3RhbF9zbGlkZXMsXG4gICAgICBpbWFnZXNfZm91bmQ6IGV4dHJhY3RSZXN1bHQuaW1hZ2VzX2ZvdW5kLFxuICAgIH07XG4gICAgXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3I6IGBGYWlsZWQgdG8gZ2V0IG91dGxpbmU6ICR7ZXJyb3IubWVzc2FnZX1gLFxuICAgICAgZmlsZTogZmlsZV9wYXRoLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==