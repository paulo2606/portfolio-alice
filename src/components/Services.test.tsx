import { fireEvent, render, screen } from "@testing-library/react";
import { Services } from "./Services";
import { WHATSAPP_MESSAGE_OPTIONS, WHATSAPP_NUMBER, buildWhatsAppLink } from "@/lib/whatsapp";

describe("Services", () => {
  it("mostra um cta visivel para contratar, apontando para o whatsapp", () => {
    render(<Services />);

    const cta = screen.getByRole("link", { name: /contratar/i });
    expect(cta).toBeVisible();
    expect(cta).toHaveAttribute(
      "href",
      buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE_OPTIONS[1].message)
    );
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta.getAttribute("rel")).toEqual(expect.stringContaining("noopener"));
  });

  it("toca automaticamente, mudo, mostrando o poster ate carregar", () => {
    render(<Services />);

    const cards = screen.getAllByRole("button", { name: /ver vídeo:/i });
    for (const card of cards) {
      const video = card.querySelector("video");
      expect(video).toHaveAttribute("autoplay");
      expect(video).toHaveProperty("muted", true);
      expect(video).toHaveAttribute("preload", "metadata");
      expect(video).toHaveAttribute("poster");
    }
  });

  it("reinicia o video ao atingir a janela curta de loop, sem baixar o resto do arquivo", () => {
    render(<Services />);
    const [firstCard] = screen.getAllByRole("button", { name: /ver vídeo:/i });
    const video = firstCard.querySelector("video") as HTMLVideoElement;

    Object.defineProperty(video, "currentTime", { value: 4.3, writable: true });
    fireEvent.timeUpdate(video);

    expect(video.currentTime).toBe(0);
  });

  it("nao reinicia antes de atingir a janela curta de loop", () => {
    render(<Services />);
    const [firstCard] = screen.getAllByRole("button", { name: /ver vídeo:/i });
    const video = firstCard.querySelector("video") as HTMLVideoElement;

    Object.defineProperty(video, "currentTime", { value: 1.5, writable: true });
    fireEvent.timeUpdate(video);

    expect(video.currentTime).toBe(1.5);
  });
});
