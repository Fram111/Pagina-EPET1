import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, Facebook, Instagram, LogIn, GraduationCap } from "lucide-react";
import { NAV_ITEMS, CONTACTO } from "@/data/siteData";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Top bar */}
      <div className="hidden lg:block bg-primary text-white/85">
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-gold" /> {CONTACTO.email}
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-gold" /> {CONTACTO.telefono}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/50">Portales:</span>
            <a href="#contacto" onClick={(e) => { e.preventDefault(); handleNav("#contacto"); }} className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <LogIn className="w-3.5 h-3.5" /> Portal Alumnos
            </a>
            <span className="text-white/30">·</span>
            <a href="#contacto" onClick={(e) => { e.preventDefault(); handleNav("#contacto"); }} className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <GraduationCap className="w-3.5 h-3.5" /> Portal Padres
            </a>
            <span className="text-white/30 mx-2">|</span>
            <a href="#" className="hover:text-gold transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
            <a href="#" className="hover:text-gold transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className={`transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-white shadow-sm"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-18 py-3">
          <a href="#inicio" onClick={(e) => { e.preventDefault(); handleNav("#inicio"); }} className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-md bg-primary flex items-center justify-center shadow-sm">
              <span className="text-gold font-black text-lg leading-none">E</span>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-sm bg-gold" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-lg tracking-tight text-primary">EPET N°1</div>
              <div className="text-[10px] uppercase tracking-[0.18em] font-medium text-muted-foreground">Educación Técnica</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-accent transition-colors rounded-md hover:bg-secondary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav("#admisiones")}
              className="hidden sm:inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors shadow-sm"
            >
              Inscribite ahora
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-md text-primary hover:bg-secondary"
              aria-label="Menú"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-b border-border shadow-lg animate-fade-in">
          <nav className="px-6 py-4 flex flex-col">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
                className="py-3 text-base font-medium text-foreground/80 hover:text-accent border-b border-border/60 last:border-0"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => handleNav("#admisiones")}
              className="mt-4 w-full bg-gold text-white text-sm font-semibold px-5 py-3 rounded-md"
            >
              Inscribite ahora
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}