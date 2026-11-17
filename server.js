
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const PORT = 3001;

// Verificar que la clave de Groq esté configurada
if (!process.env.GROQ_API_KEY) {
  console.error("Falta configurar GROQ_API_KEY en el archivo .env");
  process.exit(1);
}

// Conexión con Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Conexión con Supabase
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json({ limit: "10kb" }));

// Límite básico de solicitudes por dirección IP
const solicitudes = new Map();
const VENTANA = 15 * 60 * 1000;
const MAX_SOLICITUDES = 10;

app.use("/api/chat", (req, res, next) => {
  const ip = req.ip;
  const ahora = Date.now();
  const registro = solicitudes.get(ip);

  if (!registro || ahora - registro.inicio > VENTANA) {
    solicitudes.set(ip, { inicio: ahora, cantidad: 1 });
    return next();
  }

  if (registro.cantidad >= MAX_SOLICITUDES) {
    return res.status(429).json({
      error: "Has enviado demasiadas consultas. Intenta más tarde.",
    });
  }

  registro.cantidad++;
  next();
});

// Verificar sesión y estado del usuario
async function verificarUsuario(req, res, next) {
  try {
    const autorizacion = req.headers.authorization;

    if (!autorizacion || !autorizacion.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Debes iniciar sesión para utilizar el asistente.",
      });
    }

    const token = autorizacion.split(" ")[1];

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({
        error: "Tu sesión no es válida. Inicia sesión nuevamente.",
      });
    }

    // Consultar perfil usando el token del usuario
    const supabaseUsuario = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const { data: perfil, error: errorPerfil } = await supabaseUsuario
      .from("perfiles")
      .select("estado")
      .eq("id", data.user.id)
      .single();

    if (errorPerfil || !perfil || perfil.estado !== "activo") {
      return res.status(403).json({
        error: "Tu cuenta no está autorizada para utilizar el asistente.",
      });
    }

    req.usuario = data.user;
    next();

  } catch (error) {
    console.error("Error verificando usuario:", error.message);

    return res.status(500).json({
      error: "No fue posible verificar tu sesión.",
    });
  }
}

// Comprobar servidor
app.get("/", (req, res) => {
  res.json({
    mensaje: "Servidor de CIBERPYMET funcionando.",
  });
});

// Chatbot protegido con Groq
app.post("/api/chat", verificarUsuario, async (req, res) => {
  try {
    const pregunta = req.body?.pregunta;

    if (
      typeof pregunta !== "string" ||
      pregunta.trim().length === 0
    ) {
      return res.status(400).json({
        error: "Escribe una pregunta.",
      });
    }

    if (pregunta.length > 1500) {
      return res.status(400).json({
        error: "La pregunta es demasiado larga.",
      });
    }

    const respuesta = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: `
            Eres el asistente educativo de CIBERPYMET.

            Tu función es orientar a empleados de pequeñas y medianas
            empresas sobre ciberseguridad.

            Tus temas son exclusivamente:
            - Phishing.
            - Vishing.
            - Ransomware.
            - Protección de información en las Pymes.
            - Prevención y respuesta ante incidentes.

            Responde en español, con lenguaje sencillo y educativo.
            Usa ejemplos prácticos cuando sean útiles.
            Limita tus respuestas a 150 palabras.

            No solicites contraseñas, códigos de verificación ni datos
            personales. No proporciones instrucciones para realizar
            ataques, crear malware o robar información.

            Si la pregunta no está relacionada con ciberseguridad,
            explica amablemente que solo puedes ayudar con esos temas.
          `,
        },
        {
          role: "user",
          content: pregunta.trim(),
        },
      ],
      max_completion_tokens: 250,
    });

    res.json({
      respuesta:
        respuesta.choices[0]?.message?.content ||
        "No se pudo generar una respuesta.",
    });

  } catch (error) {
    console.error("Error en el asistente:", error.message);

    res.status(500).json({
      error: "No fue posible generar una respuesta. Intenta nuevamente.",
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `Servidor CIBERPYMET activo en http://localhost:${PORT}`
  );
});
