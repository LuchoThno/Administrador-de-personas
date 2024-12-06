import React, { useState } from 'react';
import { useShiftStore } from '../../store/shiftStore';
import { useEmployeeStore } from '../../store/employeeStore';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Users,
  Clock,
  Calendar as CalendarIcon
} from 'lucide-react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { ShiftType, ShiftStatus } from '../../types/shift';
import { Link } from 'react-router-dom';

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const DAYS = Array.from({ length: 7 }, (_, i) => i);

export const ShiftCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { shifts } = useShiftStore();
  const { employees } = useEmployeeStore();

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });

  const getShiftColor = (type: ShiftType) => {
    switch (type) {
      case ShiftType.MORNING:
        return 'bg-blue-100 border-blue-200 text-blue-800';
      case ShiftType.AFTERNOON:
        return 'bg-green-100 border-green-200 text-green-800';
      case ShiftType.NIGHT:
        return 'bg-purple-100 border-purple-200 text-purple-800';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-800';
    }
  };

  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find((emp) => emp.id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'N/A';
  };

  const previousWeek = () => {
    setCurrentDate((date) => addDays(date, -7));
  };

  const nextWeek = () => {
    setCurrentDate((date) => addDays(date, 7));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Turnos</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <CalendarIcon className="w-4 h-4" />
            <span>
              {format(weekStart, "MMMM yyyy", { locale: es })}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <button
              onClick={previousWeek}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextWeek}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <Link
            to="/dashboard/shifts/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Turno
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="grid grid-cols-8 border-b">
          <div className="p-4 text-sm font-medium text-gray-500 border-r">
            Hora
          </div>
          {DAYS.map((dayOffset) => {
            const date = addDays(weekStart, dayOffset);
            return (
              <div
                key={dayOffset}
                className="p-4 text-center border-r last:border-r-0"
              >
                <div className="text-sm font-medium text-gray-900">
                  {format(date, 'EEEE', { locale: es })}
                </div>
                <div className="text-sm text-gray-500">
                  {format(date, 'd MMM', { locale: es })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-8">
          {HOURS.map((hour) => (
            <React.Fragment key={hour}>
              <div className="p-2 text-sm text-gray-500 border-r border-b">
                {format(new Date().setHours(hour, 0), 'HH:mm')}
              </div>
              {DAYS.map((dayOffset) => {
                const date = addDays(weekStart, dayOffset);
                const dayShifts = shifts.filter(
                  (shift) =>
                    isSameDay(new Date(shift.date), date) &&
                    new Date(shift.startTime).getHours() === hour
                );

                return (
                  <div
                    key={`${hour}-${dayOffset}`}
                    className="relative p-1 border-r border-b last:border-r-0 min-h-[4rem]"
                  >
                    {dayShifts.map((shift) => (
                      <Link
                        key={shift.id}
                        to={`/dashboard/shifts/${shift.id}`}
                        className={`block p-2 mb-1 rounded border ${getShiftColor(
                          shift.type
                        )}`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>
                              {format(new Date(shift.startTime), 'HH:mm')} -{' '}
                              {format(new Date(shift.endTime), 'HH:mm')}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{getEmployeeName(shift.employeeId)}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};