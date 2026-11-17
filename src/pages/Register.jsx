
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    pyme: "",
    aceptaDatos: false,
    aceptaInvestigacion: false,
  });

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    if (!form.aceptaDatos || !form.aceptaInvestigacion) {
      setError("Debes aceptar ambos consentimientos para participar.");
      return;
    }

    if (form.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
        options: {
          data: {
            nombre: form.nombre.trim(),
            pyme: form.pyme.trim(),
            acepta_datos: true,
            acepta_investigacion: true,
          },
        },
      });

      if (error) throw error;

      if (data.user && !data.session) {
        setMensaje(
          "Cuenta creada. Revisa tu correo electrónico para confirmar el registro."
        );
      } else if (data.user) {
        setMensaje(
          "Registro realizado correctamente. Tu perfil está en proceso de carga."
        );
      }

      setForm({
        nombre: "",
        email: "",
        password: "",
        pyme: "",
        aceptaDatos: false,
        aceptaInvestigacion: false,
      });
    } catch (err) {
      setError(err.message || "No se pudo completar el registro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container">
      <section className="auth-card">
        <h1>CIBERPYMET</h1>
        <p>Protección digital para las pequeñas y medianas empresas.</p>

        <h2>Crear cuenta</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre completo</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            required
          />

          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Mínimo 8 caracteres"
            minLength={8}
            required
          />

          <label htmlFor="pyme">Nombre de la PYME</label>
          <input
            id="pyme"
            name="pyme"
            type="text"
            value={form.pyme}
            onChange={handleChange}
            placeholder="Nombre de tu empresa"
            required
          />

          <div className="consent">
            <label>
              <input
                type="checkbox"
                name="aceptaDatos"
                checked={form.aceptaDatos}
                onChange={handleChange}
                required
              />
              Acepto el tratamiento de mis datos personales conforme a la
              Ley 1581 de 2012.
            </label>
          </div>

          <div className="consent">
            <label>
              <input
                type="checkbox"
                name="aceptaInvestigacion"
                checked={form.aceptaInvestigacion}
                onChange={handleChange}
                required
              />
              Acepto participar voluntariamente en la investigación.
            </label>
          </div>

          {error && <p className="error-message">{error}</p>}
          {mensaje && <p className="success-message">{mensaje}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Crear cuenta"}
          </button>
        </form>

        <p className="auth-link">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </section>
    </main>
  );
}
