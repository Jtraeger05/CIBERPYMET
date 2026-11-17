
export const correosPhishing = [
  {
    id: 1,
    remitente: "notificaciones@banco-seguro.example",
    nombre: "Banco Seguro",
    asunto: "Actividad inusual en tu cuenta",
    fecha: "Hoy, 08:15 a. m.",
    mensaje:
      "Detectamos una actividad inusual en tu cuenta. Para proteger tu información, revisa la notificación desde los canales oficiales de tu banco.",
    enlace: "https://www.banco-seguro.example",
    categoria: "seguro",
    senales: [
      "El mensaje no solicita contraseñas ni códigos.",
      "Recomienda utilizar los canales oficiales."
    ],
    explicacion:
      "Este correo es un ejemplo educativo de una notificación legítima. No contiene solicitudes de información confidencial."
  },
  {
    id: 2,
    remitente: "seguridad@banco-verificacion.example",
    nombre: "Supuesto departamento de seguridad",
    asunto: "¡Tu cuenta será bloqueada en 10 minutos!",
    fecha: "Hoy, 08:32 a. m.",
    mensaje:
      "Hemos detectado un problema. Ingresa inmediatamente al siguiente enlace y confirma tu contraseña para evitar el bloqueo de tu cuenta.",
    enlace: "https://verificacion-falsa.example",
    categoria: "sospechoso",
    senales: [
      "Utiliza amenazas y urgencia.",
      "Solicita una contraseña.",
      "Incluye un enlace de verificación sospechoso."
    ],
    explicacion:
      "Es un intento de phishing. Busca generar miedo y obtener información confidencial mediante un enlace engañoso."
  },
  {
    id: 3,
    remitente: "rrhh@empresa.example",
    nombre: "Departamento de Recursos Humanos",
    asunto: "Información sobre reunión de equipo",
    fecha: "Hoy, 09:05 a. m.",
    mensaje:
      "Te informamos que la reunión de equipo se realizará mañana a las 9:00 a. m. Consulta los detalles con tu responsable.",
    enlace: null,
    categoria: "seguro",
    senales: [
      "No solicita información confidencial.",
      "El contenido corresponde a una comunicación laboral habitual."
    ],
    explicacion:
      "Es un ejemplo de comunicación interna normal. En una situación real también se debe verificar que el remitente corresponda a la empresa."
  },
  {
    id: 4,
    remitente: "premios@ganador-inmediato.example",
    nombre: "Centro de premios",
    asunto: "¡Has ganado un premio! Reclámalo ahora",
    fecha: "Hoy, 09:40 a. m.",
    mensaje:
      "Felicidades. Has sido seleccionado para recibir un premio. Abre el enlace y registra tus datos personales y bancarios para reclamarlo.",
    enlace: "https://premio-falso.example",
    categoria: "sospechoso",
    senales: [
      "Promete un premio inesperado.",
      "Solicita datos personales y bancarios.",
      "Presiona para abrir un enlace."
    ],
    explicacion:
      "Es un ejemplo de phishing que utiliza premios falsos para conseguir información personal y financiera."
  }
];
