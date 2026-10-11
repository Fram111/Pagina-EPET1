// Contenido institucional ficticio pero realista para EPET N°1 (La Rioja)
// Prototipo institucional — los datos son orientativos.

import fachadaImg from '../images/escuelafotoxd.png';

export const IMAGES = {
  hero: "https://media.base44.com/images/public/6a977a33f3889af31cc7607e/8e80942aa_generated_162c2b8f.jpg",
  fachada: fachadaImg,
  informatica: "https://media.base44.com/images/public/6a977a33f3889af31cc7607e/7d195d3bd_generated_bcf66ecc.jpg",
  electronica: "https://media.base44.com/images/public/6a977a33f3889af31cc7607e/7fa80c5da_generated_24b3c503.jpg",
  electromecanica: "https://images.unsplash.com/photo-1766297248027-611186dbccc1?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  construcciones: "https://media.base44.com/images/public/6a977a33f3889af31cc7607e/1040039a1_generated_2db76e30.jpg",
  ciclobasico: "https://media.base44.com/images/public/6a977a33f3889af31cc7607e/838290721_generated_9a3805b7.jpg",
  feria: "https://media.base44.com/images/public/6a977a33f3889af31cc7607e/d77b22ca0_generated_e5342a9e.jpg",
  robotica: "https://media.base44.com/images/public/6a977a33f3889af31cc7607e/87196fa1f_generated_1e1f7451.jpg",
  egresados: "https://media.base44.com/images/public/6a977a33f3889af31cc7607e/a16078acc_generated_5d3bce14.jpg",
  visita: "https://media.base44.com/images/public/6a977a33f3889af31cc7607e/118847e25_generated_a082675f.jpg",
  campus: "https://media.base44.com/images/public/6a977a33f3889af31cc7607e/8ba0db0c5_generated_b1e2a159.jpg",

};

export const NAV_ITEMS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Institucional", href: "#institucional" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Admisiones", href: "#admisiones" },
  { label: "Vida Escolar", href: "#vida-escolar" },
  { label: "Noticias", href: "#noticias" },
  { label: "Contacto", href: "#contacto" },
];

export const PILARES = [
  { icon: "Wrench", title: "Formación técnica real", desc: "Aprendizaje basado en proyectos y práctica en talleres equipados." },
  { icon: "GraduationCap", title: "Docentes comprometidos", desc: "Equipos docentes con experiencia profesional y vocación de enseñanza." },
  { icon: "FlaskConical", title: "Talleres y laboratorios", desc: "Espacios especializados para informática y procesos industriales." },
  { icon: "Briefcase", title: "Inserción laboral", desc: "Continuidad de estudios y salida laboral con perfil técnico sólido." },
  { icon: "ShieldCheck", title: "Comunidad segura y cercana", desc: "Clima escolar de respeto, contención y acompañamiento familiar." },
];

export const ESTADISTICAS = [
  { valor: "112", sufijo: "+", label: "Años de trayectoria" },
  { valor: "1.200", sufijo: "+", label: "Estudiantes activos" },
  { valor: "85", sufijo: "+", label: "Docentes y talleristas" },
  { valor: "2", sufijo: "", label: "Tecnicaturas" },
  { valor: "92", sufijo: "%", label: "Egresados con continuidad educativa o laboral" },
];

export const VALORES = [
  { icon: "Target", titulo: "Responsabilidad", desc: "Compromiso con el estudio, el trabajo y la comunidad." },
  { icon: "Users", titulo: "Trabajo en equipo", desc: "Aprendizaje colaborativo en talleres y proyectos." },
  { icon: "Lightbulb", titulo: "Innovación", desc: "Pensamiento técnico y resolución de problemas reales." },
  { icon: "Handshake", titulo: "Respeto", desc: "Convivencia, diversidad y cultura institucional." },
  { icon: "Award", titulo: "Compromiso técnico", desc: "Excelencia y rigor en cada especialidad." },
];

export const ESPECIALIDADES = [
  {
    id: "procesos",
    nombre: "Técnico en Industrias de Procesos",
    imagen: IMAGES.electromecanica,
    ciclo: "Ciclo Superior · 3° a 6° año",
    breve: "Operación, control y optimización de procesos industriales: química, alimentos, energía y manufactura.",
    perfil: "Un técnico capaz de operar y controlar procesos productivos, realizar análisis de calidad, interpretar esquemas de planta y aplicar normas de seguridad e higiene industrial.",
    materias: ["Operaciones Unitarias", "Instrumentación y Control", "Procesos Industriales", "Calidad y Normativas", "Práctica Profesionalizante"],
    salidas: ["Operador de planta industrial", "Analista de control de calidad", "Mantenimiento de procesos", "Continuidad en Ingeniería Química/Industrial"],
  },
  {
    id: "informatica",
    nombre: "Técnico en Informática Profesional y Personal",
    imagen: IMAGES.informatica,
    ciclo: "Ciclo Superior · 3° a 6° año",
    breve: "Programación, redes, soporte y sistemas. Pensamiento computacional aplicado a problemas reales.",
    perfil: "Un egresado capaz de diseñar y programar sistemas, administrar redes y bases de datos, brindar soporte técnico y adaptarse a la evolución constante de la tecnología.",
    materias: ["Programación I y II", "Redes y Sistemas Operativos", "Bases de Datos", "Soporte Técnico", "Práctica Profesionalizante"],
    salidas: ["Desarrollador junior", "Soporte técnico", "Administrador de redes", "Continuidad en Ingeniería en Sistemas"],
  },
  {
    id: "ciclo-basico",
    nombre: "Ciclo Básico Técnico",
    imagen: IMAGES.ciclobasico,
    ciclo: "Ciclo Básico · 1° y 2° año",
    breve: "Dos años comunes donde se construyen las bases técnicas y se exploran las orientaciones.",
    perfil: "Un estudiante que incorpora herramientas de pensamiento técnico, descubre las especialidades y construye las bases para elegir su tecnicatura al ingresar al Ciclo Superior.",
    materias: ["Taller de Tecnologías", "Matemática Técnica", "Ciencias Naturales", "Informática Aplicada", "Educación Tecnológica"],
    salidas: ["Acceso a las tecnicaturas del Ciclo Superior", "Perfil técnico inicial"],
  },
];

export const NOTICIAS = [
  {
    id: "primavera-cibercafe",
    titulo: "Llegó septiembre: cibercafé y actividades por la Semana del Estudiante",
    fecha: "1 de septiembre, 2026",
    categoria: "Vida estudiantil",
    imagen: IMAGES.feria,
    resumen: "Los cursos de 6° año, 3° y 1° división organizan un cibercafé y actividades recreativas en el patio para celebrar la primavera y la Semana del Estudiante.",
    cuerpo: "Con la llegada de la primavera, los estudiantes de 6° año —3° y 1° división— prepararon un cibercafé acompañado de actividades recreativas en el patio de la escuela, en el marco de la Semana del Estudiante. La propuesta busca generar un espacio de encuentro, integración y celebración para toda la comunidad educativa, combinando lo técnico con lo recreativo.",
  },
  {
    id: "copa-robotica",
    titulo: "EPET N°1 en la Copa Robótica: logramos el 11° puesto",
    fecha: "20 de agosto, 2026",
    categoria: "Competencias",
    imagen: IMAGES.robotica,
    resumen: "El equipo de robótica de la escuela participó de la Copa Robótica anual y obtuvo un excelente 11° puesto entre decenas de instituciones técnicas.",
    cuerpo: "El equipo de robótica de EPET N°1 representó a la institución en la Copa Robótica de este año, alcanzando el 11° puesto en una competencia que reúne a decenas de escuelas técnicas. Los estudiantes diseñaron, programaron y pusieron a punto sus robots durante meses en los talleres, demostrando compromiso, trabajo en equipo y sólida formación técnica. ¡Felicitaciones al equipo!",
  },
];

export const ANUNCIOS = [
  { titulo: "Calendario Académico 2026", tipo: "PDF", desc: "Fechas de inicio, receso y fin de ciclo lectivo." },
  { titulo: "Circular: Reunión de padres 2° trimestre", tipo: "PDF", desc: "Miércoles 24 de septiembre, turno mañana y tarde." },
  { titulo: "Mesas de exámenes — Diciembre 2026", tipo: "PDF", desc: "Fechas y aulas asignadas por especialidad." },
  { titulo: "Inscripción 2027 — Requisitos", tipo: "PDF", desc: "Documentación y pasos para postulantes." },
];

export const CONTACTO = {
  direccion: "Av. Juan D. Perón, F5300 La Rioja, La Rioja",
  telefono: "+54 380 442-1357",
  email: "contacto@epet1.edu.ar",
  horario: "Doble turno · Lunes a Viernes 7:30 a 17:00 hs",
};