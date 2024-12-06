import React, { useState } from 'react';
import { useEmployeeStore } from '../../store/employeeStore';
import { EmployeeCredential } from './EmployeeCredential';
import { Search, Download, CheckCircle } from 'lucide-react';

export const CredentialGenerator: React.FC = () => {
  const [search, setSearch] = useState('');
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(new Set());
  const employees = useEmployeeStore((state) => state.employees);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(search.toLowerCase()) ||
      employee.rut.includes(search)
  );

  const handleDownload = (employeeId: string) => {
    setDownloadedIds((prev) => new Set([...prev, employeeId]));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Generador de Credenciales
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar empleado..."
            className="pl-10 pr-4 py-2 border rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredEmployees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                {employee.profileImage ? (
                  <img
                    src={employee.profileImage}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <span className="text-xl font-bold text-gray-400">
                    {employee.firstName[0]}
                    {employee.lastName[0]}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {employee.firstName} {employee.lastName}
                </h3>
                <p className="text-sm text-gray-500">
                  {employee.position} - {employee.department}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {downloadedIds.has(employee.id) ? (
                <span className="inline-flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-1" />
                  Descargada
                </span>
              ) : (
                <button
                  onClick={() => handleDownload(employee.id)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Generar Credencial
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};