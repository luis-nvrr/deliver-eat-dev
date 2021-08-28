import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import MainLayout from '~/app/layout/Layout';
import HomeScreen from '~/app/screens/Home';
import Landing from '~/app/screens/Landing';
import { Provider as UserProvider } from '~/features/users/context';

const App = () => (
  <UserProvider>
    <MainLayout>
      <Outlet />
      <HomeScreen />
    </MainLayout>
  </UserProvider>
);

const ProtectedRoutes = () => (
  <Routes>
    <Route path="/app" element={<App />} />
    <Route path="/" element={<Landing />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default ProtectedRoutes;
