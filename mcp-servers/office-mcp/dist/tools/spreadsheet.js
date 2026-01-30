"use strict";
/**
 * Spreadsheet Tools - Excel/XLSX operations
 *
 * Best-in-class tools for spreadsheet manipulation.
 * Based on openpyxl, xlwings, and xlsx.js capabilities.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.spreadsheetTools = void 0;
exports.handleSpreadsheetTool = handleSpreadsheetTool;
const fs = __importStar(require("fs"));
const XLSX = __importStar(require("xlsx"));
/**
 * Spreadsheet tool definitions
 */
exports.spreadsheetTools = [
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
async function handleSpreadsheetTool(name, args) {
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
async function readXlsx(args) {
    const { file_path, sheet_name, range, include_formulas } = args;
    try {
        const filePath = file_path;
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // Read workbook
        const workbook = XLSX.readFile(filePath, {
            cellFormula: include_formulas || false,
        });
        // Get sheet
        const sheetNames = workbook.SheetNames;
        const targetSheet = sheet_name || sheetNames[0];
        if (!sheetNames.includes(targetSheet)) {
            throw new Error(`Sheet '${targetSheet}' not found. Available: ${sheetNames.join(', ')}`);
        }
        const worksheet = workbook.Sheets[targetSheet];
        // Get range
        const sheetRange = worksheet['!ref'] || 'A1';
        const targetRange = range || sheetRange;
        // Convert to JSON with headers
        const data = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            range: targetRange !== 'all' ? targetRange : undefined,
            defval: '',
        });
        return {
            file: file_path,
            sheet: targetSheet,
            available_sheets: sheetNames,
            range: targetRange,
            data: data,
            rows: data.length,
            columns: data[0]?.length || 0,
        };
    }
    catch (error) {
        return {
            error: `Failed to read Excel file: ${error.message}`,
            file: file_path,
        };
    }
}
async function createXlsx(args) {
    const { output_path, sheets } = args;
    try {
        const outputPath = output_path;
        const sheetDefs = sheets;
        // Create workbook
        const workbook = XLSX.utils.book_new();
        for (const sheetDef of sheetDefs) {
            const sheetName = sheetDef.name || `Sheet${workbook.SheetNames.length + 1}`;
            // Prepare data with headers
            let fullData = [];
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
                const cols = [];
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
    }
    catch (error) {
        return `Error creating Excel file: ${error.message}`;
    }
}
async function analyzeSpreadsheet(args) {
    const { file_path, sheet_name, analysis_type } = args;
    try {
        const filePath = file_path;
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        const workbook = XLSX.readFile(filePath);
        const targetSheet = sheet_name || workbook.SheetNames[0];
        const worksheet = workbook.Sheets[targetSheet];
        // Convert to array of arrays
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        if (data.length === 0) {
            return { error: 'Sheet is empty', file: file_path };
        }
        const headers = data[0];
        const dataRows = data.slice(1);
        // Basic statistics
        const stats = {
            rows: dataRows.length,
            columns: headers.length,
            headers: headers,
            empty_cells: 0,
            numeric_columns: [],
            text_columns: [],
        };
        // Analyze each column
        const columnStats = {};
        for (let colIdx = 0; colIdx < headers.length; colIdx++) {
            const colName = headers[colIdx] || `Column${colIdx + 1}`;
            const colValues = dataRows.map(row => row[colIdx]);
            // Count empty cells
            const emptyCells = colValues.filter(v => v === null || v === undefined || v === '').length;
            stats.empty_cells += emptyCells;
            // Determine column type and compute stats
            const numericValues = colValues
                .filter(v => typeof v === 'number' && !isNaN(v))
                .map(v => v);
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
            }
            else {
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
    }
    catch (error) {
        return {
            error: `Failed to analyze spreadsheet: ${error.message}`,
            file: file_path,
        };
    }
}
async function applyFormula(args) {
    const { file_path, output_path, formulas, sheet_name } = args;
    try {
        const filePath = file_path;
        const outputPath = output_path;
        const formulaDefs = formulas;
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // Read workbook
        const workbook = XLSX.readFile(filePath);
        const targetSheet = sheet_name || workbook.SheetNames[0];
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
    }
    catch (error) {
        return `Error applying formulas: ${error.message}`;
    }
}
async function createChart(args) {
    const { file_path, output_path, chart_type, data_range, title, position } = args;
    try {
        const filePath = file_path;
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // Read the data from the specified range
        const workbook = XLSX.readFile(filePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        // Parse data range
        const range = XLSX.utils.decode_range(data_range);
        const chartData = [];
        for (let row = range.s.r; row <= range.e.r; row++) {
            const rowData = [];
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
            fs.copyFileSync(filePath, output_path);
        }
        return {
            success: true,
            message: `Chart configuration created for ${chart_type} chart "${title || 'Untitled'}"`,
            note: "xlsx library doesn't support embedded charts. Use the chart_config with a charting library or Excel.",
            chart_config: chartConfig,
            output_file: output_path,
        };
    }
    catch (error) {
        return {
            success: false,
            error: `Failed to create chart: ${error.message}`,
        };
    }
}
async function createPivotTable(args) {
    const { file_path, output_path, source_range, rows, columns, values, aggregation } = args;
    try {
        const filePath = file_path;
        const outputPath = output_path;
        const rowFields = rows;
        const colFields = columns || [];
        const valueFields = values;
        const aggType = aggregation || 'sum';
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // Read source data
        const workbook = XLSX.readFile(filePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet);
        if (data.length === 0) {
            throw new Error('No data found in source');
        }
        // Build pivot table manually
        const pivotData = {};
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
        const aggregate = (arr) => {
            if (arr.length === 0)
                return 0;
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
        const allColKeys = new Set();
        for (const rowData of Object.values(pivotData)) {
            for (const colKey of Object.keys(rowData)) {
                allColKeys.add(colKey);
            }
        }
        const colKeysArray = Array.from(allColKeys).sort();
        // Build output data
        const outputData = [];
        // Header row
        const headerRow = [...rowFields, ...colKeysArray];
        outputData.push(headerRow);
        // Data rows
        for (const [rowKey, rowData] of Object.entries(pivotData).sort()) {
            const outputRow = rowKey.split(' | ');
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
    }
    catch (error) {
        return {
            success: false,
            error: `Failed to create pivot table: ${error.message}`,
        };
    }
}
async function xlsxToJson(args) {
    const { file_path, sheet_name, header_row } = args;
    try {
        const filePath = file_path;
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        // Read workbook
        const workbook = XLSX.readFile(filePath);
        // Get sheet
        const sheetNames = workbook.SheetNames;
        const targetSheet = sheet_name || sheetNames[0];
        if (!sheetNames.includes(targetSheet)) {
            throw new Error(`Sheet '${targetSheet}' not found. Available: ${sheetNames.join(', ')}`);
        }
        const worksheet = workbook.Sheets[targetSheet];
        // Convert to JSON with first row as headers
        const headerRowNum = header_row || 1;
        const data = XLSX.utils.sheet_to_json(worksheet, {
            range: headerRowNum - 1, // 0-based
            defval: null,
        });
        // Get headers
        const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const headers = rawData[headerRowNum - 1];
        return {
            success: true,
            source: file_path,
            sheet: targetSheet,
            headers: headers,
            data: data,
            record_count: data.length,
        };
    }
    catch (error) {
        return {
            success: false,
            error: `Failed to convert Excel to JSON: ${error.message}`,
            source: file_path,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ByZWFkc2hlZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdG9vbHMvc3ByZWFkc2hlZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxT0gsc0RBc0JDO0FBeFBELHVDQUF5QjtBQUN6QiwyQ0FBNkI7QUFFN0I7O0dBRUc7QUFDVSxRQUFBLGdCQUFnQixHQUFXO0lBQ3RDO1FBQ0UsSUFBSSxFQUFFLFdBQVc7UUFDakIsV0FBVyxFQUFFLG1GQUFtRjtRQUNoRyxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDVixTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsV0FBVyxFQUFFLHVCQUF1QjtpQkFDckM7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxRQUFRO29CQUNkLFdBQVcsRUFBRSwrQ0FBK0M7aUJBQzdEO2dCQUNELEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUscUNBQXFDO2lCQUNuRDtnQkFDRCxnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsV0FBVyxFQUFFLG1EQUFtRDtvQkFDaEUsT0FBTyxFQUFFLEtBQUs7aUJBQ2Y7YUFDRjtZQUNELFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQztTQUN4QjtLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsYUFBYTtRQUNuQixXQUFXLEVBQUUsNkRBQTZEO1FBQzFFLFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxXQUFXLEVBQUUsK0JBQStCO2lCQUM3QztnQkFDRCxNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLE9BQU87b0JBQ2IsV0FBVyxFQUFF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SSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFO1lBQy9DLEtBQUssRUFBRSxZQUFZLEdBQUcsQ0FBQyxFQUFFLFVBQVU7WUFDbkMsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDLENBQUM7UUFFSCxjQUFjO1FBQ2QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFnQixDQUFDO1FBQ2xGLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFhLENBQUM7UUFFdEQsT0FBTztZQUNMLE9BQU8sRUFBRSxJQUFJO1lBQ2IsTUFBTSxFQUFFLFNBQVM7WUFDakIsS0FBSyxFQUFFLFdBQVc7WUFDbEIsT0FBTyxFQUFFLE9BQU87WUFDaEIsSUFBSSxFQUFFLElBQUk7WUFDVixZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDMUIsQ0FBQztJQUVKLENBQUM7SUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1FBQ3BCLE9BQU87WUFDTCxPQUFPLEVBQUUsS0FBSztZQUNkLEtBQUssRUFBRSxvQ0FBb0MsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUMxRCxNQUFNLEVBQUUsU0FBUztTQUNsQixDQUFDO0lBQ0osQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFNwcmVhZHNoZWV0IFRvb2xzIC0gRXhjZWwvWExTWCBvcGVyYXRpb25zXG4gKiBcbiAqIEJlc3QtaW4tY2xhc3MgdG9vbHMgZm9yIHNwcmVhZHNoZWV0IG1hbmlwdWxhdGlvbi5cbiAqIEJhc2VkIG9uIG9wZW5weXhsLCB4bHdpbmdzLCBhbmQgeGxzeC5qcyBjYXBhYmlsaXRpZXMuXG4gKi9cblxuaW1wb3J0IHsgVG9vbCB9IGZyb20gXCJAbW9kZWxjb250ZXh0cHJvdG9jb2wvc2RrL3R5cGVzLmpzXCI7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAqIGFzIFhMU1ggZnJvbSBcInhsc3hcIjtcblxuLyoqXG4gKiBTcHJlYWRzaGVldCB0b29sIGRlZmluaXRpb25zXG4gKi9cbmV4cG9ydCBjb25zdCBzcHJlYWRzaGVldFRvb2xzOiBUb29sW10gPSBbXG4gIHtcbiAgICBuYW1lOiBcInJlYWRfeGxzeFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlJlYWQgZGF0YSBmcm9tIGFuIEV4Y2VsIGZpbGUuIFJldHVybnMgc2hlZXQgbmFtZXMgYW5kIGRhdGEgZnJvbSBzcGVjaWZpZWQgc2hlZXRzLlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIFhMU1ggZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBzaGVldF9uYW1lOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpYyBzaGVldCB0byByZWFkIChkZWZhdWx0OiBmaXJzdCBzaGVldClcIixcbiAgICAgICAgfSxcbiAgICAgICAgcmFuZ2U6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNlbGwgcmFuZ2UgdG8gcmVhZCAoZS5nLiwgJ0ExOkQxMCcpXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGluY2x1ZGVfZm9ybXVsYXM6IHtcbiAgICAgICAgICB0eXBlOiBcImJvb2xlYW5cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJbmNsdWRlIGZvcm11bGEgdGV4dCBpbnN0ZWFkIG9mIGNhbGN1bGF0ZWQgdmFsdWVzXCIsXG4gICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImZpbGVfcGF0aFwiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJjcmVhdGVfeGxzeFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkNyZWF0ZSBhIG5ldyBFeGNlbCBmaWxlIHdpdGggc3BlY2lmaWVkIGRhdGEgYW5kIGZvcm1hdHRpbmcuXCIsXG4gICAgaW5wdXRTY2hlbWE6IHtcbiAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG91dHB1dF9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIGZvciB0aGUgb3V0cHV0IFhMU1ggZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBzaGVldHM6IHtcbiAgICAgICAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiQXJyYXkgb2Ygc2hlZXQgZGVmaW5pdGlvbnNcIixcbiAgICAgICAgICBpdGVtczoge1xuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgbmFtZTogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgIGRhdGE6IHsgdHlwZTogXCJhcnJheVwiIH0sXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHsgdHlwZTogXCJhcnJheVwiIH0sXG4gICAgICAgICAgICAgIGNvbHVtbl93aWR0aHM6IHsgdHlwZTogXCJvYmplY3RcIiB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJvdXRwdXRfcGF0aFwiLCBcInNoZWV0c1wiXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJhbmFseXplX3NwcmVhZHNoZWV0XCIsXG4gICAgZGVzY3JpcHRpb246IFwiQW5hbHl6ZSBzcHJlYWRzaGVldCBkYXRhOiBzdGF0aXN0aWNzLCBwYXR0ZXJucywgZGF0YSBxdWFsaXR5IGlzc3Vlcy5cIixcbiAgICBpbnB1dFNjaGVtYToge1xuICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZmlsZV9wYXRoOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQYXRoIHRvIHRoZSBYTFNYIGZpbGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgc2hlZXRfbmFtZToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiU2hlZXQgdG8gYW5hbHl6ZVwiLFxuICAgICAgICB9LFxuICAgICAgICBhbmFseXNpc190eXBlOiB7XG4gICAgICAgICAgdHlwZTogXCJhcnJheVwiLFxuICAgICAgICAgIGl0ZW1zOiB7XG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgZW51bTogW1wic3RhdGlzdGljc1wiLCBcImRhdGFfcXVhbGl0eVwiLCBcInBhdHRlcm5zXCIsIFwib3V0bGllcnNcIl0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUeXBlcyBvZiBhbmFseXNpcyB0byBwZXJmb3JtXCIsXG4gICAgICAgICAgZGVmYXVsdDogW1wic3RhdGlzdGljc1wiXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogW1wiZmlsZV9wYXRoXCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImFwcGx5X2Zvcm11bGFcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBcHBseSBmb3JtdWxhcyB0byBjZWxscyBpbiBhbiBFeGNlbCBmaWxlLlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIFhMU1ggZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCBmb3IgdGhlIG91dHB1dCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGZvcm11bGFzOiB7XG4gICAgICAgICAgdHlwZTogXCJhcnJheVwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFycmF5IG9mIGZvcm11bGEgZGVmaW5pdGlvbnNcIixcbiAgICAgICAgICBpdGVtczoge1xuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgY2VsbDogeyB0eXBlOiBcInN0cmluZ1wiLCBkZXNjcmlwdGlvbjogXCJUYXJnZXQgY2VsbCAoZS5nLiwgJ0UyJylcIiB9LFxuICAgICAgICAgICAgICBmb3JtdWxhOiB7IHR5cGU6IFwic3RyaW5nXCIsIGRlc2NyaXB0aW9uOiBcIkZvcm11bGEgKGUuZy4sICc9U1VNKEEyOkQyKScpXCIgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgc2hlZXRfbmFtZToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiU2hlZXQgdG8gbW9kaWZ5XCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImZpbGVfcGF0aFwiLCBcIm91dHB1dF9wYXRoXCIsIFwiZm9ybXVsYXNcIl0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiY3JlYXRlX2NoYXJ0XCIsXG4gICAgZGVzY3JpcHRpb246IFwiQ3JlYXRlIGEgY2hhcnQgaW4gYW4gRXhjZWwgZmlsZSBiYXNlZCBvbiBkYXRhIHJhbmdlLlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIFhMU1ggZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCBmb3IgdGhlIG91dHB1dCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGNoYXJ0X3R5cGU6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGVudW06IFtcImJhclwiLCBcImxpbmVcIiwgXCJwaWVcIiwgXCJzY2F0dGVyXCIsIFwiYXJlYVwiLCBcImNvbHVtblwiXSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUeXBlIG9mIGNoYXJ0IHRvIGNyZWF0ZVwiLFxuICAgICAgICB9LFxuICAgICAgICBkYXRhX3JhbmdlOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJEYXRhIHJhbmdlIGZvciB0aGUgY2hhcnQgKGUuZy4sICdBMTpEMTAnKVwiLFxuICAgICAgICB9LFxuICAgICAgICB0aXRsZToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2hhcnQgdGl0bGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNlbGwgcG9zaXRpb24gZm9yIGNoYXJ0IChlLmcuLCAnRjEnKVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJmaWxlX3BhdGhcIiwgXCJvdXRwdXRfcGF0aFwiLCBcImNoYXJ0X3R5cGVcIiwgXCJkYXRhX3JhbmdlXCJdLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInBpdm90X3RhYmxlXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQ3JlYXRlIGEgcGl2b3QgdGFibGUgZnJvbSBzcHJlYWRzaGVldCBkYXRhLlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIFhMU1ggZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRfcGF0aDoge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiUGF0aCBmb3IgdGhlIG91dHB1dCBmaWxlXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHNvdXJjZV9yYW5nZToge1xuICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiU291cmNlIGRhdGEgcmFuZ2VcIixcbiAgICAgICAgfSxcbiAgICAgICAgcm93czoge1xuICAgICAgICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICAgICAgICBpdGVtczogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiQ29sdW1ucyB0byB1c2UgYXMgcm93IGxhYmVsc1wiLFxuICAgICAgICB9LFxuICAgICAgICBjb2x1bW5zOiB7XG4gICAgICAgICAgdHlwZTogXCJhcnJheVwiLFxuICAgICAgICAgIGl0ZW1zOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb2x1bW5zIHRvIHVzZSBhcyBjb2x1bW4gbGFiZWxzXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICAgICAgICBpdGVtczogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiQ29sdW1ucyB0byBhZ2dyZWdhdGVcIixcbiAgICAgICAgfSxcbiAgICAgICAgYWdncmVnYXRpb246IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGVudW06IFtcInN1bVwiLCBcImNvdW50XCIsIFwiYXZlcmFnZVwiLCBcIm1heFwiLCBcIm1pblwiXSxcbiAgICAgICAgICBkZWZhdWx0OiBcInN1bVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbXCJmaWxlX3BhdGhcIiwgXCJvdXRwdXRfcGF0aFwiLCBcInNvdXJjZV9yYW5nZVwiLCBcInJvd3NcIiwgXCJ2YWx1ZXNcIl0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwieGxzeF90b19qc29uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQ29udmVydCBFeGNlbCBkYXRhIHRvIEpTT04gZm9ybWF0LlwiLFxuICAgIGlucHV0U2NoZW1hOiB7XG4gICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBmaWxlX3BhdGg6IHtcbiAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBhdGggdG8gdGhlIFhMU1ggZmlsZVwiLFxuICAgICAgICB9LFxuICAgICAgICBzaGVldF9uYW1lOiB7XG4gICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTaGVldCB0byBjb252ZXJ0XCIsXG4gICAgICAgIH0sXG4gICAgICAgIGhlYWRlcl9yb3c6IHtcbiAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJvdyBudW1iZXIgY29udGFpbmluZyBoZWFkZXJzICgxLWJhc2VkKVwiLFxuICAgICAgICAgIGRlZmF1bHQ6IDEsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFtcImZpbGVfcGF0aFwiXSxcbiAgICB9LFxuICB9LFxuXTtcblxuLyoqXG4gKiBIYW5kbGUgc3ByZWFkc2hlZXQgdG9vbCBjYWxsc1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlU3ByZWFkc2hlZXRUb29sKFxuICBuYW1lOiBzdHJpbmcsXG4gIGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG4pOiBQcm9taXNlPHVua25vd24+IHtcbiAgc3dpdGNoIChuYW1lKSB7XG4gICAgY2FzZSBcInJlYWRfeGxzeFwiOlxuICAgICAgcmV0dXJuIHJlYWRYbHN4KGFyZ3MpO1xuICAgIGNhc2UgXCJjcmVhdGVfeGxzeFwiOlxuICAgICAgcmV0dXJuIGNyZWF0ZVhsc3goYXJncyk7XG4gICAgY2FzZSBcImFuYWx5emVfc3ByZWFkc2hlZXRcIjpcbiAgICAgIHJldHVybiBhbmFseXplU3ByZWFkc2hlZXQoYXJncyk7XG4gICAgY2FzZSBcImFwcGx5X2Zvcm11bGFcIjpcbiAgICAgIHJldHVybiBhcHBseUZvcm11bGEoYXJncyk7XG4gICAgY2FzZSBcImNyZWF0ZV9jaGFydFwiOlxuICAgICAgcmV0dXJuIGNyZWF0ZUNoYXJ0KGFyZ3MpO1xuICAgIGNhc2UgXCJwaXZvdF90YWJsZVwiOlxuICAgICAgcmV0dXJuIGNyZWF0ZVBpdm90VGFibGUoYXJncyk7XG4gICAgY2FzZSBcInhsc3hfdG9fanNvblwiOlxuICAgICAgcmV0dXJuIHhsc3hUb0pzb24oYXJncyk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBzcHJlYWRzaGVldCB0b29sOiAke25hbWV9YCk7XG4gIH1cbn1cblxuLy8gVG9vbCBpbXBsZW1lbnRhdGlvbnNcbmFzeW5jIGZ1bmN0aW9uIHJlYWRYbHN4KGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxvYmplY3Q+IHtcbiAgY29uc3QgeyBmaWxlX3BhdGgsIHNoZWV0X25hbWUsIHJhbmdlLCBpbmNsdWRlX2Zvcm11bGFzIH0gPSBhcmdzO1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGVfcGF0aCBhcyBzdHJpbmc7XG4gICAgXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWxlIG5vdCBmb3VuZDogJHtmaWxlUGF0aH1gKTtcbiAgICB9XG4gICAgXG4gICAgLy8gUmVhZCB3b3JrYm9va1xuICAgIGNvbnN0IHdvcmtib29rID0gWExTWC5yZWFkRmlsZShmaWxlUGF0aCwge1xuICAgICAgY2VsbEZvcm11bGE6IGluY2x1ZGVfZm9ybXVsYXMgYXMgYm9vbGVhbiB8fCBmYWxzZSxcbiAgICB9KTtcbiAgICBcbiAgICAvLyBHZXQgc2hlZXRcbiAgICBjb25zdCBzaGVldE5hbWVzID0gd29ya2Jvb2suU2hlZXROYW1lcztcbiAgICBjb25zdCB0YXJnZXRTaGVldCA9IHNoZWV0X25hbWUgYXMgc3RyaW5nIHx8IHNoZWV0TmFtZXNbMF07XG4gICAgXG4gICAgaWYgKCFzaGVldE5hbWVzLmluY2x1ZGVzKHRhcmdldFNoZWV0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTaGVldCAnJHt0YXJnZXRTaGVldH0nIG5vdCBmb3VuZC4gQXZhaWxhYmxlOiAke3NoZWV0TmFtZXMuam9pbignLCAnKX1gKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3Qgd29ya3NoZWV0ID0gd29ya2Jvb2suU2hlZXRzW3RhcmdldFNoZWV0XTtcbiAgICBcbiAgICAvLyBHZXQgcmFuZ2VcbiAgICBjb25zdCBzaGVldFJhbmdlID0gd29ya3NoZWV0WychcmVmJ10gfHwgJ0ExJztcbiAgICBjb25zdCB0YXJnZXRSYW5nZSA9IHJhbmdlIGFzIHN0cmluZyB8fCBzaGVldFJhbmdlO1xuICAgIFxuICAgIC8vIENvbnZlcnQgdG8gSlNPTiB3aXRoIGhlYWRlcnNcbiAgICBjb25zdCBkYXRhID0gWExTWC51dGlscy5zaGVldF90b19qc29uKHdvcmtzaGVldCwge1xuICAgICAgaGVhZGVyOiAxLFxuICAgICAgcmFuZ2U6IHRhcmdldFJhbmdlICE9PSAnYWxsJyA/IHRhcmdldFJhbmdlIDogdW5kZWZpbmVkLFxuICAgICAgZGVmdmFsOiAnJyxcbiAgICB9KSBhcyB1bmtub3duW11bXTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgZmlsZTogZmlsZV9wYXRoLFxuICAgICAgc2hlZXQ6IHRhcmdldFNoZWV0LFxuICAgICAgYXZhaWxhYmxlX3NoZWV0czogc2hlZXROYW1lcyxcbiAgICAgIHJhbmdlOiB0YXJnZXRSYW5nZSxcbiAgICAgIGRhdGE6IGRhdGEsXG4gICAgICByb3dzOiBkYXRhLmxlbmd0aCxcbiAgICAgIGNvbHVtbnM6IGRhdGFbMF0/Lmxlbmd0aCB8fCAwLFxuICAgIH07XG4gICAgXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3I6IGBGYWlsZWQgdG8gcmVhZCBFeGNlbCBmaWxlOiAke2Vycm9yLm1lc3NhZ2V9YCxcbiAgICAgIGZpbGU6IGZpbGVfcGF0aCxcbiAgICB9O1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVhsc3goYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7IG91dHB1dF9wYXRoLCBzaGVldHMgfSA9IGFyZ3M7XG4gIFxuICB0cnkge1xuICAgIGNvbnN0IG91dHB1dFBhdGggPSBvdXRwdXRfcGF0aCBhcyBzdHJpbmc7XG4gICAgY29uc3Qgc2hlZXREZWZzID0gc2hlZXRzIGFzIEFycmF5PHtcbiAgICAgIG5hbWU6IHN0cmluZztcbiAgICAgIGRhdGE6IHVua25vd25bXVtdO1xuICAgICAgaGVhZGVycz86IHN0cmluZ1tdO1xuICAgICAgY29sdW1uX3dpZHRocz86IFJlY29yZDxzdHJpbmcsIG51bWJlcj47XG4gICAgfT47XG4gICAgXG4gICAgLy8gQ3JlYXRlIHdvcmtib29rXG4gICAgY29uc3Qgd29ya2Jvb2sgPSBYTFNYLnV0aWxzLmJvb2tfbmV3KCk7XG4gICAgXG4gICAgZm9yIChjb25zdCBzaGVldERlZiBvZiBzaGVldERlZnMpIHtcbiAgICAgIGNvbnN0IHNoZWV0TmFtZSA9IHNoZWV0RGVmLm5hbWUgfHwgYFNoZWV0JHt3b3JrYm9vay5TaGVldE5hbWVzLmxlbmd0aCArIDF9YDtcbiAgICAgIFxuICAgICAgLy8gUHJlcGFyZSBkYXRhIHdpdGggaGVhZGVyc1xuICAgICAgbGV0IGZ1bGxEYXRhOiB1bmtub3duW11bXSA9IFtdO1xuICAgICAgaWYgKHNoZWV0RGVmLmhlYWRlcnMpIHtcbiAgICAgICAgZnVsbERhdGEucHVzaChzaGVldERlZi5oZWFkZXJzKTtcbiAgICAgIH1cbiAgICAgIGlmIChzaGVldERlZi5kYXRhKSB7XG4gICAgICAgIGZ1bGxEYXRhID0gZnVsbERhdGEuY29uY2F0KHNoZWV0RGVmLmRhdGEpO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBDcmVhdGUgd29ya3NoZWV0XG4gICAgICBjb25zdCB3b3Jrc2hlZXQgPSBYTFNYLnV0aWxzLmFvYV90b19zaGVldChmdWxsRGF0YSk7XG4gICAgICBcbiAgICAgIC8vIEFwcGx5IGNvbHVtbiB3aWR0aHMgaWYgc3BlY2lmaWVkXG4gICAgICBpZiAoc2hlZXREZWYuY29sdW1uX3dpZHRocykge1xuICAgICAgICBjb25zdCBjb2xzOiBYTFNYLkNvbEluZm9bXSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IFtjb2wsIHdpZHRoXSBvZiBPYmplY3QuZW50cmllcyhzaGVldERlZi5jb2x1bW5fd2lkdGhzKSkge1xuICAgICAgICAgIGNvbnN0IGNvbEluZGV4ID0gWExTWC51dGlscy5kZWNvZGVfY29sKGNvbCk7XG4gICAgICAgICAgY29sc1tjb2xJbmRleF0gPSB7IHdjaDogd2lkdGggfTtcbiAgICAgICAgfVxuICAgICAgICB3b3Jrc2hlZXRbJyFjb2xzJ10gPSBjb2xzO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBBZGQgc2hlZXQgdG8gd29ya2Jvb2tcbiAgICAgIFhMU1gudXRpbHMuYm9va19hcHBlbmRfc2hlZXQod29ya2Jvb2ssIHdvcmtzaGVldCwgc2hlZXROYW1lKTtcbiAgICB9XG4gICAgXG4gICAgLy8gV3JpdGUgZmlsZVxuICAgIFhMU1gud3JpdGVGaWxlKHdvcmtib29rLCBvdXRwdXRQYXRoKTtcbiAgICBcbiAgICByZXR1cm4gYFN1Y2Nlc3NmdWxseSBjcmVhdGVkIEV4Y2VsIGZpbGUgYXQgJHtvdXRwdXRQYXRofSB3aXRoICR7c2hlZXREZWZzLmxlbmd0aH0gc2hlZXQocyk6ICR7c2hlZXREZWZzLm1hcChzID0+IHMubmFtZSkuam9pbignLCAnKX1gO1xuICAgIFxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgcmV0dXJuIGBFcnJvciBjcmVhdGluZyBFeGNlbCBmaWxlOiAke2Vycm9yLm1lc3NhZ2V9YDtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBhbmFseXplU3ByZWFkc2hlZXQoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPG9iamVjdD4ge1xuICBjb25zdCB7IGZpbGVfcGF0aCwgc2hlZXRfbmFtZSwgYW5hbHlzaXNfdHlwZSB9ID0gYXJncztcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBmaWxlX3BhdGggYXMgc3RyaW5nO1xuICAgIFxuICAgIGlmICghZnMuZXhpc3RzU3luYyhmaWxlUGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmlsZSBub3QgZm91bmQ6ICR7ZmlsZVBhdGh9YCk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHdvcmtib29rID0gWExTWC5yZWFkRmlsZShmaWxlUGF0aCk7XG4gICAgY29uc3QgdGFyZ2V0U2hlZXQgPSBzaGVldF9uYW1lIGFzIHN0cmluZyB8fCB3b3JrYm9vay5TaGVldE5hbWVzWzBdO1xuICAgIGNvbnN0IHdvcmtzaGVldCA9IHdvcmtib29rLlNoZWV0c1t0YXJnZXRTaGVldF07XG4gICAgXG4gICAgLy8gQ29udmVydCB0byBhcnJheSBvZiBhcnJheXNcbiAgICBjb25zdCBkYXRhID0gWExTWC51dGlscy5zaGVldF90b19qc29uKHdvcmtzaGVldCwgeyBoZWFkZXI6IDEgfSkgYXMgdW5rbm93bltdW107XG4gICAgXG4gICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogJ1NoZWV0IGlzIGVtcHR5JywgZmlsZTogZmlsZV9wYXRoIH07XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGhlYWRlcnMgPSBkYXRhWzBdIGFzIHN0cmluZ1tdO1xuICAgIGNvbnN0IGRhdGFSb3dzID0gZGF0YS5zbGljZSgxKTtcbiAgICBcbiAgICAvLyBCYXNpYyBzdGF0aXN0aWNzXG4gICAgY29uc3Qgc3RhdHMgPSB7XG4gICAgICByb3dzOiBkYXRhUm93cy5sZW5ndGgsXG4gICAgICBjb2x1bW5zOiBoZWFkZXJzLmxlbmd0aCxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICBlbXB0eV9jZWxsczogMCxcbiAgICAgIG51bWVyaWNfY29sdW1uczogW10gYXMgc3RyaW5nW10sXG4gICAgICB0ZXh0X2NvbHVtbnM6IFtdIGFzIHN0cmluZ1tdLFxuICAgIH07XG4gICAgXG4gICAgLy8gQW5hbHl6ZSBlYWNoIGNvbHVtblxuICAgIGNvbnN0IGNvbHVtblN0YXRzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XG4gICAgXG4gICAgZm9yIChsZXQgY29sSWR4ID0gMDsgY29sSWR4IDwgaGVhZGVycy5sZW5ndGg7IGNvbElkeCsrKSB7XG4gICAgICBjb25zdCBjb2xOYW1lID0gaGVhZGVyc1tjb2xJZHhdIHx8IGBDb2x1bW4ke2NvbElkeCArIDF9YDtcbiAgICAgIGNvbnN0IGNvbFZhbHVlcyA9IGRhdGFSb3dzLm1hcChyb3cgPT4gKHJvdyBhcyB1bmtub3duW10pW2NvbElkeF0pO1xuICAgICAgXG4gICAgICAvLyBDb3VudCBlbXB0eSBjZWxsc1xuICAgICAgY29uc3QgZW1wdHlDZWxscyA9IGNvbFZhbHVlcy5maWx0ZXIodiA9PiB2ID09PSBudWxsIHx8IHYgPT09IHVuZGVmaW5lZCB8fCB2ID09PSAnJykubGVuZ3RoO1xuICAgICAgc3RhdHMuZW1wdHlfY2VsbHMgKz0gZW1wdHlDZWxscztcbiAgICAgIFxuICAgICAgLy8gRGV0ZXJtaW5lIGNvbHVtbiB0eXBlIGFuZCBjb21wdXRlIHN0YXRzXG4gICAgICBjb25zdCBudW1lcmljVmFsdWVzID0gY29sVmFsdWVzXG4gICAgICAgIC5maWx0ZXIodiA9PiB0eXBlb2YgdiA9PT0gJ251bWJlcicgJiYgIWlzTmFOKHYgYXMgbnVtYmVyKSlcbiAgICAgICAgLm1hcCh2ID0+IHYgYXMgbnVtYmVyKTtcbiAgICAgIFxuICAgICAgaWYgKG51bWVyaWNWYWx1ZXMubGVuZ3RoID4gY29sVmFsdWVzLmxlbmd0aCAqIDAuNSkge1xuICAgICAgICAvLyBOdW1lcmljIGNvbHVtblxuICAgICAgICBzdGF0cy5udW1lcmljX2NvbHVtbnMucHVzaChjb2xOYW1lKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNvcnRlZCA9IFsuLi5udW1lcmljVmFsdWVzXS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgICAgIGNvbnN0IHN1bSA9IG51bWVyaWNWYWx1ZXMucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG4gICAgICAgIGNvbnN0IG1lYW4gPSBzdW0gLyBudW1lcmljVmFsdWVzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgbWVkaWFuID0gc29ydGVkLmxlbmd0aCAlIDIgPT09IDBcbiAgICAgICAgICA/IChzb3J0ZWRbc29ydGVkLmxlbmd0aCAvIDIgLSAxXSArIHNvcnRlZFtzb3J0ZWQubGVuZ3RoIC8gMl0pIC8gMlxuICAgICAgICAgIDogc29ydGVkW01hdGguZmxvb3Ioc29ydGVkLmxlbmd0aCAvIDIpXTtcbiAgICAgICAgXG4gICAgICAgIGNvbHVtblN0YXRzW2NvbE5hbWVdID0ge1xuICAgICAgICAgIHR5cGU6ICdudW1lcmljJyxcbiAgICAgICAgICBjb3VudDogbnVtZXJpY1ZhbHVlcy5sZW5ndGgsXG4gICAgICAgICAgbWluOiBNYXRoLm1pbiguLi5udW1lcmljVmFsdWVzKSxcbiAgICAgICAgICBtYXg6IE1hdGgubWF4KC4uLm51bWVyaWNWYWx1ZXMpLFxuICAgICAgICAgIHN1bTogc3VtLFxuICAgICAgICAgIG1lYW46IHBhcnNlRmxvYXQobWVhbi50b0ZpeGVkKDIpKSxcbiAgICAgICAgICBtZWRpYW46IG1lZGlhbixcbiAgICAgICAgICBlbXB0eTogZW1wdHlDZWxscyxcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRleHQgY29sdW1uXG4gICAgICAgIHN0YXRzLnRleHRfY29sdW1ucy5wdXNoKGNvbE5hbWUpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdW5pcXVlVmFsdWVzID0gbmV3IFNldChjb2xWYWx1ZXMuZmlsdGVyKHYgPT4gdiAhPT0gbnVsbCAmJiB2ICE9PSB1bmRlZmluZWQgJiYgdiAhPT0gJycpKTtcbiAgICAgICAgXG4gICAgICAgIGNvbHVtblN0YXRzW2NvbE5hbWVdID0ge1xuICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICBjb3VudDogY29sVmFsdWVzLmxlbmd0aCAtIGVtcHR5Q2VsbHMsXG4gICAgICAgICAgdW5pcXVlX3ZhbHVlczogdW5pcXVlVmFsdWVzLnNpemUsXG4gICAgICAgICAgZW1wdHk6IGVtcHR5Q2VsbHMsXG4gICAgICAgICAgc2FtcGxlX3ZhbHVlczogQXJyYXkuZnJvbSh1bmlxdWVWYWx1ZXMpLnNsaWNlKDAsIDUpLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgZmlsZTogZmlsZV9wYXRoLFxuICAgICAgc2hlZXQ6IHRhcmdldFNoZWV0LFxuICAgICAgYW5hbHlzaXM6IGFuYWx5c2lzX3R5cGUgfHwgWydzdGF0aXN0aWNzJ10sXG4gICAgICBzdGF0aXN0aWNzOiBzdGF0cyxcbiAgICAgIGNvbHVtbl9zdGF0czogY29sdW1uU3RhdHMsXG4gICAgfTtcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIHJldHVybiB7XG4gICAgICBlcnJvcjogYEZhaWxlZCB0byBhbmFseXplIHNwcmVhZHNoZWV0OiAke2Vycm9yLm1lc3NhZ2V9YCxcbiAgICAgIGZpbGU6IGZpbGVfcGF0aCxcbiAgICB9O1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGFwcGx5Rm9ybXVsYShhcmdzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHsgZmlsZV9wYXRoLCBvdXRwdXRfcGF0aCwgZm9ybXVsYXMsIHNoZWV0X25hbWUgfSA9IGFyZ3M7XG4gIFxuICB0cnkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gZmlsZV9wYXRoIGFzIHN0cmluZztcbiAgICBjb25zdCBvdXRwdXRQYXRoID0gb3V0cHV0X3BhdGggYXMgc3RyaW5nO1xuICAgIGNvbnN0IGZvcm11bGFEZWZzID0gZm9ybXVsYXMgYXMgQXJyYXk8eyBjZWxsOiBzdHJpbmc7IGZvcm11bGE6IHN0cmluZyB9PjtcbiAgICBcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZmlsZVBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZpbGUgbm90IGZvdW5kOiAke2ZpbGVQYXRofWApO1xuICAgIH1cbiAgICBcbiAgICAvLyBSZWFkIHdvcmtib29rXG4gICAgY29uc3Qgd29ya2Jvb2sgPSBYTFNYLnJlYWRGaWxlKGZpbGVQYXRoKTtcbiAgICBjb25zdCB0YXJnZXRTaGVldCA9IHNoZWV0X25hbWUgYXMgc3RyaW5nIHx8IHdvcmtib29rLlNoZWV0TmFtZXNbMF07XG4gICAgY29uc3Qgd29ya3NoZWV0ID0gd29ya2Jvb2suU2hlZXRzW3RhcmdldFNoZWV0XTtcbiAgICBcbiAgICAvLyBBcHBseSBmb3JtdWxhc1xuICAgIGxldCBhcHBsaWVkQ291bnQgPSAwO1xuICAgIGZvciAoY29uc3QgZm9ybXVsYURlZiBvZiBmb3JtdWxhRGVmcykge1xuICAgICAgY29uc3QgY2VsbCA9IGZvcm11bGFEZWYuY2VsbC50b1VwcGVyQ2FzZSgpO1xuICAgICAgY29uc3QgZm9ybXVsYSA9IGZvcm11bGFEZWYuZm9ybXVsYTtcbiAgICAgIFxuICAgICAgLy8gU2V0IGZvcm11bGEgaW4gY2VsbFxuICAgICAgd29ya3NoZWV0W2NlbGxdID0ge1xuICAgICAgICB0OiAncycsIC8vIHN0cmluZyB0eXBlIGZvciBmb3JtdWxhXG4gICAgICAgIGY6IGZvcm11bGEuc3RhcnRzV2l0aCgnPScpID8gZm9ybXVsYS5zbGljZSgxKSA6IGZvcm11bGEsXG4gICAgICB9O1xuICAgICAgYXBwbGllZENvdW50Kys7XG4gICAgfVxuICAgIFxuICAgIC8vIFdyaXRlIHRvIG91dHB1dFxuICAgIFhMU1gud3JpdGVGaWxlKHdvcmtib29rLCBvdXRwdXRQYXRoKTtcbiAgICBcbiAgICByZXR1cm4gYFN1Y2Nlc3NmdWxseSBhcHBsaWVkICR7YXBwbGllZENvdW50fSBmb3JtdWxhKHMpIHRvICR7dGFyZ2V0U2hlZXR9LiBPdXRwdXQ6ICR7b3V0cHV0UGF0aH1gO1xuICAgIFxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgcmV0dXJuIGBFcnJvciBhcHBseWluZyBmb3JtdWxhczogJHtlcnJvci5tZXNzYWdlfWA7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlQ2hhcnQoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPG9iamVjdD4ge1xuICBjb25zdCB7IGZpbGVfcGF0aCwgb3V0cHV0X3BhdGgsIGNoYXJ0X3R5cGUsIGRhdGFfcmFuZ2UsIHRpdGxlLCBwb3NpdGlvbiB9ID0gYXJncztcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBmaWxlX3BhdGggYXMgc3RyaW5nO1xuICAgIFxuICAgIGlmICghZnMuZXhpc3RzU3luYyhmaWxlUGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmlsZSBub3QgZm91bmQ6ICR7ZmlsZVBhdGh9YCk7XG4gICAgfVxuICAgIFxuICAgIC8vIFJlYWQgdGhlIGRhdGEgZnJvbSB0aGUgc3BlY2lmaWVkIHJhbmdlXG4gICAgY29uc3Qgd29ya2Jvb2sgPSBYTFNYLnJlYWRGaWxlKGZpbGVQYXRoKTtcbiAgICBjb25zdCB3b3Jrc2hlZXQgPSB3b3JrYm9vay5TaGVldHNbd29ya2Jvb2suU2hlZXROYW1lc1swXV07XG4gICAgXG4gICAgLy8gUGFyc2UgZGF0YSByYW5nZVxuICAgIGNvbnN0IHJhbmdlID0gWExTWC51dGlscy5kZWNvZGVfcmFuZ2UoZGF0YV9yYW5nZSBhcyBzdHJpbmcpO1xuICAgIGNvbnN0IGNoYXJ0RGF0YTogdW5rbm93bltdW10gPSBbXTtcbiAgICBcbiAgICBmb3IgKGxldCByb3cgPSByYW5nZS5zLnI7IHJvdyA8PSByYW5nZS5lLnI7IHJvdysrKSB7XG4gICAgICBjb25zdCByb3dEYXRhOiB1bmtub3duW10gPSBbXTtcbiAgICAgIGZvciAobGV0IGNvbCA9IHJhbmdlLnMuYzsgY29sIDw9IHJhbmdlLmUuYzsgY29sKyspIHtcbiAgICAgICAgY29uc3QgY2VsbEFkZHIgPSBYTFNYLnV0aWxzLmVuY29kZV9jZWxsKHsgcjogcm93LCBjOiBjb2wgfSk7XG4gICAgICAgIGNvbnN0IGNlbGwgPSB3b3Jrc2hlZXRbY2VsbEFkZHJdO1xuICAgICAgICByb3dEYXRhLnB1c2goY2VsbCA/IGNlbGwudiA6IG51bGwpO1xuICAgICAgfVxuICAgICAgY2hhcnREYXRhLnB1c2gocm93RGF0YSk7XG4gICAgfVxuICAgIFxuICAgIC8vIE5vdGU6IHhsc3ggbGlicmFyeSBkb2Vzbid0IHN1cHBvcnQgZW1iZWRkZWQgY2hhcnRzXG4gICAgLy8gV2UgcmV0dXJuIGNoYXJ0IGNvbmZpZ3VyYXRpb24gZm9yIHVzZSB3aXRoIGNoYXJ0aW5nIGxpYnJhcmllc1xuICAgIGNvbnN0IGNoYXJ0Q29uZmlnID0ge1xuICAgICAgdHlwZTogY2hhcnRfdHlwZSxcbiAgICAgIHRpdGxlOiB0aXRsZSB8fCAnQ2hhcnQnLFxuICAgICAgcG9zaXRpb246IHBvc2l0aW9uIHx8ICdGMScsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGxhYmVsczogY2hhcnREYXRhWzBdPy5zbGljZSgxKSB8fCBbXSxcbiAgICAgICAgZGF0YXNldHM6IGNoYXJ0RGF0YS5zbGljZSgxKS5tYXAoKHJvdywgaWR4KSA9PiAoe1xuICAgICAgICAgIGxhYmVsOiByb3dbMF0sXG4gICAgICAgICAgZGF0YTogcm93LnNsaWNlKDEpLFxuICAgICAgICB9KSksXG4gICAgICB9LFxuICAgIH07XG4gICAgXG4gICAgLy8gQ29weSBmaWxlIHRvIG91dHB1dCAoY2hhcnQgd291bGQgbmVlZCB0byBiZSBhZGRlZCBieSBFeGNlbCBvciBhbm90aGVyIHRvb2wpXG4gICAgaWYgKG91dHB1dF9wYXRoICE9PSBmaWxlX3BhdGgpIHtcbiAgICAgIGZzLmNvcHlGaWxlU3luYyhmaWxlUGF0aCwgb3V0cHV0X3BhdGggYXMgc3RyaW5nKTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBtZXNzYWdlOiBgQ2hhcnQgY29uZmlndXJhdGlvbiBjcmVhdGVkIGZvciAke2NoYXJ0X3R5cGV9IGNoYXJ0IFwiJHt0aXRsZSB8fCAnVW50aXRsZWQnfVwiYCxcbiAgICAgIG5vdGU6IFwieGxzeCBsaWJyYXJ5IGRvZXNuJ3Qgc3VwcG9ydCBlbWJlZGRlZCBjaGFydHMuIFVzZSB0aGUgY2hhcnRfY29uZmlnIHdpdGggYSBjaGFydGluZyBsaWJyYXJ5IG9yIEV4Y2VsLlwiLFxuICAgICAgY2hhcnRfY29uZmlnOiBjaGFydENvbmZpZyxcbiAgICAgIG91dHB1dF9maWxlOiBvdXRwdXRfcGF0aCxcbiAgICB9O1xuICAgIFxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgZXJyb3I6IGBGYWlsZWQgdG8gY3JlYXRlIGNoYXJ0OiAke2Vycm9yLm1lc3NhZ2V9YCxcbiAgICB9O1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVBpdm90VGFibGUoYXJnczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPG9iamVjdD4ge1xuICBjb25zdCB7IGZpbGVfcGF0aCwgb3V0cHV0X3BhdGgsIHNvdXJjZV9yYW5nZSwgcm93cywgY29sdW1ucywgdmFsdWVzLCBhZ2dyZWdhdGlvbiB9ID0gYXJncztcbiAgXG4gIHRyeSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBmaWxlX3BhdGggYXMgc3RyaW5nO1xuICAgIGNvbnN0IG91dHB1dFBhdGggPSBvdXRwdXRfcGF0aCBhcyBzdHJpbmc7XG4gICAgY29uc3Qgcm93RmllbGRzID0gcm93cyBhcyBzdHJpbmdbXTtcbiAgICBjb25zdCBjb2xGaWVsZHMgPSBjb2x1bW5zIGFzIHN0cmluZ1tdIHx8IFtdO1xuICAgIGNvbnN0IHZhbHVlRmllbGRzID0gdmFsdWVzIGFzIHN0cmluZ1tdO1xuICAgIGNvbnN0IGFnZ1R5cGUgPSBhZ2dyZWdhdGlvbiBhcyBzdHJpbmcgfHwgJ3N1bSc7XG4gICAgXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWxlIG5vdCBmb3VuZDogJHtmaWxlUGF0aH1gKTtcbiAgICB9XG4gICAgXG4gICAgLy8gUmVhZCBzb3VyY2UgZGF0YVxuICAgIGNvbnN0IHdvcmtib29rID0gWExTWC5yZWFkRmlsZShmaWxlUGF0aCk7XG4gICAgY29uc3Qgd29ya3NoZWV0ID0gd29ya2Jvb2suU2hlZXRzW3dvcmtib29rLlNoZWV0TmFtZXNbMF1dO1xuICAgIGNvbnN0IGRhdGEgPSBYTFNYLnV0aWxzLnNoZWV0X3RvX2pzb24od29ya3NoZWV0KSBhcyBSZWNvcmQ8c3RyaW5nLCBhbnk+W107XG4gICAgXG4gICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGRhdGEgZm91bmQgaW4gc291cmNlJyk7XG4gICAgfVxuICAgIFxuICAgIC8vIEJ1aWxkIHBpdm90IHRhYmxlIG1hbnVhbGx5XG4gICAgY29uc3QgcGl2b3REYXRhOiBSZWNvcmQ8c3RyaW5nLCBSZWNvcmQ8c3RyaW5nLCBudW1iZXJbXT4+ID0ge307XG4gICAgXG4gICAgZm9yIChjb25zdCByb3cgb2YgZGF0YSkge1xuICAgICAgLy8gQ3JlYXRlIHJvdyBrZXkgZnJvbSByb3cgZmllbGRzXG4gICAgICBjb25zdCByb3dLZXkgPSByb3dGaWVsZHMubWFwKGYgPT4gU3RyaW5nKHJvd1tmXSB8fCAnJykpLmpvaW4oJyB8ICcpO1xuICAgICAgXG4gICAgICAvLyBDcmVhdGUgY29sdW1uIGtleSBmcm9tIGNvbHVtbiBmaWVsZHMgKGlmIGFueSlcbiAgICAgIGNvbnN0IGNvbEtleSA9IGNvbEZpZWxkcy5sZW5ndGggPiAwIFxuICAgICAgICA/IGNvbEZpZWxkcy5tYXAoZiA9PiBTdHJpbmcocm93W2ZdIHx8ICcnKSkuam9pbignIHwgJylcbiAgICAgICAgOiAnVmFsdWUnO1xuICAgICAgXG4gICAgICBpZiAoIXBpdm90RGF0YVtyb3dLZXldKSB7XG4gICAgICAgIHBpdm90RGF0YVtyb3dLZXldID0ge307XG4gICAgICB9XG4gICAgICBpZiAoIXBpdm90RGF0YVtyb3dLZXldW2NvbEtleV0pIHtcbiAgICAgICAgcGl2b3REYXRhW3Jvd0tleV1bY29sS2V5XSA9IFtdO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBDb2xsZWN0IHZhbHVlc1xuICAgICAgZm9yIChjb25zdCB2YWx1ZUZpZWxkIG9mIHZhbHVlRmllbGRzKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHBhcnNlRmxvYXQocm93W3ZhbHVlRmllbGRdKTtcbiAgICAgICAgaWYgKCFpc05hTih2YWwpKSB7XG4gICAgICAgICAgcGl2b3REYXRhW3Jvd0tleV1bY29sS2V5XS5wdXNoKHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gQWdncmVnYXRlIHZhbHVlc1xuICAgIGNvbnN0IGFnZ3JlZ2F0ZSA9IChhcnI6IG51bWJlcltdKTogbnVtYmVyID0+IHtcbiAgICAgIGlmIChhcnIubGVuZ3RoID09PSAwKSByZXR1cm4gMDtcbiAgICAgIHN3aXRjaCAoYWdnVHlwZSkge1xuICAgICAgICBjYXNlICdzdW0nOiByZXR1cm4gYXJyLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xuICAgICAgICBjYXNlICdjb3VudCc6IHJldHVybiBhcnIubGVuZ3RoO1xuICAgICAgICBjYXNlICdhdmVyYWdlJzogcmV0dXJuIGFyci5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKSAvIGFyci5sZW5ndGg7XG4gICAgICAgIGNhc2UgJ21heCc6IHJldHVybiBNYXRoLm1heCguLi5hcnIpO1xuICAgICAgICBjYXNlICdtaW4nOiByZXR1cm4gTWF0aC5taW4oLi4uYXJyKTtcbiAgICAgICAgZGVmYXVsdDogcmV0dXJuIGFyci5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIC8vIEdldCBhbGwgY29sdW1uIGtleXNcbiAgICBjb25zdCBhbGxDb2xLZXlzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgZm9yIChjb25zdCByb3dEYXRhIG9mIE9iamVjdC52YWx1ZXMocGl2b3REYXRhKSkge1xuICAgICAgZm9yIChjb25zdCBjb2xLZXkgb2YgT2JqZWN0LmtleXMocm93RGF0YSkpIHtcbiAgICAgICAgYWxsQ29sS2V5cy5hZGQoY29sS2V5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgY29sS2V5c0FycmF5ID0gQXJyYXkuZnJvbShhbGxDb2xLZXlzKS5zb3J0KCk7XG4gICAgXG4gICAgLy8gQnVpbGQgb3V0cHV0IGRhdGFcbiAgICBjb25zdCBvdXRwdXREYXRhOiB1bmtub3duW11bXSA9IFtdO1xuICAgIFxuICAgIC8vIEhlYWRlciByb3dcbiAgICBjb25zdCBoZWFkZXJSb3cgPSBbLi4ucm93RmllbGRzLCAuLi5jb2xLZXlzQXJyYXldO1xuICAgIG91dHB1dERhdGEucHVzaChoZWFkZXJSb3cpO1xuICAgIFxuICAgIC8vIERhdGEgcm93c1xuICAgIGZvciAoY29uc3QgW3Jvd0tleSwgcm93RGF0YV0gb2YgT2JqZWN0LmVudHJpZXMocGl2b3REYXRhKS5zb3J0KCkpIHtcbiAgICAgIGNvbnN0IG91dHB1dFJvdzogdW5rbm93bltdID0gcm93S2V5LnNwbGl0KCcgfCAnKTtcbiAgICAgIGZvciAoY29uc3QgY29sS2V5IG9mIGNvbEtleXNBcnJheSkge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSByb3dEYXRhW2NvbEtleV0gfHwgW107XG4gICAgICAgIG91dHB1dFJvdy5wdXNoKHBhcnNlRmxvYXQoYWdncmVnYXRlKHZhbHVlcykudG9GaXhlZCgyKSkpO1xuICAgICAgfVxuICAgICAgb3V0cHV0RGF0YS5wdXNoKG91dHB1dFJvdyk7XG4gICAgfVxuICAgIFxuICAgIC8vIENyZWF0ZSBuZXcgd29ya2Jvb2sgd2l0aCBwaXZvdCB0YWJsZVxuICAgIGNvbnN0IG5ld1dvcmtib29rID0gWExTWC51dGlscy5ib29rX25ldygpO1xuICAgIGNvbnN0IHBpdm90U2hlZXQgPSBYTFNYLnV0aWxzLmFvYV90b19zaGVldChvdXRwdXREYXRhKTtcbiAgICBYTFNYLnV0aWxzLmJvb2tfYXBwZW5kX3NoZWV0KG5ld1dvcmtib29rLCBwaXZvdFNoZWV0LCAnUGl2b3QgVGFibGUnKTtcbiAgICBcbiAgICAvLyBXcml0ZSBmaWxlXG4gICAgWExTWC53cml0ZUZpbGUobmV3V29ya2Jvb2ssIG91dHB1dFBhdGgpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgbWVzc2FnZTogYENyZWF0ZWQgcGl2b3QgdGFibGUgd2l0aCAke09iamVjdC5rZXlzKHBpdm90RGF0YSkubGVuZ3RofSByb3dzYCxcbiAgICAgIG91dHB1dF9maWxlOiBvdXRwdXRQYXRoLFxuICAgICAgcm93X2ZpZWxkczogcm93RmllbGRzLFxuICAgICAgY29sdW1uX2ZpZWxkczogY29sRmllbGRzLFxuICAgICAgdmFsdWVfZmllbGRzOiB2YWx1ZUZpZWxkcyxcbiAgICAgIGFnZ3JlZ2F0aW9uOiBhZ2dUeXBlLFxuICAgICAgcm93X2NvdW50OiBvdXRwdXREYXRhLmxlbmd0aCAtIDEsXG4gICAgICBjb2x1bW5fY291bnQ6IGNvbEtleXNBcnJheS5sZW5ndGgsXG4gICAgfTtcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIGVycm9yOiBgRmFpbGVkIHRvIGNyZWF0ZSBwaXZvdCB0YWJsZTogJHtlcnJvci5tZXNzYWdlfWAsXG4gICAgfTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiB4bHN4VG9Kc29uKGFyZ3M6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxvYmplY3Q+IHtcbiAgY29uc3QgeyBmaWxlX3BhdGgsIHNoZWV0X25hbWUsIGhlYWRlcl9yb3cgfSA9IGFyZ3M7XG4gIFxuICB0cnkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gZmlsZV9wYXRoIGFzIHN0cmluZztcbiAgICBcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZmlsZVBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZpbGUgbm90IGZvdW5kOiAke2ZpbGVQYXRofWApO1xuICAgIH1cbiAgICBcbiAgICAvLyBSZWFkIHdvcmtib29rXG4gICAgY29uc3Qgd29ya2Jvb2sgPSBYTFNYLnJlYWRGaWxlKGZpbGVQYXRoKTtcbiAgICBcbiAgICAvLyBHZXQgc2hlZXRcbiAgICBjb25zdCBzaGVldE5hbWVzID0gd29ya2Jvb2suU2hlZXROYW1lcztcbiAgICBjb25zdCB0YXJnZXRTaGVldCA9IHNoZWV0X25hbWUgYXMgc3RyaW5nIHx8IHNoZWV0TmFtZXNbMF07XG4gICAgXG4gICAgaWYgKCFzaGVldE5hbWVzLmluY2x1ZGVzKHRhcmdldFNoZWV0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTaGVldCAnJHt0YXJnZXRTaGVldH0nIG5vdCBmb3VuZC4gQXZhaWxhYmxlOiAke3NoZWV0TmFtZXMuam9pbignLCAnKX1gKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3Qgd29ya3NoZWV0ID0gd29ya2Jvb2suU2hlZXRzW3RhcmdldFNoZWV0XTtcbiAgICBcbiAgICAvLyBDb252ZXJ0IHRvIEpTT04gd2l0aCBmaXJzdCByb3cgYXMgaGVhZGVyc1xuICAgIGNvbnN0IGhlYWRlclJvd051bSA9IChoZWFkZXJfcm93IGFzIG51bWJlcikgfHwgMTtcbiAgICBjb25zdCBkYXRhID0gWExTWC51dGlscy5zaGVldF90b19qc29uKHdvcmtzaGVldCwge1xuICAgICAgcmFuZ2U6IGhlYWRlclJvd051bSAtIDEsIC8vIDAtYmFzZWRcbiAgICAgIGRlZnZhbDogbnVsbCxcbiAgICB9KTtcbiAgICBcbiAgICAvLyBHZXQgaGVhZGVyc1xuICAgIGNvbnN0IHJhd0RhdGEgPSBYTFNYLnV0aWxzLnNoZWV0X3RvX2pzb24od29ya3NoZWV0LCB7IGhlYWRlcjogMSB9KSBhcyB1bmtub3duW11bXTtcbiAgICBjb25zdCBoZWFkZXJzID0gcmF3RGF0YVtoZWFkZXJSb3dOdW0gLSAxXSBhcyBzdHJpbmdbXTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIHNvdXJjZTogZmlsZV9wYXRoLFxuICAgICAgc2hlZXQ6IHRhcmdldFNoZWV0LFxuICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgIGRhdGE6IGRhdGEsXG4gICAgICByZWNvcmRfY291bnQ6IGRhdGEubGVuZ3RoLFxuICAgIH07XG4gICAgXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBlcnJvcjogYEZhaWxlZCB0byBjb252ZXJ0IEV4Y2VsIHRvIEpTT046ICR7ZXJyb3IubWVzc2FnZX1gLFxuICAgICAgc291cmNlOiBmaWxlX3BhdGgsXG4gICAgfTtcbiAgfVxufVxuIl19