const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  if (isCelebrateError(err)) {
    statusCode = 400;
    message = 'Validation error';
  }

  res.status(statusCode).send({
    message: statusCode === 500 ? 'An unexpected server error occurred' : message,
  });
next();
};
