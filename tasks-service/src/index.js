/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');

const taskRouter = require('./routes/taskRouter');
const allErrorHandler = require('./middlewares/errors');
const config = require('./config');
const { connectToDb } = require('./models');

connectToDb(config.mongoURI, config.dbName);

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger('dev'));
app.use(helmet());

app.get('/', (req, res) =>
  res.status(200).json({
    message: 'API root...',
    data: [],
  })
);

app.use('/api/v1/tasks', taskRouter);

// Handle invalid request
app.all('*', (req, res) =>
  res.status(404).json({
    success: false,
    message: 'Route does not exist...',
    body: [],
  })
);

app.use(allErrorHandler());

module.exports = app;
