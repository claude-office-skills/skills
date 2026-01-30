/**
 * Spreadsheet Tools - Excel/XLSX operations
 * 
 * Best-in-class tools for spreadsheet manipulation.
 * Based on openpyxl, xlwings, and xlsx.js capabilities.
 */

import { Tool } from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs";
import * as XLSX from "xlsx";

/**
 * Spreadsheet tool definitions
 */
export const spreadsheetTools: Tool[] = [
  {
    name: "read_xlsx",
    description: "Read data from an Excel file. Returns sheet names and data from specified sheets.",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the XLSX file",
        },
        sheet_name: {
          type: "string",
          description: "Specific sheet to read (default: first sheet)",
        },
        range: {
          type: "string",
          description: "Cell range to read (e.g., 'A1:D10')",
        },
        include_formulas: {
          type: "boolean",
          description: "Include formula text instead of calculated values",
          default: false,
        },
      },
      required: ["file_path"],
    },
  },
  {
    name: "create_xlsx",
    description: "Create a new Excel file with specified data and formatting.",
    inputSchema: {
      type: "object",
      properties: {
        output_path: {
          type: "string",
          description: "Path for the output XLSX file",
        },
        sheets: {
          type: "array",
          description: "Array of sheet definitions",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              data: { type: "array" },
              headers: { type: "array" },
              column_widths: { type: "object" },
            },
          },
        },
      },
      required: ["output_path", "sheets"],
    },
  },
  {
    name: "analyze_spreadsheet",
    description: "Analyze spreadsheet data: statistics, patterns, data quality issues.",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the XLSX file",
        },
        sheet_name: {
          type: "string",
          description: "Sheet to analyze",
        },
        analysis_type: {
          type: "array",
          items: {
            type: "string",
            enum: ["statistics", "data_quality", "patterns", "outliers"],
          },
          description: "Types of analysis to perform",
          default: ["statistics"],
        },
      },
      required: ["file_path"],
    },
  },
  {
    name: "apply_formula",
    description: "Apply formulas to cells in an Excel file.",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the XLSX file",
        },
        output_path: {
          type: "string",
          description: "Path for the output file",
        },
        formulas: {
          type: "array",
          description: "Array of formula definitions",
          items: {
            type: "object",
            properties: {
              cell: { type: "string", description: "Target cell (e.g., 'E2')" },
              formula: { type: "string", description: "Formula (e.g., '=SUM(A2:D2)')" },
            },
          },
        },
        sheet_name: {
          type: "string",
          description: "Sheet to modify",
        },
      },
      required: ["file_path", "output_path", "formulas"],
    },
  },
  {
    name: "create_chart",
    description: "Create a chart in an Excel file based on data range.",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the XLSX file",
        },
        output_path: {
          type: "string",
          description: "Path for the output file",
        },
        chart_type: {
          type: "string",
          enum: ["bar", "line", "pie", "scatter", "area", "column"],
          description: "Type of chart to create",
        },
        data_range: {
          type: "string",
          description: "Data range for the chart (e.g., 'A1:D10')",
        },
        title: {
          type: "string",
          description: "Chart title",
        },
        position: {
          type: "string",
          description: "Cell position for chart (e.g., 'F1')",
        },
      },
      required: ["file_path", "output_path", "chart_type", "data_range"],
    },
  },
  {
    name: "pivot_table",
    description: "Create a pivot table from spreadsheet data.",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the XLSX file",
        },
        output_path: {
          type: "string",
          description: "Path for the output file",
        },
        source_range: {
          type: "string",
          description: "Source data range",
        },
        rows: {
          type: "array",
          items: { type: "string" },
          description: "Columns to use as row labels",
        },
        columns: {
          type: "array",
          items: { type: "string" },
          description: "Columns to use as column labels",
        },
        values: {
          type: "array",
          items: { type: "string" },
          description: "Columns to aggregate",
        },
        aggregation: {
          type: "string",
          enum: ["sum", "count", "average", "max", "min"],
          default: "sum",
        },
      },
      required: ["file_path", "output_path", "source_range", "rows", "values"],
    },
  },
  {
    name: "xlsx_to_json",
    description: "Convert Excel data to JSON format.",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "Path to the XLSX file",
        },
        sheet_name: {
          type: "string",
          description: "Sheet to convert",
        },
        header_row: {
          type: "number",
          description: "Row number containing headers (1-based)",
          default: 1,
        },
      },
      required: ["file_path"],
    },
  },
];

/**
 * Handle spreadsheet tool calls
 */
export async function handleSpreadsheetTool(
  name: string,
  args: Record<string, unknown>
): Promise<unknown> {
  switch (name) {
    case "read_xlsx":
      return readXlsx(args);
    case "create_xlsx":
      return createXlsx(args);
    case "analyze_spreadsheet":
      return analyzeSpreadsheet(args);
    case "apply_formula":
      return applyFormula(args);
    case "create_chart":
      return createChart(args);
    case "pivot_table":
      return createPivotTable(args);
    case "xlsx_to_json":
      return xlsxToJson(args);
    default:
      throw new Error(`Unknown spreadsheet tool: ${name}`);
  }
}

// Tool implementations
async function readXlsx(args: Record<string, unknown>): Promise<object> {
  const { file_path, sheet_name, range, include_formulas } = args;
  
  try {
    const filePath = file_path as string;
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Read workbook
    const workbook = XLSX.readFile(filePath, {
      cellFormula: include_formulas as boolean || false,
    });
    
    // Get sheet
    const sheetNames = workbook.SheetNames;
    const targetSheet = sheet_name as string || sheetNames[0];
    
    if (!sheetNames.includes(targetSheet)) {
      throw new Error(`Sheet '${targetSheet}' not found. Available: ${sheetNames.join(', ')}`);
    }
    
    const worksheet = workbook.Sheets[targetSheet];
    
    // Get range
    const sheetRange = worksheet['!ref'] || 'A1';
    const targetRange = range as string || sheetRange;
    
    // Convert to JSON with headers
    const data = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      range: targetRange !== 'all' ? targetRange : undefined,
      defval: '',
    }) as unknown[][];
    
    return {
      file: file_path,
      sheet: targetSheet,
      available_sheets: sheetNames,
      range: targetRange,
      data: data,
      rows: data.length,
      columns: data[0]?.length || 0,
    };
    
  } catch (error: any) {
    return {
      error: `Failed to read Excel file: ${error.message}`,
      file: file_path,
    };
  }
}

async function createXlsx(args: Record<string, unknown>): Promise<string> {
  const { output_path, sheets } = args;
  
  try {
    const outputPath = output_path as string;
    const sheetDefs = sheets as Array<{
      name: string;
      data: unknown[][];
      headers?: string[];
      column_widths?: Record<string, number>;
    }>;
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    
    for (const sheetDef of sheetDefs) {
      const sheetName = sheetDef.name || `Sheet${workbook.SheetNames.length + 1}`;
      
      // Prepare data with headers
      let fullData: unknown[][] = [];
      if (sheetDef.headers) {
        fullData.push(sheetDef.headers);
      }
      if (sheetDef.data) {
        fullData = fullData.concat(sheetDef.data);
      }
      
      // Create worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(fullData);
      
      // Apply column widths if specified
      if (sheetDef.column_widths) {
        const cols: XLSX.ColInfo[] = [];
        for (const [col, width] of Object.entries(sheetDef.column_widths)) {
          const colIndex = XLSX.utils.decode_col(col);
          cols[colIndex] = { wch: width };
        }
        worksheet['!cols'] = cols;
      }
      
      // Add sheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    }
    
    // Write file
    XLSX.writeFile(workbook, outputPath);
    
    return `Successfully created Excel file at ${outputPath} with ${sheetDefs.length} sheet(s): ${sheetDefs.map(s => s.name).join(', ')}`;
    
  } catch (error: any) {
    return `Error creating Excel file: ${error.message}`;
  }
}

async function analyzeSpreadsheet(args: Record<string, unknown>): Promise<object> {
  const { file_path, sheet_name, analysis_type } = args;
  
  try {
    const filePath = file_path as string;
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    const workbook = XLSX.readFile(filePath);
    const targetSheet = sheet_name as string || workbook.SheetNames[0];
    const worksheet = workbook.Sheets[targetSheet];
    
    // Convert to array of arrays
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as unknown[][];
    
    if (data.length === 0) {
      return { error: 'Sheet is empty', file: file_path };
    }
    
    const headers = data[0] as string[];
    const dataRows = data.slice(1);
    
    // Basic statistics
    const stats = {
      rows: dataRows.length,
      columns: headers.length,
      headers: headers,
      empty_cells: 0,
      numeric_columns: [] as string[],
      text_columns: [] as string[],
    };
    
    // Analyze each column
    const columnStats: Record<string, any> = {};
    
    for (let colIdx = 0; colIdx < headers.length; colIdx++) {
      const colName = headers[colIdx] || `Column${colIdx + 1}`;
      const colValues = dataRows.map(row => (row as unknown[])[colIdx]);
      
      // Count empty cells
      const emptyCells = colValues.filter(v => v === null || v === undefined || v === '').length;
      stats.empty_cells += emptyCells;
      
      // Determine column type and compute stats
      const numericValues = colValues
        .filter(v => typeof v === 'number' && !isNaN(v as number))
        .map(v => v as number);
      
      if (numericValues.length > colValues.length * 0.5) {
        // Numeric column
        stats.numeric_columns.push(colName);
        
        const sorted = [...numericValues].sort((a, b) => a - b);
        const sum = numericValues.reduce((a, b) => a + b, 0);
        const mean = sum / numericValues.length;
        const median = sorted.length % 2 === 0
          ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
          : sorted[Math.floor(sorted.length / 2)];
        
        columnStats[colName] = {
          type: 'numeric',
          count: numericValues.length,
          min: Math.min(...numericValues),
          max: Math.max(...numericValues),
          sum: sum,
          mean: parseFloat(mean.toFixed(2)),
          median: median,
          empty: emptyCells,
        };
      } else {
        // Text column
        stats.text_columns.push(colName);
        
        const uniqueValues = new Set(colValues.filter(v => v !== null && v !== undefined && v !== ''));
        
        columnStats[colName] = {
          type: 'text',
          count: colValues.length - emptyCells,
          unique_values: uniqueValues.size,
          empty: emptyCells,
          sample_values: Array.from(uniqueValues).slice(0, 5),
        };
      }
    }
    
    return {
      file: file_path,
      sheet: targetSheet,
      analysis: analysis_type || ['statistics'],
      statistics: stats,
      column_stats: columnStats,
    };
    
  } catch (error: any) {
    return {
      error: `Failed to analyze spreadsheet: ${error.message}`,
      file: file_path,
    };
  }
}

async function applyFormula(args: Record<string, unknown>): Promise<string> {
  const { file_path, output_path, formulas, sheet_name } = args;
  
  try {
    const filePath = file_path as string;
    const outputPath = output_path as string;
    const formulaDefs = formulas as Array<{ cell: string; formula: string }>;
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Read workbook
    const workbook = XLSX.readFile(filePath);
    const targetSheet = sheet_name as string || workbook.SheetNames[0];
    const worksheet = workbook.Sheets[targetSheet];
    
    // Apply formulas
    let appliedCount = 0;
    for (const formulaDef of formulaDefs) {
      const cell = formulaDef.cell.toUpperCase();
      const formula = formulaDef.formula;
      
      // Set formula in cell
      worksheet[cell] = {
        t: 's', // string type for formula
        f: formula.startsWith('=') ? formula.slice(1) : formula,
      };
      appliedCount++;
    }
    
    // Write to output
    XLSX.writeFile(workbook, outputPath);
    
    return `Successfully applied ${appliedCount} formula(s) to ${targetSheet}. Output: ${outputPath}`;
    
  } catch (error: any) {
    return `Error applying formulas: ${error.message}`;
  }
}

async function createChart(args: Record<string, unknown>): Promise<object> {
  const { file_path, output_path, chart_type, data_range, title, position } = args;
  
  try {
    const filePath = file_path as string;
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Read the data from the specified range
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
    // Parse data range
    const range = XLSX.utils.decode_range(data_range as string);
    const chartData: unknown[][] = [];
    
    for (let row = range.s.r; row <= range.e.r; row++) {
      const rowData: unknown[] = [];
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddr = XLSX.utils.encode_cell({ r: row, c: col });
        const cell = worksheet[cellAddr];
        rowData.push(cell ? cell.v : null);
      }
      chartData.push(rowData);
    }
    
    // Note: xlsx library doesn't support embedded charts
    // We return chart configuration for use with charting libraries
    const chartConfig = {
      type: chart_type,
      title: title || 'Chart',
      position: position || 'F1',
      data: {
        labels: chartData[0]?.slice(1) || [],
        datasets: chartData.slice(1).map((row, idx) => ({
          label: row[0],
          data: row.slice(1),
        })),
      },
    };
    
    // Copy file to output (chart would need to be added by Excel or another tool)
    if (output_path !== file_path) {
      fs.copyFileSync(filePath, output_path as string);
    }
    
    return {
      success: true,
      message: `Chart configuration created for ${chart_type} chart "${title || 'Untitled'}"`,
      note: "xlsx library doesn't support embedded charts. Use the chart_config with a charting library or Excel.",
      chart_config: chartConfig,
      output_file: output_path,
    };
    
  } catch (error: any) {
    return {
      success: false,
      error: `Failed to create chart: ${error.message}`,
    };
  }
}

async function createPivotTable(args: Record<string, unknown>): Promise<object> {
  const { file_path, output_path, source_range, rows, columns, values, aggregation } = args;
  
  try {
    const filePath = file_path as string;
    const outputPath = output_path as string;
    const rowFields = rows as string[];
    const colFields = columns as string[] || [];
    const valueFields = values as string[];
    const aggType = aggregation as string || 'sum';
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Read source data
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet) as Record<string, any>[];
    
    if (data.length === 0) {
      throw new Error('No data found in source');
    }
    
    // Build pivot table manually
    const pivotData: Record<string, Record<string, number[]>> = {};
    
    for (const row of data) {
      // Create row key from row fields
      const rowKey = rowFields.map(f => String(row[f] || '')).join(' | ');
      
      // Create column key from column fields (if any)
      const colKey = colFields.length > 0 
        ? colFields.map(f => String(row[f] || '')).join(' | ')
        : 'Value';
      
      if (!pivotData[rowKey]) {
        pivotData[rowKey] = {};
      }
      if (!pivotData[rowKey][colKey]) {
        pivotData[rowKey][colKey] = [];
      }
      
      // Collect values
      for (const valueField of valueFields) {
        const val = parseFloat(row[valueField]);
        if (!isNaN(val)) {
          pivotData[rowKey][colKey].push(val);
        }
      }
    }
    
    // Aggregate values
    const aggregate = (arr: number[]): number => {
      if (arr.length === 0) return 0;
      switch (aggType) {
        case 'sum': return arr.reduce((a, b) => a + b, 0);
        case 'count': return arr.length;
        case 'average': return arr.reduce((a, b) => a + b, 0) / arr.length;
        case 'max': return Math.max(...arr);
        case 'min': return Math.min(...arr);
        default: return arr.reduce((a, b) => a + b, 0);
      }
    };
    
    // Get all column keys
    const allColKeys = new Set<string>();
    for (const rowData of Object.values(pivotData)) {
      for (const colKey of Object.keys(rowData)) {
        allColKeys.add(colKey);
      }
    }
    const colKeysArray = Array.from(allColKeys).sort();
    
    // Build output data
    const outputData: unknown[][] = [];
    
    // Header row
    const headerRow = [...rowFields, ...colKeysArray];
    outputData.push(headerRow);
    
    // Data rows
    for (const [rowKey, rowData] of Object.entries(pivotData).sort()) {
      const outputRow: unknown[] = rowKey.split(' | ');
      for (const colKey of colKeysArray) {
        const values = rowData[colKey] || [];
        outputRow.push(parseFloat(aggregate(values).toFixed(2)));
      }
      outputData.push(outputRow);
    }
    
    // Create new workbook with pivot table
    const newWorkbook = XLSX.utils.book_new();
    const pivotSheet = XLSX.utils.aoa_to_sheet(outputData);
    XLSX.utils.book_append_sheet(newWorkbook, pivotSheet, 'Pivot Table');
    
    // Write file
    XLSX.writeFile(newWorkbook, outputPath);
    
    return {
      success: true,
      message: `Created pivot table with ${Object.keys(pivotData).length} rows`,
      output_file: outputPath,
      row_fields: rowFields,
      column_fields: colFields,
      value_fields: valueFields,
      aggregation: aggType,
      row_count: outputData.length - 1,
      column_count: colKeysArray.length,
    };
    
  } catch (error: any) {
    return {
      success: false,
      error: `Failed to create pivot table: ${error.message}`,
    };
  }
}

async function xlsxToJson(args: Record<string, unknown>): Promise<object> {
  const { file_path, sheet_name, header_row } = args;
  
  try {
    const filePath = file_path as string;
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Read workbook
    const workbook = XLSX.readFile(filePath);
    
    // Get sheet
    const sheetNames = workbook.SheetNames;
    const targetSheet = sheet_name as string || sheetNames[0];
    
    if (!sheetNames.includes(targetSheet)) {
      throw new Error(`Sheet '${targetSheet}' not found. Available: ${sheetNames.join(', ')}`);
    }
    
    const worksheet = workbook.Sheets[targetSheet];
    
    // Convert to JSON with first row as headers
    const headerRowNum = (header_row as number) || 1;
    const data = XLSX.utils.sheet_to_json(worksheet, {
      range: headerRowNum - 1, // 0-based
      defval: null,
    });
    
    // Get headers
    const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as unknown[][];
    const headers = rawData[headerRowNum - 1] as string[];
    
    return {
      success: true,
      source: file_path,
      sheet: targetSheet,
      headers: headers,
      data: data,
      record_count: data.length,
    };
    
  } catch (error: any) {
    return {
      success: false,
      error: `Failed to convert Excel to JSON: ${error.message}`,
      source: file_path,
    };
  }
}
