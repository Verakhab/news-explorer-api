require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const rateLimit = require('./middlewares/rate-limiter');
const mainRouter = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');

const { PORT } = process.env;

const app = express();

app.use(cors({
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200,
  credentials: true,
}));

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
