import PropTypes from 'prop-types';
import {
  AspectRatio,
  Button,
  chakra,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Textarea,
  FormErrorMessage,
} from '@chakra-ui/react';
import React from 'react';
import { FiMapPin } from 'react-icons/fi';

import Map from './Map';

const CFiMapPin = chakra(FiMapPin);

const DestinationForm = ({ register, errors }) => {
  const validCities = ['Córdoba', 'Mendoza'];
  const [isTypedAddress, setIsTypedAddress] = React.useState(true);
  const [address, setAddress] = React.useState();

  const handleShowMapClick = (event) => {
    console.log(event);
    setIsTypedAddress(!isTypedAddress);
  };

  return (
    <Stack direction="row" spacing={6}>
      <Stack direction="column">
        <Heading color="gray.500">Dirección del comercio</Heading>
        <Stack paddingEnd={40} paddingY={3}>
          <Button
            borderRadius="lg"
            variant="solid"
            colorScheme="orange"
            onClick={handleShowMapClick}
            size="md"
          >
            {isTypedAddress
              ? 'Seleccionar en el mapa'
              : 'Escribir dirección'}
          </Button>
        </Stack>
        {isTypedAddress && (
          <Stack>
            <FormControl
              isInvalid={Boolean(errors?.destinationStreet?.message)}
              errortext={errors?.destinationStreet?.message}
              isRequired
            >
              <FormLabel>Calle</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                >
                  <CFiMapPin color="gray.500" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Avenida falsa"
                  {...register('destinationStreet')}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors?.destinationStreet?.message
                  ? 'La calle es requerida'
                  : false}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={Boolean(errors?.destinationNumber?.message)}
              errortext={errors?.destinationNumber?.message}
              isRequired
            >
              <FormLabel>Numero</FormLabel>
              <Input
                type="number"
                placeholder="123"
                {...register('destinationNumber')}
              />
              <FormErrorMessage>
                {errors?.destinationNumber?.message
                  ? 'El número es requerido'
                  : false}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={Boolean(errors?.destinationCity?.message)}
              errortext={errors?.destinationCity?.message}
              isRequired
            >
              <FormLabel>Ciudad</FormLabel>
              <Select
                placeholder="Elija una ciudad"
                {...register('destinationCity')}
              >
                {validCities.map((city) => (
                  <option key={city}>{city}</option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors?.destinationCity?.message
                  ? 'La ciudad es requerido'
                  : false}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Referencia</FormLabel>
              <Textarea
                placeholder="Casa verde"
                size="md"
                resize="none"
                {...register('destinationReference')}
              />
              <Stack
                direction="row"
                alignItems="flex-end"
                justifyContent="flex-end"
              >
                <FormHelperText>max 250 caracteres</FormHelperText>
              </Stack>
            </FormControl>
          </Stack>
        )}

        {!isTypedAddress && (
          <Stack direction="column" width="md" paddingY={4}>
            <Input
              isDisabled
              variant="flushed"
              size="md"
              value={
                address?.city
                  ? ` ${address.city}`
                  : 'Seleccione un punto en el mapa'
              }
            />
            <AspectRatio ratio={16 / 9}>
              <Map setAddress={setAddress} />
            </AspectRatio>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

DestinationForm.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.func.isRequired,
};

export default DestinationForm;
