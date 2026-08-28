"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectVideo } from "@/lib/projects";
import { VideoModal } from "./VideoModal";

interface ProjectSidebarProps {
  title: string;
  category: string;
  summary: string;
  deliverables: string[];
  featured: ProjectVideo;
  gallery: ProjectVideo[];
  onClose: () => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function ProjectSidebar({
  title,
  category,
  summary,
  deliverables,
  featured,
  gallery,
  onClose,
}: ProjectSidebarProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [openVideo, setOpenVideo] = useState<{ title: string; video: ProjectVideo } | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const scrollY = window.scrollY;
    const previous = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = previous.overflow;
      document.body.style.position = previous.position;
      document.body.style.top = previous.top;
      document.body.style.width = previous.width;
      window.scrollTo(0, scrollY);
    };
  }, []);

  useEffect(() => {
    const closeButton = dialogRef.current?.querySelector<HTMLButtonElement>(
      "[data-close-button]"
    );
    closeButton?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        if (openVideo) {
          setOpenVideo(null);
        } else {
          onClose();
        }
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openVideo, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-ink/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-sidebar-title"
        className={`flex h-full w-full flex-col overflow-y-auto bg-paper shadow-[-30px_0_60px_-30px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-out sm:max-w-xl md:max-w-2xl ${
          entered ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-rose-soft/30 p-6 sm:p-8">
          <h2 id="project-sidebar-title" className="font-display text-2xl italic text-rose">
            {title}
          </h2>
          <button
            type="button"
            data-close-button
            onClick={onClose}
            aria-label="Fechar"
            className="font-body text-sm text-ink/70 hover:text-rose focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
          >
            Fechar ✕
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
            <video
              src={featured.src}
              poster={featured.poster}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full"
            >
              Seu navegador não suporta vídeo em HTML5.
            </video>
          </div>

          <div className="mt-8">
            <p className="font-body text-sm uppercase tracking-[0.3em] text-rose-soft">
              {category}
            </p>
            <p className="mt-3 font-body text-base leading-7 text-ink/80">{summary}</p>
            <ul className="mt-4 flex flex-col gap-2">
              {deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 font-body text-sm text-ink/80"
                >
                  <span className="block h-1.5 w-1.5 shrink-0 rounded-full bg-rose" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <h3 className="mt-10 font-display text-lg italic text-ink">Galeria do projeto</h3>
          <div className="mt-4 grid grid-cols-3 gap-1.5">
            {gallery.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() =>
                  setOpenVideo({ title: `${title} — vídeo ${index + 1}`, video: item })
                }
                aria-label={`Ver vídeo ${index + 1} de ${title}`}
                className="group relative aspect-square overflow-hidden rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
              >
                <video
                  src={item.src}
                  poster={item.poster}
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {openVideo && (
        <VideoModal
          title={openVideo.title}
          video={openVideo.video.src}
          onClose={() => setOpenVideo(null)}
        />
      )}
    </div>
  );
}
