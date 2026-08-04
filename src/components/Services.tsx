"use client";

import { useRef, useState } from "react";
import {
  WHATSAPP_MESSAGE_OPTIONS,
  WHATSAPP_PLACEHOLDER_NUMBER,
  buildWhatsAppLink,
} from "@/lib/whatsapp";
import { VideoModal } from "./VideoModal";

const SERVICE_CARDS = [
  {
    title: "Stories estratégicos",
    description:
      "Planejamento e edição de stories no ritmo certo, pensados pra prender atenção do primeiro ao último segundo.",
    video: "/video/hero_trimmed.mp4",
  },
  {
    title: "Cobertura de eventos",
    description:
      "Acompanho o evento do início ao fim e edito em tempo real, pra quem não estava lá sentir que estava.",
    video: "/video/hero.mp4",
  },
  {
    title: "Making of",
    description:
      "Os bastidores que ninguém mais viu: preparação, ensaios e os detalhes que dão contexto ao dia.",
    video: "/video/hero_trimmed.mp4",
  },
];

export function Services() {
  const [openService, setOpenService] = useState<(typeof SERVICE_CARDS)[number] | null>(
    null
  );
  const triggerRef = useRef<HTMLElement | null>(null);

  function handleOpen(service: (typeof SERVICE_CARDS)[number]) {
    triggerRef.current = document.activeElement as HTMLElement;
    setOpenService(service);
  }

  function handleClose() {
    setOpenService(null);
    triggerRef.current?.focus();
  }

  return (
    <section id="servicos" className="relative py-24">
      <div className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-rose-soft">
        <span className="block h-1.5 w-1.5 rounded-full bg-rose" />
        Serviços
      </div>
      <h2 className="mt-4 font-display text-4xl italic text-rose sm:text-5xl">
        Veja na prática
      </h2>

      <ul className="mt-12 grid gap-6 sm:grid-cols-3">
        {SERVICE_CARDS.map((service) => (
          <li key={service.title}>
            <button
              type="button"
              onClick={() => handleOpen(service)}
              aria-label={`Ver vídeo: ${service.title}`}
              className="group relative aspect-[3/4] w-full overflow-hidden rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
            >
              <video
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={service.video}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-1/2 backdrop-blur-xl [mask-image:linear-gradient(to_top,black_20%,transparent)] [-webkit-mask-image:linear-gradient(to_top,black_20%,transparent)]"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent p-6 text-left">
                <h3 className="font-display text-xl italic text-paper sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-6 text-paper/80">
                  {service.description}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <a
        href={buildWhatsAppLink(WHATSAPP_PLACEHOLDER_NUMBER, WHATSAPP_MESSAGE_OPTIONS[0].message)}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden"
      >
        Entrar em contato
      </a>

      {openService && (
        <VideoModal
          title={openService.title}
          video={openService.video}
          onClose={handleClose}
        />
      )}
    </section>
  );
}
