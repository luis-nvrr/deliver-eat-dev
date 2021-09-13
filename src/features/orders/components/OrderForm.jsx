import {
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Stack,
  useToast,
  Box,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './validationSchema';

import OriginForm from './OriginForm';

import Confirmation from './Confirmation';
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
    control,
    clearErrors,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  const toast = useToast();
  const confirmationRef = React.useRef(null);

  const [formData, setFormData] = React.useState(null);
  const [isClicked, setIsClicked] = React.useState(false);
  const [event, setEvent] = React.useState(null);

  const onSubmit = (data, e) => {
    setEvent(e);
    setFormData(data);
    setIsClicked(!isClicked);
    confirmationRef.current.scrollIntoView();
  };

  const handleCancelClick = () => {
    setIsClicked(!isClicked);
  };

  const handleConfirmationClick = () => {
    setIsClicked(!isClicked);
    event.target.reset();
    toast({
      position: 'top',
      title: 'Pedido registrado',
      description: 'Se ha ingresado correctamente un pedido',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const onError = () => {
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
          backgroundColor="whiteAlpha.900"
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
            <DestinationForm
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
            />
            <Divider />
            <PaymentForm
              register={register}
              errors={errors}
              watch={watch}
              clearErrors={clearErrors}
              setValue={setValue}
              control={control}
            />
            <Divider />
            <DeliveryDateForm
              control={control}
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
                colorScheme="primary"
              >
                Confirmar Pedido
              </Button>
            </Center>
          </form>
        </Stack>
        {isClicked && (
          <Flex
            alignItems="center"
            borderRadius="sm"
            height="100%"
            justifyContent="center"
            left={0}
            position="absolute"
            top={0}
            width="100%"
            zIndex={2}
          >
            <Box
              backgroundColor="primary.500"
              borderRadius="sm"
              height="100%"
              left={0}
              opacity={0.9}
              position="absolute"
              top={0}
              width="100%"
            />
            <Stack
              fontSize="2xl"
              fontWeight="bold"
              spacing={6}
              zIndex={3}
              ref={confirmationRef}
            >
              <Confirmation
                data={formData}
                handleConfimationClick={handleConfirmationClick}
                handleCancelClick={handleCancelClick}
              />
            </Stack>
          </Flex>
        )}
      </Center>
    </Flex>
  );
};

export default OrderForm;
