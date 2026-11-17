
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  Mail,
  Phone,
  LockKeyhole,
  ChevronRight,
  FlaskConical,
} from "lucide-react";

const practicas = [
  {
    id: "phishing",
    titulo: "Laboratorio de Phishing",
    subtitulo: "Detecta correos y mensajes fraudulentos.",
    descripcion:
      "Analiza situaciones simuladas para reconocer enlaces sospechosos, remitentes falsos y mensajes que buscan robar información.",
    icono: Mail,
    nivel: "Principiante",
    color: "blue",
  },
  {
    id: "vishing",
    titulo: "Laboratorio de Vishing",
    subtitulo: "Aprende a identificar llamadas fraudulentas.",
    descripcion:
      "Evalúa conversaciones telefónicas ficticias, identifica señales de suplantación y decide cómo responder ante una llamada sospechosa.",
    icono: Phone,
    nivel: "Intermedio",
    color: "purple",
  },
  {
    id: "ransomware",
    titulo: "Laboratorio de Ransomware",
    subtitulo: "Aprende a responder ante una amenaza.",
    descripcion:
      "Analiza escenarios ficticios de seguridad informática y selecciona las medidas adecuadas para proteger la información de una Pyme.",
    icono: LockKeyhole,
    nivel: "Intermedio",
    color: "red",
  },
];

export default function Laboratorio() {
  return (
    <main className="cpm-lab-page">
      <div className="cpm-lab-wrapper">

        <Link to="/dashboard" className="cpm-lab-back">
          <ArrowLeft size={18} />
          Volver al Dashboard
        </Link>

        <header className="cpm-lab-header">
          <div className="cpm-lab-header-icon">
            <FlaskConical size={32} />
          </div>

          <span>ENTRENAMIENTO PRÁCTICO</span>
          <h1>Laboratorio de Ciberseguridad</h1>

          <p>
            Pon a prueba tus conocimientos mediante situaciones
            simuladas de seguridad informática aplicadas a las Pymes.
          </p>
        </header>

        <section className="cpm-lab-intro">
          <ShieldCheck size={24} />

          <div>
            <h2>Aprende practicando</h2>
            <p>
              Completa las tres prácticas, analiza cada situación
              y descubre cómo actuar ante las amenazas digitales.
            </p>
          </div>
        </section>

        <section className="cpm-lab-grid">
          {practicas.map((practica) => {
            const Icono = practica.icono;

            return (
              <article
                className={`cpm-lab-card cpm-lab-${practica.color}`}
                key={practica.id}
              >
                <div className="cpm-lab-card-icon">
                  <Icono size={30} />
                </div>

                <span className="cpm-lab-level">
                  {practica.nivel}
                </span>

                <h2>{practica.titulo}</h2>

                <h3>{practica.subtitulo}</h3>

                <p>{practica.descripcion}</p>

                <Link
                  to={`/laboratorio/${practica.id}`}
                  className="cpm-lab-button"
                >
                  Iniciar práctica
                  <ChevronRight size={18} />
                </Link>
              </article>
            );
          })}
        </section>

        <footer className="cpm-lab-footer">
          <ShieldCheck size={19} />
          Todas las actividades son simulaciones educativas
          y no representan amenazas reales.
        </footer>

      </div>
    </main>
  );
}
