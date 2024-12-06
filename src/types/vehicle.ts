export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  licensePlate: string;
  year: number;
  type: VehicleType;
  status: VehicleStatus;
  assignedTo?: string; // Employee ID
  documents: VehicleDocument[];
  maintenanceRecords: MaintenanceRecord[];
  nextMaintenanceDate?: string;
  insuranceExpiryDate: string;
  technicalReviewDate: string;
  fuelType: FuelType;
  mileage: number;
}

export enum VehicleType {
  CAR = 'CAR',
  TRUCK = 'TRUCK',
  VAN = 'VAN',
  MOTORCYCLE = 'MOTORCYCLE',
  OTHER = 'OTHER'
}

export enum VehicleStatus {
  ACTIVE = 'ACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  REPAIR = 'REPAIR',
  INACTIVE = 'INACTIVE'
}

export enum FuelType {
  GASOLINE = 'GASOLINE',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID'
}

export interface VehicleDocument {
  id: string;
  type: DocumentType;
  title: string;
  fileUrl: string;
  expiryDate?: string;
  uploadDate: string;
  status: DocumentStatus;
}

export enum DocumentType {
  INSURANCE = 'INSURANCE',
  TECHNICAL_REVIEW = 'TECHNICAL_REVIEW',
  PERMIT = 'PERMIT',
  MAINTENANCE = 'MAINTENANCE',
  OTHER = 'OTHER'
}

export enum DocumentStatus {
  VALID = 'VALID',
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING'
}

export interface MaintenanceRecord {
  id: string;
  date: string;
  type: MaintenanceType;
  description: string;
  cost: number;
  provider: string;
  mileage: number;
  nextMaintenanceDate?: string;
  attachments: string[];
  status: MaintenanceStatus;
}

export enum MaintenanceType {
  PREVENTIVE = 'PREVENTIVE',
  CORRECTIVE = 'CORRECTIVE',
  EMERGENCY = 'EMERGENCY'
}

export enum MaintenanceStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface VehicleFilters {
  search?: string;
  type?: VehicleType;
  status?: VehicleStatus;
  assignedTo?: string;
}