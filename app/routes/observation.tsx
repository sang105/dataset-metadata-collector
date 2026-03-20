import { ObservationFormLayout } from "~/forms/ObservationForm";

export function meta() {
    return [{
        title: "Observation"
    }]
}

export default function Observation() {
    return (
        <div className="border bg-[#ECECEC] rounded-2xl border-gray-300 p-5 m-2">
            <ObservationFormLayout />
        </div>
    )
}