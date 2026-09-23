"use client";

import { useEffect, useState } from "react";

const seasonStart = new Date(2026, 9, 1);
const monthFormatter = new Intl.DateTimeFormat("es-CL", { month: "long", year: "numeric" });
const fullDateFormatter = new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "long", year: "numeric" });
const weekdays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const capitalizeMonth = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export function earliestReservationDate() {
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow > seasonStart ? tomorrow : seasonStart;
}

export function localDateFromISO(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function localISO(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function ReservationDatePicker({ value, onChange, error }: { value: string; onChange: (date: string) => void; error: string }) {
  const [minimum, setMinimum] = useState(earliestReservationDate);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const earliest = earliestReservationDate();
    return new Date(earliest.getFullYear(), earliest.getMonth(), 1);
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    function scheduleRefresh() {
      const now = new Date();
      const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      timer = setTimeout(() => {
        const earliest = earliestReservationDate();
        const firstOfMonth = new Date(earliest.getFullYear(), earliest.getMonth(), 1);
        setMinimum(earliest);
        setVisibleMonth((current) => current < firstOfMonth ? firstOfMonth : current);
        scheduleRefresh();
      }, nextMidnight.getTime() - now.getTime() + 100);
    }
    scheduleRefresh();
    return () => clearTimeout(timer);
  }, []);

  function toggleCalendar() {
    if (!open) {
      const earliest = earliestReservationDate();
      setMinimum(earliest);
      const selected = value ? localDateFromISO(value) : earliest;
      const month = selected >= earliest ? selected : earliest;
      setVisibleMonth(new Date(month.getFullYear(), month.getMonth(), 1));
    }
    setOpen(!open);
  }

  const firstWeekday = (visibleMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0).getDate();
  const previousMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1);
  const canGoBack = previousMonth >= new Date(minimum.getFullYear(), minimum.getMonth(), 1);

  return (
    <div className="reservation-date-field">
      <span className="date-label" id="reservation-date-label">Fecha tentativa</span>
      <button type="button" className={`date-trigger${error ? " has-error" : ""}`} onClick={toggleCalendar} aria-expanded={open} aria-controls="reservation-calendar" aria-labelledby="reservation-date-label reservation-date-value">
        <span id="reservation-date-value">{value ? fullDateFormatter.format(localDateFromISO(value)) : "Selecciona una fecha"}</span>
        <span aria-hidden="true">▦</span>
      </button>
      <span className="date-help">Reserva con al menos un día de anticipación.</span>
      {error && <span className="date-error" role="alert">{error}</span>}
      {open && (
        <div className="reservation-calendar" id="reservation-calendar" role="group" aria-label="Elegir fecha de reserva en español" onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}>
          <div className="calendar-heading">
            <button type="button" aria-label="Mes anterior" disabled={!canGoBack} onClick={() => setVisibleMonth(previousMonth)}>‹</button>
            <strong aria-live="polite">{capitalizeMonth(monthFormatter.format(visibleMonth))}</strong>
            <button type="button" aria-label="Mes siguiente" onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1))}>›</button>
          </div>
          <div className="calendar-grid" role="group" aria-label={monthFormatter.format(visibleMonth)}>
            {weekdays.map((day) => <span className="calendar-weekday" key={day}>{day}</span>)}
            {Array.from({ length: firstWeekday }, (_, index) => <span key={`empty-${index}`} aria-hidden="true" />)}
            {Array.from({ length: daysInMonth }, (_, index) => {
              const day = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), index + 1);
              const iso = localISO(day);
              return <button type="button" key={iso} className={`calendar-day${value === iso ? " selected" : ""}`} disabled={day < minimum} aria-label={fullDateFormatter.format(day)} aria-pressed={value === iso} onClick={() => { onChange(iso); setOpen(false); }}>{index + 1}</button>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
