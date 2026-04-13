import { useForm } from "~/context/FormContext";
import { S } from "~/ui/FormControls";

type LinkageCategory = "derivedFrom" | "isPartOf" | "linkableDatasets" | "similarToDatasets"

interface LinkageSectionProps {
  category: LinkageCategory;
  color: string;
  title: string;
  fields: { key: string; placeholder: string; type?: string; }[]
}

export function LinkageSection({ category, fields, color, title }: LinkageSectionProps) {
    const { state, dispatch } = useForm()
    const entries = state.enrichmentAndLinkage[category] as unknown as Record<string, string>[]    

    return (
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 3, height: 12, background: color, borderRadius: 2 }} />
            <span style={S.subheading}>{title}({entries.length})</span>
          </div>
          <button 
            onClick={() => dispatch({ type: "ADD_LINKAGE_OPTS", category })} 
            style={{ background: "#EC489911", border: `1px solid ${color}55`, color: "#EC4899", borderRadius: 7, padding: "5px 14px", fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', san-serif" }}>
            + Add
          </button>
        </div>

        {entries.length === 0 && (
          <p style={{ fontSize: 12, color: "#334155", fontStyle: "italic"}}>No {title.toLocaleLowerCase()} data yet.</p>
        )}

        {entries.map((e, i) => (
            <div key={e.id} style={{ display: "grid", gridTemplateColumns: `${fields.map(() => "1fr").join(" ")} 36px`, gap: 8, marginBottom: 6, alignItems: "end"}}>
              {fields.map(f => (
                  <div key={f.key}>
                    {i === 0 && <label style={{ ...S.label, marginBottom: 4 }}>{f.placeholder}</label>}
                    <input
                      type={f.type || "text"}
                      value={e[f.key] || ""}
                      onChange={ev => dispatch({ type: "UPDATE_LINKAGE_OPTS", category, id: Number(e.id), field: f.key, value: ev.target.value })}
                      placeholder={f.placeholder}
                      style={{ ...S.input, fontSize: 12 }}
                    />
                  </div>
                )
              )}
              <div style={{ paddingBottom: i === 0 ? 0 : 0}}>
                {i === 0 && <div style={{ height: 22 }} />}
                <button onClick={() => dispatch({ type: "REMOVE_LINKAGE_OPTS", category, id: Number(e.id) })} style={{ ...S.removeBtn, padding: "6px 10px" }}>×</button>
              </div>
            </div>
          )
        )}
      </div>
    )
  }