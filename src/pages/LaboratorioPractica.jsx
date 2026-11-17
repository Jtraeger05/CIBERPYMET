
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import BandejaPhishing from "./BandejaPhishing";
import SimulacionVishing from "./SimulacionVishing";
import SimulacionRansomware from "./SimulacionRansomware";
import {
  ArrowLeft,
  ShieldCheck,
  Mail,
  Phone,
  LockKeyhole,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from "lucide-react";

const practicas = {
  phishing: {
    titulo: "Laboratorio de Phishing",
    descripcion: "Identifica las señales de un correo electrónico fraudulento.",
    icono: Mail,
    escenario: "Recibes un correo que aparentemente proviene de tu banco. El mensaje dice que tu cuenta será bloqueada en las próximas horas y te solicita ingresar a un enlace para verificar tus datos.",
    preguntas: [
      {
        pregunta: "¿Qué señal de alerta aparece en este correo?",
        opciones: [
          "El mensaje utiliza un tono de urgencia y amenaza con bloquear la cuenta.",
          "El correo tiene un saludo cordial.",
          "El mensaje informa el horario de atención.",
          "El correo contiene el nombre del banco."
        ],
        correcta: 0,
        explicacion: "Los mensajes fraudulentos suelen generar urgencia o miedo para conseguir que la víctima actúe sin verificar la información."
      },
      {
        pregunta: "¿Qué deberías hacer antes de ingresar a cualquier enlace?",
        opciones: [
          "Abrirlo inmediatamente.",
          "Verificar el remitente y consultar directamente con el banco por sus canales oficiales.",
          "Responder enviando tus datos.",
          "Reenviar el correo a tus compañeros."
        ],
        correcta: 1,
        explicacion: "Es importante comprobar la autenticidad del mensaje y utilizar los canales oficiales de la entidad."
      },
      {
        pregunta: "¿Qué debes hacer si confirmas que el correo es fraudulento?",
        opciones: [
          "Descargar sus archivos adjuntos.",
          "Responder al remitente.",
          "Reportarlo al área responsable y eliminarlo.",
          "Compartir el enlace."
        ],
        correcta: 2,
        explicacion: "Reportar el mensaje permite advertir a otros usuarios y reducir el riesgo de que alguien caiga en el engaño."
      }
    ]
  },

  vishing: {
    titulo: "Laboratorio de Vishing",
    descripcion: "Aprende a reconocer llamadas telefónicas fraudulentas.",
    icono: Phone,
    escenario: "Recibes una llamada de una persona que afirma trabajar para el área de seguridad de tu banco. Te informa que existe un movimiento sospechoso y solicita el código de verificación que llegó a tu celular.",
    preguntas: [
      {
        pregunta: "¿Cuál es la principal señal de alerta?",
        opciones: [
          "La persona pregunta si puedes hablar.",
          "El supuesto funcionario solicita un código de verificación.",
          "La llamada tiene buena calidad de sonido.",
          "La persona conoce el nombre del banco."
        ],
        correcta: 1,
        explicacion: "Los códigos de verificación son personales. No debes compartirlos mediante llamadas o mensajes."
      },
      {
        pregunta: "¿Cómo deberías responder?",
        opciones: [
          "Compartir el código para proteger la cuenta.",
          "Entregar también tu contraseña.",
          "Finalizar la llamada y comunicarte con el banco mediante un número oficial.",
          "Seguir las instrucciones del interlocutor."
        ],
        correcta: 2,
        explicacion: "Debes cortar la comunicación sospechosa y verificar la situación mediante los canales oficiales."
      },
      {
        pregunta: "¿Qué es el vishing?",
        opciones: [
          "Un engaño que utiliza llamadas telefónicas para obtener información.",
          "Un programa para proteger archivos.",
          "Una actualización del sistema operativo.",
          "Un método de almacenamiento."
        ],
        correcta: 0,
        explicacion: "El vishing es una modalidad de ingeniería social que utiliza llamadas de voz para engañar a las personas."
      }
    ]
  },

  ransomware: {
    titulo: "Laboratorio de Ransomware",
    descripcion: "Identifica cómo actuar ante una posible infección de ransomware.",
    icono: LockKeyhole,
    escenario: "En una Pyme, un empleado observa que varios archivos ya no pueden abrirse y aparece un mensaje que exige dinero para recuperar la información. El equipo presenta un comportamiento inusual.",
    preguntas: [
      {
        pregunta: "¿Qué situación podría estar ocurriendo?",
        opciones: [
          "Una actualización normal.",
          "Un posible ataque de ransomware.",
          "Un problema de impresión.",
          "Una falla del monitor."
        ],
        correcta: 1,
        explicacion: "El cifrado o bloqueo de archivos acompañado de una exigencia de pago es una señal característica de ransomware."
      },
      {
        pregunta: "¿Cuál debería ser una de las primeras medidas?",
        opciones: [
          "Ignorar el mensaje.",
          "Pagar inmediatamente.",
          "Desconectar el equipo de la red para limitar la propagación y avisar al responsable de TI.",
          "Compartir los archivos afectados."
        ],
        correcta: 2,
        explicacion: "Aislar el equipo de la red puede ayudar a evitar que la amenaza se propague a otros dispositivos."
      },
      {
        pregunta: "¿Qué medida ayuda a recuperar la información?",
        opciones: [
          "Mantener copias de seguridad periódicas y verificadas.",
          "Utilizar contraseñas iguales.",
          "Desactivar las actualizaciones.",
          "Compartir las cuentas."
        ],
        correcta: 0,
        explicacion: "Las copias de seguridad protegidas y verificadas son fundamentales para recuperar información después de un incidente."
      }
    ]
  }
};

export default function LaboratorioPractica() {
  const { id } = useParams();
  const practica = practicas[id];

  const [respuestas, setRespuestas] = useState({});
  const [finalizado, setFinalizado] = useState(false);
const [actividadCompletada, setActividadCompletada] = useState(false);
const [puntosActividad, setPuntosActividad] = useState(0);
  if (!practica) {
    return (
      <main className="cpm-lab-page">
        <div className="cpm-lab-wrapper">
          <h2>Práctica no encontrada</h2>
          <Link to="/laboratorio">Volver al laboratorio</Link>
        </div>
      </main>
    );
  }

  const Icono = practica.icono;

  const puntaje = practica.preguntas.filter(
    (pregunta, indice) =>
      respuestas[indice] === pregunta.correcta
  ).length;

  const reiniciar = () => {
    setRespuestas({});
    setFinalizado(false);
  };

  return (
    <main className="cpm-lab-page">
      <div className="cpm-lab-wrapper">

        <Link to="/laboratorio" className="cpm-lab-back">
          <ArrowLeft size={18} />
          Volver al laboratorio
        </Link>

        <header className="cpm-lab-header">
          <div className="cpm-lab-header-icon">
            <Icono size={32} />
          </div>

          <span>PRÁCTICA INTERACTIVA</span>
          <h1>{practica.titulo}</h1>
          <p>{practica.descripcion}</p>
        </header>

        <section className="cpm-lab-intro">
          <ShieldCheck size={25} />
          <div>
            <h2>Situación simulada</h2>
            <p>{practica.escenario}</p>
          </div>
        </section>
        {id === "phishing" && !actividadCompletada && (
  <BandejaPhishing
    onCompletar={(puntos, total) => {
      setPuntosActividad(puntos);
      setActividadCompletada(true);
    }}
  />
)}
        {id === "vishing" && (
          <SimulacionVishing />
        )}
        {id === "ransomware" && (
  <SimulacionRansomware />
)}

        {id === "phishing" && actividadCompletada && (
          <div className="cpm-practice-content">
            <h2>¡Primera actividad completada!</h2>
            <p>
              Obtuviste <strong>{puntosActividad} de 4 puntos</strong> en la
              clasificación de correos.
            </p>
            <p>Ahora continúa con el desafío de conocimientos.</p>
          </div>
        )}

        {((id !== "phishing" && id !== "vishing") || actividadCompletada) && (
  <section className="cpm-practice-content">
          <div className="cpm-practice-heading">
            <h2>Responde las preguntas</h2>
            <span>{practica.preguntas.length} preguntas</span>
          </div>

          {practica.preguntas.map((pregunta, indice) => (
            <article className="cpm-practice-question" key={indice}>
              <h3>
                {indice + 1}. {pregunta.pregunta}
              </h3>

              <div className="cpm-practice-options">
                {pregunta.opciones.map((opcion, opcionIndice) => (
                  <label
                    key={opcionIndice}
                    className={`cpm-practice-option ${
                      respuestas[indice] === opcionIndice
                        ? "selected"
                        : ""
                    } ${
                      finalizado && opcionIndice === pregunta.correcta
                        ? "correct"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`pregunta-${indice}`}
                      value={opcionIndice}
                      checked={respuestas[indice] === opcionIndice}
                      disabled={finalizado}
                      onChange={() =>
                        setRespuestas({
                          ...respuestas,
                          [indice]: opcionIndice
                        })
                      }
                    />
                    <span>{opcion}</span>
                  </label>
                                ))}
              </div>

              {finalizado && (
                <div className="cpm-practice-explanation">
                  {respuestas[indice] === pregunta.correcta ? (
                    <CheckCircle2 size={19} />
                  ) : (
                    <XCircle size={19} />
                  )}
                  <p>{pregunta.explicacion}</p>
                </div>
              )}
            </article>
          ))}

          {!finalizado ? (
            <button
              className="cpm-practice-submit"
              disabled={Object.keys(respuestas).length !== practica.preguntas.length}
              onClick={() => setFinalizado(true)}
            >
              Finalizar práctica
            </button>
          ) : (
            <div className="cpm-practice-result">
              <h2>Resultado de tu práctica</h2>
              <strong>
                {puntaje} de {practica.preguntas.length}
              </strong>
              <p>
                {puntaje === practica.preguntas.length
                  ? "¡Excelente! Respondiste correctamente todas las preguntas."
                  : "Revisa las explicaciones para fortalecer tus conocimientos."}
              </p>

              <button onClick={reiniciar}>
                <RotateCcw size={17} />
                Repetir práctica
              </button>
            </div>
          )}
        </section>
        )}

        <footer className="cpm-lab-footer">
          <ShieldCheck size={19} />
          Actividad educativa con escenarios completamente ficticios.
        </footer>

      </div>
    </main>
  );
}
