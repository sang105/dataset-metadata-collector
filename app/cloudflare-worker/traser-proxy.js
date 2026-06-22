const TRASER_BASE = "https://hdr-gateway-traser-dev-qmnkcg5qjq-ew.a.run.app"

const ALLOWED_ORIGINS = [
    "http://localhost:5173"
]

const CORS_HEADERS = (origin) => ({
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
})

export default {
    async fetch(request, env, ctx) {
        const origin = request.headers.get("Origin") || ""

        if (request.method === "OPTIONS") {
            return new Response(null, {
                status: 204,
                headers: CORS_HEADERS(origin)
            })
        }

        if (request.method !== "POST") {
            return new Response("Method not allowed", { status: 405 })
        }

        const url = new URL(request.url)
        const target = `${TRASER_BASE}${url.pathname}${url.search}`

        try {
            const body = await request.text()
            const traserResponse = await this.fetch(target, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body
            })
            const responseBody = await traserResponse.text()

            return new Response(responseBody, {
                status: traserResponse.status,
                headers: {
                    "Content-Type": "application/json",
                    ...CORS_HEADERS(origin)
                }
            })

        } catch (error) {
            return new Response(
                JSON.stringify({
                    error: "Proxy error",
                    detail: error.message
                }),
                {
                    status: 502,
                    headers: { "Content-Type": "application/json", ...CORS_HEADERS(origin) }
                }
            )
        }
    }
}