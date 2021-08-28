import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Landing from '~/app/screens/Landing';

const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default PublicRoutes;
