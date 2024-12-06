export interface Shift {
  id: string;
  employeeId: string;
  startTime: string;
  endTime: string;
  date: string;
  type: ShiftType;
  status: ShiftStatus;
  notes?: string;
  breakTime?: number; // in minutes
  overtimeHours?: number;
  replacementFor?: string; // employeeId of the person being replaced
  createdAt: string;
  updatedAt: string;
}

export enum ShiftType {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  NIGHT = 'NIGHT',
  CUSTOM = 'CUSTOM'
}

export enum ShiftStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  PENDING_CHANGE = 'PENDING_CHANGE'
}

export interface ShiftTemplate {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  type: ShiftType;
  breakTime: number;
  daysOfWeek: number[]; // 0-6, where 0 is Sunday
}

export interface ShiftChangeRequest {
  id: string;
  shiftId: string;
  requestedById: string;
  requestedToId?: string;
  type: ShiftChangeRequestType;
  status: ShiftChangeRequestStatus;
  reason: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  resolvedById?: string;
  newStartTime?: string;
  newEndTime?: string;
}

export enum ShiftChangeRequestType {
  SWAP = 'SWAP',
  COVER = 'COVER',
  TIME_CHANGE = 'TIME_CHANGE',
  CANCEL = 'CANCEL'
}

export enum ShiftChangeRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED'
}

export interface ShiftFilters {
  employeeId?: string;
  startDate?: string;
  endDate?: string;
  type?: ShiftType;
  status?: ShiftStatus;
}