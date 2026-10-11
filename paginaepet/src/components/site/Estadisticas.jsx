import React, { useEffect, useRef, useState } from "react";
import { ESTADISTICAS } from "@/data/siteData";

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function Counter({ valor, sufijo, start }) {
  const num = parseInt(valor.replace(/\D/g, "")) || 0;
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const dur = 1400;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * num));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, num]);
  const prefix = valor.startsWith("1") && valor.includes(".") ? "" : "";
  return (
    <span>
      {prefix}{display.toLocaleString("es-AR")}{sufijo}
    </span>
  );
}

export default function Estadisticas() {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <section ref={ref} className="relative bg-primary text-white overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-[0.07]" />
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">La escuela en números</span>
            <span className="h-px w-8 bg-gold" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Estadísticas institucionales</h2>
          <p className="mt-4 text-white/60">Una trayectoria sostenida en formación técnica, respaldada por datos.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-white/10">
          {ESTADISTICAS.map((e, i) => (
            <div key={i} className="bg-primary p-8 text-center">
              <div className="text-4xl md:text-5xl font-black text-white tracking-tight">
                <Counter valor={e.valor} sufijo={e.sufijo} start={inView} />
              </div>
              <div className="mt-3 text-xs md:text-sm text-white/60 leading-snug">{e.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}