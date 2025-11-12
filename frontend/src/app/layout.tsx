import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rotina do Aventureiro",
  description: "Transforme suas rotinas em uma jornada épica!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

