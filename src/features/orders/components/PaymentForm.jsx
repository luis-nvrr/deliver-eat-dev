import PropTypes from 'prop-types';
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
import { BsCalendarFill, BsFillPersonFill } from 'react-icons/bs';
import { FaCcVisa } from 'react-icons/fa';
import { ImKey } from 'react-icons/im';
import { SiCashapp } from 'react-icons/si';

const CSiCashapp = chakra(SiCashapp);
const CFaCcVisa = chakra(FaCcVisa);
const CBsFillPersonFill = chakra(BsFillPersonFill);
const CBsCalendarFill = chakra(BsCalendarFill);
const CImKey = chakra(ImKey);

const PaymentForm = ({
  register,
  errors,
  watch,
  clearErrors,
  setValue,
}) => {
  const watchPaymentMethod = watch('paymentMethod');

  const handlePaymentMethodChange = (event) => {
    console.log(event.target.value);
    setValue('paymentAmount', 0, {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
    setValue('paymentMethod', '', {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });

    setValue('cardNumber', '', {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
    setValue('cardOwner', '', {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
    setValue('expirationDate', '', {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
    setValue('cvc', 0, {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
    clearErrors('paymentAmount');
    clearErrors('paymentMethod');
    clearErrors('cardNumber');
    clearErrors('cardOwner');
    clearErrors('expirationDate');
    clearErrors('cvc');
    setValue('paymentMethod', event.target.value, {
      shouldValidate: true,
    });
  };

  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <Heading color="gray.500">Sobre el pago</Heading>
      <FormControl
        isInvalid={Boolean(errors?.paymentMethod?.message)}
        errortext={errors?.paymentMethod?.message}
        isRequired
      >
        <FormLabel>Forma de pago</FormLabel>
        <Select
          placeholder="Seleccione un método de pago"
          onChange={handlePaymentMethodChange}
        >
          <option value="efectivo">Efectivo</option>
          <option value="visa">Visa</option>
        </Select>
        <FormErrorMessage>
          {errors?.paymentMethod?.message
            ? 'Debe ingresar una forma de pago'
            : false}
        </FormErrorMessage>
      </FormControl>
      {watchPaymentMethod === 'efectivo' && (
        <FormControl
          isInvalid={Boolean(errors?.paymentAmount?.message)}
          errortext={errors?.paymentAmount?.message}
          isRequired
        >
          <FormLabel>¿Con cuánto paga?</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.300">
              <CSiCashapp color="gray.500" />
            </InputLeftElement>
            <Input
              type="number"
              placeholder="100"
              {...register('paymentAmount')}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors?.paymentAmount?.message
              ? 'Debe ingresar un monto'
              : false}
          </FormErrorMessage>
        </FormControl>
      )}
      {watchPaymentMethod === 'visa' && (
        <Stack direction="column">
          <FormControl
            isInvalid={Boolean(errors?.cardNumber?.message)}
            errortext={errors?.cardNumber?.message}
            isRequired
          >
            <FormLabel>Numero de tarjeta</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300">
                <CFaCcVisa color="gray.500" />
              </InputLeftElement>
              <Input
                type="number"
                placeholder="1111 2222 3333 4444"
                {...register('cardNumber')}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors?.cardNumber?.message
                ? 'Ingrese un número válido'
                : false}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={Boolean(errors?.cardOwner?.message)}
            errortext={errors?.cardOwner?.message}
            isRequired
          >
            <FormLabel>Nombre completo de titular</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300">
                <CBsFillPersonFill color="gray.500" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="John Kite"
                {...register('cardOwner')}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors?.cardOwner?.message
                ? 'Debe ingresar el nombre del titular'
                : false}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={Boolean(errors?.expirationDate?.message)}
            errortext={errors?.expirationDate?.message}
            isRequired
          >
            <FormLabel>Fecha de vencimiento</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300">
                <CBsCalendarFill color="gray.500" />
              </InputLeftElement>
              <Input type="date" {...register('expirationDate')} />
            </InputGroup>
            <FormErrorMessage>
              {errors?.expirationDate?.message
                ? 'Debe ingresar la fecha de vencimiento'
                : false}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={Boolean(errors?.cvc?.message)}
            errortext={errors?.cvc?.message}
            isRequired
          >
            <FormLabel>CVC</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300">
                <CImKey color="gray.500" />
              </InputLeftElement>
              <Input
                type="number"
                placeholder="999"
                {...register('cvc')}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors?.cvc?.message
                ? 'Debe ingresar el código CVC'
                : false}
            </FormErrorMessage>
          </FormControl>
        </Stack>
      )}
    </Stack>
  );
};

PaymentForm.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default PaymentForm;