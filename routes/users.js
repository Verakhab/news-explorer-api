const userRouter = require('express').Router();
const { userMe } = require('../controllers/users');

userRouter.get('/me', userMe);

module.exports = userRouter;
