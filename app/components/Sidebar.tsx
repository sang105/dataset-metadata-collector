"use client"

// app/components/layout/Sidebar.tsx
import { NavLink } from "react-router";
import { SECTIONS } from "~/constants/schema";
import { useFormNav } from "app/context/FormContext";
import { useEffect, useState } from "react";

export function Sidebar() {
  const { progressMap, overallPct, lastSaved, saveStatus } = useFormNav();
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    
    <aside style={{
    //   width: 224, background: "#020812", borderRight: "1px solid #0D1B2E",
      width: 224, background: "rgb(236 236 236)", borderRight: "1px solid rgb(236 236 236)",
      display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto",
    }}>
      {/* Brand */}
      <div style={{ padding: "18px 16px 14px", borderBottom: "1px solid #0D1B2E" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 28, height: 28, background: "linear-gradient(135deg,#0EA5E9,#6366F1)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff", fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}>H</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#0B1629", lineHeight: 1.2 }}>IEU HDRUK</div>
            <div style={{ fontSize: 9, color: "#334155", textTransform: "uppercase", letterSpacing: "0.1em" }}>Dataset Creator</div>
          </div>
        </div>

        {/* Overall progress bar */}
        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: 9, color: "#334155", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace" }}>Overall</span>
            <span style={{ fontSize: 9, color: overallPct === 100 ? "#10B981" : "#0EA5E9", fontFamily: "'DM Mono', monospace", fontWeight: 700 }}>{overallPct}%</span>
          </div>
          <div style={{ height: 3, background: "#0D1B2E", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${overallPct}%`, background: overallPct === 100 ? "#10B981" : "linear-gradient(90deg,#0EA5E9,#6366F1)", borderRadius: 2, transition: "width 0.5s ease" }} />
          </div>
        </div>
      </div>

      {/* Section nav */}

      <nav style={{ flex: 1, padding: "10px 0" }}>
        {SECTIONS.map((s, i) => {
          const p = progressMap[s.id];
          return (
            <NavLink
          key={s.id}
          to={s.route}
        >
          {({ isActive }) => {
            const p = progressMap[s.id];

            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 14px",
                  borderLeft: `3px solid ${isActive ? s.color : "transparent"}`,
                  background: isActive ? `${s.color}0D` : "transparent",
                  transition: "background 0.15s",
                }}
              >
                {/* Number / check badge */}
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 6,
                    flexShrink: 0,
                    background: p?.isComplete ? "#10B98122" : "#0D1B2E",
                    border: `1px solid ${p?.isComplete ? "#10B981" : "#1E2D45"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 700,
                    color: p?.isComplete ? "#10B981" : "#FFF",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {p?.isComplete ? "✓" : i + 1}
                </div>

                {/* Label + mini bar */}
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "#0B1629" : "#64748B",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      lineHeight: 1.3,
                    }}
                  >
                    {s.label}
                  </div>

                  <div
                    style={{
                      marginTop: 4,
                      height: 2,
                      background: "#0D1B2E",
                      borderRadius: 1,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${p?.pct || 0}%`,
                        background: p?.isComplete ? "#10B981" : s.color,
                        borderRadius: 1,
                        transition: "width 0.4s ease",
                      }}
                    />
                  </div>
                </div>

                {/* Percentage */}
                <span
                  style={{
                    fontSize: 9,
                    color: "#1E2D45",
                    fontFamily: "'DM Mono', monospace",
                    flexShrink: 0,
                  }}
                >
                  {p?.pct || 0}%
                </span>
              </div>
            );
          }}
        </NavLink>
          );
        })}
      </nav>

      {/* Save status footer */}
      <div style={{ padding: "12px 16px", borderTop: "1px solid #0D1B2E" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: saveStatus === "saved" ? "#10B981" : saveStatus === "saving" ? "#F59E0B" : "#1E2D45", transition: "background 0.3s" }} />
          <span style={{ fontSize: 10, color: "#334155", fontFamily: "'DM Mono', monospace" }}>
            {saveStatus === "saving" ? "Saving…" : saveStatus === "saved" ? "Draft saved" : lastSaved ? `Saved ${new Date(lastSaved).toLocaleTimeString()}` : "No draft saved"}
          </span>
        </div>
      </div>
    </aside>
  );
}
