import { render, screen } from "@testing-library/react";
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
});
