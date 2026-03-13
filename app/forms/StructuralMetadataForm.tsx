import type React from "react";
import { useForm } from "~/context/FormContext";
import type { FormAction } from "~/types/form";
import { Field, SectionShell, S } from "~/ui/FormControls";

function dispatch_helper(dispatch: React.Dispatch<FormAction>) {
    return {
        addTable: () => dispatch({ type: "ADD_TABLE"}),
        updateTable: (id: number, field: string, value: string) => dispatch({ type: "UPDATE_TABLE", id, field, value }),
        removeTable: (id: number) => dispatch({ type: "REMOVE_TABLE", id}),
        addColumn: (tableId: number) => dispatch({ type: "ADD_COLUMN", tableId}),
        updateColumn: (tableId: number, colId: number, field: string, value: string | boolean) => dispatch({ type: "UPDATE_COLUMN", tableId, colId, field, value}),
        removeColumn: (tableId: number, colId: number) => dispatch({ type: "REMOVE_COLUMN", tableId, colId}),
    }
}


export function StructuralMetadataFormLayout() {
    const { state, dispatch } = useForm()
    const { tables } = state.structuralMetadata
    const h = dispatch_helper(dispatch)

    const iSt = { ...S.input, fontSize: 12}

    return (
    <SectionShell icon="◓" label="Structural Metadata" color="#14B8A6">
      <Field path="structuralMetadata.syntheticDataWebLink" label="Synthetic Data Web Link" type="url" placeholder="https://…" />

      {/* Tables header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={S.subheading}>Tables ({tables.length})</span>
        <button onClick={h.addTable} style={{ background: "#14B8A611", border: "1px solid #14B8A633", color: "#14B8A6", borderRadius: 7, padding: "5px 14px", fontSize: 12, cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>+ Add Table</button>
      </div>

      {tables.length === 0 && (
        <div style={{ border: "1px dashed #1E2D45", borderRadius: 10, padding: "28px 20px", textAlign: "center", color: "#334155", fontSize: 12 }}>
          No tables yet. Click <strong style={{ color: "#14B8A6" }}>+ Add Table</strong> to describe your dataset structure.
        </div>
      )}

      {tables.map(table => (
        <div key={table.id} style={{ border: "1px solid #1E2D45", borderRadius: 10, padding: 16, marginBottom: 14, background: "#070F1C" }}>
          {/* Table header row */}
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <input value={table.name}        onChange={e => h.updateTable(table.id, "name",        e.target.value)} placeholder="Table name"        style={{ ...iSt, flex: 1 }} />
            <input value={table.description} onChange={e => h.updateTable(table.id, "description", e.target.value)} placeholder="Table description" style={{ ...iSt, flex: 2 }} />
            <button onClick={() => h.removeTable(table.id)} style={S.removeBtn} title="Remove table">×</button>
          </div>

          {/* Columns */}
          <div style={{ paddingLeft: 12, borderLeft: "2px solid #0F2744" }}>
            <div style={{ ...S.subheading, marginBottom: 8 }}>Columns ({table.columns.length})</div>

            {/* Column header labels */}
            {table.columns.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 1.6fr 80px 36px", gap: 6, marginBottom: 4 }}>
                {["Name", "Data Type", "Description", "Sensitive", ""].map(h => (
                  <span key={h} style={{ fontSize: 9, color: "#1E2D45", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'DM Mono', monospace" }}>{h}</span>
                ))}
              </div>
            )}

            {table.columns.map(col => (
              <div key={col.id} style={{ display: "grid", gridTemplateColumns: "1fr 100px 1.6fr 80px 36px", gap: 6, marginBottom: 6, alignItems: "center" }}>
                <input value={col.name}        onChange={e => h.updateColumn(table.id, col.id, "name",        e.target.value)} placeholder="column_name"  style={iSt} />
                <input value={col.dataType}    onChange={e => h.updateColumn(table.id, col.id, "dataType",    e.target.value)} placeholder="varchar"       style={iSt} />
                <input value={col.description} onChange={e => h.updateColumn(table.id, col.id, "description", e.target.value)} placeholder="Description"   style={iSt} />
                <label style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#64748B", cursor: "pointer" }}>
                  <input type="checkbox" checked={col.sensitive} onChange={e => h.updateColumn(table.id, col.id, "sensitive", e.target.checked)} style={{ accentColor: "#EF4444" }} />
                  Sensitive
                </label>
                <button onClick={() => h.removeColumn(table.id, col.id)} style={{ ...S.removeBtn, padding: "2px 8px" }}>×</button>
              </div>
            ))}

            <button onClick={() => h.addColumn(table.id)} style={{ ...S.addBtn, marginTop: 6, fontSize: 11 }}>+ Add Column</button>
          </div>
        </div>
      ))}
    </SectionShell> 
    )
}