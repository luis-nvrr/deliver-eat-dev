import {
  FormControl,
  FormLabel,
  Heading,
  Select,
  Stack,
  FormErrorMessage,
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addMonths } from 'date-fns';

const DeliveryDateForm = ({
  errors,
  watch,
  clearErrors,
  setValue,
}) => {
  const watchShippingMethod = watch('shippingMethod');
  const watchShippingDate = watch('shippingDate');
  const [startDate, setStartDate] = React.useState(null);
  console.log(watchShippingDate);

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

  const handleDateChange = (date) => {
    setStartDate(date);
    setValue('shippingDate', date, { shouldValidate: true });
  };

  return (
    <Stack paddingY={3} marginBottom={2}>
      <Heading color="gray.500" size="lg">
        Sobre el envío
      </Heading>
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
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              minDate={new Date()}
              maxDate={addMonths(new Date(), 5)}
              placeholderText="Ingrese una fecha"
              timeInputLabel="Hora:"
              dateFormat="dd/MM/yyyy h:mm aa"
              showTimeInput
              isClearable
            />
            <FormErrorMessage>
              {errors?.shippingDate?.message
                ? 'Debe ingresar una fecha de envio'
                : false}
            </FormErrorMessage>
          </FormControl>
        </Stack>
      )}
    </Stack>
  );
};

DeliveryDateForm.propTypes = {
  errors: PropTypes.object.isRequired,
  watch: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default DeliveryDateForm;
