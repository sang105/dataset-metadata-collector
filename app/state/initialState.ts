// import type { FormState } from "~/types/form";

export function createInitialState() {
    return {
        summary: {
            title: [], abstract: [], contactPoint: [], populationSize: "",
            keywords: [], doiName: null, datasetAliases: null,
            dataCustodian: { identifier: "", name: [], logo: null, description: null, contactPoint: "", memberOf: null }
        },
        documentation: {
            description: [], associatedMedia: null, inPipeline: null
        },
        coverage: {
            spatial: null, typicalAgeRangeMin: "", typicalAgeRangeMax: "",
            datasetCompleteness: null, materialType: [], followUp: null, pathway: null
        },
        provenance: {
            origin: { purpose: [], datasetType: [], source: [], collectionSource: [], imageContrast: null },
            temporal: { publishingFrequency: "", distributionReleaseDate: null, startDate: null, endDate: null, timeLag: "" },
        },
        accessibility: {
            usage: { dataUseLimitation: [], dataUseRequirements: [], resourceCreator: null },
            access: { accessRights: "", accessServiceCategory: null, accessService: null, accessRequestCost: null, deliveryLeadTime: null, jurisdiction: "", dataController: null, dataProcessor: null },
            formatAndStandards: { vocabularyEncodingScheme: [], conformsTo: [], language: [], format: [] }
        },
        enrichmentAndLinkage: {
            investigations: [], tools: [], publicationAboutDataset: [], publicationUsingDataset: [],
            derivedFrom: [], isPartOf: [], linkableDatasets: [], similarToDatasets: []
        },
        structuralMetadata: { tables: [], syntheticDataWebLink: [] },
        observations: [],
        demographicFrequency: { age: [], ethnicity: [], disease: [] },
        omics: { assay: null, platform: null }
    }
}