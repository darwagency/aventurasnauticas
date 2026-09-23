"use client";

import { useRef, useState } from "react";
import { VideoCard } from "@/components/video-card";

const films = [
  { number: "01", title: "La laguna desde dentro", caption: "AVENTURAS NÁUTICAS", src: "/media/reel-aventuras.mp4", poster: "/media/group-clean.webp" },
  { number: "02", title: "Un día para recordar", caption: "HISTORIAS EN EL AGUA", src: "/media/reel-isidora-small.mp4", poster: "/media/paddle-clean.webp" },
  { number: "03", title: "Rema a tu manera", caption: "DESDE LA ORILLA", src: "/media/reel-nashinu.mp4", poster: "/media/selfie-clean.webp" },
];

export function VideoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const activeVideoRef = useRef<HTMLVideoElement | null>(null);
  const [activeSrc, setActiveSrc] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  function stopVideo() {
    const active = activeVideoRef.current;
    activeVideoRef.current = null;
    active?.pause();
    setActiveSrc(null);
  }

  function toggleVideo(src: string, video: HTMLVideoElement) {
    if (activeVideoRef.current === video && !video.paused) {
      stopVideo();
      return;
    }
    const previous = activeVideoRef.current;
    activeVideoRef.current = video;
    previous?.pause();
    setActiveSrc(src);
    void video.play().catch(() => {
      if (activeVideoRef.current === video) stopVideo();
    });
  }

  function targetLeft(index: number) {
    const track = trackRef.current;
    if (!track) return 0;
    const cards = Array.from(track.children) as HTMLElement[];
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    return Math.min(maxScroll, cards[index].offsetLeft - cards[0].offsetLeft);
  }

  function goTo(index: number) {
    const next = Math.max(0, Math.min(films.length - 1, index));
    stopVideo();
    setCurrentIndex(next);
    trackRef.current?.scrollTo({ left: targetLeft(next), behavior: "smooth" });
  }

  function trackScroll() {
    const track = trackRef.current;
    if (!track) return;
    let closest = 0;
    let distance = Infinity;
    films.forEach((_, index) => {
      const gap = Math.abs(track.scrollLeft - targetLeft(index));
      if (gap < distance) { distance = gap; closest = index; }
    });
    if (closest !== currentIndex) {
      stopVideo();
      setCurrentIndex(closest);
    }
  }

  function videoEnded(video: HTMLVideoElement) {
    if (activeVideoRef.current === video) {
      activeVideoRef.current = null;
      setActiveSrc(null);
    }
  }

  return (
    <div className="video-carousel">
      <div className="video-carousel-head">
        <p><span aria-hidden="true">↔</span><strong>DESLIZA PARA VER LOS 3 VIDEOS</strong></p>
        <div className="video-carousel-nav">
          <button type="button" onClick={() => goTo(currentIndex - 1)} disabled={currentIndex === 0} aria-label="Video anterior">←</button>
          <span aria-live="polite">{String(currentIndex + 1).padStart(2, "0")} <em>/</em> {String(films.length).padStart(2, "0")}</span>
          <button type="button" onClick={() => goTo(currentIndex + 1)} disabled={currentIndex === films.length - 1} aria-label="Video siguiente">→</button>
        </div>
      </div>
      <div className="video-stage" ref={trackRef} onScroll={trackScroll} role="region" aria-label="Carrusel de videos de Laguna Grande" tabIndex={0}>
        {films.map((film) => <VideoCard key={film.src} {...film} playing={activeSrc === film.src} onToggle={(video) => toggleVideo(film.src, video)} onEnded={videoEnded} />)}
      </div>
      <div className="video-carousel-dots" aria-label="Elegir video">
        {films.map((film, index) => <button type="button" key={film.src} className={index === currentIndex ? "active" : ""} onClick={() => goTo(index)} aria-label={`Ir al video ${index + 1}: ${film.title}`} aria-current={index === currentIndex ? "true" : undefined} />)}
      </div>
    </div>
  );
}
