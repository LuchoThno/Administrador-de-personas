export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  createdAt: string;
  updatedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  comments?: string;
  attachments?: string[];
  totalDays: number;
}

export enum LeaveType {
  VACATION = 'VACATION',
  MEDICAL = 'MEDICAL',
  PERSONAL = 'PERSONAL',
  BEREAVEMENT = 'BEREAVEMENT',
  OTHER = 'OTHER'
}

export enum LeaveStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED'
}

export interface LeaveBalance {
  employeeId: string;
  year: number;
  vacationDays: {
    total: number;
    used: number;
    remaining: number;
  };
  medicalDays: {
    used: number;
  };
  personalDays: {
    total: number;
    used: number;
    remaining: number;
  };
}

export interface LeaveFilters {
  employeeId?: string;
  type?: LeaveType;
  status?: LeaveStatus;
  startDate?: string;
  endDate?: string;
}