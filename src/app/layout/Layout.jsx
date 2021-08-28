import { Center, Container, Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

import Navbar from './Navbar';

const Layout = ({ children }) => (
  <Flex backgroundColor="gray.100" flex={1} direction="column">
    <Navbar />
    <Center paddingY={6}>
      <Container maxWidth="6xl">{children}</Container>
    </Center>
  </Flex>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
