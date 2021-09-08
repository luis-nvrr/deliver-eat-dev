import React from 'react';

import {
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Stack,
  useToast,
  Text,
  Box,
} from '@chakra-ui/react';

const Confirmation = ({ data, handleConfimationClick }) => (
  <Stack
    spacing={1}
    paddingY={3}
    paddingX={6}
    fontSize={[20, 22, 25]}
  >
    <Heading mb={3} color="primary.200">
      Confirmación
    </Heading>
    <Text color="primary.200">Descripción</Text>
    <Text>{data.product}</Text>
    <Divider />
    <Stack direction="column">
      <Text color="primary.200">Dirección de entrega</Text>
      <Text>
        {data.originStreet} {data.originNumber}, {data.originCity}
      </Text>
      {data.originReference && (
        <Stack>
          <Text color="primary.200">Referencia</Text>
          <Text>{data.originReference}</Text>
        </Stack>
      )}
    </Stack>
    <Divider />
    <Stack direction="column">
      <Text color="primary.200">Dirección del comercio</Text>
      <Text>
        {data.destinationStreet} {data.destinationNumber},{' '}
        {data.destinationCity}{' '}
      </Text>
      {data.destinationReference && (
        <Stack>
          <Text color="primary.200">Referencia</Text>
          <Text>{data.destinationReference}</Text>
        </Stack>
      )}
    </Stack>
    <Divider />
    <Stack direction="column">
      {data.paymentMethod === 'visa' && (
        <Stack>
          <Text color="primary.200">Pago con tarjeta Visa</Text>
          <Text color="primary.200">Tarjeta</Text>
          <Text>{data.cardNumber}</Text>
          <Text color="primary.200">Titular</Text>
          <Text>{data.cardOwner}</Text>
          <Text color="primary.200">Fecha de vencimiento</Text>
          <Text>
            {new Date(data.expirationDate).getDate()}/
            {new Date(data.expirationDate).getMonth()}/
            {new Date(data.expirationDate).getUTCFullYear()}
          </Text>
          <Text color="primary.200">CVC</Text>
          <Text>{data.cvc}</Text>
        </Stack>
      )}
      {data.paymentMethod === 'efectivo' && (
        <Stack>
          <Text color="primary.200">Monto pagado</Text>
          <Text>${data.paymentAmount}</Text>{' '}
        </Stack>
      )}
    </Stack>
    <Divider />
    <Stack direction="column">
      <Text color="primary.200">Metodo de envio</Text>
      {data.shippingMethod === 'programado' && (
        <Stack>
          <Text>Programado</Text>
          <Text color="primary.200">Fecha de Envio</Text>
          <Text>
            {new Date(data.shippingDate).getDate()}/
            {new Date(data.shippingDate).getMonth()}/
            {new Date(data.shippingDate).getUTCFullYear()}
          </Text>
          <Text>
            {new Date(data.shippingDate).getHours()}:
            {new Date(data.shippingDate).getMinutes()}
          </Text>
        </Stack>
      )}
      {data.shippingMethod === 'rapido' && (
        <Stack>
          <Text borderBottomColor="white">Lo antes posible</Text>
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

export default Confirmation;
