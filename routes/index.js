const mainRouter = require('express').Router();
const articlesRouter = require('./articles');
const userRouter = require('./users');
const { NotFoundError } = require('../errors');
const { NOT_FOUND } = require('../constants');

mainRouter.use('/articles', articlesRouter);

mainRouter.use('/users', userRouter);

mainRouter.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND));
});

module.exports = mainRouter;
