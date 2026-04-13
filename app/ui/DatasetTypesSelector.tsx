import { useState } from "react";
import { useForm } from "~/context/FormContext";
import type { DatasetType } from "~/types/form";
import { S } from "./FormControls";
import { OPTIONS } from "~/constants/schema";

export function DatasetTypeSelector() {
    const { state, dispatch } = useForm()
    const selected = state.provenance.origin.datasetType

    const [subTypeInputs, setSubTypeInputs] = useState<Record<number, string>>({})

    const toggle = (name: string) => {
        dispatch({type: "TOGGLE_DATASET_TYPE", name })
    }

    const addSubType = (entry: DatasetType) => {
        const val = (subTypeInputs[entry.id] ?? "").trim()
        if (!val) return
        dispatch({ type: "ADD_DATASET_SUBTYPE", id: entry.id, subType: val })
        setSubTypeInputs(prev => ({ ...prev, [entry.id]: "" }))
    }

    const removeSubType = (entry: DatasetType, subType: string) => {
        dispatch({ type: "REMOVE_DATASET_SUBTYPE", id: entry.id, subType })
    }

    const isSelected = (name: string) => selected.some(e => e.name === name)

    return (
        <div style={S.group}>
            <label style={S.label}>Dataset Type <span style={S.required}>*</span></label>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: selected.length > 0 ? 16 : 0}}>
                {OPTIONS.datasetType.map(opt => {
                    const sel = isSelected(opt)
                    return (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => toggle(opt)}
                            style={{
                                padding: "4px 12px", 
                                borderRadius: 20, 
                                fontSize: 12, 
                                cursor: "pointer", 
                                border: sel ? "1px solid #0B1629" : "1px solid #0B1629",
                                background: sel ? "#0B1629" : "#FFF",
                                color: sel ? "#FFF" : "#0B1629",
                                transition: "all 0.15s", 
                                fontFamily: "'DM Sans', sans-serif"
                            }}
                        >
                            {sel && <span style={{ marginRight: 5, fontSize: 12 }}>✓</span>}
                            {opt}
                        </button>
                    )
                })}
            </div>

            {/* Sub-type inputs */}
            {selected.map(entry => (
                <div
                    key={entry.id}
                    style={{
                        border: "1px solid #1E2D45",
                        borderRadius: 10,
                        padding: "12px 14px",
                        marginBottom: 10,
                        background: "#FFF",
                        borderLeft: "3px solid"
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 12, fontWeight: 600, color: ""}}>{entry.name}</span>
                            <span style={{ fontSize: 10, color: "#0B1629", fontFamily: "'DM Sans', sans-serif" }}>
                                {entry.subTypes.length} sub-type{entry.subTypes.length !== 1 ? "s" : ""}
                            </span>
                        </div>
                        <button
                            onClick={() => toggle(entry.name)}
                            title="Remove this dataset type"
                            style={{ background: "none", border: "none", color: "#0B1629", cursor: "pointer", fontSize: 16, lineHeight: 1, padding: "0 2px" }}
                        >
                           × 
                        </button>
                    </div>

                    {entry.subTypes.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                            {entry.subTypes.map(st => (
                                <span
                                    key={st}
                                    style={{
                                        background: "#0B1629", color: "#FFF",
                                        padding: "2px 10px", borderRadius: 20, fontSize: 11,
                                        display: "flex", alignItems: "center", gap: 5,
                                        fontFamily: "'DM Sans', sans-serif"
                                    }}
                                >
                                    {st}
                                    <button
                                        onClick={() => removeSubType(entry, st)}
                                        style={{ background: "none", border: "none", color: "#FFF", cursor: "pointer", padding: 0, lineHeight: 1, fontSize: 13}}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Add sub-type input */}
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input 
                            value={subTypeInputs[entry.id] ?? ""}
                            onChange={e => setSubTypeInputs(prev => ({ ...prev, [entry.id]: e.target.value }))}
                            onKeyDown={e => { if (e.key === "Enter") {e.preventDefault(); addSubType(entry) } }}
                            placeholder={`Add a sub-type for ${entry.name} (optional)`}
                            style={{
                                ...S.input,
                                flex: 1,
                                fontSize: 12,
                                background: "#0B162911",
                                color: "#0B1629"
                            }}
                        />

                        <button
                            onClick={() => addSubType(entry)}
                            style={{
                                background: "#0EA5E9", border: "1px solid #0EA5E9",
                                color: "#FFF", cursor: "pointer",
                                borderRadius: 6, padding: "6px 12px",
                                fontSize: 11, fontFamily: "'DM Sans', sans-serif",
                                flexShrink: 0
                            }}
                        >
                            + Add
                        </button>
                    </div>
                    <p style={{ fontSize: 10, color: "#0B1629", marginTop: 6, fontFamily: "'DM Sans', sans-serif"}}>
                        Sub-types are optional, 
                        <span style={{ color: "red"}}> can only be values from the above DATASET TYPE(s)</span>. 
                        Press Enter or click Add.
                    </p>
                </div>
            ))}
        </div>
    )
}