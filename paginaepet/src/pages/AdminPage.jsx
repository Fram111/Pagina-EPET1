import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: "",
    fecha: "",
    categoria: "Vida estudiantil",
    imagen: "",
    resumen: "",
    cuerpo: "",
  });

  const onChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const noticias = JSON.parse(localStorage.getItem("epet_noticias") || "[]");

    const nuevaNoticia = {
      id: Date.now().toString(),
      titulo: form.titulo,
      fecha: form.fecha || new Date().toISOString().slice(0, 10),
      categoria: form.categoria,
      imagen: form.imagen || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      resumen: form.resumen,
      cuerpo: form.cuerpo,
    };

    noticias.unshift(nuevaNoticia);
    localStorage.setItem("epet_noticias", JSON.stringify(noticias));

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Panel de noticias</h1>
        <p className="text-slate-600 mb-6">Agregá una noticia o novedad del colegio.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Título</label>
            <input
              name="titulo"
              value={form.titulo}
              onChange={onChange}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="Ej: Jornada de lectura en la escuela"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Fecha</label>
              <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={onChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Categoría</label>
              <select
                name="categoria"
                value={form.categoria}
                onChange={onChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option>Vida estudiantil</option>
                <option>Actividades</option>
                <option>Eventos</option>
                <option>Comunidad</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Imagen</label>
            <input
              name="imagen"
              value={form.imagen}
              onChange={onChange}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Resumen</label>
            <textarea
              name="resumen"
              value={form.resumen}
              onChange={onChange}
              rows={3}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="Resumen breve"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cuerpo</label>
            <textarea
              name="cuerpo"
              value={form.cuerpo}
              onChange={onChange}
              rows={6}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="Texto completo de la noticia"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold"
          >
            Guardar noticia
          </button>
        </form>
      </div>
    </div>
  );
}