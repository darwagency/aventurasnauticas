# Aventuras Náuticas

Landing page para kayak y stand-up paddle en Laguna Grande, San Pedro de la Paz.

## Stack

- Next.js 16.3.6 con App Router
- React 19.3.0
- Tailwind CSS 4.3.3
- TypeScript 5.9.3

## Desarrollo local

Requiere Node.js 20.9 o posterior.

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Producción

```bash
npm run build
npm run start
```

El proyecto está preparado para importarlo en Vercel. Los videos optimizados y sus portadas WebP se sirven desde `public/media`. El cotizador prepara una consulta para WhatsApp y la ubicación muestra un mapa interactivo de OpenStreetMap.
