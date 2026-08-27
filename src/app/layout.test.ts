import { metadata } from "./layout";

describe("metadata", () => {
  it("define open graph com titulo, tipo website e imagem de compartilhamento", () => {
    const openGraph = metadata.openGraph as unknown as {
      title: string;
      type: string;
      locale: string;
      images: Array<{ url: string }>;
    };

    expect(openGraph.title).toMatch(/alice santos/i);
    expect(openGraph.type).toBe("website");
    expect(openGraph.locale).toBe("pt_BR");
    expect(openGraph.images[0].url).toBe("/video/hero-poster.jpg");
  });

  it("define um twitter card do tipo summary_large_image com a mesma imagem", () => {
    const twitter = metadata.twitter as unknown as { card: string; images: string[] };

    expect(twitter.card).toBe("summary_large_image");
    expect(twitter.images).toContain("/video/hero-poster.jpg");
  });
});
