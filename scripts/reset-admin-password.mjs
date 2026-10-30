
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.ADMIN_EMAIL;
const newPassword = process.env.ADMIN_NEW_PASSWORD;

if (!supabaseUrl || !serviceRoleKey || !email || !newPassword) {
  throw new Error("Faltan variables de entorno necesarias.");
}

if (newPassword.length < 12) {
  throw new Error("Usá una contraseña de al menos 12 caracteres.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const { data, error } = await supabase.auth.admin.listUsers({
  page: 1,
  perPage: 1000,
});

if (error) throw error;

const user = data.users.find(
  (item) => item.email?.toLowerCase() === email.toLowerCase()
);

if (!user) {
  throw new Error(
    "No se encontró el usuario. Revisá el proyecto y el correo."
  );
}

const { data: updated, error: updateError } =
  await supabase.auth.admin.updateUserById(user.id, {
    password: newPassword,
    email_confirm: true,
  });

if (updateError) throw updateError;

console.log("Contraseña actualizada y email confirmado.");
console.log("Usuario:", updated.user.email);
console.log("ID:", updated.user.id);
