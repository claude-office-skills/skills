/**
 * Spreadsheet Tools - Excel/XLSX operations
 *
 * Best-in-class tools for spreadsheet manipulation.
 * Based on openpyxl, xlwings, and xlsx.js capabilities.
 */
import { Tool } from "@modelcontextprotocol/sdk/types.js";
/**
 * Spreadsheet tool definitions
 */
export declare const spreadsheetTools: Tool[];
/**
 * Handle spreadsheet tool calls
 */
export declare function handleSpreadsheetTool(name: string, args: Record<string, unknown>): Promise<unknown>;
