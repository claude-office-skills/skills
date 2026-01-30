"use strict";
/**
 * Knowledge Loader for Office MCP
 *
 * Supports:
 * - Loading knowledge from JSON files
 * - Inheritance via "extends" property
 * - Merging base + custom knowledge
 * - Override mechanism for customization
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
exports.loadKnowledge = loadKnowledge;
exports.getAvailableJurisdictions = getAvailableJurisdictions;
exports.getCustomKnowledgeFiles = getCustomKnowledgeFiles;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Default paths
const KNOWLEDGE_BASE_PATH = path.join(__dirname, "../../knowledge");
/**
 * Load and parse a JSON knowledge file
 */
function loadJsonFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.warn(`Knowledge file not found: ${filePath}`);
            return null;
        }
        const content = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(content);
    }
    catch (error) {
        console.error(`Error loading knowledge file ${filePath}:`, error);
        return null;
    }
}
/**
 * Resolve relative path in extends property
 */
function resolveExtendsPath(currentFile, extendsPath) {
    const currentDir = path.dirname(currentFile);
    return path.resolve(currentDir, extendsPath);
}
/**
 * Deep merge two objects
 */
function deepMerge(base, override) {
    const result = { ...base };
    for (const key of Object.keys(override)) {
        const overrideValue = override[key];
        const baseValue = result[key];
        if (overrideValue !== undefined &&
            typeof overrideValue === "object" &&
            overrideValue !== null &&
            !Array.isArray(overrideValue) &&
            typeof baseValue === "object" &&
            baseValue !== null &&
            !Array.isArray(baseValue)) {
            result[key] = deepMerge(baseValue, overrideValue);
        }
        else if (overrideValue !== undefined) {
            result[key] = overrideValue;
        }
    }
    return result;
}
/**
 * Load risk patterns from a file, handling inheritance
 */
function loadRiskPatterns(filePath, loadedFiles = new Set()) {
    // Prevent circular dependencies
    if (loadedFiles.has(filePath)) {
        return {};
    }
    loadedFiles.add(filePath);
    const file = loadJsonFile(filePath);
    if (!file) {
        return {};
    }
    let patterns = {};
    // Load base patterns if extends is specified
    if (file.extends) {
        const basePath = resolveExtendsPath(filePath, file.extends);
        patterns = loadRiskPatterns(basePath, loadedFiles);
    }
    // Merge base patterns
    if (file.risk_patterns) {
        patterns = { ...patterns, ...file.risk_patterns };
    }
    // Apply overrides
    if (file.overrides) {
        for (const [key, override] of Object.entries(file.overrides)) {
            if (patterns[key]) {
                patterns[key] = deepMerge(patterns[key], override);
            }
        }
    }
    // Add additional patterns
    if (file.additional_patterns) {
        patterns = { ...patterns, ...file.additional_patterns };
    }
    return patterns;
}
/**
 * Load completeness checklist
 */
function loadCompletenessItems(basePath) {
    const filePath = path.join(basePath, "base", "completeness.json");
    const file = loadJsonFile(filePath);
    if (!file) {
        return [];
    }
    const items = [];
    if (file.essential_elements) {
        items.push(...file.essential_elements);
    }
    if (file.important_clauses) {
        items.push(...file.important_clauses);
    }
    if (file.execution_elements) {
        items.push(...file.execution_elements);
    }
    return items;
}
/**
 * Load jurisdiction-specific knowledge
 */
function loadJurisdiction(basePath, jurisdiction) {
    const filePath = path.join(basePath, "base", "jurisdictions", `${jurisdiction}.json`);
    return loadJsonFile(filePath);
}
/**
 * Main function to load all knowledge
 */
function loadKnowledge(options) {
    const basePath = options.basePath || KNOWLEDGE_BASE_PATH;
    const loadedFiles = [];
    // Load base risk patterns
    const baseRiskPath = path.join(basePath, "base", "risk_patterns.json");
    let riskPatterns = loadRiskPatterns(baseRiskPath);
    loadedFiles.push(baseRiskPath);
    // Load custom files
    if (options.customFiles) {
        for (const customFile of options.customFiles) {
            const customPath = path.isAbsolute(customFile)
                ? customFile
                : path.join(basePath, customFile);
            const customPatterns = loadRiskPatterns(customPath);
            riskPatterns = { ...riskPatterns, ...customPatterns };
            loadedFiles.push(customPath);
        }
    }
    // Load completeness items
    const completenessItems = loadCompletenessItems(basePath);
    // Load jurisdiction
    let jurisdiction;
    if (options.jurisdiction) {
        const loaded = loadJurisdiction(basePath, options.jurisdiction);
        if (loaded) {
            jurisdiction = loaded;
            loadedFiles.push(path.join(basePath, "base", "jurisdictions", `${options.jurisdiction}.json`));
        }
    }
    return {
        riskPatterns,
        completenessItems,
        jurisdiction,
        metadata: {
            loadedFiles,
            version: "1.0.0",
        },
    };
}
/**
 * Get list of available jurisdictions
 */
function getAvailableJurisdictions(basePath) {
    const jurisdictionsPath = path.join(basePath || KNOWLEDGE_BASE_PATH, "base", "jurisdictions");
    try {
        if (!fs.existsSync(jurisdictionsPath)) {
            return [];
        }
        return fs
            .readdirSync(jurisdictionsPath)
            .filter((file) => file.endsWith(".json"))
            .map((file) => file.replace(".json", ""));
    }
    catch {
        return [];
    }
}
/**
 * Scan for custom knowledge files
 */
function getCustomKnowledgeFiles(basePath) {
    const customPath = path.join(basePath || KNOWLEDGE_BASE_PATH, "custom");
    try {
        if (!fs.existsSync(customPath)) {
            return [];
        }
        return fs
            .readdirSync(customPath)
            .filter((file) => file.endsWith(".json"))
            .map((file) => path.join("custom", file));
    }
    catch {
        return [];
    }
}
// Export for use in MCP tools
exports.default = {
    loadKnowledge,
    getAvailableJurisdictions,
    getCustomKnowledgeFiles,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2tub3dsZWRnZS9sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7OztHQVFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9OSCxzQ0FrREM7QUFLRCw4REFtQkM7QUFLRCwwREFlQztBQWhURCx1Q0FBeUI7QUFDekIsMkNBQTZCO0FBaUU3QixnQkFBZ0I7QUFDaEIsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBRXBFOztHQUVHO0FBQ0gsU0FBUyxZQUFZLENBQUksUUFBZ0I7SUFDdkMsSUFBSSxDQUFDO1FBQ0gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDLDZCQUE2QixRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUNELE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ25ELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQU0sQ0FBQztJQUNsQyxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLFFBQVEsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xFLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztBQUNILENBQUM7QUFFRDs7R0FFRztBQUNILFNBQVMsa0JBQWtCLENBQUMsV0FBbUIsRUFBRSxXQUFtQjtJQUNsRSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVB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RUFBRSxDQUFDO1lBQy9CLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQztRQUVELE9BQU8sRUFBRTthQUNOLFdBQVcsQ0FBQyxVQUFVLENBQUM7YUFDdkIsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3hDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQUMsTUFBTSxDQUFDO1FBQ1AsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0FBQ0gsQ0FBQztBQUVELDhCQUE4QjtBQUM5QixrQkFBZTtJQUNiLGFBQWE7SUFDYix5QkFBeUI7SUFDekIsdUJBQXVCO0NBQ3hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEtub3dsZWRnZSBMb2FkZXIgZm9yIE9mZmljZSBNQ1BcbiAqIFxuICogU3VwcG9ydHM6XG4gKiAtIExvYWRpbmcga25vd2xlZGdlIGZyb20gSlNPTiBmaWxlc1xuICogLSBJbmhlcml0YW5jZSB2aWEgXCJleHRlbmRzXCIgcHJvcGVydHlcbiAqIC0gTWVyZ2luZyBiYXNlICsgY3VzdG9tIGtub3dsZWRnZVxuICogLSBPdmVycmlkZSBtZWNoYW5pc20gZm9yIGN1c3RvbWl6YXRpb25cbiAqL1xuXG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcblxuLy8gVHlwZSBkZWZpbml0aW9uc1xuZXhwb3J0IGludGVyZmFjZSBSaXNrUGF0dGVybiB7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgbmFtZV96aD86IHN0cmluZztcbiAgc2V2ZXJpdHk6IFwibG93XCIgfCBcIm1lZGl1bVwiIHwgXCJoaWdoXCIgfCBcImNyaXRpY2FsXCI7XG4gIGNhdGVnb3J5Pzogc3RyaW5nO1xuICBrZXl3b3Jkczogc3RyaW5nW107XG4gIGtleXdvcmRzX3poPzogc3RyaW5nW107XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uX3poPzogc3RyaW5nO1xuICByZWNvbW1lbmRhdGlvbjogc3RyaW5nO1xuICByZWNvbW1lbmRhdGlvbl96aD86IHN0cmluZztcbiAgbGVnYWxfcmVmZXJlbmNlcz86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBsZXRlbmVzc0l0ZW0ge1xuICBpZDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIG5hbWVfemg/OiBzdHJpbmc7XG4gIGNhdGVnb3J5Pzogc3RyaW5nO1xuICByZXF1aXJlZDogYm9vbGVhbjtcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGNoZWNrX2Zvcj86IHN0cmluZ1tdO1xuICBjaGVja19mb3Jfemg/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBKdXJpc2RpY3Rpb25Lbm93bGVkZ2Uge1xuICBqdXJpc2RpY3Rpb246IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBuYW1lX3poPzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgZW1wbG95bWVudF9sYXc/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgY29udHJhY3RfcmVxdWlyZW1lbnRzPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gIGtleV9sYXdzPzogQXJyYXk8eyBjb2RlOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgZGVzY3JpcHRpb24/OiBzdHJpbmcgfT47XG4gIG5vbl9jb21wZXRlX3J1bGVzPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgS25vd2xlZGdlRmlsZSB7XG4gIHZlcnNpb246IHN0cmluZztcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGF1dGhvcj86IHN0cmluZztcbiAgZXh0ZW5kcz86IHN0cmluZztcbiAganVyaXNkaWN0aW9uPzogc3RyaW5nO1xuICByaXNrX3BhdHRlcm5zPzogUmVjb3JkPHN0cmluZywgUmlza1BhdHRlcm4+O1xuICBvdmVycmlkZXM/OiBSZWNvcmQ8c3RyaW5nLCBQYXJ0aWFsPFJpc2tQYXR0ZXJuPj47XG4gIGFkZGl0aW9uYWxfcGF0dGVybnM/OiBSZWNvcmQ8c3RyaW5nLCBSaXNrUGF0dGVybj47XG4gIGVzc2VudGlhbF9lbGVtZW50cz86IENvbXBsZXRlbmVzc0l0ZW1bXTtcbiAgaW1wb3J0YW50X2NsYXVzZXM/OiBDb21wbGV0ZW5lc3NJdGVtW107XG4gIGV4ZWN1dGlvbl9lbGVtZW50cz86IENvbXBsZXRlbmVzc0l0ZW1bXTtcbiAgY29tcGxldGVuZXNzX2FkZGl0aW9ucz86IENvbXBsZXRlbmVzc0l0ZW1bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2FkZWRLbm93bGVkZ2Uge1xuICByaXNrUGF0dGVybnM6IFJlY29yZDxzdHJpbmcsIFJpc2tQYXR0ZXJuPjtcbiAgY29tcGxldGVuZXNzSXRlbXM6IENvbXBsZXRlbmVzc0l0ZW1bXTtcbiAganVyaXNkaWN0aW9uPzogSnVyaXNkaWN0aW9uS25vd2xlZGdlO1xuICBtZXRhZGF0YToge1xuICAgIGxvYWRlZEZpbGVzOiBzdHJpbmdbXTtcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XG4gIH07XG59XG5cbi8vIERlZmF1bHQgcGF0aHNcbmNvbnN0IEtOT1dMRURHRV9CQVNFX1BBVEggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uLy4uL2tub3dsZWRnZVwiKTtcblxuLyoqXG4gKiBMb2FkIGFuZCBwYXJzZSBhIEpTT04ga25vd2xlZGdlIGZpbGVcbiAqL1xuZnVuY3Rpb24gbG9hZEpzb25GaWxlPFQ+KGZpbGVQYXRoOiBzdHJpbmcpOiBUIHwgbnVsbCB7XG4gIHRyeSB7XG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xuICAgICAgY29uc29sZS53YXJuKGBLbm93bGVkZ2UgZmlsZSBub3QgZm91bmQ6ICR7ZmlsZVBhdGh9YCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgXCJ1dGYtOFwiKTtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShjb250ZW50KSBhcyBUO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGxvYWRpbmcga25vd2xlZGdlIGZpbGUgJHtmaWxlUGF0aH06YCwgZXJyb3IpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogUmVzb2x2ZSByZWxhdGl2ZSBwYXRoIGluIGV4dGVuZHMgcHJvcGVydHlcbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZUV4dGVuZHNQYXRoKGN1cnJlbnRGaWxlOiBzdHJpbmcsIGV4dGVuZHNQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBjdXJyZW50RGlyID0gcGF0aC5kaXJuYW1lKGN1cnJlbnRGaWxlKTtcbiAgcmV0dXJuIHBhdGgucmVzb2x2ZShjdXJyZW50RGlyLCBleHRlbmRzUGF0aCk7XG59XG5cbi8qKlxuICogRGVlcCBtZXJnZSB0d28gb2JqZWN0c1xuICovXG5mdW5jdGlvbiBkZWVwTWVyZ2U8VD4oYmFzZTogVCwgb3ZlcnJpZGU6IFBhcnRpYWw8VD4pOiBUIHtcbiAgY29uc3QgcmVzdWx0ID0geyAuLi5iYXNlIH0gYXMgVDtcbiAgXG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG92ZXJyaWRlKSBhcyBBcnJheTxrZXlvZiBUPikge1xuICAgIGNvbnN0IG92ZXJyaWRlVmFsdWUgPSBvdmVycmlkZVtrZXldO1xuICAgIGNvbnN0IGJhc2VWYWx1ZSA9IHJlc3VsdFtrZXldO1xuICAgIFxuICAgIGlmIChcbiAgICAgIG92ZXJyaWRlVmFsdWUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgdHlwZW9mIG92ZXJyaWRlVmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgIG92ZXJyaWRlVmFsdWUgIT09IG51bGwgJiZcbiAgICAgICFBcnJheS5pc0FycmF5KG92ZXJyaWRlVmFsdWUpICYmXG4gICAgICB0eXBlb2YgYmFzZVZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICBiYXNlVmFsdWUgIT09IG51bGwgJiZcbiAgICAgICFBcnJheS5pc0FycmF5KGJhc2VWYWx1ZSlcbiAgICApIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKGJhc2VWYWx1ZSwgb3ZlcnJpZGVWYWx1ZSBhcyBQYXJ0aWFsPFRba2V5b2YgVF0+KSBhcyBUW2tleW9mIFRdO1xuICAgIH0gZWxzZSBpZiAob3ZlcnJpZGVWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG92ZXJyaWRlVmFsdWUgYXMgVFtrZXlvZiBUXTtcbiAgICB9XG4gIH1cbiAgXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogTG9hZCByaXNrIHBhdHRlcm5zIGZyb20gYSBmaWxlLCBoYW5kbGluZyBpbmhlcml0YW5jZVxuICovXG5mdW5jdGlvbiBsb2FkUmlza1BhdHRlcm5zKFxuICBmaWxlUGF0aDogc3RyaW5nLFxuICBsb2FkZWRGaWxlczogU2V0PHN0cmluZz4gPSBuZXcgU2V0KClcbik6IFJlY29yZDxzdHJpbmcsIFJpc2tQYXR0ZXJuPiB7XG4gIC8vIFByZXZlbnQgY2lyY3VsYXIgZGVwZW5kZW5jaWVzXG4gIGlmIChsb2FkZWRGaWxlcy5oYXMoZmlsZVBhdGgpKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG4gIGxvYWRlZEZpbGVzLmFkZChmaWxlUGF0aCk7XG5cbiAgY29uc3QgZmlsZSA9IGxvYWRKc29uRmlsZTxLbm93bGVkZ2VGaWxlPihmaWxlUGF0aCk7XG4gIGlmICghZmlsZSkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIGxldCBwYXR0ZXJuczogUmVjb3JkPHN0cmluZywgUmlza1BhdHRlcm4+ID0ge307XG5cbiAgLy8gTG9hZCBiYXNlIHBhdHRlcm5zIGlmIGV4dGVuZHMgaXMgc3BlY2lmaWVkXG4gIGlmIChmaWxlLmV4dGVuZHMpIHtcbiAgICBjb25zdCBiYXNlUGF0aCA9IHJlc29sdmVFeHRlbmRzUGF0aChmaWxlUGF0aCwgZmlsZS5leHRlbmRzKTtcbiAgICBwYXR0ZXJucyA9IGxvYWRSaXNrUGF0dGVybnMoYmFzZVBhdGgsIGxvYWRlZEZpbGVzKTtcbiAgfVxuXG4gIC8vIE1lcmdlIGJhc2UgcGF0dGVybnNcbiAgaWYgKGZpbGUucmlza19wYXR0ZXJucykge1xuICAgIHBhdHRlcm5zID0geyAuLi5wYXR0ZXJucywgLi4uZmlsZS5yaXNrX3BhdHRlcm5zIH07XG4gIH1cblxuICAvLyBBcHBseSBvdmVycmlkZXNcbiAgaWYgKGZpbGUub3ZlcnJpZGVzKSB7XG4gICAgZm9yIChjb25zdCBba2V5LCBvdmVycmlkZV0gb2YgT2JqZWN0LmVudHJpZXMoZmlsZS5vdmVycmlkZXMpKSB7XG4gICAgICBpZiAocGF0dGVybnNba2V5XSkge1xuICAgICAgICBwYXR0ZXJuc1trZXldID0gZGVlcE1lcmdlKHBhdHRlcm5zW2tleV0sIG92ZXJyaWRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBBZGQgYWRkaXRpb25hbCBwYXR0ZXJuc1xuICBpZiAoZmlsZS5hZGRpdGlvbmFsX3BhdHRlcm5zKSB7XG4gICAgcGF0dGVybnMgPSB7IC4uLnBhdHRlcm5zLCAuLi5maWxlLmFkZGl0aW9uYWxfcGF0dGVybnMgfTtcbiAgfVxuXG4gIHJldHVybiBwYXR0ZXJucztcbn1cblxuLyoqXG4gKiBMb2FkIGNvbXBsZXRlbmVzcyBjaGVja2xpc3RcbiAqL1xuZnVuY3Rpb24gbG9hZENvbXBsZXRlbmVzc0l0ZW1zKGJhc2VQYXRoOiBzdHJpbmcpOiBDb21wbGV0ZW5lc3NJdGVtW10ge1xuICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihiYXNlUGF0aCwgXCJiYXNlXCIsIFwiY29tcGxldGVuZXNzLmpzb25cIik7XG4gIGNvbnN0IGZpbGUgPSBsb2FkSnNvbkZpbGU8S25vd2xlZGdlRmlsZT4oZmlsZVBhdGgpO1xuICBcbiAgaWYgKCFmaWxlKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3QgaXRlbXM6IENvbXBsZXRlbmVzc0l0ZW1bXSA9IFtdO1xuICBcbiAgaWYgKGZpbGUuZXNzZW50aWFsX2VsZW1lbnRzKSB7XG4gICAgaXRlbXMucHVzaCguLi5maWxlLmVzc2VudGlhbF9lbGVtZW50cyk7XG4gIH1cbiAgaWYgKGZpbGUuaW1wb3J0YW50X2NsYXVzZXMpIHtcbiAgICBpdGVtcy5wdXNoKC4uLmZpbGUuaW1wb3J0YW50X2NsYXVzZXMpO1xuICB9XG4gIGlmIChmaWxlLmV4ZWN1dGlvbl9lbGVtZW50cykge1xuICAgIGl0ZW1zLnB1c2goLi4uZmlsZS5leGVjdXRpb25fZWxlbWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIGl0ZW1zO1xufVxuXG4vKipcbiAqIExvYWQganVyaXNkaWN0aW9uLXNwZWNpZmljIGtub3dsZWRnZVxuICovXG5mdW5jdGlvbiBsb2FkSnVyaXNkaWN0aW9uKFxuICBiYXNlUGF0aDogc3RyaW5nLFxuICBqdXJpc2RpY3Rpb246IHN0cmluZ1xuKTogSnVyaXNkaWN0aW9uS25vd2xlZGdlIHwgbnVsbCB7XG4gIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGJhc2VQYXRoLCBcImJhc2VcIiwgXCJqdXJpc2RpY3Rpb25zXCIsIGAke2p1cmlzZGljdGlvbn0uanNvbmApO1xuICByZXR1cm4gbG9hZEpzb25GaWxlPEp1cmlzZGljdGlvbktub3dsZWRnZT4oZmlsZVBhdGgpO1xufVxuXG4vKipcbiAqIE1haW4gZnVuY3Rpb24gdG8gbG9hZCBhbGwga25vd2xlZGdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkS25vd2xlZGdlKG9wdGlvbnM6IHtcbiAgYmFzZVBhdGg/OiBzdHJpbmc7XG4gIGN1c3RvbUZpbGVzPzogc3RyaW5nW107XG4gIGp1cmlzZGljdGlvbj86IHN0cmluZztcbn0pOiBMb2FkZWRLbm93bGVkZ2Uge1xuICBjb25zdCBiYXNlUGF0aCA9IG9wdGlvbnMuYmFzZVBhdGggfHwgS05PV0xFREdFX0JBU0VfUEFUSDtcbiAgY29uc3QgbG9hZGVkRmlsZXM6IHN0cmluZ1tdID0gW107XG5cbiAgLy8gTG9hZCBiYXNlIHJpc2sgcGF0dGVybnNcbiAgY29uc3QgYmFzZVJpc2tQYXRoID0gcGF0aC5qb2luKGJhc2VQYXRoLCBcImJhc2VcIiwgXCJyaXNrX3BhdHRlcm5zLmpzb25cIik7XG4gIGxldCByaXNrUGF0dGVybnMgPSBsb2FkUmlza1BhdHRlcm5zKGJhc2VSaXNrUGF0aCk7XG4gIGxvYWRlZEZpbGVzLnB1c2goYmFzZVJpc2tQYXRoKTtcblxuICAvLyBMb2FkIGN1c3RvbSBmaWxlc1xuICBpZiAob3B0aW9ucy5jdXN0b21GaWxlcykge1xuICAgIGZvciAoY29uc3QgY3VzdG9tRmlsZSBvZiBvcHRpb25zLmN1c3RvbUZpbGVzKSB7XG4gICAgICBjb25zdCBjdXN0b21QYXRoID0gcGF0aC5pc0Fic29sdXRlKGN1c3RvbUZpbGUpXG4gICAgICAgID8gY3VzdG9tRmlsZVxuICAgICAgICA6IHBhdGguam9pbihiYXNlUGF0aCwgY3VzdG9tRmlsZSk7XG4gICAgICBcbiAgICAgIGNvbnN0IGN1c3RvbVBhdHRlcm5zID0gbG9hZFJpc2tQYXR0ZXJucyhjdXN0b21QYXRoKTtcbiAgICAgIHJpc2tQYXR0ZXJucyA9IHsgLi4ucmlza1BhdHRlcm5zLCAuLi5jdXN0b21QYXR0ZXJucyB9O1xuICAgICAgbG9hZGVkRmlsZXMucHVzaChjdXN0b21QYXRoKTtcbiAgICB9XG4gIH1cblxuICAvLyBMb2FkIGNvbXBsZXRlbmVzcyBpdGVtc1xuICBjb25zdCBjb21wbGV0ZW5lc3NJdGVtcyA9IGxvYWRDb21wbGV0ZW5lc3NJdGVtcyhiYXNlUGF0aCk7XG5cbiAgLy8gTG9hZCBqdXJpc2RpY3Rpb25cbiAgbGV0IGp1cmlzZGljdGlvbjogSnVyaXNkaWN0aW9uS25vd2xlZGdlIHwgdW5kZWZpbmVkO1xuICBpZiAob3B0aW9ucy5qdXJpc2RpY3Rpb24pIHtcbiAgICBjb25zdCBsb2FkZWQgPSBsb2FkSnVyaXNkaWN0aW9uKGJhc2VQYXRoLCBvcHRpb25zLmp1cmlzZGljdGlvbik7XG4gICAgaWYgKGxvYWRlZCkge1xuICAgICAganVyaXNkaWN0aW9uID0gbG9hZGVkO1xuICAgICAgbG9hZGVkRmlsZXMucHVzaChcbiAgICAgICAgcGF0aC5qb2luKGJhc2VQYXRoLCBcImJhc2VcIiwgXCJqdXJpc2RpY3Rpb25zXCIsIGAke29wdGlvbnMuanVyaXNkaWN0aW9ufS5qc29uYClcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByaXNrUGF0dGVybnMsXG4gICAgY29tcGxldGVuZXNzSXRlbXMsXG4gICAganVyaXNkaWN0aW9uLFxuICAgIG1ldGFkYXRhOiB7XG4gICAgICBsb2FkZWRGaWxlcyxcbiAgICAgIHZlcnNpb246IFwiMS4wLjBcIixcbiAgICB9LFxuICB9O1xufVxuXG4vKipcbiAqIEdldCBsaXN0IG9mIGF2YWlsYWJsZSBqdXJpc2RpY3Rpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdmFpbGFibGVKdXJpc2RpY3Rpb25zKGJhc2VQYXRoPzogc3RyaW5nKTogc3RyaW5nW10ge1xuICBjb25zdCBqdXJpc2RpY3Rpb25zUGF0aCA9IHBhdGguam9pbihcbiAgICBiYXNlUGF0aCB8fCBLTk9XTEVER0VfQkFTRV9QQVRILFxuICAgIFwiYmFzZVwiLFxuICAgIFwianVyaXNkaWN0aW9uc1wiXG4gICk7XG5cbiAgdHJ5IHtcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoanVyaXNkaWN0aW9uc1BhdGgpKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgcmV0dXJuIGZzXG4gICAgICAucmVhZGRpclN5bmMoanVyaXNkaWN0aW9uc1BhdGgpXG4gICAgICAuZmlsdGVyKChmaWxlKSA9PiBmaWxlLmVuZHNXaXRoKFwiLmpzb25cIikpXG4gICAgICAubWFwKChmaWxlKSA9PiBmaWxlLnJlcGxhY2UoXCIuanNvblwiLCBcIlwiKSk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBbXTtcbiAgfVxufVxuXG4vKipcbiAqIFNjYW4gZm9yIGN1c3RvbSBrbm93bGVkZ2UgZmlsZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1c3RvbUtub3dsZWRnZUZpbGVzKGJhc2VQYXRoPzogc3RyaW5nKTogc3RyaW5nW10ge1xuICBjb25zdCBjdXN0b21QYXRoID0gcGF0aC5qb2luKGJhc2VQYXRoIHx8IEtOT1dMRURHRV9CQVNFX1BBVEgsIFwiY3VzdG9tXCIpO1xuXG4gIHRyeSB7XG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGN1c3RvbVBhdGgpKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgcmV0dXJuIGZzXG4gICAgICAucmVhZGRpclN5bmMoY3VzdG9tUGF0aClcbiAgICAgIC5maWx0ZXIoKGZpbGUpID0+IGZpbGUuZW5kc1dpdGgoXCIuanNvblwiKSlcbiAgICAgIC5tYXAoKGZpbGUpID0+IHBhdGguam9pbihcImN1c3RvbVwiLCBmaWxlKSk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBbXTtcbiAgfVxufVxuXG4vLyBFeHBvcnQgZm9yIHVzZSBpbiBNQ1AgdG9vbHNcbmV4cG9ydCBkZWZhdWx0IHtcbiAgbG9hZEtub3dsZWRnZSxcbiAgZ2V0QXZhaWxhYmxlSnVyaXNkaWN0aW9ucyxcbiAgZ2V0Q3VzdG9tS25vd2xlZGdlRmlsZXMsXG59O1xuIl19