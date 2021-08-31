import {
  Box,
  Container,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { CgLogOff } from 'react-icons/cg';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import logo from '~/assets/logo.svg';
import useUser from '~/features/users/hooks';

const Navbar = () => {
  const navigate = useNavigate();
  const user = useUser();

  const handleUserLogout = () => {
    navigate('/');
  };

  return (
    <Box
      backgroundColor="rgb(116,0,184);"
      bgGradient="linear-gradient(90deg, rgba(116,0,184,1) 0%, rgba(94,96,206,1) 32%, rgba(78,168,222,1) 93%);"
      boxShadow="md"
    >
      <Container maxWidth="6xl">
        <Stack
          alignItems="center"
          as="nav"
          direction="row"
          justifyContent="space-between"
          paddingY={3}
        >
          <Stack alignItems="center" direction="row" spacing={3}>
            <Image height={10} width={10} src={logo} />
            <Heading color="primary.300" fontSize={(5, 15, 30)}>
              DeliverEat!
            </Heading>
          </Stack>
          <Stack
            alignItems="center"
            color="whiteAlpha.900"
            direction="row"
          >
            <Stack
              alignItems="center"
              justifyContent="center"
              backgroundColor="primary.300"
              borderRadius={3333}
              cursor="pointer"
              paddingY={2}
              direction="row"
              w={[10, 20, 40]}
            >
              <Icon as={FaUser} w={6} h={6} />
              <Text fontWeight="500" fontSize={[5, 10, 15]}>
                {user?.name}
              </Text>
            </Stack>
            <Stack
              alignItems="center"
              justifyContent="center"
              backgroundColor="primary.300"
              borderRadius={3333}
              cursor="pointer"
              paddingY={2}
              direction="row"
              onClick={handleUserLogout}
              w={[3, 5, 10]}
            >
              <Icon as={CgLogOff} />
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
