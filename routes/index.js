const router = require('express').Router();
const userRouter = require('./users');
const clothingItemRouter = require('./clothingItems');
const { login, createUser } = require('../controllers/users');
const { NOT_FOUND } = require('../utils/errors');
const auth = require('../middlewares/auth');

// POST /signin - User login
router.post('/signin', login);

// POST /signup - User registration
router.post('/signup', createUser);

// Mount the routes
router.use('/users', auth, userRouter);
router.use('/items', clothingItemRouter);

// Handle invalid routes
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Requested resource not found' });
});

module.exports = router;