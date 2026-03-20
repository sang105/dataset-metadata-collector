import { CoverageLayout } from "~/forms/CoverageForm";

export function meta() {
    return [{
        title: "Coverage"
    }]
}

export default function Coverage() {
    return (
        <div className="border bg-[#ECECEC] rounded-2xl border-gray-300 p-5 m-2">
            <CoverageLayout />
        </div>
    )
}