/**
 * Conversion Tools - Format conversion operations
 *
 * Best-in-class tools for document format conversion.
 * Based on pandoc, markitdown, and other conversion libraries.
 */
import { Tool } from "@modelcontextprotocol/sdk/types.js";
/**
 * Conversion tool definitions
 */
export declare const conversionTools: Tool[];
/**
 * Handle conversion tool calls
 */
export declare function handleConversionTool(name: string, args: Record<string, unknown>): Promise<unknown>;
