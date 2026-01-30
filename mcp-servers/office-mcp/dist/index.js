#!/usr/bin/env node
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
// Import tool handlers
const document_js_1 = require("./tools/document.js");
const pdf_js_1 = require("./tools/pdf.js");
const spreadsheet_js_1 = require("./tools/spreadsheet.js");
const presentation_js_1 = require("./tools/presentation.js");
const conversion_js_1 = require("./tools/conversion.js");
// Server metadata
const SERVER_NAME = "office-mcp";
const SERVER_VERSION = "1.0.0";
/**
 * All available tools organized by category
 */
const ALL_TOOLS = [
    ...document_js_1.documentTools,
    ...pdf_js_1.pdfTools,
    ...spreadsheet_js_1.spreadsheetTools,
    ...presentation_js_1.presentationTools,
    ...conversion_js_1.conversionTools,
];
/**
 * Tool categories for Skills to reference
 */
const TOOL_CATEGORIES = {
    document: document_js_1.documentTools.map(t => t.name),
    pdf: pdf_js_1.pdfTools.map(t => t.name),
    spreadsheet: spreadsheet_js_1.spreadsheetTools.map(t => t.name),
    presentation: presentation_js_1.presentationTools.map(t => t.name),
    conversion: conversion_js_1.conversionTools.map(t => t.name),
};
/**
 * Route tool calls to appropriate handlers
 */
async function handleToolCall(name, args) {
    // Document tools
    if (TOOL_CATEGORIES.document.includes(name)) {
        return (0, document_js_1.handleDocumentTool)(name, args);
    }
    // PDF tools
    if (TOOL_CATEGORIES.pdf.includes(name)) {
        return (0, pdf_js_1.handlePdfTool)(name, args);
    }
    // Spreadsheet tools
    if (TOOL_CATEGORIES.spreadsheet.includes(name)) {
        return (0, spreadsheet_js_1.handleSpreadsheetTool)(name, args);
    }
    // Presentation tools
    if (TOOL_CATEGORIES.presentation.includes(name)) {
        return (0, presentation_js_1.handlePresentationTool)(name, args);
    }
    // Conversion tools
    if (TOOL_CATEGORIES.conversion.includes(name)) {
        return (0, conversion_js_1.handleConversionTool)(name, args);
    }
    throw new Error(`Unknown tool: ${name}`);
}
/**
 * Main server initialization
 */
async function main() {
    const server = new index_js_1.Server({
        name: SERVER_NAME,
        version: SERVER_VERSION,
    }, {
        capabilities: {
            tools: {},
            resources: {},
        },
    });
    // List available tools
    server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => {
        return {
            tools: ALL_TOOLS,
        };
    });
    // Handle tool calls
    server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;
        try {
            const result = await handleToolCall(name, args);
            return {
                content: [
                    {
                        type: "text",
                        text: typeof result === "string" ? result : JSON.stringify(result, null, 2),
                    },
                ],
            };
        }
        catch (error) {
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
    server.setRequestHandler(types_js_1.ListResourcesRequestSchema, async () => {
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
    server.setRequestHandler(types_js_1.ReadResourceRequestSchema, async (request) => {
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
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error(`${SERVER_NAME} v${SERVER_VERSION} running on stdio`);
}
main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7Ozs7Ozs7Ozs7R0FXRzs7QUFFSCx3RUFBbUU7QUFDbkUsd0VBQWlGO0FBQ2pGLGlFQUs0QztBQUU1Qyx1QkFBdUI7QUFDdkIscURBQXdFO0FBQ3hFLDJDQUF5RDtBQUN6RCwyREFBaUY7QUFDakYsNkRBQW9GO0FBQ3BGLHlEQUE4RTtBQUU5RSxrQkFBa0I7QUFDbEIsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDO0FBQ2pDLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQztBQUUvQjs7R0FFRztBQUNILE1BQU0sU0FBUyxHQUFHO0lBQ2hCLEdBQUcsMkJBQWE7SUFDaEIsR0FBRyxpQkFBUTtJQUNYLEdBQUcsaUNBQWdCO0lBQ25CLEdBQUcsbUNBQWlCO0lBQ3BCLEdBQUcsK0JBQWU7Q0FDbkIsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFBTSxlQUFlLEdBQUc7SUFDdEIsUUFBUSxFQUFFLDJCQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN4QyxHQUFHLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzlCLFdBQVcsRUFBRSxpQ0FBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzlDLFlBQVksRUFBRSxtQ0FBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2hELFVBQVUsRUFBRSwrQkFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Q0FDN0MsQ0FBQztBQUVGOztHQUVHO0FBQ0gsS0FBSyxVQUFVLGNB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LG1CQUFtQixFQUFFLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxlQUFlLENBQUM7NEJBQ25FLGVBQWUsRUFBRSxDQUFDLFdBQVcsRUFBRSxxQkFBcUIsRUFBRSxjQUFjLENBQUM7NEJBQ3JFLGNBQWMsRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLENBQUM7NEJBQy9ELGtCQUFrQixFQUFFLENBQUMsYUFBYSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsZUFBZSxDQUFDO3lCQUNyRixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7cUJBQ1o7aUJBQ0Y7YUFDRixDQUFDO1FBQ0osQ0FBQztRQUVELE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxlQUFlO0lBQ2YsTUFBTSxTQUFTLEdBQUcsSUFBSSwrQkFBb0IsRUFBRSxDQUFDO0lBQzdDLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVoQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsV0FBVyxLQUFLLGNBQWMsbUJBQW1CLENBQUMsQ0FBQztBQUN0RSxDQUFDO0FBRUQsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7SUFDckIsT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbi8qKlxuICogT2ZmaWNlIE1DUCBTZXJ2ZXJcbiAqIFxuICogVGhlIGJlc3QgdG9vbHMgZm9yIEFJIFNraWxscyAtIHByb3ZpZGluZyBkb2N1bWVudCBvcGVyYXRpb25zIGFzIE1DUCB0b29scy5cbiAqIFxuICogUGhpbG9zb3BoeTpcbiAqIC0gU2tpbGxzID0gU2NlbmFyaW8tYmFzZWQgc29sdXRpb24gZ3VpZGVzICh0ZWxsIEFJIFwid2hhdFwiIGFuZCBcImhvd1wiKVxuICogLSBNQ1AgPSBCZXN0LWluLWNsYXNzIHRvb2xzIChwcm92aWRlIFwid2l0aCB3aGF0XCIgY2FwYWJpbGl0aWVzKVxuICogXG4gKiBUaGlzIHNlcnZlciBleHBvc2VzIHRoZSBiZXN0IGRvY3VtZW50IHByb2Nlc3NpbmcgQVBJcyBhbmQgdG9vbHNcbiAqIHRoYXQgQUkgU2tpbGxzIGNhbiBsZXZlcmFnZSBmb3IgcmVhbC13b3JsZCBvZmZpY2UgdGFza3MuXG4gKi9cblxuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSBcIkBtb2RlbGNvbnRleHRwcm90b2NvbC9zZGsvc2VydmVyL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBTdGRpb1NlcnZlclRyYW5zcG9ydCB9IGZyb20gXCJAbW9kZWxjb250ZXh0cHJvdG9jb2wvc2RrL3NlcnZlci9zdGRpby5qc1wiO1xuaW1wb3J0IHtcbiAgQ2FsbFRvb2xSZXF1ZXN0U2NoZW1hLFxuICBMaXN0VG9vbHNSZXF1ZXN0U2NoZW1hLFxuICBMaXN0UmVzb3VyY2VzUmVxdWVzdFNjaGVtYSxcbiAgUmVhZFJlc291cmNlUmVxdWVzdFNjaGVtYSxcbn0gZnJvbSBcIkBtb2RlbGNvbnRleHRwcm90b2NvbC9zZGsvdHlwZXMuanNcIjtcblxuLy8gSW1wb3J0IHRvb2wgaGFuZGxlcnNcbmltcG9ydCB7IGRvY3VtZW50VG9vbHMsIGhhbmRsZURvY3VtZW50VG9vbCB9IGZyb20gXCIuL3Rvb2xzL2RvY3VtZW50LmpzXCI7XG5pbXBvcnQgeyBwZGZUb29scywgaGFuZGxlUGRmVG9vbCB9IGZyb20gXCIuL3Rvb2xzL3BkZi5qc1wiO1xuaW1wb3J0IHsgc3ByZWFkc2hlZXRUb29scywgaGFuZGxlU3ByZWFkc2hlZXRUb29sIH0gZnJvbSBcIi4vdG9vbHMvc3ByZWFkc2hlZXQuanNcIjtcbmltcG9ydCB7IHByZXNlbnRhdGlvblRvb2xzLCBoYW5kbGVQcmVzZW50YXRpb25Ub29sIH0gZnJvbSBcIi4vdG9vbHMvcHJlc2VudGF0aW9uLmpzXCI7XG5pbXBvcnQgeyBjb252ZXJzaW9uVG9vbHMsIGhhbmRsZUNvbnZlcnNpb25Ub29sIH0gZnJvbSBcIi4vdG9vbHMvY29udmVyc2lvbi5qc1wiO1xuXG4vLyBTZXJ2ZXIgbWV0YWRhdGFcbmNvbnN0IFNFUlZFUl9OQU1FID0gXCJvZmZpY2UtbWNwXCI7XG5jb25zdCBTRVJWRVJfVkVSU0lPTiA9IFwiMS4wLjBcIjtcblxuLyoqXG4gKiBBbGwgYXZhaWxhYmxlIHRvb2xzIG9yZ2FuaXplZCBieSBjYXRlZ29yeVxuICovXG5jb25zdCBBTExfVE9PTFMgPSBbXG4gIC4uLmRvY3VtZW50VG9vbHMsXG4gIC4uLnBkZlRvb2xzLFxuICAuLi5zcHJlYWRzaGVldFRvb2xzLFxuICAuLi5wcmVzZW50YXRpb25Ub29scyxcbiAgLi4uY29udmVyc2lvblRvb2xzLFxuXTtcblxuLyoqXG4gKiBUb29sIGNhdGVnb3JpZXMgZm9yIFNraWxscyB0byByZWZlcmVuY2VcbiAqL1xuY29uc3QgVE9PTF9DQVRFR09SSUVTID0ge1xuICBkb2N1bWVudDogZG9jdW1lbnRUb29scy5tYXAodCA9PiB0Lm5hbWUpLFxuICBwZGY6IHBkZlRvb2xzLm1hcCh0ID0+IHQubmFtZSksXG4gIHNwcmVhZHNoZWV0OiBzcHJlYWRzaGVldFRvb2xzLm1hcCh0ID0+IHQubmFtZSksXG4gIHByZXNlbnRhdGlvbjogcHJlc2VudGF0aW9uVG9vbHMubWFwKHQgPT4gdC5uYW1lKSxcbiAgY29udmVyc2lvbjogY29udmVyc2lvblRvb2xzLm1hcCh0ID0+IHQubmFtZSksXG59O1xuXG4vKipcbiAqIFJvdXRlIHRvb2wgY2FsbHMgdG8gYXBwcm9wcmlhdGUgaGFuZGxlcnNcbiAqL1xuYXN5bmMgZnVuY3Rpb24gaGFuZGxlVG9vbENhbGwobmFtZTogc3RyaW5nLCBhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8dW5rbm93bj4ge1xuICAvLyBEb2N1bWVudCB0b29sc1xuICBpZiAoVE9PTF9DQVRFR09SSUVTLmRvY3VtZW50LmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgcmV0dXJuIGhhbmRsZURvY3VtZW50VG9vbChuYW1lLCBhcmdzKTtcbiAgfVxuICBcbiAgLy8gUERGIHRvb2xzXG4gIGlmIChUT09MX0NBVEVHT1JJRVMucGRmLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgcmV0dXJuIGhhbmRsZVBkZlRvb2wobmFtZSwgYXJncyk7XG4gIH1cbiAgXG4gIC8vIFNwcmVhZHNoZWV0IHRvb2xzXG4gIGlmIChUT09MX0NBVEVHT1JJRVMuc3ByZWFkc2hlZXQuaW5jbHVkZXMobmFtZSkpIHtcbiAgICByZXR1cm4gaGFuZGxlU3ByZWFkc2hlZXRUb29sKG5hbWUsIGFyZ3MpO1xuICB9XG4gIFxuICAvLyBQcmVzZW50YXRpb24gdG9vbHNcbiAgaWYgKFRPT0xfQ0FURUdPUklFUy5wcmVzZW50YXRpb24uaW5jbHVkZXMobmFtZSkpIHtcbiAgICByZXR1cm4gaGFuZGxlUHJlc2VudGF0aW9uVG9vbChuYW1lLCBhcmdzKTtcbiAgfVxuICBcbiAgLy8gQ29udmVyc2lvbiB0b29sc1xuICBpZiAoVE9PTF9DQVRFR09SSUVTLmNvbnZlcnNpb24uaW5jbHVkZXMobmFtZSkpIHtcbiAgICByZXR1cm4gaGFuZGxlQ29udmVyc2lvblRvb2wobmFtZSwgYXJncyk7XG4gIH1cbiAgXG4gIHRocm93IG5ldyBFcnJvcihgVW5rbm93biB0b29sOiAke25hbWV9YCk7XG59XG5cbi8qKlxuICogTWFpbiBzZXJ2ZXIgaW5pdGlhbGl6YXRpb25cbiAqL1xuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcbiAgY29uc3Qgc2VydmVyID0gbmV3IFNlcnZlcihcbiAgICB7XG4gICAgICBuYW1lOiBTRVJWRVJfTkFNRSxcbiAgICAgIHZlcnNpb246IFNFUlZFUl9WRVJTSU9OLFxuICAgIH0sXG4gICAge1xuICAgICAgY2FwYWJpbGl0aWVzOiB7XG4gICAgICAgIHRvb2xzOiB7fSxcbiAgICAgICAgcmVzb3VyY2VzOiB7fSxcbiAgICAgIH0sXG4gICAgfVxuICApO1xuXG4gIC8vIExpc3QgYXZhaWxhYmxlIHRvb2xzXG4gIHNlcnZlci5zZXRSZXF1ZXN0SGFuZGxlcihMaXN0VG9vbHNSZXF1ZXN0U2NoZW1hLCBhc3luYyAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvb2xzOiBBTExfVE9PTFMsXG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gSGFuZGxlIHRvb2wgY2FsbHNcbiAgc2VydmVyLnNldFJlcXVlc3RIYW5kbGVyKENhbGxUb29sUmVxdWVzdFNjaGVtYSwgYXN5bmMgKHJlcXVlc3QpID0+IHtcbiAgICBjb25zdCB7IG5hbWUsIGFyZ3VtZW50czogYXJncyB9ID0gcmVxdWVzdC5wYXJhbXM7XG4gICAgXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGhhbmRsZVRvb2xDYWxsKG5hbWUsIGFyZ3MgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29udGVudDogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICAgICAgdGV4dDogdHlwZW9mIHJlc3VsdCA9PT0gXCJzdHJpbmdcIiA/IHJlc3VsdCA6IEpTT04uc3RyaW5naWZ5KHJlc3VsdCwgbnVsbCwgMiksXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbnRlbnQ6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgICAgIHRleHQ6IGBFcnJvcjogJHtlcnJvck1lc3NhZ2V9YCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBpc0Vycm9yOiB0cnVlLFxuICAgICAgfTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIExpc3QgcmVzb3VyY2VzIChza2lsbCByZWZlcmVuY2VzLCB0ZW1wbGF0ZXMsIGV0Yy4pXG4gIHNlcnZlci5zZXRSZXF1ZXN0SGFuZGxlcihMaXN0UmVzb3VyY2VzUmVxdWVzdFNjaGVtYSwgYXN5bmMgKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHVyaTogXCJvZmZpY2U6Ly9za2lsbHMvY2F0ZWdvcmllc1wiLFxuICAgICAgICAgIG5hbWU6IFwiU2tpbGwgQ2F0ZWdvcmllc1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkF2YWlsYWJsZSB0b29sIGNhdGVnb3JpZXMgZm9yIFNraWxscyB0byByZWZlcmVuY2VcIixcbiAgICAgICAgICBtaW1lVHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB1cmk6IFwib2ZmaWNlOi8vc2tpbGxzL3JlY29tbWVuZGVkXCIsXG4gICAgICAgICAgbmFtZTogXCJSZWNvbW1lbmRlZCBUb29scyBieSBTY2VuYXJpb1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRvb2wgcmVjb21tZW5kYXRpb25zIGZvciBjb21tb24gb2ZmaWNlIHNjZW5hcmlvc1wiLFxuICAgICAgICAgIG1pbWVUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gUmVhZCByZXNvdXJjZXNcbiAgc2VydmVyLnNldFJlcXVlc3RIYW5kbGVyKFJlYWRSZXNvdXJjZVJlcXVlc3RTY2hlbWEsIGFzeW5jIChyZXF1ZXN0KSA9PiB7XG4gICAgY29uc3QgeyB1cmkgfSA9IHJlcXVlc3QucGFyYW1zO1xuICAgIFxuICAgIGlmICh1cmkgPT09IFwib2ZmaWNlOi8vc2tpbGxzL2NhdGVnb3JpZXNcIikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29udGVudHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1cmksXG4gICAgICAgICAgICBtaW1lVHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICB0ZXh0OiBKU09OLnN0cmluZ2lmeShUT09MX0NBVEVHT1JJRVMsIG51bGwsIDIpLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9O1xuICAgIH1cbiAgICBcbiAgICBpZiAodXJpID09PSBcIm9mZmljZTovL3NraWxscy9yZWNvbW1lbmRlZFwiKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb250ZW50czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVyaSxcbiAgICAgICAgICAgIG1pbWVUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHRleHQ6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgXCJjb250cmFjdC1yZXZpZXdcIjogW1wiZXh0cmFjdF90ZXh0X2Zyb21fcGRmXCIsIFwiZXh0cmFjdF90ZXh0X2Zyb21fZG9jeFwiLCBcImFuYWx5emVfZG9jdW1lbnRfc3RydWN0dXJlXCJdLFxuICAgICAgICAgICAgICBcImludm9pY2UtZ2VuZXJhdG9yXCI6IFtcImNyZWF0ZV9kb2N4XCIsIFwiY3JlYXRlX3BkZlwiLCBcImZpbGxfdGVtcGxhdGVcIl0sXG4gICAgICAgICAgICAgIFwiZGF0YS1hbmFseXNpc1wiOiBbXCJyZWFkX3hsc3hcIiwgXCJhbmFseXplX3NwcmVhZHNoZWV0XCIsIFwiY3JlYXRlX2NoYXJ0XCJdLFxuICAgICAgICAgICAgICBcInByZXNlbnRhdGlvblwiOiBbXCJjcmVhdGVfcHB0eFwiLCBcIm1kX3RvX3BwdHhcIiwgXCJodG1sX3RvX3NsaWRlc1wiXSxcbiAgICAgICAgICAgICAgXCJyZXBvcnQtZ2VuZXJhdG9yXCI6IFtcImNyZWF0ZV9kb2N4XCIsIFwiaW5zZXJ0X3RhYmxlXCIsIFwiaW5zZXJ0X2NoYXJ0XCIsIFwiZXhwb3J0X3RvX3BkZlwiXSxcbiAgICAgICAgICAgIH0sIG51bGwsIDIpLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9O1xuICAgIH1cbiAgICBcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gcmVzb3VyY2U6ICR7dXJpfWApO1xuICB9KTtcblxuICAvLyBTdGFydCBzZXJ2ZXJcbiAgY29uc3QgdHJhbnNwb3J0ID0gbmV3IFN0ZGlvU2VydmVyVHJhbnNwb3J0KCk7XG4gIGF3YWl0IHNlcnZlci5jb25uZWN0KHRyYW5zcG9ydCk7XG4gIFxuICBjb25zb2xlLmVycm9yKGAke1NFUlZFUl9OQU1FfSB2JHtTRVJWRVJfVkVSU0lPTn0gcnVubmluZyBvbiBzdGRpb2ApO1xufVxuXG5tYWluKCkuY2F0Y2goKGVycm9yKSA9PiB7XG4gIGNvbnNvbGUuZXJyb3IoXCJGYXRhbCBlcnJvcjpcIiwgZXJyb3IpO1xuICBwcm9jZXNzLmV4aXQoMSk7XG59KTtcbiJdfQ==