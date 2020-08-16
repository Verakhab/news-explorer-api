const mongoose = require('mongoose');
const validator = require('validator');

const schema = new mongoose.Schema({
  keyword: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Это обязательное поле'],
  },
  title: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Это обязательное поле'],
  },
  text: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Это обязательное поле'],
  },
  date: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Это обязательное поле'],
  },
  source: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Это обязательное поле'],
  },
  link: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Это обязательное поле'],
    validate: {
      validator: validator.isURL,
      message: 'Здесь должна быть ссылка',
    },
  },
  image: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Это обязательное поле'],
    validate: {
      validator: validator.isURL,
      message: 'Здесь должна быть ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Это обязательное поле'],
    ref: 'user',
    select: false,
  },
});

module.exports = schema;
