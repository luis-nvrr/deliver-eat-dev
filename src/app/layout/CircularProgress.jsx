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
    backgroundColor="rgb(116,0,184);"
    bgGradient="linear-gradient(90deg, rgba(116,0,184,1) 0%, rgba(94,96,206,1) 32%, rgba(78,168,222,1) 93%);"
    justifyContent="center"
    alignItems="center"
  >
    <Center>
      <ChakraCircularProgress isIndeterminate color="primary.200" />
    </Center>
  </Flex>
);

export default CircularProgress;
