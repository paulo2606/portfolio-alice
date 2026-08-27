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

export function formatEventDateBR(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return "";
  return `${day}/${month}/${year}`;
}

export function composeInquiryMessage(
  baseMessage: string,
  eventType: string,
  eventDate: string
): string {
  const details: string[] = [];
  if (eventType.trim()) details.push(`Tipo de evento: ${eventType.trim()}`);
  if (eventDate.trim()) {
    const formatted = formatEventDateBR(eventDate.trim());
    if (formatted) details.push(`Data: ${formatted}`);
  }
  if (details.length === 0) return baseMessage;
  return `${baseMessage}\n\n${details.join("\n")}`;
}
