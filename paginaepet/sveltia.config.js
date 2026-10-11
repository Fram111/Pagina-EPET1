export default {
  title: "EPET N°1",
  backend: {
    name: "github",
    repo: "epet-larioja/pagina-epet1",
    branch: "main",
    auth_scope: "repo",
  },
  media_folder: "public/images",
  public_folder: "/images",
  collections: [
    {
      name: "noticias",
      label: "Noticias",
      folder: "public/content/noticias",
      create: true,
      slug: "{{slug}}",
      fields: [
        { label: "ID", name: "id", widget: "string" },
        { label: "Título", name: "titulo", widget: "string" },
        { label: "Fecha", name: "fecha", widget: "datetime", format: "YYYY-MM-DD" },
        { label: "Categoría", name: "categoria", widget: "string" },
        { label: "Imagen", name: "imagen", widget: "string" },
        { label: "Resumen", name: "resumen", widget: "text" },
        { label: "Cuerpo", name: "cuerpo", widget: "markdown" },
      ],
    },
  ],
};