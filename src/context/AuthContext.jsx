
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadProfile(userId) {
      console.log("Buscando perfil para:", userId);

      const { data, error } = await supabase
        .from("perfiles")
        .select("id, nombre, codigo_participante, grupo, rol, pyme, estado")
        .eq("id", userId)
        .maybeSingle();

      if (!mounted) return;

      if (error) {
        console.error("Error cargando perfil:", error);
        setProfile(null);
        return;
      }

      
console.log("Perfil recibido:", data);

if (data?.estado === "suspendido") {
  setProfile(null);

  alert(
    "Tu cuenta ha sido suspendida. Comunícate con el administrador."
  );

  await supabase.auth.signOut();
  return;
}

setProfile(data);

    }

    async function initialize() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error de sesión:", error);
      }

      if (!mounted) return;

      const currentSession = data?.session ?? null;
      setSession(currentSession);

      if (currentSession?.user) {
        await loadProfile(currentSession.user.id);
      }

      if (mounted) setLoading(false);
    }

    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);

        if (!newSession) {
          setProfile(null);
          setLoading(false);
        } else {
          setLoading(true);

          Promise.resolve()
            .then(() => loadProfile(newSession.user.id))
            .finally(() => {
              if (mounted) setLoading(false);
            });
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        profile,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe utilizarse dentro de AuthProvider"
    );
  }

  return context;
}
