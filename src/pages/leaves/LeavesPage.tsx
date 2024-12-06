import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LeaveRequestList } from '../../components/leaves/LeaveRequestList';
import { LeaveRequestForm } from '../../components/leaves/LeaveRequestForm';
import { LeaveRequestDetails } from '../../components/leaves/LeaveRequestDetails';

export const LeavesPage: React.FC = () => {
  return (
    <Routes>
      <Route index element={<LeaveRequestList />} />
      <Route path="new" element={<LeaveRequestForm />} />
      <Route path=":id" element={<LeaveRequestDetails />} />
    </Routes>
  );
};