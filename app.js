require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
// after other middleware
const routes = require('./routes');   // ≤ import index.js

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wtwr');

app.use(helmet());
app.use(express.json());

// Request logging
app.use(requestLogger);

// Crash test route (for PM2 testing)
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

// Mount your routes below this line
// app.use('/api', require('./routes/yourRoutes'));
const routes = require('./routes');
app.use(routes);                      // ≤ mount

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);


app.listen(PORT,'0.0.0.0' () => {
  console.log(`Server running on port ${PORT}`);
});



