import React, { useState } from "react";
import { ArrowRight, Calendar, FileText, Download, BellRing } from "lucide-react";
import { Image } from "@/components/ui/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { NOTICIAS, ANUNCIOS } from "@/data/siteData";
import SectionHeading from "./SectionHeading";

export default function Noticias() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="noticias" className="relative py-24 lg:py-28 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          align="center"
          eyebrow="Noticias y Eventos"
          title="Lo que está pasando en la escuela"
          description="Proyectos, logros y actividades de nuestra comunidad educativa."
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Grilla de noticias */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {NOTICIAS.map((n) => (
                <article
                  key={n.id}
                  onClick={() => setSelected(n)}
                  className="group bg-white rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={n.imagen} alt={n.titulo} className="w-full h-full transition-transform duration-500 group-hover:scale-105" fittingType="fill" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                    <span className="absolute top-3 left-3 bg-gold text-white text-[10px] font-semibold px-2 py-1 rounded-sm">{n.categoria}</span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-2">
                      <Calendar className="w-3 h-3" /> {n.fecha}
                    </div>
                    <h3 className="font-bold text-primary leading-snug">{n.titulo}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">{n.resumen}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-accent text-sm font-semibold group-hover:gap-3 transition-all">
                      Leer más <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Calendario */}
            <div className="bg-primary text-white rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <BellRing className="w-4 h-4 text-gold" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold">Aviso</span>
                </div>
                <h3 className="text-lg font-bold leading-tight">Calendario Académico 2026</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">Fechas de inicio, receso y fin de ciclo lectivo disponible para descargar.</p>
              </div>
              <button className="w-full bg-gold hover:bg-gold/90 text-white font-semibold py-3 text-sm flex items-center justify-center gap-2 transition-colors">
                <Download className="w-4 h-4" /> Descargar ahora
              </button>
            </div>

            {/* Anuncios */}
            <div className="bg-white border border-border rounded-lg overflow-hidden">
              <div className="px-5 py-4 border-b border-border bg-secondary/50">
                <h3 className="font-bold text-primary text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-accent" /> Anuncios y documentos
                </h3>
              </div>
              <ul>
                {ANUNCIOS.map((a, i) => (
                  <li key={i} className={`flex items-center gap-3 px-5 py-3.5 hover:bg-secondary/40 transition-colors ${i !== ANUNCIOS.length - 1 ? "border-b border-border" : ""}`}>
                    <div className="w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-primary truncate">{a.titulo}</div>
                      <div className="text-[11px] text-muted-foreground truncate">{a.desc}</div>
                    </div>
                    <button className="text-accent hover:text-gold transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* Modal noticia */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          {selected && (
            <div>
              <div className="relative aspect-[16/9]">
                <Image src={selected.imagen} alt={selected.titulo} className="w-full h-full" fittingType="fill" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gold text-white text-[11px] font-semibold px-2.5 py-1 rounded-sm">{selected.categoria}</span>
                    <span className="bg-white/90 text-primary text-[11px] font-medium px-2.5 py-1 rounded-sm flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" /> {selected.fecha}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">{selected.titulo}</h2>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-muted-foreground leading-relaxed">{selected.resumen}</p>
                <p className="mt-4 text-muted-foreground leading-relaxed">{selected.cuerpo}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}