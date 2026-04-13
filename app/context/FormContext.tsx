import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from "react"

import type { FormContextValue, FormState } from "../types/form"
import { formReducer } from "~/state/formReducer";
import { createInitialState } from "~/state/initialState";
import { computeProgressMap, computeOverallPct } from "~/state/progress";
import { DRAFT_STORAGE_KEY, AUTOSAVE_DEBOUNCE_MS } from "~/constants/schema";

const storage = {
    save: (s: FormState):boolean => {
        if (typeof window === "undefined") return false;
        try {
            localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(s))
            return true
        } catch (error) {
            return false
        }
    },
    load: (): Partial<FormState> | null => { 
        if (typeof window === "undefined") return null;
        try { 
            const r = localStorage.getItem(DRAFT_STORAGE_KEY); return r ? JSON.parse(r) : null 
        } catch { 
            return null 
            }
        },
    clear: () => {
        if (typeof window === "undefined") return;
        try {
            localStorage.removeItem(DRAFT_STORAGE_KEY)
        } catch (error) {
            
        }
    }

}

const FormContext = createContext<FormContextValue | null>(null);

export function FormProvider({ children }: { children: ReactNode }) {

    // This line of code rectifies all Hydration by making sure 
    // Server and Client start with 0 values before client mounts
    const [state, dispatch] = useReducer(formReducer, null, ():FormState => createInitialState())

    useEffect(() => {
        const saved = storage.load()
        if (saved) {
            dispatch({ type: "LOAD_DRAFT", payload: saved })
        }
        
    }, [])

    const [focusedField, setFocusedRaw] = useState<string | null>(null);
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle")
    const [lastSaved, setLastSaved] = useState<string | null>(null)

    useEffect(() => {
        const draft = storage.load()
        if (draft) setLastSaved(new Date().toISOString())
    }, [])

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            const ok = storage.save(state);
            if (ok) {
                const ts = new Date().toISOString()
                setLastSaved(ts)
                setSaveStatus('saved')
                setTimeout(() => setSaveStatus("idle"), 2500)
            }
        }, AUTOSAVE_DEBOUNCE_MS)
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current)
        }
    }, [state])

    const setFocused = useCallback((path: string | null) => setFocusedRaw(path), [])
    const progressMap = useMemo(() => computeProgressMap(state), [state])
    const overallPct = useMemo(() => computeOverallPct(progressMap), [progressMap])
    
    const value = useMemo<FormContextValue>(() => ({
        state, dispatch, focusedField, setFocused, progressMap, overallPct, lastSaved, saveStatus,
    }), [state, focusedField, progressMap, overallPct, lastSaved, saveStatus, setFocused])

    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    )
}

export function useForm(): FormContextValue {
    const ctx = useContext(FormContext);
    if (!ctx) throw new Error("useForm must be used inside <FormProvider>")
    return ctx;
}

export function useField(path: string) {
  const { state, dispatch, setFocused } = useForm();
  const keys = path.split(".");
  let val: unknown = state;
  for (const k of keys) val = (val as Record<string, unknown>)?.[k];

  const onChange = useCallback((value: unknown) => {
    dispatch({ type: "SET_FIELD", path, value });
  }, [dispatch, path]);

  const onFocus = useCallback(() => setFocused(path), [setFocused, path]);
  const onBlur  = useCallback(() => setFocused(null),  [setFocused]);

  return { value: val, onChange, onFocus, onBlur };
}

// /** Sidebar / navigation concerns only */
export function useFormNav() {
  const { progressMap, overallPct, lastSaved, saveStatus } = useForm();
  return { progressMap, overallPct, lastSaved, saveStatus };
}

// /** Guidance panel concerns */
export function useGuidance() {
  const { focusedField, setFocused } = useForm();
  return { focusedField, setFocused };
}

// /** Export + reset actions */
export function useFormActions() {
  const { state, dispatch } = useForm();

  const revisions = [
    {
        version: "1.0.0",
        url: null
    }
  ]

  const exportJson = useCallback(() => {
    const { ...clean } = state as unknown as Record<string, unknown>;
    const out = {
      identifier: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      version: "1.0.0",
      revisions: revisions,
      issued:  new Date().toISOString(),
      modified: new Date().toISOString(),
      ...clean,
    };
    const blob = new Blob([JSON.stringify(out, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url;
    const safeName = (state.summary.title || "untitled").replace(/\s+/g, "_").slice(0, 40);
    a.download = `hdruk_dataset_${safeName}_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [state]);

  const resetForm = useCallback(() => {
    // if (window.confirm("This will permanently clear all form data. Are you sure?")) {
      try { localStorage.removeItem(DRAFT_STORAGE_KEY); } catch {}
      dispatch({ type: "RESET" });
    // }
  }, [dispatch]);

  return { exportJson, resetForm };
}