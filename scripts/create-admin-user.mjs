import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.NEW_USER_EMAIL;
const password = process.env.NEW_USER_PASSWORD;

if (!supabaseUrl || !serviceRoleKey || !email || !password) {
  throw new Error("Faltan variables de entorno necesarias.");
}

if (password.length < 12) {
  throw new Error("Usá una contraseña de al menos 12 caracteres.");
}

// Inicializamos el cliente con la clave SERVICE_ROLE
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Función nativa para crear usuario directo y autoconfirmado
const { data, error } = await supabase.auth.admin.createUser({
  email: email,
  password: password,
  email_confirm: true, // Auto-confirma el email sin enviar correos
});

if (error) {
  console.error("Error al crear usuario:", error.message);
  process.exit(1);
}

console.log("¡Usuario creado con éxito!");
console.log("Email:", data.user.email);
console.log("ID:", data.user.id);