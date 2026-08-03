// numero placeholder: troque pelo numero real de contato da Alice antes de publicar
export const WHATSAPP_PLACEHOLDER_NUMBER = "5500000000000";

export function buildWhatsAppLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_DEFAULT_MESSAGE =
  "Oi Alice! Vim pelo seu site e quero saber mais sobre o seu trabalho.";

export interface WhatsAppMessageOption {
  label: string;
  message: string;
}

export const WHATSAPP_MESSAGE_OPTIONS: WhatsAppMessageOption[] = [
  {
    label: "Cobrir meu casamento",
    message: "Oi Alice! Quero saber mais sobre a cobertura de stories para o meu casamento.",
  },
  {
    label: "Cobrir meu evento",
    message:
      "Oi Alice! Tenho um evento chegando (chá, revelação, aniversário) e quero contratar a cobertura de stories.",
  },
  {
    label: "Gestão de stories do meu perfil",
    message: "Oi Alice! Quero conversar sobre a gestão completa de stories para o meu Instagram.",
  },
];
