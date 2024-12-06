import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShiftStore } from '../../store/shiftStore';
import { useEmployeeStore } from '../../store/employeeStore';
import { ShiftStatus, ShiftType } from '../../types/shift';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  AlertTriangle,
  Edit,
  Trash2,
  MessageSquare,
  RotateCcw,
} from 'lucide-react';
import { formatDate, formatTime, formatDateLong } from '../../utils/date';

export const ShiftDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const shift = useShiftStore((state) => state.shifts.find((s) => s.id === id));
  const { updateShift, deleteShift } = useShiftStore();
  const employee = useEmployeeStore((state) =>
    state.employees.find((e) => e.id === shift?.employeeId)
  );

  if (!shift || !employee) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Turno no encontrado</h2>
        <button
          onClick={() => navigate('/dashboard/shifts')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Volver al calendario
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('¿Está seguro de eliminar este turno?')) {
      deleteShift(shift.id);
      navigate('/dashboard/shifts');
    }
  };

  const handleStatusChange = (status: ShiftStatus) => {
    updateShift(shift.id, {
      status,
      updatedAt: new Date().toISOString(),
    });
  };

  const getStatusColor = (status: ShiftStatus) => {
    switch (status) {
      case ShiftStatus.SCHEDULED:
        return 'bg-blue-100 text-blue-800';
      case ShiftStatus.IN_PROGRESS:
        return 'bg-green-100 text-green-800';
      case ShiftStatus.COMPLETED:
        return 'bg-purple-100 text-purple-800';
      case ShiftStatus.CANCELLED:
        return 'bg-red-100 text-red-800';
      case ShiftStatus.PENDING_CHANGE:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getShiftTypeColor = (type: ShiftType) => {
    switch (type) {
      case ShiftType.MORNING:
        return 'bg-blue-50 text-blue-700';
      case ShiftType.AFTERNOON:
        return 'bg-green-50 text-green-700';
      case ShiftType.NIGHT:
        return 'bg-purple-50 text-purple-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard/shifts')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Detalles del Turno
            </h1>
            <p className="text-sm text-gray-500">
              {formatDateLong(shift.date)}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate(`/dashboard/shifts/${shift.id}/edit`)}
            className="inline-flex items-center px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 border border-red-200 rounded-md text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Eliminar
          </button>
        </div>
      </div>

      {/* Rest of the component remains the same, just update date formatting */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Empleado
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">
                    {employee.firstName} {employee.lastName}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Estado
                </label>
                <div className="mt-1">
                  <span
                    className={`px-2 py-1 text-sm font-medium rounded-full ${getStatusColor(
                      shift.status
                    )}`}
                  >
                    {shift.status}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Tipo de Turno
                </label>
                <div className="mt-1">
                  <span
                    className={`px-2 py-1 text-sm font-medium rounded-full ${getShiftTypeColor(
                      shift.type
                    )}`}
                  >
                    {shift.type}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Horario
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">
                    {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {shift.notes && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notas</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{shift.notes}</p>
            </div>
          )}
        </div>

        {/* Actions panel remains the same */}
        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Acciones</h3>
            <div className="space-y-3">
              {shift.status === ShiftStatus.SCHEDULED && (
                <button
                  onClick={() => handleStatusChange(ShiftStatus.IN_PROGRESS)}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Iniciar Turno
                </button>
              )}

              {shift.status === ShiftStatus.IN_PROGRESS && (
                <button
                  onClick={() => handleStatusChange(ShiftStatus.COMPLETED)}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Finalizar Turno
                </button>
              )}

              <button
                onClick={() => handleStatusChange(ShiftStatus.CANCELLED)}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-red-200 rounded-md text-red-600 hover:bg-red-50"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Cancelar Turno
              </button>

              <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                <RotateCcw className="w-4 h-4 mr-2" />
                Solicitar Cambio
              </button>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Agregar Comentario
            </h3>
            <div className="space-y-4">
              <textarea
                rows={4}
                className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Escribe un comentario..."
              />
              <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <MessageSquare className="w-4 h-4 mr-2" />
                Enviar Comentario
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};