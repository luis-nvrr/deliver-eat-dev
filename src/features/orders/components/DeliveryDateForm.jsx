/* eslint-disable react/forbid-prop-types */
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
import { Controller } from 'react-hook-form';

const DeliveryDateForm = ({
  errors,
  watch,
  clearErrors,
  setValue,
  control,
}) => {
  const watchShippingMethod = watch('shippingMethod');

  const handleShippingMethodChange = (event) => {
    setValue('shippingDate', '', {
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
          placeholder="Seleccione una forma de envío"
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
            <Controller
              control={control}
              name="shippingDate"
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  minDate={new Date()}
                  maxDate={addDays(new Date(), 7)}
                  placeholderText="Ingrese una fecha"
                  timeInputLabel="Hora:"
                  dateFormat="dd/MM/yyyy h:mm aa"
                  minTime={setHours(setMinutes(new Date(), 0), 8)}
                  maxTime={setHours(setMinutes(new Date(), 59), 23)}
                  showTimeSelect
                  isClearable
                  timeIntervals={1}
                />
              )}
            />
            <FormErrorMessage>
              {errors?.shippingDate?.message
                ? errors?.shippingDate?.message
                : false}
            </FormErrorMessage>
          </FormControl>
        </Stack>
      )}
    </Stack>
  );
};

DeliveryDateForm.propTypes = {
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  watch: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default DeliveryDateForm;
