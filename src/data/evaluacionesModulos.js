
export const evaluacionesModulos = {
  phishing: [
    {
      id: 1,
      pregunta: "¿Qué es el phishing?",
      opciones: [
        "Un programa para proteger los correos electrónicos.",
        "Una técnica de engaño para obtener información confidencial.",
        "Una herramienta para realizar copias de seguridad.",
        "Un sistema para mejorar la conexión a internet."
      ],
      correcta: 1,
      explicacion: "El phishing utiliza mensajes o páginas falsas para engañar a las personas y obtener información."
    },
    {
      id: 2,
      pregunta: "¿Qué debes hacer si recibes un correo que amenaza con bloquear tu cuenta y contiene un enlace?",
      opciones: [
        "Abrir el enlace inmediatamente.",
        "Responder enviando tus datos.",
        "Verificar el mensaje por un canal oficial.",
        "Reenviar el correo a todos tus compañeros."
      ],
      correcta: 2,
      explicacion: "Debes verificar la información mediante los canales oficiales antes de interactuar con el mensaje."
    },
    {
      id: 3,
      pregunta: "¿Cuál puede ser una señal de un correo fraudulento?",
      opciones: [
        "Una dirección de remitente extraña.",
        "Un mensaje esperado de un compañero conocido.",
        "Una comunicación habitual de la empresa.",
        "Un correo que no solicita información."
      ],
      correcta: 0,
      explicacion: "Los remitentes con direcciones extrañas o que imitan entidades conocidas pueden indicar un intento de phishing."
    },
    {
      id: 4,
      pregunta: "¿Qué debes hacer si ingresaste tu contraseña en una página sospechosa?",
      opciones: [
        "Esperar a que ocurra algo.",
        "Compartir la contraseña con un compañero.",
        "Seguir utilizando la misma contraseña.",
        "Cambiarla desde un sitio oficial y un dispositivo seguro."
      ],
      correcta: 3,
      explicacion: "Debes cambiar la contraseña desde un entorno seguro y revisar la actividad de la cuenta."
    },
    {
      id: 5,
      pregunta: "¿Cuál es una buena práctica para prevenir el phishing en una PYME?",
      opciones: [
        "Abrir todos los archivos recibidos.",
        "Capacitar a los empleados para identificar mensajes sospechosos.",
        "Utilizar la misma contraseña en todas las cuentas.",
        "Desactivar las herramientas de seguridad."
      ],
      correcta: 1,
      explicacion: "La capacitación permite reconocer señales de engaño y reducir el riesgo de incidentes."
    }
  ],

  vishing: [
    {
      id: 1,
      pregunta: "¿Qué es el vishing?",
      opciones: [
        "Un ataque que utiliza llamadas telefónicas para engañar a las personas.",
        "Un programa para realizar llamadas empresariales.",
        "Un sistema de protección de teléfonos.",
        "Una técnica para recuperar contraseñas."
      ],
      correcta: 0,
      explicacion: "El vishing utiliza llamadas o mensajes de voz para suplantar identidades y obtener información o dinero."
    },
    {
      id: 2,
      pregunta: "Una persona que dice ser del banco te solicita un código recibido por SMS. ¿Qué debes hacer?",
      opciones: [
        "Entregar el código para proteger la cuenta.",
        "Compartir también tu contraseña.",
        "Finalizar la llamada y contactar al banco por sus canales oficiales.",
        "Enviar una fotografía de tu documento."
      ],
      correcta: 2,
      explicacion: "Nunca debes compartir códigos de verificación. Debes comunicarte directamente con el banco."
    },
    {
      id: 3,
      pregunta: "¿Cuál es una señal de alerta durante una llamada?",
      opciones: [
        "Una llamada que tú solicitaste.",
        "Una persona que exige información confidencial con urgencia.",
        "Una llamada habitual de un compañero.",
        "Una comunicación previamente programada."
      ],
      correcta: 1,
      explicacion: "La presión para entregar información rápidamente es una señal frecuente de ingeniería social."
    },
    {
      id: 4,
      pregunta: "¿Qué debes hacer si un supuesto proveedor solicita cambiar una cuenta bancaria por teléfono?",
      opciones: [
        "Realizar el pago inmediatamente.",
        "Aceptar el cambio sin verificar.",
        "Compartir los datos de la empresa.",
        "Confirmar la solicitud mediante un contacto previamente verificado."
      ],
      correcta: 3,
      explicacion: "Los cambios de cuentas bancarias deben verificarse mediante procedimientos internos y contactos confiables."
    },
    {
      id: 5,
      pregunta: "¿Qué información debes conservar si recibes una llamada fraudulenta?",
      opciones: [
        "El número, la fecha, la hora y los mensajes relacionados.",
        "Solamente el nombre que dijo el interlocutor.",
        "Únicamente la duración de la llamada.",
        "Ninguna información."
      ],
      correcta: 0,
      explicacion: "Estos datos pueden servir como evidencia para investigar y denunciar el incidente."
    }
  ],

  ransomware: [
    {
      id: 1,
      pregunta: "¿Qué es el ransomware?",
      opciones: [
        "Un programa para mejorar el rendimiento del computador.",
        "Una herramienta para compartir archivos.",
        "Un software malicioso que bloquea o cifra información y exige un rescate.",
        "Un sistema de copias de seguridad."
      ],
      correcta: 2,
      explicacion: "El ransomware impide acceder a archivos o sistemas y puede exigir dinero para intentar recuperarlos."
    },
    {
      id: 2,
      pregunta: "¿Cuál puede ser una señal de un ataque de ransomware?",
      opciones: [
        "El computador inicia normalmente.",
        "Los archivos aparecen cifrados y se muestra una exigencia de pago.",
        "Se instala una actualización oficial.",
        "Se realiza una copia de seguridad."
      ],
      correcta: 1,
      explicacion: "Los archivos inaccesibles y los mensajes que exigen dinero son señales características de ransomware."
    },
    {
      id: 3,
      pregunta: "¿Qué debes hacer al detectar ransomware en un equipo de la empresa?",
      opciones: [
        "Desconectarlo de la red y avisar al responsable de seguridad.",
        "Conectar todos los discos externos.",
        "Compartir el mensaje de rescate con todos los contactos.",
        "Continuar trabajando normalmente."
      ],
      correcta: 0,
      explicacion: "Aislar el equipo ayuda a reducir la propagación del ataque y permite iniciar la respuesta al incidente."
    },
    {
      id: 4,
      pregunta: "¿Cuál es una buena medida preventiva contra el ransomware?",
      opciones: [
        "Desactivar las actualizaciones.",
        "Compartir las contraseñas.",
        "Conectar permanentemente todas las copias de seguridad.",
        "Realizar copias de seguridad periódicas y protegidas."
      ],
      correcta: 3,
      explicacion: "Las copias de seguridad protegidas y verificadas facilitan la recuperación de la información."
    },
    {
      id: 5,
      pregunta: "¿Pagar el rescate garantiza recuperar los archivos?",
      opciones: [
        "Sí, siempre garantiza la recuperación.",
        "No, el pago no garantiza recuperar los archivos ni evita nuevos ataques.",
        "Sí, si se paga rápidamente.",
        "No, porque todos los archivos se recuperan automáticamente."
      ],
      correcta: 1,
      explicacion: "Pagar no garantiza recibir una clave válida ni recuperar la información. Se recomienda buscar apoyo especializado."
    }
  ]
};
