const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors');
const { UNAUTHORIZED } = require('../constants');
const { SECRET_STRING } = require('../config');

module.exports = async (req, res, next) => {
  const auth = req.cookies.jwt;
  let payload;
  try {
    if (!auth) {
      throw new Unauthorized(UNAUTHORIZED);
    }
    payload = await jwt.verify(auth, SECRET_STRING);
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return next(new Unauthorized(UNAUTHORIZED));
    }
    return next(err);
  }
  req.user = payload;
  return next();
};
