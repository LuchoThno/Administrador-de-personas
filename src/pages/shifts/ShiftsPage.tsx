import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ShiftCalendar } from '../../components/shifts/ShiftCalendar';
import { ShiftForm } from '../../components/shifts/ShiftForm';
import { ShiftDetails } from '../../components/shifts/ShiftDetails';

export const ShiftsPage: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ShiftCalendar />} />
      <Route path="new" element={<ShiftForm />} />
      <Route path=":id" element={<ShiftDetails />} />
    </Routes>
  );
};