require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const rateLimit = require('./middlewares/rate-limiter');
const mainRouter = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');

const { PORT } = process.env;

const app = express();

const allowedCors = [
  'http://localhost:8080/',
  'http://web.students.nomoreparties.co/',
  'https://web.students.nomoreparties.co/',
  'http://www.web.students.nomoreparties.co/',
  'https://www.web.students.nomoreparties.co/',
  'https://verakhab.github.io/news-explorer-frontend/',
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  }
  next();
});

app.use(allowedCors);

app.set('trust proxy');

app.use(helmet());

app.use(rateLimit);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(mainRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT || 3000);
