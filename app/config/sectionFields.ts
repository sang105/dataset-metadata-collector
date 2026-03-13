export const sectionFields = {

  summary: {
    required: ["title", "abstract"],
    optional: ["keywords", "doi", "alias"]
  },

  documentation: {
    required: ["purpose"],
    optional: ["citation"]
  },

  coverage: {
    required: ["spatialCoverage"],
    optional: ["temporalCoverage"]
  },

  demographics: {
    required: ["demographicFrequency"],
    optional: []
  }

}