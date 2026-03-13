import { OPTIONS } from "~/constants/schema";
import { Field, SectionShell } from "~/ui/FormControls";

export function DocumentationLayout() {
    return (
     <SectionShell icon="◎" label="Documentation" color="#8B5CF6">
      <Field path="documentation.description"   label="Dataset Description" required type="textarea" rows={10} placeholder="A rich description providing context and scope of the dataset. HTML is accepted. Limited to 10,000 characters." maxLength={10000} />
      <Field path="documentation.associatedMedia" label="Associated Media"  placeholder="https://link.to/methodology.pdf, https://link.to/data-dictionary.xlsx" hint="Comma-separated URLs to documents, images, charts, or dashboards." />
      <Field path="documentation.inPipeline"    label="Dataset Pipeline Status"    type="select" options={OPTIONS.inPipeline} />
    </SectionShell>
    )
}