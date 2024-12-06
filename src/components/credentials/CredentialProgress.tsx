import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface CredentialProgressProps {
  total: number;
  current: number;
  error?: string;
}

export const CredentialProgress: React.FC<CredentialProgressProps> = ({
  total,
  current,
  error,
}) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="text-center">
          {error ? (
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          ) : percentage === 100 ? (
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
          ) : (
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          )}
          
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {error
              ? 'Error al generar credenciales'
              : percentage === 100
              ? 'Credenciales generadas'
              : 'Generando credenciales...'}
          </h3>
          
          {!error && (
            <>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              
              <p className="mt-2 text-sm text-gray-500">
                {current} de {total} credenciales
              </p>
            </>
          )}
          
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};