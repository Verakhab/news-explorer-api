const mongoose = require('mongoose');
const articleSchema = require('./articleSchema');
const userSchema = require('./userSchema');

const { URL_DB } = process.env;

mongoose.connect(URL_DB || 'mongodb://localhost:27017/exne', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const Article = mongoose.model('article', articleSchema);
const User = mongoose.model('user', userSchema);

module.exports = {
  Article,
  User,
};
