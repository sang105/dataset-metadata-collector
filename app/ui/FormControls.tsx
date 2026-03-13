// app/components/ui/FormControls.tsx
// Reusable low-level input components used by every section form.

import { useField } from "app/context/FormContext";
import { useEffect, useState } from "react";

// ── Shared style tokens ───────────────────────────────────────
export const S = {
  input: {
    width: "100%", padding: "9px 12px",
    background: "#0B1629", border: "1px solid #1E2D45",
    borderRadius: 8, color: "#E2E8F0", fontSize: 13,
    outline: "none", boxSizing: "border-box" as const,
    fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.2s",
  },
  label: {
    display: "block" as const, fontSize: 10, color: "#0B1629",
    marginBottom: 6, textTransform: "uppercase" as const,
    letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace",
  },
  group: { marginBottom: 22 },
  required: { color: "#F87171", marginLeft: 3 },
  addBtn: {
    background: "none", border: "1px dashed #1E2D45", color: "#475569",
    cursor: "pointer", borderRadius: 8, padding: "6px 16px",
    fontSize: 12, fontFamily: "'DM Mono', monospace",
  },
  removeBtn: {
    background: "#1A0A0A", border: "1px solid #7F1D1D", color: "#F87171",
    cursor: "pointer", borderRadius: 6, padding: "4px 10px",
    fontSize: 14, flexShrink: 0 as const,
  },
  subheading: {
    fontSize: 10, color: "#334155", textTransform: "uppercase" as const,
    letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace",
    marginBottom: 10, marginTop: 6,
  },
};

// ── TagInput ──────────────────────────────────────────────────
interface TagInputProps {
  value: string[];
  onChange: (v: string[]) => void;
  onFocus?: () => void;
  placeholder?: string;
}

export function TagInput({ value = [], onChange, onFocus, placeholder }: TagInputProps) {
        const [inp, setInp] = useState("");
        const add = () => {
          const t = inp.trim();
          if (t && !value.includes(t)) { onChange([...value, t]); setInp(""); }
        };
        return (
          <div style={{ border: "1px solid #1E2D45", borderRadius: 8, background: "#0B1629", padding: "8px 12px" }} onFocus={onFocus}>
            {value.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8 }}>
                {value.map(t => (
                  <span key={t} style={{ background: "#0F2744", color: "#7DD3FC", padding: "2px 10px", borderRadius: 20, fontSize: 11, display: "flex", alignItems: "center", gap: 5 }}>
                    {t}
                    <button onClick={() => onChange(value.filter(x => x !== t))} style={{ background: "none", border: "none", color: "#7DD3FC", cursor: "pointer", padding: 0, lineHeight: 1 }}>×</button>
                  </span>
                ))}
              </div>
            )}
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={inp}
                onChange={e => setInp(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
                placeholder={placeholder || "Type and press Enter…"}
                style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#CBD5E1", fontSize: 12, fontFamily: "'DM Mono', monospace" }}
              />
              <button onClick={add} style={{ background: "#0F2744", border: "none", color: "#7DD3FC", cursor: "pointer", borderRadius: 6, padding: "2px 10px", fontSize: 11 }}>+ Add</button>
            </div>
          </div>
        );
}

// ── MultiSelect (pill toggles) ────────────────────────────────
interface MultiSelectProps {
  value: string[];
  onChange: (v: string[]) => void;
  options: readonly string[];
  onFocus?: () => void;
}

export function MultiSelect({ value = [], onChange, options, onFocus }: MultiSelectProps) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }} onFocus={onFocus} tabIndex={-1}>
      {options.map(o => {
        const sel = value.includes(o);
        return (
          <button key={o} type="button" onClick={() => onChange(sel ? value.filter(v => v !== o) : [...value, o])}
            style={{ padding: "4px 12px", borderRadius: 20, fontSize: 11, cursor: "pointer", border: sel ? "1px solid #3B82F6" : "1px solid #1E2D45", background: sel ? "#0F2744" : "#0B1629", color: sel ? "#7DD3FC" : "#D3D3D3", transition: "all 0.15s", fontFamily: "'DM Sans', sans-serif" }}>
            {o}
          </button>
        );
      })}
    </div>
  );
}

// ── Field — wires directly to FormContext via useField ─────────
interface FieldProps {
  path: string;
  label: string;
  type?: "text" | "email" | "url" | "number" | "date" | "textarea" | "select" | "multiselect" | "tags";
  options?: readonly string[];
  placeholder?: string;
  rows?: number;
  required?: boolean;
  maxLength?: number;
  hint?: string; // optional inline hint
}

export function Field({ path, label, type = "text", options = [], placeholder, rows = 4, required, maxLength, hint }: FieldProps) {
  const { value, onChange, onFocus, onBlur } = useField(path);
  const val = (value ?? (type === "multiselect" || type === "tags" ? [] : "")) as string | string[];

  const inputProps = {
    style: S.input,
    onFocus,
    onBlur,
    placeholder,
    ...(maxLength ? { maxLength } : {}),
  };

  return (
    <div style={S.group}>
      <label style={S.label}>
        {label}
        {required && <span style={S.required}>*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          value={val as string}
          onChange={e => onChange(e.target.value)}
          rows={rows}
          {...inputProps}
          style={{ ...S.input, resize: "vertical", lineHeight: 1.6 }}
        />
      ) : type === "select" ? (
        <select
          value={val as string}
          onChange={e => onChange(e.target.value)}
          {...inputProps}
          style={{ ...S.input, cursor: "pointer" }}
        >
          <option value="">Select…</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === "multiselect" ? (
        <MultiSelect
          value={val as string[]}
          onChange={onChange as (v: string[]) => void}
          options={options}
          onFocus={onFocus}
        />
      ) : type === "tags" ? (
        <TagInput
          value={val as string[]}
          onChange={onChange as (v: string[]) => void}
          onFocus={onFocus}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          value={val as string}
          onChange={e => onChange(e.target.value)}
          {...inputProps}
        />
      )}

      {hint && <p style={{ fontSize: 11, color: "#0B1629", marginTop: 5 }}>{hint}</p>}
    </div>
  );
}

// ── SectionShell — consistent section wrapper ─────────────────
interface SectionShellProps {
  icon: string;
  label: string;
  color: string;
  children: React.ReactNode;
}

export function SectionShell({ icon, label, color, children }: SectionShellProps) {
  return (
    <div style={{ paddingBottom: 60 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <span style={{ fontSize: 20, color }}>{icon}</span>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0B1629", fontFamily: "'DM Sans', sans-serif", margin: 0 }}>{label}</h1>
      </div>
      <div style={{ height: 1, background: "#0D1B2E", marginBottom: 28 }} />
      {children}
    </div>
  );
}

// ── SubSection divider ────────────────────────────────────────
export function SubSection({ title, color = "#1E2D45" }: { title: string; color?: string }) {
  return (
    <div style={{ margin: "24px 0 16px", display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 3, height: 14, background: color, borderRadius: 2 }} />
      <span style={{ fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace" }}>{title}</span>
    </div>
  );
}

// ── Grid helper ───────────────────────────────────────────────
export function Grid2({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>{children}</div>;
}
