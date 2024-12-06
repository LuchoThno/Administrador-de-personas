import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/auth/LoginForm';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { EmployeesPage } from './pages/employees/EmployeesPage';
import { VehiclesPage } from './pages/vehicles/VehiclesPage';
import { LeavesPage } from './pages/leaves/LeavesPage';
import { ShiftsPage } from './pages/shifts/ShiftsPage';
import { CredentialsPage } from './pages/credentials/CredentialsPage';
import { ToastContainer } from './components/common/ToastContainer';
import { useAuthStore } from './store/authStore';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<DashboardLayout />} />}
        >
          <Route index element={<DashboardPage />} />
          <Route path="employees/*" element={<EmployeesPage />} />
          <Route path="vehicles/*" element={<VehiclesPage />} />
          <Route path="leaves/*" element={<LeavesPage />} />
          <Route path="shifts/*" element={<ShiftsPage />} />
          <Route path="credentials/*" element={<CredentialsPage />} />
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;