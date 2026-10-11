import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FilePlus2, ImagePlus, LogOut, Newspaper, Save, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { hasSupabaseConfig, supabase } from "@/lib/supabase";
import { deleteNews, getCurrentProfile, getNewsForEditor, NEWS_CATEGORIES, saveNews, uploadNewsImage } from "@/lib/newsService";

const emptyDraft = (userId) => ({
  id: null,
  title: "",
  summary: "",
  body: { type: "doc", content: [{ type: "paragraph" }] },
  category_slug: "vida-estudiantil",
  cover_image_url: "",
  status: "draft",
  published_at: null,
  author_id: userId,
});

const inputClass = "w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring";

export default function AdminPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [news, setNews] = useState([]);
  const [draft, setDraft] = useState(null);
  const [loadingNews, setLoadingNews] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [lastSaved, setLastSaved] = useState("");
  const imageInput = useRef(null);
  const dirtyRef = useRef(false);

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return undefined;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (!nextSession) {
        setProfile(null);
        setNews([]);
        setDraft(null);
      }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    let active = true;
    async function loadProfile() {
      if (!session?.user) {
        setProfile(null);
        return;
      }
      try {
        const currentProfile = await getCurrentProfile(session.user.id);
        if (active) setProfile(currentProfile);
      } catch (e) {
        if (active) setError(e.message || "No se pudo verificar el perfil.");
      }
    }
    loadProfile();
    return () => { active = false; };
  }, [session]);

  const refreshNews = useCallback(async () => {
    if (!profile || !["admin", "editor"].includes(profile.role)) return;
    setLoadingNews(true);
    try {
      const rows = await getNewsForEditor();
      setNews(rows);
    } catch (e) {
      setError(e.message || "No se pudieron cargar las noticias.");
    } finally {
      setLoadingNews(false);
    }
  }, [profile]);

  useEffect(() => { refreshNews(); }, [refreshNews]);

  const signIn = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!supabase) return;
    setBusy(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (signInError) setError("No se pudo iniciar sesión. Revisá el correo y la contraseña.");
  };

  const signOut = async () => {
    await supabase?.auth.signOut();
    setProfile(null);
    setSession(null);
    setDraft(null);
  };

  const openDraft = (row) => {
    dirtyRef.current = false;
    setError("");
    setMessage("");
    setLastSaved("");
    setDraft(row ? {
      id: row.id,
      title: row.title,
      summary: row.summary,
      body: row.body,
      category_slug: row.category_slug,
      cover_image_url: row.cover_image_url || "",
      status: row.status,
      published_at: row.published_at,
      author_id: row.author_id,
    } : emptyDraft(session.user.id));
  };

  const updateDraft = (field, value) => {
    dirtyRef.current = true;
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const persist = async (publish = false, isAutoSave = false) => {
    if (!draft || busy) return;
    setError("");
    if (!isAutoSave) setMessage("");
    setBusy(true);
    try {
      const saved = await saveNews({ draft, userId: session.user.id, publish: publish || draft.status === "published" });
      dirtyRef.current = false;
      setDraft({
        id: saved.id,
        title: saved.title,
        summary: saved.summary,
        body: saved.body,
        category_slug: saved.category_slug,
        cover_image_url: saved.cover_image_url || "",
        status: saved.status,
        published_at: saved.published_at,
        author_id: saved.author_id,
      });
      setLastSaved(new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }));
      if (!isAutoSave) setMessage(publish ? "La noticia quedó publicada." : "Borrador guardado.");
      await refreshNews();
    } catch (e) {
      setError(e.message || "No se pudo guardar la noticia.");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (!draft?.id || !dirtyRef.current) return undefined;
    const timer = setTimeout(() => { if (dirtyRef.current) persist(false, true); }, 1800);
    return () => clearTimeout(timer);
  }, [draft]);

  const handleImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const url = await uploadNewsImage(file);
      updateDraft("cover_image_url", url);
      setMessage("Imagen subida correctamente.");
    } catch (e) {
      setError(e.message || "No se pudo subir la imagen.");
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  };

  const remove = async (row) => {
    if (profile?.role !== "admin") return;
    if (!window.confirm("¿Eliminar esta noticia definitivamente?")) return;
    setError("");
    try {
      await deleteNews(row.id);
      setNews((current) => current.filter((item) => item.id !== row.id));
      if (draft?.id === row.id) setDraft(null);
      setMessage("Noticia eliminada.");
    } catch (e) {
      setError(e.message || "No se pudo eliminar la noticia.");
    }
  };

  if (authLoading || (session && !profile && !error)) {
    return <div className="min-h-screen grid place-items-center bg-secondary/50 text-primary">Cargando panel…</div>;
  }

  if (!hasSupabaseConfig) {
    return (
      <main className="min-h-screen bg-secondary/50 px-4 py-12">
        <div className="mx-auto max-w-xl rounded-xl border border-border bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-primary">Configurar el panel de noticias</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Falta conectar las variables de Supabase. En la carpeta <code>paginaepet</code>, creá un archivo <code>.env.local</code> con estas dos líneas y reiniciá el servidor de desarrollo:</p>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-white">VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co{"\n"}VITE_SUPABASE_ANON_KEY=TU_CLAVE_PUBLISHABLE</pre>
          <Button className="mt-6" variant="outline" onClick={() => navigate("/")}>Volver al sitio</Button>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-secondary/50 px-4 py-12">
        <div className="mx-auto max-w-md rounded-xl border border-border bg-white p-8 shadow-sm">
          <button type="button" onClick={() => navigate("/")} className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft size={16} /> Volver al sitio</button>
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white"><Newspaper size={23} /></div>
          <h1 className="text-2xl font-bold text-primary">Panel de noticias</h1>
          <p className="mt-2 text-sm text-muted-foreground">Ingresá con tu cuenta autorizada de la EPET N.º 1.</p>
          <form className="mt-6 space-y-4" onSubmit={signIn}>
            <label className="block text-sm font-medium text-primary">Correo electrónico
              <Input className="mt-1.5" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label className="block text-sm font-medium text-primary">Contraseña
              <Input className="mt-1.5" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            {error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <Button className="w-full" type="submit" disabled={busy}>{busy ? "Ingresando…" : "Iniciar sesión"}</Button>
          </form>
        </div>
      </main>
    );
  }

  if (!profile || !["admin", "editor"].includes(profile.role)) {
    return (
      <main className="min-h-screen bg-secondary/50 px-4 py-12">
        <div className="mx-auto max-w-lg rounded-xl border border-border bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-primary">Cuenta pendiente de autorización</h1>
          <p className="mt-3 text-sm text-muted-foreground">La cuenta inició sesión, pero todavía no tiene el rol de administrador o redactor. Pedile al administrador del sitio que la autorice.</p>
          {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
          <Button className="mt-6" variant="outline" onClick={signOut}>Cerrar sesión</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary/40">
      <header className="border-b border-border bg-primary text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 md:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">EPET N.º 1 · La Rioja</p>
            <h1 className="mt-1 text-xl font-bold md:text-2xl">Gestión de noticias</h1>
            <p className="mt-1 text-xs text-white/70">{profile.display_name || session.user.email} · {profile.role === "admin" ? "Administrador" : "Redactor"}</p>
          </div>
          <Button variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white" onClick={signOut}><LogOut size={16} /> Salir</Button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[300px_minmax(0,1fr)] md:px-8">
        <aside className="h-fit rounded-xl border border-border bg-white p-4">
          <Button className="w-full" onClick={() => openDraft(null)}><FilePlus2 size={16} /> Nueva noticia</Button>
          <div className="mt-5 flex items-center justify-between">
            <h2 className="font-bold text-primary">Noticias</h2>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">{news.length}</span>
          </div>
          {loadingNews ? <p className="py-5 text-sm text-muted-foreground">Cargando…</p> : (
            <ul className="mt-3 space-y-2">
              {news.map((row) => (
                <li key={row.id} className={`rounded-lg border p-3 ${draft?.id === row.id ? "border-accent bg-secondary/60" : "border-border"}`}>
                  <button type="button" onClick={() => openDraft(row)} className="w-full text-left">
                    <span className="block line-clamp-2 text-sm font-semibold text-primary">{row.title}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{row.status === "published" ? "Publicada" : row.status === "archived" ? "Archivada" : "Borrador"} · {new Date(row.updated_at).toLocaleDateString("es-AR")}</span>
                  </button>
                  {profile.role === "admin" && <button type="button" className="mt-2 inline-flex items-center gap-1 text-xs text-red-700 hover:underline" onClick={() => remove(row)}><Trash2 size={13} /> Eliminar</button>}
                </li>
              ))}
              {!news.length && <li className="py-4 text-sm text-muted-foreground">Todavía no hay noticias. Creá la primera.</li>}
            </ul>
          )}
        </aside>

        <section className="min-w-0 rounded-xl border border-border bg-white p-5 shadow-sm md:p-8">
          {!draft ? (
            <div className="grid min-h-80 place-items-center text-center">
              <div><Newspaper className="mx-auto text-accent" size={36} /><h2 className="mt-3 text-xl font-bold text-primary">Elegí una noticia</h2><p className="mt-1 text-sm text-muted-foreground">O creá una nueva para empezar a editar.</p></div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-5">
                <div><p className="text-xs font-semibold uppercase tracking-wider text-accent">{draft.id ? "Editando noticia" : "Nueva noticia"}</p><h2 className="mt-1 text-xl font-bold text-primary">Contenido de la publicación</h2></div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs text-primary">{draft.status === "published" ? "Publicada" : "Borrador"}</span>
              </div>
              <div className="mt-6 space-y-5">
                <label className="block text-sm font-medium text-primary">Título
                  <Input className="mt-1.5" maxLength={180} value={draft.title} onChange={(e) => updateDraft("title", e.target.value)} placeholder="Ej.: Jornada de lectura en la escuela" />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-primary">Categoría
                    <select className={inputClass + " mt-1.5"} value={draft.category_slug} onChange={(e) => updateDraft("category_slug", e.target.value)}>
                      {NEWS_CATEGORIES.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}
                    </select>
                  </label>
                  <div>
                    <span className="block text-sm font-medium text-primary">Imagen de portada</span>
                    <div className="mt-1.5 flex gap-2">
                      <Input value={draft.cover_image_url} onChange={(e) => updateDraft("cover_image_url", e.target.value)} placeholder="URL de imagen (opcional)" />
                      <input ref={imageInput} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={handleImage} />
                      <Button type="button" variant="outline" title="Subir imagen" onClick={() => imageInput.current?.click()} disabled={busy}><ImagePlus size={17} /></Button>
                    </div>
                    {draft.cover_image_url && <img src={draft.cover_image_url} alt="Vista previa de portada" className="mt-3 max-h-48 rounded-lg border border-border object-cover" />}
                  </div>
                </div>
                <label className="block text-sm font-medium text-primary">Resumen
                  <textarea className={inputClass + " mt-1.5 resize-y"} rows={3} maxLength={400} value={draft.summary} onChange={(e) => updateDraft("summary", e.target.value)} placeholder="Una descripción breve para la tarjeta pública." />
                  <span className="mt-1 block text-right text-xs text-muted-foreground">{draft.summary.length}/400</span>
                </label>
                <div><span className="mb-1.5 block text-sm font-medium text-primary">Cuerpo de la noticia</span><RichTextEditor key={draft.id || "new"} value={draft.body} onChange={(body) => updateDraft("body", body)} /></div>
              </div>

              {error && <p role="alert" className="mt-5 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
              {message && <p role="status" className="mt-5 rounded-md bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p>}
              {lastSaved && <p className="mt-3 text-xs text-muted-foreground">Último guardado: {lastSaved}{draft.id ? " · el borrador se autoguarda al dejar de escribir" : " · guardá manualmente para crear el borrador"}</p>}
              <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
                <Button onClick={() => persist(false)} disabled={busy}><Save size={16} /> {busy ? "Guardando…" : "Guardar borrador"}</Button>
                <Button onClick={() => persist(true)} disabled={busy}><Send size={16} /> Publicar noticia</Button>
                <Button variant="outline" onClick={() => { setDraft(null); setError(""); setMessage(""); }} disabled={busy}>Cerrar editor</Button>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
