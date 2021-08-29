import {
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Stack,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './validationSchema';

import OriginForm from './OriginForm';

import ProductForm from './ProductForm';
import DestinationForm from './DestinationForm';
import DeliveryDateForm from './DeliveryDateForm';
import PaymentForm from './PaymentForm';

const OrderForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  const toast = useToast();

  const onSubmit = ({ data, e }) => {
    console.log(data, e);
    toast({
      position: 'top',
      title: 'Pedido registrado',
      description: 'Se ha ingresado correctamente un pedido',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    // Reset();
  };

  const onError = ({ formErrors, e }) => {
    console.log(formErrors, e);
    toast({
      position: 'top',
      title: 'Ha ocurrido un error',
      description: 'Hay datos incorrectos',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      maxWidth="6xl"
    >
      <Center paddingY={3}>
        <Stack
          flexDirection="column"
          spacing={6}
          backgroundColor="whiteAlpha.500"
          boxShadow="lg"
          borderRadius="3xl"
          paddingX={[3, 10, 20]}
          paddingY={10}
        >
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Heading
              paddingX={6}
              fontSize={[25, 30, 30]}
              color="black.500"
            >
              Pedido de lo que sea
            </Heading>
            <ProductForm
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
            />
            <Divider />
            <OriginForm register={register} errors={errors} />
            <Divider />
            <DestinationForm register={register} errors={errors} />
            <Divider />
            <PaymentForm
              register={register}
              errors={errors}
              watch={watch}
              clearErrors={clearErrors}
              setValue={setValue}
            />
            <Divider />
            <DeliveryDateForm
              errors={errors}
              watch={watch}
              setValue={setValue}
              clearErrors={clearErrors}
            />
            <Center>
              <Button
                borderRadius="lg"
                type="submit"
                variant="solid"
                colorScheme="orange"
              >
                Confirmar Pedido
              </Button>
            </Center>
          </form>
        </Stack>
      </Center>
    </Flex>
  );
};

export default OrderForm;
