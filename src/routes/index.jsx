import React from 'react';

const ProtectedRoutes = React.lazy(async () => {
  const component = await import('./ProtectedRoutes');
  return component;
});

const AppRoutes = () => <ProtectedRoutes />;

export default AppRoutes;
