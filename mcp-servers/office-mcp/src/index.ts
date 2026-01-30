#!/usr/bin/env node
/**
 * Office MCP Server
 * 
 * The best tools for AI Skills - providing document operations as MCP tools.
 * 
 * Philosophy:
 * - Skills = Scenario-based solution guides (tell AI "what" and "how")
 * - MCP = Best-in-class tools (provide "with what" capabilities)
 * 
 * This server exposes the best document processing APIs and tools
 * that AI Skills can leverage for real-world office tasks.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Import tool handlers
import { documentTools, handleDocumentTool } from "./tools/document.js";
import { pdfTools, handlePdfTool } from "./tools/pdf.js";
import { spreadsheetTools, handleSpreadsheetTool } from "./tools/spreadsheet.js";
import { presentationTools, handlePresentationTool } from "./tools/presentation.js";
import { conversionTools, handleConversionTool } from "./tools/conversion.js";

// Server metadata
const SERVER_NAME = "office-mcp";
const SERVER_VERSION = "1.0.0";

/**
 * All available tools organized by category
 */
const ALL_TOOLS = [
  ...documentTools,
  ...pdfTools,
  ...spreadsheetTools,
  ...presentationTools,
  ...conversionTools,
];

/**
 * Tool categories for Skills to reference
 */
const TOOL_CATEGORIES = {
  document: documentTools.map(t => t.name),
  pdf: pdfTools.map(t => t.name),
  spreadsheet: spreadsheetTools.map(t => t.name),
  presentation: presentationTools.map(t => t.name),
  conversion: conversionTools.map(t => t.name),
};

/**
 * Route tool calls to appropriate handlers
 */
async function handleToolCall(name: string, args: Record<string, unknown>): Promise<unknown> {
  // Document tools
  if (TOOL_CATEGORIES.document.includes(name)) {
    return handleDocumentTool(name, args);
  }
  
  // PDF tools
  if (TOOL_CATEGORIES.pdf.includes(name)) {
    return handlePdfTool(name, args);
  }
  
  // Spreadsheet tools
  if (TOOL_CATEGORIES.spreadsheet.includes(name)) {
    return handleSpreadsheetTool(name, args);
  }
  
  // Presentation tools
  if (TOOL_CATEGORIES.presentation.includes(name)) {
    return handlePresentationTool(name, args);
  }
  
  // Conversion tools
  if (TOOL_CATEGORIES.conversion.includes(name)) {
    return handleConversionTool(name, args);
  }
  
  throw new Error(`Unknown tool: ${name}`);
}

/**
 * Main server initialization
 */
async function main() {
  const server = new Server(
    {
      name: SERVER_NAME,
      version: SERVER_VERSION,
    },
    {
      capabilities: {
        tools: {},
        resources: {},
      },
    }
  );

  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: ALL_TOOLS,
    };
  });

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    
    try {
      const result = await handleToolCall(name, args as Record<string, unknown>);
      return {
        content: [
          {
            type: "text",
            text: typeof result === "string" ? result : JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: "text",
            text: `Error: ${errorMessage}`,
          },
        ],
        isError: true,
      };
    }
  });

  // List resources (skill references, templates, etc.)
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: [
        {
          uri: "office://skills/categories",
          name: "Skill Categories",
          description: "Available tool categories for Skills to reference",
          mimeType: "application/json",
        },
        {
          uri: "office://skills/recommended",
          name: "Recommended Tools by Scenario",
          description: "Tool recommendations for common office scenarios",
          mimeType: "application/json",
        },
      ],
    };
  });

  // Read resources
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;
    
    if (uri === "office://skills/categories") {
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(TOOL_CATEGORIES, null, 2),
          },
        ],
      };
    }
    
    if (uri === "office://skills/recommended") {
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify({
              "contract-review": ["extract_text_from_pdf", "extract_text_from_docx", "analyze_document_structure"],
              "invoice-generator": ["create_docx", "create_pdf", "fill_template"],
              "data-analysis": ["read_xlsx", "analyze_spreadsheet", "create_chart"],
              "presentation": ["create_pptx", "md_to_pptx", "html_to_slides"],
              "report-generator": ["create_docx", "insert_table", "insert_chart", "export_to_pdf"],
            }, null, 2),
          },
        ],
      };
    }
    
    throw new Error(`Unknown resource: ${uri}`);
  });

  // Start server
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.error(`${SERVER_NAME} v${SERVER_VERSION} running on stdio`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
