import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVehicleStore } from '../../store/vehicleStore';
import { 
  ArrowLeft, 
  Calendar, 
  Tool, 
  FileText, 
  AlertTriangle,
  Plus,
  Download,
  Edit,
  Trash2
} from 'lucide-react';
import { DocumentStatus, MaintenanceStatus } from '../../types/vehicle';

export const VehicleDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = useVehicleStore(state => 
    state.vehicles.find(v => v.id === id)
  );

  if (!vehicle) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Vehículo no encontrado</h2>
        <button
          onClick={() => navigate('/dashboard/vehicles')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Volver al listado
        </button>
      </div>
    );
  }

  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case DocumentStatus.VALID:
        return 'bg-green-100 text-green-800';
      case DocumentStatus.EXPIRED:
        return 'bg-red-100 text-red-800';
      case DocumentStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMaintenanceStatusColor = (status: MaintenanceStatus) => {
    switch (status) {
      case MaintenanceStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case MaintenanceStatus.IN_PROGRESS:
        return 'bg-blue-100 text-blue-800';
      case MaintenanceStatus.SCHEDULED:
        return 'bg-yellow-100 text-yellow-800';
      case MaintenanceStatus.CANCELLED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard/vehicles')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {vehicle.brand} {vehicle.model}
            </h1>
            <p className="text-sm text-gray-500">Patente: {vehicle.licensePlate}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50">
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-red-200 rounded-md text-red-600 hover:bg-red-50">
            <Trash2 className="w-4 h-4 mr-2" />
            Eliminar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información General */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Información General
          </h2>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Tipo</dt>
              <dd className="mt-1 text-sm text-gray-900">{vehicle.type}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Estado</dt>
              <dd className="mt-1">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  vehicle.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {vehicle.status}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Año</dt>
              <dd className="mt-1 text-sm text-gray-900">{vehicle.year}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Kilometraje</dt>
              <dd className="mt-1 text-sm text-gray-900">{vehicle.mileage} km</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Combustible</dt>
              <dd className="mt-1 text-sm text-gray-900">{vehicle.fuelType}</dd>
            </div>
          </dl>
        </div>

        {/* Documentación */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Documentación</h2>
            <button className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50">
              <Plus className="w-4 h-4 mr-1" />
              Agregar
            </button>
          </div>
          <div className="space-y-4">
            {vehicle.documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{doc.title}</p>
                    <p className="text-xs text-gray-500">
                      Vence: {new Date(doc.expiryDate || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-gray-500">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Historial de Mantenimiento */}
        <div className="bg-white shadow-md rounded-lg p-6 md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              Historial de Mantenimiento
            </h2>
            <button className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50">
              <Plus className="w-4 h-4 mr-1" />
              Nuevo Registro
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kilometraje
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Costo
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vehicle.maintenanceRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {record.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.mileage} km
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getMaintenanceStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${record.cost.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};