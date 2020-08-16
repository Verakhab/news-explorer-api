const { NODE_ENV, JWT_SECRET } = process.env;
const { STRING_SECRET } = require('../constants');

const SECRET_STRING = NODE_ENV === 'production' ? JWT_SECRET : STRING_SECRET;

module.exports = {
  SECRET_STRING,
};
