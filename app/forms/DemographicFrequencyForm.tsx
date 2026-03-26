import { OPTIONS } from "~/constants/schema";
import { DemoSection } from "~/ui/DemographicEditor";
import { SectionShell } from "~/ui/FormControls";

export function DemographicFrequencyFormLayout() {
    return (
    <SectionShell label="Demographic Frequency" color="#F97316">
      <DemoSection
        category="age"
        title="Demographic Frequency Age"
        color="#F97316"
        fields={[
          { key: "bin",   placeholder: "Select Age Grouping", type: "select", options: OPTIONS.demographicAgeRange, required: true },
          { key: "count", placeholder: "Age Count", type: "number", required: true },
        ]}
      />

      <div style={{ height: 1, background: "#0D1B2E", margin: "4px 0 24px" }} />

      <DemoSection
        category="ethnicity"
        title="Demographic Frequency Ethnicity"
        color="#F97316"
        fields={[
          { key: "bin",   placeholder: "Select Ethnicity Grouping", type: "select", options: OPTIONS.demographicEthnicGrouping, required:true },
          { key: "count", placeholder: "Ethnicity Count", type: "number", required:true },
        ]}
      />

      <div style={{ height: 1, background: "#0D1B2E", margin: "4px 0 24px" }} />

      <DemoSection
        category="disease"
        title="Demographic Frequency Disease"
        color="#F97316"
        fields={[
          { key: "diseaseCode",           placeholder: "Disease code)", required:true },
          { key: "diseaseCodeVocabulary",  placeholder: "Select Disease code and Vocabulary", type: "select", options: OPTIONS.demographicDiseaseCodes, required:true },
          { key: "count",                  placeholder: "Count", type: "number", required:true },
        ]}
      />
    </SectionShell>
    )
}