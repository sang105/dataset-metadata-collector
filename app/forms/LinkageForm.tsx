import { useForm } from "~/context/FormContext";
import { Field, S, SectionShell } from "~/ui/FormControls";
import { LinkageSection } from "~/ui/LinkageEditor";


export function LinkageFormLayout() {
    return (
    <SectionShell label="Enrichment and Linkage" color="#EC4899">
      <Field 
        path="enrichmentAndLinkage.investigations"   
        label="Investigations"  
        required  
        type="tags" 
        placeholder="Links to journal articles, presentations, or references that support discovery of the dataset…" 
      />
      <Field 
        path="enrichmentAndLinkage.tools"    
        label="Tools"  
        required  
        type="tags"
        placeholder="Links to tools or resources useful for researchers using this dataset…" 
      />
      <Field 
        path="enrichmentAndLinkage.publicationAboutDataset"  
        label="Publications About The Dataset" 
        type="tags" 
        placeholder="DOIs or URLs of publications that describe this dataset…" 
      />
      <Field 
        path="enrichmentAndLinkage.publicationUsingDataset"  
        label="Publications Using The Dataset" 
        type="tags"
        placeholder="DOIs or URLs of publications that used data from this dataset…" 
      />
      
      
      <LinkageSection
        category="derivedFrom"
        title="Derived From"
        color="#EC4899"
        fields={[
          {key: "identifier_of_dataset", placeholder: "Persistent identifier of a dataset"},
          {key: "title_of_dataset", placeholder: "Title of a dataset"},
          {key: "url_of_dataset", placeholder: "Url of a dataset"}
        ]}
      />

      <div style={{ height: 1, background: "#0D1B24", margin: "4px 0 24px"}} />
      
      <LinkageSection
        category="isPartOf"
        title="Is Part Of"
        color="#EC4899"
        fields={[
          {key: "identifier_of_dataset", placeholder: "Persistent identifier of a dataset"},
          {key: "title_of_dataset", placeholder: "Title of a dataset"},
          {key: "url_of_dataset", placeholder: "Url of a dataset"}
        ]}
      />

      <div style={{ height: 1, background: "#0D1B24", margin: "4px 0 24px"}} />    
      
      <LinkageSection
        category="linkableDatasets"
        title="Linkable Datasets"
        color="#EC4899"
        fields={[
          {key: "identifier_of_dataset", placeholder: "Persistent identifier of a dataset"},
          {key: "title_of_dataset", placeholder: "Title of a dataset"},
          {key: "url_of_dataset", placeholder: "Url of a dataset"}
        ]}
      />  

      <div style={{ height: 1, background: "#0D1B24", margin: "4px 0 24px"}} />
      
      <LinkageSection
        category="similarToDatasets"
        title="Similar To Datasets"
        color="#EC4899"
        fields={[
          {key: "identifier_of_dataset", placeholder: "Persistent identifier of a dataset"},
          {key: "title_of_dataset", placeholder: "Title of a dataset"},
          {key: "url_of_dataset", placeholder: "Url of a dataset"}
        ]}
      />

    </SectionShell>
    )
  }