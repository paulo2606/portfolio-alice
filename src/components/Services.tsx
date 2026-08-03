const SERVICES = [
  "Planejamento e criação de stories estratégicos",
  "Design criativo para stories",
  "Gestão completa de stories",
  "Cobertura de eventos com storytelling em tempo real",
  "Produção de vídeos de making of",
];

export function Services() {
  return (
    <section id="o-que-eu-faco" className="relative px-6 py-24 sm:px-12">
      <h2 className="font-display text-4xl italic text-rose sm:text-5xl">
        O que eu faço
      </h2>
      <ul className="mt-10 flex flex-col gap-6 font-body text-lg sm:text-xl">
        {SERVICES.map((service) => (
          <li
            key={service}
            className="border-b border-rose-soft/60 pb-6 last:border-none"
          >
            {service}
          </li>
        ))}
      </ul>
    </section>
  );
}
