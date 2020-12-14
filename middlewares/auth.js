const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors');
const { UNAUTHORIZED } = require('../constants');
const { SECRET_STRING } = require('../config');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) throw new Unauthorized(UNAUTHORIZED);
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = await jwt.verify(token, SECRET_STRING);
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return next(new Unauthorized(UNAUTHORIZED));
    }
    return next(err);
  }
  req.user = payload;
  return next();
};
