import { create } from 'zustand';
import { Employee, EmployeeFilters } from '../types/employee';

interface EmployeeState {
  employees: Employee[];
  filters: EmployeeFilters;
  loading: boolean;
  error: string | null;
  setEmployees: (employees: Employee[]) => void;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  setFilters: (filters: EmployeeFilters) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [],
  filters: {},
  loading: false,
  error: null,
  setEmployees: (employees) => set({ employees }),
  addEmployee: (employee) =>
    set((state) => ({ employees: [...state.employees, employee] })),
  updateEmployee: (id, updatedEmployee) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? { ...emp, ...updatedEmployee } : emp
      ),
    })),
  deleteEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== id),
    })),
  setFilters: (filters) => set({ filters }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));