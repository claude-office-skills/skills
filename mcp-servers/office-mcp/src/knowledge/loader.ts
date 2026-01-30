/**
 * Knowledge Loader for Office MCP
 * 
 * Supports:
 * - Loading knowledge from JSON files
 * - Inheritance via "extends" property
 * - Merging base + custom knowledge
 * - Override mechanism for customization
 */

import * as fs from "fs";
import * as path from "path";

// Type definitions
export interface RiskPattern {
  id: string;
  name: string;
  name_zh?: string;
  severity: "low" | "medium" | "high" | "critical";
  category?: string;
  keywords: string[];
  keywords_zh?: string[];
  description: string;
  description_zh?: string;
  recommendation: string;
  recommendation_zh?: string;
  legal_references?: string[];
}

export interface CompletenessItem {
  id: string;
  name: string;
  name_zh?: string;
  category?: string;
  required: boolean;
  description?: string;
  check_for?: string[];
  check_for_zh?: string[];
}

export interface JurisdictionKnowledge {
  jurisdiction: string;
  name: string;
  name_zh?: string;
  description?: string;
  employment_law?: Record<string, unknown>;
  contract_requirements?: Record<string, unknown>;
  key_laws?: Array<{ code: string; name: string; description?: string }>;
  non_compete_rules?: Record<string, unknown>;
}

export interface KnowledgeFile {
  version: string;
  description?: string;
  author?: string;
  extends?: string;
  jurisdiction?: string;
  risk_patterns?: Record<string, RiskPattern>;
  overrides?: Record<string, Partial<RiskPattern>>;
  additional_patterns?: Record<string, RiskPattern>;
  essential_elements?: CompletenessItem[];
  important_clauses?: CompletenessItem[];
  execution_elements?: CompletenessItem[];
  completeness_additions?: CompletenessItem[];
}

export interface LoadedKnowledge {
  riskPatterns: Record<string, RiskPattern>;
  completenessItems: CompletenessItem[];
  jurisdiction?: JurisdictionKnowledge;
  metadata: {
    loadedFiles: string[];
    version: string;
  };
}

// Default paths
const KNOWLEDGE_BASE_PATH = path.join(__dirname, "../../knowledge");

/**
 * Load and parse a JSON knowledge file
 */
function loadJsonFile<T>(filePath: string): T | null {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`Knowledge file not found: ${filePath}`);
      return null;
    }
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error loading knowledge file ${filePath}:`, error);
    return null;
  }
}

/**
 * Resolve relative path in extends property
 */
function resolveExtendsPath(currentFile: string, extendsPath: string): string {
  const currentDir = path.dirname(currentFile);
  return path.resolve(currentDir, extendsPath);
}

/**
 * Deep merge two objects
 */
function deepMerge<T>(base: T, override: Partial<T>): T {
  const result = { ...base } as T;
  
  for (const key of Object.keys(override) as Array<keyof T>) {
    const overrideValue = override[key];
    const baseValue = result[key];
    
    if (
      overrideValue !== undefined &&
      typeof overrideValue === "object" &&
      overrideValue !== null &&
      !Array.isArray(overrideValue) &&
      typeof baseValue === "object" &&
      baseValue !== null &&
      !Array.isArray(baseValue)
    ) {
      result[key] = deepMerge(baseValue, overrideValue as Partial<T[keyof T]>) as T[keyof T];
    } else if (overrideValue !== undefined) {
      result[key] = overrideValue as T[keyof T];
    }
  }
  
  return result;
}

/**
 * Load risk patterns from a file, handling inheritance
 */
function loadRiskPatterns(
  filePath: string,
  loadedFiles: Set<string> = new Set()
): Record<string, RiskPattern> {
  // Prevent circular dependencies
  if (loadedFiles.has(filePath)) {
    return {};
  }
  loadedFiles.add(filePath);

  const file = loadJsonFile<KnowledgeFile>(filePath);
  if (!file) {
    return {};
  }

  let patterns: Record<string, RiskPattern> = {};

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
function loadCompletenessItems(basePath: string): CompletenessItem[] {
  const filePath = path.join(basePath, "base", "completeness.json");
  const file = loadJsonFile<KnowledgeFile>(filePath);
  
  if (!file) {
    return [];
  }

  const items: CompletenessItem[] = [];
  
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
function loadJurisdiction(
  basePath: string,
  jurisdiction: string
): JurisdictionKnowledge | null {
  const filePath = path.join(basePath, "base", "jurisdictions", `${jurisdiction}.json`);
  return loadJsonFile<JurisdictionKnowledge>(filePath);
}

/**
 * Main function to load all knowledge
 */
export function loadKnowledge(options: {
  basePath?: string;
  customFiles?: string[];
  jurisdiction?: string;
}): LoadedKnowledge {
  const basePath = options.basePath || KNOWLEDGE_BASE_PATH;
  const loadedFiles: string[] = [];

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
  let jurisdiction: JurisdictionKnowledge | undefined;
  if (options.jurisdiction) {
    const loaded = loadJurisdiction(basePath, options.jurisdiction);
    if (loaded) {
      jurisdiction = loaded;
      loadedFiles.push(
        path.join(basePath, "base", "jurisdictions", `${options.jurisdiction}.json`)
      );
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
export function getAvailableJurisdictions(basePath?: string): string[] {
  const jurisdictionsPath = path.join(
    basePath || KNOWLEDGE_BASE_PATH,
    "base",
    "jurisdictions"
  );

  try {
    if (!fs.existsSync(jurisdictionsPath)) {
      return [];
    }

    return fs
      .readdirSync(jurisdictionsPath)
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.replace(".json", ""));
  } catch {
    return [];
  }
}

/**
 * Scan for custom knowledge files
 */
export function getCustomKnowledgeFiles(basePath?: string): string[] {
  const customPath = path.join(basePath || KNOWLEDGE_BASE_PATH, "custom");

  try {
    if (!fs.existsSync(customPath)) {
      return [];
    }

    return fs
      .readdirSync(customPath)
      .filter((file) => file.endsWith(".json"))
      .map((file) => path.join("custom", file));
  } catch {
    return [];
  }
}

// Export for use in MCP tools
export default {
  loadKnowledge,
  getAvailableJurisdictions,
  getCustomKnowledgeFiles,
};
