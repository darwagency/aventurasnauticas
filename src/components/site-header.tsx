"use client";

import { useState } from "react";
import { Brand } from "@/components/brand";

const links = [
  { href: "#videos", label: "La experiencia" },
  { href: "#reserva", label: "Cotizar" },
  { href: "#experiencias", label: "Actividades" },
  { href: "#tarifas", label: "Tarifas" },
  { href: "#guias", label: "Antes de venir" },
  { href: "#visitanos", label: "Ubicación" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-ribbon">
        <div className="container header-ribbon-inner">
          <span>✳ LAGUNA GRANDE · SAN PEDRO DE LA PAZ</span>
          <span>TEMPORADA DESDE EL 1 DE OCTUBRE DE 2026 · RESERVA PREVIA</span>
        </div>
      </div>
      <div className="container header-inner">
        <Brand dark />
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          <span className="menu-icon" aria-hidden="true"><i /><i /></span>
        </button>
        <nav id="site-nav" className={`site-nav ${open ? "open" : ""}`} aria-label="Navegación principal">
          {links.map((link) => (
            <a href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.label}</a>
          ))}
          <a href="#reserva" className="header-cta" onClick={() => setOpen(false)}>Planear mi salida <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>
  );
}
