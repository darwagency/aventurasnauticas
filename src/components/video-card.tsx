"use client";

import Image from "next/image";
import { useState } from "react";

type VideoCardProps = {
  number: string;
  title: string;
  caption: string;
  src: string;
  poster: string;
  featured?: boolean;
};

export function VideoCard({ number, title, caption, src, poster, featured = false }: VideoCardProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className={`film-card ${featured ? "film-card-featured" : ""}`}>
      <div className="film-media">
        {playing ? (
          <video controls autoPlay playsInline preload="metadata" poster={poster} aria-label={title}>
            <source src={src} type="video/mp4" />
            Tu navegador no admite videos.
          </video>
        ) : (
          <button type="button" className="film-play" onClick={() => setPlaying(true)} aria-label={`Reproducir ${title}`}>
            <Image src={poster} alt="" fill sizes={featured ? "(max-width: 700px) 82vw, 33vw" : "(max-width: 700px) 82vw, 27vw"} className="cover-image" />
            <span className="film-play-icon" aria-hidden="true">▶</span>
          </button>
        )}
        <span className="film-index">{number} / 03</span>
      </div>
      <div className="film-meta"><span>{caption}</span><h3>{title}</h3></div>
    </article>
  );
}
