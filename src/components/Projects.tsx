"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ProjectSidebar, type ProjectGalleryImage } from "./ProjectSidebar";
import { Reveal } from "./Reveal";

interface GalleryItem {
  name: string;
  image: string;
  area: string;
  mobileArea?: string;
  video?: string;
  gallery: ProjectGalleryImage[];
}

const MOSAIC_AREAS = [
  "col-start-1 row-start-1 row-span-3",
  "col-start-2 col-span-2 row-start-1",
  "col-start-2 row-start-2 row-span-2",
  "col-start-3 row-start-2",
  "col-start-3 row-start-3",
  "col-start-4 row-start-1 row-span-3",
];

function buildGallery(
  entries: { src: string; alt: string }[]
): ProjectGalleryImage[] {
  return entries.map((entry, index) => ({
    ...entry,
    area: MOSAIC_AREAS[index],
  }));
}

const PORDOSOL_GALLERY = buildGallery([
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=85&w=1200&auto=format&fit=crop",
    alt: "Mãos dos noivos entrelaçadas com aliança",
  },
  {
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=85&w=1200&auto=format&fit=crop",
    alt: "Noivos de mãos dadas ao entardecer",
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=85&w=1200&auto=format&fit=crop",
    alt: "Alianças e buquê nas mãos dos noivos",
  },
  {
    src: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=85&w=1200&auto=format&fit=crop",
    alt: "Noivos abraçados em praia de areia escura",
  },
  {
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=85&w=1200&auto=format&fit=crop",
    alt: "Noivos sorrindo de mãos dadas sob um coqueiro",
  },
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=85&w=1200&auto=format&fit=crop",
    alt: "Beijo dos noivos sob chuva de pétalas",
  },
]);

const ANIVERSARIO_GALLERY = buildGallery([
  {
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=85&w=1200&auto=format&fit=crop",
    alt: "Convidados celebrando a festa de 15 anos",
  },
  {
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=85&w=1200&auto=format&fit=crop",
    alt: "Balões coloridos decorando a festa",
  },
  {
    src: "https://images.unsplash.com/photo-1560243563-062bfc001d68?q=85&w=1200&auto=format&fit=crop",
    alt: "Mesa de doces com escrita de aniversário",
  },
  {
    src: "https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?q=85&w=1200&auto=format&fit=crop",
    alt: "Amigas reunidas comemorando à mesa",
  },
  {
    src: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?q=85&w=1200&auto=format&fit=crop",
    alt: "Aniversariante em um momento de retrato",
  },
  {
    src: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=85&w=1200&auto=format&fit=crop",
    alt: "Criança brincando durante a comemoração",
  },
]);

const MAKING_OF_GALLERY = buildGallery([
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=85&w=1200&auto=format&fit=crop",
    alt: "Mesa posta decorada para a recepção do casamento",
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=85&w=1200&auto=format&fit=crop",
    alt: "Alianças e buquê nas mãos dos noivos",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=85&w=1200&auto=format&fit=crop",
    alt: "Noivos soltando balões na festa junto à piscina",
  },
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=85&w=1200&auto=format&fit=crop",
    alt: "Beijo dos noivos sob chuva de pétalas",
  },
  {
    src: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=85&w=1200&auto=format&fit=crop",
    alt: "Noivos abraçados em praia de areia escura",
  },
  {
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=85&w=1200&auto=format&fit=crop",
    alt: "Noivos sorrindo de mãos dadas sob um coqueiro",
  },
]);

const CHA_REVELACAO_GALLERY = buildGallery([
  {
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=85&w=1200&auto=format&fit=crop",
    alt: "Decoração em tons pastel do chá revelação",
  },
  {
    src: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=85&w=1200&auto=format&fit=crop",
    alt: "Itens de bebê em tons pastel sobre a mesa",
  },
  {
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=85&w=1200&auto=format&fit=crop",
    alt: "Balões azuis e rosa da revelação",
  },
  {
    src: "https://images.unsplash.com/photo-1560243563-062bfc001d68?q=85&w=1200&auto=format&fit=crop",
    alt: "Mesa de doces da celebração",
  },
  {
    src: "https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?q=85&w=1200&auto=format&fit=crop",
    alt: "Família reunida para a revelação",
  },
  {
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=85&w=1200&auto=format&fit=crop",
    alt: "Casal em momento especial durante o evento",
  },
]);

const CORPORATIVO_GALLERY = buildGallery([
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=85&w=1200&auto=format&fit=crop",
    alt: "Auditório preparado para o evento corporativo",
  },
  {
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=85&w=1200&auto=format&fit=crop",
    alt: "Sala de conferência com telas de projeção",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=85&w=1200&auto=format&fit=crop",
    alt: "Plateia acompanhando a apresentação",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=85&w=1200&auto=format&fit=crop",
    alt: "Participantes aplaudindo durante a reunião",
  },
  {
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=85&w=1200&auto=format&fit=crop",
    alt: "Equipe alinhando estratégia no quadro branco",
  },
  {
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=85&w=1200&auto=format&fit=crop",
    alt: "Reunião de equipe em espaço corporativo",
  },
]);

const EDITORIAL_GALLERY = buildGallery([
  {
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=85&w=1200&auto=format&fit=crop",
    alt: "Modelo em pose editorial de perfil",
  },
  {
    src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=85&w=1200&auto=format&fit=crop",
    alt: "Retrato editorial em fundo escuro",
  },
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=85&w=1200&auto=format&fit=crop",
    alt: "Retrato ao entardecer para ensaio editorial",
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=85&w=1200&auto=format&fit=crop",
    alt: "Modelo posando em fundo verde neon",
  },
  {
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=85&w=1200&auto=format&fit=crop",
    alt: "Araras de roupas usadas na produção do ensaio",
  },
  {
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=85&w=1200&auto=format&fit=crop",
    alt: "Modelo sorrindo em cenário externo",
  },
]);

const FESTA_INFANTIL_GALLERY = buildGallery([
  {
    src: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=85&w=1200&auto=format&fit=crop",
    alt: "Criança brincando na festa infantil",
  },
  {
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=85&w=1200&auto=format&fit=crop",
    alt: "Balões coloridos decorando a festa infantil",
  },
  {
    src: "https://images.unsplash.com/photo-1560243563-062bfc001d68?q=85&w=1200&auto=format&fit=crop",
    alt: "Mesa de doces da festa infantil",
  },
  {
    src: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?q=85&w=1200&auto=format&fit=crop",
    alt: "Aniversariante em um momento de retrato",
  },
  {
    src: "https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?q=85&w=1200&auto=format&fit=crop",
    alt: "Familiares reunidos na comemoração",
  },
  {
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=85&w=1200&auto=format&fit=crop",
    alt: "Convidados celebrando a festa infantil",
  },
]);

const DOCUMENTARIO_GALLERY = buildGallery([
  {
    src: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=85&w=1200&auto=format&fit=crop",
    alt: "Entrevistado durante a gravação do documentário",
  },
  {
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=85&w=1200&auto=format&fit=crop",
    alt: "Retrato do entrevistado para o documentário",
  },
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=85&w=1200&auto=format&fit=crop",
    alt: "Edição do material durante a produção",
  },
  {
    src: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=85&w=1200&auto=format&fit=crop",
    alt: "Equipe organizando a produção do documentário",
  },
  {
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=85&w=1200&auto=format&fit=crop",
    alt: "Sala preparada para a gravação",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=85&w=1200&auto=format&fit=crop",
    alt: "Equipe reunida durante a produção",
  },
]);

const GALLERY: GalleryItem[] = [
  {
    name: "Casamento ao Pôr do Sol",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=90&w=2400&auto=format&fit=crop",
    area: "col-start-1 row-start-1 row-span-2",
    mobileArea: "col-start-1 row-start-1 row-span-3",
    gallery: PORDOSOL_GALLERY,
  },
  {
    name: "Aniversário de 15 Anos",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=90&w=2400&auto=format&fit=crop",
    area: "col-start-2 col-span-2 row-start-1",
    mobileArea: "col-start-2 row-start-1",
    gallery: ANIVERSARIO_GALLERY,
  },
  {
    name: "Making of Casamento",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=90&w=2400&auto=format&fit=crop",
    area: "col-start-4 col-span-2 row-start-1",
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    mobileArea: "col-start-2 row-start-2",
    gallery: MAKING_OF_GALLERY,
  },
  {
    name: "Chá Revelação",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=90&w=2400&auto=format&fit=crop",
    area: "col-start-2 col-span-2 row-start-2",
    gallery: CHA_REVELACAO_GALLERY,
  },
  {
    name: "Evento Corporativo",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=90&w=2400&auto=format&fit=crop",
    area: "col-start-4 row-start-2 row-span-2",
    gallery: CORPORATIVO_GALLERY,
  },
  {
    name: "Ensaio Editorial",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=90&w=2400&auto=format&fit=crop",
    area: "col-start-5 row-start-2 row-span-2",
    mobileArea: "col-start-2 row-start-3 row-span-2",
    gallery: EDITORIAL_GALLERY,
  },
  {
    name: "Festa Infantil",
    image:
      "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=90&w=2400&auto=format&fit=crop",
    area: "col-start-1 col-span-2 row-start-3",
    mobileArea: "col-start-1 row-start-4",
    gallery: FESTA_INFANTIL_GALLERY,
  },
  {
    name: "Documentário de Marca",
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=90&w=2400&auto=format&fit=crop",
    area: "col-start-3 row-start-3",
    gallery: DOCUMENTARIO_GALLERY,
  },
];

const MOBILE_GALLERY = GALLERY.filter((item) => item.mobileArea);

export function Projects() {
  const [openItem, setOpenItem] = useState<GalleryItem | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  function handleOpen(item: GalleryItem) {
    triggerRef.current = document.activeElement as HTMLElement;
    setOpenItem(item);
  }

  function handleClose() {
    setOpenItem(null);
    triggerRef.current?.focus();
  }

  function renderTile(item: GalleryItem, index: number, area: string) {
    return (
      <motion.button
        key={item.name}
        type="button"
        onClick={() => handleOpen(item)}
        aria-label={`Ver projeto: ${item.name}`}
        initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.85 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
        className={`group relative cursor-pointer overflow-hidden rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose ${area}`}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          priority={index === 0}
          quality={90}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-ink/50 p-3 min-[1080px]:hidden">
          <span className="px-2 text-center font-display text-base italic text-paper">
            {item.name}
          </span>
        </div>
        <div className="absolute inset-0 hidden items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 ease-out group-hover:bg-ink/60 group-hover:opacity-100 min-[1080px]:flex">
          <span className="px-4 text-center font-display text-2xl italic text-paper">
            {item.name}
          </span>
        </div>
      </motion.button>
    );
  }

  return (
    <section id="o-que-eu-faco" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-12 lg:px-20">
        <Reveal>
          <div className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-rose-soft">
            <span className="block h-1.5 w-1.5 rounded-full bg-rose" />
            Portfólio
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 font-display text-4xl italic text-rose sm:text-5xl">
            O que faço
          </h2>
        </Reveal>
      </div>

      <div className="relative left-1/2 mt-14 w-screen -translate-x-1/2 px-4 min-[1080px]:px-0">
        <div
          data-testid="mobile-mosaic"
          className="grid aspect-[4/5] grid-cols-2 grid-rows-4 gap-1.5 min-[1080px]:hidden"
        >
          {MOBILE_GALLERY.map((item, index) => renderTile(item, index, item.mobileArea!))}
        </div>
        <div
          data-testid="desktop-mosaic"
          className="hidden aspect-[1171/623] grid-cols-5 grid-rows-3 gap-2 min-[1080px]:grid"
        >
          {GALLERY.map((item, index) => renderTile(item, index, item.area))}
        </div>
      </div>

      {openItem && (
        <ProjectSidebar
          title={openItem.name}
          cover={{ src: openItem.image, alt: openItem.name }}
          video={openItem.video}
          gallery={openItem.gallery}
          onClose={handleClose}
        />
      )}
    </section>
  );
}
