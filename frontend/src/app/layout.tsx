import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rotina do Aventureiro",
  description: "Transforme sua rotina em uma aventura épica de RPG.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
