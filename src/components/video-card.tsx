"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type VideoCardProps = {
  number: string;
  title: string;
  caption: string;
  src: string;
  poster: string;
  playing: boolean;
  onToggle: (video: HTMLVideoElement) => void;
  onEnded: (video: HTMLVideoElement) => void;
};

export function VideoCard({ number, title, caption, src, poster, playing, onToggle, onEnded }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  return (
    <article className="film-card">
      <div className="film-media">
        {!started && <Image src={poster} alt="" fill sizes="(max-width: 700px) 79vw, 60vw" className="film-poster" />}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="none"
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          className={started ? "" : "video-pending"}
          onContextMenu={(event) => event.preventDefault()}
          onEnded={() => { if (videoRef.current) onEnded(videoRef.current); }}
        />
        <button
          type="button"
          className={`film-control${playing ? " is-playing" : ""}`}
          onClick={() => { if (videoRef.current) { setStarted(true); onToggle(videoRef.current); } }}
          onContextMenu={(event) => event.preventDefault()}
          aria-label={`${playing ? "Pausar" : "Reproducir"} ${title}`}
        >
          <span className="film-play-icon" aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
        </button>
        <span className="film-index">{number} / 03</span>
      </div>
      <div className="film-meta"><span>{caption}</span><h3>{title}</h3></div>
    </article>
  );
}
