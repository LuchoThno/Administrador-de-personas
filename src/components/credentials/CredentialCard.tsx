import React from 'react';
import { Employee } from '../../types/employee';
import { Building2, Phone, Mail, CreditCard } from 'lucide-react';

interface CredentialCardProps {
  employee: Employee;
  preview?: boolean;
}

export const CredentialCard: React.FC<CredentialCardProps> = ({ employee, preview = false }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${preview ? 'w-[85.6mm] h-[54mm]' : 'w-full'}`}>
      <div className="p-4 flex gap-4">
        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
          {employee.profileImage ? (
            <img
              src={employee.profileImage}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <span className="text-2xl font-bold text-gray-400">
              {employee.firstName[0]}
              {employee.lastName[0]}
            </span>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">
            {employee.firstName} {employee.lastName}
          </h3>
          
          <div className="mt-2 space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <Building2 className="w-4 h-4 mr-2" />
              <span>{employee.position}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              <span>{employee.phone}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span>{employee.email}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <CreditCard className="w-4 h-4 mr-2" />
              <span>{employee.rut}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-gray-50 border-t">
        <div className="text-xs text-gray-500">
          Válido hasta: {new Date().getFullYear() + 2}
        </div>
      </div>
    </div>
  );
};