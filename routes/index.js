const router = require('express').Router();
const userRouter = require('./users');
const clothingItemRouter = require('./clothingItems');

// Mount the routes
router.use('/users', userRouter);
router.use('/items', clothingItemRouter);

// Handle invalid routes
router.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

module.exports = router;