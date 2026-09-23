"use client";

import { useState, type FormEvent } from "react";
import { earliestReservationDate, localDateFromISO, ReservationDatePicker } from "@/components/reservation-date-picker";

const rates: Record<string, { price: number; duration: string }> = {
  "Kayak doble o triple": { price: 9000, duration: "1 hora" },
  "Kayak individual": { price: 15000, duration: "1 hora" },
  "Stand up paddle": { price: 12000, duration: "1 hora 30 minutos" },
};

const formatCLP = (amount: number) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(amount);

export function WhatsAppForm() {
  const [activity, setActivity] = useState("Kayak doble o triple");
  const [people, setPeople] = useState("2");
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const count = Number(people);
  const estimatedTotal = rates[activity] && count > 0 ? rates[activity].price * count : null;

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!date) {
      setDateError("Selecciona una fecha para consultar la reserva.");
      return;
    }
    if (localDateFromISO(date) < earliestReservationDate()) {
      setDateError("La fecha debe ser desde mañana y dentro de la temporada.");
      return;
    }
    setDateError("");
    const message = [
      "Hola, quiero consultar una reserva en Aventuras Náuticas.",
      `Nombre: ${name.trim()}`,
      `Actividad: ${activity}`,
      `Personas: ${people}`,
      `Fecha tentativa: ${new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "long", year: "numeric" }).format(localDateFromISO(date))}`,
      estimatedTotal ? `Valor referencial octubre 2026: ${formatCLP(estimatedTotal)}` : "",
      note.trim() ? `Consulta: ${note.trim()}` : "",
      "¿Me confirman disponibilidad, horario y valor final?",
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/56977412620?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return <form className="booking-form" onSubmit={send}>
    <div className="form-heading"><span>COTIZADOR RÁPIDO</span><strong>Arma tu aventura</strong><p>Cuéntanos lo básico. Verás un valor estimado antes de abrir WhatsApp.</p></div>
    <label>Tu nombre<input required maxLength={60} value={name} onChange={(event) => setName(event.target.value)} placeholder="¿Cómo te llamas?" /></label>
    <div className="form-row"><label>Experiencia<select value={activity} onChange={(event) => setActivity(event.target.value)}><option>Kayak doble o triple</option><option>Kayak individual</option><option>Stand up paddle</option><option>Necesito orientación</option></select></label><label>Personas<input required type="number" min="1" max="20" value={people} onChange={(event) => setPeople(event.target.value)} /></label></div>
    <ReservationDatePicker value={date} onChange={(selected) => { setDate(selected); setDateError(""); }} error={dateError} />
    <label>Algo más que debamos saber <span>(opcional)</span><textarea rows={3} maxLength={300} value={note} onChange={(event) => setNote(event.target.value)} placeholder="Por ejemplo, si es tu primera vez o si irán niños" /></label>
    <div className="quote-result" aria-live="polite"><div><span>Valor estimado</span><strong>{estimatedTotal === null ? "A consultar" : formatCLP(estimatedTotal)}</strong></div><p>{rates[activity] ? `${rates[activity].duration} · ${formatCLP(rates[activity].price)} por persona` : "Te ayudamos a elegir la experiencia ideal."}</p></div>
    <button className="button button-sun form-submit" type="submit">Preparar mensaje para WhatsApp ↗</button>
    <p className="form-footnote">Tarifas publicadas para octubre de 2026. El equipo confirma disponibilidad y valor final antes de reservar.</p>
  </form>;
}
