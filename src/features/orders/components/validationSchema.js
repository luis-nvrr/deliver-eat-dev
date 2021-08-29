import * as yup from 'yup';
import valid from 'card-validator';

const checkIfFilesAreTooBig = (file) => {
  console.log('validando', file);
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
  console.log('validando', file);
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

const dateRegex = /^\d{4}[./-]\d{2}[./-]\d{2}$/;

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
  destinationStreet: yup.string().max(100).required(),
  destinationNumber: yup.number().required(),
  destinationCity: yup.string().required(),
  destinationReference: yup.string().max(250),
  paymentMethod: yup.string().max(100).required(),
  paymentAmount: yup.number().when('paymentMethod', {
    is: 'efectivo',
    then: yup.number().required(),
  }),
  cardNumber: yup.string().when('paymentMethod', {
    is: 'visa',
    then: yup
      .string()
      .test(
        'test-number', // This is used internally by yup
        'Credit Card number is invalid', // Validation message
        (value) => valid.number(value).isValid,
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
  cvc: yup.number().when('paymentMethod', {
    is: 'visa',
    then: yup.number().required(),
  }),
  shippingMethod: yup.string().max(100).required(),
  shippingDate: yup.string().when('shippingMethod', {
    is: 'programado',
    then: yup.string().required(),
  }),
  shippingTime: yup.string().when('shippingMethod', {
    is: 'programado',
    then: yup.string().required(),
  }),
});

export default schema;
