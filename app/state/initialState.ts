// import type { FormState } from "~/types/form";

export function createInitialState() {
    return {
        summary: {
            title: "", abstract: "", contactPoint: "", populationSize: "",
            keywords: [], doiName: "", datasetAliases: "",
            custodian: { identifier: "", name: "", logo: "", description: "", contactPoint: "", memberOf: "" }
        },
        documentation: {
            description: "", associatedMedia: "", inPipeline: ""
        },
        coverage: {
            spatial: "", typicalAgeRangeMin: "", typicalAgeRangeMax: "",
            datasetCompleteness: "", materialType: [], followUp: "", pathway: ""
        },
        provenance: {
            origin: { purpose: [], datasetType: [], source: [], collectionSource: [], imageContrast: "" },
            temporal: { publishingFrequency: "", distributionReleaseDate: "", startDate: "", endDate: "", timeLag: "" },
        },
        accessibility: {
            usage: { dataUseLimitation: [], dataUseRequirements: [], resourceCreator: "" },
            access: { accessRights: "", accessServiceCategory: "", accessService: "", accessRequestCost: "", deliveryLeadTime: "", jurisdiction: "", dataController: "", dataProcessor: "" },
            formatAndStandards: { vocabularyEncodingScheme: [], conformsTo: [], language: "", format: "" }
        },
        linkage: {
            investigations: "", tools: "", publicationAboutDataset: "", publicationUsingDataset: ""
        },
        structuralMetadata: { tables: [], syntheticDataWebLink: "" },
        observations: [],
        demographicFrequency: { age: [], ethnicity: [], disease: [] }
    }
}