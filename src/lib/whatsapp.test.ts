import { composeInquiryMessage, formatEventDateBR } from "./whatsapp";

describe("formatEventDateBR", () => {
  it("converte uma data ISO (yyyy-mm-dd) para o formato brasileiro (dd/mm/yyyy)", () => {
    expect(formatEventDateBR("2026-09-20")).toBe("20/09/2026");
  });

  it("retorna string vazia para entrada vazia ou invalida", () => {
    expect(formatEventDateBR("")).toBe("");
    expect(formatEventDateBR("2026-09")).toBe("");
  });
});

describe("composeInquiryMessage", () => {
  it("retorna a mensagem original quando nao ha tipo de evento nem data", () => {
    expect(composeInquiryMessage("Oi Alice!", "", "")).toBe("Oi Alice!");
  });

  it("acrescenta tipo de evento e data formatada como linhas extras", () => {
    expect(composeInquiryMessage("Oi Alice!", "Casamento", "2026-09-20")).toBe(
      "Oi Alice!\n\nTipo de evento: Casamento\nData: 20/09/2026"
    );
  });

  it("acrescenta somente o tipo de evento quando a data nao e informada", () => {
    expect(composeInquiryMessage("Oi Alice!", "Aniversario", "")).toBe(
      "Oi Alice!\n\nTipo de evento: Aniversario"
    );
  });

  it("acrescenta somente a data quando o tipo de evento nao e informado", () => {
    expect(composeInquiryMessage("Oi Alice!", "", "2026-09-20")).toBe(
      "Oi Alice!\n\nData: 20/09/2026"
    );
  });
});
