import type React from "react";

export interface DataCustodian {
  identifier: string;
  name: string;
  logo: string;
  description: string;
  contactPoint: string;
  memberOf: string;
}

export interface SummarySection {
  title: string;
  abstract: string;
  contactPoint: string;
  populationSize: string;
  keywords: string[];
  doiName: string;
  datasetAliases: string;
  custodian: DataCustodian;
}

export interface DocumentationSection {
  description: string;
  associatedMedia: string;
  inPipeline: string;
}

export interface CoverageSection {
  spatial: string;
  typicalAgeRangeMin: string;
  typicalAgeRangeMax: string;
  datasetCompleteness: string;
  materialType: string[];
  followUp: string;
  pathway: string;
}

export interface ProvenanceSection {
  origin: {
    purpose: string[];
    datasetType: string[];
    source: string[];
    collectionSource: string[];
    imageContrast: string;
  };
  temporal: {
    publishingFrequency: string;
    distributionReleaseDate: string;
    startDate: string;
    endDate: string;
    timeLag: string;
  };
}

export interface AccessibilitySection {
  usage: {
    dataUseLimitation: string[];
    dataUseRequirements: string[];
    resourceCreator: string;
  };
  access: {
    accessRights: string;
    accessServiceCategory: string;
    accessService: string;
    accessRequestCost: string;
    deliveryLeadTime: string;
    jurisdiction: string;
    dataController: string;
    dataProcessor: string;
  };
  formatAndStandards: {
    vocabularyEncodingScheme: string[];
    conformsTo: string[];
    language: string;
    format: string;
  };
}

export interface LinkageSection {
  investigations: string;
  tools: string;
  publicationAboutDataset: string;
  publicationUsingDataset: string;
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
  syntheticDataWebLink: string;
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

export interface FormState {
  summary: SummarySection;
  documentation: DocumentationSection;
  coverage: CoverageSection;
  provenance: ProvenanceSection;
  accessibility: AccessibilitySection;
  linkage: LinkageSection;
  structuralMetadata: StructuralMetadataSection;
  observations: ObservationsSection;
  demographicFrequency: DemographicFrequencySection;
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