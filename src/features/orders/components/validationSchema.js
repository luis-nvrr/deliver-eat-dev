/* eslint-disable no-param-reassign */
import * as yup from 'yup';
import valid from 'card-validator';

const checkIfFilesAreTooBig = (file) => {
  if (file === null || file === undefined) {
    return true;
  }

  if (file.length === 0) {
    return true;
  }

  const size = file[0].size / 1024 / 1024;
  if (size < 5) {
    return true;
  }

  return false;
};

const checkIfFilesAreCorrectType = (file) => {
  if (file === null || file === undefined) {
    return true;
  }

  if (file.length === 0) {
    return true;
  }

  if (['image/jpeg'].includes(file[0].type)) {
    return true;
  }

  return false;
};

const schema = yup.object().shape({
  product: yup
    .string()
    .min(5, 'El mínimo es 5 caracteres')
    .max(280, 'El máximo es de 280 caracteres')
    .required(),
  image: yup
    .mixed()
    .test('file-format', 'El formato soportado es .jpg', (value) =>
      checkIfFilesAreCorrectType(value),
    )
    .test('file-size', 'El tamaño máximo es 5MB', (value) =>
      checkIfFilesAreTooBig(value),
    ),
  originStreet: yup
    .string()
    .min(5, 'El mínimo es 5 caracteres')
    .max(280, 'El máximo es de 280 caracteres')
    .required(),
  originNumber: yup
    .number()
    .typeError('Debe especificar un número')
    .positive('El número tiene que ser positivo')
    .required(),
  originCity: yup
    .string()
    .max(
      280,
      'La ciudad debe tener una longitud máxima de 280 caracteres',
    )
    .required('La ciudad es requerida')
    .when('destinationCity', {
      is: (destinationCity) => destinationCity,
      then: yup
        .string()
        .max(280)
        .test(
          'same-city',
          'Las ciudades tienen que ser iguales',
          function testCity(value) {
            console.log(this.options.context.destinationCity);
            return value === this.options.context.destinationCity;
          },
        ),
    }),
  originReference: yup.string().max(280),
  destinationStreet: yup.string().when('mapSelectionAddresss', {
    is: (mapSelectionAddress) => mapSelectionAddress,
    then: yup
      .string()
      .min(5, 'El mínimo es 5 caracteres')
      .max(280, 'El máximo es de 280 caracteres')
      .required(),
  }),
  destinationNumber: yup
    .string()
    .optional()
    .when('destinationStreet', {
      is: (destinatinoStreet) => destinatinoStreet,
      then: yup
        .number()
        .typeError('Debe especificar un número')
        .positive('El número tiene que ser positivo')
        .required(),
    }),
  destinationCity: yup.string().when('destinationStreet', {
    is: (destinatinoStreet) => destinatinoStreet,
    then: yup
      .string()
      .max(280, 'El máximo es de 280 caracteres')
      .required('La ciudad es requerida'),
  }),
  destinationReference: yup
    .string()
    .max(280, 'El máximo es de 280 caracteres'),
  mapSelectionAddress: yup
    .string()
    .max(280, 'El máximo es de 280 caracteres')
    .when('destinationStreet', {
      is: '',
      then: yup
        .string()
        .max(280, 'El máximo es de 280 caracteres')
        .required(),
    }),
  paymentMethod: yup
    .string()
    .max(280, 'El máximo es de 280 caracteres')
    .required(),
  paymentAmount: yup
    .number()
    .typeError('Debe ingresar un monto')
    .when('paymentMethod', {
      is: 'efectivo',
      then: yup
        .number()
        .typeError('Debe ingresar un monto')
        .positive('El monto tiene que ser positivo')
        .required('Debe ingresar un monto'),
    }),
  cardNumber: yup.string().when('paymentMethod', {
    is: 'visa',
    then: yup
      .string()
      .test(
        'test-number', // This is used internally by yup
        'Credit Card number is invalid', // Validation message
        (value) => {
          const number = valid.number(value);
          console.log('validando', number);
          if (!number.card) return false;
          return (
            number.card.type === 'visa' && number.isPotentiallyValid
          );
        },
      )
      .required(),
  }),
  cardOwner: yup.string().when('paymentMethod', {
    is: 'visa',
    then: yup.string().max(100).required(),
  }),
  expirationDate: yup.string().when('paymentMethod', {
    is: 'visa',
    then: yup.string().required(),
  }),
  cvc: yup.string().when('paymentMethod', {
    is: 'visa',
    then: yup
      .string()
      .test(
        'test-cvv',
        'CVV is invalid',
        (value) => valid.cvv(value).isValid,
      )
      .required(),
  }),
  shippingMethod: yup.string().max(280).required(),
  shippingDate: yup.string().when('shippingMethod', {
    is: 'programado',
    then: yup.string().max(280).required(),
  }),
});

export default schema;
