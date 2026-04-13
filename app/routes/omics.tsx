import { OmicsFormLayout } from "~/forms/OmicsForm"

export function meta() {
    return [{
        title: "Omics"
    }]
}

export default function Omics() {
    return (
        <div className="border bg-[#ECECEC] rounded-2xl border-gray-300 p-5 m-2">
            <OmicsFormLayout/>
        </div>
    )
}