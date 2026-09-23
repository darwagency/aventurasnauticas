import Image from "next/image";
import { Brand } from "@/components/brand";
import { SiteHeader } from "@/components/site-header";
import { VideoCard } from "@/components/video-card";
import { WhatsAppForm } from "@/components/whatsapp-form";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { Reveal } from "@/components/reveal";
import { LagoonMap } from "@/components/lagoon-map";

const mapUrl = "https://www.google.com/maps/search/?api=1&query=Laguna+Grande%2C+San+Pedro+de+la+Paz%2C+Chile";

const films = [
  { number: "01", title: "La laguna desde dentro", caption: "AVENTURAS NÁUTICAS", src: "/media/reel-aventuras.mp4", poster: "/media/group-clean.webp" },
  { number: "02", title: "Un día para recordar", caption: "HISTORIAS EN EL AGUA", src: "/media/reel-isidora-small.mp4", poster: "/media/paddle-clean.webp" },
  { number: "03", title: "Rema a tu manera", caption: "DESDE LA ORILLA", src: "/media/reel-nashinu.mp4", poster: "/media/selfie-clean.webp" },
];

const essentials = [
  { number: "01", title: "Ven preparado", text: "Trae ropa cómoda, bloqueador, sombrero, agua y una muda. Llega con tiempo para disfrutar tu salida desde el inicio." },
  { number: "02", title: "Nosotros ponemos el resto", text: "Recibirás una inducción y chaleco salvavidas. Hay fundas para el celular y una zona de vestidores." },
  { number: "03", title: "Cuidemos este lugar", text: "Observa las aves a distancia, navega por las rutas indicadas, evita el ruido y regresa con todos tus residuos." },
];

export default function Home() {
  return (
    <div className="site-shell">
      <a href="#contenido" className="skip-link">Ir al contenido</a>
      <SiteHeader />
      <main id="contenido">
        <section className="hero" id="inicio">
          <div className="container hero-grid">
            <div className="hero-copy enter">
              <p className="eyebrow light">KAYAK · SUP · LAGUNA GRANDE</p>
              <h1>Hay días que<br />se viven <em>mejor<br />en el agua.</em></h1>
              <p className="hero-lead">Descubre Laguna Grande a tu ritmo. Naturaleza, agua tranquila y una aventura que empieza a pocos minutos de la ciudad.</p>
              <div className="hero-actions">
                <a className="button button-sun" href="#videos">Mira la experiencia <span aria-hidden="true">↓</span></a>
                <a className="text-link light-link" href="#reserva">Planear mi salida ↗</a>
              </div>
              <div className="hero-note"><span aria-hidden="true">✳</span><p><strong>Nos vemos desde el 1 de octubre de 2026</strong><br />Reserva antes de venir y confirma tu cupo por WhatsApp.</p></div>
            </div>
            <div className="hero-visual enter-delay"><Image src="/media/group-clean.webp" alt="Grupo de visitantes en kayaks y tablas SUP en Laguna Grande" fill priority loading="eager" sizes="(max-width: 700px) 100vw, 50vw" className="cover-image" /></div>
          </div>
          <div className="container hero-bottom"><span>SAN PEDRO DE LA PAZ · BIOBÍO</span><span>REMAR · RESPIRAR · DISFRUTAR</span></div>
        </section>

        <section className="section moments" id="videos">
          <div className="container">
            <Reveal><div className="section-intro video-intro"><div><p className="eyebrow">ASÍ SE SIENTE</p><h2>Un vistazo real<br /><em>a la laguna.</em></h2></div><p>El agua, las risas y esa vista que cambia todo. Reproduce las historias y empieza a imaginar la tuya.</p></div></Reveal>
            <div className="video-stage">{films.map((film, index) => <Reveal key={film.src}><VideoCard {...film} featured={index === 0} /></Reveal>)}</div>
            <div className="video-outro"><span>3 MOMENTOS · UNA MISMA LAGUNA</span><a className="text-link" href="https://www.instagram.com/aventurasnauticas.cl/" target="_blank" rel="noopener noreferrer">Ver más en Instagram ↗</a></div>
          </div>
        </section>

        <section className="section booking" id="reserva">
          <div className="container booking-grid">
            <Reveal><div className="booking-story"><p className="eyebrow light">TU AVENTURA, EN POCOS PASOS</p><h2>Haz espacio para<br /><em>un buen día.</em></h2><p>Elige la actividad, cuéntanos cuántos vienen y mira un valor referencial. Tu consulta llegará lista a WhatsApp para confirmar fecha, hora y cupos.</p><div className="booking-photo"><Image src="/media/selfie-clean.webp" alt="Visitantes disfrutando una salida en kayak en Laguna Grande" fill sizes="(max-width: 700px) 100vw, 42vw" className="cover-image" /></div></div></Reveal>
            <Reveal><WhatsAppForm /></Reveal>
          </div>
        </section>

        <section className="section experiences" id="experiencias">
          <div className="container">
            <Reveal><div className="section-intro"><div><p className="eyebrow">DOS FORMAS DE DISFRUTAR</p><h2>Elige cómo<br /><em>vivir la laguna.</em></h2></div><p>Te recibimos con el equipo listo y una breve inducción. Tú eliges el ritmo del paseo.</p></div></Reveal>
            <div className="experience-grid">
              <Reveal><article className="experience-card"><div className="experience-photo"><Image src="/media/kayak-clean.webp" alt="Mujer disfrutando de un kayak en Laguna Grande" fill sizes="(max-width: 700px) 100vw, 50vw" className="cover-image" /></div><div className="experience-content"><span>01 / KAYAK</span><h3>Comparte el recorrido</h3><p>Sal en kayak individual, doble o triple. Los kayaks inflables son estables y una buena forma de descubrir la laguna por primera vez.</p><a className="text-link" href="#reserva">Cotizar kayak ↗</a></div></article></Reveal>
              <Reveal><article className="experience-card"><div className="experience-photo"><Image src="/media/paddle-clean.webp" alt="Mujer de pie en una tabla de stand up paddle" fill sizes="(max-width: 700px) 100vw, 50vw" className="cover-image" /></div><div className="experience-content"><span>02 / STAND UP PADDLE</span><h3>Encuentra tu equilibrio</h3><p>Explora la laguna sobre una tabla SUP. Puedes empezar sentado o de rodillas y avanzar a tu propio ritmo.</p><a className="text-link" href="#reserva">Cotizar SUP ↗</a></div></article></Reveal>
            </div>
          </div>
        </section>

        <section className="section pricing" id="tarifas">
          <div className="container pricing-grid">
            <Reveal><div><p className="eyebrow">VALORES ANUNCIADOS · OCTUBRE 2026</p><h2>Tu próxima salida,<br /><em>con todo claro.</em></h2><p>Agenda con al menos dos días de anticipación. Estos valores son por persona y la disponibilidad se confirma por WhatsApp.</p><div className="price-list"><div><span>Tabla SUP <small>1 hora 30 minutos</small></span><strong>$12.000 <small>por persona</small></strong></div><div><span>Kayak doble o triple <small>1 hora</small></span><strong>$9.000 <small>por persona</small></strong></div><div><span>Kayak individual <small>1 hora</small></span><strong>$15.000</strong></div></div><a href="#reserva" className="button button-dark">Preparar mi consulta ↗</a></div></Reveal>
            <Reveal><div className="pricing-photo"><Image src="/media/sup-clean.webp" alt="Persona sobre una tabla SUP en la laguna" fill sizes="(max-width: 700px) 100vw, 40vw" className="cover-image" /></div></Reveal>
          </div>
        </section>

        <section className="section guides" id="guias">
          <div className="container">
            <Reveal><div className="section-intro"><div><p className="eyebrow">ANTES DE REMAR</p><h2>Disfruta con calma.<br /><em>Cuida con intención.</em></h2></div><p>La Laguna Grande es un Santuario de la Naturaleza. Conocer lo básico ayuda a disfrutarla mejor y proteger a sus habitantes.</p></div></Reveal>
            <div className="essentials-grid">{essentials.map((item) => <Reveal key={item.number}><article className="essential-card"><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article></Reveal>)}</div>
          </div>
        </section>

        <section className="nature">
          <div className="container nature-grid">
            <Reveal><div><p className="eyebrow light">UN SANTUARIO COMPARTIDO</p><h2>La mejor aventura<br /><em>cuida su entorno.</em></h2><p>Podrás observar cisnes, taguas, garzas y patos. Mantén al menos cinco metros de distancia, nunca les des comida y sigue las rutas indicadas. Navegar aquí también significa cuidar su hogar.</p><a className="text-link light-link" href="#reserva">Vivir la experiencia con respeto ↗</a></div></Reveal>
            <Reveal><div className="nature-photo"><Image src="/media/group-clean.webp" alt="Visitantes navegando junto al bosque de Laguna Grande" fill sizes="(max-width: 700px) 100vw, 45vw" className="cover-image" /></div></Reveal>
          </div>
        </section>

        <section className="visit" id="visitanos">
          <div className="container visit-grid">
            <div className="visit-copy"><p className="eyebrow">ENCUÉNTRANOS</p><h2>A un paso de la ciudad.<br /><em>En otro ritmo.</em></h2><p>Te esperamos en Laguna Grande, San Pedro de la Paz, Región del Biobío. Reserva tu salida antes de venir.</p><a className="text-link" href={mapUrl} target="_blank" rel="noopener noreferrer">Abrir ruta en Google Maps ↗</a></div>
            <div className="map-frame"><LagoonMap /></div>
          </div>
        </section>
      </main>
      <footer><div className="container footer-grid"><Brand /><p>Laguna Grande<br />San Pedro de la Paz · Biobío</p><div><a href="https://www.instagram.com/aventurasnauticas.cl/" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="https://wa.me/56977412620" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></div><small>© 2026 Aventuras Náuticas</small></div></footer>
      <FloatingWhatsApp />
    </div>
  );
}
