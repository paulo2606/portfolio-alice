const DIFFERENTIALS = [
  {
    title: "Atenção aos mínimos detalhes",
    description:
      "Observação apurada de tudo que constrói a narrativa, mesmo o que passa despercebido.",
  },
  {
    title: "Criação baseada em trends do momento",
    description:
      "Conteúdo conectado ao que está bombando, sem perder a identidade da marca.",
  },
  {
    title: "Edição em tempo real",
    description: "Cobertura ao vivo, com corte e ritmo pensados no calor do evento.",
  },
  {
    title: "Publicação em menos de 1 hora",
    description: "Autenticidade entregue rápido, sem abrir mão da qualidade.",
  },
  {
    title: "Trends personalizadas pós-evento",
    description: "Conteúdo pensado pra manter o engajamento vivo depois que a festa acaba.",
  },
];

export function WhyHireMe() {
  return (
    <section id="por-que-me-contratar" className="relative py-24">
      <h2 className="font-display text-4xl italic text-rose sm:text-5xl">
        Por que me contratar
      </h2>
      <ul className="mt-10 grid gap-8 sm:grid-cols-2">
        {DIFFERENTIALS.map((item) => (
          <li key={item.title} className="border-l-2 border-rose-soft pl-5">
            <h3 className="font-display text-xl italic text-ink">{item.title}</h3>
            <p className="mt-2 font-body text-base text-ink/80">{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
