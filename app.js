require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const { PORT = 3001 } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/wtwr_db' } = process.env;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to the MongoDB server
mongoose.connect(DB_ADDRESS)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Error connecting to MongoDB:', err);
  });

// Import and use routes
const routes = require('./routes');

app.use(routes);

// Start the server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});