import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';

import AppProvider from '~/context';

import AppRoutes from './routes';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
