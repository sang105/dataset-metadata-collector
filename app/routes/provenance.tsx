import { ProvenanceFormLayout } from "~/forms/ProvenanceForm";

export function meta() {
    return [{
        title: "Provenance"
    }]
}

export default function Provenance() {
    return (
        <div className="border bg-[#ECECEC] rounded-2xl border-gray-300 p-5 m-2">
            <ProvenanceFormLayout />
        </div>
    )
}