import React from "react";
import { Wrench, GraduationCap, FlaskConical, Briefcase, ShieldCheck } from "lucide-react";
import { PILARES } from "@/data/siteData";

const ICONS = { Wrench, GraduationCap, FlaskConical, Briefcase, ShieldCheck };

export default function Pilares() {
  return (
    <section className="relative bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 divide-x divide-white/10">
          {PILARES.map((p, i) => {
            const Icon = ICONS[p.icon];
            return (
              <div key={i} className="py-8 px-5 flex flex-col items-center text-center gap-3 first:border-l-0">
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-semibold text-sm leading-snug">{p.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed hidden sm:block">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}