"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface ProjectGalleryImage {
  src: string;
  alt: string;
  area: string;
}

interface ProjectSidebarProps {
  title: string;
  cover: { src: string; alt: string };
  video?: string;
  gallery: ProjectGalleryImage[];
  onClose: () => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function ProjectSidebar({ title, cover, video, gallery, onClose }: ProjectSidebarProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [lightbox, setLightbox] = useState<ProjectGalleryImage | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
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
        if (lightbox) {
          setLightbox(null);
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
  }, [lightbox, onClose]);

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
            {video ? (
              <video src={video} controls autoPlay playsInline className="aspect-video w-full">
                Seu navegador não suporta vídeo em HTML5.
              </video>
            ) : (
              <div className="relative aspect-video w-full">
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 640px"
                  quality={90}
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>

          {gallery.length > 0 && (
            <>
              <h3 className="mt-10 font-display text-lg italic text-ink">
                Galeria do projeto
              </h3>
              <div className="mt-4 grid aspect-[4/3] grid-cols-4 grid-rows-3 gap-1.5">
                {gallery.map((image) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setLightbox(image)}
                    aria-label={`Ampliar foto: ${image.alt}`}
                    className={`group relative overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose ${image.area}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 320px"
                      className="object-cover grayscale transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </button>
                ))}
              </div>
              <p className="mt-4 font-body text-sm text-ink">
                As fotos da galeria são capturas retiradas dos vídeos, não há serviço de
                fotografia incluso.
              </p>
            </>
          )}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-6"
          onClick={(event) => {
            event.stopPropagation();
            setLightbox(null);
          }}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setLightbox(null);
            }}
            aria-label="Fechar visualização ampliada"
            className="absolute right-6 top-6 font-body text-sm text-paper/80 hover:text-rose focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
          >
            Fechar ✕
          </button>
          <Image
            src={lightbox.src}
            alt={lightbox.alt}
            width={1400}
            height={1400}
            quality={90}
            className="max-h-full w-auto max-w-full object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
