const { INTERNAL } = require('../constants');

module.exports = (err, req, res, next) => {
  if (err.statusCode === undefined) {
    const {
      statusCode = '500',
      message = INTERNAL,
    } = err;
    return res
      .status(statusCode)
      .send({ Message: message });
  }
  next();
  return res
    .status(err.statusCode)
    .send({ message: err.message });
};
