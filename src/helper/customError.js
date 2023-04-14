const customError = (status, massage) => {
  const error = new Error(massage);
  error.status = status;
  return error;
}

module.exports = customError;