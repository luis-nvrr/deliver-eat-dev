import { Flex, Heading, Stack } from '@chakra-ui/react';
import React from 'react';

import header from '~/assets/header.png';
import OrderForm from '~/features/orders/components/OrderForm';

const HomeScreen = () => (
  <Stack flex={1} spacing={6} direction="column">
    <Flex
      alignItems="center"
      backgroundImage={`url(${header})`}
      backgroundSize="cover"
      borderRadius="md"
      justifyContent="center"
      minHeight={64}
      paddingX={6}
      paddingY={6}
    >
      <Heading color="primary.500" fontSize={[20, 30, 40]}>
        ¡Pedí lo que quieras!
      </Heading>
    </Flex>
    <OrderForm />
  </Stack>
);

export default HomeScreen;
