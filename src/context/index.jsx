import * as React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';

import CircularProgress from '~/app/layout/CircularProgress';

const AppProvider = ({ children }) => (
  <React.Suspense fallback={<CircularProgress />}>
    <Router>{children}</Router>
  </React.Suspense>
);

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
