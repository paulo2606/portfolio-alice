"use client";

import { useState } from "react";
import Image from "next/image";
import {
  WHATSAPP_MESSAGE_OPTIONS,
  WHATSAPP_PLACEHOLDER_NUMBER,
  buildWhatsAppLink,
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
          <ul className="flex flex-wrap gap-3">
            {WHATSAPP_MESSAGE_OPTIONS.map((option) => (
              <li key={option.label}>
                <button
                  type="button"
                  onClick={() => setMessage(option.message)}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-body text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose ${
                    message === option.message
                      ? "border-rose bg-rose text-paper"
                      : "border-rose-soft/40 text-ink hover:border-rose-soft hover:bg-blush"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={3}
              aria-label="Mensagem para o WhatsApp"
              className="w-full resize-none rounded-md border border-rose-soft/40 bg-paper/60 p-4 font-body text-sm text-ink placeholder:text-ink/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
            />
            <a
              href={buildWhatsAppLink(WHATSAPP_PLACEHOLDER_NUMBER, message)}
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
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-rose-soft/40 py-4 text-ink transition-colors hover:border-rose hover:text-rose focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
                  >
                    {Icon ? <Icon aria-hidden="true" className="h-5 w-5" /> : social.label}
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
