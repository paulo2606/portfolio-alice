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
    title: "Cobertura de eventos",
    description:
      "Do início ao fim da celebração, registrando os momentos que fazem a festa ser única, sem perder nenhum detalhe.",
    video: "/video/projects/festa-15/festa-15-3.mp4",
  },
  {
    title: "Edição em tempo real",
    description:
      "Seu vídeo editado e pronto em tempo real para postar enquanto o evento acontece, com o clima e a energia do momento intactos.",
    video: "/video/projects/eventos/eventos-1.mp4",
  },
  {
    title: "Momentos espontâneos",
    description:
      "Registro natural e sem poses forçadas, capturando reações e afetos reais de quem está ali.",
    video: "/video/projects/aniversarios/aniversarios-5.mp4",
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

  function playVideo(video: HTMLVideoElement | null) {
    if (!video) return;
    video.muted = true;
    try {
      video.play()?.catch(() => {});
    } catch {
      // ambientes sem suporte a play() (ex: jsdom em testes)
    }
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

      <ul className="mt-12 grid gap-6 min-[800px]:grid-cols-3">
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
              className="group relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
            >
              <video
                ref={playVideo}
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

      <div className="mt-12 flex justify-center">
        <a
          href={buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE_OPTIONS[1].message)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-rose px-8 py-4 font-body text-base text-paper transition-colors hover:bg-[#a83a5c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
        >
          Quero contratar um serviço assim
        </a>
      </div>

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
