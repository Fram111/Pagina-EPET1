import React from "react";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/data/siteData";
import SectionHeading from "./SectionHeading";

const GALERIA = [
  { img: IMAGES.campus, titulo: "Campus y patios", desc: "Espacios abiertos para el encuentro entre clases." },
  { img: IMAGES.informatica, titulo: "Laboratorio de Informática", desc: "Equipos para programación, redes y soporte." },
  { img: IMAGES.electromecanica, titulo: "Taller de Procesos", desc: "Plantas, instrumentación y prácticas industriales." },
  { img: IMAGES.electronica, titulo: "Talleres técnicos", desc: "Bancos de trabajo para prácticas profesionalizantes." },
  { img: IMAGES.feria, titulo: "Proyectos y ferias", desc: "Muestras de estudiantes y trabajos finales." },
  { img: IMAGES.egresados, titulo: "Actos y comunidad", desc: "Ceremonias, actos y vida institucional." },
];

export default function VidaEscolar() {
  return (
    <section id="vida-escolar" className="relative py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Vida Escolar"
              title="Una comunidad que aprende haciendo"
              description="El campus de EPET N°1 combina aulas, talleres equipados y espacios de encuentro. La vida escolar se construye entre proyectos técnicos, deportes, actos y el trabajo en equipo."
            />
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-3 gap-px bg-border rounded-md overflow-hidden">
              {[
                { n: "2", l: "Tecnicaturas" },
                { n: "2", l: "Turnos" },
                { n: "112+", l: "Años" },
              ].map((s, i) => (
                <div key={i} className="bg-white p-4 text-center">
                  <div className="text-2xl font-black text-primary">{s.n}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {GALERIA.map((g, i) => (
            <figure
              key={i}
              className={`group relative overflow-hidden rounded-lg ${i === 0 ? "col-span-2 lg:row-span-2 aspect-[16/10] lg:aspect-auto" : "aspect-[4/3]"}`}
            >
              <Image src={g.img} alt={g.titulo} className="w-full h-full transition-transform duration-500 group-hover:scale-105" fittingType="fill" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent opacity-90" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <h3 className="font-bold text-white text-sm md:text-base">{g.titulo}</h3>
                <p className="text-white/70 text-xs mt-1 hidden sm:block">{g.desc}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}