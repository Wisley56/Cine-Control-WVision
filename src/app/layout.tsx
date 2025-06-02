import type { Metadata } from 'next';
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: 'CineControl WVision',
  description: 'Sua plataforma para gerenciar filmes, salas e sessões de cinema.',
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
