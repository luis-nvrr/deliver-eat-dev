import PropTypes from 'prop-types';
import {
  AspectRatio,
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

const DestinationForm = ({
  register,
  errors,
  setValue,
  clearErrors,
  watch,
}) => {
  const validCities = ['Córdoba', 'Mendoza'];
  const destinationStreet = watch('destinationStreet');
  const isTypedAddress = !!destinationStreet;
  const watchMapSelectionAddress = watch('mapSelectionAddress');
  console.log(isTypedAddress);

  React.useEffect(() => {
    if (isTypedAddress) {
      setValue('mapSelectionAddress', '', { shouldValidate: false });
      clearErrors('mapSelectionAddress');
    } else {
      setValue('destinationStreet', '', { shouldValidate: false });
      setValue('destinationNumber', '', { shouldValidate: false });
      setValue('destinationCity', '', { shouldValidate: false });
      setValue('destinationReference', '', {
        shouldValidate: false,
      });

      clearErrors('destinationStreet');
      clearErrors('destinationNumber');
      clearErrors('destinationCity');
      clearErrors('destinationReference');
    }
    setValue('isTypedAddress', isTypedAddress, {
      shouldValidate: true,
    });
  }, [isTypedAddress]);

  return (
    <Stack direction="column" paddingY={3} paddingX={6} spacing={3}>
      <Heading fontSize={[20, 22, 25]} color="gray.500">
        Dirección del comercio
      </Heading>
      <Stack paddingY={4}>
        <FormControl
          isInvalid={Boolean(errors?.destinationStreet?.message)}
          errortext={errors?.destinationStreet?.message}
          isRequired={isTypedAddress}
        >
          <FormLabel>Calle</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.300">
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
          isRequired={isTypedAddress}
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
          isRequired={isTypedAddress}
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
              ? 'La ciudad es requerida'
              : false}
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Referencia</FormLabel>
          <Textarea
            placeholder="Casa verde"
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

      <Stack direction="column" paddingY={3}>
        <FormControl
          isInvalid={Boolean(errors?.mapSelectionAddress?.message)}
          errortext={errors?.mapSelectionAddress?.message}
        >
          <FormLabel>Seleccione un punto en el mapa</FormLabel>
          <Input isReadOnly value={watchMapSelectionAddress || ''} />
          <FormErrorMessage>
            {errors?.mapSelectionAddress?.message
              ? 'Debe seleccionar un punto en el mapa o escribir una dirección arriba'
              : false}
          </FormErrorMessage>
        </FormControl>
        <AspectRatio ratio={16 / 9} w={[280, 400, 500]}>
          <Map
            setValue={setValue}
            watch={watch}
            clearErrors={clearErrors}
          />
        </AspectRatio>
      </Stack>
    </Stack>
  );
};

DestinationForm.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
};

export default DestinationForm;
