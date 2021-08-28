import {
  Button,
  Center,
  Divider,
  Grid,
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
    reset,
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
    <Grid
      gap={6}
      templateColums="repeat(auto-fill, minmax(256px, 1fr))"
      width="100%"
    >
      <Stack
        spacing={6}
        padding={8}
        backgroundColor="whiteAlpha.500"
        boxShadow="lg"
        borderRadius="xl"
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Heading color="black.500">Registrar nuevo pedido</Heading>
          <Divider />
          <ProductForm
            register={register}
            errors={errors}
            setValue={setValue}
            clearErrors={clearErrors}
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
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            clearErrors={clearErrors}
            reset={reset}
          />
          <Center>
            <Button
              borderRadius="lg"
              type="submit"
              variant="solid"
              colorScheme="orange"
              width="xs"
            >
              Confirmar Pedido
            </Button>
          </Center>
        </form>
      </Stack>
    </Grid>
  );
};

export default OrderForm;
