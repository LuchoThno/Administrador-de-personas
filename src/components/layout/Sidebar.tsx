import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  Car, 
  FileText, 
  Clock,
  Settings,
  LogOut,
  CreditCard
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const NavItem: React.FC<{
  to: string;
  icon: React.ReactNode;
  label: string;
}> = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-700 hover:bg-gray-100'
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export const Sidebar: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">EMS</h1>
        <nav className="space-y-2">
          <NavItem
            to="/dashboard/employees"
            icon={<Users className="w-5 h-5" />}
            label="Empleados"
          />
          <NavItem
            to="/dashboard/vehicles"
            icon={<Car className="w-5 h-5" />}
            label="Vehículos"
          />
          <NavItem
            to="/dashboard/leaves"
            icon={<Calendar className="w-5 h-5" />}
            label="Permisos y Vacaciones"
          />
          <NavItem
            to="/dashboard/documents"
            icon={<FileText className="w-5 h-5" />}
            label="Documentos"
          />
          <NavItem
            to="/dashboard/shifts"
            icon={<Clock className="w-5 h-5" />}
            label="Turnos"
          />
          <NavItem
            to="/dashboard/credentials"
            icon={<CreditCard className="w-5 h-5" />}
            label="Credenciales"
          />
          <NavItem
            to="/dashboard/settings"
            icon={<Settings className="w-5 h-5" />}
            label="Configuración"
          />
        </nav>
      </div>
      <div className="absolute bottom-0 w-64 p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center space-x-3 text-gray-700 hover:text-red-600 w-full px-4 py-3 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};