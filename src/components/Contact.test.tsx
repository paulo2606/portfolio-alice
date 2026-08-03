import { render, screen } from "@testing-library/react";
import { Contact } from "./Contact";
import { WHATSAPP_MESSAGE_OPTIONS, WHATSAPP_PLACEHOLDER_NUMBER, buildWhatsAppLink } from "@/lib/whatsapp";

describe("Contact", () => {
  it("gera o link do whatsapp com o texto da mensagem escolhida", () => {
    render(<Contact />);
    const option = WHATSAPP_MESSAGE_OPTIONS[0];
    const link = screen.getByRole("link", { name: new RegExp(option.label, "i") });
    expect(link).toHaveAttribute(
      "href",
      buildWhatsAppLink(WHATSAPP_PLACEHOLDER_NUMBER, option.message)
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("rel")).toEqual(expect.stringContaining("noopener"));
  });

  it("tem um link para o instagram como rede principal", () => {
    render(<Contact />);
    const instagram = screen.getByRole("link", { name: /instagram/i });
    expect(instagram).toHaveAttribute("href", expect.stringContaining("instagram.com"));
  });
});
