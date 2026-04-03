import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0D14]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirigir a una página pública o mostrar estado de "Requerido inicio de sesión"
    // Dependiendo de tu flujo, puedes redirigir a "/" que actúe como landing, o forzar modal.
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Acceso Restringido</h2>
        <p className="text-gray-500 mb-4">Por favor, inicia sesión para acceder a tu panel de control.</p>
        <p className="text-sm text-gray-400">Haz clic en el botón "Sign In" arriba a la derecha.</p>
      </div>
    );
  }

  return <Outlet />;
}
