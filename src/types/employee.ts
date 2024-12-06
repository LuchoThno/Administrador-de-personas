export interface Employee {
  id: string;
  rut: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: 'M' | 'F' | 'OTHER';
  address: Address;
  department: string;
  position: string;
  startDate: string;
  isActive: boolean;
  profileImage?: string;
  emergencyContact: EmergencyContact;
}

export interface Address {
  street: string;
  number: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface EmployeeFilters {
  search?: string;
  department?: string;
  position?: string;
  status?: boolean;
}