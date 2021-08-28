import * as React from 'react';

const lazyImport = (factory, name) =>
  Object.create({
    [name]: React.lazy(() =>
      factory().then((module) => ({ default: module[name] })),
    ),
  });

export default lazyImport;

// Usage
// const { Home } = lazyImport(() => import("./Home"), "Home");
