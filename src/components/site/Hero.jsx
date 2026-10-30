import React from "react";
import { ArrowRight, Play } from "lucide-react";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/data/siteData";

export default function Hero() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image src={IMAGES.hero} alt="Estudiantes de EPET N°1" className="w-full h-full" fittingType="fill" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl text-white animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur text-xs font-semibold mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Inscripción 2027 abierta
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-balance">
            Formamos técnicos.<br />
            <span className="text-gold">Construimos futuro.</span>
          </h1>
          <p className="mt-6 text-lg text-white/75 leading-relaxed max-w-md">
            Educación técnica de calidad, con valores, práctica real y proyección laboral para las nuevas generaciones.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => scrollTo("#institucional")}
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold/90 text-white font-semibold px-7 py-3.5 rounded-md transition-colors"
            >
              Descubrí la escuela <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollTo("#vida-escolar")}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white text-white font-semibold px-7 py-3.5 rounded-md transition-colors backdrop-blur-sm"
            >
              <Play className="w-4 h-4" /> Ver vida escolar
            </button>
          </div>

          <div className="mt-12 flex items-center gap-8">
            <div>
              <div className="text-3xl font-black text-gold">100+</div>
              <div className="text-xs text-white/60 mt-1">años de trayectoria</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <div className="text-3xl font-black text-gold">2</div>
              <div className="text-xs text-white/60 mt-1">tecnicaturas</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <div className="text-3xl font-black text-gold">2</div>
              <div className="text-xs text-white/60 mt-1">turnos (mañana y tarde)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}