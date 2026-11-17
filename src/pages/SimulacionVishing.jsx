
import { useState } from "react";
import {
  Phone,
  PhoneOff,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

const decisiones = [
  {
    pregunta: "El supuesto funcionario te informa que hay movimientos sospechosos en tu cuenta. ¿Qué haces?",
    opciones: [
      "Escucho con atención, pero no comparto información personal.",
      "Le doy mi número de documento para verificar mi identidad.",
      "Sigo todas sus instrucciones sin cuestionarlas.",
    ],
    correcta: 0,
    explicacion: "Puedes escuchar sin revelar datos. Recuerda que una llamada inesperada debe verificarse mediante canales oficiales.",
  },
  {
    pregunta: "El interlocutor solicita el código que acaba de llegar a tu celular. ¿Cómo respondes?",
    opciones: [
      "Le comparto el código porque dice ser del banco.",
      "Me niego a compartirlo y considero la llamada sospechosa.",
      "Le envío una captura del mensaje.",
    ],
    correcta: 1,
    explicacion: "Los códigos de verificación son confidenciales. Nunca debes compartirlos por teléfono.",
  },
  {
    pregunta: "La persona insiste y amenaza con bloquear tu cuenta si no colaboras. ¿Qué haces?",
    opciones: [
      "Acepto para evitar el bloqueo.",
      "Le doy mi contraseña.",
      "Finalizo la llamada y contacto al banco por un canal oficial.",
    ],
    correcta: 2,
    explicacion: "La presión y las amenazas buscan que actúes sin pensar. Finalizar la llamada y verificar directamente es lo adecuado.",
  },
  {
    pregunta: "Después de terminar la llamada, ¿qué medida adicional puedes tomar?",
    opciones: [
      "Reportar el intento de fraude al banco y a la persona responsable de seguridad.",
      "Borrar todo lo ocurrido y no informar a nadie.",
      "Devolver la llamada al mismo número.",
    ],
    correcta: 0,
    explicacion: "Reportar el intento permite tomar medidas preventivas y alertar a otras personas.",
  },
];

export default function SimulacionVishing() {
  const [paso, setPaso] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [puntaje, setPuntaje] = useState(0);
  const [terminado, setTerminado] = useState(false);

  const actual = decisiones[paso];

  const responder = (indice) => {
    if (respuesta !== null) return;

    setRespuesta(indice);

    if (indice === actual.correcta) {
      setPuntaje((anterior) => anterior + 1);
    }
  };

  const siguiente = () => {
    if (paso === decisiones.length - 1) {
      setTerminado(true);
    } else {
      setPaso((anterior) => anterior + 1);
      setRespuesta(null);
    }
  };

  const reiniciar = () => {
    setPaso(0);
    setRespuesta(null);
    setPuntaje(0);
    setTerminado(false);
  };

  return (
    <section className="cpm-vishing">
      <div className="cpm-vishing-hero">
        <div className="cpm-vishing-phone">
          <Phone size={32} />
        </div>
        <span>SIMULACIÓN INTERACTIVA</span>
        <h2>Una llamada sospechosa</h2>
        <p>
          Recibes una llamada de alguien que afirma trabajar
          para el departamento de seguridad de tu banco.
        </p>
        <div className="cpm-vishing-call">
          <Phone size={19} />
          <div>
            <strong>Supuesto asesor bancario</strong>
            <small>Llamada entrante simulada</small>
          </div>
          <span className="cpm-vishing-pulse" />
        </div>
        <div className="cpm-vishing-notice">
          <AlertTriangle size={19} />
          <p>No compartas contraseñas ni códigos de verificación.</p>
        </div>
      </div>

      {!terminado ? (
        <div className="cpm-vishing-content">
          <div className="cpm-vishing-progress">
            <span>Decisión {paso + 1} de {decisiones.length}</span>
            <div>
              <span style={{ width: `${((paso + 1) / decisiones.length) * 100}%` }} />
            </div>
          </div>

          <h3>{actual.pregunta}</h3>

          <div className="cpm-vishing-options">
            {actual.opciones.map((opcion, indice) => (
              <button
                key={indice}
                className={`cpm-vishing-option ${
                  respuesta !== null && indice === actual.correcta
                    ? "correct"
                    : respuesta === indice
                    ? "incorrect"
                    : ""
                }`}
                disabled={respuesta !== null}
                onClick={() => responder(indice)}
              >
                {opcion}
                {respuesta !== null && indice === actual.correcta && (
                  <CheckCircle2 size={20} />
                )}
                {respuesta === indice && indice !== actual.correcta && (
                  <XCircle size={20} />
                )}
              </button>
            ))}
          </div>

          {respuesta !== null && (
            <div className="cpm-vishing-feedback">
              <ShieldCheck size={22} />
              <p>{actual.explicacion}</p>
              <button onClick={siguiente}>
                {paso === decisiones.length - 1
                  ? "Ver resultado"
                  : "Siguiente decisión"}
                <ArrowRight size={17} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="cpm-vishing-result">
          <CheckCircle2 size={42} />
          <h2>¡Llamada finalizada!</h2>
          <strong>{puntaje} de {decisiones.length} puntos</strong>
          <p>
            {puntaje === decisiones.length
              ? "¡Excelente! Reconociste las señales de una llamada fraudulenta."
              : "Revisa las recomendaciones para mejorar tu respuesta ante llamadas sospechosas."}
          </p>
          <button onClick={reiniciar}>
            <RotateCcw size={17} />
            Repetir simulación
          </button>
        </div>
      )}
    </section>
  );
}
