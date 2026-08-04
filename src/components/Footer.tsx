import {
  WHATSAPP_DEFAULT_MESSAGE,
  WHATSAPP_NUMBER,
  buildWhatsAppLink,
} from "@/lib/whatsapp";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/social";
import { SECTION_LINKS } from "@/lib/sections";
import { InstagramIcon, MailIcon, TikTokIcon, WhatsAppIcon } from "./icons";

const FOOTER_ICON_LINKS = [
  {
    label: "Instagram",
    href: SOCIAL_LINKS.find((social) => social.label === "Instagram")?.href ?? "#",
    Icon: InstagramIcon,
  },
  {
    label: "TikTok",
    href: SOCIAL_LINKS.find((social) => social.label === "TikTok")?.href ?? "#",
    Icon: TikTokIcon,
  },
  {
    label: "WhatsApp",
    href: buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE),
    Icon: WhatsAppIcon,
  },
  {
    label: "E-mail",
    href: `mailto:${CONTACT_EMAIL}`,
    Icon: MailIcon,
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-12 lg:px-20">
        <div className="grid gap-12 sm:grid-cols-3">
          <div>
            <p className="font-body text-sm uppercase tracking-[0.3em] text-rose-soft">
              storymaker
            </p>
            <h2 className="mt-2 font-display text-3xl italic sm:text-4xl">Alice Santos</h2>
            <p className="mt-4 max-w-xs font-body text-sm text-paper/70">
              Conteúdo com alma, ritmo e presença — stories, cobertura de
              eventos e making of.
            </p>
          </div>

          <nav aria-label="Seções da página" className="flex flex-col gap-3">
            <p className="font-body text-sm uppercase tracking-[0.3em] text-rose-soft">
              Navegação
            </p>
            {SECTION_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-sm text-paper/70 transition-colors hover:text-rose-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-soft"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <p className="font-body text-sm uppercase tracking-[0.3em] text-rose-soft">
              Redes
            </p>
            <div className="flex items-center gap-4">
              {FOOTER_ICON_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 text-paper/80 transition-colors hover:border-rose-soft hover:text-rose-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-soft"
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-6 border-t border-paper/10 pt-8 sm:flex-row sm:justify-between">
          <p className="font-body text-sm text-paper/60">
            © {year} Alice Santos. Todos os direitos reservados.
          </p>
          <a
            href="#topo"
            className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-5 py-2.5 font-body text-sm text-paper/80 transition-colors hover:border-rose-soft hover:text-rose-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-soft"
          >
            Voltar ao topo ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
