import type { SVGProps } from "react";

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 0 1 7 12.5l-.2.4.8 2.9-3-.8-.4.2A8.2 8.2 0 1 1 12 3.8Zm-3.3 4a.9.9 0 0 0-.6.3c-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.1 1.6 2.6 4 3.6 2 .8 2.4.7 2.8.6.4-.1 1.3-.5 1.5-1s.2-1 .1-1.1c-.1-.1-.2-.2-.5-.3l-1.9-.9c-.3-.1-.5-.1-.6.1l-.5.7c-.1.1-.2.2-.4.1a5.2 5.2 0 0 1-1.6-1 6.6 6.6 0 0 1-1.2-1.5c-.1-.2 0-.3.1-.4l.3-.4c.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4l-.8-2c-.2-.5-.4-.4-.6-.4Z" />
    </svg>
  );
}
