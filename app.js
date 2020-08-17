require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const { checkUserSignIn, checkUserSignup } = require('./middlewares/validations');
const mainRouter = require('./routes');
const auth = require('./middlewares/auth');
const { userUp, userIn } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');

const { PORT } = process.env;

const app = express();

app.set('trust proxy');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Вы привысили число запросов',
});

app.use(helmet());

app.use(limiter);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.post('/signin', checkUserSignIn, userIn);
app.post('/signup', checkUserSignup, userUp);

app.use(auth);

app.use(mainRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT || 3000);
