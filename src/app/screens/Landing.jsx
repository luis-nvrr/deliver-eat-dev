import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate('/app');
  };

  return (
    <>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="#ffcfdf"
        bgGradient="linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%);"
        justifyContent="center"
        alignItems="center"
      >
        <Center paddingY={6} maxWidth="6xl">
          <Stack
            height="100%"
            alignItems="center"
            direction="column"
            justifyContent="center"
          >
            <Heading as="h1" mb={6} size="2xl" color="blackAlpha">
              DeliverEat!
            </Heading>
            <Stack
              alignItems="center"
              direction="column"
              justifyContent="space-between"
            >
              <Box
                mb={3}
                borderRadius="xl"
                boxShadow="md"
                padding={6}
                position="relative"
                backgroundColor="whiteAlpha.800"
                maxWidth="70%"
              >
                <Text
                  fontSize="xl"
                  alignItems="center"
                  color="blackAlpha"
                  justifyContent="center"
                >
                  Aplicación desarrollada para la cátedra de ISW,
                  UTN-FRC.
                </Text>
                <Divider />
                <Stack
                  alignItems="flex-end"
                  direction="row"
                  justifyContent="flex-end"
                  marginTop="2"
                >
                  <Text fontSize="md" color="gray.500">
                    <Link
                      href="https://github.com/luis-nvrr"
                      isExternal
                    >
                      Ver en Github <ExternalLinkIcon mx="2px" />
                    </Link>
                  </Text>
                </Stack>
              </Box>
              <Button colorScheme="orange" onClick={handleStart}>
                Pedir
              </Button>
            </Stack>
          </Stack>
        </Center>
      </Flex>
    </>
  );
};

export default Landing;
