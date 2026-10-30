import React from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Hero from "@/components/site/Hero";
import Pilares from "@/components/site/Pilares";
import Estadisticas from "@/components/site/Estadisticas";
import SobreNosotros from "@/components/site/SobreNosotros";
import Especialidades from "@/components/site/Especialidades";
import Admisiones from "@/components/site/Admisiones";
import VidaEscolar from "@/components/site/VidaEscolar";
import Noticias from "@/components/site/Noticias";
import Contacto from "@/components/site/Contacto";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Pilares />
        <SobreNosotros />
        <Especialidades />
        <Estadisticas />
        <VidaEscolar />
        <Admisiones />
        <Noticias />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}