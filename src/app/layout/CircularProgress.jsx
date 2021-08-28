import {
  Center,
  CircularProgress as ChakraCircularProgress,
  Flex,
} from '@chakra-ui/react';
import React from 'react';

const CircularProgress = () => (
  <Flex
    flexDirection="column"
    width="100wh"
    height="100vh"
    backgroundColor="gray.100"
    justifyContent="center"
    alignItems="center"
  >
    <Center>
      <ChakraCircularProgress isIndeterminate color="primary.500" />
    </Center>
  </Flex>
);

export default CircularProgress;
