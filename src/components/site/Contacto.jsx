import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CONTACTO } from "@/data/siteData";
import SectionHeading from "./SectionHeading";

export default function Contacto() {
  const { toast } = useToast();
  const [form, setForm] = useState({ nombre: "", email: "", tipo: "general", asunto: "", mensaje: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "Ingresá tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Ingresá un email válido.";
    if (!form.asunto.trim()) e.asunto = "Ingresá un asunto.";
    if (!form.mensaje.trim()) e.mensaje = "Escribí tu mensaje.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ nombre: "", email: "", tipo: "general", asunto: "", mensaje: "" });
      toast({
        title: "Mensaje enviado con éxito",
        description: "Gracias por contactarte con EPET N°1. Te responderemos a la brevedad.",
      });
    }, 900);
  };

  const datos = [
    { icon: MapPin, label: "Dirección", valor: CONTACTO.direccion },
    { icon: Phone, label: "Teléfono", valor: CONTACTO.telefono, href: `tel:${CONTACTO.telefono}` },
    { icon: Mail, label: "Email", valor: CONTACTO.email, href: `mailto:${CONTACTO.email}` },
    { icon: Clock, label: "Horarios", valor: CONTACTO.horario },
  ];

  return (
    <section id="contacto" className="relative py-24 lg:py-32 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Contacto</span>
            <span className="h-px w-8 bg-gold" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Estamos para acompañarte</h2>
          <p className="mt-4 text-muted-foreground">Escribinos con tus consultas o acercate a la institución en nuestro horario de atención.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Datos + mapa */}
          <div className="lg:col-span-5 space-y-4">
            {datos.map((d, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-white border border-border rounded-md">
                <div className="w-11 h-11 rounded-md bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0">
                  <d.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider">{d.label}</div>
                  {d.href ? (
                    <a href={d.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{d.valor}</a>
                  ) : (
                    <div className="text-sm text-muted-foreground">{d.valor}</div>
                  )}
                </div>
              </div>
            ))}
            {/* Mapa placeholder */}
            <div className="relative aspect-[16/10] rounded-md overflow-hidden border border-border bg-primary/5">
              <div className="absolute inset-0 blueprint-grid opacity-50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <MapPin className="w-8 h-8 text-accent mb-2" />
                <p className="text-sm font-semibold text-primary">{CONTACTO.direccion}</p>
                <p className="text-xs text-muted-foreground mt-1">Mapa interactivo disponible al publicar la institución.</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-border rounded-lg p-7 md:p-9 h-full">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-gold" />
                <h3 className="text-lg font-bold text-primary">Envianos un mensaje</h3>
              </div>
              <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wider">Nombre</label>
                  <input
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    className={`w-full px-4 py-3 bg-white border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 ${errors.nombre ? "border-destructive" : "border-border"}`}
                  />
                  {errors.nombre && <p className="mt-1 text-xs text-destructive">{errors.nombre}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wider">Tipo de consulta</label>
                  <select
                    value={form.tipo}
                    onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  >
                    <option value="general">Consulta general</option>
                    <option value="admisiones">Consulta de admisiones / inscripción</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full px-4 py-3 bg-white border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 ${errors.email ? "border-destructive" : "border-border"}`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wider">Asunto</label>
                  <input
                    value={form.asunto}
                    onChange={(e) => setForm({ ...form, asunto: e.target.value })}
                    className={`w-full px-4 py-3 bg-white border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 ${errors.asunto ? "border-destructive" : "border-border"}`}
                  />
                  {errors.asunto && <p className="mt-1 text-xs text-destructive">{errors.asunto}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wider">Mensaje</label>
                  <textarea
                    rows={5}
                    value={form.mensaje}
                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                    className={`w-full px-4 py-3 bg-white border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none ${errors.mensaje ? "border-destructive" : "border-border"}`}
                  />
                  {errors.mensaje && <p className="mt-1 text-xs text-destructive">{errors.mensaje}</p>}
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-semibold px-7 py-3.5 rounded-md transition-colors"
                  >
                    {sending ? "Enviando…" : <>Enviar mensaje <Send className="w-4 h-4" /></>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}