import { LinkageFormLayout } from "~/forms/LinkageForm";

export function meta() {
    return [{
        title: "Enrichment and Linkage"
    }]
}

export default function Linkage() {
    return (
        <div className="border bg-[#ECECEC] rounded-2xl border-gray-300 p-5 m-2">
            <LinkageFormLayout />
        </div>
    )
}