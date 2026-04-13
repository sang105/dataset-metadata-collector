import { OPTIONS } from "~/constants/schema";
import { Field, SectionShell } from "~/ui/FormControls";

export function OmicsFormLayout() {
    return (
        <SectionShell label="Omics" color="" >
            <Field
                path="omics.assay"
                label="Assay"
                type="select"
                options={OPTIONS.assay}
            />
            
            <Field
                path="omics.platform"
                label="Platform"
                type="select"
                options={OPTIONS.platform}
            />
        </SectionShell>
    )
}