import { DemographicFrequencyFormLayout } from "~/forms/DemographicFrequencyForm";

export function meta() {
    return [{
        title: "Demographic Frequency" 
    }] 
}

export default function DemographicFrequency() {
    return (
        <div className="border bg-[#ECECEC] rounded-2xl border-gray-300 p-5 m-2">
           <DemographicFrequencyFormLayout />
        </div>
    )
}