import { buildWhatsAppLink, WHATSAPP_PLACEHOLDER_NUMBER } from "./whatsapp";

describe("buildWhatsAppLink", () => {
  it("gera o link do wa.me com o numero e a mensagem codificada", () => {
    const link = buildWhatsAppLink(WHATSAPP_PLACEHOLDER_NUMBER, "Oi Alice, tudo bem?");
    expect(link).toBe(
      `https://wa.me/${WHATSAPP_PLACEHOLDER_NUMBER}?text=Oi%20Alice%2C%20tudo%20bem%3F`
    );
  });
});
