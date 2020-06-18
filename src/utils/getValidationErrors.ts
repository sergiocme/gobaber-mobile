import { ValidationError } from 'yup';

interface Errors {
  [asdasd: string]: string;
}

export default function getValidationErrors(errors: ValidationError): Errors {
  const validationErrors: Errors = {};
  errors.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });
  return validationErrors;
}
