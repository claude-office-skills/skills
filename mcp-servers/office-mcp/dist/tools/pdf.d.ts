/**
 * PDF Tools - PDF operations
 *
 * Best-in-class tools for PDF manipulation.
 * Inspired by Stirling-PDF (73k+ stars) capabilities.
 */
import { Tool } from "@modelcontextprotocol/sdk/types.js";
/**
 * PDF tool definitions
 */
export declare const pdfTools: Tool[];
/**
 * Handle PDF tool calls
 */
export declare function handlePdfTool(name: string, args: Record<string, unknown>): Promise<unknown>;
