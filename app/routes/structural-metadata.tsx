import { StructuralMetadataFormLayout } from "~/forms/StructuralMetadataForm";

export function meta() {
    return [{
        title: "Structural Metadata"
    }]
}

export default function StructuralMetadata() {
    return (
        <div className="border bg-[#ECECEC] rounded-2xl border-gray-300 p-5 m-2">
            <StructuralMetadataFormLayout />
        </div>
    )
}