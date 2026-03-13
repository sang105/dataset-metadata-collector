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
                linkage: { ...fresh.linkage, ...(action.payload.linkage ?? {}) },
                structuralMetadata:  { ...fresh.structuralMetadata, ...(action.payload.structuralMetadata  ?? {}) },
                observations: action.payload.observations ?? fresh.observations,
                demographicFrequency:{
                    age: action.payload.demographicFrequency?.age ?? fresh.demographicFrequency.age,
                    ethnicity:action.payload.demographicFrequency?.ethnicity ?? fresh.demographicFrequency.ethnicity,
                    disease: action.payload.demographicFrequency?.disease ?? fresh.demographicFrequency.disease,
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

        case "RESET": 
            return createInitialState()

        default:
            return state
    }
}