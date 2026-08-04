export const WHATSAPP_NUMBER = "5541991931061";

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
    label: "Saber mais sobre o trabalho",
    message: "Oi Alice! Quero saber mais sobre o seu trabalho.",
  },
  {
    label: "Fazer um evento",
    message: "Oi Alice! Quero fazer um evento e gostaria de saber mais sobre a cobertura de stories.",
  },
  {
    label: "Gestão de stories",
    message: "Oi Alice, quero conversar sobre a gestão de stories para o meu perfil.",
  },
];
