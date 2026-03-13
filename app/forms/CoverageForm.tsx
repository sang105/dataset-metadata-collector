import { OPTIONS } from "~/constants/schema";
import { Field, Grid2, SectionShell } from "~/ui/FormControls";

export  function CoverageLayout () {
    return (
    <SectionShell icon="◉" label="Coverage" color="#10B981">
      <Field path="coverage.spatial" label="Geographic Coverage" required placeholder="United Kingdom, England — or ISO 3166 codes" />
      <Grid2>
        <Field path="coverage.typicalAgeRangeMin" label="Min Age Range (years)" type="number" placeholder="0" />
        <Field path="coverage.typicalAgeRangeMax" label="Max Age Range (years)" type="number" placeholder="150" />
      </Grid2>
      <Field path="coverage.materialType"       label="Biological Material Type" type="multiselect" options={OPTIONS.materialType} />
      <Field path="coverage.datasetCompleteness" label="Dataset Coverage/Completeness/Quality URL" type="url"        placeholder="https://…" />
      <Field path="coverage.followUp"           label="Follow-up Period"         type="select"      options={OPTIONS.followUp} />
      <Field path="coverage.pathway"            label="Patient Pathway Description"          type="textarea"    rows={4} placeholder="Describe pathway coverage and any limitations…" />
    </SectionShell> 
    )
}