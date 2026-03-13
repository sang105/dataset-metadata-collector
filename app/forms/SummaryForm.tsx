import { OPTIONS } from "~/constants/schema";
import { Field, Grid2, SectionShell, SubSection } from "~/ui/FormControls";

export function SummaryFormLayout() {
    return (
        <SectionShell icon="" label="Summary" color="#0B1629">
            <Field 
                path="summary.title" 
                label="Title" 
                required placeholder="North West London COVID-19 Patient Level Situation Report"
                maxLength={150}
            />
            <Field 
                path="summary.abstract"
                label="Dataset Abstract"        
                required type="textarea" 
                rows={5} 
                placeholder="A clear and brief descriptive signpost for researchers…" 
                maxLength={500} 
            />
            <Grid2>
                <Field 
                    path="summary.contactPoint"   
                    label="Contact Point (Email)" 
                    required type="email" 
                    placeholder="gateway@hdruk.ac.uk" 
                />
                <Field 
                    path="summary.populationSize" 
                    label="Population Size"       
                    required 
                    type="number" 
                    placeholder="500000" 
                />
            </Grid2>
            <Field 
                path="summary.keywords"     
                label="Keywords"         
                type="tags" 
                placeholder="Type a keyword and press Enter" 
            />
            <Grid2>
                <Field 
                    path="summary.doiName"       
                    label="DOI Name"        
                    placeholder="10.1093/ije/dyx196" 
                />
                <Field 
                    path="summary.datasetAliases" 
                    label="Dataset & Biosample Aliases" 
                    placeholder="CPRD, Clinical Practice Research Datalink" 
                />
            </Grid2>

            <SubSection title="Data Custodian" color="#0EA5E9" />
            <Grid2>
                <Field 
                    path="summary.custodian.name"         
                    label="Organisation Name" 
                    required 
                    placeholder="Health Data Research UK" 
                />
                <Field 
                    path="summary.custodian.contactPoint" 
                    label="Contact Email"     
                    required type="email" 
                    placeholder="info@hdruk.ac.uk" 
                />
            </Grid2>
            <Grid2>
                <Field 
                    path="summary.custodian.identifier" 
                    label="DOI Identifier"   
                    placeholder="https://ror.org/053fq8t95" 
                />
                <Field 
                    path="summary.custodian.memberOf"   
                    label="Membership"       
                    type="select" 
                    options={OPTIONS.memberOf} />
            </Grid2>
            <Field 
                    path="summary.custodian.description" 
                    label="Organisation Description" 
                    type="textarea" rows={3} 
                    placeholder="Brief description of the organisation…" 
                />
            <Field 
                    path="summary.custodian.logo"        
                    label="Logo URL"              
                    type="url"  
                    placeholder="https://…/logo.png" 
                />
        </SectionShell>
    )
}