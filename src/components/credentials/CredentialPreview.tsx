import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEmployeeStore } from '../../store/employeeStore';
import { ArrowLeft } from 'lucide-react';
import { EmployeeCredential } from './EmployeeCredential';

export const CredentialPreview: React.FC = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const employee = useEmployeeStore(
    (state) => state.employees.find((e) => e.id === employeeId)
  );

  if (!employee) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Empleado no encontrado
        </h2>
        <button
          onClick={() => navigate('/dashboard/credentials')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Volver al listado
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/dashboard/credentials')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          Vista Previa de Credencial
        </h1>
      </div>

      <div className="max-w-2xl mx-auto">
        <EmployeeCredential employee={employee} />
      </div>
    </div>
  );
};