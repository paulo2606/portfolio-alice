import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Marcador de Truco",
  description: "Marcador de Truco Paulista e Mineiro para dupla (2x2) ou individual (1x1).",
  manifest: "/truco/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/truco/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/truco/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/truco/icons/icon-180-apple.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Truco",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d4d34",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function TrucoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
