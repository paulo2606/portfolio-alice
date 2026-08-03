import { SOCIAL_LINKS } from "@/lib/social";
import {
  WHATSAPP_DEFAULT_MESSAGE,
  WHATSAPP_PLACEHOLDER_NUMBER,
  buildWhatsAppLink,
} from "@/lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "./icons";

const HERO_ICON_LINKS = [
  {
    label: "Instagram",
    href: SOCIAL_LINKS.find((social) => social.label === "Instagram")?.href ?? "#",
    Icon: InstagramIcon,
  },
  {
    label: "WhatsApp",
    href: buildWhatsAppLink(WHATSAPP_PLACEHOLDER_NUMBER, WHATSAPP_DEFAULT_MESSAGE),
    Icon: WhatsAppIcon,
  },
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-ink text-paper">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/hero.mp4"
        poster="/video/hero-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/10" />
      <nav
        aria-label="Redes sociais"
        className="absolute right-6 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-6 sm:right-10"
      >
        {HERO_ICON_LINKS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="group relative flex h-12 w-12 items-center justify-center text-paper/90 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
          >
            <span
              data-icon-bg
              aria-hidden="true"
              className="absolute inset-y-0 -right-6 z-0 w-0 rounded-l-full bg-rose-soft transition-all duration-300 ease-out group-hover:w-[4.5rem] group-focus-visible:w-[4.5rem] motion-reduce:transition-none sm:-right-10 sm:group-hover:w-[5.5rem] sm:group-focus-visible:w-[5.5rem]"
            />
            <Icon aria-hidden="true" className="relative z-10 h-7 w-7" />
          </a>
        ))}
      </nav>
      <div className="relative z-10 flex w-full flex-col gap-6 px-6 pb-16 sm:px-12 sm:pb-24">
        <p className="font-body text-sm uppercase tracking-[0.3em] text-rose-soft">
          storymaker
        </p>
        <h1 className="font-display text-5xl italic leading-tight sm:text-7xl">
          Alice Santos
        </h1>
        <a
          href="#o-que-eu-faco"
          className="mt-4 inline-flex w-fit items-center gap-2 border-b border-rose-soft pb-1 font-body text-base transition-colors hover:text-rose focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
        >
          Conhecer o trabalho
        </a>
      </div>
    </section>
  );
}
