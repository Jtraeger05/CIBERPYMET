
import { useState } from "react";
import {
  LockKeyhole,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

const decisiones = [
  {
    pregunta: "Los archivos de la empresa aparecen bloqueados y hay un mensaje que exige dinero. ¿Qué podría estar ocurriendo?",
    opciones: [
      "Una actualización del sistema.",
      "Un posible ataque de ransomware.",
      "Un error de impresión.",
    ],
    correcta: 1,
    explicacion: "El bloqueo de archivos acompañado de una exigencia de pago es una señal característica de ransomware.",
  },
  {
    pregunta: "¿Cuál debería ser una de las primeras medidas?",
    opciones: [
      "Desconectar el equipo afectado de la red y avisar al responsable de TI.",
      "Pagar inmediatamente el rescate.",
      "Conectar memorias USB para copiar los archivos.",
    ],
    correcta: 0,
    explicacion: "Aislar el equipo puede ayudar a limitar la propagación del ataque. No intentes manipular los archivos afectados.",
  },
  {
    pregunta: "¿Qué debes hacer con el mensaje de rescate?",
    opciones: [
      "Seguir las instrucciones del atacante.",
      "Eliminarlo sin informar a nadie.",
      "Conservar la evidencia y reportar el incidente al responsable de seguridad.",
    ],
    correcta: 2,
    explicacion: "Conservar evidencias y reportar el incidente ayuda a investigar lo ocurrido y coordinar la respuesta.",
  },
  {
    pregunta: "¿Qué medida ayuda a recuperar la información de la empresa?",
    opciones: [
      "Desactivar las actualizaciones.",
      "Restaurar copias de seguridad verificadas y limpias, siguiendo el procedimiento de recuperación.",
      "Usar la misma contraseña en todos los equipos.",
    ],
    correcta: 1,
    explicacion: "Las copias de seguridad protegidas y verificadas permiten recuperar información sin depender del pago del rescate.",
  },
];

export default function SimulacionRansomware() {
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
    <section className="cpm-ransomware">
      <div className="cpm-ransomware-hero">
        <div className="cpm-ransomware-icon">
          <LockKeyhole size={32} />
        </div>

        <span>SIMULACIÓN INTERACTIVA</span>
        <h2>Incidente en la Pyme</h2>
        <p>
          Varios archivos de la empresa han sido bloqueados
          y aparece una exigencia de pago para recuperarlos.
        </p>

        <div className="cpm-ransomware-alert">
          <AlertTriangle size={22} />
          <div>
            <strong>ALERTA DE SEGURIDAD</strong>
            <p>Posible incidente de ransomware detectado.</p>
          </div>
        </div>
      </div>

      {!terminado ? (
        <div className="cpm-ransomware-content">
          <div className="cpm-ransomware-progress">
            <span>Decisión {paso + 1} de {decisiones.length}</span>
            <div>
              <span
                style={{
                  width: `${((paso + 1) / decisiones.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <h3>{actual.pregunta}</h3>

          <div className="cpm-ransomware-options">
            {actual.opciones.map((opcion, indice) => (
              <button
                key={indice}
                className={`cpm-ransomware-option ${
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
            <div className="cpm-ransomware-feedback">
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
        <div className="cpm-ransomware-result">
          <CheckCircle2 size={42} />
          <h2>¡Incidente finalizado!</h2>
          <strong>{puntaje} de {decisiones.length} puntos</strong>
          <p>
            {puntaje === decisiones.length
              ? "¡Excelente! Aplicaste correctamente las medidas de respuesta ante ransomware."
              : "Revisa las recomendaciones para fortalecer la respuesta ante incidentes."}
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
