const userRouter = require('express').Router();
const { userMe, userIn, userUp } = require('../controllers/users');
const { checkUserSignIn, checkUserSignup } = require('../middlewares/validations');

userRouter.get('/me', userMe);

userRouter.post('/signin', checkUserSignIn, userIn);
userRouter.post('/signup', checkUserSignup, userUp);

module.exports = userRouter;
