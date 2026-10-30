import { useLocation, Link } from "react-router-dom";

export default function PageNotFound() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="text-6xl font-black text-sky-600 mb-4">404</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Página no encontrada</h1>
        <p className="text-slate-600 text-sm mb-6">
          La ruta <code className="bg-slate-100 px-2 py-1 rounded text-xs text-slate-800">{location.pathname}</code> no existe o fue movida.
        </p>
        <Link
          to="/"
          className="inline-block w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-xl shadow transition"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}