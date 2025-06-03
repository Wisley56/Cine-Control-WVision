import type { Metadata } from 'next';
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: 'WVision Cine Manager',
  description: 'Sua plataforma para gerenciar filmes, salas e sessões de cinema.',
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="antialiased"> 
        <Navbar/>
        <div className="pt-[68px] md:pt-[68px]"> 
                                                
          {children}
        </div>
      </body>
    </html>
  );
}