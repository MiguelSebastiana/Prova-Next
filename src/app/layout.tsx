import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "WEG Academy - Catálogo de Cursos",
  description: "Plataforma de Capacitação Técnica e Treinamentos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* PASSO LAYOUT 5: Aplicar a classe da fonte Montserrat no body */}
      <body className={`${montserrat.className} flex min-h-screen flex-col bg-slate-50 text-slate-900`}>
        {/* PASSO LAYOUT 6: Inserir o componente <Header /> aqui */}
        <Header/>
        <div className="flex-1">{children}</div>
        {/* PASSO LAYOUT 7: Inserir o componente <Footer /> aqui */}
        <Footer/>
      </body>
    </html>
  );
}