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
  product: yup.string().required(),
  image: yup
    .mixed()
    .test('file-format', 'El formato soportado es .jpg', (value) =>
      checkIfFilesAreCorrectType(value),
    )
    .test('file-size', 'El tamaño máximo es 5MB', (value) =>
      checkIfFilesAreTooBig(value),
    ),
  originStreet: yup.string().required(),
  originNumber: yup.number().required(),
  originCity: yup.string().required(),
  originReference: yup.string().max(250),
  destinationStreet: yup.string().when('isTypedAddress', {
    is: 'true',
    then: yup.string().max(100).required(),
  }),
  destinationNumber: yup.string().when('isTypedAddress', {
    is: 'true',
    then: yup.string().required(),
  }),
  destinationCity: yup.string().when('isTypedAddress', {
    is: 'true',
    then: yup.string().max(100).required(),
  }),
  destinationReference: yup.string().when('isTypedAddress', {
    is: 'true',
    then: yup.string().max(250).required(),
  }),
  mapSelectionAddress: yup
    .string()
    .max(250)
    .when('destinationStreet', {
      is: '',
      then: yup.string().max(250).required(),
    }),
  paymentMethod: yup.string().max(100).required(),
  paymentAmount: yup.string().when('paymentMethod', {
    is: 'efectivo',
    then: yup
      .string()
      .test(
        'amount-validator',
        'Monto incorrecto',
        (value) => value > 0,
      )
      .required(),
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
      ) // Return true false based on validation
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
  shippingMethod: yup.string().max(100).required(),
  shippingDate: yup.string().when('shippingMethod', {
    is: 'programado',
    then: yup.string().required(),
  }),
});

export default schema;
