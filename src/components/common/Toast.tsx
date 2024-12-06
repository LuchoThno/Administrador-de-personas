import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

const toastStyles = {
  success: 'bg-green-100 border-green-400 text-green-800',
  error: 'bg-red-100 border-red-400 text-red-800',
  info: 'bg-blue-100 border-blue-400 text-blue-800',
  warning: 'bg-yellow-100 border-yellow-400 text-yellow-800',
};

const ToastIcon = ({ type }: { type: ToastProps['type'] }) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'error':
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    case 'warning':
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    default:
      return <Info className="w-5 h-5 text-blue-500" />;
  }
};

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  return (
    <div
      className={`${toastStyles[type]} border-l-4 p-4 rounded-r shadow-md flex items-center justify-between`}
      role="alert"
    >
      <div className="flex items-center space-x-3">
        <ToastIcon type={type} />
        <p className="font-medium">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="p-1 hover:bg-opacity-20 hover:bg-gray-900 rounded"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};