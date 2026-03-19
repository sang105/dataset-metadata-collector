import { useForm } from "~/context/FormContext";
import { S } from "./FormControls";

type DemoCategory = "age" | "ethnicity" | "disease"

interface DemoSectionProps {
    category: DemoCategory;
    title: string;
    color: string;
    fields: { key: string; placeholder: string; type?: string; options?: {} }[];
}

export function DemoSection({ category, title, color, fields }: DemoSectionProps) {
  const { state, dispatch } = useForm() ;
  const entries = state.demographicFrequency[category] as unknown as Record<string, string>[];

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 3, height: 12, background: color, borderRadius: 2 }} />
          <span style={S.subheading}>{title} ({entries.length})</span>
        </div>
        <button
          onClick={() => dispatch({ type: "ADD_DEMO", category })}
          style={{ background: "#F9731611", border: `1px solid ${color}44`, color, borderRadius: 6, padding: "4px 12px", fontSize: 11, cursor: "pointer", fontFamily: "'DM Mono', monospace" }}
        >
          + Add
        </button>
      </div>

      {entries.length === 0 && (
        <p style={{ fontSize: 12, color: "#334155", fontStyle: "italic" }}>No {title.toLowerCase()} data yet.</p>
      )}

      {entries.map((entry, i) => (
        <div key={entry.id} style={{ display: "grid", gridTemplateColumns: `${fields.map(() => "1fr").join(" ")} 36px`, gap: 8, marginBottom: 6, alignItems: "end" }}>
          {fields.map(f => {
            const options = f.options
            return (
            <div key={f.key}>
              {i === 0 && <label style={{ ...S.label, marginBottom: 4 }}>{f.placeholder}</label>}
              {f.type === "select" ? (
                <select 
                    name="" 
                    id=""
                    value={entry[f.key] || ""}
                    onChange={ev => dispatch({ type: "UPDATE_DEMO", category, id: Number(entry.id), field: f.key, value: ev.target.value })}
                    style={{ ...S.input, fontSize: 12 }}
                    required
                >
                    <option
                        value=""
                        disabled
                    >
                        {f.placeholder}
                    </option>
                    {options?.map(o => <option key={o} value={o}>{o}</option>  )}
                </select>
              ) : (
              <input
                type={f.type || "text"}
                value={entry[f.key] || ""}
                onChange={ev => dispatch({ type: "UPDATE_DEMO", category, id: Number(entry.id), field: f.key, value: ev.target.value })}
                placeholder={f.placeholder}
                style={{ ...S.input, fontSize: 12 }}
                required
              />
              )}
            </div>
          )})}
          <div style={{ paddingBottom: i === 0 ? 0 : 0 }}>
            {i === 0 && <div style={{ height: 22 }} />}
            <button onClick={() => dispatch({ type: "REMOVE_DEMO", category, id: Number(entry.id) })} style={{ ...S.removeBtn, padding: "6px 10px" }}>×</button>
          </div>
        </div>
      ))}
    </div>
  );
}