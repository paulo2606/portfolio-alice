import type { Metadata } from "next";
import { Fraunces, Lora } from "next/font/google";
import { PageBlobs } from "@/components/PageBlobs";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SITE_TITLE = "Alice Santos — Storymaker";
const SITE_DESCRIPTION =
  "Alice Santos, storymaker especializada em conteudo estrategico para Instagram Stories, Reels e cobertura de eventos.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_TITLE,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/video/hero-poster.jpg",
        width: 1276,
        height: 718,
        alt: "Alice Santos, storymaker, durante cobertura de evento",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/video/hero-poster.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-blush text-ink">
        <PageBlobs />
        {children}
      </body>
    </html>
  );
}
