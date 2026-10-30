import { supabase } from "@/lib/supabase";

export const NEWS_CATEGORIES = [
  { slug: "avisos-institucionales", name: "Avisos institucionales" },
  { slug: "actividades", name: "Actividades" },
  { slug: "competencias", name: "Competencias" },
  { slug: "vida-estudiantil", name: "Vida estudiantil" },
  { slug: "comunidad", name: "Comunidad" },
];

export function categoryName(slug) {
  return NEWS_CATEGORIES.find((category) => category.slug === slug)?.name || slug || "Noticias";
}

export function toPublicNews(row) {
  return {
    id: row.id,
    titulo: row.title,
    fecha: row.published_at || row.created_at,
    categoria: categoryName(row.category_slug),
    imagen: row.cover_image_url || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    resumen: row.summary,
    cuerpo: row.body,
    status: row.status,
  };
}

export async function getPublishedNews() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("news")
    .select("id,title,summary,body,category_slug,cover_image_url,status,published_at,created_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(toPublicNews);
}

export async function getNewsForEditor() {
  if (!supabase) throw new Error("Falta configurar Supabase en el archivo .env.local.");
  const { data, error } = await supabase
    .from("news")
    .select("id,title,slug,summary,body,category_slug,cover_image_url,status,published_at,created_at,updated_at,author_id")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getCurrentProfile(userId) {
  if (!supabase) throw new Error("Falta configurar Supabase en el archivo .env.local.");
  const { data, error } = await supabase.from("profiles").select("id,display_name,role").eq("id", userId).single();
  if (error) throw error;
  return data;
}

export function makeSlug(title) {
  const normalized = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
  return normalized || "noticia";
}

export async function saveNews({ draft, userId, publish }) {
  if (!supabase) throw new Error("Falta configurar Supabase en el archivo .env.local.");
  const title = draft.title.trim();
  const summary = draft.summary.trim();
  if (title.length < 3) throw new Error("El título debe tener al menos 3 caracteres.");
  if (summary.length < 3) throw new Error("El resumen debe tener al menos 3 caracteres.");

  const payload = {
    title,
    slug: makeSlug(title) + (draft.id ? "" : "-" + crypto.randomUUID().slice(0, 8)),
    summary,
    body: draft.body || { type: "doc", content: [{ type: "paragraph" }] },
    category_slug: draft.category_slug,
    cover_image_url: draft.cover_image_url || null,
    status: publish ? "published" : "draft",
    published_at: publish ? (draft.published_at || new Date().toISOString()) : null,
    author_id: draft.author_id || userId,
  };

  let query;
  if (draft.id) {
    const { slug: ignoredSlug, author_id: ignoredAuthor, ...updatePayload } = payload;
    query = supabase.from("news").update(updatePayload).eq("id", draft.id).select().single();
  } else {
    query = supabase.from("news").insert(payload).select().single();
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function uploadNewsImage(file) {
  if (!supabase) throw new Error("Falta configurar Supabase en el archivo .env.local.");
  if (!file.type.startsWith("image/")) throw new Error("Elegí un archivo de imagen.");
  if (file.size > 5 * 1024 * 1024) throw new Error("La imagen debe pesar menos de 5 MB.");
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = "covers/" + crypto.randomUUID() + "." + extension;
  const { error } = await supabase.storage.from("news-images").upload(path, file, { upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from("news-images").getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteNews(id) {
  if (!supabase) throw new Error("Falta configurar Supabase en el archivo .env.local.");
  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) throw error;
}
