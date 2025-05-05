const router = require('express').Router();
const userRouter = require('./users');
const clothingItemRouter = require('./clothingItems');
const { NOT_FOUND } = require('../utils/errors');

// Mount the routes
router.use('/users', userRouter);
router.use('/items', clothingItemRouter);

// Handle invalid routes
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Requested resource not found' });
});

module.exports = router;