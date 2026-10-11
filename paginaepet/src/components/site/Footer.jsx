import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, ArrowRight, ArrowUpRight, Send } from "lucide-react";
import { NAV_ITEMS, CONTACTO } from "@/data/siteData";
import { useToast } from "@/components/ui/use-toast";

export default function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleNav = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const subscribe = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Email inválido", description: "Ingresá un email válido.", variant: "destructive" });
      return;
    }
    setEmail("");
    toast({ title: "Suscripción confirmada", description: "Te sumaste al newsletter de EPET N°1." });
  };

  return (
    <footer className="bg-primary text-white/80">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-16 border-b border-white/10">
          {/* Institución + newsletter */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-11 h-11 rounded-md bg-white/10 flex items-center justify-center">
                <span className="text-gold font-black text-lg">E</span>
                <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-sm bg-gold" />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-lg text-white">EPET N°1</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/50">Educación Técnica</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">
              Escuela de Educación Técnica de La Pampa. Formamos técnicos con valores, práctica real y proyección laboral desde 1971.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gold mb-2">Newsletter</div>
              <form onSubmit={subscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email"
                  className="flex-1 px-3 py-2.5 bg-white/5 border border-white/15 rounded-md text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
                <button type="submit" className="w-11 h-11 shrink-0 bg-gold hover:bg-gold/90 rounded-md flex items-center justify-center transition-colors">
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
            </div>

            <div className="flex items-center gap-3 mt-6">
              {[Facebook, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-md bg-white/5 hover:bg-gold flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* La Institución */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold mb-5">La Institución</h4>
            <ul className="space-y-3 text-sm">
              {NAV_ITEMS.slice(0, 3).map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={(e) => { e.preventDefault(); handleNav(item.href); }} className="hover:text-white transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Académico */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold mb-5">Académico</h4>
            <ul className="space-y-3 text-sm">
              {NAV_ITEMS.slice(3, 6).map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={(e) => { e.preventDefault(); handleNav(item.href); }} className="hover:text-white transition-colors">{item.label}</a>
                </li>
              ))}
              <li><a href="#noticias" onClick={(e) => { e.preventDefault(); handleNav("#noticias"); }} className="hover:text-white transition-colors">Documentos</a></li>
            </ul>
          </div>

          {/* Comunidad */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold mb-5">Comunidad</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#contacto" onClick={(e) => { e.preventDefault(); handleNav("#contacto"); }} className="hover:text-white transition-colors">Portal Alumnos</a></li>
              <li><a href="#contacto" onClick={(e) => { e.preventDefault(); handleNav("#contacto"); }} className="hover:text-white transition-colors">Portal Padres</a></li>
              <li><a href="#noticias" onClick={(e) => { e.preventDefault(); handleNav("#noticias"); }} className="hover:text-white transition-colors">Calendario</a></li>
              <li><a href="#admisiones" onClick={(e) => { e.preventDefault(); handleNav("#admisiones"); }} className="hover:text-white transition-colors">Admisiones</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold mb-5">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2.5"><MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" /><span className="text-white/70">{CONTACTO.direccion}</span></li>
              <li className="flex gap-2.5"><Phone className="w-4 h-4 mt-0.5 text-gold shrink-0" /><a href={`tel:${CONTACTO.telefono}`} className="text-white/70 hover:text-white">{CONTACTO.telefono}</a></li>
              <li className="flex gap-2.5"><Mail className="w-4 h-4 mt-0.5 text-gold shrink-0" /><a href={`mailto:${CONTACTO.email}`} className="text-white/70 hover:text-white break-all">{CONTACTO.email}</a></li>
              <li className="flex gap-2.5"><Clock className="w-4 h-4 mt-0.5 text-gold shrink-0" /><span className="text-white/70">{CONTACTO.horario}</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2026 EPET N°1 — Todos los derechos reservados. Prototipo institucional.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#inicio" onClick={(e) => { e.preventDefault(); handleNav("#inicio"); }} className="flex items-center gap-1 hover:text-white transition-colors">
              Volver arriba <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}