import {
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  FormErrorMessage,
} from '@chakra-ui/react';
import React from 'react';
import { BsCalendarFill, BsClock } from 'react-icons/bs';
import PropTypes from 'prop-types';

const CBsCalendarFill = chakra(BsCalendarFill);
const CBsClock = chakra(BsClock);

const DeliveryDateForm = ({
  register,
  errors,
  watch,
  clearErrors,
  setValue,
}) => {
  const watchShippingMethod = watch('shippingMethod');

  const handleShippingMethodChange = (event) => {
    console.log(event.target.value);

    setValue('shippingDate', '', {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
    setValue('shippingTime', '', {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
    setValue('shippingMethod', event.target.value, {
      shouldValidate: true,
    });
    clearErrors('shippingDate');
    clearErrors('shippingTime');
  };

  return (
    <Stack spacing={3}>
      <Heading color="gray.500">Sobre el envío</Heading>
      <FormControl
        isInvalid={Boolean(errors?.shippingMethod?.message)}
        errortext={errors?.shippingMethod?.message}
        isRequired
      >
        <FormLabel>¿Cuando desea recibirlo?</FormLabel>
        <Select
          placeholder="Selecciona una opción"
          onChange={handleShippingMethodChange}
        >
          <option value="rapido">Lo antes posible</option>
          <option value="programado">Programar una fecha</option>
        </Select>
        <FormErrorMessage>
          {errors?.shippingMethod?.message
            ? 'Debe seleccionar una forma de envio'
            : false}
        </FormErrorMessage>
      </FormControl>
      {watchShippingMethod === 'programado' && (
        <Stack direction="column">
          <FormControl
            isInvalid={Boolean(errors?.shippingDate?.message)}
            errortext={errors?.shippingDate?.message}
            isRequired
          >
            <FormLabel>Fecha</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300">
                <CBsCalendarFill color="gray.500" />
              </InputLeftElement>
              <Input type="date" {...register('shippingDate')} />
            </InputGroup>
            <FormErrorMessage>
              {errors?.shippingDate?.message
                ? 'Debe ingresar una fecha de envio'
                : false}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={Boolean(errors?.shippingTime?.message)}
            errortext={errors?.shippingTime?.message}
            isRequired
          >
            <FormLabel>Hora</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300">
                <CBsClock color="gray.500" />
              </InputLeftElement>
              s
              <Input type="time" {...register('shippingTime')} />
            </InputGroup>
            <FormErrorMessage>
              {errors?.shippingTime?.message
                ? 'Debe ingresar una hora de entrega'
                : false}
            </FormErrorMessage>
          </FormControl>
        </Stack>
      )}
    </Stack>
  );
};

DeliveryDateForm.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default DeliveryDateForm;
