export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE'
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  licensePlate: string;
  year: number;
  documents: Document[];
  maintenanceHistory: MaintenanceRecord[];
}

export interface Document {
  id: string;
  type: string;
  url: string;
  expiryDate: Date;
}

export interface MaintenanceRecord {
  id: string;
  date: Date;
  description: string;
  cost: number;
}

export interface LeaveRequest {
  id: string;
  userId: string;
  type: LeaveType;
  startDate: Date;
  endDate: Date;
  status: RequestStatus;
  reason?: string;
}

export enum LeaveType {
  VACATION = 'VACATION',
  MEDICAL = 'MEDICAL',
  OTHER = 'OTHER'
}

export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}