import React, { useState } from "react";
import { ArrowRight, CheckCircle2, X, Briefcase, BookOpen } from "lucide-react";
import { Image } from "@/components/ui/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ESPECIALIDADES } from "@/data/siteData";
import SectionHeading from "./SectionHeading";

export default function Especialidades() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("todas");

  const filters = [
    { id: "todas", label: "Todas" },
    { id: "superior", label: "Ciclo Superior" },
    { id: "basico", label: "Ciclo Básico" },
  ];

  const filtered = ESPECIALIDADES.filter((e) => {
    if (filter === "todas") return true;
    if (filter === "superior") return e.id !== "ciclo-basico";
    if (filter === "basico") return e.id === "ciclo-basico";
    return true;
  });

  return (
    <section id="especialidades" className="relative py-24 lg:py-32 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Oferta Académica"
            title="Descubrí nuestras especialidades"
            description="Cinco recorridos formativos que combinan teoría, práctica en talleres y proyectos reales con proyección laboral."
          />
          {/* Filtros */}
          <div className="flex items-center gap-1 p-1 bg-white border border-border rounded-md w-fit">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
                  filter === f.id ? "bg-primary text-white" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((esp) => (
            <article
              key={esp.id}
              className="group relative bg-white rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden hover-blueprint">
                <Image src={esp.imagen} alt={esp.nombre} className="w-full h-full transition-transform duration-500 group-hover:scale-105" fittingType="fill" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-sm text-[11px] font-semibold text-primary">
                  {esp.ciclo}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white leading-tight">{esp.nombre}</h3>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{esp.breve}</p>
                <button
                  onClick={() => setSelected(esp)}
                  className="mt-5 inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all"
                >
                  Ver más <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal detalle */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          {selected && (
            <div>
              <div className="relative aspect-[16/9]">
                <Image src={selected.imagen} alt={selected.nombre} className="w-full h-full" fittingType="fill" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                <div className="absolute bottom-5 left-6 right-6">
                  <span className="inline-block bg-gold text-white text-[11px] font-semibold px-2.5 py-1 rounded-sm mb-3">{selected.ciclo}</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{selected.nombre}</h2>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-muted-foreground leading-relaxed">{selected.breve}</p>

                <div className="mt-6 p-5 bg-secondary/50 rounded-md border-l-4 border-gold">
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Perfil del egresado</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.perfil}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-primary mb-3">
                      <BookOpen className="w-4 h-4 text-accent" /> Materias orientativas
                    </h4>
                    <ul className="space-y-2">
                      {selected.materias.map((m, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-gold mt-0.5 shrink-0" /> {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-primary mb-3">
                      <Briefcase className="w-4 h-4 text-accent" /> Salidas laborales
                    </h4>
                    <ul className="space-y-2">
                      {selected.salidas.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-gold mt-0.5 shrink-0" /> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => { setSelected(null); document.querySelector("#admisiones")?.scrollIntoView({ behavior: "smooth" }); }}
                    className="bg-gold hover:bg-gold/90 text-white font-semibold px-6 py-3 rounded-md text-sm"
                  >
                    Quiero inscribirme
                  </button>
                  <button
                    onClick={() => setSelected(null)}
                    className="border border-border hover:bg-secondary text-primary font-semibold px-6 py-3 rounded-md text-sm"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}