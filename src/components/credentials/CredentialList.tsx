import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEmployeeStore } from '../../store/employeeStore';
import { Search, Filter, Download, Plus } from 'lucide-react';
import { CredentialCard } from './CredentialCard';
import { useCredentialGeneration } from '../../hooks/useCredentialGeneration';
import { CredentialProgress } from './CredentialProgress';

export const CredentialList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(new Set());
  const employees = useEmployeeStore((state) => state.employees);
  const { generating, progress, error, generateCredentials } = useCredentialGeneration();

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(search.toLowerCase()) ||
      employee.rut.includes(search)
  );

  const toggleEmployee = (employeeId: string) => {
    const newSelected = new Set(selectedEmployees);
    if (newSelected.has(employeeId)) {
      newSelected.delete(employeeId);
    } else {
      newSelected.add(employeeId);
    }
    setSelectedEmployees(newSelected);
  };

  const handleGenerateSelected = async () => {
    const selectedEmployeesList = employees.filter(emp => 
      selectedEmployees.has(emp.id)
    );
    await generateCredentials(selectedEmployeesList);
    setSelectedEmployees(new Set());
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Generación de Credenciales
        </h1>
        <div className="flex space-x-4">
          <Link
            to="/dashboard/credentials/batch"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Generar por Lote
          </Link>
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre o RUT..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="px-4 py-2 border rounded-lg flex items-center text-gray-700 hover:bg-gray-50">
          <Filter className="w-5 h-5 mr-2" />
          Filtros
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="relative">
            <input
              type="checkbox"
              className="absolute top-4 right-4 h-4 w-4"
              checked={selectedEmployees.has(employee.id)}
              onChange={() => toggleEmployee(employee.id)}
            />
            <CredentialCard employee={employee} />
          </div>
        ))}
      </div>

      {selectedEmployees.size > 0 && (
        <div className="fixed bottom-6 right-6">
          <button 
            onClick={handleGenerateSelected}
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            <Download className="w-5 h-5 mr-2" />
            Descargar Seleccionadas ({selectedEmployees.size})
          </button>
        </div>
      )}

      {generating && progress && (
        <CredentialProgress
          current={progress.current}
          total={progress.total}
          error={error}
        />
      )}
    </div>
  );
};