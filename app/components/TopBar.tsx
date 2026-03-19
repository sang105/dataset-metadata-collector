// app/components/layout/TopBar.tsx
import { useFormNav } from "app/context/FormContext";
import { NavLink } from "react-router";

interface TopBarProps {
  onExport: () => void;
  onReset: () => void;
}

export function TopBar({ onExport, onReset }: TopBarProps) {
  const { saveStatus, lastSaved } = useFormNav();

  return (
    <header style={{
      height: 52, background: "#020812", borderBottom: "1px solid #0D1B2E",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 20px", flexShrink: 0, zIndex: 10,
    }}>
      {/* Schema badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <NavLink to='/'>
          <span 
            className="hover:bg-[linear-gradient(135deg,#0EA5E9,#6366F1)] hover:text-white hover:cursor-pointer hover:font-bold hover:shadow-2xl hover:border-[linear-gradient(135deg,#0EA5E9,#6366F1)] text-white bg-transparent text-xs border rounded-3xl transition border-[#FFF] py-1 px-2 font-sans"
          >
            IEU HDRUK METADATA COLLECTOR
          </span>
        </NavLink>
      </div>

      {/* Right controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {/* Save indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: saveStatus === "saved" ? "#10B981" : saveStatus === "saving" ? "#F59E0B" : "#FFF", transition: "background 0.3s" }} />
          <span style={{ fontSize: 11, color: "#FFF", fontFamily: "'DM Sans', sans-serif" }}>
            {saveStatus === "saving" ? "Saving locally…" : saveStatus === "saved" ? "Saved locally" : lastSaved ? new Date(lastSaved).toLocaleTimeString() : ""}
          </span>
        </div>

        <button onClick={onReset}
          className="hover:bg-[linear-gradient(135deg,#0EA5E9,#6366F1)] hover:text-white hover:cursor-pointer hover:font-semibold hover:shadow-2xl hover:border-[linear-gradient(135deg,#0EA5E9,#6366F1)] text-white bg-transparent text-xs border rounded-md transition border-[#FFF] py-1 px-3 font-sans"
         >
          Reset
        </button>

        <button onClick={onExport} style={{ background: "linear-gradient(135deg,#0EA5E9,#6366F1)", border: "none", color: "#fff", borderRadius: 8, padding: "6px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 0 20px rgba(99,102,241,0.25)" }}>
          ↓ Export JSON
        </button>
      </div>
    </header>
  );
}
