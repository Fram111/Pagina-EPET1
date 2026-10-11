import React from "react";
import { ArrowRight, CalendarCheck, ClipboardList, FileCheck2, CheckCircle2 } from "lucide-react";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/data/siteData";

const PASOS = [
  { icon: ClipboardList, titulo: "Consulta", desc: "Completá el formulario de contacto o escribinos." },
  { icon: CalendarCheck, titulo: "Visita guiada", desc: "Conocé la escuela, los talleres y las especialidades." },
  { icon: FileCheck2, titulo: "Inscripción", desc: "Presentá la documentación y formalizá tu ingreso." },
];

const REQUISITOS = [
  "12 años cumplidos al 30/06 (Ciclo Básico)",
  "Certificado de estudios primarios",
  "DNI y partida de nacimiento",
  "Ficha médica y carnet de vacunación",
];

const FECHAS = [
  { etapa: "Inscripción", fecha: "Septiembre a octubre" },
  { etapa: "Visita guiada", fecha: "Octubre" },
  { etapa: "Lista de admitidos", fecha: "Noviembre" },
];

export default function Admisiones() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="admisiones" className="relative py-24 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-xl border border-border">
          {/* Imagen */}
          <div className="relative min-h-[320px] lg:min-h-full order-1 lg:order-1">
            <Image src={IMAGES.egresados} alt="Estudiantes de EPET N°1" className="w-full h-full" fittingType="fill" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent lg:bg-gradient-to-r" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block bg-gold text-white text-[11px] font-semibold px-2.5 py-1 rounded-sm mb-2">Admisiones 2027</span>
              <h3 className="text-2xl font-bold text-white max-w-xs leading-tight">Una comunidad que te espera</h3>
            </div>
          </div>

          {/* Contenido */}
          <div className="bg-white p-8 lg:p-12 order-2 lg:order-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Comenzá tu camino</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary leading-tight">Inscribite en EPET N°1</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              La inscripción se realiza de forma presencial en la escuela, con doble turno (mañana y tarde). Acercate con la documentación requerida dentro del período de inscripciones o consultanos para agendar una visita guiada.
            </p>

            {/* Pasos */}
            <div className="mt-7 space-y-3">
              {PASOS.map((p, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-md bg-accent/10 border border-accent/15 flex items-center justify-center shrink-0">
                    <p.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-primary">{p.titulo}</div>
                    <div className="text-xs text-muted-foreground">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Requisitos compactos */}
            <div className="mt-6 p-4 bg-secondary/60 rounded-md">
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Requisitos</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {REQUISITOS.map((r, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" /> {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Fechas */}
            <div className="mt-6 p-4 bg-primary/5 border border-border rounded-md">
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Fechas orientativas</div>
              <ul className="space-y-1.5">
                {FECHAS.map((f, i) => (
                  <li key={i} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{f.etapa}</span>
                    <span className="text-gold font-semibold">{f.fecha}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Botones */}
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => scrollTo("#contacto")}
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold/90 text-white font-semibold px-6 py-3.5 rounded-md transition-colors"
              >
                Quiero inscribirme <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo("#contacto")}
                className="inline-flex items-center justify-center gap-2 border-2 border-primary/20 hover:border-primary text-primary font-semibold px-6 py-3.5 rounded-md transition-colors"
              >
                <CalendarCheck className="w-4 h-4" /> Agendar visita
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}