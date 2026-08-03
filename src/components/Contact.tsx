import {
  WHATSAPP_MESSAGE_OPTIONS,
  WHATSAPP_PLACEHOLDER_NUMBER,
  buildWhatsAppLink,
} from "@/lib/whatsapp";
import { SOCIAL_LINKS } from "@/lib/social";

export function Contact() {
  return (
    <section id="contato" className="relative px-6 py-24 sm:px-12">
      <h2 className="font-display text-4xl italic text-rose sm:text-5xl">
        Vamos criar sua próxima história?
      </h2>
      <p className="mt-4 max-w-xl font-body text-base text-ink/80">
        Escolha a mensagem que combina com o que você precisa e fale comigo agora mesmo
        pelo WhatsApp.
      </p>

      <ul className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        {WHATSAPP_MESSAGE_OPTIONS.map((option) => (
          <li key={option.label}>
            <a
              href={buildWhatsAppLink(WHATSAPP_PLACEHOLDER_NUMBER, option.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-rose px-6 py-3 font-body text-sm text-paper transition-colors hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
            >
              {option.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex items-center gap-6 font-body text-sm">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-rose-soft underline-offset-4 hover:text-rose focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
          >
            {social.label}
          </a>
        ))}
      </div>
    </section>
  );
}
