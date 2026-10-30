import fs from "fs";
import path from "path";
import matter from "gray-matter";

const dir = path.resolve("public/content/noticias");
const outFile = path.resolve("public/content/noticias/index.json");

const files = fs.readdirSync(dir)
  .filter((file) => file.endsWith(".md"))
  .sort();

const noticias = files.map((file) => {
  const fullPath = path.join(dir, file);
  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(source);

  return {
    id: data.id || file.replace(".md", ""),
    titulo: data.titulo || "",
    fecha: data.fecha || "",
    categoria: data.categoria || "",
    imagen: data.imagen || "",
    resumen: data.resumen || "",
    cuerpo: content.trim(),
  };
});

fs.writeFileSync(outFile, JSON.stringify(noticias, null, 2), "utf8");
console.log(`Se generaron ${noticias.length} noticias en ${outFile}`);