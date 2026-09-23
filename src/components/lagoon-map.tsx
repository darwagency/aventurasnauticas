"use client";

import { useEffect, useRef } from "react";

const lagoon: [number, number] = [-36.84683, -73.10587];

export function LagoonMap() {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!element.current) return;
    let cancelled = false;
    let map: import("leaflet").Map | undefined;

    async function start() {
      const leaflet = await import("leaflet");
      if (cancelled || !element.current) return;

      map = leaflet.map(element.current, { scrollWheelZoom: false }).setView(lagoon, 14);
      leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      leaflet.circleMarker(lagoon, {
        radius: 10,
        color: "#fff",
        weight: 3,
        fillColor: "#ef875d",
        fillOpacity: 1,
      }).addTo(map).bindPopup("Laguna Grande · San Pedro de la Paz");
    }

    void start();
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return <div ref={element} className="lagoon-map" role="region" aria-label="Mapa interactivo de Laguna Grande, San Pedro de la Paz" />;
}
