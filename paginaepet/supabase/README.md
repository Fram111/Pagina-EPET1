# Módulo de noticias — preparación de Supabase

Este directorio contiene la primera migración del módulo de noticias de la EPET N.º 1.

## Antes de aplicar la migración

1. Crear un proyecto en Supabase.
2. Abrir SQL Editor y ejecutar el archivo de migración ubicado en
   `supabase/migrations/202610110001_news_module.sql`.
3. En Authentication, desactivar el registro público si no se utilizará.
4. Crear manualmente el usuario inicial del administrador.
5. Después de crear el usuario, ejecutar en SQL Editor, reemplazando el correo:

   ```sql
   update public.profiles
   set role = 'admin'
   where id = (
     select id from auth.users
     where email = 'CORREO-DEL-ADMINISTRADOR'
   );
   ```

6. Copiar `.env.example` a `.env.local` y completar `VITE_SUPABASE_URL`
   y `VITE_SUPABASE_ANON_KEY` con los valores del proyecto.

## Seguridad

- Los usuarios nuevos quedan con rol `pending` hasta que un administrador los autorice.
- Las noticias publicadas se pueden leer públicamente.
- Los borradores requieren sesión con rol `admin` o `editor`.
- Solo los administradores pueden archivar o eliminar noticias.
- El bucket `news-images` permite lectura pública y escritura autenticada para editores.
- La clave `service_role` nunca debe usarse en el frontend ni subirse al repositorio.

## Nota de integración

Esta migración prepara la base de datos y las políticas de seguridad. Todavía no conecta los componentes React, no implementa la invitación de usuarios desde el panel y no migra automáticamente las noticias que hoy están en `localStorage`. Esos pasos pertenecen a las siguientes etapas.
