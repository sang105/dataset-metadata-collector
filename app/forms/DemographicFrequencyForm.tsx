import { DemoSection } from "~/ui/DemographicEditor";
import { SectionShell } from "~/ui/FormControls";

export function DemographicFrequencyFormLayout() {
    return (
    <SectionShell icon="⬢" label="Demographic Frequency" color="#F97316">
      <DemoSection
        category="age"
        title="Demographic Frequency Age"
        color="#F97316"
        fields={[
          { key: "bin",   placeholder: "Age Grouping (0-6days, 7-27days, .., 1-4years, 5-9years)" },
          { key: "count", placeholder: "Age Count", type: "number" },
        ]}
      />

      <div style={{ height: 1, background: "#0D1B2E", margin: "4px 0 24px" }} />

      <DemoSection
        category="ethnicity"
        title="Demographic Frequency Ethnicity"
        color="#F97316"
        fields={[
          { key: "bin",   placeholder: "Ethnicity Grouping (White - Bristish, White - Irish, ..)" },
          { key: "count", placeholder: "Ethnicity Count", type: "number" },
        ]}
      />

      <div style={{ height: 1, background: "#0D1B2E", margin: "4px 0 24px" }} />

      <DemoSection
        category="disease"
        title="Demographic Frequency Disease"
        color="#F97316"
        fields={[
          { key: "diseaseCode",           placeholder: "Disease code)" },
          { key: "diseaseCodeVocabulary",  placeholder: "Disease code and Vocabulary (ICD10, SNOMED CT, MeSH)" },
          { key: "count",                  placeholder: "Count", type: "number" },
        ]}
      />
    </SectionShell>
    )
}