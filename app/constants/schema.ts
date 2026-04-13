// ─────────────────────────────────────────────────────────────
// app/constants/schema.ts
// HDR UK v4.0.0 section config, field guidance, initial state
// and all option lists — single source of truth.
// ─────────────────────────────────────────────────────────────

// ── Section registry ──────────────────────────────────────────
export const SECTIONS = [
  { id: "summary", label: "Summary", route: "summary", icon: "◈", color: "#0EA5E9", short: "SUM" },
  { id: "documentation", label: "Documentation", route: "documentation", icon: "◎", color: "#8B5CF6", short: "DOC" },
  { id: "coverage", label: "Coverage", route: "coverage", icon: "◉", color: "#10B981", short: "COV" },
  { id: "provenance", label: "Provenance", route: "provenance", icon: "◐", color: "#F59E0B", short: "PRV" },
  { id: "accessibility", label: "Accessibility", route: "accessibility", icon: "◑", color: "#EF4444", short: "ACC" },
  { id: "enrichmentAndLinkage", label: "Enrichment and Linkage", route: "enrichment-and-linkage", icon: "◒", color: "#EC4899", short: "LNK" },
  { id: "structuralMetadata", label: "Structural Metadata", route: "structural-metadata",  icon: "◓", color: "#14B8A6", short: "STR" },
  { id: "observations", label: "Observations", route: "observations", icon: "⬡", color: "#6366F1", short: "OBS" },
  { id: "demographicFrequency",label: "Demographic Frequency",  route: "demographic-frequency",icon: "⬢", color: "#F97316", short: "DEM" },
  { id: "omics", label: "Omics", route: "omics", icon: "※", color: "#8B8000", short: "OMI"}
] as const;

export type SectionId = typeof SECTIONS[number]["id"];

// ── Section descriptions shown in the guide panel ─────────────
export const SECTION_DESCRIPTIONS: Record<SectionId, string> = {
  summary:              "Summary metadata must be completed first. It describes the key identifiers of your dataset including title, abstract, and contact information for data access requests.",
  documentation:        "Documentation provides rich context about the dataset including a full description, associated media and its pipeline/availability status.",
  coverage:             "Coverage describes the geographical, demographic and temporal scope of your dataset to help researchers understand its relevance.",
  provenance:           "Provenance allows researchers to understand the origins of your data — why and how it was collected, and its temporal characteristics.",
  accessibility:        "Accessibility covers data use limitations, access processes, costs, jurisdiction and technical standards used in the dataset.",
  enrichmentAndLinkage: "Linkage (Enrichment) describes relationships between this and other datasets — derived from, part of, linkable, or similar to.",
  structuralMetadata:   "Structural metadata defines the table and column structure of the dataset — names, data types, descriptions and sensitive fields.",
  observations:         "Observations capture statistical summaries about the dataset such as number of persons, events or findings.",
  demographicFrequency: "Demographic frequency provides distribution data across age, ethnicity and disease classifications within the dataset.",
  omics:                "Omics provides information about the omics methods used to generate the dataset. The fields can be left blank if dataset has nothing regards omics."
};

// ── Field guidance registry (HDR UK v4.0.0 spec) ─────────────
export interface FieldGuidance {
  label: string;
  required?: boolean;
  guidance: string;
  example?: string;
  maxLength?: number;
}

export const FIELD_GUIDANCE: Record<string, FieldGuidance> = {
  "summary.title": {
    label: "Dataset Title", required: true, maxLength: 150,
    guidance: "Title of the dataset limited to 150 characters. It should be unique across the Gateway. If not unique, add a prefix with your organisation name. Good titles summarise the content and the region covered. Avoid acronyms where possible.",
    example: "North West London COVID-19 Patient Level Situation Report",
  },
  "summary.abstract": {
    label: "Abstract", required: true, maxLength: 500,
    guidance: "Provide a clear and brief descriptive signpost for researchers. The abstract should allow the reader to determine the scope of the data collection. The optimal length is one paragraph. Abstracts should differ from the full description.",
    example: "CPRD Aurum contains primary care data contributed by GP practices using EMIS Web® including patient registration information and all care events that GPs have chosen to record.",
  },
  "summary.contactPoint": {
    label: "Contact Point (Email)", required: true,
    guidance: "A valid email address for coordinating data access requests has been provided by default. This field shows that organisations should provide a dedicated email associated with the data access request process. An employee's email can only be provided temporarily with explicit consent. IEU contact point (sm.colley@bristol.ac.uk)",
    example: "sm.colley@bristol.ac.uk",
  },
  "summary.populationSize": {
    label: "Population Size", required: true,
    guidance: "Input the number of people captured within the dataset. This informs a filter for researchers. This does not pull from the Observations fields.",
    example: "500000",
  },
  "summary.keywords": {
    label: "Keywords",
    guidance: "Provide relevant and specific keywords that improve SEO of your dataset. Enter one at a time. Text from the title is automatically included — no need to duplicate. Include words researchers may use in their searches.",
    example: "Primary Care, GP records, Prescriptions",
  },
  "summary.doiName": {
    label: "DOI Name",
    guidance: "DOI associated to this dataset. Note: NOT the DOI of associated publications. All HDR UK registered datasets should have a DOI or be working towards one.",
    example: "10.1093/ije/dyx196",
  },
  "summary.datasetAliases": {
    label: "Dataset Aliases",
    guidance: "Dataset & BioSample alias or alternate names. Alternate name, acronym or other identifier for the Dataset and/or BioSamples, as a comma-separated list.",
    example: "CPRD, Clinical Practice Research Datalink",
  },
  "summary.dataCustodian.name": {
    label: "Data Custodian Name", required: true,
    guidance: "The organisation responsible for running or supporting the data access request process. In most cases this will be the same as the HDR UK Organisation (Hub or Alliance Member).",
    example: "Health Data Research UK",
  },
  "summary.dataCustodian.contactPoint": {
    label: "Data Custodian Contact", required: true,
    guidance: "The organisation contact point(s) for receiving queries which has been provided by default. If this value is not provided, it defaults to the team's support email.",
    example: "info@hdruk.ac.uk",
  },
  "summary.dataCustodian.memberOf": {
    label: "Membership",
    guidance: "Indicate if the organisation is an Alliance Member, Hub, NCS (National Core Studies) or Other. Defaults to the membership for the team submitting the metadata.",
    example: "Alliance",
  },
  "documentation.description": {
    label: "Dataset Description", required: true, maxLength: 10000,
    guidance: "A free-text description providing context and scope, limited to 10,000 characters. A URL can also be provided. Keywords may be extracted and indexed for search. Should be more detailed than the abstract.",
    example: "A rich HTML account of the data that provides context and scope of the data collection, including methodology, population coverage, and data quality.",
  },
  "documentation.associatedMedia": {
    label: "Associated Media",
    guidance: "Provide any media associated with the dataset using valid URLs — links to PDFs describing methodology, graphs, charts, data dictionaries, dashboards. Separate multiple links with a comma.",
    example: "https://link.to/methodology.pdf, https://link.to/data-dictionary.xlsx",
  },
  "documentation.inPipeline": {
    label: "Pipeline Status",
    guidance: "Indicate whether this dataset is currently available for Researchers to request access. Select 'Available' if researchers can currently apply. Select 'Not available' if the dataset is being prepared but not yet ready.",
    example: "Available",
  },
  "coverage.spatial": {
    label: "Geographic Coverage", required: true,
    guidance: "The geographical area covered by the dataset. For UK locations, use ONS standards. For other countries, use ISO 3166-1 & ISO 3166-2 codes.",
    example: "United Kingdom, England",
  },
  "coverage.typicalAgeRangeMin": {
    label: "Min Age (years)",
    guidance: "Indicate the minimum age in years of participants in the dataset as a whole number. If all ages, enter 0.",
    example: "18",
  },
  "coverage.typicalAgeRangeMax": {
    label: "Max Age (years)",
    guidance: "Indicate the maximum age in years of participants in the dataset as a whole number. If all ages, enter 150.",
    example: "90",
  },
  "coverage.datasetCompleteness": {
    label: "Dataset Completeness URL",
    guidance: "The URL where a researcher can learn more about the completeness of the dataset.",
    example: "https://bhfdatasciencecentre.org/dashboard/",
  },
  "coverage.materialType": {
    label: "Biological Material Type",
    guidance: "The type of biospecimen from a biological entity. Select all that apply. If no samples are associated, select 'Not available'. If being confirmed, select 'Availability to be confirmed'.",
    example: "DNA, Plasma, Serum",
  },
  "coverage.followUp": {
    label: "Follow-up Period",
    guidance: "The typical time span that a patient appears in the dataset. For multiple cohorts, provide the longest follow-up period. 'Continuous' means data is regularly updated.",
    example: "1 - 10 Years",
  },
  "coverage.pathway": {
    label: "Patient Pathway",
    guidance: "Indicate if the dataset is representative of the patient pathway and any limitations with respect to pathway coverage. Could be a single speciality, single tier of care, linked across tiers, or an integrated care record.",
    example: "This dataset covers secondary care only, focusing on inpatient admissions across acute NHS trusts in England.",
  },
  "provenance.origin.purpose": {
    label: "Purpose of Collection",
    guidance: "Indicate the purpose(s) for which the dataset was collected. Select all that apply. Helps researchers understand the context of data collection.",
    example: "Care, Audit",
  },
  "provenance.origin.datasetType": {
    label: "Dataset Type",
    guidance: "The topic areas to which the dataset content relates. Datasets can have more than one type. 'Health and disease' includes mental health, cardiovascular, cancer, rare diseases, neurological, reproductive, etc.",
    example: "Health and disease, Administrative",
  },
  "provenance.origin.source": {
    label: "Data Source",
    guidance: "Indicate the source of the data extraction. EPR = Electronic Patient Record. LIMS = Laboratory Information Management System. Select all that apply.",
    example: "EPR",
  },
  "provenance.origin.collectionSource": {
    label: "Collection Source",
    guidance: "Indicate the setting(s) where data was collected. Multiple settings may be provided.",
    example: "Secondary care - In-patients",
  },
  "provenance.origin.imageContrast": {
    label: "Image Contrast",
    guidance: "If any contrast media or contrast agents were used in creating the images within the dataset and the contrast is known, mark 'Yes'. If this information is not known or not captured, indicate 'Not stated'. If there was no contrast used in the images, mark 'No'.",
    example: "Not stated",
  },
  "provenance.temporal.publishingFrequency": {
    label: "Publishing Frequency",
    guidance: "How frequently are updates published? 'Static' means the dataset is not updated. 'Continuous' means updated in real time or near-real time.",
    example: "Annual",
  },
  "provenance.temporal.startDate": {
    label: "Start Date",
    guidance: "The date of the first data collection for the dataset, or the start of the time period covered.",
    example: "2000-01-01",
  },
  "provenance.temporal.endDate": {
    label: "End Date",
    guidance: "The date of the last data collection, or the end of the time period covered. Leave blank if continuously updated.",
    example: "2023-12-31",
  },
  "provenance.temporal.timeLag": {
    label: "Time Lag",
    guidance: "Indicate the typical time-lag between the clinical event occurring and the data being available from the underlying sources. Important for time-sensitive research.",
    example: "1-2 years",
  },
  "accessibility.usage.dataUseLimitation": {
    label: "Data Use Limitation",
    guidance: "Indicate any limitations on the use of the dataset. Based on the DUO (Data Use Ontology) standard. Helps researchers quickly determine whether their use case is permitted.",
    example: "General research use, Health or medical or biomedical research",
  },
  "accessibility.usage.dataUseRequirements": {
    label: "Data Use Requirements",
    guidance: "Any requirements associated with the use of the dataset, such as ethics approval, publication moratorium, or return to database. Based on DUO standard.",
    example: "Ethics approval required, Project specific restrictions",
  },
  "accessibility.usage.resourceCreator": {
    label: "Resource Creator / Citation",
    guidance: "Provide the text to be included as part of any citation that credits this dataset. Used by researchers when citing the dataset in publications.",
    example: "NHS Digital, Hospital Episode Statistics (HES) Admitted Patient Care, 2020.",
  },
  "accessibility.access.accessRights": {
    label: "Access Rights URL",
    guidance: "The URL of a webpage where the data access request process and/or guidance is provided. If there are multiple access processes (e.g. industry vs academic), provide all URLs.",
    example: "https://www.hdruk.ac.uk/access/",
  },
  "accessibility.access.accessService": {
    label: "Access Service Description",
    guidance: "Provide a brief description of the data access services available, including the environment available to researchers, additional consultancy services, and associated costs.",
    example: "Data is accessible via a Trusted Research Environment (TRE). Remote access is available for approved researchers.",
  },
  "accessibility.access.accessRequestCost": {
    label: "Access Request Cost",
    guidance: "Provide a link or short description detailing the commercial model for processing data access requests. Include any costs associated with accessing the dataset.",
    example: "Free at point of access for approved academic researchers. Commercial rates apply for industry.",
  },
  "accessibility.access.deliveryLeadTime": {
    label: "Delivery Lead Time",
    guidance: "Provide an indication of the typical processing times based on the types of requests typically received.",
    example: "2-6 months",
  },
  "accessibility.access.jurisdiction": {
    label: "Jurisdiction",
    guidance: "Please indicate the legal jurisdiction(s) that apply to the dataset. Use ISO 3166-2 country codes where possible.",
    example: "GB-ENG",
  },
  "accessibility.access.dataController": {
    label: "Data Controller",
    guidance: "The organisation that, alone or jointly with others, determines the purposes and means of the processing of personal data. Usually the organisation that collected the data.",
    example: "NIHR Bristol Biomedical Research Centre",
  },
  "accessibility.formatAndStandards.vocabularyEncodingScheme": {
    label: "Vocabulary Encoding Scheme",
    guidance: "List the controlled vocabularies, ontologies, terminologies or standards used in the dataset. Multiple values are allowed.",
    example: "SNOMED CT, ICD-10, OPCS-4",
  },
  "accessibility.formatAndStandards.conformsTo": {
    label: "Conforms To",
    guidance: "List the standard(s) which the dataset conforms to. Multiple values are allowed. These could be technical standards, reporting standards, or clinical data standards.",
    example: "HL7 FHIR",
  },
  "accessibility.formatAndStandards.language": {
    label: "Language",
    guidance: "This should reflect the language in which the metadata, and ideally the underlying dataset, is held. Use ISO 639-1 language codes. Please click add button to add value.",
    example: "en",
  },
  "accessibility.formatAndStandards.format": {
    label: "Format",
    guidance: "List all possible formats that the dataset can be made available in. Multiple values are allowed. Please click add button to add value.",
    example: "CSV, JSON, SQL",
  },
  "enrichmentAndLinkage.investigations": {
    label: "Investigations",
    guidance: "Links to any journal articles, presentations, or references that support the discovery and understanding of the dataset. Please, only provide URLs for this field. Please click add button to add value.",
    example: "https://link.to/paper.pdf",
  },
  "enrichmentAndLinkage.tools": {
    label: "Tools",
    guidance: "Links to tools or resources that may be useful to a researcher using this dataset. Please, only provide URLs for this field. Please click add button to add value.",
    example: "https://link.to/tool",
  },
  "enrichmentAndLinkage.publicationAboutDataset": {
    label: "Publications About Dataset",
    guidance: "DOIs of publications about this dataset. Please provide on the DOI as shown in the below example. Please click add button to add value.",
    example: "10.1093/ije/dyx196",
  },
  "enrichmentAndLinkage.publicationUsingDataset": {
    label: "Publications Using Dataset",
    guidance: "DOIs of publications that have used data from this dataset. Please provide on the DOI as shown in the below example. Please click add button to add value.",
    example: "10.1016/S0140-6736(21)00143-8",
  },
  "enrichmentAndLinkage.derivedFrom": {
    label: "Derived From",
    guidance: "",
    example: ""
  },
  "enrichmentAndLinkage.isPartOf": {
    label: "Is Part Of",
    guidance: "",
    example: ""
  },
  "enrichmentAndLinkage.linkableDatasets": {
    label: "Linkable Datasets",
    guidance: "",
    example: ""
  },
  "enrichmentAndLinkage.similarToDatasets": {
    label: "Similar To Datasets",
    guidance: "",
    example: ""
  },
  "structuralMetadata.tables": {
    label: "Tables",
    guidance: "Define each table in the dataset with a name and description. For each table, add columns with their name, data type, description, and whether they contain sensitive data.",
    example: "patients (patient_id: integer, nhs_number: string [sensitive], dob: date)",
  },
  "observations.observedNode": {
    label: "Observed Node",
    guidance: "Select the type of the observation from the constrained list. For example, PERSONS means you are recording a statistic about the number of people in the dataset.",
    example: "PERSONS",
  },
  "observations.measuredValue": {
    label: "Measured Value",
    guidance: "Provide the value of the observation as a number.",
    example: "1000000",
  },
  "observations.observationDate": {
    label: "Observation Date",
    guidance: "The date that the observation was made, in ISO 8601 format (YYYY-MM-DD).",
    example: "2023-01-01",
  },
  "demographicFrequency.age": {
    label: "Age Distribution",
    guidance: "Provide the age distribution of the dataset population. Each entry should have a bin (age range label) and a count of people in that range.",
    example: "0-17: 150,000 | 18-64: 600,000 | 65+: 250,000",
  },
  "demographicFrequency.ethnicity": {
    label: "Ethnicity Distribution",
    guidance: "Provide the ethnicity distribution of the dataset population. Each entry should have a bin (ethnicity category) and a count.",
    example: "White British: 700,000 | Asian or Asian British: 150,000",
  },
  "demographicFrequency.disease": {
    label: "Disease Distribution",
    guidance: "Provide disease distribution data. Each entry should have a disease code, the coding vocabulary used (e.g. ICD10), and a count.",
    example: "I10 (ICD10 - Hypertension): 320,000",
  },
  "omics.assay": {
    label: "Omics Assay",
    guidance: "Provide the specific omics assay that generated the dataset. If the assay used to generate your dataset is not listed, please contract the gateway team by submitting an enquiry.",
    example: "Whole genome sequencing"
  },
  "omics.platform": {
    label: "Omics Platform",
    guidance: "Provide the specific technology or infrastructure used to perform the assay. If the omics platform used to create your dataset is not listed, please select other, a member of the gateway team will contact you to add an appropriate term(s) both to your record and to the metadata schema on your behalf.",
    example: "Illumina"
  }
};

// ── Option lists ───────────────────────────────────────────────
export const OPTIONS = {
  memberOf:               ["Hub", "Alliance", "Other", "NCS"],
  inPipeline:             ["Available", "Not available"],
  materialType:           ['None/not available','Bone marrow','Cancer cell lines','CDNA/MRNA','Core biopsy','DNA','Entire body organ','Faeces','Immortalized cell lines','Isolated pathogen','MicroRNA','Peripheral blood cells','Plasma','PM Tissue','Primary cells','RNA','Saliva','Serum','Swabs','Tissue','Urine','Whole blood','Availability to be confirmed','Other'],
  followUp:               ["0 - 6 Months","6 - 12 Months","1 - 10 Years","> 10 Years","Unknown","Continuous","Other"],
  demographicAgeRange:    ["0-6 days","7-27 days","1-11 months","1-4 years","5-9 years","10-14 years","15-19 years","20-24 years","25-29 years","30-34 years","35-39 years","40-44 years","45-49 years","50-54 years","55-59 years","60-64 years","65-69 years","70-74 years","75-79 years","80-84 years","85-89 years","90-94 years","95-99 years","100+ years"],
  demographicEthnicGrouping: [
                            "White - British",
                            "White - Irish",
                            "White - Any other White background",
                            "Mixed - White and Black Caribbean",
                            "Mixed - White and Black African",
                            "Mixed - White and Asian",
                            "Mixed - Any other mixed background",
                            "Asian or Asian British - Indian",
                            "Asian or Asian British - Pakistani",
                            "Asian or Asian British - Bangladeshi",
                            "Asian or Asian British - Any other Asian background",
                            "Black or Black British - Caribbean",
                            "Black or Black British - African",
                            "Black or Black British - Any other Black background",
                            "Other Ethnic Groups - Chinese",
                            "Other Ethnic Groups - Any other ethnic group",
                            "Not stated",
                            "Not known"
                          ],
  demographicDiseaseCodes: ["ICD10","SNOMED CT","MeSH"],                
  purpose:                ["Research cohort","Study","Disease registry","Trial","Care","Audit","Administrative","Financial","Statutory","Other"],
  datasetType:            ["Health and disease","Treatments/Interventions","Measurements/Tests","Imaging types","Omics","Digital health","Administrative","Socioeconomic","Other"],
  imageContrast:          ["Yes", "No", "Not stated"],
  source:                 ["EPR","Electronic survey","LIMS","Paper-based","Free text NLP","Machine generated","Other"],
  collectionSource:       ["Cohort, study, trial","Clinic","Primary care - Referrals","Primary care - Clinic","Primary care - Out of hours","Secondary care - Accident and Emergency","Secondary care - Outpatients","Secondary care - In-patients","Secondary care - Ambulance","Secondary care - ICU","Prescribing - Community pharmacy","Prescribing - Hospital","Patient report outcome","Wearables","Local authority","National government","Community","Services","Home","Private","Social care - Health care at home","Social care - Other social data","Census","Other"],
  publishingFrequency:    ["Static","Irregular","Continuous","Biennial","Annual","Biannual","Quarterly","Bimonthly","Monthly","Biweekly","Weekly","Twice a week","Daily"],
  timeLag:                ["Less than 1 week","1-2 weeks","2-4 weeks","1-2 months","2-6 months","6 months - 1 year","1-2 years","More than 2 years","Variable","No lag","Not applicable"],
  dataUseLimitation:      ['General research use','Commercial research use','Genetic studies only','No general methods research','No restriction','Geographical restrictions','Institution-specific restrictions','Not for profit use','Project-specific restrictions','Research-specific restrictions','User-specific restrictions','Research use only','No linkage'],
  dataUseRequirements:    ['Collaboration required','Project-specific restrictions','Ethics approval required','Institution-specific restrictions','Geographical restrictions','Publication moratorium','Publication required','Return to database or resource','Time limit on use','Disclosure control','Not for profit use','User-specific restriction'],
  deliveryLeadTime:       ["Less than 1 week","1-2 weeks","2-4 weeks","1-2 months","2-6 months","6 months - 1 year","More than 1 year","Variable","Not applicable"],
  vocabularyEncodingScheme: ['LOCAL','OPCS4','READ','SNOMED CT','SNOMED RT','DM PLUS D','DM+D','NHS NATIONAL CODES','NHS SCOTLAND NATIONAL CODES','NHS WALES NATIONAL CODES','ODS','LOINC','ICD10','ICD10CM','ICD10PCS','ICD9CM','ICD9','ICDO3','AMT','APC','ATC','CIEL','HPO','CPT4','DPD','DRG','HEMONC','JMDC','KCD7','MULTUM','NAACCR','NDC','NDFRT','OXMIS','RXNORM','RXNORM EXTENSION','SPL','OTHER'],
  conformsTo:             ['HL7 FHIR','HL7 V2','HL7 CDA','HL7 CCOW','LOINC','DICOM','I2B2','IHE','OMOP','OPENEHR','SENTINEL','PCORNET','CDISC','NHS DATA DICTIONARY','NHS SCOTLAND DATA DICTIONARY','NHS WALES DATA DICTIONARY','LOCAL','OTHER'],
  language:               ['aa','ab','ae','af','ak','am','an','ar','as','av','ay','az','ba','be','bg','bh','bi','bm','bn','bo','br','bs','ca','ce','ch','co','cr','cs','cu','cv','cy','da','de','dv','dz','ee','el','en','eo','es','et','eu','fa','ff','fi','fj','fo','fr','fy','ga','gd','gl','gn','gu','gv','ha','he','hi','ho','hr','ht','hu','hy','hz','ia','id','ie','ig','ii','ik','io','is','it','iu','ja','jv','ka','kg','ki','kj','kk','kl','km','kn','ko','kr','ks','ku','kv','kw','ky','la','lb','lg','li','ln','lo','lt','lu','lv','mg','mh','mi','mk','ml','mn','mr','ms','mt','my','na','nb','nd','ne','ng','nl','nn','no','nr','nv','ny','oc','oj','om','or','os','pa','pi','pl','ps','pt','qu','rm','rn','ro','ru','rw','sa','sc','sd','se','sg','si','sk','sl','sm','sn','so','sq','sr','ss','st','su','sv','sw','ta','te','tg','th','ti','tk','tl','tn','to','tr','ts','tt','tw','ty','ug','uk','ur','uz','ve','vi','vo','wa','wo','xh','yi','yo','za','zh','zu'],
  observedNode:           ["PERSONS","EVENTS","FINDINGS","NUMBER OF SCANS PER MODALITY"],
  measuredProperty:       ["COUNT","MEAN","MEDIAN","PERCENTAGE","MIN","MAX","STANDARD DEVIATION","OTHER"],
  assay:                  ['NMR spectroscopy','Mass-spectrometry','Whole genome sequencing','Exome sequencing','Genotyping by array','Transcriptome profiling by high-throughput sequencing','Transcriptome profiling by array','Amplicon sequencing','Methylation binding domain sequencing','Methylation profiling by high-throughput sequencing','Genomic variant calling','Chromatin accessibility profiling by high-throughput sequencing','Histone modification profiling by high-throughput sequencing','Chromatin immunoprecipitation sequencing','Whole genome shotgun sequencing','Whole transcriptome sequencing','Targeted mutation analysis'],
  platform:               ['Other','NMR Nightingale','Metabolon','Biocrates','Illumina','Oxford Nanopore','454','Hi-C','HiFi']
} as const;

// ── Draft storage ─────────────────────────────────────────────
export const DRAFT_STORAGE_KEY = "hdruk_dataset_draft_v1";
export const AUTOSAVE_DEBOUNCE_MS = 800;
