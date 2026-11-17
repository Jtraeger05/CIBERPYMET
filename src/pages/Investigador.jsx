
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  ClipboardList,
  TrendingUp,
  ArrowLeft,
  RefreshCw,
  Pencil,
  Search,
} from "lucide-react";

import { supabase } from "../supabase";
import { useAuth } from "../context/AuthContext";

export default function Investigador() {
  const { profile, loading } = useAuth();

  const [participantes, setParticipantes] = useState([]);
  const [evaluaciones, setEvaluaciones] = useState([]);
const [evaluacionSeleccionada, setEvaluacionSeleccionada] = useState(null); 
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const autorizado = ["investigador", "administrador"].includes(
    profile?.rol?.toLowerCase()
  );

  const cargarDatos = async () => {
    setCargando(true);
    setError("");

    try {
      const [perfilesResult, evaluacionesResult] = await Promise.all([
        supabase
          .from("perfiles")
          .select("id, codigo_participante, grupo, rol, pyme")
          .order("codigo_participante"),

        supabase
          .from("evaluaciones_modulos")
          .select("usuario_id, modulo, puntaje, total_preguntas, porcentaje, creado_en, respuestas")
          .order("creado_en", { ascending: false }),
      ]);

      if (perfilesResult.error) throw perfilesResult.error;
      if (evaluacionesResult.error) throw evaluacionesResult.error;

      setParticipantes(perfilesResult.data || []);
      setEvaluaciones(evaluacionesResult.data || []);
    } catch (err) {
      console.error("Error cargando panel:", err);
      setError("No fue posible cargar la información. Revisa los permisos de Supabase.");
    } finally {
      setCargando(false);
    }
  };
    const cambiarGrupo = async (participanteId, nuevoGrupo) => {
    setError("");

    try {
      const { error } = await supabase
        .from("perfiles")
        .update({ grupo: nuevoGrupo })
        .eq("id", participanteId);

      if (error) throw error;

      setParticipantes((anteriores) =>
        anteriores.map((p) =>
          p.id === participanteId
            ? { ...p, grupo: nuevoGrupo }
            : p
        )
      );
    } catch (err) {
      console.error("Error cambiando grupo:", err);
      setError("No fue posible actualizar el grupo del participante.");
    }
  };
  useEffect(() => {
    if (!loading && autorizado) {
      cargarDatos();
    }
  }, [loading, autorizado]);

  if (loading) {
    return <p>Cargando panel...</p>;
  }

  if (!autorizado) {
    return <Navigate to="/dashboard" replace />;
  }

  const participantesFiltrados = participantes.filter((p) =>
    `${p.codigo_participante || ""} ${p.grupo || ""} ${p.pyme || ""}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const promedio =
    evaluaciones.length > 0
      ? (
          evaluaciones.reduce(
            (total, e) => total + Number(e.porcentaje),
            0
          ) / evaluaciones.length
        ).toFixed(1)
      : "0";

  const grupos = {
    experimental: participantes.filter((p) => p.grupo === "experimental").length,
    control: participantes.filter((p) => p.grupo === "control").length,
    pendiente: participantes.filter((p) => p.grupo === "pendiente").length,
  };

  return (
    <main className="cpm-research-page">
      <header className="cpm-research-header">
        <Link to="/dashboard" className="cpm-research-back">
          <ArrowLeft size={18} />
          Volver al panel
        </Link>

        <div className="cpm-research-brand">
          <ShieldCheck size={25} />
          <strong>CIBERPYMET</strong>
        </div>

        <button
          type="button"
          onClick={cargarDatos}
          className="cpm-research-refresh"
          disabled={cargando}
        >
          <RefreshCw size={17} />
          Actualizar
        </button>
      </header>

      <div className="cpm-research-container">
        <section className="cpm-research-heading">
          <span>PANEL DE ADMINISTRACIÓN CIENTÍFICA</span>
          <h1>Panel del investigador</h1>
          <p>
            Consulta y supervisa la participación y los resultados
            de las evaluaciones de CIBERPYMET.
          </p>
        </section>

        {error && <p className="cpm-research-error">{error}</p>}

        <section className="cpm-research-stats">
          <article>
            <Users size={25} />
            <span>Participantes registrados</span>
            <strong>{participantes.length}</strong>
          </article>

          <article>
            <ClipboardList size={25} />
            <span>Evaluaciones realizadas</span>
            <strong>{evaluaciones.length}</strong>
          </article>

          <article>
            <TrendingUp size={25} />
            <span>Promedio general</span>
            <strong>{promedio}%</strong>
          </article>
        </section>

        <section className="cpm-research-groups">
          <h2>Distribución de participantes</h2>

          <div>
            <article>
              <span>Grupo experimental</span>
              <strong>{grupos.experimental}</strong>
            </article>

            <article>
              <span>Grupo control</span>
              <strong>{grupos.control}</strong>
            </article>

            <article>
              <span>Sin asignar</span>
              <strong>{grupos.pendiente}</strong>
            </article>
          </div>
        </section>

        <section className="cpm-research-table-section">
          <div className="cpm-research-table-heading">
            <div>
              <h2>Participantes</h2>
              <p>Listado de participantes registrados en el sistema.</p>
            </div>

            <label className="cpm-research-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Buscar participante..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </label>
          </div>

          {cargando ? (
            <p>Cargando información...</p>
          ) : (
            <div className="cpm-research-table-wrapper">
              <table className="cpm-research-table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Empresa</th>
                    <th>Grupo</th>
<th>Asignar grupo</th>
<th>Rol</th>
                    
                    <th>Evaluaciones</th>
                  </tr>
                </thead>

                <tbody>
                  {participantesFiltrados.map((p) => {
                    const cantidad = evaluaciones.filter(
                      (e) => e.usuario_id === p.id
                    ).length;

                    return (
                      <tr key={p.id}>
                        <td>{p.codigo_participante || "Pendiente"}</td>
                        <td>{p.pyme || "No registrada"}</td>
                        <td>{p.grupo || "Pendiente"}</td>

<td>
  <select
    value={p.grupo || "pendiente"}
    onChange={(e) => cambiarGrupo(p.id, e.target.value)}
    className="cpm-research-group-select"
  >
    <option value="pendiente">Sin asignar</option>
    <option value="experimental">Experimental</option>
    <option value="control">Control</option>
  </select>
</td>

<td>{p.rol || "Empleado"}</td>
                        <td>{cantidad}</td>
                      </tr>
                    );
                  })}

                  {participantesFiltrados.length === 0 && (
                    <tr>
                      <td colSpan="5">
                        No se encontraron participantes.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="cpm-research-table-section">
          <h2>Últimas evaluaciones</h2>

          {cargando ? (
            <p>Cargando resultados...</p>
          ) : (
            <div className="cpm-research-table-wrapper">
              <table className="cpm-research-table">
                <thead>
                  <tr>
                    <th>Participante</th>
                    <th>Módulo</th>
                    <th>Puntaje</th>
                    <th>Porcentaje</th>
                    <th>Fecha</th>
                    <th>Detalle</th>
                  </tr>
                </thead>

                <tbody>
                  {evaluaciones.slice(0, 20).map((e, index) => {
                    const participante = participantes.find(
                      (p) => p.id === e.usuario_id
                    );

                    return (
                      <tr key={`${e.usuario_id}-${e.modulo}-${e.creado_en}-${index}`}>
                        <td>
                          {participante?.codigo_participante || "Sin código"}
                        </td>
                        <td>{e.modulo}</td>
                        <td>
                          {e.puntaje}/{e.total_preguntas}
                        </td>
                        <td>{e.porcentaje}%</td>
                        <td>
  {new Date(e.creado_en).toLocaleDateString("es-CO")}
</td>
<td>
  <button
    type="button"
    onClick={() => setEvaluacionSeleccionada(e)}
    className="cpm-research-refresh"
  >
    Ver respuestas
  </button>
</td>
                      </tr>
                    );
                  })}

                  {evaluaciones.length === 0 && (
                    <tr>
                      <td colSpan="6">
                        Todavía no hay evaluaciones registradas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
              {evaluacionSeleccionada && (
          <div className="cpm-research-modal">
            <div className="cpm-research-modal-content">
              <button
                type="button"
                onClick={() => setEvaluacionSeleccionada(null)}
                className="cpm-research-refresh"
              >
                Cerrar
              </button>

              <h2>Detalle de la evaluación</h2>

              <p>
                Módulo: <strong>{evaluacionSeleccionada.modulo}</strong>
              </p>

              <p>
                Puntaje:{" "}
                <strong>
                  {evaluacionSeleccionada.puntaje}/
                  {evaluacionSeleccionada.total_preguntas}
                </strong>
              </p>

              <p>
                Resultado:{" "}
                <strong>{evaluacionSeleccionada.porcentaje}%</strong>
              </p>

              <h3>Respuestas registradas</h3>

              {Array.isArray(evaluacionSeleccionada.respuestas) &&
              evaluacionSeleccionada.respuestas.length > 0 ? (
                evaluacionSeleccionada.respuestas.map((r, index) => (
                  <article
                    key={r.pregunta_id || index}
                    className="cpm-research-answer"
                  >
                    <strong>Pregunta {index + 1}</strong>

                    <p>Respuesta seleccionada: {r.respuesta_seleccionada ?? "Sin respuesta"}</p>

                    <p>Respuesta correcta: {r.respuesta_correcta ?? "No disponible"}</p>

                    <span>
                      {r.correcta ? "Correcta" : "Incorrecta"}
                    </span>
                  </article>
                ))
              ) : (
                <p>No hay respuestas detalladas disponibles.</p>
              )}
            </div>
          </div>
        )}
    </main>
  );
}
