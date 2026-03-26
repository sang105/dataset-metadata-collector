import type { FormState, ProgressMap, SectionProgress } from "~/types/form";

const TRACKED: Record<string, string[]> = {
    summary: ["summary.title","summary.abstract","summary.contactPoint","summary.populationSize", "summary.dataCustodian.name","summary.dataCustodian.contactPoint"],
    documentation: ["documentation.description"],
    coverage: ["coverage.spatial"],
    provenance: ["provenance.origin.datasetType", "provenance.temporal.publishingFrequency","provenance.temporal.startDate", "provenance.temporal.timeLag"],
    accessibility: ["accessibility.access.accessRights","accessibility.formatAndStandards.vocabularyEncodingScheme", "accessibility.formatAndStandards.language", "accessibility.formatAndStandards.format", "accessibility.formatAndStandards.conformsTo"],
    linkage: ["linkage.investigations","linkage.tools"],
    structuralMetadata: ["_tables"],
}

const OBSERVATION_REQUIRED_FIELDS = [
    "observedNode",
    "measuredValue",
    "observationDate",
    "measuredProperty"
]

const DEMOGRAPHICFREQUENCY_AGE_REQUIRED_FIELDS = [
    "bin",
    "count"
]
const DEMOGRAPHICFREQUENCY_ETHNICITY_REQUIRED_FIELDS = [
    "bin",
    "count"
]
const DEMOGRAPHICFREQUENCY_DISEASE_REQUIRED_FIELDS = [
    "diseaseCode",
    "diseaseCodeVocabulary",
    "count"
]


function getVal(state: FormState, path: string): unknown {
    if (path === "_tables") return state.structuralMetadata.tables.length > 0 ? "yes" : "";
    const keys = path.split(".");
    let cur: unknown = state;
    for (const k of keys) cur = (cur as Record<string, unknown>)?.[k];
    return cur
}

function isFilled(v: unknown): boolean {
    if (v === null || v === undefined || v === "") return false;
    if (Array.isArray(v)) return v.length > 0;
    return true
}

function computeObservationProgress(state: FormState): SectionProgress {
    const obs = state.observations ?? []

    if (obs.length === 0) {
        return { total: 0, filled: 0, pct: 0, isComplete: false }
    }

    const total = obs.length * OBSERVATION_REQUIRED_FIELDS.length;
    const filled = obs.reduce((sum, entry) => {
        const filledInEntry = OBSERVATION_REQUIRED_FIELDS.filter(
            field => isFilled((entry as unknown as Record<string, unknown>)[field])
        ).length
        return sum + filledInEntry
    }, 0)

    const pct = Math.round((filled / total) * 100)
    return { total, filled, pct, isComplete: pct === 100}
}

function computeDemographicProgress(state: FormState, variable: string, required_fields: string[]): SectionProgress {
    const data = state.demographicFrequency[variable as keyof typeof state.demographicFrequency] ?? []

    if (data.length === 0) {
        return { total: 0, filled: 0, pct: 0, isComplete: false}
    }
    
    const total = data.length * required_fields.length;
    const filled = data.reduce((sum, entry) => {
        const filledInEntry = required_fields.filter(
            field => isFilled((entry as unknown as Record<string, unknown>)[field])
        ).length        
        return sum + filledInEntry
    }, 0)

    const pct = Math.round(((filled / total) * 100) / required_fields.length)     

    return { total, filled, pct, isComplete: pct === pct}
}

export function computeProgressMap(state: FormState): ProgressMap {
    if (!state?.summary) return {}

    const map: ProgressMap = {}
    for (const [sectionId, paths] of Object.entries(TRACKED)) {
        const total = paths.length;       
        const filled = paths.filter(p => isFilled(getVal(state, p))).length;       
        const pct = total === 0 ? 0 : Math.round((filled / total) * 100)
        map[sectionId] = { total, filled, pct, isComplete: pct === 100 } satisfies SectionProgress;
    }

    // Observations being observed here
    map["observations"] = computeObservationProgress(state)

    // Demographic Frequency being observed here
    const demographicAge = computeDemographicProgress(state, "age", DEMOGRAPHICFREQUENCY_AGE_REQUIRED_FIELDS)
    const demographicEthnicity = computeDemographicProgress(state, "ethnicity", DEMOGRAPHICFREQUENCY_ETHNICITY_REQUIRED_FIELDS)
    const demographicDisease = computeDemographicProgress(state, "disease", DEMOGRAPHICFREQUENCY_DISEASE_REQUIRED_FIELDS)

    const totalDemographic = demographicAge.total + demographicEthnicity.total + demographicDisease.total    
    const filledDemographic = demographicAge.filled + demographicEthnicity.filled + demographicDisease.filled
    const pctDemographic = totalDemographic === 0 ? 0 : Math.round((filledDemographic / totalDemographic) * 100)
    
    map["demographicFrequency.age"] = demographicAge 
    map["demographicFrequency.ethnicity"] = demographicEthnicity
    map["demographicFrequency.disease"] = demographicDisease
    map["demographicFrequency"] = { total: totalDemographic, filled: filledDemographic, pct: pctDemographic, isComplete: pctDemographic === 100}

    return map;
}

export function computeOverallPct(map: ProgressMap): number {
    const vals = Object.values(map);
    
    if (vals.length === 0) return 0;
    return Math.round(vals.reduce((s, v) => s + v.pct, 0) / vals.length)
}