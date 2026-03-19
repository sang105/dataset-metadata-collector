import { useState } from "react";
import { Outlet } from "react-router";
import { ExportModal, ResetModal } from "~/components/ExportModal";
import { GuidePanel } from "~/components/GuidePanel";
import { Sidebar } from "~/components/Sidebar";
import { TopBar } from "~/components/TopBar";
import { Pagination }  from "~/components/Pagination";
import { useFormActions } from "~/context/FormContext"


export default function DefaultLayout() {
  const [showExport, setShowExport] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const { exportJson, resetForm } = useFormActions()


  const handleExport = () => {
    exportJson();
    setShowExport(false)
  }

  const handleReset = () => {
    resetForm()
    setShowReset(false)
  }

  return (
     <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <TopBar onExport={() => setShowExport(true)} onReset={() => setShowReset(true)} />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* LEFT — section navigation sidebar */}
        <Sidebar />

        {/* CENTRE — active section form, scrollable */}
        <div className="flex-1 overflow-y-auto w-full p-[32px_40px_20px] mx-auto ">
          <Outlet />
        </div>

        {/* RIGHT — contextual field guide */}
        <GuidePanel />
      </div>

      {/* BOTTOM — section pagination */}
      <Pagination />

      {/* Export modal (portal-style) */}
      {showExport && (
        <ExportModal onConfirm={handleExport} onClose={() => setShowExport(false)} />
      )}

      {showReset && (
        <ResetModal onConfirm={handleReset} onClose={() => setShowReset(false)} />
      )}
    </div>
  )
}