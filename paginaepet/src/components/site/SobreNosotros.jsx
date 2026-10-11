import React from "react";
import { ArrowRight, Target, Users, Lightbulb, Handshake, Award } from "lucide-react";
import { Image } from "@/components/ui/image";
import { IMAGES, VALORES } from "@/data/siteData";
import SectionHeading from "./SectionHeading";

const ICONS = { Target, Users, Lightbulb, Handshake, Award };

const MINI_STATS = [
  { n: "1914", l: "Año de fundación" },
  { n: "1.200+", l: "Estudiantes" },
  { n: "30+", l: "Proyectos/año" },
];

const SIDE_STATS = [
  { n: "1:14", l: "Relación docente-alumno" },
  { n: "8", l: "Actividades extracurriculares" },
  { n: "12", l: "Talleres equipados" },
];

export default function SobreNosotros() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="institucional" className="relative py-24 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Texto */}
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Institucional"
              title="Una escuela técnica con historia y proyección"
              description="Desde 1971, EPET N°1 acompaña a las nuevas generaciones en su camino hacia el conocimiento técnico, el trabajo y la continuidad de sus estudios."
            />
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Desde 1914 en La Rioja Capital, EPET N°1 combina rigor académico, práctica real en talleres y una comunidad cercana que cuida a cada estudiante. Nuestra misión es brindar formación técnica de calidad que prepare para el mundo del trabajo y la educación superior, con doble turno (mañana y tarde) y talleres en el contraturno.
            </p>
            <button
              onClick={() => scrollTo("#especialidades")}
              className="mt-7 inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
            >
              Conocenos más <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mini stats */}
            <div className="mt-8 flex items-center gap-6">
              {MINI_STATS.map((s, i) => (
                <div key={i} className={i > 0 ? "pl-6 border-l border-border" : ""}>
                  <div className="text-2xl font-black text-primary">{s.n}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Imagen */}
          <div className="lg:col-span-4">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-xl">
              <Image src={IMAGES.fachada} alt="Fachada de EPET N°1" className="w-full h-full" fittingType="fill" />
              <div className="absolute -bottom-3 -left-5 hidden md:block bg-gold text-white px-6 py-4 rounded-md shadow-lg">
                <div className="text-3xl font-black leading-none">112+</div>
                <div className="text-[10px] uppercase tracking-wider mt-1">Años de trayectoria</div>
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div className="lg:col-span-3 space-y-4">
            {SIDE_STATS.map((s, i) => (
              <div key={i} className="p-5 bg-secondary/60 border border-border rounded-lg">
                <div className="text-3xl font-black text-accent">{s.n}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Valores */}
        <div className="mt-20 pt-12 border-t border-border">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-primary">Nuestros valores</h3>
            <p className="mt-2 text-muted-foreground">Los principios que guían la vida institucional.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-border rounded-lg overflow-hidden">
            {VALORES.map((v, i) => {
              const Icon = ICONS[v.icon];
              return (
                <div key={i} className="bg-white p-6 text-center hover:bg-secondary/40 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/15 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h4 className="font-semibold text-primary text-sm">{v.titulo}</h4>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}