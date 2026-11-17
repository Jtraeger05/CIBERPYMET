
import { useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  BookOpen,
} from "lucide-react";

import { evaluacionesModulos } from "../data/evaluacionesModulos";
import { supabase } from "../supabase";
import { useAuth } from "../context/AuthContext";

const nombres = {
  phishing: "Phishing",
  vishing: "Vishing",
  ransomware: "Ransomware",
};

export default function EvaluacionModulo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { session } = useAuth();

  const preguntas = evaluacionesModulos[id];

  const [respuestas, setRespuestas] = useState({});
  const [finalizada, setFinalizada] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [errorGuardado, setErrorGuardado] = useState("");

  if (!preguntas) {
    return <Navigate to="/dashboard" replace />;
  }

  const puntaje = preguntas.reduce((total, pregunta) => {
    return total + (
      respuestas[pregunta.id] === pregunta.correcta ? 1 : 0
    );
  }, 0);

  const respondidas = Object.keys(respuestas).length;
  const porcentaje = Math.round(
    (puntaje / preguntas.length) * 100
  );

  const seleccionarRespuesta = (preguntaId, opcion) => {
    if (finalizada || guardando) return;

    setRespuestas((prev) => ({
      ...prev,
      [preguntaId]: opcion,
    }));
  };

  const finalizarEvaluacion = async () => {
    if (guardando || finalizada) return;

    if (!session?.user?.id) {
      setErrorGuardado(
        "No se pudo identificar al participante. Inicia sesión nuevamente."
      );
      return;
    }

    setGuardando(true);
    setErrorGuardado("");

    const respuestasGuardadas = preguntas.map((pregunta) => ({
      pregunta_id: pregunta.id,
      respuesta_seleccionada: respuestas[pregunta.id],
      respuesta_correcta: pregunta.correcta,
      correcta:
        respuestas[pregunta.id] === pregunta.correcta,
    }));

    try {
      const { error } = await supabase
        .from("evaluaciones_modulos")
        .insert({
          usuario_id: session.user.id,
          modulo: id,
          respuestas: respuestasGuardadas,
          puntaje,
          total_preguntas: preguntas.length,
          porcentaje,
        });

      if (error) {
        console.error("Error guardando evaluación:", error);
        setErrorGuardado(
          "No se pudo guardar el resultado. Inténtalo nuevamente."
        );
        return;
      }

      setFinalizada(true);
    } catch (error) {
      console.error("Error inesperado:", error);
      setErrorGuardado(
        "Ocurrió un error al guardar. Inténtalo nuevamente."
      );
    } finally {
      setGuardando(false);
    }
  };

  const reiniciar = () => {
    setRespuestas({});
    setFinalizada(false);
    setErrorGuardado("");
  };

  return (
    <main className="cpm-eval-page">
      <header className="cpm-eval-header">
        <div className="cpm-eval-brand">
          <BookOpen size={25} />
          <strong>CIBERPYMET</strong>
        </div>

        <button
          className="cpm-eval-back"
          onClick={() => navigate(`/modulos/${id}`)}
          type="button"
        >
          <ChevronLeft size={18} />
          Volver al módulo
        </button>
      </header>

      <div className="cpm-eval-content">
        {!finalizada ? (
          <>
            <section className="cpm-eval-intro">
              <span className="cpm-eval-tag">
                EVALUACIÓN EDUCATIVA
              </span>

              <h1>Evaluación de {nombres[id]}</h1>

              <p>
                Responde las cinco preguntas para comprobar
                lo aprendido en este módulo.
              </p>

              <div className="cpm-eval-progress-info">
                <span>Preguntas respondidas</span>
                <strong>
                  {respondidas} de {preguntas.length}
                </strong>
              </div>

              <div className="cpm-eval-progress">
                <div
                  style={{
                    width: `${
                      (respondidas / preguntas.length) * 100
                    }%`,
                  }}
                />
              </div>
            </section>

            {preguntas.map((pregunta, index) => (
              <section
                className="cpm-eval-question"
                key={pregunta.id}
              >
                <span className="cpm-eval-number">
                  PREGUNTA {index + 1} DE {preguntas.length}
                </span>

                <h2>{pregunta.pregunta}</h2>

                <div className="cpm-eval-options">
                  {pregunta.opciones.map((opcion, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`cpm-eval-option ${
                        respuestas[pregunta.id] === i
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        seleccionarRespuesta(pregunta.id, i)
                      }
                    >
                      <span className="cpm-eval-letter">
                        {String.fromCharCode(65 + i)}
                      </span>

                      <span>{opcion}</span>
                    </button>
                  ))}
                </div>
              </section>
            ))}

            <button
              className="cpm-eval-submit"
              type="button"
              disabled={
                respondidas !== preguntas.length || guardando
              }
              onClick={finalizarEvaluacion}
            >
              {guardando
                ? "Guardando resultado..."
                : "Finalizar evaluación"}

              <ChevronRight size={19} />
            </button>

            {respondidas !== preguntas.length && (
              <p className="cpm-eval-warning">
                Debes responder todas las preguntas para finalizar.
              </p>
            )}

            {errorGuardado && (
              <p className="cpm-eval-warning">
                {errorGuardado}
              </p>
            )}
          </>
        ) : (
          <section className="cpm-eval-result">
            <div className="cpm-eval-trophy">
              <Trophy size={38} />
            </div>

            <span className="cpm-eval-tag">
              RESULTADO FINAL
            </span>

            <h1>¡Evaluación completada!</h1>

            <p>
              Estos son tus resultados en el módulo de {nombres[id]}.
            </p>

            <div className="cpm-eval-score">
              <strong>
                {puntaje}/{preguntas.length}
              </strong>
              <span>
                {porcentaje}% de respuestas correctas
              </span>
            </div>

            <p>
              <CheckCircle2
                size={18}
                color="#16a34a"
                style={{ verticalAlign: "middle" }}
              />{" "}
              Resultado guardado correctamente.
            </p>

            <div className="cpm-eval-feedback">
              {preguntas.map((pregunta, index) => {
                const correcta =
                  respuestas[pregunta.id] === pregunta.correcta;

                return (
                  <div
                    className="cpm-eval-feedback-item"
                    key={pregunta.id}
                  >
                    <div className="cpm-eval-feedback-title">
                      {correcta ? (
                        <CheckCircle2 color="#16a34a" />
                      ) : (
                        <XCircle color="#dc2626" />
                      )}

                      <strong>
                        Pregunta {index + 1}:{" "}
                        {correcta ? "Correcta" : "Incorrecta"}
                      </strong>
                    </div>

                    <p>{pregunta.pregunta}</p>

                    {!correcta && (
                      <p>
                        <strong>Respuesta correcta:</strong>{" "}
                        {pregunta.opciones[pregunta.correcta]}
                      </p>
                    )}

                    <p>{pregunta.explicacion}</p>
                  </div>
                );
              })}
            </div>

            <div className="cpm-eval-actions">
              <button
                className="cpm-eval-secondary"
                type="button"
                onClick={reiniciar}
              >
                <RotateCcw size={17} />
                Repetir evaluación
              </button>

              <button
                className="cpm-eval-submit"
                type="button"
                onClick={() => {
                  if (id === "phishing") {
                    navigate("/modulos/vishing");
                  } else if (id === "vishing") {
                    navigate("/modulos/ransomware");
                  } else {
                    navigate("/dashboard");
                  }
                }}
              >
                {id === "ransomware"
                  ? "Finalizar y volver al panel"
                  : "Siguiente módulo"}

                <ChevronRight size={18} />
              </button>
            </div>
          </section>
        )}
      </div>

      <footer className="cpm-eval-footer">
        CIBERPYMET · Educación y prevención en ciberseguridad
      </footer>
    </main>
  );
}
