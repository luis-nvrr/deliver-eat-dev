/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import {
  Button,
  Divider,
  Heading,
  Stack,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { FcCancel } from 'react-icons/fc';

const Confirmation = ({
  data,
  handleConfimationClick,
  handleCancelClick,
}) => (
  <Stack
    fontSize={[20, 22, 25]}
    flexDirection="column"
    spacing={2}
    backgroundColor="whiteAlpha.900"
    boxShadow="lg"
    borderRadius="3xl"
    paddingX={[3, 10, 20]}
    paddingY={10}
    position="relative"
  >
    <Stack
      alignItems="center"
      backgroundColor="whiteAlpha.200"
      borderColor="primary.500"
      borderRadius={9999}
      color="primary.500"
      direction="row"
      fontSize="sm"
      fontWeight="500"
      justifyContent="center"
      paddingX={1}
      paddingY={1}
      position="absolute"
      right={1}
      top={0}
      spacing={2}
      zIndex={3}
    >
      <IconButton
        aria-label="Cancelar"
        icon={<FcCancel />}
        w={8}
        h={8}
        onClick={handleCancelClick}
      />
    </Stack>
    <Heading mb={3} color="primary.400">
      Confirmación
    </Heading>
    <Text color="primary.400">Producto</Text>
    <Text fontSize={[17, 17, 20]}>{data.product}</Text>
    <Divider variant="dashed" />
    <Stack direction="column">
      <Text color="primary.400">Dirección de entrega</Text>
      <Text fontSize={[17, 17, 20]}>
        {data.originStreet} {data.originNumber}, {data.originCity}
      </Text>
      {data.originReference && (
        <Stack>
          <Text color="primary.400">Referencia</Text>
          <Text fontSize={[17, 17, 20]}>{data.originReference}</Text>
        </Stack>
      )}
    </Stack>
    <Divider />
    <Stack direction="column">
      <Text color="primary.400">Dirección del comercio</Text>
      <Text fontSize={[17, 17, 20]}>
        {data.destinationStreet} {data.destinationNumber},{' '}
        {data.destinationCity}{' '}
      </Text>
      {data.destinationReference && (
        <Stack>
          <Text color="primary.400">Referencia</Text>
          <Text fontSize={[17, 17, 20]}>
            {data.destinationReference}
          </Text>
        </Stack>
      )}
    </Stack>
    <Divider />
    <Stack direction="column">
      {data.paymentMethod === 'visa' && (
        <Stack>
          <Text color="primary.400">Pago con tarjeta Visa</Text>
          <Text color="primary.400">Tarjeta</Text>
          <Text fontSize={[17, 17, 20]}>{data.cardNumber}</Text>
          <Text color="primary.400">Titular</Text>
          <Text fontSize={[17, 17, 20]}>{data.cardOwner}</Text>
          <Text color="primary.400">Fecha de vencimiento</Text>
          <Text fontSize={[17, 17, 20]}>
            {new Date(data.expirationDate).getMonth()}/
            {new Date(data.expirationDate).getUTCFullYear()}
          </Text>
          <Text color="primary.400">CVC</Text>
          <Text fontSize={[17, 17, 20]}>{data.cvc}</Text>
        </Stack>
      )}
      {data.paymentMethod === 'efectivo' && (
        <Stack>
          <Text color="primary.400">Monto pagado</Text>
          <Text fontSize={[17, 17, 20]}>
            ${data.paymentAmount}
          </Text>{' '}
        </Stack>
      )}
    </Stack>
    <Divider />
    <Stack direction="column">
      <Text color="primary.400">Método de envio</Text>
      {data.shippingMethod === 'programado' && (
        <Stack>
          <Text fontSize={[17, 17, 20]}>Programado</Text>
          <Text color="primary.400">Fecha de Envio</Text>
          <Text fontSize={[17, 17, 20]}>
            {new Date(data.shippingDate).getDate()}/
            {new Date(data.shippingDate).getMonth()}/
            {new Date(data.shippingDate).getUTCFullYear()}
          </Text>
          <Text fontSize={[17, 17, 20]}>
            {new Date(data.shippingDate).getHours()}:
            {new Date(data.shippingDate).getMinutes()}
          </Text>
        </Stack>
      )}
      {data.shippingMethod === 'rapido' && (
        <Stack>
          <Text fontSize={[17, 17, 20]}>Lo antes posible</Text>
        </Stack>
      )}
    </Stack>
    <Button
      borderRadius="lg"
      variant="solid"
      colorScheme="button"
      onClick={handleConfimationClick}
    >
      Confirmar
    </Button>
  </Stack>
);

Confirmation.propTypes = {
  data: PropTypes.object.isRequired,
  handleConfimationClick: PropTypes.func.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
};

export default Confirmation;
