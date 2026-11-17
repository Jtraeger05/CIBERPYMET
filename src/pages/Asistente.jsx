
import { useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ShieldCheck,
  Send,
  ArrowLeft,
  Bot,
  User,
  LoaderCircle,
  MessageCircle,
} from "lucide-react";
import { supabase } from "../supabase";
import "./Asistente.css";

export default function Asistente() {
  const [mensajes, setMensajes] = useState([
    {
      tipo: "asistente",
      texto: "¡Hola! Soy el asistente de CIBERPYMET. Puedo ayudarte a resolver dudas sobre phishing, vishing, ransomware y protección de la información de tu empresa. ¿Qué te gustaría aprender?",
    },
  ]);

  const [pregunta, setPregunta] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const enviarPregunta = async (e) => {
    e.preventDefault();

    const mensaje = pregunta.trim();

    if (!mensaje || cargando) return;

    setPregunta("");
    setError("");

    setMensajes((anteriores) => [
      ...anteriores,
      { tipo: "usuario", texto: mensaje },
    ]);

    setCargando(true);

    try {
      const {
        data: { session },
        error: errorSesion,
      } = await supabase.auth.getSession();

      if (errorSesion) throw errorSesion;

      if (!session?.access_token) {
        throw new Error("Tu sesión ha expirado. Inicia sesión nuevamente.");
      }

      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ pregunta: mensaje }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No fue posible obtener una respuesta.");
      }

      setMensajes((anteriores) => [
        ...anteriores,
        {
          tipo: "asistente",
          texto: data.respuesta,
        },
      ]);
    } catch (err) {
      setError(err.message || "Ocurrió un error al conectar con el asistente.");
    } finally {
      setCargando(false);
    }
  };

  const sugerencias = [
    "¿Cómo identifico un correo de phishing?",
    "¿Qué es el vishing?",
    "¿Cómo puedo prevenir el ransomware?",
  ];

  return (
    <main className="asistente-page">
      <header className="asistente-header">
        <Link to="/dashboard" className="asistente-back">
          <ArrowLeft size={19} />
          Volver al panel
        </Link>

        <div className="asistente-brand">
          <ShieldCheck size={25} />
          <strong>CIBERPYMET</strong>
        </div>
      </header>

      <section className="asistente-container">
        <div className="asistente-intro">
          <div className="asistente-main-icon">
            <Bot size={34} />
          </div>

          <span>ASISTENTE INTELIGENTE</span>
          <h1>Asistente de ciberseguridad</h1>
          <p>
            Aprende a reconocer amenazas digitales y recibe orientación
            para proteger la información de tu empresa.
          </p>
        </div>

        <section className="asistente-chat">
          <div className="asistente-chat-header">
            <div className="asistente-status-icon">
              <MessageCircle size={21} />
            </div>

            <div>
              <h2>Asistente CIBERPYMET</h2>
              <span>Orientación en seguridad digital</span>
            </div>

            <span className="asistente-online">
              <span />
              Disponible
            </span>
          </div>

          <div className="asistente-messages">
            {mensajes.map((mensaje, indice) => (
              <div
                key={indice}
                className={`asistente-message ${
                  mensaje.tipo === "usuario" ? "message-user" : "message-bot"
                }`}
              >
                <div className="asistente-message-avatar">
                  {mensaje.tipo === "usuario" ? (
                    <User size={18} />
                  ) : (
                    <Bot size={18} />
                  )}
                </div>

                <div className="asistente-message-content">
                  <span>
                    {mensaje.tipo === "usuario" ? "Tú" : "Asistente"}
                  </span>

                  {mensaje.tipo === "asistente" ? (
                    <div className="asistente-markdown">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {mensaje.texto}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p>{mensaje.texto}</p>
                  )}
                </div>
              </div>
            ))}

            {cargando && (
              <div className="asistente-loading">
                <LoaderCircle size={19} />
                El asistente está preparando una respuesta...
              </div>
            )}

            {error && (
              <div className="asistente-error">
                {error}
              </div>
            )}
          </div>

          <div className="asistente-suggestions">
            <span>PRUEBA PREGUNTANDO</span>

            <div>
              {sugerencias.map((sugerencia) => (
                <button
                  type="button"
                  key={sugerencia}
                  disabled={cargando}
                  onClick={() => setPregunta(sugerencia)}
                >
                  {sugerencia}
                </button>
              ))}
            </div>
          </div>

          <form className="asistente-form" onSubmit={enviarPregunta}>
            <input
              type="text"
              value={pregunta}
              onChange={(e) => setPregunta(e.target.value)}
              placeholder="Escribe tu pregunta sobre ciberseguridad..."
              maxLength={1500}
              disabled={cargando}
            />

            <button
              type="submit"
              disabled={!pregunta.trim() || cargando}
              aria-label="Enviar pregunta"
            >
              <Send size={19} />
            </button>
          </form>

          <p className="asistente-disclaimer">
            Este asistente ofrece orientación educativa en ciberseguridad.
            No compartas contraseñas ni información confidencial.
          </p>
        </section>
      </section>
    </main>
  );
}
