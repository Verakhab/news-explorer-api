const mongoose = require('mongoose');
const validator = require('validator');

const schema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.String,
    validate: {
      validator: validator.isEmail,
    },
    required: [true, 'Это обязательное поле'],
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Это обязательное поле'],
    select: false,
  },
  name: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Это обязательное поле'],
    minlength: [2, 'Должно быть от 2 до 30 символов'],
    maxlength: [30, 'Должно быть от 2 до 30 символов'],
  },
});

module.exports = schema;
