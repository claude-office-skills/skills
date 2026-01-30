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
export declare const presentationTools: Tool[];
/**
 * Handle presentation tool calls
 */
export declare function handlePresentationTool(name: string, args: Record<string, unknown>): Promise<unknown>;
