export const errorHandler = (statusCode, mesage) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = mesage;
  return error;
};
