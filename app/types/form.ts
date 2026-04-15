import type React from "react";

export interface DataCustodian {
  identifier: string | number;
  name: string[];
  logo: string[] | null;
  description: string[] | null;
  contactPoint: string;
  memberOf: string[] | null;
}

export interface SummarySection {
  title: string;
  abstract: string;
  contactPoint: string;
  populationSize: number | string;
  keywords: string[];
  doiName: string[] | null;
  datasetAliases: string[] | null;
  dataCustodian: DataCustodian;
}

export interface DocumentationSection {
  description: string;
  associatedMedia: string[] | null;
  inPipeline: string[] | null;
}

export interface CoverageSection {
  spatial: string[] | null;
  typicalAgeRangeMin: string;
  typicalAgeRangeMax: string;
  datasetCompleteness: string[] | null;
  materialType: string[];
  followUp: string[] | null;
  pathway: string[] | null;
}

export interface DatasetType {id: number; name: string; subTypes: string[]; }

export interface ProvenanceSection {
  origin: {
    purpose: string[];
    datasetType: DatasetType[];
    source: string[];
    collectionSource: string[];
    imageContrast: string[] | null;
  };
  temporal: {
    publishingFrequency: string;
    distributionReleaseDate: string | null;
    startDate: string | null;
    endDate: string | null;
    timeLag: string;
  };
}

export interface AccessibilitySection {
  usage: {
    dataUseLimitation: string[];
    dataUseRequirements: string[];
    resourceCreator: string[] | null;
  };
  access: {
    accessRights: string;
    accessServiceCategory: string[] | null;
    accessService: string[] | null;
    accessRequestCost: string[] | null;
    deliveryLeadTime: string[] | null;
    jurisdiction: string;
    dataController: string[] | null;
    dataProcessor: string[] | null;
  };
  formatAndStandards: {
    vocabularyEncodingScheme: string[];
    conformsTo: string[];
    language: string[];
    format: string[];
  };
}

export interface DerivedFromEntry { id: number; identifier_of_dataset: string; title_of_dataset: string; url_of_dataset: string }
export interface IsPartOfEntry { id: number; identifier_of_dataset: string; title_of_dataset: string; url_of_dataset: string }
export interface LinkableDatasetsEntry { id: number; identifier_of_dataset: string; title_of_dataset: string; url_of_dataset: string }
export interface SimilarToDatasetsEntry { id: number; identifier_of_dataset: string; title_of_dataset: string; url_of_dataset: string }

export interface LinkageSection {
  investigations: string[];
  tools: string[];
  publicationAboutDataset: string[];
  publicationUsingDataset: string[];
  derivedFrom: DerivedFromEntry[];
  isPartOf: IsPartOfEntry[];
  linkableDatasets: LinkableDatasetsEntry[];
  similarToDatasets: SimilarToDatasetsEntry[];
}

export interface TableColumn {
  id: number;
  name: string;
  dataType: string;
  description: string;
  sensitive: boolean;
}

export interface DataTable {
  id: number;
  name: string;
  description: string;
  columns: TableColumn[];
}

export interface StructuralMetadataSection {
  tables: DataTable[];
  syntheticDataWebLink: string[];
}

export interface Observation {
  id: number;
  observedNode: string;
  measuredValue: string;
  disambiguatingDescription: string;
  observationDate: string;
  measuredProperty: string;
}

export type ObservationsSection = Observation[];

export interface AgeEntry    { id: number; bin: string; count: string }
export interface EthnicityEntry { id: number; bin: string; count: string }
export interface DiseaseEntry   { id: number; diseaseCode: string; diseaseCodeVocabulary: string; count: string }

export interface DemographicFrequencySection {
  age:       AgeEntry[];
  ethnicity: EthnicityEntry[];
  disease:   DiseaseEntry[];
}

export interface OmicsSection {
  assay: string[] | null,
  platform: string[] | null
}

export interface FormState {
  summary: SummarySection;
  documentation: DocumentationSection;
  coverage: CoverageSection;
  provenance: ProvenanceSection;
  accessibility: AccessibilitySection;
  enrichmentAndLinkage: LinkageSection;
  structuralMetadata: StructuralMetadataSection;
  observations: ObservationsSection;
  demographicFrequency: DemographicFrequencySection;
  omics: OmicsSection;
}

export interface SectionProgress {
  total: number;
  filled: number;
  pct: number;
  isComplete: boolean;
}

export type ProgressMap = Record<string, SectionProgress>

export type FormAction = 
  | { type: "SET_FIELD";       path: string; value: unknown }
  | { type: "LOAD_DRAFT";      payload: Partial<FormState> }
  | { type: "RESET" }
  // Enrichment and Linkage CRUD
  | { type: "ADD_LINKAGE_OPTS"; category: "derivedFrom" | "isPartOf" | "linkableDatasets" | "similarToDatasets" }
  | { type: "UPDATE_LINKAGE_OPTS"; category: "derivedFrom" | "isPartOf" | "linkableDatasets" | "similarToDatasets"; id: number; field: string; value: string}
  | { type: "REMOVE_LINKAGE_OPTS"; category: "derivedFrom" | "isPartOf" | "linkableDatasets" | "similarToDatasets"; id: number }
  // Observation CRUD
  | { type: "ADD_OBSERVATION" }
  | { type: "UPDATE_OBSERVATION"; id: number; field: string; value: string }
  | { type: "REMOVE_OBSERVATION"; id: number }
  // Table CRUD
  | { type: "ADD_TABLE" }
  | { type: "UPDATE_TABLE";   id: number; field: string; value: string }
  | { type: "REMOVE_TABLE";   id: number }
  | { type: "ADD_COLUMN";     tableId: number }
  | { type: "UPDATE_COLUMN";  tableId: number; colId: number; field: string; value: string | boolean }
  | { type: "REMOVE_COLUMN";  tableId: number; colId: number }
  // Demographic CRUD
  | { type: "ADD_DEMO";        category: "age" | "ethnicity" | "disease" }
  | { type: "UPDATE_DEMO";     category: "age" | "ethnicity" | "disease"; id: number; field: string; value: string }
  | { type: "REMOVE_DEMO";     category: "age" | "ethnicity" | "disease"; id: number }
  // DatasetType CRUD - toggle a type on/off; manage its subTypes
  | { type: "TOGGLE_DATASET_TYPE", name: string }
  | { type: "ADD_DATASET_SUBTYPE", id: number; subType: string }
  | { type: "REMOVE_DATASET_SUBTYPE", id: number; subType: string }


export interface FormContextValue {
  state: FormState;
  dispatch: React.Dispatch<FormAction>
  focusedField: string | null;
  setFocused: (fieldPath: string | null) => void;
  progressMap: ProgressMap;
  overallPct: number;
  lastSaved: string | null;
  saveStatus: "idle" | "saving" | "saved"
}