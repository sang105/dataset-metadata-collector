import type { FormAction, FormState } from "~/types/form";
import { createInitialState } from "./initialState";

function setDeep(obj: unknown, path: string, value: unknown): FormState {
    const clone = JSON.parse(JSON.stringify(obj)) as Record<string, unknown>
    const keys = path.split(".");
    let cur = clone as Record<string, unknown>;
    for (let i = 0; i < keys.length - 1; i++) {
        cur = cur[keys[i]] as Record<string, unknown>
    }
    cur[keys[keys.length - 1]] = value;
    return clone as unknown as FormState
}

export function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case "SET_FIELD":
            return setDeep(state, action.path, action.value)

        case "LOAD_DRAFT": {
            const fresh = createInitialState();
            return {
                ...fresh,
                ...action.payload,
                summary: { ...fresh.summary, ...(action.payload.summary ?? {}) },
                documentation: { ...fresh.documentation, ...(action.payload.documentation ?? {})},
                coverage: { ...fresh.coverage, ...(action.payload.coverage ?? {}) },
                provenance:  {
                    origin:   { ...fresh.provenance.origin,   ...(action.payload.provenance?.origin ?? {}) },
                    temporal: { ...fresh.provenance.temporal, ...(action.payload.provenance?.temporal ?? {}) },
                },
                accessibility: {
                usage: { ...fresh.accessibility.usage, ...(action.payload.accessibility?.usage ?? {}) },
                access: { ...fresh.accessibility.access, ...(action.payload.accessibility?.access ?? {}) },
                formatAndStandards:{ ...fresh.accessibility.formatAndStandards, ...(action.payload.accessibility?.formatAndStandards ?? {}) },
                },
                enrichmentAndLinkage: { 
                    // ...fresh.linkage, 
                    // ...(action.payload.linkage ?? {}) 
                    investigations: action.payload.enrichmentAndLinkage?.investigations ?? fresh.enrichmentAndLinkage.investigations,
                    tools: action.payload.enrichmentAndLinkage?.tools ?? fresh.enrichmentAndLinkage.tools,
                    publicationAboutDataset: action.payload.enrichmentAndLinkage?.publicationAboutDataset ?? fresh.enrichmentAndLinkage.publicationAboutDataset,
                    publicationUsingDataset: action.payload.enrichmentAndLinkage?.publicationUsingDataset ?? fresh.enrichmentAndLinkage.publicationUsingDataset,
                    derivedFrom: action.payload.enrichmentAndLinkage?.derivedFrom ?? fresh.enrichmentAndLinkage.derivedFrom,
                    isPartOf: action.payload.enrichmentAndLinkage?.isPartOf ?? fresh.enrichmentAndLinkage.isPartOf,
                    linkableDatasets: action.payload.enrichmentAndLinkage?.linkableDatasets ?? fresh.enrichmentAndLinkage.linkableDatasets,
                    similarToDatasets: action.payload.enrichmentAndLinkage?.similarToDatasets ?? fresh.enrichmentAndLinkage.similarToDatasets,
                },
                structuralMetadata:  { ...fresh.structuralMetadata, ...(action.payload.structuralMetadata  ?? {}) },
                observations: action.payload.observations ?? fresh.observations,
                demographicFrequency:{
                    age: action.payload.demographicFrequency?.age ?? fresh.demographicFrequency.age,
                    ethnicity:action.payload.demographicFrequency?.ethnicity ?? fresh.demographicFrequency.ethnicity,
                    disease: action.payload.demographicFrequency?.disease ?? fresh.demographicFrequency.disease,
                },
                omics: {  ...fresh.omics, ...(action.payload.omics ?? {}) }
            }
        }

        case "ADD_LINKAGE_OPTS": {
            const entry =  { id: Date.now(), identifier_of_dataset: "", title_of_dataset: "", url_of_dataset: ""  }
            return {                
                ...state,
                enrichmentAndLinkage: {
                    ...state.enrichmentAndLinkage,
                    [action.category]: [...state.enrichmentAndLinkage[action.category], entry]
                }
            }
        }

        case "UPDATE_LINKAGE_OPTS": {
            return {
                ...state,
                enrichmentAndLinkage: {
                    ...state.enrichmentAndLinkage,
                    [action.category]: (state.enrichmentAndLinkage[action.category] as { id: number}[]).map((e) =>
                        e.id === action.id ? { ...e, [action.field]: action.value } : e
                    )
                }
            }
        }

        case "REMOVE_LINKAGE_OPTS": {
            return {
                ...state,
                enrichmentAndLinkage: {
                    ...state.enrichmentAndLinkage,
                    [action.category]: (state.enrichmentAndLinkage[action.category] as { id: number }[]).filter(
                        (e) => e.id !== action.id
                    )
                }
            }
        }

        case "ADD_OBSERVATION":
            return {
                ...state,
                observations: [...state.observations, {
                    id: Date.now(), observedNode: "", measuredValue: "",
                    disambiguatingDescription: "", observationDate: "", measuredProperty: ""
                }]
            }
        
        case "REMOVE_OBSERVATION": 
            return { ...state, observations: state.observations.filter(ob => ob.id !== action.id) }

        case "UPDATE_OBSERVATION":
            return {
                ...state,
                observations: state.observations.map(ob =>
                    ob.id === action.id ? { ...ob, [action.field]: action.value } : ob
                )
            }
        
            case "ADD_TABLE":
                return {
                    ...state,
                    structuralMetadata: {
                        ...state.structuralMetadata,
                        tables: [...state.structuralMetadata.tables, { id: Date.now(), name: "", description: "", columns: []}]
                    }
                }
            
            case "UPDATE_TABLE":
                return {
                    ...state,
                    structuralMetadata: {
                        ...state.structuralMetadata,
                        tables: state.structuralMetadata.tables.map(t => t.id === action.id ? { ...t, [action.field]: action.value} : t)
                    }
                }
            
            case "REMOVE_TABLE":
                return {
                    ...state,
                    structuralMetadata: {
                        ...state.structuralMetadata,
                        tables: state.structuralMetadata.tables.filter(t => t.id !== action.id)
                    }
                }

            case "ADD_COLUMN":
                return {
                    ...state,
                    structuralMetadata: {
                    ...state.structuralMetadata,
                    tables: state.structuralMetadata.tables.map(t =>
                        t.id === action.tableId
                        ? { ...t, columns: [...t.columns, { id: Date.now(), name: "", dataType: "", description: "", sensitive: false }] }
                        : t
                    ),
                    },
                };

            case "UPDATE_COLUMN":
                return {
                    ...state,
                    structuralMetadata: {
                    ...state.structuralMetadata,
                    tables: state.structuralMetadata.tables.map(t =>
                        t.id === action.tableId
                        ? { ...t, columns: t.columns.map(c => c.id === action.colId ? { ...c, [action.field]: action.value } : c) }
                        : t
                    ),
                    },
                };

            case "REMOVE_COLUMN":
                return {
                    ...state,
                    structuralMetadata: {
                    ...state.structuralMetadata,
                    tables: state.structuralMetadata.tables.map(t =>
                        t.id === action.tableId
                        ? { ...t, columns: t.columns.filter(c => c.id !== action.colId) }
                        : t
                    ),
                    },
                };
            
            case "ADD_DEMO": {
            const entry =
                action.category === "disease"
                ? { id: Date.now(), diseaseCode: "", diseaseCodeVocabulary: "", count: "" }
                : { id: Date.now(), bin: "", count: "" };
            return {
                ...state,
                demographicFrequency: {
                ...state.demographicFrequency,
                [action.category]: [...state.demographicFrequency[action.category], entry],
                }
            };
            }

            case "UPDATE_DEMO":
                return {
                    ...state,
                    demographicFrequency: {
                    ...state.demographicFrequency,
                    [action.category]: (state.demographicFrequency[action.category] as { id: number }[]).map((e) =>
                        e.id === action.id ? { ...e, [action.field]: action.value } : e
                    ),
                    },
                };

            case "REMOVE_DEMO":
                return {
                    ...state,
                    demographicFrequency: {
                    ...state.demographicFrequency,
                    [action.category]: (state.demographicFrequency[action.category] as { id: number }[]).filter(
                        (e) => e.id !== action.id
                    ),
                    },
                };

            // TOGGLE_DATASET_TYPE — adds the type if not present, removes it
            // if already selected (same toggle pattern as MultiSelect).
            // Each entry gets a unique id so subType CRUD can target it precisely.
            case "TOGGLE_DATASET_TYPE": {
                const existing = state.provenance.origin.datasetType;
                const alreadySelected = existing.find(e => e.name === action.name)
                const updated = alreadySelected ? existing.filter(e => e.name !== action.name) : [...existing, { id: Date.now(), name: action.name, subTypes: [] }]
                return {
                    ...state,
                    provenance: {
                        ...state.provenance,
                        origin: { ...state.provenance.origin, datasetType: updated }
                    }
                }
            }

            // ADD_DATASET_SUBTYPE
            case "ADD_DATASET_SUBTYPE": {
                const updated = state.provenance.origin.datasetType.map(e =>
                    e.id === action.id && !e.subTypes.includes(action.subType)
                    ? { ...e, subTypes: [...e.subTypes, action.subType]}
                    : e
                )
                return {
                    ...state,
                    provenance: {
                        ...state.provenance,
                        origin: { ...state.provenance.origin, datasetType: updated }
                    }
                }
            }

            // REMOVE_DATASET_SUBTYPE
            case "REMOVE_DATASET_SUBTYPE": {
                const updated = state.provenance.origin.datasetType.map(e => 
                    e.id === action.id
                    ? { ...e, subTypes: e.subTypes.filter(s => s !== action.subType) }
                    : e
                )
                return {
                    ...state,
                    provenance: {
                        ...state.provenance,
                        origin: { ...state.provenance.origin, datasetType: updated }
                    }
                }
            }

        case "RESET": 
            return createInitialState()

        default:
            return state
    }
}