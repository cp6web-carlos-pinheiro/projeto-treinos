import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bootcamp Treinos — API Tester",
  description: "Página de teste da API Bootcamp Treinos",
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
