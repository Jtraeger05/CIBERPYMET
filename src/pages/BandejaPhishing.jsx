
import { useState } from "react";
import { correosPhishing } from "../data/actividadesLaboratorio";
import {
  Mail,
  MailOpen,
  AlertTriangle,
  ShieldCheck,
  Eye,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";

export default function BandejaPhishing({ onCompletar }) {
  const [correoActivo, setCorreoActivo] = useState(1);
  const [clasificaciones, setClasificaciones] = useState({});

  const correo = correosPhishing.find(
    (item) => item.id === correoActivo
  );

  if (!correo) {
    return <p>No se encontraron los correos de la actividad.</p>;
  }

  const total = correosPhishing.length;

  const puntos = correosPhishing.filter(
    (item) => clasificaciones[item.id] === item.categoria
  ).length;

  const completados = Object.keys(clasificaciones).length;
  const respondido = clasificaciones[correo.id] !== undefined;
  const resultado = clasificaciones[correo.id];

  const clasificar = (categoria) => {
    setClasificaciones((actuales) => ({
      ...actuales,
      [correo.id]: categoria,
    }));
  };

  const siguienteCorreo = () => {
    const pendiente = correosPhishing.find(
      (item) => !clasificaciones[item.id]
    );

    if (pendiente) {
      setCorreoActivo(pendiente.id);
    }
  };

  return (
    <section className="cpm-phishing-inbox">

      <div className="cpm-phishing-welcome">
        <div className="cpm-phishing-welcome-icon">
          <ShieldCheck size={30} />
        </div>

        <div>
          <span>RETO INTERACTIVO</span>
          <h2>Detectives digitales</h2>
          <p>
            Analiza los correos de esta bandeja e identifica
            cuáles son seguros y cuáles podrían ser intentos
            de phishing.
          </p>
        </div>
      </div>

      <div className="cpm-phishing-progress">
        <div>
          <strong>Progreso de la actividad</strong>
          <span>{completados} de {total} correos analizados</span>
        </div>

        <div className="cpm-phishing-progress-track">
          <div
            style={{
              width: `${(completados / total) * 100}%`
            }}
          />
        </div>
      </div>

      <div className="cpm-phishing-layout">

        <aside className="cpm-phishing-list">
          <h3>
            <Mail size={19} />
            Bandeja de entrada
          </h3>

          {correosPhishing.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`cpm-phishing-email ${
                correoActivo === item.id ? "active" : ""
              }`}
              onClick={() => setCorreoActivo(item.id)}
            >
              <div className="cpm-phishing-email-top">
                {clasificaciones[item.id] ? (
                  <CheckCircle2 size={17} />
                ) : (
                  <Mail size={17} />
                )}

                <span>
                  {clasificaciones[item.id]
                    ? "Analizado"
                    : "Pendiente"}
                </span>
              </div>

              <strong>{item.nombre}</strong>
              <span>{item.asunto}</span>
            </button>
          ))}
        </aside>

        <div className="cpm-phishing-detail">

          <div className="cpm-phishing-detail-header">
            <div>
              <span>MENSAJE SELECCIONADO</span>
              <h3>{correo.asunto}</h3>
            </div>
            <MailOpen size={25} />
          </div>

          <div className="cpm-phishing-sender">
            <div className="cpm-phishing-avatar">
              {correo.nombre.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{correo.nombre}</strong>
              <span>{correo.remitente}</span>
            </div>
          </div>

          <div className="cpm-phishing-message">
            <p>{correo.mensaje}</p>

            {correo.enlace && (
              <div className="cpm-phishing-link">
                <Eye size={17} />
                <span>Enlace incluido:</span>
                <strong>{correo.enlace}</strong>
              </div>
            )}
          </div>

          <div className="cpm-phishing-classify">
            <h4>¿Cómo clasificarías este correo?</h4>
            <p>
              Analiza el remitente, el contenido y las solicitudes.
            </p>

            <div className="cpm-phishing-actions">
              <button
                type="button"
                className="cpm-phishing-safe"
                disabled={respondido}
                onClick={() => clasificar("seguro")}
              >
                <ShieldCheck size={19} />
                Correo seguro
              </button>

              <button
                type="button"
                className="cpm-phishing-danger"
                disabled={respondido}
                onClick={() => clasificar("sospechoso")}
              >
                <AlertTriangle size={19} />
                Correo sospechoso
              </button>
            </div>
          </div>

          {respondido && (
            <div
              className={`cpm-phishing-feedback ${
                resultado === correo.categoria
                  ? "correct"
                  : "incorrect"
              }`}
            >
              {resultado === correo.categoria ? (
                <CheckCircle2 size={22} />
              ) : (
                <XCircle size={22} />
              )}

              <div>
                <strong>
                  {resultado === correo.categoria
                    ? "¡Clasificación correcta!"
                    : "Clasificación incorrecta."}
                </strong>

                <p>{correo.explicacion}</p>

                <strong>Señales para identificarlo:</strong>

                <ul>
                  {correo.senales.map((senal, indice) => (
                    <li key={indice}>{senal}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {respondido && completados < total && (
            <button
              type="button"
              className="cpm-phishing-next"
              onClick={siguienteCorreo}
            >
              Continuar con otro correo
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>

      {completados === total && (
        <div className="cpm-phishing-finish">
          <CheckCircle2 size={35} />
          <h3>¡Actividad completada!</h3>
          <strong>{puntos} de {total} puntos</strong>

          <p>
            {puntos === total
              ? "¡Excelente! Identificaste correctamente todos los correos."
              : "Revisa las explicaciones y continúa fortaleciendo tus conocimientos."}
          </p>

          <button
            type="button"
            onClick={() => onCompletar?.(puntos, total)}
          >
            Continuar al desafío de conocimientos
            <ArrowRight size={18} />
          </button>
        </div>
      )}

    </section>
  );
}
