import React, { useEffect, useRef } from 'react';
import { Employee } from '../../types/employee';
import { Building2, Phone, Mail, CreditCard } from 'lucide-react';
import { generateCredentialPDF } from '../../utils/pdf';

interface EmployeeCredentialProps {
  employee: Employee;
  onDownload?: () => void;
}

export const EmployeeCredential: React.FC<EmployeeCredentialProps> = ({
  employee,
  onDownload,
}) => {
  const barcodeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, employee.rut, {
        format: 'CODE128',
        width: 1,
        height: 40,
        displayValue: true,
        fontSize: 12,
        margin: 10,
      });
    }
  }, [employee.rut]);

  const downloadPDF = () => {
    if (barcodeRef.current) {
      generateCredentialPDF(employee, barcodeRef.current.toDataURL(), onDownload);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Credencial de Empleado
          </h3>
          <p className="text-sm text-gray-500">ID: {employee.rut}</p>
        </div>
        <button
          onClick={downloadPDF}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Descargar PDF
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mt-16 opacity-50" />
        
        <div className="flex flex-col md:flex-row gap-6 relative">
          <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
            {employee.profileImage ? (
              <img
                src={employee.profileImage}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-full h-full object-cover rounded-lg"
                crossOrigin="anonymous"
              />
            ) : (
              <span className="text-3xl font-bold text-gray-400">
                {employee.firstName[0]}
                {employee.lastName[0]}
              </span>
            )}
          </div>

          <div className="flex-1">
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              {employee.firstName} {employee.lastName}
            </h4>
            
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Building2 className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  {employee.position} - {employee.department}
                </span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">{employee.phone}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">{employee.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <svg ref={barcodeRef} className="w-full" />
        </div>
      </div>
    </div>
  );
};