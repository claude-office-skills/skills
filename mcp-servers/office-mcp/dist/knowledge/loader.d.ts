/**
 * Knowledge Loader for Office MCP
 *
 * Supports:
 * - Loading knowledge from JSON files
 * - Inheritance via "extends" property
 * - Merging base + custom knowledge
 * - Override mechanism for customization
 */
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
    key_laws?: Array<{
        code: string;
        name: string;
        description?: string;
    }>;
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
/**
 * Main function to load all knowledge
 */
export declare function loadKnowledge(options: {
    basePath?: string;
    customFiles?: string[];
    jurisdiction?: string;
}): LoadedKnowledge;
/**
 * Get list of available jurisdictions
 */
export declare function getAvailableJurisdictions(basePath?: string): string[];
/**
 * Scan for custom knowledge files
 */
export declare function getCustomKnowledgeFiles(basePath?: string): string[];
declare const _default: {
    loadKnowledge: typeof loadKnowledge;
    getAvailableJurisdictions: typeof getAvailableJurisdictions;
    getCustomKnowledgeFiles: typeof getCustomKnowledgeFiles;
};
export default _default;
