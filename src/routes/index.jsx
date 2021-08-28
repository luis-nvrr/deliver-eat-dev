import React from 'react';

import lazyImport from '~/utils/lazyImport';

const { ProtectedRoutes } = lazyImport(
  () => import('./ProtectedRoutes'),
  'ProtectedRoutes',
);

const AppRoutes = () => <ProtectedRoutes />;

export default AppRoutes;
