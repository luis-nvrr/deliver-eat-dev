import { Center, Container, Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

import Navbar from './Navbar';

const Layout = ({ children }) => (
  <Flex
    bgGradient="linear-gradient(90deg, rgba(116,0,184,1) 0%, rgba(94,96,206,1) 32%, rgba(78,168,222,1) 93%);"
    flex={1}
    direction="column"
  >
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
