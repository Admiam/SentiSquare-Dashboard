/**
 * Represents a named entity extracted from a line of text:
 * - id: unique identifier per entity instance
 * - type: category, e.g., "PERSON", "COUNTRY"
 * - matchedText: the substring that was recognized
 * - start/end: character offsets in the source line
 */
export interface Entity {
    id: string;
    type: string;
    matchedText: string;
    start: number;
    end: number;
}

/**
 * Props for the <HighlightByType> component:
 * - line: original sentence
 * - entities: entities to highlight within line
 * - colorMap: mapping from entity type → highlight color
 * - selectedType: current filter (only this type is highlighted)
 * - onSelectType: callback to toggle filtering by type
 */
export interface HighlightProps {
    line: string;
    entities: Entity[];
    colorMap: Record<string, string>;
    selectedType: string | null;
    onSelectType: (type: string | null) => void;
}

/**
 * Props for the EntityCharts component:
 * - chartData: array of { type, value } entries for each entity category
 * - colorMap: mapping from type → display color
 * - selectedType: filter to dim non-selected slices/bars
 * - setSelectedType: callback to update the filter
 */
export interface EntityChartsProps {
    chartData: ChartEntry[];
    colorMap: Record<string, string>;
    selectedType: string | null;
    setSelectedType: (type: string | null) => void;
}

/**
 * Simple type for chart data points:
 * - type: entity category
 * - value: numeric count
 */
export interface ChartEntry {
    type: string;
    value: number;
}
