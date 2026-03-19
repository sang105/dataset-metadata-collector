import { OPTIONS } from "~/constants/schema";
import { useForm } from "~/context/FormContext";
import { SectionShell, S } from "~/ui/FormControls";

export function ObservationFormLayout() {

    const { state, dispatch } = useForm()    
    const obs = state.observations    

    return (
    <SectionShell label="Observations" color="#6366F1">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={S.subheading}>Observations ({obs.length})</span>
        <button onClick={() => {            
            dispatch({ type: "ADD_OBSERVATION" })
        } 
        } style={{ background: "#6366F111", border: "1px solid #6366F133", color: "#6366F1", borderRadius: 7, padding: "5px 14px", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            + Add Observation
        </button>
      </div>

      {obs.length === 0 && (
        <div style={{ border: "1px dashed #1E2D45", borderRadius: 10, padding: "28px 20px", textAlign: "center", color: "#334155", fontSize: 12 }}>
          No observations yet. Add statistical summaries about your dataset (e.g. number of persons, events, or findings).
        </div>
      )}

      {obs.map((o, i) => {
        const upd = (field: string, value: string) => dispatch({ type: "UPDATE_OBSERVATION", id: o.id, field, value });
        return (
          <div key={o.id} style={{ border: "1px solid #FFF", borderRadius: 10, padding: 16, marginBottom: 14, background: "#FFF" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: "#FFF", fontFamily: "'DM Sans', sans-serif" }}>Observation #{i + 1}</span>
              <button onClick={() => dispatch({ type: "REMOVE_OBSERVATION", id: o.id })} style={S.removeBtn}>Remove</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={S.label}>Dataset Volume Measure</label>
                <select value={o.observedNode} onChange={e => upd("observedNode", e.target.value)} style={{ ...S.input, cursor: "pointer" }} required>
                  <option value="">Select…</option>
                  {OPTIONS.observedNode.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label style={S.label}>Measured Property</label>
                <select value={o.measuredProperty} onChange={e => upd("measuredProperty", e.target.value)} style={{ ...S.input, cursor: "pointer" }} required>
                  <option value="">Select…</option>
                  {OPTIONS.measuredProperty.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label style={S.label}>Measured Value</label>
                <input type="number" value={o.measuredValue} onChange={e => upd("measuredValue", e.target.value)} placeholder="1000000" style={S.input} required />
              </div>
              <div>
                <label style={S.label}>Observation Date</label>
                <input type="date" value={o.observationDate} onChange={e => upd("observationDate", e.target.value)} style={S.input} required />
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <label style={S.label}>Disambiguating Description</label>
              <input value={o.disambiguatingDescription} onChange={e => upd("disambiguatingDescription", e.target.value)} placeholder="Additional context for this observation…" style={S.input} />
            </div>
          </div>
        );
      })}
    </SectionShell>
    )
}