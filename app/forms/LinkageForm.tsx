import { Field, SectionShell } from "~/ui/FormControls";

export function LinkageFormLayout() {
    return (
    <SectionShell icon="◒" label="Enrichment and Linkage" color="#EC4899">
      <Field path="linkage.investigations"           label="Investigations"                  type="textarea" rows={3} placeholder="Links to journal articles, presentations, or references that support discovery of the dataset…" />
      <Field path="linkage.tools"                    label="Tools"                           type="textarea" rows={3} placeholder="Links to tools or resources useful for researchers using this dataset…" />
      <Field path="linkage.publicationAboutDataset"  label="Publications About The Dataset" type="textarea" rows={3} placeholder="DOIs or URLs of publications that describe this dataset…" />
      <Field path="linkage.publicationUsingDataset"  label="Publications Using The Dataset" type="textarea" rows={3} placeholder="DOIs or URLs of publications that used data from this dataset…" />
    </SectionShell>
    )
}