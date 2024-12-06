import { create } from 'zustand';
import { LeaveRequest, LeaveBalance, LeaveFilters, LeaveStatus } from '../types/leave';

interface LeaveState {
  requests: LeaveRequest[];
  balances: LeaveBalance[];
  filters: LeaveFilters;
  loading: boolean;
  error: string | null;
  setRequests: (requests: LeaveRequest[]) => void;
  addRequest: (request: LeaveRequest) => void;
  updateRequest: (id: string, request: Partial<LeaveRequest>) => void;
  deleteRequest: (id: string) => void;
  setBalances: (balances: LeaveBalance[]) => void;
  updateBalance: (employeeId: string, balance: Partial<LeaveBalance>) => void;
  setFilters: (filters: LeaveFilters) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useLeaveStore = create<LeaveState>((set) => ({
  requests: [],
  balances: [],
  filters: {},
  loading: false,
  error: null,
  setRequests: (requests) => set({ requests }),
  addRequest: (request) =>
    set((state) => ({ requests: [...state.requests, request] })),
  updateRequest: (id, updatedRequest) =>
    set((state) => ({
      requests: state.requests.map((request) =>
        request.id === id ? { ...request, ...updatedRequest } : request
      ),
    })),
  deleteRequest: (id) =>
    set((state) => ({
      requests: state.requests.filter((request) => request.id !== id),
    })),
  setBalances: (balances) => set({ balances }),
  updateBalance: (employeeId, updatedBalance) =>
    set((state) => ({
      balances: state.balances.map((balance) =>
        balance.employeeId === employeeId
          ? { ...balance, ...updatedBalance }
          : balance
      ),
    })),
  setFilters: (filters) => set({ filters }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));