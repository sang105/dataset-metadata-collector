"use client"
// app/components/layout/GuidePanel.tsx
import { FIELD_GUIDANCE, SECTIONS, SECTION_DESCRIPTIONS } from "~/constants/schema";
import { useGuidance, useFormNav } from "../context/FormContext";
import { useLocation } from "react-router";

export function GuidePanel() {
  const { focusedField } = useGuidance();
  const { progressMap }  = useFormNav();
  const location         = useLocation();

  // Determine active section from current route
  const activeSection = SECTIONS.find(s => location.pathname.substring(1).startsWith(s.route));  
  const meta = focusedField ? FIELD_GUIDANCE[focusedField] : null;

  return (
    <aside style={{
      width: 272, background: "#ECECEC", borderLeft: "1px solid rgb(236 236 236)",
      overflowY: "auto", flexShrink: 0,
    }}>
      <div style={{ padding: 20 }}>
        {meta ? (
          // ── Focused field guidance ──
          <div key={focusedField} style={{ animation: "fadeSlideIn 0.2s ease" }}>
            <div style={{ fontSize: 12, color: "#1E2D45", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "'DM Sans', sans-serif", marginBottom: 14 }}>Field Guide</div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 3, minHeight: 18, background: activeSection?.color ?? "#0EA5E9", borderRadius: 2, marginTop: 2, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0B1629", lineHeight: 1.4 }}>{meta.label}</div>
                {meta.required && (
                  <span style={{ fontSize: 12, color: "#F87171", background: "#FFF", padding: "2px 7px", borderRadius: 8, marginTop: 4, display: "inline-block" }}>Required</span>
                )}
              </div>
            </div>

            <p style={{ fontSize: 14, color: "#0B1629", lineHeight: 1.75, marginBottom: 16 }}>{meta.guidance}</p>

            {meta.example && (
              <div style={{ background: "#070F1C", border: "1px solid #0F2744", borderRadius: 8, padding: "10px 13px", marginBottom: 14 }}>
                <div style={{ fontSize: 10, color: "#FFF", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif", marginBottom: 5 }}>Example</div>
                <div style={{ fontSize: 12, color: "#FFF", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, wordBreak: "break-word" }}>{meta.example}</div>
              </div>
            )}

            {meta.maxLength && (
              <div style={{ fontSize: 11, color: "#1E2D45", fontFamily: "'DM Sans', sans-serif" }}>Max {meta.maxLength.toLocaleString()} characters</div>
            )}
          </div>
        ) : (
          // ── Default — section overview + mini progress ──
          <div>
            <div style={{ fontSize: 12, color: "#1E2D45", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "'DM Sans', sans-serif", marginBottom: 14 }}>Field Guide</div>

            {activeSection && (
              <div style={{ background: "#070F1C", border: `1px solid ${activeSection.color}33`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#CBD5E1" }}>{activeSection.label}</span>
                </div>
                <p style={{ fontSize: 11, color: "#CBD5E1", lineHeight: 1.7 }}>{SECTION_DESCRIPTIONS[activeSection.id]}</p>
              </div>
            )}

            <div style={{ fontSize: 12, color: "#334155", marginBottom: 20, lineHeight: 1.6 }}>
              Click on any field to see detailed guidance and example values from the HDR UK specification.
            </div>

            {/* Mini progress all sections */}
            <div style={{ fontSize: 10, color: "#1E2D45", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "'DM Sans', sans-serif", marginBottom: 10 }}>All Sections</div>
            {SECTIONS.map(s => {
              const p = progressMap[s.id];
              const isActive = location.pathname.substring(1).startsWith(s.route)
;
              return (
                <div key={s.id} style={{ marginBottom: 9 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 12, color: isActive ? s.color : p?.isComplete ? "#10B981" : "#334155", display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ color: isActive ? s.color : "#1E2D45" }}>{s.icon}</span> {s.label}
                    </span>
                    <span style={{ fontSize: 12, color: "#1E2D45", fontFamily: "'DM Sans', sans-serif" }}>{p?.pct || 0}%</span>
                  </div>
                  <div style={{ height: 2, background: "#0D1B2E", borderRadius: 1 }}>
                    <div style={{ height: "100%", width: `${p?.pct || 0}%`, background: p?.isComplete ? "#10B981" : isActive ? s.color : "#1E2D45", borderRadius: 1, transition: "width 0.4s ease" }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside> 
  );
}
