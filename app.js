require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const User = require('./models/user');
const ClothingItem = require('./models/clothingItem');
const { testUser, clothingItems } = require('./utils/testData');

const app = express();
const { PORT = 3001 } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/wtwr_db' } = process.env;

// Variable to store the test user ID - this will be updated with the actual ID from database
let testUserId = '5d8b8592978f8bd833ca8133'; // Default placeholder ID

// Middleware to handle JSON parsing
app.use(express.json());

// Middleware to add a user ID to each request - using a function to ensure ID is current
app.use((req, res, next) => {
  // This ensures we always use the most up-to-date user ID
  User.findOne({})
    .then(user => {
      if (user) {
        req.user = {
          _id: user._id.toString()
        };
      } else {
        req.user = {
          _id: testUserId
        };
      }
      next();
    })
    .catch(err => {
      // Log error for debugging purposes, but handle it gracefully
      // eslint-disable-next-line no-console
      console.error('Error retrieving user for request:', err);
      req.user = {
        _id: testUserId
      };
      next();
    });
});

// Connect to the MongoDB server
mongoose.connect(DB_ADDRESS)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB');
    // Seed test user if none exists
    return User.findOne({});
  })
  .then((user) => {
    if (!user) {
      return User.create(testUser)
        .then((newUser) => {
          // eslint-disable-next-line no-console
          console.log('Test user created');
          // Update the test user ID for middleware
          testUserId = newUser._id;
          return newUser;
        });
    }
    // If user exists, update the testUserId
    testUserId = user._id;
    return user;
  })
  .then((user) => 
    // Seed test items if none exists
    ClothingItem.countDocuments({})
      .then((count) => {
        if (count === 0) {
          const itemsWithOwner = clothingItems.map((item) => ({
            ...item,
            owner: user._id,
          }));
          return ClothingItem.create(itemsWithOwner);
        }
        return [];
      })
      .then((items) => {
        if (items.length > 0) {
          // eslint-disable-next-line no-console
          console.log(`${items.length} test clothing items created`);
        }
      })
  )
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Error connecting to MongoDB:', err);
  });

// Import and use routes after middleware setup
const routes = require('./routes');

app.use(routes);

// Start the server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});