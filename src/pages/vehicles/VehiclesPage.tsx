import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { VehicleList } from '../../components/vehicles/VehicleList';
import { VehicleForm } from '../../components/vehicles/VehicleForm';
import { VehicleDetails } from '../../components/vehicles/VehicleDetails';

export const VehiclesPage: React.FC = () => {
  return (
    <Routes>
      <Route index element={<VehicleList />} />
      <Route path="new" element={<VehicleForm />} />
      <Route path=":id" element={<VehicleDetails />} />
    </Routes>
  );
};