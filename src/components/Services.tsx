import {
  WHATSAPP_MESSAGE_OPTIONS,
  WHATSAPP_PLACEHOLDER_NUMBER,
  buildWhatsAppLink,
} from "@/lib/whatsapp";

const SERVICE_CARDS = [
  {
    title: "Stories estratégicos",
    description:
      "Planejamento, design criativo e gestão completa de stories que contam a história da sua marca todos os dias.",
  },
  {
    title: "Cobertura de eventos",
    description:
      "Storytelling em tempo real, com edição ao vivo e ritmo pensado no calor do momento — casamentos, chás, aniversários.",
  },
  {
    title: "Making of",
    description:
      "Produção de vídeos de bastidores que capturam a emoção por trás de cada detalhe, pra reviver depois que a festa acaba.",
  },
];

export function Services() {
  return (
    <section id="o-que-eu-faco" className="relative py-24">
      <div className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-rose-soft">
        <span className="block h-1.5 w-1.5 rounded-full bg-rose" />
        O que eu faço
      </div>
      <h2 className="mt-4 max-w-2xl font-display text-4xl italic text-rose sm:text-5xl">
        Conteúdo que vira lembrança
      </h2>
      <p className="mt-6 max-w-2xl font-body text-base leading-8 text-ink/80 sm:text-lg">
        Trabalho com criação de stories estratégicos para redes sociais, unindo
        direção de arte, edição e sensibilidade estética para transformar momentos
        em histórias que conectam. Da cobertura ao vivo ao vídeo de making of,
        cuido de cada detalhe para que seu evento ou sua marca ganhem vida na tela.
      </p>

      <ul className="mt-14 grid gap-6 sm:grid-cols-3">
        {SERVICE_CARDS.map((service) => (
          <li
            key={service.title}
            className="rounded-[1.75rem] border border-rose-soft/30 bg-paper/60 p-7 transition-colors hover:border-rose-soft/70"
          >
            <h3 className="font-display text-xl italic text-ink">{service.title}</h3>
            <p className="mt-3 font-body text-base leading-7 text-ink/80">
              {service.description}
            </p>
          </li>
        ))}
      </ul>

      <a
        href={buildWhatsAppLink(WHATSAPP_PLACEHOLDER_NUMBER, WHATSAPP_MESSAGE_OPTIONS[0].message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12 inline-flex items-center gap-2 rounded-full bg-rose px-6 py-3 font-body text-sm text-paper transition-colors hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
      >
        Entrar em contato
      </a>
    </section>
  );
}
