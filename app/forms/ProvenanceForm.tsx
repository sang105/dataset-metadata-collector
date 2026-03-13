import { OPTIONS } from "~/constants/schema";
import { DatePicker } from "~/ui/Datepicker";
import { Field, Grid2, SectionShell, SubSection } from "~/ui/FormControls";

export function ProvenanceFormLayout() {
    return (
        <SectionShell icon="◐" label="Provenance" color="#F59E0B">
            <SubSection title="Origin" color="#F59E0B" />
                <Field path="provenance.origin.purpose" label="Purpose of Dataset Collection"   type="multiselect" options={OPTIONS.purpose} />
                <Field path="provenance.origin.source" label="Source of Data Extraction" type="multiselect" options={OPTIONS.source} />
                <Field path="provenance.origin.collectionSource" label="Collection Source Setting" type="multiselect" options={OPTIONS.collectionSource} />
                <Field path="provenance.origin.datasetType" label="Dataset Type" required type="multiselect" options={OPTIONS.datasetType} />

            <SubSection title="Temporal" color="#F59E0B" />
            <Field path="provenance.temporal.publishingFrequency"   label="Publishing Frequency"  required   type="select" options={OPTIONS.publishingFrequency} />
            <Grid2>
                <DatePicker path="provenance.temporal.startDate" label="Start Date" required />
                <DatePicker path="provenance.temporal.endDate" label="End Date" />
            </Grid2>
            <Grid2>
                <DatePicker path="provenance.temporal.distributionReleaseDate" label="Distribution Release Date" />
                <Field path="provenance.temporal.timeLag" label="Time Lag" required type="select" options={OPTIONS.timeLag} />
            </Grid2>
        </SectionShell>
    )
}