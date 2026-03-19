// app/components/layout/Pagination.tsx
import { useNavigate, useLocation, useMatches } from "react-router";
import { SECTIONS } from "~/constants/schema";
import { useFormNav } from "~/context/FormContext" 


export function Pagination() {
  
  const navigate  = useNavigate();
  const location  = useLocation();
  const { progressMap } = useFormNav();
  const idx = SECTIONS.findIndex(s => location.pathname.substring(1).startsWith(s.route));
  const current = SECTIONS[idx];
  
  const prev = SECTIONS[idx - 1];
  const next = SECTIONS[idx + 1];

  return (
    <footer style={{
      height: 56, 
      background: "#020812", 
      borderTop: "1px solid #0D1B2E",
      display: "flex", alignItems: "center", justifyContent: "space-evenly",
      padding: "0 24px",
      flexShrink: 0,
    }}>
      {/* ← Previous */}
       {prev ? (
        <button onClick={() => navigate(prev.route)} style={{
          padding: "7px 18px", background: "#ECECEC", border: "1px solid #ECECEC",
          color: "#020812", cursor: "pointer", borderRadius: 8, fontSize: 13,
          display: "flex", alignItems: "center", gap: 6, fontFamily: "'DM Sans', sans-serif",
        }}>
          ← <span style={{ color: "#020812", fontSize: 12 }}>{prev.label}</span>
        </button>
      ) : <div />}

      {/* Dot indicators */}
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {SECTIONS.map((s, i) => {
          const p = progressMap[s.id];
          const isActive = i === idx;
          return (
            <button key={s.id} onClick={() => navigate(s.route)} title={s.label} style={{
              width: isActive ? 20 : 7, height: 7, borderRadius: isActive ? 4 : "50%",
              border: "none", cursor: "pointer", padding: 0,
              background: isActive ? s.color : p?.isComplete ? "#10B98166" : "#1E2D45",
              transition: "all 0.25s ease",
            }} />
          );
        })}
      </div>

      {/* Next → */}
      {next ? (
        <button onClick={() => navigate(next.route)} style={{
          padding: "7px 18px", background: "#0B1629",
          border: `1px solid ${current.color}75`, color: current.color,
          cursor: "pointer", borderRadius: 8, fontSize: 13,
          display: "flex", alignItems: "center", gap: 6, fontFamily: "'DM Sans', sans-serif",
        }}>
          <span style={{ color: "#FFF", fontSize: 12 }}>{next.label}</span> →
        </button>
      ) : (
        // On last section the Next slot is empty — export is in TopBar
        <></>
      )}
    </footer>
  );
}
