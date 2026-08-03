export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  teaser: string;
  description: string[];
  cover: ProjectImage;
  gallery: ProjectImage[];
}

export const projects: Project[] = [
  {
    slug: "passeio",
    title: "Um passeio, os detalhes que ninguém repara",
    teaser: "Observação como método de trabalho.",
    description: [
      "Nem todo passeio precisa de grandes cenários para virar uma boa história. Aqui, a câmera ficou atenta ao que normalmente passa despercebido: senhores concentrados numa partida de dama, crianças pulando nas ondas sem pensar em mais nada.",
      "O trabalho começou como observação — entender o ritmo do lugar antes de registrar qualquer coisa. A edição saiu no mesmo dia, ainda com a luz e o clima daquele momento frescos, resultando numa narrativa simples, mas cheia de significado.",
    ],
    cover: { src: "/images/projects/passeio/dama.jpg", alt: "Senhores jogando dama ao ar livre" },
    gallery: [
      { src: "/images/projects/passeio/dama.jpg", alt: "Senhores concentrados numa partida de dama" },
      { src: "/images/projects/passeio/pulo-mar.jpg", alt: "Criança pulando na areia perto do mar" },
      { src: "/images/projects/passeio/corrida-mar.jpg", alt: "Criança correndo em direção ao mar" },
    ],
  },
  {
    slug: "coroa-grande",
    title: "São José da Coroa Grande (PE)",
    teaser: "Emoção antes de imagem bonita.",
    description: [
      "Mais do que registrar uma paisagem litorânea, o objetivo aqui era transmitir emoção. São José da Coroa Grande ofereceu cenários grandiosos — mas o vídeo só ganhou vida quando a grandiosidade da paisagem encontrou a verdade das pessoas que estavam ali.",
      "O resultado equilibra os dois: planos amplos que mostram a força do lugar e momentos próximos que mostram quem o vive.",
    ],
    cover: { src: "/images/projects/coroa-grande/aerea-pipa.jpg", alt: "Vista aérea do litoral" },
    gallery: [
      { src: "/images/projects/coroa-grande/aerea-pipa.jpg", alt: "Vista aérea da praia com águas claras" },
      { src: "/images/projects/coroa-grande/aerea-imbassai.jpg", alt: "Litoral visto de cima, com areia e coqueiros" },
      { src: "/images/projects/coroa-grande/aerea-sancho.jpg", alt: "Praia com águas turquesa vista do alto" },
    ],
  },
  {
    slug: "cabrobo",
    title: "Energia de Cabrobó",
    teaser: "Memória registrada no tempo.",
    description: [
      "Um evento de grupo em Cabrobó pedia uma coisa acima de tudo: transmitir a energia e a alegria contagiante daquele momento. Para isso, a edição buscou uma estética de filme antigo — como se aquele instante já fosse, desde o início, uma lembrança guardada.",
      "O formato reforça a sensação de memória, tornando o vídeo tão emocionante de rever quanto foi de viver.",
    ],
    cover: { src: "/images/projects/cabrobo/festa-1.jpg", alt: "Grupo celebrando em evento" },
    gallery: [
      { src: "/images/projects/cabrobo/festa-1.jpg", alt: "Grupo em celebração animada" },
      { src: "/images/projects/cabrobo/danca-casal.jpg", alt: "Casal dançando durante a festa" },
      { src: "/images/projects/cabrobo/aerea-vitoria.jpg", alt: "Vista aérea do litoral próximo ao evento" },
    ],
  },
  {
    slug: "reels",
    title: "Reels que viram memória",
    teaser: "Fotos e vídeos, uma só edição.",
    description: [
      "Reels e conteúdos para TikTok que misturam fotos e vídeos numa mesma edição, reforçando estética, memória e significado — não é só sobre juntar arquivos, é sobre construir uma linha do tempo que faz sentido emocional.",
      "O resultado são peças rápidas de assistir, mas que carregam camadas: cada corte escolhido para reforçar a lembrança de quem estava lá.",
    ],
    cover: { src: "/images/projects/reels/praia-rio.jpg", alt: "Praia vista de cima para edição de reels" },
    gallery: [
      { src: "/images/projects/reels/praia-rio.jpg", alt: "Praia movimentada vista de cima" },
      { src: "/images/projects/reels/beach-aerial.jpg", alt: "Vista aérea de praia para composição de reels" },
      { src: "/images/projects/reels/pulo-mar-2.jpg", alt: "Criança pulando perto do mar, frame para reels" },
    ],
  },
];
