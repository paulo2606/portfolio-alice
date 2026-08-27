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
      src: "/video/projects/festa-15/01.mp4",
      poster: "/video/projects/festa-15/01-poster.jpg",
    });
    expect(festa15.videos[5]).toEqual({
      src: "/video/projects/festa-15/06.mp4",
      poster: "/video/projects/festa-15/06-poster.jpg",
    });
  });
});
