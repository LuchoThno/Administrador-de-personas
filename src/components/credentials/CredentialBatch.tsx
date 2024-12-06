import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployeeStore } from '../../store/employeeStore';
import { ArrowLeft, Download, Check } from 'lucide-react';
import { useCredentialGeneration } from '../../hooks/useCredentialGeneration';
import { CredentialProgress } from './CredentialProgress';

export const CredentialBatch: React.FC = () => {
  const navigate = useNavigate();
  const employees = useEmployeeStore((state) => state.employees);
  const [selectedDepartments, setSelectedDepartments] = useState<Set<string>>(new Set());
  const { generating, progress, error, generateCredentials } = useCredentialGeneration();

  const departments = Array.from(
    new Set(employees.map((emp) => emp.department))
  ).sort();

  const toggleDepartment = (department: string) => {
    const newSelected = new Set(selectedDepartments);
    if (newSelected.has(department)) {
      newSelected.delete(department);
    } else {
      newSelected.add(department);
    }
    setSelectedDepartments(newSelected);
  };

  const handleGenerate = async () => {
    const selectedEmployees = employees.filter(emp => 
      selectedDepartments.has(emp.department)
    );
    await generateCredentials(selectedEmployees);
    if (!error) {
      navigate('/dashboard/credentials');
    }
  };

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
          Generación por Lote
        </h1>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Seleccionar Departamentos
        </h2>
        <div className="space-y-3">
          {departments.map((department) => (
            <label
              key={department}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
            >
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600"
                checked={selectedDepartments.has(department)}
                onChange={() => toggleDepartment(department)}
              />
              <span className="text-gray-900">{department}</span>
              <span className="text-sm text-gray-500">
                ({employees.filter((emp) => emp.department === department).length} empleados)
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => navigate('/dashboard/credentials')}
          className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          onClick={handleGenerate}
          disabled={selectedDepartments.size === 0 || generating}
          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            selectedDepartments.size === 0 || generating
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {generating ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Generando...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Generar Credenciales
            </>
          )}
        </button>
      </div>

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