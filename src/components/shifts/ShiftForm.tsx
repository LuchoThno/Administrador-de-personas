import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useShiftStore } from '../../store/shiftStore';
import { useEmployeeStore } from '../../store/employeeStore';
import { ShiftType, ShiftStatus } from '../../types/shift';
import { ArrowLeft, Calendar, Clock, Users } from 'lucide-react';

const shiftSchema = z.object({
  employeeId: z.string().min(1, 'El empleado es requerido'),
  type: z.nativeEnum(ShiftType),
  date: z.string().min(1, 'La fecha es requerida'),
  startTime: z.string().min(1, 'La hora de inicio es requerida'),
  endTime: z.string().min(1, 'La hora de fin es requerida'),
  breakTime: z.number().min(0).max(120),
  notes: z.string().optional(),
}).refine((data) => {
  const start = new Date(`${data.date}T${data.startTime}`);
  const end = new Date(`${data.date}T${data.endTime}`);
  return end > start;
}, {
  message: "La hora de fin debe ser posterior a la hora de inicio",
  path: ["endTime"],
});

type ShiftFormData = z.infer<typeof shiftSchema>;

export const ShiftForm: React.FC = () => {
  const navigate = useNavigate();
  const addShift = useShiftStore((state) => state.addShift);
  const employees = useEmployeeStore((state) => state.employees);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ShiftFormData>({
    resolver: zodResolver(shiftSchema),
    defaultValues: {
      type: ShiftType.MORNING,
      breakTime: 30,
    },
  });

  const onSubmit = (data: ShiftFormData) => {
    const newShift = {
      id: crypto.randomUUID(),
      ...data,
      status: ShiftStatus.SCHEDULED,
      startTime: `${data.date}T${data.startTime}`,
      endTime: `${data.date}T${data.endTime}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addShift(newShift);
    navigate('/dashboard/shifts');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/dashboard/shifts')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Nuevo Turno</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Empleado
              </label>
              <div className="mt-1 relative">
                <select
                  {...register('employeeId')}
                  className="mt-1 block w-full pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Seleccionar empleado</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName}
                    </option>
                  ))}
                </select>
                <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              {errors.employeeId && (
                <p className="mt-1 text-sm text-red-600">{errors.employeeId.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo de Turno
              </label>
              <div className="mt-1 relative">
                <select
                  {...register('type')}
                  className="mt-1 block w-full pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {Object.values(ShiftType).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha
              </label>
              <div className="mt-1 relative">
                <input
                  type="date"
                  {...register('date')}
                  className="mt-1 block w-full pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hora de Inicio
                </label>
                <div className="mt-1 relative">
                  <input
                    type="time"
                    {...register('startTime')}
                    className="mt-1 block w-full pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.startTime && (
                  <p className="mt-1 text-sm text-red-600">{errors.startTime.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hora de Fin
                </label>
                <div className="mt-1 relative">
                  <input
                    type="time"
                    {...register('endTime')}
                    className="mt-1 block w-full pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.endTime && (
                  <p className="mt-1 text-sm text-red-600">{errors.endTime.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tiempo de Descanso (minutos)
              </label>
              <input
                type="number"
                {...register('breakTime', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
                max="120"
              />
              {errors.breakTime && (
                <p className="mt-1 text-sm text-red-600">{errors.breakTime.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Notas
              </label>
              <textarea
                {...register('notes')}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Agregar notas o instrucciones especiales..."
              />
              {errors.notes && (
                <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard/shifts')}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};