import React, { useEffect, useState } from "react";
import { ArrowRight, Calendar, FileText, Download, BellRing } from "lucide-react";
import { Image } from "@/components/ui/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ANUNCIOS } from "@/data/siteData";
import SectionHeading from "./SectionHeading";
import { hasSupabaseConfig } from "@/lib/supabase";
import { getPublishedNews } from "@/lib/newsService";

const LEGACY_IMAGE = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80";

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" });
}

function renderRichNode(node, key = "root") {
  if (!node) return null;
  if (node.type === "text") {
    let child = node.text || "";
    (node.marks || []).forEach((mark, index) => {
      if (mark.type === "bold") child = <strong key={key + "-b" + index}>{child}</strong>;
      else if (mark.type === "italic") child = <em key={key + "-i" + index}>{child}</em>;
      else if (mark.type === "link" && /^https?:\/\//i.test(mark.attrs?.href || "")) {
        child = <a key={key + "-a" + index} href={mark.attrs.href} target="_blank" rel="noreferrer" className="text-accent underline">{child}</a>;
      }
    });
    return child;
  }
  if (node.type === "hardBreak") return <br key={key} />;
  const children = (node.content || []).map((child, index) => <React.Fragment key={key + "-" + index}>{renderRichNode(child, key + "-" + index)}</React.Fragment>);
  const tagMap = { doc: "div", paragraph: "p", heading: "h3", bulletList: "ul", orderedList: "ol", listItem: "li", blockquote: "blockquote", codeBlock: "pre" };
  const Tag = tagMap[node.type] || "span";
  const classMap = { paragraph: "mb-3 last:mb-0", heading: "mb-3 mt-5 font-bold text-primary", bulletList: "mb-4 list-disc pl-6", orderedList: "mb-4 list-decimal pl-6", blockquote: "my-4 border-l-4 border-gold pl-4 italic", codeBlock: "my-4 overflow-x-auto rounded bg-secondary p-3 text-sm" };
  return <Tag key={key} className={classMap[node.type] || undefined}>{children}</Tag>;
}

function NewsBody({ body }) {
  if (!body) return null;
  if (typeof body === "string") return <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">{body}</p>;
  return <div className="prose prose-slate mt-4 max-w-none text-muted-foreground">{renderRichNode(body)}</div>;
}

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      if (hasSupabaseConfig) {
        try {
          const published = await getPublishedNews();
          if (active) setNoticias(published);
        } catch (error) {
          console.error("No se pudieron cargar las noticias de Supabase:", error);
          if (active) setLoadError(true);
        }
        return;
      }
      try {
        const legacy = JSON.parse(localStorage.getItem("epet_noticias") || "[]");
        if (active) setNoticias(legacy);
      } catch {
        if (active) setNoticias([]);
      }
    }
    load();
    return () => { active = false; };
  }, []);

  return (
    <section id="noticias" className="relative bg-secondary/40 py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          align="center"
          eyebrow="Noticias y Eventos"
          title="Lo que está pasando en la escuela"
          description="Proyectos, logros y actividades de nuestra comunidad educativa."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {loadError && <p className="mb-4 rounded-md border border-border bg-white p-4 text-sm text-muted-foreground">Por el momento no se pudieron cargar las noticias. Probá nuevamente más tarde.</p>}
            {noticias.length ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {noticias.map((n) => (
                  <article
                    key={n.id}
                    onClick={() => setSelected(n)}
                    onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelected(n); }}
                    role="button"
                    tabIndex={0}
                    className="group flex cursor-pointer flex-col overflow-hidden rounded-lg border border-border bg-white transition-all hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={n.imagen || n.cover_image_url || LEGACY_IMAGE} alt={n.titulo || n.title} className="h-full w-full transition-transform duration-500 group-hover:scale-105" fittingType="fill" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                      <span className="absolute left-3 top-3 rounded-sm bg-gold px-2 py-1 text-[10px] font-semibold text-white">{n.categoria || n.category_slug}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-2 flex items-center gap-1.5 text-[11px] text-muted-foreground"><Calendar className="h-3 w-3" /> {formatDate(n.fecha || n.published_at || n.created_at)}</div>
                      <h3 className="font-bold leading-snug text-primary">{n.titulo || n.title}</h3>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{n.resumen || n.summary}</p>
                      <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all group-hover:gap-3">Leer más <ArrowRight className="h-4 w-4" /></span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              !loadError && <div className="rounded-lg border border-border bg-white p-8 text-center text-sm text-muted-foreground">Próximamente compartiremos novedades de nuestra comunidad educativa.</div>
            )}
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="overflow-hidden rounded-lg bg-primary text-white">
              <div className="p-6">
                <div className="mb-2 flex items-center gap-2"><BellRing className="h-4 w-4 text-gold" /><span className="text-xs font-semibold uppercase tracking-wider text-gold">Aviso</span></div>
                <h3 className="text-lg font-bold leading-tight">Calendario Académico 2026</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">Fechas de inicio, receso y fin de ciclo lectivo disponible para descargar.</p>
              </div>
              <button type="button" className="flex w-full items-center justify-center gap-2 bg-gold py-3 text-sm font-semibold text-white transition-colors hover:bg-gold/90"><Download className="h-4 w-4" /> Descargar ahora</button>
            </div>

            <div className="overflow-hidden rounded-lg border border-border bg-white">
              <div className="border-b border-border bg-secondary/50 px-5 py-4">
                <h3 className="flex items-center gap-2 text-sm font-bold text-primary"><FileText className="h-4 w-4 text-accent" /> Anuncios y documentos</h3>
              </div>
              <ul>
                {ANUNCIOS.map((a, i) => (
                  <li key={i} className={`flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-secondary/40 ${i !== ANUNCIOS.length - 1 ? "border-b border-border" : ""}`}>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent/10"><FileText className="h-4 w-4 text-accent" /></div>
                    <div className="min-w-0 flex-1"><div className="truncate text-sm font-medium text-primary">{a.titulo}</div><div className="truncate text-[11px] text-muted-foreground">{a.desc}</div></div>
                    <button type="button" aria-label={`Descargar ${a.titulo}`} className="text-accent transition-colors hover:text-gold"><Download className="h-4 w-4" /></button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto overflow-x-hidden p-0">
          {selected && (
            <div>
              <div className="relative aspect-[16/9]">
                <Image src={selected.imagen || selected.cover_image_url || LEGACY_IMAGE} alt={selected.titulo || selected.title} className="h-full w-full" fittingType="fill" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-sm bg-gold px-2.5 py-1 text-[11px] font-semibold text-white">{selected.categoria || selected.category_slug}</span>
                    <span className="flex items-center gap-1.5 rounded-sm bg-white/90 px-2.5 py-1 text-[11px] font-medium text-primary"><Calendar className="h-3 w-3" /> {formatDate(selected.fecha || selected.published_at || selected.created_at)}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white md:text-2xl">{selected.titulo || selected.title}</h2>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="leading-relaxed text-muted-foreground">{selected.resumen || selected.summary}</p>
                <NewsBody body={selected.cuerpo || selected.body} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
