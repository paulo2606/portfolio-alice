import { metadata } from "./layout";

describe("metadata", () => {
  it("define open graph com titulo, tipo website e imagem de compartilhamento", () => {
    expect(metadata.openGraph?.title).toMatch(/alice santos/i);
    expect(metadata.openGraph?.type).toBe("website");
    expect(metadata.openGraph?.locale).toBe("pt_BR");

    const images = metadata.openGraph?.images as unknown as Array<{ url: string }>;
    expect(images[0].url).toBe("/video/hero-poster.jpg");
  });

  it("define um twitter card do tipo summary_large_image com a mesma imagem", () => {
    expect(metadata.twitter?.card).toBe("summary_large_image");
    expect(metadata.twitter?.images).toContain("/video/hero-poster.jpg");
  });
});
