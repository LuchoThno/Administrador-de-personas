import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Car,
  Calendar,
  Clock,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  XCircle,
  FileText,
} from 'lucide-react';
import { useEmployeeStore } from '../../store/employeeStore';
import { useVehicleStore } from '../../store/vehicleStore';
import { useLeaveStore } from '../../store/leaveStore';
import { useShiftStore } from '../../store/shiftStore';
import { LeaveStatus } from '../../types/leave';
import { VehicleStatus } from '../../types/vehicle';
import { ShiftStatus } from '../../types/shift';

const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  description?: string;
  trend?: number;
  color: string;
}> = ({ title, value, icon, description, trend, color }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
      {trend !== undefined && (
        <div className="flex items-center">
          <TrendingUp
            className={`w-4 h-4 ${
              trend >= 0 ? 'text-green-500' : 'text-red-500'
            }`}
          />
          <span
            className={`ml-1 text-sm ${
              trend >= 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {trend}%
          </span>
        </div>
      )}
    </div>
    {description && (
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    )}
  </div>
);

export const DashboardPage: React.FC = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const vehicles = useVehicleStore((state) => state.vehicles);
  const leaveRequests = useLeaveStore((state) => state.requests);
  const shifts = useShiftStore((state) => state.shifts);

  const activeEmployees = employees.filter((emp) => emp.isActive).length;
  const vehiclesInMaintenance = vehicles.filter(
    (v) => v.status === VehicleStatus.MAINTENANCE
  ).length;
  const pendingLeaveRequests = leaveRequests.filter(
    (r) => r.status === LeaveStatus.PENDING
  ).length;
  const todayShifts = shifts.filter(
    (s) =>
      new Date(s.date).toDateString() === new Date().toDateString() &&
      s.status !== ShiftStatus.CANCELLED
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Panel de Control</h1>
        <div className="text-sm text-gray-500">
          Última actualización: {new Date().toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Empleados Activos"
          value={activeEmployees}
          icon={<Users className="w-6 h-6 text-blue-600" />}
          color="bg-blue-50"
          trend={2.5}
        />
        <StatCard
          title="Vehículos en Mantenimiento"
          value={vehiclesInMaintenance}
          icon={<Car className="w-6 h-6 text-yellow-600" />}
          color="bg-yellow-50"
        />
        <StatCard
          title="Solicitudes Pendientes"
          value={pendingLeaveRequests}
          icon={<Calendar className="w-6 h-6 text-purple-600" />}
          color="bg-purple-50"
        />
        <StatCard
          title="Turnos Hoy"
          value={todayShifts}
          icon={<Clock className="w-6 h-6 text-green-600" />}
          color="bg-green-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alertas y Notificaciones */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              Alertas y Notificaciones
            </h2>
            <Link
              to="/dashboard/notifications"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Ver todas
            </Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-900">
                  Documentos por vencer
                </p>
                <p className="text-sm text-red-700">
                  3 vehículos tienen documentos que vencen en los próximos 30 días
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-900">
                  Mantenimientos Programados
                </p>
                <p className="text-sm text-yellow-700">
                  2 vehículos requieren mantenimiento esta semana
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              Actividad Reciente
            </h2>
            <Link
              to="/dashboard/activity"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Ver todo
            </Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-900">
                  Solicitud de permiso aprobada
                </p>
                <p className="text-xs text-gray-500">Hace 5 minutos</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-900">
                  Nuevo documento agregado
                </p>
                <p className="text-xs text-gray-500">Hace 15 minutos</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="w-4 h-4 text-red-600" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-900">
                  Turno cancelado
                </p>
                <p className="text-xs text-gray-500">Hace 30 minutos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Próximos Vencimientos */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Próximos Vencimientos
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Car className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Seguro Vehículo ABC-123
                  </p>
                  <p className="text-xs text-gray-500">Vence en 15 días</p>
                </div>
              </div>
              <Link
                to="/dashboard/vehicles"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Ver detalles
              </Link>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Licencia de Conducir - Juan Pérez
                  </p>
                  <p className="text-xs text-gray-500">Vence en 30 días</p>
                </div>
              </div>
              <Link
                to="/dashboard/employees"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Ver detalles
              </Link>
            </div>
          </div>
        </div>

        {/* Resumen de Permisos */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Resumen de Permisos
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-900">Aprobados</p>
                <p className="text-2xl font-semibold text-green-700">
                  {leaveRequests.filter(
                    (r) => r.status === LeaveStatus.APPROVED
                  ).length}
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm font-medium text-yellow-900">Pendientes</p>
                <p className="text-2xl font-semibold text-yellow-700">
                  {pendingLeaveRequests}
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-sm font-medium text-red-900">Rechazados</p>
                <p className="text-2xl font-semibold text-red-700">
                  {leaveRequests.filter(
                    (r) => r.status === LeaveStatus.REJECTED
                  ).length}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-700">
                  {leaveRequests.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};