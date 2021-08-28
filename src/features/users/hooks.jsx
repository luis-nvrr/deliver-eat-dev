import React from 'react';

import UserContext from './context';

const useUser = () => {
  const {
    state: { user },
  } = React.useContext(UserContext);

  return user;
};

export default useUser;
