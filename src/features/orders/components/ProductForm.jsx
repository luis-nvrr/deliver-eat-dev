import PropTypes from 'prop-types';
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

const CFiBox = chakra(FiBox);
const CFiImage = chakra(FiImage);

const ProductForm = ({ register, errors, setValue, watch }) => {
  const image = watch('image');
  const [imgData, setImgData] = React.useState(null);

  const checkIfFilesAreTooBig = (file) => {
    if (file === null || file === undefined) {
      return false;
    }

    if (file.length === 0) {
      return true;
    }

    const size = file.size / 1024 / 1024;
    if (size < 5) {
      return false;
    }

    return true;
  };

  const checkIfFilesAreCorrectType = (file) => {
    if (file === null || file === undefined) {
      return false;
    }

    if (file.length === 0) {
      return true;
    }

    if (['image/jpeg'].includes(file.type)) {
      return true;
    }

    return false;
  };

  React.useEffect(() => {
    const previewImage = (file) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgData(reader.result);
      });

      if (checkIfFilesAreTooBig(file)) {
        setImgData(null);
        return;
      }

      if (!checkIfFilesAreCorrectType(file)) {
        setImgData(null);
        return;
      }

      reader.readAsDataURL(file);
    };

    if (image === null || image === undefined) {
      setImgData(null);
      return;
    }

    previewImage(image[0]);
  }, [image]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      spacing={6}
      position="relative"
      paddingY={3}
      marginBottom={2}
    >
      <Stack spacing={3}>
        <Heading color="gray.500" size="lg">
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
              ? 'El producto es requerido'
              : false}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={Boolean(errors?.image?.message)}
          errortext={errors?.image?.message}
        >
          <Button
            width="50%"
            colorScheme="orange"
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
        {imgData && (
          <Stack direction="row" position="relative">
            <Stack
              alignItems="center"
              backgroundColor="white"
              borderColor="primary.500"
              borderRadius={9999}
              borderWidth={1}
              color="primary.500"
              direction="row"
              fontSize="sm"
              fontWeight="500"
              justifyContent="center"
              paddingX={1}
              paddingY={1}
              position="absolute"
              right={-1}
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
                  setValue('image', undefined, {
                    shouldValidate: false,
                  });
                }}
              />
            </Stack>
            <AspectRatio width="400px" ratio={4 / 3}>
              <Image
                src={imgData}
                alt="Imagen subida"
                objectFit="cover"
              />
            </AspectRatio>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

ProductForm.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
};

export default ProductForm;
