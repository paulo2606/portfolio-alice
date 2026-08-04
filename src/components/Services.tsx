"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  WHATSAPP_MESSAGE_OPTIONS,
  WHATSAPP_NUMBER,
  buildWhatsAppLink,
} from "@/lib/whatsapp";
import { Reveal } from "./Reveal";
import { VideoModal } from "./VideoModal";

const SERVICE_CARDS = [
  {
    title: "Stories estratégicos",
    description:
      "Atenção aos mínimos detalhes, captando momentos únicos que fazem toda a diferença.",
    video: "/video/hero_trimmed.mp4",
  },
  {
    title: "Cobertura de eventos",
    description:
      "Edição em tempo real: em menos de 1 hora o vídeo já está no seu perfil, autêntico e no calor do momento.",
    video: "/video/hero.mp4",
  },
  {
    title: "Trends do momento",
    description:
      "Criação de conteúdos baseados em trends do momento (TikTok, Reels, etc.)",
    video: "/video/hero_trimmed.mp4",
  },
];

export function Services() {
  const [openService, setOpenService] = useState<(typeof SERVICE_CARDS)[number] | null>(
    null
  );
  const triggerRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

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
      <Reveal>
        <div className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-rose-soft">
          <span className="block h-1.5 w-1.5 rounded-full bg-rose" />
          Diferenciais
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-4 font-display text-4xl italic text-rose sm:text-5xl">
          Meu diferencial
        </h2>
      </Reveal>

      <ul className="mt-12 grid gap-6 sm:grid-cols-3">
        {SERVICE_CARDS.map((service, index) => (
          <motion.li
            key={service.title}
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 32 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
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
          </motion.li>
        ))}
      </ul>

      <a
        href={buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE_OPTIONS[0].message)}
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
