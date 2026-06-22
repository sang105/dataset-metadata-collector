const SCHEMA  = "HDRUK";
const VERSION = "4.0.0";

const PROXY_BASE = (import.meta.env.VITE_TRASER_PROXY_URL as string ?? "").replace(/\/$/, "")

export interface ValidationError {
    instancePath: string;
    message: string;
    keyword: string;
    fieldLabel: string;
}

export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[]
}

function toFieldLabel(instancePath: string): string {
    if (!instancePath || instancePath === "") return "Root"

    return instancePath
        .replace(/^\//, "")
        .split("/")
        .map(segment => segment
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, s => s.toUpperCase())
        ).join(" → ")
}

export async function validatePayload(
    payload:Record<string, unknown>
    ): Promise<ValidationResult> {

    const url = `${PROXY_BASE}/validate?input_schema=${SCHEMA}&input_version=${VERSION}&with_errors=1`    
    const response = await fetch(url, {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metadata: payload }),
    })

    const data = await response.json()    

    if (response.status === 200) {
        return { valid: true, errors: [] }
    }

    if (response.status === 422 || response.status === 400) {

        let rawErrors: { 
            instancePath: string; 
            message: string; 
            keyword: string
        }[] = []

        if (!Array.isArray(data)) {
            const values = Object.values(data)
            const targetVal:any = values[1]
            console.log(targetVal);
            
            const vals = targetVal.map((x:any) => {
                if (x.keyword !== 'type' && x.keyword !== 'anyOf') return x
            }).filter((x:any) => x !== undefined)            
    
            rawErrors = vals ?? []         
        }
        
        const errors: ValidationError[] = rawErrors.map(e => ({            
            instancePath: e.instancePath ?? "",
            message: e.message ?? "Unknown error",
            keyword: e.keyword ?? "",
            fieldLabel: toFieldLabel(e.instancePath ?? "")
        }))        
        return { valid: false, errors }
    }

    throw new Error(`TRASER responded with status ${response.status}`)
}