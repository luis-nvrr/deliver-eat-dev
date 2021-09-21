/* eslint-disable react/forbid-prop-types */
import {
  AspectRatio,
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { FcCancel } from 'react-icons/fc';
import { FiBox, FiImage } from 'react-icons/fi';
import { useFormContext } from 'react-hook-form';

const CFiBox = chakra(FiBox);
const CFiImage = chakra(FiImage);

const ProductForm = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const image = watch('image');

  return (
    <Stack
      direction="column"
      spacing={3}
      position="relative"
      paddingY={3}
      paddingX={6}
      marginBottom={2}
    >
      <Heading color="gray.500" fontSize={[20, 22, 25]}>
        Sobre el producto
      </Heading>
      <FormControl
        isInvalid={Boolean(errors?.product?.message)}
        errortext={errors?.product?.message}
        isRequired
      >
        <FormLabel>Descripción</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <CFiBox color="gray.500" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Reloj de pared"
            {...register('product')}
          />
        </InputGroup>
        <FormErrorMessage>
          {errors?.product?.message
            ? errors?.product?.message
            : false}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={Boolean(errors?.image?.message)}
        errortext={errors?.image?.message}
      >
        <Button
          colorScheme="primary"
          leftIcon={<Icon as={CFiImage} />}
        >
          <input
            type="file"
            multiple={false}
            style={{
              opacity: 0,
              width: '100%',
              height: '100%',
              position: 'absolute',
              cursor: 'pointer',
            }}
            accept=".jpg"
            {...register('image')}
          />
          Subir foto
        </Button>
        <FormErrorMessage>
          {errors?.image?.message ? errors?.image?.message : false}
        </FormErrorMessage>
      </FormControl>
      {image?.length > 0 && !errors.image?.message && (
        <Stack direction="row" position="relative">
          <Stack
            alignItems="center"
            backgroundColor="white"
            borderColor="primary.500"
            borderRadius={999}
            borderWidth={2}
            color="primary.500"
            direction="row"
            fontSize="sm"
            fontWeight="500"
            justifyContent="center"
            paddingX={1}
            paddingY={1}
            position="absolute"
            right={[4, 20]}
            spacing={2}
            top={-1}
            zIndex={1}
          >
            <IconButton
              aria-label="Borrar foto"
              icon={<FcCancel />}
              w={5}
              h={5}
              onClick={() => {
                setValue('image', null, { shouldValidate: false });
              }}
            />
          </Stack>
          <AspectRatio width={['250px', '400px']} ratio={4 / 3}>
            <Image
              id="image"
              src={URL.createObjectURL(image[0])}
              alt="Imagen subida"
              objectFit="cover"
            />
          </AspectRatio>
        </Stack>
      )}
    </Stack>
  );
};

export default ProductForm;
