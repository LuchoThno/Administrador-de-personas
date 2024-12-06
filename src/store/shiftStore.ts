import { create } from 'zustand';
import { 
  Shift, 
  ShiftTemplate, 
  ShiftChangeRequest, 
  ShiftFilters 
} from '../types/shift';

interface ShiftState {
  shifts: Shift[];
  templates: ShiftTemplate[];
  changeRequests: ShiftChangeRequest[];
  filters: ShiftFilters;
  loading: boolean;
  error: string | null;
  
  // Shift actions
  setShifts: (shifts: Shift[]) => void;
  addShift: (shift: Shift) => void;
  updateShift: (id: string, shift: Partial<Shift>) => void;
  deleteShift: (id: string) => void;
  
  // Template actions
  setTemplates: (templates: ShiftTemplate[]) => void;
  addTemplate: (template: ShiftTemplate) => void;
  updateTemplate: (id: string, template: Partial<ShiftTemplate>) => void;
  deleteTemplate: (id: string) => void;
  
  // Change request actions
  setChangeRequests: (requests: ShiftChangeRequest[]) => void;
  addChangeRequest: (request: ShiftChangeRequest) => void;
  updateChangeRequest: (id: string, request: Partial<ShiftChangeRequest>) => void;
  deleteChangeRequest: (id: string) => void;
  
  // Filter actions
  setFilters: (filters: ShiftFilters) => void;
  
  // Status actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useShiftStore = create<ShiftState>((set) => ({
  shifts: [],
  templates: [],
  changeRequests: [],
  filters: {},
  loading: false,
  error: null,

  setShifts: (shifts) => set({ shifts }),
  addShift: (shift) =>
    set((state) => ({ shifts: [...state.shifts, shift] })),
  updateShift: (id, updatedShift) =>
    set((state) => ({
      shifts: state.shifts.map((shift) =>
        shift.id === id ? { ...shift, ...updatedShift } : shift
      ),
    })),
  deleteShift: (id) =>
    set((state) => ({
      shifts: state.shifts.filter((shift) => shift.id !== id),
    })),

  setTemplates: (templates) => set({ templates }),
  addTemplate: (template) =>
    set((state) => ({ templates: [...state.templates, template] })),
  updateTemplate: (id, updatedTemplate) =>
    set((state) => ({
      templates: state.templates.map((template) =>
        template.id === id ? { ...template, ...updatedTemplate } : template
      ),
    })),
  deleteTemplate: (id) =>
    set((state) => ({
      templates: state.templates.filter((template) => template.id !== id),
    })),

  setChangeRequests: (requests) => set({ changeRequests: requests }),
  addChangeRequest: (request) =>
    set((state) => ({
      changeRequests: [...state.changeRequests, request],
    })),
  updateChangeRequest: (id, updatedRequest) =>
    set((state) => ({
      changeRequests: state.changeRequests.map((request) =>
        request.id === id ? { ...request, ...updatedRequest } : request
      ),
    })),
  deleteChangeRequest: (id) =>
    set((state) => ({
      changeRequests: state.changeRequests.filter(
        (request) => request.id !== id
      ),
    })),

  setFilters: (filters) => set({ filters }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));