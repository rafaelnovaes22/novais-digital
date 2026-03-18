import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Novais Digital | Soluções Inteligentes com IA",
  description:
    "Transformamos processos em soluções inteligentes com Inteligência Artificial. Chatbots, SaaS, automação e consultoria em IA.",
  keywords: [
    "IA",
    "inteligência artificial",
    "chatbot",
    "automação",
    "SaaS",
    "LangGraph",
    "desenvolvimento",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
