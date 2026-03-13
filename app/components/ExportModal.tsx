// app/components/layout/ExportModal.tsx
import { useFormNav } from "app/context/FormContext";
import { SECTIONS } from "app/constants/schema";

interface ExportModalProps {
  onConfirm: () => void;
  onClose:   () => void;
}

interface ResetModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

export function ExportModal({ onConfirm, onClose }: ExportModalProps) {
  const { progressMap, overallPct } = useFormNav();
  const completedCount = Object.values(progressMap).filter(p => p.isComplete).length;

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(2,8,18,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300 }}
      onClick={onClose}
    >
      <div
        style={{ background: "#070F1C", border: "1px solid #0F2744", borderRadius: 16, padding: 36, maxWidth: 440, width: "90%", animation: "fadeSlideIn 0.25s ease" }}
        onClick={e => e.stopPropagation()}
      >
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F1F5F9", marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>Export Dataset Metadata</h2>
        <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.7, marginBottom: 22 }}>
          Your metadata will be exported as an HDR UK v4.0.0-compatible JSON file for your Data Manager. 
          {/* You can validate it using the{" "}
          <a href="https://hdruk.github.io/schemata/HDRUK/4.0.0/" target="_blank" rel="noreferrer" style={{ color: "#7DD3FC", textDecoration: "none" }}>HDR UK schemata</a>. */}
        </p>

        {/* Progress summary */}
        <div style={{ background: "#0B1629", borderRadius: 10, padding: "14px 16px", marginBottom: 22, border: "1px solid #1E2D45" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 11, color: "#64748B" }}>Sections completed</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#E2E8F0" }}>{completedCount} / {SECTIONS.length}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 11, color: "#64748B" }}>Overall completion</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: overallPct === 100 ? "#10B981" : "#0EA5E9" }}>{overallPct}%</span>
          </div>
          {/* Section pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {SECTIONS.map(s => {
              const p = progressMap[s.id];
              return (
                <span key={s.id} style={{ fontSize: 10, padding: "2px 9px", borderRadius: 20, border: `1px solid ${p?.isComplete ? "#10B981" : "#1E2D45"}`, color: p?.isComplete ? "#10B981" : "#334155", fontFamily: "'DM Mono', monospace" }}>
                  {s.short} {p?.pct || 0}%
                </span>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "10px", background: "#0B1629", border: "1px solid #1E2D45", color: "#94A3B8", cursor: "pointer", borderRadius: 8, fontSize: 12 }}>Cancel</button>
          <button onClick={onConfirm} style={{ flex: 2, padding: "10px", background: "linear-gradient(135deg,#0EA5E9,#6366F1)", border: "none", color: "#fff", cursor: "pointer", borderRadius: 8, fontSize: 13, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
            ↓ Download JSON
          </button>
        </div>
      </div>
    </div>
  );
}


export function ResetModal({ onConfirm, onClose }: ResetModalProps) {
  const { progressMap, overallPct } = useFormNav();
  const completedCount = Object.values(progressMap).filter(p => p.isComplete).length;

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(2,8,18,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300 }}
      onClick={onClose}
    >
      <div
        style={{ background: "#070F1C", border: "1px solid #0F2744", borderRadius: 16, padding: 36, maxWidth: 440, width: "90%", animation: "fadeSlideIn 0.25s ease" }}
        onClick={e => e.stopPropagation()}
      >
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F1F5F9", marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>Reset Dataset Metadata Form</h2>
        <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.7, marginBottom: 22 }}>
          Your metadata will all be lost and a blank form will be rendered.
        </p>

        {/* Progress summary */}
        <div style={{ background: "#0B1629", borderRadius: 10, padding: "14px 16px", marginBottom: 22, border: "1px solid #1E2D45" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 11, color: "#64748B" }}>Sections completed</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#E2E8F0" }}>{completedCount} / {SECTIONS.length}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 11, color: "#64748B" }}>Overall completion</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: overallPct === 100 ? "#10B981" : "#0EA5E9" }}>{overallPct}%</span>
          </div>
          {/* Section pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {SECTIONS.map(s => {
              const p = progressMap[s.id];
              return (
                <span key={s.id} style={{ fontSize: 10, padding: "2px 9px", borderRadius: 20, border: `1px solid ${p?.isComplete ? "#10B981" : "#1E2D45"}`, color: p?.isComplete ? "#10B981" : "#334155", fontFamily: "'DM Mono', monospace" }}>
                  {s.short} {p?.pct || 0}%
                </span>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "10px", background: "#0B1629", border: "1px solid #1E2D45", color: "#94A3B8", cursor: "pointer", borderRadius: 8, fontSize: 12 }}>Cancel</button>
          <button onClick={onConfirm} style={{ flex: 2, padding: "10px", background: "linear-gradient(135deg,#0EA5E9,#6366F1)", border: "none", color: "#fff", cursor: "pointer", borderRadius: 8, fontSize: 13, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
            Reset Form
          </button>
        </div>
      </div>
    </div>
  );
}
