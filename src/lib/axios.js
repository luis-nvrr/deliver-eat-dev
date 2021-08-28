import Axios from 'axios';

import { createStandaloneToast } from '@chakra-ui/react';
import API_URL from '~/config';

const authRequestInterceptor = (config) => {
  config.headers.Accept = 'application/json';

  return config;
};

const axios = Axios.create({ baseURL: API_URL });

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message;
    const toast = createStandaloneToast();

    toast({
      title: 'Error',
      description: message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });

    return Promise.reject(error);
  },
);

export default axios;
