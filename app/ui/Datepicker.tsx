// app/components/ui/DatePicker.tsx
//
// A fully custom calendar date-picker that matches the dark HDR UK theme.
// Zero external dependencies — pure React + inline styles.
//
// SSR-safe: no window/document access at module level.
// All DOM interaction happens inside event handlers and useEffect,
// which only run on the client.
//
// Props
// ─────
//   path      — dot-path into FormState (same convention as <Field>)
//   label     — field label text
//   required  — shows red asterisk
//   minDate   — optional ISO string "YYYY-MM-DD" lower bound
//   maxDate   — optional ISO string "YYYY-MM-DD" upper bound

import { useState, useEffect, useRef, useCallback } from "react";
import { useField } from "~/context/FormContext";
import { S } from "./FormControls";

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function isoToDate(iso: string): Date | null {
  if (!iso) return null;
  const d = new Date(iso + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}

function dateToIso(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfMonth(year: number, month: number): Date {
  return new Date(year, month, 1);
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth()    === b.getMonth()    &&
         a.getDate()     === b.getDate();
}

function today(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

// ─────────────────────────────────────────────────────────────
// Colour tokens (match the project's dark palette)
// ─────────────────────────────────────────────────────────────
const C = {
  bg:          "#020812",
  surface:     "#0B1629",
  surfaceHigh: "#0F2744",
  border:      "#1E2D45",
  borderFocus: "#3B82F6",
  accent:      "#F59E0B",   // Provenance section colour
  accentFaint: "#F59E0B22",
  textPrimary: "#E2E8F0",
  textMuted:   "#475569",
  textDim:     "#334155",
  today:       "#0EA5E9",
  todayFaint:  "#0EA5E922",
  disabled:    "#1E2D45",
};

// ─────────────────────────────────────────────────────────────
// DatePicker
// ─────────────────────────────────────────────────────────────
interface DatePickerProps {
  path:      string;
  label:     string;
  required?: boolean;
  minDate?:  string;   // "YYYY-MM-DD"
  maxDate?:  string;   // "YYYY-MM-DD"
}

export function DatePicker({ path, label, required, minDate, maxDate }: DatePickerProps) {
  const { value, onChange, onFocus, onBlur } = useField(path);
  const iso = (value ?? "") as string;

  // ── Calendar state ──────────────────────────────────────────
  const initial = isoToDate(iso) ?? today();
  const [open,       setOpen]       = useState(false);
  const [viewYear,   setViewYear]   = useState(initial.getFullYear());
  const [viewMonth,  setViewMonth]  = useState(initial.getMonth());
  const [yearInput,  setYearInput]  = useState(String(initial.getFullYear()));
  const [yearEdit,   setYearEdit]   = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync view when value changes externally
  useEffect(() => {
    const d = isoToDate(iso);
    if (d) {
      setViewYear(d.getFullYear());
      setViewMonth(d.getMonth());
      setYearInput(String(d.getFullYear()));
    }
  }, [iso]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setYearEdit(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // ── Derived values ──────────────────────────────────────────
  const selected  = isoToDate(iso);
  const todayDate = today();
  const minD      = isoToDate(minDate ?? "");
  const maxD      = isoToDate(maxDate ?? "");

  const firstDay   = startOfMonth(viewYear, viewMonth).getDay(); // 0=Sun
  const totalDays  = daysInMonth(viewYear, viewMonth);

  // Build grid: leading nulls + day numbers
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  // ── Handlers ────────────────────────────────────────────────
  const prevMonth = useCallback(() => {
    setViewMonth(m => { if (m === 0) { setViewYear(y => y - 1); return 11; } return m - 1; });
  }, []);

  const nextMonth = useCallback(() => {
    setViewMonth(m => { if (m === 11) { setViewYear(y => y + 1); return 0; } return m + 1; });
  }, []);

  const selectDay = useCallback((day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    onChange(dateToIso(d));
    setOpen(false);
    setYearEdit(false);
  }, [viewYear, viewMonth, onChange]);

  const clearDate = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  }, [onChange]);

  const isDayDisabled = useCallback((day: number): boolean => {
    const d = new Date(viewYear, viewMonth, day);
    if (minD && d < minD) return true;
    if (maxD && d > maxD) return true;
    return false;
  }, [viewYear, viewMonth, minD, maxD]);

  const isDaySelected = useCallback((day: number): boolean => {
    if (!selected) return false;
    return sameDay(selected, new Date(viewYear, viewMonth, day));
  }, [selected, viewYear, viewMonth]);

  const isDayToday = useCallback((day: number): boolean => {
    return sameDay(todayDate, new Date(viewYear, viewMonth, day));
  }, [todayDate, viewYear, viewMonth]);

  const commitYearInput = useCallback(() => {
    const y = parseInt(yearInput, 10);
    if (!isNaN(y) && y >= 1800 && y <= 2100) setViewYear(y);
    else setYearInput(String(viewYear));
    setYearEdit(false);
  }, [yearInput, viewYear]);

  // ── Display value ────────────────────────────────────────────
  const displayValue = selected
    ? `${selected.getDate()} ${MONTHS[selected.getMonth()]} ${selected.getFullYear()}`
    : "";

  // ── Render ───────────────────────────────────────────────────
  return (
    <div style={S.group} ref={containerRef} className="position-relative">
      {/* Label */}
      <label style={S.label}>
        {label}
        {required && <span style={S.required}>*</span>}
      </label>

      {/* Trigger button */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => { setOpen(o => !o); onFocus(); }}
        onBlur={onBlur}
        onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(o => !o); } }}
        style={{
          ...S.input,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          userSelect: "none",
          borderColor: open ? C.borderFocus : C.border,
          boxShadow: open ? `0 0 0 3px rgba(59,130,246,0.1)` : "none",
        }}
      >
        <span style={{ color: displayValue ? C.textPrimary : C.textMuted, fontSize: 13 }}>
          {displayValue || "Select date…"}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {/* Clear button */}
          {iso && (
            <span
              role="button"
              onClick={clearDate}
              title="Clear date"
              style={{ color: C.textMuted, fontSize: 14, lineHeight: 1, padding: "0 2px", cursor: "pointer" }}
            >
              ×
            </span>
          )}
          {/* Calendar icon */}
          <CalendarIcon color={open ? C.accent : C.textMuted} />
        </div>
      </div>

      {/* Calendar dropdown */}
      {open && (
        <div style={{
          position: "relative",
          zIndex: 200,
          marginTop: 4,
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: 16,
          width: 280,
          boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
          animation: "fadeSlideIn 0.15s ease",
        }}>

          {/* Month / year navigation */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <NavButton onClick={prevMonth} label="‹" />

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {/* Month selector */}
              <select
                value={viewMonth}
                onChange={e => setViewMonth(Number(e.target.value))}
                style={{ background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 6, color: C.textPrimary, fontSize: 13, padding: "3px 6px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
              >
                {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
              </select>

              {/* Year — click to edit inline */}
              {yearEdit ? (
                <input
                  autoFocus
                  value={yearInput}
                  onChange={e => setYearInput(e.target.value)}
                  onBlur={commitYearInput}
                  onKeyDown={e => { if (e.key === "Enter") commitYearInput(); if (e.key === "Escape") { setYearEdit(false); setYearInput(String(viewYear)); } }}
                  style={{ width: 60, background: C.surfaceHigh, border: `1px solid ${C.borderFocus}`, borderRadius: 6, color: C.textPrimary, fontSize: 13, padding: "3px 6px", textAlign: "center", outline: "none", fontFamily: "'DM Mono', monospace" }}
                />
              ) : (
                <button
                  onClick={() => { setYearEdit(true); setYearInput(String(viewYear)); }}
                  title="Click to type year"
                  style={{ background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 6, color: C.textPrimary, fontSize: 13, padding: "3px 10px", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}
                >
                  {viewYear}
                </button>
              )}
            </div>

            <NavButton onClick={nextMonth} label="›" />
          </div>

          {/* Day-of-week headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 6 }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: "center", fontSize: 10, color: C.textDim, fontFamily: "'DM Mono', monospace", padding: "2px 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
            {cells.map((day, idx) => {
              if (day === null) return <div key={`empty-${idx}`} />;

              const isSelected = isDaySelected(day);
              const isToday    = isDayToday(day);
              const isDisabled = isDayDisabled(day);

              return (
                <button
                  key={day}
                  onClick={() => !isDisabled && selectDay(day)}
                  disabled={isDisabled}
                  style={{
                    width: "100%", aspectRatio: "1", border: "none", borderRadius: 6,
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    fontSize: 12,
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: isSelected || isToday ? 700 : 400,
                    background: isSelected
                      ? C.accent
                      : isToday
                        ? C.todayFaint
                        : "transparent",
                    color: isDisabled
                      ? C.disabled
                      : isSelected
                        ? "#000"
                        : isToday
                          ? C.today
                          : C.textPrimary,
                    outline: isToday && !isSelected ? `1px solid ${C.today}44` : "none",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={e => {
                    if (!isSelected && !isDisabled) {
                      (e.currentTarget as HTMLButtonElement).style.background = C.accentFaint;
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isSelected && !isDisabled) {
                      (e.currentTarget as HTMLButtonElement).style.background = isToday ? C.todayFaint : "transparent";
                    }
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Footer — Today shortcut */}
          <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 12, paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button
              onClick={() => { onChange(dateToIso(todayDate)); setOpen(false); }}
              style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 6, color: C.today, fontSize: 11, padding: "4px 10px", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}
            >
              Today
            </button>
            {selected && (
              <span style={{ fontSize: 11, color: C.textMuted, fontFamily: "'DM Mono', monospace" }}>
                {dateToIso(selected)}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Small internal components
// ─────────────────────────────────────────────────────────────
function NavButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 28, height: 28, background: C.surfaceHigh, border: `1px solid ${C.border}`,
        borderRadius: 6, color: C.textPrimary, cursor: "pointer", fontSize: 16,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {label}
    </button>
  );
}

function CalendarIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="3" width="14" height="12" rx="2" stroke={color} strokeWidth="1.4" />
      <path d="M1 7h14" stroke={color} strokeWidth="1.4" />
      <path d="M5 1v4M11 1v4" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <rect x="4" y="9.5" width="2" height="2" rx="0.5" fill={color} />
      <rect x="7" y="9.5" width="2" height="2" rx="0.5" fill={color} />
      <rect x="10" y="9.5" width="2" height="2" rx="0.5" fill={color} />
      <rect x="4" y="12" width="2" height="2" rx="0.5" fill={color} />
      <rect x="7" y="12" width="2" height="2" rx="0.5" fill={color} />
    </svg>
  );
}