import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { EmployeeList } from '../../components/employees/EmployeeList';
import { EmployeeForm } from '../../components/employees/EmployeeForm';

export const EmployeesPage: React.FC = () => {
  return (
    <Routes>
      <Route index element={<EmployeeList />} />
      <Route path="new" element={<EmployeeForm onSubmit={console.log} />} />
      <Route path=":id" element={<EmployeeForm onSubmit={console.log} />} />
    </Routes>
  );
};