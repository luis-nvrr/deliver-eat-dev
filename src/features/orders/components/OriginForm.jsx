import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Textarea,
  chakra,
} from '@chakra-ui/react';
import React from 'react';

import { FiMapPin } from 'react-icons/fi';
import PropTypes from 'prop-types';

const CFiMapPin = chakra(FiMapPin);

const OriginForm = ({ register, errors }) => (
  <Stack
    direction="column"
    paddingY={3}
    paddingX={6}
    marginBottom={2}
  >
    <Heading color="gray.500" fontSize={[20, 22, 25]}>
      Dirección de entrega
    </Heading>
    <FormControl
      isInvalid={Boolean(errors?.originStreet?.message)}
      errortext={errors?.originStreet?.message}
      isRequired
    >
      <FormLabel>Calle</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.300">
          <CFiMapPin color="gray.500" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Avenida siempre viva"
          {...register('originStreet')}
        />
      </InputGroup>
      <FormErrorMessage>
        {errors?.originStreet?.message
          ? 'La calle es requerida'
          : false}
      </FormErrorMessage>
    </FormControl>
    <FormControl
      isInvalid={Boolean(errors?.originNumber?.message)}
      errortext={errors?.originNumber?.message}
      isRequired
    >
      <FormLabel>Numero</FormLabel>
      <Input
        type="number"
        placeholder="521"
        {...register('originNumber')}
      />
      <FormErrorMessage>
        {errors?.originNumber?.message
          ? 'El número es requerido'
          : false}
      </FormErrorMessage>
    </FormControl>
    <FormControl
      isInvalid={Boolean(errors?.originCity?.message)}
      errortext={errors?.originCity?.message}
      isRequired
    >
      <FormLabel>Ciudad</FormLabel>
      <Select
        placeholder="Elija una ciudad"
        {...register('originCity')}
      >
        <option>Mendoza</option>
        <option>Buenos Aires</option>
        <option>Córdoba</option>
      </Select>
      <FormErrorMessage>
        {errors?.originCity?.message
          ? 'La ciudad es requerida'
          : false}
      </FormErrorMessage>
    </FormControl>
    <FormControl>
      <FormLabel>Referencia</FormLabel>
      <Textarea
        placeholder="Tocar timbre!"
        size="md"
        resize="none"
        {...register('originReference')}
      />
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="flex-end"
      >
        <FormHelperText>aqui se puede poner un maximo</FormHelperText>
      </Stack>
    </FormControl>
  </Stack>
);

OriginForm.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default OriginForm;
