
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ShieldCheck,
  BookOpen,
  MessageCircle,
  ClipboardList,
  LogOut,
  LockKeyhole,
  ChevronRight,
  Phone,
  Mail,
  ArrowUpRight,
  GraduationCap,
  ShieldAlert,
  Users,
} from "lucide-react";

export default function Dashboard() {
  const { profile, logout } = useAuth();

  const modules = [
    {
      id: "phishing",
      title: "Phishing",
      description:
        "Aprende a identificar correos, enlaces y mensajes fraudulentos.",
      icon: Mail,
      color: "blue",
      number: "01",
    },
    {
      id: "vishing",
      title: "Vishing",
      description:
        "Reconoce llamadas telefónicas utilizadas para engañar y robar información.",
      icon: Phone,
      color: "purple",
      number: "02",
    },
    {
      id: "ransomware",
      title: "Ransomware",
      description:
        "Descubre cómo proteger los archivos y responder ante un ataque.",
      icon: LockKeyhole,
      color: "red",
      number: "03",
    },
  ];

  return (
    <main className="cpm-dashboard">
      <header className="cpm-header">
        <Link to="/dashboard" className="cpm-brand">
          <div className="cpm-brand-icon">
            <ShieldCheck size={27} />
          </div>
          <div>
            <strong>CIBERPYMET</strong>
            <span>SEGURIDAD DIGITAL</span>
          </div>
        </Link>

        <div className="cpm-header-right">
          <div className="cpm-user">
            <div className="cpm-avatar">
              {(profile?.nombre || "P").charAt(0).toUpperCase()}
            </div>
            <div className="cpm-user-info">
              <strong>{profile?.nombre || "Participante"}</strong>
              <span>Participante</span>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="cpm-logout"
          >
            <LogOut size={17} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </header>

      <div className="cpm-content">
        {/* ACCESO AL PANEL DEL INVESTIGADOR */}
        {["investigador", "administrador"].includes(
          profile?.rol?.toLowerCase()
        ) && (
          <section className="cpm-research-access">
            <div className="cpm-research-icon">
              <Users size={27} />
            </div>

            <div className="cpm-research-info">
              <span>GESTIÓN DE INVESTIGACIÓN</span>
              <h2>Panel del investigador</h2>
              <p>
                Consulta participantes, grupos de investigación
                y resultados de las evaluaciones.
              </p>
            </div>

            <Link
              to="/investigador"
              className="cpm-research-button"
            >
              Entrar al panel
              <ChevronRight size={18} />
            </Link>
          </section>
        )}

        {/* ACCESO AL PANEL DEL ADMINISTRADOR */}
        {profile?.rol?.toLowerCase() === "administrador" && (
          <section className="cpm-research-access">
            <div className="cpm-research-icon">
              <ShieldCheck size={27} />
            </div>

            <div className="cpm-research-info">
              <span>GESTIÓN DE LA PLATAFORMA</span>
              <h2>Panel de administrador</h2>
              <p>
                Administra los usuarios y controla los accesos
                de CIBERPYMET.
              </p>
            </div>

            <Link
              to="/administrador"
              className="cpm-research-button"
            >
              Entrar al panel
              <ChevronRight size={18} />
            </Link>
          </section>
        )}

        <section className="cpm-hero">
          <div className="cpm-hero-content">
            <span className="cpm-eyebrow">
              <ShieldAlert size={15} />
              CENTRO DE APRENDIZAJE EN CIBERSEGURIDAD
            </span>

            <h1>
              Protege tu empresa.
              <br />
              <span>Fortalece tus conocimientos.</span>
            </h1>

            <p>
              Aprende a reconocer amenazas digitales y adquiere
              herramientas para proteger la información de tu empresa.
            </p>

            <Link to="/modulos/phishing" className="cpm-hero-button">
              Comenzar aprendizaje
              <ArrowUpRight size={19} />
            </Link>
          </div>

          <div className="cpm-hero-graphic">
            <div className="cpm-shield-circle">
              <ShieldCheck size={94} strokeWidth={1.3} />
            </div>
            <span className="cpm-floating-icon cpm-float-one">
              <LockKeyhole size={23} />
            </span>
            <span className="cpm-floating-icon cpm-float-two">
              <Mail size={23} />
            </span>
            <span className="cpm-floating-icon cpm-float-three">
              <ShieldAlert size={23} />
            </span>
          </div>
        </section>

        <section className="cpm-profile-section">
          <div className="cpm-section-heading">
            <div>
              <span className="cpm-section-label">TU INFORMACIÓN</span>
              <h2>Perfil de participante</h2>
            </div>
            <span className="cpm-status">
              <span />
              Cuenta activa
            </span>
          </div>

          <div className="cpm-info-grid">
            <article className="cpm-info-card">
              <div className="cpm-info-icon blue">
                <ClipboardList size={21} />
              </div>
              <div>
                <span>Código de participante</span>
                <strong>
                  {profile?.codigo_participante || "Pendiente"}
                </strong>
              </div>
            </article>

            <article className="cpm-info-card">
              <div className="cpm-info-icon purple">
                <GraduationCap size={21} />
              </div>
              <div>
                <span>Grupo de investigación</span>
                <strong>
                  {profile?.grupo || "Pendiente"}
                </strong>
              </div>
            </article>

            <article className="cpm-info-card">
              <div className="cpm-info-icon green">
                <ShieldCheck size={21} />
              </div>
              <div>
                <span>Rol asignado</span>
                <strong>
                  {profile?.rol || "Empleado"}
                </strong>
              </div>
            </article>
          </div>
        </section>

        <section className="cpm-modules-section">
          <div className="cpm-section-heading">
            <div>
              <span className="cpm-section-label">FORMACIÓN</span>
              <h2>Módulos de aprendizaje</h2>
              <p>
                Selecciona uno de los temas y fortalece tus conocimientos.
              </p>
            </div>
            <span className="cpm-module-count">03 MÓDULOS</span>
          </div>

          <div className="cpm-module-grid">
            {modules.map((module) => {
              const Icon = module.icon;

              return (
                <article
                  className={`cpm-module-card ${module.color}`}
                  key={module.id}
                >
                  <div className="cpm-module-top">
                    <div className="cpm-module-icon">
                      <Icon size={27} />
                    </div>
                    <span>{module.number}</span>
                  </div>

                  <h3>{module.title}</h3>
                  <p>{module.description}</p>

                  <Link
                    to={`/modulos/${module.id}`}
                    className="cpm-module-link"
                  >
                    Explorar módulo
                    <ChevronRight size={18} />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="cpm-tools-section">
          <div className="cpm-section-heading">
            <div>
              <span className="cpm-section-label">RECURSOS</span>
              <h2>Herramientas de aprendizaje</h2>
              <p>
                Complementa tu formación con actividades y recursos.
              </p>
            </div>
          </div>

          <div className="cpm-tools-grid">
            <article className="cpm-tool-card">
              <div className="cpm-tool-icon blue">
                <ClipboardList size={25} />
              </div>
              <div className="cpm-tool-text">
                <h3>Evaluación de conocimientos</h3>
                <p>
                  Responde 10 preguntas sobre las principales amenazas
                  digitales y comprueba lo aprendido.
                </p>
                <Link to="/encuesta" className="cpm-tool-link">
                  Iniciar evaluación
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </article>

            <article className="cpm-tool-card">
              <div className="cpm-tool-icon purple">
                <BookOpen size={25} />
              </div>

              <div className="cpm-tool-text">
                <h3>Laboratorios prácticos</h3>
                <p>
                  Practica la identificación de situaciones de riesgo
                  mediante simulaciones educativas.
                </p>

                <Link to="/laboratorio" className="cpm-tool-link">
                  Iniciar prácticas
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </article>

            {/* ASISTENTE DE CIBERSEGURIDAD */}
            <article className="cpm-tool-card">
              <div className="cpm-tool-icon green">
                <MessageCircle size={25} />
              </div>

              <div className="cpm-tool-text">
                <h3>Asistente de ciberseguridad</h3>

                <p>
                  Consulta dudas y recibe orientación sobre phishing,
                  vishing, ransomware y protección digital.
                </p>

                <Link to="/asistente" className="cpm-tool-link">
                  Consultar asistente
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </article>
          </div>
        </section>

        <footer className="cpm-footer">
          <div className="cpm-footer-brand">
            <ShieldCheck size={19} />
            <strong>CIBERPYMET</strong>
          </div>
          <span>
            Proyecto de investigación en ciberseguridad
          </span>
        </footer>
      </div>
    </main>
  );
}
