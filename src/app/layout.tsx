import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aventuras Náuticas | Kayak y SUP en Laguna Grande",
  description:
    "Kayak y stand-up paddle en Laguna Grande, San Pedro de la Paz. Agua tranquila, naturaleza y un rato para ti.",
  applicationName: "Aventuras Náuticas",
  keywords: [
    "kayak Laguna Grande",
    "stand-up paddle San Pedro de la Paz",
    "Aventuras Náuticas",
  ],
  openGraph: {
    title: "Aventuras Náuticas | Kayak y SUP en Laguna Grande",
    description:
      "Un panorama para bajar el ritmo y disfrutar Laguna Grande, en San Pedro de la Paz.",
    locale: "es_CL",
    siteName: "Aventuras Náuticas",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#061e30",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CL" className={`${dmSans.variable} ${playfairDisplay.variable} antialiased`}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
