import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Contact } from "./Contact";
import {
  WHATSAPP_MESSAGE_OPTIONS,
  WHATSAPP_NUMBER,
  buildWhatsAppLink,
  composeInquiryMessage,
} from "@/lib/whatsapp";

function mockDesktopViewport() {
  const matchMediaSpy = jest.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: query === "(min-width: 640px)",
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));
  return () => matchMediaSpy.mockRestore();
}

describe("Contact", () => {
  it("preenche a caixa de texto e o link do whatsapp com a mensagem escolhida", async () => {
    const restoreMatchMedia = mockDesktopViewport();
    const user = userEvent.setup();
    render(<Contact />);
    const option = WHATSAPP_MESSAGE_OPTIONS[0];

    await user.click(screen.getByRole("button", { name: new RegExp(option.label, "i") }));

    const textbox = screen.getByRole("textbox", { name: /mensagem/i });
    expect(textbox).toHaveValue(option.message);

    const link = screen.getByRole("link", { name: /enviar no whatsapp/i });
    expect(link).toHaveAttribute(
      "href",
      buildWhatsAppLink(WHATSAPP_NUMBER, option.message)
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("rel")).toEqual(expect.stringContaining("noopener"));

    restoreMatchMedia();
  });

  it("no mobile, cada opcao pronta ja abre o whatsapp direto", () => {
    render(<Contact />);
    const option = WHATSAPP_MESSAGE_OPTIONS[0];

    const link = screen.getByRole("link", { name: new RegExp(option.label, "i") });
    expect(link).toHaveAttribute(
      "href",
      buildWhatsAppLink(WHATSAPP_NUMBER, option.message)
    );
  });

  it("tem um link para o instagram como rede principal", () => {
    render(<Contact />);
    const instagram = screen.getByRole("link", { name: /instagram/i });
    expect(instagram).toHaveAttribute("href", expect.stringContaining("instagram.com"));
  });

  it("acrescenta tipo de evento e data escolhidos ao link de envio (desktop)", async () => {
    const restoreMatchMedia = mockDesktopViewport();
    const user = userEvent.setup();
    render(<Contact />);
    const option = WHATSAPP_MESSAGE_OPTIONS[0];

    await user.click(screen.getByRole("button", { name: new RegExp(option.label, "i") }));
    await user.selectOptions(screen.getByLabelText(/tipo de evento/i), "Casamento");
    fireEvent.change(screen.getByLabelText(/data do evento/i), {
      target: { value: "2026-09-20" },
    });

    const link = screen.getByRole("link", { name: /enviar no whatsapp/i });
    expect(link).toHaveAttribute(
      "href",
      buildWhatsAppLink(
        WHATSAPP_NUMBER,
        composeInquiryMessage(option.message, "Casamento", "2026-09-20")
      )
    );

    restoreMatchMedia();
  });

  it("no mobile, a mensagem enviada inclui o tipo de evento escolhido", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    const option = WHATSAPP_MESSAGE_OPTIONS[1];

    await user.selectOptions(screen.getByLabelText(/tipo de evento/i), "Aniversario");

    const link = screen.getByRole("link", { name: new RegExp(option.label, "i") });
    expect(link).toHaveAttribute(
      "href",
      buildWhatsAppLink(WHATSAPP_NUMBER, composeInquiryMessage(option.message, "Aniversario", ""))
    );
  });
});
