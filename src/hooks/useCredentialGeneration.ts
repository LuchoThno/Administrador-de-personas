import { useState } from 'react';
import { Employee } from '../types/employee';
import { generateBarcode } from '../utils/barcode';
import { generateSingleCredential, generateBatchCredentials } from '../utils/credentials';

interface UseCredentialGenerationReturn {
  generating: boolean;
  progress: { current: number; total: number } | null;
  error: string | null;
  generateCredential: (employee: Employee) => Promise<void>;
  generateCredentials: (employees: Employee[]) => Promise<void>;
}

export const useCredentialGeneration = (): UseCredentialGenerationReturn => {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateCredential = async (employee: Employee) => {
    try {
      setGenerating(true);
      setError(null);
      
      const barcodeData = await generateBarcode(employee.rut);
      const blob = await generateSingleCredential(employee, barcodeData);
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `credential-${employee.rut}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al generar la credencial');
    } finally {
      setGenerating(false);
    }
  };

  const generateCredentials = async (employees: Employee[]) => {
    try {
      setGenerating(true);
      setError(null);
      setProgress({ current: 0, total: employees.length });
      
      const blob = await generateBatchCredentials(employees, (progress) => {
        setProgress({
          current: Math.floor(progress * employees.length),
          total: employees.length,
        });
      });
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'credentials.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al generar las credenciales');
    } finally {
      setGenerating(false);
      setProgress(null);
    }
  };

  return {
    generating,
    progress,
    error,
    generateCredential,
    generateCredentials,
  };
};