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

  it("nao carrega os videos automaticamente, so mostra o poster ate o hover", () => {
    render(<Services />);

    const cards = screen.getAllByRole("button", { name: /ver vídeo:/i });
    for (const card of cards) {
      const video = card.querySelector("video");
      expect(video).not.toHaveAttribute("autoplay");
      expect(video).toHaveAttribute("preload", "metadata");
      expect(video).toHaveAttribute("poster");
    }
  });

  it("toca o video ao passar o mouse e pausa ao tirar o mouse", () => {
    render(<Services />);
    const [firstCard] = screen.getAllByRole("button", { name: /ver vídeo:/i });
    const video = firstCard.querySelector("video") as HTMLVideoElement;
    const playSpy = jest.spyOn(video, "play").mockResolvedValue();
    const pauseSpy = jest.spyOn(video, "pause").mockImplementation(() => {});

    fireEvent.mouseEnter(firstCard);
    expect(playSpy).toHaveBeenCalled();

    fireEvent.mouseLeave(firstCard);
    expect(pauseSpy).toHaveBeenCalled();
  });
});
