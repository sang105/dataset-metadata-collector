import { OPTIONS } from "~/constants/schema";
import { Field, Grid2, SectionShell, SubSection } from "~/ui/FormControls";

export function AccessibilityFormLayout() {
    return (
    <SectionShell label="Accessibility" color="#EF4444">
      <SubSection title="Usage" color="#EF4444" />
      <Field path="accessibility.usage.dataUseLimitation"  label="Data Use Limitation"  type="multiselect" options={OPTIONS.dataUseLimitation} />
      <Field path="accessibility.usage.dataUseRequirements" label="Data Use Requirements" type="multiselect" options={OPTIONS.dataUseRequirements} />
      <Field path="accessibility.usage.resourceCreator"    label="Resource Creator / Citation" placeholder="NHS Digital, Hospital Episode Statistics (HES), 2020." />

      <SubSection title="Access" color="#EF4444" />
      <Field path="accessibility.access.accessRights" label="Access Rights"  type="textarea" required placeholder="https://…/access" />
      <Field path="accessibility.access.accessService"        label="Access Service Description" type="textarea" rows={4} placeholder="Describe the data access service and environment available to researchers…" />
      <Grid2>
        <Field path="accessibility.access.accessServiceCategory" label="Access Service Category" type="select" options={["TRE/SDE","Dataset","Researcher-facing API","Data Controller"]} />
        <Field path="accessibility.access.deliveryLeadTime"     label="Delivery Lead Time"      type="select"  options={OPTIONS.deliveryLeadTime} />
      </Grid2>
      <Field path="accessibility.access.accessRequestCost"    label="Access Request Cost"      placeholder="Free at point of access for approved academic researchers…" />
      <Grid2>
        <Field path="accessibility.access.jurisdiction"        label="Jurisdiction"  placeholder="GB-ENG" />
        <Field path="accessibility.access.dataController" label="Data Controller"  readOnly defaultValue="NIHR Bristol Biomedical Research Centre" />
      </Grid2>
      <Field path="accessibility.access.dataProcessor" label="Data Processor" readOnly defaultValue="NIHR Bristol Biomedical Research Centre" />

      <SubSection title="Format & Standards" color="#EF4444" />
      <Field path="accessibility.formatAndStandards.vocabularyEncodingScheme" label="Controlled Vocabulary" required type="multiselect" options={OPTIONS.vocabularyEncodingScheme} />
      <Field path="accessibility.formatAndStandards.conformsTo"               label="Conforms To"               type="multiselect" options={OPTIONS.conformsTo} />
      <Grid2>
        <Field path="accessibility.formatAndStandards.language" label="Language (ISO 639-1)" required placeholder="en, cy, gd…" />
        <Field path="accessibility.formatAndStandards.format"   label="Format(s)" required placeholder="CSV, JSON, SQL…" />
      </Grid2>
    </SectionShell>
    )
}