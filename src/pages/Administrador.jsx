
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  UserCog,
  ArrowLeft,
  RefreshCw,
  Search,
} from "lucide-react";

import { supabase } from "../supabase";
import { useAuth } from "../context/AuthContext";

export default function Administrador() {
  const { profile, loading } = useAuth();

  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const autorizado =
    profile?.rol?.toLowerCase() === "administrador";

  const cargarUsuarios = async () => {
    setCargando(true);
    setError("");

    try {
      const { data, error } = await supabase
        .from("perfiles")
        .select("id, codigo_participante, nombre, rol, grupo, pyme, estado")
        .order("codigo_participante");

      if (error) throw error;

      setUsuarios(data || []);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
      setError("No fue posible cargar los usuarios.");
    } finally {
      setCargando(false);
    }
  };

const cambiarRol = async (usuarioId, nuevoRol) => {
  if (usuarioId === profile.id) {
    alert("No puedes cambiar tu propio rol.");
    return;
  }

  const confirmar = window.confirm(
    "¿Estás seguro de cambiar el rol de este usuario?"
  );

  if (!confirmar) return;

  const { error } = await supabase.rpc("admin_cambiar_rol", {
    p_usuario_id: usuarioId,
    p_nuevo_rol: nuevoRol,
  });

  if (error) {
    alert("No se pudo cambiar el rol: " + error.message);
    return;
  }

  alert("Rol actualizado correctamente.");
  cargarUsuarios();
};
const cambiarGrupo = async (usuarioId, nuevoGrupo) => {
  const { error } = await supabase
    .from("perfiles")
    .update({ grupo: nuevoGrupo })
    .eq("id", usuarioId);

  if (error) {
    alert("No se pudo actualizar el grupo: " + error.message);
    return;
  }

  alert("Grupo actualizado correctamente.");
  cargarUsuarios();
};

const cambiarEstado = async (usuarioId, nuevoEstado) => {
  const confirmar = window.confirm(
    nuevoEstado === "suspendido"
      ? "¿Estás seguro de suspender esta cuenta?"
      : "¿Deseas reactivar esta cuenta?"
  );

  if (!confirmar) return;

  const { error } = await supabase.rpc("admin_cambiar_estado", {
    p_usuario_id: usuarioId,
    p_nuevo_estado: nuevoEstado,
  });

  if (error) {
    alert("No se pudo cambiar el estado: " + error.message);
    return;
  }

  alert("Estado actualizado correctamente.");
  cargarUsuarios();
};


  useEffect(() => {
    if (!loading && autorizado) {
      cargarUsuarios();
    }
  }, [loading, autorizado]);

  if (loading) {
    return <p>Cargando panel de administración...</p>;
  }

  if (!autorizado) {
    return <Navigate to="/dashboard" replace />;
  }

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const texto = busqueda.toLowerCase();

    return (
      usuario.nombre?.toLowerCase().includes(texto) ||
      usuario.codigo_participante?.toLowerCase().includes(texto) ||
      usuario.rol?.toLowerCase().includes(texto) ||
      usuario.pyme?.toLowerCase().includes(texto)
    );
  });

  return (
    <main className="cpm-admin-page">
      <div className="cpm-admin-wrapper">

        <Link to="/dashboard" className="cpm-admin-back">
          <ArrowLeft size={18} />
          Volver al Dashboard
        </Link>

        <header className="cpm-admin-header">
          <div className="cpm-admin-icon">
            <ShieldCheck size={30} />
          </div>

          <div>
            <span>GESTIÓN DE LA PLATAFORMA</span>
            <h1>Panel de administrador</h1>
            <p>
              Administra los usuarios y controla los accesos
              de CIBERPYMET.
            </p>
          </div>
        </header>

        
<section className="cpm-admin-stats">
  <article>
    <Users size={25} />
    <span>Usuarios registrados</span>
    <strong>{usuarios.length}</strong>
  </article>

  <article>
    <UserCog size={25} />
    <span>Administradores</span>
    <strong>
      {usuarios.filter((u) => u.rol === "administrador").length}
    </strong>
  </article>

  <article>
    <ShieldCheck size={25} />
    <span>Investigadores</span>
    <strong>
      {usuarios.filter((u) => u.rol === "investigador").length}
    </strong>
  </article>

  <article>
    <ShieldCheck size={25} />
    <span>Cuentas activas</span>
    <strong>
      {usuarios.filter((u) => u.estado !== "suspendido").length}
    </strong>
  </article>

  <article>
    <UserCog size={25} />
    <span>Cuentas suspendidas</span>
    <strong>
      {usuarios.filter((u) => u.estado === "suspendido").length}
    </strong>
  </article>
</section>




        <section className="cpm-admin-content">
          <div className="cpm-admin-section-header">
            <div>
              <h2>Usuarios registrados</h2>
              <p>Consulta las cuentas de CIBERPYMET.</p>
            </div>

            <button onClick={cargarUsuarios}>
              <RefreshCw size={16} />
              Actualizar
            </button>
          </div>

          <div className="cpm-admin-search">
            <Search size={19} />
            <input
              type="text"
              placeholder="Buscar por nombre, código, rol o empresa..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          {error && <p className="cpm-admin-error">{error}</p>}

          {cargando ? (
            <p>Cargando usuarios...</p>
          ) : (
            <div className="cpm-admin-table-container">
              <table>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Empresa</th>
                    <th>Grupo</th>
                    <th>Rol</th>
                    <th>Estado</th>
                  </tr>
                </thead>

                <tbody>
                  {usuariosFiltrados.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.codigo_participante || "—"}</td>
                      <td>{usuario.nombre || "—"}</td>
                      <td>{usuario.pyme || "—"}</td>
                      <td>
  <select
    value={usuario.grupo || "pendiente"}
    onChange={(e) =>
      cambiarGrupo(usuario.id, e.target.value)
    }
  >
    <option value="pendiente">Pendiente</option>
    <option value="experimental">Experimental</option>
    <option value="control">Control</option>
  </select>
</td>

<td>
  <select
    value={usuario.rol || "empleado"}
    onChange={(e) =>
      cambiarRol(usuario.id, e.target.value)
    }
    disabled={usuario.id === profile.id}
  >
    <option value="empleado">Empleado</option>
    <option value="investigador">Investigador</option>
    <option value="administrador">Administrador</option>
  </select>
</td>
<td>
  <select
    value={usuario.estado || "activo"}
    onChange={(e) =>
      cambiarEstado(usuario.id, e.target.value)
    }
    disabled={usuario.id === profile.id}
  >
    <option value="activo">Activo</option>
    <option value="suspendido">Suspendido</option>
  </select>
</td>
                    </tr>
                  ))}

                  {usuariosFiltrados.length === 0 && (
                    <tr>
                      <td colSpan="6">
                        No se encontraron usuarios.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
