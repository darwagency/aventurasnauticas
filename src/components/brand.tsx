import Image from "next/image";

export function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#inicio" className={`brand ${dark ? "brand-dark" : ""}`} aria-label="Aventuras Náuticas, volver al inicio">
      <Image src="/media/logo.png" alt="" width={52} height={52} className="brand-logo" priority />
      <span className="brand-name">AVENTURAS <strong>NÁUTICAS</strong><small>LAGUNA GRANDE</small></span>
    </a>
  );
}
