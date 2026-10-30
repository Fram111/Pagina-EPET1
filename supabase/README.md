# Módulo de noticias — Supabase

Este directorio contiene la migración SQL y las instrucciones para conectar el módulo de noticias de la EPET N.º 1.

## Configuración de Supabase

1. En Supabase, abrir **SQL Editor** y ejecutar migrations/202610110001_news_module.sql.
2. En **Authentication**, desactivar el registro público si no se utilizará.
3. Crear manualmente el usuario inicial del administrador.
4. Después de crear ese usuario, ejecutar en SQL Editor, reemplazando el correo:

   ```sql
   update public.profiles
   set role = 'admin'
   where id = (
     select id from auth.users
     where email = 'CORREO-DEL-ADMINISTRADOR'
   );
   ```

5. En la carpeta paginaepet, copiar .env.example a .env.local y completar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY con los datos del proyecto.
6. Instalar las dependencias con npm install y ejecutar npm run dev desde paginaepet.

## Uso del panel

- Entrar a /admin e iniciar sesión con una cuenta autorizada.
- Administradores y redactores pueden crear y editar noticias.
- Los borradores existentes se autoguardan después de dejar de escribir; al crear una noticia nueva, hay que guardarla manualmente una primera vez.
- Se puede subir una imagen de portada al bucket news-images (máximo 5 MB; JPEG, PNG, WebP o GIF).
- Las noticias publicadas se muestran en la sección pública.
- Solo los administradores pueden eliminar noticias. Las cuentas nuevas quedan como pending hasta que el administrador les asigne el rol editor o admin en la tabla profiles.

## Seguridad

- Las políticas RLS limitan la lectura de borradores y la edición según el rol.
- La clave service_role nunca debe usarse en el frontend ni subirse al repositorio.
- .env.local está excluido por .gitignore; no publiques sus valores.

## Pendiente

- No se ha ejecutado un build/lint desde este entorno.
- package-lock.json debe regenerarse con npm install para incorporar las nuevas dependencias de Supabase y Tiptap.
- La invitación/gestión de redactores desde el propio panel y la importación automática de las noticias antiguas aún no están implementadas.
