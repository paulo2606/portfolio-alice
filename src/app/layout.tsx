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

export const metadata: Metadata = {
  title: "Alice Santos — Storymaker",
  description:
    "Alice Santos, storymaker especializada em conteudo estrategico para Instagram Stories, Reels e cobertura de eventos.",
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
