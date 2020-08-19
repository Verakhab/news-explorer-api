const ConflictRequest = require('./conflicting-request-err');
const Forbidden = require('./forbidden-err');
const NotFoundError = require('./not-found-err');
const Unauthorized = require('./unauthorized-err');
const BadRequest = require('./bad-request-err');

module.exports = {
  ConflictRequest,
  Forbidden,
  NotFoundError,
  Unauthorized,
  BadRequest,
};
