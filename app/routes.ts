import { type RouteConfig, route, index, layout } from "@react-router/dev/routes";

export default [ 
    index("routes/home.tsx"),
    layout("layouts/DefaultLayout.tsx", [
        route("summary", "routes/summary.tsx"),
        route("documentation", "routes/documentation.tsx"),
        route("coverage", "routes/coverage.tsx"),
        route("provenance", "routes/provenance.tsx"),
        route("accessibility", "routes/accessibility.tsx"),
        route("enrichment-and-linkage", "routes/enrichment-and-linkage.tsx"),
        route("structural-metadata", "routes/structural-metadata.tsx"),
        route("observations", "routes/observation.tsx"),
        route("demographic-frequency", "routes/demographic-frequency.tsx"),
        route("omics", "routes/omics.tsx")
    ])
] satisfies RouteConfig;
