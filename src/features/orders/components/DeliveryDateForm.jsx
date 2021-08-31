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
import { addDays, setHours, setMinutes } from 'date-fns';

const DeliveryDateForm = ({
  errors,
  watch,
  clearErrors,
  setValue,
}) => {
  const watchShippingMethod = watch('shippingMethod');
  const [startDate, setStartDate] = React.useState(null);

  const handleShippingMethodChange = (event) => {
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
    <Stack paddingY={3} paddingX={6} spacing={3} marginBottom={2}>
      <Heading fontSize={[20, 22, 25]} color="gray.500">
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
              maxDate={addDays(new Date(), 5)}
              placeholderText="Ingrese una fecha"
              timeInputLabel="Hora:"
              dateFormat="dd/MM/yyyy h:mm aa"
              minTime={setHours(setMinutes(new Date(), 0), 8)}
              maxTime={setHours(setMinutes(new Date(), 30), 24)}
              showTimeSelect
              isClearable
              timeIntervals={15}
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
