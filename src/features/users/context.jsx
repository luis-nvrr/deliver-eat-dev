import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '~/app/layout/CircularProgress';
import api from './api';

const UserContext = React.createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState();
  const [status, setStatus] = React.useState('pending');

  React.useEffect(() => {
    api.fetch().then((loggedUser) => {
      setUser(loggedUser);
      setStatus('resolved');
    });
  }, []);

  if (!user || status === 'pending') {
    return <CircularProgress />;
  }

  const state = {
    user,
  };

  return (
    <UserContext.Provider value={{ state }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = { children: PropTypes.node.isRequired };

export { UserContext as default, UserProvider as Provider };
