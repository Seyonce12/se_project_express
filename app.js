require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require('./models/user');
const ClothingItem = require('./models/clothingItem');
const { testUser, clothingItems } = require('./utils/testData');

const app = express();
const { PORT = 3001 } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/wtwr_db' } = process.env;

// Variable to store the test user ID
let testUserId = '5d8b8592978f8bd833ca8133'; // Default placeholder ID

// Middleware
app.use(express.json());
app.use(cors());

// Add back the user middleware for testing purposes
// This should be positioned BEFORE your routes are used
app.use((req, res, next) => {
  req.user = {
    _id: testUserId
  };
  next();
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
          // Update the test user ID
          testUserId = newUser._id.toString();
          return newUser;
        });
    }
    // If user exists, update the testUserId
    testUserId = user._id.toString();
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
app.listen(PORT, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});