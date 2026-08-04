"use client";

import { useEffect, useRef, useState } from "react";

interface VideoModalProps {
  title: string;
  video: string;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function VideoModal({ title, video, onClose }: VideoModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
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
        onClose();
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
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
        className={`w-full max-w-2xl overflow-hidden rounded-md bg-paper shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out ${
          entered ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-rose-soft/30 p-6">
          <h2 id="video-modal-title" className="font-display text-2xl italic text-rose">
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

        <div className="bg-ink">
          <video src={video} controls autoPlay playsInline className="aspect-video w-full">
            Seu navegador não suporta vídeo em HTML5.
          </video>
        </div>
      </div>
    </div>
  );
}
