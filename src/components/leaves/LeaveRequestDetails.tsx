import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLeaveStore } from '../../store/leaveStore';
import { useAuthStore } from '../../store/authStore';
import { LeaveStatus, LeaveType } from '../../types/leave';
import { UserRole } from '../../types/auth';
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  MessageSquare,
  Download,
} from 'lucide-react';

export const LeaveRequestDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { requests, updateRequest } = useLeaveStore();
  const request = requests.find((r) => r.id === id);

  if (!request || !user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Solicitud no encontrada</h2>
        <button
          onClick={() => navigate('/dashboard/leaves')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Volver al listado
        </button>
      </div>
    );
  }

  const canManageRequest = user.role === UserRole.ADMIN || user.role === UserRole.MANAGER;
  const isPending = request.status === LeaveStatus.PENDING;

  const handleApprove = () => {
    updateRequest(request.id, {
      status: LeaveStatus.APPROVED,
      approvedBy: user.id,
      approvedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  const handleReject = () => {
    updateRequest(request.id, {
      status: LeaveStatus.REJECTED,
      approvedBy: user.id,
      approvedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  const getStatusColor = (status: LeaveStatus) => {
    switch (status) {
      case LeaveStatus.APPROVED:
        return 'bg-green-100 text-green-800';
      case LeaveStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case LeaveStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      case LeaveStatus.CANCELLED:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLeaveTypeIcon = (type: LeaveType) => {
    switch (type) {
      case LeaveType.VACATION:
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case LeaveType.MEDICAL:
        return <Calendar className="w-5 h-5 text-red-500" />;
      case LeaveType.PERSONAL:
        return <Calendar className="w-5 h-5 text-purple-500" />;
      case LeaveType.BEREAVEMENT:
        return <Calendar className="w-5 h-5 text-gray-500" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard/leaves')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Solicitud de Permiso
            </h1>
            <p className="text-sm text-gray-500">
              Creada el {new Date(request.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        {canManageRequest && isPending && (
          <div className="flex space-x-3">
            <button
              onClick={handleApprove}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Aprobar
            </button>
            <button
              onClick={handleReject}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Rechazar
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Detalles principales */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Tipo de Permiso
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  {getLeaveTypeIcon(request.type)}
                  <span className="text-gray-900">{request.type}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Estado
                </label>
                <div className="mt-1">
                  <span
                    className={`px-2 py-1 text-sm font-medium rounded-full ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Fecha de Inicio
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">
                    {new Date(request.startDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Fecha de Fin
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">
                    {new Date(request.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-500">
                  Duración Total
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">
                    {request.totalDays} día{request.totalDays !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Motivo */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Motivo</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{request.reason}</p>
          </div>

          {/* Documentos adjuntos */}
          {request.attachments && request.attachments.length > 0 && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Documentos Adjuntos
              </h3>
              <div className="space-y-3">
                {request.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        Documento {index + 1}
                      </span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Historial y comentarios */}
        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Historial
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-900">Solicitud creada</p>
                  <p className="text-xs text-gray-500">
                    {new Date(request.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              {request.approvedAt && (
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full ${
                        request.status === LeaveStatus.APPROVED
                          ? 'bg-green-100'
                          : 'bg-red-100'
                      } flex items-center justify-center`}
                    >
                      {request.status === LeaveStatus.APPROVED ? (
                        <CheckCircle
                          className="w-4 h-4 text-green-600"
                        />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">
                      Solicitud{' '}
                      {request.status === LeaveStatus.APPROVED
                        ? 'aprobada'
                        : 'rechazada'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(request.approvedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {canManageRequest && (
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
          )}
        </div>
      </div>
    </div>
  );
};