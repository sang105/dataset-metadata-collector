import type { FormState, ProgressMap, SectionProgress } from "~/types/form";

const TRACKED: Record<string, string[]> = {
    summary: ["summary.title","summary.abstract","summary.contactPoint","summary.populationSize", "summary.custodian.name","summary.custodian.contactPoint"],
    documentation: ["documentation.description","documentation.inPipeline"],
    coverage: ["coverage.spatial","coverage.typicalAgeRangeMin","coverage.typicalAgeRangeMax","coverage.followUp"],
    provenance: ["provenance.origin.purpose","provenance.origin.source","provenance.temporal.publishingFrequency","provenance.temporal.startDate"],
    accessibility: ["accessibility.usage.dataUseLimitation","accessibility.access.accessRights","accessibility.access.deliveryLeadTime","accessibility.formatAndStandards.vocabularyEncodingScheme"],
    linkage: ["linkage.investigations","linkage.tools","linkage.publicationAboutDataset","linkage.publicationUsingDataset"],
    structuralMetadata: ["_tables","structuralMetadata.syntheticDataWebLink"],
    observations: ["_observations"],
    demographicFrequency: ["_demoAge","_demoEthnicity"]
}


function getVal(state: FormState, path: string): unknown {
    if (path === "_tables") return state.structuralMetadata.tables.length > 0 ? "yes" : "";
    if (path === "_observations") return state.observations.length > 0 ? "yes" : "";
    if (path === "_demoAge")      return state.demographicFrequency.age.length > 0 ? "yes" : "";
    if (path === "_demoEthnicity")return state.demographicFrequency.ethnicity.length > 0 ? "yes" : "";
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

export function computeProgressMap(state: FormState): ProgressMap {
    const map: ProgressMap = {}
    for (const [sectionId, paths] of Object.entries(TRACKED)) {
        const total = paths.length;
        const filled = paths.filter(p => isFilled(getVal(state, p))).length;
        const pct = total === 0 ? 0 : Math.round((filled / total) * 100)
        map[sectionId] = { total, filled, pct, isComplete: pct === 100 } satisfies SectionProgress;
    }
    return map;
}

export function computeOverallPct(map: ProgressMap): number {
    const vals = Object.values(map);
    if (vals.length === 0) return 0;
    return Math.round(vals.reduce((s, v) => s + v.pct, 0) / vals.length)
}