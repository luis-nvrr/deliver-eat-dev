import React from 'react';

const useComponentDidMount = () => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = true;
  }, []);
  return ref.current;
};

export default useComponentDidMount;
