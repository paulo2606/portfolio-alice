"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-sm bg-paper p-6 sm:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          data-close-button
          onClick={onClose}
          aria-label="Fechar"
          className="mb-4 ml-auto block font-body text-sm text-ink/70 hover:text-rose focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
        >
          Fechar ✕
        </button>

        <h2 id="project-modal-title" className="font-display text-3xl italic text-rose">
          {project.title}
        </h2>

        <div className="mt-4 flex flex-col gap-4 font-body text-base leading-relaxed text-ink">
          {project.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2">
          {project.gallery.map((image) => (
            <button
              key={image.src}
              type="button"
              aria-label={image.alt}
              onClick={() => setLightbox(image)}
              className="relative aspect-square overflow-hidden rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
            >
              <Image src={image.src} alt={image.alt} fill sizes="200px" className="object-cover" />
            </button>
          ))}
        </div>

        {lightbox && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-6"
            onClick={() => setLightbox(null)}
          >
            <Image
              data-testid="lightbox-image"
              src={lightbox.src}
              alt={lightbox.alt}
              width={1200}
              height={1200}
              className="max-h-full w-auto max-w-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}
