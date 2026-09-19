import { PROJECTS } from "./projects";

describe("PROJECTS", () => {
  it("tem os 4 projetos reais na ordem esperada", () => {
    expect(PROJECTS.map((p) => p.name)).toEqual([
      "Festa de 15 Anos",
      "Casamento/Chá de Panela",
      "Aniversários",
      "Eventos",
    ]);
  });

  it("cada projeto tem a quantidade certa de videos", () => {
    const bySlug = Object.fromEntries(PROJECTS.map((p) => [p.slug, p.videos.length]));
    expect(bySlug).toEqual({
      "festa-15": 6,
      "casamento-cha-de-panela": 5,
      aniversarios: 6,
      eventos: 2,
    });
  });

  it("so o projeto Eventos nao tem galeria", () => {
    const bySlug = Object.fromEntries(PROJECTS.map((p) => [p.slug, p.hasGallery]));
    expect(bySlug).toEqual({
      "festa-15": true,
      "casamento-cha-de-panela": true,
      aniversarios: true,
      eventos: false,
    });
  });

  it("cada video aponta para um mp4 e um poster jpg dentro da pasta do projeto", () => {
    const festa15 = PROJECTS.find((p) => p.slug === "festa-15")!;
    expect(festa15.videos[0]).toEqual({
      src: "/video/projects/festa-15/festa-15-1.mp4",
      poster: "/video/projects/festa-15/festa-15-1-poster.jpg",
      mobileSrc: "/video/projects/festa-15/festa-15-1-mobile.mp4",
    });
    expect(festa15.videos[5]).toEqual({
      src: "/video/projects/festa-15/festa-15-6.mp4",
      poster: "/video/projects/festa-15/festa-15-6-poster.jpg",
    });
  });

  it("so as capas do mosaico (indices 0 e 1) tem uma versao leve para mobile", () => {
    const festa15 = PROJECTS.find((p) => p.slug === "festa-15")!;
    expect(festa15.videos[0].mobileSrc).toBe("/video/projects/festa-15/festa-15-1-mobile.mp4");
    expect(festa15.videos[1].mobileSrc).toBe("/video/projects/festa-15/festa-15-2-mobile.mp4");
    expect(festa15.videos[2].mobileSrc).toBeUndefined();
  });
});
