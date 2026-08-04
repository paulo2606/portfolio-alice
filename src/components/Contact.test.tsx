import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Contact } from "./Contact";
import { WHATSAPP_MESSAGE_OPTIONS, WHATSAPP_PLACEHOLDER_NUMBER, buildWhatsAppLink } from "@/lib/whatsapp";

describe("Contact", () => {
  it("preenche a caixa de texto e o link do whatsapp com a mensagem escolhida", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    const option = WHATSAPP_MESSAGE_OPTIONS[0];

    await user.click(screen.getByRole("button", { name: new RegExp(option.label, "i") }));

    const textbox = screen.getByRole("textbox", { name: /mensagem/i });
    expect(textbox).toHaveValue(option.message);

    const link = screen.getByRole("link", { name: /enviar no whatsapp/i });
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
