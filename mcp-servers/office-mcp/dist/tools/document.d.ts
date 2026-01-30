/**
 * Document Tools - DOCX operations
 *
 * Best-in-class tools for Word document manipulation.
 * These tools are designed to be used by AI Skills for document scenarios.
 */
import { Tool } from "@modelcontextprotocol/sdk/types.js";
/**
 * Document tool definitions
 */
export declare const documentTools: Tool[];
/**
 * Handle document tool calls
 */
export declare function handleDocumentTool(name: string, args: Record<string, unknown>): Promise<unknown>;
