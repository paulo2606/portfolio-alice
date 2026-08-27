export interface ProjectVideo {
  src: string;
  poster: string;
}

export interface Project {
  slug: string;
  name: string;
  category: string;
  summary: string;
  deliverables: string[];
  videos: ProjectVideo[];
  hasGallery: boolean;
}

function videos(slug: string, count: number): ProjectVideo[] {
  return Array.from({ length: count }, (_, i) => {
    const name = `${slug}-${i + 1}`;
    return {
      src: `/video/projects/${slug}/${name}.mp4`,
      poster: `/video/projects/${slug}/${name}-poster.jpg`,
    };
  });
}

export const PROJECTS: Project[] = [
  {
    slug: "festa-15",
    name: "Festa de 15 Anos",
    category: "Aniversário de 15 anos",
    summary:
      "Cobertura completa da festa de debute, dos preparativos à pista de dança, com edição pensada para reviver a energia do dia.",
    deliverables: [
      "Stories em tempo real",
      "Vídeo highlight editado",
      "Making of dos bastidores",
    ],
    hasGallery: true,
    videos: videos("festa-15", 6),
  },
  {
    slug: "casamento-cha-de-panela",
    name: "Casamento/Chá de Panela",
    category: "Casamento",
    summary:
      "Registro dos momentos íntimos da celebração, do chá de panela à festa, com atenção aos detalhes que fazem a diferença.",
    deliverables: [
      "Stories em tempo real",
      "Vídeo highlight editado",
      "Cobertura de bastidores",
    ],
    hasGallery: true,
    videos: videos("casamento-cha-de-panela", 5),
  },
  {
    slug: "aniversarios",
    name: "Aniversários",
    category: "Aniversário",
    summary:
      "Cobertura de aniversários e celebrações em família, capturando espontaneidade e os pequenos momentos que ficam pra sempre.",
    deliverables: [
      "Stories em tempo real",
      "Vídeo highlight editado",
      "Fotos extraídas dos melhores momentos",
    ],
    hasGallery: true,
    videos: videos("aniversarios", 6),
  },
  {
    slug: "eventos",
    name: "Eventos",
    category: "Eventos",
    summary: "",
    deliverables: [],
    hasGallery: false,
    videos: videos("eventos", 2),
  },
];
