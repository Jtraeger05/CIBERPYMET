
import { useState } from "react";
import { preguntas } from "../data/preguntas";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase";
import {
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Trophy,
  RotateCcw,
  Home,
  ClipboardCheck,
  Target,
  Award,
} from "lucide-react";

export default function Encuesta() {
  const [respuestas, setRespuestas] = useState({});
  const [actual, setActual] = useState(0);
  const [finalizada, setFinalizada] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [errorGuardado, setErrorGuardado] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();

  const pregunta = preguntas[actual];

  const respondidas = preguntas.filter(
    (p) => respuestas[p.id] !== undefined
  ).length;

  const progreso = Math.round(
    (respondidas / preguntas.length) * 100
  );

  const puntaje = preguntas.filter(
    (p) => respuestas[p.id] === p.correcta
  ).length;

  const seleccionarRespuesta = (id, opcion) => {
    setRespuestas((prev) => ({
      ...prev,
      [id]: opcion,
    }));
    setErrorGuardado("");
  };

  const finalizarEncuesta = async () => {
    if (respondidas !== preguntas.length) {
      setErrorGuardado("Debes responder todas las preguntas.");
      return;
    }

    if (!user) {
      setErrorGuardado("No se encontró una sesión de usuario.");
      return;
    }

    setGuardando(true);
    setErrorGuardado("");

    const porcentaje = Number(
      ((puntaje / preguntas.length) * 100).toFixed(2)
    );

    const { error } = await supabase
      .from("evaluaciones_web")
      .insert({
        usuario_id: user.id,
        respuestas,
        puntaje,
        total_preguntas: preguntas.length,
        porcentaje,
      });

    setGuardando(false);

    if (error) {
      console.error("Error guardando evaluación:", error);
      setErrorGuardado(
        "No se pudo guardar el resultado. Intenta nuevamente."
      );
      return;
    }

    setFinalizada(true);
  };

  const reiniciar = () => {
    setRespuestas({});
    setActual(0);
    setFinalizada(false);
    setErrorGuardado("");
  };

  if (finalizada) {
    const porcentajeFinal = Math.round(
      (puntaje / preguntas.length) * 100
    );

    return (
      <main className="cpm-quiz-page">
        <header className="cpm-quiz-header">
          <div className="cpm-quiz-brand">
            <div className="cpm-quiz-brand-icon">
              <ShieldCheck size={25} />
            </div>
            <div>
              <strong>CIBERPYMET</strong>
              <span>SEGURIDAD DIGITAL</span>
            </div>
          </div>
        </header>

        <div className="cpm-quiz-result-wrapper">
          <section className="cpm-quiz-result">
            <div className="cpm-result-decoration">
              <Trophy size={42} />
            </div>

            <span className="cpm-quiz-eyebrow">
              EVALUACIÓN COMPLETADA
            </span>

            <h1>¡Buen trabajo!</h1>

            <p className="cpm-result-description">
              Has terminado la evaluación de ciberseguridad.
              Tu resultado se guardó correctamente.
            </p>

            <div className="cpm-result-score">
              <div className="cpm-score-circle">
                <strong>{porcentajeFinal}%</strong>
                <span>Rendimiento</span>
              </div>

              <div className="cpm-score-details">
                <div>
                  <span>Respuestas correctas</span>
                  <strong>
                    {puntaje} de {preguntas.length}
                  </strong>
                </div>
                <div>
                  <span>Preguntas respondidas</span>
                  <strong>{respondidas}</strong>
                </div>
              </div>
            </div>

            <div className="cpm-result-message">
              <Award size={24} />
              <div>
                <strong>
                  {puntaje >= 8
                    ? "¡Excelente desempeño!"
                    : puntaje >= 5
                    ? "¡Vas por buen camino!"
                    : "Continúa fortaleciendo tus conocimientos"}
                </strong>
                <p>
                  {puntaje >= 8
                    ? "Demuestras un buen conocimiento sobre las amenazas digitales."
                    : puntaje >= 5
                    ? "Has adquirido conocimientos importantes. Sigue practicando."
                    : "Te recomendamos repasar los módulos educativos y volver a intentarlo."}
                </p>
              </div>
            </div>

            <div className="cpm-result-actions">
              <button
                type="button"
                className="cpm-quiz-primary"
                onClick={() => navigate("/dashboard")}
              >
                <Home size={18} />
                Volver al panel
              </button>

              <button
                type="button"
                className="cpm-quiz-secondary"
                onClick={reiniciar}
              >
                <RotateCcw size={18} />
                Repetir evaluación
              </button>
            </div>
          </section>
        </div>

        <footer className="cpm-quiz-footer">
          CIBERPYMET · Proyecto de investigación en ciberseguridad
        </footer>
      </main>
    );
  }

  return (
    <main className="cpm-quiz-page">
      <header className="cpm-quiz-header">
        <div className="cpm-quiz-brand">
          <div className="cpm-quiz-brand-icon">
            <ShieldCheck size={25} />
          </div>
          <div>
            <strong>CIBERPYMET</strong>
            <span>SEGURIDAD DIGITAL</span>
          </div>
        </div>

        <button
          type="button"
          className="cpm-quiz-back"
          onClick={() => navigate("/dashboard")}
        >
          <ChevronLeft size={18} />
          Volver al panel
        </button>
      </header>

      <div className="cpm-quiz-content">
        <section className="cpm-quiz-intro">
          <span className="cpm-quiz-eyebrow">
            <ClipboardCheck size={15} />
            EVALUACIÓN DE CONOCIMIENTOS
          </span>

          <h1>
            Pon a prueba tus
            <br />
            <span>conocimientos digitales.</span>
          </h1>

          <p>
            Demuestra lo que has aprendido sobre phishing,
            vishing y ransomware. Lee cada pregunta y selecciona
            la respuesta que consideres correcta.
          </p>

          <div className="cpm-quiz-tags">
            <span><Target size={15} /> 10 preguntas</span>
            <span><CheckCircle2 size={15} /> Selección única</span>
            <span><ShieldCheck size={15} /> Resultado automático</span>
          </div>
        </section>

        <section className="cpm-quiz-card">
          <div className="cpm-quiz-card-header">
            <div>
              <span className="cpm-quiz-label">
                PROGRESO DE LA EVALUACIÓN
              </span>
              <h2>
                Pregunta {actual + 1}
                <span> / {preguntas.length}</span>
              </h2>
            </div>

            <div className="cpm-quiz-progress-number">
              {progreso}%
            </div>
          </div>

          <div className="cpm-quiz-progress-track">
            <div
              className="cpm-quiz-progress-fill"
              style={{ width: `${progreso}%` }}
            />
          </div>

          <div className="cpm-quiz-question">
            <span className="cpm-quiz-topic">
              {pregunta.tema}
            </span>

            <h2>{pregunta.pregunta}</h2>

            <p>
              Selecciona una sola respuesta para continuar.
            </p>
          </div>

          <div className="cpm-quiz-options">
            {pregunta.opciones.map((opcion, index) => {
              const seleccionada =
                respuestas[pregunta.id] === index;

              return (
                <button
                  type="button"
                  key={index}
                  className={`cpm-quiz-option ${
                    seleccionada ? "selected" : ""
                  }`}
                  onClick={() =>
                    seleccionarRespuesta(pregunta.id, index)
                  }
                >
                  <span className="cpm-quiz-option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span className="cpm-quiz-option-text">
                    {opcion}
                  </span>

                  {seleccionada && (
                    <CheckCircle2
                      className="cpm-quiz-option-check"
                      size={21}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {errorGuardado && (
            <div className="cpm-quiz-error">
              {errorGuardado}
            </div>
          )}

          <div className="cpm-quiz-navigation">
            <button
              type="button"
              className="cpm-quiz-secondary"
              disabled={actual === 0 || guardando}
              onClick={() =>
                setActual((prev) => prev - 1)
              }
            >
              <ChevronLeft size={19} />
              Anterior
            </button>

            {actual < preguntas.length - 1 ? (
              <button
                type="button"
                className="cpm-quiz-primary"
                disabled={
                  respuestas[pregunta.id] === undefined ||
                  guardando
                }
                onClick={() =>
                  setActual((prev) => prev + 1)
                }
              >
                Siguiente
                <ChevronRight size={19} />
              </button>
            ) : (
              <button
                type="button"
                className="cpm-quiz-primary"
                disabled={
                  respondidas !== preguntas.length ||
                  guardando
                }
                onClick={finalizarEncuesta}
              >
                {guardando
                  ? "Guardando resultado..."
                  : "Finalizar evaluación"}
                {!guardando && <CheckCircle2 size={19} />}
              </button>
            )}
          </div>

          <div className="cpm-quiz-card-footer">
            <span>
              <CheckCircle2 size={15} />
              {respondidas} de {preguntas.length} respondidas
            </span>
            <span>
              Pregunta {actual + 1} de {preguntas.length}
            </span>
          </div>
        </section>

        <div className="cpm-quiz-tip">
          <ShieldCheck size={19} />
          <span>
            Aprende hoy. Protege tu empresa mañana.
          </span>
        </div>
      </div>

      <footer className="cpm-quiz-footer">
        CIBERPYMET · Proyecto de investigación en ciberseguridad
      </footer>
    </main>
  );
}
