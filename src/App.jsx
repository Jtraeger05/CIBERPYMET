
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Encuesta from "./pages/Encuesta";
import Modulos from "./pages/Modulos";
import EvaluacionModulo from "./pages/EvaluacionModulo";
import Investigador from "./pages/Investigador";
import Administrador from "./pages/Administrador";
import Laboratorio from "./pages/Laboratorio";
import LaboratorioPractica from "./pages/LaboratorioPractica";
import Asistente from "./pages/Asistente";

function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();

  if (loading) {
    return <p>Cargando CIBERPYMET...</p>;
  }

  return session ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { session } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={session ? "/dashboard" : "/login"}
            replace
          />
        }
      />

      <Route
        path="/login"
        element={
          session ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />

      <Route
        path="/register"
        element={
          session ? <Navigate to="/dashboard" replace /> : <Register />
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/investigador"
        element={
          <ProtectedRoute>
            <Investigador />
          </ProtectedRoute>
        }
      />

      <Route
        path="/administrador"
        element={
          <ProtectedRoute>
            <Administrador />
          </ProtectedRoute>
        }
      />

      <Route
        path="/laboratorio"
        element={
          <ProtectedRoute>
            <Laboratorio />
          </ProtectedRoute>
        }
      />

      <Route
        path="/laboratorio/:id"
        element={
          <ProtectedRoute>
            <LaboratorioPractica />
          </ProtectedRoute>
        }
      />

      <Route
        path="/asistente"
        element={
          <ProtectedRoute>
            <Asistente />
          </ProtectedRoute>
        }
      />

      <Route
        path="/encuesta"
        element={
          <ProtectedRoute>
            <Encuesta />
          </ProtectedRoute>
        }
      />

      {/* Módulos educativos */}
      <Route
        path="/modulos/:id"
        element={
          <ProtectedRoute>
            <Modulos />
          </ProtectedRoute>
        }
      />

      {/* Evaluaciones individuales de cada módulo */}
      <Route
        path="/evaluacion-modulo/:id"
        element={
          <ProtectedRoute>
            <EvaluacionModulo />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
