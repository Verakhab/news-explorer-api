const rateLimit = require('express-rate-limit');
const { TOO_MANY_REQUEST } = require('../constants');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: TOO_MANY_REQUEST,
});
