import React from "react";

export default function SectionHeading({ eyebrow, title, description, align = "left", light = false }) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-4 ${align === "center" ? "justify-center" : ""}`}>
          <span className="h-px w-8 bg-gold" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</span>
          <span className="h-px w-8 bg-gold" />
        </div>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] ${light ? "text-white" : "text-primary"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-lg leading-relaxed ${light ? "text-white/70" : "text-muted-foreground"}`}>
          {description}
        </p>
      )}
    </div>
  );
}