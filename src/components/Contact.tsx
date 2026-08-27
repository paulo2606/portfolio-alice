"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  WHATSAPP_MESSAGE_OPTIONS,
  WHATSAPP_NUMBER,
  buildWhatsAppLink,
  composeInquiryMessage,
} from "@/lib/whatsapp";
import { SOCIAL_LINKS } from "@/lib/social";
import { InstagramIcon, PaperPlaneIcon, TikTokIcon } from "./icons";
import { Reveal } from "./Reveal";

const SOCIAL_ICONS = {
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
};

export function Contact() {
  const [message, setMessage] = useState(WHATSAPP_MESSAGE_OPTIONS[0].message);
  const [isDesktop, setIsDesktop] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");

  useEffect(() => {
    const query = window.matchMedia("(min-width: 640px)");
    setIsDesktop(query.matches);
    function handleChange(event: MediaQueryListEvent) {
      setIsDesktop(event.matches);
    }
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return (
    <section id="contato" className="relative py-24">
      <div className="grid gap-10 md:grid-cols-2">
        <Reveal x={-30} y={0} className="flex flex-col items-center text-center">
          <h2 className="font-display text-4xl italic text-rose sm:text-5xl">
            Vamos criar sua próxima história?
          </h2>
          <div className="my-4 flex items-center">
            <span className="h-px w-24 bg-rose-soft/30" />
          </div>
          <div className="relative flex flex-1 flex-col items-center justify-center">
            <Image
              src="/images/camera-3d.png"
              alt=""
              aria-hidden="true"
              width={800}
              height={669}
              className="animate-float w-48 drop-shadow-[0_20px_20px_rgba(36,20,23,0.3)] sm:w-64"
              priority
            />
            <span
              aria-hidden="true"
              className="animate-float-shadow -mt-2 h-4 w-32 rounded-full bg-ink/40 blur-xl sm:w-40"
            />
          </div>
        </Reveal>

        <Reveal x={30} y={0} delay={0.15}>
          <div className="transition-transform duration-500 sm:rotate-1 sm:rounded-sm sm:border sm:border-rose-soft sm:bg-paper/50 sm:p-6 sm:pb-12 sm:shadow-[0_25px_50px_-20px_rgba(36,20,23,0.35)] sm:hover:rotate-0">
            <ul className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              {WHATSAPP_MESSAGE_OPTIONS.map((option, index) => {
                const optionClassName = `inline-flex w-full items-center justify-start gap-2 rounded-full border-2 px-5 py-2.5 font-body text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose sm:w-auto sm:justify-center ${
                  message === option.message
                    ? "border-rose bg-rose text-paper"
                    : "border-rose-soft bg-paper/50 text-ink hover:border-rose hover:bg-blush sm:bg-transparent"
                }`;

                return (
                  <li key={option.label} className={index === 0 ? "col-span-2" : ""}>
                    {isDesktop ? (
                      <button
                        type="button"
                        onClick={() => setMessage(option.message)}
                        className={optionClassName}
                      >
                        {option.label}
                      </button>
                    ) : (
                      <a
                        href={buildWhatsAppLink(
                          WHATSAPP_NUMBER,
                          composeInquiryMessage(option.message, eventType, eventDate)
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={optionClassName}
                      >
                        {option.label}
                        <PaperPlaneIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1 text-left">
                <span className="font-body text-xs uppercase tracking-[0.2em] text-rose-soft">
                  Tipo de evento
                </span>
                <select
                  id="event-type"
                  value={eventType}
                  onChange={(event) => setEventType(event.target.value)}
                  className="w-full rounded-md border-2 border-rose-soft bg-blush/60 p-3 font-body text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
                >
                  <option value="">Selecione</option>
                  <option value="Casamento">Casamento</option>
                  <option value="Aniversario">Aniversário</option>
                  <option value="Cha revelacao">Chá revelação</option>
                  <option value="Evento corporativo">Evento corporativo</option>
                  <option value="Outro">Outro</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-left">
                <span className="font-body text-xs uppercase tracking-[0.2em] text-rose-soft">
                  Data do evento
                </span>
                <input
                  id="event-date"
                  type="date"
                  value={eventDate}
                  onChange={(event) => setEventDate(event.target.value)}
                  className="w-full rounded-md border-2 border-rose-soft bg-blush/60 p-3 font-body text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
                />
              </label>
            </div>

            <div className="mt-4 sm:mt-6">
              <div className="hidden sm:block">
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={3}
                  aria-label="Mensagem para o WhatsApp"
                  className="w-full resize-none rounded-md border-2 border-rose-soft bg-blush/60 p-4 font-body text-sm text-ink placeholder:text-ink/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
                />
                <a
                  href={buildWhatsAppLink(
                    WHATSAPP_NUMBER,
                    composeInquiryMessage(message, eventType, eventDate)
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={message.trim().length === 0}
                  className="group mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-rose px-8 py-4 font-body text-base text-paper transition-colors hover:bg-[#a83a5c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose aria-disabled:pointer-events-none aria-disabled:opacity-50"
                >
                  <span>Enviar no WhatsApp</span>
                  <PaperPlaneIcon
                    aria-hidden="true"
                    className="h-7 w-7 shrink-0 -translate-x-4 opacity-0 transition-all duration-[400ms] ease-out group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </a>
              </div>

              <div className="mt-4 flex w-full gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = SOCIAL_ICONS[social.label as keyof typeof SOCIAL_ICONS];
                  return (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-rose-soft bg-paper/50 py-4 text-ink transition-colors hover:border-rose hover:text-rose sm:bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
                    >
                      {Icon ? <Icon aria-hidden="true" className="h-5 w-5" /> : social.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
