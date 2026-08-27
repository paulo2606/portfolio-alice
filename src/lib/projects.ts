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

function video(slug: string, n: string): ProjectVideo {
  return {
    src: `/video/projects/${slug}/${n}.mp4`,
    poster: `/video/projects/${slug}/${n}-poster.jpg`,
  };
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
    videos: ["01", "02", "03", "04", "05", "06"].map((n) => video("festa-15", n)),
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
    videos: ["01", "02", "03", "04", "05"].map((n) => video("casamento-cha-de-panela", n)),
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
    videos: ["01", "02", "03", "04", "05", "06"].map((n) => video("aniversarios", n)),
  },
  {
    slug: "eventos",
    name: "Eventos",
    category: "Eventos",
    summary: "",
    deliverables: [],
    hasGallery: false,
    videos: ["01", "02"].map((n) => video("eventos", n)),
  },
];
