import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { Cormorant_Garamond, Inter } from "next/font/google";

const titleFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-title",
});

const textFont = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-text",
});

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
      <body className={`${titleFont.variable} ${textFont.variable} font-text bg-cloudWhite text-deepTwilight`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html >
  );
}
