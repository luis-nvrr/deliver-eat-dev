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
    <Box backgroundColor="white" boxShadow="md">
      <Container maxWidth="6xl">
        <Stack
          alignItems="center"
          as="nav"
          direction="row"
          justifyContent="space-between"
          paddingY={3}
        >
          <Stack alignItems="center" direction="row" spacing={1}>
            <Image height={10} width={10} src={logo} />
            <Heading color="primary.400" fontSize={(5, 15, 30)}>
              DeliverEat!
            </Heading>
          </Stack>
          <Stack alignItems="center" color="gray.500" direction="row">
            <Icon as={FaUser} w={6} h={6} />
            <Text fontWeight="500" fontSize={[5, 10, 15]}>
              {user?.name}
            </Text>
            <Stack
              alignItems="center"
              backgroundColor="gray.100"
              borderRadius={9999}
              cursor="pointer"
              paddingY={2}
              direciton="row"
              onClick={handleUserLogout}
              w={[6, 8, 10]}
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
